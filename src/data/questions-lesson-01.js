/* ============================================================
   Lesson 1 — Objects & Classes.
   Domains reused from the lesson itself: the school library,
   the clinic fridge, the phone top-up card, the shelf.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-01"] = {
  title: { en: "Test 1 — Objects & Classes", ar: "اختبار 1 — الكائنات والأصناف" },
  intro: {
    en: "Twelve questions on the first lesson only. Nothing here needs <code>__init__</code> validation, class attributes or inheritance &mdash; those arrive in later lessons. Answer before opening any explanation; a revealed answer is not counted.",
    ar: "اثنا عشر سؤالًا على الدرس الأول وحده. لا شيء هنا يحتاج التحقّق في <code>__init__</code> أو خصائص الصنف أو الوراثة &mdash; فتلك تأتي في دروس لاحقة. أجب قبل فتح أي شرح؛ فالجواب المكشوف لا يُحسب."
  },
  questions: [
    {
      id: "t1q1", type: "tf", level: "easy",
      topics: ["class-vs-object", "instances"],
      q: { en: "A class is a description. Two objects built from the same class each get their own copy of the instance attributes, so changing one does not change the other.",
           ar: "الصنف وصف. وكل كائنين مبنيين من الصنف نفسه يحصل كلٌّ منهما على نسخته من خصائص الكائن، فتغيير أحدهما لا يغيّر الآخر." },
      truth: true,
      explain: { en: "This is the whole point of the lesson's second example: <code>prophet.copies_left = 0</code> left <code>kalila.copies_left</code> at 3. The class holds no book data at all &mdash; it only says which attributes a book will have.",
                 ar: "هذا هو جوهر المثال الثاني في الدرس: فـ <code>prophet.copies_left = 0</code> أبقى <code>kalila.copies_left</code> على 3. والصنف لا يحمل أي بيانات كتاب إطلاقًا &mdash; إنما يقول أي خصائص سيملكها الكتاب." }
    },
    {
      id: "t1q2", type: "fill", level: "easy",
      topics: ["init", "attributes", "self"],
      q: { en: "The clinic logs vaccine vials. Fill the two blanks so that every vial stores all three values it is given.",
           ar: "تسجّل العيادة قوارير المطاعيم. أكمل الفراغين ليخزّن كل قارورة القيم الثلاث التي تُعطى لها." },
      code: "class VaccineVial:\n    def __init__(self, code, doses, fridge):\n        ____1____ = code\n        self.doses = doses\n        ____2____ = fridge\n\n\nv = VaccineVial(\"BCG-7\", 12, \"F1\")\nprint(v.code, v.doses, v.fridge)",
      blanks: [
        { accept: ["self.code"], label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["self.fridge"], label: { en: "blank 2", ar: "الفراغ 2" } }
      ],
      explain: { en: "<code>code</code> on its own is the parameter &mdash; a local name that disappears when <code>__init__</code> ends. Writing <code>self.code = code</code> copies that value onto the object, where it survives and can be read later as <code>v.code</code>.",
                 ar: "<code>code</code> وحدها هي المعامل &mdash; اسم محلي يختفي بانتهاء <code>__init__</code>. وكتابة <code>self.code = code</code> تنسخ القيمة على الكائن، فتبقى هناك ويمكن قراءتها لاحقًا بـ <code>v.code</code>." }
    },
    {
      id: "t1q3", type: "output", level: "easy",
      topics: ["methods", "self", "instances"],
      q: { en: "Write exactly what this prints.", ar: "اكتب ما يطبعه هذا البرنامج بالضبط." },
      code: "class Shelf:\n    def __init__(self, code, capacity, used):\n        self.code = code\n        self.capacity = capacity\n        self.used = used\n\n    def free_slots(self):\n        return self.capacity - self.used\n\n\na = Shelf(\"A1\", 30, 12)\nb = Shelf(\"B2\", 30, 30)\nprint(a.free_slots(), b.free_slots())",
      blanks: [{ accept: ["18 0"], ph: "18 0" }],
      explain: { en: "One method, two answers. <code>a.free_slots()</code> runs with <code>self</code> bound to <code>a</code>, so it reads 30 and 12; the same line then reads 30 and 30 for <code>b</code>. <code>print</code> with two arguments separates them with a single space.",
                 ar: "دالة واحدة وجوابان. فـ <code>a.free_slots()</code> تُنفَّذ و<code>self</code> مرتبط بـ <code>a</code>، فتقرأ 30 و12؛ ثم يقرأ السطر نفسه 30 و30 لـ <code>b</code>. و<code>print</code> بوسيطين تفصل بينهما بمسافة واحدة." }
    },
    {
      id: "t1q4", type: "mcq", level: "easy",
      topics: ["self", "dot-access", "methods"],
      q: { en: "In the previous question, <code>a.free_slots()</code> is called with empty brackets, yet the method header is <code>def free_slots(self):</code>. What is <code>self</code> bound to while that call runs?",
           ar: "في السؤال السابق، تُستدعى <code>a.free_slots()</code> بقوسين فارغين، مع أن ترويسة الدالة <code>def free_slots(self):</code>. فبأي شيء يرتبط <code>self</code> أثناء ذلك الاستدعاء؟" },
      options: [
        { en: "The object <code>a</code>, which Python passes in automatically as the first argument because it was written before the dot.",
          ar: "الكائن <code>a</code>، وتمرّره بايثون تلقائيًا كأول وسيط لأنه مكتوب قبل النقطة." },
        { en: "The class <code>Shelf</code>, because <code>free_slots</code> is defined inside it.",
          ar: "الصنف <code>Shelf</code>، لأن <code>free_slots</code> معرَّفة داخله." },
        { en: "Nothing &mdash; <code>self</code> stays empty unless you pass it yourself.",
          ar: "لا شيء &mdash; يبقى <code>self</code> فارغًا إلا إذا مرّرته بنفسك." },
        { en: "A fresh copy of <code>a</code>, so changes inside the method are discarded when it returns.",
          ar: "نسخة جديدة من <code>a</code>، فتُلغى أي تغييرات داخل الدالة عند عودتها." }
      ],
      answer: 0,
      explain: { en: "<code>a.free_slots()</code> is shorthand for <code>Shelf.free_slots(a)</code>. The object before the dot becomes the first argument, which is why the header declares one parameter the call does not appear to supply. The last option is the tempting one: <code>self</code> is the object, not a copy, so a method that assigns to <code>self.used</code> really does change <code>a</code> &mdash; question 11 relies on that.",
                 ar: "<code>a.free_slots()</code> اختصار لـ <code>Shelf.free_slots(a)</code>. فالكائن قبل النقطة يصبح الوسيط الأول، ولهذا تعلن الترويسة معاملًا لا يبدو أن الاستدعاء يمرّره. والخيار الأخير هو المغري: فـ <code>self</code> هو الكائن لا نسخة منه، لذا فإن دالة تُسند إلى <code>self.used</code> تغيّر <code>a</code> فعلًا &mdash; والسؤال 11 يعتمد على ذلك." }
    },
    {
      id: "t1q5", type: "error", level: "medium",
      topics: ["self", "methods"],
      q: { en: "This crashes on the last line with <code>TypeError: TopUpCard.use() takes 1 positional argument but 2 were given</code>. Click the line that must be fixed.",
           ar: "ينهار هذا في السطر الأخير بـ <code>TypeError: TopUpCard.use() takes 1 positional argument but 2 were given</code>. انقر السطر الذي يجب إصلاحه." },
      code: "class TopUpCard:\n    def __init__(self, serial, balance):\n        self.serial = serial\n        self.balance = balance\n\n    def use(amount):\n        self.balance = self.balance - amount\n\n\ncard = TopUpCard(\"SIM-901\", 50)\ncard.use(10)",
      answer: 6,
      explain: { en: "The traceback points at the call, but the defect is the header. <code>card.use(10)</code> sends two arguments &mdash; <code>card</code> and <code>10</code> &mdash; while <code>def use(amount)</code> declares room for one. Python then binds <code>card</code> to <code>amount</code>, finds no second slot for <code>10</code>, and refuses. The counts in the message are the clue: \"takes 1\" is the header, \"2 were given\" is the call.",
                 ar: "يشير التتبّع إلى الاستدعاء، لكن العيب في الترويسة. فـ <code>card.use(10)</code> ترسل وسيطين &mdash; <code>card</code> و<code>10</code> &mdash; بينما تعلن <code>def use(amount)</code> موضعًا واحدًا. فتربط بايثون <code>card</code> بـ <code>amount</code>، ولا تجد موضعًا ثانيًا لـ <code>10</code>، فترفض. والأعداد في الرسالة هي الدليل: «takes 1» هي الترويسة، و«2 were given» هو الاستدعاء." },
      solution: { code: "    def use(self, amount):\n        self.balance = self.balance - amount",
                  en: "Every method that works on one object needs <code>self</code> as its first parameter &mdash; and this body already uses <code>self.balance</code> twice, so it was always expected.",
                  ar: "كل دالة تعمل على كائن واحد تحتاج <code>self</code> معاملًا أول &mdash; وهذا الجسد يستعمل <code>self.balance</code> مرتين أصلًا، فقد كان متوقعًا دائمًا." }
    },
    {
      id: "t1q6", type: "trace", level: "medium",
      topics: ["instances", "methods", "self"],
      q: { en: "Trace the two objects. After the last line runs, what does each attribute hold?",
           ar: "تتبّع الكائنين. بعد تنفيذ السطر الأخير، ماذا تحمل كل خاصية؟" },
      code: "class Book:\n    def __init__(self, title, copies_left):\n        self.title = title\n        self.copies_left = copies_left\n\n    def borrow(self):\n        self.copies_left = self.copies_left - 1\n\n\na = Book(\"Kalila wa Dimna\", 3)\nb = Book(\"The Prophet\", 2)\na.borrow()\na.borrow()\nb.borrow()",
      blanks: [
        { accept: ["1"], label: { en: "<code>a.copies_left</code>", ar: "<code>a.copies_left</code>" } },
        { accept: ["1"], label: { en: "<code>b.copies_left</code>", ar: "<code>b.copies_left</code>" } }
      ],
      explain: { en: "Both land on 1 by different routes: <code>a</code> starts at 3 and is borrowed twice, <code>b</code> starts at 2 and is borrowed once. The equal answer is the useful part &mdash; the same method ran three times and never once touched the wrong book, because each call read and wrote through its own <code>self</code>. Step through the same code in the <a href=\"#lab\">Execution Lab</a> if the two counters still feel like one.",
                 ar: "كلاهما ينتهي إلى 1 بطريقين مختلفين: فـ <code>a</code> يبدأ من 3 ويُستعار مرتين، و<code>b</code> يبدأ من 2 ويُستعار مرة. والتساوي هو المفيد هنا &mdash; فقد نُفِّذت الدالة نفسها ثلاث مرات ولم تمسّ الكتاب الخطأ ولا مرة، لأن كل استدعاء قرأ وكتب عبر <code>self</code> الخاص به. تنقّل في الكود نفسه في <a href=\"#lab\">مختبر التنفيذ</a> إن كان العدّادان لا يزالان يبدوان واحدًا." }
    },
    {
      id: "t1q7", type: "order", level: "medium",
      topics: ["init", "class-vs-object", "self"],
      q: { en: "Put the four things Python does, in order, when the line <code>v = VaccineVial(\"BCG-7\", 12, \"F1\")</code> runs.",
           ar: "رتّب الأمور الأربعة التي تفعلها بايثون، بالترتيب، عند تنفيذ السطر <code>v = VaccineVial(\"BCG-7\", 12, \"F1\")</code>." },
      items: [
        { en: "A new, empty object of type <code>VaccineVial</code> is created.", ar: "يُنشأ كائن جديد فارغ من نوع <code>VaccineVial</code>." },
        { en: "<code>__init__</code> is called, with <code>self</code> bound to that new object and the three values filling the other parameters.", ar: "تُستدعى <code>__init__</code> و<code>self</code> مرتبط بذلك الكائن الجديد والقيم الثلاث تعبّئ بقية المعاملات." },
        { en: "The three <code>self.&hellip; = &hellip;</code> lines store the values on the object.", ar: "تخزّن أسطر <code>self.&hellip; = &hellip;</code> الثلاثة القيم على الكائن." },
        { en: "The finished object is bound to the name <code>v</code>.", ar: "يُربط الكائن المكتمل بالاسم <code>v</code>." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The order explains two things that puzzle beginners. The object exists <em>before</em> <code>__init__</code> runs, which is why <code>__init__</code> can be handed it as <code>self</code> and does not return it. And the name <code>v</code> is attached <em>last</em>, which is why you cannot refer to <code>v</code> from inside <code>__init__</code>.",
                 ar: "الترتيب يفسّر أمرين يحيّران المبتدئ. فالكائن موجود <em>قبل</em> تنفيذ <code>__init__</code>، ولهذا يمكن تسليمه إليها كـ <code>self</code> ولا تُعيده. والاسم <code>v</code> يُربط <em>أخيرًا</em>، ولهذا لا يمكنك الإشارة إلى <code>v</code> من داخل <code>__init__</code>." }
    },
    {
      id: "t1q8", type: "match", level: "medium",
      topics: ["class-vs-object", "attributes", "methods", "self"],
      q: { en: "Match each of the four words from the lesson to what it actually names.",
           ar: "وصّل كل كلمة من كلمات الدرس الأربع بما تسمّيه فعلًا." },
      leftHead: { en: "The word", ar: "الكلمة" },
      rightHead: { en: "What it names", ar: "ما تسمّيه" },
      pairs: [
        { l: { code: "class Book:" },
          r: { en: "The description that says which attributes and methods every book will have. It stores no book.", ar: "الوصف الذي يقول أي خصائص ودوال سيملكها كل كتاب. ولا يخزّن أي كتاب." } },
        { l: { code: "kalila = Book(...)" },
          r: { en: "One actual book, with its own values, living independently of every other book.", ar: "كتاب فعلي واحد بقيمه الخاصة، يعيش مستقلًا عن كل كتاب آخر." } },
        { l: { code: "kalila.copies_left" },
          r: { en: "A value stored on that one object and reached through the dot.", ar: "قيمة مخزّنة على ذلك الكائن وحده، تُقرأ عبر النقطة." } },
        { l: { code: "def borrow(self):" },
          r: { en: "A function written once in the class that acts on whichever object is in front of the dot.", ar: "دالة مكتوبة مرة واحدة في الصنف تعمل على أي كائن يقع قبل النقطة." } }
      ],
      explain: { en: "The four words in one sentence: a <strong>class</strong> describes, an <strong>object</strong> exists, an <strong>attribute</strong> is what it holds, a <strong>method</strong> is what it does.",
                 ar: "الكلمات الأربع في جملة واحدة: <strong>الصنف</strong> يصف، و<strong>الكائن</strong> يوجد، و<strong>الخاصية</strong> ما يحمله، و<strong>الدالة</strong> ما يفعله." }
    },
    {
      id: "t1q9", type: "compare", level: "medium",
      topics: ["parallel-lists", "class-vs-object"],
      q: { en: "Both versions remove the book at position 1. Which statement about the pair is true?",
           ar: "كلتا النسختين تحذف الكتاب في الموضع 1. أي عبارة عن الزوج صحيحة؟" },
      codeA: "titles = [\"Kalila\", \"Prophet\", \"Men in the Sun\"]\ncopies = [3, 0, 1]\nborrowers = [\"Huda\", \"Yousef\", \"Nada\"]\n\ndel titles[1]\ndel copies[1]\n\nprint(titles[1], copies[1], borrowers[1])",
      codeB: "shelf = [\n    Book(\"Kalila\", 3, \"Huda\"),\n    Book(\"Prophet\", 0, \"Yousef\"),\n    Book(\"Men in the Sun\", 1, \"Nada\"),\n]\n\ndel shelf[1]\n\nprint(shelf[1].title, shelf[1].copies_left, shelf[1].borrower)",
      options: [
        { en: "A prints <code>Men in the Sun 1 Yousef</code> &mdash; a wrong borrower, with no error &mdash; because the third list was never updated. B prints the three fields of one real book, because one <code>del</code> removes the whole book.",
          ar: "تطبع أ <code>Men in the Sun 1 Yousef</code> &mdash; مستعير خطأ دون أي خطأ معلن &mdash; لأن القائمة الثالثة لم تُحدَّث. وتطبع ب حقول كتاب واحد حقيقي، لأن <code>del</code> واحدة تحذف الكتاب كله." },
        { en: "Both print the same thing; B is only shorter to type.",
          ar: "تطبع كلتاهما الشيء نفسه؛ وب أقصر في الكتابة فقط." },
        { en: "A raises an <code>IndexError</code>, because the three lists no longer have the same length.",
          ar: "ترفع أ <code>IndexError</code>، لأن القوائم الثلاث لم تبقَ بالطول نفسه." },
        { en: "B is the riskier version, because deleting an object leaves the other objects holding stale indexes.",
          ar: "ب هي الأخطر، لأن حذف كائن يترك بقية الكائنات تحمل فهارس قديمة." }
      ],
      answer: 0,
      explain: { en: "This is the lesson's opening defect in four lines. <code>borrowers</code> still has three entries, so <code>borrowers[1]</code> is in range and returns <code>\"Yousef\"</code> &mdash; the name of a book that no longer exists at that position. No <code>IndexError</code> fires, which is exactly what makes it dangerous: the program keeps running and lies. Grouping the three fields into one object makes the wrong state unreachable rather than merely unlikely.",
                 ar: "هذا هو عيب الدرس الافتتاحي في أربعة أسطر. فـ <code>borrowers</code> لا تزال بثلاثة مداخل، إذن <code>borrowers[1]</code> داخل النطاق ويُعيد <code>\"Yousef\"</code> &mdash; اسم كتاب لم يبقَ في ذلك الموضع. ولا يُرفع أي <code>IndexError</code>، وهذا بالضبط ما يجعله خطيرًا: فالبرنامج يمضي ويكذب. وجمع الحقول الثلاثة في كائن واحد يجعل الحالة الخاطئة غير قابلة للوصول لا مجرد مستبعدة." }
    },
    {
      id: "t1q10", type: "complete", level: "hard",
      topics: ["methods", "self", "attributes"],
      q: { en: "Choose the body for <code>is_available()</code>, which must return <code>True</code> when any copy is left and <code>False</code> when none is.",
           ar: "اختر جسد <code>is_available()</code>، الذي يجب أن يُعيد <code>True</code> إذا بقيت نسخة و<code>False</code> إذا لم تبقَ." },
      code: "class Book:\n    def __init__(self, title, copies_total, copies_left):\n        self.title = title\n        self.copies_total = copies_total\n        self.copies_left = copies_left\n\n    def is_available(self):\n        # which body goes here?\n\n\nprint(Book(\"Kalila\", 4, 3).is_available())   # must be True\nprint(Book(\"Prophet\", 2, 0).is_available())  # must be False",
      options: [
        { code: "return self.copies_left > 0" },
        { code: "return copies_left > 0" },
        { code: "if self.copies_left > 0:\n    return True" },
        { code: "return Book.copies_left > 0" }
      ],
      answer: 0,
      explain: { en: "The comparison is already a <code>True</code>/<code>False</code> value, so you return it directly &mdash; no <code>if</code> needed. The three wrong answers fail in three different ways worth knowing. <code>copies_left</code> without <code>self</code> raises <code>NameError</code>: the attribute is on the object, not in the method's scope. <code>Book.copies_left</code> raises <code>AttributeError</code>: the class holds no stock figure, only the objects do. And the <code>if</code> with no <code>else</code> is the dangerous one &mdash; it returns <code>True</code> correctly but falls off the end and returns <code>None</code> for a book with no copies. <code>None</code> is falsy, so <code>if book.is_available():</code> would still behave, and <code>print</code> would expose it as <code>None</code> instead of <code>False</code>.",
                 ar: "المقارنة أصلًا قيمة <code>True</code>/<code>False</code>، فتُعيدها مباشرة &mdash; ولا حاجة إلى <code>if</code>. والأجوبة الخاطئة الثلاثة تفشل بثلاث طرق تستحق المعرفة. فـ <code>copies_left</code> بلا <code>self</code> ترفع <code>NameError</code>: فالخاصية على الكائن لا في نطاق الدالة. و<code>Book.copies_left</code> ترفع <code>AttributeError</code>: فالصنف لا يحمل رقم مخزون، بل الكائنات وحدها. و<code>if</code> بلا <code>else</code> هي الخطيرة &mdash; تُعيد <code>True</code> صحيحةً لكنها تسقط من الطرف فتُعيد <code>None</code> لكتاب بلا نسخ. و<code>None</code> قيمتها كاذبة، فـ <code>if book.is_available():</code> يظل يعمل، وتكشفها <code>print</code> كـ <code>None</code> بدل <code>False</code>." },
      solution: { code: "    def is_available(self):\n        return self.copies_left > 0",
                  out: "True\nFalse" }
    },
    {
      id: "t1q11", type: "output", level: "hard",
      topics: ["methods", "instances", "attributes"],
      q: { en: "Write the three lines this prints. Note that <code>add_book</code> both changes the object and returns a value.",
           ar: "اكتب الأسطر الثلاثة التي يطبعها. لاحظ أن <code>add_book</code> تغيّر الكائن وتُعيد قيمة في الوقت نفسه." },
      code: "class Shelf:\n    def __init__(self, code, capacity, used):\n        self.code = code\n        self.capacity = capacity\n        self.used = used\n\n    def add_book(self):\n        if self.used < self.capacity:\n            self.used = self.used + 1\n            return True\n        return False\n\n\ns1 = Shelf(\"A1\", 2, 1)\ns2 = Shelf(\"B2\", 2, 2)\nprint(s1.add_book(), s1.used)\nprint(s2.add_book(), s2.used)\nprint(s1.capacity, s2.capacity)",
      blanks: [{ accept: ["True 2\nFalse 2\n2 2"], lines: 3 }],
      explain: { en: "<code>s1</code> has room, so the shelf accepts the book: <code>used</code> goes 1 &rarr; 2 and the method reports <code>True</code>. <code>s2</code> is already full, so nothing changes and it reports <code>False</code> &mdash; and <code>s2.used</code> prints 2 for a completely different reason from <code>s1.used</code>. The third line is the check that matters: both capacities are still 2, because a method changing one object cannot reach the other.",
                 ar: "لدى <code>s1</code> متّسع، فيقبل الرف الكتاب: فتنتقل <code>used</code> من 1 إلى 2 وتُبلّغ الدالة <code>True</code>. و<code>s2</code> ممتلئ أصلًا، فلا يتغير شيء وتُبلّغ <code>False</code> &mdash; وتطبع <code>s2.used</code> القيمة 2 لسبب مختلف تمامًا عن <code>s1.used</code>. والسطر الثالث هو الفحص المهم: فالسعتان لا تزالان 2، لأن دالة تغيّر كائنًا لا تستطيع الوصول إلى الآخر." }
    },
    {
      id: "t1q12", type: "multi", level: "hard",
      topics: ["methods", "self", "class-vs-object", "attributes"],
      q: { en: "Select <strong>every</strong> statement that is true about the <code>Book</code> class as the lesson wrote it.",
           ar: "اختر <strong>كل</strong> عبارة صحيحة عن الصنف <code>Book</code> كما كتبه الدرس." },
      options: [
        { en: "The method body is stored once, in the class; only the attribute values are per-object.",
          ar: "جسد الدالة مخزَّن مرة واحدة في الصنف؛ وقيم الخصائص وحدها لكل كائن." },
        { en: "Assigning to <code>self.copies_left</code> inside a method changes the object the caller is holding, not a copy of it.",
          ar: "الإسناد إلى <code>self.copies_left</code> داخل دالة يغيّر الكائن الذي يمسكه المستدعي، لا نسخة منه." },
        { en: "You may add an attribute to one object after it is created, and the other objects will not have it.",
          ar: "يمكنك إضافة خاصية إلى كائن واحد بعد إنشائه، ولن تملكها بقية الكائنات." },
        { en: "Renaming the parameter <code>self</code> to something else in a method header makes the method stop working.",
          ar: "تغيير اسم المعامل <code>self</code> إلى غيره في ترويسة دالة يُعطّل الدالة." },
        { en: "Two objects built with identical arguments are the same object, since their attributes are equal.",
          ar: "كائنان مبنيان بوسائط متطابقة هما الكائن نفسه، لأن خصائصهما متساوية." }
      ],
      answer: [0, 1, 2],
      explain: { en: "The first three are true, and the third is worth pausing on: Python lets you write <code>kalila.shelf = \"A1\"</code> at any time and only that book gets it &mdash; flexible, and a frequent source of typo-bugs that later lessons close off with <code>__init__</code> and properties. The fourth is false: <code>self</code> is an ordinary parameter name, so <code>def borrow(book):</code> using <code>book.copies_left</code> works identically &mdash; every Python programmer writes <code>self</code> by convention, not by requirement. The fifth is false: equal values, two separate objects; <code>kalila is prophet</code> would be <code>False</code> even with identical arguments.",
                 ar: "الثلاثة الأولى صحيحة، والثالثة تستحق التوقف: فبايثون تتيح لك كتابة <code>kalila.shelf = \"A1\"</code> في أي وقت ولا يملكها إلا ذلك الكتاب &mdash; مرونة، ومصدر متكرر لأخطاء الأسماء المطبعية تُغلقه الدروس اللاحقة بـ <code>__init__</code> والخصائص. والرابعة خاطئة: فـ <code>self</code> اسم معامل عادي، فـ <code>def borrow(book):</code> مستخدمةً <code>book.copies_left</code> تعمل تمامًا &mdash; وكل مبرمج بايثون يكتب <code>self</code> اتفاقًا لا إلزامًا. والخامسة خاطئة: قيم متساوية وكائنان منفصلان؛ فـ <code>kalila is prophet</code> تكون <code>False</code> حتى بوسائط متطابقة." }
    }
  ]
};
