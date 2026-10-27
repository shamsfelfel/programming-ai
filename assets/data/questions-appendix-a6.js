/* ============================================================
   Appendix A6 self-check — vectors and matrices.
   Not examined anywhere (docs/SPEC.md §0, rule 3).
   Every output below was produced by running the snippet.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["appendix-a6"] = {
  title: { en: "Self-check — A6", ar: "فحص ذاتي — A6" },
  intro: {
    en: "Ten questions on this page only. <strong>Not examined</strong> &mdash; no lesson or chapter test asks about any of it, and a student who skipped this appendix can still pass everything.",
    ar: "عشرة أسئلة على هذه الصفحة وحدها. <strong>غير ممتحَن فيها</strong> &mdash; فلا اختبار درس ولا اختبار فصل يسأل عن شيء منها، والطالب الذي تخطّى هذا الملحق يستطيع مع ذلك النجاح في كل شيء."
  },
  questions: [
    {
      id: "a6q1", type: "mcq", level: "easy", topics: ["la-vector"],
      q: { en: "A clinic records one patient as <code>np.array([172, 68, 37.2])</code> &mdash; height, weight, temperature. Which statement is true?",
           ar: "عيادةٌ تسجّل مريضًا واحدًا هكذا <code>np.array([172, 68, 37.2])</code> &mdash; الطول والوزن ودرجة الحرارة. فأيُّ عبارةٍ صحيحة؟" },
      options: [
        { en: "It is a feature vector of dimension 3: one entry per feature, and the order is what says which entry is the temperature.",
          ar: "هو متجه سماتٍ بُعدُه 3: مدخلةٌ لكل سمة، والترتيبُ هو ما يقول أيُّ مدخلةٍ هي درجة الحرارة." },
        { en: "It is not a vector, because the three numbers are measured in different units and so cannot belong to one list.",
          ar: "ليس متجهًا، لأن الأعداد الثلاثة مقيسةٌ بوحداتٍ مختلفة فلا يمكن أن تنتمي إلى قائمةٍ واحدة." },
        { en: "It is a vector only if the entries are sorted, since a vector is an ordered list.",
          ar: "هو متجهٌ فقط إن كانت المدخلات مرتَّبةً تصاعديًا، إذ المتجه قائمةٌ مرتَّبة." },
        { en: "It is a 3&times;1 matrix, because NumPy stores every vector as a column.",
          ar: "هو مصفوفةٌ 3&times;1، لأن نمباي تخزّن كل متجه عمودًا." }
      ],
      answer: 0,
      explain: { en: "A vector is just a list of numbers in a fixed order where the order means something &mdash; there is no requirement that the entries be comparable, and in machine learning they almost never are. The answer that demands sorted entries mishears the word \"ordered\": it means the positions are fixed, not that the values increase. The fourth is the useful one to settle now: <code>.shape</code> here is <code>(3,)</code>, not <code>(3, 1)</code>, so a NumPy vector is neither a row nor a column until something makes it one.",
                 ar: "المتجه مجرّدُ قائمةِ أعدادٍ بترتيب ثابت والترتيبُ فيها يعني شيئًا &mdash; ولا يُشترط أن تكون المدخلات قابلةً للمقارنة، وهي في تعلّم الآلة ليست كذلك أبدًا تقريبًا. والجوابُ الذي يشترط ترتيب المدخلات يُسيء سمْعَ كلمة «مرتَّبة»: فهي تعني أن المواضع ثابتة، لا أن القيم متزايدة. والرابع يستحق الحسم الآن: فـ <code>.shape</code> هنا <code>(3,)</code> لا <code>(3, 1)</code>، فمتجهُ نمباي ليس صفًّا ولا عمودًا حتى يجعله شيءٌ أحدَهما." }
    },
    {
      id: "a6q2", type: "output", level: "easy", topics: ["la-dot"],
      q: { en: "Write the one line this prints.", ar: "اكتب السطر الذي يطبعه." },
      code: "import numpy as np\n\nmarks   = np.array([72, 65, 90])\nweights = np.array([2, 3, 5])\nprint(marks @ weights)",
      blanks: [{ accept: ["789"], lines: 1 }],
      explain: { en: "Multiply pairwise, then add: 144 + 195 + 450. The second half is the half people forget &mdash; <code>marks * weights</code> would print <code>[144 195 450]</code> and never add them up. Read the answer as a weighted total: 789 out of ten parts of weight is a mark of 78.9.",
                 ar: "اضرب أزواجًا ثم اجمع: 144 + 195 + 450. والنصفُ الثاني هو ما ينساه الناس &mdash; فـ <code>marks * weights</code> تطبع <code>[144 195 450]</code> ولا تجمعها أبدًا. واقرأ الجواب مجموعًا موزونًا: 789 على عشرة أجزاء وزنٍ تعني علامة 78.9." }
    },
    {
      id: "a6q3", type: "tf", level: "easy", topics: ["la-transpose"],
      q: { en: "For a one-dimensional NumPy array <code>v</code>, <code>v.T</code> gives back exactly <code>v</code> &mdash; the same values and the same shape.",
           ar: "للمصفوفة ذات البُعد الواحد <code>v</code> في نمباي، تردّ <code>v.T</code> نفسَ <code>v</code> بالضبط &mdash; القيمُ نفسها والشكلُ نفسه." },
      truth: true,
      explain: { en: "Transposing swaps axes, and a 1-D array has only one axis, so there is nothing to swap. It does not raise and it does not warn, which is why it bites: code written to turn a vector into a column with <code>.T</code> runs perfectly and changes nothing. If you really need a column, say so: <code>v[:, None]</code> gives shape <code>(3, 1)</code>.",
                 ar: "النقلُ يُبادل المحاور، وللمصفوفة ذات البُعد الواحد محورٌ واحد، فلا شيء يُبادَل. ولا ترفع خطأً ولا تحذّر، ولهذا تَعضّ: فالكودُ المكتوب ليحوّل متجهًا إلى عمودٍ بـ <code>.T</code> يعمل تمامًا ولا يغيّر شيئًا. فإن احتجتَ عمودًا حقًّا فقُلها: <code>v[:, None]</code> تعطي الشكل <code>(3, 1)</code>." }
    },
    {
      id: "a6q4", type: "trace", level: "medium", topics: ["la-scale", "la-vector", "la-dot"],
      q: { en: "State the value of each name at the end.", ar: "حدّد قيمة كل اسم في النهاية." },
      code: "marks = np.array([72, 65, 90])\nbonus = np.array([3, 5, 0])\n\na = marks + bonus\nb = 2 * marks\nc = marks @ bonus\nd = (marks + bonus).shape",
      blanks: [
        { accept: ["[75 70 90]", "[75, 70, 90]"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["[144 130 180]", "[144, 130, 180]"], label: { en: "<code>b</code>", ar: "<code>b</code>" } },
        { accept: ["541"], label: { en: "<code>c</code>", ar: "<code>c</code>" } },
        { accept: ["(3,)", "(3, )"], label: { en: "<code>d</code>", ar: "<code>d</code>" } }
      ],
      explain: { en: "<code>a</code> and <code>b</code> are the two operations of A6.2: adding is entry by entry, scaling multiplies every entry by the one number. <code>c</code> is the one that changes kind: 72&times;3 + 65&times;5 + 90&times;0 = 216 + 325 + 0, and three numbers against three numbers gave <em>one</em> number, because the dot product adds after it multiplies. <code>d</code> is a reminder that adding and scaling never change the shape &mdash; only <code>@</code> does that.",
                 ar: "<code>a</code> و<code>b</code> هما عمليّتا A6.2: فالجمعُ مدخلةً مدخلةً، والضربُ في عددٍ يضرب كل مدخلة في ذلك العدد الواحد. و<code>c</code> هي التي تغيّر الجنس: 72&times;3 + 65&times;5 + 90&times;0 = 216 + 325 + 0، وثلاثةُ أعداد في مقابل ثلاثة أعطت عددًا <em>واحدًا</em>، لأن الجَداء القياسي يجمع بعد أن يضرب. و<code>d</code> تذكيرٌ بأن الجمع والضرب في عددٍ لا يغيّران الشكل أبدًا &mdash; وإنما تفعل ذلك <code>@</code> وحدها." }
    },
    {
      id: "a6q5", type: "fill", level: "medium", topics: ["la-norm"],
      q: { en: "Fill the two calls that produce these outputs.", ar: "أكمل النداءين اللذين يُنتجان هذين المخرجين." },
      code: "amal = np.array([72, 65, 90])\nbadr = np.array([70, 60, 88])\n\nprint(____1____)   # 5.0        the length of the arrow (3, 4)\nprint(____2____)   # 5.744...   how far apart Amal and Badr are",
      blanks: [
        { accept: ["np.linalg.norm(np.array([3, 4]))", "np.linalg.norm(np.array([3,4]))", "np.linalg.norm([3, 4])", "np.linalg.norm([3,4])"],
          label: { en: "a length", ar: "طول" } },
        { accept: ["np.linalg.norm(amal - badr)", "np.linalg.norm(amal-badr)", "np.linalg.norm(badr - amal)", "np.linalg.norm(badr-amal)"],
          label: { en: "a distance", ar: "مسافة" } }
      ],
      explain: { en: "There is only one function here, used twice: a distance <em>is</em> the length of a difference, &#8214;a &minus; b&#8214;. Amal minus Badr is (2, 5, 2), so the answer is &radic;(4 + 25 + 4) = &radic;33. Note that <code>norm(badr - amal)</code> gives the same number &mdash; squaring throws the signs away, which is exactly why this measures distance rather than direction.",
                 ar: "وهنا دالةٌ واحدة فقط مستعملةٌ مرتين: فالمسافةُ <em>هي</em> طولُ الفرق، &#8214;a &minus; b&#8214;. فأمل ناقص بدر هو (2, 5, 2)، فالجوابُ &radic;(4 + 25 + 4) = &radic;33. ولاحظ أن <code>norm(badr - amal)</code> تعطي العدد نفسه &mdash; فالتربيعُ يرمي الإشارات، ولهذا بالضبط كان هذا يقيس المسافة لا الاتجاه." }
    },
    {
      id: "a6q6", type: "complete", level: "medium", topics: ["la-matmul", "la-matrix"],
      q: { en: "Turn the design matrix into one weighted mark per student, out of 10. Which line?",
           ar: "حوّل مصفوفة التصميم إلى علامةٍ موزونة واحدة لكل طالب، على 10. فأيُّ سطر؟" },
      code: "X = np.array([[72, 65, 90],\n              [60, 70, 80],\n              [88, 91, 95],\n              [45, 52, 50]])\nw = np.array([2, 3, 5])\n\n# which line?\n\nprint(total)   # must be [78.9 73.  92.4 49.6]",
      options: [
        { code: "total = (X @ w) / 10" },
        { code: "total = (w @ X) / 10" },
        { code: "total = (X * w) / 10" },
        { code: "total = (X * w).sum(axis=0) / 10" }
      ],
      answer: 0,
      explain: { en: "Shapes decide it before any arithmetic does: <code>(4, 3) @ (3,)</code> matches on the inner 3 and leaves <code>(4,)</code> &mdash; one number per student. The version that writes <code>w @ X</code> reverses the operands, and <code>(3,) @ (4, 3)</code> has an inner pair of 3 and 4, so it raises <code>ValueError</code>; matrix multiplication is not symmetric. The third is the classic: <code>X * w</code> multiplies and never adds, so it prints a (4, 3) table of twelve numbers. The fourth does add, but down the wrong <a href=\"#l13-h1\">axis</a> &mdash; <code>axis=0</code> collapses the students and leaves three numbers, one per paper.",
                 ar: "الأشكالُ تحكم قبل أي حساب: فـ <code>(4, 3) @ (3,)</code> يتوافق عند الثلاثة الداخلية ويترك <code>(4,)</code> &mdash; عددٌ واحد لكل طالب. والنسخةُ التي تكتب <code>w @ X</code> تعكس المُعاملين، و<code>(3,) @ (4, 3)</code> زوجُه الداخلي 3 و4، فيرفع <code>ValueError</code>؛ فضربُ المصفوفات ليس تبادليًّا. والثالث هو الكلاسيكي: فـ <code>X * w</code> تضرب ولا تجمع أبدًا، فتطبع جدولًا (4, 3) من اثني عشر عددًا. والرابع يجمع فعلًا لكن على <a href=\"#l13-h1\">المحور</a> الخطأ &mdash; فـ <code>axis=0</code> يُطبق الطلاب ويترك ثلاثة أعداد، واحدًا لكل ورقة." }
    },
    {
      id: "a6q7", type: "match", level: "medium", topics: ["la-matmul", "la-transpose"],
      q: { en: "<code>X</code> has shape <code>(4, 3)</code> and <code>w</code> has shape <code>(3,)</code>. Match each expression to the shape it gives.",
           ar: "<code>X</code> شكلُه <code>(4, 3)</code> و<code>w</code> شكلُه <code>(3,)</code>. وصّل كل تعبير بالشكل الذي يعطيه." },
      leftHead: { en: "Expression", ar: "التعبير" },
      rightHead: { en: "Shape of the result", ar: "شكل الناتج" },
      pairs: [
        { l: { code: "X.T.shape" }, r: { en: "<code>(3, 4)</code> &mdash; rows and columns swapped, same numbers.", ar: "<code>(3, 4)</code> &mdash; تبادلت الصفوف والأعمدة والأعدادُ هي نفسها." } },
        { l: { code: "(X @ w).shape" }, r: { en: "<code>(4,)</code> &mdash; the inner 3s vanished, the outer 4 survived: one number per sample.", ar: "<code>(4,)</code> &mdash; اختفت الثلاثتان الداخليتان وبقي الأربعة الخارجي: عددٌ واحد لكل عيّنة." } },
        { l: { code: "(X.T @ X).shape" }, r: { en: "<code>(3, 3)</code> &mdash; <code>(3, 4) @ (4, 3)</code>: one row and one column per feature.", ar: "<code>(3, 3)</code> &mdash; <code>(3, 4) @ (4, 3)</code>: صفٌّ وعمودٌ لكل سمة." } },
        { l: { code: "X @ X" }, r: { en: "No shape at all &mdash; a <code>ValueError</code>, because the inner pair is 3 and 4.", ar: "لا شكل إطلاقًا &mdash; بل <code>ValueError</code>، لأن الزوج الداخلي 3 و4." } }
      ],
      explain: { en: "All four are the one rule from Figure A6.3, read in different directions: <code>(m, n) @ (n, p)</code> gives <code>(m, p)</code>, the inner pair must agree and then disappears, the outer pair survives. The last two rows together are why the transpose is on almost every line of real linear-algebra code: X<sup>T</sup>X exists and XX does not, and the only job the transpose did was to make the inner numbers agree.",
                 ar: "الأربعة كلُّها هي القاعدةُ الواحدة من الشكل A6.3 مقروءةً بجهاتٍ مختلفة: فـ <code>(m, n) @ (n, p)</code> يعطي <code>(m, p)</code>، والزوجُ الداخلي يجب أن يتوافق ثم يختفي، والخارجيُّ يبقى. والصفّان الأخيران معًا هما السببُ في أن المنقول في كل سطر من كود الجبر الخطّي الحقيقي تقريبًا: فـ X<sup>T</sup>X موجودة وXX ليست موجودة، وكلُّ ما فعله المنقول أنه جعل العددين الداخليين يتوافقان." }
    },
    {
      id: "a6q8", type: "error", level: "medium", topics: ["la-transpose", "la-matmul"],
      q: { en: "This should print one weighted mark per student. Click the line to change.",
           ar: "ينبغي أن يطبع هذا علامةً موزونة واحدة لكل طالب. انقر السطر الذي يجب تغييره." },
      code: "X = np.array([[72, 65, 90],\n              [60, 70, 80],\n              [88, 91, 95],\n              [45, 52, 50]])\n\nw = np.array([2, 3, 5])\n\ntotal = X.T @ w\n\nprint(total / 10)",
      answer: 8,
      explain: { en: "<code>X</code> is <code>(4, 3)</code> and <code>w</code> is <code>(3,)</code>, which already match on the inner 3 &mdash; so line 8 should be <code>X @ w</code> and the transpose is the whole bug. <code>X.T</code> is <code>(3, 4)</code>, whose inner number is 4, and the message is <code>ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0 ... (size 3 is different from 4)</code>. The habit to form is to read the two shapes before reaching for <code>.T</code>: a transpose is a repair for shapes that do not line up, and adding one to shapes that already line up breaks them.",
                 ar: "<code>X</code> شكلُه <code>(4, 3)</code> و<code>w</code> شكلُه <code>(3,)</code>، وهما متوافقان أصلًا عند الثلاثة الداخلية &mdash; فالسطر 8 ينبغي أن يكون <code>X @ w</code>، والمنقولُ هو الخللُ كلُّه. فـ <code>X.T</code> شكلُه <code>(3, 4)</code> وعددُه الداخلي 4، والرسالةُ <code>ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0 ... (size 3 is different from 4)</code>. والعادةُ أن تقرأ الشكلين قبل أن تمدّ يدك إلى <code>.T</code>: فالمنقولُ إصلاحٌ لأشكالٍ لا تتحاذى، وإضافتُه إلى أشكالٍ متحاذيةٍ أصلًا تكسرها." },
      solution: { code: "total = X @ w" }
    },
    {
      id: "a6q9", type: "compare", level: "hard", topics: ["la-inverse"],
      q: { en: "Both print <code>[2. 1.]</code>. What is the difference that matters?", ar: "كلاهما يطبع <code>[2. 1.]</code>. فما الفرق الذي يَهُمّ؟" },
      codeA: "A = np.array([[2., 1.],\n              [1., 1.]])\nb = np.array([5., 3.])\n\nx = np.linalg.inv(A) @ b\nprint(x)",
      codeB: "A = np.array([[2., 1.],\n              [1., 1.]])\nb = np.array([5., 3.])\n\nx = np.linalg.solve(A, b)\nprint(x)",
      options: [
        { en: "None on this 2&times;2, but A builds a whole inverse matrix it then throws away, which costs more arithmetic and one extra round of rounding; B is the line to write every time.",
          ar: "لا فرق على هذه 2&times;2، لكن A يبني مصفوفةَ معكوسٍ كاملة ثم يرميها، وذلك يكلّف حسابًا أكثر وجولةَ تقريبٍ زائدة؛ وB هو السطرُ الذي يُكتب في كل مرة." },
        { en: "A is the correct one, because <code>solve</code> only works when the matrix is symmetric.",
          ar: "A هو الصحيح، لأن <code>solve</code> لا تعمل إلا إذا كانت المصفوفة متماثلة." },
        { en: "B is faster but approximate; A gives the exact answer because it follows the definition x = A<sup>&minus;1</sup>b.",
          ar: "B أسرع لكنه تقريبي؛ وA يعطي الجواب الدقيق لأنه يتبع التعريف x = A<sup>&minus;1</sup>b." },
        { en: "No difference at all &mdash; <code>np.linalg.solve</code> computes the inverse internally and then multiplies.",
          ar: "لا فرق إطلاقًا &mdash; فـ <code>np.linalg.solve</code> تحسب المعكوس داخليًّا ثم تضرب." }
      ],
      answer: 0,
      explain: { en: "The answer that calls the inverse route exact has the reasoning exactly backwards, and that inversion is the point: following the definition is what makes A <em>less</em> accurate, because <code>inv(A)</code> is itself computed in rounded arithmetic and you then multiply by those rounded numbers. On a deliberately awkward 12&times;12 matrix the inverse route lands about twenty times further from the true answer. The claim that <code>solve</code> inverts internally would make the choice meaningless, and is worth rejecting for the right reason: <code>solve</code> never forms the inverse at all. The habit: if you are about to write <code>inv(A) @ b</code>, write <code>solve(A, b)</code>.",
                 ar: "والجوابُ الذي يسمّي طريقَ المعكوس دقيقًا يقلب الاستدلال تمامًا، وذلك القلبُ هو المقصود: فاتّباعُ التعريف هو ما يجعل A <em>أقلَّ</em> دقة، لأن <code>inv(A)</code> نفسها محسوبةٌ بحسابٍ مقرَّب ثم تضرب أنت في تلك الأعداد المقرَّبة. وعلى مصفوفةٍ 12&times;12 عَصيّةٍ بالتصميم يحلّ طريقُ المعكوس أبعدَ نحوَ عشرين مرة عن الجواب الحقيقي. والقولُ بأن <code>solve</code> تحسب المعكوس داخليًّا يُفرغ الاختيار من معناه، ويستحق الرفض للسبب الصحيح: فـ <code>solve</code> لا تُشكّل المعكوس إطلاقًا. والعادة: إن كنتَ على وشك كتابة <code>inv(A) @ b</code> فاكتب <code>solve(A, b)</code>." }
    },
    {
      id: "a6q10", type: "mcq", level: "hard", topics: ["la-rank", "la-inverse"],
      q: { en: "A length was recorded twice, once in metres and once in centimetres, so one column of <code>A</code> is exactly 100 times another. <code>A</code> is square. What happens when you call <code>np.linalg.solve(A, b)</code>?",
           ar: "طولٌ سُجّل مرتين، مرةً بالأمتار ومرةً بالسنتيمترات، فصار عمودٌ من <code>A</code> مئةَ أمثال عمودٍ آخر بالضبط. و<code>A</code> مربّعة. فماذا يحدث عند نداء <code>np.linalg.solve(A, b)</code>؟" },
      options: [
        { en: "It raises <code>numpy.linalg.LinAlgError: Singular matrix</code>. The duplicated column carries no new information, so the rank is less than the size and there is no single answer to return.",
          ar: "يرفع <code>numpy.linalg.LinAlgError: Singular matrix</code>. فالعمودُ المكرَّر لا يحمل معلومةً جديدة، فالرتبةُ أقلُّ من الحجم ولا جوابَ واحد يُردّ." },
        { en: "It returns an answer, because the two columns are in different units and are therefore different features.",
          ar: "يردّ جوابًا، لأن العمودين بوحدتين مختلفتين فهما إذن سمتان مختلفتان." },
        { en: "It returns one of the infinitely many answers, since NumPy picks the one closest to the origin.",
          ar: "يردّ واحدًا من الأجوبة اللانهائية، إذ تنتقي نمباي الأقربَ إلى نقطة الأصل." },
        { en: "It raises <code>ValueError</code>, the same error you get when two shapes do not line up.",
          ar: "يرفع <code>ValueError</code>، وهو الخطأ نفسه الذي تحصل عليه حين لا يتحاذى شكلان." }
      ],
      answer: 0,
      explain: { en: "The answer that leans on the columns' different units is the one that catches people with real data, because the two columns genuinely do look like different features: different name, different numbers, different unit. Rank does not care about names. It counts how many columns carry information the others did not, and multiplying by 100 adds none &mdash; so the rank is below the size and the matrix is singular. Expecting one of the infinitely many solutions describes something NumPy deliberately refuses to do: <code>solve</code> promises <em>the</em> answer and raises rather than quietly choose between infinitely many (<code>np.linalg.lstsq</code> is the function that will pick one, and Appendix A9 is why). The <code>ValueError</code> answer is worth separating out: a shape mismatch is a <code>ValueError</code>, while a matrix of the right shape that cannot be solved is a <code>LinAlgError</code> &mdash; two different errors for two different failures.",
                 ar: "والجوابُ الذي يستند إلى اختلاف وحدتَي العمودين هو ما يُسقط الناس مع البيانات الحقيقية، فالعمودان يبدوان سمتين مختلفتين فعلًا: اسمٌ مختلف وأعدادٌ مختلفة ووحدةٌ مختلفة. والرتبةُ لا تَعبأ بالأسماء. إنما تعدّ كم عمودًا يحمل معلومةً لم يحملها الباقي، والضربُ في 100 لا يضيف شيئًا &mdash; فالرتبةُ دون الحجم والمصفوفةُ شاذّة. وتوقّعُ واحدٍ من الأجوبة التي لا تُحصى يصف شيئًا تأباه نمباي عن قصد: فـ <code>solve</code> تَعِد بـ«الـ»جواب وترفع خطأً بدل أن تنتقي بصمتٍ من أجوبةٍ لا تُحصى (و<code>np.linalg.lstsq</code> هي الدالة التي تنتقي واحدًا، والملحق A9 هو السبب). وجوابُ <code>ValueError</code> يستحق الفصل: فعدمُ تحاذي الأشكال <code>ValueError</code>، أما المصفوفةُ ذات الشكل الصحيح التي لا تُحَلّ فـ <code>LinAlgError</code> &mdash; خطآن مختلفان لإخفاقين مختلفين." }
    }
  ]
};
