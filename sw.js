const CACHE_NAME = 'snake-game-v1';
const urlsToCache = [
    '/snake-game/',
    '/snake-game/index.html',
    '/snake-game/css/style.css',
    '/snake-game/css/theme.css',
    '/snake-game/css/responsive.css',
    '/snake-game/css/settings.css',
    '/snake-game/js/main.js',
    '/snake-game/js/game.js',
    '/snake-game/js/snake.js',
    '/snake-game/js/food.js',
    '/snake-game/js/canvas.js',
    '/snake-game/js/controller.js',
    '/snake-game/js/score.js',
    '/snake-game/js/config.js',
    '/snake-game/js/sound.js',
    '/snake-game/js/settings.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
