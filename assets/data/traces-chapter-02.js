/* ============================================================
   Chapter 2 traces, embedded inline in the lessons rather than
   collected on a lab page: each one sits at the moment in the
   prose where the reader needs to see it happen.

   Every program here was run in CPython and the panels match.
   ============================================================ */
window.OOPTraces = window.OOPTraces || {};

window.OOPTraces["t-fit-memory"] = {
  id: "t-fit-memory",
  title: { en: "Watch the memory being written, then read",
           ar: "شاهد الذاكرة تُكتب ثم تُقرأ" },
  lede: { en: "<code>fit</code> stores two numbers on the object. <code>transform</code> reads them back and looks at nothing else. That is the whole contract.",
          ar: "تخزّن fit رقمين على الكائن. وتقرأهما transform ولا تنظر إلى غيرهما. وذلك هو العقد كله." },
  code:
    "class MinMaxScaler:\n" +
    "    def fit(self, values):\n" +
    "        self.low = min(values)\n" +
    "        self.high = max(values)\n" +
    "        return self\n" +
    "\n" +
    "    def transform(self, values):\n" +
    "        span = self.high - self.low\n" +
    "        return [round((v - self.low) / span, 3) for v in values]\n" +
    "\n" +
    "\n" +
    "marks = [40, 55, 70, 85, 100]\n" +
    "scaler = MinMaxScaler()\n" +
    "scaler.fit(marks)\n" +
    "print(scaler.transform([70]))",
  steps: [
    { line: 13, vars: { "marks": "[40, 55, 70, 85, 100]" },
      note: { en: "A new scaler. It has no attributes at all yet &mdash; nothing has been learned.",
              ar: "مُقيِّس جديد. ولا خصائص له إطلاقًا بعد &mdash; فلم يُتعلَّم شيء." } },
    { line: 14, vars: { "marks": "[40, 55, 70, 85, 100]", "scaler": "MinMaxScaler()  (empty)" },
      note: { en: "<code>fit</code> is about to run, with the whole class as its argument.",
              ar: "<code>fit</code> ستُنفَّذ، والصفُّ كله وسيطها." } },
    { line: 3, vars: { "self": "the scaler", "values": "[40, 55, 70, 85, 100]" },
      scope: { en: "<code>MinMaxScaler.fit</code>", ar: "<code>MinMaxScaler.fit</code>" },
      note: { en: "Inside <code>fit</code>. <code>values</code> is a parameter &mdash; a local name that will vanish when the method ends.",
              ar: "داخل <code>fit</code>. و<code>values</code> معامل &mdash; اسم محلي سيزول بانتهاء الدالة." } },
    { line: 4, vars: { "self": "MinMaxScaler(low=40)", "values": "[40, 55, 70, 85, 100]" },
      scope: { en: "<code>MinMaxScaler.fit</code>", ar: "<code>MinMaxScaler.fit</code>" },
      note: { en: "The first number is written onto the object. This is the line that gives the step a memory.",
              ar: "يُكتب الرقم الأول على الكائن. وهذا هو السطر الذي يمنح الخطوة ذاكرة." } },
    { line: 5, vars: { "self": "MinMaxScaler(low=40, high=100)", "values": "[40, 55, 70, 85, 100]" },
      scope: { en: "<code>MinMaxScaler.fit</code>", ar: "<code>MinMaxScaler.fit</code>" },
      note: { en: "Both numbers stored. <code>return self</code> hands the object back so calls can be chained; it does not hand back any data.",
              ar: "خُزّن الرقمان. و<code>return self</code> تُعيد الكائن لتُسلسَل الاستدعاءات؛ ولا تُعيد أي بيانات." } },
    { line: 15, vars: { "marks": "[40, 55, 70, 85, 100]", "scaler": "MinMaxScaler(low=40, high=100)" },
      note: { en: "<code>fit</code> has returned and <code>values</code> is gone &mdash; but 40 and 100 survive, because they were written to <code>self</code> and not to a local name.",
              ar: "عادت <code>fit</code> واختفت <code>values</code> &mdash; لكن 40 و100 بقيتا، لأنهما كُتبتا على <code>self</code> لا على اسم محلي." } },
    { line: 8, vars: { "scaler": "MinMaxScaler(low=40, high=100)", "self": "the scaler", "values": "[70]" },
      scope: { en: "<code>MinMaxScaler.transform</code>", ar: "<code>MinMaxScaler.transform</code>" },
      note: { en: "A single new mark. Note what <code>transform</code> does <strong>not</strong> do: it never calls <code>min</code> or <code>max</code> on <code>[70]</code>.",
              ar: "علامة جديدة واحدة. ولاحظ ما <strong>لا</strong> تفعله <code>transform</code>: فهي لا تستدعي <code>min</code> ولا <code>max</code> على <code>[70]</code> أبدًا." } },
    { line: 9, vars: { "scaler": "MinMaxScaler(low=40, high=100)", "self": "the scaler", "values": "[70]", "span": "60" },
      scope: { en: "<code>MinMaxScaler.transform</code>", ar: "<code>MinMaxScaler.transform</code>" },
      note: { en: "<code>span</code> is 100 &minus; 40, from the class &mdash; not from <code>[70]</code>. This is exactly where the forgetting version divided by zero.",
              ar: "<code>span</code> هي 100 &minus; 40 من الصفّ &mdash; لا من <code>[70]</code>. وهنا بالضبط قسمت النسخةُ الناسية على صفر." } },
    { line: 15, vars: { "marks": "[40, 55, 70, 85, 100]", "scaler": "MinMaxScaler(low=40, high=100)" },
      out: "[0.5]",
      note: { en: "70 is half way between 40 and 100, so it is 0.5 &mdash; the same 0.5 it had inside the class, and the same 0.5 it will have for every future student.",
              ar: "تقع 70 في منتصف ما بين 40 و100، فهي 0.5 &mdash; و0.5 نفسها التي كانت لها داخل الصفّ، و0.5 نفسها التي ستكون لكل طالب قادم." } }
  ]
};

