const CACHE='binimrun-v14';
const FILES=["/","/manifest.webmanifest","/favicon.png","/icons/icon-192.png","/icons/icon-512.png","/icons/apple-touch-icon.png","/a/adem.webp","/a/basin.webp","/a/cit.webp","/a/civciv.webp","/a/giris.webp","/a/hoca_arka.webp","/a/hoca_guc.webp","/a/huni.webp","/a/istifa.webp","/a/kasli.webp","/a/kirpi.webp","/a/kivircik.webp","/a/kus.webp","/a/logo.webp","/a/manken.webp","/a/puan99.webp","/a/saha.webp","/a/ses_arka.mp3","/a/ses_binim1.mp3","/a/ses_guc.mp3","/a/ses_gunduz.mp3","/a/ses_haci.mp3","/a/ses_hakli.mp3","/a/ses_istifa_binim.mp3","/a/ses_lakaka.mp3","/a/ses_kotu.mp3","/a/ses_rekor.mp3","/a/ses_sise.mp3","/a/ses_donus.mp3","/a/ses_yapi.mp3","/a/baskan_arka.webp","/a/hoca_kupa.webp","/a/simsek.webp","/a/sise.webp","/a/top.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url); if(u.origin!==location.origin) return;
  if(r.mode==='navigate'){ e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put("/",cp));return res}).catch(()=>caches.match("/"))); return; }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res})));
});
