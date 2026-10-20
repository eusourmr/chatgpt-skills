import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../assets/launcher.js',import.meta.url),'utf8');
test('copy and open never includes personal text in an URL',()=>{
 assert.match(source,/await navigator\.clipboard\.writeText\(text\)/);
 assert.match(source,/if\(!navigator\.clipboard/);
 assert.match(source,/window\.location\.assign\(plan\.href\)/);
 assert.doesNotMatch(source,/chatgpt\.com\/\?q=|gemini\.google\.com\/app\?q=|encodeURIComponent\(text\)/);
});
test('copy fails closed before navigating',()=>{
 const start=source.indexOf("for(const btn of document.querySelectorAll('[data-copy-open]'))");
 const end=source.indexOf('start();',start); // code at tail; -1 acceptable
 const block=source.slice(start,end>0?end:undefined);
 assert.ok(block.indexOf('await navigator.clipboard.writeText(text)')<block.indexOf('window.location.assign(plan.href)'));
 assert.match(block,/catch\{\s*preview\.focus\(\);preview\.select\(\);/);
});
