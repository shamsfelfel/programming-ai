/* ============================================================
   Chapter 2 tests A (core) and B (advanced).

   Sixteen questions each rather than Chapter 1's thirty: the
   chapter is two lectures, and docs/SPEC.md fixes the shape of
   a chapter test, not its length.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["chapter-02-test-a"] = {
  title: { en: "Chapter 2 Test A — Core", ar: "اختبار الفصل 2 أ — الأساسيات" },
  intro: {
    en: "Sixteen questions across both lessons, easy and medium. One question: did the two ideas stick &mdash; that a step remembers, and that everything which holds a step is itself a step? Wrong answers link to the paragraph to re-read.",
    ar: "ستة عشر سؤالًا على الدرسين، بالسهل والمتوسط. وسؤالٌ واحد: هل ثبتت الفكرتان &mdash; أن الخطوة تتذكّر، وأن كل ما يمسك بخطوة هو نفسه خطوة؟ والأجوبة الخاطئة ترتبط بالفقرة التي تعيد قراءتها."
  },
  questions: [
    {
      id: "c2a01", type: "tf", level: "easy", topics: ["fit-contract"],
      q: { en: "<code>fit</code> changes the object and returns it; <code>transform</code> changes nothing on the object and returns data.",
           ar: "<code>fit</code> تغيّر الكائن وتُعيده؛ و<code>transform</code> لا تغيّر شيئًا على الكائن وتُعيد بيانات." },
      truth: true,
      explain: { en: "Two verbs, two jobs, kept apart on purpose. Everything in the chapter &mdash; swapping strategies, chaining a pipeline, wrapping a decorator &mdash; depends on that separation holding.",
                 ar: "فعلان ومهمتان، مفصولتان بقصد. وكل ما في الفصل &mdash; مبادلة الاستراتيجيات، وتسلسل المسار، ولفّ المزخرِف &mdash; يتوقف على ثبات ذلك الفصل." }
    },
    {
      id: "c2a02", type: "output", level: "easy", topics: ["no-memory"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "def scale(values):\n    low = min(values)\n    high = max(values)\n    return [round((v - low) / (high - low), 3) for v in values]\n\n\nprint(scale([40, 55, 70, 85, 100]))\nprint(scale([70, 90]))",
      blanks: [{ accept: ["[0.0, 0.25, 0.5, 0.75, 1.0]\n[0.0, 1.0]"], lines: 2 }],
      explain: { en: "70 is 0.5 on one line and 0.0 on the next, from the same function. No error, just a wrong number &mdash; the ruler is rebuilt from whatever it is asked to measure.",
                 ar: "70 هي 0.5 في سطر و0.0 في التالي، من الدالة نفسها. ولا خطأ، بل رقم خاطئ فقط &mdash; فالمسطرة تُبنى من جديد مما يُطلب منها قياسه." }
    },
    {
      id: "c2a03", type: "fill", level: "easy", topics: ["step-memory"],
      q: { en: "Fill the blank so the value survives the end of <code>fit</code>.",
           ar: "أكمل الفراغ لتبقى القيمة بعد انتهاء <code>fit</code>." },
      code: "class MinMaxScaler:\n    def fit(self, values):\n        ____1____ = min(values)\n        self.high = max(values)\n        return self",
      blanks: [{ accept: ["self.low"], label: { en: "blank 1", ar: "الفراغ 1" } }],
      explain: { en: "A plain <code>low</code> is a local name and disappears when the method ends; <code>self.low</code> is written onto the object and outlives the call. That is the single difference between the broken version and the working one.",
                 ar: "<code>low</code> المجردة اسمٌ محلي يختفي بانتهاء الدالة؛ و<code>self.low</code> تُكتب على الكائن وتبقى بعد الاستدعاء. وذلك هو الفرق الوحيد بين النسخة المكسورة والعاملة." }
    },
    {
      id: "c2a04", type: "mcq", level: "easy", topics: ["strategy"],
      q: { en: "Why is one class per scaling method better than one class with <code>if self.method == ...</code>?",
           ar: "لماذا صنفٌ لكل أسلوب تقييس أفضل من صنف واحد بـ <code>if self.method == ...</code>؟" },
      options: [
        { en: "Because the one-class version needs the same chain in both <code>fit</code> and <code>transform</code>, and the two must agree for ever; two separate classes cannot disagree.",
          ar: "لأن نسخة الصنف الواحد تحتاج السلسلة نفسها في <code>fit</code> و<code>transform</code>، وعلى الاثنتين أن تتوافقا إلى الأبد؛ وصنفان منفصلان لا يستطيعان التخالف." },
        { en: "Because classes execute faster than <code>if</code> statements.",
          ar: "لأن الأصناف تُنفَّذ أسرع من جمل <code>if</code>." },
        { en: "Because Python does not allow an attribute to be set inside an <code>if</code>.",
          ar: "لأن بايثون لا تتيح ضبط خاصية داخل <code>if</code>." },
        { en: "Because a class with a <code>method</code> parameter cannot store any state.",
          ar: "لأن الصنف ذا معامل <code>method</code> لا يستطيع تخزين أي حالة." }
      ],
      answer: 0,
      explain: { en: "Duplication of the <em>cases</em>, not the lines, is the cost. There is a second cost worth naming: the one-class object carries attributes that are meaningless half the time, since a min-max scaler has no <code>mean</code>.",
                 ar: "تكرار <em>الحالات</em> لا الأسطر هو الثمن. وثمّة ثمن ثانٍ يستحق التسمية: فكائن الصنف الواحد يحمل خصائص بلا معنى نصف الوقت، إذ لا <code>mean</code> لمُقيِّس min-max." }
    },
    {
      id: "c2a05", type: "tf", level: "easy", topics: ["step-abc"],
      q: { en: "A class must inherit from <code>Step</code> before a pipeline can use it.",
           ar: "يجب أن يرث الصنف من <code>Step</code> قبل أن يستطيع المسار استعماله." },
      truth: false,
      explain: { en: "The pipeline calls <code>fit</code> and <code>transform</code> and never checks a type, so anything with those two methods works &mdash; <a href=\"#l6-s4\">duck typing</a>. <code>Step</code> is worth having for a different reason: a half-written subclass then fails at creation with a message naming the missing method, instead of failing later when data reaches it.",
                 ar: "يستدعي المسار <code>fit</code> و<code>transform</code> ولا يفحص نوعًا أبدًا، فيعمل أي شيء يملك الدالتين &mdash; <a href=\"#l6-s4\">تصنيف البطة</a>. و<code>Step</code> يستحق الوجود لسبب آخر: فالوريث نصف المكتوب يفشل عندئذٍ عند الإنشاء برسالة تسمّي الدالة المفقودة، بدل أن يفشل لاحقًا عند وصول البيانات إليه." }
    },
    {
      id: "c2a06", type: "output", level: "medium", topics: ["step-memory"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "class MinMaxScaler:\n    def fit(self, values):\n        self.low = min(values)\n        self.high = max(values)\n        return self\n\n    def transform(self, values):\n        span = self.high - self.low\n        return [round((v - self.low) / span, 3) for v in values]\n\n\ns = MinMaxScaler().fit([40, 55, 70, 85, 100])\nprint(s.transform([70]))\nprint(s.transform([70, 90]))",
      blanks: [{ accept: ["[0.5]\n[0.5, 0.833]"], lines: 2 }],
      explain: { en: "70 is 0.5 in both calls, because both read the stored 40 and 100. Compare with question 2, which is the same data through the version with no memory.",
                 ar: "70 هي 0.5 في الاستدعاءين، لأن كليهما يقرأ 40 و100 المخزَّنتين. قارن بالسؤال 2، وهو البيانات نفسها عبر النسخة بلا ذاكرة." }
    },
    {
      id: "c2a07", type: "error", level: "medium", topics: ["step-memory"],
      q: { en: "This class has a <code>fit</code> and still forgets. Click the line that defeats the memory.",
           ar: "لهذا الصنف <code>fit</code> ومع ذلك ينسى. انقر السطر الذي يهزم الذاكرة." },
      code: "class MinMaxScaler:\n    def fit(self, values):\n        self.low = min(values)\n        self.high = max(values)\n        return self\n\n    def transform(self, values):\n        low = min(values)\n        high = max(values)\n        return [round((v - low) / (high - low), 3) for v in values]",
      answer: 8,
      explain: { en: "<code>transform</code> recomputes from its own argument and never reads what <code>fit</code> stored. The giveaway is that <code>self.low</code> and <code>self.high</code> are written and never read &mdash; an attribute nothing reads is nearly always a bug.",
                 ar: "<code>transform</code> تعيد الحساب من وسيطها ولا تقرأ ما خزّنته <code>fit</code> أبدًا. والعلامة الفاضحة أن <code>self.low</code> و<code>self.high</code> تُكتبان ولا تُقرآن &mdash; والخاصية التي لا يقرأها شيء خللٌ في الغالب الأعمّ." }
    },
    {
      id: "c2a08", type: "match", level: "medium", topics: ["strategy", "factory", "pipeline", "decorator"],
      q: { en: "Match each pattern to the sentence that describes it.",
           ar: "وصّل كل نمط بالجملة التي تصفه." },
      leftHead: { en: "Pattern", ar: "النمط" },
      rightHead: { en: "Description", ar: "الوصف" },
      pairs: [
        { l: { en: "strategy", ar: "الاستراتيجية" },
          r: { en: "Several interchangeable ways of doing one job; the caller holds one and never asks which.", ar: "عدة طرق قابلة للتبادل في أداء مهمة؛ يمسك المستدعي بواحدة ولا يسأل أيّها." } },
        { l: { en: "factory", ar: "المصنع" },
          r: { en: "The one place a name becomes an object.", ar: "الموضع الوحيد الذي يصير فيه الاسم كائنًا." } },
        { l: { en: "composite (pipeline)", ar: "المركَّب (المسار)" },
          r: { en: "A thing that holds several things like itself, and can therefore nest.", ar: "شيءٌ يمسك بأشياء عدة مثله، فيستطيع التعشيش." } },
        { l: { en: "decorator", ar: "المزخرِف" },
          r: { en: "A thing that holds one thing like itself and adds behaviour around it.", ar: "شيءٌ يمسك بشيء واحد مثله ويضيف سلوكًا حوله." } }
      ],
      explain: { en: "Three of the four only work because the thing held and the thing holding answer the same messages. The factory is the odd one out: it is about construction, not about composition.",
                 ar: "ثلاثة من الأربعة لا تعمل إلا لأن المُمسَك به والمُمسِك يجيبان الرسائل نفسها. والمصنع هو الشاذّ: فهو عن الإنشاء لا عن التركيب." }
    },
    {
      id: "c2a09", type: "output", level: "medium", topics: ["pipeline"],
      q: { en: "<code>Clip(0, 100)</code> caps into range, <code>MinMaxScaler</code> scales to 0&ndash;1. Write what this prints.",
           ar: "<code>Clip(0, 100)</code> يحصر في المدى، و<code>MinMaxScaler</code> يقيس إلى 0&ndash;1. اكتب ما يطبعه هذا." },
      code: "raw = [20, 55, 70, 85, 400]\n\nprepare = Pipeline([Clip(0, 100), MinMaxScaler()])\nprepare.fit(raw)\nprint(prepare.transform([400]))",
      blanks: [{ accept: ["[1.0]"], ph: "[1.0]" }],
      explain: { en: "400 is clipped to 100, and 100 is the top of the range the scaler stored, so the answer is 1.0 &mdash; the same treatment a 400 received during fitting. That consistency between training and later use is the entire reason the pipeline exists.",
                 ar: "تُحصر 400 إلى 100، و100 هي قمة المدى الذي خزّنه المُقيِّس، فيكون الجواب 1.0 &mdash; المعاملة نفسها التي نالتها 400 أثناء التدريب. وذلك الاتساق بين التدريب والاستعمال اللاحق هو كل سبب وجود المسار." }
    },
    {
      id: "c2a10", type: "order", level: "medium", topics: ["pipeline", "order-rule"],
      q: { en: "Put in order what <code>Pipeline.fit</code> does with two steps.",
           ar: "رتّب ما تفعله <code>Pipeline.fit</code> بخطوتين." },
      items: [
        { en: "Fit the first step on the data it was given.", ar: "درّب الخطوة الأولى على البيانات التي أُعطيتها." },
        { en: "Transform that data with the first step, and keep the result.", ar: "حوّل تلك البيانات بالخطوة الأولى، واحتفظ بالنتيجة." },
        { en: "Fit the second step on <em>that result</em>, not on the original data.", ar: "درّب الخطوة الثانية على <em>تلك النتيجة</em> لا على البيانات الأصلية." },
        { en: "Transform again with the second step, and discard the result.", ar: "حوّل مرة أخرى بالخطوة الثانية، وتجاهل النتيجة." },
        { en: "Return the pipeline itself, with every step now carrying its own memory.", ar: "أعد المسار نفسه، وكل خطوة تحمل الآن ذاكرتها." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 3 is the one that matters: fit each step on what it will actually receive. The last transform really is thrown away &mdash; it existed only to feed a next step that is not there.",
                 ar: "الخطوة 3 هي المهمة: درّب كل خطوة على ما ستستقبله فعلًا. والتحويل الأخير يُرمى فعلًا &mdash; فقد وُجد ليغذّي خطوة تالية ليست موجودة." }
    },
    {
      id: "c2a11", type: "tf", level: "medium", topics: ["composite"],
      q: { en: "<code>Pipeline</code> both <em>is</em> a step and <em>has</em> steps, and that is deliberate rather than an accident.",
           ar: "<code>Pipeline</code> <em>هو</em> خطوة و<em>له</em> خطوات، وذلك بقصد لا مصادفةً." },
      truth: true,
      explain: { en: "<a href=\"#l5-s8\">Lesson 5's rule</a> was inherit for <em>is a</em>, compose for <em>has a</em>; a pipeline is the uncommon case where both apply at once. Being a step is what lets it go inside another pipeline; having steps is what lets it hold them. Remove either and nesting stops working.",
                 ar: "كانت <a href=\"#l5-s8\">قاعدة الدرس 5</a> أن تَرِث لـ«هو» وتركّب لـ«له»؛ والمسار هو الحالة النادرة التي تنطبق فيها الاثنتان معًا. فكونه خطوةً يتيح له الدخول في مسار آخر؛ وكونُ له خطوات يتيح له إمساكها. واحذف أيًّا منهما يكفّ التعشيش عن العمل." }
    },
    {
      id: "c2a12", type: "complete", level: "medium", topics: ["pipeline"],
      q: { en: "Complete <code>Pipeline.transform</code>.", ar: "أكمل <code>Pipeline.transform</code>." },
      code: "class Pipeline(Step):\n    def __init__(self, steps):\n        self.steps = steps\n\n    def transform(self, values):\n        # which body?",
      options: [
        { code: "for step in self.steps:\n    values = step.transform(values)\nreturn values" },
        { code: "for step in self.steps:\n    step.transform(values)\nreturn values" },
        { code: "for step in self.steps:\n    values = step.fit(values).transform(values)\nreturn values" },
        { code: "return self.steps[-1].transform(values)" }
      ],
      answer: 0,
      explain: { en: "Each step's output becomes the next one's input, which is what <code>values = </code> does. The version with a bare <code>step.transform(values)</code> drops the reassignment, so every step transforms the original data and the result is thrown away &mdash; the function returns exactly what it was given. The third refits on every call, destroying the memory. The fourth skips every step but the last.",
                 ar: "يصير مُخرَج كل خطوة مُدخَل التالية، وذلك ما تفعله <code>values = </code>. والنسخةُ ذات <code>step.transform(values)</code> المجردة تُسقط إعادة الإسناد، فتحوّل كل خطوة البيانات الأصلية وتُرمى النتيجة &mdash; فتُعيد الدالة بالضبط ما أُعطيته. والثالث يعيد التدريب في كل استدعاء فيدمّر الذاكرة. والرابع يتخطى كل خطوة إلا الأخيرة." }
    },
    {
      id: "c2a13", type: "output", level: "medium", topics: ["decorator"],
      q: { en: "Write the two lines this prints, in order.",
           ar: "اكتب السطرين الذين يطبعهما بالترتيب." },
      code: "class Logged(Step):\n    def __init__(self, step, name):\n        self.step = step\n        self.name = name\n\n    def fit(self, values):\n        print(f\"[fit] {self.name}\")\n        self.step.fit(values)\n        return self\n\n    def transform(self, values):\n        out = self.step.transform(values)\n        print(f\"[transform] {self.name}\")\n        return out\n\n\nw = Logged(MinMaxScaler(), \"scale\")\nw.fit([40, 55, 70, 85, 100])\nw.transform([85])",
      blanks: [{ accept: ["[fit] scale\n[transform] scale"], lines: 2 }],
      explain: { en: "One line per call. Note that <code>MinMaxScaler</code> was not edited to make this happen &mdash; which is the whole value of a decorator over adding a <code>verbose=True</code> flag to every step.",
                 ar: "سطرٌ لكل استدعاء. ولاحظ أن <code>MinMaxScaler</code> لم يُعدَّل ليحدث هذا &mdash; وذلك هو كل قيمة المزخرِف على إضافة راية <code>verbose=True</code> إلى كل خطوة." }
    },
    {
      id: "c2a14", type: "mcq", level: "medium", topics: ["factory"],
      q: { en: "The scaling method is named in a config file as the string <code>\"standard\"</code>. What is the factory's job?",
           ar: "يُسمّى أسلوب التقييس في ملف تهيئة نصًّا <code>\"standard\"</code>. فما مهمة المصنع؟" },
      options: [
        { en: "To be the only place in the program where that string becomes a class, so renaming or replacing a scaler touches one function.",
          ar: "أن يكون الموضع الوحيد في البرنامج الذي يصير فيه ذلك النصّ صنفًا، فتمسّ إعادةُ تسمية مُقيِّس أو استبداله دالةً واحدة." },
        { en: "To validate the data before any scaler sees it.",
          ar: "أن يتحقّق من البيانات قبل أن يراها أي مُقيِّس." },
        { en: "To fit the scaler, so callers do not have to.",
          ar: "أن يدرّب المُقيِّس، فلا يحتاج المستدعون إلى ذلك." },
        { en: "To make the scalers interchangeable, which they are not without it.",
          ar: "أن يجعل المُقيِّسات قابلة للتبادل، وهي ليست كذلك بدونه." }
      ],
      answer: 0,
      explain: { en: "A factory maps names to classes and does nothing else &mdash; it does not fit, validate, or make anything interchangeable. The answer about making the scalers interchangeable confuses the factory with the shared interface, which is what actually makes the scalers swappable, and which exists with or without a factory.",
                 ar: "المصنع يربط الأسماء بالأصناف ولا يفعل غير ذلك &mdash; فهو لا يدرّب ولا يتحقّق ولا يجعل شيئًا قابلًا للتبادل. والجوابُ عن جعل المُقيِّسات قابلة للمبادلة يخلط المصنع بالواجهة المشتركة التي هي ما يجعل المُقيِّسات قابلة للمبادلة فعلًا، وهي موجودة بمصنع أو بلا مصنع." }
    },
    {
      id: "c2a15", type: "compare", level: "medium", topics: ["order-rule", "pipeline"],
      q: { en: "Preparing data in two files, against one pipeline object. What is the real difference?",
           ar: "تهيئة البيانات في ملفين، مقابل كائن مسار واحد. فما الفرق الحقيقي؟" },
      codeA: "# train.py\ncapped = clip.fit(raw).transform(raw)\nready = scaler.fit(capped).transform(capped)\n\n# desk.py, written weeks later\nready = scaler.transform(new_mark)",
      codeB: "# prepare.py\nprepare = Pipeline([Clip(0, 100), MinMaxScaler()])\nprepare.fit(raw)\n\n# desk.py\nready = prepare.transform(new_mark)",
      options: [
        { en: "A repeats the order in two files, so the second can skip a step &mdash; as it has, silently. B's second file cannot, because it no longer knows there are steps.",
          ar: "أ تكرّر الترتيب في ملفين، فيستطيع الثاني تخطّي خطوة &mdash; وقد فعل بصمت. ولا يستطيع ملف ب الثاني ذلك، لأنه لم يعد يعلم أن ثمّة خطوات." },
        { en: "B is shorter, which is the main benefit.",
          ar: "ب أقصر، وتلك هي الفائدة الرئيسة." },
        { en: "A is faster, because it avoids a loop.",
          ar: "أ أسرع، لأنها تتجنب حلقة." },
        { en: "They are equivalent as long as both files are written by the same person.",
          ar: "متكافئتان ما دام الملفان بيد الشخص نفسه." }
      ],
      answer: 0,
      explain: { en: "<code>desk.py</code> in A has already forgotten the clip step, and with ordinary marks it makes no difference &mdash; so the bug sits there doing nothing until a clerk types 400. The answer that trusts one author is the comforting one, and it is wrong: the same person writing weeks apart is two people for this purpose.",
                 ar: "<code>desk.py</code> في أ نسي خطوةَ الحصر أصلًا، ومع العلامات العادية لا يُحدث ذلك فرقًا &mdash; فيستقر الخلل هناك لا يفعل شيئًا حتى يكتب موظف 400. والجوابُ الذي يتّكل على وحدة الكاتب مطمئن وهو خاطئ: فالشخص نفسه يكتب بفارق أسابيع شخصان في هذا الباب." }
    },
    {
      id: "c2a16", type: "multi", level: "medium", topics: ["template-method", "step-abc", "composite"],
      q: { en: "Select <strong>every</strong> statement that is true of the <code>Step</code> base class.",
           ar: "اختر <strong>كل</strong> عبارة صحيحة عن الصنف الأساس <code>Step</code>." },
      options: [
        { en: "A subclass missing <code>transform</code> fails with <code>TypeError</code> when it is created.",
          ar: "الوريث الفاقد <code>transform</code> يفشل بـ <code>TypeError</code> عند إنشائه." },
        { en: "<code>fit_transform</code> is written once there and inherited by every step.",
          ar: "<code>fit_transform</code> تُكتب مرة هناك ويرثها كل خطوة." },
        { en: "<code>Pipeline</code> inherits from it, which is part of why a pipeline can be used as a step.",
          ar: "<code>Pipeline</code> يرث منه، وذلك جزء من سبب إمكان استعمال المسار خطوةً." },
        { en: "It forces every subclass to store the same attributes.",
          ar: "يُلزم كل وريث بتخزين الخصائص نفسها." }
      ],
      answer: [0, 1, 2],
      explain: { en: "The first three are what an abstract base actually buys: an early named failure, a home for shared code, and a declared promise. The fourth is the common misconception &mdash; an interface is an agreement about messages, never about storage, which is why <code>MinMaxScaler</code> stores a range and <code>StandardScaler</code> stores a mean and both are steps.",
                 ar: "الثلاثة الأولى هي ما يشتريه الأساس المجرّد فعلًا: فشلٌ مبكر مسمّى، وبيتٌ للكود المشترك، ووعدٌ معلن. والرابعة هي الوهم الشائع &mdash; فالواجهة اتفاقٌ على الرسائل لا على التخزين أبدًا، ولهذا يخزّن <code>MinMaxScaler</code> مدىً ويخزّن <code>StandardScaler</code> متوسطًا وكلاهما خطوة." }
    }
  ]
};

window.OOPBanks["chapter-02-test-b"] = {
  title: { en: "Chapter 2 Test B — Advanced", ar: "اختبار الفصل 2 ب — المتقدم" },
  intro: {
    en: "Sixteen harder questions. Several combine Chapter 2 with Chapter 1, and several have answers that are uncomfortable &mdash; code that is wrong and raises nothing. When you disagree, run the program before deciding the test is wrong.",
    ar: "ستة عشر سؤالًا أصعب. وعدد منها يدمج الفصل 2 بالفصل 1، ولعدد منها أجوبة غير مريحة &mdash; كودٌ خطأ ولا يرفع شيئًا. وحين تخالف فشغّل البرنامج قبل أن تحكم بخطأ الاختبار."
  },
  questions: [
    {
      id: "c2b01", type: "output", level: "hard", topics: ["pipeline", "order-rule"],
      q: { en: "The two steps in the opposite order. Write what this prints.",
           ar: "الخطوتان بالترتيب المعاكس. اكتب ما يطبعه هذا." },
      code: "raw = [20, 55, 70, 85, 400]\n\nswapped = Pipeline([MinMaxScaler(), Clip(0, 100)])\nswapped.fit(raw)\nprint(swapped.transform(raw))",
      blanks: [{ accept: ["[0, 0.092, 0.132, 0.171, 1.0]", "[0.0, 0.092, 0.132, 0.171, 1.0]"], wide: true }],
      explain: { en: "Scaling first lets the 400 define the top of the range, so every real mark is crushed into the bottom fifth &mdash; 55 is 0.092 instead of 0.438. Clipping to 0&ndash;100 afterwards does nothing, because everything is already between 0 and 1. The program runs, prints, and is wrong.",
                 ar: "التقييس أولًا يدع 400 تعرّف قمة المدى، فتُسحق كل علامة حقيقية في الخمس الأدنى &mdash; فـ 55 هي 0.092 بدل 0.438. ولا يفعل الحصر إلى 0&ndash;100 بعدها شيئًا، لأن كل شيء بين 0 و1 أصلًا. فالبرنامج يعمل ويطبع وهو خطأ." }
    },
    {
      id: "c2b02", type: "output", level: "hard", topics: ["pipeline", "fit-contract"],
      q: { en: "<code>fit</code> here does not chain <code>.transform</code>. Write what this prints.",
           ar: "<code>fit</code> هنا لا تسلسل <code>.transform</code>. اكتب ما يطبعه هذا." },
      code: "class BadPipeline(Step):\n    def __init__(self, steps):\n        self.steps = steps\n\n    def fit(self, values):\n        for step in self.steps:\n            step.fit(values)\n        return self\n\n    def transform(self, values):\n        for step in self.steps:\n            values = step.transform(values)\n        return values\n\n\nraw = [20, 55, 70, 85, 400]\np = BadPipeline([Clip(0, 100), MinMaxScaler()])\np.fit(raw)\nprint(p.transform(raw))",
      blanks: [{ accept: ["[0.0, 0.092, 0.132, 0.171, 0.211]"], wide: true }],
      explain: { en: "The scaler was fitted on the raw marks, so it stored <code>high = 400</code>. At transform time the clip step runs first and nothing ever reaches 400 again, so the largest value the scaler is given is 100, which maps to 0.211 rather than 1.0 &mdash; the whole class is compressed into the bottom fifth of the scale. No exception, no warning. The two methods must see the same sequence of data.",
                 ar: "دُرِّب المُقيِّس على العلامات الخام، فخزّن <code>high = 400</code>. ووقت التحويل تُنفَّذ خطوة الحصر أولًا ولا يبلغ شيء 400 ثانيةً، فأكبر قيمة تصل المُقيِّس هي 100 وتُربط بـ 0.211 لا 1.0 &mdash; فيُضغط الصفّ كله في الخمس الأدنى من المقياس. ولا استثناء ولا تحذير. وعلى الدالتين أن تريا تسلسل البيانات نفسه." }
    },
    {
      id: "c2b03", type: "trace", level: "hard", topics: ["pipeline", "step-memory"],
      q: { en: "Trace the chain. What does each end up holding?",
           ar: "تتبّع السلسلة. فماذا ينتهي كلٌّ إلى حمله؟" },
      code: "raw = [20, 55, 70, 85, 400]\n\nprepare = Pipeline([Clip(0, 100), MinMaxScaler()])\nprepare.fit(raw)\n\nscaler = prepare.steps[1]\nout = prepare.transform([400])",
      blanks: [
        { accept: ["20"], label: { en: "<code>scaler.low</code>", ar: "<code>scaler.low</code>" } },
        { accept: ["100"], label: { en: "<code>scaler.high</code>", ar: "<code>scaler.high</code>" } },
        { accept: ["[1.0]"], label: { en: "<code>out</code>", ar: "<code>out</code>" } }
      ],
      explain: { en: "<code>high</code> is 100 because the scaler was fitted after clipping. A later 400 is clipped to 100 and lands on 1.0 &mdash; exactly the treatment it received during fitting, which is the consistency the pipeline exists to guarantee. Compare with question 2, where the same data through a broken <code>fit</code> gives 0.211.",
                 ar: "<code>high</code> تساوي 100 لأن المُقيِّس دُرِّب بعد الحصر. و400 لاحقة تُحصر إلى 100 وتحلّ على 1.0 &mdash; وهي بالضبط المعاملة التي نالتها أثناء التدريب، وذلك الاتساق هو ما وُجد المسار ليضمنه. قارن بالسؤال 2 حيث تعطي البيانات نفسها عبر <code>fit</code> مكسورة 0.211." }
    },
    {
      id: "c2b04", type: "error", level: "hard", topics: ["decorator"],
      q: { en: "This decorator makes the pipeline return the data unchanged, and raises nothing. Click the line responsible.",
           ar: "يجعل هذا المزخرِف المسارَ يُعيد البيانات بلا تغيير، ولا يرفع شيئًا. انقر السطر المسؤول." },
      code: "class Logged(Step):\n    def __init__(self, step, name):\n        self.step = step\n        self.name = name\n\n    def fit(self, values):\n        print(f\"[fit] {self.name}\")\n        self.step.fit(values)\n        return self\n\n    def transform(self, values):\n        print(f\"[transform] {self.name}\")\n        return values",
      answer: 13,
      explain: { en: "Line 13 returns the data it was given instead of delegating, so the wrapped step never runs during <code>transform</code> and its work silently disappears. It still prints, so the logs look perfect and suggest everything ran. A decorator must pass the call through: <code>out = self.step.transform(values)</code> and return <code>out</code>. Note how a decorator that forgets to delegate is strictly worse than no decorator at all &mdash; it replaces the behaviour rather than adding to it.",
                 ar: "السطر 13 يُعيد البيانات التي أُعطيها بدل التفويض، فلا تُنفَّذ الخطوة الملفوفة أثناء <code>transform</code> أبدًا ويختفي عملها بصمت. وهو يظل يطبع، فتبدو السجلات مثاليةً وتوحي بأن كل شيء نُفِّذ. وعلى المزخرِف أن يمرّر الاستدعاء: <code>out = self.step.transform(values)</code> ثم يُعيد <code>out</code>. ولاحظ أن مزخرِفًا ينسى التفويض أسوأ قطعًا من لا مزخرِف &mdash; فهو يستبدل السلوك بدل أن يضيف إليه." },
      solution: { code: "    def transform(self, values):\n        out = self.step.transform(values)\n        print(f\"[transform] {self.name}\")\n        return out" }
    },
    {
      id: "c2b05", type: "output", level: "hard", topics: ["decorator", "pipeline"],
      q: { en: "Both steps are wrapped. Write every line this prints, in order.",
           ar: "كلتا الخطوتين ملفوفة. اكتب كل سطر يطبعه بالترتيب." },
      code: "p = Pipeline([Logged(Clip(0, 100), \"clip\"),\n              Logged(MinMaxScaler(), \"scale\")])\np.fit([20, 55, 70, 85, 400])\np.transform([70])",
      blanks: [{ accept: ["[fit] clip\n[transform] clip\n[fit] scale\n[transform] scale\n[transform] clip\n[transform] scale"], lines: 6,
                 hint: { en: "<code>fit</code> prints before delegating; <code>transform</code> prints after. Remember <code>Pipeline.fit</code> also transforms.",
                         ar: "<code>fit</code> تطبع قبل التفويض؛ و<code>transform</code> تطبع بعده. وتذكّر أن <code>Pipeline.fit</code> تحوّل أيضًا." } }],
      explain: { en: "The first four lines are <code>fit</code> walking the chain &mdash; fit clip, transform clip, fit scale, transform scale &mdash; which is the subtle line of Lesson 9 made visible without a debugger. The last two are the separate <code>transform</code> call, which fits nothing. If you expected four lines, you read <code>Pipeline.fit</code> as fitting every step on the same data.",
                 ar: "الأسطر الأربعة الأولى هي <code>fit</code> وهي تمشي في السلسلة &mdash; درّب clip، وحوّل clip، ودرّب scale، وحوّل scale &mdash; وذلك سطر الدرس 9 الدقيق مرئيًّا بلا منقّح. والأخيران هما استدعاء <code>transform</code> المنفصل الذي لا يدرّب شيئًا. وإن توقعت أربعة أسطر فقد قرأت <code>Pipeline.fit</code> على أنها تدرّب كل خطوة على البيانات نفسها." }
    },
    {
      id: "c2b06", type: "multi", level: "hard", topics: ["composite", "decorator", "step-abc"],
      q: { en: "Select <strong>every</strong> arrangement that works with the classes as written.",
           ar: "اختر <strong>كل</strong> ترتيب يعمل بالأصناف كما كُتبت." },
      options: [
        { en: "<code>Pipeline([Pipeline([Clip(0, 100), MinMaxScaler()]), Round(1)])</code>",
          ar: "<code>Pipeline([Pipeline([Clip(0, 100), MinMaxScaler()]), Round(1)])</code>" },
        { en: "<code>Logged(Pipeline([Clip(0, 100), MinMaxScaler()]), \"whole\")</code>",
          ar: "<code>Logged(Pipeline([Clip(0, 100), MinMaxScaler()]), \"whole\")</code>" },
        { en: "<code>Logged(Logged(MinMaxScaler(), \"inner\"), \"outer\")</code>",
          ar: "<code>Logged(Logged(MinMaxScaler(), \"inner\"), \"outer\")</code>" },
        { en: "<code>Pipeline([])</code> with no steps at all",
          ar: "<code>Pipeline([])</code> بلا خطوات إطلاقًا" },
        { en: "<code>Pipeline([Clip(0, 100), \"minmax\"])</code>, naming a step as a string",
          ar: "<code>Pipeline([Clip(0, 100), \"minmax\"])</code>، بتسمية خطوة نصًّا" }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first three work because a pipeline is a step and a decorator is a step, and no code was written to allow any particular nesting. The fourth is the interesting one: an empty pipeline is perfectly legal and returns its input unchanged, because the loop body simply never runs &mdash; a useful identity, and a reminder that a loop over an empty list is not an error. The fifth fails with <code>AttributeError: 'str' object has no attribute 'fit'</code>, which is exactly what <a href=\"#l8-s6\">the factory</a> exists to prevent by converting the name before it reaches the list.",
                 ar: "الثلاثة الأولى تعمل لأن المسار خطوة والمزخرِف خطوة، ولم يُكتب كود ليسمح بأي تعشيش بعينه. والرابعة هي المثيرة: فالمسار الفارغ قانوني تمامًا ويُعيد مُدخَله بلا تغيير، لأن جسد الحلقة لا يُنفَّذ أبدًا &mdash; وهي محايدةٌ مفيدة، وتذكيرٌ بأن حلقةً على قائمة فارغة ليست خطأً. والخامسة تفشل بـ <code>AttributeError: 'str' object has no attribute 'fit'</code>، وذلك بعينه ما وُجد <a href=\"#l8-s6\">المصنع</a> لمنعه بتحويل الاسم قبل أن يبلغ القائمة." }
    },
    {
      id: "c2b07", type: "compare", level: "hard", topics: ["fit-leak"],
      q: { en: "Which reading of this pair is honest?",
           ar: "أي قراءة لهذا الزوج صادقة؟" },
      codeA: "train_rows = [40, 55, 70]\ntest_rows = [85, 400]\n\nright = Pipeline([Clip(0, 100), MinMaxScaler()])\nright.fit(train_rows)\nprint(right.transform(test_rows))",
      codeB: "train_rows = [40, 55, 70]\ntest_rows = [85, 400]\n\nwrong = Pipeline([Clip(0, 100), MinMaxScaler()])\nwrong.fit(train_rows + test_rows)\nprint(wrong.transform(test_rows))",
      options: [
        { en: "A prints <code>[1.5, 2.0]</code>; B prints <code>[0.75, 1.0]</code>. A's values exceed 1.0 because those rows really are outside everything it was fitted on, and reporting that is correct. B only looks neat because it was allowed to see the rows it is meant to be judged on.",
          ar: "تطبع أ <code>[1.5, 2.0]</code>؛ وتطبع ب <code>[0.75, 1.0]</code>. وقيم أ تتجاوز 1.0 لأن تلك الصفوف خارج كل ما دُرِّبت عليه فعلًا، والتبليغ عن ذلك صحيح. وب تبدو أنيقة فقط لأنها سُمح لها برؤية الصفوف التي يُفترض أن تُحاكَم بها." },
        { en: "A has a bug: a 0&ndash;1 scaler must never emit a value above 1.0.",
          ar: "في أ خلل: فمُقيِّس 0&ndash;1 يجب ألا يُصدر قيمة فوق 1.0 أبدًا." },
        { en: "Both print the same, since <code>Clip</code> caps the 400 either way.",
          ar: "تطبعان الشيء نفسه، إذ يحصر <code>Clip</code> قيمة 400 في الحالتين." },
        { en: "B is right, because a scaler fitted on more data has a more accurate range.",
          ar: "ب صحيحة، لأن المُقيِّس المدرَّب على بيانات أكثر مداه أدقّ." }
      ],
      answer: 0,
      explain: { en: "Both clip the 400 to 100; what differs is the stored <code>high</code>. In A the scaler saw only 40&ndash;70, so a clipped 100 sits well beyond its top and 2.0 reports that faithfully. The uncomfortable part is that the <em>tidier</em> output is the dishonest one &mdash; which is why this rule has to be a rule rather than something you notice. Once the pipeline owns the steps there is exactly one <code>fit</code> call in the program to get right.",
                 ar: "كلتاهما تحصر 400 إلى 100؛ والمختلف هو <code>high</code> المخزَّنة. ففي أ لم يرَ المُقيِّس إلا 40&ndash;70، فـ 100 المحصورة تقع بعيدًا فوق قمته و2.0 تُبلّغ ذلك بأمانة. والجزء غير المريح أن المُخرَج <em>الأنظف</em> هو غير الصادق &mdash; ولهذا وجب أن تكون هذه قاعدة لا شيئًا تلاحظه. ومتى ملك المسارُ الخطوات صار في البرنامج استدعاء <code>fit</code> واحدٌ بالضبط يجب إصابته." }
    },
    {
      id: "c2b08", type: "complete", level: "hard", topics: ["template-method", "step-abc"],
      q: { en: "Which <code>fit_transform</code> works for every subclass, including ones not yet written?",
           ar: "أي <code>fit_transform</code> تعمل لكل وريث، بما فيه ما لم يُكتب بعد؟" },
      code: "class Step(ABC):\n    @abstractmethod\n    def fit(self, values): ...\n\n    @abstractmethod\n    def transform(self, values): ...\n\n    def fit_transform(self, values):\n        # which body?",
      options: [
        { code: "return self.fit(values).transform(values)" },
        { code: "return self.transform(self.fit(values))" },
        { code: "return MinMaxScaler().fit(values).transform(values)" },
        { code: "self.fit(values)\nreturn values" }
      ],
      answer: 0,
      explain: { en: "It calls only the two methods the base promised, so it works on a class written next year. The second is the subtle wrong one: <code>self.fit(values)</code> returns <code>self</code>, the object, so it passes a scaler where a list belongs. The third names a concrete class inside the abstract base &mdash; every subclass would silently behave like a <code>MinMaxScaler</code>, which is precisely the dependency an abstract base exists to forbid. The fourth returns the data untouched.",
                 ar: "تستدعي الدالتين اللتين وعد بهما الأساس فقط، فتعمل على صنف يُكتب العام القادم. والثانية هي الخاطئة الدقيقة: فـ <code>self.fit(values)</code> تُعيد <code>self</code> أي الكائن، فتمرّر مُقيِّسًا حيث تنتمي قائمة. والثالثة تسمّي صنفًا محددًا داخل الأساس المجرّد &mdash; فيتصرف كل وريث بصمت كـ <code>MinMaxScaler</code>، وذلك بالضبط الاعتماد الذي وُجد الأساس المجرّد ليمنعه. والرابعة تُعيد البيانات بلا مساس." }
    },
    {
      id: "c2b09", type: "trace", level: "hard", topics: ["encoder-state"],
      q: { en: "The encoder numbers its classes alphabetically. What does each give?",
           ar: "يرقّم المرمِّز أصنافه أبجديًا. فماذا يعطي كلٌّ منهما؟" },
      code: "class LabelEncoder(Step):\n    def fit(self, values):\n        self.classes = sorted(set(values))\n        self.index = {c: i for i, c in enumerate(self.classes)}\n        return self\n\n    def transform(self, values):\n        return [self.index[v] for v in values]\n\n\ne = LabelEncoder().fit([\"Rafah\", \"Gaza\", \"Rafah\", \"Khan Younis\"])",
      blanks: [
        { accept: ["['Gaza', 'Khan Younis', 'Rafah']"], wide: true, label: { en: "<code>e.classes</code>", ar: "<code>e.classes</code>" } },
        { accept: ["[2, 0]"], label: { en: "<code>e.transform([\"Rafah\", \"Gaza\"])</code>", ar: "<code>e.transform([\"Rafah\", \"Gaza\"])</code>" } },
        { accept: ["KeyError"], label: { en: "<code>e.transform([\"Jabalia\"])</code> raises", ar: "<code>e.transform([\"Jabalia\"])</code> ترفع" } }
      ],
      explain: { en: "<code>set</code> discards order and duplicates, <code>sorted</code> then imposes alphabetical order, so <code>Rafah</code> is 2 despite appearing first. The <code>KeyError</code> is the right behaviour, not a defect: a step that invented a number for an unseen city would hand the program a value that means nothing, which is the quiet wrong answer this course exists to argue against. Whether to soften it is a deliberate policy decision &mdash; see Exercise 8.2.",
                 ar: "تُسقط <code>set</code> الترتيب والتكرار، ثم تفرض <code>sorted</code> الترتيب الأبجدي، فتكون <code>Rafah</code> هي 2 رغم ظهورها أولًا. و<code>KeyError</code> هو السلوك الصحيح لا عيبًا: فخطوةٌ تخترع رقمًا لمدينة لم تُرَ ستسلّم البرنامجَ قيمةً لا تعني شيئًا، وذلك الجوابُ الخاطئ الهادئ الذي وُجد هذا المقرر لمخاصمته. وتليينُه قرار سياسة متعمَّد &mdash; انظر التمرين 8.2." }
    },
    {
      id: "c2b10", type: "mcq", level: "hard", topics: ["step-memory", "fit-leak"],
      q: { en: "A scaler is fitted in March. In October the marks have drifted upward and new students routinely transform above 1.0. What is the right reading?",
           ar: "دُرِّب مُقيِّس في آذار. وفي تشرين الأول انحرفت العلامات صعودًا وصار الطلبة الجدد يتحوّلون فوق 1.0 معتادًا. فما القراءة الصحيحة؟" },
      options: [
        { en: "The scaler is behaving exactly as designed and is telling you something true: today's marks no longer look like March's. Whether to refit is a decision about the data, not a bug in the class.",
          ar: "يتصرف المُقيِّس كما صُمّم بالضبط ويقول لك شيئًا صحيحًا: علاماتُ اليوم لم تعد تشبه علامات آذار. وقرارُ إعادة التدريب قرارٌ عن البيانات لا خللٌ في الصنف." },
        { en: "The class is broken, because a 0&ndash;1 scaler should clamp its output to 0&ndash;1.",
          ar: "الصنف مكسور، لأن مُقيِّس 0&ndash;1 ينبغي أن يحصر مُخرَجه في 0&ndash;1." },
        { en: "<code>transform</code> should recompute the range each time so it stays current.",
          ar: "ينبغي لـ <code>transform</code> أن تعيد حساب المدى في كل مرة لتبقى حديثة." },
        { en: "The scaler should refit itself automatically whenever it sees a value outside its stored range.",
          ar: "ينبغي للمُقيِّس أن يعيد تدريب نفسه تلقائيًا كلما رأى قيمة خارج مداه المخزَّن." }
      ],
      answer: 0,
      explain: { en: "Stored state can go stale, and sometimes staleness is the <em>correct</em> behaviour: you want today's marks measured against March's ruler, or the comparison means nothing. Recomputing the range inside <code>transform</code> is the forgetting function returning under a reasonable-sounding name. The fourth is worse than it looks &mdash; a step that silently refits makes every result depend on the order data arrived in, and the same mark would transform differently depending on who came before it.",
                 ar: "الحالة المخزَّنة قد تتقادم، والتقادمُ أحيانًا هو السلوك <em>الصحيح</em>: فأنت تريد قياس علامات اليوم بمسطرة آذار، وإلا لم تعنِ المقارنة شيئًا. وإعادةُ حساب المدى داخل <code>transform</code> هي الدالة الناسية تعود باسم يبدو معقولًا. والرابع أسوأ مما يبدو &mdash; فخطوةٌ تعيد التدريب بصمت تجعل كل نتيجة تتوقف على ترتيب وصول البيانات، فتتحوّل العلامة نفسها بطرق مختلفة بحسب من سبقها." }
    },
    {
      id: "c2b11", type: "mcq", level: "hard", topics: ["decorator", "pattern-cost"],
      q: { en: "Instead of a <code>Logged</code> wrapper, a colleague adds <code>verbose=False</code> to every step class. What is the strongest argument against that?",
           ar: "بدل لافّ <code>Logged</code>، يضيف زميل <code>verbose=False</code> إلى كل صنف خطوة. فما أقوى حجة ضد ذلك؟" },
      options: [
        { en: "The logging decision is spread across every class and repeated in every method, so wanting timing instead means editing all of them again &mdash; while the wrapper puts it in one class that works on steps nobody has written yet.",
          ar: "يتبعثر قرار التسجيل على كل صنف ويتكرر في كل دالة، فرغبةُ التوقيت بدلًا منه تعني تعديلها كلها مجددًا &mdash; بينما يضعه اللافّ في صنف واحد يعمل على خطوات لم يكتبها أحد بعد." },
        { en: "A boolean parameter cannot be stored on an object.",
          ar: "المعامل المنطقي لا يمكن تخزينه على كائن." },
        { en: "Printing from inside a step is always wrong.",
          ar: "الطباعة من داخل خطوة خطأ دائمًا." },
        { en: "The wrapper runs faster because it avoids an <code>if</code>.",
          ar: "اللافّ أسرع لأنه يتجنّب <code>if</code>." }
      ],
      answer: 0,
      explain: { en: "It is the <a href=\"#l6-h1\">if/elif argument</a> again, scattered rather than concentrated: a flag in every class and an <code>if</code> in every method is the same rule written many times. The honest counterpoint, worth holding on to, is that <code>verbose=True</code> is easier for a newcomer to find than a wrapper class &mdash; so for two steps that will never grow, the flag is defensible. The wrapper wins as soon as you want a second kind of instrumentation.",
                 ar: "إنها <a href=\"#l6-h1\">حجة if/elif</a> مرة أخرى، مبعثرةً لا مركَّزة: فرايةٌ في كل صنف و<code>if</code> في كل دالة هي القاعدة نفسها مكتوبةً مرات. والحجة المقابلة الصادقة، وتستحق الحفظ، أن <code>verbose=True</code> أسهل على القادم الجديد في العثور من صنف لافّ &mdash; فلخطوتين لن تنموا تكون الراية مدافَعًا عنها. ويفوز اللافّ بمجرد أن تريد نوعًا ثانيًا من القياس." }
    },
    {
      id: "c2b12", type: "order", level: "hard", topics: ["pipeline", "decorator"],
      q: { en: "Put in order what happens on <code>Pipeline([Logged(Clip(0,100), \"clip\")]).fit(raw)</code>.",
           ar: "رتّب ما يحدث عند <code>Pipeline([Logged(Clip(0,100), \"clip\")]).fit(raw)</code>." },
      items: [
        { en: "<code>Pipeline.fit</code> takes the first step out of its list &mdash; the <code>Logged</code>, not the <code>Clip</code>.", ar: "تأخذ <code>Pipeline.fit</code> أول خطوة من قائمتها &mdash; وهي <code>Logged</code> لا <code>Clip</code>." },
        { en: "<code>Logged.fit</code> prints its line, then calls <code>Clip.fit</code>.", ar: "تطبع <code>Logged.fit</code> سطرها ثم تستدعي <code>Clip.fit</code>." },
        { en: "<code>Clip.fit</code> learns nothing and returns itself.", ar: "لا تتعلّم <code>Clip.fit</code> شيئًا وتُعيد نفسها." },
        { en: "<code>Logged.fit</code> returns <code>self</code> &mdash; the wrapper, not the clip.", ar: "تُعيد <code>Logged.fit</code> قيمة <code>self</code> &mdash; اللافَّ لا الحصر." },
        { en: "<code>Pipeline.fit</code> calls <code>.transform</code> on what it got back, so <code>Logged.transform</code> runs and delegates to <code>Clip.transform</code>.", ar: "تستدعي <code>Pipeline.fit</code> دالة <code>.transform</code> على ما عاد إليها، فتُنفَّذ <code>Logged.transform</code> وتفوّض إلى <code>Clip.transform</code>." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 4 is the one that matters and the one people get wrong: <code>Logged.fit</code> must return <code>self</code>, not the inner step. If it returned <code>self.step</code>, the chained <code>.transform(values)</code> in <code>Pipeline.fit</code> would call the <em>clip's</em> transform directly and the wrapper would silently drop out of the transform path &mdash; logs on fit, silence on transform, and nobody able to say why.",
                 ar: "الخطوة 4 هي المهمة والتي يخطئها الناس: فعلى <code>Logged.fit</code> أن تُعيد <code>self</code> لا الخطوة الداخلية. فلو أعادت <code>self.step</code> لاستدعت <code>.transform(values)</code> المتسلسلة في <code>Pipeline.fit</code> تحويلَ <em>الحصر</em> مباشرة ولسقط اللافُّ بصمت من مسار التحويل &mdash; سجلاتٌ عند التدريب وصمتٌ عند التحويل، ولا أحد يستطيع قول السبب." }
    },
    {
      id: "c2b13", type: "tf", level: "hard", topics: ["composite", "step-abc"],
      q: { en: "<code>Pipeline</code> could be written without inheriting from <code>Step</code> and would still nest inside another <code>Pipeline</code>.",
           ar: "يمكن كتابة <code>Pipeline</code> بلا وراثة من <code>Step</code> ويظل يُعشَّش داخل <code>Pipeline</code> آخر." },
      truth: true,
      explain: { en: "Nesting works because <code>Pipeline</code> has <code>fit</code> and <code>transform</code>, and <code>Pipeline.fit</code> calls those by name without checking a type &mdash; <a href=\"#l6-s4\">duck typing</a>. Inheriting from <code>Step</code> buys two different things: <code>fit_transform</code> for free, and an early <code>TypeError</code> if a future pipeline-like class forgets a method. Useful, but not what makes nesting possible, and it is worth being clear about which does which.",
                 ar: "يعمل التعشيش لأن <code>Pipeline</code> يملك <code>fit</code> و<code>transform</code>، و<code>Pipeline.fit</code> تستدعيهما بالاسم بلا فحص نوع &mdash; <a href=\"#l6-s4\">تصنيف البطة</a>. والوراثة من <code>Step</code> تشتري شيئين آخرين: <code>fit_transform</code> مجانًا، و<code>TypeError</code> مبكرًا إن نسي صنفٌ شبيه بالمسار دالةً مستقبلًا. مفيدٌ، لكنه ليس ما يجعل التعشيش ممكنًا، ويجدر الوضوح في أيٍّ يفعل ماذا." }
    },
    {
      id: "c2b14", type: "fill", level: "hard", topics: ["pipeline", "composite"],
      q: { en: "Complete the method that lets you reach a named step to inspect what it learned.",
           ar: "أكمل الدالة التي تتيح لك بلوغ خطوة مسمّاة لتفحص ما تعلّمته." },
      code: "class Pipeline(Step):\n    def __init__(self, steps):\n        self.steps = steps          # list of (name, step) pairs\n\n    def named(self, name):\n        for step_name, step in self.steps:\n            if ____1____:\n                return ____2____\n        raise KeyError(f\"no step named {name!r}\")",
      blanks: [
        { accept: ["step_name == name"], wide: true, label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["step"], label: { en: "blank 2", ar: "الفراغ 2" } }
      ],
      explain: { en: "Being able to read <code>prepare.named(\"scale\").high</code> is how you answer \"why did this mark become 0.625?\" without a debugger. It is also a small breach of <a href=\"#l4-h1\">Lesson 4's wall</a>: callers can now depend on a step's internals. The honest position is that inspection earns that price while routine use should still go through <code>transform</code>.",
                 ar: "القدرة على قراءة <code>prepare.named(\"scale\").high</code> هي كيف تجيب «لماذا صارت هذه العلامة 0.625؟» بلا منقّح. وهي كذلك ثغرة صغيرة في <a href=\"#l4-h1\">جدار الدرس 4</a>: فصار المستدعون قادرين على التوقف على داخل الخطوة. والموقف الصادق أن الفحص يستحق ذلك الثمن بينما ينبغي للاستعمال المعتاد أن يظل عبر <code>transform</code>." }
    },
    {
      id: "c2b15", type: "multi", level: "hard", topics: ["pattern-cost", "pipeline", "factory"],
      q: { en: "Select <strong>every</strong> honest cost of the design built in this chapter.",
           ar: "اختر <strong>كل</strong> ثمن صادق للتصميم المبني في هذا الفصل." },
      options: [
        { en: "A failure inside a nested pipeline produces a traceback that passes through <code>Pipeline.transform</code> before reaching the step that actually raised.",
          ar: "الفشل داخل مسار معشَّش يُنتج تتبّعًا يمرّ بـ <code>Pipeline.transform</code> قبل بلوغ الخطوة التي رفعت الخطأ فعلًا." },
        { en: "A step that learns nothing still has to implement <code>fit</code>, because the pipeline calls it on everything.",
          ar: "الخطوة التي لا تتعلّم شيئًا عليها تنفيذ <code>fit</code> مع ذلك، لأن المسار يستدعيها على الجميع." },
        { en: "Three small classes are usually more lines than three statements in a row.",
          ar: "ثلاثة أصناف صغيرة أسطرها أكثر عادةً من ثلاث جمل متتابعة." },
        { en: "A factory written before any config file exists is code to read and maintain for no return.",
          ar: "المصنع المكتوب قبل وجود أي ملف تهيئة كودٌ يُقرأ ويُصان بلا مردود." },
        { en: "The steps can no longer be unit-tested on their own once they are inside a pipeline.",
          ar: "لم تعد الخطوات قابلة للاختبار المنفرد متى صارت داخل مسار." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first four are real and worth saying aloud; a chapter that only advocates teaches worse than one that compares. The fifth is false and is in fact the opposite of the truth: each step is a small object with two methods and no dependencies, so it is <em>easier</em> to test alone than a function buried in a script &mdash; which is the same testability dividend <a href=\"#l4-h2\">Lesson 4</a> claimed for a small interface.",
                 ar: "الأربعة الأولى حقيقية وتستحق القول بصوت مسموع؛ فالفصل الذي لا يفعل إلا الدعوة يعلّم أسوأ من الذي يقارن. والخامسة خاطئة وهي في الحقيقة عكس الصواب: فكل خطوة كائنٌ صغير بدالتين وبلا اعتمادات، فهي <em>أسهل</em> في الاختبار المنفرد من دالة مدفونة في سكربت &mdash; وذلك مردود قابلية الاختبار نفسه الذي ادّعاه <a href=\"#l4-h2\">الدرس 4</a> للواجهة الصغيرة." }
    },
    {
      id: "c2b16", type: "mcq", level: "hard", topics: ["pattern-cost", "when-not-oop"],
      q: { en: "What single question best decides whether any of this chapter's patterns belongs in a given program?",
           ar: "أي سؤال واحد يقرّر خيرَ قرار هل ينتمي أيٌّ من أنماط هذا الفصل إلى برنامج بعينه؟" },
      options: [
        { en: "<em>What change does this make cheap?</em> &mdash; and if you cannot name one, write the three statements in a row.",
          ar: "<em>أي تغيير يجعله هذا رخيصًا؟</em> &mdash; وإن لم تستطع تسمية واحد فاكتب الجمل الثلاث متتابعة." },
        { en: "<em>Is this how scikit-learn does it?</em> &mdash; matching a respected library is the safest default.",
          ar: "<em>أهكذا يفعلها ساي كِت ليرن؟</em> &mdash; فمطابقة مكتبة محترمة أسلم افتراضي." },
        { en: "<em>Have I used a named design pattern?</em> &mdash; named patterns are the vocabulary of professional code.",
          ar: "<em>هل استعملت نمط تصميم مسمّى؟</em> &mdash; فالأنماط المسماة مفردات الكود المهني." },
        { en: "<em>Will this scale to a million rows?</em> &mdash; design should always assume growth.",
          ar: "<em>أيتوسّع هذا إلى مليون صفّ؟</em> &mdash; فالتصميم ينبغي أن يفترض النموّ دائمًا." }
      ],
      answer: 0,
      explain: { en: "The same question <a href=\"#l7-h5\">Chapter 1 closed on</a>, and it survives contact with patterns. Each wrong option is a real habit: copying a library imports decisions made for a different scale and a different audience; collecting named patterns turns a toolbox into a checklist, and <code>WarrantyRepair</code> used three at once because the problem needed them, not because a list said to; and assuming growth builds for a future that usually does not arrive, at a cost that always does.",
                 ar: "السؤال نفسه الذي <a href=\"#l7-h5\">خُتم به الفصل 1</a>، وهو ينجو من ملامسة الأنماط. وكل خيار خاطئ عادةٌ حقيقية: فنسخُ مكتبة يستورد قرارات اتُّخذت لمقياس آخر وجمهور آخر؛ وجمعُ الأنماط المسماة يحوّل صندوق أدوات قائمةَ تحقّق، و<code>WarrantyRepair</code> استعمل ثلاثة معًا لأن المشكلة احتاجتها لا لأن قائمة أمرت؛ وافتراضُ النموّ يبني لمستقبل لا يأتي غالبًا، بثمن يأتي دائمًا." }
    }
  ]
};