window.OOPTraces["t-strategy-swap"] = {
  id: "t-strategy-swap",
  title: { en: "One line of code, two different method bodies",
           ar: "سطر كود واحد، وجسدا دالة مختلفان" },
  lede: { en: "The loop body never changes and never asks which scaler it has. Watch which class the running line belongs to.",
          ar: "جسد الحلقة لا يتغير ولا يسأل أي مُقيِّس لديه. راقب إلى أي صنف ينتمي السطر المنفَّذ." },
  code:
    "class MinMaxScaler:\n" +
    "    def fit(self, values):\n" +
    "        self.low = min(values)\n" +
    "        self.high = max(values)\n" +
    "        return self\n" +
    "\n" +
    "    def transform(self, values):\n" +
    "        span = self.high - self.low\n" +
    "        return [round((v - self.low) / span, 3) for v in values]\n" +
    "\n" +
    "\n" +
    "class StandardScaler:\n" +
    "    def fit(self, values):\n" +
    "        self.mean = sum(values) / len(values)\n" +
    "        var = sum((v - self.mean) ** 2 for v in values) / len(values)\n" +
    "        self.sd = var ** 0.5\n" +
    "        return self\n" +
    "\n" +
    "    def transform(self, values):\n" +
    "        return [round((v - self.mean) / self.sd, 3) for v in values]\n" +
    "\n" +
    "\n" +
    "for scaler in (MinMaxScaler(), StandardScaler()):\n" +
    "    scaler.fit(marks)\n" +
    "    print(scaler.transform([85]))",
  steps: [
    { line: 23, vars: { "marks": "[40, 55, 70, 85, 100]" },
      note: { en: "Two objects of two unrelated classes, in one tuple. They share no base class and no attribute.",
              ar: "كائنان من صنفين لا صلة بينهما، في صفٍّ واحد. ولا يتقاسمان أساسًا ولا خاصية." } },
    { line: 24, vars: { "marks": "[...]", "scaler": "MinMaxScaler()" },
      note: { en: "First pass. <code>scaler.fit</code> is about to be looked up on a <code>MinMaxScaler</code>.",
              ar: "الدورة الأولى. و<code>scaler.fit</code> ستُبحث على <code>MinMaxScaler</code>." } },
    { line: 4, vars: { "scaler": "MinMaxScaler(low=40)", "self": "scaler", "values": "[40, 55, 70, 85, 100]" },
      scope: { en: "<code>MinMaxScaler.fit</code>", ar: "<code>MinMaxScaler.fit</code>" },
      note: { en: "This object stores a range: two numbers called <code>low</code> and <code>high</code>.",
              ar: "يخزّن هذا الكائن مدى: رقمين باسمَي <code>low</code> و<code>high</code>." } },
    { line: 25, vars: { "scaler": "MinMaxScaler(low=40, high=100)" },
      note: { en: "Back in the loop body, about to transform.",
              ar: "عودة إلى جسد الحلقة، استعدادًا للتحويل." } },
    { line: 9, vars: { "scaler": "MinMaxScaler(low=40, high=100)", "self": "scaler", "values": "[85]", "span": "60" },
      scope: { en: "<code>MinMaxScaler.transform</code>", ar: "<code>MinMaxScaler.transform</code>" },
      note: { en: "(85 &minus; 40) / 60 = 0.75.", ar: "(85 &minus; 40) ÷ 60 = 0.75." } },
    { line: 23, vars: { "scaler": "MinMaxScaler(low=40, high=100)" },
      out: "[0.75]",
      note: { en: "Second pass of the loop begins.", ar: "تبدأ الدورة الثانية من الحلقة." } },
    { line: 24, vars: { "marks": "[...]", "scaler": "StandardScaler()" },
      out: "[0.75]",
      note: { en: "<strong>The same line of code as before</strong> &mdash; line 24 &mdash; but <code>scaler</code> is now a different class.",
              ar: "<strong>سطر الكود نفسه كما قبل</strong> &mdash; السطر 24 &mdash; لكن <code>scaler</code> صار صنفًا مختلفًا." } },
    { line: 16, vars: { "scaler": "StandardScaler(mean=70.0)", "self": "scaler", "values": "[40, 55, 70, 85, 100]", "var": "450.0" },
      scope: { en: "<code>StandardScaler.fit</code>", ar: "<code>StandardScaler.fit</code>" },
      out: "[0.75]",
      note: { en: "A completely different method body, storing completely different attributes: a <code>mean</code> and an <code>sd</code>, no range at all.",
              ar: "جسد دالة مختلف تمامًا، يخزّن خصائص مختلفة تمامًا: <code>mean</code> و<code>sd</code>، ولا مدى إطلاقًا." } },
    { line: 25, vars: { "scaler": "StandardScaler(mean=70.0, sd=21.213)" },
      out: "[0.75]",
      note: { en: "Line 25 again, unchanged, about to call a <code>transform</code> that shares not one line with the first one.",
              ar: "السطر 25 مرة أخرى بلا تغيير، استعدادًا لاستدعاء <code>transform</code> لا تشترك مع الأولى في سطر واحد." } },
    { line: 20, vars: { "scaler": "StandardScaler(mean=70.0, sd=21.213)", "self": "scaler", "values": "[85]" },
      scope: { en: "<code>StandardScaler.transform</code>", ar: "<code>StandardScaler.transform</code>" },
      out: "[0.75]",
      note: { en: "(85 &minus; 70) / 21.213 = 0.707.", ar: "(85 &minus; 70) ÷ 21.213 = 0.707." } },
    { line: 25, vars: { "scaler": "StandardScaler(mean=70.0, sd=21.213)" },
      out: "[0.75]\n[0.707]",
      note: { en: "Two answers from two lines of code that were never edited between the passes. Adding a third scaler changes neither of them.",
              ar: "جوابان من سطرَي كود لم يُعدَّلا بين الدورتين. وإضافة مُقيِّس ثالث لا تغيّر أيًّا منهما." } }
  ]
};

