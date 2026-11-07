const CACHE_NAME = "siddhivinayak-stock-pwa-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith("siddhivinayak-stock-pwa-") && name !== CACHE_NAME).map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Never cache Supabase, authentication, Edge Functions, or external APIs.
  if (url.origin !== self.location.origin || url.pathname.includes("/functions/") || url.pathname.includes("/auth/") || url.pathname.includes("/rest/") || url.pathname.includes("/storage/")) return;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put("./index.html", response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match("./index.html")) || (await caches.match("./"));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      return await fetch(request);
    } catch (_) {
      return Response.error();
    }
  })());
});
