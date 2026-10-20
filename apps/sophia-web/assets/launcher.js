import {readGovernedCatalog,trustedShareId,shareMethodUrl} from './catalog-loader.js';
import {planProviderOpen} from './provider-handoff.js';
import {copyWithFallback} from './clipboard.js';
import {suggestDepth,describeGuidance} from './flow-guidance.js';
import {OUTCOMES,emptyPreferences,loadPreferences,savePreferences,clearPreferences,recordOutcome,orderAmbiguousOptions,feedbackPrompt} from './feedback.js';
import {normalize,route,compose,validateCatalog,classifyRisk,clarify,composeFollowUp} from './router.js';
const $=id=>document.getElementById(id);
const field=$('launcher-query'),status=$('launcher-status'),result=$('launcher-result'),choice=$('launcher-choices'),badge=$('launcher-method'),preview=$('launcher-preview'),depth=$('launcher-depth');
let currentEntries=[],selected=null, currentRoute=null;
let initialSharedMethod=null;
let manualDepth=false,previewDirty=false,pendingMethod=null,automaticDepth=false;
const guidance=$('launcher-context'),applyChanges=$('launcher-regenerate');
let preferences=emptyPreferences();let remember=false;let ratedThisRequest=false;
const safeStorage=()=>{try{return window.localStorage;}catch{return null;}};
const feedbackPanel=$('launcher-feedback'), feedbackResult=$('launcher-feedback-result');
const feedbackNote=$('launcher-feedback-note'),rememberCheck=$('launcher-remember');
const feedbackButtons=[...document.querySelectorAll('[data-outcome]')];
const profileIds=()=>currentEntries.map(e=>e.id);
function storeOptional(){if(!remember)return false;preferences.depth=depth.value;return savePreferences(safeStorage(),preferences,profileIds());}
function resetFeedback(){
  feedbackPanel.hidden=true;
  ratedThisRequest=false;
  feedbackResult.hidden=true;
  feedbackNote.value='';
  for(const button of feedbackButtons)button.setAttribute('aria-pressed','false');
}

let pendingClarification=false;
const clarBox=$('launcher-clarify'),clarInput=$('launcher-clarify-input'),clarQuestion=$('launcher-clarify-question');
const show=(message)=>{status.textContent=message;};
const nextProvider=$('launcher-next-provider');
function clearProviderContinuation(){nextProvider.hidden=true;nextProvider.removeAttribute('href');}
function selectPreview(){preview.focus({preventScroll:true});preview.select();}
async function copyPreview(){
  // execCommand is deprecated, but still a useful synchronous compatibility fallback
  // on browser versions where Clipboard.writeText is unavailable or denied.
  return copyWithFallback(preview.value,{
    legacyCopy:()=>{selectPreview();return document.execCommand?.('copy')===true;},
    modernCopy:window.isSecureContext&&navigator.clipboard?.writeText
      ? text=>navigator.clipboard.writeText(text):null
  });
}

function focusResult(){
  $('launcher-result-title').focus({preventScroll:true});
  result.scrollIntoView({behavior:'smooth',block:'start'});
}
// Explicit link is used on Safari; remain usable as fallback after a blocked auto-open.
function offerProviderContinuation(plan){
  nextProvider.href=plan.href;
  nextProvider.textContent='Agora abrir '+plan.label+' ↗';
  if(plan.target==='_blank')nextProvider.target='_blank';else nextProvider.removeAttribute('target');
  nextProvider.rel='noopener noreferrer';
  nextProvider.hidden=false;
  nextProvider.focus({preventScroll:true});
}

async function start(){
 try{
  const {entries,status:catalogStatus}=await readGovernedCatalog();
  currentEntries=entries;
  const existing=loadPreferences(safeStorage(),profileIds());
  if(existing){preferences=existing;remember=true;rememberCheck.checked=true;depth.value=existing.depth;}
  initialSharedMethod=trustedShareId(window.location.search,currentEntries);
  if(initialSharedMethod){
    show(`Link público recebido: ${initialSharedMethod.title}. Escreva sua necessidade; a SophIA verificará se o método é adequado.`);
    field.focus();
  }else{
    show(catalogStatus==='verified'?'Catálogo verificado. Nenhuma skill é executada aqui.':'Usando catálogo de segurança local; a atualização não pôde ser validada.');
  }
 }catch(e){
  currentEntries=[];
  show('Catálogo de confiança indisponível. Use o modo direto; nenhuma skill será sugerida.');
 }
}

