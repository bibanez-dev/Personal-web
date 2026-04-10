# Social Setup Guide

## 1) Instagram Professional + Meta Graph API

1. Convertir la cuenta a **Instagram Professional**.
2. Vincular la cuenta de Instagram a una **Facebook Page**.
3. Crear app en [Meta for Developers](https://developers.facebook.com/).
4. Agregar productos:
   - `Instagram Graph API`
   - `Facebook Login` (si vas a hacer OAuth)
5. Solicitar permisos necesarios para leer media del usuario conectado (segun flujo de tu app).
6. Generar token de larga duracion.
7. Obtener `INSTAGRAM_USER_ID` y validar llamada:
   - `GET /{instagram-user-id}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp`
8. Cargar en Vercel:
   - `INSTAGRAM_USER_ID`
   - `INSTAGRAM_ACCESS_TOKEN`
   - opcional `INSTAGRAM_PROFILE_URL`
9. Redeploy y verificar que el estado muestre: `Instagram conectado en vivo via Meta Graph API`.

## 2) LinkedIn (sin scraping)

Por restricciones de LinkedIn para feeds personales, este proyecto usa un modelo curado y mantenible.

1. Editar `src/data/socialFallback.ts` en `linkedin.items`.
2. Cargar por post:
   - `title`
   - `excerpt`
   - `publishedAt` (ISO: YYYY-MM-DD)
   - `url`
   - `tag`
3. Ajustar `LINKEDIN_PROFILE_URL` en entorno si corresponde.
4. Deploy.

## 3) Opcion avanzada para contenido curado

Si queres gestion no-tecnica, mover `linkedin.items` a:

- Supabase table (`linkedin_posts`)
- o CMS (Sanity/Contentful)

Mantener la misma estructura de payload que entrega `api/social.ts`.

## 4) Estados UI ya implementados

- Loading: skeleton cards
- Error API: alerta + fallback curado
- Empty: mensaje de estado vacio
