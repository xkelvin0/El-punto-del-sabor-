// Datos de los productos
const productos = {
  'wantan-frito': {
    nombre: 'Wantan Frito',
    imagen: 'imagenes/wantanfrito.png',
    precio: 'S/ 8.00',
    descripcion: 'Crujientes wantanes fritos, rellenos de una mezcla jugosa de carne de cerdo y especias, acompañados de nuestra exclusiva salsa agridulce. Un clásico de la cocina chifa que no puede faltar en tu mesa (6 unidades).',
    ingredientes: [
      { nombre: 'Masa de wantán', alergenos: ['gluten'] },
      { nombre: 'Carne de cerdo molida', alergenos: [] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite vegetal para freír', alergenos: [] },
      { nombre: 'Salsa agridulce (agua, azúcar, vinagre, salsa de tomate, pimienta)', alergenos: [] }
    ],
    alérgenos: ['gluten', 'soya']
  },
  'arroz-chaufa': {
    nombre: 'Arroz Chaufa',
    imagen: 'imagenes/arrozchaufa.jpg',
    precio: 'S/ 15.00',
    descripcion: 'Tradicional arroz frito estilo chino-peruano preparado con huevo, cebolla china, ajo, jengibre, salsa de soya y trozos de pollo. Un clásico de la gastronomía chifa que no puede faltar.',
    ingredientes: [
      { nombre: 'Arroz cocido', alergenos: [] },
      { nombre: 'Pechuga de pollo', alergenos: [] },
      { nombre: 'Huevo', alergenos: ['huevo'] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de ajonjolí', alergenos: ['sésamo'] },
      { nombre: 'Cebollita china para decorar', alergenos: [] }
    ],
    alérgenos: ['huevo', 'gluten', 'soya', 'sésamo']
  },
  'siu-mai': {
    nombre: 'Siu Mai',
    imagen: 'imagenes/siumai.jpg',
    precio: 'S/ 12.00',
    descripcion: 'Deliciosos bocaditos de carne de cerdo y camarones cocidos al vapor, envueltos en una fina masa de wantán. Una explosión de sabores en cada bocado (6 unidades).',
    ingredientes: [
      { nombre: 'Masa de wantán', alergenos: ['gluten'] },
      { nombre: 'Carne de cerdo molida', alergenos: [] },
      { nombre: 'Camarones', alergenos: ['mariscos'] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de sésamo', alergenos: ['sésamo'] },
      { nombre: 'Zanahoria rallada', alergenos: [] }
    ],
    alérgenos: ['gluten', 'soya', 'mariscos', 'sésamo']
  },
  'aeropuerto': {
    nombre: 'Aeropuerto',
    imagen: 'imagenes/aeropuerto.jpg',
    precio: 'S/ 18.00',
    descripcion: 'La combinación perfecta de arroz chaufa y tallarín saltado en un mismo plato. Un festín de sabores y texturas que te hará volar de placer.',
    ingredientes: [
      { nombre: 'Arroz cocido', alergenos: [] },
      { nombre: 'Fideos chinos', alergenos: ['gluten'] },
      { nombre: 'Pollo', alergenos: [] },
      { nombre: 'Carne de res', alergenos: [] },
      { nombre: 'Huevo', alergenos: ['huevo'] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de ajonjolí', alergenos: ['sésamo'] },
      { nombre: 'Verduras salteadas', alergenos: [] }
    ],
    alérgenos: ['gluten', 'huevo', 'soya', 'sésamo']
  },
  'chaufa-carne': {
    nombre: 'Chaufa de Carne',
    imagen: 'imagenes/chaufacarne.jpg',
    precio: 'S/ 18.00',
    descripcion: 'Nuestro exquisito arroz chaufa preparado con tiernos trozos de lomo fino, huevo, cebolla china y un toque de ajonjolí. Una versión mejorada del clásico chaufa con el sabor único de la carne de res.',
    ingredientes: [
      { nombre: 'Arroz cocido', alergenos: [] },
      { nombre: 'Lomo fino de res', alergenos: [] },
      { nombre: 'Huevo', alergenos: ['huevo'] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de ajonjolí', alergenos: ['sésamo'] },
      { nombre: 'Cebollita china y ajonjolí para decorar', alergenos: ['sésamo'] }
    ],
    alérgenos: ['huevo', 'gluten', 'soya', 'sésamo']
  },
  'chaufa-chancho': {
    nombre: 'Arroz Chaufa de Chancho',
    imagen: 'imagenes/chaufachancho.jpeg',
    precio: 'S/ 20.00',
    descripcion: 'Una deliciosa variante de nuestro arroz chaufa, preparado con jugosos trozos de carne de cerdo, huevo, cebolla china y un toque de salsa de ostión. Un plato que conquista por su sabor único.',
    ingredientes: [
      { nombre: 'Arroz cocido', alergenos: [] },
      { nombre: 'Carne de cerdo', alergenos: [] },
      { nombre: 'Huevo', alergenos: ['huevo'] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Salsa de ostión', alergenos: ['moluscos'] },
      { nombre: 'Aceite de ajonjolí', alergenos: ['sésamo'] },
      { nombre: 'Cebollita china para decorar', alergenos: [] }
    ],
    alérgenos: ['huevo', 'gluten', 'soya', 'moluscos', 'sésamo']
  },
  'chijaukay': {
    nombre: 'Chijaukay',
    imagen: 'imagenes/chijaukai2.jpeg',
    precio: 'S/ 22.00',
    descripcion: 'Crujiente pollo frito bañado en nuestra exquisita salsa de soya y ostión. Un plato que combina la textura crujiente del pollo con el sabor umami de la salsa.',
    ingredientes: [
      { nombre: 'Pechuga de pollo', alergenos: [] },
      { nombre: 'Huevo', alergenos: ['huevo'] },
      { nombre: 'Harina de trigo', alergenos: ['gluten'] },
      { nombre: 'Almidón de maíz', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Salsa de ostión', alergenos: ['moluscos'] },
      { nombre: 'Azúcar', alergenos: [] },
      { nombre: 'Aceite vegetal para freír', alergenos: [] },
      { nombre: 'Cebollita china para decorar', alergenos: [] }
    ],
    alérgenos: ['huevo', 'gluten', 'soya', 'moluscos']
  },
  'kamlu-wantan': {
    nombre: 'Kamlu Wantan',
    imagen: 'imagenes/kamluwantan.jpg',
    precio: 'S/ 24.00',
    descripcion: 'Deliciosos wantanes fritos acompañados de una mezcla de pollo, cerdo y verduras en una irresistible salsa tamarindo. Un plato que equilibra perfectamente lo dulce y lo salado.',
    ingredientes: [
      { nombre: 'Masa de wantán frita', alergenos: ['gluten'] },
      { nombre: 'Pechuga de pollo', alergenos: [] },
      { nombre: 'Carne de cerdo molida', alergenos: [] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Zanahoria', alergenos: [] },
      { nombre: 'Pimiento rojo y verde', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de tamarindo', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de sésamo', alergenos: ['sésamo'] },
      { nombre: 'Maní tostado', alergenos: ['maní'] },
      { nombre: 'Aceite vegetal para freír', alergenos: [] }
    ],
    alérgenos: ['gluten', 'soya', 'sésamo', 'maní']
  },
  'pollo-enrollado': {
    nombre: 'Pollo Enrollado',
    imagen: 'imagenes/pollo enrollado.jpeg',
    precio: 'S/ 24.00',
    descripcion: 'Tierna pechuga de pollo rellena de verduras y especias, enrollada y cocida a la perfección, servida con nuestra exclusiva salsa de ostión. Un plato que destaca por su presentación y sabor.',
    ingredientes: [
      { nombre: 'Pechuga de pollo deshuesada', alergenos: [] },
      { nombre: 'Zanahoria', alergenos: [] },
      { nombre: 'Vainita china', alergenos: [] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de ostión', alergenos: ['moluscos'] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de sésamo', alergenos: ['sésamo'] },
      { nombre: 'Hilo de cocina', alergenos: [] },
      { nombre: 'Cebollino para decorar', alergenos: [] }
    ],
    alérgenos: ['gluten', 'soya', 'moluscos', 'sésamo']
  },
  'sopa-wantan': {
    nombre: 'Sopa Wantan',
    imagen: 'imagenes/sopawantan.jpg',
    precio: 'S/ 12.00',
    descripcion: 'Una reconfortante sopa de origen chino que combina caldo de pollo casero con jugosos wantanes rellenos de carne de cerdo y especias. Acompañada de finas láminas de cebolla china y brotes de soya.',
    ingredientes: [
      { nombre: 'Masa de wantán', alergenos: ['gluten'] },
      { nombre: 'Carne de cerdo molida', alergenos: [] },
      { nombre: 'Camarones picados', alergenos: ['mariscos'] },
      { nombre: 'Caldo de pollo', alergenos: [] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de sésamo', alergenos: ['sésamo'] },
      { nombre: 'Brotes de soya', alergenos: [] },
      { nombre: 'Cebollino picado', alergenos: [] }
    ],
    alérgenos: ['gluten', 'soya', 'mariscos', 'sésamo']
  },
  'sopa-fuchifu': {
    nombre: 'Sopa Fuchifu',
    imagen: 'imagenes/sopafuchifu.jpg',
    precio: 'S/ 15.00',
    descripcion: 'Una sopa espesa y cremosa preparada con caldo de pollo, huevo batido, finas tiras de pollo, champiñones y fideos chinos. Aderezada con un toque de vinagre y pimienta blanca.',
    ingredientes: [
      { nombre: 'Caldo de pollo', alergenos: [] },
      { nombre: 'Huevo batido', alergenos: ['huevo'] },
      { nombre: 'Pechuga de pollo en tiras', alergenos: [] },
      { nombre: 'Champiñones rebanados', alergenos: [] },
      { nombre: 'Fideos chinos', alergenos: ['gluten'] },
      { nombre: 'Maicena (para espesar)', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Vinagre de arroz', alergenos: [] },
      { nombre: 'Pimienta blanca', alergenos: [] },
      { nombre: 'Cebollino picado', alergenos: [] },
      { nombre: 'Aceite de sésamo', alergenos: ['sésamo'] }
    ],
    alérgenos: ['huevo', 'gluten', 'sésamo']
  },
  'pollo-tipakay': {
    nombre: 'Pollo Tipakay',
    imagen: 'imagenes/pollotipakay.png',
    precio: 'S/ 22.00',
    descripcion: 'Crujientes trozos de pollo frito bañados en nuestra exclusiva salsa agridulce, acompañados de pimientos salteados y anacardos tostados.',
    ingredientes: [
      { nombre: 'Pechuga de pollo en cubos', alergenos: [] },
      { nombre: 'Huevo', alergenos: ['huevo'] },
      { nombre: 'Harina de trigo', alergenos: ['gluten'] },
      { nombre: 'Almidón de maíz', alergenos: [] },
      { nombre: 'Pimiento rojo y verde', alergenos: [] },
      { nombre: 'Cebolla morada', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Vinagre de arroz', alergenos: [] },
      { nombre: 'Miel', alergenos: [] },
      { nombre: 'Anacardos tostados', alergenos: ['frutos secos'] },
      { nombre: 'Aceite vegetal para freír', alergenos: [] },
      { nombre: 'Semillas de sésamo para decorar', alergenos: ['sésamo'] }
    ],
    alérgenos: ['huevo', 'gluten', 'soya', 'frutos secos', 'sésamo']
  },
  'salvaje': {
    nombre: 'Salvaje',
    imagen: 'imagenes/salvaje.jpg',
    precio: 'S/ 18.00',
    descripcion: 'Versión especial del clásico arroz chaufa, preparado con una selección de verduras chinas salteadas al wok, huevo y mezcla secreta de especias.',
    ingredientes: [
      { nombre: 'Arroz cocido', alergenos: [] },
      { nombre: 'Huevo', alergenos: ['huevo'] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Zanahoria', alergenos: [] },
      { nombre: 'Vainita china', alergenos: [] },
      { nombre: 'Pimiento rojo y verde', alergenos: [] },
      { nombre: 'Brotes de soya', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite de sésamo', alergenos: ['sésamo'] },
      { nombre: 'Mezcla secreta de especias', alergenos: [] },
      { nombre: 'Cebollino picado', alergenos: [] }
    ],
    alérgenos: ['huevo', 'gluten', 'soya', 'sésamo']
  },
  'tallarin-saltado': {
    nombre: 'Tallarín Saltado',
    imagen: 'imagenes/tallarinsaltado.png',
    precio: 'S/ 20.00',
    descripcion: 'Fideos chinos salteados al wok con pollo, carne de res, cebolla morada, tomate, ají amarillo y salsa de soya. Acompañado de papas fritas por encima.',
    ingredientes: [
      { nombre: 'Fideos chinos', alergenos: ['gluten'] },
      { nombre: 'Pechuga de pollo en tiras', alergenos: [] },
      { nombre: 'Lomo fino de res en tiras', alergenos: [] },
      { nombre: 'Cebolla morada', alergenos: [] },
      { nombre: 'Tomate', alergenos: [] },
      { nombre: 'Ají amarillo', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Vinagre de arroz', alergenos: [] },
      { nombre: 'Aceite de ajonjolí', alergenos: ['sésamo'] },
      { nombre: 'Cebollino picado', alergenos: [] },
      { nombre: 'Papas fritas', alergenos: [] }
    ],
    alérgenos: ['gluten', 'soya', 'sésamo']
  },
  'tortilla-pollo': {
    nombre: 'Tortilla de Pollo',
    imagen: 'imagenes/tortillapollo.jpg',
    precio: 'S/ 22.00',
    descripcion: 'Arroz chaufa acompañado de una generosa porción de tortilla de huevo rellena de pollo, cebolla y tomate.',
    ingredientes: [
      { nombre: 'Arroz chaufa', alergenos: ['huevo', 'gluten', 'soya', 'sésamo'] },
      { nombre: 'Huevos', alergenos: ['huevo'] },
      { nombre: 'Pechuga de pollo cocida y desmenuzada', alergenos: [] },
      { nombre: 'Cebolla picada', alergenos: [] },
      { nombre: 'Tomate picado', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Aceite vegetal', alergenos: [] },
      { nombre: 'Sal y pimienta al gusto', alergenos: [] },
      { nombre: 'Cebollino picado para decorar', alergenos: [] }
    ],
    alérgenos: ['huevo', 'gluten', 'soya', 'sésamo']
  },
  'tallarin-taypa': {
    nombre: 'Tallarín Taypa',
    imagen: 'imagenes/taypa.jpg',
    precio: 'S/ 22.00',
    descripcion: 'Fideos salteados al wok con combinación de carnes y mariscos, verduras frescas y nuestra salsa especial taypa.',
    ingredientes: [
      { nombre: 'Fideos chinos', alergenos: ['gluten'] },
      { nombre: 'Pechuga de pollo en tiras', alergenos: [] },
      { nombre: 'Lomo fino de res en tiras', alergenos: [] },
      { nombre: 'Camarones', alergenos: ['mariscos'] },
      { nombre: 'Trozos de calamar', alergenos: ['mariscos'] },
      { nombre: 'Cebolla china', alergenos: [] },
      { nombre: 'Zanahoria', alergenos: [] },
      { nombre: 'Vainita china', alergenos: [] },
      { nombre: 'Pimiento rojo y amarillo', alergenos: [] },
      { nombre: 'Ajo', alergenos: [] },
      { nombre: 'Jengibre', alergenos: [] },
      { nombre: 'Salsa de soya', alergenos: ['gluten', 'soya'] },
      { nombre: 'Salsa de ostión', alergenos: ['moluscos'] },
      { nombre: 'Salsa taypa especial (secreta)', alergenos: [] },
      { nombre: 'Aceite de ajonjolí', alergenos: ['sésamo'] },
      { nombre: 'Cebollino picado', alergenos: [] }
    ],
    alérgenos: ['gluten', 'soya', 'mariscos', 'moluscos', 'sésamo']
  }
};

// Función para crear miniaturas con diferentes efectos
function crearMiniaturas(imagenUrl) {
  const miniaturasContainer = document.getElementById('miniaturas');
  if (!miniaturasContainer) return;
  
  miniaturasContainer.innerHTML = '';
  
  // Efectos para las miniaturas (usando la misma imagen con diferentes estilos)
  const efectos = [
    { nombre: 'Vista estándar', filtro: 'none' },
    { nombre: 'Vista cercana', transform: 'scale(1.2)' },
    { nombre: 'Blanco y negro', filtro: 'grayscale(100%)' },
    { nombre: 'Brillo', filtro: 'brightness(1.2)' },
    { nombre: 'Contraste', filtro: 'contrast(1.2)' }
  ];
  
  efectos.forEach((efecto, index) => {
    const miniatura = document.createElement('div');
    miniatura.className = 'miniatura' + (index === 0 ? ' activa' : '');
    miniatura.title = efecto.nombre;
    
    const img = document.createElement('img');
    img.src = imagenUrl;
    img.alt = efecto.nombre;
    img.style.filter = efecto.filtro || 'none';
    img.style.transform = efecto.transform || 'none';
    img.style.objectPosition = efecto.objetoPosicion || 'center';
    
    miniatura.appendChild(img);
    miniaturasContainer.appendChild(miniatura);
    
    // Cambiar la imagen principal al hacer clic en la miniatura
    miniatura.addEventListener('click', () => {
      // Actualizar la imagen principal
      const imgPrincipal = document.querySelector('.producto-imagen img');
      if (imgPrincipal) {
        // Aplicar efecto de transición suave
        imgPrincipal.style.opacity = '0';
        setTimeout(() => {
          imgPrincipal.style.filter = efecto.filtro || 'none';
          imgPrincipal.style.transform = efecto.transform || 'none';
          imgPrincipal.style.objectPosition = efecto.objetoPosicion || 'center';
          imgPrincipal.style.opacity = '1';
        }, 150);
      }
      
      // Actualizar miniatura activa
      document.querySelectorAll('.miniatura').forEach(m => m.classList.remove('activa'));
      miniatura.classList.add('activa');
    });
  });
}

// Función para inicializar la galería
function inicializarGaleria(imagenUrl) {
  const img = new Image();
  img.src = imagenUrl;
  img.alt = 'Imagen del producto';
  img.className = 'imagen-principal';
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
  
  img.onload = function() {
    const contenedorImagen = document.querySelector('.producto-imagen');
    if (!contenedorImagen) return;
    
    contenedorImagen.innerHTML = '';
    contenedorImagen.appendChild(img);
    
    // Agregar el indicador de zoom
    const zoomIndicator = document.createElement('div');
    zoomIndicator.className = 'zoom-indicator';
    zoomIndicator.innerHTML = '<i class="fas fa-search-plus"></i>';
    contenedorImagen.appendChild(zoomIndicator);
    
    // Mostrar la imagen con efecto fade in
    setTimeout(() => {
      img.style.opacity = '1';
    }, 50);
    
    // Inicializar miniaturas
    crearMiniaturas(imagenUrl);
    
    // Efecto de zoom al hacer clic
    contenedorImagen.addEventListener('click', function() {
      if (img.classList.contains('zoom-activo')) {
        img.style.transform = 'scale(1)';
        img.classList.remove('zoom-activo');
        zoomIndicator.innerHTML = '<i class="fas fa-search-plus"></i>';
        contenedorImagen.style.cursor = 'zoom-in';
      } else {
        img.style.transform = 'scale(1.8)';
        img.classList.add('zoom-activo');
        zoomIndicator.innerHTML = '<i class="fas fa-search-minus"></i>';
        contenedorImagen.style.cursor = 'zoom-out';
      }
    });
    
    document.body.style.cursor = 'default';
  };
}

// Función para actualizar la cantidad del producto
function actualizarCantidad(cambio) {
  const inputCantidad = document.getElementById('cantidad');
  if (!inputCantidad) return;
  
  let valor = parseInt(inputCantidad.value) + cambio;
  if (valor < 1) valor = 1;
  inputCantidad.value = valor;
}

// Función para mostrar mensaje de error
function mostrarError(mensaje) {
  const contenedor = document.querySelector('.producto-detalle');
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="error-mensaje">
        <h2>¡Ups! Algo salió mal</h2>
        <p>${mensaje}</p>
        <a href="index2.html#menu" class="btn-volver">
          <i class="fas fa-arrow-left"></i> Volver al Menú
        </a>
      </div>
    `;
  }
}

// Función para renderizar la sección de ingredientes
function renderizarIngredientes(ingredientes) {
  if (!ingredientes || !ingredientes.length) return '';
  
  return `
    <div class="seccion-ingredientes">
      <h3><i class="fas fa-list-ul"></i> Ingredientes</h3>
      <ul class="lista-ingredientes">
        ${ingredientes.map(ing => {
          const alergenos = ing.alergenos && ing.alergenos.length 
            ? ` <span class="alergeno" title="Contiene ${ing.alergenos.join(', ')}">⚠️</span>` 
            : '';
          return `<li class="ingrediente-item">
            ${ing.nombre}${alergenos}
          </li>`;
        }).join('')}
      </ul>
    </div>
  `;
}

// Función para renderizar la sección de alérgenos
function renderizarAlergenos(alergenos) {
  if (!alergenos || !alergenos.length) return '';
  
  const iconosAlergenos = {
    'gluten': '🌾',
    'huevo': '🥚',
    'lacteos': '🥛',
    'soya': '🌱',
    'sésamo': '🌰',
    'frutos-secos': '🌰',
    'pescado': '🐟',
    'mariscos': '🦐',
    'cacahuetes': '🥜',
    'apio': '🥬',
    'mostaza': '🌿',
    'sulfitos': '🧪',
    'altramuces': '🟢',
    'moluscos': '🐚'
  };
  
  return `
    <div class="seccion-alergenos">
      <h4><i class="fas fa-allergies"></i> Contiene:</h4>
      <div class="alergenos-lista">
        ${alergenos.map(a => {
          const icono = iconosAlergenos[a] || '⚠️';
          return `<span class="alergeno-tag" title="Contiene ${a}">${icono} ${a}</span>`;
        }).join(' ')}
      </div>
    </div>
  `;
}

// Función principal para cargar el producto
function cargarProducto() {
  // Elementos del DOM
  const contenedor = document.getElementById('producto-detalle');
  const titulo = document.querySelector('.producto-info h1');
  const precio = document.querySelector('.producto-precio');
  const descripcion = document.querySelector('.producto-descripcion');
  const seccionIngredientes = document.querySelector('.seccion-ingredientes-container');
  
  if (!contenedor) {
    mostrarError('No se pudo cargar la página correctamente.');
    return;
  }
  
  // Obtener el ID del producto de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productoId = urlParams.get('id');
  
  if (!productoId) {
    mostrarError('No se ha especificado un producto.');
    return;
  }
  
  // Mostrar estado de carga
  document.body.style.cursor = 'wait';
  
  // Simular carga (en un caso real, esto sería una llamada a una API)
  setTimeout(() => {
    try {
      if (productoId && productos[productoId]) {
        const producto = productos[productoId];
        
        // Inicializar la galería
        inicializarGaleria(producto.imagen);
        
        // Actualizar la información del producto
        if (titulo) {
          titulo.textContent = producto.nombre;
          titulo.classList.remove('loading');
        }
        
        if (precio) {
          // Asegurarse de que el precio tenga el formato correcto
          let precioFormateado = producto.precio;
          // Si el precio no tiene el símbolo de moneda, lo agregamos
          if (!/^[^0-9]/.test(precioFormateado)) {
            precioFormateado = `S/ ${precioFormateado}`;
          }
          precio.innerHTML = `
            <div class="precio-contenedor">
              <span class="precio-simbolo">S/</span>
              <span class="precio-numero">${precioFormateado.replace(/[^0-9.,]/g, '')}</span>
            </div>
          `;
          precio.classList.remove('loading');
        }
        
        if (descripcion) {
          descripcion.textContent = producto.descripcion;
          descripcion.classList.remove('loading');
        }
        
        // Actualizar el título de la página y la meta descripción
        document.title = `${producto.nombre} - Chifa El Punto`;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
          metaDesc.content = `${producto.nombre} - ${producto.descripcion.substring(0, 150)}...`;
        }
        
        // Actualizar sección de ingredientes y alérgenos
        if (seccionIngredientes) {
          seccionIngredientes.innerHTML = `
            ${producto.ingredientes ? renderizarIngredientes(producto.ingredientes) : ''}
            ${producto.alérgenos ? renderizarAlergenos(producto.alérgenos) : ''}
          `;
          
          // Añadir eventos a los checkboxes de ingredientes
          const checkboxes = seccionIngredientes.querySelectorAll('.ingrediente-check');
          checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
              const item = this.closest('li');
              if (this.checked) {
                item.classList.remove('ingrediente-eliminado');
              } else {
                item.classList.add('ingrediente-eliminado');
              }
            });
          });
        }
      } else {
        // Producto no encontrado
        if (contenedor) {
          contenedor.innerHTML = `
            <div class="producto-no-encontrado" style="text-align: center; width: 100%; padding: 50px 20px;">
              <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #d32f2f; margin-bottom: 20px;"></i>
              <h2 style="color: #333; margin-bottom: 15px;">Producto no encontrado</h2>
              <p style="color: #666; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                Lo sentimos, el producto que buscas no está disponible en este momento.
              </p>
              <a href="index2.html#menu" class="btn-volver" style="margin-top: 20px;">
                <i class="fas fa-arrow-left"></i> Volver al Menú
              </a>
            </div>
          `;
        }
      }
    } catch (error) {
      console.error('Error al cargar el producto:', error);
      mostrarError('Ocurrió un error al cargar la información del producto.');
    } finally {
      document.body.style.cursor = 'default';
    }
  }, 500); // Tiempo de carga simulado reducido
}

// Función para obtener los favoritos del localStorage
function obtenerFavoritos() {
  const favoritos = localStorage.getItem('favoritos');
  return favoritos ? JSON.parse(favoritos) : [];
}

// Función para guardar los favoritos en el localStorage
function guardarFavoritos(favoritos) {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// Función para verificar si un producto está en favoritos
function esFavorito(productoId) {
  const favoritos = obtenerFavoritos();
  return favoritos.includes(productoId);
}

// Función para alternar un producto en favoritos
function toggleFavorito(productoId, nombre) {
  const favoritos = obtenerFavoritos();
  const btnFavorito = document.getElementById('btn-favorito');
  const icono = btnFavorito.querySelector('i');
  
  if (esFavorito(productoId)) {
    // Eliminar de favoritos
    const nuevosFavoritos = favoritos.filter(id => id !== productoId);
    guardarFavoritos(nuevosFavoritos);
    btnFavorito.classList.remove('activo');
    icono.classList.remove('fas');
    icono.classList.add('far');
    mostrarMensaje(`"${nombre}" eliminado de favoritos`);
  } else {
    // Agregar a favoritos
    favoritos.push(productoId);
    guardarFavoritos(favoritos);
    btnFavorito.classList.add('activo');
    icono.classList.remove('far');
    icono.classList.add('fas');
    mostrarMensaje(`"${nombre}" agregado a favoritos`);
  }
}

// Función para mostrar mensajes temporales
function mostrarMensaje(mensaje) {
  // Verificar si ya existe un mensaje y eliminarlo
  const mensajeExistente = document.querySelector('.mensaje-flotante');
  if (mensajeExistente) {
    mensajeExistente.remove();
  }

  // Crear el elemento del mensaje
  const mensajeElemento = document.createElement('div');
  mensajeElemento.className = 'mensaje-flotante';
  mensajeElemento.textContent = mensaje;
  
  // Agregar el mensaje al body
  document.body.appendChild(mensajeElemento);
  
  // Hacer que el mensaje sea visible
  setTimeout(() => {
    mensajeElemento.style.opacity = '1';
    mensajeElemento.style.transform = 'translate(-50%, 0)';
  }, 10);
  
  // Eliminar el mensaje después de 3 segundos
  setTimeout(() => {
    mensajeElemento.style.opacity = '0';
    mensajeElemento.style.transform = 'translate(-50%, 20px)';
    
    // Eliminar el elemento después de la animación
    setTimeout(() => {
      mensajeElemento.remove();
    }, 300);
  }, 3000);
}

// Inicializar la página cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Cargar el producto
  cargarProducto();
  
  // Configurar eventos del contador
  const btnDisminuir = document.getElementById('disminuir');
  const btnAumentar = document.getElementById('aumentar');
  const inputCantidad = document.getElementById('cantidad');
  const btnFavorito = document.getElementById('btn-favorito');
  const btnCarrito = document.getElementById('btn-carrito');
  
  if (btnDisminuir && btnAumentar && inputCantidad) {
    btnDisminuir.addEventListener('click', () => actualizarCantidad(-1));
    btnAumentar.addEventListener('click', () => actualizarCantidad(1));
    
    // Validar entrada manual
    inputCantidad.addEventListener('change', function() {
      if (this.value < 1) this.value = 1;
    });
  }
  
  // Obtener el ID del producto actual de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productoId = urlParams.get('id');
  
  if (productoId && productos[productoId]) {
    const producto = productos[productoId];
    
    // Configurar favoritos
    if (btnFavorito) {
      // Verificar si el producto está en favoritos
      if (esFavorito(productoId)) {
        btnFavorito.classList.add('activo');
        const icono = btnFavorito.querySelector('i');
        icono.classList.remove('far');
        icono.classList.add('fas');
      }
      
      // Configurar el evento de clic para favoritos
      btnFavorito.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFavorito(productoId, producto.nombre);
      });
    }
    
    // Configurar el botón de añadir al carrito
    if (btnCarrito && inputCantidad) {
      btnCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Obtener la cantidad del input
        const cantidad = parseInt(inputCantidad.value) || 1;
        
        // Obtener el carrito actual del localStorage o crear uno nuevo
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        // Buscar si el producto ya está en el carrito
        const itemExistente = carrito.find(item => item.id === productoId);
        
        if (itemExistente) {
          // Si el producto ya está en el carrito, actualizar la cantidad
          itemExistente.cantidad += cantidad;
        } else {
          // Si no está en el carrito, agregarlo
          carrito.push({
            id: productoId,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio.replace('S/ ', '')),
            imagen: producto.imagen,
            cantidad: cantidad
          });
        }
        
        // Guardar el carrito actualizado en el localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        // Disparar un evento personalizado para notificar a otras pestañas
        const event = new StorageEvent('storage', {
          key: 'carrito',
          newValue: JSON.stringify(carrito),
          oldValue: localStorage.getItem('carrito'),
          storageArea: localStorage,
          url: window.location.href
        });
        window.dispatchEvent(event);
        
        // Mostrar notificación
        mostrarMensaje(`¡${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de ${producto.nombre} ${cantidad === 1 ? 'ha' : 'han'} sido añadida${cantidad === 1 ? '' : 's'} al carrito!`);
        
        // Actualizar el contador del carrito si existe en la página
        const carritoContador = document.getElementById('carritoContador');
        const carritoContenido = document.getElementById('carritoContenido');
        
        if (carritoContador) {
          const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
          carritoContador.textContent = totalItems;
          carritoContador.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        
        // Mostrar automáticamente el carrito si estamos en la página principal
        if (carritoContenido) {
          carritoContenido.classList.add('mostrar');
          carritoContenido.style.display = 'flex';
          carritoContenido.style.opacity = '1';
          carritoContenido.style.transform = 'translateY(0)';
          
          // Si existe la función para actualizar la vista del carrito, la llamamos
          if (typeof actualizarVistaCarrito === 'function') {
            actualizarVistaCarrito();
          }
        }
      });
    }
  }
});
