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
async function shareDevotion(button) {
  const card = button.closest('.devotion');

  if (!card) return;

  const title = card.querySelector('h3')?.innerText || 'CRYM Devotion';
  const content = card.innerText.replace('Share This Devotion', '').trim();

  const shareData = {
    title: title,
    text: content + '\n\nChrist Revealed Youth Ministries\nSPEAK JESUS CHRIST',
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(
        shareData.text + '\n\n' + shareData.url
      );
      alert('Devotion copied. You can now share it with others.');
    } else {
      alert('Please copy the devotion text and share it manually.');
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      alert('Sharing was unsuccessful. Please try again.');
    }
  }
}
