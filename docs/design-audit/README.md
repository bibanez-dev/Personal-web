# Auditoría y optimización — Benjamin Ibanez

Fecha: 7 de septiembre de 2026. Rama: `codex/personal-site-design`.

## Resultado

Presentación editorial minimalista: propuesta breve, retrato real, fondos neutros, azul como acento y una jerarquía consistente entre portada, capacidades, aplicaciones, proyectos y contacto. Se conservaron los enlaces, proyectos, idiomas, temas y endpoints existentes. Sin nuevas dependencias.

## Recorrido auditado

1. **Portada desktop — mejorada.** La portada original acumulaba un título largo, tres párrafos, cuatro etiquetas y un panel discursivo. Se concentró en una propuesta, una descripción, una línea de identidad y dos acciones. Se quitaron degradados decorativos y se mantuvieron Space Grotesk y Manrope. Evidencia final: `02-desktop.png`.
2. **Navegación mobile — funcional.** Revisada a 390 px y comprobado el ancho a 320 px, sin desborde horizontal en esas medidas. El menú abre, conduce a Contacto y se cierra. El acceso flotante abre y cierra con Escape; sus enlaces ya no son accesibles al teclado mientras está oculto. Evidencia: `03-mobile.png`.
3. **Capacidades, aplicaciones y proyectos — jerarquía mejorada.** Servicios numerados, aplicaciones como filas y proyectos en tarjetas. “Impacto” se renombró “Aplicaciones”: no había métricas verificables y las frases se presentan como focos de trabajo. Se corrigió la colisión de la clase container con Tailwind, que comprimía el contenido en determinados anchos. Evidencia: `06-full-page.png`.
4. **Contacto — interfaz verificada; entrega pendiente.** Empresa figura como opcional; el mensaje informa el mínimo y máximo. El envío vacío lleva el foco al nombre mediante validación nativa. Se mantienen estados de carga/error/éxito y los datos ante errores. Las respuestas no JSON ya no se vuelcan como texto técnico al usuario. Evidencia: `04-contact.png`.
5. **Inglés y modo oscuro — revisados.** Ambos controles funcionan. Se actualizó el copy en ambas versiones y se tradujeron etiquetas accesibles. Evidencia: `05-dark-en.png`.

## Dirección visual aplicada

- Fondo claro `#fafbfc`; fondo oscuro `#101419`.
- Azul principal `#2457df`; acento claro en tema oscuro `#8bafff`.
- Titulares Space Grotesk; texto Manrope, con alternativas de sistema.
- Contenido máximo de 1180 px, espacios adaptables y tarjetas con bordes discretos.
- Foto existente, sin imágenes inventadas ni testimonios o resultados añadidos.

## Archivos modificados

- `src/App.tsx`: copy ES/EN, simplificación del hero, estructura de tarjetas, etiquetas y estados accesibles, error de contacto legible.
- `src/index.css`: paleta, jerarquía, espaciado, responsive, campos y foco, contenedor propio sin colisión con Tailwind.
- `index.html`: título, descripción y color inicial coherentes.
- `docs/design-audit/`: informe y capturas tomadas durante esta revisión.

## Cómo probar

1. Ejecutar `npm run dev` y abrir `http://localhost:3000/`.
2. Alternar ES/EN y claro/oscuro; navegar por las cuatro secciones.
3. En mobile, abrir el menú, ir a Contacto y abrir/cerrar Conectar con Escape.
4. Enviar el formulario vacío: debe enfocar Nombre y no enviar una solicitud.
5. Para validar entrega real, usar el entorno Vercel con Resend configurado y realizar una prueba autorizada de envío.

## Verificación y límites

- `npm run lint` (TypeScript, no ESLint) y `npm run build`: correctos.
- Consola del navegador: no se observaron errores durante la revisión.
- No se enviaron mensajes reales ni se modificaron servicios en producción.
- El servidor Vite local no ejecuta `api/contact.ts`. No se verificaron entrega de email, rate limit ni persistencia del lado del proveedor.
- Sites: se siguieron sus guías de construcción y se revisó el requisito de hosting. El backend actual usa funciones Vercel; un paquete estático de Sites no las ejecuta. La publicación en Sites queda pendiente de adaptar y configurar ese backend, para conservar el formulario. No se publicó una copia con funcionalidad incompleta.
- WhatsApp permanece deshabilitado cuando no se configura su URL, como en el proyecto original.
- Las capturas muestran legibilidad y distribución, pero no constituyen una certificación WCAG. Pendientes: lector de pantalla, ampliación de texto al 200%, contraste automatizado exhaustivo y dispositivos físicos.
- Para reforzar credibilidad en una siguiente iteración: agregar casos o resultados verificables y enlaces reales a proyectos cuando estén disponibles.

## Actualización de publicación

Se añadió una conexión de servidor entre Sites y las APIs existentes en Vercel. El impedimento de hosting estático se resolvió con `server/sites-worker.mjs` y `npm run build:sites`. Se validó el backend real mediante solicitud inválida y honeypot sin enviar emails. La dependencia de Vercel/Resend se conserva deliberadamente.
