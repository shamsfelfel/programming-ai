/* ============================================================
   Chapter Test B — Advanced.
   Thirty questions that cross lesson boundaries. Most cannot be
   answered from one lesson alone: a property defeated by
   inheritance, an abstract base half-implemented, a dunder that
   changes what a built-in does to your object.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["chapter-test-b"] = {
  title: { en: "Chapter Test B — Advanced", ar: "اختبار الفصل ب — المتقدم" },
  intro: {
    en: "Thirty harder questions. Several combine two or three lessons in one program, and a few have answers that are uncomfortable &mdash; code that is wrong without raising anything. When you disagree with an answer, reproduce the program in the <a href=\"#lab\">Execution Lab</a> or in Python before deciding the test is wrong.",
    ar: "ثلاثون سؤالًا أصعب. ويدمج عدد منها درسين أو ثلاثة في برنامج واحد، ولبعضها أجوبة غير مريحة &mdash; كودٌ خطأ لا يرفع شيئًا. وحين تخالف جوابًا فأعد إنتاج البرنامج في <a href=\"#lab\">مختبر التنفيذ</a> أو في بايثون قبل أن تحكم بخطأ الاختبار."
  },
  questions: [
    {
      id: "bq01", type: "output", level: "hard", topics: ["setter", "super", "underscore"],
      q: { en: "The setter rejects anything over 100. Write what this prints.",
           ar: "يرفض الضابط ما يتجاوز 100. اكتب ما يطبعه هذا." },
      code: "class Student:\n    def __init__(self, name, mark=0):\n        self.name = name\n        self.mark = mark\n\n    @property\n    def mark(self):\n        return self._mark\n\n    @mark.setter\n    def mark(self, value):\n        if not 0 <= value <= 100:\n            raise ValueError(\"out of range\")\n        self._mark = value\n\n\nclass BonusStudent(Student):\n    def __init__(self, name, mark=0, bonus=0):\n        super().__init__(name, mark)\n        self._mark = self._mark + bonus\n\n\ns = BonusStudent(\"Lina\", 95, bonus=20)\nprint(s.mark)",
      blanks: [{ accept: ["115"], ph: "115" }],
      explain: { en: "115, an impossible mark, with no error anywhere. <code>super().__init__</code> correctly validated 95 through the setter, and then the subclass wrote <code>self._mark</code> directly and walked straight past the rule. This is the most important limitation in the chapter: a property guards the <em>public name</em>, and a subclass that knows the private name can defeat it. The subclass should have written <code>self.mark = self._mark + bonus</code> and let the check run &mdash; which would have raised, correctly, because 115 is not a mark.",
                 ar: "115، علامة مستحيلة، بلا أي خطأ في أي موضع. فقد تحقّقت <code>super().__init__</code> من 95 عبر الضابط بحقّ، ثم كتب الوريث <code>self._mark</code> مباشرة ومرّ من أمام القاعدة. وهذا أهم قيد في الفصل: فالخاصية تحمي <em>الاسم العام</em>، والوريثُ الذي يعرف الاسم الخاص يستطيع هزمها. وكان على الوريث أن يكتب <code>self.mark = self._mark + bonus</code> ويدع الفحص يُنفَّذ &mdash; وكان سيرفع خطأً بحقّ، لأن 115 ليست علامة." }
    },
    {
      id: "bq02", type: "output", level: "hard", topics: ["property", "super", "override"],
      q: { en: "A property is overridden and calls up to the one it replaced. Write what this prints.",
           ar: "تُعاد تعريف خاصية وتستدعي التي حلّت محلّها. اكتب ما يطبعه هذا." },
      code: "class Job:\n    rate = 10.0\n\n    def __init__(self, hours):\n        self.hours = hours\n\n    @property\n    def cost(self):\n        return self.hours * self.rate\n\n\nclass Discounted(Job):\n    @property\n    def cost(self):\n        return super().cost * 0.5\n\n\nprint(Job(4).cost, Discounted(4).cost)",
      blanks: [{ accept: ["40.0 20.0"], ph: "40.0 20.0" }],
      explain: { en: "Properties override exactly like methods, and <code>super().cost</code> reads the base property &mdash; note there are no brackets, because <code>cost</code> is still a property on the way up. This is the clean way to extend a computed value: the discount knows only \"half of whatever the base says\", so a change to <code>rate</code> or to the base formula flows through it automatically.",
                 ar: "الخصائص تُعاد تعريفها تمامًا كالدوال، و<code>super().cost</code> تقرأ خاصية الأساس &mdash; ولاحظ أنه لا قوسين، لأن <code>cost</code> لا تزال خاصية في الصعود. وهذه الطريقة النظيفة لتوسيع قيمة محسوبة: فالخصم لا يعرف إلا «نصف ما يقوله الأساس»، فيسري إليه تغييرُ <code>rate</code> أو صيغة الأساس تلقائيًا." }
    },
    {
      id: "bq03", type: "output", level: "hard", topics: ["class-attr", "attr-lookup", "mutable-default"],
      q: { en: "<code>entries</code> is a mutable class attribute. Write the two lines this prints.",
           ar: "<code>entries</code> خاصية صنف قابلة للتغيير. اكتب السطرين الذين يطبعهما." },
      code: "class Log:\n    entries = []\n\n    def add(self, x):\n        self.entries.append(x)\n\n\na = Log()\nb = Log()\na.add(\"x\")\nprint(a.entries, b.entries)\na.entries = [\"own\"]\nprint(a.entries, b.entries)",
      blanks: [{ accept: ["['x'] ['x']\n['own'] ['x']"], lines: 2 }],
      explain: { en: "The two halves of this are the trickiest pair in the chapter. <code>append</code> <strong>mutates</strong> the one list on the class, so it leaks into every instance. Then <code>a.entries = [\"own\"]</code> <strong>assigns</strong>, which creates a new attribute on <code>a</code> that shadows the class one and leaves <code>b</code> on the original. Mutating goes through; assigning shadows. The fix for a per-object log is <code>self.entries = []</code> in <code>__init__</code>.",
                 ar: "نصفا هذا أصعب زوج في الفصل. فـ <code>append</code> <strong>تغيّر</strong> القائمة الواحدة على الصنف، فتتسرّب إلى كل كائن. ثم <code>a.entries = [\"own\"]</code> <strong>تُسند</strong>، فتنشئ خاصية جديدة على <code>a</code> تحجب خاصية الصنف وتترك <code>b</code> على الأصل. فالتغيير ينفذ، والإسناد يحجب. والإصلاح لسجلّ لكل كائن هو <code>self.entries = []</code> في <code>__init__</code>." }
    },
    {
      id: "bq04", type: "output", level: "hard", topics: ["mutable-default", "super", "inheritance"],
      q: { en: "The mutable default is in the <em>base</em> class and the subclass just calls up. Write what this prints.",
           ar: "الافتراضية القابلة للتغيير في الصنف <em>الأساس</em> والوريث يستدعي للأعلى فقط. اكتب ما يطبعه هذا." },
      code: "class Base:\n    def __init__(self, tags=[]):\n        self.tags = tags\n\n\nclass Sub(Base):\n    def __init__(self):\n        super().__init__()\n\n\nx = Sub()\ny = Sub()\nx.tags.append(\"a\")\nprint(x.tags, y.tags, x.tags is y.tags)",
      blanks: [{ accept: ["['a'] ['a'] True"], ph: "['a'] ['a'] True" }],
      explain: { en: "Inheritance does not isolate you from the bug &mdash; it hides it one file further away. <code>Sub.__init__</code> looks blameless, and the shared list belongs to <code>Base.__init__</code>'s <code>def</code> line, evaluated once when <code>Base</code> was defined. Every <code>Sub</code> that does not pass tags shares it. This is the kind of defect that survives code review because each file reads correctly on its own.",
                 ar: "الوراثة لا تعزلك عن الخلل &mdash; بل تخفيه ملفًا أبعد. فـ <code>Sub.__init__</code> تبدو بريئة، والقائمة المشتركة تنتمي إلى سطر <code>def</code> في <code>Base.__init__</code>، وقد قُيِّمت مرة واحدة عند تعريف <code>Base</code>. وكل <code>Sub</code> لا يمرر وسومًا يتشاركها. وهذه فصيلة العيوب التي تنجو من مراجعة الكود لأن كل ملف يُقرأ صحيحًا بمفرده." }
    },
    {
      id: "bq05", type: "output", level: "hard", topics: ["dunder"],
      q: { en: "<code>__eq__</code> is defined and <code>__hash__</code> is not. Write the three lines this prints.",
           ar: "<code>__eq__</code> معرَّفة و<code>__hash__</code> ليست كذلك. اكتب الأسطر الثلاثة التي يطبعها." },
      code: "class Visit:\n    def __init__(self, patient, kind):\n        self.patient = patient\n        self.kind = kind\n\n    def __eq__(self, other):\n        return self.patient == other.patient and self.kind == other.kind\n\n\na = Visit(\"Lina\", \"physio\")\nb = Visit(\"Lina\", \"physio\")\nprint(a == b)\nprint(a is b)\ntry:\n    print({a, b})\nexcept TypeError:\n    print(\"unhashable\")",
      blanks: [{ accept: ["True\nFalse\nunhashable"], lines: 3 }],
      explain: { en: "Defining <code>__eq__</code> sets <code>__hash__</code> to <code>None</code>, so the class can no longer go in a set or be a dict key. Python does this deliberately: equal objects must hash equally, and it cannot guess which fields you compared. Add <code>def __hash__(self): return hash((self.patient, self.kind))</code> using the same fields.",
                 ar: "تعريف <code>__eq__</code> يضبط <code>__hash__</code> على <code>None</code>، فلا يبقى الصنف يدخل مجموعة ولا يكون مفتاح قاموس. وتفعل بايثون ذلك متعمدة: فالكائنات المتساوية يجب أن تتقطّع متساوية، ولا تستطيع تخمين أي الحقول قارنت. أضف <code>def __hash__(self): return hash((self.patient, self.kind))</code> بالحقول نفسها." }
    },
    {
      id: "bq06", type: "output", level: "hard", topics: ["inheritance", "super", "attr-lookup"],
      q: { en: "Two unrelated base classes. Write the two lines this prints.",
           ar: "صنفان أساسان لا علاقة بينهما. اكتب السطرين الذين يطبعهما." },
      code: "class Trackable:\n    def __init__(self):\n        self.pings = []\n\n    def ping(self, where):\n        self.pings.append(where)\n\n\nclass Courier:\n    def __init__(self, name):\n        self.name = name\n\n\nclass BikeCourier(Trackable, Courier):\n    def __init__(self, name):\n        super().__init__()\n        self.name = name\n\n\nb = BikeCourier(\"Lina\")\nb.ping(\"Rimal\")\nprint(b.name, b.pings)\nprint([c.__name__ for c in BikeCourier.__mro__])",
      blanks: [{ accept: ["Lina ['Rimal']\n['BikeCourier', 'Trackable', 'Courier', 'object']"], lines: 2 }],
      explain: { en: "<code>super().__init__()</code> runs only the <em>next</em> <code>__init__</code> in the method resolution order, which is <code>Trackable</code>'s &mdash; <code>Courier.__init__</code> never runs at all, which is why this subclass has to set <code>self.name</code> by hand. The MRO is left to right, then up. Mixing in a small behaviour-only class like <code>Trackable</code> is the one case where multiple inheritance is usually defensible; mixing two classes that both have real state is how you get a constructor nobody can follow.",
                 ar: "<code>super().__init__()</code> تنفّذ <code>__init__</code> <em>التالية</em> فقط في ترتيب حلّ الدوال، وهي الخاصة بـ <code>Trackable</code> &mdash; فلا تُنفَّذ <code>Courier.__init__</code> إطلاقًا، ولهذا على هذا الوريث أن يضبط <code>self.name</code> يدويًا. وترتيب الحلّ من اليسار إلى اليمين ثم صعودًا. ومزجُ صنف صغير للسلوك وحده مثل <code>Trackable</code> هو الحالة الوحيدة التي تكون الوراثة المتعددة فيها مدافَعًا عنها عادةً؛ أما مزجُ صنفين لكليهما حالة حقيقية فهو كيف تحصل على مُنشئ لا يستطيع أحد تتبّعه." }
    },
    {
      id: "bq07", type: "trace", level: "hard", topics: ["abc", "property"],
      q: { en: "An abstract <em>property</em>. What does each give?",
           ar: "خاصية <em>مجرّدة</em>. فماذا يعطي كلٌّ منها؟" },
      code: "from abc import ABC, abstractmethod\n\n\nclass Shape(ABC):\n    @property\n    @abstractmethod\n    def area(self):\n        ...\n\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\n    @property\n    def area(self):\n        return self.side * self.side\n\n\nclass NoArea(Shape):\n    pass",
      blanks: [
        { accept: ["9"], label: { en: "<code>Square(3).area</code>", ar: "<code>Square(3).area</code>" } },
        { accept: ["TypeError"], label: { en: "<code>NoArea()</code> raises", ar: "<code>NoArea()</code> ترفع" } }
      ],
      explain: { en: "The decorator order matters: <code>@property</code> on the outside, <code>@abstractmethod</code> underneath. This lets an abstract base promise a <em>value</em> rather than a method call, so subclasses are free to store it or compute it as they like &mdash; and <code>NoArea()</code> still fails at creation with <code>TypeError</code>. It is the clean way to say \"every shape has an area\" without dictating how.",
                 ar: "ترتيب المزخرِفَين مهم: <code>@property</code> في الخارج و<code>@abstractmethod</code> تحتها. وهذا يتيح لأساس مجرّد أن يوعد بـ<em>قيمة</em> لا باستدعاء دالة، فتكون الوريثات حرة في تخزينها أو حسابها كما تشاء &mdash; وتظل <code>NoArea()</code> تفشل عند الإنشاء بـ <code>TypeError</code>. وهي الطريقة النظيفة لقول «كل شكل له مساحة» دون فرض الكيفية." }
    },
    {
      id: "bq08", type: "error", level: "hard", topics: ["fragile-base", "override"],
      q: { en: "The base learns to weight each trip. The night shift silently under-reports for ever. Click the line that causes it.",
           ar: "يتعلّم الأساس وزنَ كل رحلة. وتُبلّغ وردية الليل أقل من الحقيقة بصمت إلى الأبد. انقر السطر الذي يسبّب ذلك." },
      code: "class ShiftLog:\n    def __init__(self, name):\n        self.name = name\n        self.trips = []\n\n    def add_trip(self, km, weight=1.0):\n        self.trips.append(km * weight)\n\n    def total_km(self):\n        return sum(self.trips)\n\n\nclass NightShiftLog(ShiftLog):\n    def add_trip(self, km):\n        self.trips.append(km)\n\n\nnight = NightShiftLog(\"Lina\")\nnight.add_trip(10)\nprint(night.total_km())",
      answer: 14,
      explain: { en: "Line 14 reaches into <code>self.trips</code> and appends the raw distance, so the base's new weighting rule never reaches this subclass. Nothing errors and both numbers are internally consistent &mdash; the two logs now simply mean different things. Had the override written <code>super().add_trip(km)</code>, it would have inherited the new rule for free. The general lesson: a subclass that duplicates <em>how</em> the base stores its data will drift away from it the first time the base changes.",
                 ar: "السطر 14 يصل إلى <code>self.trips</code> ويضيف المسافة الخام، فلا تبلغ قاعدةُ الوزن الجديدة في الأساس هذا الوريث أبدًا. ولا شيء يُخطئ والرقمان متناسقان داخليًا &mdash; وإنما صار السجلّان يعنيان شيئين مختلفين. ولو كتبت إعادة التعريف <code>super().add_trip(km)</code> لورثت القاعدة الجديدة مجانًا. والدرس العام: الوريثُ الذي يكرّر <em>كيف</em> يخزّن الأساس بياناته سينحرف عنه أول ما يتغير الأساس." }
    },
    {
      id: "bq09", type: "error", level: "hard", topics: ["one-door", "underscore", "capstone"],
      q: { en: "<code>advance</code> correctly refuses the jump, and the ticket still ends up collected. Click the line that defeats the guard.",
           ar: "ترفض <code>advance</code> القفزة بحقّ، وتنتهي التذكرة مستلَمة مع ذلك. انقر السطر الذي يهزم الحماية." },
      code: "t = Ticket(\"T-1\", \"Huda\", ScreenJob(180.0), \"urgent\", \"Samir\")\nt.advance(\"in progress\")\n\ntry:\n    t.advance(\"collected\")\nexcept ValueError as err:\n    print(f\"rejected: {err}\")\n\nt._status = \"collected\"\n\nprint(t.status)",
      answer: 9,
      explain: { en: "Python allows it: the underscore is a convention, not a lock, so a determined caller can always write the private name. That is the honest limit of encapsulation here, and it is not a reason to skip the property &mdash; the guard stops <em>mistakes</em>, not determination. Nobody writes line 9 by accident, whereas <code>ticket[\"status\"] = \"collected\"</code> in a dictionary-based version is exactly the line a tired person writes on purpose, believing it is harmless.",
                 ar: "بايثون تتيح ذلك: فالشرطة السفلية اتفاقٌ لا قُفل، فيستطيع مستدعٍ عازم أن يكتب الاسم الخاص دائمًا. وذلك هو الحدّ الصادق للتغليف هنا، وليس سببًا لتخطّي الخاصية &mdash; فالحماية تمنع <em>الأخطاء</em> لا العزم. فلا أحد يكتب السطر 9 عن غير قصد، بينما <code>ticket[\"status\"] = \"collected\"</code> في نسخة قائمة على القواميس هي بالضبط السطر الذي يكتبه متعبٌ متعمدًا وهو يحسبه بلا ضرر." }
    },
    {
      id: "bq10", type: "compare", level: "hard", topics: ["computed", "property", "invariant"],
      q: { en: "Both report a percentage. Which statement is true after <code>t.fill(300)</code> is called a second time?",
           ar: "كلتاهما تُبلّغ نسبة مئوية. أي عبارة صحيحة بعد استدعاء <code>t.fill(300)</code> مرة ثانية؟" },
      codeA: "class Tank:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.litres = 0\n        self.percent = 0.0\n\n    def fill(self, litres):\n        self.litres = self.litres + litres\n        self.percent = self.litres / self.capacity * 100\n\n    def drain(self, litres):\n        self.litres = self.litres - litres",
      codeB: "class Tank:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.litres = 0\n\n    @property\n    def percent(self):\n        return self.litres / self.capacity * 100\n\n    def fill(self, litres):\n        self.litres = self.litres + litres\n\n    def drain(self, litres):\n        self.litres = self.litres - litres",
      options: [
        { en: "Both are correct after <code>fill</code>, but A is already broken by <code>drain</code>, which changes <code>litres</code> and forgets to update <code>percent</code>. B cannot have that bug, because <code>percent</code> is derived on every read.",
          ar: "كلتاهما صحيحة بعد <code>fill</code>، لكن أ مكسورة أصلًا بـ <code>drain</code> التي تغيّر <code>litres</code> وتنسى تحديث <code>percent</code>. وب لا يمكن أن تملك ذلك الخلل، لأن <code>percent</code> تُشتق في كل قراءة." },
        { en: "Both are equally correct; B only avoids one line of code.",
          ar: "كلتاهما صحيحة بالقدر نفسه؛ وب تتجنب سطرًا واحدًا من الكود فقط." },
        { en: "A is better, because computing on every read is slower.",
          ar: "أ أفضل، لأن الحساب في كل قراءة أبطأ." },
        { en: "B is broken, because a property cannot be read before <code>fill</code> is ever called.",
          ar: "ب مكسورة، لأن الخاصية لا يمكن قراءتها قبل استدعاء <code>fill</code> أبدًا." }
      ],
      answer: 0,
      explain: { en: "Every stored derived value is a promise to update it everywhere, and the promise is broken by the first method someone adds later &mdash; here <code>drain</code>, which is not even wrong-looking. The structural point: two sources of truth for one fact is a bug waiting for a schedule. Option 3 names a real cost that almost never matters at this scale, and option 4 is false &mdash; <code>litres</code> is 0 from <code>__init__</code>, so <code>percent</code> is 0.0 immediately.",
                 ar: "كل قيمة مشتقّة مخزَّنة وعدٌ بتحديثها في كل موضع، ويُكسر الوعد بأول دالة يضيفها أحد لاحقًا &mdash; وهي هنا <code>drain</code> التي لا تبدو خاطئة حتى. والمقصد البنيوي: مصدران للحقيقة عن أمر واحد خللٌ ينتظر موعدًا. والخيار 3 يسمّي كلفة حقيقية لا تكاد تهمّ في هذا المقياس، والخيار 4 خاطئ &mdash; فـ <code>litres</code> تساوي 0 من <code>__init__</code>، إذن <code>percent</code> تساوي 0.0 فورًا." }
    },
    {
      id: "bq11", type: "complete", level: "hard", topics: ["dunder", "polymorphism"],
      q: { en: "<code>sorted(queue)</code> must order visits by priority, lowest first. Which method?",
           ar: "على <code>sorted(queue)</code> أن ترتّب الزيارات بالأولوية، الأقل أولًا. فأي دالة؟" },
      code: "class Visit:\n    def __init__(self, patient, priority):\n        self.patient = patient\n        self.priority = priority\n\n    # which method?\n\n\nqueue = [Visit(\"Rami\", 2), Visit(\"Huda\", 0), Visit(\"Lina\", 1)]\nprint([v.patient for v in sorted(queue)])\n# must be ['Huda', 'Lina', 'Rami']",
      options: [
        { code: "def __lt__(self, other):\n    return self.priority < other.priority" },
        { code: "def __sort__(self):\n    return self.priority" },
        { code: "def __lt__(self):\n    return self.priority" },
        { code: "def __eq__(self, other):\n    return self.priority == other.priority" }
      ],
      answer: 0,
      explain: { en: "<code>sorted()</code> only ever asks \"does this come before that?\", which is <code>__lt__(self, other)</code> &mdash; two objects, one boolean, and it is enough on its own. There is no <code>__sort__</code> protocol, so option 2 leaves <code>sorted()</code> raising <code>TypeError: '&lt;' not supported between instances of 'Visit' and 'Visit'</code>. Option 3 has the right name and no <code>other</code> to compare against. <code>__eq__</code> answers a different question entirely.",
                 ar: "لا تسأل <code>sorted()</code> إلا «أيأتي هذا قبل ذاك؟»، وهو <code>__lt__(self, other)</code> &mdash; كائنان وقيمة منطقية واحدة، وتكفي بمفردها. ولا يوجد بروتوكول <code>__sort__</code>، فالخيار 2 يترك <code>sorted()</code> ترفع <code>TypeError: '&lt;' not supported between instances of 'Visit' and 'Visit'</code>. والخيار 3 بالاسم الصحيح وبلا <code>other</code> يُقارن به. و<code>__eq__</code> تجيب سؤالًا آخر تمامًا." },
      solution: { out: "['Huda', 'Lina', 'Rami']" }
    },
    {
      id: "bq12", type: "trace", level: "hard", topics: ["dunder"],
      q: { en: "No <code>__bool__</code> is defined. What does each give?",
           ar: "لا <code>__bool__</code> معرَّفة. فماذا يعطي كلٌّ منها؟" },
      code: "class Route:\n    def __init__(self, number, stops=()):\n        self.number = number\n        self.stops = list(stops)\n\n    def __len__(self):\n        return len(self.stops)\n\n    def __contains__(self, place):\n        return place in self.stops\n\n\nr = Route(18, [\"Rimal\", \"Nasr\", \"Zeitoun\"])\nempty = Route(9)",
      blanks: [
        { accept: ["3"], label: { en: "<code>len(r)</code>", ar: "<code>len(r)</code>" } },
        { accept: ["True"], label: { en: "<code>\"Nasr\" in r</code>", ar: "<code>\"Nasr\" in r</code>" } },
        { accept: ["False"], label: { en: "<code>bool(empty)</code>", ar: "<code>bool(empty)</code>" } }
      ],
      explain: { en: "With no <code>__bool__</code>, Python falls back on <code>__len__</code>, so a route with no stops is falsy and <code>if route:</code> silently means \"if the route has stops\". That is usually what you want, and occasionally a real bug &mdash; an empty-but-real object being treated as missing. If the two must differ, define <code>__bool__</code> explicitly.",
                 ar: "بلا <code>__bool__</code> ترجع بايثون إلى <code>__len__</code>، فالمسار بلا محطات كاذب و<code>if route:</code> تعني بصمت «إن كان للمسار محطات». وهذا ما تريده عادةً، وأحيانًا خللٌ حقيقي &mdash; كائنٌ فارغ لكنه حقيقي يُعامَل كأنه مفقود. فإن وجب اختلافهما فعرّف <code>__bool__</code> صريحًا." }
    },
    {
      id: "bq13", type: "mcq", level: "hard", topics: ["duck-typing", "abc", "interface"],
      q: { en: "A <code>LabTest</code> with no shared base defines <code>receipt_line()</code> and is put in the clinic's day list. What is the genuine risk?",
           ar: "<code>LabTest</code> بلا أساس مشترك يعرّف <code>receipt_line()</code> ويُوضع في قائمة يوم العيادة. فما الخطر الحقيقي؟" },
      options: [
        { en: "Nothing checks that the method <em>means</em> the same thing or returns the same type &mdash; if it returned a dict instead of a string, <code>print_day</code> would print nonsense rather than fail.",
          ar: "لا شيء يفحص أن الدالة <em>تعني</em> الشيء نفسه أو تُعيد النوع نفسه &mdash; فلو أعادت قاموسًا بدل نص لطبعت <code>print_day</code> هراءً بدل أن تفشل." },
        { en: "Python will refuse the call because the classes have no common base.",
          ar: "ستمنع بايثون الاستدعاء لأن الصنفين بلا أساس مشترك." },
        { en: "The list cannot hold two different types, so appending raises <code>TypeError</code>.",
          ar: "لا تستطيع القائمة حمل نوعين مختلفين، فترفع الإضافة <code>TypeError</code>." },
        { en: "There is no risk at all; duck typing is always safe because Python is dynamically typed.",
          ar: "لا خطر إطلاقًا؛ فتصنيف البطة آمن دائمًا لأن بايثون ذات أنواع ديناميكية." }
      ],
      answer: 0,
      explain: { en: "Duck typing is the right tool here &mdash; the list's real requirement is \"things that can print themselves on a receipt\" &mdash; but nothing verifies that the duck quacks in the right key. That is precisely when an <code>ABC</code> starts paying for itself: once several implementations exist, naming the promise turns a mistyped or missing method into a <code>TypeError</code> at creation instead of a mangled receipt.",
                 ar: "تصنيف البطة هو الأداة الصحيحة هنا &mdash; فالمطلوب الحقيقي للقائمة «أشياء تستطيع طباعة نفسها على إيصال» &mdash; لكن لا شيء يتحقّق أن البطة تبطبط بالنغمة الصحيحة. وذلك بالضبط حين تبدأ <code>ABC</code> بتسديد ثمنها: فحين توجد عدة تنفيذات تحوّل تسميةُ الوعد دالةً خاطئة النوع أو مفقودة إلى <code>TypeError</code> عند الإنشاء بدل إيصال مشوّه." }
    },
    {
      id: "bq14", type: "output", level: "hard", topics: ["str-repr"],
      q: { en: "Only <code>__repr__</code> is defined this time. Write the three lines.",
           ar: "<code>__repr__</code> وحدها معرَّفة هذه المرة. اكتب الأسطر الثلاثة." },
      code: "class Order:\n    def __init__(self, n):\n        self.n = n\n\n    def __repr__(self):\n        return f\"Order({self.n})\"\n\n\no = Order(7)\nprint(o)\nprint([o])\nprint(str(o))",
      blanks: [{ accept: ["Order(7)\n[Order(7)]\nOrder(7)"], lines: 3 }],
      explain: { en: "This is the reverse of the usual trap and the reason <code>__repr__</code> is the better one to write first: when <code>__str__</code> is missing, Python falls back on <code>__repr__</code>, so all three lines read well. Define only <code>__str__</code> and the fallback does <em>not</em> go the other way &mdash; <code>print([o])</code> gives <code>&lt;__main__.Order object at 0x&hellip;&gt;</code>. One method, both jobs covered.",
                 ar: "هذا عكس الفخ المعتاد وسبب أن <code>__repr__</code> هي الأحقّ بالكتابة أولًا: فعند غياب <code>__str__</code> ترجع بايثون إلى <code>__repr__</code>، فتُقرأ الأسطر الثلاثة جيدًا. وعرّف <code>__str__</code> وحدها فلا يسري الرجوع في الاتجاه الآخر &mdash; فتعطي <code>print([o])</code> صيغة <code>&lt;__main__.Order object at 0x&hellip;&gt;</code>. دالة واحدة والمهمتان مغطاتان." }
    },
    {
      id: "bq15", type: "output", level: "hard", topics: ["composition", "capstone", "override"],
      q: { en: "A warranty repair wraps another job: free within 90 days. Write the four lines.",
           ar: "إصلاح الضمان يلفّ عملًا آخر: مجانًا خلال 90 يومًا. اكتب الأسطر الأربعة." },
      code: "# diagnosis 20, battery fitting 10\n\njobs = [\n    ScreenJob(180.0),\n    BatteryJob(70.0),\n    WarrantyRepair(ScreenJob(180.0), days_since=12),\n    WarrantyRepair(BatteryJob(70.0), days_since=200),\n]\n\nfor j in jobs:\n    print(f\"{j.kind:9}{j.subtotal():8.2f}\")",
      blanks: [{ accept: ["screen     200.00\nbattery    100.00\nwarranty     0.00\nwarranty   100.00"], lines: 4 }],
      explain: { en: "20+180, 20+70+10, then free inside the window, then the wrapper forwards to the battery job it holds. <code>WarrantyRepair</code> uses three lessons at once: it <em>inherits</em> from <code>Job</code> so it fits the same list, it <em>holds</em> a <code>Job</code> so it can wrap any kind, and <code>in_warranty</code> is a <em>computed property</em> so it cannot go stale. Both wrappers print <code>warranty</code> because <code>kind</code> is their own class attribute &mdash; only the price is delegated.",
                 ar: "20+180، و20+70+10، ثم مجانًا داخل النافذة، ثم يحوّل اللافّ إلى عمل البطارية الذي يمسك به. و<code>WarrantyRepair</code> يستعمل ثلاثة دروس معًا: فهو <em>يرث</em> من <code>Job</code> فيناسب القائمة نفسها، و<em>يمسك</em> بـ <code>Job</code> فيستطيع لفّ أي نوع، و<code>in_warranty</code> <em>خاصية محسوبة</em> فلا تتقادم. ويطبع كلا اللافّين <code>warranty</code> لأن <code>kind</code> خاصية صنفهما &mdash; والسعر وحده مفوَّض." }
    },
    {
      id: "bq16", type: "trace", level: "hard", topics: ["composition", "capstone", "computed"],
      q: { en: "An urgent ticket adds 25%. What does each quote come to?",
           ar: "التذكرة المستعجلة تضيف 25%. فإلى كم تبلغ كل تسعيرة؟" },
      code: "# diagnosis 20, water inspection 35, corrosion factor 1.5\n\nclass Ticket:\n    def __init__(self, tid, job, priority):\n        self.id = tid\n        self.job = job\n        self.priority = priority\n\n    @property\n    def quote(self):\n        total = self.job.subtotal()\n        if self.priority == \"urgent\":\n            total = total * 1.25\n        return total\n\n\na = Ticket(\"T-1\", ScreenJob(180.0), \"urgent\")\nb = Ticket(\"T-2\", WaterJob(90.0, corrosion=True), \"urgent\")\nc = Ticket(\"T-3\", WaterJob(90.0), \"normal\")",
      blanks: [
        { accept: ["250.0", "250", "250.00"], label: { en: "<code>a.quote</code>", ar: "<code>a.quote</code>" } },
        { accept: ["237.5", "237.50"], label: { en: "<code>b.quote</code>", ar: "<code>b.quote</code>" } },
        { accept: ["145.0", "145", "145.00"], label: { en: "<code>c.quote</code>", ar: "<code>c.quote</code>" } }
      ],
      explain: { en: "200&times;1.25 = 250; (20+35+135)&times;1.25 = 237.5; 20+35+90 = 145 with no surcharge. The division of labour is the point: the job knows the repair's price and the ticket knows about urgency, so a new job type never touches <code>quote</code> and a change to the surcharge never touches a job.",
                 ar: "200&times;1.25 = 250؛ و(20+35+135)&times;1.25 = 237.5؛ و20+35+90 = 145 بلا رسم إضافي. وتقسيم العمل هو المقصد: فالعمل يعرف سعر الإصلاح والتذكرة تعرف الاستعجال، فلا يمسّ نوعُ عمل جديد <code>quote</code> أبدًا ولا يمسّ تغييرُ الرسم عملًا أبدًا." }
    },
    {
      id: "bq17", type: "match", level: "hard", topics: ["invalid-birth", "mutable-default", "fragile-base", "one-door"],
      q: { en: "Match each silent failure to the construct that prevents it.",
           ar: "وصّل كل فشل صامت بالتركيب الذي يمنعه." },
      leftHead: { en: "Silent failure", ar: "الفشل الصامت" },
      rightHead: { en: "Prevented by", ar: "يمنعه" },
      pairs: [
        { l: { en: "An object read before one of its fields was ever set.", ar: "كائن يُقرأ قبل أن يُضبط أحد حقوله أبدًا." },
          r: { code: "__init__ assigning every field" } },
        { l: { en: "Two objects quietly sharing one list.", ar: "كائنان يتشاركان قائمة واحدة بصمت." },
          r: { code: "items=None, then self.items = [] in the body" } },
        { l: { en: "An impossible value written by the one caller who forgot to check.", ar: "قيمة مستحيلة يكتبها المستدعي الوحيد الذي نسي الفحص." },
          r: { code: "@x.setter that raises" } },
        { l: { en: "A subclass that stops following a rule the base added later.", ar: "وريثٌ يكفّ عن اتّباع قاعدة أضافها الأساس لاحقًا." },
          r: { code: "super().method(...) instead of touching the fields" } }
      ],
      explain: { en: "All four failures share a shape: the program keeps running and produces a believable wrong answer. That is why each fix works by removing the <em>possibility</em> rather than adding a check &mdash; a rule you cannot skip beats a rule you must remember.",
                 ar: "الفشول الأربعة تتقاسم شكلًا واحدًا: فالبرنامج يمضي ويُنتج جوابًا خاطئًا قابلًا للتصديق. ولهذا يعمل كل إصلاح بإزالة <em>الإمكان</em> لا بإضافة فحص &mdash; فقاعدةٌ لا تستطيع تخطّيها تفوق قاعدةً عليك أن تتذكرها." }
    },
    {
      id: "bq18", type: "multi", level: "hard", topics: ["open-closed", "when-not-oop", "design-cost"],
      q: { en: "Select <strong>every</strong> true statement about the trade classes make.",
           ar: "اختر <strong>كل</strong> عبارة صحيحة عن المقايضة التي تقدّمها الأصناف." },
      options: [
        { en: "Classes are open to new types: a new kind costs one class and no edit to existing code.",
          ar: "الأصناف مفتوحة للأنواع الجديدة: فنوعٌ جديد يكلّف صنفًا واحدًا ولا تعديل لكود قائم." },
        { en: "Classes are closed to new operations: a new operation over all types costs a method in every class.",
          ar: "الأصناف مغلقة للعمليات الجديدة: فعملية جديدة على كل الأنواع تكلّف دالة في كل صنف." },
        { en: "Functions over dictionaries are the mirror image: cheap to extend with an operation, expensive with a type.",
          ar: "الدوال على القواميس صورتها في المرآة: رخيصة التوسيع بعملية، مكلفة بنوع." },
        { en: "So the right structure depends on which axis the program actually grows along.",
          ar: "إذن البنية الصحيحة تتوقف على أي محور ينمو البرنامج عليه فعلًا." },
        { en: "Classes always produce fewer lines than the equivalent <code>if/elif</code> chain.",
          ar: "الأصناف تُنتج دائمًا أسطرًا أقل من سلسلة <code>if/elif</code> المكافئة." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "This is the chapter's central trade and the answer that counts lines is the measure it explicitly rejects: three small classes are usually <em>more</em> lines than one chain. The saving is in the next change, which is why the comparison table counts edits rather than lines.",
                 ar: "هذه هي المقايضة المركزية في الفصل، والجوابُ الذي يعدّ الأسطر هو المعيار الذي يرفضه صريحًا: فثلاثة أصناف صغيرة أسطرها <em>أكثر</em> من سلسلة واحدة عادةً. والوفر في التغيير القادم، ولهذا يُحصي جدول المقارنة التعديلات لا الأسطر." }
    },
    {
      id: "bq19", type: "mcq", level: "hard", topics: ["is-a-has-a", "design-cost", "capstone"],
      q: { en: "Someone proposes <code>ReceivedTicket</code>, <code>InProgressTicket</code> and <code>CollectedTicket</code> as subclasses of <code>Ticket</code>, one per status. What is wrong with it?",
           ar: "يقترح أحدهم <code>ReceivedTicket</code> و<code>InProgressTicket</code> و<code>CollectedTicket</code> وريثاتٍ من <code>Ticket</code>، واحدًا لكل حالة. فما الخطأ فيه؟" },
      options: [
        { en: "A status is a <em>value</em> a ticket has, not a kind of ticket &mdash; so advancing one would mean an object changing class, which Python objects do not do.",
          ar: "الحالة <em>قيمة</em> تملكها التذكرة لا نوعٌ من التذاكر &mdash; فتقديم واحدة يعني أن كائنًا يغيّر صنفه، وكائنات بايثون لا تفعل ذلك." },
        { en: "Nothing is wrong; this is polymorphism applied correctly to the status flow.",
          ar: "لا خطأ؛ فهذا تعدد أشكال مطبَّق بحقّ على تدفّق الحالات." },
        { en: "It is wrong only because four subclasses is too many for one base class.",
          ar: "إنه خطأ فقط لأن أربعة وريثات كثيرة على صنف أساس واحد." },
        { en: "It is wrong because <code>Ticket</code> would then need to be an <code>ABC</code>.",
          ar: "إنه خطأ لأن <code>Ticket</code> سيحتاج أن يكون <code>ABC</code>." }
      ],
      answer: 0,
      explain: { en: "Apply the <em>is a</em> test honestly: a ticket is not its status, it <em>has</em> one. The decisive practical argument is mutability &mdash; the same physical ticket moves from received to collected during its life, and modelling that as inheritance means replacing the object on every transition, losing its identity and any reference anyone holds to it. Subclass for things that differ in <em>behaviour</em> and stay that way, which is what the job types do.",
                 ar: "طبّق اختبار «هو نوع من» بصدق: فالتذكرة ليست حالتها، بل <em>لها</em> حالة. والحجة العملية الفاصلة هي قابلية التغيّر &mdash; فالتذكرة المادية نفسها تنتقل من مستلَمة إلى مستلَمة خلال حياتها، ونمذجة ذلك وراثةً تعني استبدال الكائن في كل انتقال، فتفقد هويته وأي مرجع يمسكه أحد به. ووَرِّث للأشياء التي تختلف في <em>السلوك</em> وتبقى كذلك، وهو ما تفعله أنواع العمل." }
    },
    {
      id: "bq20", type: "complete", level: "hard", topics: ["setter", "property", "invariant"],
      q: { en: "Attendance must stay in 0..100 and a bad value must not be swallowed. Which setter body?",
           ar: "على الحضور أن يبقى في 0..100 وألا تُبلَع قيمة سيئة. فأي جسد ضابط؟" },
      code: "    @attendance.setter\n    def attendance(self, value):\n        # which body?",
      options: [
        { code: "if not 0 <= value <= 100:\n    raise ValueError(f\"out of range: {value}\")\nself._attendance = value" },
        { code: "self._attendance = max(0, min(100, value))" },
        { code: "if 0 <= value <= 100:\n    self._attendance = value" },
        { code: "self.attendance = value" }
      ],
      answer: 0,
      explain: { en: "Three instructive wrong answers. Clamping turns a typo of <code>1000</code> into a plausible <code>100</code>, so the data is wrong and nobody ever learns. The <code>if</code> with no <code>else</code> is worse: a rejected value leaves <code>_attendance</code> unset entirely, so <code>__init__</code> can finish with the attribute missing and the crash lands much later somewhere innocent. And <code>self.attendance = value</code> calls the setter from inside the setter &mdash; infinite recursion.",
                 ar: "ثلاثة أجوبة خاطئة معلّمة. فالحصر يحوّل خطأً مطبعيًا <code>1000</code> إلى <code>100</code> معقولة، فتصبح البيانات خطأً ولا يعلم أحد أبدًا. و<code>if</code> بلا <code>else</code> أسوأ: فالقيمة المرفوضة تترك <code>_attendance</code> غير مضبوطة تمامًا، فقد تنتهي <code>__init__</code> والخاصية مفقودة ويقع الانهيار متأخرًا في موضع بريء. و<code>self.attendance = value</code> تستدعي الضابط من داخل الضابط &mdash; تكرار لا نهائي." }
    },
    {
      id: "bq21", type: "order", level: "hard", topics: ["attr-lookup", "inheritance", "override"],
      q: { en: "Order the full lookup for <code>t.fee_per_km</code> where <code>t</code> is a <code>RefrigeratedTruckCourier(TruckCourier)</code> and <code>TruckCourier(Courier)</code>.",
           ar: "رتّب البحث الكامل عن <code>t.fee_per_km</code> حيث <code>t</code> من <code>RefrigeratedTruckCourier(TruckCourier)</code> و<code>TruckCourier(Courier)</code>." },
      items: [
        { en: "The object's own attributes.", ar: "خصائص الكائن نفسه." },
        { en: "<code>RefrigeratedTruckCourier</code>.", ar: "<code>RefrigeratedTruckCourier</code>." },
        { en: "<code>TruckCourier</code>.", ar: "<code>TruckCourier</code>." },
        { en: "<code>Courier</code>.", ar: "<code>Courier</code>." },
        { en: "<code>object</code>, then <code>AttributeError</code>.", ar: "<code>object</code>، ثم <code>AttributeError</code>." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Object first, then up the chain, first match wins and the search stops. That one rule explains shadowing, overriding, why inherited code reads subclass data, and what <code>super()</code> is for &mdash; it deliberately starts the search one step further up.",
                 ar: "الكائن أولًا ثم صعودًا في السلسلة، وأول تطابق يفوز ويتوقف البحث. وتلك القاعدة الواحدة تفسّر الحجب وإعادة التعريف ولماذا يقرأ الكود الموروث بيانات الوريث ولماذا <code>super()</code> &mdash; فهي تبدأ البحث متعمدة خطوةً أعلى." }
    },
    {
      id: "bq22", type: "tf", level: "hard", topics: ["abc", "early-failure"],
      q: { en: "Putting <code>@abstractmethod</code> on a method of a class that does <em>not</em> inherit from <code>ABC</code> still prevents incomplete subclasses from being created.",
           ar: "وضعُ <code>@abstractmethod</code> على دالة في صنف <em>لا</em> يرث من <code>ABC</code> يظل يمنع إنشاء وريثات ناقصة." },
      truth: false,
      explain: { en: "It is silently ignored. <code>@abstractmethod</code> only sets a flag; the machinery that reads that flag and refuses instantiation comes from <code>ABC</code> (strictly, from its metaclass). Without it the object is created happily and the failure arrives later as an <code>AttributeError</code>, or worse, as a method inheriting a <code>...</code> body and returning <code>None</code>. This is a quiet and fairly common mistake: both pieces are needed.",
                 ar: "تُتجاهل بصمت. فـ <code>@abstractmethod</code> ترفع علامةً فقط؛ أما الآلية التي تقرأ تلك العلامة وترفض الإنشاء فتأتي من <code>ABC</code> (من صنفه الفوقي بدقّة). وبلا ذلك يُنشأ الكائن راضيًا ويصل الفشل لاحقًا <code>AttributeError</code>، أو أسوأ: دالةً ترث جسد <code>...</code> وتُعيد <code>None</code>. وهذا خطأ هادئ شائع إلى حدٍّ ما: فالقطعتان لازمتان." }
    },
    {
      id: "bq23", type: "tf", level: "hard", topics: ["self", "methods"],
      q: { en: "Naming a method's first parameter something other than <code>self</code> &mdash; <code>def borrow(book):</code> using <code>book.copies_left</code> &mdash; breaks the method.",
           ar: "تسميةُ معامل الدالة الأول بغير <code>self</code> &mdash; <code>def borrow(book):</code> مستخدمةً <code>book.copies_left</code> &mdash; تُعطّل الدالة." },
      truth: false,
      explain: { en: "It works identically. <code>self</code> is an ordinary parameter name with no special status in the language; the object before the dot is passed as the first argument whatever you call it. Every Python programmer writes <code>self</code> by convention, and you should too &mdash; but knowing it is a convention rather than a keyword is what makes <code>TypeError: takes 1 positional argument but 2 were given</code> readable: the first slot is always taken.",
                 ar: "تعمل تمامًا. فـ <code>self</code> اسم معامل عادي بلا مكانة خاصة في اللغة؛ والكائن قبل النقطة يُمرَّر وسيطًا أول أيًّا سمّيته. وكل مبرمج بايثون يكتب <code>self</code> اتفاقًا، وينبغي لك ذلك &mdash; لكن معرفةَ أنه اتفاق لا كلمة محجوزة هي ما يجعل <code>TypeError: takes 1 positional argument but 2 were given</code> مقروءًا: فالموضع الأول مشغول دائمًا." }
    },
    {
      id: "bq24", type: "compare", level: "hard", topics: ["ifelif", "open-closed", "polymorphism"],
      q: { en: "A fourth visit type is coming. Which reading of the pair is honest?",
           ar: "نوع زيارة رابع قادم. فأي قراءة للزوج صادقة؟" },
      codeA: "def calculate_fee(visit):\n    if visit.kind == \"followup\":\n        return 0.0\n    elif visit.kind == \"student\":\n        return 39.0\n    else:\n        return 60.0\n\n\ndef queue_priority(visit):\n    if visit.kind == \"emergency\":\n        return 0\n    elif visit.kind == \"followup\":\n        return 2\n    else:\n        return 1",
      codeB: "class Visit:\n    base_fee = 60.0\n    priority = 1\n\n    def fee(self):\n        return self.base_fee\n\n\nclass FollowUpVisit(Visit):\n    priority = 2\n\n    def fee(self):\n        return 0.0",
      options: [
        { en: "B costs one new class and no edit to existing lines; A costs an edit inside every chain, and a forgotten one does not crash &mdash; it falls to <code>else</code> and returns a believable wrong number. A's genuine advantage is that all the cases are readable together in one place.",
          ar: "تكلّف ب صنفًا جديدًا واحدًا ولا تعديل لأسطر قائمة؛ وتكلّف أ تعديلًا داخل كل سلسلة، والمنسيُّ لا ينهار &mdash; بل يسقط إلى <code>else</code> ويُعيد رقمًا خاطئًا قابلًا للتصديق. وميزة أ الحقيقية أن كل الحالات مقروءة معًا في موضع واحد." },
        { en: "B is better in every respect; the chain has no advantages worth naming.",
          ar: "ب أفضل من كل وجه؛ وللسلسلة لا مزايا تستحق التسمية." },
        { en: "A is better, because a single file of rules is easier to audit than rules spread across classes.",
          ar: "أ أفضل، لأن ملفًا واحدًا من القواعد أسهل في التدقيق من قواعد موزّعة على أصناف." },
        { en: "They are equivalent, since both need the same number of characters typed.",
          ar: "متكافئتان، إذ تحتاج كلتاهما العدد نفسه من الحروف المكتوبة." }
      ],
      answer: 0,
      explain: { en: "Only one answer states both sides. The silent <code>else</code> is the real cost of A, and the readability of all cases side by side is a real cost of B &mdash; after the refactor you can no longer see every fee rule on one screen. Option 2 overstates the case for classes, which is the mistake this chapter works hardest to avoid: there are changes for which the chain is the better shape, and the way to settle it is to name the change and count the edits.",
                 ar: "وجوابٌ واحد وحده يقرّ بالجانبين. فـ <code>else</code> الصامتة هي الكلفة الحقيقية لأ، وقابليةُ قراءة كل الحالات جنبًا إلى جنب كلفةٌ حقيقية لب &mdash; فبعد إعادة الهيكلة لم تبقَ ترى كل قواعد الأجر في شاشة واحدة. والخيار 2 يغالي في الحجة للأصناف، وهو الخطأ الذي يجتهد هذا الفصل أكثر ما يجتهد في تجنّبه: فثمّة تغييرات تكون السلسلة فيها الشكل الأفضل، والسبيل إلى الحكم أن تسمّي التغيير وتُحصي التعديلات." }
    },
    {
      id: "bq25", type: "error", level: "hard", topics: ["computed", "init"],
      q: { en: "The shop raises a price and the receipt keeps the old total. Click the line that creates two sources of truth.",
           ar: "يرفع المحل سعرًا ويحتفظ الإيصال بالإجمالي القديم. انقر السطر الذي يُنشئ مصدرَي حقيقة." },
      code: "class Item:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n        self.price_with_vat = price * 1.16\n\n\ni = Item(\"juice\", 10.0)\ni.price = 20.0\nprint(round(i.price_with_vat, 2))",
      answer: 5,
      explain: { en: "Line 5 stores a value derived from another, so the moment <code>price</code> changes the stored copy is a lie &mdash; it still prints 11.6. Nothing errors, because from Python's point of view nothing is broken. Compute it in a method or a <code>@property</code> and the question cannot arise.",
                 ar: "السطر 5 يخزّن قيمة مشتقّة من أخرى، فلحظةَ تتغير <code>price</code> تصبح النسخة المخزّنة كذبًا &mdash; فتظل تطبع 11.6. ولا شيء يُخطئ، لأن لا شيء مكسورًا من وجهة نظر بايثون. احسبها في دالة أو <code>@property</code> فلا يمكن أن ينشأ السؤال." }
    },
    {
      id: "bq26", type: "fill", level: "hard", topics: ["dunder", "polymorphism"],
      q: { en: "Complete the dunder that makes <code>\"Rimal\" in route</code> work, and the one that makes <code>len(route)</code> work.",
           ar: "أكمل الدالة الخاصة التي تجعل <code>\"Rimal\" in route</code> تعمل، والتي تجعل <code>len(route)</code> تعمل." },
      code: "class Route:\n    def __init__(self, number, stops=None):\n        self.number = number\n        self.stops = [] if stops is None else list(stops)\n\n    def ____1____(self):\n        return len(self.stops)\n\n    def ____2____(self, place):\n        return place in self.stops",
      blanks: [
        { accept: ["__len__"], label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["__contains__"], label: { en: "blank 2", ar: "الفراغ 2" } }
      ],
      explain: { en: "Note the constructor also fixes the mutable-default trap in the same breath, with <code>stops=None</code>. Defining these two makes your class answer <code>len()</code> and <code>in</code> the way a list does &mdash; and <code>__len__</code> quietly also decides <code>bool(route)</code>.",
                 ar: "ولاحظ أن المُنشئ يصلح أيضًا فخّ الافتراضية القابلة للتغيير في النفس نفسه، بـ <code>stops=None</code>. وتعريف هاتين يجعل صنفك يجيب <code>len()</code> و<code>in</code> كما تفعل القائمة &mdash; و<code>__len__</code> تقرّر بصمت <code>bool(route)</code> أيضًا." }
    },
    {
      id: "bq27", type: "mcq", level: "hard", topics: ["hide-shape", "interface", "design-cost"],
      q: { en: "Which refactor genuinely reduces coupling, rather than only moving it?",
           ar: "أي إعادة هيكلة تُقلّل الارتباط فعلًا، لا تنقله فقط؟" },
      options: [
        { en: "Replacing <code>t.litres</code> with a <code>litres_left</code> property, so the new depth-gauge tank computes the same answer and no caller changes.",
          ar: "استبدال <code>t.litres</code> بخاصية <code>litres_left</code>، فيحسب خزان مقياس العمق الجديد الجوابَ نفسه ولا يتغير أي مستدعٍ." },
        { en: "Replacing the public attributes with one public <code>data</code> dictionary that callers read keys from.",
          ar: "استبدال الخصائص العامة بقاموس <code>data</code> عام واحد يقرأ المستدعون مفاتيحه." },
        { en: "Renaming every attribute with a leading underscore and leaving the callers reading them.",
          ar: "تغيير اسم كل خاصية بشرطة سفلية في البداية وترك المستدعين يقرأونها." },
        { en: "Adding a <code>get_litres()</code> method and keeping <code>litres</code> public as well.",
          ar: "إضافة دالة <code>get_litres()</code> والإبقاء على <code>litres</code> عامة أيضًا." }
      ],
      answer: 0,
      explain: { en: "Only the first changes what callers depend on &mdash; a question instead of a field. The second is the data shape with extra steps: every caller still knows your key names, and you have lost the ability to validate or compute. The third marks intent and changes nothing, since the callers still read the internals. The fourth adds a second public path to the same value, which is strictly worse than one: now two names must be kept in step, and nothing stops anyone using the old one.",
                 ar: "الأول وحده يغيّر ما يتوقف عليه المستدعون &mdash; سؤالٌ بدل حقل. والثاني هو شكل البيانات بخطوات زائدة: فيظل كل مستدعٍ يعرف أسماء مفاتيحك، وقد فقدت القدرة على التحقّق أو الحساب. والثالث يعلّم القصد ولا يغيّر شيئًا، إذ يظل المستدعون يقرأون الداخل. والرابع يضيف مسارًا عامًا ثانيًا إلى القيمة نفسها، وهو أسوأ قطعًا من واحد: فصار اسمان يجب إبقاؤهما متناسقين، ولا شيء يمنع أحدًا من استعمال القديم." }
    },
    {
      id: "bq28", type: "multi", level: "hard", topics: ["property", "underscore", "one-door", "setter"],
      q: { en: "Select <strong>every</strong> accurate statement about how much protection a <code>@property</code> actually gives in Python.",
           ar: "اختر <strong>كل</strong> عبارة دقيقة عن مقدار الحماية التي تمنحها <code>@property</code> فعلًا في بايثون." },
      options: [
        { en: "It makes the rule run on every assignment to the public name, including the one inside <code>__init__</code>.",
          ar: "تجعل القاعدة تُنفَّذ على كل إسناد إلى الاسم العام، بما في ذلك الذي داخل <code>__init__</code>." },
        { en: "A caller or subclass that writes the private <code>_name</code> directly bypasses it completely.",
          ar: "المستدعي أو الوريث الذي يكتب الاسم الخاص <code>_name</code> مباشرة يتجاوزها تمامًا." },
        { en: "It stops mistakes rather than determination, which is still worth having because mistakes are what actually happen.",
          ar: "تمنع الأخطاء لا العزم، وهي تستحق الاتخاذ مع ذلك لأن الأخطاء هي ما يحدث فعلًا." },
        { en: "A getter with no setter makes the value genuinely unassignable through its public name.",
          ar: "القارئ بلا ضابط يجعل القيمة غير قابلة للإسناد فعلًا عبر اسمها العام." },
        { en: "It makes the underlying attribute inaccessible from outside the class, as <code>private</code> does in Java.",
          ar: "تجعل الخاصية الكامنة غير قابلة للوصول من خارج الصنف، كما تفعل <code>private</code> في جافا." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "Four true, and together they are the honest account. The fifth is the belief to drop: Python has no enforced private, and <code>_mark</code> is readable and writable from anywhere &mdash; question 1 of this test showed a subclass doing exactly that and producing a mark of 115. The value of the property is that the <em>easy, obvious</em> path runs your check, so the only way to get a wrong value in is to go out of your way.",
                 ar: "أربعٌ صحيحة، وهي معًا الحساب الصادق. والخامسة هي الاعتقاد الذي يُترك: فبايثون لا تملك خصوصية مفروضة، و<code>_mark</code> مقروءة ومكتوبة من أي مكان &mdash; وقد أظهر السؤال 1 في هذا الاختبار وريثًا يفعل ذلك بالضبط فيُنتج علامة 115. وقيمة الخاصية أن المسار <em>السهل البديهي</em> يُنفّذ فحصك، فلا سبيل إلى إدخال قيمة خاطئة إلا بتكلّف." }
    },
    {
      id: "bq29", type: "multi", level: "hard", topics: ["when-not-oop", "design-cost", "open-closed"],
      q: { en: "Select <strong>every</strong> case where writing a class would be the wrong call.",
           ar: "اختر <strong>كل</strong> حالة تكون كتابة صنفٍ فيها القرارَ الخطأ." },
      options: [
        { en: "A one-off script that answers one question and is then deleted.",
          ar: "سكربت لمرة واحدة يجيب سؤالًا واحدًا ثم يُحذف." },
        { en: "A small pure transform: data in, data out, no state kept between calls.",
          ar: "تحويل خالص صغير: بيانات تدخل وبيانات تخرج، ولا حالة محفوظة بين الاستدعاءات." },
        { en: "A class you cannot name a single future change for &mdash; you only know it \"models\" something.",
          ar: "صنفٌ لا تستطيع تسمية تغيير مستقبلي واحد له &mdash; كل ما تعرفه أنه «يحاكي» شيئًا." },
        { en: "A fixed set of types with a steadily growing set of operations over them.",
          ar: "مجموعة أنواع ثابتة ومجموعة عمليات عليها تنمو باستمرار." },
        { en: "One value that must obey a rule no matter which of twenty places writes it.",
          ar: "قيمة واحدة يجب أن تطيع قاعدة أيًّا كان أي من عشرين موضعًا يكتبها." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The third is the chapter's closing question turned into a test you can apply before writing anything: <em>what change does this make cheap?</em> If there is no answer, write the function. The fourth follows from open-to-types/closed-to-operations. The fifth is the opposite case entirely &mdash; twenty writers and one invariant is exactly what a setter is for, and no amount of discipline spread over twenty call sites will match it.",
                 ar: "الثالثة هي سؤال الفصل الختامي محوَّلًا اختبارًا تطبّقه قبل كتابة أي شيء: <em>أي تغيير يجعله هذا رخيصًا؟</em> فإن لم يكن جواب فاكتب الدالة. والرابعة تتبع «مفتوح للأنواع مغلق للعمليات». والخامسة هي الحالة المقابلة تمامًا &mdash; فعشرون كاتبًا وشرطٌ ثابت واحد هو بالضبط ما الضابط له، ولن يعدله أي قدر من الانتظام موزّعًا على عشرين موضع استدعاء." }
    },
    {
      id: "bq30", type: "mcq", level: "hard", topics: ["design-cost", "capstone", "when-not-oop"],
      q: { en: "You are about to write a class. Which single question best decides whether you should?",
           ar: "أنت على وشك كتابة صنف. فأي سؤال واحد يقرّر خيرَ قرار هل ينبغي لك؟" },
      options: [
        { en: "<em>What change does this make cheap?</em> &mdash; and if you cannot answer, write the function.",
          ar: "<em>أي تغيير يجعله هذا رخيصًا؟</em> &mdash; وإن لم تستطع الجواب فاكتب الدالة." },
        { en: "<em>Does this model the real world accurately?</em>",
          ar: "<em>هل يحاكي هذا العالم الحقيقي بدقة؟</em>" },
        { en: "<em>Have I used encapsulation, abstraction, inheritance and polymorphism?</em>",
          ar: "<em>هل استعملت التغليف والتجريد والوراثة وتعدد الأشكال؟</em>" },
        { en: "<em>Will this be fewer lines than the procedural version?</em>",
          ar: "<em>هل سيكون هذا أقل أسطرًا من النسخة الإجرائية؟</em>" }
      ],
      answer: 0,
      explain: { en: "Each wrong option is a real belief that leads people astray. \"Model the real world\" produces <code>Invoice</code> classes with forty attributes and no behaviour, because reality is not a design brief. \"Use all four principles\" turns a toolbox into a checklist &mdash; <code>WarrantyRepair</code> used three at once because the problem needed them, not because a list said to. And line count is the measure this chapter rejects outright. Carry question 1 into the next chapter: the machine-learning patterns there are worth exactly as much as the changes they make cheap.",
                 ar: "كل خيار خاطئ اعتقادٌ حقيقي يضلّ الناس. فـ«حاكِ العالم الحقيقي» تُنتج أصناف <code>Invoice</code> بأربعين خاصية وبلا سلوك، لأن الواقع ليس كرّاسة تصميم. و«استعمل المبادئ الأربعة» تحوّل صندوق أدوات إلى قائمة تحقّق &mdash; فـ <code>WarrantyRepair</code> استعمل ثلاثة معًا لأن المشكلة احتاجتها لا لأن قائمةً أمرت. وعددُ الأسطر هو المعيار الذي يرفضه هذا الفصل رفضًا صريحًا. واحمل السؤال 1 إلى الفصل التالي: فأنماط تعلّم الآلة هناك تستحق بالضبط بقدر التغييرات التي تجعلها رخيصة." }
    }
  ]
};
