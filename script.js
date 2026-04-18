// script.js

/* ── Cursor ── */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

/* ── Progress bar ── */
const pb = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const winScroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (winScroll / height) * 100;
  pb.style.width = scrolled + '%';
}, { passive: true });

/* ── Header + back-to-top ── */
const hdr = document.getElementById('site-header');
const btt = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  hdr.classList.toggle('scrolled', window.scrollY > 80);
  btt.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

/* ── Hamburger menu ── */
const hbg = document.getElementById('hamburger');
const nav = document.getElementById('nav-menu');
hbg.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  hbg.classList.toggle('active', open);
  hbg.setAttribute('aria-expanded', open);
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}, { passive: true });

/* ── Typed text animation ── */
const roles = ['Full Stack Web Apps', 'React Frontends', 'Node.js Backends', 'Android Apps with Kotlin', 'C++ Solutions', 'Python Tools'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedElement = document.getElementById('typed');

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (!deleting && charIndex <= currentRole.length) {
    typedElement.textContent = currentRole.slice(0, charIndex);
    charIndex++;
    if (charIndex === currentRole.length + 1) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else if (deleting && charIndex >= 0) {
    typedElement.textContent = currentRole.slice(0, charIndex);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 90);
}
typeEffect();

/* ── Scroll reveal animation ── */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

/* ── Skill bars animation on scroll ── */
const skillBars = document.querySelectorAll('.skill-bar-wrap');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fillBar = entry.target.querySelector('.skill-fill');
      if (fillBar && entry.target.dataset.pct) {
        setTimeout(() => {
          fillBar.style.width = entry.target.dataset.pct + '%';
        }, 200);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
skillBars.forEach(bar => skillObserver.observe(bar));

/* ── Contact form handler ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const sendBtn = document.getElementById('send-btn');
    const sendText = document.getElementById('send-text');
    sendBtn.disabled = true;
    sendText.textContent = 'Sending…';
    setTimeout(() => {
      sendText.textContent = '✓ Sent!';
      sendBtn.style.background = 'var(--green)';
      contactForm.reset();
      setTimeout(() => {
        sendText.textContent = 'Send Message ✦';
        sendBtn.style.background = '';
        sendBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}