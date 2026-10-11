import test from 'node:test';
import assert from 'node:assert/strict';
import { searchRegistry, getCapability, getEvidenceView } from '../lib/registry.mjs';

const registry={
  schema_version:2,
  entries:[
    {
      id:'simple-mode',name:'simple-mode',category:'personalization',
      summary:'Plain language and short steps',playbook:'Use plain language.',
      distribution_state:'public',evidence_state:'designed',freshness_state:'current',
      execution_mode:'chat-native',permission_profile:'chat-native/no-external-access-by-default',
      required_capabilities:[],source_sha256:'a'.repeat(64)
    },
    {
      id:'scam-checker',name:'scam-checker',category:'digital-safety',
      summary:'Assess suspicious messages and offers',playbook:'Check observable warning signs.',
      distribution_state:'public',evidence_state:'designed',freshness_state:'current',
      execution_mode:'chat-native',permission_profile:'chat-native/no-external-access-by-default',
      required_capabilities:[],source_sha256:'b'.repeat(64)
    }
  ]
};

test('searchRegistry finds relevant capability',()=>{
  const result=searchRegistry(registry,{query:'golpe suspicious',limit:5});
  assert.equal(result[0].id,'scam-checker');
});

test('getCapability returns exact id only',()=>{
  assert.equal(getCapability(registry,'simple-mode').id,'simple-mode');
  assert.equal(getCapability(registry,'missing'),null);
});

test('evidence view excludes playbook content',()=>{
  const evidence=getEvidenceView(registry.entries[0]);
  assert.equal(evidence.id,'simple-mode');
  assert.equal('playbook' in evidence,false);
});
