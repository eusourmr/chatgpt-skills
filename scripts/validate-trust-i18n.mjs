#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const locales=['en','pt-BR','es','fr'];
const docs={};
for(const locale of locales){
  docs[locale]=JSON.parse(await readFile(path.join(root,'i18n','trust',`${locale}.json`),'utf8'));
}
const errors=[];
const expect=(ok,msg)=>{if(!ok)errors.push(msg)};
const canonical=docs.en;
expect(canonical.canonical===true,'English trust vocabulary must be canonical');
for(const locale of locales){
  const doc=docs[locale];
  expect(doc.schema_version===1,`${locale}: schema_version must be 1`);
  expect(doc.locale===locale,`${locale}: locale mismatch`);
  expect(typeof doc.review_state==='string'&&doc.review_state.length>0,`${locale}: review_state required`);
  for(const section of ['evidence_states','recommendation_states','risk_dimensions']){
    const expected=Object.keys(canonical[section]).sort();
    const actual=Object.keys(doc[section]??{}).sort();
    expect(JSON.stringify(actual)===JSON.stringify(expected),`${locale}: ${section} keys must match canonical English`);
    for(const key of expected){
      expect(typeof doc[section]?.[key]==='string'&&doc[section][key].trim().length>0,`${locale}: ${section}.${key} translation required`);
    }
  }
}
if(errors.length){
  console.error('Trust i18n validation failed:');
  for(const e of errors)console.error(`- ${e}`);
  process.exit(1);
}
console.log(`Trust i18n OK: ${locales.join(', ')}; non-English review states remain explicit`);
