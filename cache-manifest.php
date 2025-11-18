<?php
/**
 * Cache Manifest para El Punto del Sabor
 * Implementa Application Cache para mejor rendimiento offline
 */

header('Content-Type: text/cache-manifest');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');

// Obtener versión actual para invalidar caché
$version = file_exists('version.txt') ? file_get_contents('version.txt') : '1.0.0';

echo "CACHE MANIFEST
# Version: {$version}

# Archivos caché principales
CACHE:
/index.html
/menu.html
/contacto.html
/pagar.html
/producto-detalle.html
/sabias-que.html

# CSS y JS minificados
/minified/carrito.min.js
/minified/notificaciones.min.js
/minified/navegacion.min.js
/minified/script.min.js
/js/pago-backend.js
/js/contacto-backend.js

# Imágenes optimizadas
/imagenes/logo.webp
/imagenes/arroz-chaufa.webp
/imagenes/pollo-chijaukay.webp
/imagenes/wantan.webp
/imagenes/banner-chifa.webp

# Fuentes Google Fonts
https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&family=Roboto:wght@300;400;700&display=swap

# Archivos que no deben cachearse
NETWORK:
/backend/api/*
*
http://*
https://*

# Página fallback para offline
FALLBACK:
/ /offline.html

# Archivos que requieren conexión
NETWORK:
/backend/api/pagar.php
/backend/api/contacto.php
";
?>