function render(){
 const q=field.value.trim();
 if(!q){field.setCustomValidity('Conte em uma frase o que você precisa.');field.reportValidity();field.focus();return}
 field.setCustomValidity('');
 resetFeedback();clearProviderContinuation();
 previewDirty=false;pendingMethod=null;applyChanges.hidden=true;
 const necessary=clarify(q);
 if(necessary && !pendingClarification){
   clarQuestion.textContent=necessary;clarBox.hidden=false;clarInput.focus();result.hidden=true;
   show('Uma informação curta vai evitar uma orientação genérica.');return;
 }
 clarBox.hidden=true;pendingClarification=false;
 currentRoute=orderAmbiguousOptions(route(q,currentEntries),preferences);selected=null;choice.replaceChildren();result.hidden=false;
 if(!remember&&!manualDepth){const depthHint=suggestDepth(q);depth.value=depthHint.value;automaticDepth=true;}else automaticDepth=false;
 if(currentRoute.status==='urgent'){
  badge.textContent='Precisa de atenção imediata — sem roteamento automático';
  show(currentRoute.reason);preview.value='';$('launcher-actions').hidden=true;$('launcher-share').hidden=true;
  guidance.textContent='Este caso pode exigir ajuda imediata. Nenhuma orientação foi preparada.';
  focusResult();return;
 }
 feedbackPanel.hidden=false;
 if(currentRoute.status==='choice'){
  const heading=document.createElement('p');heading.textContent='Encontrei dois caminhos possíveis. Escolha um, ou siga sem especialização:';choice.appendChild(heading);
  for(const option of currentRoute.options){
    const btn=document.createElement('button');btn.type='button';btn.className='launcher-choice';
    btn.textContent=option.title;btn.addEventListener('click',()=>chooseMethod(option.entry,option.title));choice.appendChild(btn);
  }
  const no=document.createElement('button');no.type='button';no.className='launcher-choice';no.textContent='Sem método especializado';no.addEventListener('click',()=>chooseMethod(null,'Sem método especializado'));choice.appendChild(no);
  update(null,false);
  badge.textContent='Dois caminhos possíveis · você decide';
  }else{
  if(currentRoute.status==='match'){
    const no=document.createElement('button');no.type='button';no.className='launcher-choice launcher-no-method';
    no.textContent='Sem método especializado';no.addEventListener('click',()=>{
      chooseMethod(null,'Sem método especializado');
    });choice.appendChild(no);
  }
  update(currentRoute.status==='match'?currentRoute.options[0].entry:null,false);
 }
 show(currentRoute.reason);
 focusResult();
}
function chooseMethod(entry,label){
 if(previewDirty){pendingMethod={entry};applyChanges.hidden=false;show('Sua edição foi preservada. Para aplicar “'+label+'”, toque em Aplicar mudanças.');return;}
 update(entry);show('Método selecionado: '+label+'. Revise a orientação.');preview.focus({preventScroll:true});
}
function update(entry,resetBadge=true){
 selected=entry;pendingMethod=null;previewDirty=false;applyChanges.hidden=true;
 const q=field.value.trim();preview.value=compose(q,entry,depth.value);
 $('launcher-actions').hidden=false;
 $('launcher-share').hidden=!entry;
 guidance.textContent=describeGuidance(currentRoute,depth.value,{automatic:automaticDepth,personalized:remember});
 if(resetBadge || currentRoute?.status!=='choice'){
  badge.textContent=entry?`Sugestão: ${entry.title} · apenas catálogo · ${entry.evidence_state}`:'Sem skill especializada · resposta direta';
 }
 for(const b of choice.querySelectorAll('button')){
  b.setAttribute('aria-pressed',String((entry?b.textContent===entry.title:b.textContent==='Sem método especializado')));
 }
}
$('launcher-find').addEventListener('click',render);
field.addEventListener('input',()=>{clearProviderContinuation();field.setCustomValidity('');if(!clarBox.hidden){clarBox.hidden=true;pendingClarification=false;}if(!result.hidden){result.hidden=true;resetFeedback();}});
$('launcher-clarify-go').addEventListener('click',()=>{
 const extra=clarInput.value.trim();if(!extra){clarInput.focus();return;}
 field.value=(field.value.trim()+' — Objetivo: '+extra).slice(0,1200);
 pendingClarification=true;clarInput.value='';render();
});
clarInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('launcher-clarify-go').click();}});
field.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter')render();});
depth.addEventListener('change',()=>{
 manualDepth=true;automaticDepth=false;storeOptional();
 if(result.hidden||currentRoute?.status==='urgent')return;
 if(previewDirty){applyChanges.hidden=false;show('Seu texto editado foi preservado. Toque em Aplicar mudanças para usar o novo formato.');}
 else update(selected);
});
preview.addEventListener('input',()=>{if(!result.hidden){previewDirty=true;}});
applyChanges.addEventListener('click',()=>{
 if(result.hidden||currentRoute?.status==='urgent')return;
 update(pendingMethod?pendingMethod.entry:selected);
 show('Nova orientação preparada. Revise o texto antes de copiar.');
 preview.focus({preventScroll:true});
});
document.querySelectorAll('[data-launch-example]').forEach(b=>b.addEventListener('click',()=>{field.value=b.dataset.launchExample;clearProviderContinuation();result.hidden=true;clarBox.hidden=true;resetFeedback();field.focus();}));
$('launcher-copy').addEventListener('click',async()=>{
 const result=await copyPreview();
 if(result.ok)show('Texto copiado. Toque em Abrir ChatGPT ou Abrir Gemini e cole na conversa.');
 else {selectPreview();show('Cópia automática não disponível. O texto foi selecionado: copie manualmente e toque em Abrir ChatGPT ou Abrir Gemini.');}
});
$('launcher-select').addEventListener('click',()=>{selectPreview();show('Texto selecionado. Copie e cole na IA de sua preferência.');});

