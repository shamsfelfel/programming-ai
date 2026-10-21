/* ============================================================
   Lesson 6 — Polymorphism & Duck Typing.
   Domains: the clinic's visit types, the three notification
   channels, the bus route container, the pharmacy shelf.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-06"] = {
  title: { en: "Test 6 — Polymorphism &amp; Duck Typing", ar: "اختبار 6 — تعدد الأشكال وتصنيف البطة" },
  intro: {
    en: "Twelve questions on Lesson 6. The test to apply throughout: when a new kind of thing arrives next month, how many existing lines have to be found and edited? An <code>if/elif</code> chain answers \"one per chain\"; polymorphism answers \"none\".",
    ar: "اثنا عشر سؤالًا على الدرس 6. والمعيار الذي تطبّقه في كل موضع: عندما يصل نوع جديد من الأشياء الشهر القادم، فكم سطرًا قائمًا يجب العثور عليه وتعديله؟ سلسلة <code>if/elif</code> تجيب «واحدًا لكل سلسلة»؛ وتعدد الأشكال يجيب «لا شيء»."
  },
  questions: [
    {
      id: "t6q1", type: "tf", level: "easy",
      topics: ["duck-typing"],
      q: { en: "For a function to call <code>channel.deliver(parent, text)</code> on an object, that object's class must inherit from a shared base class.",
           ar: "لكي تستدعي دالةٌ <code>channel.deliver(parent, text)</code> على كائن، يجب أن يرث صنف ذلك الكائن من صنف أساس مشترك." },
      truth: false,
      explain: { en: "Python checks nothing on the way in. If the object has a <code>deliver</code> method that accepts those arguments, the call works &mdash; that is duck typing: if it quacks, it is a duck. <code>WhatsAppChannel</code>, <code>SmsChannel</code> and <code>PrintedNote</code> in the lesson share no base class at all and are still interchangeable. A shared <code>ABC</code> is useful for catching an <em>incomplete</em> implementation early (<a href=\"#l4-h2\">Lesson 4</a>), not for permitting the call.",
                 ar: "بايثون لا تفحص شيئًا عند الدخول. فإن كان للكائن دالة <code>deliver</code> تقبل تلك الوسائط نجح الاستدعاء &mdash; وذلك تصنيف البطة: إن بطبط فهو بطة. فـ <code>WhatsAppChannel</code> و<code>SmsChannel</code> و<code>PrintedNote</code> في الدرس لا تتقاسم أي صنف أساس إطلاقًا وتبقى قابلة للتبادل. و<code>ABC</code> المشترك مفيد لضبط التنفيذ <em>الناقص</em> مبكرًا (<a href=\"#l4-h2\">الدرس 4</a>)، لا لإباحة الاستدعاء." }
    },
    {
      id: "t6q2", type: "output", level: "easy",
      topics: ["polymorphism", "override"],
      q: { en: "One loop, three visit types. Write the four lines this prints.",
           ar: "حلقة واحدة وثلاثة أنواع زيارات. اكتب الأسطر الأربعة التي يطبعها." },
      code: "class Visit:\n    base_fee = 60.0\n\n    def __init__(self, patient):\n        self.patient = patient\n\n    def fee(self):\n        return self.base_fee\n\n\nclass FollowUpVisit(Visit):\n    def fee(self):\n        return 0.0\n\n\nclass StudentVisit(Visit):\n    def fee(self):\n        return self.base_fee * 0.65\n\n\nday = [Visit(\"Rami\"), FollowUpVisit(\"Huda\"), StudentVisit(\"Lina\")]\ntotal = 0.0\nfor v in day:\n    print(v.patient, v.fee())\n    total = total + v.fee()\nprint(total)",
      blanks: [{ accept: ["Rami 60.0\nHuda 0.0\nLina 39.0\n99.0"], lines: 4 }],
      explain: { en: "The loop body is written once and never asks what kind of visit it has. <code>StudentVisit</code> is the interesting one: it overrides <code>fee</code> but still reads the inherited <code>base_fee</code>, so changing the clinic's fee in one place moves the student discount with it. Adding a fourth visit type means writing one class and editing nothing. Watch the dispatch in <a href=\"#lab\">trace 7</a>.",
                 ar: "جسد الحلقة مكتوب مرة واحدة ولا يسأل أبدًا أي نوع زيارة لديه. و<code>StudentVisit</code> هو المثير: فهو يعيد تعريف <code>fee</code> لكنه يظل يقرأ <code>base_fee</code> الموروثة، فتغيير أجر العيادة في موضع واحد يحرّك خصم الطالب معه. وإضافة نوع زيارة رابع تعني كتابة صنف واحد وتعديل لا شيء. شاهد التوزيع في <a href=\"#lab\">التتبّع 7</a>." }
    },
    {
      id: "t6q3", type: "fill", level: "easy",
      topics: ["dunder"],
      q: { en: "Name the dunder method each built-in call reaches for.",
           ar: "سمِّ الدالة الخاصة التي يبحث عنها كل استدعاء مدمج." },
      code: "r = Route(18, [\"Rimal\", \"Nasr\"])\n\nprint(r)          # calls ____1____\nlen(r)            # calls ____2____\n\"Nasr\" in r       # calls ____3____\nr1 == r2          # calls ____4____",
      blanks: [
        { accept: ["__str__"], label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["__len__"], label: { en: "blank 2", ar: "الفراغ 2" } },
        { accept: ["__contains__"], label: { en: "blank 3", ar: "الفراغ 3" } },
        { accept: ["__eq__"], label: { en: "blank 4", ar: "الفراغ 4" } }
      ],
      explain: { en: "These four are the polymorphism you were already using before you had the word: <code>print</code>, <code>len</code>, <code>in</code> and <code>==</code> all work on lists, strings and dicts because each of those types answers the same question in its own way. Defining the method on your class simply enrols it in the same arrangement.",
                 ar: "هذه الأربع هي تعدد الأشكال الذي كنت تستعمله قبل أن تملك الكلمة: فـ <code>print</code> و<code>len</code> و<code>in</code> و<code>==</code> تعمل كلها على القوائم والنصوص والقواميس لأن كل نوع منها يجيب السؤال نفسه بطريقته. وتعريف الدالة على صنفك يسجّله في الترتيب نفسه ببساطة." }
    },
    {
      id: "t6q4", type: "error", level: "medium",
      topics: ["ifelif", "polymorphism"],
      q: { en: "The ministry announced a student discount. <code>calculate_fee</code> was updated and the receipt still charges the full 60. Click the line that is now wrong.",
           ar: "أعلنت الوزارة خصمًا للطلبة. وحُدِّثت <code>calculate_fee</code> ولا يزال الإيصال يحاسب 60 كاملة. انقر السطر الذي صار خطأً." },
      code: "def calculate_fee(visit):\n    if visit[\"kind\"] == \"followup\":\n        return 0.0\n    elif visit[\"kind\"] == \"student\":\n        return 60.0 * 0.65\n    else:\n        return 60.0\n\n\ndef print_receipt(visit):\n    if visit[\"kind\"] == \"followup\":\n        print(f\"{visit['patient']}: no charge\")\n    else:\n        print(f\"{visit['patient']}: 60.00\")",
      answer: 14,
      explain: { en: "The discount was added to one chain and not the other. Line 14 is the <code>else</code> branch of a <em>second</em> chain that quietly treats a student as a full-fee visit and prints a hard-coded 60.00 &mdash; so the accounts say 39 and the desk collects 60. No exception, no warning: the two chains simply disagree. The structural fault is that the same question is answered in two places, which is why the fix in the lesson is to give each visit type a <code>fee()</code> and a <code>receipt_line()</code> of its own and delete both chains.",
                 ar: "أُضيف الخصم إلى سلسلة ولم يُضف إلى الأخرى. فالسطر 14 هو فرع <code>else</code> لسلسلة <em>ثانية</em> تعامل الطالب بصمت كزيارة بأجر كامل وتطبع 60.00 مثبّتة &mdash; فتقول الحسابات 39 ويتقاضى المكتب 60. ولا استثناء ولا تحذير: فالسلسلتان تتخالفان ببساطة. والعيب البنيوي أن السؤال نفسه مُجاب في موضعين، ولهذا كان الإصلاح في الدرس أن تمنح كل نوع زيارة <code>fee()</code> و<code>receipt_line()</code> خاصتين به وتحذف السلسلتين." }
    },
    {
      id: "t6q5", type: "compare", level: "medium",
      topics: ["ifelif", "open-closed", "polymorphism"],
      q: { en: "A fourth visit type, <code>HomeCallVisit</code>, is about to be added. What does each version cost?",
           ar: "سيُضاف نوع زيارة رابع هو <code>HomeCallVisit</code>. فكم تكلّف كل نسخة؟" },
      codeA: "def calculate_fee(visit):\n    if visit.kind == \"followup\":\n        return 0.0\n    elif visit.kind == \"student\":\n        return 39.0\n    else:\n        return 60.0\n\n\ndef queue_priority(visit):\n    if visit.kind == \"emergency\":\n        return 0\n    elif visit.kind == \"followup\":\n        return 2\n    else:\n        return 1\n\n\ndef receipt_line(visit):\n    if visit.kind == \"followup\":\n        return f\"{visit.patient}: no charge\"\n    else:\n        return f\"{visit.patient}: {calculate_fee(visit):.2f}\"",
      codeB: "class Visit:\n    base_fee = 60.0\n    priority = 1\n\n    def __init__(self, patient):\n        self.patient = patient\n\n    def fee(self):\n        return self.base_fee\n\n    def receipt_line(self):\n        return f\"{self.patient}: {self.fee():.2f}\"\n\n\nclass FollowUpVisit(Visit):\n    priority = 2\n\n    def fee(self):\n        return 0.0\n\n    def receipt_line(self):\n        return f\"{self.patient}: no charge\"",
      options: [
        { en: "A needs an edit inside three separate chains, each of which must be found first, and a missed one fails silently with a plausible wrong number. B needs one new class and no edit to any existing line.",
          ar: "تحتاج أ تعديلًا داخل ثلاث سلاسل منفصلة، على كل منها أن تُوجد أولًا، والمنسيّة تفشل بصمت برقم خاطئ معقول. وتحتاج ب صنفًا جديدًا واحدًا ولا تعديل لأي سطر قائم." },
        { en: "Both need about the same amount of work; B just spreads it over more lines.",
          ar: "تحتاج كلتاهما قدرًا متقاربًا من العمل؛ وب توزّعه على أسطر أكثر فقط." },
        { en: "A is safer, because every branch is visible in one place and a reviewer can read all the cases together.",
          ar: "أ أكثر أمانًا، لأن كل فرع مرئي في موضع واحد ويستطيع المراجع قراءة كل الحالات معًا." },
        { en: "B needs an edit to <code>Visit.fee</code> as well, so that the base knows about the new subclass.",
          ar: "تحتاج ب تعديلًا لـ <code>Visit.fee</code> أيضًا، ليعرف الأساس الوريث الجديد." }
      ],
      answer: 0,
      explain: { en: "Count the edits and the risk separately. A costs three edits, and the real danger is not the work but the <code>else</code> branches: a forgotten case does not crash, it falls through to \"ordinary visit\" and produces a believable wrong answer. B costs one addition, and the base never learns the subclass exists &mdash; which is what the fourth option gets backwards. Option 3 does name a genuine advantage of the chain, and <a href=\"#l6-s6\">the lesson concedes it</a>: all the cases <em>are</em> visible together. The trade is that you pay for that readability with every future edit.",
                 ar: "أحصِ التعديلات والمخاطرة منفصلتين. فتكلّف أ ثلاثة تعديلات، والخطر الحقيقي ليس العمل بل فروع <code>else</code>: فالحالة المنسيّة لا تنهار، بل تسقط إلى «زيارة عادية» وتُنتج جوابًا خاطئًا قابلًا للتصديق. وتكلّف ب إضافة واحدة، ولا يعلم الأساس أبدًا بوجود الوريث &mdash; وهذا ما يقلبه الخيار الرابع. والخيار 3 يسمّي ميزة حقيقية للسلسلة، و<a href=\"#l6-s6\">الدرس يقرّ بها</a>: فكل الحالات مرئية معًا فعلًا. والمقايضة أنك تدفع ثمن تلك القابلية للقراءة في كل تعديل قادم." }
    },
    {
      id: "t6q6", type: "trace", level: "medium",
      topics: ["dunder"],
      q: { en: "Three dunder methods are defined. What does each expression give?",
           ar: "ثلاث دوال خاصة معرَّفة. فماذا يعطي كل تعبير؟" },
      code: "class Route:\n    def __init__(self, number, stops=()):\n        self.number = number\n        self.stops = list(stops)\n\n    def __len__(self):\n        return len(self.stops)\n\n    def __contains__(self, place):\n        return place in self.stops\n\n    def __str__(self):\n        return f\"Route {self.number} ({len(self)} stops)\"\n\n\nr = Route(18, [\"Rimal\", \"Nasr\", \"Zeitoun\"])\nempty = Route(9)",
      blanks: [
        { accept: ["3"], label: { en: "<code>len(r)</code>", ar: "<code>len(r)</code>" } },
        { accept: ["True"], label: { en: "<code>\"Nasr\" in r</code>", ar: "<code>\"Nasr\" in r</code>" } },
        { accept: ["Route 18 (3 stops)"], wide: true, label: { en: "<code>str(r)</code>", ar: "<code>str(r)</code>" } },
        { accept: ["False"], label: { en: "<code>bool(empty)</code>", ar: "<code>bool(empty)</code>" } }
      ],
      explain: { en: "The last one is the surprise worth knowing. No <code>__bool__</code> is defined, so Python falls back on <code>__len__</code>: a length of 0 makes the object falsy, which means <code>if route:</code> silently means \"if the route has stops\". That is usually exactly what you want &mdash; and occasionally a bug, when an empty-but-real object is treated as missing. Note also that <code>__str__</code> calls <code>len(self)</code>, which goes through <code>__len__</code>.",
                 ar: "الأخيرة هي المفاجأة التي تستحق المعرفة. فلا <code>__bool__</code> معرَّفة، فترجع بايثون إلى <code>__len__</code>: فطولٌ صفرٌ يجعل الكائن كاذبًا، ومعناه أن <code>if route:</code> تعني بصمت «إن كان للمسار محطات». وهذا عادةً ما تريده بالضبط &mdash; وأحيانًا خللٌ، حين يُعامَل كائن فارغ لكنه حقيقي كأنه مفقود. ولاحظ أيضًا أن <code>__str__</code> تستدعي <code>len(self)</code>، فتمرّ عبر <code>__len__</code>." }
    },
    {
      id: "t6q7", type: "order", level: "medium",
      topics: ["polymorphism", "ifelif", "open-closed"],
      q: { en: "Put the steps of the lesson's conversion in order: from two <code>if/elif</code> chains to polymorphism.",
           ar: "رتّب خطوات التحويل في الدرس: من سلسلتَي <code>if/elif</code> إلى تعدد الأشكال." },
      items: [
        { en: "Notice the same set of cases is being distinguished in more than one function.", ar: "لاحظ أن مجموعة الحالات نفسها تُميَّز في أكثر من دالة." },
        { en: "Make a class per case, with the common part in a base class.", ar: "اصنع صنفًا لكل حالة، والمشترك في صنف أساس." },
        { en: "Move each branch's body into a method of the same name on the matching class.", ar: "انقل جسد كل فرع إلى دالة بالاسم نفسه على الصنف المطابق." },
        { en: "Replace each call like <code>calculate_fee(v)</code> with <code>v.fee()</code>.", ar: "استبدل كل استدعاء مثل <code>calculate_fee(v)</code> بـ <code>v.fee()</code>." },
        { en: "Delete the helper functions and their chains entirely.", ar: "احذف الدوال المساعدة وسلاسلها تمامًا." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 1 is the diagnosis and it is the one that decides whether the refactor is worth doing: a <em>single</em> chain in one place is often fine, and the lesson says so. It is the same set of cases reappearing in a second and third function that makes a class per case pay for itself. Step 5 is the test &mdash; if the chains cannot be deleted, something still depends on the type tag.",
                 ar: "الخطوة 1 هي التشخيص وهي التي تقرر هل تستحق إعادة الهيكلة: فسلسلة <em>واحدة</em> في موضع واحد مقبولة غالبًا، والدرس يقول ذلك. وإنما ظهور مجموعة الحالات نفسها في دالة ثانية وثالثة هو ما يجعل صنفًا لكل حالة يسدّد ثمنه. والخطوة 5 هي الاختبار &mdash; فإن لم تُحذف السلاسل فثمّة شيء لا يزال يتوقف على وسم النوع." }
    },
    {
      id: "t6q8", type: "match", level: "medium",
      topics: ["dunder", "polymorphism"],
      q: { en: "Match each dunder method to what defining it lets you write.",
           ar: "وصّل كل دالة خاصة بما يتيحه تعريفها أن تكتبه." },
      leftHead: { en: "Define this", ar: "عرّف هذه" },
      rightHead: { en: "And you can write", ar: "فتستطيع كتابة" },
      pairs: [
        { l: { code: "__str__" }, r: { code: "print(visit)  /  f\"{visit}\"" } },
        { l: { code: "__eq__" },  r: { code: "a == b  /  visit in list_of_visits" } },
        { l: { code: "__lt__" },  r: { code: "sorted(visits)" } },
        { l: { code: "__len__" }, r: { code: "len(queue)  /  if queue:" } }
      ],
      explain: { en: "Two of these reach further than they look. <code>__eq__</code> is what makes <code>in</code> work on a list of your objects, because <code>in</code> compares each element with <code>==</code>. And <code>__lt__</code> alone is enough for <code>sorted()</code> &mdash; sorting only ever needs to know which of two items comes first, so you do not have to define the other five comparisons.",
                 ar: "اثنتان من هذه تصلان أبعد مما تبدو. فـ <code>__eq__</code> هي ما يجعل <code>in</code> تعمل على قائمة من كائناتك، لأن <code>in</code> تقارن كل عنصر بـ <code>==</code>. و<code>__lt__</code> وحدها تكفي لـ <code>sorted()</code> &mdash; فالترتيب لا يحتاج إلا معرفة أيّ العنصرين يأتي أولًا، فلا يلزمك تعريف المقارنات الخمس الأخرى." }
    },
    {
      id: "t6q9", type: "complete", level: "hard",
      topics: ["dunder", "polymorphism"],
      q: { en: "<code>Visit</code> objects should sort by priority with <code>sorted()</code>, lowest priority number first. Which method does it?",
           ar: "ينبغي أن تُرتَّب كائنات <code>Visit</code> بالأولوية باستخدام <code>sorted()</code>، الأقل رقمًا أولًا. فأي دالة تفعل ذلك؟" },
      code: "class Visit:\n    def __init__(self, patient, priority):\n        self.patient = patient\n        self.priority = priority\n\n    # which method?\n\n\nqueue = [Visit(\"Rami\", 2), Visit(\"Huda\", 0), Visit(\"Lina\", 1)]\nfor v in sorted(queue):\n    print(v.patient)\n\n# must print: Huda, Lina, Rami",
      options: [
        { code: "def __lt__(self, other):\n    return self.priority < other.priority" },
        { code: "def __sort__(self):\n    return self.priority" },
        { code: "def __eq__(self, other):\n    return self.priority == other.priority" },
        { code: "def __lt__(self):\n    return self.priority" }
      ],
      explain: { en: "<code>sorted()</code> repeatedly asks \"does this one come before that one?\", and that question is <code>__lt__(self, other)</code> &mdash; two objects, one boolean. The other three fail in different ways: there is no <code>__sort__</code> protocol in Python, so option 2 is an ordinary method nobody calls and <code>sorted()</code> raises <code>TypeError: '&lt;' not supported between instances of 'Visit' and 'Visit'</code>. <code>__eq__</code> answers a different question and does not help ordering. And option 4 has the right name with the wrong signature &mdash; it takes no <code>other</code>, so it cannot compare anything.",
                 ar: "تسأل <code>sorted()</code> مرارًا «أيأتي هذا قبل ذاك؟»، وذلك السؤال هو <code>__lt__(self, other)</code> &mdash; كائنان وقيمة منطقية واحدة. والثلاثة الأخرى تفشل بطرق مختلفة: فلا يوجد بروتوكول <code>__sort__</code> في بايثون، فالخيار 2 دالة عادية لا يستدعيها أحد وترفع <code>sorted()</code> خطأ <code>TypeError: '&lt;' not supported between instances of 'Visit' and 'Visit'</code>. و<code>__eq__</code> تجيب سؤالًا آخر ولا تعين على الترتيب. والخيار 4 بالاسم الصحيح والتوقيع الخاطئ &mdash; فلا يأخذ <code>other</code>، فلا يستطيع مقارنة شيء." },
      answer: 0,
      solution: { out: "Huda\nLina\nRami" }
    },
    {
      id: "t6q10", type: "output", level: "hard",
      topics: ["dunder"],
      q: { en: "<code>__eq__</code> is defined and <code>__hash__</code> is not. Write the three lines this prints.",
           ar: "<code>__eq__</code> معرَّفة و<code>__hash__</code> ليست كذلك. اكتب الأسطر الثلاثة التي يطبعها." },
      code: "class Visit:\n    def __init__(self, patient, kind):\n        self.patient = patient\n        self.kind = kind\n\n    def __eq__(self, other):\n        return self.patient == other.patient and self.kind == other.kind\n\n\na = Visit(\"Lina\", \"physio\")\nb = Visit(\"Lina\", \"physio\")\nprint(a == b)\nprint(a is b)\ntry:\n    print({a, b})\nexcept TypeError:\n    print(\"unhashable\")",
      blanks: [{ accept: ["True\nFalse\nunhashable"], lines: 3 }],
      explain: { en: "<code>==</code> is now about the patient and the kind, so two separate objects compare equal &mdash; while <code>is</code> still asks \"the same object in memory?\" and correctly says no. The third line is the trap: defining <code>__eq__</code> sets <code>__hash__</code> to <code>None</code>, so the class becomes unhashable and cannot go in a set or be used as a dict key. Python does this on purpose, because two objects that are equal must hash equally, and it cannot guess your rule. The fix is to add <code>def __hash__(self): return hash((self.patient, self.kind))</code> using the same fields.",
                 ar: "صارت <code>==</code> عن المريض والنوع، فيتساوى كائنان منفصلان &mdash; بينما تظل <code>is</code> تسأل «الكائن نفسه في الذاكرة؟» وتجيب بلا، وهو الصحيح. والسطر الثالث هو الفخ: فتعريف <code>__eq__</code> يضبط <code>__hash__</code> على <code>None</code>، فيصبح الصنف غير قابل للتقطيع ولا يدخل مجموعة ولا يُستخدم مفتاح قاموس. وتفعل بايثون ذلك بقصد، لأن كائنين متساويين يجب أن يتقطّعا متساويين، ولا تستطيع تخمين قاعدتك. والإصلاح أن تضيف <code>def __hash__(self): return hash((self.patient, self.kind))</code> بالحقول نفسها." }
    },
    {
      id: "t6q11", type: "mcq", level: "hard",
      topics: ["duck-typing", "polymorphism", "open-closed"],
      q: { en: "A <code>LabTest</code> class has nothing to do with visits and no shared base, but it does define <code>receipt_line()</code>. It is put in the same day list and <code>print_day</code> works. Is that good design?",
           ar: "صنف <code>LabTest</code> لا علاقة له بالزيارات ولا أساس مشترك، لكنه يعرّف <code>receipt_line()</code>. ويُوضع في قائمة اليوم نفسها وتعمل <code>print_day</code>. فهل هذا تصميم جيد؟" },
      options: [
        { en: "Yes, if <code>receipt_line()</code> genuinely means the same thing for both. The list's real requirement is \"things that can print themselves on a receipt\", and a shared base class was never what made that work.",
          ar: "نعم، إن كانت <code>receipt_line()</code> تعني الشيء نفسه فعلًا لكليهما. فالمطلوب الحقيقي للقائمة هو «أشياء تستطيع طباعة نفسها على إيصال»، والصنف الأساس المشترك لم يكن أبدًا ما يجعل ذلك ناجحًا." },
        { en: "No. Objects without a common base class must never be mixed in one list, even if they share a method name.",
          ar: "لا. فالكائنات بلا صنف أساس مشترك لا يجوز خلطها في قائمة واحدة أبدًا، ولو تقاسمت اسم دالة." },
        { en: "No, because <code>print_day</code> cannot know the length of the list when the types differ.",
          ar: "لا، لأن <code>print_day</code> لا تستطيع معرفة طول القائمة عند اختلاف الأنواع." },
        { en: "Yes, and it would be equally fine even if <code>LabTest.receipt_line()</code> returned a dictionary instead of a string.",
          ar: "نعم، وسيكون مقبولًا بالقدر نفسه حتى لو أعادت <code>LabTest.receipt_line()</code> قاموسًا بدل نص." }
      ],
      answer: 0,
      explain: { en: "This is duck typing used well, and the condition in the first option is the whole of it: the methods must mean the same thing and return the same kind of value. Option 4 is the useful contrast &mdash; same name, different return type, and <code>print_day</code> breaks or prints nonsense. That is the real risk of duck typing: nothing checks that the duck quacks in the right key, which is exactly why <a href=\"#l4-h2\">an <code>ABC</code></a> is worth adding once several implementations exist and you want a missing or mistyped method caught early.",
                 ar: "هذا تصنيف بطة مستعملٌ جيدًا، والشرط في الخيار الأول هو كلّه: فعلى الدوال أن تعني الشيء نفسه وتُعيد النوع نفسه من القيم. والخيار 4 هو التباين المفيد &mdash; الاسم نفسه ونوع إعادة مختلف، فتنكسر <code>print_day</code> أو تطبع هراءً. وذلك هو الخطر الحقيقي في تصنيف البطة: فلا شيء يفحص أن البطة تبطبط بالنغمة الصحيحة، ولهذا بالضبط يستحق <a href=\"#l4-h2\">إضافة <code>ABC</code></a> حين توجد عدة تنفيذات وتريد ضبط الدالة المفقودة أو الخاطئة النوع مبكرًا." }
    },
    {
      id: "t6q12", type: "multi", level: "hard",
      topics: ["open-closed", "ifelif", "polymorphism", "when-not-oop"],
      q: { en: "Select <strong>every</strong> statement that is a fair account of what polymorphism costs and buys.",
           ar: "اختر <strong>كل</strong> عبارة تمثّل حسابًا منصفًا لما يكلّفه تعدد الأشكال وما يشتريه." },
      options: [
        { en: "It makes adding a new <em>type</em> cheap &mdash; one new class, no existing line edited.",
          ar: "يجعل إضافة <em>نوع</em> جديد رخيصة &mdash; صنف جديد واحد ولا تعديل لأي سطر قائم." },
        { en: "It makes adding a new <em>operation</em> across all types expensive: a new method must be added to every class.",
          ar: "يجعل إضافة <em>عملية</em> جديدة على كل الأنواع مكلفة: فيجب إضافة دالة جديدة إلى كل صنف." },
        { en: "It scatters the cases, so you can no longer read all the fee rules side by side in one screen.",
          ar: "يبعثر الحالات، فلم تبقَ تستطيع قراءة كل قواعد الأجر جنبًا إلى جنب في شاشة واحدة." },
        { en: "A single <code>if/elif</code> chain in one place, over cases that will not grow, is often the better choice.",
          ar: "سلسلة <code>if/elif</code> واحدة في موضع واحد، على حالات لن تنمو، كثيرًا ما تكون الخيار الأفضل." },
        { en: "Because it removes type checks, it always produces less code than the equivalent chain.",
          ar: "ولأنه يحذف فحوص النوع، فهو يُنتج دائمًا كودًا أقل من السلسلة المكافئة." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first four are the honest ledger, and the second and third are the ones beginners are rarely told. Classes are <strong>open to new types and closed to new operations</strong>; functions over dicts are the mirror image, cheap to extend with a new operation and expensive with a new type. So the right structure depends on which axis your program actually grows along. The fifth is false: three small classes are usually <em>more</em> lines than one chain &mdash; the saving is in the next change, not the line count, which is the measure <a href=\"#l7-h4\">Lesson 7</a> builds its comparison table on.",
                 ar: "الأربعة الأولى هي الدفتر الصادق، والثانية والثالثة هما ما يَقلّ أن يُقال للمبتدئ. فالأصناف <strong>مفتوحة للأنواع الجديدة مغلقة للعمليات الجديدة</strong>؛ والدوال على القواميس صورتها في المرآة، رخيصة التوسيع بعملية جديدة مكلفة بنوع جديد. فالبنية الصحيحة تتوقف على أي محور ينمو برنامجك عليه فعلًا. والخامسة خاطئة: فثلاثة أصناف صغيرة أسطرها <em>أكثر</em> من سلسلة واحدة عادةً &mdash; والوفر في التغيير القادم لا في عدد الأسطر، وهو المعيار الذي يبني عليه <a href=\"#l7-h4\">الدرس 7</a> جدول مقارنته." }
    }
  ]
};
