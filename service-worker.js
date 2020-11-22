importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

const API_TOKEN = '301559f95b464ffb9aafa8290baaf6a6';
const CACHE_NAME = "football-v1";

workbox.precaching.precacheAndRoute([{
    url: "/",
    revision: '1'
  },
  {
    url: "/nav.html",
    revision: '1'
  },
  {
    url: "/index.html",
    revision: '1'
  },
  {
    url: "/clubs.html",
    revision: '1'
  },
  {
    url: "/src/pages/home.html",
    revision: '1'
  },
  {
    url: "/src/pages/about.html",
    revision: '1'
  },
  {
    url: "/src/pages/saved.html",
    revision: '1'
  },
  {
    url: "/src/pages/standings.html",
    revision: '1'
  },
  {
    url: "/src/pages/team.html",
    revision: '1'
  },
  {
    url: "/src/assets/image/Champions.png",
    revision: '1'
  },
  {
    url: "/src/assets/image/Logo.png",
    revision: '1'
  },
  {
    url: "/src/assets/image/main.jpg",
    revision: '1'
  },
  {
    url: "/src/assets/image/FOTO_RagaTantra.jpg",
    revision: '1'
  },
  {
    url: "/src/css/materialize.min.css",
    revision: '1'
  },
  {
    url: "/src/css/style.css",
    revision: '1'
  },
  {
    url: "/src/js/materialize.min.js",
    revision: '1'
  },
  {
    url: "/manifest.json",
    revision: '1'
  },
  {
    url: "push.js",
    revision: '1'
  },
  {
    url: "/src/js/nav.js",
    revision: '1'
  },
  {
    url: "/src/js/api.js",
    revision: '1'
  },
  {
    url: "/src/js/idb.js",
    revision: '1'
  },
  {
    url: "/src/js/db.js",
    revision: '1'
  },
  {
    url: "/icon.png",
    revision: '1'
  },
  {
    url: "/icon192.png",
    revision: '1'
  },
  {
    url: "/sw-register.js",
    revision: '1'
  },
  {
    url: "/service-worker.js",
    revision: '1'
  },
  {
    url: "https://fonts.googleapis.com/icon?family=Material+Icons",
    revision: '1'
  }
], {
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /\/(src)\/(assets)\/.*.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  new RegExp('^/src/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('^/src/css/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'style'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'footballApi'
  })
);

workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/icon?family=Material+Icons'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'Icons'
  })
);

// event push
self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Football-App', options)
  );
});