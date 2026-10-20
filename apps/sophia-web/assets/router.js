// SophIA 0.6 — pure, dependency-free, privacy-respecting local router.
// Heuristic text matching is NOT semantic understanding and never runs repository skills.
export function normalize(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}
export const DIRECT = Object.freeze({status:'native', options:[], reason:'Ajudar diretamente é suficiente; nenhuma skill foi executada.'});
const riskPatterns = [
  /\b(suicid\w*|automutil\w*|me matar|tirar minha vida|overdose|socorro imediato|emergencia medica)\b/,
  /\b(dor no peito|falta de ar|desmaio|intoxicacao|envenenamento|crise convulsiva)\b/,
];
export function classifyRisk(text) {
  const s=normalize(text);
  return riskPatterns.some(pattern => pattern.test(s)) ? 'urgent' : 'normal';
}
const blockedIds = new Set(['medical-appointment-prep','caregiver-coordinator']);
const stopWords = new Set(['eu','meu','minha','que','qual','quero','preciso','para','isso','como','uma','uns','nao','com','pode','por','fazer','ajuda','ajude','gostaria','voce','ser','tem','ter','mas','depois']);
const commonTrivial = [/^\d+\s*(vezes|x|mais|menos|dividido|\+|\-|\*)\s*\d+\??$/, /^quanto (e|eh) \d+ (vezes|mais|menos|dividido por) \d+\??$/, /^(ola|oi|bom dia|boa tarde|boa noite)\W*$/];
export function validateCatalog(catalog) {
  if (!catalog || catalog.schema_version !== 1 || !Array.isArray(catalog.entries) || catalog.entries.length > 32) throw Error('Índice inválido');
  const ids=new Set();
  for (const entry of catalog.entries) {
    if (!entry || typeof entry.id !== 'string' || !/^[a-z0-9-]{3,80}$/.test(entry.id) || ids.has(entry.id) || blockedIds.has(entry.id)) throw Error('ID duplicado ou indisponível');
    if (entry.delivery_state !== 'registry_only' || entry.editorial_template_state !== 'pilot') throw Error('Estado de entrega inválido');
    for(const key of ['title','method']) if(typeof entry[key]!=='string' || !entry[key] || entry[key].length>1000) throw Error('Campo inválido: '+key);
    if (!Array.isArray(entry.keywords) || !Array.isArray(entry.phrases)) throw Error('Termos inválidos');
    ids.add(entry.id);
  }
  return catalog.entries;
}
export function route(query,entries) {
  const s=normalize(query);
  if(!s) return {...DIRECT,reason:'Descreva primeiro o que você precisa.'};
  if(classifyRisk(s)==='urgent') return {status:'urgent',options:[],reason:'Pode haver urgência. A SophIA não deve encaminhar isso como uma skill: procure serviços de emergência ou atendimento profissional adequado.'};
  if(commonTrivial.some(r=>r.test(s))) return {...DIRECT};
  const words=s.split(' ').filter(w=>!stopWords.has(w));
  const scored=[];
  for(const entry of entries){
    if(entry.delivery_state!=='registry_only' || blockedIds.has(entry.id)) continue;
    let score=0;const hits=[];
    for(const phrase of entry.phrases){const p=normalize(phrase); if(p && s.includes(p)){score+=6;hits.push(p)}}
    for(const kw of entry.keywords){const k=normalize(kw); if(!k) continue;
      if(k.includes(' ')?s.includes(k):words.some(w=>w===k || (k.length>=5 && w.startsWith(k) && w.length-k.length<=5))){score+=2;hits.push(k)}
    }
    if(score>=4) scored.push({id:entry.id,title:entry.title,score,hits:[...new Set(hits)].slice(0,5),entry});
  }
  scored.sort((a,b)=>b.score-a.score || a.id.localeCompare(b.id));
  if(!scored.length) return {...DIRECT,reason:'Não encontrei um método especializado com correspondência suficiente. Uma conversa direta é mais adequada.'};
  const top=scored[0];
  if(scored.length>1 && scored[1].score>=4 && top.score-scored[1].score<=2)
    return {status:'choice',options:scored.slice(0,2),reason:'Há dois métodos plausíveis. Escolha o que melhor representa sua intenção.'};
  return {status:'match',options:[top],reason:'Sugestão por termos e expressões, não por compreensão semântica.'};
}
const styles={curto:'Responda de forma breve. Faça uma pergunta por vez somente se faltar algo essencial. Ao terminar, mostre apenas o próximo passo útil.',equilibrado:'Seja claro e objetivo; explique o necessário e aprofunde somente se isso mudar minha ação.',aprofundado:'Explique os fundamentos quando forem úteis, ainda evitando repetição e excesso. Organize em etapas progressivas.'};
export function compose(query,entry,depth='curto'){
 const q=String(query||'').trim().slice(0,1200);
 const intro=['Preciso de ajuda com a seguinte situação:','--- INÍCIO DO MEU PEDIDO ---',q,'--- FIM DO MEU PEDIDO ---',''];
 const method=entry?['MÉTODO SUGERIDO PARA ESTA CONVERSA',entry.method,'',''] :['MODO DIRETO','Resolva esta necessidade diretamente; não invoque métodos ou ferramentas que não sejam necessários.','',''];
 return [...intro,...method,'COMO QUERO CONVERSAR',styles[depth]||styles.curto,
 'Use linguagem simples e mantenha a precisão. Não trate um catálogo como prova de que uma skill foi instalada ou executada.',
 'Não invente fontes, ações concluídas, normas atuais ou resultados. Se precisar de dados atuais, consulte fontes quando a plataforma permitir; caso contrário, diga o que falta verificar.',
 'Não solicite senhas ou informações pessoais desnecessárias. Comece pela menor ação útil para a minha situação.'].join('\n');
}
