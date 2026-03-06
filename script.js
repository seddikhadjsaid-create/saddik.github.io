/* ═══════════════════════════════════════════════════════════════
   SEDDIK HADJ SAID — PORTFOLIO SCRIPTS
   Features: Particle Canvas, Custom Cursor, Typing Animation,
             Scroll Reveals, Counter Animation, Project Filter,
             Navigation, Contact Form, Back to Top
═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Utility: throttle ──
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) { last = now; fn.apply(this, args); }
  };
}

// ────────────────────────────────────────────────────────────────
// 1. CUSTOM CURSOR
// ────────────────────────────────────────────────────────────────
(function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Smooth ring following
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const interactives = 'a, button, .skill-card, .project-card, .achievement-card, .filter-btn, .contact-link, .form-input, .form-textarea';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ────────────────────────────────────────────────────────────────
// 2. PARTICLE CANVAS — Circuit Board / Space Theme
// ────────────────────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], connections = [];
  const MAX_PARTICLES = window.innerWidth < 768 ? 40 : 80;
  const CONNECTION_DIST = 130;
  const PARTICLE_COLOR  = '0, 212, 170'; // --accent rgb
  const PARTICLE_COLOR2 = '0, 170, 255';

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', throttle(resize, 200));

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : -5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = Math.random() * 0.2 + 0.05;
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? PARTICLE_COLOR : PARTICLE_COLOR2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y > H + 5 || this.x < -5 || this.x > W + 5) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < MAX_PARTICLES; i++) particles.push(new Particle());

  let mouseX = -9999, mouseY = -9999;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 170, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Mouse interaction
      const dx = particles[i].x - mouseX;
      const dy = particles[i].y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const alpha = (1 - dist / 100) * 0.35;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(0, 212, 170, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(loop);
  }
  loop();
})();

// ────────────────────────────────────────────────────────────────
// 3. TYPING ANIMATION
// ────────────────────────────────────────────────────────────────
(function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const phrases = [
    'Embedded Systems Enthusiast',
    'Robotics & Arduino Developer',
    'PCB Designer',
    '3D Modeling Engineer',
    'IoT Innovator',
    'Python Developer',
    'Public Speaker',
    'نبتكر Association Graduate',
  ];
  let idx = 0, charIdx = 0, deleting = false;
  const SPEED_TYPE = 65, SPEED_DELETE = 35, PAUSE = 1800;

  function type() {
    const current = phrases[idx];
    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        setTimeout(() => { deleting = true; type(); }, PAUSE);
        return;
      }
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        idx = (idx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? SPEED_DELETE : SPEED_TYPE);
  }
  setTimeout(type, 1200);
})();

// ────────────────────────────────────────────────────────────────
// 4. NAVIGATION — Scrolled State & Mobile Toggle
// ────────────────────────────────────────────────────────────────
(function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scrolled style
  window.addEventListener('scroll', throttle(() => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  }, 100));

  // Mobile toggle
  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle?.classList.remove('active');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  }
})();

// ────────────────────────────────────────────────────────────────
// 5. INTERSECTION OBSERVER — Scroll Reveals
// ────────────────────────────────────────────────────────────────
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // For timeline items, stagger them
        const items = entry.target.querySelectorAll?.('.timeline-item');
        items?.forEach((item, idx) => {
          item.style.transitionDelay = `${idx * 0.12}s`;
          item.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Generic scroll-reveal elements
  document.querySelectorAll('.skill-card, .project-card, .achievement-card, .contact-link, .about-grid, .contact-grid').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });

  // Timeline visibility
  document.querySelectorAll('.about-timeline').forEach(el => observer.observe(el));

  // Individual timeline items
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll('.timeline-item');
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 140);
        });
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.timeline').forEach(t => timelineObserver.observe(t));
})();

// ────────────────────────────────────────────────────────────────
// 6. COUNTER ANIMATION — Hero Stats
// ────────────────────────────────────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count);
      const dur = 1500;
      const start = Date.now();

      function update() {
        const elapsed  = Date.now() - start;
        const progress = Math.min(elapsed / dur, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * end);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = end;
      }
      update();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ────────────────────────────────────────────────────────────────
// 7. PROJECT FILTER
// ────────────────────────────────────────────────────────────────
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.transition = `opacity 0.3s ease ${i * 0.05}s, transform 0.3s ease ${i * 0.05}s`;
        if (show) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = ''; });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => card.classList.add('hidden'), 300 + i * 50);
        }
      });
    });
  });
})();

// ────────────────────────────────────────────────────────────────
// 8. CONTACT FORM
// ────────────────────────────────────────────────────────────────
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('#formName').value.trim();
    const email   = form.querySelector('#formEmail').value.trim();
    const message = form.querySelector('#formMessage').value.trim();

    if (!name || !email || !message) {
      // Simple validation shake
      form.style.animation = 'none';
      requestAnimationFrame(() => { form.style.animation = 'shake 0.4s ease'; });
      return;
    }

    // Simulate send (mailto fallback)
    const mailtoLink = `mailto:seddikhadjsaid@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`;
    window.location.href = mailtoLink;

    form.reset();
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  });
})();

// ────────────────────────────────────────────────────────────────
// 9. BACK TO TOP
// ────────────────────────────────────────────────────────────────
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', throttle(() => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, 100));

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ────────────────────────────────────────────────────────────────
// 10. SMOOTH PARALLAX for hero image (subtle)
// ────────────────────────────────────────────────────────────────
(function initParallax() {
  const heroImg = document.querySelector('.hero-photo-container');
  if (!heroImg || window.innerWidth < 1024) return;

  window.addEventListener('scroll', throttle(() => {
    const scrollY = window.scrollY;
    heroImg.style.transform = `translateY(${scrollY * 0.07}px)`;
  }, 16));
})();

// ────────────────────────────────────────────────────────────────
// 11. FLOATING BADGES subtle parallax
// ────────────────────────────────────────────────────────────────
(function initBadgeParallax() {
  const badges = document.querySelectorAll('.floating-badge');
  if (!badges.length || window.innerWidth < 768) return;

  window.addEventListener('mousemove', throttle((e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    badges.forEach((badge, i) => {
      const strength = (i + 1) * 4;
      badge.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
  }, 30));
})();

// ────────────────────────────────────────────────────────────────
// 12. ACHIEVEMENT CARD IMAGE LOADING
// ────────────────────────────────────────────────────────────────
(function initImageLoading() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function () {
      this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    if (img.complete) img.style.opacity = '1';
  });
})();

// ────────────────────────────────────────────────────────────────
// 13. DYNAMIC CURSOR COLOR on section change
// ────────────────────────────────────────────────────────────────
(function initDynamicCursor() {
  const dot = document.getElementById('cursorDot');
  if (!dot) return;
  // Changes cursor accent per section — subtle touch
  const achievementsSection = document.getElementById('achievements');
  window.addEventListener('scroll', throttle(() => {
    if (!achievementsSection) return;
    const top = achievementsSection.offsetTop;
    const bot = top + achievementsSection.offsetHeight;
    const inAch = window.scrollY + window.innerHeight / 2 >= top && window.scrollY + window.innerHeight / 2 <= bot;
    dot.style.background = inAch ? '#f59e0b' : 'var(--accent)';
  }, 100));
})();

// CSS keyframes for form shake (injected)
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-6px); }
      40%       { transform: translateX(6px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();

// Console signature
console.log(
  `%c
  ╔══════════════════════════════════╗
  ║  Seddik Hadj Said — Portfolio   ║
  ║  Embedded Systems & Robotics    ║
  ║  Algeria 🇩🇿  ·  نبتكر          ║
  ╚══════════════════════════════════╝
  `,
  'color: #00d4aa; font-family: monospace; font-size: 11px;'
);
