/* ============================================================
   Chapter 5 traces, embedded inline in the lessons.
   Every program was run in NumPy 2.5 and the panels match.
   ============================================================ */
window.OOPTraces = window.OOPTraces || {};

Object.assign(window.OOPTraces, {

  "t-solve": {
    id: "t-solve",
    title: { en: "What <code>solve</code> is doing while you wait",
             ar: "ما تفعله <code>solve</code> وأنت تنتظر" },
    lede: { en: "The same elimination you did by hand in the opening, written out in NumPy. Watch the second row lose its notebooks, and watch the last two digits of <code>pen</code>.",
            ar: "الحذفُ نفسه الذي أجريتَه يدويًا في الافتتاح، مكتوبًا بنمباي. راقب الصفَّ الثاني يفقد دفاتره، وراقب الرقمين الأخيرين في <code>pen</code>." },
    code:
      "import numpy as np\n" +
      "\n" +
      "A = np.array([[3., 2.],\n" +
      "              [5., 4.]])\n" +
      "b = np.array([13.50, 23.50])\n" +
      "\n" +
      "f = A[1, 0] / A[0, 0]\n" +
      "A[1] = A[1] - f * A[0]\n" +
      "b[1] = b[1] - f * b[0]\n" +
      "\n" +
      "pen = b[1] / A[1, 1]\n" +
      "book = (b[0] - A[0, 1] * pen) / A[0, 0]",
    steps: [
      { line: 3, vars: {},
        note: { en: "Two invoices, as a table of quantities: one row each, one column per item.",
                ar: "فاتورتان، جدولَ كمياتٍ: صفٌّ لكلٍّ، وعمودٌ لكل بند." } },
      { line: 5, vars: { "A": "[[3. 2.] [5. 4.]]" },
        note: { en: "The two totals go in a vector of their own, in the same order as the rows.",
                ar: "يذهب المجموعان في متجهٍ خاص، بترتيب الصفوف نفسه." } },
      { line: 7, vars: { "A": "[[3. 2.] [5. 4.]]", "b": "[13.5 23.5]" },
        note: { en: "The plan: make the second row's notebooks vanish, so the row is about pens alone. The factor needed is 5 &divide; 3.",
                ar: "الخطة: جعلُ دفاتر الصف الثاني تتلاشى، فيصير الصفُّ عن الأقلام وحدها. والعاملُ المطلوب 5 &divide; 3." } },
      { line: 8, vars: { "A": "[[3. 2.] [5. 4.]]", "b": "[13.5 23.5]", "f": "1.6666666666666667" },
        note: { en: "Not a round number, and nothing can be done about that. Every later line now carries a rounding error that started here.",
                ar: "ليس عددًا صحيحًا، ولا حيلةَ في ذلك. فكلُّ سطرٍ لاحق يحمل الآن خطأَ تقريبٍ بدأ هنا." } },
      { line: 9, vars: { "A": "[[3.         2.        ] [0.         0.66666667]]", "b": "[13.5 23.5]", "f": "1.6666666666666667" },
        note: { en: "The first column of row two is exactly zero: the notebooks are gone. What is left of row two is two-thirds of a pen.",
                ar: "العمودُ الأول من الصف الثاني صفرٌ بالضبط: فقد ذهبت الدفاتر. وما بقي من الصف الثاني ثلثا قلم." } },
      { line: 11, vars: { "A": "[[3.         2.        ] [0.         0.66666667]]", "b": "[13.5  1. ]", "f": "1.6666666666666667" },
        note: { en: "The same subtraction applied to the totals. Row two now reads: two-thirds of a pen costs 1.00.",
                ar: "الطرحُ نفسه مطبَّقًا على المجاميع. فيقرأ الصفُّ الثاني الآن: ثلثا قلمٍ بـ 1.00." } },
      { line: 12, vars: { "A": "[[3.         2.        ] [0.         0.66666667]]", "b": "[13.5  1. ]", "pen": "1.5000000000000004" },
        note: { en: "<strong>1.5000000000000004.</strong> The pen costs 1.50, and this says so with a 4 in the sixteenth digit. <code>np.linalg.solve</code> returns exactly 1.5 for this system, because it divides by the larger of the two leading entries rather than the first one it meets. Same method, different order, different last digit &mdash; and this is the whole argument for <code>np.allclose</code> over <code>==</code>.",
                ar: "<strong>1.5000000000000004.</strong> القلمُ بـ 1.50، وهذا يقول ذلك ورقمُه السادس عشر 4. وتُرجع <code>np.linalg.solve</code> 1.5 بالضبط لهذا النظام، لأنها تقسم على الأكبر من المدخلين الرائدين لا على أولِ ما تلقاه. الطريقةُ نفسها وترتيبٌ مختلف ورقمٌ أخيرٌ مختلف &mdash; وهذه هي الحجة كلها لـ <code>np.allclose</code> على <code>==</code>." } },
      { line: 12, vars: { "A": "[[3.         2.        ] [0.         0.66666667]]", "b": "[13.5  1. ]", "pen": "1.5000000000000004", "book": "3.5" },
        note: { en: "Substituting back gives the notebook at 3.5, and here the error happens to cancel. It will not always. Eight lines to do what one call does, on the smallest system there is &mdash; which is the argument for the call.",
                ar: "والتعويضُ العكسي يعطي الدفترَ بـ 3.5، وقد تلاشى الخطأُ هنا بالتقابل. ولن يتلاشى دائمًا. ثمانيةُ أسطر لأداء ما يؤدّيه نداءٌ واحد، على أصغر نظامٍ موجود &mdash; وهي الحجةُ للنداء." } }
    ]
  },

  "t-lstsq": {
    id: "t-lstsq",
    title: { en: "A best line, and what it leaves behind",
             ar: "خطُّ أفضلِ مواءمة، وما يتخلّف عنه" },
    lede: { en: "Five students and a line that misses all five. Follow <code>resid</code>: those five numbers are what “least squares” is least-ing, and their pattern is worth more than their size.",
            ar: "خمسةُ طلبة وخطٌّ يفوته الخمسة. اتبع <code>resid</code>: فتلك الأعدادُ الخمسة هي ما تصغّره «المربعاتُ الصغرى»، ونمطُها أنفعُ من حجمها." },
    code:
      "import numpy as np\n" +
      "\n" +
      "hours = np.array([1., 2., 3., 4., 5.])\n" +
      "marks = np.array([52., 55., 61., 64., 70.])\n" +
      "\n" +
      "A = np.column_stack([np.ones(5), hours])\n" +
      "coef = np.linalg.lstsq(A, marks, rcond=None)[0]\n" +
      "\n" +
      "fitted = A @ coef\n" +
      "resid = marks - fitted\n" +
      "ssr = (resid ** 2).sum()",
    steps: [
      { line: 3, vars: {},
        note: { en: "The hours five students revised.",
                ar: "الساعاتُ التي راجعها خمسةُ طلبة." } },
      { line: 4, vars: { "hours": "[1. 2. 3. 4. 5.]" },
                note: { en: "And the marks they got. Five pairs, and no straight line through all five.",
                ar: "والعلاماتُ التي نالوها. خمسةُ أزواج، ولا خطَّ مستقيمٍ يمرّ بالخمسة." } },
      { line: 6, vars: { "hours": "[1. 2. 3. 4. 5.]", "marks": "[52. 55. 61. 64. 70.]" },
        note: { en: "Next line builds the design matrix: a column of ones for the intercept, then the hours.",
                ar: "يبني السطرُ التالي مصفوفةَ التصميم: عمودُ آحادٍ للمقطع، ثم الساعات." } },
      { line: 7, vars: { "hours": "[1. 2. 3. 4. 5.]", "marks": "[52. 55. 61. 64. 70.]", "A.shape": "(5, 2)" },
        note: { en: "Five rows, two columns. More equations than unknowns, which is why the next line is <code>lstsq</code> and not <code>solve</code>.",
                ar: "خمسةُ صفوف وعمودان. معادلاتٌ أكثر من المجاهيل، ولذلك كان السطرُ التالي <code>lstsq</code> لا <code>solve</code>." } },
      { line: 9, vars: { "marks": "[52. 55. 61. 64. 70.]", "A.shape": "(5, 2)", "coef": "[46.9  4.5]" },
        note: { en: "The intercept and the slope: start at 46.9, add 4.5 a revision hour.",
                ar: "المقطعُ والميل: ابدأ من 46.9، وأضِف 4.5 لكل ساعة مراجعة." } },
      { line: 10, vars: { "marks": "[52. 55. 61. 64. 70.]", "coef": "[46.9  4.5]", "fitted": "[51.4 55.9 60.4 64.9 69.4]" },
        note: { en: "What the line predicts for the five students it was fitted on. Compare them with <code>marks</code> above: close, and wrong everywhere.",
                ar: "ما يتوقّعه الخطُّ للطلبة الخمسة الذين لوئم عليهم. قارِنها بـ <code>marks</code> أعلاه: قريبة، وخاطئةٌ في كل موضع." } },
      { line: 11, vars: { "coef": "[46.9  4.5]", "fitted": "[51.4 55.9 60.4 64.9 69.4]", "resid": "[ 0.6 -0.9  0.6 -0.9  0.6]" },
        note: { en: "The five misses. Look at the <em>signs</em> rather than the sizes: up, down, up, down, up. A relationship that was genuinely straight would scatter them without a pattern.",
                ar: "الأخطاءُ الخمسة. انظر في <em>الإشارات</em> لا في الأحجام: فوق، تحت، فوق، تحت، فوق. والعلاقةُ المستقيمة حقًّا كانت ستنثرها بلا نمط." } },
      { line: 11, vars: { "resid": "[ 0.6 -0.9  0.6 -0.9  0.6]", "ssr": "2.699999999999979" },
        note: { en: "Squared and added: 2.7, and no line through these five points can score lower. The two-point line from earlier in the lesson scores 4.5 on the same five students.",
                ar: "مربّعةً ومجموعة: 2.7، ولا خطَّ يمرّ بهذه النقاط الخمس يُحرز أقلّ. ويُحرز خطُّ النقطتين من أول الدرس 4.5 على الطلبة الخمسة أنفسهم." } }
    ]
  }

});
