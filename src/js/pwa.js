/* ============================================================
   Progressive-web-app registration.

   Registers the service worker when the page is served over
   http(s) and stays silent from file://, where service workers
   are unavailable and the console error would be noise.
   ============================================================ */
(function () {
  "use strict";

  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "http:" && location.protocol !== "https:") return;

  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js")["catch"](function () {
      /* An unregistered worker only costs offline use; the course
         itself is one file and works without it. */
    });
  });
})();
