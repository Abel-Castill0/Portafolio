document.addEventListener('DOMContentLoaded', () => {
  // 🌗 Toggle de tema claro/oscuro
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-bs-theme') === 'dark';
      html.setAttribute('data-bs-theme', isDark ? 'light' : 'dark');
      themeToggle.textContent = isDark ? 'Modo Oscuro' : 'Modo Claro';

      // Transición suave
      document.body.style.transition = 'background-color 0.4s ease, color 0.4s ease';
    });
  }

  // 🧭 Navbar transparente al hacer scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      nav.classList.add('bg-opacity-100', 'shadow-sm');
    } else {
      nav.classList.remove('bg-opacity-100', 'shadow-sm');
    }
  });

  // ✨ Hover animado en botones
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.transition = 'transform 0.3s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'scale(1)';
    });
  });

  // 📦 Cargar proyectos dinámicamente desde projects.json
  const container = document.querySelector('#projects-container');
  if (container) {
    fetch('projects.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar el archivo JSON');
        return res.json();
      })
      .then(data => {
        container.innerHTML = '';
        data.forEach(p => {
          const techs = p.tecnologias.map(t => `
            <span class="badge bg-secondary me-1">${t}</span>`).join('');

          container.innerHTML += `
            <div class="col-md-6 mb-4" data-aos="fade-up">
              <div class="card h-100 shadow project-card bg-dark text-white">
                <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
                <div class="card-body">
                  <h5 class="card-title">${p.nombre}</h5>
                  <p class="card-text">${p.descripcion}</p>
                  <div class="mb-2">${techs}</div>
                  <a href="${p.link}" class="btn btn-outline-light btn-sm mt-2" download>
                    <i class="fas fa-download me-1"></i> Descargar ZIP
                  </a>
                </div>
              </div>
            </div>`;
        });

        // Reactivar animaciones después de insertar contenido
        AOS.refresh();
      })
      .catch(err => {
        container.innerHTML = `<div class="col-12 text-danger text-center fw-bold">Error al cargar proyectos: ${err.message}</div>`;
      });
  }
});
