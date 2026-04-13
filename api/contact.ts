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
  | 'INVALID_FROM_EMAIL'
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
    INVALID_FROM_EMAIL: 'El remitente configurado no es valido para Resend.',
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
    INVALID_FROM_EMAIL: 'Configured sender is not valid for Resend.',
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

const extractSenderEmail = (from: string): string => {
  const bracketMatch = from.match(/<([^>]+)>/);
  if (bracketMatch?.[1]) {
    return bracketMatch[1].trim().toLowerCase();
  }

  return from.trim().toLowerCase();
};

const getHeader = (req: { headers?: Record<string, unknown> }, key: string): string => {
  const raw = req.headers?.[key] ?? req.headers?.[key.toLowerCase()] ?? req.headers?.[key.toUpperCase()];

  if (Array.isArray(raw)) {
    return String(raw[0] ?? '');
  }

  return typeof raw === 'string' ? raw : '';
};

const getClientIp = (req: { headers?: Record<string, unknown> }): string => {
  const forwardedFor = getHeader(req, 'x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  const realIp = getHeader(req, 'x-real-ip');
  return realIp || 'unknown';
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

const sendJson = (res: { statusCode?: number; setHeader: (name: string, value: string) => void; end: (chunk: string) => void }, status: number, body: Record<string, unknown>): void => {
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(JSON.stringify(body));
};

const jsonError = (
  res: { statusCode?: number; setHeader: (name: string, value: string) => void; end: (chunk: string) => void },
  status: number,
  code: ErrorKey,
  locale: Locale,
): void => {
  sendJson(res, status, {
    ok: false,
    error: MESSAGES[locale][code],
    code,
  });
};

const parseBody = (body: unknown): ContactRequest | null => {
  if (!body) {
    return null;
  }

  if (typeof body === 'object') {
    return body as ContactRequest;
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ContactRequest;
    } catch {
      return null;
    }
  }

  return null;
};

const parseResendError = async (response: Response): Promise<string> => {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';

  if (contentType.includes('application/json')) {
    try {
      const payload = (await response.json()) as { message?: string; error?: string };
      return payload.message ?? payload.error ?? 'unknown';
    } catch {
      return 'unknown';
    }
  }

  try {
    const text = await response.text();
    return text.slice(0, 180) || 'unknown';
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

export default async function handler(
  req: {
    method?: string;
    headers?: Record<string, unknown>;
    body?: unknown;
  },
  res: {
    statusCode?: number;
    setHeader: (name: string, value: string) => void;
    end: (chunk: string) => void;
  },
): Promise<void> {
  let locale: Locale = 'es';
  const requestId = `ct_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  try {
    const acceptLanguage = getHeader(req, 'accept-language').toLowerCase();
    locale = normalizeLocale(acceptLanguage.startsWith('en') ? 'en' : 'es');

    const method = String(req.method ?? 'GET').toUpperCase();
    if (method !== 'POST') {
      console.warn(`[contact][${requestId}] method_not_allowed`, { method });
      jsonError(res, 405, 'METHOD_NOT_ALLOWED', locale);
      return;
    }

    const payload = parseBody(req.body);
    if (!payload) {
      console.warn(`[contact][${requestId}] invalid_json_body`);
      jsonError(res, 400, 'INVALID_JSON', locale);
      return;
    }

    locale = normalizeLocale(payload.locale ?? locale);

    const name = sanitizeInline(safeString(payload.name));
    const email = sanitizeInline(safeString(payload.email)).toLowerCase();
    const company = sanitizeInline(safeString(payload.company));
    const message = sanitizeMultiline(safeString(payload.message));
    const website = sanitizeInline(safeString(payload.website));

    if (website.length > 0) {
      console.info(`[contact][${requestId}] honeypot_triggered`);
      sendJson(res, 200, { ok: true });
      return;
    }

    if (!name || name.length > 120) {
      jsonError(res, 400, 'INVALID_NAME', locale);
      return;
    }

    if (!email || email.length > 160 || !isEmailValid(email)) {
      jsonError(res, 400, 'INVALID_EMAIL', locale);
      return;
    }

    if (company.length > 160) {
      jsonError(res, 400, 'INVALID_COMPANY', locale);
      return;
    }

    if (!message || message.length < 20 || message.length > 2000) {
      jsonError(res, 400, 'INVALID_MESSAGE', locale);
      return;
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      console.warn(`[contact][${requestId}] rate_limited`, { clientIp });
      jsonError(res, 429, 'TOO_MANY_REQUESTS', locale);
      return;
    }

    const env = getEnv();
    const resendApiKey = safeString(env.RESEND_API_KEY);
    const contactToEmail = safeString(env.CONTACT_TO_EMAIL);
    const contactFromEmail = safeString(env.CONTACT_FROM_EMAIL);

    if (!resendApiKey || !contactToEmail || !contactFromEmail) {
      console.error(`[contact][${requestId}] missing_required_env`, {
        hasResendApiKey: Boolean(resendApiKey),
        hasContactToEmail: Boolean(contactToEmail),
        hasContactFromEmail: Boolean(contactFromEmail),
      });
      jsonError(res, 500, 'MISSING_EMAIL_CONFIG', locale);
      return;
    }

    const senderEmail = extractSenderEmail(contactFromEmail);
    if (!isEmailValid(senderEmail)) {
      console.error(`[contact][${requestId}] invalid_contact_from_email`, {
        contactFromEmail,
      });
      jsonError(res, 500, 'INVALID_FROM_EMAIL', locale);
      return;
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

    await sendWithResend({
      apiKey: resendApiKey,
      from: contactFromEmail,
      to: contactToEmail,
      replyTo: email,
      subject,
      text: lines.join('\n'),
    });

    console.info(`[contact][${requestId}] send_success`, {
      to: contactToEmail,
      from: contactFromEmail,
    });

    sendJson(res, 200, { ok: true });
  } catch (error) {
    const isAbortError = error instanceof Error && error.name === 'AbortError';

    if (isAbortError) {
      console.error(`[contact][${requestId}] resend_timeout`);
      jsonError(res, 504, 'SEND_TIMEOUT', locale);
      return;
    }

    console.error(`[contact][${requestId}] unhandled_error`, {
      error: error instanceof Error ? error.message : String(error),
    });

    jsonError(res, 500, 'UNEXPECTED_ERROR', locale);
  }
}
