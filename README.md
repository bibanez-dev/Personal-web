# Benjamin Ibanez Portfolio

Portfolio personal construido con React + Vite, con un rediseno orientado a posicionamiento profesional en AI adoption, product strategy, innovation y service transformation.

## Scripts

- `npm run dev`: desarrollo local
- `npm run lint`: chequeo de tipos
- `npm run build`: build de produccion

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

- `INSTAGRAM_USER_ID`: id numerico de la cuenta profesional de Instagram (via Meta)
- `INSTAGRAM_ACCESS_TOKEN`: token de larga duracion para Graph API
- `INSTAGRAM_PROFILE_URL` (opcional): URL publica del perfil de Instagram
- `LINKEDIN_PROFILE_URL` (opcional): URL publica del perfil de LinkedIn
- `RESEND_API_KEY`: API key de Resend
- `CONTACT_TO_EMAIL`: email que recibe las consultas del formulario
- `CONTACT_FROM_EMAIL`: remitente verificado en Resend

Ejemplos de `CONTACT_FROM_EMAIL`:

- `Website Contact <onboarding@resend.dev>` (dominio de prueba de Resend)
- `Website Contact <contacto@tu-dominio.com>` (dominio propio verificado)

## Arquitectura social (produccion)

- Endpoint serverless: `api/social.ts`
- Cache CDN: `s-maxage=3600, stale-while-revalidate=86400`
- Instagram:
  - Si hay credenciales, consume Meta Graph API en vivo
  - Si no hay credenciales o falla la API, usa fallback curado
- LinkedIn:
  - Feed curado/manual versionado en codigo
  - Sin scraping, sin iframes, sin hacks fragiles

## Arquitectura de contacto (produccion)

- Frontend: `src/App.tsx` envia `POST /api/contact`
- Backend serverless (Vercel): `api/contact.ts`
- Envio de email: API de Resend (server-side)
- Seguridad:
  - No se exponen claves en frontend
  - Honeypot + rate limit basico por IP
  - Validacion backend de `name`, `email`, `company`, `message`

## Desarrollo local

1. `npm install`
2. Crear `.env` desde `.env.example`
3. `npm run dev`

## Deploy en Vercel

1. Importar repo en Vercel
2. Framework: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Configurar variables de entorno del proyecto:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - (y las variables sociales si aplican)