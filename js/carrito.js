// ============================================
// CARRITO DE COMPRAS
// ============================================

// Variables globales
let carrito = [];

// Función para agregar producto al carrito
function agregarAlCarrito(id, nombre, precio, imagen, cantidad = 1) {
    const productoExistente = carrito.find(item => item.id === id);
    
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad });
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(`${nombre} agregado al carrito`);
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const contador = document.getElementById('carritoContador');
    if (contador) {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        contador.textContent = totalItems;
        contador.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// Función para inicializar el carrito (actualizada)
function setupCarrito() {
    cargarCarrito();

    // Configurar eventos del carrito flotante
    const carritoIcono = document.getElementById('carritoIcono');
    if (carritoIcono) {
        carritoIcono.removeEventListener('click', manejarClickCarrito);
        carritoIcono.addEventListener('click', manejarClickCarrito);
    }

    // Configurar botones de agregar al carrito
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('agregar-carrito') || e.target.textContent === 'Comprar') {
            const card = e.target.closest('.card');
            if (card) {
                const id = card.querySelector('h4').textContent.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const nombre = card.querySelector('h4').textContent;
                const precioTexto = card.querySelector('.precio-comprar span')?.textContent || card.querySelector('span')?.textContent;
                const precio = precioTexto ? parseFloat(precioTexto.replace('S/ ', '').replace(',', '')) : 0;
                const imagen = card.querySelector('img')?.src || '';
                agregarAlCarrito(id, nombre, precio, imagen);
            }
        }
    });

    // Sincronizar entre pestañas
    window.addEventListener('storage', (e) => {
        if (e.key === 'carrito') {
            cargarCarrito();
            actualizarCarrito();
        }
    });
}

// Función para manejar clic en el carrito
function manejarClickCarrito(e) {
    e.stopPropagation();
    mostrarCarrito();
}

// Función para mostrar el carrito flotante
function mostrarCarrito() {
    const carritoFlotante = document.getElementById('carritoFlotante');
    const carritoIcono = document.getElementById('carritoIcono');
    const carritoContenido = document.getElementById('carritoContenido');
    const carritoItems = document.getElementById('carritoItems');
    const totalPrecio = document.getElementById('totalPrecio');
    const btnPagar = document.getElementById('btnPagar');
    const cerrarCarrito = document.getElementById('cerrarCarrito');

    if (!carritoFlotante || !carritoIcono || !carritoContenido) return;

    // Mostrar carrito
    carritoContenido.classList.add('mostrar');

    // Actualizar contenido del carrito
    actualizarCarrito();

    // Remover event listeners anteriores
    // Configurar eventos
    if (cerrarCarrito) {
        cerrarCarrito.removeEventListener('click', ocultarCarrito);
        cerrarCarrito.addEventListener('click', ocultarCarrito);
    }

    // Agregar stopPropagation a la cabecera del carrito
    const carritoCabecera = document.querySelector('.carrito-cabecera');
    if (carritoCabecera) {
        carritoCabecera.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se propague el evento
        });
    }

    // Remover event listener anterior para evitar duplicados
    document.removeEventListener('click', manejarClicFueraCarrito);
    document.addEventListener('click', manejarClicFueraCarrito);
}

document.addEventListener('DOMContentLoaded', setupCarrito);

// Función para manejar clic fuera del carrito
function manejarClicFueraCarrito(e) {
    if (!e.target.closest('.carrito-flotante') && !e.target.closest('.carrito-icono')) {
        ocultarCarrito();
    }
}

// Función para manejar clic en botón pagar
function manejarClickPagar() {
    window.location.href = 'carrito.html';
}

// Función para ocultar el carrito flotante
function ocultarCarrito() {
    const carritoContenido = document.getElementById('carritoContenido');
    if (carritoContenido) {
        carritoContenido.classList.remove('mostrar');
        // Remover el event listener cuando se oculta el carrito
        document.removeEventListener('click', manejarClicFueraCarrito);
    }
}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carritoItems');
    const totalPrecio = document.getElementById('totalPrecio');

    if (!carritoItems || !totalPrecio) return;

    // Limpiar contenido actual
    carritoItems.innerHTML = '';

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        totalPrecio.textContent = 'S/ 0.00';
        return;
    }

    // Agregar items del carrito
    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
            <div class="carrito-item-info">
                <h4>${item.nombre}</h4>
                <p class="precio">S/ ${item.precio.toFixed(2)}</p>
                <div class="cantidad-controls">
                    <button class="cantidad-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span class="cantidad">${item.cantidad}</span>
                    <button class="cantidad-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-btn" data-id="${item.id}">×</button>
        `;
        carritoItems.appendChild(itemElement);
    });

    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    totalPrecio.textContent = `S/ ${total.toFixed(2)}`;

    // Configurar eventos de cantidad y eliminación
    carritoItems.querySelectorAll('.cantidad-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se propague el evento
            const action = e.target.getAttribute('data-action');
            const id = e.target.getAttribute('data-id');
            cambiarCantidad(id, action);
        });
    });

    carritoItems.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se propague el evento
            const id = e.target.getAttribute('data-id');
            eliminarDelCarrito(id);
        });
    });

    // Agregar stopPropagation a otros elementos del carrito para evitar cierre accidental
    carritoItems.querySelectorAll('.carrito-item, .carrito-item-imagen, .carrito-item-info, .cantidad-controls, .cantidad').forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se propague el evento
        });
    });
}

// Función para cambiar cantidad de un producto
function cambiarCantidad(id, action) {
    const item = carrito.find(item => item.id === id);
    if (!item) return;

    if (action === 'increase') {
        item.cantidad++;
    } else if (action === 'decrease' && item.cantidad > 1) {
        item.cantidad--;
    } else if (action === 'decrease' && item.cantidad === 1) {
        eliminarDelCarrito(id);
        return;
    }

    guardarCarrito();
    actualizarContadorCarrito();
    actualizarCarrito();
    mostrarNotificacion(`Cantidad actualizada`);
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarContadorCarrito();
    actualizarCarrito();
    mostrarNotificacion('Producto eliminado del carrito');
}
