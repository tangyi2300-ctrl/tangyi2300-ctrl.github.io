const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open)); menu.hidden = !open;
  menuButton.querySelector('span').textContent = open ? '−' : '＋';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {menu.hidden = true; menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='＋';}));
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button));});
  document.querySelector('.works').classList.toggle('filtered', filter !== 'all');
  document.querySelectorAll('.work').forEach(work => {work.hidden = filter !== 'all' && work.dataset.category !== filter;});
}));
const lightbox = document.querySelector('#lightbox');
let previousFocus;
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  previousFocus=button;document.querySelector('#lightbox-image').src=button.dataset.lightbox;
  document.querySelector('#lightbox-image').alt=button.querySelector('img').alt;
  document.querySelector('#lightbox-title').textContent=button.dataset.title;
  document.querySelector('#lightbox-caption').textContent=button.dataset.caption;
  lightbox.showModal();document.body.classList.add('modal-open');
}));
document.querySelector('#close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox){const r=lightbox.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)lightbox.close();}});
lightbox.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});
const film=document.querySelector('video');const cover=document.querySelector('.film-cover');
cover.addEventListener('click',async()=>{cover.hidden=true;film.classList.add('playing');try{await film.play();}catch{film.focus();}});
film.addEventListener('play',()=>{cover.hidden=true;film.classList.add('playing');});
document.querySelector('#year').textContent=new Date().getFullYear();
