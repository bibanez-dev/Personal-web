import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorker } from '../server/sites-worker.mjs';

const origin = 'https://benjamin-ibanez.benja010.chatgpt.site';
const contact = (body, headers = {}) => new Request(origin + '/api/contact', {
  method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body,
});

test('serves public page and assets, HEAD, and real 404s', async () => {
  const worker = createWorker({ '/index.html': { type: 'text/html', base64: btoa('<h1>Benjamin</h1>') } });
  assert.equal(await (await worker.fetch(new Request(origin))).text(), '<h1>Benjamin</h1>');
  assert.equal(await (await worker.fetch(new Request(origin, { method: 'HEAD' }))).text(), '');
  assert.equal((await worker.fetch(new Request(origin + '/.env'))).status, 404);
  assert.equal((await worker.fetch(new Request(origin + '/server/index.js'))).status, 404);
});

test('forwards only the fixed API destination, preserving validation and rate-limit errors', async () => {
  const payload = JSON.stringify({ name: 'Test', website: 'bot' });
  const worker = createWorker({}, async (url, options) => {
    assert.equal(url, 'https://personal-web-sand-two.vercel.app/api/contact');
    assert.equal(new TextDecoder().decode(options.body), payload);
    assert.equal(new Headers(options.headers).has('cookie'), false);
    assert.equal(new Headers(options.headers).has('authorization'), false);
    assert.equal(options.redirect, 'error');
    return Response.json({ ok: false, code: 'TOO_MANY_REQUESTS' }, { status: 429 });
  });
  const response = await worker.fetch(contact(payload, { cookie: 'private-session', authorization: 'private-token' }));
  assert.equal(response.status, 429);
  assert.equal((await response.json()).code, 'TOO_MANY_REQUESTS');
  assert.equal(response.headers.get('cache-control'), 'no-store');
});

test('rejects foreign origins, unsupported methods and oversized messages before forwarding', async () => {
  const worker = createWorker({}, () => { throw new Error('Must not call upstream'); });
  assert.equal((await worker.fetch(contact('{}', { origin: 'https://untrusted.example' }))).status, 403);
  assert.equal((await worker.fetch(new Request(origin + '/api/contact'))).status, 405);
  assert.equal((await worker.fetch(contact('{}', { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await worker.fetch(contact('x'.repeat(16_385)))).status, 413);
});

test('upstream failures return useful errors without exposing HTML or diagnostics', async () => {
  for (const fetcher of [async () => new Response('<html>private diagnostic</html>'), async () => { throw new Error('secret detail'); }]) {
    const response = await createWorker({}, fetcher).fetch(contact('{}'));
    assert.equal(response.status, 502);
    assert.equal((await response.json()).ok, false);
  }
});

test('preserves the social endpoint and returns contact success unchanged', async () => {
  const worker = createWorker({}, async () => Response.json({ ok: true }));
  assert.deepEqual(await (await worker.fetch(contact('{}'))).json(), { ok: true });
  assert.equal((await worker.fetch(new Request(origin + '/api/social'))).status, 200);
});
