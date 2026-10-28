/* ============================================================
   Lesson 18 (Lecture 20) — least squares: the overdetermined
   system, the column of ones, lstsq and its four returns,
   matrix_rank against the column count, and why the
   determinant is not a singularity test.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-18"] = {
  title: { en: "Lesson 18 Test — Least Squares and Diagnostics", ar: "اختبار الدرس 18 — المربعات الصغرى والتشخيص" },
  intro: {
    en: "Twelve questions on Lesson 18 only. Two habits answer most of them: count the columns of your design matrix and ask what each one is for; and before quoting a coefficient, ask whether anything guarantees it is the only coefficient that would have fitted.",
    ar: "اثنا عشر سؤالًا على الدرس 18 وحده. وعادتان تُجيبان أكثرها: عُدّ أعمدةَ مصفوفة تصميمك واسأل ما وظيفةُ كلٍّ منها؛ وقبل أن تقتبس معامِلًا اسأل هل يضمن شيءٌ أنه المعامِلُ الوحيد الذي كان سيلائم."
  },
  questions: [
    {
      id: "t18q1", type: "tf", level: "easy", topics: ["intercept"],
      q: { en: "The column of ones in a design matrix is the intercept: leave it out and you have forced the fitted line through the origin.",
           ar: "عمودُ الآحاد في مصفوفة التصميم هو المقطع: أسقِطه فتكون أجبرت الخطَّ المُلائَم على المرور بنقطة الأصل." },
      truth: true,
      explain: { en: "In <code>mark = c + m &times; hours</code> the <code>c</code> is multiplied by 1 for every student, so its column of coefficients is a column of ones. Drop it and the only line available is <code>mark = m &times; hours</code>, which must pass through (0, 0). On the lesson's five students that forced line reports a slope of 17.29 and a sum of squared residuals of 2002.35, against 2.70 for the honest fit. It does not raise, and the slope it reports is nearly four times the real one.",
                 ar: "في <code>mark = c + m &times; hours</code> تُضرب <code>c</code> في 1 لكل طالب، فعمودُ معاملاتها عمودُ آحاد. أسقِطه فيكون الخطُّ الوحيد المتاح <code>mark = m &times; hours</code>، ولا بدّ أن يمرّ بـ (0، 0). وعلى طلبة الدرس الخمسة يُبلغ ذلك الخطُّ المُجبَر ميلًا 17.29 ومجموعَ أخطاءٍ مربّعة 2002.35، مقابل 2.70 للمواءمة النزيهة. ولا يرفع خطأً، والميلُ الذي يُبلغه نحوُ أربعة أضعاف الحقيقي." }
    },
    {
      id: "t18q2", type: "mcq", level: "easy", topics: ["lstsq", "overdetermined"],
      q: { en: "Five students, two unknowns. Which line fits the best line?",
           ar: "خمسةُ طلبة ومجهولان. فأيُّ سطرٍ يلائم أفضلَ خط؟" },
      code: "hours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\nA = np.column_stack([np.ones(5), hours])",
      options: [
        { code: "coef = np.linalg.lstsq(A, marks, rcond=None)[0]" },
        { code: "coef = np.linalg.solve(A, marks)" },
        { code: "coef = np.linalg.inv(A) @ marks" },
        { code: "coef = np.linalg.solve(A[:2], marks[:2])" }
      ],
      answer: 0,
      explain: { en: "<code>solve</code> and <code>inv</code> both raise, and they raise with the same complaint &mdash; <code>Last 2 dimensions of the array must be square</code> &mdash; because neither has anything to say about a 5&times;2 matrix. That is the helpful kind of failure. The last option is the dangerous one: it runs, it returns two plausible numbers, and it has quietly thrown away three of the five students. In the lesson it scored 4.5 against least squares' 2.7, and nothing in its output mentioned the discarded rows.",
                 ar: "ترفع <code>solve</code> و<code>inv</code> كلتاهما خطأً، وبالشكوى نفسها &mdash; <code>Last 2 dimensions of the array must be square</code> &mdash; لأن ليس لأيٍّ منهما ما تقوله في مصفوفة 5&times;2. وذاك الفشلُ النافع. والخيارُ الأخير هو الخطير: فهو يعمل ويُرجع عددين معقولين وقد رمى في صمتٍ ثلاثةً من الطلبة الخمسة. وقد أحرز في الدرس 4.5 مقابل 2.7 للمربعات الصغرى، ولم يذكر خَرجُه الصفوفَ المرميّة." }
    },
    {
      id: "t18q3", type: "output", level: "easy", topics: ["lstsq", "residuals"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما هذا." },
      code: "import numpy as np\n\nhours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\nA = np.column_stack([np.ones(5), hours])\n\ncoef, ssr, rank, sv = np.linalg.lstsq(A, marks, rcond=None)\nprint(coef)\nprint(ssr)",
      blanks: [{ accept: ["[46.9  4.5]\n[2.7]"], lines: 2 }],
      explain: { en: "Start at 46.9, add 4.5 a revision hour. The second line is the detail worth remembering: <code>[2.7]</code> in brackets, because <code>ssr</code> is an <em>array</em> and not a number. Writing <code>if ssr &lt; 1</code> on it compares an array with a number and gives you an array of booleans, and on a square system <code>ssr</code> comes back empty, so <code>ssr[0]</code> raises <code>IndexError</code> rather than returning zero.",
                 ar: "ابدأ من 46.9، وأضِف 4.5 لكل ساعة مراجعة. والسطرُ الثاني هو التفصيلُ الجديرُ بالتذكّر: <code>[2.7]</code> بين قوسين، لأن <code>ssr</code> <em>مصفوفة</em> لا عدد. وكتابةُ <code>if ssr &lt; 1</code> عليها تقارن مصفوفةً بعددٍ فتعطيك مصفوفةَ قيمٍ منطقية، وعلى نظامٍ مربّع تعود <code>ssr</code> فارغة، فترفع <code>ssr[0]</code> خطأ <code>IndexError</code> لا أن تُرجع صفرًا." }
    },
    {
      id: "t18q4", type: "fill", level: "medium", topics: ["intercept", "lstsq"],
      q: { en: "Fill the blank so the design matrix is right for any number of students, not just five.",
           ar: "أكمل الفراغ لتكون مصفوفةُ التصميم صحيحةً لأي عددٍ من الطلبة لا للخمسة وحدهم." },
      code: "hours = np.array([1., 2., 3., 4., 5.])\n\nA = np.column_stack([____, hours])",
      blanks: [{ accept: ["np.ones(len(hours))", "np.ones(hours.shape[0])", "np.ones(hours.size)", "np.ones_like(hours)"],
                 label: { en: "the intercept column", ar: "عمود المقطع" } }],
      explain: { en: "Any of these work, and the point is that none of them says <code>5</code>. <code>np.ones(5)</code> is correct today and is a bug waiting for the sixth student: <code>column_stack</code> does not broadcast, so it raises rather than quietly mis-building, which is the one place in this chapter where the shapes protect you. <code>np.ones_like(hours)</code> also copies the dtype, which matters if <code>hours</code> ever arrives as integers.",
                 ar: "أيٌّ من هذه يعمل، والمقصودُ أنّ ولا واحدًا منها يقول <code>5</code>. فـ<code>np.ones(5)</code> صحيحةٌ اليوم وهي عيبٌ ينتظر الطالبَ السادس: فـ<code>column_stack</code> لا تبثّ، فترفع خطأً لا أن تبني بناءً خاطئًا في صمت، وذاك الموضعُ الوحيد في هذا الفصل الذي تحميك فيه الأشكال. و<code>np.ones_like(hours)</code> تنسخ النوع أيضًا، وذلك يهمّ إن وصلت <code>hours</code> يومًا أعدادًا صحيحة." }
    },
    {
      id: "t18q5", type: "order", level: "medium", topics: ["overdetermined", "intercept", "lstsq", "rank-check", "residuals"],
      q: { en: "Put a defensible line-fitting routine in order.", ar: "رتّب روتينًا للمواءمة الخطية يمكن الدفاع عنه." },
      items: [
        { en: "Build the design matrix: a column of ones, then one column per measured quantity.", ar: "ابنِ مصفوفةَ التصميم: عمودُ آحاد، ثم عمودٌ لكل كمية مقيسة." },
        { en: "Compare <code>np.linalg.matrix_rank(A)</code> with <code>A.shape[1]</code> and stop if they differ.", ar: "قارِن <code>np.linalg.matrix_rank(A)</code> بـ <code>A.shape[1]</code> وتوقّف إن اختلفا." },
        { en: "Call <code>np.linalg.lstsq(A, y, rcond=None)</code>.", ar: "نادِ <code>np.linalg.lstsq(A, y, rcond=None)</code>." },
        { en: "Look at the residuals, not just their total, for a pattern in the signs.", ar: "انظر في البواقي، لا في مجموعها وحده، باحثًا عن نمطٍ في الإشارات." },
        { en: "Report the coefficients, saying the range of the data they were fitted on.", ar: "أبلِغ المعاملات، ذاكرًا مدى البيانات التي لوئمت عليها." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "The rank check sits between building and fitting, and it has to: it is a question about the matrix, so it can be answered before any fitting happens, and asking it afterwards tempts you to keep coefficients you have already written down. Looking at the residuals comes after the fit because they do not exist before it &mdash; and looking at the <em>pattern</em> rather than the total is the part people skip. The lesson's five residuals alternated in sign, which is a hint about the shape of the relationship that the single number 2.7 cannot carry.",
                 ar: "فحصُ الرتبة يقع بين البناء والمواءمة، ولا بدّ له: فهو سؤالٌ عن المصفوفة، فيُجاب قبل أن تحدث أي مواءمة، وسؤالُه بعدها يغريك بالإبقاء على معاملاتٍ كتبتها سلفًا. والنظرُ في البواقي يأتي بعد المواءمة لأنها لا توجد قبلها &mdash; والنظرُ في <em>النمط</em> لا في المجموع هو الجزءُ الذي يتخطّاه الناس. فبواقي الدرس الخمسة تبادلت إشارتُها، وذاك إلماعٌ إلى شكل العلاقة لا يحمله العددُ الواحد 2.7." }
    },
    {
      id: "t18q6", type: "match", level: "medium", topics: ["rank-check", "det", "cond", "residuals"],
      q: { en: "Match each diagnostic to the question it answers.", ar: "طابِق كلَّ أداة تشخيص بالسؤال الذي تجيبه." },
      leftHead: { en: "Diagnostic", ar: "أداة التشخيص" },
      rightHead: { en: "The question it answers", ar: "السؤال الذي تجيبه" },
      pairs: [
        { l: { code: "np.linalg.matrix_rank(A)" },
          r: { en: "Is any column of mine a repeat or a combination of the others? If so, the predictions are fine and the individual coefficients are fiction.", ar: "هل أيٌّ من أعمدتي مكرّرٌ أو تركيبةٌ من الأخرى؟ فإن كان فالتوقّعاتُ سليمة والمعاملاتُ الفردية خيال." } },
        { l: { code: "np.linalg.cond(A)" },
          r: { en: "Will a small error in my data stay small by the time it reaches the answer?", ar: "هل سيبقى خطأٌ صغير في بياناتي صغيرًا حين يصل إلى الجواب؟" } },
        { l: { code: "marks - A @ coef" },
          r: { en: "Where and in which direction is the fit missing? A pattern in the signs says the shape is wrong, not the arithmetic.", ar: "أين تفوت المواءمةُ وفي أي اتجاه؟ فنمطُ الإشارات يقول إنّ الشكل خطأ لا الحساب." } },
        { l: { code: "np.linalg.det(A)" },
          r: { en: "Almost nothing useful here. It is not exactly zero for a singular matrix, it is non-zero for a disastrous one, and it changes if you switch units.", ar: "لا شيء نافعًا هنا تقريبًا. فهو ليس صفرًا بالضبط للمصفوفة الشاذّة، وغيرُ صفريٍّ للكارثية، ويتغيّر إن بدّلتَ الوحدات." } },
        { l: { code: "A.shape" },
          r: { en: "Do I have more measurements than unknowns? If the two numbers are equal there is nothing to fit and no residual to read.", ar: "هل قياساتي أكثر من مجاهيلي؟ فإن تساوى العددان فلا شيء يُلائم ولا باقٍ يُقرأ." } }
      ],
      explain: { en: "Rank and condition are the pair people confuse, and the lesson has the case that separates them: a matrix with full rank and a condition number of twenty-two million. Rank said the columns were independent, which was true, and said nothing about trust. The <code>A.shape</code> pairing is the one worth dwelling on, because an equal pair of numbers means <code>lstsq</code> returns an empty residual array &mdash; not a zero &mdash; and code that reads <code>ssr[0]</code> will raise rather than report a perfect fit.",
                 ar: "الرتبةُ والحالةُ هما الزوجُ الذي يلتبس على الناس، وفي الدرس الحالةُ التي تفصلهما: مصفوفةٌ كاملةُ الرتبة وعددُ حالتها اثنان وعشرون مليونًا. فقالت الرتبةُ إنّ الأعمدة مستقلة، وكان صحيحًا، ولم تقل شيئًا عن الثقة. ومزاوجةُ <code>A.shape</code> تستحقّ التمهّل، فتساوي العددين يعني أنّ <code>lstsq</code> تُرجع مصفوفةَ بواقٍ فارغة &mdash; لا صفرًا &mdash; وكودٌ يقرأ <code>ssr[0]</code> سيرفع خطأً لا أن يُبلغ مواءمةً تامة." }
    },
    {
      id: "t18q7", type: "error", level: "medium", topics: ["intercept", "lstsq"],
      q: { en: "This should fit <code>mark = c + m &times; hours</code>. It reports a slope of 17.29 and a residual total of 2002.35. Click the line to change.",
           ar: "ينبغي أن يلائم هذا <code>mark = c + m &times; hours</code>. وهو يُبلغ ميلًا 17.29 ومجموعَ بواقٍ 2002.35. اضغط السطرَ الذي يجب تغييره." },
      code: "import numpy as np\n\nhours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\n\nA = hours.reshape(-1, 1)\n\ncoef, ssr, rank, sv = np.linalg.lstsq(A, marks, rcond=None)\nprint(coef, ssr)",
      answer: 6,
      explain: { en: "The design matrix has one column, so the only thing being fitted is a slope, and the line is forced through the origin. The fit reports that a student who revises for one hour scores 17.29 &mdash; and the five marks it was given are all between 52 and 70. Nothing raised, and the residual total of 2002.35 is the only number that would have told you, which is the argument for printing it. Corrected to <code>np.column_stack([np.ones(len(hours)), hours])</code>, the same call returns <code>[46.9 4.5]</code> and a residual total of 2.7.",
                 ar: "لمصفوفة التصميم عمودٌ واحد، فالشيءُ الوحيد الذي يُلائَم ميلٌ، والخطُّ مُجبَرٌ على المرور بنقطة الأصل. وتُبلغ المواءمةُ أنّ طالبًا يراجع ساعةً واحدة ينال 17.29 &mdash; والعلاماتُ الخمس التي أُعطيتها كلُّها بين 52 و70. ولم يُرفع شيء، ومجموعُ البواقي 2002.35 هو العددُ الوحيد الذي كان سيخبرك، وتلك هي الحجةُ لطباعته. ومصحّحًا إلى <code>np.column_stack([np.ones(len(hours)), hours])</code> يُرجع النداءُ نفسه <code>[46.9 4.5]</code> ومجموعَ بواقٍ 2.7." },
      solution: { code: "A = np.column_stack([np.ones(len(hours)), hours])" }
    },
    {
      id: "t18q8", type: "compare", level: "medium", topics: ["drop-rows", "lstsq", "residuals"],
      q: { en: "Five students, two ways to get a line. What is the difference?",
           ar: "خمسةُ طلبة وطريقتان للحصول على خط. فما الفرق؟" },
      codeA: "A = np.column_stack([np.ones(5), hours])\n\ntwo = np.linalg.solve(A[[0, 4]], marks[[0, 4]])\nprint(two)\nprint(((marks - A @ two) ** 2).sum())",
      codeB: "A = np.column_stack([np.ones(5), hours])\n\ncoef = np.linalg.lstsq(A, marks, rcond=None)[0]\nprint(coef)\nprint(((marks - A @ coef) ** 2).sum())",
      options: [
        { en: "Both run. A prints <code>[47.5  4.5]</code> and a residual total of <code>4.5</code>; B prints <code>[46.9  4.5]</code> and <code>2.699999999999979</code>. A passes exactly through two students and ignores three; B is as close as any line can be to all five.", ar: "يعمل كلاهما. تطبع (أ) <code>[47.5  4.5]</code> ومجموعَ بواقٍ <code>4.5</code>؛ وتطبع (ب) <code>[46.9  4.5]</code> و<code>2.699999999999979</code>. فتمرّ (أ) بطالبين بالضبط وتُهمل ثلاثة؛ و(ب) أقربُ ما يمكن لخطٍّ أن يكون من الخمسة." },
        { en: "A raises, because <code>solve</code> cannot take a sliced matrix.", ar: "ترفع (أ) خطأً، لأن <code>solve</code> لا تأخذ مصفوفةً مقطّعة." },
        { en: "They print the same coefficients, since both lines must pass through the data.", ar: "يطبعان المعاملات نفسها، فكلا الخطّين لا بدّ أن يمرّ بالبيانات." },
        { en: "B's residual total is larger, because it has to compromise between five students instead of satisfying two.", ar: "مجموعُ بواقي (ب) أكبر، لأنها تساوم بين خمسة طلبة بدل إرضاء اثنين." }
      ],
      answer: 0,
      explain: { en: "The last option gets the logic exactly inverted, and it is the one worth thinking through, because the reasoning sounds right: surely satisfying two equations exactly beats satisfying none? It does, on those two students. The residual total is computed over all five, and by that measure the compromise wins &mdash; which is the definition of what <code>lstsq</code> minimises. Note also that both slopes are 4.5 here, by coincidence of these numbers; only the intercepts differ. That coincidence is a good reason not to judge a fit by eyeballing one coefficient.",
                 ar: "الخيارُ الأخير يقلب المنطقَ تمامًا، وهو ما يستحقّ التفكير، فالاستدلالُ يبدو صحيحًا: أليس إرضاءُ معادلتين بالضبط أفضلَ من إرضاء ولا واحدة؟ بلى، على ذينك الطالبين. ومجموعُ البواقي يُحسب على الخمسة كلهم، وبذلك المقياس تفوز المساومة &mdash; وهو تعريفُ ما تصغّره <code>lstsq</code>. ولاحظ أيضًا أنّ الميلين 4.5 هنا، بمصادفةٍ في هذه الأعداد؛ والمقطعان وحدهما يختلفان. وتلك المصادفةُ سببٌ جيد لئلا تحكم على مواءمةٍ بتفحّص معامِلٍ واحد بالعين." }
    },
    {
      id: "t18q9", type: "multi", level: "hard", topics: ["rank-check", "more-columns", "residuals"],
      q: { en: "A fit on six columns returns <code>rank</code> 5. Select <strong>every</strong> true statement.",
           ar: "مواءمةٌ على ستة أعمدة تُرجع <code>rank</code> 5. اختر <strong>كل</strong> جملةٍ صحيحة." },
      options: [
        { en: "The predictions are as good as they would be with the redundant column removed.", ar: "التوقّعاتُ بجودتها لو أُزيل العمودُ المكرّر." },
        { en: "At least one column is a combination of the others.", ar: "عمودٌ واحد على الأقل تركيبةٌ من الأخرى." },
        { en: "The individual coefficients should not be quoted as the contribution of each column.", ar: "لا ينبغي اقتباسُ المعاملات الفردية بوصفها إسهامَ كل عمود." },
        { en: "<code>lstsq</code> will raise, because a rank-deficient matrix has no least-squares solution.", ar: "ترفع <code>lstsq</code> خطأً، فليس للمصفوفة ناقصة الرتبة حلُّ مربعاتٍ صغرى." },
        { en: "The sum of squared residuals will be larger than it would be at full rank.", ar: "مجموعُ الأخطاء المربّعة سيكون أكبر منه عند الرتبة الكاملة." },
        { en: "Dropping any one of the six columns is guaranteed to restore full rank.", ar: "حذفُ أيٍّ من الأعمدة الستة يضمن إعادةَ الرتبة الكاملة." }
      ],
      answer: [0, 1, 2],
      explain: { en: "Two of the wrong three are the interesting ones. \"The residual will be larger\" is false and the lesson shows why: the hours-and-minutes fit had rank 2 out of 3 columns and its predictions were <em>identical</em> to the two-column fit, <code>allclose</code> and all. A redundant column adds nothing and costs nothing in fit; it costs you the meaning of the coefficients. And \"dropping any one restores full rank\" is false in general &mdash; if two columns are copies of each other, dropping a third unrelated column changes nothing. Which column to drop is a modelling decision, and the one you choose changes every number you then report.",
                 ar: "اثنان من الخاطئة الثلاثة هما المثيران. فـ«الباقي سيكون أكبر» كاذبة والدرسُ يُظهر السبب: فمواءمةُ الساعات والدقائق كانت رتبتها 2 من 3 أعمدة وكانت توقّعاتها <em>مطابقة</em> لمواءمة العمودين، و<code>allclose</code> وكلّ شيء. فالعمودُ المكرّر لا يضيف شيئًا ولا يكلّف شيئًا في المواءمة؛ بل يكلّفك معنى المعاملات. و«حذفُ أيٍّ منها يعيد الرتبة الكاملة» كاذبةٌ عمومًا &mdash; فإن كان عمودان نسختين من بعضهما لم يغيّر حذفُ عمودٍ ثالثٍ غيرِ ذي صلةٍ شيئًا. وأيَّ عمودٍ تحذف قرارٌ نمذجيّ، والذي تختاره يغيّر كلَّ عددٍ تُبلغه بعده." }
    },
    {
      id: "t18q10", type: "trace", level: "hard", topics: ["lstsq", "residuals", "overdetermined"],
      q: { en: "State the shape or the value at each point. No line prints anything.",
           ar: "حدّد الشكل أو القيمة عند كل موضع. ولا يطبع أيُّ سطرٍ شيئًا." },
      code: "hours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\nA = np.column_stack([np.ones(5), hours])\n\ncoef, ssr, rank, sv = np.linalg.lstsq(A, marks, rcond=None)\n#   1: coef.shape      2: ssr.shape      3: rank\n\nfitted = A @ coef       # 4: fitted.shape\nsq = np.linalg.lstsq(A[:2], marks[:2], rcond=None)\n#   5: sq[1].shape",
      blanks: [
        { accept: ["(2,)", "(2, )"], label: { en: "<code>coef.shape</code>", ar: "<code>coef.shape</code>" } },
        { accept: ["(1,)", "(1, )"], label: { en: "<code>ssr.shape</code>", ar: "<code>ssr.shape</code>" } },
        { accept: ["2"], label: { en: "<code>rank</code>", ar: "<code>rank</code>" } },
        { accept: ["(5,)", "(5, )"], label: { en: "<code>fitted.shape</code>", ar: "<code>fitted.shape</code>" } },
        { accept: ["(0,)", "(0, )", "()"], label: { en: "<code>sq[1].shape</code> &mdash; the residuals of a 2&times;2 fit", ar: "<code>sq[1].shape</code> &mdash; بواقي مواءمة 2&times;2" } }
      ],
      explain: { en: "Two columns in, two coefficients out; five rows in, five fitted values out; and rank 2 because the ones and the hours are genuinely independent. The last blank is the trap. <code>A[:2]</code> is 2&times;2, so there are exactly as many equations as unknowns and the fit passes through both points &mdash; and <code>lstsq</code> returns the residuals as an <em>empty</em> array of shape <code>(0,)</code>, not as <code>[0.]</code>. Any code that does <code>ssr[0]</code> to report the quality of a fit will raise <code>IndexError</code> on exactly the inputs where the fit is perfect, which is a memorable way to find out.",
                 ar: "عمودان يدخلان ومعامِلان يخرجان؛ وخمسةُ صفوفٍ تدخل وخمسُ قيمٍ مُلائَمة تخرج؛ والرتبةُ 2 لأن الآحادَ والساعاتِ مستقلتان حقًّا. والفراغُ الأخير هو الفخ. فـ<code>A[:2]</code> بحجم 2&times;2، فالمعادلاتُ بعدد المجاهيل بالضبط وتمرّ المواءمةُ بالنقطتين &mdash; وتُرجع <code>lstsq</code> البواقيَ مصفوفةً <em>فارغة</em> بالشكل <code>(0,)</code>، لا <code>[0.]</code>. فأيُّ كودٍ يفعل <code>ssr[0]</code> ليُبلغ جودةَ مواءمةٍ سيرفع <code>IndexError</code> على المدخلات التي تكون المواءمةُ فيها تامةً بالضبط، وتلك طريقةٌ لا تُنسى للمعرفة." }
    },
    {
      id: "t18q11", type: "complete", level: "hard", topics: ["rank-check", "lstsq"],
      q: { en: "This function returns coefficients that end up in a written report. Which line belongs in the gap?",
           ar: "تُرجع هذه الدالة معاملات تنتهي في تقريرٍ مكتوب. فأيُّ سطرٍ ينتمي إلى الفراغ؟" },
      code: "def fit_and_report(A, y):\n    coef, ssr, rank, sv = np.linalg.lstsq(A, y, rcond=None)\n\n    # which line?\n\n    return coef",
      options: [
        { code: "if rank < A.shape[1]:\n        raise ValueError(f\"{A.shape[1]} columns but rank {rank}\")" },
        { code: "if ssr[0] > 1.0:\n        raise ValueError(\"the fit is not close enough\")" },
        { code: "if np.linalg.det(A) == 0:\n        raise ValueError(\"singular design matrix\")" },
        { code: "if not np.allclose(A @ coef, y):\n        raise ValueError(\"the fit does not reproduce the data\")" }
      ],
      answer: 0,
      explain: { en: "The <code>allclose</code> option is a contradiction in terms here: a least-squares fit is by definition the line that does <em>not</em> reproduce the data, so that check fails on every correct fit &mdash; it is the Lesson 17 habit applied where it does not belong. The <code>ssr[0]</code> option fails twice: the threshold is meaningless because the residual total grows with the number of data points and with the units of <code>y</code>, and on a square system <code>ssr</code> is empty so the line raises <code>IndexError</code>. And <code>det</code> needs a square matrix, so on a 5&times;2 design matrix it raises before it can tell you anything.",
                 ar: "خيارُ <code>allclose</code> تناقضٌ في العبارة هنا: فمواءمةُ المربعات الصغرى هي بالتعريف الخطُّ الذي <em>لا</em> يُعيد إنتاج البيانات، فيفشل ذلك الفحص في كل مواءمةٍ صحيحة &mdash; وهو عادةُ الدرس 17 مطبَّقةً حيث لا تنتمي. وخيارُ <code>ssr[0]</code> يفشل مرتين: فالحدُّ بلا معنى لأن مجموعَ البواقي يكبر بعدد نقاط البيانات وبوحدات <code>y</code>، وعلى نظامٍ مربّع تكون <code>ssr</code> فارغةً فيرفع السطرُ <code>IndexError</code>. و<code>det</code> تحتاج مصفوفةً مربعة، فعلى مصفوفة تصميمٍ 5&times;2 ترفع خطأً قبل أن تخبرك بشيء." }
    },
    {
      id: "t18q12", type: "output", level: "hard", topics: ["rank-check", "more-columns"],
      q: { en: "Someone adds the revision time in minutes beside the hours. Write the three lines this prints.",
           ar: "يضيف أحدهم زمنَ المراجعة بالدقائق إلى جانب الساعات. اكتب الأسطر الثلاثة التي يطبعها هذا." },
      code: "import numpy as np\n\nhours = np.array([1., 2., 3., 4., 5.])\nmarks = np.array([52., 55., 61., 64., 70.])\nminutes = hours * 60\n\nAdup = np.column_stack([np.ones(5), hours, minutes])\nprint(np.linalg.matrix_rank(Adup), Adup.shape)\n\nc, ssr, rank, sv = np.linalg.lstsq(Adup, marks, rcond=None)\nprint(c)\nprint(rank)",
      blanks: [{ accept: ["2 (5, 3)\n[4.69000000e+01 1.24965288e-03 7.49791725e-02]\n2"], lines: 3 }],
      explain: { en: "Three columns and rank 2: the matrix knows that minutes is hours in disguise. Nothing raises, and the coefficients that come back are not findings &mdash; the real slope of 4.5 an hour has been split into 0.00125 an hour plus 0.075 a minute, one arbitrary choice out of infinitely many that fit equally well. The predictions are identical to the two-column fit, which <code>np.allclose</code> confirms, so no amount of checking the output would reveal this. Only the first line would, and only if someone reads it.",
                 ar: "ثلاثةُ أعمدة ورتبتها 2: فالمصفوفةُ تعرف أنّ الدقائق هي الساعات متخفّية. ولا يُرفع شيء، والمعاملاتُ الراجعة ليست نتائج &mdash; فالميلُ الحقيقي 4.5 للساعة قُسِّم إلى 0.00125 للساعة زائد 0.075 للدقيقة، خيارٌ اعتباطيٌّ واحد من لا نهائيةٍ تلائم بالجودة نفسها. والتوقّعاتُ مطابقة لمواءمة العمودين، وتؤكّد ذلك <code>np.allclose</code>، فلن يكشف هذا أيُّ قدرٍ من فحص الخَرج. ولن يكشفه إلا السطرُ الأول، وذلك إن قرأه أحد." }
    }
  ]
};
