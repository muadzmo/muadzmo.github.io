self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

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