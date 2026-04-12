import nodemailer from 'nodemailer';

type Locale = 'es' | 'en';

type ContactRequest = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
  locale?: Locale;
};

type RateState = {
  count: number;
  resetAt: number;
};

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

const getStore = (): Map<string, RateState> => {
  const globalWithStore = globalThis as typeof globalThis & {
    __contactRateStore?: Map<string, RateState>;
  };

  if (!globalWithStore.__contactRateStore) {
    globalWithStore.__contactRateStore = new Map<string, RateState>();
  }

  return globalWithStore.__contactRateStore;
};

const getEnv = (): Record<string, string | undefined> => {
  return (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
};

const isEmailValid = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const safeString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  return request.headers.get('x-real-ip') ?? 'unknown';
};

const isRateLimited = (ip: string): boolean => {
  const store = getStore();
  const now = Date.now();
  const current = store.get(ip);

  if (!current || current.resetAt < now) {
    store.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  store.set(ip, current);
  return false;
};

const getErrorMessage = (locale: Locale): string =>
  locale === 'en'
    ? 'Could not send your message right now. Please try again shortly.'
    : 'No se pudo enviar tu mensaje en este momento. Intentá nuevamente en unos minutos.';

export default async function handler(request: Request): Promise<Response> {
  const method = request.method.toUpperCase();
  if (method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  }

  let payload: ContactRequest;
  try {
    payload = (await request.json()) as ContactRequest;
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const locale: Locale = payload.locale === 'en' ? 'en' : 'es';

  const name = safeString(payload.name);
  const email = safeString(payload.email).toLowerCase();
  const company = safeString(payload.company);
  const message = safeString(payload.message);
  const website = safeString(payload.website);

  if (website.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  if (!name || name.length > 120) {
    return Response.json({ ok: false, error: 'Invalid name' }, { status: 400 });
  }

  if (!email || email.length > 160 || !isEmailValid(email)) {
    return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  if (company.length > 160) {
    return Response.json({ ok: false, error: 'Invalid company' }, { status: 400 });
  }

  if (!message || message.length < 20 || message.length > 2000) {
    return Response.json({ ok: false, error: 'Invalid message' }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return Response.json({ ok: false, error: 'Too many requests' }, { status: 429 });
  }

  const env = getEnv();
  const smtpHost = env.SMTP_HOST;
  const smtpPort = Number(env.SMTP_PORT ?? '0');
  const smtpUser = env.SMTP_USER;
  const smtpPass = env.SMTP_PASS;
  const contactTo = env.CONTACT_TO_EMAIL;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactTo) {
    return Response.json({ ok: false, error: 'SMTP env vars are not configured' }, { status: 500 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subjectPrefix = locale === 'en' ? 'New contact form message' : 'Nuevo mensaje desde formulario';

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || '-'}`,
      `Locale: ${locale}`,
      `IP: ${clientIp}`,
      '',
      'Message:',
      message,
    ];

    await transporter.sendMail({
      from: smtpUser,
      to: contactTo,
      replyTo: email,
      subject: `${subjectPrefix} - ${name}`,
      text: lines.join('\n'),
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json({ ok: false, error: getErrorMessage(locale) }, { status: 500 });
  }
}
