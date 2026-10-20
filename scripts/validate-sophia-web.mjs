#!/usr/bin/env node
/**
 * SophIA Web source-integrity gate. No dependencies; no network; no user data.
 * This validator checks the exact distributable assets, CSP hashes and absence
 * of obvious secrets. It does not replace real browser or user-journey testing.
 */
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'apps', 'sophia-web');
const required = [
  'LEIA-ME-INSTALAR.txt',
  'TESTES-E-VALIDACAO.txt',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'identidade/icone-lanterna.png',
  'identidade/logo-oficial.png',
  'index.html',
  'manifest.webmanifest',
  'privacidade.html',
  'sw.js'
];
const errors = [];
const check = (ok, msg) => { if (!ok) errors.push(msg); };
const sha = data => createHash('sha256').update(data).digest('hex');
const read = name => readFile(path.join(site, name));
let manifest = '';
try {
  manifest = (await read('CHECKSUMS.sha256')).toString('utf8');
} catch {
  errors.push('CHECKSUMS.sha256 ausente: copie o pacote completo da Alpha 0.5 para apps/sophia-web/');
}
const records = new Map();
for (const line of manifest.trim().split(/\r?\n/).filter(Boolean)) {
  const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
  if (!match) { errors.push('checksum inválido: ' + line.slice(0, 100)); continue; }
  const filename = match[2];
  if (filename.startsWith('/') || filename.includes('..') || filename.includes('\\')) {
    errors.push('caminho inválido no checksum: ' + filename);
    continue;
  }
  check(!records.has(filename), 'checksum duplicado: ' + filename);
  records.set(filename, match[1]);
}
check(records.size === required.length, 'checksum deve conter precisamente os 10 arquivos de distribuição');
for (const filename of required) {
  check(records.has(filename), 'arquivo ausente no inventário: ' + filename);
  try {
    const data = await read(filename);
    check(sha(data) === records.get(filename), 'integridade divergente: ' + filename);
    check((await stat(path.join(site, filename))).isFile(), 'não é arquivo regular: ' + filename);
  } catch {
    errors.push('arquivo não encontrado: ' + filename);
  }
}

const readText = async filename => {
  try { return (await read(filename)).toString('utf8'); }
  catch { return ''; }
};
const html = await readText('index.html');
const privacy = await readText('privacidade.html');
const sw = await readText('sw.js');
const appManifestText = await readText('manifest.webmanifest');
const documentType = /<!doctype html>/i;
check(documentType.test(html) && documentType.test(privacy), 'páginas devem ter HTML completo');
check(/<html lang="pt-BR">/i.test(html), 'index precisa declarar pt-BR');
check(html.includes('SophIA') && html.includes('ChatGPT') && html.includes('Gemini'), 'marca ou bridge ausente');
check(html.includes('Content-Security-Policy'), 'CSP ausente');
check(!/unsafe-inline|unsafe-eval/i.test(html), 'não liberar unsafe-inline/unsafe-eval');
for (const [tag, directive] of [['style','style-src'], ['script','script-src']]) {
  const matches = [...html.matchAll(new RegExp('<' + tag + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + tag + '>', 'gi'))];
  check(matches.length === 1, 'esperado exatamente um ' + tag + ' inline');
  if (matches.length === 1) {
    const digest = createHash('sha256').update(matches[0][1], 'utf8').digest('base64');
    check(html.includes(directive + " 'sha256-" + digest + "'"), 'hash CSP incorreto para ' + tag);
  }
}
check(!/(?:sk-proj-|sk-[a-zA-Z0-9]{25,}|AIza[0-9A-Za-z_-]{20,})/.test(html + privacy + sw),
  'possível credencial de API no frontend');
check(!/<form[^>]*\baction\s*=\s*["']https?:/i.test(html), 'formulário não deve enviar para domínio externo');
check(sw.includes('sophia-static-alpha-0.5') && sw.includes('self.location.origin'),
  'service worker precisa ser isolado e versionado');
check(!sw.includes('localStorage'), 'service worker não pode salvar rascunhos');
try {
  const m = JSON.parse(appManifestText);
  check(m.name?.startsWith('SophIA'), 'nome da PWA incorreto');
  check(m.start_url === './index.html' && m.scope === './', 'PWA precisa funcionar em subdiretórios');
  check(m.icons?.length >= 2, 'PWA precisa de ícones');
} catch { errors.push('manifest.webmanifest inválido'); }
check((Buffer.byteLength(html, 'utf8') < 150_000), 'HTML ultrapassou o orçamento de 150 KB');
check(privacy.toLowerCase().includes('privacidade'), 'página de privacidade ausente');
if (errors.length) {
  console.error('SophIA Web validation FAILED:\n' + errors.map(x=>'- '+x).join('\n'));
  process.exitCode = 1;
} else {
  console.log('SophIA Web Alpha 0.5 PASS — 10 arquivos íntegros; CSP, PWA, limites e privacidade conferidos.');
  console.log('A validação de UX/responsividade ainda exige navegador e dispositivos reais.');
}