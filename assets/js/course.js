/* ============================================================
   The course registry and the UI strings.

   One list describes the whole course: which chapters exist,
   which pages each chapter holds, in what reading order, and
   where each page lives on disk. Everything else - the drawer,
   the breadcrumbs, the previous/next pager, the service-worker
   precache list, even the build - reads this list rather than
   hard-coding a path.

   `href` is always relative to the site root. A page turns it
   into a working link by prefixing window.OOP_BASE, which each
   page sets to the number of ../ it needs. That is what lets the
   same files serve from a domain root and from a GitHub Pages
   project subpath without a rewrite.
   ============================================================ */
(function () {
  "use strict";

  var CHAPTERS = [
    {
      num: 1,
      slug: "chapter-1",
      href: "chapters/chapter-1.html",
      ready: true,
      title: { en: "Object-Oriented Python", ar: "البرمجة الكائنية في بايثون" },
      blurb: {
        en: "Seven lessons that each open with code that hurts and rebuild it with the one OOP idea that fixes that exact pain.",
        ar: "سبعة دروس يبدأ كل منها بكود مؤلم ثم يعيد بناءه بالفكرة الكائنية الوحيدة التي تعالج ذلك الألم بعينه."
      },
      stats: { lessons: 7, questions: 144, exercises: 28, traces: 8 },
      pages: [
        { id: "chapter", kind: "chapter", href: "chapters/chapter-1.html",
          en: "Chapter 1 home", ar: "صفحة الفصل 1" },

        { id: "lesson-01", kind: "lesson", n: 1, href: "lessons/chapter-1-lesson-1.html",
          en: "Objects & Classes", ar: "الكائنات والأصناف" },
        { id: "test-01", kind: "test", of: 1, bank: "test-01", href: "tests/chapter-1-test-1.html",
          en: "Test 1", ar: "اختبار 1" },

        { id: "lesson-02", kind: "lesson", n: 2, href: "lessons/chapter-1-lesson-2.html",
          en: "State, __init__ & Methods", ar: "الحالة والمُنشئ والدوال" },
        { id: "test-02", kind: "test", of: 2, bank: "test-02", href: "tests/chapter-1-test-2.html",
          en: "Test 2", ar: "اختبار 2" },

        { id: "lesson-03", kind: "lesson", n: 3, href: "lessons/chapter-1-lesson-3.html",
          en: "Encapsulation", ar: "التغليف" },
        { id: "test-03", kind: "test", of: 3, bank: "test-03", href: "tests/chapter-1-test-3.html",
          en: "Test 3", ar: "اختبار 3" },

        { id: "lesson-04", kind: "lesson", n: 4, href: "lessons/chapter-1-lesson-4.html",
          en: "Abstraction & Clean Interfaces", ar: "التجريد والواجهات" },
        { id: "test-04", kind: "test", of: 4, bank: "test-04", href: "tests/chapter-1-test-4.html",
          en: "Test 4", ar: "اختبار 4" },

        { id: "lesson-05", kind: "lesson", n: 5, href: "lessons/chapter-1-lesson-5.html",
          en: "Inheritance & Composition", ar: "الوراثة والتركيب" },
        { id: "test-05", kind: "test", of: 5, bank: "test-05", href: "tests/chapter-1-test-5.html",
          en: "Test 5", ar: "اختبار 5" },

        { id: "lesson-06", kind: "lesson", n: 6, href: "lessons/chapter-1-lesson-6.html",
          en: "Polymorphism & Duck Typing", ar: "تعدد الأشكال" },
        { id: "test-06", kind: "test", of: 6, bank: "test-06", href: "tests/chapter-1-test-6.html",
          en: "Test 6", ar: "اختبار 6" },

        { id: "lesson-07", kind: "lesson", n: 7, href: "lessons/chapter-1-lesson-7.html",
          en: "Capstone: Two Styles, One Program", ar: "المشروع الختامي" },
        { id: "test-07", kind: "test", of: 7, bank: "test-07", href: "tests/chapter-1-test-7.html",
          en: "Test 7", ar: "اختبار 7" },

        { id: "lab", kind: "lab", href: "labs/chapter-1-lab.html",
          en: "Execution Lab", ar: "مختبر التنفيذ" },
        { id: "chapter-test-a", kind: "exam", bank: "chapter-test-a", href: "exams/chapter-1-exam-a.html",
          en: "Chapter Test A — Core", ar: "اختبار الفصل أ — الأساسيات" },
        { id: "chapter-test-b", kind: "exam", bank: "chapter-test-b", href: "exams/chapter-1-exam-b.html",
          en: "Chapter Test B — Advanced", ar: "اختبار الفصل ب — المتقدم" }
      ]
    },

    {
      num: 2,
      slug: "chapter-2",
      href: "chapters/chapter-2.html",
      ready: true,
      title: { en: "OOP Design Patterns for ML", ar: "أنماط التصميم الكائني للتعلّم الآلي" },
      blurb: {
        en: "Four patterns, each arriving because a plain function has just failed in a way that raises nothing.",
        ar: "أربعة أنماط، يأتي كلٌّ منها لأنّ دالةً عادية فشلت فشلًا لا يرفع خطأً."
      },
      stats: { lessons: 2, questions: 56, exercises: 6, traces: 4 },
      pages: [
        { id: "chapter-2", kind: "chapter", href: "chapters/chapter-2.html",
          en: "Chapter 2 home", ar: "صفحة الفصل 2" },

        { id: "lesson-08", kind: "lesson", n: 8, href: "lessons/chapter-2-lesson-8.html",
          en: "Steps That Remember", ar: "خطواتٌ تتذكّر" },
        { id: "test-08", kind: "test", of: 8, bank: "test-08", href: "tests/chapter-2-test-8.html",
          en: "Test 8", ar: "اختبار 8" },

        { id: "lesson-09", kind: "lesson", n: 9, href: "lessons/chapter-2-lesson-9.html",
          en: "Pipelines & Decorators", ar: "المسارات والمزخرِفات" },
        { id: "test-09", kind: "test", of: 9, bank: "test-09", href: "tests/chapter-2-test-9.html",
          en: "Test 9", ar: "اختبار 9" },

        { id: "chapter-02-test-a", kind: "exam", bank: "chapter-02-test-a", href: "exams/chapter-2-exam-a.html",
          en: "Chapter Test A — Core", ar: "اختبار الفصل أ — الأساسيات" },
        { id: "chapter-02-test-b", kind: "exam", bank: "chapter-02-test-b", href: "exams/chapter-2-exam-b.html",
          en: "Chapter Test B — Advanced", ar: "اختبار الفصل ب — المتقدم" }
      ]
    },

    {
      num: 3,
      slug: "chapter-3",
      href: "chapters/chapter-3.html",
      ready: true,
      title: { en: "NumPy Fundamentals", ar: "أساسيات NumPy" },
      blurb: {
        en: "The list version does something absurd, the array version does it in one line — and then the array does something absurd of its own, in silence.",
        ar: "نسخةُ القائمة تفعل شيئًا عبثيًا، ونسخةُ المصفوفة تفعله في سطر — ثم تفعل المصفوفةُ عبثها الخاص، في صمت."
      },
      stats: { lessons: 4, questions: 88, exercises: 12, traces: 4 },
      pages: [
        { id: "chapter-3", kind: "chapter", href: "chapters/chapter-3.html",
          en: "Chapter 3 home", ar: "صفحة الفصل 3" },

        { id: "lesson-10", kind: "lesson", n: 10, href: "lessons/chapter-3-lesson-10.html",
          en: "One Type, Many Numbers", ar: "نوعٌ واحد وأعداد كثيرة" },
        { id: "test-10", kind: "test", of: 10, bank: "test-10", href: "tests/chapter-3-test-10.html",
          en: "Test 10", ar: "اختبار 10" },

        { id: "lesson-11", kind: "lesson", n: 11, href: "lessons/chapter-3-lesson-11.html",
          en: "Slices That Are Not Copies", ar: "قطعٌ ليست نسخًا" },
        { id: "test-11", kind: "test", of: 11, bank: "test-11", href: "tests/chapter-3-test-11.html",
          en: "Test 11", ar: "اختبار 11" },

        { id: "lesson-12", kind: "lesson", n: 12, href: "lessons/chapter-3-lesson-12.html",
          en: "Shapes That Stretch", ar: "أشكالٌ تتمدّد" },
        { id: "test-12", kind: "test", of: 12, bank: "test-12", href: "tests/chapter-3-test-12.html",
          en: "Test 12", ar: "اختبار 12" },

        { id: "lesson-13", kind: "lesson", n: 13, href: "lessons/chapter-3-lesson-13.html",
          en: "Axes & Masks", ar: "المحاور والأقنعة" },
        { id: "test-13", kind: "test", of: 13, bank: "test-13", href: "tests/chapter-3-test-13.html",
          en: "Test 13", ar: "اختبار 13" },

        { id: "chapter-03-test-a", kind: "exam", bank: "chapter-03-test-a", href: "exams/chapter-3-exam-a.html",
          en: "Chapter Test A — Core", ar: "اختبار الفصل أ — الأساسيات" },
        { id: "chapter-03-test-b", kind: "exam", bank: "chapter-03-test-b", href: "exams/chapter-3-exam-b.html",
          en: "Chapter Test B — Advanced", ar: "اختبار الفصل ب — المتقدم" }
      ]
    },

    {
      num: 4,
      slug: "chapter-4",
      href: "chapters/chapter-4.html",
      ready: true,
      title: { en: "NumPy for ML Math", ar: "NumPy لرياضيات التعلّم الآلي" },
      blurb: {
        en: "Loops become operators, and the patient most similar to a feverish new arrival turns out to be the one with no fever, because nobody scaled the columns.",
        ar: "تصير الحلقاتُ مُعاملات، ويتبيّن أنّ أشبه المرضى بمريضٍ محموم هو الذي لا حُمّى له، لأن أحدًا لم يوحّد الأعمدة."
      },
      stats: { lessons: 3, questions: 72, exercises: 9, traces: 3 },
      pages: [
        { id: "chapter-4", kind: "chapter", href: "chapters/chapter-4.html",
          en: "Chapter 4 home", ar: "صفحة الفصل 4" },

        { id: "lesson-14", kind: "lesson", n: 14, href: "lessons/chapter-4-lesson-14.html",
          en: "Weighted Totals and Distances", ar: "المجاميع الموزونة والمسافات" },
        { id: "test-14", kind: "test", of: 14, bank: "test-14", href: "tests/chapter-4-test-14.html",
          en: "Test 14", ar: "اختبار 14" },

        { id: "lesson-15", kind: "lesson", n: 15, href: "lessons/chapter-4-lesson-15.html",
          en: "Tables That Multiply", ar: "جداولُ تضرب" },
        { id: "test-15", kind: "test", of: 15, bank: "test-15", href: "tests/chapter-4-test-15.html",
          en: "Test 15", ar: "اختبار 15" },

        { id: "lesson-16", kind: "lesson", n: 16, href: "lessons/chapter-4-lesson-16.html",
          en: "Removing the Loop", ar: "إزالةُ الحلقة" },
        { id: "test-16", kind: "test", of: 16, bank: "test-16", href: "tests/chapter-4-test-16.html",
          en: "Test 16", ar: "اختبار 16" },

        { id: "chapter-04-test-a", kind: "exam", bank: "chapter-04-test-a", href: "exams/chapter-4-exam-a.html",
          en: "Chapter Test A — Core", ar: "اختبار الفصل أ — الأساسيات" },
        { id: "chapter-04-test-b", kind: "exam", bank: "chapter-04-test-b", href: "exams/chapter-4-exam-b.html",
          en: "Chapter Test B — Advanced", ar: "اختبار الفصل ب — المتقدم" }
      ]
    }
  ];

  /* The appendices belong to no chapter: they are self-study, they are
     not examined, and they exist so that a lesson can state a result and
     point at where it is explained instead of deriving it in a lecture.

     They are shaped exactly like a chapter and carry num 0 so that the
     drawer, the breadcrumbs, the pager and the build all read them with
     the code that already reads chapters. 0 is never shown: the group
     has a title of its own, and the UI uses that. */
  var APPENDICES = [
    {
      num: 0,
      slug: "appendices",
      ready: true,
      title: { en: "Appendices", ar: "الملاحق" },
      blurb: {
        en: "The mathematics and the vocabulary the lessons lean on, written out properly — for self-study, and never examined.",
        ar: "الرياضيات والمفردات التي تستند إليها الدروس، مكتوبةً كما ينبغي — للدراسة الذاتية، ولا يُمتحن فيها."
      },
      stats: { lessons: 4, questions: 30, exercises: 0, traces: 0 },
      pages: [
        { id: "appendix-a3", kind: "appendix", n: 3, bank: "appendix-a3",
          href: "appendices/appendix-a3.html",
          en: "A3 — Machine Learning Vocabulary", ar: "A3 — مفردات تعلّم الآلة" },
        { id: "appendix-a4", kind: "appendix", n: 4, bank: "appendix-a4",
          href: "appendices/appendix-a4.html",
          en: "A4 — Numbers in a Computer", ar: "A4 — الأعداد في الحاسوب" },
        { id: "appendix-a5", kind: "appendix", n: 5, bank: "appendix-a5",
          href: "appendices/appendix-a5.html",
          en: "A5 — Reading Mathematical Notation", ar: "A5 — قراءة الرموز الرياضية" },
        { id: "appendix-a6", kind: "appendix", n: 6, bank: "appendix-a6",
          href: "appendices/appendix-a6.html",
          en: "A6 — Vectors and Matrices", ar: "A6 — المتجهات والمصفوفات" }
      ]
    }
  ];

  /* Chapters still to be written. They appear on the home page as
     the road ahead, greyed out and unlinked, so a reader can see
     where the course is going. Keep in step with README.md. */
  var PLANNED = [
    { num: 5,  en: "np.linalg and Linear Algebra",      ar: "np.linalg والجبر الخطي" },
    { num: 6,  en: "Pandas Fundamentals",               ar: "أساسيات Pandas" },
    { num: 7,  en: "Pandas Data Wrangling",             ar: "معالجة البيانات بـ Pandas" },
    { num: 8,  en: "Pandas Reshaping",                  ar: "إعادة تشكيل البيانات بـ Pandas" },
    { num: 9,  en: "Encoding and Scaling",              ar: "الترميز والتوحيد" },
    { num: 10, en: "Missing Data and Pipelines",        ar: "البيانات الناقصة وخطوط المعالجة" },
    { num: 11, en: "Regression: Derivation and scikit-learn",
                                                        ar: "الانحدار: الاشتقاق وscikit-learn" }
  ];

  var UI = {
    brand:    { en: "Python OOP by Example", ar: "البرمجة الكائنية بلغة بايثون" },
    menu:     { en: "Course", ar: "المقرر" },
    prev:     { en: "Previous", ar: "السابق" },
    next:     { en: "Next", ar: "التالي" },
    copy:     { en: "copy", ar: "نسخ" },
    copied:   { en: "copied", ar: "تم النسخ" },
    score:    { en: "Score: {a} / {b} correct", ar: "النتيجة: {a} من {b} صحيحة" },
    onpage:   { en: "On this page", ar: "في هذه الصفحة" },
    home:     { en: "Home", ar: "الرئيسية" },
    chapter:  { en: "Chapter {n}", ar: "الفصل {n}" },
    install:  { en: "Install", ar: "تثبيت" },
    offline:  { en: "Works fully offline", ar: "يعمل دون اتصال بالكامل" },
    resume:   { en: "Continue where you stopped", ar: "تابع من حيث توقّفت" },
    start:    { en: "Start the chapter", ar: "ابدأ الفصل" },
    soon:     { en: "Being written", ar: "قيد الكتابة" },
    top:      { en: "Back to top", ar: "إلى الأعلى" },
    lang:     { en: "العربية", ar: "English" },
    dark:     { en: "Dark", ar: "داكن" },
    light:    { en: "Light", ar: "فاتح" }
  };

  /* ---------------------------------------------------------- lookups */

  /* The appendices are searched alongside the chapters so that every
     caller - drawer, crumbs, pager, build - works on either. */
  function chapter(num) {
    var all = CHAPTERS.concat(APPENDICES);
    for (var i = 0; i < all.length; i++) {
      if (all[i].num === +num) return all[i];
    }
    return null;
  }

  /* The reading order of one chapter, as a flat list. The chapter
     home page is index 0, so "previous" from lesson 1 lands there. */
  function pages(num) {
    var c = chapter(num);
    return c ? c.pages : [];
  }

  function page(num, id) {
    var list = pages(num);
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function indexOf(num, id) {
    var list = pages(num);
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return i;
    return -1;
  }

  /* Every page that is a file of its own, across every chapter -
     what the service worker precaches and what the e2e suite walks. */
  function allPages() {
    var out = [];
    var all = CHAPTERS.concat(APPENDICES);
    for (var i = 0; i < all.length; i++) {
      for (var j = 0; j < all[i].pages.length; j++) {
        out.push({ chapter: all[i].num, page: all[i].pages[j] });
      }
    }
    return out;
  }

  window.COURSE = {
    chapters: CHAPTERS,
    appendices: APPENDICES,
    planned: PLANNED,
    UI: UI,
    chapter: chapter,
    pages: pages,
    page: page,
    indexOf: indexOf,
    allPages: allPages
  };
})();
