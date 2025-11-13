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
    // Verificar si es la promoción 2x1
    const esPromo2x1 = nombre.toLowerCase().includes('martes de wantanes');
    
    // Si es la promoción 2x1, ajustar la cantidad y el precio
    if (esPromo2x1) {
        // Siempre agregar 2 unidades por el precio de 1
        const productoExistente = carrito.find(item => item.id === id);
        
        if (productoExistente) {
            // Si ya existe, incrementar en 2 (para mantener el 2x1)
            productoExistente.cantidad += 2;
        } else {
            // Si no existe, agregar 2 unidades
            carrito.push({ 
                id, 
                nombre: nombre + ' (2x1)', // Indicar que es promoción 2x1
                precio: precio * 2, // Precio total por las 2 unidades
                precioUnitario: precio, // Guardar el precio unitario para mostrar
                imagen, 
                cantidad: 2, // Siempre 2 unidades
                esPromo2x1: true // Marcar como promoción 2x1
            });
        }
    } else {
        // Comportamiento normal para otros productos
        const productoExistente = carrito.find(item => item.id === id && !item.esPromo2x1);
        
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ id, nombre, precio, imagen, cantidad });
        }
    }
    
    guardarCarrito();
    actualizarContadorCarrito();
    mostrarNotificacion(esPromo2x1 ? 
        `¡Promoción 2x1 aplicada! 2x ${nombre} por S/ ${precio * 2}` : 
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
        
        // Manejar promoción 2x1
        if (item.esPromo2x1) {
            // Para la promoción 2x1, mostramos el precio unitario real
            mostrarPrecioUnitario = item.precioUnitario || item.precio / 2;
            // El precio final es el precio unitario por la cantidad de pares
            const pares = Math.ceil(item.cantidad / 2);
            precioFinal = mostrarPrecioUnitario * pares;
            
            // Si es un nuevo item 2x1, forzar a que sea par
            if (item.cantidad % 2 !== 0) {
                item.cantidad++;
                guardarCarrito();
            }
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
                <h4>${item.nombre} ${item.esPromo2x1 ? '<span class="etiqueta-promo"></span>' : ''}</h4>
                ${item.esPromo2x1 ? 
                  `<p class="precio">S/ ${precioFinal.toFixed(2)} <span class="precio-unitario">(2 x S/ ${mostrarPrecioUnitario.toFixed(2)})</span></p>` : 
                  `<p class="precio">S/ ${precioFinal.toFixed(2)}</p>`}
                <div class="cantidad-controls">
                    <button class="cantidad-btn" data-action="decrease" data-id="${item.id}" ${item.esPromo2x1 && item.cantidad <= 2 ? 'disabled' : ''}>-</button>
                    <span class="cantidad">${item.esPromo2x1 ? item.cantidad / 2 : item.cantidad} ${item.esPromo2x1 ? 'par/es' : ''}</span>
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
      
      // Manejar promoción 2x1
      if (item.esPromo2x1) {
        const precioUnitario = item.precioUnitario || item.precio / 2;
        const pares = Math.ceil(item.cantidad / 2);
        precioFinal = precioUnitario * pares;
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

    // Manejar promoción 2x1
    if (item.esPromo2x1) {
        if (action === 'increase') {
            // Aumentar de 2 en 2 para mantener el 2x1
            item.cantidad += 2;
        } else if (action === 'decrease') {
            // Disminuir de 2 en 2, pero no menos de 2 (mínimo de la promoción)
            if (item.cantidad > 2) {
                item.cantidad -= 2;
            } else {
                // Si es 2 o menos, eliminar el producto
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

    // Si es promoción 2x1, asegurarse que la cantidad sea par
    if (item.esPromo2x1 && item.cantidad % 2 !== 0) {
        item.cantidad++;
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