// Only explicit user click, only public method IDs in links; personal text is never in a URL.
$('launcher-share').addEventListener('click',async()=>{
 if(!selected)return;
 const url=shareMethodUrl(window.location.href,selected.id,currentEntries);
 try{
  if(!navigator.clipboard||!window.isSecureContext)throw Error('Clipboard denied');
  await navigator.clipboard.writeText(url);
  show('Link público do método copiado. Nenhuma pergunta ou resposta foi incluída.');
 }catch{
  const previous=preview.value;
  preview.value=url;preview.focus();preview.select();
  show('Link público selecionado. Use Copiar e depois retorne à sua orientação.');
  // Never overwrite user-entered text during a failed clipboard operation without recovery.
  $('launcher-restore-preview').hidden=false;
  $('launcher-restore-preview').onclick=()=>{preview.value=previous;$('launcher-restore-preview').hidden=true;};
 }
});
// Copy and open are deliberately separate user gestures. Never navigate after await.
for(const btn of document.querySelectorAll('[data-copy-open]'))btn.addEventListener('click',async()=>{
  if(result.hidden||currentRoute?.status==='urgent')return;
  const plan=planProviderOpen(btn.dataset.copyOpen,navigator.userAgent);
  const copied=await copyPreview();
  if(copied.ok){
    offerProviderContinuation(plan);
    show('Orientação copiada. Agora toque em “Abrir '+plan.label+'” e cole a mensagem.');
  }else{
    clearProviderContinuation();
    selectPreview();
    show('Não foi possível copiar automaticamente. Copie o texto selecionado e use o link “Abrir '+plan.label+'” logo abaixo.');
  }
});

start();


// Continue in the visitor's own AI: user chooses whether to paste an earlier answer.
document.querySelectorAll('[data-follow]').forEach(button=>button.addEventListener('click',()=>{
  if(result.hidden||currentRoute?.status==='urgent')return;
  preview.value=composeFollowUp(field.value,button.dataset.follow,$('launcher-ai-response').value,selected,depth.value);
  previewDirty=false;pendingMethod=null;applyChanges.hidden=true;
  $('launcher-actions').hidden=false;
  show('Nova orientação preparada. Revise, copie e cole na sua própria IA.');
  preview.focus();preview.scrollIntoView({block:'center',behavior:'smooth'});
}));

