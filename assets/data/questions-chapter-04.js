/* ============================================================
   Chapter 4 tests A (core) and B (advanced).

   Eighteen questions each: the chapter is three lectures, so it
   sits between Chapter 3's twenty and Chapter 2's sixteen. Test A
   samples all three lessons at easy and medium; Test B is hard
   throughout and every question crosses at least two lessons.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["chapter-04-test-a"] = {
  title: { en: "Chapter 4 Test A — Core", ar: "اختبار الفصل 4 أ — الأساسيات" },
  intro: {
    en: "Eighteen questions across all three lessons, easy and medium. Most of them are answered by reading two shapes and asking what the numbers are supposed to mean. Wrong answers link to the paragraph to re-read.",
    ar: "ثمانية عشر سؤالًا على الدروس الثلاثة، بالسهل والمتوسط. وأكثرها يُجاب بقراءة شكلين والسؤال عمّا يُفترض أن تعنيه الأعداد. والأجوبة الخاطئة ترتبط بالفقرة التي تعيد قراءتها."
  },
  questions: [
    {
      id: "c4a01", type: "tf", level: "easy", topics: ["dot"],
      q: { en: "For two 1-D arrays of the same length, <code>a @ b</code> gives a single number.",
           ar: "لمصفوفتين أحاديتين بالطول نفسه، تعطي <code>a @ b</code> عددًا واحدًا." },
      truth: true,
      explain: { en: "Multiply pairwise, then add: the adding is what collapses the whole thing to one value. Compare <code>a * b</code>, which stops after the multiplying and hands back an array the same length as both inputs. Those two lines look almost identical and differ in their output's <em>shape</em>, which is the chapter's recurring theme.",
                 ar: "اضرب موضعًا بموضع ثم اجمع: والجمعُ هو ما يَطبِق الأمر كله في قيمة واحدة. وقارن <code>a * b</code> التي تتوقف بعد الضرب وتُعيد مصفوفة بطول المدخلين. والسطران يكادان يتطابقان ويختلفان في <em>شكل</em> المخرج، وذلك هو موضوع الفصل المتكرّر." }
    },
    {
      id: "c4a02", type: "output", level: "easy", topics: ["dot"],
      q: { en: "Write the line this prints.", ar: "اكتب السطر الذي يطبعه." },
      code: "import numpy as np\n\nmarks = np.array([80., 60., 90.])\nweights = np.array([0.25, 0.25, 0.5])\n\nprint(marks @ weights)",
      blanks: [{ accept: ["80.0", "80"], lines: 1 }],
      explain: { en: "20 + 15 + 45. The result is a plain number, not an array, so it prints as <code>80.0</code> with no brackets. If you wrote <code>[20. 15. 45.]</code> you stopped one step early &mdash; that is what <code>marks * weights</code> gives, and adding <code>.sum()</code> to it reaches the same 80.0.",
                 ar: "20 + 15 + 45. والنتيجةُ عددٌ مجرّد لا مصفوفة، فتُطبع <code>80.0</code> بلا أقواس. فإن كتبت <code>[20. 15. 45.]</code> فقد توقفت قبل خطوة &mdash; فذلك ما تعطيه <code>marks * weights</code>، وإضافةُ <code>.sum()</code> إليها تبلغ 80.0 نفسها." }
    },
    {
      id: "c4a03", type: "mcq", level: "easy", topics: ["norm"],
      q: { en: "What does <code>np.linalg.norm(np.array([5., 12.]))</code> give?",
           ar: "ماذا تعطي <code>np.linalg.norm(np.array([5., 12.]))</code>؟" },
      options: [
        { en: "<code>13.0</code> &mdash; the square root of 25 + 144", ar: "<code>13.0</code> &mdash; جذرُ 25 + 144" },
        { en: "<code>17.0</code> &mdash; the two values added", ar: "<code>17.0</code> &mdash; القيمتان مجموعتين" },
        { en: "<code>[5. 12.]</code> &mdash; the norm of each element", ar: "<code>[5. 12.]</code> &mdash; معيارُ كل عنصر" },
        { en: "<code>60.0</code> &mdash; the two values multiplied", ar: "<code>60.0</code> &mdash; القيمتان مضروبتين" }
      ],
      answer: 0,
      explain: { en: "Square each, add, take the square root &mdash; Pythagoras, in as many dimensions as the array has. The answer that simply adds the two values is worth naming, because it is a real alternative measure of size (the sum of absolute values), used in some places for good reasons; it is simply not what <code>norm</code> computes by default. The third is the shape mistake: a norm always collapses a vector to one number.",
                 ar: "ربِّع كلًّا واجمع وخذ الجذر &mdash; فيثاغورس بعدد أبعاد المصفوفة. والجوابُ الذي يجمع القيمتين فحسب جديرٌ بالتسمية لأنه مقياس حجمٍ بديل حقيقي (مجموع القيم المطلقة) يُستعمل في مواضع لأسبابٍ وجيهة؛ لكنه ليس ما تحسبه <code>norm</code> افتراضًا. والثالث خطأُ الشكل: فالمعيارُ يَطبِق المتجه دائمًا في عدد واحد." }
    },
    {
      id: "c4a04", type: "fill", level: "medium", topics: ["distance", "axis"],
      q: { en: "Three patients on file, one new arrival. Fill the blank so that one distance comes back per patient.",
           ar: "ثلاثةُ مرضى في السجل ووافدٌ جديد. أكمل الفراغ لتعود مسافةٌ لكل مريض." },
      code: "past = np.array([[36.9, 88., 124.],\n                 [39.2, 95., 150.],\n                 [37.4, 70., 118.]])\nnew = np.array([38.0, 90., 130.])\n\nd = np.linalg.norm(past - new, ____1____)\nprint(d.round(2))   # [ 6.42 20.65 23.33]",
      blanks: [
        { accept: ["axis=1", "axis = 1"], label: { en: "one per patient", ar: "واحدة لكل مريض" } }
      ],
      explain: { en: "<code>past - new</code> broadcasts the new patient against all three rows and gives a <code>(3, 3)</code> array of differences. <code>axis=1</code> then collapses the three measurements of each row, leaving one distance per patient. Leave it out and <code>norm</code> reduces the entire table to a single number &mdash; no error, one meaningless answer. The axis you name is the one that disappears, exactly as for <code>sum</code> and <code>mean</code>.",
                 ar: "<code>past - new</code> تبثّ المريض الجديد على الصفوف الثلاثة فتعطي مصفوفة فروق <code>(3, 3)</code>. ثم <code>axis=1</code> تَطبِق قياسات كل صفّ الثلاثة فتترك مسافةً لكل مريض. واتركها تُخفّض <code>norm</code> الجدولَ كله إلى عدد واحد &mdash; بلا خطأ وبجوابٍ واحد بلا معنى. فالمحور الذي تسمّيه هو الذي يختفي، تمامًا كما في <code>sum</code> و<code>mean</code>." }
    },
    {
      id: "c4a05", type: "compare", level: "medium", topics: ["scale-distance", "distance"],
      q: { en: "The same four patients and the same new arrival, with and without scaling the columns first. What is the difference?",
           ar: "المرضى الأربعة أنفسهم والوافد نفسه، بتقييس الأعمدة أولًا وبدونه. فما الفرق؟" },
      codeA: "d = np.linalg.norm(past - new, axis=1)\nprint(d.round(2))\nprint(d.argmin())",
      codeB: "low, high = past.min(axis=0), past.max(axis=0)\npast_s = (past - low) / (high - low)\nnew_s = (new - low) / (high - low)\n\nd = np.linalg.norm(past_s - new_s, axis=1)\nprint(d.round(3))\nprint(d.argmin())",
      options: [
        { en: "They pick different patients. Unscaled, blood pressure's large numbers dominate the distance and the nearest record is the one with no fever at all; scaled, each column counts equally and the feverish patient wins.",
          ar: "ينتقيان مريضين مختلفين. فبلا تقييس يحكم ضغطُ الدم المسافةَ بأعداده الكبيرة فيكون أقربُ سجلّ هو الذي لا حمّى فيه إطلاقًا؛ وبالتقييس يُحسب كل عمود بالتساوي فيفوز المحموم." },
        { en: "They pick the same patient; scaling only makes the numbers smaller and easier to read.",
          ar: "ينتقيان المريض نفسه؛ والتقييسُ يصغّر الأعداد ويسهّل قراءتها فقط." },
        { en: "B raises, because the columns no longer have comparable units.",
          ar: "B يرفع خطأً، لأن الأعمدة لم تعد بوحدات متقارنة." },
        { en: "A is correct and B distorts the data by changing the recorded values.",
          ar: "A صحيح وB يشوّه البيانات بتغيير القيم المسجَّلة." }
      ],
      answer: 0,
      explain: { en: "Neither version raises or warns; both return four plausible distances. The answer that calls scaling a distortion is worth taking seriously rather than dismissing, because scaling <em>does</em> change the numbers &mdash; the answer is that the unscaled version already contained a weighting nobody chose, handed to it by whoever decided to record pressure in millimetres and temperature in degrees. There is no neutral option: you either pick the weighting or inherit it.",
                 ar: "لا نسخةَ ترفع خطأً ولا تحذّر؛ وكلتاهما تُعيد أربع مسافات معقولة. والجوابُ الذي يسمّي التقييس تشويهًا جديرٌ بالأخذ بجدّية لا بالرفض، فالتقييسُ <em>يغيّر</em> الأعداد فعلًا &mdash; والجواب أن النسخة غير المقيَّسة كانت تحوي أصلًا ترجيحًا لم يختره أحد، سلّمه إليها من قرّر تسجيل الضغط بالمليمترات والحرارة بالدرجات. فلا خيار محايد: إما أن تختار الترجيح أو أن ترثه." }
    },
    {
      id: "c4a06", type: "trace", level: "medium", topics: ["dot"],
      q: { en: "State the value of each name at the end.", ar: "حدّد قيمة كل اسم في النهاية." },
      code: "marks = np.array([80., 60., 90.])\nweights = np.array([0.25, 0.25, 0.5])\n\nproducts = marks * weights\ntotal = products.sum()\nsame = marks @ weights",
      blanks: [
        { accept: ["[20. 15. 45.]"], label: { en: "<code>products</code>", ar: "<code>products</code>" } },
        { accept: ["80.0", "80"], label: { en: "<code>total</code>", ar: "<code>total</code>" } },
        { accept: ["80.0", "80"], label: { en: "<code>same</code>", ar: "<code>same</code>" } }
      ],
      explain: { en: "The two steps and the one operator that does both. <code>@</code> never builds <code>products</code>: it multiplies and accumulates in a single compiled pass, which is why it uses less memory on a long vector. Worth noticing in the printed form: <code>[20. 15. 45.]</code> has trailing dots because the array is <code>float64</code>, inherited from <code>weights</code>.",
                 ar: "الخطوتان والمُعاملُ الواحد الذي يؤديهما. فـ <code>@</code> لا تبني <code>products</code> أبدًا: بل تضرب وتراكم في مرورٍ مترجَم واحد، ولذلك تستعمل ذاكرةً أقل في متجهٍ طويل. وجديرٌ بالملاحظة في الصيغة المطبوعة: <code>[20. 15. 45.]</code> بنقاطٍ لاحقة لأن المصفوفة <code>float64</code> موروثةً من <code>weights</code>." }
    },
    {
      id: "c4a07", type: "mcq", level: "easy", topics: ["shape-rule"],
      q: { en: "What is the shape of <code>A @ b</code> when <code>A</code> is <code>(4, 3)</code> and <code>b</code> is <code>(3,)</code>?",
           ar: "ما شكل <code>A @ b</code> حين تكون <code>A</code> بـ <code>(4, 3)</code> و<code>b</code> بـ <code>(3,)</code>؟" },
      options: [
        { en: "<code>(4,)</code>", ar: "<code>(4,)</code>" },
        { en: "<code>(4, 3)</code>", ar: "<code>(4, 3)</code>" },
        { en: "<code>(3,)</code>", ar: "<code>(3,)</code>" },
        { en: "<code>(4, 1)</code>", ar: "<code>(4, 1)</code>" }
      ],
      answer: 0,
      explain: { en: "The two 3s meet, match and vanish; the 4 survives. One dot product per row, four rows, four numbers. <code>(4, 1)</code> is the answer people expect from a textbook, where the result is drawn as a column &mdash; NumPy gives you a flat <code>(4,)</code> with no column-ness at all, and if something downstream needs <code>(4, 1)</code> you have to say so with <code>[:, None]</code>.",
                 ar: "الثلاثتان تتلاقيان وتتطابقان وتختفيان؛ وتبقى الـ 4. ضربٌ قياسي لكل صفّ، وأربعةُ صفوف، وأربعةُ أعداد. و<code>(4, 1)</code> هي ما يتوقعه الناس من الكتب حيث تُرسم النتيجة عمودًا &mdash; ونمباي تعطيك <code>(4,)</code> مسطّحة بلا عموديّة إطلاقًا، فإن احتاج شيءٌ لاحق <code>(4, 1)</code> فعليك أن تقول ذلك بـ <code>[:, None]</code>." }
    },
    {
      id: "c4a08", type: "output", level: "easy", topics: ["matmul"],
      q: { en: "Write the line this prints.", ar: "اكتب السطر الذي يطبعه." },
      code: "marks = np.array([[72., 65., 80.],\n                  [48., 55., 60.],\n                  [90., 88., 95.]])\nw = np.array([0.2, 0.3, 0.5])\n\nprint(marks @ w)",
      blanks: [{ accept: ["[73.9 56.1 91.9]"], lines: 1 }],
      explain: { en: "Three students in, three final marks out &mdash; the loop over rows written as one operator. Each row met the same weights and produced its own dot product. Change <code>@</code> to <code>*</code> and you get a <code>(3, 3)</code> table of weighted marks instead, with no error to tell you.",
                 ar: "ثلاثةُ طلبة يدخلون وثلاثُ علاماتٍ نهائية تخرج &mdash; الحلقةُ على الصفوف مكتوبةً مُعاملًا واحدًا. فلاقى كل صفٍّ الأوزان نفسها وأنتج ضربه القياسي. وبدّل <code>@</code> بـ <code>*</code> تحصل على جدول <code>(3, 3)</code> من علاماتٍ موزونة بدلًا من ذلك، بلا خطأٍ يخبرك." }
    },
    {
      id: "c4a09", type: "multi", level: "medium", topics: ["shape-rule"],
      q: { en: "Select <strong>every</strong> pair that NumPy will multiply with <code>@</code> without raising.",
           ar: "اختر <strong>كل</strong> زوجٍ تضربه نمباي بـ <code>@</code> بلا رفع خطأ." },
      options: [
        { en: "<code>(4, 3) @ (3,)</code>", ar: "<code>(4, 3) @ (3,)</code>" },
        { en: "<code>(4, 3) @ (4,)</code>", ar: "<code>(4, 3) @ (4,)</code>" },
        { en: "<code>(3,) @ (3, 4)</code>", ar: "<code>(3,) @ (3, 4)</code>" },
        { en: "<code>(4, 3) @ (3, 3)</code>", ar: "<code>(4, 3) @ (3, 3)</code>" },
        { en: "<code>(3, 1) @ (1, 3)</code>", ar: "<code>(3, 1) @ (1, 3)</code>" }
      ],
      answer: [0, 2, 3, 4],
      explain: { en: "Only the second fails: the vector's 4 lands against the table's last dimension, 3. Note what the third and fifth teach. A 1-D array on the <em>left</em> behaves as a row, so its single dimension is matched against the table's first &mdash; the same array fits on one side and not the other. And <code>(3, 1) @ (1, 3)</code> is legal and gives <code>(3, 3)</code>: a single column times a single row produces a whole table, which surprises people until they apply the rule rather than their intuition.",
                 ar: "الثاني وحده يفشل: فالـ 4 في المتجه تهبط مقابل بُعد الجدول الأخير وهو 3. ولاحظ ما يعلّمه الثالث والخامس. فالمصفوفةُ الأحادية <em>يسارًا</em> تتصرّف صفًّا، فيُطابَق بُعدها الوحيد ببُعد الجدول الأول &mdash; فالمصفوفةُ نفسها تنطبق في جهة لا في الأخرى. و<code>(3, 1) @ (1, 3)</code> مشروعة وتعطي <code>(3, 3)</code>: فعمودٌ واحد في صفٍّ واحد يُنتج جدولًا كاملًا، وذلك يفاجئ الناس حتى يطبّقوا القاعدة بدل حدسهم." }
    },
    {
      id: "c4a10", type: "error", level: "medium", topics: ["star-vs-at"],
      q: { en: "This should print one final mark per student and prints a whole table instead. Click the line to change.",
           ar: "ينبغي أن يطبع هذا علامةً نهائية لكل طالب وهو يطبع جدولًا كاملًا. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\nmarks = np.array([[72., 65., 80.],\n                  [48., 55., 60.],\n                  [90., 88., 95.]])\nw = np.array([0.2, 0.3, 0.5])\n\nfinals = marks * w\n\nprint(finals)",
      answer: 8,
      explain: { en: "<code>*</code> weighted all nine marks and kept them; <code>@</code> weights them and adds each row up. The relationship is exact and worth memorising: <code>@</code> is <code>*</code> followed by a sum along the last axis, so <code>(marks * w).sum(axis=1)</code> is the same five numbers as <code>marks @ w</code>. Nothing raised here, which is the point &mdash; the shapes are <code>(3, 3)</code> against <code>(3,)</code>, and the complaint, if it comes at all, comes later and somewhere else.",
                 ar: "<code>*</code> وزنت العلامات التسع وأبقتها؛ و<code>@</code> تزنها وتجمع كل صفّ. والعلاقةُ دقيقة وجديرةٌ بالحفظ: فـ <code>@</code> هي <code>*</code> متبوعةً بجمعٍ على المحور الأخير، فـ <code>(marks * w).sum(axis=1)</code> هي الأعداد نفسها التي تعطيها <code>marks @ w</code>. ولم يُرفع خطأٌ هنا، وذلك هو المقصود &mdash; فالشكلان <code>(3, 3)</code> مقابل <code>(3,)</code>، والشكوى إن جاءت فمتأخرةً وفي مكان آخر." },
      solution: { code: "finals = marks @ w   # [73.9 56.1 91.9]" }
    },
    {
      id: "c4a11", type: "fill", level: "medium", topics: ["transpose", "shape-rule"],
      q: { en: "The marks arrived one row per subject instead of one row per student. Fill the blank so the weighted totals come out.",
           ar: "وصلت العلامات بصفٍّ لكل مادة بدل صفٍّ لكل طالب. أكمل الفراغ لتخرج المجاميع الموزونة." },
      code: "by_subject = np.array([[72., 48., 90.],\n                       [65., 55., 88.],\n                       [80., 60., 95.]])\nw = np.array([0.2, 0.3, 0.5])\n\nprint(____1____ @ w)   # [73.9 56.1 91.9]",
      blanks: [
        { accept: ["by_subject.T", "by_subject.transpose()"], label: { en: "turn the table round", ar: "أدِر الجدول" } }
      ],
      explain: { en: "<code>(3, 3)</code> against <code>(3,)</code> would have run without complaint here, because the table is square &mdash; and it would have weighted the wrong direction, giving three numbers that are not anybody's final mark. That is the chapter-3 lesson arriving in a new place: a square table hides an orientation mistake. <code>w @ by_subject</code> also works, for a different reason (a vector on the left behaves as a row), but <code>.T</code> says what you meant.",
                 ar: "كانت <code>(3, 3)</code> مقابل <code>(3,)</code> ستعمل هنا بلا شكوى لأن الجدول مربّع &mdash; وكانت ستزن الاتجاه الخاطئ فتعطي ثلاثة أعداد ليست علامةَ أحدٍ النهائية. وذلك درسُ الفصل 3 يصل في مكانٍ جديد: فالجدولُ المربّع يُخفي خطأ الاتجاه. و<code>w @ by_subject</code> تعمل أيضًا لسببٍ آخر (فالمتجه يسارًا يتصرّف صفًّا)، لكن <code>.T</code> تقول ما قصدت." }
    },
    {
      id: "c4a12", type: "tf", level: "medium", topics: ["transpose-1d"],
      q: { en: "<code>w.T</code> turns a 1-D array of shape <code>(3,)</code> into a column of shape <code>(3, 1)</code>.",
           ar: "<code>w.T</code> تحوّل مصفوفة أحادية بالشكل <code>(3,)</code> إلى عمودٍ بالشكل <code>(3, 1)</code>." },
      truth: false,
      explain: { en: "<code>.T</code> swaps two dimensions, and a 1-D array has only one, so it does nothing at all &mdash; <code>w.T.shape</code> is still <code>(3,)</code>. Textbooks draw a vector as a column and its transpose as a row, which is exactly why people reach for <code>.T</code> here and are baffled when the shape does not move. <code>w[:, None]</code> is the tool that makes a column, and once the array really is 2-D, <code>.T</code> behaves as you expect.",
                 ar: "<code>.T</code> تبدّل بُعدين، والمصفوفةُ الأحادية ليس لها إلا واحد، فلا تفعل شيئًا إطلاقًا &mdash; فـ <code>w.T.shape</code> لا تزال <code>(3,)</code>. والكتبُ ترسم المتجه عمودًا ومنقولَه صفًّا، ولذلك بالضبط يمدّ الناس أيديهم إلى <code>.T</code> هنا ويُدهشون ألّا يتحرك الشكل. و<code>w[:, None]</code> هي أداةُ صنع العمود، ومتى صارت المصفوفة ثنائيةً فعلًا تصرّفت <code>.T</code> كما تتوقع." }
    },
    {
      id: "c4a13", type: "mcq", level: "easy", topics: ["vectorise", "vector-recipe"],
      q: { en: "Which expression replaces this loop?",
           ar: "أيُّ تعبيرٍ يحلّ محلّ هذه الحلقة؟" },
      code: "count = 0\nfor m in minutes:\n    if m > 30:\n        count += 1",
      options: [
        { en: "<code>count = (minutes &gt; 30).sum()</code>", ar: "<code>count = (minutes &gt; 30).sum()</code>" },
        { en: "<code>count = minutes[minutes &gt; 30].sum()</code>", ar: "<code>count = minutes[minutes &gt; 30].sum()</code>" },
        { en: "<code>count = np.where(minutes &gt; 30)</code>", ar: "<code>count = np.where(minutes &gt; 30)</code>" },
        { en: "<code>count = minutes.sum() &gt; 30</code>", ar: "<code>count = minutes.sum() &gt; 30</code>" }
      ],
      answer: 0,
      explain: { en: "A counter becomes <code>.sum()</code> on the <em>mask</em>, because <code>True</code> adds as 1. The version that sums <code>minutes[minutes &gt; 30]</code> is the most instructive error: it sums the minutes themselves rather than counting them, so for late deliveries of 45 and 61 it would report 106 instead of 2. Counting and totalling differ by exactly one pair of brackets, and both run.",
                 ar: "العدّادُ يصير <code>.sum()</code> على <em>القناع</em>، لأن <code>True</code> تُجمع كـ 1. والنسخةُ التي تجمع <code>minutes[minutes &gt; 30]</code> أنفعُ خطأ: فهو يجمع الدقائق نفسها بدل عدّها، فلتوصيلتين متأخرتين 45 و61 يُبلغ 106 بدل 2. فالعدُّ والجمع يختلفان بزوج أقواسٍ واحد بالضبط، وكلاهما يعمل." }
    },
    {
      id: "c4a14", type: "output", level: "easy", topics: ["rng-seed"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "print(np.random.default_rng(5).integers(10, 100, size=4))\nprint(np.random.default_rng(5).integers(10, 100, size=4))",
      blanks: [{ accept: ["[70 82 12 82]\n[70 82 12 82]"], lines: 2 }],
      explain: { en: "Two separate generators built from the same seed produce the same sequence &mdash; on this machine, on yours, and next year. That is the whole point of a seed: unpredictable to you, entirely repeatable for anyone who has the number. Note the two 82s: random does not mean &ldquo;no repeats&rdquo;, and a sequence that never repeated a value would not be random.",
                 ar: "مولّدان منفصلان من البذرة نفسها يُنتجان المتتالية نفسها &mdash; على هذا الجهاز وعلى جهازك والعام القادم. وذلك هو مقصود البذرة كله: لا يمكنك توقّعها وهي قابلة للتكرار تمامًا لمن عنده العدد. ولاحظ الـ 82 مرتين: فالعشوائيُّ لا يعني «بلا تكرار»، ومتتاليةٌ لا تكرّر قيمةً أبدًا ليست عشوائية." }
    },
    {
      id: "c4a15", type: "match", level: "medium", topics: ["vector-recipe"],
      q: { en: "Match each thing a loop does to the array expression that replaces it.",
           ar: "وصّل كل ما تفعله الحلقة بتعبير المصفوفة الذي يحلّ محله." },
      leftHead: { en: "In the loop", ar: "في الحلقة" },
      rightHead: { en: "In array code", ar: "في كود المصفوفات" },
      pairs: [
        { l: { en: "<code>if … else …</code> choosing between two values", ar: "<code>if … else …</code> تختار بين قيمتين" }, r: { code: "np.where(mask, a, b)" } },
        { l: { en: "a counter that increments", ar: "عدّادٌ يتزايد" }, r: { code: "mask.sum()" } },
        { l: { en: "a running total kept as you go", ar: "مجموعٌ جارٍ يُحفظ أثناء المرور" }, r: { code: "values.cumsum()" } },
        { l: { en: "&ldquo;the best so far&rdquo;", ar: "«الأفضل حتى الآن»" }, r: { code: "values.max()" } }
      ],
      explain: { en: "The third is the one people assume cannot be vectorised, because each entry really does depend on the one before it &mdash; and <code>cumsum</code> exists for exactly that. The useful question before you start is what each iteration needs from the previous one: nothing means it vectorises directly, a plain running total means a <code>cum</code> function already exists, and anything more complicated means the loop is the honest answer.",
                 ar: "الثالث هو ما يفترض الناس أنه لا يقبل التحويل، فكلُّ مدخلٍ يعتمد فعلًا على سابقه &mdash; و<code>cumsum</code> وُجدت لذلك بالضبط. والسؤالُ المفيد قبل أن تبدأ هو ماذا تحتاج كلُّ دورة من سابقتها: فلا شيء يعني تحويلًا مباشرًا، ومجموعٌ جارٍ بسيط يعني أن دالة <code>cum</code> موجودة، وما زاد تعقيدًا يعني أن الحلقة هي الجواب الأمين." }
    },
    {
      id: "c4a16", type: "order", level: "medium", topics: ["split"],
      q: { en: "Put a reproducible train/test split in order.",
           ar: "رتّب قسمةَ تدريبٍ واختبار قابلة للتكرار." },
      items: [
        { en: "Create a generator from a seed you write down: <code>rng = np.random.default_rng(42)</code>.", ar: "أنشئ مولّدًا من بذرةٍ تكتبها: <code>rng = np.random.default_rng(42)</code>." },
        { en: "Shuffle the <strong>row numbers</strong>, not the data: <code>order = rng.permutation(len(X))</code>.", ar: "اخلط <strong>أرقام الصفوف</strong> لا البيانات: <code>order = rng.permutation(len(X))</code>." },
        { en: "Decide where to cut: <code>cut = int(0.8 * len(X))</code>.", ar: "حدّد أين تقطع: <code>cut = int(0.8 * len(X))</code>." },
        { en: "Split the positions in two: <code>train, test = order[:cut], order[cut:]</code>.", ar: "اقسم المواضع نصفين: <code>train, test = order[:cut], order[cut:]</code>." },
        { en: "Index every array that must stay aligned with the same two sets of positions.", ar: "افهرس كل مصفوفة يجب أن تبقى محاذية بمجموعتَي المواضع نفسيهما." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 2 is the one that does the real work. Shuffling positions rather than data means the features and the answers can be split identically, by reusing <code>train</code> and <code>test</code> &mdash; shuffle the two arrays separately and every answer silently belongs to a different row from the one it describes, with no error and the right shapes everywhere.",
                 ar: "الخطوة 2 هي التي تؤدي العمل الحقيقي. فخلطُ المواضع لا البيانات يعني أن السمات والأجوبة تُقسمان القسمة نفسها بإعادة استعمال <code>train</code> و<code>test</code> &mdash; واخلط المصفوفتين منفصلتين ينتمِ كلُّ جواب بصمتٍ إلى صفٍّ غير الذي يصفه، بلا خطأ وبالأشكال الصحيحة في كل مكان." }
    },
    {
      id: "c4a17", type: "complete", level: "medium", topics: ["vectorise", "where"],
      q: { en: "A late fee of five shekels applies to any delivery over thirty minutes, and nothing otherwise. Which line?",
           ar: "رسمُ تأخيرٍ خمسةُ شواكل لكل توصيلة فوق ثلاثين دقيقة، ولا شيء فيما عدا ذلك. فأي سطر؟" },
      code: "minutes = np.array([12., 45., 8., 61., 30.])\n\n# which line?\n\nprint(fees)   # [0. 5. 0. 5. 0.]",
      options: [
        { code: "fees = np.where(minutes > 30, 5.0, 0.0)" },
        { code: "fees = np.where(minutes > 30, 0.0, 5.0)" },
        { code: "fees = minutes[minutes > 30] * 5.0" },
        { code: "fees = (minutes > 30) * minutes" }
      ],
      answer: 0,
      explain: { en: "Read <code>np.where</code> as &ldquo;where the mask is true take the second argument, otherwise the third&rdquo;, in that order &mdash; the version with <code>0.0</code> and <code>5.0</code> the other way round is the same line with its arguments reversed, and it runs perfectly. The version that selects <code>minutes[minutes &gt; 30]</code> gives only two numbers instead of five, losing which delivery each belongs to. Note the last delivery: exactly 30 minutes pays nothing, because the test is strictly greater than.",
                 ar: "اقرأ <code>np.where</code> «حيث يصدق القناع خذ الوسيط الثاني وإلا فالثالث» بهذا الترتيب &mdash; فالنسخةُ التي عُكس فيها <code>0.0</code> و<code>5.0</code> هي السطر نفسه بوسيطين معكوسين وهي تعمل تمامًا. والنسخةُ التي تختار <code>minutes[minutes &gt; 30]</code> تعطي عددين فقط بدل خمسة فيُضيع لأي توصيلةٍ ينتمي كلٌّ. ولاحظ التوصيلة الأخيرة: فثلاثون دقيقة بالضبط لا تدفع شيئًا، لأن الفحص أكبر تمامًا." }
    },
    {
      id: "c4a18", type: "output", level: "medium", topics: ["rng-draws", "split"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "rng = np.random.default_rng(3)\norder = rng.permutation(8)\n\nprint(order)\nprint(order[:6], order[6:])",
      blanks: [{ accept: ["[6 7 2 1 4 5 3 0]\n[6 7 2 1 4 5] [3 0]"], lines: 2 }],
      explain: { en: "<code>permutation(8)</code> shuffles the whole numbers below 8, which are exactly the row numbers of an eight-row table. Slicing the shuffled list is what makes the split: six positions to train on, two held back. Nothing here touches any data &mdash; these are positions, which is why the same two lists can be used to split a table of features and a separate array of answers in step with each other.",
                 ar: "<code>permutation(8)</code> تخلط الأعداد الصحيحة دون 8، وهي بالضبط أرقام صفوف جدولٍ من ثمانية صفوف. وتقطيعُ القائمة المخلوطة هو ما يصنع القسمة: ستةُ مواضع للتدريب واثنان محجوزان. ولا شيء هنا يمسّ بيانات &mdash; فهذه مواضع، ولذلك تصلح القائمتان نفسهما لقسمة جدول سمات ومصفوفة أجوبة منفصلة بالتوازي." }
    }
  ]
};

window.OOPBanks["chapter-04-test-b"] = {
  title: { en: "Chapter 4 Test B — Advanced", ar: "اختبار الفصل 4 ب — المتقدّم" },
  intro: {
    en: "Eighteen hard questions, every one of which crosses at least two lessons &mdash; a dot product that is also a broadcast, a shape rule that is also a scaling decision, a seed that is also a copy. Almost nothing here raises an error, which is the point.",
    ar: "ثمانية عشر سؤالًا صعبًا، كلٌّ منها يعبر درسين على الأقل &mdash; ضربٌ قياسي هو بثٌّ أيضًا، وقاعدةُ أشكالٍ هي قرارُ تقييسٍ أيضًا، وبذرةٌ هي نسخةٌ أيضًا. ولا يكاد شيءٌ هنا يرفع خطأً، وذلك هو المقصود."
  },
  questions: [
    {
      id: "c4b01", type: "output", level: "hard", topics: ["matmul", "shape-rule"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nmarks = np.array([[72., 65., 80.],\n                  [48., 55., 60.]])\nW = np.array([[0.2, 0.5],\n              [0.3, 0.3],\n              [0.5, 0.2]])\n\nprint(marks @ W)",
      blanks: [{ accept: ["[[73.9 71.5]\n [56.1 52.5]]"], lines: 2 }],
      explain: { en: "<code>(2, 3) @ (3, 2) &rarr; (2, 2)</code>: two students down the rows, two weighting schemes across the columns, four numbers. The schemes have to be <strong>columns</strong> of <code>W</code> for this to mean anything &mdash; written as rows you would have a <code>(2, 3)</code> array and a <code>ValueError</code>, which is the kind outcome. Reading the result: the second scheme leans on coursework, so it favours the first student slightly less and the second student rather more than the official one does.",
                 ar: "<code>(2, 3) @ (3, 2) &rarr; (2, 2)</code>: طالبان في الصفوف ونظاما ترجيح في الأعمدة وأربعةُ أعداد. ويجب أن يكون النظامان <strong>عمودين</strong> في <code>W</code> ليعني هذا شيئًا &mdash; فلو كُتبا صفّين لكانت عندك مصفوفة <code>(2, 3)</code> و<code>ValueError</code>، وتلك النتيجة الرحيمة. وقراءةُ النتيجة: فالنظام الثاني يميل إلى أعمال الفصل، فيُحابي الطالب الأول أقلّ قليلًا والثاني أكثر مما يفعل الرسمي." }
    },
    {
      id: "c4b02", type: "compare", level: "hard", topics: ["star-vs-at", "linear-model"],
      q: { en: "Two ways of writing the same prediction. What is the difference?",
           ar: "طريقتان لكتابة التنبّؤ نفسه. فما الفرق؟" },
      codeA: "X = np.array([[0., 1.],\n              [2., 3.],\n              [4., 5.]])\nw = np.array([1., 2.])\n\nprint(X @ w)",
      codeB: "X = np.array([[0., 1.],\n              [2., 3.],\n              [4., 5.]])\nw = np.array([1., 2.])\n\nprint((X * w).sum(axis=1))",
      options: [
        { en: "No difference in the answer: both print <code>[ 2.  8. 14.]</code>. B builds a <code>(3, 2)</code> intermediate array and then collapses it; A never builds it. A is also the form every reader recognises.",
          ar: "لا فرق في الجواب: فكلاهما يطبع <code>[ 2.  8. 14.]</code>. وB يبني مصفوفة وسيطة <code>(3, 2)</code> ثم يَطبِقها؛ وA لا يبنيها أبدًا. وA هي الصيغة التي يعرفها كل قارئ أيضًا." },
        { en: "A gives three numbers and B gives a <code>(3, 2)</code> table.",
          ar: "A يعطي ثلاثة أعداد وB يعطي جدول <code>(3, 2)</code>." },
        { en: "They differ because <code>*</code> broadcasts and <code>@</code> does not.",
          ar: "يختلفان لأن <code>*</code> تبثّ و<code>@</code> لا تبثّ." },
        { en: "B sums the wrong axis, so it totals each column instead of each row.",
          ar: "B يجمع المحور الخاطئ فيجمع كل عمود بدل كل صفّ." }
      ],
      answer: 0,
      explain: { en: "This equivalence is the most useful sentence in the chapter: <strong><code>@</code> is <code>*</code> followed by a sum along the last axis</strong>. B is what <code>@</code> does, written out. The answer that says B gives a table describes <code>X * w</code> on its own, without the <code>.sum(axis=1)</code> &mdash; drop that call and B really does give a table, which is the mistake this comparison exists to inoculate against. The memory difference is real but small here; on a million rows it is not.",
                 ar: "هذا التكافؤ أنفعُ جملة في الفصل: <strong><code>@</code> هي <code>*</code> متبوعةً بجمعٍ على المحور الأخير</strong>. وB هو ما تفعله <code>@</code> مكتوبًا. والجوابُ الذي يقول إن B يعطي جدولًا يصف <code>X * w</code> وحدها بلا <code>.sum(axis=1)</code> &mdash; فأسقط ذلك النداء يُعطِ B جدولًا فعلًا، وهو الخطأ الذي وُجدت هذه المقارنة للتحصين منه. وفرقُ الذاكرة حقيقي لكنه صغير هنا؛ وعلى مليون صفّ ليس كذلك." }
    },
    {
      id: "c4b03", type: "trace", level: "hard", topics: ["scale-distance", "distance", "axis"],
      q: { en: "Four patients on file, one new arrival, scaled before comparing. State each shape, and the winner.",
           ar: "أربعةُ مرضى في السجل ووافدٌ جديد، مُقيَّسين قبل المقارنة. حدّد كل شكل والفائز." },
      code: "past = np.array([[36.9,  88., 124.],\n                 [39.2,  95., 150.],\n                 [37.4,  70., 118.],\n                 [38.1, 102., 165.]])\nnew = np.array([39.5, 90., 125.])\n\nlow = past.min(axis=0)\nhigh = past.max(axis=0)\n\npast_s = (past - low) / (high - low)\nnew_s = (new - low) / (high - low)\n\nd = np.linalg.norm(past_s - new_s, axis=1)",
      blanks: [
        { accept: ["(3,)", "(3, )"], label: { en: "<code>low.shape</code>", ar: "<code>low.shape</code>" } },
        { accept: ["(4, 3)", "(4,3)"], label: { en: "<code>past_s.shape</code>", ar: "<code>past_s.shape</code>" } },
        { accept: ["(4,)", "(4, )"], label: { en: "<code>d.shape</code>", ar: "<code>d.shape</code>" } },
        { accept: ["1"], label: { en: "<code>d.argmin()</code>", ar: "<code>d.argmin()</code>" } }
      ],
      explain: { en: "Three reductions and a broadcast in six lines, and the shapes tell you which is which. <code>axis=0</code> on the table gives one number per column, <code>(3,)</code>, which is what &ldquo;the range of this measurement&rdquo; means; dividing by it broadcasts down the rows and the table keeps its shape. Then <code>axis=1</code> on the differences gives one number per patient. Patient 1 wins &mdash; the <em>unscaled</em> version of the same code picks patient 0 instead, and neither warns you.",
                 ar: "ثلاثةُ تخفيضات وبثٌّ في ستة أسطر، والأشكالُ تخبرك أيُّها أيّ. فـ <code>axis=0</code> على الجدول تعطي عددًا لكل عمود <code>(3,)</code>، وهو معنى «مدى هذا القياس»؛ والقسمةُ عليه تُبثّ في الصفوف فيحتفظ الجدول بشكله. ثم <code>axis=1</code> على الفروق تعطي عددًا لكل مريض. والمريضُ 1 يفوز &mdash; والنسخةُ <em>غير المقيَّسة</em> من الكود نفسه تنتقي المريض 0 بدلًا منه، ولا واحدةَ تحذّرك." }
    },
    {
      id: "c4b04", type: "multi", level: "hard", topics: ["shape-rule", "star-vs-at", "transpose-1d", "dot"],
      q: { en: "Select <strong>every</strong> statement that is true.", ar: "اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "<code>a @ b</code> on two 1-D arrays of the same length gives one number.", ar: "<code>a @ b</code> لمصفوفتين أحاديتين بالطول نفسه تعطي عددًا واحدًا." },
        { en: "<code>@</code> is <code>*</code> followed by a sum along the last axis.", ar: "<code>@</code> هي <code>*</code> متبوعةً بجمعٍ على المحور الأخير." },
        { en: "<code>.T</code> on a 1-D array returns a column.", ar: "<code>.T</code> على مصفوفة أحادية تُعيد عمودًا." },
        { en: "A 1-D array on the left of <code>@</code> is matched against the table's <em>first</em> dimension, and on the right against its last.", ar: "المصفوفةُ الأحادية يسار <code>@</code> تُطابَق ببُعد الجدول <em>الأول</em>، ويمينه ببُعده الأخير." },
        { en: "<code>A @ B</code> and <code>B @ A</code> give the same answer whenever both are legal.", ar: "<code>A @ B</code> و<code>B @ A</code> تعطيان الجواب نفسه متى صحّتا." }
      ],
      answer: [0, 1, 3],
      explain: { en: "Three and five are the two false ones and they fail for opposite reasons. <code>.T</code> cannot return a column because there is only one dimension to swap &mdash; that is <code>[:, None]</code>'s job. <code>A @ B</code> and <code>B @ A</code> can both be legal and still differ: on two 2&times;2 matrices one swaps the columns and the other swaps the rows. The fourth statement is the rule that explains why the same vector fits on one side of a table and not the other, and is worth being able to state out loud.",
                 ar: "الثالثة والخامسة هما الكاذبتان وتفشلان لسببين متعاكسين. فـ <code>.T</code> لا تستطيع إعادة عمودٍ لأن ليس إلا بُعدٌ واحد يُبدَّل &mdash; وتلك مهمة <code>[:, None]</code>. و<code>A @ B</code> و<code>B @ A</code> قد تصحّان وتختلفان: فعلى مصفوفتين 2&times;2 تبدّل إحداهما الأعمدة والأخرى الصفوف. والعبارةُ الرابعة هي القاعدة التي تفسّر لماذا ينطبق المتجه نفسه في جهةٍ من الجدول دون الأخرى، وهي جديرةٌ بأن تقدر على قولها جهرًا." }
    },
    {
      id: "c4b05", type: "error", level: "hard", topics: ["linear-model", "shape-rule"],
      q: { en: "This should predict a delivery time for each of the three rows. Click the line to change.",
           ar: "ينبغي أن يتنبّأ هذا بوقت توصيلٍ لكل صفٍّ من الثلاثة. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\nX = np.array([[3., 120.],\n              [1.,  60.],\n              [5., 200.]])\nw = np.array([1.5, 0.02])\nb = 10.\n\nprint(w @ X + b)",
      answer: 9,
      explain: { en: "A vector on the <em>left</em> of <code>@</code> behaves as a row, so its 2 is matched against <code>X</code>'s first dimension, 3, and it raises. <code>X @ w + b</code> is the fix, and it is the form every library writes. Note that <code>w @ X.T + b</code> also works and gives the same three numbers &mdash; correct, and worse, because a reader now has to work out which way round the table was to know what the line means.",
                 ar: "المتجهُ <em>يسار</em> <code>@</code> يتصرّف صفًّا، فتُطابَق الـ 2 فيه ببُعد <code>X</code> الأول وهو 3 فيرفع خطأً. و<code>X @ w + b</code> هي الإصلاح، وهي الصيغة التي تكتبها كل مكتبة. ولاحظ أن <code>w @ X.T + b</code> تعمل أيضًا وتعطي الأعداد الثلاثة نفسها &mdash; صحيحةً وأسوأ، لأن على القارئ الآن أن يستنتج اتجاه الجدول ليعرف ما يعنيه السطر." },
      solution: { code: "print(X @ w + b)   # [16.9 12.7 21.5]" }
    },
    {
      id: "c4b06", type: "complete", level: "hard", topics: ["distance", "axis", "scale-distance"],
      q: { en: "<code>past_s</code> is <code>(4, 3)</code> and <code>new_s</code> is <code>(3,)</code>, both already scaled. Which line gives one distance per patient?",
           ar: "<code>past_s</code> بـ <code>(4, 3)</code> و<code>new_s</code> بـ <code>(3,)</code>، وكلاهما مُقيَّس. فأي سطر يعطي مسافةً لكل مريض؟" },
      code: "# which line?\n\nprint(d.shape)        # (4,)\nprint(d.argmin())     # 1",
      options: [
        { code: "d = np.linalg.norm(past_s - new_s, axis=1)" },
        { code: "d = np.linalg.norm(past_s - new_s)" },
        { code: "d = np.linalg.norm(past_s - new_s, axis=0)" },
        { code: "d = (past_s - new_s).sum(axis=1)" }
      ],
      answer: 0,
      explain: { en: "Every one of these runs. The second collapses everything to a single number, 2.022, which answers no question anyone asked. The third reduces down the columns and gives three numbers &mdash; one per measurement, not one per patient. The fourth is the most dangerous because its shape is right: it adds the signed differences, so a patient who is far above on one measurement and far below on another cancels out and looks like a perfect match. A distance must square before it adds, which is exactly what <code>norm</code> does.",
                 ar: "كلُّ واحدٍ من هذه يعمل. فالثاني يَطبِق كل شيء في عدد واحد 2.022 لا يجيب سؤالًا سأله أحد. والثالث يخفّض نزولًا في الأعمدة فيعطي ثلاثة أعداد &mdash; واحدًا لكل قياس لا لكل مريض. والرابع أخطرها لأن شكله صحيح: فهو يجمع الفروق بإشاراتها، فالمريضُ البعيد فوق في قياسٍ وبعيدٌ تحت في آخر يتلاشى ويبدو مطابقًا تمامًا. والمسافةُ يجب أن تُربّع قبل أن تجمع، وذلك بالضبط ما تفعله <code>norm</code>." }
    },
    {
      id: "c4b07", type: "mcq", level: "hard", topics: ["shape-rule", "broadcast-rule"],
      q: { en: "<code>t</code> is <code>(5, 3)</code> and <code>v</code> is <code>(5,)</code>. <code>t @ v</code> raises, and so does <code>t - v</code>, but <code>t - v[:, None]</code> works. Why?",
           ar: "<code>t</code> بـ <code>(5, 3)</code> و<code>v</code> بـ <code>(5,)</code>. فـ <code>t @ v</code> ترفع خطأً وكذلك <code>t - v</code>، لكن <code>t - v[:, None]</code> تعمل. لماذا؟" },
      options: [
        { en: "Both rules look at the last dimension on the left, 3, and the vector's 5 cannot meet it. <code>[:, None]</code> makes the vector <code>(5, 1)</code>, which broadcasting accepts because a 1 stretches &mdash; but matrix multiplication still would not, because it needs equality, not a 1.",
          ar: "القاعدتان تنظران إلى البُعد الأخير يسارًا وهو 3، والـ 5 في المتجه لا تستطيع لقاءه. و<code>[:, None]</code> تجعل المتجه <code>(5, 1)</code>، وهو ما يقبله البثُّ لأن الـ 1 تتمدّد &mdash; أما ضربُ المصفوفات فلن يقبله، إذ يحتاج تساويًا لا واحدًا." },
        { en: "Because <code>-</code> broadcasts and <code>@</code> does not broadcast at all.",
          ar: "لأن <code>-</code> تبثّ و<code>@</code> لا تبثّ إطلاقًا." },
        { en: "Because <code>[:, None]</code> transposes the vector so that its 5 lines up with the table's 5.",
          ar: "لأن <code>[:, None]</code> تنقل المتجه فتُحاذي الـ 5 فيه الـ 5 في الجدول." },
        { en: "Because subtraction compares shapes from the left and matrix multiplication from the right.",
          ar: "لأن الطرح يقارن الأشكال من اليسار وضربُ المصفوفات من اليمين." }
      ],
      answer: 0,
      explain: { en: "The two rules are cousins and the difference is precise: both align from the right, and both put the vector's single dimension against the table's last. Broadcasting then accepts equal <em>or</em> 1; matrix multiplication accepts only equal. That is why <code>(5, 3)</code> with <code>(5, 1)</code> subtracts happily and still will not multiply. Calling <code>[:, None]</code> a transpose is the common mis-statement &mdash; <code>[:, None]</code> adds a dimension, it does not transpose anything, and the 5 never moves.",
                 ar: "القاعدتان ابنتا عمّ والفرقُ دقيق: فكلتاهما تحاذيان من اليمين وتضعان بُعد المتجه الوحيد مقابل بُعد الجدول الأخير. ثم يقبل البثُّ التساوي <em>أو</em> 1؛ ولا يقبل ضربُ المصفوفات إلا التساوي. ولذلك تُطرح <code>(5, 3)</code> مع <code>(5, 1)</code> بسلاسة ولا تزال لا تُضرب. وتسميةُ <code>[:, None]</code> نقلًا هي الخطأُ الشائع في العبارة &mdash; فـ <code>[:, None]</code> تضيف بُعدًا ولا تنقل شيئًا، والـ 5 لا تتحرك أبدًا." }
    },
    {
      id: "c4b08", type: "output", level: "hard", topics: ["transpose", "matmul"],
      q: { en: "The marks came in one row per subject. Write the two lines this prints.",
           ar: "وصلت العلامات بصفٍّ لكل مادة. اكتب السطرين الذين يطبعهما." },
      code: "by_subject = np.array([[72., 48., 90.],\n                       [65., 55., 88.],\n                       [80., 60., 95.]])\nw = np.array([0.2, 0.3, 0.5])\n\nprint(w @ by_subject)\nprint(by_subject.T @ w)",
      blanks: [{ accept: ["[73.9 56.1 91.9]\n[73.9 56.1 91.9]"], lines: 2 }],
      explain: { en: "Both give the three students' final marks, by two different routes: on the left the vector acts as a row and meets the table's first dimension; transposed, the table meets the vector on the right in the usual way. Prefer the second in code other people read &mdash; it says &ldquo;turn the table the right way round, then weight it&rdquo;. And notice what would have happened with a non-square table: <code>w @ by_subject</code> would still be correct, while a reader's assumption about which way round the data was would not.",
                 ar: "كلاهما يعطي علامات الطلبة الثلاثة النهائية بطريقين: فعلى اليسار يعمل المتجه صفًّا ويلاقي بُعد الجدول الأول؛ وبالنقل يلاقي الجدولُ المتجهَ يمينًا بالطريقة المعتادة. وفضّل الثانية في كودٍ يقرؤه غيرك &mdash; فهي تقول «أدِر الجدول في اتجاهه الصحيح ثم زِنه». ولاحظ ما كان سيحدث بجدولٍ غير مربّع: فـ <code>w @ by_subject</code> ستظل صحيحة، أما افتراضُ القارئ عن اتجاه البيانات فلا." }
    },
    {
      id: "c4b09", type: "fill", level: "hard", topics: ["norm", "keepdims", "axis"],
      q: { en: "Scale every row to length 1. Fill the blank so the division lines up.",
           ar: "حجِّم كل صفٍّ إلى طول 1. أكمل الفراغ لتتحاذى القسمة." },
      code: "V = np.array([[3., 4.],\n              [6., 8.],\n              [0., 5.]])\n\nlengths = np.linalg.norm(V, axis=1, ____1____)\nprint(lengths.shape)        # (3, 1)\nprint(V / lengths)\n\n# [[0.6 0.8]\n#  [0.6 0.8]\n#  [0.  1. ]]",
      blanks: [
        { accept: ["keepdims=True", "keepdims = True"], label: { en: "keep the collapsed dimension", ar: "أبقِ البُعد المطبوق" } }
      ],
      explain: { en: "Without it, <code>lengths</code> is <code>(3,)</code> and <code>V / lengths</code> raises <code>ValueError: operands could not be broadcast together with shapes (3,2) (3,)</code> &mdash; a per-row quantity written flat is lined up against the columns, which is Lesson 12's trap arriving inside a Lesson 14 calculation. <code>keepdims=True</code> leaves the shape at <code>(3, 1)</code>, which says &ldquo;one number per row&rdquo; out loud. Note the first two rows end up identical: scaling to length 1 keeps direction and discards size.",
                 ar: "بدونها تكون <code>lengths</code> بالشكل <code>(3,)</code> وترفع <code>V / lengths</code> خطأ <code>ValueError: operands could not be broadcast together with shapes (3,2) (3,)</code> &mdash; فالمقدارُ الذي لكل صفٍّ مكتوبًا مسطّحًا يُحاذى بالأعمدة، وذلك فخُّ الدرس 12 يصل داخل حسابٍ من الدرس 14. و<code>keepdims=True</code> تُبقي الشكل <code>(3, 1)</code> الذي يقول «عددٌ لكل صفّ» جهرًا. ولاحظ أن الصفّين الأولين يخرجان متطابقين: فالتحجيمُ إلى طول 1 يُبقي الاتجاه ويرمي الحجم." }
    },
    {
      id: "c4b10", type: "match", level: "hard", topics: ["shape-rule"],
      q: { en: "Match each pair of shapes to the result of <code>@</code>.",
           ar: "وصّل كل زوج أشكالٍ بنتيجة <code>@</code>." },
      leftHead: { en: "Shapes", ar: "الأشكال" },
      rightHead: { en: "Result", ar: "النتيجة" },
      pairs: [
        { l: { code: "(4, 3) @ (3, 2)" }, r: { en: "<code>(4, 2)</code> &mdash; the 3s vanish, the outer numbers survive", ar: "<code>(4, 2)</code> &mdash; تختفي الثلاثتان ويبقى الخارجيان" } },
        { l: { code: "(4, 3) @ (3,)" }, r: { en: "<code>(4,)</code> &mdash; one dot product per row", ar: "<code>(4,)</code> &mdash; ضربٌ قياسي لكل صفّ" } },
        { l: { code: "(3, 1) @ (1, 3)" }, r: { en: "<code>(3, 3)</code> &mdash; a column times a row makes a whole table", ar: "<code>(3, 3)</code> &mdash; عمودٌ في صفٍّ يصنع جدولًا كاملًا" } },
        { l: { code: "(4, 3) @ (4,)" }, r: { en: "<code>ValueError</code> &mdash; 3 against 4", ar: "<code>ValueError</code> &mdash; 3 مقابل 4" } }
      ],
      explain: { en: "The third row is the one that looks wrong and is not: <code>(3, 1) @ (1, 3)</code> matches its 1s, so both vanish, and the surviving 3s give a 3&times;3 table &mdash; nine numbers out of six. It is the mirror image of the first row, where a big pair of tables collapses to something small. The rule never changes: inner must match and disappears, outer survives.",
                 ar: "الصفُّ الثالث هو الذي يبدو خاطئًا وليس كذلك: فـ <code>(3, 1) @ (1, 3)</code> تطابق واحديها فيختفيان، والثلاثتان الباقيتان تعطيان جدولًا 3&times;3 &mdash; تسعةُ أعداد من ستة. وهو صورةٌ معكوسة للصفّ الأول حيث ينطبق جدولان كبيران في شيءٍ صغير. والقاعدةُ لا تتغير: الداخليان يتطابقان ويختفيان والخارجيان يبقيان." }
    },
    {
      id: "c4b11", type: "order", level: "hard", topics: ["vectorise", "vector-recipe"],
      q: { en: "Put the conversion of a loop into array code in a sensible order.",
           ar: "رتّب تحويل حلقةٍ إلى كود مصفوفات ترتيبًا معقولًا." },
      items: [
        { en: "Ask what each iteration needs from the one before it. Nothing means it converts; a running total means <code>cumsum</code>; anything more means keep the loop.", ar: "اسأل ماذا تحتاج كلُّ دورة من سابقتها. فلا شيء يعني أنها تتحوّل؛ ومجموعٌ جارٍ يعني <code>cumsum</code>؛ وما زاد يعني أبقِ الحلقة." },
        { en: "Turn the condition into a mask computed once for the whole array.", ar: "حوّل الشرط إلى قناعٍ يُحسب مرة للمصفوفة كلها." },
        { en: "Replace <code>if/else</code> with <code>np.where</code>, and a bare <code>if</code> with the mask on the left of an assignment.", ar: "استبدل بـ <code>if/else</code> <code>np.where</code>، وبـ <code>if</code> المجردة القناعَ يسار الإسناد." },
        { en: "Replace each counter and accumulator with <code>.sum()</code> over the mask or the selection.", ar: "استبدل بكل عدّادٍ ومُراكِم <code>.sum()</code> على القناع أو الاختيار." },
        { en: "Run both versions on the same data and compare with <code>np.allclose</code> before deleting the loop.", ar: "شغّل النسختين على البيانات نفسها وقارن بـ <code>np.allclose</code> قبل حذف الحلقة." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 1 first, because it is the only one that can tell you to stop. Step 5 last, and it is not ceremony: a vectorised rewrite usually has the right shape and plausible values even when it is wrong, so &ldquo;it ran&rdquo; proves nothing. Keep the loop until the comparison passes, then delete it. Use <code>np.allclose</code> rather than <code>==</code> because floating-point arithmetic done in a different order gives answers that differ in the last few digits.",
                 ar: "الخطوة 1 أولًا لأنها الوحيدة التي قد تقول لك توقّف. والخطوة 5 أخيرًا وليست طقسًا: فالنسخةُ المحوَّلة تكون عادةً بالشكل الصحيح وبقيمٍ معقولة حتى حين تكون خاطئة، فـ«عمِل» لا يُثبت شيئًا. أبقِ الحلقة حتى تنجح المقارنة ثم احذفها. واستعمل <code>np.allclose</code> لا <code>==</code> لأن الحساب العشري بترتيبٍ مختلف يعطي أجوبةً تختلف في آخر أرقامها." }
    },
    {
      id: "c4b12", type: "tf", level: "hard", topics: ["where", "vectorise"],
      q: { en: "<code>np.where(mask, a, b)</code> changes <code>a</code> and <code>b</code> in place, which is why it is faster than a loop.",
           ar: "<code>np.where(mask, a, b)</code> تغيّر <code>a</code> و<code>b</code> في مكانهما، ولذلك هي أسرع من الحلقة." },
      truth: false,
      explain: { en: "It returns a <strong>new</strong> array and leaves both inputs untouched, which is usually what you want: a report normally needs the raw numbers next to the adjusted ones. The speed has nothing to do with writing in place &mdash; it comes from one pass through compiled code instead of a million trips through the interpreter. The in-place form exists and is spelled differently: <code>a[mask] = value</code>, which is the Chapter 3 idiom and does overwrite.",
                 ar: "تُعيد مصفوفةً <strong>جديدة</strong> وتترك المدخلين بلا مساس، وذلك عادةً ما تريد: فالتقريرُ يحتاج عادةً الأرقام الخام إلى جانب المعدَّلة. ولا علاقة للسرعة بالكتابة في المكان &mdash; بل تأتي من مرورٍ واحد في كودٍ مترجَم بدل مليون رحلةٍ عبر المفسّر. والصيغةُ في المكان موجودة وتُكتب غير ذلك: <code>a[mask] = value</code>، وهي اصطلاح الفصل 3 وهي تكتب فوق الأصل فعلًا." }
    },
    {
      id: "c4b13", type: "output", level: "hard", topics: ["vector-recipe", "mask"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "daily = np.array([120., -40., 300., -500., 250.])\n\nbalance = daily.cumsum()\n\nprint(balance)\nprint((balance < 0).sum())",
      blanks: [{ accept: ["[ 120.   80.  380. -120.  130.]\n1"], lines: 2 }],
      explain: { en: "<code>cumsum</code> is the loop with a running total, written as one call: each entry is everything up to and including that day. The second line is the question you actually care about &mdash; how many days did the account go negative &mdash; and it is a mask over the <em>cumulative</em> array, not the daily one. Only day four is below zero, even though two days had negative movements, and that distinction is the entire reason for computing the running total.",
                 ar: "<code>cumsum</code> هي الحلقةُ بمجموعٍ جارٍ مكتوبةً نداءً واحدًا: فكلُّ مدخلٍ هو كلُّ ما إلى ذلك اليوم وفيه. والسطرُ الثاني هو السؤال الذي يعنيك فعلًا &mdash; كم يومًا هبط الحساب سالبًا &mdash; وهو قناعٌ على المصفوفة <em>التراكمية</em> لا اليومية. واليومُ الرابع وحده تحت الصفر مع أن يومين كانت حركتهما سالبة، وذلك التمييزُ هو سببُ حساب المجموع الجاري كله." }
    },
    {
      id: "c4b14", type: "trace", level: "hard", topics: ["rng-seed", "rng-draws"],
      q: { en: "State the value of each name at the end.", ar: "حدّد قيمة كل اسم في النهاية." },
      code: "rng = np.random.default_rng(11)\n\na = rng.integers(1, 7, size=3)\nb = rng.integers(1, 7, size=3)\nc = np.random.default_rng(11).integers(1, 7, size=3)",
      blanks: [
        { accept: ["[1 1 5]"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["[3 4 4]"], label: { en: "<code>b</code>", ar: "<code>b</code>" } },
        { accept: ["[1 1 5]"], label: { en: "<code>c</code>", ar: "<code>c</code>" } }
      ],
      explain: { en: "<code>a</code> and <code>c</code> agree and <code>b</code> does not, from the same seed. A generator is a position in a fixed sequence: asking the same object twice moves it on, while a fresh generator starts from the beginning. This is exactly why a function that must be reproducible builds its generator from a seed <em>inside itself</em> &mdash; one made outside and reused would give a different answer on its second call, and nothing in the code would show why.",
                 ar: "<code>a</code> و<code>c</code> تتفقان و<code>b</code> لا، من البذرة نفسها. فالمولّدُ موضعٌ في متتاليةٍ ثابتة: فسؤالُ الكائن نفسه مرتين يحرّكه، أما مولّدٌ جديد فيبدأ من الأول. ولذلك بالضبط تبني الدالةُ التي يجب أن تكون قابلة للتكرار مولّدها من بذرةٍ <em>داخلها</em> &mdash; فمولّدٌ يُصنع خارجًا ويُعاد استعماله يعطي جوابًا مختلفًا في ندائه الثاني، ولا شيء في الكود يُظهر لماذا." }
    },
    {
      id: "c4b15", type: "compare", level: "hard", topics: ["split", "rng-seed"],
      q: { en: "Two ways of shuffling a table of features and its array of answers. What is the difference?",
           ar: "طريقتان لخلط جدول سمات ومصفوفة أجوبته. فما الفرق؟" },
      codeA: "order = np.random.default_rng(2).permutation(len(X))\n\nX_s = X[order]\ny_s = y[order]",
      codeB: "X_s = np.random.default_rng(2).permutation(X)\ny_s = np.random.default_rng(3).permutation(y)",
      options: [
        { en: "A keeps every row paired with its own answer; B destroys the pairing silently. Both produce the right shapes and both run, so nothing downstream will complain &mdash; the answers simply belong to different rows from then on.",
          ar: "A يُبقي كل صفٍّ مقترنًا بجوابه؛ وB يُتلف الاقتران بصمت. وكلاهما يُنتج الأشكال الصحيحة وكلاهما يعمل، فلن يشتكي شيءٌ لاحق &mdash; بل تنتمي الأجوبة من حينها إلى صفوفٍ أخرى." },
        { en: "They are the same; <code>permutation</code> on an array shuffles its rows just as indexing with a permutation does.",
          ar: "هما سواء؛ فـ <code>permutation</code> على مصفوفة تخلط صفوفها كما تفعل الفهرسة بتبديلة." },
        { en: "B is better because it shuffles the two arrays independently, which removes any accidental ordering.",
          ar: "B أفضل لأنه يخلط المصفوفتين مستقلّتين فيزيل أي ترتيب عارض." },
        { en: "A raises, because <code>order</code> cannot index two arrays of different shapes.",
          ar: "A يرفع خطأً، لأن <code>order</code> لا تستطيع فهرسة مصفوفتين بشكلين مختلفين." }
      ],
      answer: 0,
      explain: { en: "The answer that calls the two the same is half true, and that is what makes it dangerous: <code>permutation</code> on a 2-D array really does shuffle its rows, so B's first line is fine on its own. The damage is done by the second line using a different seed &mdash; and it would still be wrong with the <em>same</em> seed in general, because the two calls are independent draws on different-shaped inputs. Shuffle positions once and reuse them: it is one line shorter and it cannot be got wrong.",
                 ar: "والجوابُ الذي يسوّي بينهما نصفُ صحيح وذلك ما يجعله خطِرًا: فـ <code>permutation</code> على مصفوفة ثنائية تخلط صفوفها فعلًا، فسطرُ B الأول سليمٌ وحده. والضررُ يأتي من السطر الثاني ببذرةٍ أخرى &mdash; وسيظل خاطئًا بالبذرة <em>نفسها</em> عمومًا، لأن النداءين سحبتان مستقلتان على مدخلين بشكلين مختلفين. اخلط المواضع مرة وأعد استعمالها: فذلك أقصر بسطر ولا يمكن أن يُخطأ فيه." }
    },
    {
      id: "c4b16", type: "mcq", level: "hard", topics: ["rng-seed", "split"],
      q: { en: "Your test set is chosen with seed 42 and your model scores well on it. What does the seed guarantee?",
           ar: "اختيرت مجموعة اختبارك بالبذرة 42 وسجّل نموذجك عليها جيدًا. فماذا تضمن البذرة؟" },
      options: [
        { en: "Only that the same rows will be chosen again. It says nothing about whether those rows are a fair sample of the data.",
          ar: "أن تُختار الصفوف نفسها ثانيةً فقط. ولا تقول شيئًا عن كون تلك الصفوف عيّنةً منصفة من البيانات." },
        { en: "That the test set is representative, because the shuffle is uniform.",
          ar: "أن مجموعة الاختبار ممثِّلة، لأن الخلط منتظم." },
        { en: "That the score is reproducible <em>and</em> unbiased.",
          ar: "أن الدرجة قابلة للتكرار <em>وغير</em> متحيزة." },
        { en: "That no row appears in both the training and the test half.",
          ar: "ألّا يظهر صفٌّ في نصفَي التدريب والاختبار معًا." }
      ],
      answer: 0,
      explain: { en: "Repeatability and representativeness are different problems and fixing one does nothing for the other. Seed 42 might hand you ten test deliveries that all came from the same street; it will hand you those same ten every time, which makes the result repeatable and still misleading. The claim that no row appears in both halves is true of this splitting method but it is a property of slicing a permutation, not of the seed &mdash; the same code without a seed also never duplicates a row. Serious work checks a result against several seeds.",
                 ar: "التكرارُ والتمثيل مشكلتان مختلفتان وإصلاحُ إحداهما لا يفعل للأخرى شيئًا. فقد تسلّمك البذرة 42 عشرَ توصيلاتِ اختبارٍ كلُّها من شارع واحد؛ وستسلّمك العشرَ نفسها كل مرة، فتكون النتيجة قابلة للتكرار ومُضلِّلة مع ذلك. والقولُ إن لا صفَّ يظهر في النصفين صحيحٌ عن طريقة القسمة هذه لكنه خاصّةُ تقطيع تبديلةٍ لا خاصّةُ البذرة &mdash; فالكودُ نفسه بلا بذرة لا يكرّر صفًّا أبدًا كذلك. والعملُ الجادّ يفحص النتيجة على عدة بذور." }
    },
    {
      id: "c4b17", type: "fill", level: "hard", topics: ["split", "copy-rules"],
      q: { en: "Fifty rows, four fifths for training. Fill the two blanks.",
           ar: "خمسون صفًّا وأربعةُ أخماسٍ للتدريب. أكمل الفراغين." },
      code: "n = 50\norder = np.random.default_rng(9).permutation(n)\ncut = int(0.8 * n)\n\ntrain, test = ____1____, ____2____\n\nprint(len(train), len(test))   # 40 10",
      blanks: [
        { accept: ["order[:cut]", "order[0:cut]"], label: { en: "the training positions", ar: "مواضع التدريب" } },
        { accept: ["order[cut:]", "order[cut:n]", "order[cut:len(order)]"], label: { en: "the held-back positions", ar: "المواضع المحجوزة" } }
      ],
      explain: { en: "Two slices of one shuffled list, which is why no row can land in both halves. Worth connecting to Chapter 3: these two slices are <a href=\"#l11-h1\">views</a> onto <code>order</code>, but <code>X[train]</code> is indexing with an array of positions, which always <a href=\"#l11-s3\">copies</a> &mdash; so the training and test tables are independent of each other and of <code>X</code>, and nothing you do to one can reach the others.",
                 ar: "قطعتان من قائمةٍ مخلوطة واحدة، ولذلك لا يستطيع صفٌّ أن يقع في النصفين. وجديرٌ بالوصل بالفصل 3: فالقطعتان <a href=\"#l11-h1\">نافذتان</a> على <code>order</code>، أما <code>X[train]</code> ففهرسةٌ بمصفوفة مواضع وهي <a href=\"#l11-s3\">تنسخ</a> دائمًا &mdash; فجدولا التدريب والاختبار مستقلان أحدهما عن الآخر وعن <code>X</code>، ولا شيء تفعله بأحدهما يبلغ الآخرين." }
    },
    {
      id: "c4b18", type: "complete", level: "hard", topics: ["vectorise", "mask", "linear-model"],
      q: { en: "Report the late deliveries: how many, their total minutes, and the worst one's position. Which line?",
           ar: "أبلِغ عن التوصيلات المتأخرة: كم عددها ومجموعُ دقائقها وموضعُ أسوئها. فأي سطر؟" },
      code: "minutes = np.array([12., 45., 8., 61., 30., 55.])\nlate = minutes > 30\n\n# which line?\n\n# must print: 3 161.0 3",
      options: [
        { code: "print(late.sum(), minutes[late].sum(), minutes.argmax())" },
        { code: "print(late.sum(), minutes.sum(), minutes.max())" },
        { code: "print(minutes[late].sum(), late.sum(), minutes.argmax())" },
        { code: "print(late.count(), minutes[late].sum(), minutes.argmax())" }
      ],
      answer: 0,
      explain: { en: "One mask, used twice: <code>.sum()</code> on the mask counts, and the same mask used as an index selects. The version that prints the total before the count has the right pieces in the wrong order, which is worth noticing because both numbers are plausible and nothing would ever complain. The fourth fails loudly &mdash; an array has no <code>.count()</code> &mdash; which is the easiest kind of mistake to have. And <code>argmax</code> gives the <em>position</em>, 3, not the value 61.0: positions are what you need to look a delivery up in another array.",
                 ar: "قناعٌ واحد يُستعمل مرتين: فـ <code>.sum()</code> على القناع تعدّ، والقناعُ نفسه فهرسًا يختار. والنسخةُ التي تطبع المجموع قبل العدد فيها القطع الصحيحة بترتيبٍ خاطئ، وذلك جديرٌ بالملاحظة لأن العددين معقولان ولن يشتكي شيءٌ أبدًا. والرابع يفشل جهرًا &mdash; فلا <code>.count()</code> للمصفوفة &mdash; وذلك أسهلُ أنواع الخطأ احتمالًا. و<code>argmax</code> تعطي <em>الموضع</em> 3 لا القيمة 61.0: فالمواضعُ هي ما تحتاجه للبحث عن توصيلة في مصفوفة أخرى." }
    }
  ]
};
