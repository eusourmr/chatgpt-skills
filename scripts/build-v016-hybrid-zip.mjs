#!/usr/bin/env node
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createZip } from '../installer/zip.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const pluginRoot=path.join(root,'plugins','cs-navigator-live');
const plugin=JSON.parse(await readFile(path.join(pluginRoot,'plugin.json'),'utf8'));
const mcp=JSON.parse(await readFile(path.join(pluginRoot,'mcp.json'),'utf8'));
const url=mcp.mcpServers?.registry?.url;

if(plugin.name!=='cs-navigator-live' || plugin.version!=='0.16.0') {
  throw new Error('Unexpected 0.16 hybrid plugin identity.');
}
if(!url || !/^https:\/\//.test(url) || /\.invalid\b/.test(url) || /pending\./.test(url)) {
  throw new Error('A real public HTTPS MCP URL is required before building the submission ZIP.');
}
if(!plugin.extensions?.['com.openai']?.interface?.supportURL) {
  throw new Error('supportURL is required.');
}

async function walk(dir,prefix=''){
  const out=[];
  for(const item of (await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
    const rel=path.posix.join(prefix,item.name);
    if(item.isDirectory()) out.push(...await walk(path.join(dir,item.name),rel));
    else if(item.isFile()) out.push(rel);
  }
  return out;
}

const files=await walk(pluginRoot);
for(const required of [
  'plugin.json','mcp.json','.mcp.json','.codex-plugin/plugin.json',
  'skills/cs-navigator/SKILL.md','skills/get-started/SKILL.md','assets/cs-icon.png'
]){
  if(!files.includes(required)) throw new Error('Missing hybrid plugin file: '+required);
}

if(files.some(f=>f.includes('medical-appointment-prep') || f.includes('caregiver-coordinator'))){
  throw new Error('Healthcare-out-of-scope skill leaked into public package.');
}

const entries=[];
for(const rel of files){
  entries.push({name:path.posix.join('cs-navigator-live',rel),data:await readFile(path.join(pluginRoot,rel))});
}

const zip=createZip(entries);
const outDir=path.join(root,'dist','plugin-submission');
await mkdir(outDir,{recursive:true});
const fileName='cs-navigator-live-plugin-0.16.0.zip';
const outPath=path.join(outDir,fileName);
await writeFile(outPath,zip);
const sha=crypto.createHash('sha256').update(zip).digest('hex');
await writeFile(outPath+'.sha256',sha+'  '+fileName+'\n','utf8');

console.log('Built '+path.relative(root,outPath));
console.log('SHA-256 '+sha);
console.log('Entries '+entries.length);
console.log('MCP '+url);
