/* ============================================================
   Service worker.

   The course is a handful of static files and the chapter itself
   is one of them, so the whole thing is precached on install and
   served from the cache afterwards. That is what makes it usable
   on a phone with no connection, which is the point of shipping
   it as a PWA rather than a web page.

   Bump CACHE on every deploy: the old cache is deleted on
   activate, so a new version never serves a stale chapter.
   ============================================================ */
var CACHE = "oop-course-v1";

var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* One bad URL would reject the whole addAll and leave the
         worker uninstalled, so each asset is added on its own. */
      return Promise.all(ASSETS.map(function (url) {
        return c.add(url)["catch"](function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        return k === CACHE ? null : caches["delete"](k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* A navigation is answered from the cache first so the course
     opens instantly and offline; the network copy refreshes the
     cache in the background for next time. */
  if (req.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then(function (hit) {
        var live = fetch(req).then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put("./index.html", copy); });
          }
          return res;
        })["catch"](function () { return hit; });
        return hit || live;
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
