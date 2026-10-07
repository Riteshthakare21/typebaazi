/**
 * TypeBaazi Production Service Worker (v6)
 * High-performance, fault-tolerant offline and caching strategy.
 * Guaranteed zero ERR_FAILED errors for direct visits, Google Search referrals, and offline modes.
 */

const CACHE_NAME = 'typebaazi-v6';

const STATIC_ROUTES = [
  '/',
  '/typing-test',
  '/leaderboard',
  '/race',
  '/games',
  '/daily-challenge',
  '/dashboard',
  '/learn',
  '/about',
  '/marathi-typing-test',
  '/marathi-typing-practice',
  '/english-typing-test',
  '/typing-speed-test',
  '/government-exam-typing-practice',
  '/typing-race',
  '/typing-games',
  '/daily-typing-challenge',
  '/learn-typing',
  '/about-us',
  '/contact',
  '/contact-us',
  '/privacy',
  '/privacy-policy',
  '/terms',
  '/terms-and-conditions',
  '/favicon.svg?v=3',
  '/favicon.ico?v=3',
  '/manifest.json',
  '/manifest.webmanifest',
  '/icons/icon-48.png',
  '/icons/icon-96.png',
  '/icons/icon-144.png',
  '/icons/icon-192.png?v=3',
  '/icons/icon-512.png?v=3',
  '/icons/icon-maskable-192.png?v=3',
  '/icons/icon-maskable-512.png?v=3',
  '/icons/apple-touch-icon.png?v=3'
];

// Install: Pre-cache all essential routes and assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        STATIC_ROUTES.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => {
            // Ignore single asset fetch failure so SW installs reliably
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// Activate: Purge older cache versions and immediately take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Fault-tolerant routing with guaranteed response delivery
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 1. Only handle GET requests from our own origin
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 2. Ignore non-page API or analytics requests
  if (url.pathname.startsWith('/api/') || url.pathname.includes('google-analytics')) {
    return;
  }

  // 3. HTML Navigation requests (direct URL visits, Google Search links, page refreshes)
  // Strategy: Network-First with Cache Fallback (guarantees fresh page & no ERR_FAILED)
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(async () => {
          // If offline or network unavailable, check cache with query params ignored
          const cache = await caches.open(CACHE_NAME);
          const cachedMatch =
            (await cache.match(req, { ignoreSearch: true })) ||
            (await cache.match(url.pathname, { ignoreSearch: true })) ||
            (await cache.match(url.pathname.replace(/\/$/, ''), { ignoreSearch: true })) ||
            (await cache.match('/', { ignoreSearch: true }));

          if (cachedMatch) {
            return cachedMatch;
          }

          // Fallback offline HTML page if nothing is cached
          return new Response(
            `<!DOCTYPE html>
            <html lang="en" data-theme="dark">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>TypeBaazi — Offline Mode</title>
              <style>
                body { background: #060913; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; padding: 20px; }
                .box { background: rgba(14, 20, 36, 0.9); border: 1.5px solid #00f0ff; border-radius: 16px; padding: 32px; max-width: 460px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
                h1 { color: #00f0ff; font-size: 24px; margin-bottom: 12px; }
                p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
                a { display: inline-block; background: #00f0ff; color: #000; font-weight: 800; text-decoration: none; padding: 12px 24px; border-radius: 8px; }
              </style>
            </head>
            <body>
              <div class="box">
                <h1>⚡ TypeBaazi</h1>
                <p>You appear to be offline. Reconnect to the internet to load this typing page.</p>
                <a href="/">Return to Home</a>
              </div>
            </body>
            </html>`,
            {
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
              status: 200
            }
          );
        })
    );
    return;
  }

  // 4. Static Assets (CSS, JS, Fonts, Images, Audio)
  // Strategy: Cache-First with Background Revalidation
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cachedRes) => {
      if (cachedRes) {
        // Fetch update in background without blocking
        fetch(req)
          .then((networkRes) => {
            if (networkRes && networkRes.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(req, networkRes));
            }
          })
          .catch(() => {});
        return cachedRes;
      }

      // If not in cache, fetch from network and cache
      return fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(() => {
          // If asset fetch fails, return transparent 1x1 image or empty 204 response
          if (req.destination === 'image') {
            return new Response('', { status: 204 });
          }
          return new Response('', { status: 408 });
        });
    })
  );
});

// Notification Click Handler: Focus active window or open daily challenge / typing test
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = (event.notification.data && event.notification.data.url) || '/daily-challenge';

  if (event.action === 'dismiss') {
    return;
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Push Event: Handle background push messages for streak alerts (App & Web)
self.addEventListener('push', (event) => {
  let data = {
    title: '🔥 Your Streak Will Break Today!',
    body: 'Complete 1 quick typing test now to keep your daily streak alive!',
    url: '/daily-challenge'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      tag: 'typebaazi-streak-reminder',
      vibrate: [200, 100, 200],
      renotify: true,
      data: { url: data.url || '/daily-challenge' },
      actions: [
        { action: 'practice', title: '⚡ Practice Now' },
        { action: 'dismiss', title: 'Later' }
      ]
    })
  );
});

// Periodic Background Sync for App and Web
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'streak-reminder-sync') {
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
        if (clients.length === 0) {
          const now = new Date();
          const hour = now.getHours();
          if (hour === 14 || hour === 20) {
            return self.registration.showNotification('🔥 Your Typing Streak Will Break Soon!', {
              body: 'Take 60 seconds to complete today\'s typing test and keep your streak safe.',
              icon: '/icons/icon-192.png',
              badge: '/icons/icon-192.png',
              tag: 'typebaazi-streak-reminder',
              vibrate: [200, 100, 200],
              data: { url: '/daily-challenge' }
            });
          }
        }
      })
    );
  }
});
