// ============================================
// CARRITO DE PRODUCTOS - producto-detalle.html
// ============================================

// Función para manejar el clic en el botón de carrito
function manejarClickCarrito(e) {
  e.preventDefault();
  e.stopPropagation(); // Prevenir eventos adicionales

  // Obtener la información del producto
  const titulo = document.querySelector('.producto-info h1')?.textContent || 'Producto';
  const precioTexto = document.querySelector('.producto-precio .precio-numero')?.textContent || '0';
  const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, '')) || 0;
  let cantidad = parseInt(document.getElementById('cantidad').value) || 1;
  const imagen = document.querySelector('.producto-imagen img')?.src || '';

  // Obtener el ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productoId = urlParams.get('id') || 'producto';

  // Obtener el carrito actual o crear uno nuevo
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscar si el producto ya está en el carrito
  const itemExistente = carrito.find(item => item.id === productoId);

  if (itemExistente) {
    // Si ya existe, solo actualizar la cantidad si es necesario
    // No duplicamos la cantidad, la establecemos directamente
    itemExistente.cantidad = cantidad;
  } else {
    // Si no existe, agregarlo al carrito
    carrito.push({
      id: productoId,
      nombre: titulo,
      precio: precio,
      imagen: imagen,
      cantidad: cantidad
    });
  }

  // Guardar el carrito actualizado
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Actualizar el contador del carrito
  const carritoContador = document.getElementById('carritoContador');
  if (carritoContador) {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    carritoContador.textContent = totalItems;
  }

  // Mostrar notificación
  const notificacion = document.createElement('div');
  notificacion.textContent = `¡${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${titulo} ${cantidad === 1 ? 'agregada' : 'agregadas'} al carrito!`;
  notificacion.style.position = 'fixed';
  notificacion.style.bottom = '20px';
  notificacion.style.right = '20px';
  notificacion.style.backgroundColor = '#4CAF50';
  notificacion.style.color = 'white';
  notificacion.style.padding = '15px 25px';
  notificacion.style.borderRadius = '5px';
  notificacion.style.zIndex = '1000';
  notificacion.style.transition = 'opacity 0.5s';
  document.body.appendChild(notificacion);

  // Desaparecer la notificación después de 3 segundos
  setTimeout(() => {
    notificacion.style.opacity = '0';
    setTimeout(() => notificacion.remove(), 500);
  }, 1500);

  // Redirigir a la página del menú después de 1.5 segundos
  setTimeout(() => {
    window.location.href = 'menu.html';
  }, 1500);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Configurar el botón de añadir al carrito
  const btnCarrito = document.getElementById('btn-carrito');
  if (btnCarrito) {
    // Remover cualquier evento anterior para evitar duplicados
    btnCarrito.removeEventListener('click', manejarClickCarrito);
    btnCarrito.addEventListener('click', manejarClickCarrito);
  }

  // Configurar los botones de incremento/decremento de cantidad
  const aumentarBtn = document.getElementById('aumentar');
  const disminuirBtn = document.getElementById('disminuir');
  const cantidadInput = document.getElementById('cantidad');

  if (aumentarBtn && disminuirBtn && cantidadInput) {
    aumentarBtn.addEventListener('click', () => {
      cantidadInput.value = parseInt(cantidadInput.value) + 1;
    });

    disminuirBtn.addEventListener('click', () => {
      const valorActual = parseInt(cantidadInput.value);
      if (valorActual > 1) {
        cantidadInput.value = valorActual - 1;
      }
    });
  }
});
