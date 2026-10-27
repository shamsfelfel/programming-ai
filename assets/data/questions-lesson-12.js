/* ============================================================
   Lesson 12 (Lecture 14) — broadcasting: the rule, the shapes
   you will actually use, and the one that fits when it should not.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-12"] = {
  title: { en: "Lesson 12 Test — Broadcasting", ar: "اختبار الدرس 12 — البثّ" },
  intro: {
    en: "Twelve questions on Lesson 12 only. Most of them are answered by writing the two shapes one above the other, right-aligned, before you read any further. Do that on paper and the hard ones stop being hard.",
    ar: "اثنا عشر سؤالًا على الدرس 12 وحده. وأكثرها يُجاب بكتابة الشكلين أحدهما فوق الآخر محاذَين إلى اليمين قبل أن تقرأ أكثر. افعل ذلك على ورقة وتكفّ الصعبةُ عن كونها صعبة."
  },
  questions: [
    {
      id: "t12q1", type: "tf", level: "easy", topics: ["broadcast-rule"],
      q: { en: "Shapes are compared from the left, which is why <code>(3, 3)</code> and <code>(3,)</code> fit together &mdash; both start with 3.",
           ar: "تُقارَن الأشكال من اليسار، ولذلك ينطبق <code>(3, 3)</code> مع <code>(3,)</code> &mdash; فكلاهما يبدأ بـ 3." },
      truth: false,
      explain: { en: "They do fit, but not for that reason, and a rule that gives the right answer for the wrong reason will fail you on the next shape. Comparison runs <strong>from the right</strong>: the 3 of <code>(3,)</code> is lined up against the <em>columns</em> of the table, not its rows, and the row dimension has nothing opposite it so it is treated as 1 and the row is reused. Test the wrong rule on <code>(5, 3)</code> and <code>(5,)</code>: reading from the left it should fit, and in fact it raises.",
                 ar: "ينطبقان فعلًا لكن لا لذلك السبب، والقاعدة التي تعطي الجواب الصحيح لسبب خاطئ ستخذلك عند الشكل التالي. فالمقارنة تجري <strong>من اليمين</strong>: فالـ 3 في <code>(3,)</code> تُحاذى مع <em>أعمدة</em> الجدول لا صفوفه، وبُعد الصفوف لا شيء مقابله فيُعدّ 1 ويُعاد استعمال الصفّ. اختبر القاعدة الخاطئة على <code>(5, 3)</code> و<code>(5,)</code>: فمن اليسار ينبغي أن ينطبقا، وهو في الحقيقة يرفع خطأً." }
    },
    {
      id: "t12q2", type: "output", level: "easy", topics: ["broadcast-shapes"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nt = np.array([[1, 2, 3],\n              [4, 5, 6]])\n\nprint(t * np.array([[10],\n                    [100]]))",
      blanks: [{ accept: ["[[ 10  20  30]\n [400 500 600]]"], lines: 2 }],
      explain: { en: "The second operand has shape <code>(2, 1)</code> &mdash; two rows, one column &mdash; so right-aligned against <code>(2, 3)</code> the rows match and the single column is stretched across all three. Each <em>row</em> gets its own multiplier: the first row by 10, the second by 100. Had the operand been written <code>np.array([10, 100])</code>, shape <code>(2,)</code>, the 2 would have been lined up against the 3 columns and it would have raised.",
                 ar: "المُعامل الثاني شكله <code>(2, 1)</code> &mdash; صفّان وعمود واحد &mdash; فبمحاذاته يمينًا مع <code>(2, 3)</code> يتطابق الصفّان ويُمدَّد العمود الواحد على الثلاثة. فيأخذ كل <em>صفّ</em> مضاعِفه: الأول في 10 والثاني في 100. ولو كُتب المُعامل <code>np.array([10, 100])</code> بشكل <code>(2,)</code> لحوذيت الـ 2 مع الأعمدة الثلاثة ولرُفع خطأ." }
    },
    {
      id: "t12q3", type: "mcq", level: "easy", topics: ["broadcast-shapes", "broadcast-rule"],
      q: { en: "What shape does this print?", ar: "أي شكل يطبعه هذا؟" },
      code: "a = np.ones((5, 1))\nb = np.array([1., 2., 3.])\n\nprint((a * b).shape)",
      options: [
        { en: "<code>(5, 3)</code>", ar: "<code>(5, 3)</code>" },
        { en: "<code>(5, 1)</code>", ar: "<code>(5, 1)</code>" },
        { en: "<code>(3,)</code>", ar: "<code>(3,)</code>" },
        { en: "It raises <code>ValueError</code>, because 5 and 3 are neither equal nor 1.", ar: "يرفع <code>ValueError</code>، لأن 5 و3 لا متساويان ولا أحدهما 1." }
      ],
      answer: 0,
      explain: { en: "Right-align <code>(5, 1)</code> over <code>(3,)</code>. The last column pairs 1 with 3, so the 1 is stretched to 3. The next column pairs 5 with nothing, so the 5 is kept. Result <code>(5, 3)</code>: fifteen numbers out of eight. The <code>ValueError</code> answer is the one to understand rather than just reject &mdash; 5 is never compared with 3 at all, because alignment from the right never puts them in the same column.",
                 ar: "حاذِ <code>(5, 1)</code> فوق <code>(3,)</code> يمينًا. فالعمود الأخير يُزاوج 1 مع 3 فتُمدَّد الـ 1 إلى 3. والعمود التالي يُزاوج 5 مع لا شيء فتُستبقى الـ 5. فالنتيجة <code>(5, 3)</code>: خمسة عشر عددًا من ثمانية. وجوابُ <code>ValueError</code> يُفهم لا يُرفض فقط &mdash; فالـ 5 لا تُقارَن بالـ 3 إطلاقًا، لأن المحاذاة من اليمين لا تضعهما في عمود واحد أبدًا." }
    },
    {
      id: "t12q4", type: "fill", level: "medium", topics: ["newaxis", "broadcast-shapes"],
      q: { en: "Three branches of the corner shop, four months of takings. Subtract each <em>branch</em>'s monthly rent from its own row. Fill the blank.",
           ar: "ثلاثة فروع للدكان وأربعة أشهر من المبيعات. اطرح إيجار كل <em>فرع</em> الشهري من صفّه. أكمل الفراغ." },
      code: "sales = np.array([[10., 12., 14., 16.],\n                  [20., 22., 24., 26.],\n                  [30., 32., 34., 36.]])\nrent = np.array([5., 10., 15.])   # one per branch\n\nprint(sales - ____1____)\n\n# expected:\n# [[ 5.  7.  9. 11.]\n#  [10. 12. 14. 16.]\n#  [15. 17. 19. 21.]]",
      blanks: [
        { accept: ["rent[:, None]", "rent[:,None]", "rent.reshape(-1, 1)", "rent.reshape(-1,1)", "rent.reshape(3, 1)", "rent.reshape(3,1)", "rent[:, np.newaxis]", "rent[:,np.newaxis]"],
          label: { en: "the rent, shaped to one number per row", ar: "الإيجار مُشكَّلًا عددًا واحدًا لكل صفّ" } }
      ],
      explain: { en: "<code>rent</code> is <code>(3,)</code> and the table is <code>(3, 4)</code>: right-aligned that pairs 3 with 4, which raises &mdash; and the error is a gift, because the table is not square. Turning the rent into a column, <code>(3, 1)</code>, pairs 3 with 3 and stretches the 1 across the four months. <code>rent.reshape(-1, 1)</code> is the same thing said differently; the <code>-1</code> means \"work out this dimension from the data\".",
                 ar: "<code>rent</code> شكله <code>(3,)</code> والجدول <code>(3, 4)</code>: فبالمحاذاة يمينًا تُزاوَج 3 مع 4 فيُرفع خطأ &mdash; والخطأ هديّة، لأن الجدول غير مربّع. وتحويلُ الإيجار إلى عمود <code>(3, 1)</code> يُزاوج 3 مع 3 ويمدّد الـ 1 على الأشهر الأربعة. و<code>rent.reshape(-1, 1)</code> هو الشيء نفسه بصيغة أخرى؛ فالـ <code>-1</code> تعني «استنتج هذا البُعد من البيانات»." }
    },
    {
      id: "t12q5", type: "output", level: "medium", topics: ["broadcast-rule"],
      q: { en: "This stops with an error. Write the last line of the traceback, exactly.",
           ar: "يتوقف هذا بخطأ. اكتب السطر الأخير من التتبّع بالضبط." },
      code: "table = np.zeros((3, 4))\nprint(table + np.array([1., 2., 3.]))",
      blanks: [{ accept: [
        "ValueError: operands could not be broadcast together with shapes (3,4) (3,)",
        "ValueError: operands could not be broadcast together with shapes (3,4) (3,) "
      ], lines: 1 }],
      explain: { en: "Worth typing out once, because you will read it a hundred times. It quotes <strong>both shapes, in the order you wrote them</strong>, so the message almost never leaves you guessing what happened &mdash; the work is deciding which of the two shapes is not the one you meant. Here the table has four columns and you handed it three numbers; if the three were meant per row, <code>[:, None]</code> says so.",
                 ar: "جديرٌ بأن تكتبه مرة، فستقرؤه مئة مرة. فهو يقتبس <strong>الشكلين كليهما بالترتيب الذي كتبتهما به</strong>، فلا يكاد يتركك تخمّن ما حدث &mdash; والعملُ هو تحديدُ أيّ الشكلين ليس ما قصدت. فالجدول هنا بأربعة أعمدة وقد أعطيته ثلاثة أعداد؛ فإن كانت الثلاثة لكل صفّ فـ <code>[:, None]</code> تقول ذلك." }
    },
    {
      id: "t12q6", type: "match", level: "medium", topics: ["broadcast-shapes"],
      q: { en: "The table <code>t</code> has shape <code>(3, 4)</code>. Match each second operand to what <code>t + it</code> does.",
           ar: "الجدول <code>t</code> شكله <code>(3, 4)</code>. وصّل كل مُعامل ثانٍ بما يفعله <code>t + it</code>." },
      leftHead: { en: "Second operand", ar: "المُعامل الثاني" },
      rightHead: { en: "Effect", ar: "الأثر" },
      pairs: [
        { l: { code: "10.0" }, r: { en: "Added to every one of the twelve elements.", ar: "يُضاف إلى كل عنصر من الاثني عشر." } },
        { l: { code: "np.array([1., 2., 3., 4.])" }, r: { en: "Shape <code>(4,)</code>: one number per <strong>column</strong>, the same row reused down the table.", ar: "شكله <code>(4,)</code>: عدد لكل <strong>عمود</strong>، والصفّ نفسه يُعاد في الجدول كله." } },
        { l: { code: "np.array([[1.], [2.], [3.]])" }, r: { en: "Shape <code>(3, 1)</code>: one number per <strong>row</strong>, stretched across the columns.", ar: "شكله <code>(3, 1)</code>: عدد لكل <strong>صفّ</strong>، يُمدَّد على الأعمدة." } },
        { l: { code: "np.array([1., 2., 3.])" }, r: { en: "<code>ValueError</code>: 3 against 4 in the last column.", ar: "<code>ValueError</code>: 3 مقابل 4 في العمود الأخير." } }
      ],
      explain: { en: "Three of these are the whole of broadcasting in practice: a scalar, a row, a column. The fourth is the one you will write by accident, and on a <code>(3, 4)</code> table it raises immediately. Change the table to <code>(3, 3)</code> and the last row of this table stops being an error and becomes nine wrong numbers instead &mdash; which is Concept 2.",
                 ar: "ثلاثةٌ من هذه هي البثّ كلّه عمليًّا: مقدار واحد وصفّ وعمود. والرابع هو ما ستكتبه بالصدفة، وهو يرفع خطأً فورًا على جدول <code>(3, 4)</code>. وبدّل الجدول إلى <code>(3, 3)</code> يكفّ الصفّ الأخير عن كونه خطأً ويصبح تسعة أعداد خاطئة بدلًا من ذلك &mdash; وذلك هو المفهوم 2." }
    },
    {
      id: "t12q7", type: "order", level: "medium", topics: ["broadcast-rule"],
      q: { en: "Put the shape check in the order NumPy performs it for <code>(3, 3) - (3,)</code>.",
           ar: "رتّب فحص الشكل بالترتيب الذي تنفّذه به نمباي لـ <code>(3, 3) - (3,)</code>." },
      items: [
        { en: "Write the two shapes one above the other, aligned <strong>at the right-hand end</strong>.", ar: "اكتب الشكلين أحدهما فوق الآخر محاذَين <strong>من الطرف الأيمن</strong>." },
        { en: "Any dimension the shorter shape does not have is treated as 1.", ar: "أي بُعد لا يملكه الشكل الأقصر يُعدّ 1." },
        { en: "Check each column: the pair fits if the two are equal, or if one of them is 1.", ar: "افحص كل عمود: يَنطبق الزوج إن تساويا أو كان أحدهما 1." },
        { en: "If any column fits neither way, raise <code>ValueError</code> quoting both shapes.", ar: "إن لم ينطبق عمود بأي من الوجهين فارفع <code>ValueError</code> مقتبسًا الشكلين." },
        { en: "Each dimension of the result is the larger of its pair, and the side that was 1 is repeated to fill it.", ar: "كل بُعد في النتيجة هو الأكبر في زوجه، والطرف الذي كان 1 يُعاد لِيملأه." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "The order is the point: alignment happens before any comparison, which is why you can never answer a broadcasting question by looking at the two shapes left to right. Step 5 also tells you the cost &mdash; the repeated side is not actually copied into memory, NumPy just re-reads the same number, which is why broadcasting is free as well as short.",
                 ar: "الترتيب هو المقصود: فالمحاذاة تحدث قبل أي مقارنة، ولذلك لا تستطيع أبدًا أن تجيب سؤال بثٍّ بالنظر إلى الشكلين من اليسار إلى اليمين. والخطوة 5 تخبرك بالكلفة أيضًا &mdash; فالطرف المُعاد لا يُنسخ في الذاكرة فعلًا، بل تعيد نمباي قراءة العدد نفسه، ولذلك كان البثّ مجانيًا وقصيرًا معًا." }
    },
    {
      id: "t12q8", type: "error", level: "medium", topics: ["newaxis", "broadcast-trap"],
      q: { en: "Each patient's four readings should be centred on <em>that patient's own</em> average. Nothing raises and every number is wrong. Click the line to change.",
           ar: "ينبغي أن تُمركَز قراءات كل مريض الأربع على متوسط <em>ذلك المريض نفسه</em>. ولا شيء يرفع خطأً وكل عدد خاطئ. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\nreadings = np.array([[120., 124., 118., 122.],\n                     [130., 128., 134., 132.],\n                     [110., 114., 112., 116.],\n                     [140., 138., 142., 136.]])\n\npatient_mean = readings.mean(axis=1)\ncentred = readings - patient_mean[None, :]\n\nprint(centred[0])",
      answer: 9,
      explain: { en: "<code>[None, :]</code> adds the new dimension at the <em>front</em>, giving <code>(1, 4)</code>: a row, reused down the rows. So patient 1's average was subtracted from everybody's first reading. <code>[:, None]</code> adds it at the end, giving <code>(4, 1)</code>: a column, one number per row. The two differ by where the <code>None</code> sits, and the table is square so neither raises. Line 8 is correct as written &mdash; <code>axis=1</code> really is the per-patient average; only its shape needed saying out loud.",
                 ar: "<code>[None, :]</code> تضيف البُعد الجديد في <em>المقدّمة</em> فتعطي <code>(1, 4)</code>: صفًّا يُعاد في الصفوف. فطُرح متوسط المريض 1 من أول قراءة لكل الناس. و<code>[:, None]</code> تضيفه في النهاية فتعطي <code>(4, 1)</code>: عمودًا بعدد واحد لكل صفّ. ويختلف الاثنان بموضع <code>None</code>، والجدول مربّع فلا يرفع أيٌّ منهما خطأً. والسطر 8 صحيح كما كُتب &mdash; فـ <code>axis=1</code> هو متوسط المريض فعلًا؛ وشكله وحده احتاج أن يُقال جهرًا." },
      solution: { code: "centred = readings - patient_mean[:, None]" }
    },
    {
      id: "t12q9", type: "compare", level: "hard", topics: ["broadcast-trap", "newaxis"],
      q: { en: "One keyword apart, on a square table. What is the difference?",
           ar: "كلمةٌ مفتاحية واحدة فرقٌ بينهما على جدول مربّع. فما الفرق؟" },
      codeA: "marks = np.array([[40., 55., 70.],\n                  [60., 65., 90.],\n                  [80., 75., 50.]])\n\nprint(marks - marks.mean(axis=1))",
      codeB: "marks = np.array([[40., 55., 70.],\n                  [60., 65., 90.],\n                  [80., 75., 50.]])\n\nprint(marks - marks.mean(axis=1, keepdims=True))",
      options: [
        { en: "Both print a 3&times;3 table of plausible numbers, but only B centres each student. A's average is shaped <code>(3,)</code>, so it is spread across the columns and every value is a subtraction between a mark and some other student's average; <code>keepdims=True</code> keeps the shape at <code>(3, 1)</code>, which is one number per row.",
          ar: "يطبع كلاهما جدولًا 3&times;3 من أعداد معقولة، لكن B وحده يُمركز كل طالب. فمتوسط A شكله <code>(3,)</code> فيُفرَش على الأعمدة وكل قيمة طرحٌ بين علامة ومتوسط طالب آخر؛ أما <code>keepdims=True</code> فيُبقي الشكل <code>(3, 1)</code> وهو عدد واحد لكل صفّ." },
        { en: "They print the same numbers; <code>keepdims</code> only affects how the result is displayed.",
          ar: "يطبعان الأعداد نفسها؛ و<code>keepdims</code> يؤثر في طريقة عرض النتيجة فقط." },
        { en: "A raises <code>ValueError</code> and B works.",
          ar: "A يرفع <code>ValueError</code> وB يعمل." },
        { en: "A's numbers are B's numbers transposed, so either will do if you read the result the right way round.",
          ar: "أعداد A هي أعداد B منقولةً، فأيٌّ منهما يكفي إن قرأت النتيجة بالاتجاه الصحيح." }
      ],
      answer: 0,
      explain: { en: "The answer that calls A a transposed B is the one worth refuting precisely: A is not a transposed B, it is arithmetic between quantities that have nothing to do with each other, and no rearrangement recovers the intended result. Check one value &mdash; B's first row is &minus;15, 0, +15 around an average of 55, which is a student compared with themselves; A's first row is &minus;15, &minus;16.67, +1.67, where 55 had student 2's average taken off it. The reason A does not raise is that the table is square: both readings of <code>(3,)</code> fit the rule.",
                 ar: "والجوابُ الذي يسمّي A نقلًا لـ B جديرٌ بالدحض بدقة: فـ A ليس B منقولًا، بل حسابٌ بين مقادير لا علاقة لأحدها بالآخر، ولا إعادة ترتيب تستعيد النتيجة المقصودة. افحص قيمة واحدة &mdash; فالصفّ الأول في B هو &minus;15 و0 و+15 حول متوسط 55، وذلك طالبٌ قُورن بنفسه؛ والصفّ الأول في A هو &minus;15 و&minus;16.67 و+1.67 حيث طُرح من 55 متوسطُ الطالب 2. وسببُ ألّا يرفع A خطأً أن الجدول مربّع: فقراءتا <code>(3,)</code> كلتاهما تنطبقان على القاعدة." }
    },
    {
      id: "t12q10", type: "multi", level: "hard", topics: ["broadcast-rule", "broadcast-shapes"],
      q: { en: "A table has shape <code>(5, 3)</code>. Select <strong>every</strong> operand that can be added to it without an error.",
           ar: "جدولٌ شكله <code>(5, 3)</code>. اختر <strong>كل</strong> مُعامل يمكن إضافته إليه بلا خطأ." },
      options: [
        { en: "A plain number, <code>1.0</code>", ar: "عددٌ مجرّد، <code>1.0</code>" },
        { en: "Shape <code>(3,)</code>", ar: "الشكل <code>(3,)</code>" },
        { en: "Shape <code>(5,)</code>", ar: "الشكل <code>(5,)</code>" },
        { en: "Shape <code>(5, 1)</code>", ar: "الشكل <code>(5, 1)</code>" },
        { en: "Shape <code>(1, 3)</code>", ar: "الشكل <code>(1, 3)</code>" },
        { en: "Shape <code>(3, 1)</code>", ar: "الشكل <code>(3, 1)</code>" }
      ],
      answer: [0, 1, 3, 4],
      explain: { en: "Right-align each one and read down. <code>(3,)</code> pairs 3 with 3 and the 5 is kept: one number per column. <code>(5, 1)</code> pairs 1 with 3 and 5 with 5: one number per row. <code>(1, 3)</code> is the same as <code>(3,)</code> in effect, with the row dimension written out rather than left absent. <code>(5,)</code> fails because the 5 lands under the 3 columns, and <code>(3, 1)</code> fails because the 1 stretches but 3 and 5 cannot meet. The pattern: with five rows and three columns, a per-row quantity must be written as a column, <code>(5, 1)</code>, never as <code>(5,)</code>.",
                 ar: "حاذِ كلًّا منها يمينًا واقرأ نزولًا. فـ <code>(3,)</code> تزاوج 3 مع 3 وتُستبقى الـ 5: عددٌ لكل عمود. و<code>(5, 1)</code> تزاوج 1 مع 3 و5 مع 5: عددٌ لكل صفّ. و<code>(1, 3)</code> كـ <code>(3,)</code> في الأثر، ببُعد الصفوف مكتوبًا لا غائبًا. وتفشل <code>(5,)</code> لأن الـ 5 تهبط تحت الأعمدة الثلاثة، وتفشل <code>(3, 1)</code> لأن الـ 1 تتمدّد لكن 3 و5 لا تلتقيان. والنمط: بخمسة صفوف وثلاثة أعمدة، يجب أن يُكتب المقدار الذي لكل صفّ عمودًا <code>(5, 1)</code> لا <code>(5,)</code> أبدًا." }
    },
    {
      id: "t12q11", type: "trace", level: "hard", topics: ["newaxis", "broadcast-shapes"],
      q: { en: "Two students, three subjects, each subject weighted. State the shape at each point.",
           ar: "طالبان وثلاث مواد ولكل مادة وزن. حدّد الشكل عند كل موضع." },
      code: "weights = np.array([0.5, 1.0, 2.0])\nscores = np.array([[10., 20., 30.],\n                   [40., 50., 60.]])\n\nstep1 = scores * weights\ntotal = step1.sum(axis=1)\nshare = step1 / total[:, None]",
      blanks: [
        { accept: ["(2, 3)", "(2,3)"], label: { en: "<code>step1.shape</code>", ar: "<code>step1.shape</code>" } },
        { accept: ["(2,)", "(2, )"], label: { en: "<code>total.shape</code>", ar: "<code>total.shape</code>" } },
        { accept: ["(2, 1)", "(2,1)"], label: { en: "<code>total[:, None].shape</code>", ar: "<code>total[:, None].shape</code>" } },
        { accept: ["(2, 3)", "(2,3)"], label: { en: "<code>share.shape</code>", ar: "<code>share.shape</code>" } }
      ],
      explain: { en: "<code>weights</code> is <code>(3,)</code>, one per column, so <code>step1</code> keeps the table's shape. <code>sum(axis=1)</code> collapses the columns and leaves <code>(2,)</code> &mdash; one total per student &mdash; which is the shape that must not be divided into the table directly. Writing <code>step1 / total</code> instead pairs the 3 columns against the 2 totals and raises <code>ValueError</code> &mdash; and that is luck, not skill: the table happens to be 2&times;3, so the mistake is caught. Make it 3&times;3 and the same line would run and return nonsense.",
                 ar: "<code>weights</code> شكله <code>(3,)</code> عددٌ لكل عمود، فيُبقي <code>step1</code> شكل الجدول. و<code>sum(axis=1)</code> يُطبق الأعمدة ويترك <code>(2,)</code> &mdash; مجموعٌ لكل طالب &mdash; وهو الشكل الذي لا يجوز أن يُقسَم في الجدول مباشرة. ولاحظ أن <code>step1 / total</code> هنا يزاوج 3 مع 2 فيرفع خطأً. وذلك حظٌّ: فالجدول 2&times;3 فيُلتقط الخطأ. ولو كان 3&times;3 لما التُقط." }
    },
    {
      id: "t12q12", type: "complete", level: "hard", topics: ["newaxis", "broadcast-trap"],
      q: { en: "Turn each row of counts into shares of that row's total, so every row sums to 1. Which line?",
           ar: "حوّل كل صفّ من الأعداد إلى نِسَب من مجموع ذلك الصفّ، فيكون مجموع كل صفّ 1. فأي سطر؟" },
      code: "counts = np.array([[2., 2., 4.],\n                   [1., 0., 1.],\n                   [5., 3., 2.]])\n\n# which line?\n\nprint(share)\nprint(share.sum(axis=1))   # must be [1. 1. 1.]",
      options: [
        { code: "share = counts / counts.sum(axis=1, keepdims=True)" },
        { code: "share = counts / counts.sum(axis=1)" },
        { code: "share = counts / counts.sum(axis=0)" },
        { code: "share = counts / counts.sum()" }
      ],
      answer: 0,
      explain: { en: "The table is square, so the version without <code>keepdims</code> runs happily and prints a table whose rows sum to 1.65, 0.225 and 2.325 &mdash; it divided each <em>column</em> by a row total. The third divides by the column totals, which is a real operation but a different one. The fourth divides by the grand total of 20, giving shares of the whole table rather than of each row. Only the first says \"per row\" in its shape, and it says it at the moment the dimension would have been dropped rather than putting it back afterwards with <code>[:, None]</code>.",
                 ar: "الجدول مربّع، فتعمل النسخةُ بلا <code>keepdims</code> بسلاسة وتطبع جدولًا مجاميع صفوفه 1.65 و0.225 و2.325 &mdash; فقد قسم كل <em>عمود</em> على مجموع صفّ. والثالث يقسم على مجاميع الأعمدة، وهو عملية حقيقية لكنها أخرى. والرابع يقسم على المجموع الكلي 20 فيعطي نِسَبًا من الجدول كله لا من كل صفّ. والأول وحده يقول «لكل صفّ» في شكله، ويقوله لحظةَ كان البُعد سيُسقَط لا بإعادته لاحقًا بـ <code>[:, None]</code>." }
    }
  ]
};
