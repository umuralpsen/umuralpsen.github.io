const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/*'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request).then(fetchResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, fetchResponse.clone());
                        return fetchResponse;
                    });
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => response || fetch(event.request))
        );
    }
}); 