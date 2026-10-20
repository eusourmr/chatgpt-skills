import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {planProviderOpen,detectProvider,needsExplicitOpen} from '../assets/provider-handoff.js';
const ua=['Mozilla/5.0 (Linux; Android 15; Pixel 8) Chrome/125.0.0.0 Mobile Safari/537.36','Mozilla/5.0 (iPhone; CPU iPhone OS 18_5) Version/18.5 Mobile Safari/604.1','Mozilla/5.0 (Windows NT 10.0) Chrome/125.0.0.0'];
test('all platforms get safe official HTTPS links rather than fragile intent redirects',()=>{
  for(const agent of ua){
    const g=planProviderOpen('chatgpt',agent),m=planProviderOpen('gemini',agent);
    assert.equal(g.href,'https://chatgpt.com/');assert.equal(m.href,'https://gemini.google.com/app');
    for(const plan of [g,m]){assert.equal(plan.mode,'https');assert.equal(plan.target,'_blank');assert.ok(!plan.href.includes('?q='));}
  }
});
test('only official provider hosts are accepted',()=>{
 assert.equal(detectProvider('https://chatgpt.com/'),'chatgpt');
 assert.equal(detectProvider('https://gemini.google.com/app'),'gemini');
 assert.equal(detectProvider('https://evil.example/'),null);
 assert.throws(()=>planProviderOpen('evil',''));
});
test('the app cannot claim guaranteed native launch',()=>{
 assert.equal(needsExplicitOpen('iPhone'),true);
 const js=readFileSync(new URL('../assets/provider-handoff.js',import.meta.url),'utf8');
 assert.doesNotMatch(js,/location\.assign\s*\(|window\.open\s*\(|setTimeout\s*\(/);
});