window.OOPTraces["t-pipeline-fit"] = {
  id: "t-pipeline-fit",
  title: { en: "<code>Pipeline.fit</code> walking the chain",
           ar: "<code>Pipeline.fit</code> تمشي في السلسلة" },
  lede: { en: "The one line that matters is line 7. Watch <code>values</code> change between steps, and watch what the scaler ends up remembering.",
          ar: "السطر المهم الوحيد هو السطر 7. راقب تغيّر values بين الخطوات، وراقب ما ينتهي المُقيِّس إلى تذكّره." },
  code:
    "class Pipeline(Step):\n" +
    "    def __init__(self, steps):\n" +
    "        self.steps = steps\n" +
    "\n" +
    "    def fit(self, values):\n" +
    "        for step in self.steps:\n" +
    "            values = step.fit(values).transform(values)\n" +
    "        return self\n" +
    "\n" +
    "    def transform(self, values):\n" +
    "        for step in self.steps:\n" +
    "            values = step.transform(values)\n" +
    "        return values\n" +
    "\n" +
    "\n" +
    "raw = [20, 55, 70, 85, 400]\n" +
    "prepare = Pipeline([Clip(0, 100), MinMaxScaler()])\n" +
    "prepare.fit(raw)",
  steps: [
    { line: 17, vars: { "raw": "[20, 55, 70, 85, 400]" },
      note: { en: "400 is a typing error. The clip step exists to stop it reaching the scaler.",
              ar: "الرقم 400 خطأ كتابة. وخطوةُ الحصر موجودة لتمنعه من بلوغ المُقيِّس." } },
    { line: 18, vars: { "raw": "[20, 55, 70, 85, 400]", "prepare": "Pipeline(steps=[Clip, MinMaxScaler])" },
      note: { en: "The pipeline holds two steps and has learned nothing yet.",
              ar: "يمسك المسار بخطوتين ولم يتعلّم شيئًا بعد." } },
    { line: 7, vars: { "self": "the pipeline", "values": "[20, 55, 70, 85, 400]", "step": "Clip(0, 100)" },
      scope: { en: "<code>Pipeline.fit</code>, first step", ar: "<code>Pipeline.fit</code>، الخطوة الأولى" },
      note: { en: "First time through the loop. <code>step.fit(values)</code> returns the step, then <code>.transform(values)</code> is called on it.",
              ar: "أول مرور في الحلقة. فـ <code>step.fit(values)</code> تُعيد الخطوة، ثم تُستدعى عليها <code>.transform(values)</code>." } },
    { line: 6, vars: { "self": "the pipeline", "values": "[20, 55, 70, 85, 100]", "step": "Clip(0, 100)" },
      scope: { en: "<code>Pipeline.fit</code>", ar: "<code>Pipeline.fit</code>" },
      note: { en: "<strong>This is the line that matters.</strong> <code>values</code> has been replaced by the clipped version &mdash; 400 is now 100 &mdash; and it is that list the next step will see.",
              ar: "<strong>هذا هو السطر المهم.</strong> فقد حلّت محلّ <code>values</code> النسخةُ المحصورة &mdash; صارت 400 هي 100 &mdash; وتلك القائمة هي ما ستراه الخطوة التالية." } },
    { line: 7, vars: { "self": "the pipeline", "values": "[20, 55, 70, 85, 100]", "step": "MinMaxScaler()" },
      scope: { en: "<code>Pipeline.fit</code>, second step", ar: "<code>Pipeline.fit</code>، الخطوة الثانية" },
      note: { en: "The scaler is about to be fitted &mdash; on the clipped list, never on the raw one.",
              ar: "المُقيِّس على وشك أن يُدرَّب &mdash; على القائمة المحصورة لا على الخام أبدًا." } },
    { line: 6, vars: { "self": "the pipeline", "values": "[0.0, 0.438, 0.625, 0.812, 1.0]", "step": "MinMaxScaler(low=20, high=100)" },
      scope: { en: "<code>Pipeline.fit</code>", ar: "<code>Pipeline.fit</code>" },
      note: { en: "<code>high</code> is <strong>100, not 400</strong>. Had the pipeline fitted every step on the raw data, it would be 400 here and every real mark would be squashed into the bottom quarter.",
              ar: "<code>high</code> تساوي <strong>100 لا 400</strong>. ولو درّب المسارُ كل خطوة على البيانات الخام لكانت 400 هنا ولسُحقت كل علامة حقيقية في الربع الأدنى." } },
    { line: 8, vars: { "self": "the pipeline", "values": "[0.0, 0.438, 0.625, 0.812, 1.0]" },
      scope: { en: "<code>Pipeline.fit</code>", ar: "<code>Pipeline.fit</code>" },
      note: { en: "The loop is done. <code>fit</code> returns the pipeline, and throws the transformed values away &mdash; they were only ever needed to fit the next step.",
              ar: "انتهت الحلقة. وتُعيد <code>fit</code> المسار وترمي القيم المحوَّلة &mdash; فلم تكن لازمة إلا لتدريب الخطوة التالية." } },
    { line: 18, vars: { "raw": "[20, 55, 70, 85, 400]", "prepare": "Pipeline(fitted: Clip, MinMaxScaler(low=20, high=100))" },
      note: { en: "Every step now carries its own memory, and the order that produced them is stored in <code>self.steps</code>. A second file cannot get it wrong, because a second file never sees it.",
              ar: "صارت كل خطوة تحمل ذاكرتها، والترتيب الذي أنتجها مخزَّن في <code>self.steps</code>. ولا يستطيع ملف ثانٍ إخطاءه، لأن ملفًا ثانيًا لا يراه أصلًا." } }
  ]
};

