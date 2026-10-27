/* ============================================================
   Lesson 14 (Lecture 16) — weighted totals and distances: the
   dot product and its three spellings, the norm, distance as
   the norm of a difference, and the units that quietly decide
   which record is "nearest".
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-14"] = {
  title: { en: "Lesson 14 Test — Weighted Totals and Distances", ar: "اختبار الدرس 14 — المجاميع الموزونة والمسافات" },
  intro: {
    en: "Twelve questions on Lesson 14 only. Two habits answer most of them: before you read an expression, say out loud how many numbers it should leave behind; and before you trust a nearest-record answer, ask which column was recorded in the biggest numbers.",
    ar: "اثنا عشر سؤالًا على الدرس 14 وحده. وعادتان تُجيبان أكثرها: قبل أن تقرأ تعبيرًا قل جهرًا كم عددًا ينبغي أن يتركه خلفه؛ وقبل أن تثق بجواب «أقرب سجلّ» اسأل أيُّ عمودٍ سُجِّل بأكبر الأعداد."
  },
  questions: [
    {
      id: "t14q1", type: "tf", level: "easy", topics: ["dot", "elementwise"],
      q: { en: "<code>marks * weights</code> already holds the weighted total, and the <code>.sum()</code> written after it only tidies the display.",
           ar: "<code>marks * weights</code> تحمل المجموع الموزون فعلًا، و<code>.sum()</code> المكتوبة بعدها لا تفعل إلا تنظيم العرض." },
      truth: false,
      explain: { en: "It is tempting because multiplication is the step that <em>applies</em> the weights, so the work feels finished. But <code>*</code> is elementwise and gives back as many numbers as it was given: <code>[14.4 19.5 40. ]</code>, each one mark's own contribution, and the total 73.9 does not exist anywhere yet. The rule to carry: <code>*</code> keeps the shape, and only a reduction such as <code>.sum()</code> removes it. A dot product is those two steps together, which is why <code>a @ b</code> can replace both at once.",
                 ar: "الأمرُ مُغرٍ لأن الضرب هو الخطوة التي <em>تُطبّق</em> الأوزان، فيبدو العملُ منتهيًا. لكن <code>*</code> تعمل على العناصر وتُعيد من الأعداد بقَدر ما أُعطيت: <code>[14.4 19.5 40. ]</code>، كلُّ عددٍ إسهامُ علامةٍ واحدة، والمجموع 73.9 لا وجود له بعد في أي مكان. والقاعدة التي تحملها: <code>*</code> تُبقي الشكل، ولا يُزيله إلا تخفيضٌ مثل <code>.sum()</code>. والضربُ القياسي هو الخطوتان معًا، ولذلك تقدر <code>a @ b</code> على استبدالهما جميعًا بضربةٍ واحدة." }
    },
    {
      id: "t14q2", type: "output", level: "easy", topics: ["dot", "dot-spellings"],
      q: { en: "One student, three marks, the usual 20/30/50 scheme. Write the two lines this prints.",
           ar: "طالبٌ واحد وثلاث علامات ونظام 20/30/50 المعتاد. اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nmarks = np.array([90., 60., 50.])\nweights = np.array([0.2, 0.3, 0.5])\n\nprint(marks * weights)\nprint(marks @ weights)",
      blanks: [{ accept: ["[18. 18. 25.]\n61.0"], lines: 2 }],
      explain: { en: "The first line is three numbers because <code>*</code> pairs the arrays position by position: 90&times;0.2, 60&times;0.3, 50&times;0.5. Note how NumPy prints them &mdash; <code>18.</code> with a bare trailing dot, which is how a float array says \"these are floats\" without the extra zero. The second line adds those three, and the mistake worth naming is expecting the <em>first</em> line to be a single number because the weights add up to 1: what the weights sum to says nothing about the shape of <code>marks * weights</code>.",
                 ar: "السطرُ الأول ثلاثةُ أعداد لأن <code>*</code> تزاوج المصفوفتين موضعًا بموضع: 90&times;0.2 و60&times;0.3 و50&times;0.5. ولاحظ كيف تطبعها نمباي &mdash; <code>18.</code> بنقطةٍ عارية في آخرها، وهكذا تقول مصفوفةُ العشريات «هذه عشريات» بلا صفرٍ زائد. والسطرُ الثاني يجمع تلك الثلاثة، والخطأُ الجديرُ بالتسمية هو توقّعُ أن يكون السطرُ <em>الأول</em> عددًا واحدًا لأن مجموع الأوزان 1: فما تبلغه الأوزانُ مجموعةً لا يقول شيئًا عن شكل <code>marks * weights</code>." }
    },
    {
      id: "t14q3", type: "mcq", level: "easy", topics: ["distance", "norm"],
      q: { en: "Two patients are on file with a temperature, a pulse and a blood pressure each. Which line prints how far apart they are?",
           ar: "مريضان في السجلّ، لكلٍّ حرارةٌ ونبضٌ وضغطُ دم. فأيُّ سطرٍ يطبع كم يبعد أحدهما عن الآخر؟" },
      code: "a = np.array([36.9, 88., 124.])\nb = np.array([37.4, 70., 118.])",
      options: [
        { code: "print(np.linalg.norm(a - b))" },
        { code: "print(np.linalg.norm(a) - np.linalg.norm(b))" },
        { code: "print((a - b).sum())" },
        { code: "print(a @ b)" }
      ],
      answer: 0,
      explain: { en: "Subtracting the two norms is the tempting one, and it is tempting because it uses the right function: it prints 14.26 where the distance is 18.98, and the reason is that it compares two <em>lengths</em> rather than measuring the gap. It is also wrong in a way no rounding hides &mdash; <code>[3., 4.]</code> and <code>[4., 3.]</code> both have length 5, so it reports a distance of 0 between two different patients. Summing the difference lets a pulse gap of +18 cancel a temperature gap of &minus;0.5. And <code>a @ b</code> is a dot product, 22172.06: it grows when two records agree, which runs in the opposite direction from a distance. Carry away the order of operations: subtract first, then measure.",
                 ar: "طرحُ المعياريْن هو المُغري، وإغراؤه أنه يستعمل الدالة الصحيحة: فهو يطبع 14.26 والمسافةُ 18.98، والسببُ أنه يقارن <em>طولين</em> لا أنه يقيس الفجوة. وهو خاطئٌ أيضًا بوجهٍ لا يُخفيه تقريب &mdash; فـ <code>[3., 4.]</code> و<code>[4., 3.]</code> طولُ كلٍّ منهما 5، فيُبلغ مسافةَ صفرٍ بين مريضين مختلفين. وجمعُ الفرق يترك فجوةَ نبضٍ +18 تُلغي فجوةَ حرارةٍ &minus;0.5. و<code>a @ b</code> ضربٌ قياسي يساوي 22172.06: يكبُر حين يتفق السجلّان، وذلك يسير في الاتجاه المضادّ للمسافة. فاحمل ترتيبَ العمليات: اطرح أولًا ثم قِس." }
    },
    {
      id: "t14q4", type: "fill", level: "medium", topics: ["distance", "axis"],
      q: { en: "A new patient against the four already on file. Fill the blank so that the result is one distance per patient.",
           ar: "مريضٌ جديد مقابل الأربعة الموجودين في السجلّ. أكمل الفراغ ليكون الناتجُ مسافةً لكل مريض." },
      code: "past = np.array([[36.9,  88., 124.],\n                 [39.2,  95., 150.],\n                 [37.4,  70., 118.],\n                 [38.1, 102., 165.]])\nnew = np.array([39.5, 90., 125.])\n\nd = np.linalg.norm(past - new, ____1____)\nprint(d.round(2))\nprint(d.shape)\n\n# expected:\n# [ 3.43 25.5  21.29 41.78]\n# (4,)",
      blanks: [
        { accept: ["axis=1", "axis = 1"],
          label: { en: "the argument that leaves one number per row", ar: "الوسيط الذي يترك عددًا واحدًا لكل صفّ" } }
      ],
      explain: { en: "Leave the argument out altogether and nothing breaks: <code>norm</code> is perfectly legal on a <code>(4, 3)</code> table and returns one number, about 53.49, which is an answer to a question nobody asked. Write <code>axis=0</code> and it still runs, returning three numbers &mdash; one per measurement column &mdash; and <code>argmin</code> on those would hand you a column number that you would then happily use as a patient number. The rule is the one from Lesson 13 and it has not changed: the axis you name is the axis that disappears. You want the measurements gone and the patients kept, so you name the measurement axis.",
                 ar: "احذف الوسيط كلَّه ولا ينكسر شيء: فـ <code>norm</code> مشروعةٌ تمامًا على جدول <code>(4, 3)</code> وتُعيد عددًا واحدًا نحو 53.49، وهو جوابٌ عن سؤالٍ لم يسأله أحد. واكتب <code>axis=0</code> فهي تعمل أيضًا وتُعيد ثلاثة أعداد &mdash; واحدًا لكل عمود قياس &mdash; و<code>argmin</code> عليها تسلّمك رقم عمودٍ تمضي فتستعمله رقمَ مريض. والقاعدةُ هي قاعدةُ الدرس 13 ولم تتبدّل: المحورُ الذي تسمّيه هو الذي يختفي. وأنت تريد ذهابَ القياسات وبقاءَ المرضى، فتسمّي محور القياسات." }
    },
    {
      id: "t14q5", type: "output", level: "medium", topics: ["dot", "shape"],
      q: { en: "Four marks, three weights. This stops with an error; write the last line of the traceback, exactly.",
           ar: "أربعُ علامات وثلاثةُ أوزان. يتوقف هذا بخطأ؛ اكتب السطر الأخير من التتبّع بالضبط." },
      code: "marks = np.array([70., 60., 90., 80.])\nweights = np.array([0.2, 0.3, 0.5])\n\nprint(marks @ weights)",
      blanks: [{ accept: [
        "ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 3 is different from 4)",
        "ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?) -> (n?,m?) (size 3 is different from 4)"
      ], lines: 1 }],
      explain: { en: "The message is dense and only its last parenthesis is addressed to you: <strong>(size 3 is different from 4)</strong>. The rest describes the general machinery, and <code>Input operand 1</code> counts from zero, so the operand being complained about is the second one you wrote &mdash; the weights. The part worth valuing is that it happened at all: the hand-written loop with <code>range(len(marks))</code> would have run to the end, used three of the four marks, and printed a final mark that looks entirely reasonable. <code>@</code> turns the length assumption you were making silently into a stop.",
                 ar: "الرسالةُ كثيفة ولا يخاطبك منها إلا قوسُها الأخير: <strong>(size 3 is different from 4)</strong>. وبقيّتها تصف الآلة العامة، و<code>Input operand 1</code> يَعُدّ من الصفر، فالمُعامل المشكوّ منه هو الثاني الذي كتبته &mdash; أي الأوزان. والجديرُ بالتقدير أنه حدث أصلًا: فالحلقةُ المكتوبة بـ <code>range(len(marks))</code> كانت ستمضي إلى آخرها وتستعمل ثلاثًا من العلامات الأربع وتطبع علامةً نهائية تبدو معقولة تمامًا. و<code>@</code> تحوّل افتراضَ الطول الذي كنت تفترضه بصمت إلى توقّف." }
    },
    {
      id: "t14q6", type: "match", level: "medium", topics: ["dot-spellings", "norm", "distance"],
      q: { en: "<code>marks</code> and <code>weights</code> are both <code>(3,)</code>; <code>past</code> is the <code>(4, 3)</code> clinic table and <code>new</code> is <code>(3,)</code>. Match each expression to what it produces.",
           ar: "<code>marks</code> و<code>weights</code> شكلُ كلٍّ منهما <code>(3,)</code>؛ و<code>past</code> جدولُ العيادة <code>(4, 3)</code> و<code>new</code> شكله <code>(3,)</code>. وصّل كل تعبير بما يُنتجه." },
      leftHead: { en: "Expression", ar: "التعبير" },
      rightHead: { en: "What comes back", ar: "ما يعود" },
      pairs: [
        { l: { code: "marks @ weights" }, r: { en: "One number: the weighted total, <code>73.9</code>.", ar: "عددٌ واحد: المجموع الموزون <code>73.9</code>." } },
        { l: { code: "marks * weights" }, r: { en: "Three numbers: each mark times its own weight, not yet added.", ar: "ثلاثةُ أعداد: كلُّ علامةٍ في وزنها، ولمّا تُجمع بعد." } },
        { l: { code: "np.linalg.norm(past - new, axis=1)" }, r: { en: "Four numbers: the distance from <code>new</code> to each row.", ar: "أربعةُ أعداد: المسافةُ من <code>new</code> إلى كل صفّ." } },
        { l: { code: "np.linalg.norm(past - new)" }, r: { en: "One number, about 53.49, for the whole table &mdash; legal, and an answer to no question.", ar: "عددٌ واحد نحو 53.49 للجدول كلّه &mdash; مشروعٌ وجوابٌ عن لا سؤال." } }
      ],
      explain: { en: "Two of these pairs are one keyword apart and four numbers apart, and neither of them raises, which is the whole reason this matters: the shape of the result is not checked by anybody but you. The reading habit that makes it quick &mdash; before you decide what an expression means, decide how many numbers it should leave behind, then look for the argument that makes it leave exactly that many. The <code>*</code> and <code>@</code> pair is the same habit on a smaller scale: three numbers against one.",
                 ar: "زوجان من هذه بينهما كلمةٌ مفتاحية واحدة وأربعةُ أعداد، ولا يرفع أيٌّ منهما خطأً، وهذا هو سببُ أهمية المسألة كلِّها: فشكلُ النتيجة لا يفحصه أحدٌ سواك. والعادةُ التي تُسرِّع القراءة: قبل أن تقرر ما يعنيه التعبير قرِّر كم عددًا ينبغي أن يترك، ثم ابحث عن الوسيط الذي يجعله يترك هذا العدد بالضبط. وزوجُ <code>*</code> و<code>@</code> هو العادةُ نفسها بمقياسٍ أصغر: ثلاثةُ أعداد مقابل واحد." }
    },
    {
      id: "t14q7", type: "order", level: "medium", topics: ["scale-distance", "distance", "axis"],
      q: { en: "Put an honest nearest-record search in order, for a table <code>past</code> and one new record <code>new</code>.",
           ar: "رتّب بحثًا نزيهًا عن أقرب سجلّ، لجدولٍ <code>past</code> وسجلٍّ جديد <code>new</code>." },
      items: [
        { en: "Take the smallest and largest value of each column down the rows: <code>low = past.min(axis=0)</code> and <code>high = past.max(axis=0)</code>.",
          ar: "خذ أصغر قيمة وأكبرها في كل عمود نزولًا على الصفوف: <code>low = past.min(axis=0)</code> و<code>high = past.max(axis=0)</code>." },
        { en: "Put the table on a 0-to-1 scale column by column: <code>past_s = (past - low) / (high - low)</code>.",
          ar: "ضع الجدول على مقياس من 0 إلى 1 عمودًا عمودًا: <code>past_s = (past - low) / (high - low)</code>." },
        { en: "Scale the new record with <strong>the same</strong> <code>low</code> and <code>high</code>: <code>new_s = (new - low) / (high - low)</code>.",
          ar: "قيِّس السجلّ الجديد بـ<strong>نفس</strong> <code>low</code> و<code>high</code>: <code>new_s = (new - low) / (high - low)</code>." },
        { en: "Subtract and measure each row at once: <code>d = np.linalg.norm(past_s - new_s, axis=1)</code>.",
          ar: "اطرح وقِس كل صفٍّ دفعةً واحدة: <code>d = np.linalg.norm(past_s - new_s, axis=1)</code>." },
        { en: "Read the <em>position</em> of the smallest distance with <code>d.argmin()</code>, then index the records with it.",
          ar: "اقرأ <em>موضع</em> أصغر مسافة بـ <code>d.argmin()</code>، ثم فهرِس السجلات به." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Two places in this order are load-bearing. The minimum and maximum have to be read off the table <em>before</em> anything is divided, because they are the yardstick both sides get measured with &mdash; read them after scaling and they are 0 and 1 by construction and tell you nothing. And the step people quietly drop is scaling the new record: skip it and the arithmetic compares numbers between 0 and 1 against raw degrees and millimetres, which broadcasts, subtracts and prints without a murmur. The last step is a reminder, not a formality: <code>argmin</code> gives you <em>where</em>, and you still have to go and look.",
                 ar: "موضعان في هذا الترتيب يحملان البناء. فالأصغرُ والأكبر يجب أن يُقرآ من الجدول <em>قبل</em> أن يُقسَم شيء، لأنهما المسطرةُ التي يُقاس بها الطرفان &mdash; واقرأهما بعد التقييس تجدهما 0 و1 بحكم البناء ولا يقولان شيئًا. والخطوةُ التي يُسقطها الناس بصمت هي تقييسُ السجلّ الجديد: تجاوزها يُقارن أعدادًا بين 0 و1 بدرجاتٍ ومليمتراتٍ خام، وهذا يُبثّ ويُطرح ويُطبع بلا همسة. والخطوةُ الأخيرة تذكيرٌ لا إجراءٌ شكلي: فـ <code>argmin</code> تعطيك <em>أين</em>، وعليك بعدُ أن تذهب وتنظر." }
    },
    {
      id: "t14q8", type: "error", level: "medium", topics: ["scale-distance", "distance"],
      q: { en: "This should name the scaled nearest patient, which is 1. It prints 3 instead, and nothing warns. Click the line to change.",
           ar: "ينبغي أن يسمّي هذا أقربَ مريضٍ بعد التقييس وهو 1. لكنه يطبع 3 ولا شيء يحذّر. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\npast = np.array([[36.9,  88., 124.],\n                 [39.2,  95., 150.],\n                 [37.4,  70., 118.],\n                 [38.1, 102., 165.]])\nnew = np.array([39.5, 90., 125.])\n\nlow = past.min(axis=0)\nhigh = past.max(axis=0)\n\npast_s = (past - low) / (high - low)\nnew_s = (new - new.min()) / (new.max() - new.min())\n\nd = np.linalg.norm(past_s - new_s, axis=1)\nprint(d.argmin())",
      answer: 13,
      explain: { en: "The line looks right because it does scale, and <code>new</code> really is the thing that needs scaling &mdash; the defect is the yardstick, not the idea. <code>new.min()</code> and <code>new.max()</code> are the smallest and largest of that one patient's own three measurements, so 39.5, 90 and 125 become 0, 0.59 and 1 no matter what the table contains: a temperature is being divided by a range of millimetres of mercury. The table and the new record then sit on two different rulers and every distance is meaningless. Count the answers this clinic has now given: 0 unscaled, 3 with this bug, 1 done properly, and not one warning between them. Carry the rule in the form that survives into Chapter 9: <code>low</code> and <code>high</code> belong to the table, and everything compared against it must be scaled with those same two arrays.",
                 ar: "السطرُ يبدو صحيحًا لأنه يُقيّس فعلًا، و<code>new</code> هي ما يحتاج التقييس حقًّا &mdash; فالعيبُ في المسطرة لا في الفكرة. فـ <code>new.min()</code> و<code>new.max()</code> أصغرُ وأكبرُ قياسات ذلك المريض الثلاثة وحده، فتصير 39.5 و90 و125 أصفارًا و0.59 وواحدًا مهما كان في الجدول: فحرارةٌ تُقسم على مدى مليمترات زئبق. ثم يجلس الجدولُ والسجلُّ الجديد على مسطرتين مختلفتين وتغدو كلُّ مسافةٍ بلا معنى. وعُدَّ الأجوبة التي أعطتها هذه العيادة الآن: 0 بلا تقييس، و3 بهذا العيب، و1 إذا أُحسن العمل، ولا تحذيرَ واحدًا بينها. واحمل القاعدة بالصيغة التي تبقى إلى الفصل 9: <code>low</code> و<code>high</code> مِلكُ الجدول، وكلُّ ما يُقارَن به يجب أن يُقيَّس بهاتين المصفوفتين نفسيهما."
      },
      solution: { code: "new_s = (new - low) / (high - low)" }
    },
    {
      id: "t14q9", type: "compare", level: "hard", topics: ["scale-distance", "distance"],
      q: { en: "The same clinic, the same new patient, three lines apart. What is the difference?",
           ar: "العيادةُ نفسها والمريضُ الجديد نفسه، وثلاثةُ أسطرٍ فرقٌ بينهما. فما الفرق؟" },
      codeA: "past = np.array([[36.9,  88., 124.],\n                 [39.2,  95., 150.],\n                 [37.4,  70., 118.],\n                 [38.1, 102., 165.]])\nnew = np.array([39.5, 90., 125.])\n\nd = np.linalg.norm(past - new, axis=1)\nprint(d.argmin())",
      codeB: "past = np.array([[36.9,  88., 124.],\n                 [39.2,  95., 150.],\n                 [37.4,  70., 118.],\n                 [38.1, 102., 165.]])\nnew = np.array([39.5, 90., 125.])\n\nlow = past.min(axis=0)\nhigh = past.max(axis=0)\n\npast_s = (past - low) / (high - low)\nnew_s = (new - low) / (high - low)\n\nd = np.linalg.norm(past_s - new_s, axis=1)\nprint(d.argmin())",
      options: [
        { en: "Both run silently and they name different patients: A prints <code>0</code> and B prints <code>1</code>. A's distances are <code>[ 3.43 25.5  21.29 41.78]</code> and are almost entirely blood pressure &mdash; a 25-point gap there adds 625 to the sum of squares while a whole degree of fever adds 1 &mdash; so A picks the one record with no fever. B puts each column on its own 0-to-1 range first, giving <code>[1.132 0.57  1.116 1.112]</code>, and the nearest record becomes the other feverish patient.",
          ar: "يعمل كلاهما بصمتٍ ويسمّيان مريضين مختلفين: فـ A يطبع <code>0</code> وB يطبع <code>1</code>. ومسافاتُ A هي <code>[ 3.43 25.5  21.29 41.78]</code> وهي ضغطُ دمٍ كلُّها تقريبًا &mdash; ففجوةُ 25 نقطة فيه تضيف 625 إلى مجموع المربعات بينما تضيف درجةُ حمّى كاملة 1 &mdash; فينتقي A السجلَّ الوحيد الذي لا حمّى فيه. أما B فيضع كل عمود على مداه من 0 إلى 1 أولًا فيعطي <code>[1.132 0.57  1.116 1.112]</code>، ويصير أقربُ سجلٍّ المريضَ المحمومَ الآخر." },
        { en: "They print the same position. Scaling shrinks all four distances by roughly the same amount, so it changes the numbers and leaves the ranking alone.",
          ar: "يطبعان الموضع نفسه. فالتقييسُ يُنقص المسافات الأربع بالقَدر نفسه تقريبًا، فيغيّر الأعداد ويترك الترتيب كما هو." },
        { en: "A raises a <code>ValueError</code>: columns measured in different units cannot be subtracted from one another.",
          ar: "يرفع A خطأ <code>ValueError</code>: فالأعمدةُ المقيسة بوحدات مختلفة لا يُطرح بعضها من بعض." },
        { en: "B is the wrong one: dividing by <code>high - low</code> destroys the real sizes of the measurements, so A is the honest version and B is merely the convenient one.",
          ar: "B هو الخاطئ: فالقسمةُ على <code>high - low</code> تُتلف الأحجام الحقيقية للقياسات، فـ A هو النسخة النزيهة وB مجردُ المريحة." }
      ],
      answer: 0,
      explain: { en: "The claim that the ranking survives is the one to take seriously, because it is half true: multiply an entire table by one number &mdash; every column by 7.5 &mdash; and the distances all scale together and the order really is untouched. Scaling here divides each column by a <em>different</em> width (about 2.3 degrees, 32 beats, 47 mmHg), and changing the balance between columns is exactly what changes the ranking. The objection that scaling destroys information deserves an answer rather than a dismissal: it does, and the information it destroys is an artefact of the units somebody happened to write the records in. The test to carry away is the one that settles it without any arithmetic &mdash; if the answer moves when a colleague records pressure in kilopascals instead of millimetres, it was never an answer about the patients.",
                 ar: "الادّعاءُ بأن الترتيب يبقى هو الجدير بأن يُؤخذ على محمل الجدّ، لأنه نصفُ صحيح: فاضرب جدولًا كاملًا في عددٍ واحد &mdash; كل عمودٍ في 7.5 &mdash; تتقايس المسافاتُ جميعًا معًا ولا يُمسّ الترتيب حقًّا. والتقييسُ هنا يقسم كل عمود على عرضٍ <em>مختلف</em> (نحو 2.3 درجة و32 نبضة و47 مليمتر زئبق)، وتغييرُ التوازن بين الأعمدة هو بعينه ما يغيّر الترتيب. والاعتراضُ بأن التقييس يُتلف معلومات يستحق جوابًا لا طردًا: فهو يُتلفها فعلًا، والمعلوماتُ التي يُتلفها أثرٌ عرَضي للوحدات التي صادف أن كُتبت بها السجلات. والاختبارُ الذي تحمله هو ما يحسم الأمر بلا حساب &mdash; إن تحرّك الجوابُ حين يسجّل زميلٌ الضغطَ بالكيلوباسكال بدل المليمترات، فلم يكن قطُّ جوابًا عن المرضى." }
    },
    {
      id: "t14q10", type: "multi", level: "hard", topics: ["dot", "dot-spellings", "elementwise"],
      q: { en: "Select <strong>every</strong> line that prints the weighted total <code>73.9</code>.",
           ar: "اختر <strong>كل</strong> سطرٍ يطبع المجموع الموزون <code>73.9</code>." },
      code: "marks = np.array([72., 65., 80.])\nweights = np.array([0.2, 0.3, 0.5])",
      options: [
        { code: "print(marks @ weights)" },
        { code: "print(np.dot(marks, weights))" },
        { code: "print((marks * weights).sum())" },
        { code: "print(marks * weights)" },
        { code: "print(marks.sum() * weights.sum())" },
        { code: "print(np.dot(weights, marks))" }
      ],
      answer: [0, 1, 2, 5],
      explain: { en: "Three of the correct four are the lesson's three spellings of one operation, and the fourth is the one worth pausing on: with two 1-D arrays the dot product does not care which side you write, because multiplying position by position and adding is symmetric. Do not let that become a habit &mdash; the moment one operand is a table the two orders stop meaning the same thing. Of the rejects, <code>marks * weights</code> prints <code>[14.4 19.5 40. ]</code>, the contributions before anyone adds them. <code>marks.sum() * weights.sum()</code> prints <code>217.0</code>, which is 217 marks times a total weight of 1.0: two perfectly legal operations in the wrong order, no error, and a number that looks like a mark if you are not reading closely.",
                 ar: "ثلاثةٌ من الأربعة الصحيحة هي كتاباتُ الدرس الثلاث لعمليةٍ واحدة، والرابع هو الجديرُ بالوقوف عنده: فمع مصفوفتين أحاديتي البعد لا يبالي الضربُ القياسي بأيّ الطرفين كتبت، لأن الضربَ موضعًا بموضع ثم الجمعَ متماثل. ولا تدع ذلك يصير عادة &mdash; فما إن يصير أحدُ المُعاملين جدولًا حتى يكفّ الترتيبان عن أن يعنيا الشيء نفسه. ومن المرفوضات، <code>marks * weights</code> تطبع <code>[14.4 19.5 40. ]</code> أي الإسهاماتِ قبل أن يجمعها أحد. و<code>marks.sum() * weights.sum()</code> تطبع <code>217.0</code>، وهي 217 علامةً في وزنٍ مجموعُه 1.0: عمليتان مشروعتان تمامًا بترتيبٍ خاطئ، بلا خطأ، وبعددٍ يشبه العلامة إن لم تقرأ بتدقيق." }
    },
    {
      id: "t14q11", type: "trace", level: "hard", topics: ["distance", "shape", "axis"],
      q: { en: "State the shape or the value at each point. No line prints anything.",
           ar: "حدّد الشكل أو القيمة عند كل موضع. ولا يطبع أيُّ سطرٍ شيئًا." },
      code: "past = np.array([[36.9,  88., 124.],\n                 [39.2,  95., 150.],\n                 [37.4,  70., 118.],\n                 [38.1, 102., 165.]])\nnew = np.array([39.5, 90., 125.])\n\ngap = past - new\nd = np.linalg.norm(gap, axis=1)\npos = d.argmin()",
      blanks: [
        { accept: ["(4, 3)", "(4,3)"], label: { en: "<code>gap.shape</code>", ar: "<code>gap.shape</code>" } },
        { accept: ["(4,)", "(4, )"], label: { en: "<code>d.shape</code>", ar: "<code>d.shape</code>" } },
        { accept: ["0"], label: { en: "<code>pos</code>", ar: "<code>pos</code>" } },
        { accept: ["3.43"], label: { en: "<code>d[pos].round(2)</code>", ar: "<code>d[pos].round(2)</code>" } }
      ],
      explain: { en: "<code>new</code> is <code>(3,)</code>, so right-aligned against <code>(4, 3)</code> its three numbers land on the three columns and the row dimension is reused: <code>gap</code> keeps the table's shape, one row of differences per patient. Naming <code>axis=1</code> then removes the measurement axis and leaves four. The last two blanks are the pair that catches people, and they are different kinds of thing: 0 is a <em>position</em> and 3.43 is a <em>distance</em>. Hand the distance to a list of patient names and you get an index error if you are lucky and the wrong name if you are not. And it is worth remembering what this particular 0 is worth &mdash; it is the unscaled answer, the one patient in the file with no fever at all.",
                 ar: "<code>new</code> شكله <code>(3,)</code>، فبمحاذاته يمينًا مع <code>(4, 3)</code> تهبط أعدادُه الثلاثة على الأعمدة الثلاثة ويُعاد استعمال بُعد الصفوف: فيُبقي <code>gap</code> شكلَ الجدول، صفَّ فروقٍ لكل مريض. ثم تسميةُ <code>axis=1</code> تزيل محورَ القياسات وتترك أربعة. والفراغان الأخيران هما الزوجُ الذي يوقع الناس، وهما صنفان مختلفان من الأشياء: فـ 0 <em>موضع</em> و3.43 <em>مسافة</em>. وسلِّم المسافةَ لقائمة أسماء مرضى تحصل على خطأ فهرسة إن حالفك الحظ وعلى الاسم الخاطئ إن لم يحالفك. ويجدر أن تتذكر قيمة هذا الصفر بعينه &mdash; فهو الجوابُ غير المقيَّس، أي المريضُ الوحيد في السجلّ الذي لا حمّى عنده إطلاقًا." }
    },
    {
      id: "t14q12", type: "complete", level: "hard", topics: ["norm", "elementwise"],
      q: { en: "Two baskets hold the same things in the same proportions, one ten times larger. Which line makes the first print exactly like the second and leaves its own length at 1?",
           ar: "سلّتان فيهما الأشياء نفسها بالنِّسَب نفسها، إحداهما أكبر عشر مرات. فأيُّ سطرٍ يجعل الأولى تُطبع تمامًا كالثانية ويترك طولَها 1؟" },
      code: "a = np.array([1., 2., 2.])\nb = a * 10\n\n# which line?\n\nprint(a_hat)\nprint(b / np.linalg.norm(b))\nprint(np.linalg.norm(a_hat))\n\n# the first two lines must agree, and the third must be 1",
      options: [
        { code: "a_hat = a / np.linalg.norm(a)" },
        { code: "a_hat = a / a.sum()" },
        { code: "a_hat = a / a.max()" },
        { code: "a_hat = a - np.linalg.norm(a)" }
      ],
      answer: 0,
      explain: { en: "Dividing by the sum or by the maximum is tempting for a real reason: both also cancel the factor of ten, because any quantity that grows with the basket does. If the question were only \"make the two baskets look alike\", all three would pass. What separates them is the third line. <code>a / a.sum()</code> gives <code>[0.2 0.4 0.4]</code>, whose length is not 1 but about 0.6; <code>a / a.max()</code> gives <code>[0.5 1.  1. ]</code>, whose length is 1.5. Dividing by the norm is the only one that leaves the norm at 1, and that is not a happy accident but the definition. The subtraction is the cheap mistake worth naming: it broadcasts without complaint, prints <code>[-2. -1. -1.]</code>, and quietly changes the direction the basket points. One honest footnote &mdash; the third line actually prints <code>0.9999999999999999</code>, because a third has no exact binary form, which is why a length is tested with <code>abs(n - 1) &lt; 1e-9</code> and never with <code>== 1</code>.",
                 ar: "القسمةُ على المجموع أو على الأكبر مُغرية لسببٍ حقيقي: فكلتاهما تُلغيان أيضًا عاملَ العشرة، لأن كلّ مقدارٍ ينمو مع السلة يفعل ذلك. ولو كان السؤالُ «اجعل السلتين تتشابهان» وحسب لنجحت الثلاثة. والذي يفرز بينها هو السطرُ الثالث. فـ <code>a / a.sum()</code> تعطي <code>[0.2 0.4 0.4]</code> وطولُها ليس 1 بل نحو 0.6؛ و<code>a / a.max()</code> تعطي <code>[0.5 1.  1. ]</code> وطولُها 1.5. والقسمةُ على المعيار وحدها هي التي تترك المعيار 1، وليس ذلك مصادفةً سعيدة بل هو التعريف. والطرحُ خطأٌ رخيص يستحق التسمية: فهو يُبثّ بلا شكوى ويطبع <code>[-2. -1. -1.]</code> ويبدّل بصمتٍ الاتجاهَ الذي تشير إليه السلة. وحاشيةٌ نزيهة واحدة &mdash; السطرُ الثالث يطبع في الحقيقة <code>0.9999999999999999</code>، لأن الثلثَ لا صيغةَ ثنائية مضبوطة له، ولذلك يُفحص الطول بـ <code>abs(n - 1) &lt; 1e-9</code> لا بـ <code>== 1</code> أبدًا." }
    }
  ]
};
