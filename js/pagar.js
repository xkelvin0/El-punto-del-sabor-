// JavaScript específico para la página de pago

document.addEventListener('DOMContentLoaded', function() {
  // Manejar cambio entre envío y recogida
  const tipoEntregaRadios = document.querySelectorAll('input[name="tipo-entrega"]');
  const grupoDireccion = document.getElementById('grupo-direccion');
  const direccionInput = document.getElementById('direccion');
  
  function actualizarVisibilidadDireccion() {
    const tipoEntrega = document.querySelector('input[name="tipo-entrega"]:checked').value;
    if (tipoEntrega === 'recogida') {
      grupoDireccion.style.display = 'none';
      direccionInput.required = false;
    } else {
      grupoDireccion.style.display = 'block';
      direccionInput.required = true;
    }
  }
  
  tipoEntregaRadios.forEach(radio => {
    radio.addEventListener('change', actualizarVisibilidadDireccion);
  });
  
  // Inicializar visibilidad
  actualizarVisibilidadDireccion();
  
  // Validación del formulario
  document.getElementById('confirmar-pago').addEventListener('click', function(e) {
    const tipoEntrega = document.querySelector('input[name="tipo-entrega"]:checked').value;
    const direccion = direccionInput.value.trim();
    
    if (tipoEntrega === 'domicilio' && !direccion) {
      e.preventDefault();
      alert('Por favor ingrese una dirección de entrega');
      return;
    }
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre-cliente').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const notas = document.getElementById('notas').value.trim();
    
    // Validar campos obligatorios
    if (!nombre || !telefono) {
      e.preventDefault();
      alert('Por favor complete los campos obligatorios (nombre y teléfono)');
      return;
    }
    
    // Validar teléfono (9 dígitos)
    if (!/^\d{9}$/.test(telefono)) {
      e.preventDefault();
      alert('Por favor ingrese un número de teléfono válido (9 dígitos)');
      return;
    }
    
    // Verificar que haya productos en el carrito
    if (carrito.length === 0) {
      e.preventDefault();
      alert('No hay productos en el carrito');
      return;
    }
    
    // Obtener método de pago seleccionado
    const metodoPago = document.querySelector('.metodo-pago.activo')?.getAttribute('data-metodo');
    if (!metodoPago) {
      e.preventDefault();
      alert('Por favor seleccione un método de pago');
      return;
    }
    
    // Preparar datos del pedido
    const datosPedido = {
      nombre: nombre,
      telefono: telefono,
      email: email,
      direccion: tipoEntrega === 'domicilio' ? direccion : '',
      notas: notas,
      tipo_entrega: tipoEntrega,
      metodo_pago: metodoPago,
      items: carrito,
      total: carrito.reduce((sum, item) => {
        const subtotal = item.esPromoDescuento ? 
          (item.precio * item.cantidad * 0.5) : 
          (item.precio * item.cantidad);
        return sum + subtotal;
      }, 0)
    };
    
    // Enviar pedido usando el backend existente
    if (typeof window.procesarPago === 'function') {
      window.procesarPago(datosPedido);
    } else {
      console.error('Función procesarPago no encontrada');
      alert('Error al procesar el pedido. Por favor recargue la página e intente nuevamente.');
    }
  });
  
  // Cargar el carrito desde localStorage
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const resumenItems = document.getElementById('resumen-items');
  const totalPedido = document.getElementById('total-pedido');
  
  // Mostrar ítems del carrito
  if (carrito.length === 0) {
    resumenItems.innerHTML = '<p>No hay productos en el carrito</p>';
  } else {
    let total = 0;
    resumenItems.innerHTML = '';
    
    carrito.forEach(item => {
      // Ajustar cantidad para promoción de descuento
      const cantidadMostrar = item.esPromoDescuento ? item.cantidad : item.cantidad;
      const etiquetaCantidad = item.esPromoDescuento ? 'unidad(es)' : '';
      const subtotal = item.esPromoDescuento ? (item.precio * cantidadMostrar) : (item.precio * item.cantidad);
      total += subtotal;
      
      const itemElement = document.createElement('div');
      itemElement.className = 'resumen-item';
      itemElement.innerHTML = `
        <div>
          <strong>${item.nombre}${item.esPromoDescuento ? ' (Jueves de Wantanes)' : ''}</strong>
          <div>Cantidad: ${cantidadMostrar} ${etiquetaCantidad}</div>
        </div>
        <div>S/ ${subtotal.toFixed(2)}</div>
      `;
      resumenItems.appendChild(itemElement);
    });
        
    totalPedido.textContent = `Total: S/ ${total.toFixed(2)}`;
  }
  
  // Manejar cambio de método de pago
  const metodosPago = document.querySelectorAll('.metodo-pago');
  const formTarjeta = document.getElementById('form-tarjeta');
  const formEfectivo = document.getElementById('form-efectivo');
  const formYape = document.getElementById('form-yape');
  
  metodosPago.forEach(metodo => {
    metodo.addEventListener('click', function() {
      // Remover clase activa de todos los métodos
      metodosPago.forEach(m => m.classList.remove('activo'));
      // Agregar clase activa al método seleccionado
      this.classList.add('activo');
      
      // Mostrar el formulario correspondiente
      const metodoSeleccionado = this.getAttribute('data-metodo');
      formTarjeta.style.display = 'none';
      formEfectivo.style.display = 'none';
      formYape.style.display = 'none';
      
      if (metodoSeleccionado === 'tarjeta') {
        formTarjeta.style.display = 'block';
      } else if (metodoSeleccionado === 'efectivo') {
        formEfectivo.style.display = 'block';
      } else if (metodoSeleccionado === 'yape') {
        formYape.style.display = 'block';
      }
    });
  });
});
