const header = document.querySelector('#site-header');
const menuButton = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 8);
}

function closeMenu() {
  mobileNav.classList.remove('open');
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  menuButton.innerHTML = '<svg><use href="#i-menu"></use></svg>';
}

menuButton.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  header.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  menuButton.innerHTML = `<svg><use href="${isOpen ? '#i-x' : '#i-menu'}"></use></svg>`;
});

document.querySelectorAll('#mobile-nav a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver((entries, revealObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const subject = document.querySelector('#subject').value.trim();
  const message = document.querySelector('#message').value.trim();
  const text = encodeURIComponent(`Bonjour Elie,\n\nNom : ${name}\nEmail : ${email}\nSujet : ${subject}\n\n${message}`);
  window.open(`https://wa.me/25766596681?text=${text}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();
