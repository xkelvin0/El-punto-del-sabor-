// ============================================
// CARRITO DE COMPRAS
// ============================================

// Asegurarse de que el carrito esté inicializado en el objeto window
if (!window.carrito) {
    window.carrito = [];
}

// Referencia local a la variable global
let carrito = window.carrito;

// Definir reglas de promociones
const promociones = {
  'combo-chaufa-familiar': { tipo: 'porcentaje', valor: 15, descripcion: '-15%' },
  'martes-de-wantanes': { tipo: '2x1', descripcion: '2x1' },
  'combo-aeropuerto': { tipo: 'combo', descuento: 7, descripcion: 'Combo' } // S/ 35.00 - S/ 7.00 = S/ 28.00
};

// Función para agregar producto al carrito (disponible globalmente)
window.agregarAlCarrito = function(id, nombre, precio, imagen, cantidad = 1) {
    // Asegurarse de que el carrito esté inicializado
    if (!window.carrito) {
        window.carrito = [];
        carrito = window.carrito;
    }
    // Verificar si es la promoción de descuento
    const esPromoDescuento = nombre.toLowerCase().includes('jueves de wantanes');
    
    // Si es la promoción de descuento, ajustar el precio
    if (esPromoDescuento) {
        const productoExistente = carrito.find(item => item.id === id + '-promo');
        
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            // Si no existe, agregar producto con descuento del 50%
            const nuevoProducto = {
                id: id + '-promo',
                nombre: nombre + ' (Jueves de Wantanes)',
                precio: precio, // Precio con descuento aplicado
                precio_original: precio * 2, // Precio original sin descuento (S/ 8.00)
                imagen,
                cantidad: cantidad,
                esPromoDescuento: true
            };
            carrito.push(nuevoProducto);
        }
    } else {
        // Comportamiento normal para otros productos
        const productoExistente = carrito.find(item => item.id === id && !item.esPromoDescuento);
        
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ id, nombre, precio, imagen, cantidad });
        }
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(esPromoDescuento ? 
        `¡Jueves de Wantanes! ${nombre} por S/ ${precio}` : 
        `${nombre} agregado al carrito`
    );
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
        } else if (e.target.classList.contains('btn-promo')) {
            // Manejar botones de promociones
            const promoCard = e.target.closest('.promo-card');
            if (promoCard) {
                const nombre = promoCard.querySelector('h3').textContent;
                const id = nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const discountedPrice = parseFloat(promoCard.querySelector('.discounted-price').textContent.replace('S/ ', '').replace(',', ''));
                const imagen = promoCard.querySelector('.promo-image')?.src || '';
                agregarAlCarrito(id, nombre, discountedPrice, imagen);
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
    if (btnPagar) {
        btnPagar.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = 'pagar.html';
        });
    }

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

        let precioFinal = item.precio;
        let mostrarCantidad = item.cantidad;
        let mostrarPrecioUnitario = item.precio;
        
        // Manejar promoción de descuento
        if (item.esPromoDescuento) {
            // Para la promoción de descuento, el precio ya incluye el 50% de descuento
            precioFinal = item.precio * item.cantidad;
            mostrarPrecioUnitario = item.precio_original || item.precio * 2; // S/ 8.00 original
        } 
        // Manejar otras promociones
        else {
            const promo = promociones[item.id];
            if (promo) {
                if (promo.tipo === 'porcentaje') {
                    precioFinal = item.precio * (1 - promo.valor / 100);
                } else if (promo.tipo === '2x1') {
                    const pares = Math.floor(item.cantidad / 2);
                    const individuales = item.cantidad % 2;
                    precioFinal = (pares * item.precio) + (individuales * item.precio);
                } else if (promo.tipo === 'combo' && promo.descuento) {
                    precioFinal = item.precio - promo.descuento;
                }
            }
        }

        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="carrito-item-imagen">
            <div class="carrito-item-info">
                <h4>${item.nombre}${item.esPromoDescuento ? '<span class="etiqueta-promo"></span>' : ''}</h4>
                ${item.esPromoDescuento ? 
                  `<p class="precio">S/ ${precioFinal.toFixed(2)} <span class="precio-unitario">(Jueves de Wantanes - S/ ${mostrarPrecioUnitario.toFixed(2)} c/u)</span></p>` : 
                  `<p class="precio">S/ ${precioFinal.toFixed(2)}</p>`}
                <div class="cantidad-controls">
                    <button class="cantidad-btn" data-action="decrease" data-id="${item.id}"${item.esPromoDescuento && item.cantidad <= 1 ? 'disabled' : ''}>-</button>
                    <span class="cantidad">${item.cantidad}</span>
                    <button class="cantidad-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-btn" data-id="${item.id}">×</button>
        `;
        carritoItems.appendChild(itemElement);
    });

    // Calcular total con promociones aplicadas
    let total = 0;
    carrito.forEach(item => {
      let precioFinal = 0;
      
      // Manejar promoción de descuento
      if (item.esPromoDescuento) {
        // El precio ya incluye el 50% de descuento
        precioFinal = item.precio * item.cantidad;
      } 
      // Manejar otras promociones
      else {
        const promo = promociones[item.id];
        if (promo) {
          if (promo.tipo === 'porcentaje') {
            precioFinal = item.precio * item.cantidad * (1 - promo.valor / 100);
          } else if (promo.tipo === '2x1') {
            // Para 2x1: por cada 2 items, pagar solo 1
            const pares = Math.floor(item.cantidad / 2);
            const individuales = item.cantidad % 2;
            precioFinal = (pares + individuales) * item.precio;
          } else if (promo.tipo === 'combo' && promo.descuento) {
            precioFinal = (item.precio - promo.descuento) * item.cantidad;
          } else {
            precioFinal = item.precio * item.cantidad;
          }
        } else {
          precioFinal = item.precio * item.cantidad;
        }
      }

      // Redondear a 2 decimales para evitar errores de precisión
      precioFinal = parseFloat(precioFinal.toFixed(2));
      total += precioFinal;
    });

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

    // Manejar promoción de descuento
    if (item.esPromoDescuento) {
        // Comportamiento normal - puede aumentar/disminuir de 1 en 1
        if (action === 'increase') {
            item.cantidad++;
        } else if (action === 'decrease') {
            if (item.cantidad > 1) {
                item.cantidad--;
            } else {
                eliminarDelCarrito(id);
                return;
            }
        }
    } else {
        // Comportamiento normal para otros productos
        if (action === 'increase') {
            item.cantidad++;
        } else if (action === 'decrease') {
            if (item.cantidad > 1) {
                item.cantidad--;
            } else {
                eliminarDelCarrito(id);
                return;
            }
        }
    }

    // Si es promoción 3x2, asegurarse que la cantidad sea múltiplo de 3
    if (false) { // No hay restricción de cantidad para promoción de descuento
        // Ajustar al múltiplo de 3 más cercano
        item.cantidad = Math.ceil(item.cantidad / 3) * 3;
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
