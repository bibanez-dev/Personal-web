# Publicación en Sites

URL: https://benjamin-ibanez.benja010.chatgpt.site
Fecha: 7 de septiembre de 2026.
Acceso: privado para la cuenta propietaria.
Versión publicada: 3.
Estado del despliegue: succeeded.
Fuente de entrega: 0d07446f511a643dc8502d5e119a595ced5a28b3.

## Cambios

- `server/sites-worker.mjs`: entrega del sitio y puente a las APIs existentes en Vercel, sin copiar secretos. Redirecciones manuales con rechazo explícito, timeout, límite de cuerpo y cabeceras permitidas.
- `scripts/build-sites.mjs`: empaquetado de los recursos públicos en un Worker ESM pequeño.
- `tests/sites-worker.test.mjs`: cinco pruebas de rutas, validaciones, aislamiento y manejo de errores.
- `package.json`: comandos `build:sites` y `test:sites`.
- `.openai/hosting.json`: identidad persistida del Site para futuras publicaciones.

## Verificado

- Build y TypeScript correctos; cinco pruebas correctas.
- Página, JavaScript y CSS publicados: HTTP 200.
- Contacto publicado con datos inválidos: HTTP 400 / INVALID_NAME.
- Contacto publicado con honeypot: HTTP 200 / ok=true, sin enviar email.
- Se corrigió una incompatibilidad de Cloudflare con redirect:error usando redirect:manual y rechazo de respuestas 3xx.

## Cómo probar

Abrir la URL con la cuenta propietaria de ChatGPT. Navegar, cambiar idioma/tema y usar Contacto. La entrega de un correo real se comprueba enviando un mensaje desde el formulario; no se realizaron envíos reales durante esta tarea.

## Dependencias y mantenimiento

El servicio de email sigue alojado en Vercel y requiere mantener activo ese proyecto y Resend. El límite por IP del backend puede agrupar tráfico de salida del proxy. No se cambiaron credenciales ni configuración de Vercel.

Para la entrega se creó una copia Git saneada de los archivos del sitio, excluyendo el perfil `.edge-debug`, secretos y el historial original que contiene ese perfil. No subir ese historial completo a un nuevo destino. La copia de entrega de esta sesión está en `C:/Users/Benjamin/AppData/Local/Temp/benjamin-sites-delivery-20260907`; el remoto Sites conserva la fuente publicada.
