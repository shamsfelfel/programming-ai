/* ============================================================
   Chapter Test A — Core.
   Thirty questions sampling all seven lessons at easy and
   medium difficulty. Purpose: find out whether every idea in
   the chapter stuck, and point at the section to re-read when
   one did not.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["chapter-test-a"] = {
  title: { en: "Chapter Test A — Core", ar: "اختبار الفصل أ — الأساسيات" },
  intro: {
    en: "Thirty questions, roughly four or five from each lesson, in lesson order. Use <strong>Check everything</strong> at the end to see the breakdown by difficulty and by topic; any topic you scored under 60% on is listed with a link straight to it.",
    ar: "ثلاثون سؤالًا، أربعة أو خمسة من كل درس تقريبًا، بترتيب الدروس. استخدم <strong>تحقّق من الكل</strong> في النهاية لترى التوزيع حسب الصعوبة وحسب الموضوع؛ وكل موضوع حصلت فيه على أقل من 60% يُسرد مع رابط مباشر إليه."
  },
  questions: [
    /* ---------------- lesson 1 ---------------- */
    {
      id: "aq01", type: "tf", level: "easy", topics: ["class-vs-object"],
      q: { en: "A class holds the data of every object created from it, which is why editing the class changes all of them.",
           ar: "يحمل الصنف بيانات كل كائن أُنشئ منه، ولهذا يغيّر تعديل الصنف كلها." },
      truth: false,
      explain: { en: "A class holds the <em>description</em> &mdash; which attributes and methods an object will have &mdash; and no object's values. Each object keeps its own. The one thing a class really does hold for everyone is a class attribute, and that is <a href=\"#l2-h2\">Lesson 2</a>.",
                 ar: "يحمل الصنف <em>الوصف</em> &mdash; أي خصائص ودوال سيملكها الكائن &mdash; ولا يحمل قيم أي كائن. فكل كائن يحفظ قيمه. والشيء الوحيد الذي يحمله الصنف للجميع فعلًا هو خاصية الصنف، وذلك <a href=\"#l2-h2\">الدرس 2</a>." }
    },
    {
      id: "aq02", type: "mcq", level: "easy", topics: ["self", "dot-access"],
      q: { en: "<code>card.use(10)</code> calls <code>def use(self, amount):</code>. How many arguments does Python actually pass?",
           ar: "<code>card.use(10)</code> تستدعي <code>def use(self, amount):</code>. فكم وسيطًا تمرّر بايثون فعلًا؟" },
      options: [
        { en: "Two: <code>card</code> as <code>self</code>, and <code>10</code> as <code>amount</code>.", ar: "اثنان: <code>card</code> كـ <code>self</code>، و<code>10</code> كـ <code>amount</code>." },
        { en: "One: just <code>10</code>. <code>self</code> is filled in later by the method body.", ar: "واحد: <code>10</code> فقط. و<code>self</code> يُعبَّأ لاحقًا بجسد الدالة." },
        { en: "Three: the class, the object, and <code>10</code>.", ar: "ثلاثة: الصنف والكائن و<code>10</code>." },
        { en: "None &mdash; methods read their values from the object rather than receiving arguments.", ar: "لا شيء &mdash; فالدوال تقرأ قيمها من الكائن بدل أن تستقبل وسائط." }
      ],
      answer: 0,
      explain: { en: "<code>card.use(10)</code> is shorthand for <code>TopUpCard.use(card, 10)</code>. This is also the explanation for <code>TypeError: use() takes 1 positional argument but 2 were given</code> &mdash; the message is comparing the header's count with the call's.",
                 ar: "<code>card.use(10)</code> اختصار لـ <code>TopUpCard.use(card, 10)</code>. وهذا أيضًا تفسير <code>TypeError: use() takes 1 positional argument but 2 were given</code> &mdash; فالرسالة تقارن عدد الترويسة بعدد الاستدعاء." }
    },
    {
      id: "aq03", type: "fill", level: "easy", topics: ["init", "attributes"],
      q: { en: "Complete <code>__init__</code> so the shelf stores all three values.",
           ar: "أكمل <code>__init__</code> ليخزّن الرف القيم الثلاث." },
      code: "class Shelf:\n    def __init__(self, code, capacity, used):\n        self.code = code\n        ____1____\n        ____2____",
      blanks: [
        { accept: ["self.capacity = capacity"], wide: true, label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["self.used = used"], wide: true, label: { en: "blank 2", ar: "الفراغ 2" } }
      ],
      explain: { en: "A parameter is a local name that disappears when the method ends; <code>self.x = x</code> is what makes the value outlive the call.",
                 ar: "المعامل اسم محلي يختفي بانتهاء الدالة؛ و<code>self.x = x</code> هي ما يجعل القيمة تبقى بعد الاستدعاء." }
    },
    {
      id: "aq04", type: "output", level: "easy", topics: ["instances", "methods"],
      q: { en: "Write what this prints.", ar: "اكتب ما يطبعه هذا." },
      code: "class Shelf:\n    def __init__(self, code, capacity, used):\n        self.code = code\n        self.capacity = capacity\n        self.used = used\n\n    def free_slots(self):\n        return self.capacity - self.used\n\n\na = Shelf(\"A1\", 30, 12)\nb = Shelf(\"B2\", 30, 30)\nprint(a.free_slots(), b.free_slots())",
      blanks: [{ accept: ["18 0"], ph: "18 0" }],
      explain: { en: "One method body, two answers, because each call reads through its own <code>self</code>.",
                 ar: "جسد دالة واحد وجوابان، لأن كل استدعاء يقرأ عبر <code>self</code> الخاص به." }
    },
    {
      id: "aq05", type: "match", level: "medium", topics: ["class-vs-object", "attributes", "methods", "self"],
      q: { en: "Match each term to what it names.", ar: "وصّل كل مصطلح بما يسمّيه." },
      leftHead: { en: "Term", ar: "المصطلح" },
      rightHead: { en: "Names", ar: "يسمّي" },
      pairs: [
        { l: { en: "class", ar: "الصنف" }, r: { en: "The description an object is built from.", ar: "الوصف الذي يُبنى منه الكائن." } },
        { l: { en: "instance", ar: "الكائن" }, r: { en: "One thing built from the class, holding its own values.", ar: "شيء واحد مبني من الصنف، يحمل قيمه الخاصة." } },
        { l: { en: "attribute", ar: "الخاصية" }, r: { en: "A value stored on an object and reached with a dot.", ar: "قيمة مخزّنة على كائن تُقرأ بالنقطة." } },
        { l: { en: "method", ar: "دالة الكائن" }, r: { en: "A function in the class whose first parameter is the object itself.", ar: "دالة في الصنف معاملها الأول هو الكائن نفسه." } }
      ],
      explain: { en: "A class describes, an instance exists, an attribute is what it holds, a method is what it does.",
                 ar: "الصنف يصف، والكائن يوجد، والخاصية ما يحمله، والدالة ما يفعله." }
    },
    /* ---------------- lesson 2 ---------------- */
    {
      id: "aq06", type: "tf", level: "easy", topics: ["init"],
      q: { en: "If a class defines <code>__init__</code>, every object of that class is guaranteed to have the attributes <code>__init__</code> assigns.",
           ar: "إذا عرّف صنفٌ <code>__init__</code> فكل كائن من ذلك الصنف مضمونٌ أن يملك الخصائص التي تُسندها <code>__init__</code>." },
      truth: true,
      explain: { en: "That guarantee is the reason <code>__init__</code> exists, and the reason a half-built dictionary with a missing key is a class of bug an object cannot have. The one way to break it is a subclass that defines its own <code>__init__</code> and forgets <code>super().__init__(...)</code> &mdash; <a href=\"#l5-h1\">Lesson 5</a>.",
                 ar: "ذلك الضمان هو سبب وجود <code>__init__</code>، وسبب أن قاموسًا نصف مبني بمفتاح مفقود فصيلةُ خلل لا يستطيع كائنٌ أن يملكها. والسبيل الوحيد لكسره وريثٌ يعرّف <code>__init__</code> خاصته وينسى <code>super().__init__(...)</code> &mdash; <a href=\"#l5-h1\">الدرس 5</a>." }
    },
    {
      id: "aq07", type: "output", level: "medium", topics: ["class-attr", "computed"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "class Session:\n    seats_default = 20\n\n    def __init__(self, trainer):\n        self.trainer = trainer\n        self.attendees = []\n\n    def seats_left(self):\n        return self.seats_default - len(self.attendees)\n\n\na = Session(\"Nadia\")\nb = Session(\"Omar\")\na.attendees.append(\"Lina\")\nprint(a.seats_left(), b.seats_left())\nSession.seats_default = 25\nprint(a.seats_left(), b.seats_left())",
      blanks: [{ accept: ["19 20\n24 25"], lines: 2 }],
      explain: { en: "<code>attendees</code> is per-object so enrolling Lina moved only <code>a</code>; <code>seats_default</code> is on the class so raising it moved both. One edit, every session &mdash; which is what a class attribute is for.",
                 ar: "<code>attendees</code> لكل كائن فتسجيل لينا حرّك <code>a</code> وحده؛ و<code>seats_default</code> على الصنف فرفعها حرّك كليهما. تعديل واحد وكل الحصص &mdash; وهذا ما خاصية الصنف له." }
    },
    {
      id: "aq08", type: "error", level: "medium", topics: ["mutable-default"],
      q: { en: "Huda's order shows Yousef's bread. Click the line responsible.",
           ar: "فاتورة هدى تُظهر خبز يوسف. انقر السطر المسؤول." },
      code: "class Order:\n    def __init__(self, customer, items=[]):\n        self.customer = customer\n        self.items = items\n\n    def add_item(self, name):\n        self.items.append(name)\n\n\na = Order(\"Huda\")\na.add_item(\"juice\")\nb = Order(\"Yousef\")\nb.add_item(\"bread\")\nprint(a.items)",
      answer: 2,
      explain: { en: "The <code>[]</code> on line 2 is evaluated once, when the <code>def</code> line runs, so one single list becomes the default for every order that does not pass its own. Use <code>items=None</code> and create the list inside the body. Step through it in <a href=\"#lab\">trace 3</a>.",
                 ar: "<code>[]</code> في السطر 2 تُقيَّم مرة واحدة عند تنفيذ سطر <code>def</code>، فتصبح قائمة واحدة هي الافتراضية لكل فاتورة لا تمرر قائمتها. استخدم <code>items=None</code> وأنشئ القائمة داخل الجسد. تنقّل فيه في <a href=\"#lab\">التتبّع 3</a>." }
    },
    {
      id: "aq09", type: "trace", level: "medium", topics: ["attr-lookup", "class-attr"],
      q: { en: "What does each expression give at the end?", ar: "ماذا يعطي كل تعبير في النهاية؟" },
      code: "class Item:\n    vat_rate = 0.16\n\n    def __init__(self, name):\n        self.name = name\n\n\njuice = Item(\"juice\")\nbread = Item(\"bread\")\njuice.vat_rate = 0.0\nItem.vat_rate = 0.05",
      blanks: [
        { accept: ["0.0"], label: { en: "<code>juice.vat_rate</code>", ar: "<code>juice.vat_rate</code>" } },
        { accept: ["0.05"], label: { en: "<code>bread.vat_rate</code>", ar: "<code>bread.vat_rate</code>" } }
      ],
      explain: { en: "Assigning through <code>juice</code> created a new attribute on <code>juice</code> that shadows the class one, so <code>juice</code> is permanently detached from later policy changes while <code>bread</code> follows them.",
                 ar: "الإسناد عبر <code>juice</code> أنشأ خاصية جديدة عليه تحجب خاصية الصنف، فصار <code>juice</code> منفصلًا نهائيًا عن تغييرات السياسة اللاحقة بينما يتبعها <code>bread</code>." }
    },
    {
      id: "aq10", type: "complete", level: "easy", topics: ["str-repr"],
      q: { en: "Which method makes <code>print(t)</code> show <code>T-7 for Huda</code> instead of <code>&lt;__main__.Ticket object at 0x&hellip;&gt;</code>?",
           ar: "أي دالة تجعل <code>print(t)</code> تُظهر <code>T-7 for Huda</code> بدل <code>&lt;__main__.Ticket object at 0x&hellip;&gt;</code>؟" },
      code: "class Ticket:\n    def __init__(self, tid, customer):\n        self.id = tid\n        self.customer = customer\n\n    # which method?\n\n\nprint(Ticket(\"T-7\", \"Huda\"))",
      options: [
        { code: "def __str__(self):\n    return f\"{self.id} for {self.customer}\"" },
        { code: "def print(self):\n    return f\"{self.id} for {self.customer}\"" },
        { code: "def __print__(self):\n    return f\"{self.id} for {self.customer}\"" },
        { code: "def to_string(self):\n    return f\"{self.id} for {self.customer}\"" }
      ],
      answer: 0,
      explain: { en: "<code>print</code> asks the object for <code>__str__</code>. The other three are ordinary methods with no special status &mdash; <code>t.to_string()</code> works but every caller has to know to call it, which is the format string leaking out of the class again.",
                 ar: "تسأل <code>print</code> الكائنَ عن <code>__str__</code>. والثلاثة الأخرى دوال عادية بلا مكانة خاصة &mdash; فـ <code>t.to_string()</code> تعمل لكن على كل مستدعٍ أن يعلم باستدعائها، وهذا نصّ التنسيق يتسرّب من الصنف مرة أخرى." }
    },
    /* ---------------- lesson 3 ---------------- */
    {
      id: "aq11", type: "tf", level: "easy", topics: ["underscore"],
      q: { en: "<code>self._mark</code> is private: Python raises an error if outside code assigns to it.",
           ar: "<code>self._mark</code> خاصة: ترفع بايثون خطأً إذا أسند إليها كود خارجي." },
      truth: false,
      explain: { en: "The underscore is a convention and nothing more. What actually enforces a rule is a <code>@property</code> with a setter, or a getter with no setter at all.",
                 ar: "الشرطة السفلية اتفاقٌ لا أكثر. وما يفرض القاعدة فعلًا هو <code>@property</code> بضابط، أو قارئٌ بلا ضابط إطلاقًا." }
    },
    {
      id: "aq12", type: "fill", level: "easy", topics: ["property", "setter"],
      q: { en: "Name the two decorators.", ar: "سمِّ المزخرِفَين." },
      code: "    ____1____\n    def mark(self):\n        return self._mark\n\n    ____2____\n    def mark(self, value):\n        if not 0 <= value <= 100:\n            raise ValueError(\"out of range\")\n        self._mark = value",
      blanks: [
        { accept: ["@property"], label: { en: "the reader", ar: "القارئ" } },
        { accept: ["@mark.setter"], label: { en: "the writer", ar: "الكاتب" } }
      ],
      explain: { en: "The setter is named after the property, not after <code>property</code>, because it attaches itself to the object the getter just created.",
                 ar: "يُسمّى الضابط باسم الخاصية لا باسم <code>property</code>، لأنه يرتبط بالكائن الذي أنشأه القارئ للتو." }
    },
    {
      id: "aq13", type: "output", level: "medium", topics: ["read-only", "property"],
      q: { en: "Write the three lines this prints.", ar: "اكتب الأسطر الثلاثة التي يطبعها." },
      code: "class Meter:\n    def __init__(self, serial, balance=0.0):\n        self.serial = serial\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def top_up(self, amount):\n        self._balance = self._balance + amount\n\n\nm = Meter(\"M-1\", 10.0)\nprint(m.balance)\nm.top_up(5)\nprint(m.balance)\ntry:\n    m.balance = 100\nexcept AttributeError:\n    print(\"blocked\")",
      blanks: [{ accept: ["10.0\n15.0\nblocked"], lines: 3 }],
      explain: { en: "A getter with no setter is read-only. A balance is something that happens through top-ups, not something an outsider declares.",
                 ar: "القارئ بلا ضابط للقراءة فقط. فالرصيد شيء يحدث عبر الشحن، لا شيء يعلنه غريب." }
    },
    {
      id: "aq14", type: "mcq", level: "medium", topics: ["invariant", "one-door"],
      q: { en: "Why is a rule checked in six callers worse than the same rule in one setter?",
           ar: "لماذا القاعدة المفحوصة في ستة مستدعين أسوأ من القاعدة نفسها في ضابط واحد؟" },
      options: [
        { en: "Because the seventh caller, written later by someone else, is the one that will not check &mdash; and no test can cover a path nobody has written yet.",
          ar: "لأن المستدعي السابع، المكتوب لاحقًا بيد غيرك، هو الذي لن يفحص &mdash; ولا اختبار يستطيع تغطية مسار لم يكتبه أحد بعد." },
        { en: "Because six checks run six times and slow the program down.",
          ar: "لأن ستة فحوص تُنفَّذ ست مرات فتُبطئ البرنامج." },
        { en: "Because duplicated code is harder to read, though the behaviour is identical.",
          ar: "لأن الكود المكرَّر أصعب قراءةً، مع أن السلوك متطابق." },
        { en: "It is not worse, as long as all six checks are written the same way.",
          ar: "ليست أسوأ، ما دامت الفحوص الستة مكتوبة بالطريقة نفسها." }
      ],
      answer: 0,
      explain: { en: "Correctness that depends on everyone remembering is luck with good odds. Moving the check to the one door makes the invariant true by construction.",
                 ar: "الصحة التي تتوقف على تذكّر الجميع حظٌّ باحتمالات جيدة. ونقل الفحص إلى الباب الواحد يجعل الشرط الثابت صحيحًا بالبناء." }
    },
    {
      id: "aq15", type: "error", level: "medium", topics: ["property"],
      q: { en: "Creating a student hits <code>RecursionError</code>. Click the line to fix.",
           ar: "إنشاء طالب يصطدم بـ <code>RecursionError</code>. انقر السطر الذي يجب إصلاحه." },
      code: "class Student:\n    def __init__(self, name, mark=0):\n        self.name = name\n        self.mark = mark\n\n    @property\n    def mark(self):\n        return self.mark\n\n    @mark.setter\n    def mark(self, value):\n        self._mark = value",
      answer: 8,
      explain: { en: "The getter returns the property it is, so it calls itself for ever. It must read the private attribute the setter wrote: <code>return self._mark</code>.",
                 ar: "القارئ يُعيد الخاصية التي هو، فيستدعي نفسه إلى الأبد. وعليه أن يقرأ الخاصية الخاصة التي كتبها الضابط: <code>return self._mark</code>." }
    },
    /* ---------------- lesson 4 ---------------- */
    {
      id: "aq16", type: "tf", level: "easy", topics: ["abc", "early-failure"],
      q: { en: "A subclass of an <code>ABC</code> that leaves an <code>@abstractmethod</code> unimplemented fails when you try to create it, not when you call the method.",
           ar: "وريثُ <code>ABC</code> الذي يترك <code>@abstractmethod</code> غير منفَّذة يفشل عند محاولة إنشائه، لا عند استدعاء الدالة." },
      truth: true,
      explain: { en: "<code>TypeError: Can't instantiate abstract class ... without an implementation for abstract method ...</code>, raised at creation &mdash; import time or the first line of the first test, rather than mid-transaction.",
                 ar: "<code>TypeError: Can't instantiate abstract class ... without an implementation for abstract method ...</code>، يُرفع عند الإنشاء &mdash; وقتَ الاستيراد أو أول سطر في أول اختبار، لا في منتصف معاملة." }
    },
    {
      id: "aq17", type: "mcq", level: "easy", topics: ["interface", "hide-shape"],
      q: { en: "Twelve places read <code>tank.litres</code>. The new tank measures depth instead. What was the design mistake?",
           ar: "اثنتا عشرة موضعًا تقرأ <code>tank.litres</code>. والخزان الجديد يقيس العمق بدلًا من ذلك. فما خطأ التصميم؟" },
      options: [
        { en: "Callers were told the storage shape instead of being given an answer, so all twelve now depend on a field that no longer exists.",
          ar: "أُخبر المستدعون بشكل التخزين بدل أن يُعطوا جوابًا، فصارت الاثنتا عشرة كلها تتوقف على حقل لم يبقَ موجودًا." },
        { en: "The attribute should have been named <code>_litres</code>, which would have made the change safe.",
          ar: "كان ينبغي تسمية الخاصية <code>_litres</code>، وكان ذلك سيجعل التغيير آمنًا." },
        { en: "There was no mistake; a measurement change always costs one edit per reader.",
          ar: "لا خطأ؛ فتغيير القياس يكلّف دائمًا تعديلًا لكل قارئ." },
        { en: "The tank should have stored both fields from the start.",
          ar: "كان ينبغي للخزان أن يخزّن الحقلين من البداية." }
      ],
      answer: 0,
      explain: { en: "Publish <code>litres_left</code> as a property and the new class computes it from depth with nothing outside changing. The underscore alone would not have helped &mdash; it marks intent, it does not give callers an alternative to read.",
                 ar: "انشر <code>litres_left</code> خاصيةً فيحسبها الصنف الجديد من العمق ولا يتغير شيء في الخارج. والشرطة السفلية وحدها ما كانت ستعين &mdash; فهي تعلّم القصد ولا تمنح المستدعين بديلًا يقرأونه." }
    },
    {
      id: "aq18", type: "output", level: "medium", topics: ["interface", "computed"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "class ChargeSession:\n    rate_per_min = 0.5\n\n    def __init__(self, customer, start_min, end_min=None, paused_minutes=0):\n        self.customer = customer\n        self._start = start_min\n        self._end = end_min\n        self._paused = paused_minutes\n\n    @property\n    def is_running(self):\n        return self._end is None\n\n    @property\n    def minutes_used(self):\n        if self._end is None:\n            return 0\n        return self._end - self._start - self._paused\n\n    @property\n    def cost(self):\n        return self.minutes_used * self.rate_per_min\n\n\ns = ChargeSession(\"Rami\", 100, 160, paused_minutes=10)\nprint(s.is_running, s.minutes_used, s.cost)\nt = ChargeSession(\"Huda\", 200)\nprint(t.is_running, t.minutes_used, t.cost)",
      blanks: [{ accept: ["False 50 25.0\nTrue 0 0.0"], lines: 2 }],
      explain: { en: "60 minutes minus 10 paused, at 0.5 each. <code>cost</code> asks <code>minutes_used</code> rather than subtracting itself, which is why adding the pause feature changed one method and no call site.",
                 ar: "60 دقيقة ناقص 10 موقوفة، بسعر 0.5 لكل دقيقة. و<code>cost</code> تسأل <code>minutes_used</code> بدل أن تطرح بنفسها، ولهذا غيّرت إضافة ميزة الإيقاف دالة واحدة ولا موضع استدعاء." }
    },
    {
      id: "aq19", type: "compare", level: "medium", topics: ["abc", "early-failure"],
      q: { en: "Both forget <code>send</code> on a new channel. When do you find out?",
           ar: "كلتاهما تنسى <code>send</code> على قناة جديدة. فمتى تكتشف ذلك؟" },
      codeA: "class TelegramNotifier:\n    pass\n\n\nn = TelegramNotifier()\nprint(\"created fine\")\nn.send(\"0599\", \"ready\")",
      codeB: "from abc import ABC, abstractmethod\n\n\nclass Notifier(ABC):\n    @abstractmethod\n    def send(self, to, text):\n        ...\n\n\nclass TelegramNotifier(Notifier):\n    pass\n\n\nn = TelegramNotifier()\nprint(\"created fine\")",
      options: [
        { en: "A prints <code>created fine</code>, then raises <code>AttributeError</code> at the call. B never prints: it raises <code>TypeError</code> on the <code>TelegramNotifier()</code> line and names the missing method.",
          ar: "تطبع أ <code>created fine</code> ثم ترفع <code>AttributeError</code> عند الاستدعاء. وب لا تطبع شيئًا: ترفع <code>TypeError</code> في سطر <code>TelegramNotifier()</code> وتسمّي الدالة المفقودة." },
        { en: "Both raise the same error at the same point.", ar: "ترفع كلتاهما الخطأ نفسه في النقطة نفسها." },
        { en: "A is fine because the error names the method; B hides which one is missing.", ar: "أ مقبولة لأن الخطأ يسمّي الدالة؛ وب تخفي أيُّها مفقودة." },
        { en: "B raises only when <code>n.send(...)</code> is reached.", ar: "ترفع ب فقط عند بلوغ <code>n.send(...)</code>." }
      ],
      answer: 0,
      explain: { en: "The defect did not get smaller, it got earlier &mdash; and moved from the customer's side of the counter to the programmer's.",
                 ar: "لم يصغر العيب، بل صار أبكر &mdash; وانتقل من جهة العميل في المنضدة إلى جهة المبرمج." }
    },
    {
      id: "aq20", type: "order", level: "medium", topics: ["interface", "hide-shape"],
      q: { en: "Order the steps that turn a class with public internals into one that publishes answers.",
           ar: "رتّب الخطوات التي تحوّل صنفًا بداخلٍ عام إلى صنف ينشر أجوبة." },
      items: [
        { en: "List the questions the callers actually ask.", ar: "اسرد الأسئلة التي يسألها المستدعون فعلًا." },
        { en: "Publish one property per question.", ar: "انشر خاصية لكل سؤال." },
        { en: "Rename the stored fields with a leading underscore.", ar: "غيّر أسماء الحقول المخزّنة بشرطة سفلية في البداية." },
        { en: "Rewrite the callers to ask the properties.", ar: "أعد كتابة المستدعين ليسألوا الخصائص." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The questions come from the call sites, so they have to be read first. An interface invented before any caller exists usually publishes the wrong ones.",
                 ar: "الأسئلة تأتي من مواضع الاستدعاء، فيجب قراءتها أولًا. والواجهة المبتكرة قبل وجود أي مستدعٍ تنشر الخاطئة عادةً." }
    },
    /* ---------------- lesson 5 ---------------- */
    {
      id: "aq21", type: "tf", level: "easy", topics: ["super"],
      q: { en: "<code>super().__init__(name, phone)</code> runs the base class's <code>__init__</code> on the same object the subclass is building.",
           ar: "<code>super().__init__(name, phone)</code> تنفّذ <code>__init__</code> الصنف الأساس على الكائن نفسه الذي يبنيه الوريث." },
      truth: true,
      explain: { en: "One object, two <code>__init__</code> methods taking turns. No second object is created and nothing is copied. See <a href=\"#lab\">trace 6</a>.",
                 ar: "كائن واحد ودالتا <code>__init__</code> تتناوبان. ولا يُنشأ كائن ثانٍ ولا يُنسخ شيء. انظر <a href=\"#lab\">التتبّع 6</a>." }
    },
    {
      id: "aq22", type: "output", level: "medium", topics: ["inheritance", "override", "attr-lookup"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "class Courier:\n    fee_per_km = 1.5\n\n    def __init__(self, name):\n        self.name = name\n\n    def fee(self, km):\n        return km * self.fee_per_km\n\n\nclass TruckCourier(Courier):\n    fee_per_km = 3.0\n\n\nclass BicycleCourier(Courier):\n    pass\n\n\nt = TruckCourier(\"Samir\")\nb = BicycleCourier(\"Lina\")\nprint(t.fee(10), b.fee(10))\nprint(t.name, b.name)",
      blanks: [{ accept: ["30.0 15.0\nSamir Lina"], lines: 2 }],
      explain: { en: "<code>fee</code> lives in <code>Courier</code> where the rate is 1.5, and still charges 3.0 for the truck: the method comes from wherever Python finds it, but the data always comes from <code>self</code>.",
                 ar: "<code>fee</code> تعيش في <code>Courier</code> حيث النسبة 1.5، ومع ذلك تحاسب 3.0 للشاحنة: فالدالة تأتي من حيث تجدها بايثون، أما البيانات فتأتي دائمًا من <code>self</code>." }
    },
    {
      id: "aq23", type: "error", level: "medium", topics: ["super", "invalid-birth"],
      q: { en: "<code>t.plate</code> works but <code>t.name</code> raises <code>AttributeError</code>. Click the line that must change.",
           ar: "<code>t.plate</code> تعمل لكن <code>t.name</code> ترفع <code>AttributeError</code>. انقر السطر الذي يجب تغييره." },
      code: "class Courier:\n    def __init__(self, name, phone):\n        self.name = name\n        self.phone = phone\n        self.deliveries_today = 0\n\n\nclass TruckCourier(Courier):\n    def __init__(self, name, phone, plate):\n        self.plate = plate\n\n\nt = TruckCourier(\"Samir\", \"0599\", \"A-1234\")\nprint(t.name)",
      answer: 10,
      explain: { en: "A subclass <code>__init__</code> replaces the base one rather than adding to it, so three attributes are simply absent. Line 10 needs <code>super().__init__(name, phone)</code> before it.",
                 ar: "<code>__init__</code> الوريث يحلّ محلّ الأساس لا يضيف إليه، فتغيب ثلاث خصائص ببساطة. ويحتاج السطر 10 إلى <code>super().__init__(name, phone)</code> قبله." }
    },
    {
      id: "aq24", type: "mcq", level: "easy", topics: ["is-a-has-a", "composition"],
      q: { en: "Which pair calls for composition rather than inheritance?",
           ar: "أي زوج يستدعي التركيب لا الوراثة؟" },
      options: [
        { en: "<code>Teacher</code> and <code>Timetable</code> &mdash; a teacher holds a timetable.", ar: "<code>Teacher</code> و<code>Timetable</code> &mdash; فالمعلّم يمسك بجدول." },
        { en: "<code>TruckCourier</code> and <code>Courier</code> &mdash; a truck courier is a courier.", ar: "<code>TruckCourier</code> و<code>Courier</code> &mdash; فمندوب الشاحنة مندوب." },
        { en: "<code>StudentVisit</code> and <code>Visit</code> &mdash; a student visit is a visit.", ar: "<code>StudentVisit</code> و<code>Visit</code> &mdash; فزيارة الطالب زيارة." },
        { en: "<code>BatteryJob</code> and <code>Job</code> &mdash; a battery job is a job.", ar: "<code>BatteryJob</code> و<code>Job</code> &mdash; فعمل البطارية عمل." }
      ],
      answer: 0,
      explain: { en: "Read it out loud: \"a teacher is a timetable\" is nonsense, \"a teacher has a timetable\" is true. The other three pass the <em>is a</em> test and are correctly written as inheritance.",
                 ar: "اقرأها بصوت مسموع: «المعلّم جدول» هراء، و«للمعلّم جدول» صحيحة. والثلاثة الأخرى تجتاز اختبار «هو نوع من» وكُتبت وراثةً بحقّ." }
    },
    {
      id: "aq25", type: "match", level: "medium", topics: ["is-a-has-a", "composition", "inheritance", "fragile-base"],
      q: { en: "Match each situation to the design it calls for.", ar: "وصّل كل حالة بالتصميم الذي تستدعيه." },
      leftHead: { en: "Situation", ar: "الحالة" },
      rightHead: { en: "Calls for", ar: "يستدعي" },
      pairs: [
        { l: { en: "A subclass that keeps every promise its base makes and only adds a field.", ar: "وريثٌ يحفظ كل وعد يقطعه أساسه ويضيف حقلًا فقط." },
          r: { en: "Inheritance &mdash; this is what it is for.", ar: "الوراثة &mdash; وهذا ما هي له." } },
        { l: { en: "Two independent axes of variation, like power source and cargo type.", ar: "محوران مستقلان من التنوّع، كمصدر الطاقة ونوع الحمل." },
          r: { en: "Composition &mdash; otherwise you need a class per combination.", ar: "التركيب &mdash; وإلا احتجت صنفًا لكل توليفة." } },
        { l: { en: "A subclass that must refuse something the base promises.", ar: "وريثٌ يجب أن يرفض شيئًا يوعد به الأساس." },
          r: { en: "A redesign &mdash; the base promised more than its subclasses can keep.", ar: "إعادة تصميم &mdash; فقد وعد الأساس بأكثر مما تستطيع وريثاته الوفاء به." } },
        { l: { en: "Wanting access to one method of another class.", ar: "الرغبة في الوصول إلى دالة واحدة من صنف آخر." },
          r: { en: "Holding an instance &mdash; the most common bad reason to inherit.", ar: "إمساك كائن &mdash; وهو أشيع سبب سيّئ للوراثة." } }
      ],
      explain: { en: "Inherit for <em>is a</em>, compose for <em>has a</em>, and treat a subclass that has to disable something as a sign the hierarchy is wrong rather than a thing to work around.",
                 ar: "وَرِّث لـ«هو نوع من»، وركِّب لـ«له»، وعُدَّ الوريثَ المضطرَّ إلى تعطيل شيء علامةً على خطأ التسلسل لا شيئًا تتحايل عليه." }
    },
    /* ---------------- lesson 6 ---------------- */
    {
      id: "aq26", type: "tf", level: "easy", topics: ["duck-typing"],
      q: { en: "Two classes with no shared base class can still be used interchangeably by a function, as long as both define the method it calls.",
           ar: "يمكن لصنفين بلا صنف أساس مشترك أن يُستعملا بالتبادل في دالة، ما دام كلاهما يعرّف الدالة التي تستدعيها." },
      truth: true,
      explain: { en: "That is duck typing. Python checks nothing on the way in: if it quacks, it is a duck. An <code>ABC</code> is for catching an incomplete implementation early, not for permitting the call.",
                 ar: "ذلك تصنيف البطة. وبايثون لا تفحص شيئًا عند الدخول: فإن بطبط فهو بطة. و<code>ABC</code> لضبط التنفيذ الناقص مبكرًا، لا لإباحة الاستدعاء." }
    },
    {
      id: "aq27", type: "output", level: "medium", topics: ["polymorphism", "override"],
      q: { en: "Write the four lines this prints.", ar: "اكتب الأسطر الأربعة التي يطبعها." },
      code: "class Visit:\n    base_fee = 60.0\n\n    def __init__(self, patient):\n        self.patient = patient\n\n    def fee(self):\n        return self.base_fee\n\n\nclass FollowUpVisit(Visit):\n    def fee(self):\n        return 0.0\n\n\nclass StudentVisit(Visit):\n    def fee(self):\n        return self.base_fee * 0.65\n\n\nday = [Visit(\"Rami\"), FollowUpVisit(\"Huda\"), StudentVisit(\"Lina\")]\ntotal = 0.0\nfor v in day:\n    print(v.patient, v.fee())\n    total = total + v.fee()\nprint(total)",
      blanks: [{ accept: ["Rami 60.0\nHuda 0.0\nLina 39.0\n99.0"], lines: 4 }],
      explain: { en: "One loop body, three answers, no <code>if</code>. A fourth visit type is one new class and no edit to this loop. See <a href=\"#lab\">trace 7</a>.",
                 ar: "جسد حلقة واحد وثلاثة أجوبة بلا <code>if</code>. ونوع زيارة رابع صنفٌ جديد واحد ولا تعديل لهذه الحلقة. انظر <a href=\"#lab\">التتبّع 7</a>." }
    },
    {
      id: "aq28", type: "fill", level: "easy", topics: ["dunder"],
      q: { en: "Name the method each built-in reaches for.", ar: "سمِّ الدالة التي يبحث عنها كل مدمج." },
      code: "print(r)       # ____1____\nlen(r)         # ____2____\n\"Nasr\" in r    # ____3____",
      blanks: [
        { accept: ["__str__"], label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["__len__"], label: { en: "blank 2", ar: "الفراغ 2" } },
        { accept: ["__contains__"], label: { en: "blank 3", ar: "الفراغ 3" } }
      ],
      explain: { en: "These are the polymorphism you used before you had the word: <code>len</code> works on lists, strings and dicts because each answers the same question its own way.",
                 ar: "هذه هي تعدد الأشكال الذي استعملته قبل أن تملك الكلمة: فـ <code>len</code> تعمل على القوائم والنصوص والقواميس لأن كلًّا يجيب السؤال نفسه بطريقته." }
    },
    {
      id: "aq29", type: "order", level: "medium", topics: ["ifelif", "polymorphism"],
      q: { en: "Order the steps from two <code>if/elif</code> chains to polymorphism.",
           ar: "رتّب الخطوات من سلسلتَي <code>if/elif</code> إلى تعدد الأشكال." },
      items: [
        { en: "Notice the same cases are distinguished in more than one function.", ar: "لاحظ أن الحالات نفسها تُميَّز في أكثر من دالة." },
        { en: "Make a class per case, common parts in a base class.", ar: "اصنع صنفًا لكل حالة، والمشترك في صنف أساس." },
        { en: "Move each branch body into a method of the same name.", ar: "انقل جسد كل فرع إلى دالة بالاسم نفسه." },
        { en: "Replace <code>calculate_fee(v)</code> with <code>v.fee()</code>.", ar: "استبدل <code>calculate_fee(v)</code> بـ <code>v.fee()</code>." },
        { en: "Delete the helpers and their chains.", ar: "احذف الدوال المساعدة وسلاسلها." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 1 is the diagnosis: one chain in one place is often fine, and it is the same cases reappearing elsewhere that makes a class per case pay.",
                 ar: "الخطوة 1 هي التشخيص: فسلسلة واحدة في موضع واحد مقبولة غالبًا، وإنما ظهور الحالات نفسها في موضع آخر هو ما يجعل صنفًا لكل حالة يسدّد." }
    },
    /* ---------------- lesson 7 ---------------- */
    {
      id: "aq30", type: "mcq", level: "medium", topics: ["design-cost", "when-not-oop"],
      q: { en: "The two capstone files produce identical output. So what is the comparison actually about?",
           ar: "ينتج ملفا المشروع الختامي المُخرَج نفسه. فعن أي شيء المقارنة فعلًا؟" },
      options: [
        { en: "The price of the next change: name the change, count the edits in each file, name the principle &mdash; and accept that for some changes the structured file wins.",
          ar: "ثمن التغيير القادم: سمِّ التغيير، وأحصِ التعديلات في كل ملف، وسمِّ المبدأ &mdash; واقبل أن الملف الإجرائي يفوز في بعض التغييرات." },
        { en: "Which file is shorter, since less code is easier to maintain.",
          ar: "أي الملفين أقصر، إذ الكود الأقل أسهل في الصيانة." },
        { en: "Which file uses more of the four OOP principles.",
          ar: "أي الملفين يستعمل أكثر من مبادئ البرمجة الكائنية الأربعة." },
        { en: "Which file models the repair shop more realistically.",
          ar: "أي الملفين يحاكي ورشة الصيانة أكثر واقعية." }
      ],
      answer: 0,
      explain: { en: "Identical output means the argument is about design alone. Line count is the measure the chapter explicitly rejects &mdash; three small classes are usually more lines than one chain. And the closing question for every class you write is <em>what change does this make cheap?</em>; if you cannot answer, write the function.",
                 ar: "تطابق المُخرَج يعني أن الخصومة عن التصميم وحده. وعددُ الأسطر هو المعيار الذي يرفضه الفصل صريحًا &mdash; فثلاثة أصناف صغيرة أسطرها أكثر من سلسلة واحدة عادةً. والسؤال الختامي لكل صنف تكتبه: <em>أي تغيير يجعله هذا رخيصًا؟</em>؛ فإن لم تستطع الجواب فاكتب الدالة." }
    }
  ]
};
