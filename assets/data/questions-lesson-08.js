/* ============================================================
   Lesson 8 (Lecture 10) — Steps That Remember.
   Domain: the secondary school's leaving-class marks and the
   city column on each student record.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-08"] = {
  title: { en: "Lesson 8 Test — Strategy and Factory", ar: "اختبار الدرس 8 — الاستراتيجية والمصنع" },
  intro: {
    en: "Twelve questions on Lesson 8 only. No mathematics is examined &mdash; every question is about what the object stores, what it answers, and who chooses which class. If a question mentions <code>fit</code> or <code>transform</code> and the word is still vague, it is defined in <a href=\"#appendix-a3\">Appendix A3</a>.",
    ar: "اثنا عشر سؤالًا على الدرس 8 وحده. ولا يُمتحَن في أي رياضيات &mdash; فكل سؤال عما يخزّنه الكائن وما يجيبه ومن يختار الصنف. وإن ذكر سؤالٌ <code>fit</code> أو <code>transform</code> وكانت الكلمة لا تزال غامضة فهي معرَّفة في <a href=\"#appendix-a3\">الملحق A3</a>."
  },
  questions: [
    {
      id: "t8q1", type: "tf", level: "easy", topics: ["fit-contract", "step-memory"],
      q: { en: "<code>fit</code> writes to <code>self</code> and <code>transform</code> reads from it, so calling <code>transform</code> first on a fresh scaler fails.",
           ar: "<code>fit</code> تكتب على <code>self</code> و<code>transform</code> تقرأ منه، فاستدعاء <code>transform</code> أولًا على مُقيِّس جديد يفشل." },
      truth: true,
      explain: { en: "<code>AttributeError: 'MinMaxScaler' object has no attribute 'high'</code> &mdash; the attribute does not exist until <code>fit</code> creates it. That is ordinary object state from <a href=\"#l2-h1\">Lesson 2</a>, and Exercise 8.1 turns the symptom into a message that names the real mistake.",
                 ar: "<code>AttributeError: 'MinMaxScaler' object has no attribute 'high'</code> &mdash; فالخاصية غير موجودة حتى تنشئها <code>fit</code>. وتلك حالةُ كائن عادية من <a href=\"#l2-h1\">الدرس 2</a>، والتمرين 8.1 يحوّل العَرَض رسالةً تسمّي الخطأ الحقيقي." }
    },
    {
      id: "t8q2", type: "output", level: "easy", topics: ["no-memory"],
      q: { en: "This is the version with no memory. Write the two lines it prints.",
           ar: "هذه هي النسخة بلا ذاكرة. اكتب السطرين الذين تطبعهما." },
      code: "def scale(values):\n    low = min(values)\n    high = max(values)\n    return [round((v - low) / (high - low), 3) for v in values]\n\n\nprint(scale([40, 55, 70, 85, 100]))\nprint(scale([70, 90]))",
      blanks: [{ accept: ["[0.0, 0.25, 0.5, 0.75, 1.0]\n[0.0, 1.0]"], lines: 2 }],
      explain: { en: "A mark of 70 is <code>0.5</code> on the first line and <code>0.0</code> on the second, from the same function, because the function recomputes the range from whatever list it is handed. Nothing raises; the second answer is simply wrong. The ruler changes shape depending on what you measure with it.",
                 ar: "علامةُ 70 هي <code>0.5</code> في السطر الأول و<code>0.0</code> في الثاني، من الدالة نفسها، لأنها تعيد حساب المدى من أي قائمة تُسلَّم إليها. ولا شيء يُرفع؛ والجواب الثاني خطأ ببساطة. فالمسطرة تتغير شكلًا بحسب ما تقيسه بها." }
    },
    {
      id: "t8q3", type: "fill", level: "easy", topics: ["step-memory", "fit-contract"],
      q: { en: "Fill the two blanks so the scaler remembers its range.",
           ar: "أكمل الفراغين ليتذكّر المُقيِّس مداه." },
      code: "class MinMaxScaler:\n    def fit(self, values):\n        ____1____ = min(values)\n        self.high = max(values)\n        return ____2____\n\n    def transform(self, values):\n        span = self.high - self.low\n        return [round((v - self.low) / span, 3) for v in values]",
      blanks: [
        { accept: ["self.low"], label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["self"], label: { en: "blank 2", ar: "الفراغ 2" } }
      ],
      explain: { en: "<code>self.low</code>, not <code>low</code>: a local name vanishes when <code>fit</code> ends and the whole point is that the number must survive. <code>return self</code> is a convenience &mdash; it lets you chain <code>fit(x).transform(x)</code> &mdash; and note it returns the <em>object</em>, never the data.",
                 ar: "<code>self.low</code> لا <code>low</code>: فالاسم المحلي يزول بانتهاء <code>fit</code> والمقصد كله أن يبقى الرقم. و<code>return self</code> تسهيل &mdash; تتيح لك تسلسل <code>fit(x).transform(x)</code> &mdash; ولاحظ أنها تُعيد <em>الكائن</em> لا البيانات أبدًا." }
    },
    {
      id: "t8q4", type: "trace", level: "medium", topics: ["step-memory"],
      q: { en: "Trace the state. After the last line, what do these hold?",
           ar: "تتبّع الحالة. بعد السطر الأخير، ماذا تحمل هذه؟" },
      code: "class MinMaxScaler:\n    def fit(self, values):\n        self.low = min(values)\n        self.high = max(values)\n        return self\n\n    def transform(self, values):\n        span = self.high - self.low\n        return [round((v - self.low) / span, 3) for v in values]\n\n\nscaler = MinMaxScaler()\nscaler.fit([40, 55, 70, 85, 100])\nout = scaler.transform([70, 130])",
      blanks: [
        { accept: ["40"], label: { en: "<code>scaler.low</code>", ar: "<code>scaler.low</code>" } },
        { accept: ["100"], label: { en: "<code>scaler.high</code>", ar: "<code>scaler.high</code>" } },
        { accept: ["[0.5, 1.5]"], wide: true, label: { en: "<code>out</code>", ar: "<code>out</code>" } }
      ],
      explain: { en: "130 scales to <strong>1.5</strong>, above the top of the range, and <code>transform</code> does not mind &mdash; it was never promised the new data would fit inside the old range. That is the honest answer: a value outside everything the step was fitted on <em>should</em> land outside 0&ndash;1, because that is exactly what it is. A step that silently clamped it to 1.0 would hide the fact that something unusual arrived.",
                 ar: "تُقاس 130 إلى <strong>1.5</strong> فوق قمة المدى، ولا تمانع <code>transform</code> &mdash; فلم يُوعَد قطّ بأن البيانات الجديدة ستقع داخل المدى القديم. وذلك هو الجواب الصادق: فالقيمة الخارجة عن كل ما دُرِّبت عليه الخطوة <em>ينبغي</em> أن تقع خارج 0&ndash;1، لأنها كذلك بالضبط. وخطوةٌ تحصرها بصمت عند 1.0 ستخفي أن شيئًا غير معتاد قد وصل." }
    },
    {
      id: "t8q5", type: "error", level: "medium", topics: ["step-memory", "fit-contract"],
      q: { en: "This scaler gives a different answer every time it is called, even though it has a <code>fit</code>. Click the line that defeats the memory.",
           ar: "يعطي هذا المُقيِّس جوابًا مختلفًا في كل استدعاء، مع أن له <code>fit</code>. انقر السطر الذي يهزم الذاكرة." },
      code: "class MinMaxScaler:\n    def fit(self, values):\n        self.low = min(values)\n        self.high = max(values)\n        return self\n\n    def transform(self, values):\n        low = min(values)\n        high = max(values)\n        return [round((v - low) / (high - low), 3) for v in values]",
      answer: 8,
      explain: { en: "<code>fit</code> stores the range perfectly well, and then <code>transform</code> ignores it and recomputes from its own argument, so the class is the forgetting function wearing a costume. Line 8 is the first of the two offending lines &mdash; and the tell is that <code>self.low</code> and <code>self.high</code> are stored by <code>fit</code> and never read anywhere. An attribute that is written and never read is almost always a bug of this kind.",
                 ar: "تخزّن <code>fit</code> المدى تمامًا، ثم تتجاهله <code>transform</code> وتعيد الحساب من وسيطها، فيصير الصنفُ الدالةَ الناسية متنكرةً. والسطر 8 هو أول السطرين المخالفين &mdash; والعلامة الفاضحة أن <code>self.low</code> و<code>self.high</code> تُخزَّنان بـ <code>fit</code> ولا تُقرآن في أي موضع. والخاصيةُ التي تُكتب ولا تُقرأ أبدًا خللٌ من هذا النوع في الغالب الأعمّ." },
      solution: { code: "    def transform(self, values):\n        span = self.high - self.low\n        return [round((v - self.low) / span, 3) for v in values]" }
    },
    {
      id: "t8q6", type: "compare", level: "medium", topics: ["strategy"],
      q: { en: "Two ways to support a second scaling method. Which statement about the pair is true?",
           ar: "طريقتان لدعم أسلوب تقييس ثانٍ. أي عبارة عن الزوج صحيحة؟" },
      codeA: "class Scaler:\n    def __init__(self, method):\n        self.method = method\n\n    def fit(self, values):\n        if self.method == \"minmax\":\n            self.low = min(values)\n            self.high = max(values)\n        elif self.method == \"standard\":\n            self.mean = sum(values) / len(values)\n            self.sd = 1.0\n        return self\n\n    def transform(self, values):\n        if self.method == \"minmax\":\n            span = self.high - self.low\n            return [(v - self.low) / span for v in values]\n        elif self.method == \"standard\":\n            return [(v - self.mean) / self.sd for v in values]",
      codeB: "class MinMaxScaler:\n    def fit(self, values):\n        self.low = min(values)\n        self.high = max(values)\n        return self\n\n    def transform(self, values):\n        span = self.high - self.low\n        return [(v - self.low) / span for v in values]\n\n\nclass StandardScaler:\n    def fit(self, values):\n        self.mean = sum(values) / len(values)\n        self.sd = 1.0\n        return self\n\n    def transform(self, values):\n        return [(v - self.mean) / self.sd for v in values]",
      options: [
        { en: "A has two chains over the same cases that must stay in step for ever, and its objects carry attributes that are meaningless half the time. B cannot get out of step, and each class stores only what it uses.",
          ar: "في أ سلسلتان على الحالات نفسها عليهما أن تبقيا متوافقتين إلى الأبد، وكائناتها تحمل خصائص بلا معنى نصف الوقت. وب لا يمكن أن تختلّ، ويخزّن كل صنف ما يستعمله فقط." },
        { en: "They are equivalent; B is just spread over more lines.",
          ar: "متكافئتان؛ وب موزّعة على أسطر أكثر فقط." },
        { en: "A is safer, because both methods are visible in one class and a reader can compare them.",
          ar: "أ أكثر أمانًا، لأن الطريقتين مرئيتان في صنف واحد ويستطيع القارئ مقارنتهما." },
        { en: "B cannot work, because the two classes have no attribute in common and so cannot be used interchangeably.",
          ar: "ب لا تنجح، لأن الصنفين لا يتقاسمان خاصية فلا يمكن استعمالهما بالتبادل." }
      ],
      answer: 0,
      explain: { en: "The duplication is the point: add a third method to A and you edit two chains, and the first time you edit only one, <code>fit</code> stores a <code>mean</code> while <code>transform</code> reaches for a <code>low</code> that was never set. The answer about sharing no attributes is the useful misconception &mdash; interchangeability comes from answering the same <em>messages</em>, never from sharing attributes, which is <a href=\"#l6-s4\">duck typing</a>. Option 3 names a genuine advantage, the same one <a href=\"#l6-s6\">Lesson 6 conceded</a> about the if/elif chain.",
                 ar: "التكرار هو المقصد: أضف طريقة ثالثة إلى أ تعدّل سلسلتين، وأول مرة تعدّل واحدة فقط تخزّن <code>fit</code> متوسطًا بينما تمدّ <code>transform</code> يدها إلى <code>low</code> لم تُضبط. والجوابُ عن عدم تقاسم الخصائص هو الوهم المفيد &mdash; فقابلية التبادل تأتي من إجابة <em>الرسائل</em> نفسها لا من تقاسم الخصائص أبدًا، وذلك <a href=\"#l6-s4\">تصنيف البطة</a>. والخيار 3 يسمّي ميزة حقيقية، وهي التي <a href=\"#l6-s6\">أقرّ بها الدرس 6</a> عن سلسلة if/elif." }
    },
    {
      id: "t8q7", type: "output", level: "medium", topics: ["encoder-state"],
      q: { en: "Write the three lines this prints. <code>sorted(set(...))</code> decides the numbering.",
           ar: "اكتب الأسطر الثلاثة التي يطبعها. و<code>sorted(set(...))</code> تقرّر الترقيم." },
      code: "class LabelEncoder:\n    def fit(self, values):\n        self.classes = sorted(set(values))\n        self.index = {c: i for i, c in enumerate(self.classes)}\n        return self\n\n    def transform(self, values):\n        return [self.index[v] for v in values]\n\n\ne = LabelEncoder().fit([\"Rafah\", \"Gaza\", \"Rafah\", \"Khan Younis\"])\nprint(e.classes)\nprint(e.transform([\"Rafah\", \"Gaza\"]))\nprint(e.transform([\"Gaza\"]))",
      blanks: [{ accept: ["['Gaza', 'Khan Younis', 'Rafah']\n[2, 0]\n[0]"], lines: 3 }],
      explain: { en: "The numbers come from alphabetical order, not the order the cities appeared, because <code>fit</code> sorted them. The useful part is the last two lines: <code>\"Gaza\"</code> is <code>0</code> whether it arrives with another city or alone, because the mapping was stored. That is the same guarantee the scaler gives, applied to words.",
                 ar: "الأرقام من الترتيب الأبجدي لا من ترتيب ظهور المدن، لأن <code>fit</code> رتّبتها. والمفيد هو السطران الأخيران: فـ <code>\"Gaza\"</code> هي <code>0</code> سواء وصلت مع مدينة أخرى أو وحدها، لأن الربط خُزّن. وذلك هو الضمان نفسه الذي يمنحه المُقيِّس، مطبَّقًا على الكلمات." }
    },
    {
      id: "t8q8", type: "match", level: "medium", topics: ["strategy", "factory", "template-method", "step-abc"],
      q: { en: "Match each piece of the design to the job it does.",
           ar: "وصّل كل جزء من التصميم بالمهمة التي يؤديها." },
      leftHead: { en: "Written as", ar: "يُكتب هكذا" },
      rightHead: { en: "Its job", ar: "مهمته" },
      pairs: [
        { l: { code: "class StandardScaler:" },
          r: { en: "One interchangeable way of doing the job, storing only what it needs.", ar: "طريقة واحدة قابلة للتبادل في أداء المهمة، تخزّن ما تحتاجه فقط." } },
        { l: { code: "def make_scaler(name):" },
          r: { en: "The one place a string from a config file becomes a class.", ar: "الموضع الوحيد الذي يصير فيه نصٌّ من ملف تهيئة صنفًا." } },
        { l: { code: "class Step(ABC):" },
          r: { en: "The promise itself, so a half-written step fails when it is created rather than when data reaches it.", ar: "الوعد نفسه، فتفشل الخطوة نصف المكتوبة عند إنشائها لا عند وصول البيانات إليها." } },
        { l: { code: "def fit_transform(self, values):" },
          r: { en: "Written once in the base and inherited by subclasses that did not exist when it was written.", ar: "تُكتب مرة في الأساس وترثها وريثات لم توجد حين كُتبت." } }
      ],
      explain: { en: "Four different jobs that beginners often collapse into one. Only the third changes what is <em>possible</em>; the first changes what is <em>duplicated</em>, the second changes where a <em>decision</em> lives, and the fourth changes how much is <em>written twice</em>.",
                 ar: "أربع مهام مختلفة كثيرًا ما يدمجها المبتدئ في واحدة. والثالثة وحدها تغيّر ما هو <em>ممكن</em>؛ والأولى تغيّر ما هو <em>مكرَّر</em>، والثانية تغيّر أين يعيش <em>القرار</em>، والرابعة تغيّر كم يُكتب <em>مرتين</em>." }
    },
    {
      id: "t8q9", type: "order", level: "medium", topics: ["fit-contract", "step-memory"],
      q: { en: "Put in order what happens when a scaler is used correctly on a new student's mark.",
           ar: "رتّب ما يحدث حين يُستعمل مُقيِّسٌ استعمالًا صحيحًا على علامة طالب جديد." },
      items: [
        { en: "The scaler object is created; it holds nothing yet.", ar: "يُنشأ كائن المُقيِّس؛ ولا يحمل شيئًا بعد." },
        { en: "<code>fit</code> is called on the whole leaving class and stores the range on <code>self</code>.", ar: "تُستدعى <code>fit</code> على صفّ التخرج كله فتخزّن المدى على <code>self</code>." },
        { en: "Weeks later, a new student's mark arrives on its own.", ar: "بعد أسابيع، تصل علامة طالب جديد وحدها." },
        { en: "<code>transform</code> reads the stored range &mdash; it does not look at the new mark to decide anything.", ar: "تقرأ <code>transform</code> المدى المخزَّن &mdash; ولا تنظر إلى العلامة الجديدة لتقرّر شيئًا." },
        { en: "The new mark is placed on the same scale the class was placed on.", ar: "تُوضع العلامة الجديدة على المقياس نفسه الذي وُضع عليه الصفّ." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 4 is the one that carries the whole design. The moment <code>transform</code> starts looking at its argument to decide the range, the sequence collapses into the forgetting function and step 5 stops being true.",
                 ar: "الخطوة 4 هي التي تحمل التصميم كله. فلحظةَ تبدأ <code>transform</code> بالنظر إلى وسيطها لتقرّر المدى ينهار التسلسل إلى الدالة الناسية وتكفّ الخطوة 5 عن الصدق." }
    },
    {
      id: "t8q10", type: "complete", level: "hard", topics: ["template-method", "step-abc"],
      q: { en: "Which body for <code>fit_transform</code> works for every subclass, including ones written next year?",
           ar: "أي جسد لـ <code>fit_transform</code> يعمل لكل وريث، بما فيها ما يُكتب العام القادم؟" },
      code: "class Step(ABC):\n    @abstractmethod\n    def fit(self, values):\n        ...\n\n    @abstractmethod\n    def transform(self, values):\n        ...\n\n    def fit_transform(self, values):\n        # which body?",
      options: [
        { code: "return self.fit(values).transform(values)" },
        { code: "return self.transform(self.fit(values))" },
        { code: "self.fit(values)\nreturn values" },
        { code: "return MinMaxScaler().fit(values).transform(values)" }
      ],
      answer: 0,
      explain: { en: "It calls only the two methods the base promised, so it works on any subclass, including one that does not exist yet. The version that returns <code>self.transform(self.fit(values))</code> is the subtle wrong answer: <code>self.fit(values)</code> returns <code>self</code> &mdash; the object &mdash; so it passes a scaler where a list belongs and crashes inside <code>transform</code>. The third fits and then returns the data unchanged. The fourth names a concrete class in the base, which breaks the moment anything else inherits from <code>Step</code> and is the exact dependency an abstract base exists to prevent.",
                 ar: "تستدعي الدالتين اللتين وعد بهما الأساس فقط، فتعمل على أي وريث بما فيه ما لم يوجد بعد. والنسخةُ التي تُعيد <code>self.transform(self.fit(values))</code> هي الجواب الخاطئ الدقيق: فـ <code>self.fit(values)</code> تُعيد <code>self</code> &mdash; الكائن &mdash; فتمرّر مُقيِّسًا حيث تنتمي قائمة وتنهار داخل <code>transform</code>. والثالث يدرّب ثم يُعيد البيانات بلا تغيير. والرابع يسمّي صنفًا محددًا في الأساس، وهو ينكسر لحظةَ يرث شيء آخر من <code>Step</code> وهو بعينه الاعتمادُ الذي وُجد الأساسُ المجرّد لمنعه." }
    },
    {
      id: "t8q11", type: "mcq", level: "hard", topics: ["factory", "pattern-cost"],
      q: { en: "Your program always uses min-max scaling. There is no config file and no command-line flag. Should you still write <code>make_scaler</code>?",
           ar: "برنامجك يستعمل تقييس min-max دائمًا. ولا ملف تهيئة ولا راية سطر أوامر. فهل تكتب <code>make_scaler</code> مع ذلك؟" },
      options: [
        { en: "No. A factory exists to turn a <em>name</em> into a class; with no name arriving from outside, it buys no future change and <code>MinMaxScaler()</code> says more clearly what happens.",
          ar: "لا. فالمصنع موجود ليحوّل <em>اسمًا</em> صنفًا؛ وبلا اسم يأتي من الخارج لا يشتري أي تغيير قادم، و<code>MinMaxScaler()</code> تقول ما يحدث أوضح." },
        { en: "Yes. A factory is good practice and should be written before it is needed, so the program is ready when a second scaler arrives.",
          ar: "نعم. فالمصنع ممارسة جيدة وينبغي كتابته قبل الحاجة إليه، فيكون البرنامج جاهزًا حين يصل مُقيِّس ثانٍ." },
        { en: "Yes, because constructing a class directly from application code breaks encapsulation.",
          ar: "نعم، لأن إنشاء صنف مباشرة من كود التطبيق يكسر التغليف." },
        { en: "No, because factories can only return objects of one class.",
          ar: "لا، لأن المصانع لا تستطيع إعادة كائنات إلا من صنف واحد." }
      ],
      answer: 0,
      explain: { en: "Apply <a href=\"#l7-h5\">the closing question of Chapter 1</a>: what change does this make cheap? If no string will ever name a scaler, the answer is none, and the factory is ceremony. The answer that writes the factory before it is needed is the most tempting and the most expensive habit in this chapter &mdash; a pattern written for a future that does not arrive is code to read, test and maintain for no return. Write it the day the config file appears; that day is cheap too, because it is one function.",
                 ar: "طبّق <a href=\"#l7-h5\">السؤال الختامي للفصل 1</a>: أي تغيير يجعله هذا رخيصًا؟ فإن لم يسمِّ نصٌّ مُقيِّسًا أبدًا فالجواب لا شيء، والمصنع مراسم. والجوابُ الذي يكتب المصنع قبل الحاجة أغوى عادةٍ وأغلاها في هذا الفصل &mdash; فنمطٌ يُكتب لمستقبل لا يأتي كودٌ يُقرأ ويُختبر ويُصان بلا مردود. اكتبه يومَ يظهر ملف التهيئة؛ وذلك اليوم رخيص أيضًا، لأنه دالة واحدة." }
    },
    {
      id: "t8q12", type: "multi", level: "hard", topics: ["step-abc", "strategy", "template-method"],
      q: { en: "Select <strong>every</strong> true statement about adding <code>Step(ABC)</code> as a base for the scalers.",
           ar: "اختر <strong>كل</strong> عبارة صحيحة عن إضافة <code>Step(ABC)</code> أساسًا للمُقيِّسات." },
      options: [
        { en: "A subclass that implements only <code>fit</code> now fails at creation with <code>TypeError</code>, naming the missing method.",
          ar: "الوريث الذي ينفّذ <code>fit</code> وحدها يفشل الآن عند الإنشاء بـ <code>TypeError</code> مسمّيًا الدالة المفقودة." },
        { en: "<code>fit_transform</code> can live on the base and every subclass gets it without writing a line.",
          ar: "تستطيع <code>fit_transform</code> أن تعيش على الأساس وينالها كل وريث بلا كتابة سطر." },
        { en: "The loop over two scalers already worked before the base class existed, so the base is not what makes them interchangeable.",
          ar: "الحلقة على مُقيِّسين عملت قبل وجود الأساس، فليس الأساس ما يجعلهما قابلين للتبادل." },
        { en: "A step from another library, not inheriting from <code>Step</code>, can still be dropped into the same loop as long as it has both methods.",
          ar: "خطوةٌ من مكتبة أخرى لا ترث من <code>Step</code> يمكن إدخالها في الحلقة نفسها ما دامت تملك الدالتين." },
        { en: "Inheriting from <code>Step</code> forces every subclass to store the same attributes.",
          ar: "الوراثة من <code>Step</code> تُلزم كل وريث بتخزين الخصائص نفسها." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first four are all true and together they draw the line precisely. An <code>ABC</code> buys you an <em>early, named failure</em> for an incomplete implementation and a <em>home for shared code</em>; it does not buy interchangeability, which <a href=\"#l6-s4\">duck typing</a> already gave you &mdash; which is exactly why the fourth is true and useful in practice. The fifth is the misconception: an interface is an agreement about messages, never about storage, and <code>MinMaxScaler</code> and <code>StandardScaler</code> share no attribute at all.",
                 ar: "الأربعة الأولى صحيحة كلها وهي معًا ترسم الحدّ بدقة. فـ <code>ABC</code> تشتري لك <em>فشلًا مبكرًا مسمّى</em> للتنفيذ الناقص و<em>بيتًا للكود المشترك</em>؛ ولا تشتري قابلية التبادل التي منحها لك <a href=\"#l6-s4\">تصنيف البطة</a> أصلًا &mdash; ولهذا بالضبط الرابعة صحيحة ومفيدة عمليًا. والخامسة هي الوهم: فالواجهة اتفاقٌ على الرسائل لا على التخزين أبدًا، و<code>MinMaxScaler</code> و<code>StandardScaler</code> لا يتقاسمان خاصية إطلاقًا." }
    }
  ]
};