// OS/browser controls external link capture. A website cannot guarantee opening an installed app.
const installButton=$('pwa-install-button'),appHint=$('pwa-install-hint');
const appMode=()=>matchMedia('(display-mode: standalone)').matches || navigator.standalone===true;
let deferredInstall=null;
function updateAppHint(){
 if(appMode()){
   appHint.textContent='Você está usando a SophIA instalada como aplicativo.';
   installButton.hidden=true;
 }else if(/iPad|iPhone|iPod/.test(navigator.userAgent)){
   appHint.textContent='No iPhone/iPad, abra a SophIA pelo ícone na Tela de Início. Links externos podem abrir no Safari.';
 }else{
   appHint.textContent='Se já instalou, abra pelo ícone SophIA na tela inicial, dock ou menu de aplicativos. Links externos dependem do navegador.';
 }
}
window.addEventListener('beforeinstallprompt',event=>{
 event.preventDefault();deferredInstall=event;
 if(!appMode())installButton.hidden=false;
});
installButton.addEventListener('click',async()=>{
 if(!deferredInstall)return;
 const prompt=deferredInstall;deferredInstall=null;
 installButton.hidden=true;
 try {await prompt.prompt();await prompt.userChoice;}catch(e){/* Browser controls its own installation UI. */}
 updateAppHint();
});
window.addEventListener('appinstalled',()=>{deferredInstall=null;installButton.hidden=true;updateAppHint();});
// A supported installed app reuses the already open window without discarding the current text.
if('launchQueue' in window && typeof window.launchQueue?.setConsumer==='function'){
 window.launchQueue.setConsumer(()=>{if(appMode())field.focus();});
}
updateAppHint();

// Explicit, self-reported feedback. Never claim that an external action was verified.
function reportOutcome(outcome){
  if(!OUTCOMES.includes(outcome)||result.hidden||currentRoute?.status==='urgent')return;
  for(const btn of feedbackButtons)btn.setAttribute('aria-pressed',String(btn.dataset.outcome===outcome));
  const text=feedbackPrompt({query:field.value,outcome,entry:selected,note:feedbackNote.value,
    answer:$('launcher-ai-response').value,depth:depth.value});
  preview.value=text;
  previewDirty=false;pendingMethod=null;applyChanges.hidden=true;
  $('launcher-actions').hidden=false;
  feedbackResult.hidden=false;
  const notes={done:'Você relatou que conseguiu avançar. Preparei uma verificação final, sem presumir que o resultado foi confirmado.',
    partial:'Você relatou progresso parcial. Preparei uma ação pequena para resolver o que falta.',
    blocked:'Você relatou um bloqueio. Preparei um caminho alternativo, sem insistir automaticamente na mesma estratégia.'};
  feedbackResult.textContent=notes[outcome]+' Revise o texto acima, copie e continue na sua própria IA.';
  if(remember&&selected&&!ratedThisRequest){preferences=recordOutcome(preferences,selected.id,outcome,profileIds());ratedThisRequest=storeOptional();}
  show('Acompanhamento pronto para revisão e cópia. Nenhum resultado foi enviado ou verificado.');
  preview.scrollIntoView({block:'center',behavior:'smooth'});
}
for(const btn of feedbackButtons)btn.addEventListener('click',()=>reportOutcome(btn.dataset.outcome));
rememberCheck.addEventListener('change',()=>{
  remember=rememberCheck.checked;
  if(remember){if(storeOptional()){show('Somente estilo e contadores de avaliação serão guardados neste dispositivo.');}else{remember=false;rememberCheck.checked=false;show('O navegador não permitiu salvar preferências. Tudo continuará sem armazenamento.');}}
  else{clearPreferences(safeStorage());preferences=emptyPreferences();show('Preferências guardadas apagadas. Nenhum histórico de conversa foi armazenado.');}
});
$('launcher-reset-preferences').addEventListener('click',()=>{
  clearPreferences(safeStorage());preferences=emptyPreferences();remember=false;rememberCheck.checked=false;
  show('Preferências locais apagadas.');
});
