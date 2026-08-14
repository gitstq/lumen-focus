/* Lumen Focus · build script.
 * Produces a single self-contained, offline-ready file at dist/index.html
 * by inlining the CSS and JS into the source index.html.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

mkdirSync(dist, { recursive: true });

const read = (p) => readFileSync(join(root, p), 'utf8');

let html = read('index.html');

// Inline CSS
const css = read('src/css/style.css');
html = html.replace(
  /<link rel="stylesheet" href="src\/css\/style\.css"\s*\/>/,
  () => `<style>${css}</style>`
);

// Inline JS (module bundle concatenated)
const jsFiles = ['src/js/stats.js', 'src/js/audio.js', 'src/js/app.js'];
const js = jsFiles.map((f) => read(f)).join('\n');
html = html.replace(
  /<script type="module" src="src\/js\/app\.js"><\/script>/,
  () => `<script type="module">${js}</script>`
);

// Inline logo as data URI
const logo = read('assets/logo.svg');
const dataUri = `data:image/svg+xml;base64,${Buffer.from(logo).toString('base64')}`;
html = html.replace(/src="assets\/logo\.svg"/g, `src="${dataUri}"`);
html = html.replace(/href="assets\/logo\.svg"/g, `href="${dataUri}"`);
html = html.replace('href="manifest.webmanifest"', 'href="./manifest.webmanifest"');

writeFileSync(join(dist, 'index.html'), html);

// Copy static PWA assets
copyFileSync(join(root, 'manifest.webmanifest'), join(dist, 'manifest.webmanifest'));
if (existsSync(join(root, 'assets'))) {
  mkdirSync(join(dist, 'assets'), { recursive: true });
  copyFileSync(join(root, 'assets', 'logo.svg'), join(dist, 'assets', 'logo.svg'));
}
copyFileSync(join(root, 'sw.js'), join(dist, 'sw.js'));

const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
console.log(`✓ Build complete → dist/index.html (${kb} KB, single-file offline)`);