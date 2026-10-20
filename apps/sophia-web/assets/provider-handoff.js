// SophIA 1.0.0 — reliable, explicit provider links.
// A website cannot guarantee an installed app launch or preserve activation across await.
// Use provider HTTPS URLs only; the OS decides whether to offer the native app.
export const PROVIDERS = Object.freeze({
  chatgpt: Object.freeze({web:'https://chatgpt.com/',label:'ChatGPT'}),
  gemini: Object.freeze({web:'https://gemini.google.com/app',label:'Gemini'})
});
export function planProviderOpen(provider,userAgent='') {
  const p=PROVIDERS[provider];
  if(!p)throw new Error('Provedor desconhecido');
  // A direct, user-activated anchor is more reliable than a custom-scheme navigation
  // initiated after an asynchronous clipboard operation.
  return {href:p.web,target:'_blank',mode:'https',web:p.web,label:p.label};
}
export function needsExplicitOpen(){return true;}
export function detectProvider(href){
  try{const u=new URL(href);if(u.protocol!=='https:')return null;
    return u.hostname==='chatgpt.com'?'chatgpt':u.hostname==='gemini.google.com'?'gemini':null;
  }catch{return null;}
}
export function installProviderLinks(doc=document,agent=navigator.userAgent){
  const links=doc.querySelectorAll('a[href^="https://chatgpt.com/"],a[href^="https://gemini.google.com/"]');
  for(const link of links){
    const provider=detectProvider(link.href);if(!provider)continue;
    const plan=planProviderOpen(provider,agent);
    link.href=plan.href;
    link.target=plan.target;
    link.rel='noopener noreferrer';
    link.setAttribute('aria-label',`Abrir ${plan.label} na página oficial ou no aplicativo, quando suportado`);
  }
}
if(typeof document!=='undefined')installProviderLinks();
