// SophIA 1.1 — deterministic, offline guidance. Not a semantic AI model.
import {normalize} from './router.js';
export const DEPTHS=Object.freeze(['curto','equilibrado','aprofundado']);
export function suggestDepth(input){
  const s=normalize(String(input||'').slice(0,1200));
  if(!s)return {value:'curto',reason:'pedido breve'};
  // Respect explicit simplicity even in long or complex-looking requests.
  if(/\b(resumo|resuma|curto|curta|rapido|rapida|objetivo|objetiva|uma etapa|sem respostas? longas?|sem detalhes|sem detalhamento)\b/.test(s))
    return {value:'curto',reason:'você pediu objetividade'};
  if(/\b(aprofunde|aprofundar|detalhad[oa]s?|detalhamento|detalhadamente|fundamentos|em profundidade)\b/.test(s))
    return {value:'aprofundado',reason:'você pediu aprofundamento'};
  const multiple=/\b(e tambem|alem disso|ao mesmo tempo|primeiro.*depois|vantagens.*desvantagens|pros.*contras)\b/.test(s);
  if(s.length>=180||multiple)
    return {value:'equilibrado',reason:'o pedido reúne mais contexto'};
  return {value:'curto',reason:'começar com a menor ação útil'};
}
export function describeGuidance(routing,depth,{automatic=false,personalized=false}={}){
  const prefix=routing?.status==='choice'?'Há dois caminhos editoriais possíveis. ':routing?.status==='match'?'Um método editorial foi sugerido. ':'Vamos pelo caminho direto. ';
  const title=depth==='aprofundado'?'aprofundado':depth==='equilibrado'?'equilibrado':'curto';
  const end=personalized?'Seu estilo salvo foi respeitado.':automatic?'O formato foi sugerido por regras locais; você pode alterá-lo.':'Você escolhe o formato e pode editá-lo.';
  return prefix+'Formato '+title+'. '+end;
}
