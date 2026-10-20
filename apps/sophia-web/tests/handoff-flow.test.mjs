import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const js=readFileSync(new URL('../assets/launcher.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('copy buttons do not perform automatic navigation after asynchronous clipboard',()=>{
 const block=js.slice(js.indexOf('// Copy and open are deliberately separate'),js.indexOf('\nstart();'));
 assert.match(block,/await copyPreview\(\)/);
 assert.match(block,/offerProviderContinuation\(plan\)/);
 assert.doesNotMatch(block,/window\.open\(|location\.assign\(|intent:\/\//);
});
test('official provider links are always visible independent of clipboard',()=>{
 assert.match(html,/href="https:\/\/chatgpt\.com\/">2\. Abrir ChatGPT/);
 assert.match(html,/href="https:\/\/gemini\.google\.com\/app">2\. Abrir Gemini/);
 assert.match(html,/data-copy-open="chatgpt">1\. Copiar para ChatGPT/);
 assert.match(html,/data-copy-open="gemini">1\. Copiar para Gemini/);
});
test('private prompts never go in provider URLs',()=>{
 assert.doesNotMatch(js,/encodeURIComponent\(text\)|chatgpt\.com\/\?q=|gemini\.google\.com\/app\?q=/);
});
