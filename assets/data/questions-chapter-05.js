/* ============================================================
   Chapter 5 tests — np.linalg.

   Test A covers the core of both lessons at easy and medium.
   Test B is hard and deliberately cross-lesson: most of its
   questions need Lesson 17's checking habits applied to Lesson
   18's shapes, or the other way round.

   Every printed value was produced by running the snippet in
   NumPy 2.5 / CPython 3.13.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["chapter-05-test-a"] = {
  title: { en: "Chapter 5 Test A — Core", ar: "اختبار الفصل 5 أ — الأساسيات" },
  intro: {
    en: "Sixteen questions across both lessons of Chapter 5. Nothing here needs mathematics beyond knowing what a system of equations is; everything here needs you to say what shape you are holding and what would have warned you.",
    ar: "ستة عشر سؤالًا على درسي الفصل 5. لا يحتاج شيءٌ هنا رياضياتٍ أبعد من معرفة ما نظامُ المعادلات؛ ويحتاج كلُّ شيءٍ هنا أن تقول أيَّ شكلٍ تحمل وما كان سيحذّرك."
  },
  questions: [
    {
      id: "c5aq1", type: "tf", level: "easy", topics: ["layout", "system"],
      q: { en: "In <code>np.linalg.solve(A, b)</code>, the number of rows of <code>A</code> is the number of equations.",
           ar: "في <code>np.linalg.solve(A, b)</code>، عددُ صفوف <code>A</code> هو عددُ المعادلات." },
      truth: true,
      explain: { en: "One row per equation, one column per unknown, and <code>b</code> holds one total per row in the same order. For <code>solve</code> the two counts have to be equal, which is what \"square\" means here.",
                 ar: "صفٌّ لكل معادلة وعمودٌ لكل مجهول، وتحمل <code>b</code> مجموعًا لكل صفٍّ بالترتيب نفسه. ولـ<code>solve</code> يجب أن يتساوى العددان، وذاك معنى «مربعة» هنا." }
    },
    {
      id: "c5aq2", type: "mcq", level: "easy", topics: ["solve", "singular"],
      q: { en: "Which of these makes <code>np.linalg.solve</code> raise <code>LinAlgError: Singular matrix</code>?",
           ar: "أيٌّ من هذه يجعل <code>np.linalg.solve</code> ترفع <code>LinAlgError: Singular matrix</code>؟" },
      options: [
        { en: "The second equation is the first one multiplied by 2.", ar: "المعادلةُ الثانية هي الأولى مضروبةً في 2." },
        { en: "<code>A</code> has five rows and two columns.", ar: "لـ<code>A</code> خمسةُ صفوف وعمودان." },
        { en: "<code>b</code> contains a negative number.", ar: "تحتوي <code>b</code> عددًا سالبًا." },
        { en: "<code>A</code> contains decimals rather than whole numbers.", ar: "تحتوي <code>A</code> عشرياتٍ لا أعدادًا صحيحة." }
      ],
      answer: 0,
      explain: { en: "An equation that is a multiple of another adds no information, so the matrix cannot pin down an answer. The five-by-two option raises too, but with a different message &mdash; <code>Last 2 dimensions of the array must be square</code> &mdash; and it calls for <code>lstsq</code> rather than for a look at your data. Negative numbers and decimals are ordinary.",
                 ar: "معادلةٌ هي مضاعفُ أخرى لا تضيف معلومة، فلا تستطيع المصفوفةُ تحديدَ جواب. وخيارُ الخمسة في اثنين يرفع خطأً أيضًا، لكن برسالةٍ أخرى &mdash; <code>Last 2 dimensions of the array must be square</code> &mdash; وهو يستدعي <code>lstsq</code> لا نظرةً في بياناتك. والأعدادُ السالبة والعشريات عاديّة." }
    },
    {
      id: "c5aq3", type: "output", level: "easy", topics: ["solve", "allclose"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما هذا." },
      code: "import numpy as np\n\nA = np.array([[2., 1.],\n              [1., 3.]])\nb = np.array([8., 9.])\n\nx = np.linalg.solve(A, b)\nprint(x)\nprint(np.allclose(A @ x, b))",
      blanks: [{ accept: ["[3. 2.]\nTrue"], lines: 2 }],
      explain: { en: "2&times;3 + 1&times;2 = 8 and 1&times;3 + 3&times;2 = 9. The trailing dots in <code>[3. 2.]</code> are not decoration: the array is floating point because <code>A</code> and <code>b</code> were written with decimal points.",
                 ar: "2&times;3 + 1&times;2 = 8 و1&times;3 + 3&times;2 = 9. والنقطتان اللاحقتان في <code>[3. 2.]</code> ليستا زينة: فالمصفوفة عشرية لأن <code>A</code> و<code>b</code> كُتبتا بنقاطٍ عشرية." }
    },
    {
      id: "c5aq4", type: "fill", level: "easy", topics: ["lstsq", "overdetermined"],
      q: { en: "Five measurements, two unknowns. Fill the blank with the function that can answer this.",
           ar: "خمسةُ قياسات ومجهولان. أكمل الفراغ بالدالة التي تستطيع إجابة هذا." },
      code: "A = np.column_stack([np.ones(5), hours])   # (5, 2)\n\ncoef = np.linalg.____(A, marks, rcond=None)[0]",
      blanks: [{ accept: ["lstsq"], label: { en: "the function name", ar: "اسم الدالة" } }],
      explain: { en: "<code>solve</code> raises on a 5&times;2 matrix, and that is the right behaviour: there is no exact answer, so it will not invent one. <code>lstsq</code> answers the different question &mdash; which coefficients come closest &mdash; and the <code>[0]</code> at the end picks the coefficients out of the four things it returns.",
                 ar: "ترفع <code>solve</code> خطأً على مصفوفة 5&times;2، وذاك السلوكُ الصحيح: فلا جوابَ مضبوطًا، فلن تختلق واحدًا. و<code>lstsq</code> تجيب السؤال الآخر &mdash; أيُّ المعاملات أقربُ &mdash; و<code>[0]</code> في النهاية تنتقي المعاملات من الأشياء الأربعة التي تُرجعها." }
    },
    {
      id: "c5aq5", type: "tf", level: "easy", topics: ["intercept"],
      q: { en: "A design matrix for <code>y = c + m &times; x</code> needs only one column, holding <code>x</code>.",
           ar: "مصفوفةُ التصميم لـ <code>y = c + m &times; x</code> تحتاج عمودًا واحدًا، يحمل <code>x</code>." },
      truth: false,
      explain: { en: "It needs two: a column of ones for <code>c</code>, then <code>x</code> for <code>m</code>. With only the <code>x</code> column the fit is forced through the origin, and on the course's five students that mistake reported a slope of 17.29 where the honest answer was 4.5. Nothing raised.",
                 ar: "تحتاج عمودين: عمودُ آحادٍ لـ <code>c</code>، ثم <code>x</code> لـ <code>m</code>. ومع عمود <code>x</code> وحده يُجبَر الخطُّ على المرور بنقطة الأصل، وعلى طلبة المقرر الخمسة أبلغ ذلك الخطأُ ميلًا 17.29 والجوابُ النزيه 4.5. ولم يُرفع شيء." }
    },
    {
      id: "c5aq6", type: "mcq", level: "easy", topics: ["allclose"],
      q: { en: "You have solved a system and want to confirm the answer. Which line?",
           ar: "حللتَ نظامًا وتريد تأكيد الجواب. فأيُّ سطر؟" },
      options: [
        { code: "print(np.allclose(A @ x, b))" },
        { code: "print(A @ x == b)" },
        { code: "print((A @ x).sum() == b.sum())" },
        { code: "print(np.allclose(x, b))" }
      ],
      answer: 0,
      explain: { en: "Put the answer back into the question and compare with a tolerance. Exact equality fails routinely on correct answers, because a result can be off in the fifteenth digit. Comparing the sums is weaker than it looks &mdash; different wrong answers can share a total &mdash; and comparing <code>x</code> with <code>b</code> compares prices with invoice totals.",
                 ar: "أعِد الجوابَ إلى السؤال وقارِن بسماحيّة. فالمساواةُ المضبوطة تفشل روتينيًّا على أجوبةٍ صحيحة، لأن النتيجة قد تختلّ في الرقم الخامس عشر. ومقارنةُ المجاميع أضعفُ مما تبدو &mdash; فأجوبةٌ خاطئة مختلفة قد تشترك في مجموع &mdash; ومقارنةُ <code>x</code> بـ <code>b</code> تقارن أسعارًا بمجاميع فواتير." }
    },
    {
      id: "c5aq7", type: "output", level: "medium", topics: ["lstsq", "residuals"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما هذا." },
      code: "import numpy as np\n\nhours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\nA = np.column_stack([np.ones(5), hours])\n\ncoef, ssr, rank, sv = np.linalg.lstsq(A, marks, rcond=None)\nprint(coef)\nprint(rank)",
      blanks: [{ accept: ["[46.9  4.5]\n2"], lines: 2 }],
      explain: { en: "An intercept of 46.9 and a slope of 4.5. The rank is 2, equal to the number of columns, which is what tells you the two coefficients mean something individually. Had it come back 1, the predictions would still be fine and the coefficients would be one arbitrary split out of infinitely many.",
                 ar: "مقطعٌ 46.9 وميلٌ 4.5. والرتبةُ 2، مساويةً عددَ الأعمدة، وذاك ما يخبرك أنّ للمعامِلين معنًى فرديًّا. ولو عادت 1 لبقيت التوقّعاتُ سليمة ولكانت المعاملاتُ قسمةً اعتباطيةً واحدة من لا نهائية." }
    },
    {
      id: "c5aq8", type: "fill", level: "medium", topics: ["rank-check"],
      q: { en: "Fill the blank so the line reports how many of the matrix's columns carry independent information.",
           ar: "أكمل الفراغ ليُبلغ السطرُ كم عمودًا من أعمدة المصفوفة يحمل معلومةً مستقلة." },
      code: "A = np.column_stack([np.ones(5), hours, hours * 60])\n\nprint(np.linalg.____(A), A.shape[1])",
      blanks: [{ accept: ["matrix_rank"], label: { en: "the function name", ar: "اسم الدالة" } }],
      explain: { en: "This prints <code>2 3</code>: three columns, two of which say something new, because minutes is hours in different units. The comparison between those two numbers is the whole check. <code>cond</code> would also report trouble here but answers a different question, and <code>det</code> cannot be used at all &mdash; the matrix is not square.",
                 ar: "يطبع هذا <code>2 3</code>: ثلاثةُ أعمدة، اثنان منها يقولان جديدًا، لأن الدقائق هي الساعات بوحداتٍ أخرى. والمقارنةُ بين هذين العددين هي الفحصُ كلُّه. و<code>cond</code> كانت ستُبلغ عن مشكلةٍ هنا أيضًا لكنها تجيب سؤالًا آخر، و<code>det</code> لا تُستعمل إطلاقًا &mdash; فالمصفوفة ليست مربعة." }
    },
    {
      id: "c5aq9", type: "order", level: "medium", topics: ["system", "layout", "solve", "allclose", "cond"],
      q: { en: "Put a trustworthy use of <code>solve</code> in order.", ar: "رتّب استعمالًا موثوقًا لـ <code>solve</code>." },
      items: [
        { en: "Write down the order of the unknowns.", ar: "اكتب ترتيبَ المجاهيل." },
        { en: "Build <code>A</code> row by row from the equations, and <code>b</code> in the same row order.", ar: "ابنِ <code>A</code> صفًّا صفًّا من المعادلات، و<code>b</code> بترتيب الصفوف نفسه." },
        { en: "Check <code>np.linalg.cond(A)</code>.", ar: "افحص <code>np.linalg.cond(A)</code>." },
        { en: "Call <code>np.linalg.solve(A, b)</code>.", ar: "نادِ <code>np.linalg.solve(A, b)</code>." },
        { en: "Confirm with <code>np.allclose(A @ x, b)</code>.", ar: "أكّد بـ <code>np.allclose(A @ x, b)</code>." },
        { en: "Read the answer against what the quantities mean.", ar: "اقرأ الجوابَ في ضوء معنى الكميات." }
      ],
      answer: [0, 1, 2, 3, 4, 5],
      explain: { en: "The condition number belongs before the call because it is a fact about the question. Reading it afterwards is worse than not reading it: once you have seen an answer, a large condition number becomes something to argue with rather than something to stop at.",
                 ar: "عددُ الحالة ينتمي قبل النداء لأنه واقعٌ عن السؤال. وقراءتُه بعده أسوأ من عدم قراءته: فحين ترى جوابًا يصير عددُ الحالة الكبير شيئًا تجادله لا شيئًا تتوقّف عنده." }
    },
    {
      id: "c5aq10", type: "match", level: "medium", topics: ["singular", "overdetermined", "allclose", "intercept"],
      q: { en: "Match each situation to what you should do about it.", ar: "طابِق كلَّ حالةٍ بما ينبغي فعله حيالها." },
      leftHead: { en: "Situation", ar: "الحالة" },
      rightHead: { en: "What to do", ar: "ما تفعل" },
      pairs: [
        { l: { code: "LinAlgError: Last 2 dimensions of the array must be square" },
          r: { en: "Use <code>lstsq</code>: you have more measurements than unknowns, which is normal.", ar: "استعمل <code>lstsq</code>: فقياساتك أكثر من مجاهيلك، وذاك طبيعي." } },
        { l: { code: "LinAlgError: Singular matrix" },
          r: { en: "Look at the equations: two of them probably say the same thing, or contradict.", ar: "انظر في المعادلات: فاثنتان منها تقولان الشيء نفسه على الأرجح، أو تتناقضان." } },
        { l: { code: "A @ x == b  ->  [False  True  True]" },
          r: { en: "Nothing. Switch the check to <code>np.allclose</code> and move on.", ar: "لا شيء. بدّل الفحصَ إلى <code>np.allclose</code> وامضِ." } },
        { l: { en: "The fitted line predicts 17.29 where every measured value is above 50.", ar: "يتوقّع الخطُّ المُلائَم 17.29 وكلُّ قيمةٍ مقيسة فوق 50." },
          r: { en: "Add the column of ones you left out of the design matrix.", ar: "أضِف عمودَ الآحاد الذي أسقطته من مصفوفة التصميم." } },
        { l: { en: "<code>cond(A)</code> is 2.1&times;10<sup>7</sup> and an answer came back.", ar: "<code>cond(A)</code> تساوي 2.1&times;10<sup>7</sup> وعاد جواب." },
          r: { en: "Distrust the answer and go back to where the data came from.", ar: "لا تثق بالجواب وارجع إلى مصدر البيانات." } }
      ],
      explain: { en: "Four of these five are reactions to something you were told. The fifth &mdash; the condition number &mdash; is a reaction to something you had to go and ask for, and it is the one that catches the failure the other four cannot see.",
                 ar: "أربعةٌ من هذه الخمسة ردودٌ على شيءٍ أُخبرتَ به. والخامسُ &mdash; عددُ الحالة &mdash; ردٌّ على شيءٍ ذهبتَ وسألتَه، وهو الذي يلتقط الفشلَ الذي لا تراه الأربعةُ الأخرى." }
    },
    {
      id: "c5aq11", type: "error", level: "medium", topics: ["layout", "system"],
      q: { en: "Two orders: 4 pens and 1 pad came to 11.00; 2 pens and 3 pads came to 13.00. This prints the wrong prices. Click the line to change.",
           ar: "أمران: أربعةُ أقلام ودفترٌ بلغت 11.00؛ وقلمان وثلاثة دفاتر بلغت 13.00. يطبع هذا أسعارًا خاطئة. اضغط السطرَ الذي يجب تغييره." },
      code: "import numpy as np\n\n# 4 pens and 1 pad came to 11.00\n# 2 pens and 3 pads came to 13.00\nA = np.array([[4., 2.], [1., 3.]])\nb = np.array([11., 13.])\n\nx = np.linalg.solve(A, b)\nprint(np.round(x, 4))",
      answer: 5,
      explain: { en: "The first row should be the first order &mdash; 4 pens, 1 pad &mdash; and instead it holds the pens from both orders. The matrix is square either way, so <code>solve</code> answers without complaint. Corrected to <code>[[4., 1.], [2., 3.]]</code> the prices are <code>[2. 3.]</code> &mdash; a pen at 2.00 and a pad at 3.00. As written they are <code>[0.7 4.1]</code>, which is neither obviously wrong nor right, and that is the danger: both pairs are plausible stationery prices.",
                 ar: "الصفُّ الأول ينبغي أن يكون الأمرَ الأول &mdash; أربعةُ أقلام ودفتر &mdash; وهو يحمل بدلًا من ذلك أقلامَ الأمرين. والمصفوفةُ مربعةٌ في الحالتين، فتجيب <code>solve</code> بلا اعتراض. ومصحّحًا إلى <code>[[4., 1.], [2., 3.]]</code> تكون الأسعار <code>[2. 3.]</code> &mdash; قلمٌ بـ 2.00 ودفترٌ بـ 3.00. وكما هو مكتوب تكون <code>[0.7 4.1]</code>، وهي ليست خاطئةً بوضوح ولا صحيحة، وذاك هو الخطر: فكلا الزوجين أسعارُ قرطاسيةٍ معقولة." },
      solution: { code: "A = np.array([[4., 1.], [2., 3.]])" }
    },
    {
      id: "c5aq12", type: "compare", level: "medium", topics: ["inv-vs-solve"],
      q: { en: "Two ways to the same answer. Which statement is right?", ar: "طريقتان إلى الجواب نفسه. فأيُّ جملةٍ صحيحة؟" },
      codeA: "x = np.linalg.solve(A, b)",
      codeB: "x = np.linalg.inv(A) @ b",
      options: [
        { en: "Both give the same answer on a well-conditioned system; A is preferred because it does less arithmetic and was measured faster, and the gap widens on matrices that are hard to work with.", ar: "يعطيان الجوابَ نفسه على نظامٍ حسن الحالة؛ وتُفضَّل (أ) لأنها تؤدّي حسابًا أقلّ وقيست أسرع، والفرقُ يتّسع على المصفوفات العسِرة." },
        { en: "B is preferred when you have several different <code>b</code> vectors, because the inverse can be reused.", ar: "تُفضَّل (ب) حين تكون لديك عدةُ متجهات <code>b</code> مختلفة، لأن المعكوس يُعاد استعماله." },
        { en: "They give different answers, and B's is the more accurate one.", ar: "يعطيان جوابين مختلفين، وجوابُ (ب) أدقّ." },
        { en: "A only works on 2&times;2 systems.", ar: "تعمل (أ) على أنظمة 2&times;2 وحدها." }
      ],
      answer: 0,
      explain: { en: "The second option is the one worth settling, because the reasoning is almost right and the conclusion is wrong: several right-hand sides is a real situation, and <code>solve</code> already handles it &mdash; give it a <code>b</code> with one column per question and it returns one column of answers per column of totals. There is no need for the inverse to get that.",
                 ar: "الخيارُ الثاني هو ما يستحقّ الحسم، فالاستدلالُ يكاد يصحّ والنتيجةُ خاطئة: فعدةُ أطرافٍ يمنى حالةٌ حقيقية، و<code>solve</code> تتولّاها أصلًا &mdash; أعطِها <code>b</code> بعمودٍ لكل سؤال فتُرجع عمودَ أجوبةٍ لكل عمود مجاميع. ولا حاجةَ إلى المعكوس لذلك." }
    },
    {
      id: "c5aq13", type: "multi", level: "medium", topics: ["singular", "allclose", "solve"],
      q: { en: "Select <strong>every</strong> statement that is true of <code>np.linalg.solve</code>.",
           ar: "اختر <strong>كل</strong> جملةٍ صحيحة عن <code>np.linalg.solve</code>." },
      options: [
        { en: "It requires <code>A</code> to be square.", ar: "تتطلّب أن تكون <code>A</code> مربعة." },
        { en: "It can take a two-dimensional <code>b</code> and answer several right-hand sides at once.", ar: "تستطيع أخذ <code>b</code> ثنائية البعد وإجابة عدة أطرافٍ يمنى دفعةً." },
        { en: "<code>LinAlgError: Singular matrix</code> tells you whether the system has no answer or infinitely many.", ar: "يخبرك <code>LinAlgError: Singular matrix</code> هل للنظام لا جواب أم أجوبةٌ لا نهائية." },
        { en: "It raises on every matrix that is mathematically singular.", ar: "ترفع خطأً على كل مصفوفةٍ شاذّةٍ رياضيًّا." },
        { en: "Its answer can be checked by putting it back into <code>A @ x</code> and comparing with <code>b</code>.", ar: "يمكن فحصُ جوابها بإعادته في <code>A @ x</code> ومقارنته بـ <code>b</code>." },
        { en: "It returns the same answer for <code>A</code> and for <code>A.T</code>.", ar: "تُرجع الجوابَ نفسه لـ <code>A</code> ولـ <code>A.T</code>." }
      ],
      answer: [0, 1, 4],
      explain: { en: "Two of the false three are worth stating plainly. The error message does <em>not</em> distinguish no-answer from infinitely-many, because that difference depends on <code>b</code> and <code>solve</code> gave up before looking at it. And it does <em>not</em> always raise on a singular matrix: the chapter has an exactly singular 3&times;3 whose determinant came out as 4.4&times;10<sup>-16</sup> rather than zero, so an answer came back and <code>allclose</code> confirmed it. The transpose option is true only for symmetric matrices, which is a coincidence and not a rule.",
                 ar: "اثنان من الكاذبة الثلاثة يستحقّان قولًا صريحًا. فرسالةُ الخطأ <em>لا</em> تفرّق بين لا جوابٍ وأجوبةٍ لا نهائية، لأن ذلك الفرق يتعلّق بـ <code>b</code> وقد استسلمت <code>solve</code> قبل أن تنظر إليها. وهي <em>لا</em> ترفع خطأً دائمًا على مصفوفةٍ شاذّة: ففي الفصل مصفوفة 3&times;3 شاذّةٌ بالضبط خرج محدِّدها 4.4&times;10<sup>-16</sup> لا صفرًا، فعاد جوابٌ وأكّدته <code>allclose</code>. وخيارُ المنقول صحيحٌ للمصفوفات المتناظرة وحدها، وتلك مصادفةٌ لا قاعدة." }
    },
    {
      id: "c5aq14", type: "trace", level: "medium", topics: ["solve", "lstsq", "overdetermined"],
      q: { en: "State the shape at each point, or whether the line raises.", ar: "حدّد الشكل عند كل موضع، أو هل يرفع السطرُ خطأً." },
      code: "A = np.column_stack([np.ones(5), hours])   # 1: A.shape\nb = marks                                 # 2: b.shape\n\nbad = np.linalg.solve(A, b)               # 3: raises?\ncoef = np.linalg.lstsq(A, b, rcond=None)[0]   # 4: coef.shape",
      blanks: [
        { accept: ["(5, 2)", "(5,2)"], label: { en: "<code>A.shape</code>", ar: "<code>A.shape</code>" } },
        { accept: ["(5,)", "(5, )"], label: { en: "<code>b.shape</code>", ar: "<code>b.shape</code>" } },
        { accept: ["yes", "Yes", "raises", "yes, it raises"], label: { en: "does the <code>solve</code> line raise?", ar: "هل يرفع سطرُ <code>solve</code> خطأً؟" } },
        { accept: ["(2,)", "(2, )"], label: { en: "<code>coef.shape</code>", ar: "<code>coef.shape</code>" } }
      ],
      explain: { en: "Five rows, two columns, five totals &mdash; and <code>solve</code> raises <code>LinAlgError: Last 2 dimensions of the array must be square</code>. The shape of the answer is worth noticing: two coefficients, one per column, no matter how many measurements went in. Adding students changes the rows and never the answer's shape.",
                 ar: "خمسةُ صفوف وعمودان وخمسةُ مجاميع &mdash; وترفع <code>solve</code> <code>LinAlgError: Last 2 dimensions of the array must be square</code>. وشكلُ الجواب يستحقّ الملاحظة: معامِلان، واحدٌ لكل عمود، مهما كان عددُ القياسات الداخلة. فإضافةُ طلبةٍ تغيّر الصفوف ولا تغيّر شكلَ الجواب أبدًا." }
    },
    {
      id: "c5aq15", type: "complete", level: "medium", topics: ["allclose", "solve"],
      q: { en: "Which line completes a function that will not return an answer it cannot vouch for?",
           ar: "أيُّ سطرٍ يكمل دالةً لا تُرجع جوابًا لا تستطيع ضمانه؟" },
      code: "def prices(A, b):\n    x = np.linalg.solve(A, b)\n\n    # which line?\n\n    return x",
      options: [
        { code: "if not np.allclose(A @ x, b):\n        raise ValueError(\"the answer does not satisfy the system\")" },
        { code: "if (A @ x != b).any():\n        raise ValueError(\"the answer does not satisfy the system\")" },
        { code: "if x.sum() != b.sum():\n        raise ValueError(\"totals do not match\")" },
        { code: "if np.allclose(A @ x, b):\n        raise ValueError(\"the answer does not satisfy the system\")" }
      ],
      answer: 0,
      explain: { en: "The second option is the same check written with exact equality, and it will fire on correct answers, which trains everybody to delete it. The last option has the condition inverted and will fire on every correct answer and pass every wrong one &mdash; a guard that is precisely backwards is worse than none, because it looks like diligence.",
                 ar: "الخيارُ الثاني هو الفحصُ نفسه مكتوبًا بمساواةٍ مضبوطة، وسينطلق على أجوبةٍ صحيحة، فيدرّب الجميعَ على حذفه. والخيارُ الأخير شرطُه مقلوب وسينطلق على كل جوابٍ صحيح ويمرّر كلَّ خاطئ &mdash; والحرزُ المقلوبُ تمامًا أسوأ من لا حرز، لأنه يبدو اجتهادًا." }
    },
    {
      id: "c5aq16", type: "output", level: "medium", topics: ["drop-rows", "lstsq", "residuals"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما هذا." },
      code: "import numpy as np\n\nhours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\nA = np.column_stack([np.ones(5), hours])\n\ntwo = np.linalg.solve(A[[0, 4]], marks[[0, 4]])\nprint(two)\nprint(((marks - A @ two) ** 2).sum())",
      blanks: [{ accept: ["[47.5  4.5]\n4.5"], lines: 2 }],
      explain: { en: "Keeping the first and last student makes the matrix square, so <code>solve</code> accepts it &mdash; and the line it produces misses the other three. Its total squared miss over all five students is 4.5, against 2.7 for the least-squares line that used all of them. The slope happens to be 4.5 in both, which is a coincidence of these numbers and a reminder not to judge a fit by one coefficient.",
                 ar: "إبقاءُ الطالب الأول والأخير يجعل المصفوفة مربعة، فتقبلها <code>solve</code> &mdash; والخطُّ الذي تُنتجه يفوته الثلاثةُ الآخرون. ومجموعُ خطئه المربّع على الطلبة الخمسة 4.5، مقابل 2.7 لخطّ المربعات الصغرى الذي استعملهم كلهم. ويصادف أن الميل 4.5 في كليهما، وتلك مصادفةٌ في هذه الأعداد وتذكيرٌ بألّا تحكم على مواءمةٍ بمعامِلٍ واحد." }
    }
  ]
};

window.OOPBanks["chapter-05-test-b"] = {
  title: { en: "Chapter 5 Test B — Advanced", ar: "اختبار الفصل 5 ب — المتقدم" },
  intro: {
    en: "Sixteen harder questions, most of them crossing both lessons. The recurring theme is the failure that produces a number instead of an exception: every question here has at least one option that runs cleanly and means nothing.",
    ar: "ستة عشر سؤالًا أصعب، أكثرها يعبر الدرسين. والموضوعُ المتكرّر هو الفشلُ الذي يُنتج عددًا لا استثناءً: فلكل سؤالٍ هنا خيارٌ واحد على الأقل يعمل نظيفًا ولا يعني شيئًا."
  },
  questions: [
    {
      id: "c5bq1", type: "output", level: "hard", topics: ["singular", "rank-check", "allclose"],
      q: { en: "The third row is the first plus the second. Write the three lines this prints.",
           ar: "الصفُّ الثالث هو الأول زائد الثاني. اكتب الأسطر الثلاثة التي يطبعها هذا." },
      code: "import numpy as np\n\nA = np.array([[1., 1., 1.],\n              [2., 1., 3.],\n              [3., 2., 4.]])\nb = np.array([6., 13., 19.])\n\nx = np.linalg.solve(A, b)\nprint(x)\nprint(np.allclose(A @ x, b))\nprint(np.linalg.matrix_rank(A), np.linalg.det(A))",
      blanks: [{ accept: ["[1.75  1.625 2.625]\nTrue\n2 4.4408920985006143e-16"], lines: 3 }],
      explain: { en: "An exactly singular system that was answered anyway. The reason is the third line: the determinant of a matrix that is mathematically zero came out as 4.4&times;10<sup>-16</sup>, so the test inside <code>solve</code> found a pivot it could divide by and carried on. The answer satisfies the system, so <code>allclose</code> says <code>True</code> &mdash; and it is one of infinitely many answers, picked arbitrarily. The rank, 2 for a 3&times;3, is the only number here that tells the truth.",
                 ar: "نظامٌ شاذٌّ بالضبط أُجيب عنه مع ذلك. والسببُ في السطر الثالث: فمحدِّدُ مصفوفةٍ هي رياضيًّا صفر خرج 4.4&times;10<sup>-16</sup>، فوجد الفحصُ داخل <code>solve</code> محورًا يقسم عليه ومضى. والجوابُ يحقّق النظام، فتقول <code>allclose</code> <code>True</code> &mdash; وهو واحدٌ من أجوبةٍ لا نهائية، مختارٌ اعتباطًا. والرتبةُ، 2 لمصفوفة 3&times;3، هي العددُ الوحيد هنا الذي يقول الحقيقة." }
    },
    {
      id: "c5bq2", type: "compare", level: "hard", topics: ["det", "cond"],
      q: { en: "The same matrix, measured in two different units. Which statement is right?",
           ar: "المصفوفةُ نفسها، مقيسةً بوحدتين مختلفتين. فأيُّ جملةٍ صحيحة؟" },
      codeA: "A = np.array([[3., 2.],\n              [5., 4.]])\n\nprint(np.linalg.det(A))\nprint(np.linalg.cond(A))",
      codeB: "A = np.array([[3., 2.],\n              [5., 4.]]) * 10\n\nprint(np.linalg.det(A))\nprint(np.linalg.cond(A))",
      options: [
        { en: "The determinant changes from about 2 to about 200, and the condition number stays at about 27. The determinant depends on the units; the condition number does not, which is why only one of them can be compared against a fixed threshold.", ar: "يتغيّر المحدِّد من نحو 2 إلى نحو 200، ويبقى عددُ الحالة عند نحو 27. فالمحدِّد يتعلّق بالوحدات وعددُ الحالة لا؛ ولذلك كان واحدٌ منهما وحده قابلًا للمقارنة بحدٍّ ثابت." },
        { en: "Both numbers scale by 10, since every entry was multiplied by 10.", ar: "يتغيّر العددان بعاملِ 10، فكلُّ مدخلٍ ضُرب في 10." },
        { en: "Both stay the same, because scaling a matrix does not change the system it describes.", ar: "يبقى العددان كما هما، فتحجيمُ مصفوفةٍ لا يغيّر النظام الذي تصفه." },
        { en: "The determinant stays at 2 and the condition number scales to 270.", ar: "يبقى المحدِّد عند 2 ويتغيّر عددُ الحالة إلى 270." }
      ],
      answer: 0,
      explain: { en: "Measured: <code>det</code> goes 2.0000000000000013 &rarr; 199.99999999999991, a factor of a hundred for a 2&times;2 because the determinant scales with the size of the matrix as well as the numbers in it. <code>cond</code> goes 26.962912017836388 &rarr; 26.962912017836363, the same number to fourteen digits. This is the whole argument against <code>det</code> as a health check: the threshold you would have to write down changes when somebody switches from pounds to pence, and nothing tells you.",
                 ar: "قياسًا: ينتقل <code>det</code> من 2.0000000000000013 إلى 199.99999999999991، بعاملِ مئةٍ لمصفوفة 2&times;2 لأن المحدِّد يتغيّر بحجم المصفوفة كما بالأعداد فيها. وينتقل <code>cond</code> من 26.962912017836388 إلى 26.962912017836363، وهو العددُ نفسه إلى أربعة عشر رقمًا. وهذه هي الحجةُ كلها ضد <code>det</code> فحصًا للسلامة: فالحدُّ الذي سيلزمك كتابته يتغيّر حين يبدّل أحدهم من الجنيهات إلى القروش، ولا شيء يخبرك." }
    },
    {
      id: "c5bq3", type: "trace", level: "hard", topics: ["rank-check", "lstsq", "residuals"],
      q: { en: "State the value or shape at each point. One of these is not what people expect.",
           ar: "حدّد القيمة أو الشكل عند كل موضع. وأحدها ليس ما يتوقّعه الناس." },
      code: "hours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\nAdup = np.column_stack([np.ones(5), hours, hours * 60])\n\nc, ssr, rank, sv = np.linalg.lstsq(Adup, marks, rcond=None)\n#  1: Adup.shape    2: rank    3: c.shape    4: ssr.shape",
      blanks: [
        { accept: ["(5, 3)", "(5,3)"], label: { en: "<code>Adup.shape</code>", ar: "<code>Adup.shape</code>" } },
        { accept: ["2"], label: { en: "<code>rank</code>", ar: "<code>rank</code>" } },
        { accept: ["(3,)", "(3, )"], label: { en: "<code>c.shape</code>", ar: "<code>c.shape</code>" } },
        { accept: ["(0,)", "(0, )", "()"], label: { en: "<code>ssr.shape</code>", ar: "<code>ssr.shape</code>" } }
      ],
      explain: { en: "Three columns go in and three coefficients come out, even though only two of the columns say anything new. The last blank is the one that surprises people: when the matrix is rank-deficient, <code>lstsq</code> returns the residuals as an <em>empty</em> array. So the fit that most needs a quality number gives you none, and code written as <code>ssr[0]</code> raises <code>IndexError</code> precisely when the model is unidentifiable. Two unrelated situations produce that empty array &mdash; a rank-deficient matrix, and a square one &mdash; and in both the right response is to read <code>rank</code> instead.",
                 ar: "ثلاثةُ أعمدة تدخل وثلاثةُ معاملات تخرج، وإن كان عمودان منها وحدهما يقولان جديدًا. والفراغُ الأخير هو ما يفاجئ الناس: فحين تكون المصفوفةُ ناقصةَ الرتبة تُرجع <code>lstsq</code> البواقيَ مصفوفةً <em>فارغة</em>. فالمواءمةُ التي تحتاج عددَ جودةٍ أكثرَ من غيرها لا تعطيك واحدًا، وكودٌ مكتوبٌ <code>ssr[0]</code> يرفع <code>IndexError</code> بالضبط حين يكون النموذجُ غيرَ قابلٍ للتعيين. وحالتان غيرُ ذاتَي صلة تُنتجان تلك المصفوفة الفارغة &mdash; مصفوفةٌ ناقصةُ الرتبة، ومربعة &mdash; وفي كلتيهما الردُّ الصحيح قراءةُ <code>rank</code> بدلًا منها." }
    },
    {
      id: "c5bq4", type: "multi", level: "hard", topics: ["ill-cond", "cond", "allclose", "singular"],
      q: { en: "A system returns an answer, <code>np.allclose(A @ x, b)</code> is <code>True</code>, and <code>np.linalg.cond(A)</code> is 2.2&times;10<sup>7</sup>. Select <strong>every</strong> reasonable next step.",
           ar: "يُرجع نظامٌ جوابًا، و<code>np.allclose(A @ x, b)</code> تساوي <code>True</code>، و<code>np.linalg.cond(A)</code> تساوي 2.2&times;10<sup>7</sup>. اختر <strong>كل</strong> خطوةٍ تالية معقولة." },
      options: [
        { en: "Check whether the answer is possible in its own terms &mdash; no negative prices, no ages above 120.", ar: "افحص هل الجوابُ ممكنٌ بشروطه &mdash; لا أسعارٌ سالبة ولا أعمارٌ فوق 120." },
        { en: "Find out how the numbers in <code>A</code> were measured, and to how many digits.", ar: "اعرف كيف قيست الأعداد في <code>A</code>، وإلى كم رقم." },
        { en: "Re-run the calculation to see whether the answer is stable.", ar: "أعِد الحساب لترى هل الجوابُ مستقر." },
        { en: "Change one entry of <code>b</code> by a tiny amount and see how far the answer moves.", ar: "غيّر مدخلًا واحدًا من <code>b</code> بمقدارٍ ضئيل وانظر كم يتحرّك الجواب." },
        { en: "Switch to <code>inv(A) @ b</code>, which is less affected by conditioning.", ar: "انتقل إلى <code>inv(A) @ b</code>، فهي أقلُّ تأثّرًا بالحالة." },
        { en: "Report the answer with a note that <code>allclose</code> confirmed it.", ar: "أبلِغ الجواب مع ملاحظةٍ أنّ <code>allclose</code> أكّدته." }
      ],
      answer: [0, 1, 3],
      explain: { en: "Re-running is the most tempting wrong answer, and it deserves a straight refutation: this arithmetic is deterministic, so the same inputs give the same answer every time, and a stable wrong answer is exactly what an ill-conditioned system produces. Perturbing <code>b</code> is the useful version of that instinct &mdash; it measures the sensitivity the condition number is summarising. And the last option is the one that does real damage: <code>allclose</code> returning <code>True</code> is not evidence here, because it was <code>True</code> in the lesson for a notebook priced at minus six thousand pounds. Quoting it as reassurance passes the problem on with a certificate attached.",
                 ar: "إعادةُ التشغيل أكثرُ الأجوبة الخاطئة إغراءً، وتستحقّ ردًّا صريحًا: فهذا الحسابُ محدَّد، فالمدخلاتُ نفسها تعطي الجوابَ نفسه كلَّ مرة، والجوابُ الخاطئ المستقر هو بالضبط ما يُنتجه نظامٌ سيّئ الحالة. وتشويشُ <code>b</code> هو النسخةُ النافعة من ذلك الحدس &mdash; فهو يقيس الحساسيةَ التي يلخّصها عددُ الحالة. والخيارُ الأخير هو الذي يُحدث ضررًا حقيقيًّا: فرجوعُ <code>allclose</code> بـ <code>True</code> ليس بيّنةً هنا، فقد كانت <code>True</code> في الدرس لدفترٍ سعرُه سالب ستة آلاف جنيه. واقتباسُها طمأنينةً يُمرّر المشكلةَ وقد أُلحقت بها شهادة." }
    },
    {
      id: "c5bq5", type: "error", level: "hard", topics: ["intercept", "lstsq", "residuals"],
      q: { en: "This fits a rule for marks from revision hours and reports a slope of 17.29, which is nearly four times the truth. Click the line to change.",
           ar: "يلائم هذا قاعدةً للعلامات من ساعات المراجعة ويُبلغ ميلًا 17.29، وهو نحوُ أربعة أضعاف الحقيقة. اضغط السطرَ الذي يجب تغييره." },
      code: "import numpy as np\n\nhours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\n\nA = np.column_stack([hours])\n\ncoef, ssr, rank, sv = np.linalg.lstsq(A, marks, rcond=None)\nprint(f\"slope {coef[0]:.2f}, residual total {ssr[0]:.2f}\")",
      answer: 6,
      explain: { en: "<code>np.column_stack([hours])</code> builds a <code>(5, 1)</code> matrix with no intercept column, so the only line available passes through the origin. The residual total it prints is 2002.35, against 2.70 for the correct fit &mdash; a seven-hundred-fold difference, printed, on the same line as the slope, and still easy to walk past. Nothing raised, nothing warned, and the shape was legal throughout.",
                 ar: "تبني <code>np.column_stack([hours])</code> مصفوفةً <code>(5, 1)</code> بلا عمود مقطع، فالخطُّ الوحيد المتاح يمرّ بنقطة الأصل. ومجموعُ البواقي الذي يطبعه 2002.35، مقابل 2.70 للمواءمة الصحيحة &mdash; فرقٌ بسبع مئة ضعف، مطبوعًا، في السطر نفسه مع الميل، ويسهل مع ذلك تجاوزه. ولم يُرفع شيء ولم يحذّر شيء، وكان الشكلُ قانونيًّا طوال الوقت." },
      solution: { code: "A = np.column_stack([np.ones(len(hours)), hours])" }
    },
    {
      id: "c5bq6", type: "output", level: "hard", topics: ["intercept", "lstsq"],
      q: { en: "A design matrix of nothing but ones. Write the two lines this prints.",
           ar: "مصفوفةُ تصميمٍ ليس فيها غير الآحاد. اكتب السطرين الذين يطبعهما هذا." },
      code: "import numpy as np\n\nmarks = np.array([52., 55., 61., 64., 70.])\nA = np.ones((5, 1))\n\ncoef, ssr, rank, sv = np.linalg.lstsq(A, marks, rcond=None)\nprint(coef)\nprint(marks.mean())",
      blanks: [{ accept: ["[60.4]\n60.4"], lines: 2 }],
      explain: { en: "Fitting an intercept and nothing else gives you the mean, exactly. That is worth knowing for two reasons. It is a useful sanity check &mdash; if a one-column fit of ones does not return the mean, something is wrong with how you built the matrix. And it says what the intercept <em>is</em>: the best single number when you are not allowed to use any information about the students. Every column you add after it is an attempt to beat the mean, and the residual total of this fit, 205.2, is the bar the others have to clear.",
                 ar: "مواءمةُ مقطعٍ ولا شيء غيره تعطيك المتوسط بالضبط. وذلك جديرٌ بالمعرفة لسببين. فهو فحصُ سلامةٍ نافع &mdash; إن لم تُرجع مواءمةُ عمودٍ من آحادٍ المتوسطَ فثمّة خطأٌ في كيفية بنائك المصفوفة. وهو يقول ما <em>يكون</em> المقطع: أفضلَ عددٍ واحد حين لا يُسمح لك باستعمال أي معلومةٍ عن الطلبة. وكلُّ عمودٍ تضيفه بعده محاولةٌ للتغلّب على المتوسط، ومجموعُ بواقي هذه المواءمة، 205.2، هو العارضةُ التي على الآخرين تجاوزها." }
    },
    {
      id: "c5bq7", type: "tf", level: "hard", topics: ["residuals", "intercept"],
      q: { en: "When the design matrix includes a column of ones, the residuals of a least-squares fit add up to zero.",
           ar: "حين تشتمل مصفوفةُ التصميم على عمودِ آحاد، تبلغ بواقي مواءمة المربعات الصغرى صفرًا بجمعها." },
      truth: true,
      explain: { en: "To within floating point: on the lesson's five students <code>(marks - A @ coef).sum()</code> is 4.26&times;10<sup>-14</sup>. It is a property of having an intercept, not of fitting well &mdash; the intercept is free to move up or down, so the best fit always balances the misses. Take the column of ones away and the balance goes with it: the same sum becomes 42.64. That makes it a quick test of whether you remembered the intercept, and a reminder that the sum of the residuals says nothing about quality. A terrible line through an intercept still sums to zero.",
                 ar: "في حدود الحساب العشري: فعلى طلبة الدرس الخمسة تساوي <code>(marks - A @ coef).sum()</code> مقدار 4.26&times;10<sup>-14</sup>. وهي خاصيّةُ وجودِ مقطعٍ لا خاصيّةُ حسنِ المواءمة &mdash; فالمقطعُ حرٌّ في الصعود والنزول، فأفضلُ مواءمةٍ توازن الأخطاء دائمًا. وانزِع عمودَ الآحاد فيذهب التوازنُ معه: فيصير المجموعُ نفسه 42.64. وذلك يجعله فحصًا سريعًا لهل تذكّرتَ المقطع، وتذكيرًا بأنّ مجموعَ البواقي لا يقول شيئًا عن الجودة. فالخطُّ الفظيع ذو المقطع يبلغ صفرًا بجمعه أيضًا." }
    },
    {
      id: "c5bq8", type: "mcq", level: "hard", topics: ["more-columns", "cond", "residuals"],
      q: { en: "You add an <code>hours ** 2</code> column to the five-student fit. The residual total falls from 2.70 to 2.06 and the condition number rises from 8.4 to 85.9. What have you learned?",
           ar: "تضيف عمود <code>hours ** 2</code> إلى مواءمة الطلبة الخمسة. فينزل مجموعُ البواقي من 2.70 إلى 2.06 ويرتفع عددُ الحالة من 8.4 إلى 85.9. فما الذي تعلّمته؟" },
      options: [
        { en: "Almost nothing about whether the curve is better. A new column can never raise the residual, so the fall was guaranteed, and the tenfold rise in conditioning is a real cost paid for it.", ar: "لا شيء تقريبًا عن كون المنحنى أفضل. فالعمودُ الجديد لا يرفع الباقي أبدًا، فالنزولُ كان مضمونًا، والارتفاعُ العشري في الحالة ثمنٌ حقيقيٌّ دُفع له." },
        { en: "That the relationship is curved, since the curve fits better.", ar: "أنّ العلاقة منحنية، فالمنحنى يلائم أفضل." },
        { en: "That the data contains an error, since adding a column should not change the fit.", ar: "أنّ في البيانات خطأً، فإضافةُ عمودٍ لا ينبغي أن تغيّر المواءمة." },
        { en: "That the matrix is now rank-deficient, which is what a higher condition number means.", ar: "أنّ المصفوفة صارت ناقصةَ الرتبة، وذاك معنى ارتفاع عدد الحالة." }
      ],
      answer: 0,
      explain: { en: "Adding a column can only reduce the sum of squared residuals or leave it alone, so \"it fits better\" carries no information at all &mdash; with five points and five columns you could drive it to zero and learn nothing whatsoever. The last option confuses the two diagnostics: rank is still 3 of 3 here, full rank, because <code>hours</code> and <code>hours ** 2</code> are genuinely independent columns. They are merely strongly related, and the condition number is where that shows up. Rank catches duplicates; condition catches near-duplicates.",
                 ar: "إضافةُ عمودٍ لا تفعل غير إنقاص مجموع الأخطاء المربّعة أو تركِه، فـ«يلائم أفضل» لا يحمل معلومةً إطلاقًا &mdash; فبخمس نقاطٍ وخمسة أعمدة تستطيع دفعَه إلى الصفر ولا تتعلّم شيئًا بالمرّة. والخيارُ الأخير يخلط بين أداتَي التشخيص: فالرتبةُ لا تزال 3 من 3 هنا، كاملةً، لأن <code>hours</code> و<code>hours ** 2</code> عمودان مستقلان حقًّا. وهما شديدا الارتباط وحسب، وعددُ الحالة حيث يظهر ذلك. فالرتبةُ تلتقط المكرّرات، والحالةُ تلتقط أشباه المكرّرات." }
    },
    {
      id: "c5bq9", type: "fill", level: "hard", topics: ["cond", "ill-cond"],
      q: { en: "Fill both blanks so the guard refuses a question whose answer could not be trusted, and reports the number it refused on.",
           ar: "أكمل الفراغين ليرفض الحرزُ سؤالًا لا يمكن الوثوق بجوابه، ويُبلغ العددَ الذي رفض عليه." },
      code: "c = np.linalg.____(A)\nif c > 1e8:\n    raise ValueError(f\"ill-conditioned: {c:.3g}\")\n\nx = np.linalg.____(A, b)",
      blanks: [
        { accept: ["cond"], label: { en: "the diagnostic", ar: "أداة التشخيص" } },
        { accept: ["solve"], label: { en: "the solver", ar: "الحالّ" } }
      ],
      explain: { en: "<code>cond</code> then <code>solve</code>, in that order, because the diagnostic describes the question and the solver answers it. One honest caveat carried over from the lesson: <code>1e8</code> is a guess. The chapter's catastrophic matrix had a condition number of 2.17&times;10<sup>7</sup> and would sail through this guard, which is why a second check on the answer's plausibility &mdash; prices are positive &mdash; is not redundant with this one.",
                 ar: "<code>cond</code> ثم <code>solve</code>، بهذا الترتيب، فأداةُ التشخيص تصف السؤال والحالُّ يجيبه. وحاشيةٌ نزيهةٌ منقولة من الدرس: <code>1e8</code> تخمين. فمصفوفةُ الفصل الكارثية كان عددُ حالتها 2.17&times;10<sup>7</sup> وكانت ستمرّ من هذا الحرز بسلاسة، ولذلك لم يكن فحصٌ ثانٍ لمعقولية الجواب &mdash; الأسعارُ موجبة &mdash; زائدًا عن هذا." }
    },
    {
      id: "c5bq10", type: "order", level: "hard", topics: ["overdetermined", "rank-check", "lstsq", "residuals", "more-columns"],
      q: { en: "Put a defensible model-fitting routine in order, from columns to a reported coefficient.",
           ar: "رتّب روتينًا للنمذجة يمكن الدفاع عنه، من الأعمدة إلى معامِلٍ مُبلَّغ." },
      items: [
        { en: "Decide what each column is for, and that none of them is another one in different units.", ar: "قرّر وظيفةَ كل عمود، وألّا يكون أيٌّ منها عمودًا آخر بوحداتٍ أخرى." },
        { en: "Build the design matrix with a column of ones first.", ar: "ابنِ مصفوفةَ التصميم وعمودُ الآحاد أولًا." },
        { en: "Compare <code>matrix_rank(A)</code> with <code>A.shape[1]</code>, and stop if they differ.", ar: "قارِن <code>matrix_rank(A)</code> بـ <code>A.shape[1]</code>، وتوقّف إن اختلفا." },
        { en: "Check <code>cond(A)</code>, which catches the columns that are nearly but not quite duplicates.", ar: "افحص <code>cond(A)</code>، فهو يلتقط الأعمدة التي تكاد تكون مكرّرة ولا تكون." },
        { en: "Fit with <code>lstsq</code>.", ar: "لائِم بـ <code>lstsq</code>." },
        { en: "Read the residuals for a pattern in the signs.", ar: "اقرأ البواقي باحثًا عن نمطٍ في الإشارات." },
        { en: "Report the coefficients with the range of data behind them, and resist adding a column to make the residual smaller.", ar: "أبلِغ المعاملات مع مدى البيانات خلفها، وقاوِم إضافةَ عمودٍ لتصغير الباقي." }
      ],
      answer: [0, 1, 2, 3, 4, 5, 6],
      explain: { en: "Rank before condition is deliberate, and it is not arbitrary: rank is a yes-or-no fact about duplicate columns, and condition is a matter of degree about near-duplicates. Answering the sharp question first means that when the condition number is bad you already know it is not because two of your columns are the same thing. Both come before the fit, because both are questions about the matrix and neither needs an answer to look at.",
                 ar: "الرتبةُ قبل الحالة مقصودة، وليست اعتباطًا: فالرتبةُ واقعٌ بنعم أو لا عن الأعمدة المكرّرة، والحالةُ مسألةُ درجةٍ عن أشباه المكرّرات. وإجابةُ السؤال الحادّ أولًا تعني أنّك حين يسوء عددُ الحالة تعرف سلفًا أنّ ذلك ليس لأن عمودين منك الشيءُ نفسه. وكلاهما قبل المواءمة، فكلاهما سؤالٌ عن المصفوفة ولا يحتاج أيٌّ منهما جوابًا لينظر فيه." }
    },
    {
      id: "c5bq11", type: "match", level: "hard", topics: ["cond", "rank-check", "det", "residuals", "allclose"],
      q: { en: "Each of these came back from a real fit. Match it to what it rules out.",
           ar: "كلُّ واحدٍ من هذه عاد من مواءمةٍ حقيقية. طابِقه بما يستبعده." },
      leftHead: { en: "What came back", ar: "ما عاد" },
      rightHead: { en: "What it rules out", ar: "ما يستبعده" },
      pairs: [
        { l: { code: "rank == A.shape[1]" },
          r: { en: "Rules out a duplicated or derived column. Says nothing about how much a small error in the data would be magnified.", ar: "يستبعد عمودًا مكرّرًا أو مشتقًّا. ولا يقول شيئًا عن كم سيُضخَّم خطأٌ صغير في البيانات." } },
        { l: { code: "cond(A) < 100" },
          r: { en: "Rules out the silent magnification of measurement error. Says nothing about whether the model is the right shape.", ar: "يستبعد التضخيمَ الصامت لخطأ القياس. ولا يقول شيئًا عن كون النموذج بالشكل الصحيح." } },
        { l: { code: "residuals have no pattern in their signs" },
          r: { en: "Rules out the most visible sign that a straight line is the wrong shape for a bending relationship.", ar: "يستبعد أظهرَ علامةٍ على أنّ الخطَّ المستقيم شكلٌ خطأ لعلاقةٍ تنحني." } },
        { l: { code: "np.allclose(A @ x, b) is True" },
          r: { en: "Rules out a mistake in your own arithmetic. For a square system that is all it was ever going to rule out.", ar: "يستبعد خطأً في حسابك أنت. ولنظامٍ مربّع كان ذلك كلَّ ما كان سيستبعده أصلًا." } },
        { l: { code: "det(A) != 0" },
          r: { en: "Rules out essentially nothing: it is non-zero for matrices that destroy an answer, and it cannot be computed at all for a design matrix that is not square.", ar: "لا يستبعد شيئًا تقريبًا: فهو غيرُ صفريٍّ لمصفوفاتٍ تُهلك الجواب، ولا يُحسب إطلاقًا لمصفوفة تصميمٍ غيرِ مربعة." } }
      ],
      explain: { en: "The point of the table is that each check rules out one thing and is silent about the rest, so a fit with four green lights can still be wrong in the fifth way. The <code>allclose</code> row is the one most often over-read: on an overdetermined fit it is not merely uninformative but actively false, because a least-squares line is the line that does not reproduce the data.",
                 ar: "مقصودُ الجدول أنّ كلَّ فحصٍ يستبعد أمرًا واحدًا ويسكت عن الباقي، فمواءمةٌ بأربعة أضواءٍ خضراء قد تبقى خاطئةً بالوجه الخامس. وصفُّ <code>allclose</code> هو أكثرُ ما يُفرَط في قراءته: فعلى مواءمةٍ فائضة التحديد ليس غيرَ مفيدٍ فقط بل كاذبٌ فعلًا، فخطُّ المربعات الصغرى هو الخطُّ الذي لا يُعيد إنتاج البيانات." }
    },
    {
      id: "c5bq12", type: "complete", level: "hard", topics: ["rank-check", "lstsq", "intercept"],
      q: { en: "This function returns coefficients that go into a report. Two of these guards are genuinely useful; which one belongs here?",
           ar: "تُرجع هذه الدالة معاملات تذهب إلى تقرير. واثنان من هذه الحروز نافعان حقًّا؛ فأيُّها ينتمي هنا؟" },
      code: "def fit(A, y):\n    coef, ssr, rank, sv = np.linalg.lstsq(A, y, rcond=None)\n\n    # which line?\n\n    return coef",
      options: [
        { code: "if rank < A.shape[1]:\n        raise ValueError(f\"{A.shape[1]} columns, rank {rank}: coefficients not identifiable\")" },
        { code: "if ssr.size == 0:\n        raise ValueError(\"no residuals were returned\")" },
        { code: "if not np.allclose(A @ coef, y):\n        raise ValueError(\"the fit does not reproduce the data\")" },
        { code: "if coef.min() < 0:\n        raise ValueError(\"a negative coefficient\")" }
      ],
      answer: 0,
      explain: { en: "The empty-residuals option is the interesting near-miss. An empty <code>ssr</code> is a real signal, and it fires in two unrelated cases &mdash; a rank-deficient matrix and a square one &mdash; so as a guard it conflates \"your columns are redundant\" with \"you have as many unknowns as measurements\", and its message cannot tell you which. The rank check catches the first case precisely and says so. The <code>allclose</code> option is false on every correct least-squares fit, and the negative-coefficient option is wrong as a general rule: a negative slope is an ordinary finding, and refusing it would reject every relationship that goes downwards.",
                 ar: "خيارُ البواقي الفارغة هو القريبُ المثير. فـ<code>ssr</code> الفارغة إشارةٌ حقيقية، وهي تنطلق في حالتين غيرِ ذاتَي صلة &mdash; مصفوفةٌ ناقصةُ الرتبة ومصفوفةٌ مربعة &mdash; فهي حرزًا تخلط «أعمدتُك مكرّرة» بـ«مجاهيلك بعدد قياساتك»، ولا تستطيع رسالتُها إخبارك أيُّهما. وفحصُ الرتبة يلتقط الحالةَ الأولى بدقّةٍ ويقولها. وخيارُ <code>allclose</code> كاذبٌ على كل مواءمة مربعاتٍ صغرى صحيحة، وخيارُ المعامِل السالب خاطئٌ قاعدةً عامة: فالميلُ السالب نتيجةٌ عادية، ورفضُه كان سيرفض كلَّ علاقةٍ تنحدر." }
    },
    {
      id: "c5bq13", type: "mcq", level: "hard", topics: ["drop-rows", "overdetermined", "residuals"],
      q: { en: "A colleague has ten measurements and three unknowns. <code>solve</code> raises, so they keep three measurements and delete seven. The code now runs. What is the strongest objection?",
           ar: "لزميلٍ عشرةُ قياسات وثلاثةُ مجاهيل. ترفع <code>solve</code> خطأً، فيُبقي ثلاثةَ قياسات ويحذف سبعة. فيعمل الكودُ الآن. فما أقوى اعتراض؟" },
      options: [
        { en: "The seven deleted measurements were the evidence that the three kept ones are not a fluke, and the fit now reports no residual at all, because a square system has none.", ar: "القياساتُ السبعة المحذوفة كانت البيّنةَ على أنّ الثلاثة المُبقاة ليست مصادفة، والمواءمةُ الآن لا تُبلغ باقيًا إطلاقًا، لأن النظامَ المربّع لا باقيَ له." },
        { en: "Deleting rows makes the matrix singular, so it will raise a different error instead.", ar: "حذفُ الصفوف يجعل المصفوفة شاذّة، فسترفع خطأً آخر بدلًا من ذلك." },
        { en: "Nothing much, provided they keep the three most recent measurements.", ar: "لا شيءَ يُذكر، بشرط أن يُبقوا أحدثَ ثلاثة قياسات." },
        { en: "The answer will be wrong because three equations cannot determine three unknowns.", ar: "سيكون الجوابُ خاطئًا لأن ثلاثَ معادلاتٍ لا تحدّد ثلاثةَ مجاهيل." }
      ],
      answer: 0,
      explain: { en: "The last option is simply false &mdash; three independent equations determine three unknowns exactly, which is why the code runs. That is the trap: the result is not an error, it is a precise answer to a question nobody wanted asked. And the practical sting is in the second half of the right answer: on a square system <code>lstsq</code> returns an empty residual array and <code>solve</code> returns none at all, so the one number that would have shown the fit was ignoring data has been deleted along with the data. Measured in the lesson on five students: 4.5 against 2.7, and that comparison is only possible because the discarded rows were kept around to score against.",
                 ar: "الخيارُ الأخير كاذبٌ بسادة &mdash; فثلاثُ معادلاتٍ مستقلة تحدّد ثلاثةَ مجاهيل بالضبط، ولذلك يعمل الكود. وذاك هو الفخ: فالنتيجةُ ليست خطأً، بل جوابٌ مضبوط لسؤالٍ لم يُرِد أحدٌ طرحه. واللذعةُ العملية في النصف الثاني من الجواب الصحيح: فعلى نظامٍ مربّع تُرجع <code>lstsq</code> مصفوفةَ بواقٍ فارغة ولا تُرجع <code>solve</code> شيئًا، فالعددُ الوحيد الذي كان سيُظهر أنّ المواءمة تُهمل بياناتٍ قد حُذف مع البيانات. وقياسًا في الدرس على خمسة طلبة: 4.5 مقابل 2.7، وتلك المقارنةُ لم تكن ممكنة إلا لأن الصفوف المرميّة أُبقيت ليُحرَز عليها." }
    },
    {
      id: "c5bq14", type: "trace", level: "hard", topics: ["solve", "ill-cond", "cond"],
      q: { en: "State the value at each point. Nothing raises.",
           ar: "حدّد القيمة عند كل موضع. ولا يُرفع شيء." },
      code: "A = np.array([[3., 2.],\n              [6., 4.000001]])\n\nx1 = np.linalg.solve(A, np.array([13.50, 27.00]))   # 1: x1[0]\nx2 = np.linalg.solve(A, np.array([13.50, 27.01]))   # 2: is x2[0] positive?\nok = np.allclose(A @ x2, np.array([13.50, 27.01]))  # 3: ok\nc = np.linalg.cond(A)                               # 4: order of magnitude of c",
      blanks: [
        { accept: ["4.5"], label: { en: "<code>x1[0]</code>", ar: "<code>x1[0]</code>" } },
        { accept: ["no", "No", "negative", "it is negative"], label: { en: "is <code>x2[0]</code> positive?", ar: "هل <code>x2[0]</code> موجب؟" } },
        { accept: ["True"], label: { en: "<code>ok</code>", ar: "<code>ok</code>" } },
        { accept: ["1e7", "10^7", "1e+07", "10 million", "ten million", "2e7"], label: { en: "roughly how large is <code>c</code>?", ar: "كم يبلغ <code>c</code> تقريبًا؟" } }
      ],
      explain: { en: "The first total gives a notebook at 4.50. The second, one penny different, gives minus 6662.17 &mdash; and the third blank is the one that should worry you, because the check passes. <code>allclose</code> is <code>True</code> for the catastrophic answer: it satisfies its own system to fifteen digits. The condition number, 2.17&times;10<sup>7</sup>, is the only number in this program that knows anything is wrong, and nothing in the program asks it before trusting the output.",
                 ar: "المجموعُ الأول يعطي دفترًا بـ 4.50. والثاني، بفرقِ قرشٍ واحد، يعطي سالب 6662.17 &mdash; والفراغُ الثالث هو ما ينبغي أن يقلقك، فالفحصُ ينجح. فـ<code>allclose</code> تساوي <code>True</code> للجواب الكارثي: فهو يحقّق نظامه إلى خمسة عشر رقمًا. وعددُ الحالة، 2.17&times;10<sup>7</sup>، هو العددُ الوحيد في هذا البرنامج الذي يعرف أنّ ثمّة خطأً، ولا شيء في البرنامج يسأله قبل الوثوق بالخَرج." }
    },
    {
      id: "c5bq15", type: "multi", level: "hard", topics: ["layout", "system", "allclose", "cond"],
      q: { en: "You transposed the design of a square system by accident. Select <strong>every</strong> statement that is true.",
           ar: "قلبتَ تخطيطَ نظامٍ مربّع بالخطأ. اختر <strong>كل</strong> جملةٍ صحيحة." },
      options: [
        { en: "<code>solve</code> will answer it without any complaint.", ar: "ستجيبه <code>solve</code> بلا أي اعتراض." },
        { en: "<code>np.allclose(A @ x, b)</code> will be <code>True</code>, because the answer solves the system you actually handed over.", ar: "ستكون <code>np.allclose(A @ x, b)</code> <code>True</code>، فالجوابُ يحلّ النظام الذي سلّمته فعلًا." },
        { en: "If the matrix happens to be symmetric, the answer will be identical to the correct one.", ar: "إن صادف أن كانت المصفوفة متناظرة كان الجوابُ مطابقًا للصحيح." },
        { en: "The condition number will reveal the mistake.", ar: "سيكشف عددُ الحالة الخطأ." },
        { en: "Reading the answer against what the quantities mean is the main thing that can catch it.", ar: "قراءةُ الجواب في ضوء معنى الكميات هي الشيءُ الرئيس الذي يستطيع التقاطه." },
        { en: "The shapes will not match, so the error surfaces at the call.", ar: "لن تتطابق الأشكال، فيظهر الخطأ عند النداء." }
      ],
      answer: [0, 1, 2, 4],
      explain: { en: "The condition-number option is the one to think hardest about, and it is false: <code>cond(A)</code> and <code>cond(A.T)</code> are equal, so the diagnostic that catches the chapter's other silent disaster is completely blind to this one. The shape option is false for the same reason the bug is dangerous &mdash; the transpose of a square matrix is square. That leaves the meaning of the numbers, which is why the chapter keeps coming back to it: a notebook at minus thirty-one pounds is the only alarm available.",
                 ar: "خيارُ عدد الحالة هو ما يستحقّ أشدَّ التفكير، وهو كاذب: فـ<code>cond(A)</code> و<code>cond(A.T)</code> متساويان، فأداةُ التشخيص التي تلتقط كارثةَ الفصل الصامتة الأخرى عمياءُ تمامًا عن هذه. وخيارُ الشكل كاذبٌ للسبب نفسه الذي يجعل العيبَ خطيرًا &mdash; فمنقولُ المصفوفة المربعة مربع. فيبقى معنى الأعداد، ولذلك يعود الفصلُ إليه: فدفترٌ بسالب واحدٍ وثلاثين جنيهًا هو الجرسُ الوحيد المتاح." }
    },
    {
      id: "c5bq16", type: "compare", level: "hard", topics: ["lstsq", "overdetermined", "residuals"],
      q: { en: "The same square system, two functions. What is the difference?",
           ar: "النظامُ المربّع نفسه، بدالتين. فما الفرق؟" },
      codeA: "A = np.array([[2., 1.],\n              [1., 3.]])\nb = np.array([8., 9.])\n\nprint(np.linalg.solve(A, b))",
      codeB: "A = np.array([[2., 1.],\n              [1., 3.]])\nb = np.array([8., 9.])\n\ncoef, ssr, rank, sv = np.linalg.lstsq(A, b, rcond=None)\nprint(coef)\nprint(ssr)",
      options: [
        { en: "Both print <code>[3. 2.]</code>. B prints a second line, <code>[]</code> &mdash; an empty array, because with as many equations as unknowns there is no residual to report.", ar: "يطبع كلاهما <code>[3. 2.]</code>. وتطبع (ب) سطرًا ثانيًا، <code>[]</code> &mdash; مصفوفةً فارغة، فحيث المعادلاتُ بعدد المجاهيل لا باقيَ يُبلَّغ." },
        { en: "B raises, because <code>lstsq</code> requires more rows than columns.", ar: "ترفع (ب) خطأً، فـ<code>lstsq</code> تتطلّب صفوفًا أكثر من الأعمدة." },
        { en: "B prints <code>[3. 2.]</code> then <code>[0.]</code>, since the fit is exact.", ar: "تطبع (ب) <code>[3. 2.]</code> ثم <code>[0.]</code>، فالمواءمةُ مضبوطة." },
        { en: "They print different coefficients, because <code>lstsq</code> minimises a different quantity.", ar: "يطبعان معاملات مختلفة، فـ<code>lstsq</code> تصغّر كميةً أخرى." }
      ],
      answer: 0,
      explain: { en: "The option that expects <code>[0.]</code> is the one almost everybody picks, and the distinction matters in code rather than in principle: <code>ssr</code> comes back as an array of shape <code>(0,)</code>, so <code>ssr[0]</code> raises <code>IndexError</code> and <code>ssr.size == 0</code> is the only safe way to ask. A function that reports fit quality by reading <code>ssr[0]</code> will therefore crash on exactly the inputs where the fit is perfect &mdash; which is a memorable, and avoidable, way to find this out. <code>lstsq</code> does minimise a different quantity in general, but on a square system of full rank the minimum is the exact solution, so the coefficients agree.",
                 ar: "الخيارُ الذي يتوقّع <code>[0.]</code> هو ما يختاره الجميعُ تقريبًا، والفرقُ يهمّ في الكود لا في المبدأ: فتعود <code>ssr</code> مصفوفةً بالشكل <code>(0,)</code>، فترفع <code>ssr[0]</code> خطأ <code>IndexError</code> وتكون <code>ssr.size == 0</code> الطريقةَ الآمنة الوحيدة للسؤال. ودالةٌ تُبلغ جودةَ المواءمة بقراءة <code>ssr[0]</code> ستتعطّل إذًا على المدخلات التي تكون المواءمةُ فيها تامّةً بالضبط &mdash; وتلك طريقةٌ لا تُنسى، ويمكن تجنّبها، لمعرفة هذا. و<code>lstsq</code> تصغّر كميةً أخرى عمومًا، لكن على نظامٍ مربّعٍ كاملِ الرتبة يكون الأصغرُ هو الحلَّ المضبوط، فتتفق المعاملات." }
    }
  ]
};
