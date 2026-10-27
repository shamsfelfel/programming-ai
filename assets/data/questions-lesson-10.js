/* ============================================================
   Lesson 10 (Lecture 12) — the array, dtype, shape.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-10"] = {
  title: { en: "Lesson 10 Test — the Array", ar: "اختبار الدرس 10 — المصفوفة" },
  intro: {
    en: "Twelve questions on Lesson 10 only. No mathematics is examined &mdash; every question is about what an array does that a list does not, and what the one shared <code>dtype</code> costs you. The types themselves are explained in <a href=\"#appendix-a4\">Appendix A4</a>.",
    ar: "اثنا عشر سؤالًا على الدرس 10 وحده. ولا يُمتحَن في أي رياضيات &mdash; فكل سؤال عما تفعله المصفوفة ولا تفعله القائمة، وعما يكلّفك النوعُ المشترك الواحد. والأنواع نفسها مشروحة في <a href=\"#appendix-a4\">الملحق A4</a>."
  },
  questions: [
    {
      id: "t10q1", type: "output", level: "easy", topics: ["array-vs-list", "elementwise"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nlist_marks = [40, 55, 70]\narray_marks = np.array([40, 55, 70])\n\nprint(list_marks * 2)\nprint(array_marks * 2)",
      blanks: [{ accept: ["[40, 55, 70, 40, 55, 70]\n[ 80 110 140]"], lines: 2 }],
      explain: { en: "The same symbol means two different things depending on what is to its left, and <strong>both are defined</strong>, so neither raises. For a list <code>*</code> repeats the container; for an array it multiplies each element. The list version is the dangerous one: on a class of thirty it produces a class of sixty with every student twice, and the average is unchanged, so a summary report looks completely normal.",
                 ar: "الرمزُ نفسه يعني شيئين مختلفين بحسب ما على يساره، و<strong>كلاهما معرَّف</strong>، فلا يُخطئ أيٌّ منهما. فـ <code>*</code> للقائمة تكرّر الحاوية؛ وللمصفوفة تضرب كل عنصر. ونسخةُ القائمة هي الخطيرة: فعلى صفّ ثلاثين تُنتج صفَّ ستين كلُّ طالب مرتين، والمتوسط لم يتغير، فيبدو التقرير الملخَّص طبيعيًا تمامًا." }
    },
    {
      id: "t10q2", type: "tf", level: "easy", topics: ["dtype"],
      q: { en: "A NumPy array can hold a mix of integers, decimals and strings at the same time, like a list can.",
           ar: "تستطيع مصفوفةُ نمباي حمل خليط من الأعداد الصحيحة والعشرية والنصوص معًا، كما تستطيع القائمة." },
      truth: false,
      explain: { en: "One array, one <code>dtype</code>, decided when it is built. Give it a mix and it does not refuse &mdash; it picks a type everything can be converted to, which is where the surprises come from: one decimal promotes every value to <code>float64</code>, and one string turns the whole array into text.",
                 ar: "مصفوفةٌ واحدة ونوعٌ واحد، يُقرَّر عند البناء. وأعطها خليطًا فلا ترفض &mdash; بل تختار نوعًا يمكن تحويل الجميع إليه، ومن هنا تأتي المفاجآت: فعشريٌّ واحد يرفع كل قيمة إلى <code>float64</code>، ونصٌّ واحد يحوّل المصفوفة كلها كتابةً." }
    },
    {
      id: "t10q3", type: "output", level: "easy", topics: ["dtype"],
      q: { en: "Write the three lines this prints, each being an array followed by its dtype.",
           ar: "اكتب الأسطر الثلاثة التي يطبعها، كلٌّ منها مصفوفة يليها نوعها." },
      code: "a = np.array([40, 55, 70])\nb = np.array([40, 55, 70.5])\n\nprint(a, a.dtype)\nprint(b, b.dtype)\nprint(a / 1, (a / 1).dtype)",
      blanks: [{ accept: ["[40 55 70] int64\n[40.  55.  70.5] float64\n[40. 55. 70.] float64"], lines: 3 }],
      explain: { en: "Three decisions nobody announced. All whole numbers gives <code>int64</code>. One decimal among them promotes <strong>every</strong> value, which is why <code>b</code> prints <code>40.</code> with a trailing dot. And dividing always produces decimals even when they come out whole &mdash; which is why <code>a / 1</code> is a float array of values that look like integers.",
                 ar: "ثلاثة قرارات لم يُعلنها أحد. فالصحيحةُ كلها تعطي <code>int64</code>. وعشريٌّ واحد بينها يرفع <strong>كل</strong> قيمة، ولهذا تطبع <code>b</code> قيمة <code>40.</code> بنقطة لاحقة. والقسمةُ تنتج عشريات دائمًا حتى حين تخرج صحيحة &mdash; ولهذا <code>a / 1</code> مصفوفة عشرية بقيم تبدو صحيحة." }
    },
    {
      id: "t10q4", type: "fill", level: "easy", topics: ["shape"],
      q: { en: "Fill in the three values for this array.", ar: "أكمل القيم الثلاث لهذه المصفوفة." },
      code: "m = np.array([[40, 55, 70],\n              [60, 65, 90]])\n\nprint(m.shape)   # ____1____\nprint(m.ndim)    # ____2____\nprint(m.size)    # ____3____",
      blanks: [
        { accept: ["(2, 3)", "(2,3)"], label: { en: "<code>m.shape</code>", ar: "<code>m.shape</code>" } },
        { accept: ["2"], label: { en: "<code>m.ndim</code>", ar: "<code>m.ndim</code>" } },
        { accept: ["6"], label: { en: "<code>m.size</code>", ar: "<code>m.size</code>" } }
      ],
      explain: { en: "<code>shape</code> is always <code>(rows, columns)</code> in that order &mdash; two students, three subjects. <code>ndim</code> is how many dimensions, <code>size</code> is every dimension multiplied together. A 1-D array of three marks would have shape <code>(3,)</code>, with the comma and nothing after it, which is a different thing from <code>(1, 3)</code>.",
                 ar: "<code>shape</code> دائمًا <code>(الصفوف، الأعمدة)</code> بهذا الترتيب &mdash; طالبان وثلاث مواد. و<code>ndim</code> عددُ الأبعاد، و<code>size</code> حاصلُ ضرب كل الأبعاد. ومصفوفةٌ أحادية بثلاث علامات شكلها <code>(3,)</code> بالفاصلة ولا شيء بعدها، وهي شيء مختلف عن <code>(1, 3)</code>." }
    },
    {
      id: "t10q5", type: "error", level: "medium", topics: ["int-truncate", "dtype"],
      q: { en: "Every scaled mark comes out as a whole number and the decimals are gone. Click the line that caused it.",
           ar: "تخرج كل علامة مقيَّسة عددًا صحيحًا وتختفي الكسور. انقر السطر الذي سبّب ذلك." },
      code: "marks = np.array([40, 55, 70, 85, 100])\n\nscaled = marks * 0.9\nmarks[:] = scaled\n\nprint(marks)",
      answer: 1,
      explain: { en: "Line 1 is where the damage is decided, three lines before it shows. <code>np.array([40, 55, ...])</code> with only whole numbers gives an <code>int64</code> array, and <code>marks[:] = scaled</code> writes floats into it, which truncates every one. Line 4 is where it happens and line 1 is the bug &mdash; the fix is <code>dtype=float</code> at construction. Note it <em>truncates</em> rather than rounding, so 76.5 becomes 76.",
                 ar: "السطر 1 هو حيث يُقرَّر الضرر، بثلاثة أسطر قبل ظهوره. فـ <code>np.array([40, 55, ...])</code> بأعداد صحيحة فقط تعطي مصفوفة <code>int64</code>، و<code>marks[:] = scaled</code> تكتب فيها عشريات فتبتر كل واحدة. والسطر 4 حيث يقع والسطر 1 هو الخلل &mdash; والإصلاح <code>dtype=float</code> عند البناء. ولاحظ أنها <em>تبتر</em> ولا تقرّب، فتصير 76.5 هي 76." },
      solution: { code: "marks = np.array([40, 55, 70, 85, 100], dtype=float)" }
    },
    {
      id: "t10q6", type: "trace", level: "medium", topics: ["int-truncate"],
      q: { en: "Trace the two arrays. What does each hold at the end?",
           ar: "تتبّع المصفوفتين. ماذا تحمل كلٌّ في النهاية؟" },
      code: "a = np.array([1, 2, 3])\nb = np.array([1, 2, 3], dtype=float)\n\na[0] = 9.7\nb[0] = 9.7",
      blanks: [
        { accept: ["[9 2 3]"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["[9.7 2.  3. ]"], wide: true, label: { en: "<code>b</code>", ar: "<code>b</code>" } }
      ],
      explain: { en: "The same assignment, two results, decided by a choice made two lines earlier. <code>a</code> is <code>int64</code> so 9.7 is truncated to 9 &mdash; <strong>not</strong> rounded to 10, which is what most people guess. A <code>dtype</code> is fixed when the array is built and assignment converts the value to fit it, never the other way round.",
                 ar: "الإسنادُ نفسه ونتيجتان، يقرّرهما اختيارٌ وقع قبل سطرين. فـ <code>a</code> من نوع <code>int64</code> فتُبتر 9.7 إلى 9 &mdash; و<strong>لا</strong> تُقرَّب إلى 10، وهو ما يخمّنه أكثر الناس. والنوعُ يُثبَّت عند بناء المصفوفة والإسنادُ يحوّل القيمة لتناسبه، لا العكس أبدًا." }
    },
    {
      id: "t10q7", type: "match", level: "medium", topics: ["array-create"],
      q: { en: "Match each call to what it produces.", ar: "وصّل كل استدعاء بما يُنتجه." },
      leftHead: { en: "Call", ar: "الاستدعاء" },
      rightHead: { en: "Produces", ar: "يُنتج" },
      pairs: [
        { l: { code: "np.zeros(3)" }, r: { code: "[0. 0. 0.]" } },
        { l: { code: "np.arange(0, 10, 2)" }, r: { code: "[0 2 4 6 8]" } },
        { l: { code: "np.linspace(0, 1, 5)" }, r: { code: "[0.   0.25 0.5  0.75 1.  ]" } },
        { l: { code: "np.full((2, 2), 7)" }, r: { code: "[[7 7]\n [7 7]]" } }
      ],
      explain: { en: "Two details that catch people. <code>np.zeros</code> gives <strong>floats</strong>, not integers. And <code>arange</code> and <code>linspace</code> answer different questions: <code>arange</code> is \"from here, in steps of this, stopping <em>before</em> there\", while <code>linspace</code> is \"this many values, <em>including</em> both ends\". When you know the step use <code>arange</code>; when you know the count use <code>linspace</code>.",
                 ar: "تفصيلان يُوقعان الناس. فـ <code>np.zeros</code> تعطي <strong>أعدادًا عشرية</strong> لا صحيحة. و<code>arange</code> و<code>linspace</code> تجيبان سؤالين مختلفين: فـ <code>arange</code> تعني «من هنا بهذه الخطوة ونتوقف <em>قبل</em> هناك»، و<code>linspace</code> تعني «هذا العدد من القيم <em>شاملةً</em> الطرفين». فإن عرفت الخطوة فاستعمل <code>arange</code>، وإن عرفت العدد فاستعمل <code>linspace</code>." }
    },
    {
      id: "t10q8", type: "complete", level: "medium", topics: ["elementwise"],
      q: { en: "Each paper is out of 120. Which line turns raw marks into percentages?",
           ar: "كل ورقة من 120. فأي سطر يحوّل العلامات الخام نسبًا مئوية؟" },
      code: "raw = np.array([48, 66, 84, 102, 120])\n# which line?\n# must give: [ 40.  55.  70.  85. 100.]",
      options: [
        { code: "percent = raw / 120 * 100" },
        { code: "percent = [r / 120 * 100 for r in raw]" },
        { code: "percent = raw // 120 * 100" },
        { code: "percent = raw.mean() / 120 * 100" }
      ],
      answer: 0,
      explain: { en: "The whole point of an array is that one expression applies to every element, so no loop and no comprehension is needed &mdash; the list-comprehension version works but rebuilds a Python list and throws away everything the array was for. The third uses integer division: every value becomes 0 before the multiply, and nothing warns. The fourth averages first and returns a single number.",
                 ar: "مقصدُ المصفوفة كلّه أن تعبيرًا واحدًا ينطبق على كل عنصر، فلا حلقة ولا استيعاب لازم &mdash; ونسخةُ الاستيعاب القائمي تعمل لكنها تعيد بناء قائمة بايثون ويرمي كل ما وُجدت المصفوفة له. والثالث يستعمل القسمة الصحيحة: فتصير كل قيمة 0 قبل الضرب، ولا شيء يحذّر. والرابع يعدّل أولًا ويُعيد عددًا واحدًا." }
    },
    {
      id: "t10q9", type: "order", level: "medium", topics: ["dtype"],
      q: { en: "Put in order what NumPy does when <code>np.array([1, 2.5, 3])</code> runs.",
           ar: "رتّب ما تفعله نمباي عند تنفيذ <code>np.array([1, 2.5, 3])</code>." },
      items: [
        { en: "It looks at every value it was given.", ar: "تنظر إلى كل قيمة أُعطيتها." },
        { en: "It picks one type that all of them can be converted to &mdash; here <code>float64</code>, because an integer fits in a float but not the reverse.", ar: "تختار نوعًا واحدًا يمكن تحويل الجميع إليه &mdash; وهو هنا <code>float64</code>، لأن العدد الصحيح يسع في العشري لا العكس." },
        { en: "It allocates one block of memory sized for that type.", ar: "تحجز كتلة ذاكرة واحدة بحجم ذلك النوع." },
        { en: "It converts every value into that type and stores it.", ar: "تحوّل كل قيمة إلى ذلك النوع وتخزّنها." },
        { en: "From now on the type is fixed, and every later assignment is converted to fit it.", ar: "ومن الآن يُثبَّت النوع، ويُحوَّل كل إسناد لاحق ليناسبه." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Step 2 is why a single decimal changes every value, and step 5 is why assigning 9.7 into an <code>int64</code> array stores 9. Both surprises come from the same one decision, taken once, at build time &mdash; which is why the fix for both is an argument to <code>np.array</code>.",
                 ar: "الخطوة 2 هي سبب تغيير عشريٍّ واحد لكل قيمة، والخطوة 5 هي سبب تخزين 9 عند إسناد 9.7 في مصفوفة <code>int64</code>. والمفاجأتان من القرار الواحد نفسه، المتَّخذ مرة واحدة عند البناء &mdash; ولهذا يكون إصلاحهما وسيطًا لـ <code>np.array</code>." }
    },
    {
      id: "t10q10", type: "compare", level: "hard", topics: ["array-vs-list", "elementwise"],
      q: { en: "Adjusting every mark by 5. Which reading of the pair is right?",
           ar: "تعديل كل علامة بمقدار 5. فأي قراءة للزوج صحيحة؟" },
      codeA: "marks = [40, 55, 70, 85, 100]\n\nadjusted = []\nfor m in marks:\n    adjusted.append(m + 5)\n\nprint(adjusted)",
      codeB: "marks = np.array([40, 55, 70, 85, 100])\n\nadjusted = marks + 5\n\nprint(adjusted)",
      options: [
        { en: "Both are correct. B is one line instead of four and runs in compiled code rather than a Python loop, but the stronger argument is that one line cannot be written wrongly in six different places.",
          ar: "كلتاهما صحيحة. وب سطرٌ واحد بدل أربعة وتُنفَّذ في كود مترجَم لا حلقة بايثون، لكن الحجة الأقوى أن سطرًا واحدًا لا يمكن كتابته خطأً في ستة مواضع مختلفة." },
        { en: "A is safer, because the loop makes the operation explicit and a reader can see exactly what happens to each mark.",
          ar: "أ أكثر أمانًا، لأن الحلقة تجعل العملية صريحة ويرى القارئ بالضبط ما يحدث لكل علامة." },
        { en: "B is wrong: <code>marks + 5</code> on an array appends 5 to the end, as it would on a list.",
          ar: "ب خاطئة: فـ <code>marks + 5</code> على مصفوفة تُلحق 5 في النهاية كما تفعل على قائمة." },
        { en: "They differ in result: A gives a list and B gives an array, so the numbers are not comparable.",
          ar: "تختلفان في النتيجة: فأ تعطي قائمة وب تعطي مصفوفة، فالأعداد غير قابلة للمقارنة." }
      ],
      answer: 0,
      explain: { en: "The speed is the famous reason and the <em>second</em> reason. The first is that the same adjustment will be needed for three subjects, then scaled, then centred, and the loop version fills a file with four-line blocks that all say the same thing in slightly different words &mdash; which is where a wrong index eventually goes. The answer that calls <code>+</code> on an array an append is worth refuting: <code>+</code> on an array means arithmetic, never concatenation; <code>marks + 5</code> on a <em>list</em> is the thing that raises <code>TypeError</code>.",
                 ar: "السرعةُ هي السبب الشهير وهي السبب <em>الثاني</em>. والأول أن التعديل نفسه سيلزم لثلاث مواد، ثم يُقاس، ثم يُمركَز، ونسخةُ الحلقة تملأ ملفًا بكتل من أربعة أسطر تقول الشيء نفسه بكلمات مختلفة قليلًا &mdash; وهناك يذهب الفهرس الخاطئ في النهاية. والجوابُ الذي يسمّي <code>+</code> على المصفوفة إلحاقًا يستحق الدحض: فهي تعني حسابًا لا إلحاقًا أبدًا؛ و<code>marks + 5</code> على <em>قائمة</em> هي ما يرفع <code>TypeError</code>." }
    },
    {
      id: "t10q11", type: "output", level: "hard", topics: ["dtype", "elementwise"],
      q: { en: "One value in the list is a string. Write the three lines this prints.",
           ar: "إحدى القيم في القائمة نصّ. اكتب الأسطر الثلاثة التي يطبعها." },
      code: "a = np.array([1, \"two\", 3])\n\nprint(a)\nprint(a.dtype)\ntry:\n    print(a.mean())\nexcept TypeError:\n    print(\"cannot average text\")",
      blanks: [{ accept: ["['1' 'two' '3']\n<U21\ncannot average text"], lines: 3 }],
      explain: { en: "Two different moments, and only the second one is loud. <strong>Building</strong> the array quietly turned the numbers into text &mdash; the quotes in the first line and the <code>&lt;U21</code> are the only evidence, and <code>&lt;U21</code> means \"unicode string, up to 21 characters\". <strong>Using</strong> it then fails, because there is no sensible way to average text. That is the shape of the real bug: a single stray value in a CSV column &mdash; one cell reading <code>\"n/a\"</code> among four thousand numbers &mdash; silently makes the entire column text, and you find out much later when a calculation refuses. The repair is <code>a.astype(float)</code>, which converts back and raises <code>ValueError: could not convert string to float: 'two'</code> naming the exact cell at fault.",
                 ar: "لحظتان مختلفتان، والثانية وحدها صاخبة. فـ<strong>بناءُ</strong> المصفوفة حوّل الأعداد كتابةً بصمت &mdash; وعلامات الاقتباس في السطر الأول و<code>&lt;U21</code> هما الدليل الوحيد، و<code>&lt;U21</code> تعني «نص يونيكود حتى 21 محرفًا». ثم يفشل <strong>استعمالها</strong>، لأن لا سبيل معقولًا لتعديل نصّ. وذلك شكلُ الخلل الحقيقي: فقيمةٌ شاردة واحدة في عمود CSV &mdash; خليةٌ واحدة فيها <code>\"n/a\"</code> بين أربعة آلاف عدد &mdash; تجعل العمود كلَّه نصًّا بصمت، وتكتشف ذلك متأخرًا حين يرفض حسابٌ ما. والإصلاح <code>a.astype(float)</code> التي تحوّل عائدًا وترفع <code>ValueError: could not convert string to float: 'two'</code> مسمّيةً الخلية المخطئة بالضبط." }
    },
    {
      id: "t10q12", type: "multi", level: "hard", topics: ["dtype", "int-truncate", "shape"],
      q: { en: "Select <strong>every</strong> true statement about <code>np.array([40, 55, 70])</code>.",
           ar: "اختر <strong>كل</strong> عبارة صحيحة عن <code>np.array([40, 55, 70])</code>." },
      options: [
        { en: "Its <code>dtype</code> is <code>int64</code>, and assigning a decimal into it truncates without a warning.",
          ar: "نوعها <code>int64</code>، وإسنادُ عشريٍّ فيها يبتر بلا تحذير." },
        { en: "Its shape is <code>(3,)</code>, which is a different thing from <code>(1, 3)</code> or <code>(3, 1)</code>.",
          ar: "شكلها <code>(3,)</code>، وهو شيء مختلف عن <code>(1, 3)</code> أو <code>(3, 1)</code>." },
        { en: "Dividing it by anything produces a <code>float64</code> array, even when the results come out whole.",
          ar: "قسمتها على أي شيء تُنتج مصفوفة <code>float64</code>، حتى حين تخرج النتائج صحيحة." },
        { en: "<code>dtype=float</code> at construction prevents the truncation, and costs nothing but the argument.",
          ar: "<code>dtype=float</code> عند البناء يمنع البتر، ولا يكلّف إلا الوسيط." },
        { en: "Appending a fourth mark with <code>+</code> extends it, as it would a list.",
          ar: "إلحاقُ علامة رابعة بـ <code>+</code> يوسّعها كما يفعل بالقائمة." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first four are all true and together they are the practical content of the lesson. The fifth is the misconception that costs the most: <code>+</code> on an array is <em>always</em> arithmetic, so <code>marks + 5</code> adds five to every mark and <code>marks + np.array([5])</code> does the same by broadcasting. An array has a fixed size and growing one means building a new one with <code>np.append</code> or <code>np.concatenate</code> &mdash; which is slow, and is a reason to collect into a list first and convert once at the end.",
                 ar: "الأربعة الأولى صحيحة كلها وهي معًا المحتوى العملي للدرس. والخامسة هي الوهم الأغلى ثمنًا: فـ <code>+</code> على مصفوفة حسابٌ <em>دائمًا</em>، فـ <code>marks + 5</code> تضيف خمسة إلى كل علامة و<code>marks + np.array([5])</code> تفعل الشيء نفسه بالبثّ. وللمصفوفة حجمٌ ثابت وتوسيعها يعني بناء واحدة جديدة بـ <code>np.append</code> أو <code>np.concatenate</code> &mdash; وهو بطيء، وهو سببٌ لأن تجمع في قائمة أولًا وتحوّل مرة واحدة في النهاية." }
    }
  ]
};
