/* ============================================================
   Lesson 9 (Lecture 11) — Pipelines and Decorators.
   Steps, pipeline and decorator all come from Lesson 8's
   Step base; the data is the same school's marks.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-09"] = {
  title: { en: "Lesson 9 Test — Pipelines and Decorators", ar: "اختبار الدرس 9 — المسارات والمزخرِفات" },
  intro: {
    en: "Twelve questions on Lesson 9. Several turn on one line &mdash; the one inside <code>Pipeline.fit</code> that transforms as well as fits. If that line is not yet obvious, step through <a href=\"#l9-s3\">the trace in Concept 1</a> before you start.",
    ar: "اثنا عشر سؤالًا على الدرس 9. وعدد منها يدور على سطر واحد &mdash; السطرِ داخل <code>Pipeline.fit</code> الذي يحوّل كما يدرّب. فإن لم يكن ذلك السطر بديهيًا بعد فتنقّل في <a href=\"#l9-s3\">التتبّع في المفهوم 1</a> قبل أن تبدأ."
  },
  questions: [
    {
      id: "t9q1", type: "tf", level: "easy", topics: ["composite", "pipeline"],
      q: { en: "A <code>Pipeline</code> can be put inside another <code>Pipeline</code>, and no special code was written to allow that.",
           ar: "يمكن وضع <code>Pipeline</code> داخل <code>Pipeline</code> آخر، ولم يُكتب أي كود خاص للسماح بذلك." },
      truth: true,
      explain: { en: "<code>Pipeline</code> answers <code>fit</code> and <code>transform</code>, so it is a step, so it fits anywhere a step fits &mdash; including the step list of another pipeline. Nesting works because of the shared interface and for no other reason. It is the rare case where <em>is a</em> and <em>has a</em> are both true on purpose.",
                 ar: "يجيب <code>Pipeline</code> عن <code>fit</code> و<code>transform</code>، فهو خطوة، فيصلح في أي موضع تصلح فيه خطوة &mdash; بما فيه قائمةُ خطوات مسارٍ آخر. والتعشيش يعمل بسبب الواجهة المشتركة ولا سبب غيره. وهي الحالة النادرة التي تصدق فيها «هو» و«له» معًا بقصد." }
    },
    {
      id: "t9q2", type: "output", level: "easy", topics: ["pipeline"],
      q: { en: "<code>Clip(0, 100)</code> caps values into that range; <code>MinMaxScaler</code> scales to 0&ndash;1. Write what this prints.",
           ar: "<code>Clip(0, 100)</code> يحصر القيم في ذلك المدى؛ و<code>MinMaxScaler</code> يقيس إلى 0&ndash;1. اكتب ما يطبعه هذا." },
      code: "raw = [20, 55, 70, 85, 400]\n\nprepare = Pipeline([Clip(0, 100), MinMaxScaler()])\nprepare.fit(raw)\nprint(prepare.transform(raw))",
      blanks: [{ accept: ["[0.0, 0.438, 0.625, 0.812, 1.0]"], wide: true }],
      explain: { en: "400 is clipped to 100 first, so the scaler sees 20 to 100 and stores that as its range. 20 becomes 0.0, 100 becomes 1.0, and the rest fall in between: 55 is 35/80 = 0.438, 70 is 50/80 = 0.625, 85 is 65/80 = 0.812.",
                 ar: "تُحصر 400 إلى 100 أولًا، فيرى المُقيِّس من 20 إلى 100 ويخزّنه مدىً له. فتصير 20 هي 0.0، و100 هي 1.0، ويقع الباقي بينهما: فـ 55 هي 35÷80 = 0.438، و70 هي 50÷80 = 0.625، و85 هي 65÷80 = 0.812." }
    },
    {
      id: "t9q3", type: "fill", level: "easy", topics: ["pipeline"],
      q: { en: "Fill the blank in <code>Pipeline.fit</code> so that each step is fitted on what the step before it produced.",
           ar: "أكمل الفراغ في <code>Pipeline.fit</code> لتُدرَّب كل خطوة على ما أنتجته سابقتها." },
      code: "class Pipeline(Step):\n    def __init__(self, steps):\n        self.steps = steps\n\n    def fit(self, values):\n        for step in self.steps:\n            values = ____1____\n        return self\n\n    def transform(self, values):\n        for step in self.steps:\n            values = step.transform(values)\n        return values",
      blanks: [{ accept: ["step.fit(values).transform(values)"], wide: true,
                 hint: { en: "<code>fit</code> returns <code>self</code>, so it can be chained.",
                         ar: "<code>fit</code> تُعيد <code>self</code>، فيمكن تسلسلها." } }],
      explain: { en: "<code>step.fit(values)</code> alone would fit the step and leave <code>values</code> unchanged, so the next step would be fitted on the raw data rather than on what it will actually receive. The chained <code>.transform(values)</code> is what passes the changed data down the line.",
                 ar: "<code>step.fit(values)</code> وحدها ستدرّب الخطوة وتترك <code>values</code> بلا تغيير، فتُدرَّب الخطوة التالية على البيانات الخام لا على ما ستستقبله فعلًا. و<code>.transform(values)</code> المتسلسلة هي ما يمرّر البيانات المغيَّرة في السلسلة." }
    },
    {
      id: "t9q4", type: "output", level: "medium", topics: ["pipeline", "order-rule"],
      q: { en: "The same two steps, in the opposite order. Write what this prints.",
           ar: "الخطوتان نفسهما بالترتيب المعاكس. اكتب ما يطبعه هذا." },
      code: "raw = [20, 55, 70, 85, 400]\n\nswapped = Pipeline([MinMaxScaler(), Clip(0, 100)])\nswapped.fit(raw)\nprint(swapped.transform(raw))",
      blanks: [{ accept: ["[0, 0.092, 0.132, 0.171, 1.0]", "[0.0, 0.092, 0.132, 0.171, 1.0]"], wide: true }],
      explain: { en: "Scaling first means the scaler sees the 400, stores it as <code>high</code>, and squashes every real mark into the bottom fifth of the range: 55 becomes 0.092 instead of 0.438. Clipping afterwards to 0&ndash;100 then does nothing at all, because every value is already between 0 and 1. Same steps, same data, a completely different and completely silent result &mdash; which is why the order is a rule and why the rule needs an owner.",
                 ar: "التقييس أولًا يعني أن المُقيِّس يرى 400 ويخزّنها <code>high</code> ويسحق كل علامة حقيقية في الخمس الأدنى من المدى: فتصير 55 هي 0.092 بدل 0.438. ثم لا يفعل الحصرُ إلى 0&ndash;100 بعدها شيئًا إطلاقًا، لأن كل قيمة بين 0 و1 أصلًا. الخطوات نفسها والبيانات نفسها، ونتيجةٌ مختلفة تمامًا وصامتة تمامًا &mdash; ولهذا كان الترتيب قاعدة ولهذا احتاجت القاعدة مالكًا." }
    },
    {
      id: "t9q5", type: "error", level: "medium", topics: ["pipeline", "fit-contract"],
      q: { en: "This pipeline produces wrong numbers and raises nothing. Click the line to fix.",
           ar: "يُنتج هذا المسار أرقامًا خاطئة ولا يرفع شيئًا. انقر السطر الذي يجب إصلاحه." },
      code: "class Pipeline(Step):\n    def __init__(self, steps):\n        self.steps = steps\n\n    def fit(self, values):\n        for step in self.steps:\n            step.fit(values)\n        return self\n\n    def transform(self, values):\n        for step in self.steps:\n            values = step.transform(values)\n        return values",
      answer: 7,
      explain: { en: "Line 7 fits every step on the <em>same</em> original data, so the scaler is fitted on marks including the 400 and stores a <code>high</code> of 400. Then <code>transform</code> clips first, as it should, and hands the scaler values that never reach 400 &mdash; so every mark is squashed into the bottom fifth. The two methods must see the same sequence of data, and only <code>transform</code> does. It must read <code>values = step.fit(values).transform(values)</code>.",
                 ar: "السطر 7 يدرّب كل خطوة على البيانات الأصلية <em>نفسها</em>، فيُدرَّب المُقيِّس على علامات فيها 400 ويخزّن <code>high</code> بقيمة 400. ثم تحصر <code>transform</code> أولًا كما ينبغي وتسلّم المُقيِّس قيمًا لا تبلغ 400 أبدًا &mdash; فتُسحق كل علامة في الخمس الأدنى. وعلى الدالتين أن تريا تسلسل البيانات نفسه، ولا تفعله إلا <code>transform</code>. ويجب أن يكون السطر <code>values = step.fit(values).transform(values)</code>." },
      solution: { code: "    def fit(self, values):\n        for step in self.steps:\n            values = step.fit(values).transform(values)\n        return self" }
    },
    {
      id: "t9q6", type: "trace", level: "medium", topics: ["pipeline", "step-memory"],
      q: { en: "Trace <code>fit</code> through the chain. What does the scaler end up storing?",
           ar: "تتبّع <code>fit</code> في السلسلة. فماذا ينتهي المُقيِّس إلى تخزينه؟" },
      code: "raw = [20, 55, 70, 85, 400]\n\nprepare = Pipeline([Clip(0, 100), MinMaxScaler()])\nprepare.fit(raw)\n\nscaler = prepare.steps[1]",
      blanks: [
        { accept: ["20"], label: { en: "<code>scaler.low</code>", ar: "<code>scaler.low</code>" } },
        { accept: ["100"], label: { en: "<code>scaler.high</code>", ar: "<code>scaler.high</code>" } }
      ],
      explain: { en: "<code>high</code> is 100, not 400, because the scaler was fitted on the list the clip step produced. That single fact is the difference between a pipeline that works and one that silently compresses every mark &mdash; and it comes from one <code>.transform(values)</code> inside <code>fit</code>.",
                 ar: "<code>high</code> تساوي 100 لا 400، لأن المُقيِّس دُرِّب على القائمة التي أنتجتها خطوةُ الحصر. وتلك الحقيقة الواحدة هي الفرق بين مسار يعمل ومسار يضغط كل علامة بصمت &mdash; وهي من <code>.transform(values)</code> واحدة داخل <code>fit</code>." }
    },
    {
      id: "t9q7", type: "complete", level: "medium", topics: ["decorator"],
      q: { en: "Complete <code>Logged.transform</code> so it reports after the inner step has done its work and returns the inner result unchanged.",
           ar: "أكمل <code>Logged.transform</code> ليُبلّغ بعد أن تؤدي الخطوة الداخلية عملها ويُعيد النتيجة الداخلية بلا تغيير." },
      code: "class Logged(Step):\n    def __init__(self, step, name):\n        self.step = step\n        self.name = name\n\n    def fit(self, values):\n        print(f\"  [fit] {self.name}\")\n        self.step.fit(values)\n        return self\n\n    def transform(self, values):\n        # which body?",
      options: [
        { code: "out = self.step.transform(values)\nprint(f\"  [transform] {self.name}\")\nreturn out" },
        { code: "print(f\"  [transform] {self.name}\")\nreturn values" },
        { code: "out = self.transform(values)\nprint(f\"  [transform] {self.name}\")\nreturn out" },
        { code: "return self.step.transform(self.step.fit(values))" }
      ],
      answer: 0,
      explain: { en: "Delegate, then report, then hand back exactly what the inner step returned. The version that returns <code>values</code> without calling the inner step never calls it, so the decorator silently replaces the work with nothing &mdash; the pipeline still runs and the data comes out untransformed. The third calls <code>self.transform</code> instead of <code>self.step.transform</code>: infinite recursion, the same slip as the <a href=\"#l3-s3\">property getter in Lesson 3</a>. The fourth re-fits on every transform, which destroys the stored memory the whole of Lesson 8 was about.",
                 ar: "فوّض، ثم بلّغ، ثم أعد بالضبط ما أعادته الخطوة الداخلية. والنسخةُ التي تُعيد <code>values</code> لا تستدعي الخطوة الداخلية أبدًا، فيستبدل المزخرِفُ بالعمل لا شيء بصمت &mdash; فيظل المسار يعمل وتخرج البيانات غير محوَّلة. والثالث يستدعي <code>self.transform</code> بدل <code>self.step.transform</code>: تكرارٌ لا نهائي، وهي الزلّة نفسها في <a href=\"#l3-s3\">قارئ الخاصية في الدرس 3</a>. والرابع يعيد التدريب في كل تحويل، فيدمّر الذاكرة المخزَّنة التي كان الدرس 8 كله عنها." }
    },
    {
      id: "t9q8", type: "output", level: "medium", topics: ["decorator", "pipeline"],
      q: { en: "Write the lines this prints, in order. The wrapper prints before delegating in <code>fit</code>, and after delegating in <code>transform</code>.",
           ar: "اكتب الأسطر التي يطبعها بالترتيب. يطبع اللافُّ قبل التفويض في <code>fit</code>، وبعده في <code>transform</code>." },
      code: "class Logged(Step):\n    def __init__(self, step, name):\n        self.step = step\n        self.name = name\n\n    def fit(self, values):\n        print(f\"[fit] {self.name}\")\n        self.step.fit(values)\n        return self\n\n    def transform(self, values):\n        out = self.step.transform(values)\n        print(f\"[transform] {self.name}\")\n        return out\n\n\np = Pipeline([Logged(Clip(0, 100), \"clip\"),\n              Logged(MinMaxScaler(), \"scale\")])\np.fit([20, 55, 70, 85, 400])",
      blanks: [{ accept: ["[fit] clip\n[transform] clip\n[fit] scale\n[transform] scale"], lines: 4 }],
      explain: { en: "This is <code>Pipeline.fit</code> walking the chain, made visible. For each step it fits <em>and then transforms</em>, so the lines alternate rather than listing both fits first. If you expected <code>[fit] clip</code>, <code>[fit] scale</code>, then the transforms, you were reading <code>fit</code> as \"fit every step on the same data\" &mdash; which is exactly the bug in question 5.",
                 ar: "هذه <code>Pipeline.fit</code> تمشي في السلسلة، مرئيةً. فهي تدرّب كل خطوة <em>ثم تحوّلها</em>، فتتناوب الأسطر بدل سرد التدريبين أولًا. وإن توقعت <code>[fit] clip</code> ثم <code>[fit] scale</code> ثم التحويلين فقد كنت تقرأ <code>fit</code> على أنها «درّب كل خطوة على البيانات نفسها» &mdash; وهو بعينه خلل السؤال 5." }
    },
    {
      id: "t9q9", type: "match", level: "medium", topics: ["pipeline", "composite", "decorator", "order-rule"],
      q: { en: "Match each class to what it is for.", ar: "وصّل كل صنف بما هو له." },
      leftHead: { en: "Class", ar: "الصنف" },
      rightHead: { en: "What it is for", ar: "ما هو له" },
      pairs: [
        { l: { code: "Pipeline" },
          r: { en: "Holds many steps and chains their data, so the order has one owner and a second file cannot get it wrong.", ar: "يمسك بخطوات كثيرة ويصل بياناتها، فيكون للترتيب مالك واحد ولا يستطيع ملف ثانٍ إخطاءه." } },
        { l: { code: "Logged" },
          r: { en: "Holds one step and adds behaviour around it, without opening it or changing its result.", ar: "يمسك بخطوة واحدة ويضيف سلوكًا حولها، دون فتحها ولا تغيير نتيجتها." } },
        { l: { code: "Clip" },
          r: { en: "A step that learns nothing: its <code>fit</code> returns <code>self</code> so the pipeline can call it like any other.", ar: "خطوة لا تتعلّم شيئًا: فـ<code>fit</code> فيها تُعيد <code>self</code> ليستدعيها المسار كأي خطوة." } },
        { l: { code: "Step" },
          r: { en: "The promise every one of the others keeps, which is the only reason any of them can hold any other.", ar: "الوعد الذي يحفظه كل واحد من الباقين، وهو السبب الوحيد في قدرة أيٍّ منهم على إمساك الآخر." } }
      ],
      explain: { en: "Read the last row twice. <code>Pipeline</code> holding steps, <code>Logged</code> holding a step, a pipeline inside a pipeline, a decorator around a pipeline &mdash; every one of those combinations works for one reason, and it is not inheritance of behaviour. It is that all four answer the same two messages.",
                 ar: "اقرأ الصفّ الأخير مرتين. فـ <code>Pipeline</code> يمسك بخطوات، و<code>Logged</code> يمسك بخطوة، ومسارٌ داخل مسار، ومزخرِفٌ حول مسار &mdash; كل تلك التوليفات تعمل لسبب واحد، وليس هو وراثة السلوك. بل أن الأربعة تجيب الرسالتين نفسيهما." }
    },
    {
      id: "t9q10", type: "compare", level: "hard", topics: ["fit-leak", "pipeline"],
      q: { en: "The same pipeline, fitted on different rows. <code>test_rows</code> contains a 400. Which reading is right?",
           ar: "المسار نفسه، مدرَّبًا على صفوف مختلفة. و<code>test_rows</code> فيها 400. فأي قراءة صحيحة؟" },
      codeA: "train_rows = [40, 55, 70]\ntest_rows = [85, 400]\n\nright = Pipeline([Clip(0, 100), MinMaxScaler()])\nright.fit(train_rows)\nprint(right.transform(test_rows))",
      codeB: "train_rows = [40, 55, 70]\ntest_rows = [85, 400]\n\nwrong = Pipeline([Clip(0, 100), MinMaxScaler()])\nwrong.fit(train_rows + test_rows)\nprint(wrong.transform(test_rows))",
      options: [
        { en: "A prints <code>[1.5, 2.0]</code> and B prints <code>[0.75, 1.0]</code>. A's values go above 1.0 because the test rows really are outside the range it was fitted on, and saying so is the honest result; B looks tidier only because it was allowed to look at the rows it is being judged on.",
          ar: "تطبع أ <code>[1.5, 2.0]</code> وتطبع ب <code>[0.75, 1.0]</code>. وقيم أ تتجاوز 1.0 لأن صفوف الاختبار خارج المدى الذي دُرِّبت عليه فعلًا، وقولُ ذلك هو النتيجة الصادقة؛ وب تبدو أنظف فقط لأنها سُمح لها بالنظر إلى الصفوف التي تُحاكَم بها." },
        { en: "A is broken: a scaler must never return a value above 1.0, so the clip step should have prevented it.",
          ar: "أ مكسورة: فالمُقيِّس يجب ألا يُعيد قيمة فوق 1.0 أبدًا، وكان على خطوة الحصر أن تمنع ذلك." },
        { en: "Both print the same thing, because <code>Clip</code> caps the 400 in either case.",
          ar: "تطبع كلتاهما الشيء نفسه، لأن <code>Clip</code> يحصر 400 في الحالتين." },
        { en: "B is correct and A is a bug, because fitting on more data always gives a better range.",
          ar: "ب صحيحة وأ خلل، لأن التدريب على بيانات أكثر يعطي مدىً أفضل دائمًا." }
      ],
      answer: 0,
      explain: { en: "Both clip the 400 to 100; the difference is what <code>high</code> was stored as. In A the scaler only ever saw 40&ndash;70, so a clipped 100 is well beyond its top and 2.0 is the correct report of that fact. The tidier output is the dishonest one, which is the uncomfortable part of this question. The design lesson is the one the chapter keeps making: which rows <code>fit</code> sees is a rule, and once the pipeline owns the steps there is exactly one <code>fit</code> call in the program to get right.",
                 ar: "كلتاهما تحصر 400 إلى 100؛ والفرق في القيمة التي خُزّنت <code>high</code>. ففي أ لم يرَ المُقيِّس إلا 40&ndash;70، فـ 100 المحصورة تتجاوز قمته كثيرًا و2.0 هي التبليغ الصحيح عن تلك الحقيقة. والمُخرَج الأنظف هو غير الصادق، وذلك هو الجزء غير المريح في هذا السؤال. ودرسُ التصميم هو الذي يكرّره الفصل: فأي صفوف تراها <code>fit</code> قاعدةٌ، ومتى ملك المسارُ الخطوات صار في البرنامج استدعاء <code>fit</code> واحدٌ بالضبط يجب إصابته." }
    },
    {
      id: "t9q11", type: "multi", level: "hard", topics: ["composite", "decorator", "step-abc"],
      q: { en: "Select <strong>every</strong> combination that works with the classes as written, without a line being added.",
           ar: "اختر <strong>كل</strong> توليفة تعمل بالأصناف كما كُتبت، بلا إضافة سطر." },
      options: [
        { en: "<code>Pipeline([Pipeline([Clip(0, 100), MinMaxScaler()]), Round(1)])</code>",
          ar: "<code>Pipeline([Pipeline([Clip(0, 100), MinMaxScaler()]), Round(1)])</code>" },
        { en: "<code>Logged(Pipeline([Clip(0, 100), MinMaxScaler()]), \"whole\")</code>",
          ar: "<code>Logged(Pipeline([Clip(0, 100), MinMaxScaler()]), \"whole\")</code>" },
        { en: "<code>Pipeline([Logged(Clip(0, 100), \"clip\"), MinMaxScaler()])</code>",
          ar: "<code>Pipeline([Logged(Clip(0, 100), \"clip\"), MinMaxScaler()])</code>" },
        { en: "<code>Logged(Logged(MinMaxScaler(), \"inner\"), \"outer\")</code>",
          ar: "<code>Logged(Logged(MinMaxScaler(), \"inner\"), \"outer\")</code>" },
        { en: "<code>Pipeline([Clip(0, 100), \"minmax\"])</code>, naming the step as a string",
          ar: "<code>Pipeline([Clip(0, 100), \"minmax\"])</code>، بتسمية الخطوة نصًّا" }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first four all work, and nobody wrote code to allow any of them: a pipeline is a step, a decorator is a step, and both take steps, so every arrangement of them is automatically legal. That is the compounding return on a shared interface. The fifth fails because a string has no <code>fit</code> &mdash; it would raise <code>AttributeError: 'str' object has no attribute 'fit'</code> at fit time, which is exactly the job of <a href=\"#l8-s6\">the factory</a>: turn the string into a step <em>before</em> it reaches the list.",
                 ar: "الأربعة الأولى تعمل كلها، ولم يكتب أحد كودًا ليسمح بأيٍّ منها: فالمسار خطوة، والمزخرِف خطوة، وكلاهما يأخذ خطوات، فكل ترتيب لها قانوني تلقائيًا. وذلك هو المردود المتراكم للواجهة المشتركة. والخامسة تفشل لأن النصّ لا <code>fit</code> له &mdash; وسيرفع <code>AttributeError: 'str' object has no attribute 'fit'</code> وقت التدريب، وذلك بعينه عمل <a href=\"#l8-s6\">المصنع</a>: أن يحوّل النصّ خطوةً <em>قبل</em> أن يبلغ القائمة." }
    },
    {
      id: "t9q12", type: "mcq", level: "hard", topics: ["pattern-cost", "pipeline"],
      q: { en: "You are writing a notebook to answer one question today and delete tomorrow. Three preparation steps, one order, one file. Build a <code>Pipeline</code>?",
           ar: "تكتب دفترًا ليجيب سؤالًا واحدًا اليوم ويُحذف غدًا. ثلاث خطوات تهيئة وترتيب واحد وملف واحد. أتبني <code>Pipeline</code>؟" },
      options: [
        { en: "No. The pipeline buys you an order that cannot be got wrong in a <em>second</em> file, and there is no second file. Three calls in a row are clearer, and a traceback points straight at the step that failed.",
          ar: "لا. فالمسار يشتري لك ترتيبًا لا يمكن إخطاؤه في ملف <em>ثانٍ</em>، ولا ملف ثانيًا. وثلاثة استدعاءات متتابعة أوضح، والتتبّع يشير مباشرة إلى الخطوة التي فشلت." },
        { en: "Yes. Pipelines are the professional way to prepare data and should be used whenever more than one step is involved.",
          ar: "نعم. فالمسارات هي الطريقة المهنية لتهيئة البيانات وينبغي استعمالها كلما وُجدت أكثر من خطوة." },
        { en: "Yes, because without a pipeline the steps cannot share their fitted state.",
          ar: "نعم، لأن الخطوات بلا مسار لا تستطيع تقاسم حالتها المدرَّبة." },
        { en: "No, because a pipeline cannot hold fewer than four steps.",
          ar: "لا، لأن المسار لا يستطيع حمل أقل من أربع خطوات." }
      ],
      answer: 0,
      explain: { en: "Name the change, count the edits, name the cost &mdash; and here the change never comes. The costs are real and worth stating: one more class to understand, and a failure inside a nested pipeline produces a traceback that passes through <code>Pipeline.transform</code> before reaching the step that actually raised. The answer that calls a pipeline always professional is the habit this chapter argues against hardest, because it is phrased as professionalism; <a href=\"#l7-s2\">Lesson 7</a> spends a whole section on why \"always\" is the wrong shape for a design rule. The third is simply false &mdash; each step holds its own state whether or not a pipeline exists.",
                 ar: "سمِّ التغيير، وأحصِ التعديلات، وسمِّ الثمن &mdash; والتغيير هنا لا يأتي أبدًا. والأثمان حقيقية وتستحق القول: صنفٌ آخر تفهمه، وفشلٌ داخل مسار معشَّش يُنتج تتبّعًا يمرّ بـ <code>Pipeline.transform</code> قبل بلوغ الخطوة التي رفعت الخطأ فعلًا. والجوابُ الذي يسمّي المسار مهنيةً دائمًا هو العادة التي يخاصمها هذا الفصل أشدّ الخصومة، لأنها مصوغة مهنيةً؛ ويصرف <a href=\"#l7-s2\">الدرس 7</a> قسمًا كاملًا في لماذا «دائمًا» شكلٌ خاطئ لقاعدة تصميم. والثالث خاطئ ببساطة &mdash; فكل خطوة تحمل حالتها وُجد مسار أو لم يوجد." }
    }
  ]
};
