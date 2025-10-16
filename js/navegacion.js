// ============================================
// NAVEGACIÓN Y MENÚ HAMBURGUESA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const menuHamburguesa = document.getElementById('menuToggle');
    const navList = document.getElementById('navMenu');

    // Función para alternar el menú hamburguesa
    function toggleMenu() {
        navList.classList.toggle('active');
        menuHamburguesa.classList.toggle('active');
    }

    // Evento para el botón de menú hamburguesa
    if (menuHamburguesa) {
        menuHamburguesa.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-list') && !e.target.closest('.menu-hamburguesa')) {
            navList.classList.remove('active');
            menuHamburguesa?.classList.remove('active');
        }
    });

    // Actualizar enlace activo según la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                    behavior: 'smooth'
                });
            }
        });
    });
});
