/* ============================================================
   Chapter 3 tests A (core) and B (advanced).

   Twenty questions each: the chapter is four lectures, between
   Chapter 1's eight and Chapter 2's two. Test A samples every
   lesson at easy and medium; Test B is hard throughout and every
   question crosses at least two lessons.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["chapter-03-test-a"] = {
  title: { en: "Chapter 3 Test A — Core", ar: "اختبار الفصل 3 أ — الأساسيات" },
  intro: {
    en: "Twenty questions across all four lessons, easy and medium. One question underneath all of them: can you say what <em>shape</em> something is before you run it? Wrong answers link to the paragraph to re-read.",
    ar: "عشرون سؤالًا على الدروس الأربعة، بالسهل والمتوسط. وتحتها سؤالٌ واحد: هل تستطيع أن تقول ما <em>شكل</em> الشيء قبل أن تشغّله؟ والأجوبة الخاطئة ترتبط بالفقرة التي تعيد قراءتها."
  },
  questions: [
    {
      id: "c3a01", type: "tf", level: "easy", topics: ["array-vs-list"],
      q: { en: "<code>[40, 55, 70] * 2</code> gives <code>[80, 110, 140]</code>.",
           ar: "<code>[40, 55, 70] * 2</code> تعطي <code>[80, 110, 140]</code>." },
      truth: false,
      explain: { en: "It gives a six-item list: <code>[40, 55, 70, 40, 55, 70]</code>. For a Python list <code>* 2</code> means \"repeat the sequence\"; for a NumPy array it means \"double every element\". Same operator, same-looking data, opposite meaning &mdash; and no error to tell you which one you got.",
                 ar: "تعطي قائمة بستة عناصر: <code>[40, 55, 70, 40, 55, 70]</code>. فـ <code>* 2</code> في قائمة بايثون تعني «أعِد التسلسل»؛ وفي مصفوفة نمباي تعني «ضاعِف كل عنصر». المُعامل نفسه وبياناتٌ متشابهة ومعنى متعاكس &mdash; ولا خطأ يخبرك بأيّهما حصلت." }
    },
    {
      id: "c3a02", type: "output", level: "easy", topics: ["elementwise"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nmarks = np.array([40, 55, 70])\n\nprint(marks * 2)\nprint(marks + np.array([5, 5, 5]))",
      blanks: [{ accept: ["[ 80 110 140]\n[45 60 75]"], lines: 2 }],
      explain: { en: "Arithmetic on an array happens to every element, with no loop written and none needed. The second line shows the other half of the rule: two arrays of the same shape combine position by position, not end to end &mdash; which is what <code>+</code> would have done to two lists.",
                 ar: "الحسابُ على المصفوفة يحدث لكل عنصر بلا حلقة مكتوبة ولا حاجة إليها. والسطر الثاني يُظهر النصف الآخر من القاعدة: فمصفوفتان بالشكل نفسه تتحدان موضعًا بموضع لا طرفًا إلى طرف &mdash; وذلك ما كانت <code>+</code> ستفعله بقائمتين." }
    },
    {
      id: "c3a03", type: "fill", level: "easy", topics: ["array-create"],
      q: { en: "Fill the three calls that produce these outputs.", ar: "أكمل النداءات الثلاثة التي تُنتج هذه المخرجات." },
      code: "print(____1____)   # [0 3 6 9]\nprint(____2____)   # [0.   0.25 0.5  0.75 1.  ]\nprint(____3____)   # a 2-by-3 table of 0.0",
      blanks: [
        { accept: ["np.arange(0, 10, 3)", "np.arange(0,10,3)", "np.arange(0, 12, 3)", "np.arange(0,12,3)"], label: { en: "every third number", ar: "كل عدد ثالث" } },
        { accept: ["np.linspace(0, 1, 5)", "np.linspace(0,1,5)"], label: { en: "five evenly spaced", ar: "خمسة متباعدة بانتظام" } },
        { accept: ["np.zeros((2, 3))", "np.zeros((2,3))"], label: { en: "an empty table", ar: "جدول فارغ" } }
      ],
      explain: { en: "<code>arange</code> takes a <em>step</em> and stops before the end value; <code>linspace</code> takes a <em>count</em> and includes both ends. That is the whole difference and it is the one people get wrong: five numbers from 0 to 1 is <code>linspace</code>, because you know how many you want, not how far apart they are. <code>np.zeros</code> takes the shape as one tuple, so the double brackets are not a typo.",
                 ar: "<code>arange</code> تأخذ <em>خطوة</em> وتتوقف قبل قيمة النهاية؛ و<code>linspace</code> تأخذ <em>عددًا</em> وتضمّ الطرفين. وذلك كل الفرق، وهو ما يخطئ فيه الناس: فخمسة أعداد من 0 إلى 1 هي <code>linspace</code>، لأنك تعرف كم تريد لا كم المسافة بينها. و<code>np.zeros</code> تأخذ الشكل مجموعةً واحدة، فالقوسان المزدوجان ليسا خطأً مطبعيًّا." }
    },
    {
      id: "c3a04", type: "mcq", level: "easy", topics: ["dtype"],
      q: { en: "What is the <code>dtype</code> of <code>np.array([1, 2, 3.5])</code>, and why?",
           ar: "ما <code>dtype</code> الـ <code>np.array([1, 2, 3.5])</code>، ولماذا؟" },
      options: [
        { en: "<code>float64</code>: an array has one type for every element, so NumPy picks the one type all three values fit into &mdash; an integer fits in a float, not the other way round.",
          ar: "<code>float64</code>: فللمصفوفة نوعٌ واحد لكل عنصر، فتختار نمباي النوع الذي تسع فيه القيم الثلاث &mdash; فالعدد الصحيح يسع في العشري لا العكس." },
        { en: "<code>object</code>: it keeps two integers and one float side by side.",
          ar: "<code>object</code>: فتُبقي صحيحين وعشريًّا جنبًا إلى جنب." },
        { en: "<code>int64</code>: the majority of the values are integers.",
          ar: "<code>int64</code>: فأكثر القيم أعدادٌ صحيحة." },
        { en: "It raises, because the values are not all the same type.",
          ar: "ترفع خطأً، لأن القيم ليست كلها بالنوع نفسه." }
      ],
      answer: 0,
      explain: { en: "This is the price of the speed: one type, decided once, for the whole block of memory &mdash; which is what lets NumPy do arithmetic on the block instead of on boxed Python objects one at a time. The consequence to remember is the next question's: the type is fixed from then on, and every later assignment is converted to fit it.",
                 ar: "هذا ثمن السرعة: نوعٌ واحد يُقرَّر مرة لكتلة الذاكرة كلها &mdash; وهو ما يُتيح لنمباي أن تحسب على الكتلة بدل كائنات بايثون المُعلَّبة واحدًا واحدًا. والنتيجة التي تُتذكَّر هي نتيجة السؤال التالي: فالنوع يَثبت من حينها، ويُحوَّل كل إسناد لاحق ليناسبه." }
    },
    {
      id: "c3a05", type: "output", level: "medium", topics: ["int-truncate", "dtype"],
      q: { en: "Write the three lines this prints.", ar: "اكتب الأسطر الثلاثة التي يطبعها." },
      code: "counts = np.array([10, 20, 30])\ncounts[0] = 9.7\n\nprint(counts)\nprint(counts / 2)\nprint((counts / 2).dtype)",
      blanks: [{ accept: ["[ 9 20 30]\n[ 4.5 10.  15. ]\nfloat64"], lines: 3 }],
      explain: { en: "Two halves of the same rule. Writing <em>into</em> an integer array converts the value to fit, so 9.7 becomes 9 &mdash; silently, with no warning and no rounding: the decimal part is cut off, not rounded. But dividing <em>produces</em> a new array, which is free to be <code>float64</code>, so the fractions survive there. The fix for the first line is to decide the type when the array is built: <code>np.array([10, 20, 30], dtype=float)</code>.",
                 ar: "نصفان من قاعدة واحدة. فالكتابةُ <em>في</em> مصفوفة صحيحة تحوّل القيمة لتناسب، فتصير 9.7 تسعة &mdash; بصمت، بلا تحذير ولا تقريب: فالجزء العشري يُقتطع لا يُقرَّب. أما القسمةُ فتُنتج مصفوفة جديدة حرّةً أن تكون <code>float64</code>، فتبقى الكسور فيها. وإصلاحُ السطر الأول أن تقرّر النوع عند بناء المصفوفة: <code>np.array([10, 20, 30], dtype=float)</code>." }
    },
    {
      id: "c3a06", type: "output", level: "easy", topics: ["view-copy"],
      q: { en: "Write the one line this prints.", ar: "اكتب السطر الذي يطبعه." },
      code: "a = np.array([1, 2, 3, 4, 5])\nb = a[1:3]\nb[:] = 0\n\nprint(a)",
      blanks: [{ accept: ["[1 0 0 4 5]"], lines: 1 }],
      explain: { en: "<code>b</code> is a <strong>view</strong>: a second array object pointing into the same memory. Writing through it writes into <code>a</code>. Note <code>b[:] = 0</code> rather than <code>b = 0</code> &mdash; the slice on the left says \"fill the places you are looking at\", where a plain assignment would just point the name <code>b</code> somewhere else and leave <code>a</code> alone.",
                 ar: "<code>b</code> <strong>نافذة</strong>: كائنُ مصفوفة ثانٍ يشير إلى الذاكرة نفسها. فالكتابةُ عبرها تكتب في <code>a</code>. ولاحظ <code>b[:] = 0</code> لا <code>b = 0</code> &mdash; فالقطعةُ يسارًا تقول «املأ المواضع التي تنظر إليها»، أما الإسناد المجرّد فيوجّه الاسم <code>b</code> إلى مكان آخر ويترك <code>a</code>." }
    },
    {
      id: "c3a07", type: "fill", level: "medium", topics: ["index-2d"],
      q: { en: "Three students, four subjects. Fill the three expressions.", ar: "ثلاثة طلبة وأربع مواد. أكمل التعابير الثلاثة." },
      code: "t = np.array([[40., 55., 70., 65.],\n              [60., 65., 90., 70.],\n              [80., 75., 50., 85.]])\n\nprint(____1____)   # 75.0\nprint(____2____)   # [65. 70. 85.]\nprint(____3____)   # (3, 4)",
      blanks: [
        { accept: ["t[2, 1]", "t[2][1]"], label: { en: "one mark", ar: "علامة واحدة" } },
        { accept: ["t[:, 3]", "t[:,3]"], label: { en: "the last subject", ar: "المادة الأخيرة" } },
        { accept: ["t.shape"], label: { en: "the shape", ar: "الشكل" } }
      ],
      explain: { en: "<code>t[row, column]</code>, counting from zero in both directions. The second is the form worth drilling: the colon means \"every row\", so the result is a whole column &mdash; one subject across all students. The habit the rest of the chapter rests on is printing <code>.shape</code> before doing arithmetic, which is why it is the third blank.",
                 ar: "<code>t[الصف، العمود]</code> بالعدّ من صفر في الاتجاهين. والثاني جديرٌ بالتمرين: فالنقطتان تعنيان «كل الصفوف» فتكون النتيجة عمودًا كاملًا &mdash; مادةً واحدة لكل الطلبة. والعادةُ التي يستند إليها بقية الفصل هي طباعة <code>.shape</code> قبل الحساب، ولذلك كانت الفراغ الثالث." }
    },
    {
      id: "c3a08", type: "match", level: "medium", topics: ["copy-rules", "view-copy"],
      q: { en: "Match each selection to what you get back.", ar: "وصّل كل اختيار بما تحصل عليه." },
      leftHead: { en: "Written as", ar: "يُكتب هكذا" },
      rightHead: { en: "Gives", ar: "يعطي" },
      pairs: [
        { l: { code: "a[1:4]" }, r: { en: "A view: start, step and stop describe it, so no data moves.", ar: "نافذة: فالبداية والخطوة والنهاية تصفها، فلا تتحرك بيانات." } },
        { l: { code: "a[[0, 2, 4]]" }, r: { en: "A copy: a list of positions need not be evenly spaced.", ar: "نسخة: فقائمة المواضع لا يلزم أن تكون متباعدة بانتظام." } },
        { l: { code: "a[a > 60]" }, r: { en: "A copy, for the same reason: a mask picks arbitrary positions.", ar: "نسخة للسبب نفسه: فالقناع ينتقي مواضع اعتباطية." } },
        { l: { code: "a[a > 60] = 60" }, r: { en: "Not a selection at all: it writes into the original.", ar: "ليس اختيارًا إطلاقًا: بل يكتب في الأصل." } }
      ],
      explain: { en: "The rule is mechanical, which is the good news: if the selection can be described as start/step/stop it is a window onto the same memory, and otherwise NumPy has to copy. The last row is the one that catches people, because the mask looks identical to the row above it &mdash; the difference is which side of the <code>=</code> it sits on.",
                 ar: "القاعدة آلية وهذا هو الخبر الجيد: فإن أمكن وصف الاختيار بداية/خطوة/نهاية فهو نافذة على الذاكرة نفسها، وإلا فعلى نمباي أن تنسخ. والصفّ الأخير هو ما يُسقط الناس، فالقناع يبدو مطابقًا للصفّ فوقه &mdash; والفرقُ في أيّ جانبٍ من <code>=</code> يقع." }
    },
    {
      id: "c3a09", type: "error", level: "medium", topics: ["view-copy"],
      q: { en: "This should cap the middle three marks and leave the class record alone. Click the line to change.",
           ar: "ينبغي أن يحصر هذا العلامات الوسطى الثلاث ويترك سجلّ الصفّ. انقر السطر الذي يجب تغييره." },
      code: "record = np.array([40, 55, 70, 85, 100])\n\nresit = record[1:4]\nresit[resit > 80] = 80\n\nprint(\"resit:\", resit)\nprint(\"class:\", record)",
      answer: 3,
      explain: { en: "Line 3 takes a view, so line 4 writes straight into the class record. One word fixes it: <code>record[1:4].copy()</code>. The habit to form is to write <code>.copy()</code> the moment you intend to <em>modify</em> a slice, and to leave it off when you only intend to read &mdash; which is most of the time, and is where the speed comes from.",
                 ar: "السطر 3 يأخذ نافذة، فيكتب السطر 4 في سجلّ الصفّ مباشرة. وكلمةٌ واحدة تصلحه: <code>record[1:4].copy()</code>. والعادةُ أن تكتب <code>.copy()</code> لحظةَ تنوي <em>تعديل</em> قطعة، وأن تتركها حين تنوي القراءة فقط &mdash; وهو أكثر الوقت، ومنه تأتي السرعة." },
      solution: { code: "resit = record[1:4].copy()" }
    },
    {
      id: "c3a10", type: "multi", level: "medium", topics: ["view-copy", "copy-rules"],
      q: { en: "Select <strong>every</strong> statement that is true.", ar: "اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "Slicing a Python list copies; slicing a NumPy array does not.", ar: "تقطيعُ قائمة بايثون ينسخ؛ وتقطيعُ مصفوفة نمباي لا." },
        { en: "<code>m[:, 0]</code> is a view, so <code>m[:, 0] += 5</code> moderates one subject in place.", ar: "<code>m[:, 0]</code> نافذة، فـ <code>m[:, 0] += 5</code> تعدّل مادةً واحدة في مكانها." },
        { en: "<code>b = a[:]</code> copies the array, as the same idiom does for a list.", ar: "<code>b = a[:]</code> تنسخ المصفوفة، كما يفعل الاصطلاح نفسه بالقائمة." },
        { en: "A view stores no elements of its own &mdash; only where to look and how far apart.", ar: "النافذةُ لا تخزّن عناصر لنفسها &mdash; بل أين تنظر وكم المسافة." },
        { en: "<code>a[a &gt; 60]</code> can be modified without touching <code>a</code>.", ar: "<code>a[a &gt; 60]</code> يمكن تعديلها بلا مسّ <code>a</code>." }
      ],
      answer: [0, 1, 3, 4],
      explain: { en: "The third is the one to reject, and it is worth saying why it is so tempting: <code>lst[:]</code> really is the standard way to copy a Python list, so the muscle memory is genuine. On an array <code>a[:]</code> is just a slice covering everything, which is a view like any other slice &mdash; the idiom you have used for years does the opposite of what you expect here. <code>a.copy()</code> is the only form that says what it means.",
                 ar: "الثالثة هي المرفوضة، وجديرٌ أن نقول لماذا هي مُغرية: فـ <code>lst[:]</code> هي فعلًا الطريقة المعيارية لنسخ قائمة بايثون، فذاكرةُ العضلات حقيقية. وفي المصفوفة <code>a[:]</code> مجردُ قطعةٍ تغطي الكل، وهي نافذةٌ كأي قطعة &mdash; فالاصطلاحُ الذي استعملته سنين يفعل هنا عكس ما تتوقع. و<code>a.copy()</code> هي الصيغة الوحيدة التي تقول ما تعني." }
    },
    {
      id: "c3a11", type: "mcq", level: "easy", topics: ["broadcast-shapes", "broadcast-rule"],
      q: { en: "A table of shape <code>(4, 3)</code> plus an array of shape <code>(3,)</code>. What happens?",
           ar: "جدولٌ شكله <code>(4, 3)</code> زائد مصفوفةٍ شكلها <code>(3,)</code>. فماذا يحدث؟" },
      options: [
        { en: "Shape <code>(4, 3)</code>: the three numbers are one per column, reused down all four rows.",
          ar: "الشكل <code>(4, 3)</code>: فالأعداد الثلاثة واحدٌ لكل عمود، تُعاد في الصفوف الأربعة." },
        { en: "Shape <code>(4, 3)</code>: the three numbers are one per row, reused across the columns.",
          ar: "الشكل <code>(4, 3)</code>: فالأعداد الثلاثة واحدٌ لكل صفّ، تُعاد على الأعمدة." },
        { en: "<code>ValueError</code>: 4 and 3 are neither equal nor 1.",
          ar: "<code>ValueError</code>: فـ 4 و3 لا متساويان ولا أحدهما 1." },
        { en: "Shape <code>(3,)</code>: the result is as small as the smaller operand.",
          ar: "الشكل <code>(3,)</code>: فالنتيجة بصغر المُعامل الأصغر." }
      ],
      answer: 0,
      explain: { en: "Right-align the shapes and read down each column: 3 against 3 fits, and the 4 has nothing opposite it so it is kept. The answer that makes the three numbers one per row is the trap, and it is the direction people assume &mdash; a flat array of three is always lined up with the <em>columns</em>, never the rows. To make three numbers mean one per row you have to say so: <code>[:, None]</code>, shape <code>(4, 1)</code> if there are four rows.",
                 ar: "حاذِ الشكلين يمينًا واقرأ كل عمود نزولًا: فـ 3 مقابل 3 تنطبق، والـ 4 لا شيء مقابلها فتُستبقى. والجوابُ الذي يجعل الأعداد الثلاثة واحدًا لكل صفّ هو الفخّ وهو الاتجاه الذي يفترضه الناس &mdash; فالمصفوفة المسطّحة ذات الثلاثة تُحاذى دائمًا مع <em>الأعمدة</em> لا الصفوف أبدًا. ولتجعل ثلاثة أعداد تعني واحدًا لكل صفّ عليك أن تقول ذلك: <code>[:, None]</code>، والشكل <code>(4, 1)</code> إن كانت الصفوف أربعة." }
    },
    {
      id: "c3a12", type: "output", level: "medium", topics: ["broadcast-shapes"],
      q: { en: "Write the four lines this prints.", ar: "اكتب الأسطر الأربعة التي يطبعها." },
      code: "t = np.array([[1., 2., 3.],\n              [4., 5., 6.]])\n\nprint(t * np.array([10., 100., 1000.]))\nprint(t + np.array([[1.],\n                    [2.]]))",
      blanks: [{ accept: ["[[  10.  200. 3000.]\n [  40.  500. 6000.]]\n[[2. 3. 4.]\n [6. 7. 8.]]"], lines: 4 }],
      explain: { en: "The two shapes you will actually write, side by side. A row of shape <code>(3,)</code> is reused down the rows, so each <strong>column</strong> gets its own number. A column of shape <code>(2, 1)</code> is reused across the columns, so each <strong>row</strong> gets its own. Telling those two apart is nearly all of broadcasting in practice.",
                 ar: "الشكلان اللذان ستكتبهما فعلًا جنبًا إلى جنب. فالصفُّ ذو الشكل <code>(3,)</code> يُعاد في الصفوف، فيأخذ كل <strong>عمود</strong> عدده. والعمودُ ذو الشكل <code>(2, 1)</code> يُعاد على الأعمدة، فيأخذ كل <strong>صفّ</strong> عدده. وتمييزُ الاثنين هو البثّ كلّه عمليًّا تقريبًا." }
    },
    {
      id: "c3a13", type: "fill", level: "medium", topics: ["newaxis"],
      q: { en: "Five couriers down the rows, two weeks across the columns. Add each <em>courier</em>'s bonus to their own row.",
           ar: "خمسة موزّعين في الصفوف وأسبوعان في الأعمدة. أضف علاوة كل <em>موزّع</em> إلى صفّه." },
      code: "parcels = np.array([[10., 12.],\n                    [20., 22.],\n                    [30., 32.],\n                    [40., 42.],\n                    [50., 52.]])\nbonus = np.array([1., 2., 3., 4., 5.])\n\nprint(parcels + ____1____)\n\n# expected:\n# [[11. 13.]\n#  [22. 24.]\n#  [33. 35.]\n#  [44. 46.]\n#  [55. 57.]]",
      blanks: [
        { accept: ["bonus[:, None]", "bonus[:,None]", "bonus.reshape(-1, 1)", "bonus.reshape(-1,1)", "bonus.reshape(5, 1)", "bonus.reshape(5,1)", "bonus[:, np.newaxis]", "bonus[:,np.newaxis]"],
          label: { en: "the bonus, one per row", ar: "العلاوة، واحدة لكل صفّ" } }
      ],
      explain: { en: "<code>bonus</code> is <code>(5,)</code> and the table is <code>(5, 2)</code>, so right-aligned the 5 lands under the 2 columns and it raises. Making it a column, <code>(5, 1)</code>, pairs 5 with 5 and stretches the 1 across the two weeks. Worth noticing what saved you here: the table is not square, so the mistake was an error rather than ten plausible wrong numbers.",
                 ar: "<code>bonus</code> شكله <code>(5,)</code> والجدول <code>(5, 2)</code>، فبالمحاذاة يمينًا تهبط الـ 5 تحت العمودين فيُرفع خطأ. وجعلُها عمودًا <code>(5, 1)</code> يُزاوج 5 مع 5 ويمدّد الـ 1 على الأسبوعين. وجديرٌ بالملاحظة ما أنجاك هنا: فالجدول غير مربّع، فكان الخطأُ خطأً لا عشرةَ أعدادٍ خاطئةٍ معقولة." }
    },
    {
      id: "c3a14", type: "order", level: "medium", topics: ["broadcast-rule"],
      q: { en: "You wrote a line of array arithmetic and the numbers are wrong, with no error. Put the diagnosis in order.",
           ar: "كتبتَ سطر حسابٍ على مصفوفات والأعداد خاطئة بلا خطأ. رتّب التشخيص." },
      items: [
        { en: "Print <code>.shape</code> of <strong>both</strong> operands.", ar: "اطبع <code>.shape</code> للمُعاملين <strong>كليهما</strong>." },
        { en: "Write the two shapes one above the other, aligned at the right-hand end.", ar: "اكتب الشكلين أحدهما فوق الآخر محاذَين من الطرف الأيمن." },
        { en: "Decide, from what the numbers <em>mean</em>, which dimension the smaller array was supposed to line up with.", ar: "حدّد من <em>معنى</em> الأعداد أيّ بُعد كان على المصفوفة الأصغر أن تُحاذيه." },
        { en: "If it was supposed to be one number per row, give it a row dimension: <code>[:, None]</code>, or <code>keepdims=True</code> on the reduction that produced it.", ar: "إن كان المقصود عددًا لكل صفّ فأعطه بُعد صفوف: <code>[:, None]</code> أو <code>keepdims=True</code> في التخفيض الذي أنتجه." },
        { en: "Re-run and check one value by hand against what you expected.", ar: "أعد التشغيل وافحص قيمةً واحدة بيدك مقابل ما توقعت." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 3 is the one that cannot be automated and the only one that needs you: the shapes say what NumPy did, but only you know what the numbers were supposed to mean. Step 5 is not optional either &mdash; a wrong shape usually produces output of a believable size and range, so \"it looks right now\" is not evidence. Check one number against arithmetic you did yourself.",
                 ar: "الخطوة 3 هي ما لا يُؤتَّم والوحيدة التي تحتاجك: فالأشكال تقول ما فعلت نمباي، وأنت وحدك تعرف ما كان على الأعداد أن تعنيه. والخطوة 5 ليست اختيارية أيضًا &mdash; فالشكلُ الخاطئ يُنتج عادةً مخرجًا بحجم ومدى معقولين، فـ«يبدو صحيحًا الآن» ليست بيّنة. افحص عددًا واحدًا مقابل حسابٍ أجريته بنفسك." }
    },
    {
      id: "c3a15", type: "complete", level: "medium", topics: ["newaxis", "keepdims"],
      q: { en: "Turn each worker's hours into shares of their own total, so every row sums to 1. Which line?",
           ar: "حوّل ساعات كل عامل إلى نِسَب من مجموعه، فيكون مجموع كل صفّ 1. فأي سطر؟" },
      code: "hours = np.array([[2., 3., 5.],\n                  [1., 1., 2.],\n                  [4., 4., 2.]])\n\n# which line?\n\nprint(share.round(2))\nprint(share.sum(axis=1))   # must be [1. 1. 1.]",
      options: [
        { code: "share = hours / hours.sum(axis=1, keepdims=True)" },
        { code: "share = hours / hours.sum(axis=1)" },
        { code: "share = hours / hours.sum(axis=0)" },
        { code: "share = hours / hours.sum()" }
      ],
      answer: 0,
      explain: { en: "The table is square, so the version without <code>keepdims</code> runs without complaint and divides each <em>column</em> by a row total &mdash; nine wrong numbers and no error. The third divides by the column totals, a real operation but a different question. The fourth divides by the grand total of 24, giving shares of the whole table. Only the first keeps the shape at <code>(3, 1)</code>, which says \"one number per row\" out loud, and it says it at the moment the dimension would otherwise have been dropped.",
                 ar: "الجدول مربّع، فتعمل النسخةُ بلا <code>keepdims</code> بلا شكوى وتقسم كل <em>عمود</em> على مجموع صفّ &mdash; تسعةُ أعداد خاطئة بلا خطأ. والثالث يقسم على مجاميع الأعمدة، وهي عملية حقيقية لكنها سؤالٌ آخر. والرابع يقسم على المجموع الكلي 24 فيعطي نِسَبًا من الجدول كله. والأول وحده يُبقي الشكل <code>(3, 1)</code> الذي يقول «عددٌ لكل صفّ» جهرًا، ويقوله لحظةَ كان البُعد سيُسقَط." }
    },
    {
      id: "c3a16", type: "mcq", level: "easy", topics: ["axis"],
      q: { en: "A table has students down the rows and subjects across the columns. Which call gives one average per <strong>subject</strong>?",
           ar: "جدولٌ فيه الطلبة في الصفوف والمواد في الأعمدة. فأي نداء يعطي متوسطًا لكل <strong>مادة</strong>؟" },
      options: [
        { en: "<code>marks.mean(axis=0)</code>", ar: "<code>marks.mean(axis=0)</code>" },
        { en: "<code>marks.mean(axis=1)</code>", ar: "<code>marks.mean(axis=1)</code>" },
        { en: "<code>marks.mean()</code>", ar: "<code>marks.mean()</code>" },
        { en: "Either axis, since the result is the same numbers either way.", ar: "أي محور، فالنتيجة الأعداد نفسها في الحالتين." }
      ],
      answer: 0,
      explain: { en: "The axis you name is the one that <strong>disappears</strong>. Axis 0 is the rows, so naming it collapses the students and leaves one number per surviving column &mdash; a subject average. The shape is the check that never lies: a <code>(30, 4)</code> table with axis 0 removed is <code>(4,)</code>, four numbers. Guessing from the direction is how people get this wrong for years; counting the answers is how you stop.",
                 ar: "المحورُ الذي تسمّيه هو الذي <strong>يختفي</strong>. فالمحور 0 هو الصفوف، فتسميتُه تَطبِق الطلبة وتُبقي عددًا لكل عمود باقٍ &mdash; متوسطَ مادة. والشكلُ هو الفحص الذي لا يكذب: فجدول <code>(30, 4)</code> بزوال المحور 0 يصير <code>(4,)</code>، أربعة أعداد. والتخمينُ من الاتجاه هو سبب خطأ الناس سنين؛ وعدُّ الأجوبة هو كيف تكفّ عنه." }
    },
    {
      id: "c3a17", type: "output", level: "easy", topics: ["mask"],
      q: { en: "Write the three lines this prints.", ar: "اكتب الأسطر الثلاثة التي يطبعها." },
      code: "cost = np.array([15, 40, 90, 120, 200])\nbig = cost >= 90\n\nprint(big)\nprint(cost[big])\nprint(big.sum())",
      blanks: [{ accept: ["[False False  True  True  True]\n[ 90 120 200]\n3"], lines: 3 }],
      explain: { en: "A comparison gives a mask &mdash; one answer per element, the same shape as the array. Indexing with a mask selects where it is <code>True</code>. Summing a mask counts them, because <code>True</code> adds as 1. Three lines, three ideas, no loop and no <code>if</code>.",
                 ar: "المقارنةُ تعطي قناعًا &mdash; جوابًا لكل عنصر بشكل المصفوفة نفسه. والفهرسةُ بالقناع تختار حيث يكون <code>True</code>. وجمعُ القناع يعدّها لأن <code>True</code> تُجمع كـ 1. ثلاثةُ أسطر وثلاث أفكار بلا حلقة ولا <code>if</code>." }
    },
    {
      id: "c3a18", type: "fill", level: "medium", topics: ["axis"],
      q: { en: "Two workers down the rows, four tasks across the columns. Fill the three blanks.",
           ar: "عاملان في الصفوف وأربع مهام في الأعمدة. أكمل الفراغات الثلاثة." },
      code: "t = np.array([[2., 3., 4., 1.],\n              [5., 0., 2., 3.]])\n\nprint(t.sum(axis=____1____))   # [7. 3. 6. 4.]  one per task\nprint(t.sum(axis=____2____))   # [10. 10.]  one per worker\nprint(t.min(axis=0).shape)     # ____3____",
      blanks: [
        { accept: ["0"], label: { en: "one per task", ar: "واحد لكل مهمة" } },
        { accept: ["1"], label: { en: "one per worker", ar: "واحد لكل عامل" } },
        { accept: ["(4,)", "(4, )"], label: { en: "the shape", ar: "الشكل" } }
      ],
      explain: { en: "Count the answers rather than picturing the direction: four totals means four columns survived, so the rows were collapsed, so the axis named was 0. This table is not square, which is why a mistake here gives an obviously wrong <em>length</em> &mdash; two numbers where you wanted four. On a square table it would not, which is the whole of Lesson 12's disaster.",
                 ar: "عُدّ الأجوبة بدل تصوّر الاتجاه: فأربعة مجاميع تعني أن أربعة أعمدة بقيت، فالصفوفُ طُبِقت، فالمحور المسمّى 0. وهذا الجدول غير مربّع، ولذلك يعطي الخطأ هنا <em>طولًا</em> خاطئًا بيّنًا &mdash; عددان حيث أردت أربعة. وعلى جدول مربّع لا يفعل، وذلك هو كارثة الدرس 12 كلها." }
    },
    {
      id: "c3a19", type: "trace", level: "medium", topics: ["nan-array", "mask"],
      q: { en: "One mark is missing. State the value of each name at the end.",
           ar: "علامةٌ واحدة مفقودة. حدّد قيمة كل اسم في النهاية." },
      code: "marks = np.array([60., np.nan, 80.])\n\na = marks.sum()\nb = np.nanmean(marks)\nc = np.isnan(marks).sum()\nd = (marks > 50).sum()",
      blanks: [
        { accept: ["nan"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["70.0", "70"], label: { en: "<code>b</code>", ar: "<code>b</code>" } },
        { accept: ["1"], label: { en: "<code>c</code>", ar: "<code>c</code>" } },
        { accept: ["2"], label: { en: "<code>d</code>", ar: "<code>d</code>" } }
      ],
      explain: { en: "<code>a</code> is the loud failure, and it is a kindness: any arithmetic touching <code>nan</code> gives <code>nan</code>, so one gap cannot quietly become a total for a different class from the one you asked about. <code>b</code> is the deliberate choice to skip it &mdash; 70 is the mean of 60 and 80, over two values. <code>d</code> is the subtle one: a comparison against a missing value is <code>False</code>, so the gap is counted neither as above 50 nor below it.",
                 ar: "<code>a</code> هو الإخفاق الجهير وهو لطف: فأي حساب يلمس <code>nan</code> يعطي <code>nan</code>، فلا يصير فراغٌ بصمتٍ مجموعًا لصفٍّ غير الذي سألت عنه. و<code>b</code> هو الاختيار المتعمّد لتخطّيه &mdash; فـ 70 متوسط 60 و80 على قيمتين. و<code>d</code> هو الخفيّ: فالمقارنةُ بقيمة مفقودة <code>False</code>، فلا يُعدّ الفراغ فوق 50 ولا تحتها." }
    },
    {
      id: "c3a20", type: "compare", level: "medium", topics: ["where", "mask"],
      q: { en: "Both cap the cost at 150. What is the difference?", ar: "كلاهما يحصر التكلفة عند 150. فما الفرق؟" },
      codeA: "cost = np.array([15, 40, 90, 120, 200])\n\ncapped = np.where(cost > 150, 150, cost)\n\nprint(cost)\nprint(capped)",
      codeB: "cost = np.array([15, 40, 90, 120, 200])\n\ncost[cost > 150] = 150\n\nprint(cost)",
      options: [
        { en: "A leaves <code>cost</code> as it was and returns the capped figures as a new array; B writes into <code>cost</code> itself, so the original figures are gone.",
          ar: "A يترك <code>cost</code> كما كانت ويُعيد الأرقام المحصورة مصفوفةً جديدة؛ وB يكتب في <code>cost</code> نفسها فتذهب الأرقام الأصلية." },
        { en: "They are the same; <code>np.where</code> is a longer way of writing a mask assignment.",
          ar: "هما سواء؛ و<code>np.where</code> صيغةٌ أطول لإسناد القناع." },
        { en: "A raises, because <code>np.where</code> needs its three arguments to have the same shape.",
          ar: "A يرفع خطأً، لأن <code>np.where</code> تحتاج أن تكون وسائطها الثلاثة بالشكل نفسه." },
        { en: "B caps every value at 150, not only those above it.",
          ar: "B يحصر كل قيمة عند 150 لا التي فوقها فقط." }
      ],
      answer: 0,
      explain: { en: "The capped figures are identical, so a glance at the output will not tell them apart &mdash; the difference is whether the original survived, and in A it did. That matters more than it sounds: a report usually wants the raw and the adjusted numbers side by side, and B has thrown one away. The answer that expects <code>np.where</code> to need three identical shapes is worth refuting because it sounds plausible: <code>np.where</code> broadcasts its arguments, so a mask, a single number and an array work together perfectly well.",
                 ar: "الأرقام المحصورة متطابقة، فلن تميّزهما نظرةٌ إلى المخرج &mdash; فالفرقُ هل بقي الأصل، وفي A بقي. وذلك أهم مما يبدو: فالتقرير يريد عادةً الأرقام الخام والمعدَّلة جنبًا إلى جنب، وB رمى إحداها. والجوابُ الذي يتوقع من <code>np.where</code> ثلاثة أشكال متطابقة جديرٌ بالدحض لأنه يبدو معقولًا: فـ <code>np.where</code> تبثّ وسائطها، فيعمل القناع والعدد المفرد والمصفوفة معًا تمامًا." }
    }
  ]
};

window.OOPBanks["chapter-03-test-b"] = {
  title: { en: "Chapter 3 Test B — Advanced", ar: "اختبار الفصل 3 ب — المتقدّم" },
  intro: {
    en: "Twenty hard questions, every one of which crosses at least two lessons &mdash; a view that is also a mask, a dtype that is also a broadcast, an axis that is also a missing value. Nothing here raises an error unless the question says so, which is the point: these are the mistakes that ship.",
    ar: "عشرون سؤالًا صعبًا، كلٌّ منها يعبر درسين على الأقل &mdash; نافذةٌ هي قناع أيضًا، ونوعٌ هو بثٌّ أيضًا، ومحورٌ هو قيمةٌ مفقودة أيضًا. ولا شيء هنا يرفع خطأً إلا إن قال السؤال، وذلك هو المقصود: فهذه هي الأخطاء التي تُشحَن."
  },
  questions: [
    {
      id: "c3b01", type: "output", level: "hard", topics: ["int-truncate", "view-copy", "dtype"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nt = np.array([[10, 20, 30],\n              [40, 50, 60]])\n\nt[:, 0] = t[:, 0] / 3\n\nprint(t)\nprint(t.dtype)",
      blanks: [{ accept: ["[[ 3 20 30]\n [13 50 60]]\nint64"], lines: 3 }],
      explain: { en: "Three lessons in one line. <code>t[:, 0]</code> is a view, so the assignment writes into the real table. The division produced <code>float64</code> values &mdash; 3.33 and 13.33 &mdash; but the destination is an <code>int64</code> array whose type was fixed when it was built, so each value is truncated to fit: cut, not rounded, which is why 13.33 becomes 13 and not 13.0 or 14. The table's dtype never changes; an array does not become a float array because you wrote floats into it.",
                 ar: "ثلاثةُ دروس في سطر. فـ <code>t[:, 0]</code> نافذة، فيكتب الإسناد في الجدول الحقيقي. وأنتجت القسمة قيمًا <code>float64</code> &mdash; 3.33 و13.33 &mdash; لكن المقصد مصفوفة <code>int64</code> ثُبّت نوعها عند بنائها، فتُبتر كل قيمة لتناسب: قطعًا لا تقريبًا، ولذلك صارت 13.33 ثلاثة عشر لا 13.0 ولا 14. ونوعُ الجدول لا يتغير أبدًا؛ فالمصفوفةُ لا تصير عشرية لأنك كتبت فيها عشريات." }
    },
    {
      id: "c3b02", type: "compare", level: "hard", topics: ["view-copy", "index-2d"],
      q: { en: "Two ways of adding 10 to the first subject. What is the difference in effect?",
           ar: "طريقتان لإضافة 10 إلى المادة الأولى. فما الفرق في الأثر؟" },
      codeA: "m = np.array([[40, 55, 70],\n              [60, 65, 90]])\n\ncol = m[:, 0]\ncol += 10\n\nprint(m)",
      codeB: "m = np.array([[40, 55, 70],\n              [60, 65, 90]])\n\nm[:, 0] = m[:, 0] + 10\n\nprint(m)",
      options: [
        { en: "No difference in effect: both print the moderated table. A writes through a view in place; B builds a new array and assigns it back into the same places. B says what it means more plainly, which is why it is the one to prefer in shared code.",
          ar: "لا فرق في الأثر: فكلاهما يطبع الجدول المعدَّل. فـ A يكتب عبر نافذة في مكانها؛ وB يبني مصفوفة جديدة ويُسندها إلى المواضع نفسها. وB يقول ما يعني أوضح، ولذلك يُفضَّل في الشفرة المشتركة." },
        { en: "A changes the table and B does not, because <code>col + 10</code> builds a new array.",
          ar: "A يغيّر الجدول وB لا، لأن <code>col + 10</code> يبني مصفوفة جديدة." },
        { en: "B changes the table and A does not, because <code>+=</code> on a view only rebinds the name.",
          ar: "B يغيّر الجدول وA لا، لأن <code>+=</code> على نافذة لا تفعل إلا إعادة ربط الاسم." },
        { en: "A raises, because you cannot use <code>+=</code> on a view.",
          ar: "A يرفع خطأً، لأنك لا تستطيع استعمال <code>+=</code> على نافذة." }
      ],
      answer: 0,
      explain: { en: "This is the case that is easy to get backwards after Lesson 11, because the famous trap looks almost identical: <code>col = col + 10</code> would <em>not</em> change the table, since it points the name <code>col</code> at a brand-new array and drops the view. Here B's left-hand side is <code>m[:, 0]</code>, a slice <em>being assigned into</em>, which tells NumPy where to write. The lesson: look at what is on the left of the <code>=</code>, not at whether the right-hand side is new.",
                 ar: "هذه هي الحالةُ التي يسهل عكسها بعد الدرس 11، فالفخّ المشهور يبدو مطابقًا تقريبًا: فـ <code>col = col + 10</code> <em>لن</em> تغيّر الجدول، إذ توجّه الاسم <code>col</code> إلى مصفوفة جديدة تمامًا وتُسقط النافذة. وهنا طرفُ B الأيسر <code>m[:, 0]</code>، قطعةٌ <em>يُسنَد إليها</em>، وهي تخبر نمباي أين تكتب. والدرس: انظر إلى ما يسار <code>=</code> لا إلى هل الطرف الأيمن جديد." }
    },
    {
      id: "c3b03", type: "trace", level: "hard", topics: ["view-copy", "mask", "nan-array"],
      q: { en: "A view, then a mask written through it. State each value at the end.",
           ar: "نافذةٌ ثم قناعٌ مكتوبٌ عبرها. حدّد كل قيمة في النهاية." },
      code: "marks = np.array([40., 55., 70., 85., 100.])\n\npart = marks[1:4]\npart[part > 60] = 60\n\na = marks\nb = (marks == 60).sum()\nc = marks.mean()",
      blanks: [
        { accept: ["[ 40.  55.  60.  60. 100.]", "[40. 55. 60. 60. 100.]"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["2"], label: { en: "<code>b</code>", ar: "<code>b</code>" } },
        { accept: ["63.0", "63"], label: { en: "<code>c</code>", ar: "<code>c</code>" } }
      ],
      explain: { en: "Two rules meeting. A mask on the <strong>right</strong> of <code>=</code> gives a copy, but here it is on the <strong>left</strong>, where it tells NumPy which places to write &mdash; and the places belong to a view, so the writes land in <code>marks</code>. Only positions 2 and 3 were in the window: 70 and 85 became 60, while 100 is outside the slice and survives untouched even though it is far above the cap. That last detail is the one worth carrying: the cap applied to the window, not to the data.",
                 ar: "قاعدتان تتلاقيان. فالقناعُ <strong>يمين</strong> <code>=</code> يعطي نسخة، لكنه هنا <strong>يسارها</strong> حيث يخبر نمباي أي المواضع يكتب &mdash; والمواضعُ لنافذة، فتهبط الكتابات في <code>marks</code>. والموضعان 2 و3 وحدهما كانا في النافذة: فصارت 70 و85 ستين، أما 100 فخارج القطعة ونجت بلا مساس وهي فوق الحدّ بكثير. وذلك التفصيل الأخير جديرٌ بالحمل: فالحدُّ طُبّق على النافذة لا على البيانات." }
    },
    {
      id: "c3b04", type: "multi", level: "hard", topics: ["broadcast-trap", "axis", "keepdims", "view-copy"],
      q: { en: "Select <strong>every</strong> statement that is true.", ar: "اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "On a square table, <code>marks - marks.mean(axis=1)</code> runs without error and every value is wrong.", ar: "على جدول مربّع، <code>marks - marks.mean(axis=1)</code> تعمل بلا خطأ وكل قيمة خاطئة." },
        { en: "On a 5-by-3 table the same line raises, because the shapes no longer fit.", ar: "على جدول 5×3 يرفع السطر نفسه خطأً، لأن الأشكال لم تعد تنطبق." },
        { en: "<code>keepdims=True</code> prevents the mistake by never letting the ambiguous shape exist.", ar: "<code>keepdims=True</code> يمنع الخطأ بألّا يَدَع الشكل الملتبس يوجد أصلًا." },
        { en: "<code>marks.mean(axis=1)</code> and <code>marks.mean(axis=1, keepdims=True)</code> hold different numbers.", ar: "<code>marks.mean(axis=1)</code> و<code>marks.mean(axis=1, keepdims=True)</code> تحملان أعدادًا مختلفة." },
        { en: "A mask built from <code>marks[:, 0]</code> can index the table's rows, because it has one entry per row.", ar: "القناعُ المبني من <code>marks[:, 0]</code> يستطيع فهرسة صفوف الجدول، لأن فيه مدخلًا لكل صفّ." }
      ],
      answer: [0, 1, 2, 4],
      explain: { en: "The fourth is false and the distinction matters: the <em>numbers</em> are identical, only the shape differs &mdash; <code>(3,)</code> against <code>(3, 1)</code>. That is exactly why the bug is so quiet. A shape is not decoration; it is the only record of which direction a reduction came from, and the <code>(3,)</code> version has thrown that record away. Statements 1 and 2 together are the chapter's sharpest lesson: whether this mistake is an error or a silent disaster depends on nothing but the table happening to be square.",
                 ar: "الرابعة كاذبة والتمييز مهم: فالـ<em>أعداد</em> متطابقة والشكل وحده يختلف &mdash; <code>(3,)</code> مقابل <code>(3, 1)</code>. ولذلك بالضبط كان العيب صامتًا. فالشكلُ ليس زخرفة؛ بل هو السجلُّ الوحيد لاتجاه التخفيض، ونسخةُ <code>(3,)</code> رمت ذلك السجل. والعبارتان 1 و2 معًا أحدُّ درس في الفصل: فكونُ هذا الخطأ خطأً أو كارثةً صامتة لا يتوقف على شيء إلا كون الجدول مربّعًا اتفاقًا." }
    },
    {
      id: "c3b05", type: "error", level: "hard", topics: ["mask-rows", "index-2d"],
      q: { en: "This should select the students who scored 60 or more in the <em>first subject</em>. It returns one row, and the wrong one. Click the line to change.",
           ar: "ينبغي أن يختار هذا الطلبة الذين نالوا 60 أو أكثر في <em>المادة الأولى</em>. وهو يُعيد صفًّا واحدًا وهو الخطأ. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\nmarks = np.array([[40., 55., 70.],\n                  [60., 65., 90.],\n                  [80., 75., 50.]])\n\nstrong = marks[0, :] >= 60\nprint(marks[strong])",
      answer: 7,
      explain: { en: "<code>marks[0, :]</code> is the first <em>row</em> &mdash; one student across all subjects &mdash; where <code>marks[:, 0]</code> is the first <em>column</em>, one subject across all students. The comma position is the whole bug. Both give a three-entry mask, and a three-entry mask indexes the three rows happily, so the program runs and prints <code>[[80. 75. 50.]]</code>: the mask <code>[False, False, True]</code> came from student 1's marks and was then used to pick students. The correct version prints two rows. Nothing raised, and the output even looked like the right kind of thing.",
                 ar: "<code>marks[0, :]</code> هو <em>الصفّ</em> الأول &mdash; طالبٌ واحد في كل المواد &mdash; بينما <code>marks[:, 0]</code> هو <em>العمود</em> الأول، مادةٌ واحدة لكل الطلبة. وموضعُ الفاصلة هو العيب كله. وكلاهما يعطي قناعًا بثلاثة مداخل، والقناعُ ذو الثلاثة يفهرس الصفوف الثلاثة بسلاسة، فيعمل البرنامج ويطبع <code>[[80. 75. 50.]]</code>: فالقناع <code>[False, False, True]</code> جاء من علامات الطالب 1 ثم استُعمل لانتقاء الطلبة. والنسخةُ الصحيحة تطبع صفّين. ولا شيء رفع خطأً، وبدا المخرجُ من النوع الصحيح." },
      solution: { code: "strong = marks[:, 0] >= 60   # [[60. 65. 90.]\n                             #  [80. 75. 50.]]" }
    },
    {
      id: "c3b06", type: "complete", level: "hard", topics: ["where", "nan-array", "broadcast-shapes"],
      q: { en: "Replace each missing mark with that <strong>subject</strong>'s average. Which line?",
           ar: "استبدل كل علامة مفقودة بمتوسط <strong>مادتها</strong>. فأي سطر؟" },
      code: "marks = np.array([[40., 55., 70.],\n                  [np.nan, 65., 90.],\n                  [80., 75., 50.]])\n\nsubject_mean = np.nanmean(marks, axis=0)   # [60. 65. 70.]\n\n# which line?\n\nprint(filled)   # the gap must become 60.0",
      options: [
        { code: "filled = np.where(np.isnan(marks), subject_mean, marks)" },
        { code: "filled = np.where(np.isnan(marks), subject_mean[:, None], marks)" },
        { code: "filled = np.where(marks == np.nan, subject_mean, marks)" },
        { code: "filled = marks[np.isnan(marks)] = subject_mean" }
      ],
      answer: 0,
      explain: { en: "Three ideas have to line up at once. <code>np.isnan</code> builds the mask, because <code>== np.nan</code> is <code>False</code> everywhere and the version using <code>== np.nan</code> therefore changes nothing at all, silently. <code>subject_mean</code> has shape <code>(3,)</code>, which broadcasts down the rows &mdash; one number per column, which is exactly what a subject average is. The version with <code>subject_mean[:, None]</code> makes it a column, so the gap would be filled with 65, the average of the <em>second subject</em>, because the gap is in row 1: a plausible number, from the wrong direction. The fourth is not valid as a single statement and, written properly, raises: you cannot assign three values into the one place the mask is true.",
                 ar: "ثلاثُ أفكار يجب أن تتحاذى معًا. فـ <code>np.isnan</code> تبني القناع، لأن <code>== np.nan</code> كاذبةٌ في كل مكان فلا تغيّر النسخةُ التي تستعمل <code>== np.nan</code> شيئًا بصمت. و<code>subject_mean</code> شكله <code>(3,)</code> فيُبثّ في الصفوف &mdash; عددٌ لكل عمود، وذلك بالضبط ما يكون متوسط المادة. والنسخةُ ذات <code>subject_mean[:, None]</code> تجعله عمودًا، فيُملأ الفراغ بـ 65 متوسطِ <em>المادة الثانية</em> لأن الفراغ في الصفّ 1: عددٌ معقول من الاتجاه الخاطئ. والرابع غير صحيح عبارةً واحدة، وإن كُتب صوابًا رفع خطأً: فلا تستطيع إسناد ثلاث قيم إلى الموضع الواحد الذي صدق فيه القناع." }
    },
    {
      id: "c3b07", type: "mcq", level: "hard", topics: ["broadcast-trap", "shape"],
      q: { en: "What single fact about the data makes Lesson 12's silent disaster possible?",
           ar: "أيُّ واقعةٍ واحدة في البيانات تجعل كارثةَ الدرس 12 الصامتة ممكنة؟" },
      options: [
        { en: "The table is square, so a flat array of three fits the rule in both directions and NumPy always picks the same one.",
          ar: "الجدول مربّع، فتنطبق مصفوفةٌ مسطّحة من ثلاثة على القاعدة في الاتجاهين، وتختار نمباي الاتجاه نفسه دائمًا." },
        { en: "The values are floats, so no error is raised on conversion.",
          ar: "القيم عشرية، فلا يُرفع خطأ عند التحويل." },
        { en: "<code>mean</code> returns a view rather than a copy.",
          ar: "<code>mean</code> تُعيد نافذة لا نسخة." },
        { en: "The averages happen to be close to each other, so the output looks reasonable.",
          ar: "المتوسطاتُ قريبة بعضها من بعض اتفاقًا، فيبدو المخرج معقولًا." }
      ],
      answer: 0,
      explain: { en: "It is the shape of the table and nothing else. Make it 5-by-3 and the same mistake raises <code>ValueError</code> immediately; make it square and the same line produces a full table of wrong numbers. The answer about the averages being close together describes why the bug <em>survives review</em> &mdash; plausible-looking output &mdash; but not why it is possible, and that distinction is worth keeping straight: one is about the data's shape, the other about your attention. The defence is a habit, not a check: print <code>.shape</code> of both operands, or ask for <code>keepdims=True</code> so the ambiguous shape is never created.",
                 ar: "إنه شكلُ الجدول ولا شيء غيره. اجعله 5×3 يرفع الخطأ نفسه <code>ValueError</code> فورًا؛ واجعله مربّعًا يُنتج السطرُ نفسه جدولًا كاملًا من أعداد خاطئة. والجوابُ عن تقارب المتوسطات يصف لماذا <em>ينجو</em> العيب من المراجعة &mdash; مخرجٌ يبدو معقولًا &mdash; لا لماذا هو ممكن، وذلك تمييزٌ يُستحسن ضبطه: فأحدهما عن شكل البيانات والآخر عن انتباهك. والدفاعُ عادةٌ لا فحص: اطبع <code>.shape</code> للمُعاملين، أو اطلب <code>keepdims=True</code> فلا يُخلَق الشكل الملتبس أبدًا." }
    },
    {
      id: "c3b08", type: "output", level: "hard", topics: ["nan-array", "axis"],
      q: { en: "Write the three lines this prints.", ar: "اكتب الأسطر الثلاثة التي يطبعها." },
      code: "marks = np.array([[40., np.nan, 70.],\n                  [60., 65., 90.]])\n\nprint(marks.mean(axis=0))\nprint(np.nanmean(marks, axis=0))\nprint(np.isnan(marks).sum(axis=1))",
      blanks: [{ accept: ["[50. nan 80.]\n[50. 65. 80.]\n[1 0]"], lines: 3 }],
      explain: { en: "The poisoning is <em>local</em>, and that is the detail this question exists for. One missing mark ruins its own column average and leaves the other two intact, because each column is reduced separately &mdash; so a report built this way shows two believable numbers next to a <code>nan</code>, which is far easier to miss than an all-<code>nan</code> result. <code>nanmean</code> fills the gap in by averaging over the one value that is there: 65, over a single mark. The third line counts gaps per student, and counting with <code>.sum()</code> over a mask of <code>isnan</code> is the idiom to keep.",
                 ar: "التسميمُ <em>موضعي</em>، وذلك هو التفصيل الذي وُجد لأجله هذا السؤال. فعلامةٌ مفقودة واحدة تُفسد متوسط عمودها وتترك الآخرين سليمين، لأن كل عمود يُخفَّض منفردًا &mdash; فالتقريرُ المبني هكذا يُظهر عددين معقولين إلى جانب <code>nan</code>، وذلك أخفى بكثير من نتيجةٍ كلّها <code>nan</code>. و<code>nanmean</code> تسدّ الفراغ بالمتوسط على القيمة الوحيدة الموجودة: 65 على علامة واحدة. والسطر الثالث يعدّ الفراغات لكل طالب، والعدُّ بـ <code>.sum()</code> على قناع <code>isnan</code> هو الاصطلاح الذي تُبقيه." }
    },
    {
      id: "c3b09", type: "fill", level: "hard", topics: ["axis", "mask", "nan-array"],
      q: { en: "A whole report with no loops. Fill the three blanks.", ar: "تقريرٌ كامل بلا حلقات. أكمل الفراغات الثلاثة." },
      code: "subjects = np.array([\"maths\", \"arabic\", \"science\"])\nmarks = np.array([[40., 55., 70.],\n                  [60., np.nan, 90.],\n                  [80., 75., 50.]])\n\nmeans = np.nanmean(marks, axis=0)\n\nprint(\"hardest:\", subjects[means.____1____()])   # maths\nprint(\"below 60:\", (marks < 60).____2____())     # 3\nprint(\"missing:\", np.____3____(marks).sum())     # 1",
      blanks: [
        { accept: ["argmin"], label: { en: "which subject is lowest", ar: "أي مادة هي الأدنى" } },
        { accept: ["sum"], label: { en: "count them", ar: "عُدّها" } },
        { accept: ["isnan"], label: { en: "find the gaps", ar: "جِد الفراغات" } }
      ],
      explain: { en: "<code>argmin</code> gives the <em>position</em> of the smallest, not the value &mdash; which is exactly what you need to look a name up in a parallel array, and the reason it exists as a separate function from <code>min</code>. <code>(marks &lt; 60).sum()</code> counts over the whole table at once because no axis was named. And the gap is counted by neither of the first two: a comparison against a missing value is <code>False</code>, so it is neither a pass nor a fail, which means the passes and the fails do not add up to nine. That is honest, and it is why the third line is in the report at all.",
                 ar: "<code>argmin</code> تعطي <em>موضع</em> الأصغر لا قيمته &mdash; وذلك بالضبط ما تحتاجه للبحث عن اسم في مصفوفة موازية، وسببُ وجودها دالةً منفصلة عن <code>min</code>. و<code>(marks &lt; 60).sum()</code> تعدّ في الجدول كله دفعةً لأن لا محور سُمِّي. والفراغُ لا تعدّه الأوليان: فالمقارنةُ بقيمة مفقودة <code>False</code>، فلا هو نجاح ولا رسوب، ومعناه أن النجاحات والرسوبات لا تبلغ تسعة. وذلك صادق، وهو سببُ وجود السطر الثالث في التقرير أصلًا." }
    },
    {
      id: "c3b10", type: "match", level: "hard", topics: ["broadcast-rule", "mask-and-or", "index-2d"],
      q: { en: "Match each message to what you did.", ar: "وصّل كل رسالة بما فعلتَه." },
      leftHead: { en: "Message", ar: "الرسالة" },
      rightHead: { en: "Cause", ar: "السبب" },
      pairs: [
        { l: { code: "ValueError: operands could not be broadcast\ntogether with shapes (3,4) (3,)" },
          r: { en: "A per-row quantity written as a flat row. Give it a row dimension: <code>[:, None]</code>.", ar: "مقدارٌ لكل صفّ كُتب صفًّا مسطّحًا. أعطه بُعد صفوف: <code>[:, None]</code>." } },
        { l: { code: "ValueError: The truth value of an array with\nmore than one element is ambiguous" },
          r: { en: "<code>and</code> or <code>or</code> between two masks. Use <code>&amp;</code> or <code>|</code>, with brackets.", ar: "<code>and</code> أو <code>or</code> بين قناعين. استعمل <code>&amp;</code> أو <code>|</code> بأقواس." } },
        { l: { code: "ValueError: could not broadcast input array\nfrom shape (3,) into shape (2,)" },
          r: { en: "Assigning three values into a slice that is two places long.", ar: "إسنادُ ثلاث قيم إلى قطعة طولها موضعان." } },
        { l: { code: "IndexError: index 3 is out of bounds for\naxis 0 with size 3" },
          r: { en: "Counting from one. The three valid positions are 0, 1 and 2.", ar: "العدُّ من واحد. فالمواضع الصحيحة الثلاثة هي 0 و1 و2." } }
      ],
      explain: { en: "Learning to read these four is most of what fluency in NumPy consists of, because they are specific: the first two quote the shapes and the operands, the third names both the source and the destination, and the fourth tells you which axis and how big it was. Note how differently the first and third are worded &mdash; \"broadcast together with\" is two operands meeting in an expression, \"broadcast input array into\" is one array being written into a place of a fixed size.",
                 ar: "تعلّمُ قراءة هذه الأربع هو أكثرُ ما تتكون منه الطلاقة في نمباي، لأنها محدّدة: فالأوليان تقتبسان الأشكال والمُعاملات، والثالثة تسمّي المصدر والمقصد، والرابعة تخبرك بأي محور وكم حجمه. ولاحظ كم تختلف صياغةُ الأولى والثالثة &mdash; فـ«broadcast together with» مُعاملان يتلاقيان في تعبير، و«broadcast input array into» مصفوفةٌ تُكتب في موضعٍ حجمُه ثابت." }
    },
    {
      id: "c3b11", type: "order", level: "hard", topics: ["view-copy", "copy-rules"],
      q: { en: "You want to cap some marks for a resit list without touching the class record. Put the safe procedure in order.",
           ar: "تريد حصر بعض العلامات لقائمة إعادة دون مسّ سجلّ الصفّ. رتّب الإجراء الآمن." },
      items: [
        { en: "Decide whether you are going to <em>read</em> the selection or <em>modify</em> it.", ar: "حدّد هل ستَقرأ الاختيار أم تُعدّله." },
        { en: "Because you will modify it, take the slice with <code>.copy()</code>.", ar: "ولأنك ستعدّله، خُذ القطعة بـ <code>.copy()</code>." },
        { en: "Write the cap through the mask: <code>resit[resit &gt; 80] = 80</code>.", ar: "اكتب الحدّ عبر القناع: <code>resit[resit &gt; 80] = 80</code>." },
        { en: "Print the original as well as the copy, to prove the record did not move.", ar: "اطبع الأصل مع النسخة لتُثبت أن السجلّ لم يتحرّك." },
        { en: "Keep both: the raw record for the archive and the capped list for the resit.", ar: "أبقِ الاثنين: السجلّ الخام للحفظ والقائمة المحصورة للإعادة." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 1 is the one that does the work, and it is a question about your intention rather than about NumPy: the rule \"<code>.copy()</code> when I mean to modify, plain slice when I mean to read\" is cheap to follow and covers every case in this chapter. Step 4 is not ceremony. A view bug produces no error and no obviously wrong value in the copy &mdash; the only visible symptom is in the array you were not looking at, so looking at it is the test.",
                 ar: "الخطوة 1 هي التي تؤدي العمل، وهي سؤالٌ عن نيّتك لا عن نمباي: فقاعدة «<code>.copy()</code> حين أقصد التعديل، وقطعةٌ مجردة حين أقصد القراءة» رخيصةُ الاتباع وتغطي كل حالة في هذا الفصل. والخطوة 4 ليست طقسًا. فعيبُ النافذة لا يُنتج خطأً ولا قيمةً خاطئة بيّنة في النسخة &mdash; والعَرَضُ الظاهر الوحيد في المصفوفة التي لم تكن تنظر إليها، فالنظرُ إليها هو الفحص." }
    },
    {
      id: "c3b12", type: "tf", level: "hard", topics: ["copy-rules", "mask"],
      q: { en: "Writing <code>chosen = marks[marks &gt; 60].copy()</code> is a sensible precaution: without <code>.copy()</code> you might modify <code>marks</code> by accident.",
           ar: "كتابةُ <code>chosen = marks[marks &gt; 60].copy()</code> احتياطٌ معقول: فبدون <code>.copy()</code> قد تعدّل <code>marks</code> بالخطأ." },
      truth: false,
      explain: { en: "The <code>.copy()</code> is redundant: a mask already gives a copy, because the positions it selects need not be evenly spaced and so cannot be described as a window. Writing it anyway is harmless but misleading &mdash; a reader who sees <code>.copy()</code> here will reasonably conclude that masks return views, and then leave it off somewhere it was genuinely needed. Know the rule rather than sprinkling the method: only a <strong>slice</strong> gives a view.",
                 ar: "الـ <code>.copy()</code> زائدة: فالقناعُ يعطي نسخة أصلًا، لأن المواضع التي يختارها لا يلزم أن تكون متباعدة بانتظام فلا يمكن وصفها نافذة. وكتابتها مع ذلك غير ضارّة لكنها مُضلّلة &mdash; فالقارئُ الذي يرى <code>.copy()</code> هنا سيستنتج بوجهٍ معقول أن الأقنعة تُعيد نوافذ، ثم يتركها حيث كانت لازمة فعلًا. اعرف القاعدة بدل رشّ الدالة: فالـ<strong>قطعة</strong> وحدها تعطي نافذة." }
    },
    {
      id: "c3b13", type: "output", level: "hard", topics: ["view-copy", "mask", "index-2d"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "m = np.array([[40, 55, 70],\n              [60, 65, 90]])\n\ncol = m[:, 1]\ncol[col < 60] = 60\n\nprint(m)",
      blanks: [{ accept: ["[[40 60 70]\n [60 65 90]]"], lines: 2 }],
      explain: { en: "A column is a view, and a mask on the left of <code>=</code> writes rather than selects, so the floor was applied in place to one subject of the real table. This is the correct and idiomatic way to moderate a single subject &mdash; and it is identical in form to the accident in which you thought you were working on a copy. The form does not tell you which it is; only your intention does, which is why the intention belongs in the code as <code>.copy()</code> or its absence.",
                 ar: "العمودُ نافذة، والقناعُ يسار <code>=</code> يكتب لا يختار، فطُبّق الحدُّ الأدنى في مكانه على مادةٍ واحدة من الجدول الحقيقي. وهذه هي الطريقة الصحيحة الاصطلاحية لتعديل مادةٍ واحدة &mdash; وهي مطابقةُ الصورة للحادث الذي ظننت فيه أنك تعمل على نسخة. والصورةُ لا تخبرك أيّهما؛ ونيّتُك وحدها تخبر، ولذلك كانت النية في الشفرة بـ <code>.copy()</code> أو بغيابها." }
    },
    {
      id: "c3b14", type: "trace", level: "hard", topics: ["keepdims", "axis", "broadcast-shapes"],
      q: { en: "State the shape at each point.", ar: "حدّد الشكل عند كل موضع." },
      code: "t = np.arange(12).reshape(3, 4)\n\nr = t.mean(axis=1, keepdims=True)\nc = t.mean(axis=0)\nd = t - r\ne = t - c",
      blanks: [
        { accept: ["(3, 1)", "(3,1)"], label: { en: "<code>r.shape</code>", ar: "<code>r.shape</code>" } },
        { accept: ["(4,)", "(4, )"], label: { en: "<code>c.shape</code>", ar: "<code>c.shape</code>" } },
        { accept: ["(3, 4)", "(3,4)"], label: { en: "<code>d.shape</code>", ar: "<code>d.shape</code>" } },
        { accept: ["(3, 4)", "(3,4)"], label: { en: "<code>e.shape</code>", ar: "<code>e.shape</code>" } }
      ],
      explain: { en: "Both subtractions give the table's shape back and both are correct &mdash; of different things. <code>d</code> centres each row on its own mean, because <code>(3, 1)</code> stretches across the columns; <code>e</code> centres each column, because <code>(4,)</code> right-aligns with the columns and is reused down the rows. The pair is worth holding together: on a non-square table the two cannot be confused, since <code>t - c</code> with <code>c</code> of shape <code>(3,)</code> would raise. <code>keepdims=True</code> is how you get that same protection when the table <em>is</em> square.",
                 ar: "كلتا الطرحتين تُعيد شكل الجدول وكلتاهما صحيحة &mdash; لأشياء مختلفة. فـ <code>d</code> يُمركز كل صفّ على متوسطه، لأن <code>(3, 1)</code> تتمدّد على الأعمدة؛ و<code>e</code> يُمركز كل عمود، لأن <code>(4,)</code> تُحاذي الأعمدة يمينًا وتُعاد في الصفوف. والزوجُ جديرٌ بأن يُحفظ معًا: فعلى جدول غير مربّع لا يلتبسان، إذ <code>t - c</code> بـ <code>c</code> من الشكل <code>(3,)</code> سترفع خطأً. و<code>keepdims=True</code> هي كيف تنال الحمايةَ نفسها حين <em>يكون</em> الجدول مربّعًا." }
    },
    {
      id: "c3b15", type: "compare", level: "hard", topics: ["where", "view-copy"],
      q: { en: "The same cap, applied to a slice of the record. What is the difference?",
           ar: "الحدُّ نفسه مطبَّقًا على قطعة من السجلّ. فما الفرق؟" },
      codeA: "marks = np.array([40, 55, 70, 85, 100])\n\npart = marks[1:4]\npart = np.where(part > 60, 60, part)\n\nprint(marks)\nprint(part)",
      codeB: "marks = np.array([40, 55, 70, 85, 100])\n\npart = marks[1:4]\npart[part > 60] = 60\n\nprint(marks)\nprint(part)",
      options: [
        { en: "<code>part</code> prints <code>[55 60 60]</code> in both, but <code>marks</code> is untouched in A and changed in B. <code>np.where</code> returns a new array and the assignment points the name <code>part</code> at it, dropping the view; the mask assignment writes through the view into <code>marks</code>.",
          ar: "<code>part</code> تطبع <code>[55 60 60]</code> في كليهما، لكن <code>marks</code> بلا مساس في A ومتغيّرة في B. فـ <code>np.where</code> تُعيد مصفوفة جديدة ويوجّه الإسناد الاسم <code>part</code> إليها فتُسقط النافذة؛ وإسنادُ القناع يكتب عبر النافذة في <code>marks</code>." },
        { en: "Both leave <code>marks</code> untouched, because <code>part</code> was reassigned in each case.",
          ar: "كلاهما يترك <code>marks</code> بلا مساس، لأن <code>part</code> أُعيد إسنادها في الحالتين." },
        { en: "Both change <code>marks</code>, because <code>part</code> is a view in each case.",
          ar: "كلاهما يغيّر <code>marks</code>، لأن <code>part</code> نافذة في الحالتين." },
        { en: "A raises, because <code>np.where</code> cannot be used on a view.",
          ar: "A يرفع خطأً، لأن <code>np.where</code> لا تُستعمل على نافذة." }
      ],
      answer: 0,
      explain: { en: "Both are views to begin with, so the answer that says both change <code>marks</code> is half right, and that is what makes it dangerous: being a view only matters if something writes <em>through</em> it. In A nothing does &mdash; <code>np.where</code> is an expression that produces a new array, and <code>part = ...</code> just moves the name. In B the mask sits on the left of the <code>=</code>, which is an instruction about where to write. Same two arrays, same printed slice, and one of them has quietly edited the class record.",
                 ar: "كلاهما نافذة في البدء، فالجوابُ القائل إن كليهما يغيّر <code>marks</code> نصفُ صحيح وذلك ما يجعله خطِرًا: فكونُ الشيء نافذةً لا يهم إلا إن كتب شيءٌ <em>عبرها</em>. وفي A لا يكتب شيء &mdash; فـ <code>np.where</code> تعبيرٌ يُنتج مصفوفة جديدة، و<code>part = ...</code> تنقل الاسم فقط. وفي B يقع القناع يسار <code>=</code> وهو تعليمٌ عن أين يُكتب. المصفوفتان نفسهما والقطعةُ المطبوعة نفسها، وأحدهما حرّر سجلّ الصفّ بصمت." }
    },
    {
      id: "c3b16", type: "mcq", level: "hard", topics: ["dtype", "array-vs-list"],
      q: { en: "Why is one fixed type for the whole array the <em>price</em> of NumPy's speed rather than an arbitrary restriction?",
           ar: "لماذا كان نوعٌ واحد ثابت للمصفوفة كلها <em>ثمنَ</em> سرعة نمباي لا قيدًا اعتباطيًّا؟" },
      options: [
        { en: "Because the values can then sit in one unbroken block of memory, all the same size, so the machine can compute on the block without inspecting each item to find out what it is.",
          ar: "لأن القيم تستطيع حينئذ أن تقع في كتلة ذاكرة واحدة متصلة بالحجم نفسه، فيستطيع الحاسوب أن يحسب على الكتلة بلا فحص كل عنصر ليعرف ما هو." },
        { en: "Because converting between types is slow, so NumPy avoids doing it at all.",
          ar: "لأن التحويل بين الأنواع بطيء، فتتحاشى نمباي فعله إطلاقًا." },
        { en: "Because a list of mixed types cannot be sorted.",
          ar: "لأن قائمةً مختلطة الأنواع لا يمكن ترتيبها." },
        { en: "Because Python's integers are slower than its floats.",
          ar: "لأن أعداد بايثون الصحيحة أبطأ من عشرياتها." }
      ],
      answer: 0,
      explain: { en: "A Python list holds references to objects that each carry their own type, so a loop over it asks \"what is this?\" a million times and follows a million pointers. An array is one block, one type, one known size per element &mdash; which is what lets the arithmetic happen in the loops inside NumPy rather than in your Python. Every surprise in Lesson 10 is the invoice for that: the silent truncation when you write 9.7 into an integer array, and the promotion of the whole array when one value is a decimal.",
                 ar: "قائمةُ بايثون تحمل إشاراتٍ إلى كائنات يحمل كلٌّ منها نوعه، فالحلقةُ عليها تسأل «ما هذا؟» مليون مرة وتتبع مليون مؤشّر. والمصفوفةُ كتلةٌ واحدة ونوعٌ واحد وحجمٌ معلوم لكل عنصر &mdash; وهو ما يُتيح للحساب أن يحدث في حلقات داخل نمباي لا في بايثون عندك. وكلُّ مفاجأة في الدرس 10 فاتورةُ ذلك: الابتارُ الصامت حين تكتب 9.7 في مصفوفة صحيحة، وترقيةُ المصفوفة كلها حين تكون قيمةٌ واحدة عشرية." }
    },
    {
      id: "c3b17", type: "fill", level: "hard", topics: ["keepdims", "axis", "newaxis"],
      q: { en: "Centre every student on their own average, without an ambiguous shape ever existing. Fill the three blanks.",
           ar: "مركِز كل طالب على متوسطه دون أن يوجد شكلٌ ملتبس أصلًا. أكمل الفراغات الثلاثة." },
      code: "marks = np.array([[40., 55., 70.],\n                  [60., 65., 90.],\n                  [80., 75., 50.]])\n\nstudent_mean = marks.mean(axis=____1____, keepdims=____2____)\n\nprint(student_mean.shape)        # ____3____\nprint((marks - student_mean)[0]) # [-15.   0.  15.]",
      blanks: [
        { accept: ["1"], label: { en: "the axis", ar: "المحور" } },
        { accept: ["True"], label: { en: "keepdims", ar: "keepdims" } },
        { accept: ["(3, 1)", "(3,1)"], label: { en: "the shape", ar: "الشكل" } }
      ],
      explain: { en: "Axis 1 is the columns, so naming it collapses the subjects and leaves one number per student &mdash; and <code>keepdims=True</code> keeps that collapsed dimension in place as a 1, so the shape is <code>(3, 1)</code> and still says which direction it came from. Check the printed row: &minus;15, 0, +15 for marks of 40, 55 and 70 around an average of 55. That is a student compared with themselves, which is the thing the whole chapter has been building towards getting right.",
                 ar: "المحور 1 هو الأعمدة، فتسميتُه تَطبِق المواد وتُبقي عددًا لكل طالب &mdash; و<code>keepdims=True</code> تُبقي ذلك البُعد المطبوق مكانه كـ 1، فيكون الشكل <code>(3, 1)</code> ويظل يقول من أي اتجاه جاء. وافحص الصفّ المطبوع: &minus;15 و0 و+15 لعلامات 40 و55 و70 حول متوسط 55. وذلك طالبٌ قُورن بنفسه، وهو ما كان الفصلُ كله يبني نحو إصابته." }
    },
    {
      id: "c3b18", type: "multi", level: "hard", topics: ["mask-and-or", "where", "nan-array", "mask-rows"],
      q: { en: "Select <strong>every</strong> statement that is true.", ar: "اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "The brackets in <code>(a &gt; 50) &amp; (a &lt; 90)</code> are required, because <code>&amp;</code> binds more tightly than <code>&gt;</code>.", ar: "الأقواس في <code>(a &gt; 50) &amp; (a &lt; 90)</code> لازمة، لأن <code>&amp;</code> أقوى ارتباطًا من <code>&gt;</code>." },
        { en: "<code>np.where(mask, x, y)</code> can take a single number for <code>x</code> and an array for <code>y</code>, because its arguments broadcast.", ar: "<code>np.where(mask, x, y)</code> تقبل عددًا مفردًا لـ <code>x</code> ومصفوفةً لـ <code>y</code>، لأن وسائطها تُبثّ." },
        { en: "Indexing a table with a row mask returns whole rows, so the result is still two-dimensional.", ar: "فهرسةُ جدولٍ بقناع صفوف تُعيد صفوفًا كاملة، فتبقى النتيجةُ ذات بُعدين." },
        { en: "<code>and</code> works between two masks as long as both have the same shape.", ar: "<code>and</code> تعمل بين قناعين ما دام شكلهما واحدًا." },
        { en: "<code>np.nanmean</code> on a column that is entirely missing returns 0.", ar: "<code>np.nanmean</code> على عمودٍ مفقود كلّه تُعيد 0." }
      ],
      answer: [0, 1, 2],
      explain: { en: "The fourth fails for every shape, including identical ones: <code>and</code> needs one true-or-false answer from the whole left-hand side so it can decide whether to look at the right, and an array of answers is neither &mdash; the shapes have nothing to do with it. The fifth is a reasonable guess and wrong in a useful way: averaging nothing is not zero, so NumPy returns <code>nan</code> with a warning. Zero would be a number you could plot, and it would be a lie.",
                 ar: "الرابعة تفشل بكل شكل، حتى المتطابق: فـ <code>and</code> تحتاج جوابًا واحدًا صادقًا أو كاذبًا من الطرف الأيسر كله لتقرّر هل تنظر إلى الأيمن، ومصفوفةُ أجوبةٍ ليست كذلك &mdash; ولا شأن للأشكال بالأمر. والخامسة تخمينٌ معقول وخاطئ بوجهٍ مفيد: فمتوسط اللاشيء ليس صفرًا، فتُعيد نمباي <code>nan</code> مع تحذير. والصفرُ عددٌ تستطيع رسمه، وسيكون كذبًا." }
    },
    {
      id: "c3b19", type: "output", level: "hard", topics: ["dtype", "elementwise"],
      q: { en: "Write the three lines this prints.", ar: "اكتب الأسطر الثلاثة التي يطبعها." },
      code: "counts = np.array([2, 4, 6])\n\nprint(counts.mean(), counts.sum())\nprint(counts.dtype)\nprint((counts / counts.sum()).round(2))",
      blanks: [{ accept: ["4.0 12\nint64\n[0.17 0.33 0.5 ]"], lines: 3 }],
      explain: { en: "An integer array keeps its type through <code>sum</code>, because a sum of integers is an integer &mdash; but <code>mean</code> prints <code>4.0</code>, not <code>4</code>, because an average cannot promise to be whole and NumPy does not pretend otherwise. Division always produces floats for the same reason. Worth noticing in the third line: <code>.round(2)</code> changes the <em>values</em> in the new array, not the display, and 0.5 prints as <code>0.5</code> with a trailing space in the brackets because every element is padded to the same width.",
                 ar: "المصفوفةُ الصحيحة تُبقي نوعها عبر <code>sum</code>، لأن مجموع الصحاح صحيح &mdash; لكن <code>mean</code> تطبع <code>4.0</code> لا <code>4</code>، لأن المتوسط لا يستطيع أن يَعِد بأنه صحيح ولا تتظاهر نمباي بغير ذلك. والقسمةُ تُنتج عشريات دائمًا للسبب نفسه. وجديرٌ بالملاحظة في السطر الثالث: <code>.round(2)</code> تغيّر <em>القيم</em> في المصفوفة الجديدة لا العرض، و0.5 تُطبع <code>0.5</code> بفراغ لاحق في القوسين لأن كل عنصر يُحشى إلى العرض نفسه." }
    },
    {
      id: "c3b20", type: "complete", level: "hard", topics: ["axis", "mask"],
      q: { en: "How many students failed <strong>each subject</strong>? Which line?",
           ar: "كم طالبًا رسب في <strong>كل مادة</strong>؟ فأي سطر؟" },
      code: "marks = np.array([[40., 55., 70.],\n                  [60., 65., 90.],\n                  [80., 75., 50.]])\n\n# which line?\n\nprint(fails)   # [1 1 1]",
      options: [
        { code: "fails = (marks < 60).sum(axis=0)" },
        { code: "fails = (marks < 60).sum(axis=1)" },
        { code: "fails = (marks < 60).sum()" },
        { code: "fails = marks[marks < 60].sum()" }
      ],
      answer: 0,
      explain: { en: "Two steps that have to be right in sequence: the comparison gives a <code>(3, 3)</code> mask, and the axis names which direction to count in. One number per subject means the columns must survive, so the rows are collapsed: axis 0. The <code>axis=1</code> version counts per student, <code>[2 0 1]</code> &mdash; three numbers again, so a square table will not tell you which you got. The fourth is the one worth looking at twice: it adds up the failing <em>marks</em> rather than counting them, giving 145.0, and on a table where every mark is below 60 it would be enormous rather than equal to the size of the table.",
                 ar: "خطوتان يجب أن تصحّا بالتتابع: فالمقارنةُ تعطي قناعًا <code>(3, 3)</code>، والمحورُ يسمّي في أي اتجاه يُعدّ. وعددٌ لكل مادة يعني أن الأعمدة يجب أن تبقى، فتُطبَق الصفوف: المحور 0. ونسخةُ <code>axis=1</code> تعدّ لكل طالب <code>[2 0 1]</code> &mdash; ثلاثة أعداد أيضًا، فلن يخبرك جدولٌ مربّع أيّهما حصلت. والرابع جديرٌ بنظرة ثانية: فهو يجمع <em>العلامات</em> الراسبة لا يعدّها فيعطي 145.0، وعلى جدولٍ كل علامةٍ فيه تحت 60 سيكون هائلًا لا مساويًا لحجم الجدول." }
    }
  ]
};
