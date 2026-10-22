#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.join(process.cwd(),'apps/sophia-web');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const h=read('index.html');
const style=h.match(/<style>([\s\S]*?)<\/style>/)?.[1];
const script=h.match(/<script type="module">([\s\S]*?)<\/script>/)?.[1];
if(!style||!script)throw Error('Missing bundled CSS or JS');
const sha=s=>createHash('sha256').update(s).digest('base64');
if(!h.includes(`style-src 'sha256-${sha(style)}'`)||!h.includes(`script-src 'self' 'sha256-${sha(script)}'`))throw Error('Invalid CSP hashes');
for(const file of ['assets/launcher.js','assets/flow-guidance.js','assets/clipboard.js','assets/router.js','assets/skill-index.json','assets/catalog-baseline.json','assets/catalog-manifest.json','assets/catalog-loader.js','manifest.webmanifest','sw.js','privacidade.html','icons/icon-192.png','icons/icon-512.png','identidade/icone-lanterna.png']) if(!fs.existsSync(path.join(root,file)))throw Error('Missing '+file);
for(const text of ['https://chatgpt.com/','https://gemini.google.com/app'])if(!h.includes(text))throw Error('Missing official provider URL');
if(h.includes('chatgpt.com/?q=')||h.includes('gemini.google.com/app?q='))throw Error('No prompt data in URL');
if(/(?:api[_-]?key|secret[_-]?key)\s*[:=]\s*['"][A-Za-z0-9_-]{20}/i.test(h))throw Error('Possible embedded secret');
console.log('PASS — SophIA static assets/CSP/links');
