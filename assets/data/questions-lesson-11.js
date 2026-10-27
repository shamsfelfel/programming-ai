/* ============================================================
   Lesson 11 (Lecture 13) — indexing, slicing, views vs copies.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-11"] = {
  title: { en: "Lesson 11 Test — Views and Copies", ar: "اختبار الدرس 11 — النوافذ والنسخ" },
  intro: {
    en: "Twelve questions on Lesson 11 only. Half of them turn on one sentence: slicing a list copies, slicing an array does not. The syntax is identical and nothing errors either way, so the only defence is knowing the rule.",
    ar: "اثنا عشر سؤالًا على الدرس 11 وحده. ونصفها يدور على جملة واحدة: تقطيعُ القائمة ينسخ، وتقطيعُ المصفوفة لا. والصيغة متطابقة ولا شيء يُخطئ في الحالتين، فالدفاع الوحيد معرفةُ القاعدة."
  },
  questions: [
    {
      id: "t11q1", type: "output", level: "easy", topics: ["view-copy"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nmarks = np.array([40, 55, 70, 85, 100])\npart = marks[1:4]\npart[0] = 99\n\nprint(part)\nprint(marks)",
      blanks: [{ accept: ["[99 70 85]\n[ 40  99  70  85 100]"], lines: 2 }],
      explain: { en: "Nothing in the program assigns to <code>marks</code>, and <code>marks</code> changed. A slice of an array is a <strong>view</strong>: a second array object pointing into the same memory, starting one place along. Position 0 of the view and position 1 of the original are the same place, so writing through either is visible through both.",
                 ar: "لا شيء في البرنامج يُسنِد إلى <code>marks</code>، وتغيّرت <code>marks</code>. فقطعةُ المصفوفة <strong>نافذة</strong>: كائنُ مصفوفة ثانٍ يشير إلى الذاكرة نفسها، بادئًا بموضع واحد. والموضع 0 من النافذة والموضع 1 من الأصل هما الموضع نفسه، فالكتابةُ عبر أيٍّ منهما تُرى عبر كليهما." }
    },
    {
      id: "t11q2", type: "output", level: "easy", topics: ["view-copy"],
      q: { en: "Exactly the same program, with a list instead of an array. Write the two lines.",
           ar: "البرنامج نفسه تمامًا بقائمة بدل المصفوفة. اكتب السطرين." },
      code: "marks = [40, 55, 70, 85, 100]\npart = marks[1:4]\npart[0] = 99\n\nprint(part)\nprint(marks)",
      blanks: [{ accept: ["[99, 70, 85]\n[40, 55, 70, 85, 100]"], lines: 2 }],
      explain: { en: "The list is untouched, because slicing a list copies the chosen items into a new list. Identical syntax to the previous question, opposite behaviour, no error either way. That is precisely why the array version is so easy to write by accident &mdash; you are doing the thing you have always done.",
                 ar: "القائمةُ بلا مساس، لأن تقطيع القائمة ينسخ العناصر المختارة إلى قائمة جديدة. صيغةٌ متطابقة مع السؤال السابق وسلوكٌ متعاكس، ولا خطأ في الحالتين. ولذلك بالضبط تسهل كتابة نسخة المصفوفة بالصدفة &mdash; فأنت تفعل ما فعلته دائمًا." }
    },
    {
      id: "t11q3", type: "fill", level: "easy", topics: ["index-2d"],
      q: { en: "Fill the three expressions for this table.", ar: "أكمل التعابير الثلاثة لهذا الجدول." },
      code: "m = np.array([[40, 55, 70],\n              [60, 65, 90],\n              [80, 75, 50]])\n\nprint(____1____)   # 90\nprint(____2____)   # [40 55 70]\nprint(____3____)   # [55 65 75]",
      blanks: [
        { accept: ["m[1, 2]", "m[1][2]"], label: { en: "one value", ar: "قيمة واحدة" } },
        { accept: ["m[0]", "m[0, :]"], label: { en: "the first row", ar: "الصفّ الأول" } },
        { accept: ["m[:, 1]"], label: { en: "the middle column", ar: "العمود الأوسط" } }
      ],
      explain: { en: "<code>m[row, column]</code>, counting from zero in both directions. The third is the form people forget and need most: the colon means \"every row\", so <code>m[:, 1]</code> is a whole column &mdash; one subject across all students. <code>m[1][2]</code> also works for a single value but it indexes twice, building a temporary row first, so <code>m[1, 2]</code> is the form to learn.",
                 ar: "<code>m[الصف، العمود]</code>، بالعدّ من صفر في الاتجاهين. والثالث هو الصيغة التي ينساها الناس ويحتاجونها أكثر: فالنقطتان تعنيان «كل الصفوف»، فـ <code>m[:, 1]</code> عمودٌ كامل &mdash; مادةٌ واحدة لكل الطلبة. و<code>m[1][2]</code> تعمل لقيمة واحدة أيضًا لكنها تفهرس مرتين فتبني صفًّا مؤقتًا أولًا، فـ <code>m[1, 2]</code> هي الصيغة التي تتعلّمها." }
    },
    {
      id: "t11q4", type: "tf", level: "easy", topics: ["copy-rules"],
      q: { en: "<code>a[a &gt; 60]</code> gives you an array you can modify without changing <code>a</code>.",
           ar: "<code>a[a &gt; 60]</code> تعطيك مصفوفة تستطيع تعديلها دون تغيير <code>a</code>." },
      truth: true,
      explain: { en: "A mask selects elements that are not evenly spaced, so there is no \"start, step, stop\" window to describe &mdash; NumPy has to copy. The same is true of a list of positions like <code>a[[0, 2, 4]]</code>. Only a slice gives a view. Note the mirror case: a mask on the <em>left</em> of <code>=</code>, as in <code>a[a &gt; 80] = 80</code>, does change <code>a</code>, because that is telling NumPy where to write rather than asking for a selection.",
                 ar: "القناعُ يختار عناصر غير متباعدة بانتظام، فلا نافذة «بداية وخطوة ونهاية» توصَف &mdash; فعلى نمباي أن تنسخ. والأمر نفسه في قائمة مواضع مثل <code>a[[0, 2, 4]]</code>. والقطعةُ وحدها تعطي نافذة. ولاحظ الحالة المقابلة: فالقناع <em>يسار</em> <code>=</code> كما في <code>a[a &gt; 80] = 80</code> يغيّر <code>a</code> فعلًا، لأن ذلك إخبارٌ لنمباي أين تكتب لا طلبُ اختيار." }
    },
    {
      id: "t11q5", type: "output", level: "medium", topics: ["copy-rules"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "a = np.array([10, 20, 30, 40, 50])\n\npicked = a[[0, 2, 4]]\npicked[0] = -1\nprint(a)\n\nwindow = a[0:5:2]\nwindow[0] = -1\nprint(a)",
      blanks: [{ accept: ["[10 20 30 40 50]\n[-1 20 30 40 50]"], lines: 2 }],
      explain: { en: "The two selections contain exactly the same three elements and behave oppositely. <code>a[[0, 2, 4]]</code> is a list of positions, so NumPy copies and <code>a</code> is untouched. <code>a[0:5:2]</code> is a slice with a step, which <em>can</em> be described as \"start at 0, step 2, stop at 5\", so it is a view and writing through it changes <code>a</code>. The rule is mechanical: if the selection is describable as start/step/stop it is a window, otherwise it is a copy &mdash; and NumPy will not inspect your list of positions case by case to find out whether it happens to be regular.",
                 ar: "الاختياران يحويان العناصر الثلاثة نفسها بالضبط ويتصرفان متعاكسين. فـ <code>a[[0, 2, 4]]</code> قائمةُ مواضع، فتنسخ نمباي و<code>a</code> بلا مساس. و<code>a[0:5:2]</code> قطعةٌ بخطوة، <em>يمكن</em> وصفها بـ«ابدأ من 0 بخطوة 2 وتوقف عند 5»، فهي نافذة والكتابةُ عبرها تغيّر <code>a</code>. والقاعدة آلية: فإن أمكن وصف الاختيار بداية/خطوة/نهاية فهو نافذة، وإلا فنسخة &mdash; ولن تفحص نمباي قائمة مواضعك حالةً حالةً لتعرف هل هي منتظمة اتفاقًا." }
    },
    {
      id: "t11q6", type: "error", level: "medium", topics: ["view-copy"],
      q: { en: "This is meant to cap the resit marks without touching the class record. Click the line that lets the edit escape.",
           ar: "يُفترض أن يحصر هذا علاماتِ الإعادة دون مسّ سجلّ الصفّ. انقر السطر الذي يدع التعديل يفلت." },
      code: "marks = np.array([40, 55, 70, 85, 100])\n\nresit = marks[1:4]\nresit[resit > 60] = 60\n\nprint(\"resit:\", resit)\nprint(\"class:\", marks)",
      answer: 3,
      explain: { en: "Line 3 takes a view, so line 4 writes into the class record. Adding one word fixes it: <code>marks[1:4].copy()</code>. The habit worth forming is to write <code>.copy()</code> the moment you intend to <em>modify</em> a slice, and to leave it off when you only intend to read &mdash; which is most of the time, and is where the speed comes from.",
                 ar: "السطر 3 يأخذ نافذة، فيكتب السطر 4 في سجلّ الصفّ. وإضافةُ كلمة واحدة تصلحه: <code>marks[1:4].copy()</code>. والعادة الجديرة بالتكوين أن تكتب <code>.copy()</code> لحظةَ تنوي <em>تعديل</em> قطعة، وأن تتركها حين تنوي القراءة فقط &mdash; وهو أكثر الوقت، ومنه تأتي السرعة." },
      solution: { code: "resit = marks[1:4].copy()" }
    },
    {
      id: "t11q7", type: "trace", level: "medium", topics: ["view-copy", "index-2d"],
      q: { en: "Trace the table. What does each hold at the end?",
           ar: "تتبّع الجدول. ماذا يحمل كلٌّ في النهاية؟" },
      code: "m = np.array([[40, 55, 70],\n              [60, 65, 90],\n              [80, 75, 50]])\n\ncol = m[:, 0]\ncol += 5",
      blanks: [
        { accept: ["[45 65 85]"], label: { en: "<code>col</code>", ar: "<code>col</code>" } },
        { accept: ["45"], label: { en: "<code>m[0, 0]</code>", ar: "<code>m[0, 0]</code>" } },
        { accept: ["55"], label: { en: "<code>m[0, 1]</code>", ar: "<code>m[0, 1]</code>" } }
      ],
      explain: { en: "A column is a view too, so <code>col += 5</code> writes straight into the first column of the real table &mdash; which is exactly how you moderate one subject in place, and exactly how you ruin a table by accident. The third answer is the check that matters: the other columns did not move, because the view covered only one of them.",
                 ar: "العمودُ نافذة أيضًا، فـ <code>col += 5</code> تكتب مباشرة في العمود الأول من الجدول الحقيقي &mdash; وذلك بالضبط كيف تعدّل مادة واحدة في مكانها، وبالضبط كيف تُفسد جدولًا بالصدفة. والجواب الثالث هو الفحص المهم: فالأعمدة الأخرى لم تتحرك، لأن النافذة غطّت واحدًا منها فقط." }
    },
    {
      id: "t11q8", type: "match", level: "medium", topics: ["copy-rules", "index-2d"],
      q: { en: "Match each expression to what it gives back.", ar: "وصّل كل تعبير بما يُعيده." },
      leftHead: { en: "Written as", ar: "يُكتب هكذا" },
      rightHead: { en: "Gives", ar: "يعطي" },
      pairs: [
        { l: { code: "a[1:4]" }, r: { en: "A view &mdash; writing to it writes to the original.", ar: "نافذة &mdash; الكتابة فيها تكتب في الأصل." } },
        { l: { code: "a[[0, 2, 4]]" }, r: { en: "A copy &mdash; the positions need not be evenly spaced.", ar: "نسخة &mdash; فالمواضع لا يلزم أن تكون متباعدة بانتظام." } },
        { l: { code: "a[a > 60]" }, r: { en: "A copy, for the same reason: a mask picks arbitrary positions.", ar: "نسخة للسبب نفسه: فالقناع ينتقي مواضع اعتباطية." } },
        { l: { code: "a[a > 60] = 60" }, r: { en: "Not a selection at all &mdash; it writes into the original.", ar: "ليس اختيارًا إطلاقًا &mdash; بل يكتب في الأصل." } }
      ],
      explain: { en: "The last row is the one that catches people, because the mask looks the same as in the row above it. The difference is which side of the <code>=</code> it is on: on the right it is a question and the answer is a copy; on the left it is an instruction about where to write.",
                 ar: "الصفّ الأخير هو الذي يُوقع الناس، لأن القناع يبدو كما في الصفّ فوقه. والفرق أي جانبَي <code>=</code> هو عليه: فعلى اليمين سؤالٌ وجوابه نسخة؛ وعلى اليسار أمرٌ بأين تكتب." }
    },
    {
      id: "t11q9", type: "complete", level: "medium", topics: ["view-copy"],
      q: { en: "Cap the middle three marks at 60 and leave the class untouched. Which line?",
           ar: "احصر العلامات الثلاث الوسطى عند 60 واترك الصفَّ بلا مساس. فأي سطر؟" },
      code: "marks = np.array([40, 55, 70, 85, 100])\n\n# which line?\nresit[resit > 60] = 60\n\nprint(marks)   # must still be [ 40  55  70  85 100]",
      options: [
        { code: "resit = marks[1:4].copy()" },
        { code: "resit = marks[1:4]" },
        { code: "resit = np.array(marks[1:4])" },
        { code: "resit = marks[1:4][:]" }
      ],
      answer: 0,
      explain: { en: "<code>.copy()</code> says what it means. The <code>np.array(...)</code> version also works &mdash; <code>np.array(...)</code> of an existing array copies by default &mdash; but it reads as a conversion rather than a copy, so a reader cannot tell whether the copying was the point or an accident. The fourth is the trap: slicing a view gives another view, so <code>[:]</code> adds nothing at all here, even though on a Python list that idiom <em>is</em> how you copy.",
                 ar: "<code>.copy()</code> تقول ما تعنيه. ونسخةُ <code>np.array(...)</code> تعمل أيضًا &mdash; فـ <code>np.array(...)</code> لمصفوفة قائمة تنسخ افتراضيًا &mdash; لكنه يُقرأ تحويلًا لا نسخًا، فلا يستطيع القارئ معرفة هل كان النسخ مقصودًا أم مصادفة. والرابع هو الفخ: فتقطيعُ نافذة يعطي نافذة أخرى، فـ <code>[:]</code> لا تضيف شيئًا هنا إطلاقًا، مع أن تلك الصيغة على قائمة بايثون <em>هي</em> كيف تنسخ." }
    },
    {
      id: "t11q10", type: "compare", level: "hard", topics: ["view-copy"],
      q: { en: "Two lines that differ by one character. What is the difference in effect?",
           ar: "سطران يختلفان بمحرف واحد. فما الفرق في الأثر؟" },
      codeA: "m = np.array([[40, 55, 70],\n              [60, 65, 90]])\n\ncol = m[:, 0]\ncol += 10\n\nprint(m)",
      codeB: "m = np.array([[40, 55, 70],\n              [60, 65, 90]])\n\ncol = m[:, 0]\ncol = col + 10\n\nprint(m)",
      options: [
        { en: "A changes the table; B does not. <code>+=</code> writes through the view into the original, while <code>col + 10</code> builds a new array and rebinds the name <code>col</code> to it, leaving the view &mdash; and the table &mdash; untouched.",
          ar: "أ تغيّر الجدول؛ وب لا. فـ <code>+=</code> تكتب عبر النافذة في الأصل، بينما <code>col + 10</code> تبني مصفوفة جديدة وتعيد ربط الاسم <code>col</code> بها، تاركةً النافذة &mdash; والجدول &mdash; بلا مساس." },
        { en: "They are identical; <code>+=</code> is only shorthand.",
          ar: "متطابقان؛ و<code>+=</code> اختصار فقط." },
        { en: "B changes the table and A does not.",
          ar: "ب تغيّر الجدول وأ لا." },
        { en: "Both change the table, because <code>col</code> is a view in each case.",
          ar: "كلتاهما تغيّر الجدول، لأن <code>col</code> نافذة في الحالتين." }
      ],
      answer: 0,
      explain: { en: "For ordinary Python numbers <code>x += 1</code> and <code>x = x + 1</code> really are the same, which is why this catches people. For an array they are not: <code>+=</code> asks the array to change itself in place, and an in-place change to a view is a change to the thing it looks into. <code>col + 10</code> is a plain expression that produces a new array, and the assignment then points the <em>name</em> at it &mdash; the view is simply dropped. Neither raises, so the only difference you will ever see is whether the table moved.",
                 ar: "مع أعداد بايثون العادية تتطابق <code>x += 1</code> و<code>x = x + 1</code> فعلًا، ولهذا يُوقع هذا الناس. ومع المصفوفة لا تتطابقان: فـ <code>+=</code> تطلب من المصفوفة أن تغيّر نفسها في مكانها، والتغييرُ في مكانه لنافذةٍ تغييرٌ لما تطلّ عليه. و<code>col + 10</code> تعبيرٌ عادي يُنتج مصفوفة جديدة، ثم يوجّه الإسنادُ <em>الاسمَ</em> إليها &mdash; فتُترك النافذة ببساطة. ولا يرفع أيٌّ منهما خطأً، فالفرق الوحيد الذي ستراه أبدًا هو هل تحرّك الجدول." }
    },
    {
      id: "t11q11", type: "mcq", level: "hard", topics: ["view-copy"],
      q: { en: "Why does NumPy return views rather than copies, given how easy the resulting bug is to write?",
           ar: "لماذا تُعيد نمباي نوافذ لا نسخًا، مع سهولة كتابة الخلل الناتج؟" },
      options: [
        { en: "Because copying is proportional to the data: a million-row table sliced a hundred times would copy a hundred million numbers, usually only to read them. A view costs nothing regardless of size.",
          ar: "لأن النسخ يتناسب مع البيانات: فجدولٌ بمليون صفّ مقطَّعٌ مئة مرة سينسخ مئة مليون عدد، لقراءتها فقط عادةً. والنافذةُ لا تكلّف شيئًا أيًّا كان الحجم." },
        { en: "Because views use less memory per element than copies do.",
          ar: "لأن النوافذ تستهلك ذاكرة لكل عنصر أقل من النسخ." },
        { en: "Because Python does not provide a way to copy an array.",
          ar: "لأن بايثون لا توفّر طريقة لنسخ مصفوفة." },
        { en: "It is a historical accident that newer versions are moving away from.",
          ar: "إنه مصادفة تاريخية تبتعد عنها الإصدارات الأحدث." }
      ],
      answer: 0,
      explain: { en: "The trade is deliberate and it is the right one for the common case, which is reading. The answer about memory per element confuses two things: a view stores <em>no</em> elements at all, just a pointer and a description of the stride &mdash; the saving is the whole copy, not a per-element saving. Knowing why the default exists is what turns \"<code>.copy()</code> when I intend to modify\" from a rule you memorise into one you can derive.",
                 ar: "المقايضةُ متعمَّدة وهي الصحيحة للحالة الشائعة وهي القراءة. والجوابُ عن الذاكرة لكل عنصر يخلط أمرين: فالنافذة لا تخزّن عناصر <em>إطلاقًا</em>، بل مؤشرًا ووصفًا للخطوة &mdash; والوفرُ هو النسخةُ كلها لا وفرٌ لكل عنصر. ومعرفةُ سبب وجود الافتراضي هي ما يحوّل «<code>.copy()</code> حين أنوي التعديل» من قاعدة تحفظها إلى قاعدة تستنبطها." }
    },
    {
      id: "t11q12", type: "multi", level: "hard", topics: ["view-copy", "copy-rules", "index-2d"],
      q: { en: "Select <strong>every</strong> statement that is true.",
           ar: "اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "<code>a.base is None</code> is how you ask whether an array owns its own memory.",
          ar: "<code>a.base is None</code> هي كيف تسأل هل المصفوفة تملك ذاكرتها." },
        { en: "A view of a view is still a view onto the original data.",
          ar: "نافذةُ النافذة لا تزال نافذة على البيانات الأصلية." },
        { en: "<code>m[:, 0]</code> is a view, so <code>m[:, 0] += 5</code> moderates one subject in place.",
          ar: "<code>m[:, 0]</code> نافذة، فـ <code>m[:, 0] += 5</code> تعدّل مادة واحدة في مكانها." },
        { en: "A boolean mask on the right of <code>=</code> gives a copy, but on the left it writes into the original.",
          ar: "القناع المنطقي يمين <code>=</code> يعطي نسخة، لكنه يساره يكتب في الأصل." },
        { en: "<code>b = a[:]</code> copies the array, as the same idiom does for a Python list.",
          ar: "<code>b = a[:]</code> تنسخ المصفوفة، كما تفعل الصيغةُ نفسها مع قائمة بايثون." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The fifth is the one to reject and it is worth saying why it is so tempting: <code>lst[:]</code> is the standard way to copy a Python list, so the muscle memory is real. On an array <code>a[:]</code> is just a slice covering everything, which is a view like any other slice &mdash; the idiom you have used for years does the opposite of what you expect. <code>a.copy()</code> is the only form that says what it means.",
                 ar: "الخامسة هي المرفوضة ويجدر قول لماذا هي مغرية: فـ <code>lst[:]</code> هي الطريقة المعتادة لنسخ قائمة بايثون، فالذاكرة العضلية حقيقية. وعلى المصفوفة تكون <code>a[:]</code> قطعةً تغطي كل شيء، وهي نافذة كأي قطعة &mdash; فالصيغةُ التي استعملتها سنين تفعل عكس ما تتوقع. و<code>a.copy()</code> هي الصيغة الوحيدة التي تقول ما تعنيه." }
    }
  ]
};
