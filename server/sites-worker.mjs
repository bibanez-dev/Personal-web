// Keep the existing Vercel APIs and their server-only credentials in one place.
const API_ORIGIN = 'https://personal-web-sand-two.vercel.app';
const MAX_BODY_BYTES = 16_384;

const json = (status, error) => Response.json({ ok: false, error }, {
  status,
  headers: { 'cache-control': 'no-store' },
});

export function createWorker(assets, fetchUpstream = fetch) {
  return {
    async fetch(request) {
      const url = new URL(request.url);
      const path = url.pathname;
      if (path === '/api/contact' || path === '/api/social') {
        const method = path === '/api/contact' ? 'POST' : 'GET';
        if (request.method !== method) return json(405, 'Método no permitido.');
        const origin = request.headers.get('origin');
        if (origin && origin !== url.origin) return json(403, 'Origen no permitido.');
        let body;
        if (method === 'POST') {
          if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
            return json(415, 'Formato no permitido.');
          }
          const reader = request.body?.getReader();
          if (!reader) return json(400, 'Falta el mensaje.');
          const chunks = [];
          let size = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > MAX_BODY_BYTES) {
              await reader.cancel();
              return json(413, 'El mensaje supera el tamaño permitido.');
            }
            chunks.push(value);
          }
          body = new Uint8Array(size);
          let offset = 0;
          for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.length; }
        }
        try {
          // Never forward browser cookies, authorization, or arbitrary destinations.
          const upstream = await fetchUpstream(API_ORIGIN + path, {
            method,
            headers: { 'content-type': 'application/json', 'accept-language': request.headers.get('accept-language') || 'es' },
            body,
            redirect: 'error',
            signal: AbortSignal.timeout(13_000),
          });
          if (!upstream.headers.get('content-type')?.includes('application/json')) {
            return json(502, 'No se pudo conectar. Probá nuevamente o escribime por email.');
          }
          return new Response(upstream.body, {
            status: upstream.status,
            headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' },
          });
        } catch {
          return json(502, 'No se pudo conectar. Probá nuevamente o escribime por email.');
        }
      }
      if (request.method !== 'GET' && request.method !== 'HEAD') return json(405, 'Método no permitido.');
      const asset = assets[path === '/' ? '/index.html' : path];
      if (!asset) return new Response('Not found', { status: 404 });
      const headers = {
        'content-type': asset.type,
        'cache-control': path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'strict-origin-when-cross-origin',
      };
      const bytes = request.method === 'HEAD' ? null : Uint8Array.from(atob(asset.base64), char => char.charCodeAt(0));
      return new Response(bytes, { headers });
    },
  };
}

// The Sites build embeds only the small, public Vite output; no runtime bindings required.
export default createWorker({});
