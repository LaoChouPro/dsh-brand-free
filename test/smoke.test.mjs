import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { apply } from '../index.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const patch = fs.readFileSync(path.join(rootDir, 'cordis.patch.yml'), 'utf8');
const clientCode = fs.readFileSync(path.join(rootDir, 'client.js'), 'utf8');

assert.equal(typeof apply, 'function', 'Host entrypoint must export apply()');
assert.ok(pkg.dsh?.bundle?.patch, 'package.json must declare dsh.bundle.patch');
assert.equal(pkg.dsh?.client?.platform, 'web', 'package.json must declare dsh.client.platform = "web"');
assert.ok(patch.includes(`name: '${pkg.name}'`) || patch.includes(`name: ${pkg.name}`), 'cordis.patch.yml must reference package name');
assert.ok(clientCode.includes(`id: '${pkg.name}'`), 'client.js ModuleLoader id must match package name');

for (const lang of ['en', 'zh']) {
  const locale = JSON.parse(fs.readFileSync(path.join(rootDir, 'locale', `${lang}.json`), 'utf8'));
  assert.ok(locale.meta?.title, `locale/${lang}.json must define meta.title`);
  assert.ok(locale.meta?.description, `locale/${lang}.json must define meta.description`);
}

console.log('Smoke test passed:', pkg.name, pkg.version);
