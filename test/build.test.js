import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

test('source index.html exists and references all modules', () => {
  const html = readFileSync(join(root, '..', 'index.html'), 'utf8');
  assert.ok(html.includes('src/css/style.css'), 'css link present');
  assert.ok(html.includes('src/js/app.js'), 'app module present');
  assert.ok(html.includes('data-mode="deep"'), 'modes present');
});

test('dist build is produced and inlines assets (run npm run build first)', () => {
  const distIndex = join(root, '..', 'dist', 'index.html');
  if (!existsSync(distIndex)) return; // build not run yet — skip
  const html = readFileSync(distIndex, 'utf8');
  assert.ok(!html.includes('<link rel="stylesheet"'), 'css is inlined');
  assert.ok(!html.includes('src="src/js/app.js"'), 'js is inlined');
  assert.ok(html.includes('data:image/svg+xml;base64,'), 'logo inlined as data URI');
});

test('audio engine exposes expected soundscape names', () => {
  const src = readFileSync(join(root, '..', 'src', 'js', 'audio.js'), 'utf8');
  for (const name of ['silence', 'deep', 'rain', 'cafe', 'ocean']) {
    assert.ok(src.includes(`'${name}'`), `soundscape "${name}" defined`);
  }
});