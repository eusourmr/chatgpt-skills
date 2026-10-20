// SophIA 0.7.1 — single-step handoff to visitor's own installed AI app when possible.
// Chrome/Android intent support is conditional; iOS relies on the provider's Universal Links.
// Never retry or redirect with timers: a second navigation can open a web tab after the app.
export const PROVIDERS = Object.freeze({
  chatgpt: Object.freeze({web:'https://chatgpt.com/',package:'com.openai.chatgpt',label:'ChatGPT'}),
  gemini: Object.freeze({web:'https://gemini.google.com/app',package:'com.google.android.apps.bard',label:'Gemini'})
});

export function planProviderOpen(provider,userAgent='') {
  const p=PROVIDERS[provider];
  if(!p) throw new Error('Provedor desconhecido');
  const ua=String(userAgent);
  const android=/Android/i.test(ua);
  const ios=/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && /Mobile/i.test(ua));
  // The documented Android intent mechanism requires a direct user click, Chrome, a
  // BROWSABLE handler and a known package. We deliberately provide no auto fallback.
  const chromeAndroid=android && /Chrome\/\d+/i.test(ua) && !/SamsungBrowser|Firefox|FxiOS|OPR\/|EdgA\//i.test(ua);
  if(chromeAndroid){
    const u=new URL(p.web);
    return {href:`intent://${u.host}${u.pathname}${u.search}#Intent;scheme=https;package=${p.package};action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`,target:'_self',mode:'intent',web:p.web,label:p.label};
  }
  return {href:p.web,target:android||ios?'_self':'_blank',mode:'https',web:p.web,label:p.label};
}
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
    if(plan.target==='_self') link.removeAttribute('target');
    else link.target='_blank';
    link.rel='noopener noreferrer';
    link.setAttribute('aria-label',plan.mode==='intent'?
      `Tentar abrir o aplicativo ${plan.label} instalado`:
      `Abrir ${plan.label} no aplicativo quando disponível, ou no navegador`);
    if(plan.mode==='intent'){
      // No automatic browser fallback. The visitor explicitly decides whether
      // to use the site; the native app must not be followed by a timer redirect.
      link.addEventListener('click',()=>{
        const parent=link.parentElement;
        if(!parent || parent.querySelector(`a[data-web-option="${provider}"]`))return;
        const alternative=doc.createElement('a');
        alternative.href=plan.web;
        alternative.target='_blank';
        alternative.rel='noopener noreferrer';
        alternative.dataset.webOption=provider;
        alternative.className='provider-web-fallback';
        alternative.textContent=`${plan.label} no navegador`;
        alternative.setAttribute('aria-label',`Se o aplicativo não abriu, usar ${plan.label} na versão web`);
        link.insertAdjacentElement('afterend',alternative);
      });
      link.setAttribute('title',`Tentar abrir o aplicativo ${plan.label}. Se não abrir, aparecerá a opção web.`);
    }
  }
}
if(typeof document!=='undefined')installProviderLinks();
