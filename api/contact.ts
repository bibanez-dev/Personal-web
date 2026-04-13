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

type ErrorKey =
  | 'METHOD_NOT_ALLOWED'
  | 'INVALID_JSON'
  | 'INVALID_NAME'
  | 'INVALID_EMAIL'
  | 'INVALID_COMPANY'
  | 'INVALID_MESSAGE'
  | 'TOO_MANY_REQUESTS'
  | 'MISSING_EMAIL_CONFIG'
  | 'SEND_TIMEOUT'
  | 'SEND_FAILED'
  | 'UNEXPECTED_ERROR';

type LocalizedMessages = Record<ErrorKey, string>;

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const RESEND_API_URL = 'https://api.resend.com/emails';
const RESEND_TIMEOUT_MS = 12_000;

const MESSAGES: Record<Locale, LocalizedMessages> = {
  es: {
    METHOD_NOT_ALLOWED: 'Metodo no permitido.',
    INVALID_JSON: 'Formato de solicitud invalido.',
    INVALID_NAME: 'Por favor, completa un nombre valido.',
    INVALID_EMAIL: 'Por favor, completa un email valido.',
    INVALID_COMPANY: 'El campo empresa supera el maximo permitido.',
    INVALID_MESSAGE: 'El mensaje debe tener entre 20 y 2000 caracteres.',
    TOO_MANY_REQUESTS: 'Demasiados intentos. Espera un minuto e intenta nuevamente.',
    MISSING_EMAIL_CONFIG: 'La configuracion de email no esta completa en el servidor.',
    SEND_TIMEOUT: 'El envio demoro demasiado. Intenta nuevamente en unos minutos.',
    SEND_FAILED: 'No se pudo enviar el mensaje en este momento. Intenta nuevamente.',
    UNEXPECTED_ERROR: 'Ocurrio un error inesperado. Intenta nuevamente.',
  },
  en: {
    METHOD_NOT_ALLOWED: 'Method not allowed.',
    INVALID_JSON: 'Invalid request payload.',
    INVALID_NAME: 'Please provide a valid name.',
    INVALID_EMAIL: 'Please provide a valid email.',
    INVALID_COMPANY: 'Company field exceeds the maximum length.',
    INVALID_MESSAGE: 'Message must be between 20 and 2000 characters.',
    TOO_MANY_REQUESTS: 'Too many attempts. Please wait a minute and try again.',
    MISSING_EMAIL_CONFIG: 'Email configuration is incomplete on the server.',
    SEND_TIMEOUT: 'Sending timed out. Please try again in a few minutes.',
    SEND_FAILED: 'Could not send the message right now. Please try again shortly.',
    UNEXPECTED_ERROR: 'Unexpected error. Please try again.',
  },
};

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

const safeString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

const sanitizeInline = (value: string): string => value.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();

const sanitizeMultiline = (value: string): string => value.replace(/\r/g, '').trim();

const isEmailValid = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizeLocale = (locale: unknown): Locale => (locale === 'en' ? 'en' : 'es');

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

const jsonError = (status: number, code: ErrorKey, locale: Locale): Response =>
  Response.json(
    {
      ok: false,
      error: MESSAGES[locale][code],
      code,
    },
    { status },
  );

const parseResendError = async (response: Response): Promise<string> => {
  try {
    const payload = (await response.json()) as { message?: string; error?: string };
    return payload.message ?? payload.error ?? 'unknown';
  } catch {
    return 'unknown';
  }
};

const sendWithResend = async (params: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}): Promise<void> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), RESEND_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: params.from,
        to: [params.to],
        reply_to: params.replyTo,
        subject: params.subject,
        text: params.text,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const resendError = await parseResendError(response);
      throw new Error(`Resend API ${response.status}: ${resendError}`);
    }
  } finally {
    clearTimeout(timeoutId);
  }
};

export default async function handler(request: Request): Promise<Response> {
  const method = request.method.toUpperCase();
  const localeHeader = normalizeLocale(request.headers.get('accept-language')?.toLowerCase().startsWith('en') ? 'en' : 'es');

  if (method !== 'POST') {
    return jsonError(405, 'METHOD_NOT_ALLOWED', localeHeader);
  }

  let payload: ContactRequest;
  try {
    payload = (await request.json()) as ContactRequest;
  } catch {
    return jsonError(400, 'INVALID_JSON', localeHeader);
  }

  const locale = normalizeLocale(payload.locale);

  const name = sanitizeInline(safeString(payload.name));
  const email = sanitizeInline(safeString(payload.email)).toLowerCase();
  const company = sanitizeInline(safeString(payload.company));
  const message = sanitizeMultiline(safeString(payload.message));
  const website = sanitizeInline(safeString(payload.website));

  if (website.length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  if (!name || name.length > 120) {
    return jsonError(400, 'INVALID_NAME', locale);
  }

  if (!email || email.length > 160 || !isEmailValid(email)) {
    return jsonError(400, 'INVALID_EMAIL', locale);
  }

  if (company.length > 160) {
    return jsonError(400, 'INVALID_COMPANY', locale);
  }

  if (!message || message.length < 20 || message.length > 2000) {
    return jsonError(400, 'INVALID_MESSAGE', locale);
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return jsonError(429, 'TOO_MANY_REQUESTS', locale);
  }

  const env = getEnv();
  const resendApiKey = safeString(env.RESEND_API_KEY);
  const contactToEmail = safeString(env.CONTACT_TO_EMAIL);
  const contactFromEmail = safeString(env.CONTACT_FROM_EMAIL);

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    console.error('[contact] missing required env vars', {
      hasResendApiKey: Boolean(resendApiKey),
      hasContactToEmail: Boolean(contactToEmail),
      hasContactFromEmail: Boolean(contactFromEmail),
    });
    return jsonError(500, 'MISSING_EMAIL_CONFIG', locale);
  }

  const subjectPrefix = locale === 'en' ? 'New contact form message' : 'Nuevo mensaje desde formulario';
  const subject = `${subjectPrefix} - ${name}`;

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

  try {
    await sendWithResend({
      apiKey: resendApiKey,
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject,
      text: lines.join('\n'),
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    const isAbortError = error instanceof Error && error.name === 'AbortError';

    if (isAbortError) {
      console.error('[contact] resend timeout', { ip: clientIp });
      return jsonError(504, 'SEND_TIMEOUT', locale);
    }

    console.error('[contact] resend send failed', {
      ip: clientIp,
      error: error instanceof Error ? error.message : String(error),
    });

    return jsonError(502, 'SEND_FAILED', locale);
  }
}
