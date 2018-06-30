var staticCacheName = 'currency-static-v3';
var contentImgsCache = 'jbkjj';
var allCaches = [
  staticCacheName,
  contentImgsCache
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'scripts/main.js',
        'scripts/views/View.js',
        'scripts/models/Model.js',
        'scripts/IndexController.js',
        'styles/styles.css',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
        'https://free.currencyconverterapi.com/api/v5/currencies'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('currency-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  // var requestUrl = new URL(event.request.url);

  // if (requestUrl.origin === location.origin) {
  //   if (requestUrl.pathname === '/') {
  //     event.respondWith(caches.match('/skeleton'));
  //     return;
  //   }
  //   if (requestUrl.pathname.startsWith('/photos/')) {
  //     event.respondWith(servePhoto(event.request));
  //     return;
  //   }
  //   // TODO: respond to avatar urls by responding with
  //   // the return value of serveAvatar(event.request)
  //   if (requestUrl.pathname.startsWith('/avatars')) {
  //   	event.respondWith(serveAvatar(event.request));
  //   	return;
  //   }
  // }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
