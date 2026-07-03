/* ============================================================
   ABEL CASTILLO — PORTFOLIO 2025 / JS · Rediseño Premium
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ── GSAP SCROLL ANIMATIONS ─────────────────────────────── */
  if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined" &&
    !prefersReducedMotion
  ) {
    gsap.registerPlugin(ScrollTrigger);

    // Revelado de secciones (excepto tarjetas de proyecto que se animan en batch)
    document.querySelectorAll(".reveal:not(.project-card):not(.service-card):not(.featured-card):not(.process-step)").forEach((el) => {
      const delay = el.classList.contains("reveal-delay-5")
        ? 0.45
        : el.classList.contains("reveal-delay-4")
        ? 0.35
        : el.classList.contains("reveal-delay-3")
        ? 0.25
        : el.classList.contains("reveal-delay-2")
        ? 0.15
        : 0;

      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    // Entrada escalonada para tarjetas de proyecto
    ScrollTrigger.batch(".project-card", {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "power2.out",
            overwrite: true,
          }
        );
      },
      start: "top 88%",
      once: true,
    });

    // También animar tarjetas de servicios, featured, etc.
    ScrollTrigger.batch(".service-card, .featured-card, .process-step", {
      onEnter: (elements) => {
        gsap.fromTo(
          elements,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power2.out",
          }
        );
      },
      start: "top 90%",
      once: true,
    });
  } else if (!prefersReducedMotion && "IntersectionObserver" in window) {
    // Fallback con IntersectionObserver
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("reveal-pending"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("reveal-pending");
            e.target.classList.add("visible");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));
  }

  /* ── NAV SCROLL ─────────────────────────────────────────── */
  const navbar = document.getElementById("navbar");
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    },
    { passive: true }
  );

  /* ── HAMBURGER / DRAWER ─────────────────────────────────── */
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("navDrawer");
  const drawerLinks = drawer ? drawer.querySelectorAll("a") : [];
  let lastFocusedElement = null;

  function setDrawerState(isOpen) {
    toggle.classList.toggle("open", isOpen);
    drawer.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    drawer.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      lastFocusedElement = document.activeElement;
      drawerLinks[0]?.focus();
    } else if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  toggle?.addEventListener("click", () => {
    setDrawerState(!drawer.classList.contains("open"));
  });

  drawerLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setDrawerState(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!drawer?.classList.contains("open")) return;

    if (event.key === "Escape") {
      event.preventDefault();
      setDrawerState(false);
      return;
    }

    if (event.key === "Tab" && drawerLinks.length) {
      const first = drawerLinks[0];
      const last = drawerLinks[drawerLinks.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && drawer?.classList.contains("open")) {
      setDrawerState(false);
    }
  });

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[data-section]");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(
            `.nav-links a[data-section="${e.target.id}"]`
          );
          active?.classList.add("active");
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ── TYPING EFFECT ──────────────────────────────────────── */
  const typeTarget = document.getElementById("typing-role");
  if (typeTarget && !prefersReducedMotion) {
    const roles = [
      "Desarrollador Web",
      "Full Stack Developer",
      "Ingeniero de Software",
      "Sistemas & Procesos",
    ];
    let ri = 0,
      ci = 0,
      deleting = false;

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

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target, parseFloat(e.target.dataset.count));
          counterObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => {
    if (prefersReducedMotion) {
      c.textContent = c.dataset.count + (c.dataset.suffix || "");
    } else {
      counterObserver.observe(c);
    }
  });

  /* ── DRAGGABLE CERT SCROLL ──────────────────────────────── */
  const certsScroll = document.querySelector(".certs-scroll");
  if (certsScroll) {
    let isDown = false,
      startX,
      scrollLeft;

    certsScroll.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - certsScroll.offsetLeft;
      scrollLeft = certsScroll.scrollLeft;
    });
    ["mouseleave", "mouseup"].forEach((ev) =>
      certsScroll.addEventListener(ev, () => (isDown = false))
    );
    certsScroll.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      certsScroll.scrollLeft =
        scrollLeft - (e.pageX - certsScroll.offsetLeft - startX);
    });
  }

  /* ── CONTACT FORM (WhatsApp + mailto) ──────────────────── */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const F = {
      name:    { el: document.getElementById("cf-name"),    err: document.getElementById("cf-name-err") },
      email:   { el: document.getElementById("cf-email"),   err: document.getElementById("cf-email-err") },
      subject: { el: document.getElementById("cf-subject"), err: document.getElementById("cf-subject-err") },
      msg:     { el: document.getElementById("cf-msg"),     err: document.getElementById("cf-msg-err") },
    };
    const statusEl  = document.getElementById("cf-status");
    const submitBtn = document.getElementById("cf-submit");
    const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setErr(f, msg) {
      f.el.classList.add("is-error");
      f.el.classList.remove("is-ok");
      f.el.setAttribute("aria-invalid", "true");
      f.err.textContent = msg;
    }
    function setOk(f) {
      f.el.classList.remove("is-error");
      f.el.classList.add("is-ok");
      f.el.setAttribute("aria-invalid", "false");
      f.err.textContent = "";
    }

    const validators = {
      name:    () => { const v = F.name.el.value.trim();    if (!v) { setErr(F.name, "Por favor ingresa tu nombre."); return false; } setOk(F.name); return true; },
      email:   () => { const v = F.email.el.value.trim();   if (!v) { setErr(F.email, "El correo es requerido."); return false; } if (!EMAIL_RE.test(v)) { setErr(F.email, "Formato de correo inválido."); return false; } setOk(F.email); return true; },
      subject: () => { const v = F.subject.el.value.trim(); if (!v) { setErr(F.subject, "Ingresa el asunto."); return false; } setOk(F.subject); return true; },
      msg:     () => { const v = F.msg.el.value.trim();     if (!v) { setErr(F.msg, "El mensaje es requerido."); return false; } if (v.length < 20) { setErr(F.msg, `Mínimo 20 caracteres (llevas ${v.length}).`); return false; } setOk(F.msg); return true; },
    };

    Object.keys(validators).forEach((k) =>
      F[k].el.addEventListener("blur", () => validators[k]())
    );

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const allOk = Object.values(validators).map((fn) => fn()).every(Boolean);
      if (!allOk) {
        const firstErr = Object.values(F).find((f) => f.el.classList.contains("is-error"));
        firstErr?.el.focus();
        return;
      }

      const name    = F.name.el.value.trim();
      const email   = F.email.el.value.trim();
      const subject = F.subject.el.value.trim();
      const msg     = F.msg.el.value.trim();
      const pref    = contactForm.querySelector("input[name='cf-pref']:checked")?.value || "whatsapp";

      const waText = `Hola Abel, soy ${name}.\n\nCorreo: ${email}\nAsunto: ${subject}\n\nMensaje:\n${msg}\n\nVengo desde tu portafolio.`;
      const mailBody = `Nombre: ${name}\nCorreo: ${email}\n\nAsunto: ${subject}\n\nMensaje:\n${msg}\n\nEnviado desde el portafolio web.`;
      const waHref   = `https://wa.me/51987945850?text=${encodeURIComponent(waText)}`;
      const mailHref = `mailto:abelcastillotrabajo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

      if (pref === "whatsapp") {
        window.open(waHref, "_blank", "noopener,noreferrer");
        showSuccess("Abriendo WhatsApp con tu mensaje…");
      } else if (pref === "email") {
        window.location.href = mailHref;
        showSuccess("Abriendo tu cliente de correo…");
      } else if (pref === "both") {
        window.open(waHref, "_blank", "noopener,noreferrer");
        setTimeout(() => { window.location.href = mailHref; }, 900);
        showSuccess("Abriendo WhatsApp y preparando el correo…");
      }

      function showSuccess(msg) {
        statusEl.className = "form-status success";
        statusEl.textContent = "✓ " + msg;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Enviado';
        setTimeout(() => {
          statusEl.className = "form-status";
          statusEl.textContent = "";
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Enviar mensaje';
          Object.values(F).forEach((f) => { f.el.classList.remove("is-ok"); });
        }, 6000);
      }
    });
  }

  const currentYear = document.getElementById("currentYear");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
});
