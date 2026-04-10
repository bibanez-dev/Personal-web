# Benjamin Ibanez Portfolio

Portfolio personal construido con React + Vite, con un redisenio orientado a posicionamiento profesional en AI adoption, product strategy, innovation y service transformation.

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

## Arquitectura social (produccion)

- Endpoint serverless: `api/social.ts`
- Cache CDN: `s-maxage=3600, stale-while-revalidate=86400`
- Instagram:
  - Si hay credenciales, consume Meta Graph API en vivo
  - Si no hay credenciales o falla la API, usa fallback curado
- LinkedIn:
  - Feed curado/manual versionado en codigo
  - Sin scraping, sin iframes, sin hacks frágiles

## Desarrollo local

1. `npm install`
2. Crear `.env` desde `.env.example`
3. `npm run dev`

## Deploy en Vercel

1. Importar repo en Vercel
2. Framework: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Configurar variables de entorno del proyecto
