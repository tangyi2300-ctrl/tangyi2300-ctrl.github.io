const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? '切换浅色模式' : '切换深色模式');
  themeButton.querySelector('span').textContent = dark ? '☾' : '☀';
}
let savedTheme;
try { savedTheme = localStorage.getItem('tangyi-theme'); } catch {}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeButton.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('tangyi-theme', next); } catch {}
});
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#navigation');
function closeMenu() {
  menu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开菜单'); menuButton.textContent = '☰';
}
menuButton.addEventListener('click', () => {
  const open = !menu.classList.contains('open');
  menu.classList.toggle('open', open); menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单'); menuButton.textContent = open ? '×' : '☰';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
const navLinks = [...menu.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) navLinks.forEach(a => {
      const active = a.hash === '#' + entry.target.id;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
}, {rootMargin: '-15% 0px -60% 0px'});
navLinks.forEach(a => { const section = document.querySelector(a.hash); if (section) sectionObserver.observe(section); });
const words = ['热爱生活的探索者', '小猫的忠实粉丝', '灵感的慢慢收集者', '动手创造的快乐玩家'];
let wordIndex = 0;
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => {
  if (document.hidden) return;
  wordIndex = (wordIndex + 1) % words.length;
  document.querySelector('#changing-word').textContent = words[wordIndex];
}, 3500);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button));});
  document.querySelector('.works').classList.toggle('filtered', filter !== 'all');
  let count = 0;
  document.querySelectorAll('.work').forEach(work => {work.hidden = filter !== 'all' && work.dataset.category !== filter; if (!work.hidden) count++;});
  document.querySelector('#filter-status').textContent = `显示 ${count} 件作品`;
}));
const lightbox = document.querySelector('#lightbox');
let previousFocus;
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  previousFocus = button;
  document.querySelector('#lightbox-image').src = button.dataset.lightbox;
  document.querySelector('#lightbox-image').alt = button.querySelector('img').alt;
  document.querySelector('#lightbox-title').textContent = button.dataset.title;
  document.querySelector('#lightbox-caption').textContent = button.dataset.caption;
  lightbox.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => {if (e.target === lightbox) {const r = lightbox.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) lightbox.close();}});
lightbox.addEventListener('close', () => {document.body.classList.remove('modal-open'); previousFocus?.focus();});
const film = document.querySelector('video');
const cover = document.querySelector('.film-cover');
cover.addEventListener('click', async () => {cover.hidden = true; film.classList.add('playing'); try {await film.play();} catch {film.focus();}});
film.addEventListener('play', () => {cover.hidden = true; film.classList.add('playing');});
document.querySelector('#year').textContent = new Date().getFullYear();
