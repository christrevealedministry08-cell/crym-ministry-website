const nav = document.getElementById('nav');
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');
function showPage(name){
  pages.forEach(p=>p.classList.toggle('visible',p.id === `page-${name}`));
  navItems.forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  nav.classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
navItems.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.go)));
document.getElementById('menuBtn').addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.version').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.version').forEach(x=>x.classList.toggle('active',x===b));
  const isNiv=b.dataset.version==='NIV';
  document.getElementById('nivNotice').classList.toggle('hidden',!isNiv);
  document.getElementById('verseText').classList.toggle('hidden',isNiv);
  document.getElementById('verseCredit').classList.toggle('hidden',isNiv);
}));
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async()=>{
    try { await navigator.serviceWorker.register('./service-worker.js'); }
    catch(e) { console.log('Offline caching is unavailable in this preview environment.'); }
  });
}
const status = document.getElementById('offlineStatus');
if(navigator.onLine){status.textContent='You are online. Core pages are designed to be available offline after the app is installed and cached.';}
else{status.textContent='You are offline. Cached app pages and saved content may still be available.';}
window.addEventListener('online',()=>status.textContent='You are online.'); 
window.addEventListener('offline',()=>status.textContent='You are offline. Cached pages may still be available.');
