/* ============================================================
   Python OOP by Example — single-file shell.
   Inlined into python-oop-course.html by build_single.py.
   Vanilla JS, no libraries, works from file:// with no server.
   ============================================================ */
(function () {
  "use strict";

  /* Reading order for the pager, and the source of the drawer.
     `kind` only styles the drawer entry; "test" rows are indented
     under the lesson they examine. */
  var LESSONS = [
    { id: "index",          kind: "home",   en: "Course home",                       ar: "صفحة المقرر" },
    { id: "lesson-01",      kind: "lesson", en: "Objects & Classes",                 ar: "الكائنات والأصناف" },
    { id: "test-01",        kind: "test",   en: "Test 1",                            ar: "اختبار 1" },
    { id: "lesson-02",      kind: "lesson", en: "State, __init__ & Methods",         ar: "الحالة والمُنشئ والدوال" },
    { id: "test-02",        kind: "test",   en: "Test 2",                            ar: "اختبار 2" },
    { id: "lesson-03",      kind: "lesson", en: "Encapsulation",                     ar: "التغليف" },
    { id: "test-03",        kind: "test",   en: "Test 3",                            ar: "اختبار 3" },
    { id: "lesson-04",      kind: "lesson", en: "Abstraction & Clean Interfaces",    ar: "التجريد والواجهات" },
    { id: "test-04",        kind: "test",   en: "Test 4",                            ar: "اختبار 4" },
    { id: "lesson-05",      kind: "lesson", en: "Inheritance & Composition",         ar: "الوراثة والتركيب" },
    { id: "test-05",        kind: "test",   en: "Test 5",                            ar: "اختبار 5" },
    { id: "lesson-06",      kind: "lesson", en: "Polymorphism & Duck Typing",        ar: "تعدد الأشكال" },
    { id: "test-06",        kind: "test",   en: "Test 6",                            ar: "اختبار 6" },
    { id: "lesson-07",      kind: "lesson", en: "Capstone: Two Styles, One Program", ar: "المشروع الختامي" },
    { id: "test-07",        kind: "test",   en: "Test 7",                            ar: "اختبار 7" },
    { id: "lab",            kind: "lab",    en: "Execution Lab",                     ar: "مختبر التنفيذ" },
    { id: "chapter-test-a", kind: "exam",   en: "Chapter Test A — Core",             ar: "اختبار الفصل أ — الأساسيات" },
    { id: "chapter-test-b", kind: "exam",   en: "Chapter Test B — Advanced",         ar: "اختبار الفصل ب — المتقدم" }
  ];

  var UI = {
    menu:   { en: "Lessons", ar: "الدروس" },
    prev:   { en: "Previous", ar: "السابق" },
    next:   { en: "Next",     ar: "التالي" },
    brand:  { en: "Python OOP by Example", ar: "البرمجة الكائنية بلغة بايثون" },
    copy:   { en: "copy", ar: "نسخ" },
    copied: { en: "copied", ar: "تم النسخ" },
    score:  { en: "Score: {a} / {b} correct", ar: "النتيجة: {a} من {b} صحيحة" },
    onpage: { en: "On this page", ar: "في هذه الصفحة" },
    chapter:{ en: "Chapter 1", ar: "الفصل 1" }
  };

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var root = document.documentElement;
  var current = "index";

  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    set("oop.theme", t);
    var b = document.getElementById("themeBtn");
    if (b) b.textContent = t === "dark" ? "☀︎" : "☾";
  }

  function applyLang(l) {
    root.setAttribute("lang", l);
    root.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
    set("oop.lang", l);
    var b = document.getElementById("langBtn");
    if (b) b.textContent = l === "ar" ? "EN" : "ع";
    var els = document.querySelectorAll("[data-ui]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-ui");
      if (UI[key]) els[i].textContent = UI[key][l];
    }
    var t = document.querySelector("title");
    if (t && t.getAttribute("data-" + l)) document.title = t.getAttribute("data-" + l);
    updateScores();
    buildJumpList();
    try {
      document.dispatchEvent(new CustomEvent("oop:lang", { detail: l }));
    } catch (e) {}
  }

  function buildChrome() {
    var bar = document.createElement("header");
    bar.className = "topbar";
    bar.innerHTML =
      '<button class="btn" id="menuBtn" aria-label="menu">☰</button>' +
      '<a class="brand" href="#index"><span class="dot"></span>' +
      '<span class="t" data-ui="brand"></span></a>' +
      '<button class="btn" id="langBtn" aria-label="language"></button>' +
      '<button class="btn" id="themeBtn" aria-label="theme"></button>';
    document.body.insertBefore(bar, document.body.firstChild);

    var prog = document.createElement("div");
    prog.className = "progress";
    prog.id = "prog";
    document.body.appendChild(prog);

    var scrim = document.createElement("div");
    scrim.className = "scrim";
    var drawer = document.createElement("nav");
    drawer.className = "drawer";
    var h = '<h2 data-ui="menu"></h2><ol>';
    for (var i = 0; i < LESSONS.length; i++) {
      h += '<li class="nv-' + (LESSONS[i].kind || "lesson") + '">' +
           '<a href="#' + LESSONS[i].id + '" data-goto="' + LESSONS[i].id + '">' +
           '<span><span class="en">' + LESSONS[i].en + '</span>' +
           '<span class="ar">' + LESSONS[i].ar + '</span></span></a></li>';
    }
    h += '</ol><div class="jump"><h2 data-ui="onpage"></h2><ul id="jumpList"></ul></div>';
    drawer.innerHTML = h;
    document.body.appendChild(scrim);
    document.body.appendChild(drawer);

    function toggle(open) {
      drawer.classList.toggle("open", open);
      scrim.classList.toggle("open", open);
    }
    document.getElementById("menuBtn").onclick = function () {
      toggle(!drawer.classList.contains("open"));
    };
    scrim.onclick = function () { toggle(false); };
    drawer.onclick = function (e) {
      var n = e.target;
      while (n && n !== drawer) {
        if (n.tagName === "A") { toggle(false); return; }
        n = n.parentNode;
      }
    };
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") toggle(false);
    });

    document.getElementById("themeBtn").onclick = function () {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    };
    document.getElementById("langBtn").onclick = function () {
      applyLang(root.getAttribute("lang") === "ar" ? "en" : "ar");
    };

    var top = document.createElement("button");
    top.className = "backtop";
    top.id = "backtop";
    top.setAttribute("aria-label", "top");
    top.textContent = "↑";
    top.onclick = function () { window.scrollTo(0, 0); };
    document.body.appendChild(top);
  }

  function addPager(sec, idx) {
    if (sec.querySelector(".pager")) return;
    var prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    var p = document.createElement("nav");
    p.className = "pager";
    p.innerHTML =
      (prev ? '<a class="prev" href="#' + prev.id + '" data-goto="' + prev.id + '">' +
              '<span class="mini" data-ui="prev"></span><span class="en">' + prev.en +
              '</span><span class="ar">' + prev.ar + '</span></a>'
            : '<a class="prev disabled" href="#index">&nbsp;</a>') +
      (next ? '<a class="next" href="#' + next.id + '" data-goto="' + next.id + '">' +
              '<span class="mini" data-ui="next"></span><span class="en">' + next.en +
              '</span><span class="ar">' + next.ar + '</span></a>'
            : '<a class="next disabled" href="#index">&nbsp;</a>');
    sec.appendChild(p);
  }

  /* The drawer's second half: every concept heading on the open page,
     so a reader can land on a section instead of the page top. */
  function buildJumpList() {
    var list = document.getElementById("jumpList");
    if (!list) return;
    var sec = document.getElementById(current);
    if (!sec) { list.innerHTML = ""; return; }
    var hs = sec.querySelectorAll("h2[id], h3[id]");
    var h = "";
    for (var i = 0; i < hs.length; i++) {
      var en = hs[i].querySelector(".en"), ar = hs[i].querySelector(".ar");
      if (!en && !ar) continue;
      h += '<li class="' + hs[i].tagName.toLowerCase() + '">' +
           '<a href="#' + hs[i].id + '">' +
           '<span class="en">' + (en ? en.innerHTML : "") + '</span>' +
           '<span class="ar">' + (ar ? ar.innerHTML : "") + '</span></a></li>';
    }
    list.innerHTML = h;
  }

  /* An id is either a page of its own or something inside one. For the
     second case the page has to be shown before the browser can scroll
     to it, because inactive pages are display:none. */
  function pageOf(id) {
    var el = document.getElementById(id);
    if (!el) return null;
    if (el.tagName === "SECTION" && el.className.indexOf("page") > -1) {
      return { page: id, anchor: null };
    }
    var n = el.parentNode;
    while (n && !(n.tagName === "SECTION" && n.className && n.className.indexOf("page") > -1)) {
      n = n.parentNode;
    }
    return n ? { page: n.id, anchor: id } : null;
  }

  function scrollTo(anchor) {
    var el = anchor && document.getElementById(anchor);
    if (!el) { window.scrollTo(0, 0); return; }
    var bar = document.querySelector(".topbar");
    var pad = (bar ? bar.offsetHeight : 48) + 12;
    var y = el.getBoundingClientRect().top + (window.pageYOffset || 0) - pad;
    window.scrollTo(0, y < 0 ? 0 : y);
  }

  function show(id, push, anchor) {
    var idx = -1;
    for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) idx = i;
    if (idx < 0) { id = "index"; idx = 0; }
    var secs = document.querySelectorAll("section.page");
    for (var j = 0; j < secs.length; j++) secs[j].classList.remove("active");
    var sec = document.getElementById(id);
    sec.classList.add("active");
    current = id;
    addPager(sec, idx);
    paintCode(sec);
    var links = document.querySelectorAll(".drawer a");
    for (var k = 0; k < links.length; k++) {
      links[k].classList.toggle("current", links[k].getAttribute("data-goto") === id);
    }
    applyLang(root.getAttribute("lang") || "en");
    if (push && location.hash !== "#" + id) {
      try { history.replaceState(null, "", "#" + id); }
      catch (e) { location.hash = id; }
    }
    if (window.OOPAssess) window.OOPAssess.renderAll(sec);
    if (window.OOPTrace) window.OOPTrace.mountAll(sec);
    paintCode(sec);
    buildJumpList();
    scrollTo(anchor);
    set("oop.page", id);
    updateProgress();
  }

  document.addEventListener("click", function (e) {
    var n = e.target;
    while (n && n.tagName !== "A") n = n.parentNode;
    if (!n || !n.getAttribute) return;
    var href = n.getAttribute("href") || "";
    if (href.charAt(0) !== "#" || href.length < 2) return;
    var hit = pageOf(href.slice(1));
    if (!hit) return;
    e.preventDefault();
    if (hit.page === current) { scrollTo(hit.anchor); setHash(href.slice(1)); return; }
    show(hit.page, false, hit.anchor);
    setHash(href.slice(1));
  });

  function setHash(id) {
    if (location.hash === "#" + id) return;
    try { history.replaceState(null, "", "#" + id); }
    catch (e) { location.hash = id; }
  }

  window.addEventListener("hashchange", function () {
    var id = location.hash.slice(1);
    if (!id) return;
    var hit = pageOf(id);
    if (!hit) return;
    if (hit.page !== current) show(hit.page, false, hit.anchor);
    else scrollTo(hit.anchor);
  });

  function updateProgress() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    var bar = document.getElementById("prog");
    if (bar) bar.style.width = pct + "%";
    var bt = document.getElementById("backtop");
    if (bt) bt.classList.toggle("show", h.scrollTop > 700);
  }
  window.addEventListener("scroll", updateProgress);

  var KW = ("False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|" +
            "finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield").split("|");
  var BUILTIN = ("print|len|range|str|int|float|bool|list|dict|set|tuple|sum|min|max|sorted|enumerate|zip|" +
                 "round|abs|input|open|isinstance|hasattr|getattr|setattr|type|property|staticmethod|classmethod|" +
                 "super|object|Exception|ValueError|TypeError|KeyError|AttributeError|NotImplementedError|ABC|" +
                 "abstractmethod|dataclass|datetime|date|Decimal").split("|");

  var RE = new RegExp(
    '("""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|"(?:[^"\\\\\\n]|\\\\.)*"|\'(?:[^\'\\\\\\n]|\\\\.)*\')' +
    '|(#[^\\n]*)' +
    '|\\b(self|cls)\\b' +
    '|\\b(' + KW.join('|') + ')\\b' +
    '|\\b(' + BUILTIN.join('|') + ')\\b' +
    '|\\b(\\d+(?:\\.\\d+)?)\\b', 'g');

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(src) {
    var out = "", last = 0, m;
    RE.lastIndex = 0;
    while ((m = RE.exec(src)) !== null) {
      out += esc(src.slice(last, m.index));
      var cls = m[1] ? "t-str" : m[2] ? "t-com" : m[3] ? "t-self" :
                m[4] ? "t-kw" : m[5] ? "t-fn" : "t-num";
      out += '<span class="' + cls + '">' + esc(m[0]) + "</span>";
      last = m.index + m[0].length;
    }
    return out + esc(src.slice(last));
  }

  /* The trace lab renders code line by line with its own markup, so it
     needs the same tokeniser without going through paintCode. */
  window.OOPHighlight = highlight;

  function paintCode(scope) {
    var codes = (scope || document).querySelectorAll("pre.code > code");
    for (var i = 0; i < codes.length; i++) {
      var code = codes[i];
      if (code.getAttribute("data-done")) continue;
      var src = code.textContent.replace(/^\n/, "").replace(/\s+$/, "");
      code.innerHTML = highlight(src);
      code.setAttribute("data-done", "1");
      addCopy(code, src);
    }
  }

  function addCopy(code, src) {
    var btn = document.createElement("button");
    btn.className = "copy";
    btn.setAttribute("data-ui", "copy");
    btn.textContent = UI.copy[root.getAttribute("lang") || "en"];
    btn.onclick = function () {
      var lang = root.getAttribute("lang") || "en";
      var done = function () {
        btn.textContent = UI.copied[lang];
        setTimeout(function () {
          btn.textContent = UI.copy[root.getAttribute("lang") || "en"];
        }, 1400);
      };
      var started = false;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(src).then(done, function () {});
          started = true;
        }
      } catch (e) {}
      if (!started) {
        var ta = document.createElement("textarea");
        ta.value = src;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e2) {}
        document.body.removeChild(ta);
      }
    };
    code.parentNode.appendChild(btn);
  }

  function wireQuizzes() {
    var quizzes = document.querySelectorAll(".quiz");
    for (var i = 0; i < quizzes.length; i++) {
      (function (quiz) {
        var opts = quiz.querySelectorAll(".opt");
        for (var j = 0; j < opts.length; j++) {
          opts[j].onclick = function () {
            if (quiz.getAttribute("data-answered")) return;
            quiz.setAttribute("data-answered", "1");
            var correct = this.getAttribute("data-correct") === "true";
            quiz.setAttribute("data-correct", correct ? "1" : "0");
            for (var k = 0; k < opts.length; k++) {
              opts[k].disabled = true;
              if (opts[k].getAttribute("data-correct") === "true") {
                opts[k].classList.add("right");
              }
            }
            if (!correct) this.classList.add("wrong");
            var fb = quiz.querySelector(".feedback");
            if (fb) fb.hidden = false;
            updateScores();
          };
        }
      })(quizzes[i]);
    }
  }

  function sectionOf(el) {
    var n = el;
    while (n && !(n.tagName === "SECTION" && n.className.indexOf("page") > -1)) {
      n = n.parentNode;
    }
    return n;
  }

  function updateScores() {
    var lang = root.getAttribute("lang") || "en";
    var boxes = document.querySelectorAll(".score");
    for (var i = 0; i < boxes.length; i++) {
      var sec = sectionOf(boxes[i]);
      var quizzes = (sec || document).querySelectorAll(".quiz");
      var total = quizzes.length, right = 0, done = 0;
      for (var j = 0; j < quizzes.length; j++) {
        if (quizzes[j].getAttribute("data-answered")) {
          done++;
          if (quizzes[j].getAttribute("data-correct") === "1") right++;
        }
      }
      boxes[i].textContent = UI.score[lang].replace("{a}", right).replace("{b}", total);
      boxes[i].style.display = done ? "inline-block" : "none";
    }
  }

  function boot() {
    buildChrome();
    wireQuizzes();
    var savedTheme = get("oop.theme") || root.getAttribute("data-theme");
    if (!savedTheme && window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches) savedTheme = "dark";
    applyTheme(savedTheme || "light");
    applyLang(get("oop.lang") || "en");
    var want = location.hash.slice(1) || get("oop.page") || "index";
    var hit = pageOf(want) || { page: "index", anchor: null };
    show(hit.page, true, hit.anchor);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else { boot(); }
})();

