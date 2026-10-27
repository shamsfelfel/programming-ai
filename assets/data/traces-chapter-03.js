/* ============================================================
   Chapter 3 traces, embedded inline in the lessons.
   Every program was run in NumPy 2.5 and the panels match.
   ============================================================ */
window.OOPTraces = window.OOPTraces || {};

Object.assign(window.OOPTraces, {

  "t-dtype": {
    id: "t-dtype",
    title: { en: "One type, decided once, applied for ever",
             ar: "نوعٌ واحد، يُقرَّر مرة، ويُطبَّق إلى الأبد" },
    lede: { en: "Watch the dtype column. It is chosen when the array is built, and every later assignment is converted to fit it.",
            ar: "راقب عمود النوع. فهو يُختار عند بناء المصفوفة، وكل إسناد لاحق يُحوَّل ليناسبه." },
    code:
      "import numpy as np\n" +
      "\n" +
      "whole = np.array([40, 55, 70])\n" +
      "decimal = np.array([40, 55, 70.5])\n" +
      "\n" +
      "whole[0] = 2.9\n" +
      "decimal[0] = 2.9\n" +
      "\n" +
      "safe = np.array([40, 55, 70], dtype=float)\n" +
      "safe[0] = 2.9",
    steps: [
      { line: 3, vars: {},
        note: { en: "Three whole numbers go in. NumPy inspects them and picks a type for all three.",
                ar: "تدخل ثلاثة أعداد صحيحة. تفحصها نمباي وتختار نوعًا للثلاثة." } },
      { line: 4, vars: { "whole": "[40 55 70]", "whole.dtype": "int64" },
        note: { en: "<code>int64</code>, because nothing in the list had a decimal point. There is now no room for a fraction anywhere in this array.",
                ar: "<code>int64</code>، لأن لا شيء في القائمة كان بنقطة عشرية. فلا موضع لكسر في أي مكان من هذه المصفوفة الآن." } },
      { line: 6, vars: { "whole": "[40 55 70]", "whole.dtype": "int64", "decimal": "[40.  55.  70.5]", "decimal.dtype": "float64" },
        note: { en: "One decimal among three values promoted <strong>all three</strong> to <code>float64</code> &mdash; note 40 printed as <code>40.</code> with the trailing dot.",
                ar: "عشريٌّ واحد بين ثلاث قيم رفع <strong>الثلاث كلها</strong> إلى <code>float64</code> &mdash; ولاحظ 40 مطبوعةً <code>40.</code> بالنقطة اللاحقة." } },
      { line: 7, vars: { "whole": "[ 2 55 70]", "whole.dtype": "int64", "decimal": "[40.  55.  70.5]", "decimal.dtype": "float64" },
        note: { en: "2.9 was assigned and 2 was stored. The array is <code>int64</code>, it has nowhere to put the fraction, and it does not consider that worth mentioning.",
                ar: "أُسندت 2.9 وخُزّنت 2. فالمصفوفة <code>int64</code>، ولا موضع فيها للكسر، ولا ترى ذلك جديرًا بالذكر." } },
      { line: 9, vars: { "whole": "[ 2 55 70]", "decimal": "[ 2.9 55.  70.5]", "decimal.dtype": "float64" },
        note: { en: "The same assignment into the float array kept all of 2.9. Same line of code, two different results, decided by a choice made three lines earlier.",
                ar: "الإسناد نفسه في المصفوفة العشرية حفظ 2.9 كاملة. السطر نفسه ونتيجتان مختلفتان، يقرّرهما اختيارٌ وقع قبل ثلاثة أسطر." } },
      { line: 10, vars: { "whole": "[ 2 55 70]", "decimal": "[ 2.9 55.  70.5]", "safe": "[40. 55. 70.]", "safe.dtype": "float64" },
        note: { en: "<code>dtype=float</code> says it out loud rather than relying on one of the values happening to have a decimal point.",
                ar: "<code>dtype=float</code> تقولها صراحةً بدل الاتكال على أن تكون إحدى القيم بنقطة عشرية اتفاقًا." } },
      { line: 10, vars: { "whole": "[ 2 55 70]", "decimal": "[ 2.9 55.  70.5]", "safe": "[ 2.9 55.  70. ]", "safe.dtype": "float64" },
        note: { en: "The rule in one line: a <code>dtype</code> is fixed when the array is built, and assignment converts the value to fit it &mdash; never the other way round.",
                ar: "القاعدة في سطر: يُثبَّت <code>dtype</code> عند بناء المصفوفة، والإسنادُ يحوّل القيمة لتناسبه &mdash; لا العكس أبدًا." } }
    ]
  },

  "t-view": {
    id: "t-view",
    title: { en: "Two names, one block of memory",
             ar: "اسمان وكتلةُ ذاكرة واحدة" },
    lede: { en: "Nothing in this program assigns to marks. Watch it change anyway.",
            ar: "لا شيء في هذا البرنامج يُسنِد إلى marks. وراقبها تتغير مع ذلك." },
    code:
      "import numpy as np\n" +
      "\n" +
      "marks = np.array([40, 55, 70, 85, 100])\n" +
      "resit = marks[1:4]\n" +
      "resit[0] = 60\n" +
      "\n" +
      "safe = marks[1:4].copy()\n" +
      "safe[0] = -1",
    steps: [
      { line: 3, vars: {},
        note: { en: "One array, one block of five numbers in memory.",
                ar: "مصفوفةٌ واحدة، كتلةٌ واحدة من خمسة أعداد في الذاكرة." } },
      { line: 4, vars: { "marks": "[ 40  55  70  85 100]" },
        note: { en: "A slice is about to be taken. With a Python list this would copy three values; with an array it will not copy anything.",
                ar: "ستُؤخذ قطعة. ومع قائمة بايثون سينسخ هذا ثلاث قيم؛ ومع مصفوفة لن ينسخ شيئًا." } },
      { line: 5, vars: { "marks": "[ 40  55  70  85 100]", "resit": "[55 70 85]", "resit.base": "marks  (it is a window)" },
        note: { en: "<code>resit</code> is a second array object pointing into the <em>same</em> memory, starting one place along. <code>.base</code> names what it looks into.",
                ar: "<code>resit</code> كائن مصفوفة ثانٍ يشير إلى الذاكرة <em>نفسها</em>، بادئًا بموضع واحد. و<code>.base</code> تسمّي ما يطلّ عليه." } },
      { line: 7, vars: { "marks": "[ 40  60  70  85 100]", "resit": "[60 70 85]", "resit.base": "marks" },
        note: { en: "<strong>One assignment, two arrays changed.</strong> Position 0 of the window is position 1 of the original &mdash; they are the same place.",
                ar: "<strong>إسنادٌ واحد ومصفوفتان تغيّرتا.</strong> فالموضع 0 من النافذة هو الموضع 1 من الأصل &mdash; إنهما الموضع نفسه." } },
      { line: 8, vars: { "marks": "[ 40  60  70  85 100]", "resit": "[60 70 85]", "safe": "[60 70 85]", "safe.base": "None  (independent)" },
        note: { en: "<code>.copy()</code> allocated a new block and filled it. <code>safe.base</code> is <code>None</code>, which is how you ask whether an array is its own.",
                ar: "<code>.copy()</code> حجزت كتلة جديدة وملأتها. و<code>safe.base</code> هي <code>None</code>، وبها تسأل هل المصفوفة ملكُ نفسها." } },
      { line: 8, vars: { "marks": "[ 40  60  70  85 100]", "resit": "[60 70 85]", "safe": "[-1 70 85]" },
        note: { en: "This time the original did not move. One word, <code>.copy()</code>, and the only difference is whether an edit escapes.",
                ar: "هذه المرة لم يتحرك الأصل. كلمةٌ واحدة <code>.copy()</code>، والفرق الوحيد هل يفلت التعديل." } }
    ]
  },

  "t-broadcast": {
    id: "t-broadcast",
    title: { en: "Right-align the shapes and read down",
             ar: "حاذِ الشكلين يمينًا واقرأ نزولًا" },
    lede: { en: "The same table minus two different rows of three. One is what you wanted; the other runs anyway.",
            ar: "الجدول نفسه ناقصَ صفّين مختلفين من ثلاثة. أحدهما ما أردت؛ والآخر يعمل مع ذلك." },
    code:
      "marks = np.array([[40., 55., 70.],\n" +
      "                  [60., 65., 90.],\n" +
      "                  [80., 75., 50.]])\n" +
      "\n" +
      "subject_mean = marks.mean(axis=0)\n" +
      "right = marks - subject_mean\n" +
      "\n" +
      "student_mean = marks.mean(axis=1)\n" +
      "wrong = marks - student_mean\n" +
      "\n" +
      "fixed = marks - student_mean[:, None]",
    steps: [
      { line: 5, vars: { "marks.shape": "(3, 3)" },
        note: { en: "A square table &mdash; three students, three subjects. Square is what makes the mistake ahead possible.",
                ar: "جدولٌ مربّع &mdash; ثلاثة طلبة وثلاث مواد. والتربيعُ هو ما يجعل الخطأ القادم ممكنًا." } },
      { line: 6, vars: { "marks.shape": "(3, 3)", "subject_mean": "[60. 65. 70.]", "subject_mean.shape": "(3,)" },
        note: { en: "One average per column. Right-aligned: (3, 3) over (3,) &mdash; last dimensions 3 and 3 match, the missing row dimension counts as 1.",
                ar: "متوسطٌ لكل عمود. ومحاذاةً إلى اليمين: (3, 3) فوق (3,) &mdash; البُعدان الأخيران 3 و3 يتطابقان، وبُعدُ الصفوف الغائب يُحسب 1." } },
      { line: 8, vars: { "subject_mean": "[60. 65. 70.]", "right": "[[-20. -10.   0.]\n [  0.   0.  20.]\n [ 20.  10. -20.]]" },
        note: { en: "The row was reused down all three rows, so each column had its own subject average taken off. Correct.",
                ar: "أُعيد استعمال الصفّ نزولًا على الصفوف الثلاثة، فطُرح من كل عمود متوسط مادته. صحيح." } },
      { line: 9, vars: { "right": "(3, 3)", "student_mean": "[55.   71.67 68.33]", "student_mean.shape": "(3,)" },
        note: { en: "<strong>The same shape, <code>(3,)</code>.</strong> Nothing about it says these three numbers are one per row rather than one per column.",
                ar: "<strong>الشكل نفسه <code>(3,)</code>.</strong> ولا شيء فيه يقول إن هذه الأعداد الثلاثة واحدٌ لكل صفّ لا لكل عمود." } },
      { line: 11, vars: { "student_mean": "[55.   71.67 68.33]", "wrong": "[[-15.   -16.67   1.67]\n [  5.    -6.67  21.67]\n [ 25.     3.33 -18.33]]" },
        note: { en: "It ran. The rule applied it the only way it knows &mdash; across each row &mdash; so student 1's average was subtracted from everyone's maths. Nine real numbers, every one meaningless.",
                ar: "عمل. فطبّقته القاعدة بالطريقة الوحيدة التي تعرفها &mdash; عرضًا على كل صفّ &mdash; فطُرح متوسط الطالب 1 من رياضيات الجميع. تسعة أعداد حقيقية، كلٌّ منها بلا معنى." } },
      { line: 11, vars: { "student_mean.shape": "(3,)", "student_mean[:, None].shape": "(3, 1)" },
        note: { en: "<code>[:, None]</code> adds a dimension of length 1 at the end, turning the row into a column. Now the shape itself says one number per row.",
                ar: "<code>[:, None]</code> تضيف بُعدًا طوله 1 في النهاية، فتحوّل الصفَّ عمودًا. والآن يقول الشكل نفسه عددٌ لكل صفّ." } },
      { line: 11, vars: { "fixed": "[[-15.     0.    15.  ]\n [-11.67  -6.67  18.33]\n [ 11.67   6.67 -18.33]]" },
        note: { en: "Right-aligned, (3, 3) over (3, 1): rows 3 and 3 match, and the 1 stretches across the columns. First row &minus;15, 0, +15 for 40, 55, 70 around an average of 55 &mdash; a student compared with themselves.",
                ar: "محاذاةً إلى اليمين، (3, 3) فوق (3, 1): الصفوف 3 و3 تتطابق، والـ1 تتمدّد عرض الأعمدة. والصفّ الأول &minus;15 و0 و+15 لـ 40 و55 و70 حول متوسط 55 &mdash; طالبٌ مقارَنٌ بنفسه." } }
    ]
  },

  "t-axis": {
    id: "t-axis",
    title: { en: "The axis you name is the one that disappears",
             ar: "المحور الذي تسمّيه هو الذي يختفي" },
    lede: { en: "Watch the shape rather than trying to picture the direction. The shape is the part that never lies.",
            ar: "راقب الشكل بدل محاولة تخيّل الاتجاه. فالشكل هو الجزء الذي لا يكذب أبدًا." },
    code:
      "marks = np.array([[40., 55., 70.],\n" +
      "                  [60., 65., 90.],\n" +
      "                  [80., 75., 50.]])\n" +
      "\n" +
      "everything = marks.mean()\n" +
      "per_subject = marks.mean(axis=0)\n" +
      "per_student = marks.mean(axis=1)\n" +
      "kept = marks.mean(axis=1, keepdims=True)",
    steps: [
      { line: 5, vars: { "marks.shape": "(3, 3)" },
        note: { en: "Axis 0 is the first number in the shape &mdash; the rows. Axis 1 is the second &mdash; the columns.",
                ar: "المحور 0 هو العدد الأول في الشكل &mdash; الصفوف. والمحور 1 هو الثاني &mdash; الأعمدة." } },
      { line: 6, vars: { "marks.shape": "(3, 3)", "everything": "65.0" },
        note: { en: "No axis named, so both are collapsed and one number comes back. Shape <code>()</code> &mdash; no dimensions left.",
                ar: "لم يُسمَّ محور، فيُطوى كلاهما ويعود عددٌ واحد. والشكل <code>()</code> &mdash; لا أبعاد باقية." } },
      { line: 7, vars: { "everything": "65.0", "per_subject": "[60. 65. 70.]", "per_subject.shape": "(3,)" },
        note: { en: "<code>axis=0</code> ate the rows. (3, 3) with the first number removed is (3,) &mdash; one value per surviving column, a subject average.",
                ar: "<code>axis=0</code> أكل الصفوف. فـ (3, 3) بإزالة العدد الأول تصير (3,) &mdash; قيمةٌ لكل عمود باقٍ، متوسطُ مادة." } },
      { line: 8, vars: { "per_subject": "[60. 65. 70.]", "per_student": "[55.   71.67 68.33]", "per_student.shape": "(3,)" },
        note: { en: "<code>axis=1</code> ate the columns, leaving one value per student. Note both results have shape <code>(3,)</code> &mdash; the shape alone cannot tell you which is which, only how many survived.",
                ar: "<code>axis=1</code> أكل الأعمدة، تاركًا قيمةً لكل طالب. ولاحظ أن للنتيجتين الشكل <code>(3,)</code> &mdash; فالشكل وحده لا يقول لك أيُّهما أيٌّ، بل كم بقي فقط." } },
      { line: 8, vars: { "per_student": "[55.   71.67 68.33]", "kept": "[[55.  ]\n [71.67]\n [68.33]]", "kept.shape": "(3, 1)" },
        note: { en: "<code>keepdims=True</code> leaves the eaten dimension in place as a 1 instead of dropping it. The same three numbers, but now the shape records which direction they came from.",
                ar: "<code>keepdims=True</code> تُبقي البُعد المأكول في موضعه 1 بدل إسقاطه. الأعداد الثلاثة نفسها، لكن الشكل صار يسجّل من أي اتجاه جاءت." } },
      { line: 8, vars: { "kept.shape": "(3, 1)", "marks - kept": "[[-15.     0.    15.  ]\n [-11.67  -6.67  18.33]\n [ 11.67   6.67 -18.33]]" },
        note: { en: "And because the shape is unambiguous, combining it back with the table can only mean one thing. That is why <code>keepdims</code> exists: it prevents the <a href=\"#l12-h2\">silent mistake of Lesson 12</a> rather than correcting it afterwards.",
                ar: "ولأن الشكل غير ملتبس فإن دمجه بالجدول لا يمكن أن يعني إلا شيئًا واحدًا. ولهذا توجد <code>keepdims</code>: فهي تمنع <a href=\"#l12-h2\">خطأ الدرس 12 الصامت</a> بدل تصحيحه بعد وقوعه." } }
    ]
  }

});
