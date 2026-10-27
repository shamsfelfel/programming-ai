/* ============================================================
   The bootstrapper.

   Every page loads this last. It starts whichever engines that
   page happens to have loaded - a lesson has no question bank, a
   test has no execution lab - records the visit, and sets up the
   two progressive-web-app pieces: the service worker that makes
   the course work offline, and the Install button that appears
   when the browser says the course can be installed.

   Order matters once: language and theme go first, so nothing
   draws a label in the wrong language or paints the wrong theme.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------------------------------------------------- service worker */

  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    /* Service workers need a secure context. From file:// the course
       still works - every asset is local - there is just no cache
       layer and no install prompt, so skip it quietly. */
    if (location.protocol !== "http:" && location.protocol !== "https:") return;

    var sw = navigator.serviceWorker;
    /* No controller on this load means nothing was cached yet, so a
       worker activating in a moment is the first copy and not an
       update: there is nothing to tell anybody about. */
    var first = !sw.controller;
    var base = window.OOP_BASE || "";

    try {
      sw.register(base + "sw.js", { scope: base || "./" })
        .then(function (reg) {
          if (first) return;
          watch(reg.waiting);
          watch(reg.installing);
          reg.addEventListener("updatefound", function () { watch(reg.installing); });
        })
        ["catch"](function () {
          /* An unregistered worker costs offline use and nothing else. */
        });
      if (!first) sw.addEventListener("controllerchange", announce);
    } catch (e) {}

    function watch(worker) {
      if (!worker) return;
      if (worker.state === "installed" || worker.state === "activated") {
        announce();
        return;
      }
      worker.addEventListener("statechange", function () {
        if (worker.state === "installed" || worker.state === "activated") announce();
      });
    }
  }

  /* ---------------------------------------------------------- update notice */

  /* A new build is a new worker with a new cache name, and the browser
     finds it by itself on any visit. Navigations are network-first, so a
     reader online is already seeing the new pages; what they are not
     seeing is the new stylesheets and question banks, which are served
     from whichever cache was active when the page loaded. One reload
     puts page and assets back on the same build.

     The page is never replaced underneath them. Losing your place
     mid-lesson to a deploy would be worse than reading a chapter that
     is a day old. */
  var noticed = false;

  function announce() {
    if (noticed) return;
    noticed = true;

    var bar = document.createElement("div");
    bar.className = "updbar";
    bar.setAttribute("role", "status");
    bar.innerHTML =
      '<p><span class="en">A newer version of the course is ready.</span>' +
      '<span class="ar">صدرت نسخة أحدث من المادة.</span></p>' +
      '<button class="btn" id="updNow" type="button">' +
      '<span class="en">Reload</span><span class="ar">تحديث</span></button>' +
      '<button class="btn updx" id="updLater" type="button" aria-label="dismiss">✕</button>';
    document.body.appendChild(bar);
    document.body.classList.add("has-updbar");

    /* The back-to-top button lives in the same corner, and the notice is
       two lines tall on a phone and one on a laptop, so its height is
       measured rather than guessed. */
    function measure() {
      if (!bar.parentNode) return;
      try {
        document.body.style.setProperty("--updbar-h", bar.offsetHeight + "px");
      } catch (e) {}
    }
    measure();
    window.addEventListener("resize", measure);
    document.addEventListener("oop:lang", measure);

    function close() {
      if (bar.parentNode) bar.parentNode.removeChild(bar);
      document.body.classList.remove("has-updbar");
      try { document.body.style.removeProperty("--updbar-h"); } catch (e) {}
    }
    document.getElementById("updNow").onclick = function () {
      close();
      location.reload();
    };
    document.getElementById("updLater").onclick = close;
  }

  /* ---------------------------------------------------------- install */

  /* Chrome and Edge fire beforeinstallprompt when the course passes
     the installability checks; we keep the event and offer a button
     in the top bar. iOS never fires it - there the route is
     Share -> Add to Home Screen - so no button appears and nothing
     claims otherwise. */
  function setupInstall() {
    var deferred = null;

    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferred = e;
      var bar = document.querySelector(".topbar");
      if (!bar || bar.querySelector("#installBtn")) return;

      var btn = document.createElement("button");
      btn.className = "btn install";
      btn.id = "installBtn";
      btn.type = "button";
      btn.setAttribute("data-ui", "install");
      btn.textContent = window.I18N ? window.I18N.t("install") : "Install";
      btn.onclick = function () {
        if (!deferred) return;
        deferred.prompt();
        deferred.userChoice.then(function () {
          deferred = null;
          if (btn.parentNode) btn.parentNode.removeChild(btn);
        });
      };
      var brand = bar.querySelector(".brand");
      if (brand && brand.nextSibling) bar.insertBefore(btn, brand.nextSibling);
      else bar.appendChild(btn);
    });

    window.addEventListener("appinstalled", function () {
      var b = document.getElementById("installBtn");
      if (b && b.parentNode) b.parentNode.removeChild(b);
    });
  }

  /* ---------------------------------------------------------- boot */

  function boot() {
    if (window.THEME) window.THEME.init();
    if (window.I18N) window.I18N.init();
    if (window.CHROME) window.CHROME.init();
    if (window.CODE) window.CODE.init();
    if (window.OOPAssess) window.OOPAssess.renderAll(document);
    if (window.OOPTrace) window.OOPTrace.mountAll(document);
    if (window.HOME) window.HOME.init();

    /* The shell, the copy buttons and the home page all add labels the
       language owns, and all of them are built after I18N.init(). One
       pass now catches every one of them. */
    if (window.I18N) window.I18N.relabel();
    if (window.THEME) window.THEME.apply(window.THEME.current(), false);

    var body = document.body;
    var id = body.getAttribute("data-page");
    if (id && window.PROGRESS) {
      window.PROGRESS.record(+(body.getAttribute("data-chapter") || 1), id);
    }

    registerSW();
    setupInstall();

    /* The e2e suite waits on this instead of a fixed timeout. */
    body.setAttribute("data-booted", "1");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();
