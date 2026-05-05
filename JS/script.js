/* ============================================================
   ABEL CASTILLO — PORTFOLIO 2025 / JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ─────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── HAMBURGER / DRAWER ─────────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  const drawerLinks = drawer ? drawer.querySelectorAll('a') : [];

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('open');
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[data-section="${e.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── TYPING EFFECT ──────────────────────────────────────── */
  const typeTarget = document.getElementById('typing-role');
  if (typeTarget) {
    const roles = [
      'Software Engineer',
      'Full Stack Developer',
      'UI/UX Enthusiast',
      'AI & Automation Builder',
    ];
    let ri = 0, ci = 0, deleting = false;

    function type() {
      const current = roles[ri];
      if (!deleting) {
        typeTarget.textContent = current.slice(0, ++ci);
        if (ci === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typeTarget.textContent = current.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? 55 : 90);
    }
    setTimeout(type, 1200);
  }

  /* ── COUNTER ANIMATION ──────────────────────────────────── */
  function animateCounter(el, target, duration = 1800) {
    let start = null;
    const isDecimal = target % 1 !== 0;

    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = isDecimal
        ? (target * ease).toFixed(1)
        : Math.round(target * ease);
      el.textContent = val + el.dataset.suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseFloat(e.target.dataset.count));
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ── DRAGGABLE CERT SCROLL ──────────────────────────────── */
  const certsScroll = document.querySelector('.certs-scroll');
  if (certsScroll) {
    let isDown = false, startX, scrollLeft;

    certsScroll.addEventListener('mousedown', e => {
      isDown = true;
      startX = e.pageX - certsScroll.offsetLeft;
      scrollLeft = certsScroll.scrollLeft;
    });
    ['mouseleave', 'mouseup'].forEach(ev =>
      certsScroll.addEventListener(ev, () => isDown = false));
    certsScroll.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      certsScroll.scrollLeft = scrollLeft - (e.pageX - certsScroll.offsetLeft - startX);
    });
  }

  /* ── CONTACT FORM ───────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        statusEl.className = 'form-status success';
        statusEl.textContent = '✓ Mensaje enviado correctamente. Te responderé pronto.';
        form.reset();
      } else {
        throw new Error('error');
      }
    } catch {
      statusEl.className = 'form-status error';
      statusEl.textContent = '✗ Algo salió mal. Intenta escribirme directamente a abelcastillotrabajo@gmail.com';
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
  });

  /* ── MOUSE GLOW EFFECT (desktop only) ───────────────────── */
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed; width: 500px; height: 500px;
      border-radius: 50%; pointer-events: none; z-index: 0;
      background: radial-gradient(circle, rgba(99,148,255,0.04) 0%, transparent 70%);
      transform: translate(-50%,-50%);
      transition: left 0.15s ease, top 0.15s ease;
    `;
    document.body.appendChild(glow);
    window.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

});
