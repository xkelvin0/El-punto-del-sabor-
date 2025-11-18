// ============================================
// INTEGRACIÓN CON BACKEND - PÁGINA DE PAGO
// ============================================

// Función para procesar el pago con backend
window.procesarPago = async function(datosPedido) {
    try {
        console.log('Enviando datos al backend:', datosPedido);
        
        // Enviar datos al backend PHP
        const response = await fetch('/El-punto-del-sabor-/api/guardar_pedido.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosPedido)
        });
        
        // Obtener respuesta como texto primero para debugging
        const responseText = await response.text();
        console.log('Respuesta cruda del servidor:', responseText);
        
        // Intentar parsear JSON
        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('Error al parsear JSON:', e);
            console.error('Respuesta recibida:', responseText);
            mostrarNotificacion('Error en la respuesta del servidor. Contacta al administrador.', 'error');
            return;
        }
        
        console.log('Respuesta del servidor:', response.status, response.statusText);

        if (result.success) {
            // Mostrar mensaje de éxito
            mostrarNotificacion('¡Pedido realizado con éxito! Pedido #' + result.pedido_id);
            
            // Limpiar carrito y redirigir al inicio
            localStorage.removeItem('carrito');
            setTimeout(() => {
                window.location.href = '/El-punto-del-sabor-/index.html';
            }, 2000);
            
        } else {
            console.error('Error del servidor:', result.message);
            mostrarNotificacion(result.message || 'Error al procesar el pedido', 'error');
        }
        
    } catch (error) {
        console.error('Error al procesar pago:', error);
        mostrarNotificacion('Error al procesar el pago. Por favor intenta nuevamente.', 'error');
    }
}

// Función para cargar los datos del carrito desde el backend
async function cargarCarritoDesdeBackend() {
    try {
        const response = await api.getCarrito();
        return response.items || [];
    } catch (error) {
        console.error('Error al cargar carrito desde backend:', error);
        // Fallback a localStorage
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }
}

// Función para calcular el total del carrito
function calcularTotal(items) {
    return items.reduce((total, item) => {
        let subtotal = 0;
        
        // Manejar promoción de descuento
        if (item.esPromoDescuento) {
            // Para promoción de descuento, el precio ya incluye Jueves de Wantanes
            subtotal = item.precio * item.cantidad;
        } else {
            subtotal = item.precio * item.cantidad;
        }
        
        return total + subtotal;
    }, 0);
}

// Función para mostrar los items del carrito en la página de pago
async function mostrarCarritoPago() {
    const itemsContainer = document.getElementById('carrito-items');
    const totalContainer = document.getElementById('total-pagar');
    
    if (!itemsContainer || !totalContainer) return;
    
    try {
        // Cargar items desde el backend
        const items = await cargarCarritoDesdeBackend();
        
        if (items.length === 0) {
            itemsContainer.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
            totalContainer.textContent = 'S/ 0.00';
            return;
        }
        
        // Mostrar items
        let html = '';
        let total = 0;
        
        items.forEach(item => {
            const subtotal = item.precio * item.cantidad;
            total += subtotal;
            
            html += `
                <div class="carrito-item">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="item-info">
                        <h4>${item.nombre}</h4>
                        <p>Precio: S/ ${item.precio.toFixed(2)}</p>
                        <p>Cantidad: ${item.cantidad}</p>
                    </div>
                    <div class="item-subtotal">
                        <p>S/ ${subtotal.toFixed(2)}</p>
                    </div>
                </div>
            `;
        });
        
        itemsContainer.innerHTML = html;
        totalContainer.textContent = `S/ ${total.toFixed(2)}`;
        
    } catch (error) {
        console.error('Error al mostrar carrito:', error);
        itemsContainer.innerHTML = '<p class="error">Error al cargar el carrito</p>';
    }
}

// Función para validar el formulario de pago
function validarFormularioPago() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    
    if (!nombre) {
        mostrarNotificacion('Por favor ingresa tu nombre', 'error');
        return false;
    }
    
    if (!telefono) {
        mostrarNotificacion('Por favor ingresa tu teléfono', 'error');
        return false;
    }
    
    if (!direccion) {
        mostrarNotificacion('Por favor ingresa tu dirección', 'error');
        return false;
    }
    
    return { nombre, telefono, direccion };
}

// Función para inicializar la página de pago
function inicializarPago() {
    // Cargar carrito
    mostrarCarritoPago();
    
    // Configurar formulario
    const formPago = document.getElementById('form-pago');
    if (formPago) {
        formPago.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validar formulario
            const datosCliente = validarFormularioPago();
            if (!datosCliente) return;
            
            // Obtener items y total
            const items = await cargarCarritoDesdeBackend();
            const total = calcularTotal(items);
            
            if (items.length === 0) {
                mostrarNotificacion('Tu carrito está vacío', 'error');
                return;
            }
            
            // Procesar pago
            await procesarPago({
                ...datosCliente,
                total: total,
                items: items
            });
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarPago);
