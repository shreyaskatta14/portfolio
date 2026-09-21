const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');

function updateThemeButton() {
  const isDark = document.body.classList.contains('dark');
  themeIcon.textContent = isDark ? '☀' : '◐';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  updateThemeButton();
});
updateThemeButton();

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const note = document.querySelector('[data-form-note]');

  form.reset();
  note.textContent = 'Form is ready to connect to an email service.';
  note.style.color = '#aebbb1';
});