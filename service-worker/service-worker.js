const CACHE_NAME = 'elpunto-cache-v5';
const CORE_ASSETS = [
  '/El-punto-del-sabor-/',
  '/El-punto-del-sabor-/index.html',
  '/El-punto-del-sabor-/menu.html',
  '/El-punto-del-sabor-/contacto.html',
  '/El-punto-del-sabor-/sabias-que.html',
  '/El-punto-del-sabor-/pagar.html',
  '/El-punto-del-sabor-/producto-detalle.html',
  '/El-punto-del-sabor-/manifest.webmanifest',
  '/El-punto-del-sabor-/imagenes/logo2.png'
];

// Función para normalizar URLs (remover query parameters y hash)
function normalizeUrl(url) {
  const parsed = new URL(url);
  return parsed.origin + parsed.pathname;
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('--- Iniciando caché de assets ---');
      for (const url of CORE_ASSETS) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Status: ${res.status}`);
          await cache.put(url, res);
          console.log(`✅ OK: ${url}`);
        } catch (err) {
          console.error(`❌ ERROR AL CACHEAR: ${url}`, err);
        }
      }
      console.log('--- Fin del proceso de instalación ---');
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // No cachear llamadas de backend: POST, PHP, o rutas /api
  if (req.method !== 'GET' || url.pathname.endsWith('.php') || url.pathname.startsWith('/api')) {
    return; // deja que el navegador maneje normalmente
  }

  // Evitar cachear respuestas parciales (Range requests) o medios segmentados
  if (req.headers.has('range')) {
    return; // deja que el navegador maneje la solicitud parcial (p.ej., audio/video)
  }

  // Network-first para documentos HTML (navegación)
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          // Solo cachear respuestas 200 OK completas
          if (res.ok && res.status === 200 && !res.headers.has('content-range')) {
            const resClone = res.clone();
            // Usar URL normalizada para cachear
            const normalizedReq = new Request(normalizeUrl(req.url), req);
            caches.open(CACHE_NAME).then(cache => cache.put(normalizedReq, resClone));
          }
          return res;
        })
        .catch(() => {
          // Intentar caché con URL normalizada primero
          const normalizedReq = new Request(normalizeUrl(req.url), req);
          return caches.match(normalizedReq).then(cached => {
            return cached || caches.match('/El-punto-del-sabor-/index.html');
          });
        })
    );
    return;
  }

  // Solo cachear assets del mismo origen
  if (url.origin !== self.location.origin) return;

  // Cache-first para demás assets (CSS, JS, imágenes)
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Solo cachear 200 OK y no parciales
        if (res.ok && res.status === 200 && !res.headers.has('content-range')) {
          const resClone = res.clone();
          // Usar URL normalizada para cachear assets también
          const normalizedReq = new Request(normalizeUrl(req.url), req);
          caches.open(CACHE_NAME).then(cache => cache.put(normalizedReq, resClone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
