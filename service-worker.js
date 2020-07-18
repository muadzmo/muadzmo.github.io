// const CACHE_NAME = "firstpwa-v2";
// let urlsToCache = [
//   "/",
//   "/icon.png",
//   "/index.html",
//   "/manifest.json",
//   "/nav.html",
//   "/package.json",
//   "/push.js",
//   "/team.html",
//   "/js/api.js",
//   "/js/db.js",
//   "/js/idb.js",
//   "/js/materialize.min.js",
//   "/js/nav.js",
//   "/js/script.js",
//   "/js/team.js",
//   "/pages/home.html",
//   "/pages/favteam.html",
//   "/css/materialize.min.css",
//   "/favicon/android-icon-144x144.png",
//   "/favicon/android-icon-192x192.png",
//   "/favicon/favicon-32x32.png",
//   "/favicon/favicon-16x16.png",
//   "/favicon/favicon-96x96.png",
// ];

// self.addEventListener("install", (event) =>{
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache)=> {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (event) =>{
//   const base_url = "https://api.football-data.org/v2/";
//   const header = {
//     headers: {
//       "X-Auth-Token": "b40c7816650a44638b508fc392f5dac6",
//     },
//   };

//   if (event.request.url.indexOf(base_url) > -1) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then((cache) => {
//         return fetch(event.request).then((response) => {
//           cache.put(event.request.url, response.clone());
//           return response;
//         })
//       })
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request, { ignoreSearch: true }).then((response) => {
//         return response || fetch (event.request);
//       })
//     )
//   }
// });

// self.addEventListener("activate", (event) =>{
//   event.waitUntil(
//     caches.keys().then((cacheNames)=> {
//       return Promise.all(
//         cacheNames.map((cacheName)=> {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('push', function(event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//   var options = {
//     body: body,
//     icon: 'img/notification.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     }
//   };
//   event.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
     
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/team.html', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/icon.png', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/style.css', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/script.js', revision: '1' },
  { url: '/js/team.js', revision: '1' },
]);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('/favicon/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'favicon'
  })
);

workbox.routing.registerRoute(
  new RegExp('/team.html?'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'team'
    })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'football-api'
  })
);