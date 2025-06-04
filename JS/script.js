document.addEventListener('DOMContentLoaded', () => {
  // 🌗 Toggle de tema claro/oscuro
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-bs-theme') === 'dark';
    html.setAttribute('data-bs-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? 'Modo Oscuro' : 'Modo Claro';

    // Transición suave de tema
    document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
  });

  // 🧭 Navbar transparente al hacer scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      nav.classList.add('bg-opacity-100', 'shadow-sm');
    } else {
      nav.classList.remove('bg-opacity-100', 'shadow-sm');
    }
  });

  // ✨ Hover en botones
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.transition = 'transform 0.3s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });

  // 📦 Carga de proyectos desde projects.json
  const container = document.querySelector('#projects .row');
  if (container) {
    fetch('../projects.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el archivo JSON');
        return res.json();
      })
      .then(data => {
        container.innerHTML = '';
        data.forEach(p => {
          const techs = p.tecnologias.map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join('');
          container.innerHTML += `
            <div class="col-md-6 mb-4" data-aos="fade-up">
              <div class="card h-100">
                <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                <div class="card-body">
                  <h5 class="card-title">${p.nombre}</h5>
                  <p>${p.descripcion}</p>
                  ${techs}
                </div>
              </div>
            </div>`;
        });
      })
      .catch(err => {
        container.innerHTML = `<div class="col-12 text-danger">Error al cargar proyectos: ${err.message}</div>`;
      });
  }
});

