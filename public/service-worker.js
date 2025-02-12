
const CACHE_NAME = 'nourish-navigator-v1';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo192.png',
  '/logo512.png',
  OFFLINE_URL,
  '/placeholder.svg'
];

// Queue for storing failed requests
let syncQueue = [];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(urlsToCache)),
      // Create object store for offline data
      initializeDB()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // Handle API requests differently
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Store failed requests for later sync
          if (event.request.method !== 'GET') {
            syncQueue.push({
              url: event.request.url,
              method: event.request.method,
              body: event.request.clone().text(),
              timestamp: Date.now()
            });
          }
          return new Response(JSON.stringify({ error: 'offline' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('offline', { status: 503 });
          });
      })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-queue') {
    event.waitUntil(
      Promise.all(
        syncQueue.map(async (request) => {
          try {
            await fetch(request.url, {
              method: request.method,
              body: await request.body,
              headers: { 'Content-Type': 'application/json' }
            });
            // Remove from queue if successful
            syncQueue = syncQueue.filter(r => r !== request);
          } catch (error) {
            console.error('Sync failed:', error);
          }
        })
      )
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Initialize IndexedDB for offline data storage
async function initializeDB() {
  const db = await openDB('NourishNavigatorDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('offlineData')) {
        db.createObjectStore('offlineData', { keyPath: 'id', autoIncrement: true });
      }
    }
  });
  return db;
}

// Helper function to open IndexedDB
function openDB(name, version, upgradeCallback) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => upgradeCallback(event.target.result);
  });
}
