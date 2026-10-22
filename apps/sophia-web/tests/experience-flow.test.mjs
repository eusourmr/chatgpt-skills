import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const js=readFileSync(new URL('../assets/launcher.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('previously selected/saved depth overrides automatic guidance',()=>{
 assert.match(js,/if\(!remember&&!manualDepth\)/);
 assert.match(js,/manualDepth=true;automaticDepth=false/);
});
test('manual preview edits are preserved until applying a new method or depth',()=>{
 assert.match(js,/preview\.addEventListener\('input'/);
 assert.match(js,/if\(previewDirty\)\{pendingMethod=\{entry\}/);
 assert.match(js,/if\(previewDirty\)\{applyChanges.hidden=false/);
 assert.match(js,/applyChanges\.addEventListener\('click'/);
 assert.match(html,/id="launcher-regenerate" hidden/);
});
test('handoff contract remains copy first, open official HTTPS in separate user gesture',()=>{
 assert.match(html,/data-copy-open="chatgpt">1\. Copiar para ChatGPT/);
 assert.match(html,/href="https:\/\/chatgpt\.com\/">2\. Abrir ChatGPT/);
 assert.doesNotMatch(js,/window\.open\(|window\.location\.assign\(plan\.href\)/);
});