window.OOPTraces["t-decorator"] = {
  id: "t-decorator",
  title: { en: "A wrapper that the wrapped step knows nothing about",
           ar: "لافٌّ لا تعرف عنه الخطوةُ الملفوفة شيئًا" },
  lede: { en: "<code>Logged</code> is a step holding a step. Watch control pass through it and back, with <code>MinMaxScaler</code> unchanged and unaware.",
          ar: "Logged خطوةٌ تمسك بخطوة. راقب التحكّم يمرّ عبرها ويعود، و MinMaxScaler لم يتغير ولا يدري." },
  code:
    "class Logged(Step):\n" +
    "    def __init__(self, step, name):\n" +
    "        self.step = step\n" +
    "        self.name = name\n" +
    "\n" +
    "    def fit(self, values):\n" +
    "        print(f\"  [fit] {self.name} saw {len(values)} values\")\n" +
    "        self.step.fit(values)\n" +
    "        return self\n" +
    "\n" +
    "    def transform(self, values):\n" +
    "        out = self.step.transform(values)\n" +
    "        print(f\"  [transform] {self.name}\")\n" +
    "        return out\n" +
    "\n" +
    "\n" +
    "noisy = Logged(MinMaxScaler(), \"scale\")\n" +
    "noisy.fit(marks)\n" +
    "print(noisy.transform([85]))",
  steps: [
    { line: 17, vars: { "marks": "[40, 55, 70, 85, 100]" },
      note: { en: "A scaler is built and immediately handed to a wrapper. The scaler is not modified and does not know it has been wrapped.",
              ar: "يُبنى مُقيِّس ويُسلَّم فورًا إلى لافّ. ولا يُعدَّل المُقيِّس ولا يدري أنه لُفّ." } },
    { line: 18, vars: { "noisy": "Logged(step=MinMaxScaler(), name='scale')" },
      note: { en: "<code>noisy</code> answers <code>fit</code> and <code>transform</code>, so as far as any caller is concerned it <em>is</em> a scaler.",
              ar: "يجيب <code>noisy</code> عن <code>fit</code> و<code>transform</code>، فهو <em>مُقيِّس</em> في نظر أي مستدعٍ." } },
    { line: 7, vars: { "noisy": "Logged(...)", "self": "noisy", "values": "[40, 55, 70, 85, 100]" },
      scope: { en: "<code>Logged.fit</code>", ar: "<code>Logged.fit</code>" },
      note: { en: "The wrapper's own behaviour runs first: it prints.",
              ar: "يُنفَّذ سلوك اللافّ أولًا: فيطبع." } },
    { line: 8, vars: { "noisy": "Logged(...)", "self": "noisy", "values": "[40, 55, 70, 85, 100]" },
      scope: { en: "<code>Logged.fit</code>", ar: "<code>Logged.fit</code>" },
      out: "  [fit] scale saw 5 values",
      note: { en: "Now it delegates. The inner scaler is about to run its own unmodified <code>fit</code>.",
              ar: "والآن يفوّض. والمُقيِّس الداخلي على وشك تنفيذ <code>fit</code> الخاصة به بلا تعديل." } },
    { line: 8, vars: { "noisy": "Logged(step=MinMaxScaler(low=40, high=100))", "self": "noisy" },
      scope: { en: "back in <code>Logged.fit</code>", ar: "عودة إلى <code>Logged.fit</code>" },
      out: "  [fit] scale saw 5 values",
      note: { en: "The inner <code>fit</code> has returned and the memory is stored &mdash; on the inner scaler, not on the wrapper.",
              ar: "عادت <code>fit</code> الداخلية وخُزّنت الذاكرة &mdash; على المُقيِّس الداخلي لا على اللافّ." } },
    { line: 19, vars: { "noisy": "Logged(step=MinMaxScaler(low=40, high=100))" },
      out: "  [fit] scale saw 5 values",
      note: { en: "Now the transform call.", ar: "والآن استدعاء التحويل." } },
    { line: 12, vars: { "noisy": "Logged(...)", "self": "noisy", "values": "[85]" },
      scope: { en: "<code>Logged.transform</code>", ar: "<code>Logged.transform</code>" },
      out: "  [fit] scale saw 5 values",
      note: { en: "This time the wrapper delegates <em>first</em> and prints afterwards, so the order of the two printed lines tells you where the work happened.",
              ar: "هذه المرة يفوّض اللافّ <em>أولًا</em> ويطبع بعدها، فيقول لك ترتيبُ السطرين المطبوعين أين جرى العمل." } },
    { line: 13, vars: { "noisy": "Logged(...)", "self": "noisy", "values": "[85]", "out": "[0.75]" },
      scope: { en: "<code>Logged.transform</code>", ar: "<code>Logged.transform</code>" },
      out: "  [fit] scale saw 5 values",
      note: { en: "The inner scaler has done its work and the wrapper is holding the result, untouched. A decorator that changed the result would be a different pattern and a worse idea here.",
              ar: "أدّى المُقيِّس الداخلي عمله واللافُّ يمسك بالنتيجة بلا مساس. فمزخرِفٌ يغيّر النتيجة سيكون نمطًا آخر وفكرةً أسوأ هنا." } },
    { line: 19, vars: { "noisy": "Logged(step=MinMaxScaler(low=40, high=100))" },
      out: "  [fit] scale saw 5 values\n  [transform] scale\n[0.75]",
      note: { en: "Same answer the bare scaler would have given, plus two lines of logging, and <code>MinMaxScaler</code> was never opened. Swap <code>Logged</code> for a <code>Timed</code> and nothing else in the program changes.",
              ar: "الجواب نفسه الذي كان سيعطيه المُقيِّس العاري، زائدَ سطرَي تسجيل، ولم يُفتح <code>MinMaxScaler</code> قطّ. استبدل <code>Timed</code> بـ <code>Logged</code> ولا يتغير شيء آخر في البرنامج." } }
  ]
};
