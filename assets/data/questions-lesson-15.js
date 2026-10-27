/* ============================================================
   Lesson 15 (Lecture 17) — matrix multiplication: the shape rule,
   the transpose that fixes an orientation, and the one-character
   mistake that answers a different question without raising.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-15"] = {
  title: { en: "Lesson 15 Test — Tables That Multiply", ar: "اختبار الدرس 15 — جداولُ تضرب" },
  intro: {
    en: "Twelve questions on Lesson 15 only. Nearly every one of them is decided before you read the code: write the two shapes side by side, look at the two numbers that touch, and you already know whether the line runs and what comes out of it. Keep a pencil next to the screen.",
    ar: "اثنا عشر سؤالًا على الدرس 15 وحده. ويُحسم أكثرها قبل أن تقرأ الكود: اكتب الشكلين جنبًا إلى جنب وانظر إلى العددين المتلامسين، فتعرف سلفًا هل ينجح السطر وماذا يخرج منه. أبقِ قلمًا إلى جوار الشاشة."
  },
  questions: [
    {
      id: "t15q1", type: "tf", level: "easy", topics: ["transpose-1d", "transpose"],
      q: { en: "<code>weights</code> has shape <code>(3,)</code>. Writing <code>weights.T</code> gives shape <code>(1, 3)</code>, which is the row you need when the vector goes on the left of <code>@</code>.",
           ar: "<code>weights</code> شكله <code>(3,)</code>. وكتابةُ <code>weights.T</code> تعطي الشكل <code>(1, 3)</code>، وهو الصفّ الذي تحتاجه حين يقع المتجه يسار <code>@</code>." },
      truth: false,
      explain: { en: "Two things are wrong here and the first one is silent, which is what makes it expensive. <code>.T</code> swaps two dimensions; a 1-D array has one, so there is nothing to swap and <code>weights.T</code> is still <code>(3,)</code> &mdash; the same array, no change, no error to tell you that nothing happened. The expectation comes from textbooks, which draw a vector as a column and its transpose as a row; in NumPy the tool that really adds a dimension is <code>[:, None]</code>. The second thing is that the row was never needed: a 1-D array on the left of <code>@</code> already behaves as a row by itself. Carry away: before you reach for <code>.T</code>, check that the array has two dimensions to swap.",
                 ar: "هنا خطآن، وأولهما صامت، وذلك ما يجعله مكلفًا. فـ <code>.T</code> تبدّل بُعدين؛ والمصفوفة الأحادية لها بُعد واحد، فلا شيء يُبدَّل ويبقى <code>weights.T</code> بشكل <code>(3,)</code> &mdash; المصفوفةُ نفسها بلا تغيير وبلا خطأ يخبرك أن شيئًا لم يحدث. والتوقّع آتٍ من الكتب التي ترسم المتجه عمودًا ومنقولَه صفًّا؛ أما الأداة التي تضيف بُعدًا فعلًا في نمباي فهي <code>[:, None]</code>. والخطأ الثاني أن ذلك الصفّ لم يكن لازمًا أصلًا: فالمصفوفةُ الأحادية يسار <code>@</code> تتصرّف صفًّا من تلقاء نفسها. والخلاصة: قبل أن تمدّ يدك إلى <code>.T</code> تحقّق أن للمصفوفة بُعدين يُبدَّلان." }
    },
    {
      id: "t15q2", type: "mcq", level: "easy", topics: ["matmul", "shape-rule"],
      q: { en: "Five students, three subjects, one weight per subject. What shape does this print?",
           ar: "خمسةُ طلبة وثلاثُ مواد ووزنٌ لكل مادة. أيُّ شكل يطبعه هذا؟" },
      code: "import numpy as np\n\nmarks = np.array([[72., 65., 80.],\n                  [48., 55., 60.],\n                  [90., 88., 95.],\n                  [60., 70., 55.],\n                  [35., 42., 50.]])\nweights = np.array([0.2, 0.3, 0.5])\n\nprint((marks @ weights).shape)",
      options: [
        { en: "<code>(5,)</code>", ar: "<code>(5,)</code>" },
        { en: "<code>(5, 1)</code>", ar: "<code>(5, 1)</code>" },
        { en: "<code>(5, 3)</code>", ar: "<code>(5, 3)</code>" },
        { en: "<code>(3,)</code>", ar: "<code>(3,)</code>" }
      ],
      answer: 0,
      explain: { en: "Write <code>(5, 3)</code> and <code>(3,)</code> side by side: the two 3s touch, they match, and both of them are gone from the answer, leaving the 5. The <code>(5, 1)</code> option is the most instructive wrong one, because it is what the result <em>means</em> &mdash; a column of five totals, one per student &mdash; and NumPy does not give you a column. It gives a flat 1-D array with no column-ness in it at all; if a later line really needs <code>(5, 1)</code>, say so with <code>[:, None]</code>. <code>(5, 3)</code> is what the same line gives with <code>*</code> instead of <code>@</code>: every mark weighted, nothing added up. <code>(3,)</code> would be one number per subject, which no pairing of these two shapes produces.",
                 ar: "اكتب <code>(5, 3)</code> و<code>(3,)</code> جنبًا إلى جنب: فالثلاثتان تتلامسان وتتطابقان وتذهبان كلتاهما من الجواب وتبقى الـ 5. والخيار <code>(5, 1)</code> أنفعُ الخاطئة، لأنه ما <em>تعنيه</em> النتيجة &mdash; عمودٌ من خمسة مجاميع لكل طالب مجموعه &mdash; ونمباي لا تعطيك عمودًا. بل تعطيك مصفوفة أحادية مسطّحة لا عموديّة فيها إطلاقًا؛ فإن احتاج سطرٌ لاحق <code>(5, 1)</code> حقًّا فقل ذلك بـ <code>[:, None]</code>. و<code>(5, 3)</code> هو ما يعطيه السطر نفسه بـ <code>*</code> بدل <code>@</code>: كلُّ علامة موزونة ولا شيء مجموع. و<code>(3,)</code> عددٌ لكل مادة، ولا تُنتجه أي مزاوجة بين هذين الشكلين." }
    },
    {
      id: "t15q3", type: "output", level: "easy", topics: ["star-vs-at", "matmul"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nmarks = np.array([[80., 60., 40.],\n                  [50., 70., 90.]])\nweights = np.array([0.2, 0.3, 0.5])\n\nprint((marks * weights).sum(axis=1))\nprint(marks @ weights)",
      blanks: [{ accept: ["[54. 76.]\n[54. 76.]", "[54.  76.]\n[54.  76.]"], lines: 2 }],
      explain: { en: "This is the one sentence of the lesson written as code: <code>@</code> is <code>*</code> followed by a sum along the last axis, so the two lines cannot disagree. The usual wrong answer for the first line is the six weighted marks, <code>[[16. 18. 20.] [10. 21. 45.]]</code> &mdash; that is <code>marks * weights</code> with the <code>.sum</code> forgotten. The other one is a single number, 130.0, which is what <code>.sum()</code> gives with no <code>axis</code> at all: the whole table added up, students and subjects together. <code>axis=1</code> is what says &ldquo;collapse the subjects, keep the students&rdquo;.",
                 ar: "هذه جملةُ الدرس الواحدة مكتوبةً كودًا: <code>@</code> هي <code>*</code> متبوعةً بجمعٍ على المحور الأخير، فلا يمكن أن يختلف السطران. والجوابُ الخاطئ المعتاد للسطر الأول هو العلامات الستّ الموزونة <code>[[16. 18. 20.] [10. 21. 45.]]</code> &mdash; وتلك <code>marks * weights</code> وقد نُسيت <code>.sum</code>. والآخر عددٌ مفرد 130.0، وهو ما تعطيه <code>.sum()</code> بلا <code>axis</code> إطلاقًا: الجدولُ كله مجموعًا، الطلبةُ والموادُّ معًا. و<code>axis=1</code> هي التي تقول «اطبِق المواد وأبقِ الطلبة»." }
    },
    {
      id: "t15q4", type: "output", level: "medium", topics: ["shape-rule", "transpose"],
      q: { en: "The examinations office stores the marks the other way round. Write the line this prints, then the last line of the traceback, exactly.",
           ar: "يخزّن مكتبُ الامتحانات العلاماتِ بالمقلوب. اكتب السطر الذي يطبعه ثم السطر الأخير من التتبّع بالضبط." },
      code: "import numpy as np\n\nmarks = np.array([[72., 65., 80.],\n                  [48., 55., 60.],\n                  [90., 88., 95.],\n                  [60., 70., 55.],\n                  [35., 42., 50.]])\nweights = np.array([0.2, 0.3, 0.5])\n\nby_subject = marks.T\nprint(by_subject.shape)\nprint(by_subject @ weights)",
      blanks: [{ accept: [
        "(3, 5)\nValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 3 is different from 5)",
        "(3,5)\nValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 3 is different from 5)"
      ], lines: 2 }],
      explain: { en: "Long message, six useful words: <code>size 3 is different from 5</code>. Everything before the bracket is <code>matmul</code> describing itself in the general notation it shares with every other NumPy operation of its kind, and you can learn to skip it the way you skip a form's small print. Notice what the message does <em>not</em> say: it does not quote the two shapes you wrote. The broadcasting error does; this one does not, so the habit of printing <code>.shape</code> on the line before &mdash; which is why that <code>(3, 5)</code> is in the code at all &mdash; is worth keeping. And the data here is not wrong. Only its orientation is.",
                 ar: "رسالةٌ طويلة وستُّ كلماتٍ نافعة: <code>size 3 is different from 5</code>. فكلُّ ما قبل القوس هو <code>matmul</code> تصف نفسها بالترميز العام الذي تشترك فيه مع كل عملية نمبائية من صنفها، وتستطيع أن تتعلّم تخطّيه كما تتخطّى الخطّ الدقيق في استمارة. ولاحظ ما <em>لا</em> تقوله الرسالة: فهي لا تقتبس الشكلين اللذين كتبتهما. خطأُ البثّ يقتبسهما وهذا لا، فعادةُ طباعة <code>.shape</code> في السطر السابق &mdash; ولذلك وُجد <code>(3, 5)</code> في الكود أصلًا &mdash; جديرةٌ بالاستبقاء. والبياناتُ هنا ليست خاطئة. بل اتجاهُها وحده." }
    },
    {
      id: "t15q5", type: "multi", level: "medium", topics: ["shape-rule", "star-vs-at"],
      q: { en: "Select <strong>every</strong> pair of shapes for which <code>@</code> raises <code>ValueError</code>.",
           ar: "اختر <strong>كل</strong> زوج من الأشكال ترفع عنده <code>@</code> خطأ <code>ValueError</code>." },
      options: [
        { en: "<code>(5, 3) @ (3, 2)</code>", ar: "<code>(5, 3) @ (3, 2)</code>" },
        { en: "<code>(3, 5) @ (3,)</code>", ar: "<code>(3, 5) @ (3,)</code>" },
        { en: "<code>(3,) @ (3, 5)</code>", ar: "<code>(3,) @ (3, 5)</code>" },
        { en: "<code>(5, 3) @ (5,)</code>", ar: "<code>(5, 3) @ (5,)</code>" },
        { en: "<code>(2, 3) @ (2, 3)</code>", ar: "<code>(2, 3) @ (2, 3)</code>" },
        { en: "<code>(3, 1) @ (1, 3)</code>", ar: "<code>(3, 1) @ (1, 3)</code>" }
      ],
      answer: [1, 3, 4],
      explain: { en: "Only the two numbers that touch decide it. <code>(2, 3) @ (2, 3)</code> is the instinct brought over from <code>*</code>, where two identical shapes always fit; under <code>@</code> the 3 on the left meets the 2 on the right and it refuses. <code>(5, 3) @ (5,)</code> is the mistake of someone holding one number per <em>row</em> &mdash; a bonus per student, say &mdash; and reaching for <code>@</code>; the message ends <code>size 5 is different from 3</code>, and the fix is not <code>@</code> at all but broadcasting with <code>[:, None]</code>. <code>(3,) @ (3, 5)</code> is legal because a 1-D array on the left acts as a row, so its 3 meets the table's first dimension. And <code>(3, 1) @ (1, 3)</code> is worth running once: the inner 1s match and vanish, so six numbers go in and nine come out.",
                 ar: "العددان المتلامسان وحدهما يحسمان الأمر. فـ <code>(2, 3) @ (2, 3)</code> غريزةٌ منقولة من <code>*</code> حيث ينطبق الشكلان المتطابقان دائمًا؛ أما تحت <code>@</code> فتلاقي الـ 3 يسارًا الـ 2 يمينًا فترفض. و<code>(5, 3) @ (5,)</code> خطأُ من بيده عددٌ لكل <em>صفّ</em> &mdash; علاوةٌ لكل طالب مثلًا &mdash; فيمدّ يده إلى <code>@</code>؛ وتنتهي الرسالة بـ <code>size 5 is different from 3</code>، والعلاجُ ليس <code>@</code> إطلاقًا بل البثُّ بـ <code>[:, None]</code>. و<code>(3,) @ (3, 5)</code> مشروعة لأن المصفوفة الأحادية يسارًا تتصرّف صفًّا، فتلاقي ثلاثتُها بُعد الجدول الأول. و<code>(3, 1) @ (1, 3)</code> جديرةٌ بالتشغيل مرة: فالواحدان الداخليان يتطابقان ويختفيان، فتدخل ستةُ أعداد ويخرج تسعة." }
    },
    {
      id: "t15q6", type: "error", level: "medium", topics: ["star-vs-at", "shape"],
      q: { en: "Three students should come out with one weighted total each. Nothing raises and the printed shape is <code>(3, 3)</code>. Click the line to change.",
           ar: "ينبغي أن يخرج لكل طالبٍ من الثلاثة مجموعٌ موزون واحد. ولا شيء يرفع خطأً والشكلُ المطبوع <code>(3, 3)</code>. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\nmarks = np.array([[72., 65., 80.],\n                  [48., 55., 60.],\n                  [90., 88., 95.]])\nweights = np.array([0.2, 0.3, 0.5])\n\ntotals = marks * weights\n\nprint(totals.shape)",
      answer: 8,
      explain: { en: "One character, no complaint, a different question answered. <code>*</code> weighted all nine marks and kept all nine; <code>@</code> weights them and adds each row up. The data lines are innocent &mdash; the weights really are one per subject and in the right order &mdash; and the <code>print</code> is innocent too: it reported the shape honestly, which is the only reason you found out at all. Note that the table being square is irrelevant here; <code>*</code> would have run just as quietly on a <code>(300, 3)</code> table. The complaint, when it comes, arrives from a later line about something that looks unrelated, so the habit worth building is to check the shape at the moment the row ought to have collapsed.",
                 ar: "حرفٌ واحد ولا شكوى وسؤالٌ آخر يُجاب. فـ <code>*</code> وزنت العلامات التسع وأبقتها تسعًا؛ و<code>@</code> تزنها وتجمع كل صفّ. وسطورُ البيانات بريئة &mdash; فالأوزان لكل مادة فعلًا وبالترتيب الصحيح &mdash; و<code>print</code> بريئة أيضًا: فقد أبلغت بالشكل بصدق، وهو السببُ الوحيد لاكتشافك الأمر أصلًا. ولاحظ أن كون الجدول مربّعًا لا أثر له هنا؛ فـ <code>*</code> كانت ستعمل بالهدوء نفسه على جدول <code>(300, 3)</code>. والشكوى حين تأتي تأتي من سطرٍ لاحق عن شيءٍ يبدو غير ذي صلة، فالعادةُ الجديرة بالبناء أن تفحص الشكل لحظةَ كان ينبغي للصفّ أن ينطبق." },
      solution: { code: "totals = marks @ weights" }
    },
    {
      id: "t15q7", type: "fill", level: "medium", topics: ["transpose", "shape-rule"],
      q: { en: "The marks arrive one row per subject. Produce the five weighted totals without rebuilding the array. Fill the blank.",
           ar: "تصل العلاماتُ بصفٍّ لكل مادة. أنتج المجاميع الموزونة الخمسة دون إعادة بناء المصفوفة. أكمل الفراغ." },
      code: "marks = np.array([[72., 65., 80.],\n                  [48., 55., 60.],\n                  [90., 88., 95.],\n                  [60., 70., 55.],\n                  [35., 42., 50.]])\nweights = np.array([0.2, 0.3, 0.5])\n\nby_subject = marks.T     # this is how the office sends it: (3, 5)\n\nprint(____1____)\n\n# expected:\n# [73.9 56.1 91.9 60.5 44.6]",
      blanks: [
        { accept: ["by_subject.T @ weights", "by_subject.T@weights", "weights @ by_subject", "weights@by_subject", "marks @ weights", "marks@weights"],
          label: { en: "an expression that weights every student", ar: "تعبيرٌ يزن كل طالب" } }
      ],
      explain: { en: "<code>by_subject</code> is <code>(3, 5)</code>, so <code>by_subject @ weights</code> asks the 5 to meet a 3 and refuses. Two expressions get round it and both are accepted: <code>by_subject.T @ weights</code> turns the table back to <code>(5, 3)</code> so the 3s touch, and <code>weights @ by_subject</code> leaves the table alone and lets the vector act as a row on the left, <code>(3,) @ (3, 5) &rarr; (5,)</code>. Prefer the first in code other people will read: it says &ldquo;turn the table the right way round, then weight it&rdquo;, while the second quietly depends on the reader knowing the 1-D convenience. Neither costs anything, because <code>.T</code> is a view &mdash; no numbers move, NumPy just reads the same memory with the two dimensions swapped.",
                 ar: "<code>by_subject</code> شكله <code>(3, 5)</code>، فـ <code>by_subject @ weights</code> تطلب أن تلاقي الـ 5 ثلاثةً فترفض. وتعبيران يتجاوزان ذلك وكلاهما مقبول: فـ <code>by_subject.T @ weights</code> تعيد الجدول إلى <code>(5, 3)</code> فتتلامس الثلاثتان، و<code>weights @ by_subject</code> تترك الجدول وشأنه وتدع المتجه يتصرّف صفًّا على اليسار، <code>(3,) @ (3, 5) &rarr; (5,)</code>. وفضّل الأولى في كودٍ سيقرؤه غيرك: فهي تقول «أدِر الجدول في اتجاهه الصحيح ثم زِنه»، بينما تعتمد الثانية في صمتٍ على معرفة القارئ برفاهية الأحادي. ولا كلفة لأيٍّ منهما، فـ <code>.T</code> نافذة &mdash; لا عدد يتحرك، بل تقرأ نمباي الذاكرة نفسها ببُعدين مبدَّلين." }
    },
    {
      id: "t15q8", type: "match", level: "hard", topics: ["shape-rule", "matmul"],
      q: { en: "Match each pair of shapes to what <code>@</code> returns.",
           ar: "وصّل كل زوج من الأشكال بما تُرجعه <code>@</code>." },
      leftHead: { en: "The two shapes", ar: "الشكلان" },
      rightHead: { en: "What comes back", ar: "ما الذي يعود" },
      pairs: [
        { l: { code: "(5, 3) @ (3, 2)" }, r: { en: "<code>(5, 2)</code> &mdash; the 3s vanish: five rows in, two columns out.", ar: "<code>(5, 2)</code> &mdash; الثلاثتان تختفيان: خمسةُ صفوف تدخل وعمودان يخرجان." } },
        { l: { code: "(5, 3) @ (3,)" }, r: { en: "<code>(5,)</code> &mdash; flat, one number per row, and not a column.", ar: "<code>(5,)</code> &mdash; مسطّح، عددٌ لكل صفّ، وليس عمودًا." } },
        { l: { code: "(3, 5) @ (3,)" }, r: { en: "<code>ValueError</code> &mdash; the numbers that touch are 5 and 3.", ar: "<code>ValueError</code> &mdash; فالعددان المتلامسان 5 و3." } },
        { l: { code: "(3, 1) @ (1, 3)" }, r: { en: "<code>(3, 3)</code> &mdash; the 1s vanish: six numbers in, nine out.", ar: "<code>(3, 3)</code> &mdash; الواحدان يختفيان: ستةُ أعداد تدخل وتسعةٌ تخرج." } }
      ],
      explain: { en: "The first three are the shapes of this whole lesson: a table of weighting schemes, a single scheme, and the same data sent the wrong way round. The fourth is the one that unsettles people, because every other row here makes the data smaller and this one makes it bigger &mdash; which shows that the rule has no opinion about size. It only pairs the last dimension on the left with the first on the right, deletes them both if they match, and keeps what is left. Keep the second row's answer in mind next to <code>(5, 1)</code>, too: those are different shapes, and a 1-D operand on the right can only ever hand you the flat one.",
                 ar: "الثلاثة الأولى أشكالُ هذا الدرس كله: جدولُ أنظمة ترجيح، ونظامٌ واحد، والبياناتُ نفسها مرسلةً بالمقلوب. والرابع هو ما يُقلق الناس، فكلُّ صفٍّ آخر هنا يُصغّر البيانات وهذا يُكبّرها &mdash; وذلك يبيّن أن القاعدة لا رأي لها في الحجم. فهي تزاوج البُعد الأخير يسارًا بالأول يمينًا لا غير، وتحذفهما إن تطابقا، وتُبقي ما بقي. وأبقِ جوابَ الصفّ الثاني في ذهنك إلى جوار <code>(5, 1)</code> أيضًا: فهما شكلان مختلفان، والمُعاملُ الأحادي يمينًا لا يعطيك إلا المسطّح منهما." }
    },
    {
      id: "t15q9", type: "compare", level: "hard", topics: ["matmul-order"],
      q: { en: "Two students, two subjects, and a small table that swaps things round. Both run. What is the difference?",
           ar: "طالبان ومادّتان وجدولٌ صغير يبدّل الأمور. وكلاهما يعمل. فما الفرق؟" },
      codeA: "marks = np.array([[80., 40.],\n                  [50., 90.]])\nswap = np.array([[0., 1.],\n                 [1., 0.]])\n\nprint(marks @ swap)",
      codeB: "marks = np.array([[80., 40.],\n                  [50., 90.]])\nswap = np.array([[0., 1.],\n                 [1., 0.]])\n\nprint(swap @ marks)",
      options: [
        { en: "Both are legal and both give a <code>(2, 2)</code> table, but the two tables are different: <code>marks @ swap</code> exchanged the <strong>columns</strong>, the subjects, while <code>swap @ marks</code> exchanged the <strong>rows</strong>, the students.",
          ar: "كلاهما مشروع وكلاهما يعطي جدولًا <code>(2, 2)</code>، لكن الجدولين مختلفان: فـ <code>marks @ swap</code> بدّلت <strong>الأعمدة</strong> أي المواد، و<code>swap @ marks</code> بدّلت <strong>الصفوف</strong> أي الطلبة." },
        { en: "They print the same table. <code>swap</code> is symmetric, so for this pair the order of the operands cannot matter.",
          ar: "يطبعان الجدول نفسه. فـ <code>swap</code> متماثلة، فلا يمكن لترتيب المُعاملين أن يهمّ في هذا الزوج." },
        { en: "B raises <code>ValueError</code>: the data must be on the left of <code>@</code> and the table of weights on the right.",
          ar: "B يرفع <code>ValueError</code>: فالبياناتُ يجب أن تكون يسار <code>@</code> وجدولُ الأوزان يمينه." },
        { en: "B is A transposed, so either one will do provided you read the result the right way round.",
          ar: "B هو A منقولًا، فأيٌّ منهما يكفي ما دمت تقرأ النتيجة بالاتجاه الصحيح." }
      ],
      answer: 0,
      explain: { en: "Both tables hold the same four marks, which is exactly why a glance does not catch the mistake, and the shape is <code>(2, 2)</code> either way, so nothing downstream complains either. The symmetry claim is the trap worth dismantling: <code>swap</code> really is equal to its own transpose, and that still buys you nothing, because <code>@</code> is not commutative for a reason that has nothing to do with the operands being symmetric &mdash; the left operand supplies the rows of the answer and the right one supplies the columns, so exchanging them exchanges the roles. The transpose claim is also checkable and also false here: A is <code>[[40. 80.] [90. 50.]]</code>, so A transposed is <code>[[40. 90.] [80. 50.]]</code>, and B is <code>[[50. 90.] [80. 40.]]</code> &mdash; neither of the other two. Carry away: when the shape is right and the numbers look wrong, check the order of the operands first.",
                 ar: "يحمل الجدولان العلامات الأربع نفسها، وذلك بالضبط سببُ ألّا تلتقط النظرةُ الخطأ، والشكلُ <code>(2, 2)</code> في الحالين، فلا يشتكي شيءٌ لاحق أيضًا. ودعوى التماثل هي الفخّ الجدير بالتفكيك: فـ <code>swap</code> تساوي منقولها فعلًا، ولا يشتري لك ذلك شيئًا، لأن <code>@</code> ليست إبداليةً لسببٍ لا علاقة له بتماثل المُعاملين &mdash; فالمُعامل الأيسر يُمدّ صفوف الجواب والأيمن يُمدّ أعمدته، فتبديلهما تبديلٌ للدورين. ودعوى النقل قابلةٌ للفحص أيضًا وهي خاطئة هنا: فـ A هو <code>[[40. 80.] [90. 50.]]</code>، ومنقولُه <code>[[40. 90.] [80. 50.]]</code>، وB هو <code>[[50. 90.] [80. 40.]]</code> &mdash; ولا واحد منهما الآخر. والخلاصة: متى صحّ الشكل وبدت الأعدادُ خاطئة ففَحصُ ترتيب المُعاملين أولًا." }
    },
    {
      id: "t15q10", type: "trace", level: "hard", topics: ["linear-model", "shape-rule", "newaxis", "transpose-1d"],
      q: { en: "Four deliveries, two columns describing each. State the shape at each point.",
           ar: "أربعُ توصيلات وعمودان يصفان كلًّا منها. حدّد الشكل عند كل موضع." },
      code: "X = np.array([[3., 120.],\n              [1.,  60.],\n              [5., 200.],\n              [2.,  95.]])\nw = np.array([1.5, 0.02])\nb = 10.\n\npred = X @ w + b\ncol = pred[:, None]\nflat = w.T\ngram = X.T @ X",
      blanks: [
        { accept: ["(4,)", "(4, )"], label: { en: "<code>pred.shape</code>", ar: "<code>pred.shape</code>" } },
        { accept: ["(4, 1)", "(4,1)"], label: { en: "<code>col.shape</code>", ar: "<code>col.shape</code>" } },
        { accept: ["(2,)", "(2, )"], label: { en: "<code>flat.shape</code>", ar: "<code>flat.shape</code>" } },
        { accept: ["(2, 2)", "(2,2)"], label: { en: "<code>gram.shape</code>", ar: "<code>gram.shape</code>" } }
      ],
      explain: { en: "<code>X @ w</code> is <code>(4, 2) @ (2,) &rarr; (4,)</code>, and <code>+ b</code> adds one number to all four by broadcasting, which never changes a shape. So the prediction for every row of a table is <code>(4,)</code>, flat, and <code>[:, None]</code> is how you ask for the column that a textbook would have drawn &mdash; the deliberate version of something NumPy will not do for you. <code>flat</code> is the trap: <code>w.T</code> looks like it must be doing something and is the same <code>(2,)</code> array, unchanged. <code>gram</code> is the one to read slowly: <code>(2, 4) @ (4, 2)</code>, the 4s touch and vanish, and what survives mentions only the two columns &mdash; the four deliveries have been summed away entirely. A result whose shape no longer mentions your rows is usually a summary over them, and that is a useful thing to notice before you try to interpret the numbers in it.",
                 ar: "<code>X @ w</code> هي <code>(4, 2) @ (2,) &rarr; (4,)</code>، و<code>+ b</code> تضيف عددًا واحدًا إلى الأربعة بالبثّ، والبثُّ لا يغيّر شكلًا أبدًا. فتنبّؤُ كل صفٍّ في الجدول <code>(4,)</code> مسطّحة، و<code>[:, None]</code> هي طريقة طلب العمود الذي كان كتابٌ سيرسمه &mdash; الصيغةُ المقصودة لشيءٍ لن تفعله نمباي عنك. و<code>flat</code> هي الفخّ: فـ <code>w.T</code> تبدو كأنها لا بدّ فاعلةٌ شيئًا وهي <code>(2,)</code> نفسها بلا تغيير. و<code>gram</code> جديرةٌ بالقراءة على مهل: <code>(2, 4) @ (4, 2)</code>، فالأربعتان تتلامسان وتختفيان، وما يبقى لا يذكر إلا العمودين &mdash; إذ جُمعت التوصيلاتُ الأربع حتى زالت. والنتيجةُ التي لم يعد شكلها يذكر صفوفك هي غالبًا تلخيصٌ لها، وتلك ملاحظةٌ نافعة قبل أن تحاول تفسير أعدادها." }
    },
    {
      id: "t15q11", type: "complete", level: "hard", topics: ["transpose", "shape-rule", "matmul"],
      q: { en: "The marks arrive by subject and the department wants one row per student, one column per weighting scheme. Which line?",
           ar: "تصل العلاماتُ بحسب المادة، ويريد القسم صفًّا لكل طالب وعمودًا لكل نظام ترجيح. فأيُّ سطر؟" },
      code: "by_subject = marks.T          # (3, 5): one row per subject\nW = np.array([[0.2, 0.34],    # (3, 2): official and flat,\n              [0.3, 0.33],    #         one scheme per column\n              [0.5, 0.33]])\n\n# which line?\n\nprint(table.shape)            # must be (5, 2)\nprint(table.round(2)[0])      # must be [73.9  72.33]",
      options: [
        { code: "table = by_subject.T @ W" },
        { code: "table = W.T @ by_subject" },
        { code: "table = by_subject @ W" },
        { code: "table = W @ by_subject" }
      ],
      answer: 0,
      explain: { en: "Two of the wrong three refuse outright and are harmless: <code>by_subject @ W</code> puts 5 against 3, and <code>W @ by_subject</code> puts 2 against 3. The dangerous one is <code>W.T @ by_subject</code>, which runs, returns <code>(2, 5)</code>, and contains exactly the right ten numbers &mdash; schemes down the rows, students across the columns, the transpose of what was asked for. Nothing raises, and if the next line indexes by student it will quietly read a scheme instead. That is the shape of most real matrix-multiplication bugs: not a crash, but an answer whose rows and columns mean the other thing. Deciding what each axis of the result must <em>mean</em>, before writing the line, is what stops it &mdash; the left operand decides the rows of the answer, so the students must be on the left.",
                 ar: "اثنان من الثلاثة الخاطئة يرفضان صراحةً وهما غير ضارّين: فـ <code>by_subject @ W</code> تضع 5 مقابل 3، و<code>W @ by_subject</code> تضع 2 مقابل 3. والخطِرُ هو <code>W.T @ by_subject</code>: فهو يعمل ويُرجع <code>(2, 5)</code> ويحوي الأعداد العشرة الصحيحة بالضبط &mdash; الأنظمةُ نزولًا في الصفوف والطلبةُ عرضًا في الأعمدة، أي منقولَ المطلوب. ولا شيء يرفع خطأً، فإن فهرس السطرُ التالي بالطالب قرأ نظامًا في صمت. وتلك هي صورةُ أكثر عِلل ضرب المصفوفات الحقيقية: لا انهيار، بل جوابٌ تعني صفوفُه وأعمدته الشيء الآخر. وتحديدُ ما يجب أن <em>يعنيه</em> كل محور في النتيجة قبل كتابة السطر هو ما يمنع ذلك &mdash; فالمُعامل الأيسر يقرّر صفوف الجواب، فالطلبةُ يجب أن يكونوا يسارًا." }
    },
    {
      id: "t15q12", type: "order", level: "medium", topics: ["shape-rule", "transpose", "matmul"],
      q: { en: "<code>by_subject</code> is <code>(3, 5)</code> and <code>weights</code> is <code>(3,)</code>, and <code>by_subject @ weights</code> has just raised. Put the diagnosis in order.",
           ar: "<code>by_subject</code> شكله <code>(3, 5)</code> و<code>weights</code> شكله <code>(3,)</code>، وقد رفعت <code>by_subject @ weights</code> خطأً للتوّ. رتّب التشخيص." },
      items: [
        { en: "Write the two shapes side by side in the order the line wrote them: <code>(3, 5)</code> then <code>(3,)</code>.", ar: "اكتب الشكلين جنبًا إلى جنب بالترتيب الذي كتبهما به السطر: <code>(3, 5)</code> ثم <code>(3,)</code>." },
        { en: "Find the two numbers that touch: the <strong>last</strong> on the left, 5, and the only one on the right, 3.", ar: "جِد العددين المتلامسين: <strong>الأخير</strong> يسارًا وهو 5، والوحيد يمينًا وهو 3." },
        { en: "They are not equal, which is what the tail of the message says: <code>size 3 is different from 5</code>.", ar: "وهما غير متساويين، وذلك ما يقوله ذيل الرسالة: <code>size 3 is different from 5</code>." },
        { en: "Decide which operand is facing the wrong way. The weights are one per subject and correct; it is the table that arrived rotated.", ar: "حدّد أيُّ المُعاملين في الاتجاه الخاطئ. فالأوزانُ واحدٌ لكل مادة وهي صحيحة؛ والجدولُ هو ما وصل مُدارًا." },
        { en: "Write <code>by_subject.T @ weights</code>, read the shapes again &mdash; <code>(5, 3) @ (3,)</code> &mdash; and the surviving 5 is one total per student.", ar: "اكتب <code>by_subject.T @ weights</code> واقرأ الشكلين ثانيةً &mdash; <code>(5, 3) @ (3,)</code> &mdash; والـ 5 الباقية مجموعٌ لكل طالب." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "The order is the discipline. Most people jump from the red text straight to step 5 and start trying <code>.T</code> in various places until something runs, which works often enough to become a habit and leaves them unable to answer the next shape question without a keyboard. Steps 2 and 3 are the whole of it: the error message never quotes your two shapes, so you have to put them side by side yourself, and once they are written down the <code>3</code> and the <code>5</code> in the message stop being noise and become a reading of what you wrote. Step 4 is the one that is genuinely about your data rather than about NumPy, and it is the step that decides whether the fix is <code>.T</code> on one side or a rethink of how the file was loaded.",
                 ar: "الترتيبُ هو الانضباط. فأكثرُ الناس يقفز من النصّ الأحمر إلى الخطوة 5 رأسًا ويشرع يجرّب <code>.T</code> في مواضع شتّى حتى ينجح شيء، وينجح ذلك كثيرًا حتى يصير عادةً، ويتركه عاجزًا عن إجابة سؤال الشكل التالي بلا لوحة مفاتيح. والخطوتان 2 و3 هما الأمر كله: فرسالةُ الخطأ لا تقتبس شكليك أبدًا، فعليك أن تضعهما جنبًا إلى جنب بنفسك، ومتى كُتبا كفّت الـ <code>3</code> والـ <code>5</code> في الرسالة عن كونهما ضجيجًا وصارتا قراءةً لما كتبت. والخطوة 4 هي وحدها المتعلقة ببياناتك حقًّا لا بنمباي، وهي التي تقرّر أيكون العلاجُ <code>.T</code> في جهةٍ أم إعادةَ نظرٍ في كيفية تحميل الملف." }
    }
  ]
};
