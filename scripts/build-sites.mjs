import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const assets = {};
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(filename);
    else if (entry.isFile()) {
      const key = '/' + path.relative(root, filename).split(path.sep).join('/');
      assets[key] = { type: types[path.extname(filename)] || 'application/octet-stream', base64: (await readFile(filename)).toString('base64') };
    }
  }
}
// Explicit public allowlist excludes server output, metadata, sources and credentials.
assets['/index.html'] = { type: types['.html'], base64: (await readFile(path.join(root, 'index.html'))).toString('base64') };
await collect(path.join(root, 'assets'));
const source = await readFile('server/sites-worker.mjs', 'utf8');
const output = source.replace('export default createWorker({});', `export default createWorker(${JSON.stringify(assets)});`);
await mkdir(path.join(root, 'server'), { recursive: true });
await writeFile(path.join(root, 'server/index.js'), output);
console.log(`Sites Worker ready: ${Object.keys(assets).length} public assets, ${Buffer.byteLength(output)} bytes.`);
