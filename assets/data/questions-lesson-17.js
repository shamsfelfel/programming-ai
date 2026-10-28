/* ============================================================
   Lesson 17 (Lecture 19) — solving a linear system: laying a
   word problem out as a matrix and a vector, np.linalg.solve,
   checking with allclose, the singular matrix, and the
   nearly-singular one that answers anyway.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-17"] = {
  title: { en: "Lesson 17 Test — Solving a System", ar: "اختبار الدرس 17 — حلّ نظام" },
  intro: {
    en: "Twelve questions on Lesson 17 only. Two habits answer most of them: before you build a matrix, say out loud which way the rows run; and before you trust an answer, ask what would have told you if the question had been unanswerable.",
    ar: "اثنا عشر سؤالًا على الدرس 17 وحده. وعادتان تُجيبان أكثرها: قبل أن تبني مصفوفةً قل جهرًا في أي اتجاه تجري الصفوف؛ وقبل أن تثق بجوابٍ اسأل ما كان سيخبرك لو كان السؤالُ غيرَ قابلٍ للإجابة."
  },
  questions: [
    {
      id: "t17q1", type: "tf", level: "easy", topics: ["layout", "system"],
      q: { en: "In the matrix handed to <code>np.linalg.solve</code>, each <em>row</em> holds one unknown and each <em>column</em> holds one equation.",
           ar: "في المصفوفة المُسلَّمة إلى <code>np.linalg.solve</code>، يحمل كلُّ <em>صفٍّ</em> مجهولًا واحدًا ويحمل كلُّ <em>عمودٍ</em> معادلةً واحدة." },
      truth: false,
      explain: { en: "It is the other way round: one row per equation, one column per unknown. Getting it backwards is not caught by anything, because the transpose of a square matrix is still a square matrix &mdash; <code>solve</code> takes it and answers. In the lesson's shirts-and-caps case the transposed layout returned <code>[2. 5.]</code>, a pair of clean round numbers, while the correct layout returned <code>[4.3077 2.0769]</code>. The wrong answer looked better than the right one.",
                 ar: "العكسُ هو الصحيح: صفٌّ لكل معادلة وعمودٌ لكل مجهول. وقلبُه لا يلتقطه شيء، لأن منقولَ المصفوفة المربعة مصفوفةٌ مربعة &mdash; فتأخذها <code>solve</code> وتجيب. وفي حالة القمصان والقبعات في الدرس أرجع التخطيطُ المقلوب <code>[2. 5.]</code>، زوجًا من الأعداد الصحيحة النظيفة، وأرجع التخطيطُ الصحيح <code>[4.3077 2.0769]</code>. فبدا الجوابُ الخاطئ أحسنَ من الصحيح." }
    },
    {
      id: "t17q2", type: "mcq", level: "easy", topics: ["solve", "system"],
      q: { en: "Two orders: 2 of the first item and 1 of the second came to 8.00; 1 of the first and 3 of the second came to 9.00. Which line finds the two unit prices?",
           ar: "أمران: اثنان من البند الأول وواحدٌ من الثاني بلغا 8.00؛ وواحدٌ من الأول وثلاثةٌ من الثاني بلغا 9.00. فأيُّ سطرٍ يجد سعري الوحدة؟" },
      code: "A = np.array([[2., 1.],\n              [1., 3.]])\nb = np.array([8., 9.])",
      options: [
        { code: "print(np.linalg.solve(A, b))" },
        { code: "print(np.linalg.solve(b, A))" },
        { code: "print(A @ b)" },
        { code: "print(b / A)" }
      ],
      answer: 0,
      explain: { en: "<code>solve(A, b)</code> &mdash; the table first, the totals second &mdash; prints <code>[3. 2.]</code>. Swapping the arguments raises, because <code>b</code> is not square, and that is the friendly failure. The other two are the ones to look at: <code>A @ b</code> runs happily and prints <code>[25. 35.]</code>, which is what you get for multiplying when you meant to divide; and <code>b / A</code> also runs, broadcasting <code>b</code> across the rows to print a 2&times;2 table of ratios. Two of the four wrong answers produce output, and neither resembles a price.",
                 ar: "<code>solve(A, b)</code> &mdash; الجدولُ أولًا والمجاميعُ ثانيًا &mdash; تطبع <code>[3. 2.]</code>. وتبديلُ الوسيطين يرفع خطأً، لأن <code>b</code> ليست مربعة، وذاك الفشلُ الودود. والآخران هما ما يستحقّ النظر: فـ<code>A @ b</code> تعمل راضيةً وتطبع <code>[25. 35.]</code>، وهو ما تناله إذ تضرب وأنت تريد القسمة؛ و<code>b / A</code> تعمل أيضًا، فتبثّ <code>b</code> على الصفوف لتطبع جدولًا 2&times;2 من النسب. فاثنان من الأجوبة الخاطئة الأربعة يُنتجان خَرجًا، ولا يشبه أيٌّ منهما سعرًا." }
    },
    {
      id: "t17q3", type: "output", level: "easy", topics: ["solve", "allclose"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما هذا." },
      code: "import numpy as np\n\nA = np.array([[2., 1.],\n              [1., 3.]])\nb = np.array([8., 9.])\n\nx = np.linalg.solve(A, b)\nprint(x)\nprint(np.allclose(A @ x, b))",
      blanks: [{ accept: ["[3. 2.]\nTrue"], lines: 2 }],
      explain: { en: "Three of the first item and two of the second: 2&times;3 + 1&times;2 = 8, and 1&times;3 + 3&times;2 = 9. Both check out, so <code>allclose</code> is <code>True</code>. Note the formatting of the first line &mdash; <code>[3. 2.]</code> with trailing dots, because the array is floating point. <code>[3, 2]</code> would be the answer to a different question.",
                 ar: "ثلاثةٌ من البند الأول واثنان من الثاني: 2&times;3 + 1&times;2 = 8، و1&times;3 + 3&times;2 = 9. وكلاهما يصحّ، فتكون <code>allclose</code> <code>True</code>. ولاحظ هيئة السطر الأول &mdash; <code>[3. 2.]</code> بنقطتين لاحقتين، لأن المصفوفة عشرية. و<code>[3, 2]</code> كانت ستكون جواب سؤالٍ آخر." }
    },
    {
      id: "t17q4", type: "fill", level: "medium", topics: ["cond"],
      q: { en: "Fill the blank so the line prints how much an error in the data would be multiplied on its way to the answer.",
           ar: "أكمل الفراغ ليطبع السطرُ كم سيُضاعَف خطأٌ في البيانات في طريقه إلى الجواب." },
      code: "A = np.array([[2., 1.],\n              [1., 3.]])\n\nprint(np.linalg.____(A))",
      blanks: [{ accept: ["cond"], label: { en: "the function name", ar: "اسم الدالة" } }],
      explain: { en: "<code>np.linalg.cond(A)</code> prints <code>2.6180339887498953</code> here, which is about as well-behaved as a matrix gets: an error in the totals comes out roughly the size it went in. <code>det</code> is the tempting wrong answer and it is the subject of <a href=\"#l18-s6\">Lesson 18</a> &mdash; it would print <code>5.000000000000001</code> &mdash; not even exactly 5 &mdash; and that number tells you nothing on its own, because it changes if you measure in pence instead of pounds. <code>matrix_rank</code> would print 2, which says the columns are independent and says nothing about trust.",
                 ar: "<code>np.linalg.cond(A)</code> تطبع <code>2.6180339887498953</code> هنا، وهي بحسن سلوكٍ تكاد لا تبلغه مصفوفة: فخطأٌ في المجاميع يخرج بحجمه الذي دخل به تقريبًا. و<code>det</code> هي الجوابُ الخاطئ المُغري وهي موضوع <a href=\"#l18-s6\">الدرس 18</a> &mdash; وكانت ستطبع <code>5.000000000000001</code> &mdash; ولا 5 بالضبط &mdash; وذلك العددُ لا يخبرك بشيء وحده، لأنه يتغيّر إن قِستَ بالقروش لا بالجنيهات. و<code>matrix_rank</code> كانت ستطبع 2، وهو يقول إنّ الأعمدة مستقلة ولا يقول شيئًا عن الثقة." }
    },
    {
      id: "t17q5", type: "order", level: "medium", topics: ["system", "layout", "solve", "allclose"],
      q: { en: "Put the steps in order, from a word problem to an answer you are willing to put in an email.",
           ar: "رتّب الخطوات، من مسألةٍ لفظية إلى جوابٍ ترضى بوضعه في بريد." },
      items: [
        { en: "Decide the order of the unknowns and write it down, because nothing in the output will remind you.", ar: "قرّر ترتيبَ المجاهيل واكتبه، فليس في الخَرج ما يذكّرك به." },
        { en: "Build <code>A</code> with one row per equation and one column per unknown, and <code>b</code> with the totals in the same row order.", ar: "ابنِ <code>A</code> بصفٍّ لكل معادلة وعمودٍ لكل مجهول، و<code>b</code> بالمجاميع بترتيب الصفوف نفسه." },
        { en: "Look at <code>np.linalg.cond(A)</code> and stop if it is large, because that is a fact about the question and not about the answer.", ar: "انظر في <code>np.linalg.cond(A)</code> وتوقّف إن كان كبيرًا، فذلك واقعٌ عن السؤال لا عن الجواب." },
        { en: "Call <code>np.linalg.solve(A, b)</code>.", ar: "نادِ <code>np.linalg.solve(A, b)</code>." },
        { en: "Confirm with <code>np.allclose(A @ x, b)</code>.", ar: "أكّد بـ <code>np.allclose(A @ x, b)</code>." },
        { en: "Check the answer against what the quantities mean &mdash; that no price came out negative.", ar: "افحص الجوابَ في ضوء معنى الكميات &mdash; ألّا يكون سعرٌ قد خرج سالبًا." }
      ],
      answer: [0, 1, 2, 3, 4, 5],
      explain: { en: "Two placements carry the weight. The condition number comes <em>before</em> the call, not after: it describes the question, so asking it afterwards invites you to believe an answer you have already read. And the meaning check comes last, after the arithmetic check, because the two catch different failures &mdash; <code>allclose</code> catches a mistake in your code, and \"prices are not negative\" catches a question that had no sensible answer. In the lesson's one-penny case <code>allclose</code> returned <code>True</code> for a notebook priced at minus six thousand pounds.",
                 ar: "موضعان يحملان الثقل. عددُ الحالة يأتي <em>قبل</em> النداء لا بعده: فهو يصف السؤال، فسؤالُه بعدها يدعوك إلى تصديق جوابٍ قرأته سلفًا. وفحصُ المعنى يأتي أخيرًا، بعد فحص الحساب، لأن الاثنين يلتقطان فشلين مختلفين &mdash; فـ<code>allclose</code> تلتقط خطأً في كودك، و«الأسعار ليست سالبة» تلتقط سؤالًا لم يكن له جوابٌ معقول. وفي حالة القرش الواحد في الدرس أرجعت <code>allclose</code> <code>True</code> لدفترٍ سعرُه سالب ستة آلاف جنيه." }
    },
    {
      id: "t17q6", type: "match", level: "medium", topics: ["singular", "ill-cond", "allclose", "layout"],
      q: { en: "Match each thing you might see to what it actually tells you.",
           ar: "طابِق كلَّ ما قد تراه بما يخبرك به فعلًا." },
      leftHead: { en: "What you see", ar: "ما ترى" },
      rightHead: { en: "What it means", ar: "ما يعني" },
      pairs: [
        { l: { code: "LinAlgError: Singular matrix" },
          r: { en: "The matrix does not pin down an answer &mdash; either none exists or infinitely many do, and this message does not say which.", ar: "المصفوفةُ لا تحدّد جوابًا &mdash; فإمّا لا وجود لجوابٍ وإمّا أجوبةٌ لا نهائية، وهذه الرسالة لا تقول أيَّهما." } },
        { l: { code: "LinAlgError: Last 2 dimensions of the array must be square" },
          r: { en: "The matrix is not square at all: there are more equations than unknowns, or fewer, which is a different function's job.", ar: "المصفوفةُ ليست مربعةً أصلًا: فالمعادلاتُ أكثر من المجاهيل أو أقلّ، وذاك عملُ دالةٍ أخرى." } },
        { l: { code: "print(A @ x == b)  ->  [False  True]" },
          r: { en: "Nothing is wrong. One entry differs in the fifteenth digit, which is how decimals are stored, and this is why the check is <code>np.allclose</code>.", ar: "لا خطأ. فمدخلٌ يختلف في الرقم الخامس عشر، وذاك كيف تُخزَّن العشريات، ولهذا كان الفحصُ <code>np.allclose</code>." } },
        { l: { code: "print(np.linalg.cond(A))  ->  2.1e+07" },
          r: { en: "An answer will come back and should not be trusted: a tiny error in the totals arrives at the answer multiplied by millions.", ar: "سيعود جوابٌ ولا ينبغي الوثوق به: فخطأٌ ضئيل في المجاميع يصل إلى الجواب مضروبًا بالملايين." } },
        { l: { code: "print(x)  ->  [-31.75  21.75]" },
          r: { en: "The arithmetic is fine and the layout is not. A transposed table answers cleanly and means nothing.", ar: "الحسابُ سليم والتخطيطُ ليس كذلك. فالجدولُ المقلوب يجيب نظيفًا ولا يعني شيئًا." } }
      ],
      explain: { en: "The two <code>LinAlgError</code> messages are worth telling apart because they call for opposite reactions: <em>singular</em> means look at your data, and <em>must be square</em> means use <code>lstsq</code> instead, which is <a href=\"#lesson-18\">Lesson 18</a>. The last two pairs are the dangerous half of this table, because neither of them is an error at all &mdash; one is a number you have to go and ask for, and the other is an answer you have to read with the question in mind.",
                 ar: "رسالتا <code>LinAlgError</code> تستحقّان التمييز لأنهما تستدعيان ردّين متعاكسين: فـ<em>شاذّة</em> تعني انظر في بياناتك، و<em>يجب أن تكون مربعة</em> تعني استعمل <code>lstsq</code>، وذاك <a href=\"#lesson-18\">الدرس 18</a>. والزوجان الأخيران هما النصفُ الخطير من هذا الجدول، فليس أيٌّ منهما خطأً أصلًا &mdash; فأحدهما عددٌ عليك أن تذهب وتسأله، والآخرُ جوابٌ عليك أن تقرأه والسؤالُ في ذهنك." }
    },
    {
      id: "t17q7", type: "error", level: "medium", topics: ["layout", "system"],
      q: { en: "Two shirts and five caps came to 19.00; three shirts and one cap came to 15.00. This prints <code>[2. 5.]</code>, which is wrong. Click the line to change.",
           ar: "قميصان وخمس قبعات بلغا 19.00؛ وثلاثة قمصان وقبعةٌ بلغت 15.00. يطبع هذا <code>[2. 5.]</code> وهو خطأ. اضغط السطرَ الذي يجب تغييره." },
      code: "import numpy as np\n\n# 2 shirts and 5 caps came to 19.00\n# 3 shirts and 1 cap came to 15.00\nA = np.array([[2., 3.], [5., 1.]])\nb = np.array([19., 15.])\n\nx = np.linalg.solve(A, b)\nprint(np.round(x, 4))",
      answer: 5,
      explain: { en: "The quantities are all present and all in the wrong places. The first row should be the first order &mdash; 2 shirts, 5 caps &mdash; and instead it holds the shirts from both orders. Corrected, the answer is <code>[4.3077 2.0769]</code>: a shirt at 4.31 and a cap at 2.08. Notice which answer looks more like a price list. The wrong layout returned <code>2.</code> and <code>5.</code> exactly, because those are the quantities from the first order reappearing as prices, and a reader checking for plausibility would have nodded it through.",
                 ar: "الكمياتُ كلها حاضرة وكلها في غير مواضعها. فالصفُّ الأول ينبغي أن يكون الأمرَ الأول &mdash; قميصان وخمس قبعات &mdash; وهو يحمل بدلًا من ذلك قمصانَ الأمرين. ومصحّحًا، الجوابُ <code>[4.3077 2.0769]</code>: قميصٌ بـ 4.31 وقبعةٌ بـ 2.08. ولاحظ أيُّ جوابٍ يشبه قائمةَ أسعارٍ أكثر. فقد أرجع التخطيطُ الخاطئ <code>2.</code> و<code>5.</code> بالضبط، لأنها كمياتُ الأمر الأول تعود أسعارًا، وقارئٌ يفحص المعقولية كان سيُمرّرها بإيماءة." },
      solution: { code: "A = np.array([[2., 5.], [3., 1.]])" }
    },
    {
      id: "t17q8", type: "compare", level: "medium", topics: ["inv-vs-solve", "solve"],
      q: { en: "The same three-unknown system, two ways. What is the difference?",
           ar: "النظامُ نفسه بثلاثة مجاهيل، بطريقتين. فما الفرق؟" },
      codeA: "A = np.array([[2., 1., 0.],\n              [1., 3., 1.],\n              [0., 1., 2.]])\nb = np.array([8., 13., 11.])\n\nprint(np.linalg.solve(A, b))",
      codeB: "A = np.array([[2., 1., 0.],\n              [1., 3., 1.],\n              [0., 1., 2.]])\nb = np.array([8., 13., 11.])\n\nprint(np.linalg.inv(A) @ b)",
      options: [
        { en: "Both print <code>[3.125 1.75  4.625]</code>. On a well-conditioned system like this one they agree, and the reasons to prefer A show up elsewhere: it does less arithmetic, and it was measured about two and a half times faster on a large system.", ar: "يطبع كلاهما <code>[3.125 1.75  4.625]</code>. وعلى نظامٍ حسن الحالة كهذا يتفقان، وتظهر أسبابُ تفضيل (أ) في مكانٍ آخر: فهي تؤدّي حسابًا أقلّ، وقد قيست أسرعَ بمرتين ونصفٍ تقريبًا على نظامٍ كبير." },
        { en: "B raises, because <code>inv</code> needs a square matrix and this one is 3&times;3.", ar: "ترفع (ب) خطأً، لأن <code>inv</code> تحتاج مصفوفةً مربعة وهذه 3&times;3." },
        { en: "They print different answers, because the inverse introduces rounding that <code>solve</code> avoids.", ar: "يطبعان جوابين مختلفين، لأن المعكوس يُدخل تقريبًا تتجنّبه <code>solve</code>." },
        { en: "A prints the answer and B prints the inverse matrix, because <code>@</code> binds more tightly than the function call.", ar: "تطبع (أ) الجوابَ وتطبع (ب) مصفوفةَ المعكوس، لأن <code>@</code> أوثقُ ارتباطًا من نداء الدالة." }
      ],
      answer: 0,
      explain: { en: "The claim that they differ is the one worth taking seriously, because it is what you may have been told, and on <em>this</em> system it is false: <code>np.allclose</code> on the two results is <code>True</code>, and both print identically. The honest statement is narrower and still worth acting on &mdash; the inverse does strictly more arithmetic, so it has more places to lose a digit, and the system where that matters is the badly-conditioned one where you are already in trouble. Prefer <code>solve</code> as a habit, not because this example punishes you.",
                 ar: "الادعاءُ أنهما يختلفان هو ما يستحقّ أخذه بجدية، فهو ما قد قيل لك، وهو على <em>هذا</em> النظام كاذب: فـ<code>np.allclose</code> على النتيجتين <code>True</code>، ويطبعان متطابقين. والجملةُ الصادقة أضيقُ ويُعمل بها مع ذلك &mdash; فالمعكوسُ يؤدّي حسابًا أكثر قطعًا، فمواضعُ فقدِ رقمٍ فيه أكثر، والنظامُ الذي يهمّ فيه ذلك هو سيّئُ الحالة الذي أنت فيه في ورطةٍ أصلًا. ففضّل <code>solve</code> عادةً، لا لأن هذا المثال يعاقبك." }
    },
    {
      id: "t17q9", type: "multi", level: "hard", topics: ["ill-cond", "cond", "singular", "allclose"],
      q: { en: "<code>np.linalg.cond(A)</code> is 2.1&times;10<sup>7</sup> and <code>solve</code> returned an answer. Select <strong>every</strong> true statement.",
           ar: "<code>np.linalg.cond(A)</code> تساوي 2.1&times;10<sup>7</sup> وأرجعت <code>solve</code> جوابًا. اختر <strong>كل</strong> جملةٍ صحيحة." },
      options: [
        { en: "<code>np.allclose(A @ x, b)</code> will almost certainly be <code>True</code>, and that tells you nothing about whether the answer is useful.", ar: "<code>np.allclose(A @ x, b)</code> ستكون <code>True</code> في شبه اليقين، وذلك لا يخبرك بشيء عن كونِ الجواب نافعًا." },
        { en: "A small change in <code>b</code> can change the answer enormously.", ar: "تغييرٌ صغير في <code>b</code> قد يغيّر الجوابَ تغييرًا هائلًا." },
        { en: "The matrix is not singular, since a singular one would have raised or had an infinite condition number.", ar: "المصفوفةُ ليست شاذّة، فالشاذّةُ كانت سترفع خطأً أو يكون عددُ حالتها لا نهائيًّا." },
        { en: "Checking that the answer makes sense in its own units &mdash; prices positive, ages under 120 &mdash; is more likely to catch the problem than any numerical check on the result.", ar: "فحصُ أنّ الجوابَ معقولٌ بوحداته &mdash; الأسعارُ موجبة والأعمارُ دون 120 &mdash; أرجحُ في التقاط المشكلة من أي فحصٍ عدديٍّ على النتيجة." },
        { en: "Using <code>inv(A) @ b</code> instead would give a more reliable answer, because it does not depend on pivoting.", ar: "استعمالُ <code>inv(A) @ b</code> بدلًا منها كان سيعطي جوابًا أوثق، لأنه لا يتعلّق بالمحورية." },
        { en: "Recomputing with the same inputs would give a different answer each time.", ar: "إعادةُ الحساب بالمدخلات نفسها كانت ستعطي جوابًا مختلفًا كلَّ مرة." }
      ],
      answer: [0, 1, 3],
      explain: { en: "The statement about singularity is the interesting wrong one. A condition number of twenty-one million is not infinite, so the matrix is formally non-singular &mdash; but the lesson's own example shows an exactly singular matrix with a <em>finite</em> condition number of 1.2&times;10<sup>16</sup> that <code>solve</code> answered without raising, so \"it did not raise, therefore it is not singular\" is not an inference you can make. The claim about recomputing is worth refuting too: this arithmetic is deterministic, and the same inputs give the same answer every time. That is exactly what makes the failure hard to notice &mdash; it is stable, repeatable and wrong.",
                 ar: "الجملةُ عن الشذوذ هي الخاطئةُ المثيرة. فعددُ حالةٍ يبلغ أحدًا وعشرين مليونًا ليس لا نهائيًّا، فالمصفوفةُ غيرُ شاذّةٍ شكليًّا &mdash; لكن مثالَ الدرس نفسه يُظهر مصفوفةً شاذّةً بالضبط بعدد حالةٍ <em>منتهٍ</em> يبلغ 1.2&times;10<sup>16</sup> أجابت عنها <code>solve</code> بلا رفع خطأ، فـ«لم ترفع خطأً فهي غير شاذّة» ليس استنتاجًا تستطيعه. والادعاءُ عن إعادة الحساب يستحقّ الردَّ أيضًا: فهذا الحسابُ محدَّد، والمدخلاتُ نفسها تعطي الجوابَ نفسه كلَّ مرة. وذاك بالضبط ما يجعل الفشل عسيرَ الملاحظة &mdash; فهو ثابتٌ ومتكرّرٌ وخاطئ." }
    },
    {
      id: "t17q10", type: "trace", level: "hard", topics: ["solve", "system", "layout"],
      q: { en: "State the shape or the value at each point. No line prints anything, and the last one is not a typing mistake.",
           ar: "حدّد الشكل أو القيمة عند كل موضع. ولا يطبع أيُّ سطرٍ شيئًا، والأخيرُ ليس خطأً مطبعيًّا." },
      code: "A = np.array([[2., 1., 0.],\n              [1., 3., 1.],\n              [0., 1., 2.]])\nb = np.array([8., 13., 11.])\n\nx = np.linalg.solve(A, b)        # 1: x.shape\nchecked = A @ x                  # 2: checked.shape\nok = np.allclose(checked, b)     # 3: ok\nwrong = np.linalg.solve(A.T, b)  # 4: allclose(wrong, x)?",
      blanks: [
        { accept: ["(3,)", "(3, )"], label: { en: "<code>x.shape</code>", ar: "<code>x.shape</code>" } },
        { accept: ["(3,)", "(3, )"], label: { en: "<code>checked.shape</code>", ar: "<code>checked.shape</code>" } },
        { accept: ["True"], label: { en: "<code>ok</code>", ar: "<code>ok</code>" } },
        { accept: ["True"], label: { en: "<code>np.allclose(wrong, x)</code>", ar: "<code>np.allclose(wrong, x)</code>" } }
      ],
      explain: { en: "The first three are routine: a <code>(3, 3)</code> matrix and a <code>(3,)</code> vector give a <code>(3,)</code> answer, multiplying back gives <code>(3,)</code> again, and the check passes. The fourth is the point, and the answer is <code>True</code> &mdash; the transposed system returns the <em>identical</em> answer, <code>[3.125 1.75  4.625]</code>. Read <code>A</code> again and you will see why: it is symmetric, so <code>A.T</code> <em>is</em> <code>A</code>, and transposing it changed nothing at all. That is the exception and not the rule, and it is worth meeting once. A symmetric matrix forgives a transposed layout silently; every other matrix answers a different question just as silently. Neither case raises, so what protects you is writing the layout down before you build the matrix, not a check afterwards.",
                 ar: "الثلاثةُ الأولى روتين: فمصفوفةٌ <code>(3, 3)</code> ومتجهٌ <code>(3,)</code> يعطيان جوابًا <code>(3,)</code>، والضربُ العكسي يعطي <code>(3,)</code> مرةً أخرى، وينجح الفحص. والرابع هو المقصود، والجوابُ <code>True</code> &mdash; فالنظامُ المقلوب يُرجع الجوابَ <em>نفسه</em>، <code>[3.125 1.75  4.625]</code>. وأعِد قراءة <code>A</code> فترى السبب: فهي متناظرة، فـ<code>A.T</code> <em>هي</em> <code>A</code>، ولم يغيّر قلبُها شيئًا إطلاقًا. وتلك هي الاستثناء لا القاعدة، وتستحقّ أن تُلقى مرةً. فالمصفوفةُ المتناظرة تغفر التخطيطَ المقلوب في صمت؛ وكلُّ مصفوفةٍ أخرى تجيب سؤالًا مختلفًا في الصمت نفسه. ولا ترفع أيُّ الحالتين خطأً، فالذي يحميك كتابةُ التخطيط قبل بناء المصفوفة لا فحصٌ بعده." }
    },
    {
      id: "t17q11", type: "complete", level: "hard", topics: ["cond", "ill-cond", "allclose"],
      q: { en: "This function must refuse questions it cannot answer meaningfully, rather than returning a confident wrong price. Which line goes in the gap?",
           ar: "على هذه الدالة أن ترفض أسئلةً لا تستطيع إجابتها إجابةً ذات معنى، لا أن تُرجع سعرًا خاطئًا واثقًا. فأيُّ سطرٍ يذهب في الفراغ؟" },
      code: "def price_items(A, b):\n    # which line?\n\n    x = np.linalg.solve(A, b)\n    if not np.allclose(A @ x, b):\n        raise ValueError(\"the answer does not satisfy the system\")\n    return x",
      options: [
        { code: "if np.linalg.cond(A) > 1e8:\n        raise ValueError(\"the data barely pins down an answer\")" },
        { code: "if np.linalg.det(A) == 0:\n        raise ValueError(\"singular matrix\")" },
        { code: "if A.shape[0] != A.shape[1]:\n        raise ValueError(\"not square\")" },
        { code: "if not np.allclose(A, A.T):\n        raise ValueError(\"matrix is not symmetric\")" }
      ],
      answer: 0,
      explain: { en: "The determinant test is the one most people reach for and it fails twice over: it is a floating-point equality, so it is almost never exactly <code>True</code>, and the lesson's catastrophic matrix had a determinant of 0.000003, which is not zero, so it would have been waved through. The shape test is not wrong, it is redundant &mdash; <code>solve</code> already raises a clear <code>LinAlgError</code> for a non-square matrix, and duplicating that check buys nothing. The symmetry test is a real check for a different purpose entirely and would reject most valid price problems. One honest caveat on the right answer: <code>1e8</code> is a guess, and in the lesson's own example a condition number of 2.17&times;10<sup>7</sup> slipped under it &mdash; which is why the function should also refuse a negative price.",
                 ar: "فحصُ المحدِّد هو ما يمتدّ إليه أكثرُ الناس وهو يفشل مرتين: فهو مساواةٌ عشرية فلا يكون <code>True</code> مضبوطًا إلا نادرًا، ومحدِّدُ المصفوفة الكارثية في الدرس كان 0.000003، وهو ليس صفرًا، فكانت ستُمرَّر. وفحصُ الشكل ليس خاطئًا بل زائدًا &mdash; فـ<code>solve</code> ترفع <code>LinAlgError</code> واضحًا للمصفوفة غير المربعة أصلًا، وتكرارُ ذلك الفحص لا يشتري شيئًا. وفحصُ التناظر فحصٌ حقيقيٌّ لغرضٍ آخر تمامًا وكان سيرفض أكثرَ مسائل الأسعار الصحيحة. وحاشيةٌ نزيهةٌ على الجواب الصحيح: <code>1e8</code> تخمين، وفي مثال الدرس نفسه أفلت منه عددُ حالةٍ يبلغ 2.17&times;10<sup>7</sup> &mdash; ولذلك ينبغي للدالة أن ترفض سعرًا سالبًا أيضًا." }
    },
    {
      id: "t17q12", type: "output", level: "hard", topics: ["ill-cond", "cond"],
      q: { en: "The quantity 4.000001 came from a weight, not a count. Write the two lines this prints.",
           ar: "الكميةُ 4.000001 جاءت من وزنٍ لا من عدّ. اكتب السطرين الذين يطبعهما هذا." },
      code: "import numpy as np\n\nA = np.array([[3., 2.],\n              [6., 4.000001]])\n\nprint(np.linalg.solve(A, np.array([13.50, 27.00])))\nprint(np.linalg.solve(A, np.array([13.50, 27.01])))",
      blanks: [{ accept: ["[ 4.5 -0. ]\n[-6662.16666574  9999.9999986 ]"], lines: 2 }],
      explain: { en: "One penny on the second total, and the first item goes from 4.50 to minus 6662.17. Neither call raises, neither warns, and both answers satisfy their own system to fifteen digits. Two details in the printed form are worth noticing because they are the only visible oddities: the <code>-0.</code> in the first line, which is negative zero and a hint that the arithmetic is operating at the edge of its precision; and the trailing space in <code>9999.9999986 </code>, which is NumPy aligning the column widths. Neither is the bug. The bug is <code>cond(A)</code>, which is 2.17&times;10<sup>7</sup>, and nothing in this output mentions it.",
                 ar: "قرشٌ على المجموع الثاني، فيذهب البندُ الأول من 4.50 إلى سالب 6662.17. ولا يرفع أيُّ النداءين خطأً، ولا يحذّر، وكلا الجوابين يحقّق نظامه إلى خمسة عشر رقمًا. وتفصيلان في الهيئة المطبوعة يستحقّان الملاحظة لأنهما الغرابتان الظاهرتان وحدهما: <code>-0.</code> في السطر الأول، وهو صفرٌ سالب وإشارةٌ إلى أنّ الحساب يعمل على حدّ دقّته؛ والمسافةُ اللاحقة في <code>9999.9999986 </code>، وهي نمباي تُحاذي عرضَ الأعمدة. وليس أيٌّ منهما العيب. فالعيبُ <code>cond(A)</code>، وهي 2.17&times;10<sup>7</sup>، وليس في هذا الخَرج ذكرٌ لها." }
    }
  ]
};
