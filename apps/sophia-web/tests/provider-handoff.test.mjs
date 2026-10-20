import { test } from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {planProviderOpen,detectProvider} from '../assets/provider-handoff.js';
const uaAndroid='Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 Chrome/125.0.0.0 Mobile Safari/537.36';
const uaSamsung='Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/125.0.0.0 SamsungBrowser/27.0 Safari/537.36';
const uaIOS='Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 Version/18.5 Mobile/15E148 Safari/604.1';
const uaDesktop='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36';
test('Android Chrome uses a single verified-package intent for ChatGPT and Gemini',()=>{
  for(const [provider,pkg] of [['chatgpt','com.openai.chatgpt'],['gemini','com.google.android.apps.bard']]){
    const plan=planProviderOpen(provider,uaAndroid);
    assert.equal(plan.mode,'intent');assert.equal(plan.target,'_self');
    assert.match(plan.href,new RegExp('package='+pkg.replaceAll('.','\\.')));
    assert.ok(!plan.href.includes('S.browser_fallback_url'));
    assert.ok(!plan.href.includes('?q='));
  }
});
test('iOS/other Android: normal HTTPS same-window navigation, not a second tab',()=>{
  for(const ua of [uaIOS,uaSamsung]){
    for(const provider of ['chatgpt','gemini']){
      const plan=planProviderOpen(provider,ua);
      assert.equal(plan.mode,'https');assert.equal(plan.target,'_self');
      assert.ok(plan.href.startsWith('https://'));
    }
  }
});
test('desktop retains independent web tab, with fixed official destinations',()=>{
  assert.equal(planProviderOpen('chatgpt',uaDesktop).href,'https://chatgpt.com/');
  assert.equal(planProviderOpen('gemini',uaDesktop).href,'https://gemini.google.com/app');
  assert.equal(planProviderOpen('gemini',uaDesktop).target,'_blank');
});
test('only official hosts accepted, no automatic navigation or timer-based fallback',()=>{
  assert.equal(detectProvider('https://gemini.google.com/app'),'gemini');
  assert.equal(detectProvider('https://chatgpt.com/'),'chatgpt');
  assert.equal(detectProvider('https://attacker.example/'),null);
  assert.throws(()=>planProviderOpen('other',uaAndroid));
  const js=readFileSync(new URL('../assets/provider-handoff.js',import.meta.url),'utf-8');
  assert.doesNotMatch(js,/setTimeout\s*\(|window\.open\s*\(|location\.assign\s*\(/);
  assert.match(js,/alternative\.href=plan\.web/);
});
