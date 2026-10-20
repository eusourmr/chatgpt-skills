import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../assets/launcher.js',import.meta.url),'utf8');
test('announces changes and focuses the result, not just scroll',()=>{
 assert.match(html,/id="launcher-status"[^>]*role="status"[^>]*aria-live="polite"/);
 assert.match(html,/id="launcher-method"[^>]*aria-live="polite"/);
 assert.match(html,/id="launcher-result-title"[^>]*tabindex="-1"/);
 assert.match(js,/launcher-result-title'\)\.focus/);
});
test('explicit, focusable link appears only after copied prompt and is not private-data URL',()=>{
 assert.match(html,/id="launcher-next-provider"[^>]*hidden/);
 assert.match(js,/nextProvider\.href=plan\.href/);
 assert.doesNotMatch(js,/encodeURIComponent\(text\)/);
});
test('touch target CSS uses >=48px for key launcher controls',()=>{
 assert.match(html,/\.launcher-examples button,\.launcher-choice,[^}]*min-height:48px/);
});
