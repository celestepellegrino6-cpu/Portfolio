// ── Menu burger ──────────────────────────────────────────────
const burger = document.querySelector('.nav-burger');
const overlay = document.querySelector('.nav-overlay');
const closeBtn = document.querySelector('.nav-close');

function getMenuItems() {
  return Array.from(overlay.querySelectorAll('a, button'))
    .filter(el => !el.classList.contains('nav-close'));
}

function openMenu() {
  overlay.classList.add('show');
  getMenuItems().forEach((item, i) => {
    item.classList.remove('entering');
    item.style.animationDelay = `${i * 110}ms`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      item.classList.add('entering');
    }));
  });
}

function closeMenu() {
  overlay.classList.remove('show');
  getMenuItems().forEach(item => {
    item.classList.remove('entering');
    item.style.transform = '';
    item.style.color = '';
    item.style.animationDelay = '';
  });
}

burger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeMenu();
});

// Interaction souris : scale + couleur selon proximité
overlay.addEventListener('mousemove', e => {
  getMenuItems().forEach(item => {
    const rect = item.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const proximity = Math.max(0, 1 - dist / 200);

    item.style.transform = `scale(${1 + 0.55 * proximity})`;

    const g = Math.round(255 * (1 - proximity));
    const b = Math.round(255 - 68 * proximity);
    item.style.color = `rgb(255, ${g}, ${b})`;
  });
});

overlay.addEventListener('mouseleave', () => {
  getMenuItems().forEach(item => {
    item.style.transform = '';
    item.style.color = '';
  });
});
