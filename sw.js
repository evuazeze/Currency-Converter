var staticCacheName = 'currency-static-v70';
var allCaches = [
  staticCacheName];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        './',
        './scripts/main.js',
        './scripts/views/View.js',
        './scripts/models/Model.js',
        './scripts/Controller.js',
        './scripts/idb/CurrencyIDB.js',
        './styles/styles.css',
        'https://free.currencyconverterapi.com/api/v5/currencies'
        // 'images/icons/icon-48x48.png',
        // 'images/icons/icon-96x96.png',
        // 'images/icons/icon-128x128.png',
        // 'images/icons/icon-144x144.png'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('currency-') && !allCaches.includes(cacheName);;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});