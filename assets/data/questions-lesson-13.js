/* ============================================================
   Lesson 13 (Lecture 15) — axes, masks, np.where, nan.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-13"] = {
  title: { en: "Lesson 13 Test — Axes and Masks", ar: "اختبار الدرس 13 — المحاور والأقنعة" },
  intro: {
    en: "Twelve questions on Lesson 13 only. Two habits answer most of them: name the axis you want to <em>remove</em>, and check the shape of the result rather than trusting your intuition about direction.",
    ar: "اثنا عشر سؤالًا على الدرس 13 وحده. وعادتان تُجيبان أكثرها: سمِّ المحور الذي تريد <em>إزالته</em>، وافحص شكل النتيجة بدل الثقة بحدسك في الاتجاه."
  },
  questions: [
    {
      id: "t13q1", type: "mcq", level: "easy", topics: ["axis"],
      q: { en: "A table has 30 students down the rows and 4 subjects across the columns. Which call gives one average <strong>per student</strong>?",
           ar: "جدولٌ فيه 30 طالبًا في الصفوف و4 مواد في الأعمدة. فأي نداء يعطي متوسطًا واحدًا <strong>لكل طالب</strong>؟" },
      options: [
        { en: "<code>marks.mean(axis=1)</code>, which gives 30 numbers", ar: "<code>marks.mean(axis=1)</code> فتعطي 30 عددًا" },
        { en: "<code>marks.mean(axis=0)</code>, because axis 0 is the student axis", ar: "<code>marks.mean(axis=0)</code>، لأن المحور 0 هو محور الطلبة" },
        { en: "<code>marks.mean()</code>, then read off the students", ar: "<code>marks.mean()</code> ثم تقرأ الطلبة منها" },
        { en: "<code>marks.mean(axis=1, keepdims=True)</code> is the only form that works at all", ar: "<code>marks.mean(axis=1, keepdims=True)</code> هي الصيغة الوحيدة التي تعمل أصلًا" }
      ],
      answer: 0,
      explain: { en: "The <code>axis=0</code> answer is the intuition nearly everybody has, and it is exactly backwards: axis 0 <em>is</em> the student axis, which is why naming it <strong>removes</strong> the students and leaves four subject averages. The axis you name is the one that disappears. Check with the shape, which never lies: <code>(30, 4)</code> with axis 1 gone is <code>(30,)</code>. The <code>keepdims=True</code> answer does work, but it gives shape <code>(30, 1)</code> &mdash; the same numbers, a shape that remembers where they came from.",
                 ar: "وجوابُ <code>axis=0</code> هو حدس كل الناس تقريبًا، وهو معكوسٌ تمامًا: فالمحور 0 <em>هو</em> محور الطلبة، ولذلك تسميتُه <strong>تُزيل</strong> الطلبة وتُبقي أربعة متوسطات مواد. فالمحور الذي تسمّيه هو الذي يختفي. تحقّق بالشكل الذي لا يكذب: فـ <code>(30, 4)</code> بزوال المحور 1 تصير <code>(30,)</code>. وجوابُ <code>keepdims=True</code> يعمل لكنه يعطي الشكل <code>(30, 1)</code> &mdash; الأعداد نفسها بشكلٍ يتذكّر من أين جاءت." }
    },
    {
      id: "t13q2", type: "output", level: "easy", topics: ["mask"],
      q: { en: "Parcel weights at the courier depot. Write the three lines this prints.",
           ar: "أوزان الطرود في مستودع البريد. اكتب الأسطر الثلاثة التي يطبعها." },
      code: "import numpy as np\n\nparcels = np.array([3, 12, 7, 20, 9])\nlate = parcels > 8\n\nprint(late)\nprint(parcels[late])\nprint(late.sum())",
      blanks: [{ accept: ["[False  True False  True  True]\n[12 20  9]\n3"], lines: 3 }],
      explain: { en: "Three ideas in three lines. A comparison gives a <strong>mask</strong> &mdash; one answer per element, the same shape as the array. Indexing with a mask <strong>selects</strong> the elements where it is <code>True</code>. Summing a mask <strong>counts</strong> them, because <code>True</code> adds as 1. That third one is why you will see <code>.sum()</code> used for counting for the rest of this course; there is no separate counting function to learn.",
                 ar: "ثلاث أفكار في ثلاثة أسطر. فالمقارنة تعطي <strong>قناعًا</strong> &mdash; جوابًا لكل عنصر بشكل المصفوفة نفسه. والفهرسةُ بالقناع <strong>تختار</strong> العناصر حيث يكون <code>True</code>. وجمعُ القناع <strong>يعدّها</strong>، لأن <code>True</code> يُجمع كـ 1. والثالثة هي سبب رؤيتك <code>.sum()</code> مستعملةً للعدّ في بقية هذا المقرر؛ فلا دالّة عدٍّ منفصلة تتعلّمها." }
    },
    {
      id: "t13q3", type: "tf", level: "easy", topics: ["mask", "nan-array"],
      q: { en: "<code>marks == np.nan</code> is how you find the missing marks in a float array.",
           ar: "<code>marks == np.nan</code> هي طريقة إيجاد العلامات المفقودة في مصفوفة عشرية." },
      truth: false,
      explain: { en: "It returns <code>False</code> everywhere, including at the missing marks, and finds nothing &mdash; silently, which is the worst kind of wrong. <code>nan</code> is defined to be equal to nothing at all, not even to itself, so every comparison against it is false. Use <code>np.isnan(marks)</code> for the mask and <code>np.isnan(marks).sum()</code> for the count. Appendix A4 &sect;4 explains why the designers chose that rule rather than making it an error.",
                 ar: "تُعيد <code>False</code> في كل مكان، حتى عند العلامات المفقودة، ولا تجد شيئًا &mdash; بصمتٍ، وذلك أسوأ أنواع الخطأ. فـ <code>nan</code> مُعرَّفة بأنها لا تساوي شيئًا إطلاقًا ولا نفسها، فكل مقارنة بها كاذبة. استعمل <code>np.isnan(marks)</code> للقناع و<code>np.isnan(marks).sum()</code> للعدّ. وملحق A4 &sect;4 يشرح لماذا اختار المصمّمون تلك القاعدة بدل جعلها خطأً." }
    },
    {
      id: "t13q4", type: "fill", level: "medium", topics: ["axis", "keepdims"],
      q: { en: "Three workers at the repair shop down the rows, four tasks across the columns. Fill the three blanks.",
           ar: "ثلاثة عمّال في ورشة التصليح في الصفوف وأربع مهام في الأعمدة. أكمل الفراغات الثلاثة." },
      code: "hours = np.array([[2., 3., 4., 1.],\n                  [5., 0., 2., 3.],\n                  [1., 1., 1., 1.]])\n\nprint(hours.sum(axis=____1____))   # [8. 4. 7. 5.]  one total per task\nprint(hours.max(axis=____2____))   # [4. 5. 1.]  one peak per worker\nprint(hours.mean(axis=1, keepdims=True).shape)   # ____3____",
      blanks: [
        { accept: ["0"], label: { en: "one per task", ar: "واحد لكل مهمة" } },
        { accept: ["1"], label: { en: "one per worker", ar: "واحد لكل عامل" } },
        { accept: ["(3, 1)", "(3,1)"], label: { en: "the shape", ar: "الشكل" } }
      ],
      explain: { en: "Count the answers, not the direction: four totals means four columns survived, so the rows were collapsed and the axis named was 0. Three peaks means the columns went, so axis 1. The third blank is the one worth internalising &mdash; <code>keepdims=True</code> leaves the collapsed dimension in place as a 1, so the shape still says \"one number per row\" and the result can be subtracted from the table without the Lesson 12 disaster.",
                 ar: "عُدّ الأجوبة لا الاتجاه: فأربعة مجاميع تعني أن أربعة أعمدة بقيت، فالصفوف طُبِقت والمحور المسمّى 0. وثلاث قمم تعني أن الأعمدة ذهبت فالمحور 1. والفراغ الثالث جديرٌ بالتذويت &mdash; فـ <code>keepdims=True</code> تُبقي البُعد المطبوق مكانه كـ 1، فيظل الشكل يقول «عدد واحد لكل صفّ» ويمكن طرح النتيجة من الجدول بلا كارثة الدرس 12." }
    },
    {
      id: "t13q5", type: "output", level: "medium", topics: ["mask-and-or", "mask"],
      q: { en: "Repair costs in shekels. Write the two lines this prints.",
           ar: "تكاليف التصليح بالشواكل. اكتب السطرين الذين يطبعهما." },
      code: "cost = np.array([15, 40, 90, 120, 200])\n\nprint(cost[(cost >= 40) & (cost <= 120)])\nprint((cost < 40).sum(), (cost > 150).sum())",
      blanks: [{ accept: ["[ 40  90 120]\n1 1"], lines: 2 }],
      explain: { en: "<code>&amp;</code> combines the two masks element by element, so a job is selected only where both answers are <code>True</code>. Both bounds are inclusive here because both comparisons are, and 40 and 120 are in the result as proof. The brackets around each comparison are not optional: <code>&amp;</code> binds more tightly than <code>&gt;=</code>, so without them Python would try <code>40 &amp; cost</code> first.",
                 ar: "<code>&amp;</code> تجمع القناعين عنصرًا بعنصر، فلا يُختار عملٌ إلا حيث يكون الجوابان <code>True</code>. والحدّان شاملان هنا لأن المقارنتين كذلك، و40 و120 في النتيجة برهانًا. والأقواس حول كل مقارنة ليست اختيارية: فـ <code>&amp;</code> أقوى ارتباطًا من <code>&gt;=</code>، فبدونها تحاول بايثون <code>40 &amp; cost</code> أولًا." }
    },
    {
      id: "t13q6", type: "error", level: "medium", topics: ["mask-and-or"],
      q: { en: "This should list the unusual jobs &mdash; the very cheap and the very expensive. It raises. Click the line to change.",
           ar: "ينبغي أن يُدرج هذا الأعمال الشاذّة &mdash; الرخيصة جدًّا والغالية جدًّا. وهو يرفع خطأً. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\ncost = np.array([15, 40, 90, 120, 200])\n\ncheap = cost < 40\nhuge = cost > 150\n\nprint(\"unusual:\", cost[cheap or huge])",
      answer: 8,
      explain: { en: "<code>ValueError: The truth value of an array with more than one element is ambiguous.</code> Read it slowly and it is helpful: <code>or</code> has to decide whether the whole left side is true or false, so that it can decide whether to bother looking at the right side &mdash; and an array of five answers is neither true nor false. <code>|</code> has no such ambition; it combines the two masks element by element. Lines 5 and 6 are fine: a comparison on an array is exactly how you build a mask.",
                 ar: "<code>ValueError: The truth value of an array with more than one element is ambiguous.</code> اقرأها متمهّلًا فهي معينة: فعلى <code>or</code> أن تحدّد هل الطرف الأيسر كله صادق أم كاذب لتقرّر هل تنظر إلى الأيمن &mdash; ومصفوفةٌ من خمسة أجوبة ليست صادقة ولا كاذبة. أما <code>|</code> فلا طموح لها في ذلك؛ بل تجمع القناعين عنصرًا بعنصر. والسطران 5 و6 سليمان: فالمقارنةُ على مصفوفة هي بالضبط طريقةُ بناء قناع." },
      solution: { code: "print(\"unusual:\", cost[cheap | huge])   # [ 15 200]" }
    },
    {
      id: "t13q7", type: "match", level: "medium", topics: ["axis", "mask"],
      q: { en: "The table is the usual three students by three subjects. Match each expression to what comes back.",
           ar: "الجدول هو المعتاد: ثلاثة طلبة في ثلاث مواد. وصّل كل تعبير بما يُعاد منه." },
      leftHead: { en: "Expression", ar: "التعبير" },
      rightHead: { en: "Gives", ar: "يعطي" },
      pairs: [
        { l: { code: "marks.mean()" }, r: { en: "One number: the average of all nine marks.", ar: "عددٌ واحد: متوسط العلامات التسع." } },
        { l: { code: "marks.mean(axis=0)" }, r: { en: "Three numbers, one per subject &mdash; the rows were collapsed.", ar: "ثلاثة أعداد لكل مادة &mdash; فالصفوف طُبِقت." } },
        { l: { code: "(marks >= 60).sum()" }, r: { en: "One number: how many of the nine marks passed.", ar: "عددٌ واحد: كم من العلامات التسع ناجحة." } },
        { l: { code: "(marks >= 60).all(axis=1)" }, r: { en: "Three <code>True</code>/<code>False</code> values, one per student: did they pass everything?", ar: "ثلاث قيم <code>True</code>/<code>False</code> لكل طالب: هل نجح في كل شيء؟" } }
      ],
      explain: { en: "The pattern across all four: no axis means collapse everything to one number, and a named axis means collapse that one. The fourth row is the form you will write most, because <code>.all</code> and <code>.any</code> are reductions like <code>mean</code> and <code>sum</code> &mdash; they take the same <code>axis</code> argument and obey the same rule, so there is nothing extra to learn once the axis rule is solid.",
                 ar: "النمط في الأربعة: فلا محورَ يعني طَبْقَ كل شيء إلى عدد واحد، ومحورٌ مسمّى يعني طَبْقَ ذاك. والصفّ الرابع هو الصيغة التي ستكتبها أكثر، لأن <code>.all</code> و<code>.any</code> تخفيضاتٌ كـ <code>mean</code> و<code>sum</code> &mdash; تأخذ وسيط <code>axis</code> نفسه وتطيع القاعدة نفسها، فلا شيء زائد يُتعلّم متى رسخت قاعدة المحور." }
    },
    {
      id: "t13q8", type: "order", level: "medium", topics: ["mask-rows", "mask"],
      q: { en: "Put in order what happens in <code>marks[marks[:, 0] &gt;= 60]</code>.",
           ar: "رتّب ما يحدث في <code>marks[marks[:, 0] &gt;= 60]</code>." },
      items: [
        { en: "<code>marks[:, 0]</code> takes the first column &mdash; one number per student.", ar: "<code>marks[:, 0]</code> تأخذ العمود الأول &mdash; عددٌ لكل طالب." },
        { en: "The comparison turns it into a mask with one <code>True</code>/<code>False</code> per student.", ar: "المقارنةُ تحوّله قناعًا فيه <code>True</code>/<code>False</code> لكل طالب." },
        { en: "The table is indexed with that mask, which has one entry per row.", ar: "يُفهرَس الجدول بذلك القناع، وفيه مدخلٌ لكل صفّ." },
        { en: "The rows where the mask is <code>True</code> come back whole, all three subjects together.", ar: "تُعاد الصفوف التي قناعُها <code>True</code> كاملةً بموادها الثلاث معًا." },
        { en: "The result is a new table &mdash; a copy, shape <code>(number selected, 3)</code>.", ar: "والنتيجة جدولٌ جديد &mdash; نسخة بشكل <code>(عدد المختار، 3)</code>." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "This is the form the rest of the course is built on, so it is worth being able to narrate. Two details carry the most weight: the mask must have one entry per row, which is why it was built from a <em>column</em>; and the rows come back whole, so a student's three subjects stay together instead of being flattened into six loose numbers. The copy in step 5 is the rule from Lesson 11 &mdash; a mask selects arbitrary positions, so it cannot be a view.",
                 ar: "هذه هي الصيغة التي بُني عليها بقية المقرر، فتستحق أن تقدر على سردها. وتفصيلان يحملان أكبر ثقل: القناعُ يجب أن يكون فيه مدخلٌ لكل صفّ، ولذلك بُني من <em>عمود</em>؛ والصفوفُ تُعاد كاملة، فتبقى مواد الطالب الثلاث معًا بدل أن تُسطَّح ستة أعداد سائبة. والنسخةُ في الخطوة 5 هي قاعدة الدرس 11 &mdash; فالقناع يختار مواضع اعتباطية فلا يمكن أن يكون نافذة." }
    },
    {
      id: "t13q9", type: "trace", level: "hard", topics: ["nan-array"],
      q: { en: "One mark is missing. State the value of each name at the end.",
           ar: "علامةٌ واحدة مفقودة. حدّد قيمة كل اسم في النهاية." },
      code: "marks = np.array([40., np.nan, 70.])\n\na = marks.mean()\nb = np.nanmean(marks)\nc = np.isnan(marks).sum()\nd = (marks == np.nan).sum()",
      blanks: [
        { accept: ["nan"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["55.0", "55"], label: { en: "<code>b</code>", ar: "<code>b</code>" } },
        { accept: ["1"], label: { en: "<code>c</code>", ar: "<code>c</code>" } },
        { accept: ["0"], label: { en: "<code>d</code>", ar: "<code>d</code>" } }
      ],
      explain: { en: "<code>a</code> is the kindness: any arithmetic touching <code>nan</code> gives <code>nan</code>, so one missing mark turns the whole class average into <code>nan</code> <em>loudly</em>, where an average that quietly skipped the gap would be the average of a different class from the one you asked about. <code>b</code> is the deliberate choice to skip it &mdash; 55 is the mean of 40 and 70, over two values, not three. <code>d</code> is the trap: zero, not one, because <code>nan</code> equals nothing, not even itself.",
                 ar: "<code>a</code> هي اللطف: فأي حساب يلمس <code>nan</code> يعطي <code>nan</code>، فعلامةٌ مفقودة واحدة تحوّل متوسط الصفّ كله إلى <code>nan</code> <em>جهرًا</em>، في حين أن متوسطًا يتخطّى الفراغ بصمت سيكون متوسط صفٍّ غير الذي سألت عنه. و<code>b</code> هي الاختيار المتعمّد لتخطّيها &mdash; فـ 55 متوسط 40 و70 على قيمتين لا ثلاث. و<code>d</code> هي الفخّ: صفر لا واحد، لأن <code>nan</code> لا تساوي شيئًا ولا نفسها." }
    },
    {
      id: "t13q10", type: "compare", level: "hard", topics: ["where", "mask"],
      q: { en: "Both cap the repair cost at 150. What is the difference?",
           ar: "كلاهما يحصر تكلفة التصليح عند 150. فما الفرق؟" },
      codeA: "cost = np.array([15, 40, 90, 120, 200])\n\ncapped = np.where(cost > 150, 150, cost)\n\nprint(cost)\nprint(capped)",
      codeB: "cost = np.array([15, 40, 90, 120, 200])\n\ncost[cost > 150] = 150\n\nprint(cost)",
      options: [
        { en: "A leaves <code>cost</code> as it was and returns the capped version as a new array; B writes into <code>cost</code> itself, so the original figures are gone.",
          ar: "A يترك <code>cost</code> كما كانت ويُعيد النسخة المحصورة مصفوفةً جديدة؛ وB يكتب في <code>cost</code> نفسها فتذهب الأرقام الأصلية." },
        { en: "They are the same; <code>np.where</code> is just a longer way of writing a mask assignment.",
          ar: "هما سواء؛ و<code>np.where</code> صيغةٌ أطول لإسناد القناع فقط." },
        { en: "A raises, because <code>np.where</code> needs all three arguments to have the same shape.",
          ar: "A يرفع خطأً، لأن <code>np.where</code> تحتاج أن تكون وسائطها الثلاثة بالشكل نفسه." },
        { en: "B caps every value at 150, not only the ones above it.",
          ar: "B يحصر كل قيمة عند 150 لا التي فوقها فقط." }
      ],
      answer: 0,
      explain: { en: "Both print <code>[ 15  40  90 120 150]</code> for the capped figures, so a quick glance will not tell them apart &mdash; the difference is what happened to the original, and A still has it. That matters more than it sounds: a report usually needs both the raw and the adjusted numbers, and B has thrown one of them away. The answer that expects <code>np.where</code> to need three identical shapes is worth refuting because it sounds plausible: <code>np.where</code> broadcasts its three arguments, so a mask, a scalar and an array work together perfectly well.",
                 ar: "يطبع كلاهما <code>[ 15  40  90 120 150]</code> للأرقام المحصورة، فلن تميّزهما نظرةٌ عابرة &mdash; فالفرق في ما حلّ بالأصل، وA لا يزال يملكه. وذلك أهم مما يبدو: فالتقرير يحتاج عادةً الأرقام الخام والمعدَّلة معًا، وB رمى إحداها. والجوابُ الذي يتوقع من <code>np.where</code> ثلاثة أشكال متطابقة جديرٌ بالدحض لأنه يبدو معقولًا: فـ <code>np.where</code> تبثّ وسائطها الثلاثة، فيعمل القناع والمقدار والمصفوفة معًا تمامًا." }
    },
    {
      id: "t13q11", type: "multi", level: "hard", topics: ["axis", "mask", "mask-rows", "nan-array"],
      q: { en: "Select <strong>every</strong> statement that is true.", ar: "اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "Naming <code>axis=0</code> collapses the rows, leaving one number per column.", ar: "تسميةُ <code>axis=0</code> تَطبِق الصفوف وتُبقي عددًا لكل عمود." },
        { en: "<code>(marks &lt; 60).sum()</code> with no axis counts over the whole table at once.", ar: "<code>(marks &lt; 60).sum()</code> بلا محور تعدّ في الجدول كله دفعةً واحدة." },
        { en: "A mask built from <code>marks[:, 0]</code> has one entry per column.", ar: "القناعُ المبني من <code>marks[:, 0]</code> فيه مدخلٌ لكل عمود." },
        { en: "<code>np.where(mask, x, y)</code> returns a new array and does not modify its inputs.", ar: "<code>np.where(mask, x, y)</code> تُعيد مصفوفة جديدة ولا تعدّل مُدخلاتها." },
        { en: "A comparison against a missing value is <code>False</code>, so <code>(marks &lt; 60).sum()</code> counts no <code>nan</code> as a fail.", ar: "المقارنةُ بقيمة مفقودة <code>False</code>، فـ <code>(marks &lt; 60).sum()</code> لا تعدّ <code>nan</code> رسوبًا." },
        { en: "<code>.any(axis=1)</code> and <code>.all(axis=1)</code> answer the same question on a table where every student passed at least one subject.", ar: "<code>.any(axis=1)</code> و<code>.all(axis=1)</code> تجيبان السؤال نفسه على جدول نجح فيه كل طالب في مادة واحدة على الأقل." }
      ],
      answer: [0, 1, 3, 4],
      explain: { en: "The third is false and it is the mistake that breaks row selection: a column has one number per <em>row</em>, so a mask built from it has one entry per row &mdash; which is exactly why it can index the table's rows. The sixth is false for a sharper reason: <code>.any</code> asks whether at least one was true and <code>.all</code> asks whether every one was, and they agree only by coincidence on a particular table. The fifth is true and is a design decision worth noticing &mdash; a missing mark is counted as neither a pass nor a fail, which is honest, and means a count of fails and a count of passes need not add up to the size of the table.",
                 ar: "الثالثة كاذبة وهي الخطأ الذي يُعطب اختيار الصفوف: فالعمودُ فيه عددٌ لكل <em>صفّ</em>، فالقناعُ المبني منه فيه مدخلٌ لكل صفّ &mdash; ولذلك بالضبط يستطيع فهرسة صفوف الجدول. والسادسة كاذبة لسبب أحدّ: فـ <code>.any</code> تسأل هل صدق واحد على الأقل و<code>.all</code> تسأل هل صدق الجميع، ولا يتفقان إلا مصادفةً على جدول بعينه. والخامسة صادقة وهي قرار تصميم جديرٌ بالملاحظة &mdash; فالعلامة المفقودة لا تُعدّ نجاحًا ولا رسوبًا، وذلك صادق، ويعني أن عدد الراسبين وعدد الناجحين لا يلزم أن يبلغا حجم الجدول." }
    },
    {
      id: "t13q12", type: "complete", level: "hard", topics: ["mask-rows", "axis"],
      q: { en: "Select the rows of the students who scored 60 or more in <strong>every</strong> subject. Which line?",
           ar: "اختر صفوف الطلبة الذين نالوا 60 أو أكثر في <strong>كل</strong> مادة. فأي سطر؟" },
      code: "marks = np.array([[40., 55., 70.],\n                  [60., 65., 90.],\n                  [80., 75., 50.]])\n\n# which line?\n\nprint(marks[all_passed])   # must be [[60. 65. 90.]]",
      options: [
        { code: "all_passed = (marks >= 60).all(axis=1)" },
        { code: "all_passed = (marks >= 60).all(axis=0)" },
        { code: "all_passed = (marks >= 60).any(axis=1)" },
        { code: "all_passed = marks.all(axis=1) >= 60" }
      ],
      answer: 0,
      explain: { en: "Two steps, and the order matters: <code>marks &gt;= 60</code> is a <code>(3, 3)</code> mask with one answer per mark, and <code>.all(axis=1)</code> then collapses the columns, asking \"were they all true across this row?\" and leaving one answer per student. The <code>axis=0</code> version asks the same question down each subject and gives an answer per subject, which cannot index rows correctly. The third gives students who passed <em>at least one</em> &mdash; here all three of them. The fourth is the one to look at twice: <code>marks.all(axis=1)</code> asks whether the marks are all non-zero, which they are, so it is <code>True</code> for every student, and <code>True &gt;= 60</code> is <code>False</code> &mdash; three falses and an empty selection, with no error anywhere.",
                 ar: "خطوتان والترتيب مهم: فـ <code>marks &gt;= 60</code> قناعٌ <code>(3, 3)</code> فيه جوابٌ لكل علامة، ثم <code>.all(axis=1)</code> تَطبِق الأعمدة فتسأل «هل صدقت كلها في هذا الصفّ؟» وتُبقي جوابًا لكل طالب. ونسخةُ <code>axis=0</code> تسأل السؤال نفسه نزولًا في كل مادة فيعطي جوابًا لكل مادة، ولا يصلح لفهرسة الصفوف. والثالث يعطي من نجح في <em>مادة واحدة على الأقل</em> &mdash; وهم الثلاثة هنا. والرابع جديرٌ بنظرة ثانية: فـ <code>marks.all(axis=1)</code> تسأل هل العلامات كلها غير صفرية وهي كذلك، فتكون <code>True</code> لكل طالب، و<code>True &gt;= 60</code> هي <code>False</code> &mdash; ثلاث كواذب واختيارٌ فارغ بلا خطأ في أي مكان." }
    }
  ]
};
