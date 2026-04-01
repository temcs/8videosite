
      const CACHE_NAME = 'siteforge-export-v2';
      const ASSETS = ["./","./manifest.json","./robots.txt","./sitemap.xml","./sw.js","./css/style.css","./js/cart.js","./assets/icon-192.png","./assets/icon-512.png","./index.html","./gift.html","./wining.html"];

      self.addEventListener('install', (event) => {
        event.waitUntil(
          caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
        );
      });

      self.addEventListener('activate', (event) => {
        event.waitUntil(
          caches.keys().then((keys) => Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : Promise.resolve()))).then(() => self.clients.claim())
        );
      });

      self.addEventListener('fetch', (event) => {
        const request = event.request;
        if (request.method !== 'GET') return;

        if (request.mode === 'navigate') {
          event.respondWith(
            fetch(request).catch(() => caches.match('./index.html'))
          );
          return;
        }

        event.respondWith(
          caches.match(request).then((cached) => {
            if (cached) return cached;
            return fetch(request).then((response) => {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
              return response;
            });
          })
        );
      });
    