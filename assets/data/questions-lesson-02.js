/* ============================================================
   Lesson 2 — State, __init__ and Methods.
   Domains: the corner shop's orders, the clinic prescription,
   the repair bench, the rooftop water tank, the training centre.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-02"] = {
  title: { en: "Test 2 — State, __init__ &amp; Methods", ar: "اختبار 2 — الحالة والمُنشئ والدوال" },
  intro: {
    en: "Twelve questions on Lesson 2. Three of them turn on one rule you can state in a sentence: Python looks for an attribute on the object first and on the class second. If that rule is not solid yet, step through <a href=\"#lab\">trace 4 in the Execution Lab</a> before you start.",
    ar: "اثنا عشر سؤالًا على الدرس 2. ثلاثة منها تدور على قاعدة واحدة تستطيع قولها في جملة: تبحث بايثون عن الخاصية على الكائن أولًا وعلى الصنف ثانيًا. وإن لم تثبت هذه القاعدة بعد فتنقّل في <a href=\"#lab\">التتبّع 4 في مختبر التنفيذ</a> قبل أن تبدأ."
  },
  questions: [
    {
      id: "t2q1", type: "tf", level: "easy",
      topics: ["init"],
      q: { en: "<code>__init__</code> is called automatically when you write <code>Order(\"Huda\")</code>, and you should never call it by name yourself.",
           ar: "تُستدعى <code>__init__</code> تلقائيًا عند كتابة <code>Order(\"Huda\")</code>، ولا ينبغي أن تستدعيها باسمها بنفسك." },
      truth: true,
      explain: { en: "Writing the class name followed by brackets creates the object and runs <code>__init__</code> on it in one move. The double underscores are Python's mark for \"the language calls this, not you\" &mdash; the same convention as <code>__str__</code> and <code>__len__</code>.",
                 ar: "كتابة اسم الصنف متبوعًا بقوسين تنشئ الكائن وتنفّذ عليه <code>__init__</code> في حركة واحدة. والشرطتان السفليتان المزدوجتان علامة بايثون على «اللغة تستدعي هذه لا أنت» &mdash; وهو الاتفاق نفسه في <code>__str__</code> و<code>__len__</code>." }
    },
    {
      id: "t2q2", type: "fill", level: "easy",
      topics: ["mutable-default", "init"],
      q: { en: "This class gives every order the <em>same</em> list. Fill both blanks with the standard fix, so each order gets a list of its own.",
           ar: "يمنح هذا الصنف كل فاتورة القائمة <em>نفسها</em>. أكمل الفراغين بالإصلاح المعتاد، فتحصل كل فاتورة على قائمة خاصة بها." },
      code: "class Order:\n    def __init__(self, customer, items=____1____):\n        self.customer = customer\n        ____2____\n\n    def add_item(self, name):\n        self.items.append(name)",
      blanks: [
        { accept: ["None"], label: { en: "blank 1 &mdash; the default value", ar: "الفراغ 1 &mdash; القيمة الافتراضية" } },
        { accept: ["self.items = [] if items is None else items",
                   "self.items = items if items is not None else []",
                   "self.items = [] if items is None else list(items)"],
          wide: true, label: { en: "blank 2 &mdash; the body line", ar: "الفراغ 2 &mdash; سطر الجسد" } }
      ],
      explain: { en: "<code>None</code> is a safe default because it is immutable and cannot accumulate. The <code>[]</code> then runs inside <code>__init__</code>, which executes once per object, instead of on the <code>def</code> line, which executes once per program.",
                 ar: "<code>None</code> افتراضية آمنة لأنها غير قابلة للتغيير ولا يمكن أن تتراكم. فتُنفَّذ <code>[]</code> داخل <code>__init__</code> التي تُنفَّذ مرة لكل كائن، بدل سطر <code>def</code> الذي يُنفَّذ مرة لكل برنامج." }
    },
    {
      id: "t2q3", type: "output", level: "easy",
      topics: ["class-attr", "computed"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "class Session:\n    seats_default = 20\n\n    def __init__(self, trainer):\n        self.trainer = trainer\n        self.attendees = []\n\n    def seats_left(self):\n        return self.seats_default - len(self.attendees)\n\n\na = Session(\"Nadia\")\nb = Session(\"Omar\")\na.attendees.append(\"Lina\")\nprint(a.seats_left(), b.seats_left())\nSession.seats_default = 25\nprint(a.seats_left(), b.seats_left())",
      blanks: [{ accept: ["19 20\n24 25"], lines: 2 }],
      explain: { en: "Two separate things are happening. <code>attendees</code> is per-object, so enrolling Lina moved only <code>a</code>. <code>seats_default</code> is on the class, so raising it to 25 moved <strong>both</strong> at once &mdash; which is exactly why a centre-wide policy belongs there and not in <code>__init__</code>.",
                 ar: "يحدث أمران منفصلان. فـ <code>attendees</code> لكل كائن، فتسجيل لينا حرّك <code>a</code> وحده. و<code>seats_default</code> على الصنف، فرفعها إلى 25 حرّك <strong>كليهما</strong> دفعة واحدة &mdash; وهذا بالضبط سبب انتماء سياسة المركز العامة إلى هناك لا إلى <code>__init__</code>." }
    },
    {
      id: "t2q4", type: "mcq", level: "easy",
      topics: ["class-attr", "attr-lookup"],
      q: { en: "A repair bench charges the same hourly rate for every job, and that rate changes about once a year. Where does it belong?",
           ar: "يتقاضى مقعد الصيانة أجرة الساعة نفسها لكل عمل، وتتغير تلك الأجرة مرة في السنة تقريبًا. فإلى أين تنتمي؟" },
      options: [
        { en: "A class attribute, because it is one fact about the bench rather than about any single job &mdash; so the yearly change is one edit in one place.",
          ar: "خاصية صنف، لأنها حقيقة واحدة عن المقعد لا عن أي عمل بعينه &mdash; فيكون التغيير السنوي تعديلًا واحدًا في موضع واحد." },
        { en: "An instance attribute set in <code>__init__</code>, because every job needs to read it.",
          ar: "خاصية كائن تُضبط في <code>__init__</code>، لأن كل عمل يحتاج قراءتها." },
        { en: "A parameter of every method that uses it, so nothing is stored at all.",
          ar: "معاملًا لكل دالة تستعملها، فلا يُخزَّن شيء إطلاقًا." },
        { en: "A module-level global, since a class attribute cannot be changed after the class is defined.",
          ar: "متغيرًا عامًا على مستوى الوحدة، لأن خاصية الصنف لا يمكن تغييرها بعد تعريف الصنف." }
      ],
      answer: 0,
      explain: { en: "The test is whose fact it is. The rate describes the <em>bench</em>, so one copy on the class is right; put it in <code>__init__</code> and you get one copy per job, and next year's change means rewriting history or editing every stored job. The last option is also factually wrong: <code>Bench.rate = 55</code> works at any time, as question 3 showed.",
                 ar: "المعيار هو: حقيقة مَن هي؟ فالأجرة تصف <em>المقعد</em>، إذن نسخة واحدة على الصنف هي الصحيح؛ وإن وضعتها في <code>__init__</code> حصلت على نسخة لكل عمل، وتغيير السنة القادمة يعني إعادة كتابة التاريخ أو تعديل كل عمل مخزَّن. والخيار الأخير خاطئ واقعيًا أيضًا: فـ <code>Bench.rate = 55</code> تعمل في أي وقت، كما أظهر السؤال 3." }
    },
    {
      id: "t2q5", type: "output", level: "medium",
      topics: ["str-repr"],
      q: { en: "<code>__str__</code> is defined but <code>__repr__</code> is not. Write the two lines this prints.",
           ar: "<code>__str__</code> معرَّفة و<code>__repr__</code> ليست كذلك. اكتب السطرين الذين يطبعهما." },
      code: "class Order:\n    def __init__(self, number, customer):\n        self.number = number\n        self.customer = customer\n\n    def __str__(self):\n        return f\"Order {self.number} for {self.customer}\"\n\n\no = Order(7, \"Huda\")\nprint(o)\nprint([o])",
      blanks: [{ accept: ["Order 7 for Huda\n[<__main__.Order object at 0x...>]",
                          "Order 7 for Huda\n[<__main__.Order object at 0x7f...>]"],
                 lines: 2,
                 hint: { en: "Write the memory address as <code>0x...</code> &mdash; the real one changes on every run.",
                         ar: "اكتب عنوان الذاكرة <code>0x...</code> &mdash; فالحقيقي يتغير في كل تشغيل." } }],
      explain: { en: "<code>print(o)</code> uses <code>__str__</code> and reads well. <code>print([o])</code> does not: a container formats its contents with <code>__repr__</code>, which was never defined, so you get the default <code>&lt;__main__.Order object at 0x&hellip;&gt;</code>. This is why debugging a list of your objects is unpleasant until you add <code>__repr__</code> as well &mdash; the rule of thumb is <code>__str__</code> for the user, <code>__repr__</code> for the programmer.",
                 ar: "تستخدم <code>print(o)</code> دالة <code>__str__</code> فتُقرأ جيدًا. أما <code>print([o])</code> فلا: فالحاوية تنسّق محتواها بـ <code>__repr__</code> التي لم تُعرَّف أبدًا، فتحصل على الصيغة الافتراضية <code>&lt;__main__.Order object at 0x&hellip;&gt;</code>. ولهذا يكون تنقيح قائمة من كائناتك مزعجًا حتى تضيف <code>__repr__</code> أيضًا &mdash; والقاعدة العملية: <code>__str__</code> للمستخدم و<code>__repr__</code> للمبرمج." }
    },
    {
      id: "t2q6", type: "error", level: "medium",
      topics: ["computed", "init"],
      q: { en: "The shop raises the price of juice and the receipt keeps printing the old total. Click the line that creates the bug.",
           ar: "يرفع المحل سعر العصير ويظل الإيصال يطبع الإجمالي القديم. انقر السطر الذي يُنشئ الخلل." },
      code: "class Item:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n        self.price_with_vat = price * 1.16\n\n\ni = Item(\"juice\", 10.0)\nprint(round(i.price_with_vat, 2))\ni.price = 20.0\nprint(round(i.price_with_vat, 2))",
      answer: 5,
      explain: { en: "Line 5 stores a value that was <em>derived</em> from another one. The moment <code>price</code> changes, the stored copy is a lie &mdash; both prints give 11.6. Nothing raises an error, because nothing is broken from Python's point of view; there are simply two sources of truth and one of them is stale. The cure is to stop storing it and compute it when asked, in a method or a <code>@property</code>.",
                 ar: "السطر 5 يخزّن قيمة <em>مشتقّة</em> من أخرى. ولحظةَ تتغير <code>price</code> تصبح النسخة المخزّنة كذبًا &mdash; فكلتا الطباعتين تعطي 11.6. ولا يُرفع أي خطأ، لأن لا شيء مكسورًا من وجهة نظر بايثون؛ إنما هناك مصدران للحقيقة وأحدهما متقادم. والعلاج أن تكفّ عن تخزينها وتحسبها عند الطلب، في دالة أو <code>@property</code>." },
      solution: { code: "class Item:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\n    def price_with_vat(self):\n        return self.price * 1.16",
                  en: "Now there is one source of truth. <a href=\"#l3-s3\">Lesson 3</a> shows how <code>@property</code> lets you keep calling it <code>i.price_with_vat</code>, with no brackets, so existing callers do not change.",
                  ar: "الآن هناك مصدر حقيقة واحد. ويُظهر <a href=\"#l3-s3\">الدرس 3</a> كيف تتيح <code>@property</code> أن تبقى تسمّيها <code>i.price_with_vat</code> بلا قوسين، فلا يتغير المستخدمون الحاليون." }
    },
    {
      id: "t2q7", type: "trace", level: "medium",
      topics: ["attr-lookup", "class-attr"],
      q: { en: "Trace the attribute lookups. What does each expression give at the end?",
           ar: "تتبّع البحث عن الخصائص. ما قيمة كل تعبير في النهاية؟" },
      code: "class Item:\n    vat_rate = 0.16\n\n    def __init__(self, name):\n        self.name = name\n\n\njuice = Item(\"juice\")\nbread = Item(\"bread\")\njuice.vat_rate = 0.0\nItem.vat_rate = 0.05",
      blanks: [
        { accept: ["0.0"], label: { en: "<code>juice.vat_rate</code>", ar: "<code>juice.vat_rate</code>" } },
        { accept: ["0.05"], label: { en: "<code>bread.vat_rate</code>", ar: "<code>bread.vat_rate</code>" } },
        { accept: ["0.05"], label: { en: "<code>Item.vat_rate</code>", ar: "<code>Item.vat_rate</code>" } }
      ],
      explain: { en: "<code>juice.vat_rate = 0.0</code> did not change the class &mdash; it created a new attribute on <code>juice</code> that shadows it. From then on <code>juice</code> is detached: raising the class rate to 0.05 moves <code>bread</code>, which never had its own value, and cannot reach <code>juice</code> at all. One assignment through one object silently opted it out of every future policy change. Watch it happen in <a href=\"#lab\">trace 4</a>.",
                 ar: "<code>juice.vat_rate = 0.0</code> لم تغيّر الصنف &mdash; بل أنشأت خاصية جديدة على <code>juice</code> تحجبه. ومن ثمّ يصبح <code>juice</code> منفصلًا: فرفع نسبة الصنف إلى 0.05 يحرّك <code>bread</code> الذي لم يملك قيمته الخاصة أبدًا، ولا يستطيع الوصول إلى <code>juice</code> إطلاقًا. فإسناد واحد عبر كائن واحد أخرجه بصمت من كل تغيير سياسة قادم. شاهد ذلك في <a href=\"#lab\">التتبّع 4</a>." }
    },
    {
      id: "t2q8", type: "order", level: "medium",
      topics: ["attr-lookup"],
      q: { en: "Python evaluates <code>juice.vat_rate</code>. Put the four steps of that lookup in the order they happen.",
           ar: "تُقيّم بايثون <code>juice.vat_rate</code>. رتّب خطوات ذلك البحث الأربع بترتيب حدوثها." },
      items: [
        { en: "Look in the object's own attributes.", ar: "ابحث في خصائص الكائن نفسه." },
        { en: "If found there, use that value and stop looking.", ar: "إن وُجدت هناك فاستخدم تلك القيمة وتوقّف عن البحث." },
        { en: "If not found, look in the object's class.", ar: "إن لم تُوجد فابحث في صنف الكائن." },
        { en: "If it is in neither, raise <code>AttributeError</code>.", ar: "إن لم تكن في أيٍّ منهما فارفع <code>AttributeError</code>." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "Object first, class second &mdash; and the \"stop looking\" in step 2 is the whole explanation of shadowing. (With inheritance there is a third stage: the base classes, in order. That is <a href=\"#l5-h1\">Lesson 5</a>.)",
                 ar: "الكائن أولًا ثم الصنف &mdash; و«التوقف عن البحث» في الخطوة 2 هو كل تفسير الحجب. (ومع الوراثة توجد مرحلة ثالثة: الأصناف الأساس بالترتيب. وذلك <a href=\"#l5-h1\">الدرس 5</a>.)" }
    },
    {
      id: "t2q9", type: "match", level: "medium",
      topics: ["init", "class-attr", "computed", "str-repr"],
      q: { en: "Match each piece of a class to the job it does.",
           ar: "وصّل كل جزء من الصنف بالمهمة التي يؤديها." },
      leftHead: { en: "Written as", ar: "يُكتب هكذا" },
      rightHead: { en: "Its job", ar: "مهمته" },
      pairs: [
        { l: { code: "def __init__(self, ...):" },
          r: { en: "The one place an object is made valid, so no caller can ever see a half-built one.", ar: "الموضع الوحيد الذي يُجعل فيه الكائن صحيحًا، فلا يرى أي مستدعٍ كائنًا نصف مبني." } },
        { l: { code: "vat_rate = 0.16  (in the class body)" },
          r: { en: "One shared fact about the type itself, which a single edit can change for every object at once.", ar: "حقيقة واحدة مشتركة عن النوع نفسه، يغيّرها تعديل واحد لكل الكائنات دفعةً." } },
        { l: { code: "def net_total(self):" },
          r: { en: "A value derived from other attributes, recomputed on every call so it can never go stale.", ar: "قيمة مشتقّة من خصائص أخرى، تُحسب في كل استدعاء فلا يمكن أن تتقادم." } },
        { l: { code: "def __str__(self):" },
          r: { en: "The one readable line the object prints as, so no caller has to know its format string.", ar: "السطر المقروء الواحد الذي يُطبع به الكائن، فلا يحتاج مستدعٍ أن يعرف نصّ تنسيقه." } }
      ],
      explain: { en: "Each of the four puts a decision in exactly one place: construction, shared policy, derivation, and presentation.",
                 ar: "كل واحد من الأربعة يضع قرارًا في موضع واحد بالضبط: البناء، والسياسة المشتركة، والاشتقاق، والعرض." }
    },
    {
      id: "t2q10", type: "compare", level: "hard",
      topics: ["mutable-default", "init"],
      q: { en: "Two orders are created with no items in both versions, then one item is appended to each. What is the difference?",
           ar: "تُنشأ فاتورتان بلا عناصر في كلتا النسختين، ثم يُضاف عنصر إلى كل منهما. فما الفرق؟" },
      codeA: "class Order:\n    def __init__(self, customer, items=[]):\n        self.customer = customer\n        self.items = items\n\n\na = Order(\"Huda\")\nb = Order(\"Yousef\")\na.items.append(\"juice\")\nb.items.append(\"bread\")\nprint(a.items)\nprint(b.items)",
      codeB: "class Order:\n    def __init__(self, customer, items=None):\n        self.customer = customer\n        self.items = [] if items is None else items\n\n\na = Order(\"Huda\")\nb = Order(\"Yousef\")\na.items.append(\"juice\")\nb.items.append(\"bread\")\nprint(a.items)\nprint(b.items)",
      options: [
        { en: "A prints <code>['juice', 'bread']</code> twice, because both orders share the one list created when the <code>def</code> line ran. B prints <code>['juice']</code> then <code>['bread']</code>, because <code>[]</code> now runs once per object.",
          ar: "تطبع أ <code>['juice', 'bread']</code> مرتين، لأن الفاتورتين تتشاركان القائمة الواحدة التي أُنشئت عند تنفيذ سطر <code>def</code>. وتطبع ب <code>['juice']</code> ثم <code>['bread']</code>، لأن <code>[]</code> تُنفَّذ الآن مرة لكل كائن." },
        { en: "Both print <code>['juice']</code> then <code>['bread']</code>; B is only the clearer way to write it.",
          ar: "تطبع كلتاهما <code>['juice']</code> ثم <code>['bread']</code>؛ وب هي الطريقة الأوضح في الكتابة فقط." },
        { en: "A raises a <code>TypeError</code> on the second <code>Order(...)</code>, because the default list is already in use.",
          ar: "ترفع أ <code>TypeError</code> عند <code>Order(...)</code> الثانية، لأن القائمة الافتراضية مستعملة أصلًا." },
        { en: "A prints the same as B, but only because no third order is created; the bug needs at least three objects to appear.",
          ar: "تطبع أ ما تطبعه ب، لكن فقط لأنه لا تُنشأ فاتورة ثالثة؛ فالخلل يحتاج ثلاثة كائنات على الأقل ليظهر." }
      ],
      answer: 0,
      explain: { en: "The default value is evaluated once, when the <code>def</code> line is read &mdash; not on each call. So in A there is exactly one list in the whole program, and <code>a.items is b.items</code> is <code>True</code>: Huda's order shows Yousef's bread. The bug appears with the second object, not the third, and it never raises anything &mdash; it just quietly merges unrelated data. Step through it in <a href=\"#lab\">trace 3</a>.",
                 ar: "تُقيَّم القيمة الافتراضية مرة واحدة عند قراءة سطر <code>def</code> &mdash; لا في كل استدعاء. فتوجد في أ قائمة واحدة بالضبط في البرنامج كله، و<code>a.items is b.items</code> تساوي <code>True</code>: ففاتورة هدى تُظهر خبز يوسف. ويظهر الخلل مع الكائن الثاني لا الثالث، ولا يرفع شيئًا أبدًا &mdash; إنما يدمج بصمت بيانات لا علاقة بينها. تنقّل فيه في <a href=\"#lab\">التتبّع 3</a>." }
    },
    {
      id: "t2q11", type: "complete", level: "hard",
      topics: ["computed", "str-repr", "init"],
      q: { en: "The rooftop tank should report how full it is as a percentage, and must never report a stale figure after water is drawn. Which body is correct?",
           ar: "يجب أن يُبلّغ خزان السطح نسبة امتلائه، وألا يُبلّغ رقمًا متقادمًا بعد سحب الماء. فأي جسد هو الصحيح؟" },
      code: "class Tank:\n    def __init__(self, roof, capacity):\n        self.roof = roof\n        self.capacity = capacity\n        self.litres = 0\n\n    def fill(self, litres):\n        self.litres = min(self.capacity, self.litres + litres)\n\n    def percent_full(self):\n        # which body?\n\n\nt = Tank(\"north\", 1000)\nt.fill(400)\nprint(t.percent_full())   # 40.0\nt.fill(300)\nprint(t.percent_full())   # 70.0",
      options: [
        { code: "return self.litres / self.capacity * 100" },
        { code: "return self.percent" },
        { code: "self.percent = self.litres / self.capacity * 100\nreturn self.percent" },
        { code: "return litres / capacity * 100" }
      ],
      answer: 0,
      explain: { en: "Compute from the attributes that are the source of truth, every time it is asked. The version that stores <code>self.percent</code> is the trap worth understanding: it returns the right number <em>and</em> leaves a copy on the object, and that copy is a second source of truth that goes stale the moment someone reads <code>t.percent</code> after a <code>fill</code>. The bare <code>return self.percent</code> reads an attribute that was never created (<code>AttributeError</code>), and the version without <code>self</code> forgets it (<code>NameError</code>).",
                 ar: "احسب من الخصائص التي هي مصدر الحقيقة، في كل مرة يُسأل. والنسخةُ التي تخزّن <code>self.percent</code> هي الفخ الذي يستحق الفهم: فهو يُعيد الرقم الصحيح <em>ويترك</em> نسخة على الكائن، وتلك النسخة مصدر حقيقة ثانٍ يتقادم لحظةَ يقرأ أحد <code>t.percent</code> بعد <code>fill</code>. و<code>return self.percent</code> المجردة تقرأ خاصية لم تُنشأ أبدًا (<code>AttributeError</code>)، والنسخةُ بلا <code>self</code> تنساها (<code>NameError</code>)." }
    },
    {
      id: "t2q12", type: "multi", level: "hard",
      topics: ["class-attr", "attr-lookup", "mutable-default"],
      q: { en: "A class attribute is a <strong>mutable</strong> list: <code>class Log: entries = []</code>. Select <strong>every</strong> true statement.",
           ar: "خاصية الصنف قائمة <strong>قابلة للتغيير</strong>: <code>class Log: entries = []</code>. اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "<code>a.entries.append(\"x\")</code> is visible through <code>b.entries</code> as well, because both found the one list on the class.",
          ar: "<code>a.entries.append(\"x\")</code> تُرى عبر <code>b.entries</code> أيضًا، لأن كلًا منهما وجد القائمة الواحدة على الصنف." },
        { en: "<code>a.entries = [\"x\"]</code> is <em>not</em> visible through <code>b.entries</code>, because assignment creates a new attribute on <code>a</code> instead of touching the class.",
          ar: "<code>a.entries = [\"x\"]</code> <em>لا</em> تُرى عبر <code>b.entries</code>، لأن الإسناد ينشئ خاصية جديدة على <code>a</code> بدل مسّ الصنف." },
        { en: "This is the same category of mistake as <code>items=[]</code> in a <code>def</code> line: one mutable object shared where one per instance was meant.",
          ar: "هذا من فصيلة الخطأ نفسها في <code>items=[]</code> في سطر <code>def</code>: كائن قابل للتغيير واحد مشترك حيث كان المقصود واحدًا لكل كائن." },
        { en: "Python forbids mutable class attributes, so the class body raises an error when it is defined.",
          ar: "تمنع بايثون خصائص الصنف القابلة للتغيير، فيرفع جسد الصنف خطأً عند تعريفه." },
        { en: "Reading <code>a.entries</code> before any assignment creates a private empty list on <code>a</code>.",
          ar: "قراءة <code>a.entries</code> قبل أي إسناد تنشئ قائمة فارغة خاصة على <code>a</code>." }
      ],
      answer: [0, 1, 2],
      explain: { en: "The first two together are the trickiest pair in the lesson: <strong>mutating</strong> goes through to the shared object, while <strong>assigning</strong> creates a shadow. So <code>append</code> leaks across every instance and <code>=</code> does not. The third is the right diagnosis &mdash; both bugs are one mutable object living longer than intended, and the fix is the same: create it per object in <code>__init__</code>. The fourth is false (Python allows it, and it is occasionally what you want, as with a registry shared on purpose), and the fifth is false: reading never creates anything, which is precisely why the shared list stays shared.",
                 ar: "الأولان معًا أصعب زوج في الدرس: فالـ<strong>تغيير</strong> ينفذ إلى الكائن المشترك، أما الـ<strong>إسناد</strong> فينشئ حجبًا. فـ <code>append</code> تتسرّب إلى كل الكائنات و<code>=</code> لا. والثالثة هي التشخيص الصحيح &mdash; فكلا الخللين كائن قابل للتغيير يعيش أطول من المقصود، والإصلاح نفسه: أنشئه لكل كائن في <code>__init__</code>. والرابعة خاطئة (بايثون تتيحه، وهو أحيانًا ما تريده، كسجلّ مشترك بقصد)، والخامسة خاطئة: فالقراءة لا تنشئ شيئًا أبدًا، وهذا بالضبط سبب بقاء القائمة المشتركة مشتركة." }
    }
  ]
};
