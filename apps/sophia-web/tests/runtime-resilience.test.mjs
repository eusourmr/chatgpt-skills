import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {emptyPreferences,loadPreferences,savePreferences,clearPreferences} from '../assets/feedback.js';

test('full or forbidden device storage fails closed without interrupting the application',()=>{
  const denied={getItem(){throw new Error('SecurityError');},setItem(){throw new Error('QuotaExceededError');},removeItem(){throw new Error('SecurityError');}};
  assert.equal(loadPreferences(denied,[]),null);
  assert.equal(savePreferences(denied,emptyPreferences(),[]),false);
  assert.equal(clearPreferences(denied),false);
});
test('offline PWA pre-cache contains baseline, live catalog, router and launcher',()=>{
  const sw=readFileSync(new URL('../sw.js',import.meta.url),'utf8');
  for(const file of ['assets/catalog-baseline.json','assets/catalog-manifest.json','assets/skill-index.json','assets/catalog-loader.js','assets/router.js','assets/launcher.js']){
    assert.ok(sw.includes("'./"+file+"'"),file+' not pre-cached');
  }
  assert.match(sw,/caches\.match\(key\)/);
});
