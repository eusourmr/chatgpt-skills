import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {TRUSTED_BASELINE_SHA256,CATALOG_VERSION} from '../assets/catalog-loader.js';
const read=rel=>readFileSync(new URL('../'+rel,import.meta.url),'utf8');
const index=read('index.html'),privacy=read('privacidade.html'),sw=read('sw.js');
const manifest=JSON.parse(read('manifest.webmanifest'));
const catalog=JSON.parse(read('assets/skill-index.json'));
const baseline=JSON.parse(read('assets/catalog-baseline.json'));
const catalogManifest=JSON.parse(read('assets/catalog-manifest.json'));
const sha=t=>createHash('sha256').update(t).digest('hex');
test('release metadata and catalog are aligned at 1.1.0',()=>{
 assert.equal(CATALOG_VERSION,'1.1.0');
 assert.equal(catalog.app_version,'1.1.0');
 assert.equal(baseline.app_version,'1.1.0');
 assert.equal(catalogManifest.release,'1.1.0');
 assert.equal(catalogManifest.entries,14);
 assert.equal(catalog.entries.length,14);
 assert.equal(sha(read('assets/skill-index.json')),catalogManifest.catalog_sha256);
 assert.equal(sha(read('assets/catalog-baseline.json')),TRUSTED_BASELINE_SHA256);
 assert.deepEqual(catalog.entries,baseline.entries);
});
test('PWA identity survives upgrade and ships scoped cache',()=>{
 assert.equal(manifest.id,'./');
 assert.equal(manifest.scope,'./');
 assert.equal(manifest.display,'standalone');
 assert.match(sw,/sophia-static-v1\.1\.0-v1/);
 assert.match(index,/SophIA 1\.1/);
});
test('public discovery metadata do not disclose personal prompts',()=>{
 assert.match(index,/<meta name="robots" content="index, follow">/);
 assert.match(index,/<link rel="canonical" href="https:\/\/sophia\.meuapoio\.com\/">/);
 assert.match(index,/property="og:description"/);
 assert.doesNotMatch(index,/<meta name="robots" content="noindex/);
 assert.doesNotMatch(index,/chatgpt\.com\/\?q=|gemini\.google\.com\/app\?q=/);
 assert.match(privacy,/SophIA 1\.1/);
});
test('neither third-party scripts nor API secrets are included',()=>{
 assert.match(index,/connect-src 'self'/);
 assert.match(index,/default-src 'none'/);
 assert.doesNotMatch(index,/<script[^>]+src="https?:\/\//i);
 assert.doesNotMatch(index,/sk-[A-Za-z0-9]{24,}/);
 assert.doesNotMatch(read('assets/launcher.js'),/fetch\(\s*['"]https?:\/\//);
});

test('guided experience module is shipped and CSP remains strict',()=>{
 assert.match(sw,/assets\/flow-guidance\.js/);
 assert.match(index,/id="launcher-context"/);
 assert.match(index,/id="launcher-regenerate" hidden/);
 assert.match(read('assets/launcher.js'),/import \{suggestDepth,describeGuidance\} from '\.\/flow-guidance\.js'/);
 assert.doesNotMatch(index,/script-src[^"<>]*unsafe-inline/);
});
