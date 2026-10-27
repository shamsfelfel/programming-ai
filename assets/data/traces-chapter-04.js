/* ============================================================
   Chapter 4 traces, embedded inline in the lessons.
   Every program was run in NumPy 2.5 and the panels match.
   ============================================================ */
window.OOPTraces = window.OOPTraces || {};

Object.assign(window.OOPTraces, {

  "t-dot": {
    id: "t-dot",
    title: { en: "A dot product is two steps you already know",
             ar: "الضربُ القياسي خطوتان تعرفهما" },
    lede: { en: "Watch <code>products</code> appear and then collapse. <code>@</code> does both steps at once and never builds the middle array at all.",
            ar: "راقب <code>products</code> تظهر ثم تنطبق. فـ <code>@</code> تؤدي الخطوتين دفعةً ولا تبني المصفوفة الوسيطة إطلاقًا." },
    code:
      "import numpy as np\n" +
      "\n" +
      "marks = np.array([72., 65., 80.])\n" +
      "weights = np.array([0.2, 0.3, 0.5])\n" +
      "\n" +
      "products = marks * weights\n" +
      "total = products.sum()\n" +
      "\n" +
      "same = marks @ weights",
    steps: [
      { line: 3, vars: {},
        note: { en: "Three marks for one student: coursework, midterm, final paper.",
                ar: "ثلاثُ علامات لطالبٍ واحد: أعمال الفصل والمنتصف والورقة النهائية." } },
      { line: 4, vars: { "marks": "[72. 65. 80.]" },
        note: { en: "The weights line up with them by <strong>position</strong>, not by name. Getting this order wrong is the one mistake arrays cannot catch for you.",
                ar: "تُحاذيها الأوزانُ <strong>بالموضع</strong> لا بالاسم. وخطأُ هذا الترتيب هو الخطأ الوحيد الذي لا تستطيع المصفوفات التقاطه عنك." } },
      { line: 6, vars: { "marks": "[72. 65. 80.]", "weights": "[0.2 0.3 0.5]" },
        note: { en: "Both are shape <code>(3,)</code>, so multiplying pairs them up position by position.",
                ar: "كلتاهما بالشكل <code>(3,)</code>، فالضربُ يزاوجهما موضعًا بموضع." } },
      { line: 7, vars: { "marks": "[72. 65. 80.]", "weights": "[0.2 0.3 0.5]", "products": "[14.4 19.5 40. ]" },
        note: { en: "Step one, visible: 72&times;0.2, 65&times;0.3, 80&times;0.5. Still three numbers &mdash; nothing has been combined yet.",
                ar: "الخطوةُ الأولى ظاهرة: 72&times;0.2 و65&times;0.3 و80&times;0.5. ولا تزال ثلاثة أعداد &mdash; فلم يُدمج شيء بعد." } },
      { line: 9, vars: { "products": "[14.4 19.5 40. ]", "total": "73.9" },
        note: { en: "Step two: the three are added into one. That pair of steps &mdash; multiply pairwise, then add &mdash; is the whole definition of a dot product.",
                ar: "الخطوةُ الثانية: تُجمع الثلاثة في واحد. وهاتان الخطوتان &mdash; اضرب موضعًا بموضع ثم اجمع &mdash; هما تعريفُ الضرب القياسي كله." } },
      { line: 9, vars: { "products": "[14.4 19.5 40. ]", "total": "73.9", "same": "73.9" },
        note: { en: "<code>@</code> reaches the same number without <code>products</code> ever existing: one compiled loop multiplies and accumulates as it goes. Same answer, less memory, one character.",
                ar: "<code>@</code> تبلغ العدد نفسه دون أن توجد <code>products</code> أصلًا: فحلقةٌ مترجَمة واحدة تضرب وتراكم وهي تمضي. الجوابُ نفسه وذاكرةٌ أقل وحرفٌ واحد." } }
    ]
  },

  "t-matmul": {
    id: "t-matmul",
    title: { en: "A prediction, shape by shape",
             ar: "تنبّؤٌ شكلًا بشكل" },
    lede: { en: "Four deliveries, two numbers describing each. Follow the shape column rather than the values: it is the shapes that decide whether a line runs at all.",
            ar: "أربعُ توصيلات وعددان يصفان كلًّا منها. اتبع عمود الشكل لا القيم: فالأشكالُ هي التي تقرّر هل يعمل السطر أصلًا." },
    code:
      "X = np.array([[3., 120.],\n" +
      "              [1.,  60.],\n" +
      "              [5., 200.],\n" +
      "              [2.,  95.]])\n" +
      "w = np.array([1.5, 0.02])\n" +
      "b = 10.\n" +
      "\n" +
      "scaled = X @ w\n" +
      "pred = scaled + b",
    steps: [
      { line: 1, vars: {},
        note: { en: "Each row is one delivery; the columns are parcels carried and kilometres driven.",
                ar: "كلُّ صفٍّ توصيلة؛ والعمودان طرودٌ محمولة وكيلومترات مقطوعة." } },
      { line: 5, vars: { "X.shape": "(4, 2)" },
        note: { en: "Four rows, two columns. Say it in that order every time: <code>(rows, columns)</code>.",
                ar: "أربعةُ صفوف وعمودان. قلها بهذا الترتيب كل مرة: <code>(الصفوف، الأعمدة)</code>." } },
      { line: 6, vars: { "X.shape": "(4, 2)", "w": "[1.5  0.02]", "w.shape": "(2,)" },
        note: { en: "One weight per column: a minute and a half per parcel, and about a minute per fifty kilometres.",
                ar: "وزنٌ لكل عمود: دقيقةٌ ونصف لكل طرد، ونحوُ دقيقة لكل خمسين كيلومترًا." } },
      { line: 8, vars: { "X.shape": "(4, 2)", "w.shape": "(2,)", "b": "10.0" },
        note: { en: "<code>b</code> is one number for the whole fleet &mdash; the fixed part of every delivery, before anything about this particular one is considered.",
                ar: "<code>b</code> عددٌ واحد للأسطول كله &mdash; الجزءُ الثابت من كل توصيلة قبل النظر في شيءٍ من خصوص هذه." } },
      { line: 9, vars: { "X.shape": "(4, 2)", "w.shape": "(2,)", "scaled": "[ 6.9  2.7 11.5  4.9]", "scaled.shape": "(4,)" },
        note: { en: "<code>(4, 2) @ (2,)</code>: the twos met, matched and vanished, and the four survived. Four rows in, four numbers out &mdash; one dot product per row.",
                ar: "<code>(4, 2) @ (2,)</code>: تلاقت الاثنتان وتطابقتا واختفتا، وبقيت الأربعة. أربعةُ صفوف تدخل وأربعةُ أعداد تخرج &mdash; ضربٌ قياسي لكل صفّ." } },
      { line: 9, vars: { "scaled": "[ 6.9  2.7 11.5  4.9]", "pred": "[16.9 12.7 21.5 14.9]", "pred.shape": "(4,)" },
        note: { en: "Adding a single number <a href=\"#l12-h1\">broadcasts</a> it over all four without changing the shape. <code>X @ w + b</code> is the whole of a linear model's prediction, and you have now watched it run.",
                ar: "إضافةُ عددٍ مفرد <a href=\"#l12-h1\">تبثّه</a> على الأربعة بلا تغيير الشكل. و<code>X @ w + b</code> هي تنبّؤُ النموذج الخطي كلّه، وقد رأيته يعمل الآن." } }
    ]
  },

  "t-vector": {
    id: "t-vector",
    title: { en: "A loop with three jobs, done without a loop",
             ar: "حلقةٌ بثلاث مهام تُؤدَّى بلا حلقة" },
    lede: { en: "The counter, the total and the best-so-far all disappear into three expressions. Watch the mask: it is built once and used twice.",
            ar: "العدّادُ والمجموع والأفضلُ حتى الآن تختفي كلها في ثلاثة تعابير. وراقب القناع: فهو يُبنى مرة ويُستعمل مرتين." },
    code:
      "marks = np.array([40., 55., 70., 85., 100., 32., 61.])\n" +
      "\n" +
      "passed = marks >= 60\n" +
      "count = passed.sum()\n" +
      "chosen = marks[passed]\n" +
      "total = chosen.sum()\n" +
      "best = marks.max()",
    steps: [
      { line: 1, vars: {},
        note: { en: "Seven marks. The loop version needed a counter at zero, a total at zero and a &ldquo;best&rdquo; initialised to the first mark.",
                ar: "سبعُ علامات. ونسخةُ الحلقة احتاجت عدّادًا من صفر ومجموعًا من صفر و«أفضلَ» مهيَّأً بأول علامة." } },
      { line: 3, vars: { "marks": "[ 40.  55.  70.  85. 100.  32.  61.]" },
        note: { en: "Nothing is initialised here, which is the first thing the loop stops needing.",
                ar: "لا شيء يُهيَّأ هنا، وذلك أولُ ما تكفّ الحلقة عن الحاجة إليه." } },
      { line: 4, vars: { "marks": "[ 40.  55.  70.  85. 100.  32.  61.]", "passed": "[False False  True  True  True False  True]" },
        note: { en: "The <code>if</code> became a <a href=\"#l13-h2\">mask</a>: one answer per mark, the same shape as the array, computed in one go.",
                ar: "صارت <code>if</code> <a href=\"#l13-h2\">قناعًا</a>: جوابٌ لكل علامة بشكل المصفوفة نفسه محسوبًا دفعةً واحدة." } },
      { line: 5, vars: { "passed": "[False False  True  True  True False  True]", "count": "4" },
        note: { en: "The counter became <code>.sum()</code> on the mask, because <code>True</code> adds as 1. Four passes.",
                ar: "صار العدّادُ <code>.sum()</code> على القناع، لأن <code>True</code> تُجمع كـ 1. أربعةُ نجاحات." } },
      { line: 6, vars: { "passed": "[False False  True  True  True False  True]", "count": "4", "chosen": "[ 70.  85. 100.  61.]" },
        note: { en: "The same mask again, this time selecting. Building it once and using it twice is the move worth copying.",
                ar: "القناعُ نفسه ثانيةً، وهذه المرة مختارًا. وبناؤه مرة واستعماله مرتين هي الحركةُ الجديرة بالنقل." } },
      { line: 7, vars: { "count": "4", "chosen": "[ 70.  85. 100.  61.]", "total": "316.0" },
        note: { en: "The accumulator became one <code>.sum()</code> over the four that were selected.",
                ar: "صار المُراكِم <code>.sum()</code> واحدة على الأربع المختارة." } },
      { line: 7, vars: { "count": "4", "total": "316.0", "best": "100.0" },
        note: { en: "And &ldquo;best so far&rdquo; became <code>.max()</code>, which has no starting value to get wrong &mdash; the one place the loop version is quietly fragile.",
                ar: "وصار «الأفضلُ حتى الآن» <code>.max()</code> التي لا قيمةَ بدءٍ فيها لتُخطئ &mdash; وهو الموضعُ الوحيد الذي تكون فيه نسخةُ الحلقة هشّةً بصمت." } }
    ]
  }

});
