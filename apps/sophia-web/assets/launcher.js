import {normalize,route,compose,validateCatalog,classifyRisk,clarify,composeFollowUp} from './router.js';
const $=id=>document.getElementById(id);
const field=$('launcher-query'),status=$('launcher-status'),result=$('launcher-result'),choice=$('launcher-choices'),badge=$('launcher-method'),preview=$('launcher-preview'),depth=$('launcher-depth');
let currentEntries=[],selected=null, currentRoute=null;
let pendingClarification=false;
const clarBox=$('launcher-clarify'),clarInput=$('launcher-clarify-input'),clarQuestion=$('launcher-clarify-question');
const show=(message)=>{status.textContent=message;};
async function start(){
 try{
  const response=await fetch('./assets/skill-index.json',{cache:'no-cache'});
  if(!response.ok) throw Error('HTTP '+response.status);
  const catalog=await response.json();currentEntries=validateCatalog(catalog);
  show('Pronto. Os métodos são sugestões editoriais; nenhum deles é executado aqui.');
 }catch(e){
  currentEntries=[];
  show('Índice indisponível. Você ainda pode preparar uma conversa direta, sem selecionar uma skill.');
 }
}
function render(){
 const q=field.value.trim();
 if(!q){field.setCustomValidity('Conte em uma frase o que você precisa.');field.reportValidity();field.focus();return}
 field.setCustomValidity('');
 const necessary=clarify(q);
 if(necessary && !pendingClarification){
   clarQuestion.textContent=necessary;clarBox.hidden=false;clarInput.focus();result.hidden=true;
   show('Uma informação curta vai evitar uma orientação genérica.');return;
 }
 clarBox.hidden=true;pendingClarification=false;
 currentRoute=route(q,currentEntries);selected=null;choice.replaceChildren();result.hidden=false;
 if(currentRoute.status==='urgent'){
  badge.textContent='Precisa de atenção imediata — sem roteamento automático';
  show(currentRoute.reason);preview.value='';$('launcher-actions').hidden=true;
  result.scrollIntoView({behavior:'smooth',block:'start'});return;
 }
 if(currentRoute.status==='choice'){
  const heading=document.createElement('p');heading.textContent='Encontrei dois caminhos possíveis. Escolha um, ou siga sem especialização:';choice.appendChild(heading);
  for(const option of currentRoute.options){
    const btn=document.createElement('button');btn.type='button';btn.className='launcher-choice';
    btn.textContent=option.title;btn.addEventListener('click',()=>update(option.entry));choice.appendChild(btn);
  }
  const no=document.createElement('button');no.type='button';no.className='launcher-choice';no.textContent='Sem método especializado';no.addEventListener('click',()=>update(null));choice.appendChild(no);
  update(null,false);
  badge.textContent='Dois caminhos possíveis · você decide';
  }else{
  if(currentRoute.status==='match'){
    const no=document.createElement('button');no.type='button';no.className='launcher-choice launcher-no-method';
    no.textContent='Sem método especializado';no.addEventListener('click',()=>{
      update(null);show('Tudo bem: vamos seguir de forma direta, sem método especializado.');
    });choice.appendChild(no);
  }
  update(currentRoute.status==='match'?currentRoute.options[0].entry:null,false);
 }
 show(currentRoute.reason);
 result.scrollIntoView({behavior:'smooth',block:'start'});
}
function update(entry,resetBadge=true){
 selected=entry;
 const q=field.value.trim();preview.value=compose(q,entry,depth.value);
 $('launcher-actions').hidden=false;
 if(resetBadge || currentRoute?.status!=='choice'){
  badge.textContent=entry?`Sugestão: ${entry.title} · apenas catálogo · ${entry.evidence_state}`:'Sem skill especializada · resposta direta';
 }
 for(const b of choice.querySelectorAll('button')){
  b.setAttribute('aria-pressed',String((entry?b.textContent===entry.title:b.textContent==='Sem método especializado')));
 }
}
$('launcher-find').addEventListener('click',render);
field.addEventListener('input',()=>{field.setCustomValidity('');if(!clarBox.hidden){clarBox.hidden=true;pendingClarification=false;}});
$('launcher-clarify-go').addEventListener('click',()=>{
 const extra=clarInput.value.trim();if(!extra){clarInput.focus();return;}
 field.value=(field.value.trim()+' — Objetivo: '+extra).slice(0,1200);
 pendingClarification=true;clarInput.value='';render();
});
clarInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('launcher-clarify-go').click();}});
field.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key==='Enter')render();});
depth.addEventListener('change',()=>{if(!result.hidden && currentRoute?.status!=='urgent')update(selected);});
document.querySelectorAll('[data-launch-example]').forEach(b=>b.addEventListener('click',()=>{field.value=b.dataset.launchExample;result.hidden=true;clarBox.hidden=true;field.focus();}));
$('launcher-copy').addEventListener('click',async()=>{
 const text=preview.value;
 try{
  if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(text);show('Texto copiado. Agora abra a sua IA e cole na conversa.');}
  else throw Error('Clipboard unavailable');
 }catch(e){preview.focus();preview.select();show('Selecionei o texto. Use Ctrl+C (ou Copiar no celular), depois cole na IA.');}
});
$('launcher-select').addEventListener('click',()=>{preview.focus();preview.select();show('Texto selecionado. Copie e cole na IA de sua preferência.');});
start();


// Continue in the visitor's own AI: user chooses whether to paste an earlier answer.
document.querySelectorAll('[data-follow]').forEach(button=>button.addEventListener('click',()=>{
  if(result.hidden||currentRoute?.status==='urgent')return;
  preview.value=composeFollowUp(field.value,button.dataset.follow,$('launcher-ai-response').value,selected,depth.value);
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
