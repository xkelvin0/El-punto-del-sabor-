// ============================================
// FUNCIONALIDAD DE BOTONES DE COMPRA
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Cambiar texto de los botones de compra a "Ver más detalles"
  document.querySelectorAll('.precio-comprar button').forEach(button => {
    button.textContent = 'Ver más detalles';

    // Obtener el ID del producto del elemento padre (card)
    const card = button.closest('.card');
    if (card) {
      // Obtener el ID del producto del atributo onclick del card
      const onclick = card.getAttribute('onclick');
      if (onclick) {
        const match = onclick.match(/id=([^']+)/);
        if (match && match[1]) {
          const productId = match[1];
          // Configurar el evento click para abrir en la misma pestaña
          button.onclick = function(e) {
            e.stopPropagation(); // Evitar que se active el evento del card
            window.location.href = `producto-detalle.html?id=${productId}`;
          };

          // Si el botón dice 'Comprar', cambiarlo a 'Ver más detalles'
          if (button.textContent.trim() === 'Comprar') {
            button.textContent = 'Ver más detalles';
          }
        }
      }
    }
  });

  // ============================================
  // FUNCIONALIDAD DEL BOTÓN DE VOLVER ARRIBA
  // ============================================

  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    // Mostrar/ocultar el botón según el scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    });

    // Funcionalidad del botón (aunque href="#" ya funciona)
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Inicializar el estado del botón
    backToTopBtn.style.display = 'flex';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
  }
});
