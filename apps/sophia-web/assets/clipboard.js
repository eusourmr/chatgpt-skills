// Copy is explicit and performed while the user's click activation is active.
// First try selected-text legacy copy synchronously; then the modern asynchronous API.
// Never open an external provider from this module.
export async function copyWithFallback(text,{legacyCopy,modernCopy}={}){
  if(!String(text||'').trim())return {ok:false,method:'empty'};
  try{if(typeof legacyCopy==='function'&&legacyCopy()===true)return {ok:true,method:'legacy'};}catch{}
  try{if(typeof modernCopy==='function'){
    await modernCopy(String(text));
    return {ok:true,method:'modern'};
  }}catch{}
  return {ok:false,method:'manual'};
}
