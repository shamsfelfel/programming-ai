/* ============================================================
   Appendix A5 self-check — reading mathematical notation.

   Not a test: nothing here is examined in a lesson or chapter
   test (docs/SPEC.md §0, rule 3). It exists so a reader can find
   out which symbol is still vague before a textbook uses it.

   Every printed value below was produced by running the snippet
   under NumPy 2.5.3, not reasoned about.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["appendix-a5"] = {
  title: { en: "Self-check — A5", ar: "فحص ذاتي — A5" },
  intro: {
    en: "Eight questions on this page only. <strong>Not examined</strong> &mdash; no lesson or chapter test asks about any of it. Use it to find the symbol you would still have to guess at.",
    ar: "ثمانية أسئلة على هذه الصفحة وحدها. <strong>غير ممتحَن فيها</strong> &mdash; فلا اختبار درس ولا اختبار فصل يسأل عن شيء منها. استعملها لتجد الرمز الذي ستبقى مضطرًا إلى تخمينه."
  },
  questions: [
    {
      id: "a5q1", type: "tf", level: "easy", topics: ["note-index"],
      q: { en: "A formula writes x<sub>3</sub>. In NumPy that value is <code>x[3]</code>.",
           ar: "تكتب صيغةٌ x<sub>3</sub>. وفي نمباي تلك القيمة هي <code>x[3]</code>." },
      truth: false,
      explain: { en: "It is <code>x[2]</code>: a subscript counts positions from one, an index counts offsets from zero, so the index is always one lower. This is worth its own question because <code>x[3]</code> is a perfectly legal expression in any array of four or more values &mdash; it quietly returns the fourth, your formula is wrong, and nothing anywhere raises an error.",
                 ar: "بل هي <code>x[2]</code>: فالدليل السفلي يعدّ المواضع من واحد، والدليل يعدّ الإزاحات من صفر، فالدليل أقلُّ دائمًا بواحد. ويستحق هذا سؤالًا خاصًّا لأن <code>x[3]</code> تعبيرٌ مشروع تمامًا في أي مصفوفة من أربع قيم أو أكثر &mdash; فيُعيد الرابعة بصمت، وتكون صيغتك خطأً، ولا شيء في أي مكان يرفع خطأً." }
    },
    {
      id: "a5q2", type: "mcq", level: "easy", topics: ["note-sigma"],
      q: { en: "<code>x</code> is a 1-D array of four marks. Which line is &Sigma; from i = 1 to n of x<sub>i</sub>?",
           ar: "<code>x</code> مصفوفةٌ أحادية البعد من أربع علامات. فأيُّ سطر هو &Sigma; من i = 1 إلى n لـx<sub>i</sub>؟" },
      options: [
        { en: "<code>x.sum()</code>", ar: "<code>x.sum()</code>" },
        { en: "<code>x.cumsum()</code>", ar: "<code>x.cumsum()</code>" },
        { en: "<code>x.prod()</code>", ar: "<code>x.prod()</code>" },
        { en: "<code>x.sum(axis=1)</code>", ar: "<code>x.sum(axis=1)</code>" }
      ],
      answer: 0,
      explain: { en: "Each wrong answer is wrong in a different way, which is why they are here. <code>cumsum</code> gives the running totals &mdash; <code>[ 62 137 185 276]</code> &mdash; so the number you wanted is in there, at the end, inside an array you did not ask for. <code>prod</code> multiplies instead of adding. <code>sum(axis=1)</code> asks for the second dimension of something that has one dimension, and raises <code>AxisError</code>; a &Sigma; over a flat array needs no axis at all.",
                 ar: "كلُّ جواب خطأ خطأٌ بوجه مختلف، ولهذا هي ههنا. فـ<code>cumsum</code> تعطي المجاميع المتراكمة &mdash; <code>[ 62 137 185 276]</code> &mdash; فالعدد الذي أردته موجود فيها، في آخرها، داخل مصفوفة لم تطلبها. و<code>prod</code> تضرب بدل أن تجمع. و<code>sum(axis=1)</code> تطلب البعد الثاني لشيء له بعدٌ واحد فترفع <code>AxisError</code>؛ والـ&Sigma; على مصفوفة مسطّحة لا تحتاج محورًا إطلاقًا." }
    },
    {
      id: "a5q3", type: "fill", level: "easy", topics: ["note-sigma"],
      q: { en: "Fill the blank so the line is &Sigma; a<sub>i</sub>b<sub>i</sub> &mdash; the products of the pairs, added up. It must print 32.0.",
           ar: "أكمل الفراغ ليكون السطر &Sigma; a<sub>i</sub>b<sub>i</sub> &mdash; أي حواصل الأزواج مجموعةً. ويجب أن يطبع 32.0." },
      code: "import numpy as np\n\na = np.array([1.0, 2.0, 3.0])\nb = np.array([4.0, 5.0, 6.0])\n\ntotal = ____1____\nprint(total)",
      blanks: [{ accept: ["(a * b).sum()", "(a*b).sum()", "np.sum(a * b)", "np.sum(a*b)", "a @ b", "a.dot(b)"],
                 label: { en: "blank 1", ar: "الفراغ 1" } }],
      explain: { en: "<code>a * b</code> is the three products <code>[ 4. 10. 18.]</code>, and <code>.sum()</code> adds them to 32.0. The brackets are the whole exam: <code>a.sum() * b.sum()</code> gives 90.0, because it adds each array first and then multiplies the two totals. Both run, both print a number, and only one of them is the formula.",
                 ar: "<code>a * b</code> هي الحواصل الثلاثة <code>[ 4. 10. 18.]</code>، و<code>.sum()</code> تجمعها إلى 32.0. والقوسان هما الامتحان كلُّه: فـ<code>a.sum() * b.sum()</code> تعطي 90.0، لأنها تجمع كل مصفوفة أولًا ثم تضرب المجموعين. وكلتاهما تُنفَّذ وتطبع عددًا، وواحدةٌ فقط هي الصيغة." }
    },
    {
      id: "a5q4", type: "multi", level: "medium", topics: ["note-vector"],
      q: { en: "Select <strong>every</strong> true statement about <code>x = np.array([1.0, 2.0, 3.0])</code>.",
           ar: "اختر <strong>كل</strong> عبارة صحيحة عن <code>x = np.array([1.0, 2.0, 3.0])</code>." },
      options: [
        { en: "<code>x.shape</code> is <code>(3,)</code> &mdash; one dimension, of length three.",
          ar: "<code>x.shape</code> هي <code>(3,)</code> &mdash; بعدٌ واحد طوله ثلاثة." },
        { en: "<code>print(x)</code> shows <code>[1. 2. 3.]</code>, flat and with no commas.",
          ar: "<code>print(x)</code> تُظهر <code>[1. 2. 3.]</code> مسطّحةً بلا فواصل." },
        { en: "<code>x.T</code> has exactly the same shape as <code>x</code>.",
          ar: "<code>x.T</code> لها شكل <code>x</code> نفسه بعينه." },
        { en: "<code>x</code> is a row, and <code>x[:, None]</code> is how you turn it back into a row after a transpose.",
          ar: "<code>x</code> صفٌّ، و<code>x[:, None]</code> هي كيف تعيدها صفًّا بعد النقل." }
      ],
      answer: [0, 1, 2],
      explain: { en: "The first three are the same fact said three ways: a 1-D array has no row or column nature, so there is nothing for <code>.T</code> to exchange. The fourth is the misconception the section exists to remove &mdash; and note the two separate errors in it: <code>x</code> is not a row to begin with, and <code>[:, None]</code> produces a <em>column</em>, of shape <code>(3, 1)</code>.",
                 ar: "الثلاثة الأولى حقيقةٌ واحدة قيلت بثلاث صيغ: فالمصفوفة أحادية البعد ليست صفًّا ولا عمودًا، فليس لـ<code>.T</code> ما تبادله. والرابعة هي الوهم الذي وُجد القسم ليزيله &mdash; ولاحظ فيها خطأين منفصلين: فـ<code>x</code> ليست صفًّا من أصلها، و<code>[:, None]</code> تُنتج <em>عمودًا</em> شكله <code>(3, 1)</code>." }
    },
    {
      id: "a5q5", type: "match", level: "medium", topics: ["note-greek"],
      q: { en: "Match each letter to what it names.", ar: "وصّل كل حرف بما يسمّيه." },
      leftHead: { en: "Letter", ar: "الحرف" },
      rightHead: { en: "What it names", ar: "ما يسمّيه" },
      pairs: [
        { l: { en: "&alpha; (alpha)", ar: "&alpha; (ألفا)" },
          r: { en: "A small number you choose yourself before anything runs, such as the size of each learning step.",
               ar: "عددٌ صغير تختاره أنت قبل أن يُنفَّذ شيء، كحجم كل خطوة تعلّم." } },
        { l: { en: "&beta; (beta)", ar: "&beta; (بيتا)" },
          r: { en: "The numbers a model works out from the data, one for each input column.",
               ar: "الأعداد التي يستخرجها النموذج من البيانات، واحدٌ لكل عمود مدخل." } },
        { l: { en: "&mu; (mu)", ar: "&mu; (مو)" },
          r: { en: "A mean &mdash; the ordinary average of the values.",
               ar: "متوسطٌ &mdash; أي معدّل القيم المعتاد." } },
        { l: { en: "&sigma; (small sigma)", ar: "&sigma; (سيغما الصغيرة)" },
          r: { en: "A standard deviation &mdash; how spread out the values are around their mean.",
               ar: "انحرافٌ معياري &mdash; كم تتبدّد القيم حول متوسطها." } },
        { l: { en: "&Sigma; (capital sigma)", ar: "&Sigma; (سيغما الكبيرة)" },
          r: { en: "An instruction: add these up.", ar: "أمرٌ: اجمع هذه." } }
      ],
      explain: { en: "The last two are the pair to get right, and they share a name by accident of the alphabet, not by meaning: one is a measurement that sits inside an expression, the other is an order that stands in front of one. If you want a tell that survives a badly typeset page, look for an index tucked underneath &mdash; only the capital carries one.",
                 ar: "الأخيران هما الزوج الذي يجب إصابته، ويتشاركان الاسم بمحض الأبجدية لا بالمعنى: فأحدهما قياسٌ يجلس داخل التعبير، والآخر أمرٌ يقف أمامه. وإن أردت علامةً تصمد في صفحة سيئة الطبع فابحث عن دليل منطوٍ تحته &mdash; فالكبيرة وحدها تحمله." }
    },
    {
      id: "a5q6", type: "output", level: "medium", topics: ["note-matrix"],
      q: { en: "Two students, three papers. Write the two lines this prints.",
           ar: "طالبان وثلاث أوراق. اكتب السطرين اللذين يطبعهما." },
      code: "import numpy as np\n\nA = np.array([[62, 75, 48],\n              [80, 55, 90]])\n\nprint(A.shape)\nprint(A[1, 2])",
      blanks: [{ accept: ["(2, 3)\n90"], lines: 2 }],
      explain: { en: "Rows before columns, in both lines: the shape says two rows and three columns in that order, and <code>A[1, 2]</code> reads row 1 then column 2 &mdash; the second student's third paper. Reverse the habit once and you get 48 instead of 90, which is a real mark belonging to a real student, so no error appears.",
                 ar: "الصفوف قبل الأعمدة في السطرين: فالشكل يقول صفّين وثلاثة أعمدة بهذا الترتيب، و<code>A[1, 2]</code> تُقرأ الصفّ 1 ثم العمود 2 &mdash; أي ورقة الطالب الثاني الثالثة. واقلب العادة مرةً تحصل على 48 بدل 90، وهي علامةٌ حقيقية لطالب حقيقي، فلا يظهر خطأ." }
    },
    {
      id: "a5q7", type: "compare", level: "hard", topics: ["note-sigma", "note-table"],
      q: { en: "Both lines claim to be &Sigma; a<sub>i</sub>b<sub>i</sub>, with <code>a = np.array([1, 2, 3])</code> and <code>b = np.array([4, 5, 6])</code>. What is the difference?",
           ar: "كلا السطرين يدّعي أنه &Sigma; a<sub>i</sub>b<sub>i</sub>، مع <code>a = np.array([1, 2, 3])</code> و<code>b = np.array([4, 5, 6])</code>. فما الفرق؟" },
      codeA: "total = (a * b).sum()",
      codeB: "total = a.sum() * b.sum()",
      options: [
        { en: "A gives 32 and B gives 90. A pairs the values up and then adds the three products; B collapses each array to one total and multiplies those, which is a different quantity &mdash; and neither raises anything.",
          ar: "أ تعطي 32 وب تعطي 90. فأ تزاوج القيم ثم تجمع الحواصل الثلاثة؛ وب تُلخّص كل مصفوفة في مجموع واحد ثم تضرب المجموعين، وذلك مقدارٌ آخر &mdash; ولا ترفع أيٌّ منهما شيئًا." },
        { en: "They are equal, because multiplication and addition can be done in either order.",
          ar: "متساويتان، لأن الضرب والجمع يمكن أن يُجريا بأي ترتيب." },
        { en: "B raises a <code>ValueError</code>, because the two shapes are not lined up before multiplying.",
          ar: "ب ترفع <code>ValueError</code>، لأن الشكلين غير محاذيين قبل الضرب." },
        { en: "Both give 32; B is only slower, because it walks each array once more.",
          ar: "كلتاهما تعطي 32؛ وب أبطأ فقط، لأنها تمرّ على كل مصفوفة مرة أخرى." }
      ],
      answer: 0,
      explain: { en: "The answer that calls them equal is the one worth naming, because it half-remembers a real rule: you may add and multiply plain numbers in either order, but &Sigma;a<sub>i</sub>b<sub>i</sub> and (&Sigma;a<sub>i</sub>)(&Sigma;b<sub>i</sub>) pair the values up differently, and the answers are 32 and 90. What makes B dangerous rather than merely wrong is the assumption behind the answer that calls B merely slower &mdash; that two lines printing a plausible number must be computing the same thing. The &Sigma; in the formula sits in front of the product, and in NumPy that is exactly what the brackets say.",
                 ar: "والجوابُ الذي يسوّي بينهما يستحق التسمية، لأنه يتذكّر نصفَ قاعدة حقيقية: فالأعداد المجردة يجوز جمعها وضربها بأي ترتيب، أما &Sigma;a<sub>i</sub>b<sub>i</sub> و(&Sigma;a<sub>i</sub>)(&Sigma;b<sub>i</sub>) فتزاوجان القيم تزاوجًا مختلفًا، والجوابان 32 و90. والذي يجعل ب خطِرةً لا خاطئةً فحسب هو فرضُ الجواب الذي يسمّي ب أبطأَ فحسب &mdash; أن سطرين يطبعان عددًا معقولًا لا بدّ أن يحسبا الشيء نفسه. فالـ&Sigma; في الصيغة تقف أمام حاصل الضرب، وذلك في نمباي هو بالضبط ما يقوله القوسان." }
    },
    {
      id: "a5q8", type: "trace", level: "hard", topics: ["note-table", "note-vector"],
      q: { en: "The script takes the mean, then &Sigma;(x<sub>i</sub> &minus; x&#772;)<sup>2</sup>, then builds the column a textbook would have drawn. State each value.",
           ar: "يأخذ السكربت المتوسط، ثم &Sigma;(x<sub>i</sub> &minus; x&#772;)<sup>2</sup>، ثم يبني العمود الذي كان الكتاب سيرسمه. اذكر كل قيمة." },
      code: "import numpy as np\n\nx = np.array([4.0, 6.0, 11.0])\n\nm = x.mean()\nspread = ((x - m) ** 2).sum()\ncolumn = x[:, None]",
      blanks: [
        { accept: ["7.0", "7"], label: { en: "<code>m</code>", ar: "<code>m</code>" } },
        { accept: ["26.0", "26"], label: { en: "<code>spread</code>", ar: "<code>spread</code>" } },
        { accept: ["(3, 1)"], label: { en: "<code>column.shape</code>", ar: "<code>column.shape</code>" } }
      ],
      explain: { en: "21 over 3 is a mean of 7.0, the three differences are &minus;3, &minus;1 and 4, and their squares add to 26.0. Two things are worth carrying away. <code>x - m</code> subtracts one number from every value with no loop and no index, which is the whole reason the x&#772; inside the brackets translates so cleanly. And <code>column.shape</code> is <code>(3, 1)</code> while <code>x.shape</code> is still <code>(3,)</code> &mdash; <code>x</code> itself was never reshaped, because <code>[:, None]</code> hands back a new view rather than editing the array you had.",
                 ar: "21 على 3 متوسطُها 7.0، والفروق الثلاثة &minus;3 و&minus;1 و4، ومربعاتها تُجمَع إلى 26.0. وثمّة أمران يستحقان الحمل. فـ<code>x - m</code> تطرح عددًا واحدًا من كل قيمة بلا حلقة ولا دليل، وذلك هو كل سبب أن x&#772; داخل القوسين تُترجَم بهذه النظافة. و<code>column.shape</code> هي <code>(3, 1)</code> بينما <code>x.shape</code> لا تزال <code>(3,)</code> &mdash; فـ<code>x</code> نفسها لم يُعَد تشكيلها قطّ، لأن <code>[:, None]</code> تُعيد نافذةً جديدة لا تعدّل المصفوفة التي كانت بين يديك." }
    }
  ]
};
