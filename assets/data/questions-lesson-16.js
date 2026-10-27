/* ============================================================
   Lesson 16 (Lecture 18) — removing the loop, seeded randomness.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-16"] = {
  title: { en: "Lesson 16 Test — Removing the Loop, and Randomness You Can Repeat", ar: "اختبار الدرس 16 — إزالة الحلقة وعشوائيةٌ يمكن تكرارها" },
  intro: {
    en: "Twelve questions on Lesson 16 only. Two habits answer most of them: ask what each iteration needs from the one <em>before</em> it, and remember that a seed names a sequence while a generator holds a position in it.",
    ar: "اثنا عشر سؤالًا على الدرس 16 وحده. وعادتان تُجيبان أكثرها: اسأل ماذا تحتاج كلُّ دورة من <em>سابقتها</em>، واذكر أن البذرة تسمّي متتالية وأن المولّد يمسك موضعًا فيها."
  },
  questions: [
    {
      id: "t16q1", type: "tf", level: "easy", topics: ["rng-draws"],
      q: { en: "<code>rng.integers(1, 7, size=5)</code> can return a 7.",
           ar: "<code>rng.integers(1, 7, size=5)</code> يمكن أن تُعيد 7." },
      truth: false,
      explain: { en: "The pair of numbers reads like &ldquo;from 1 to 7&rdquo;, which is why this one catches people, and the five dice in the lesson &mdash; <code>[1 5 4 3 3]</code> &mdash; happen to settle nothing either way. The second argument is a <em>stop</em>, not a last value: the same half-open convention as <code>range(1, 7)</code> and <code>np.arange(1, 7)</code>, both of which you already read that way without thinking about it. So a die is <code>integers(1, 7)</code> and a coin is <code>integers(0, 2)</code>, and the high number you write is always one past the one you want.",
                 ar: "يُقرأ العددان كأنهما «من 1 إلى 7»، ولذلك يلدغ هذا السؤال الناس، وأحجارُ النرد الخمسة في الدرس &mdash; <code>[1 5 4 3 3]</code> &mdash; لا تحسم الأمر في أي اتجاه. والوسيطُ الثاني <em>حدُّ توقّف</em> لا قيمةً أخيرة: وهو عُرف نصف المفتوح نفسه في <code>range(1, 7)</code> و<code>np.arange(1, 7)</code>، وأنت تقرأهما هكذا أصلًا بلا تفكير. فحجرُ النرد <code>integers(1, 7)</code> والقطعةُ المعدنية <code>integers(0, 2)</code>، والعددُ الأعلى الذي تكتبه يزيد دائمًا واحدًا على الذي تريده." }
    },
    {
      id: "t16q2", type: "output", level: "easy", topics: ["rng-seed"],
      q: { en: "Random parcel counts for a sample of four deliveries. Write the three lines this prints.",
           ar: "أعدادُ طرودٍ عشوائية لعيّنة من أربع توصيلات. اكتب الأسطر الثلاثة التي يطبعها." },
      code: "import numpy as np\n\nprint(np.random.default_rng(3).integers(1, 10, size=4))\n\nrng = np.random.default_rng(3)\nprint(rng.integers(1, 10, size=4))\nprint(rng.integers(1, 10, size=4))",
      blanks: [{ accept: ["[8 1 2 3]\n[8 1 2 3]\n[2 8 8 6]"], lines: 3 }],
      explain: { en: "The tempting answer is three identical lines: the seed is 3 everywhere and no line changed it, so why would the numbers change? Because the seed does not name a single draw, it names a whole sequence, and a generator remembers how far along it is. A brand-new generator starts that sequence from the beginning, which is why lines 1 and 2 agree even though they come from two separate objects. Asking the <em>same</em> generator again continues from where it stopped. That is also the practical warning: an extra draw inserted anywhere above shifts everything below it.",
                 ar: "الجوابُ المغري ثلاثةُ أسطر متطابقة: فالبذرة 3 في كل موضع ولم يغيّرها سطر، فلماذا تتغير الأعداد؟ لأن البذرة لا تسمّي سحبةً واحدة بل متتاليةً كاملة، والمولّد يتذكّر أين وصل منها. فمولِّدٌ جديد يبدأ تلك المتتالية من أولها، ولذلك يتفق السطران الأول والثاني وإن جاءا من كائنين منفصلين. وسؤالُ المولّد <em>نفسه</em> مرةً أخرى يُكمل من حيث توقّف. وذلك هو التحذير العملي أيضًا: فسحبةٌ إضافية تُدسّ في أي موضع أعلى تُزيح كل ما تحتها." }
    },
    {
      id: "t16q3", type: "mcq", level: "easy", topics: ["vector-recipe", "mask"],
      q: { en: "A loop keeps <code>late += 1</code> for every delivery that ran more than ten minutes over. In array code, what replaces the counter?",
           ar: "حلقةٌ تحفظ <code>late += 1</code> لكل توصيلة تأخّرت فوق عشر دقائق. فما الذي يحلّ محلّ العدّاد في كود المصفوفات؟" },
      options: [
        { en: "<code>(over &gt; 10).sum()</code>", ar: "<code>(over &gt; 10).sum()</code>" },
        { en: "<code>len(over &gt; 10)</code>", ar: "<code>len(over &gt; 10)</code>" },
        { en: "<code>over[over &gt; 10].count()</code>", ar: "<code>over[over &gt; 10].count()</code>" },
        { en: "<code>np.where(over &gt; 10, 1, 0)</code>", ar: "<code>np.where(over &gt; 10, 1, 0)</code>" }
      ],
      answer: 0,
      explain: { en: "Reaching for <code>.count()</code> is the habit lists leave behind, and an array has no <code>.count</code> method at all, so it raises rather than quietly miscounting. The second is the subtler trap: a mask has one answer per delivery whatever those answers are, so its length is the number of deliveries, not the number of late ones. The fourth stops one step short &mdash; it builds a column of flags, and <code>.sum()</code> on that column is the long way round to the right number. The rule to carry away is that summing a mask counts it, because <code>True</code> adds as 1; there is no separate counting function in NumPy to go looking for.",
                 ar: "ومدُّ اليد إلى <code>.count()</code> عادةٌ تركتها القوائم، والمصفوفةُ لا دالّة <code>.count</code> فيها إطلاقًا، فهو يرفع خطأً بدل أن يُخطئ العدّ بصمت. والثاني فخٌّ ألطف: فالقناعُ فيه جوابٌ لكل توصيلة أيًّا كانت الأجوبة، فطولُه عددُ التوصيلات لا عددُ المتأخرة. والرابع يقف قبل الخطوة الأخيرة &mdash; فهو يبني عمودًا من الأعلام، و<code>.sum()</code> عليه طريقٌ أطول إلى العدد الصحيح. والقاعدةُ التي تُحمل أن جمعَ القناع يَعدّه، لأن <code>True</code> يُجمع كـ 1؛ فلا دالّةَ عدٍّ منفصلة في نمباي تبحث عنها." }
    },
    {
      id: "t16q4", type: "fill", level: "medium", topics: ["vector-recipe", "where"],
      q: { en: "The courier late fee &mdash; half a shekel a minute, on the minutes over ten only. Fill the three blanks so the printed comments come true.",
           ar: "رسمُ تأخير التوصيل &mdash; نصفُ شيكل للدقيقة على الدقائق فوق العشر وحدها. أكمل الفراغات الثلاثة ليصدق ما في التعليقات." },
      code: "over = np.array([-2., 14., 3., 26., 10.])\n\nfees = np.____1____(over > 10, over * 0.5, 0.0)\nlate = (over > 10).____2____()\n\nprint(fees)               # [ 0.  7.  0. 13.  0.]\nprint(late, fees.sum())   # 2 20.0\nprint(fees.____3____())   # [ 0.  7.  7. 20. 20.]",
      blanks: [
        { accept: ["where"], label: { en: "the <code>if/else</code>", ar: "مقابل <code>if/else</code>" } },
        { accept: ["sum"], label: { en: "the counter", ar: "العدّاد" } },
        { accept: ["cumsum"], label: { en: "the running total", ar: "المجموع الجاري" } }
      ],
      explain: { en: "Read the printed fees against the overruns before moving on: the delivery that ran exactly ten minutes over pays nothing, because the rule says <em>more than</em> ten and <code>&gt;</code> is the comparison that says so. Getting that boundary wrong is how a correct-looking conversion overcharges one customer in fifty. The third blank is the one that looks impossible: a total kept as you go seems to need the previous iteration, and it is exactly what the <code>cum</code> family is for &mdash; one entry per row, ending at the same figure <code>.sum()</code> gives. Convert the moves one at a time and the loop disappears underneath you.",
                 ar: "اقرأ الرسومَ المطبوعة في مقابل التأخّرات قبل أن تمضي: فالتوصيلةُ التي تأخّرت عشر دقائق بالضبط لا تدفع شيئًا، لأن القاعدة تقول <em>فوق</em> العشر و<code>&gt;</code> هي المقارنة التي تقول ذلك. وإخطاءُ هذا الحدّ هو كيف يُحمّل تحويلٌ يبدو صحيحًا زبونًا من كل خمسين زيادةً. والفراغُ الثالث هو ما يبدو مستحيلًا: فمجموعٌ يُحفظ أثناء المرور يبدو محتاجًا الدورةَ السابقة، وهو بالضبط ما وُجدت له أسرةُ <code>cum</code> &mdash; مدخلٌ لكل صفّ ينتهي إلى الرقم نفسه الذي تعطيه <code>.sum()</code>. حوّل الحركات واحدةً واحدة فتختفي الحلقة من تحتك." }
    },
    {
      id: "t16q5", type: "output", level: "medium", topics: ["vector-recipe"],
      q: { en: "The late fees for five deliveries, already worked out. Write the three lines this prints.",
           ar: "رسومُ التأخير لخمس توصيلات محسوبةً سلفًا. اكتب الأسطر الثلاثة التي يطبعها." },
      code: "import numpy as np\n\nfees = np.array([0., 12., 0., 7.5, 3.])\n\nprint(fees.cumsum())\nprint((fees > 0).sum(), fees.sum())\nprint(fees.argmax())",
      blanks: [{ accept: ["[ 0.  12.  12.  19.5 22.5]\n3 22.5\n1"], lines: 3 }],
      explain: { en: "The last line is where the marks are lost: the biggest fee is 12.0, so 12.0 is what the hand wants to write, but <code>argmax</code> answers <em>where</em>, not <em>how much</em> &mdash; the <code>arg</code> is short for argument, meaning the position you would pass back in. <code>.max()</code> is the one that gives 12.0, and <code>fees[fees.argmax()]</code> is the long way to the same number. Line 1 against line 2 is the other thing to notice: <code>cumsum</code> keeps one entry per delivery and its last entry is what <code>.sum()</code> returns, so the running total and the total are the same computation stopped at different places.",
                 ar: "السطرُ الأخير هو مَقتل الدرجات: فأكبرُ رسم 12.0، فتريد اليدُ كتابة 12.0، لكن <code>argmax</code> تجيب <em>أين</em> لا <em>كم</em> &mdash; فـ <code>arg</code> اختصارُ «الوسيط»، أي الموضعُ الذي تُعيد تمريره. و<code>.max()</code> هي التي تعطي 12.0، و<code>fees[fees.argmax()]</code> طريقٌ أطول إلى العدد نفسه. ومقابلةُ السطر الأول بالثاني هي الأمرُ الآخر الجديرُ بالملاحظة: فـ <code>cumsum</code> تُبقي مدخلًا لكل توصيلة ومدخلُها الأخير هو ما تُعيده <code>.sum()</code>، فالمجموعُ الجاري والمجموعُ حسابٌ واحد أُوقف في موضعين مختلفين." }
    },
    {
      id: "t16q6", type: "match", level: "medium", topics: ["vector-recipe", "loop-ok"],
      q: { en: "Match each move inside a loop to what it becomes in array code.",
           ar: "وصّل كل حركة داخل حلقة بما تصير إليه في كود المصفوفات." },
      leftHead: { en: "In the loop", ar: "في الحلقة" },
      rightHead: { en: "What it becomes", ar: "ما تصير إليه" },
      pairs: [
        { l: { code: "over = m[i] - (1.5 * p[i] + 1.2 * k[i])" }, r: { en: "The same arithmetic written once, on the whole arrays.", ar: "الحسابُ نفسه يُكتب مرة واحدة على المصفوفات كلها." } },
        { l: { code: "fee = over * 0.5 if over > 10 else 0.0" }, r: { en: "<code>np.where(mask, a, b)</code> &mdash; one expression, both branches.", ar: "<code>np.where(mask, a, b)</code> &mdash; تعبيرٌ واحد بالفرعين كليهما." } },
        { l: { code: "if mark > best: best = mark" }, r: { en: "<code>values.max()</code>, or <code>values.argmax()</code> when you want the position.", ar: "<code>values.max()</code> أو <code>values.argmax()</code> إن أردت الموضع." } },
        { l: { en: "Each day's stock worked out from the day before, and an order placed only when it drops under a limit that itself moves.", ar: "مخزونُ كل يوم يُحسب من اليوم السابق، ولا يُطلب طلبٌ إلا حين يهبط تحت حدٍّ يتحرك هو نفسه." },
          r: { en: "Nothing &mdash; this is one of the loops to leave exactly where it is.", ar: "لا شيء &mdash; فهذه من الحلقات التي تُترك في مكانها تمامًا." } },
      ],
      explain: { en: "The fourth row is the one worth slowing down for, because the first three make vectorising look universal and it is not. Each pass of that loop needs the stock level the previous pass produced, under a limit that moves as it goes, so there is no single rule to hand the whole array at once. Compare it with a plain running balance, which <em>looks</em> just as dependent and is exactly what <code>cumsum</code> exists for. The question to ask of any loop is what each iteration needs from the one before it: nothing means it vectorises, a plain running total means a <code>cum</code> function already exists, and anything beyond that means write the loop without feeling guilty.",
                 ar: "الصفُّ الرابع جديرٌ بالتمهّل، لأن الثلاثة الأولى تجعل التحويلَ إلى مصفوفات يبدو شاملًا وليس كذلك. فكلُّ مرورٍ في تلك الحلقة يحتاج مستوى المخزون الذي أنتجه المرورُ السابق تحت حدٍّ يتحرك في الطريق، فلا قاعدةَ واحدة تُسلَّم إليها المصفوفةُ كلها دفعةً. وقارنها برصيدٍ جارٍ بسيط <em>يبدو</em> تابعًا مثلها وهو بالضبط ما وُجدت له <code>cumsum</code>. والسؤالُ الذي يُسأل عن أي حلقة: ماذا تحتاج كلُّ دورة من سابقتها؟ فلا شيءَ يعني أنها تقبل التحويل، ومجموعٌ جارٍ بسيط يعني أن دالّة <code>cum</code> موجودة أصلًا، وما زاد يعني اكتب الحلقة بلا شعور بالذنب." }
    },
    {
      id: "t16q7", type: "order", level: "medium", topics: ["split", "copy-rules"],
      q: { en: "Put in order what a reproducible train/test split of a feature table <code>X</code> and its answers <code>y</code> does.",
           ar: "رتّب ما تفعله قسمةُ تدريبٍ واختبار قابلةٌ للتكرار لجدول سمات <code>X</code> وأجوبته <code>y</code>." },
      items: [
        { en: "<code>rng = np.random.default_rng(1)</code> &mdash; a generator built from a seed that is written down in the file.", ar: "<code>rng = np.random.default_rng(1)</code> &mdash; مولِّدٌ مبنيٌّ من بذرةٍ مكتوبةٍ في الملف." },
        { en: "<code>order = rng.permutation(len(X))</code> shuffles the <em>row numbers</em>, leaving the data untouched.", ar: "<code>order = rng.permutation(len(X))</code> تخلط <em>أرقام الصفوف</em> وتترك البيانات كما هي." },
        { en: "<code>cut = int(0.8 * len(X))</code> decides where the shuffled list of positions is cut.", ar: "<code>cut = int(0.8 * len(X))</code> تحدّد أين تُقطع قائمةُ المواضع المخلوطة." },
        { en: "<code>train, test = order[:cut], order[cut:]</code> &mdash; two arrays of positions, no data in either.", ar: "<code>train, test = order[:cut], order[cut:]</code> &mdash; مصفوفتا مواضع لا بيانات في أيّهما." },
        { en: "<code>X[train]</code> and <code>y[train]</code> use the same positions, so every answer still sits beside the row it describes.", ar: "<code>X[train]</code> و<code>y[train]</code> تستعملان المواضع نفسها، فيظل كلُّ جواب بجانب الصفّ الذي يصفه." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "The order itself is not the lesson; steps 2 and 5 are. Shuffling the positions rather than the data is what makes the common disaster impossible: shuffle <code>X</code> and <code>y</code> separately and both halves still have the right shapes, every later line still runs, and every answer now describes a different delivery from the one it is sitting next to &mdash; a wrong result with nothing anywhere to flag it. Indexing with an array of positions is fancy indexing from Lesson 11, so both halves are copies and nothing you do to the training rows reaches the original table.",
                 ar: "الترتيبُ نفسه ليس هو الدرس؛ بل الخطوتان 2 و5. فخلطُ المواضع لا البيانات هو ما يجعل الكارثةَ الشائعة مستحيلة: فاخلط <code>X</code> و<code>y</code> منفصلتين فيبقى للنصفين الأشكالُ الصحيحة، ويعمل كلُّ سطر لاحق، ويصير كلُّ جواب يصف توصيلةً غير التي يجاورها &mdash; نتيجةٌ خاطئة لا شيء في أي موضع يُنبّه إليها. والفهرسةُ بمصفوفة مواضع فهرسةٌ انتقائية من الدرس 11، فالنصفان نسختان ولا شيء تفعله بصفوف التدريب يصل إلى الجدول الأصلي." }
    },
    {
      id: "t16q8", type: "error", level: "medium", topics: ["rng-legacy", "rng-draws"],
      q: { en: "This should print three parcel counts picked at random from the eight. It raises. Click the line to change.",
           ar: "ينبغي أن يطبع هذا ثلاثةَ أعداد طرودٍ منتقاةٍ عشوائيًّا من الثمانية. وهو يرفع خطأً. انقر السطر الذي يجب تغييره." },
      code: "import numpy as np\n\nrng = np.random.default_rng(7)\n\nparcels = rng.integers(1, 20, size=8)\npicks = rng.randint(0, 8, size=3)\n\nprint(parcels[picks])",
      answer: 6,
      explain: { en: "<code>AttributeError: 'numpy.random._generator.Generator' object has no attribute 'randint'</code>. The name is not invented &mdash; it is the real function from the old interface, the one that goes with <code>np.random.seed</code>, and tutorials written before <code>default_rng</code> existed are full of it. What the message is telling you is that those names live on the single global generator, while a generator you made yourself has its own, shorter set: <code>random</code>, <code>integers</code>, <code>normal</code>, <code>permutation</code>. Line 3 is right and worth keeping for the reason this error exists: a generator passed about explicitly cannot be moved on by a library you called, and nothing silently reseeds it.",
                 ar: "<code>AttributeError: 'numpy.random._generator.Generator' object has no attribute 'randint'</code>. والاسمُ ليس مُختلقًا &mdash; بل هو الدالّةُ الحقيقية من الواجهة القديمة، رفيقةُ <code>np.random.seed</code>، والدروسُ المكتوبة قبل وجود <code>default_rng</code> مملوءةٌ بها. والذي تقوله الرسالة أن تلك الأسماء تسكن المولّدَ العامّ الواحد، أما مولّدٌ صنعته بنفسك فله طاقمُه الأقصر: <code>random</code> و<code>integers</code> و<code>normal</code> و<code>permutation</code>. والسطرُ 3 صحيحٌ وجديرٌ بالإبقاء للسبب الذي من أجله وُجد هذا الخطأ: فمولِّدٌ يُمرَّر صراحةً لا تستطيع مكتبةٌ ناديتَها أن تحرّكه، ولا شيء يُعيد بذره بصمت." },
      solution: { code: "picks = rng.integers(0, 8, size=3)   # [0 2 2] -> [18 13 13]" }
    },
    {
      id: "t16q9", type: "trace", level: "hard", topics: ["rng-seed"],
      q: { en: "Three dice throws of three. State the value of each name at the end.",
           ar: "ثلاثُ رمياتٍ من ثلاثة أحجار. حدّد قيمة كل اسم في النهاية." },
      code: "rng = np.random.default_rng(11)\n\na = rng.integers(1, 7, size=3)\nb = rng.integers(1, 7, size=3)\nc = np.random.default_rng(11).integers(1, 7, size=3)\n\nd = np.array_equal(a, b)",
      blanks: [
        { accept: ["[1 1 5]"], label: { en: "<code>a</code>", ar: "<code>a</code>" } },
        { accept: ["[3 4 4]"], label: { en: "<code>b</code>", ar: "<code>b</code>" } },
        { accept: ["[1 1 5]"], label: { en: "<code>c</code>", ar: "<code>c</code>" } },
        { accept: ["False"], label: { en: "<code>d</code>", ar: "<code>d</code>" } }
      ],
      explain: { en: "<code>b</code> is where the instinct goes wrong, and for a good reason: the line is a character-for-character copy of the one above it, the seed is still 11, and nothing in between touched anything &mdash; so it looks as though it has to repeat. It does not, because the generator has already handed out three numbers and will not go back for them. <code>c</code> shows what does repeat: a <em>new</em> generator from the same seed starts the same sequence from the beginning. The seed names a sequence; the generator holds a place in it. If a result must not depend on how many draws happened earlier in the file, build the generator where the randomness is used, from a seed you passed in.",
                 ar: "<code>b</code> هو موضعُ خطأ الحدس، ولسببٍ وجيه: فالسطرُ نسخةٌ حرفيّة من الذي فوقه، والبذرةُ ما زالت 11، ولم يمسّ شيءٌ بينهما شيئًا &mdash; فيبدو أنه لا بدّ أن يتكرر. وهو لا يتكرر، لأن المولّد سلّم ثلاثة أعداد ولن يعود إليها. و<code>c</code> يُظهر ما يتكرر فعلًا: فمولِّدٌ <em>جديد</em> من البذرة نفسها يبدأ المتتالية نفسها من أولها. فالبذرةُ تسمّي متتالية، والمولّد يمسك موضعًا فيها. فإن وجب ألّا تتوقف نتيجةٌ على كم سحبةً جرت قبلها في الملف، فابنِ المولّد حيث تُستعمل العشوائية من بذرةٍ مرّرتها." }
    },
    {
      id: "t16q10", type: "compare", level: "hard", topics: ["rng-seed", "split"],
      q: { en: "Both return the held-back rows for a twenty-row table. What is the difference?",
           ar: "كلاهما يُعيد الصفوف المحجوزة لجدولٍ من عشرين صفًّا. فما الفرق؟" },
      codeA: "import numpy as np\n\ndef test_rows(seed, n=20, frac=0.8):\n    order = np.random.default_rng(seed).permutation(n)\n    return order[int(frac * n):]\n\nprint(test_rows(1))\nprint(test_rows(1))",
      codeB: "import numpy as np\n\nrng = np.random.default_rng(1)\n\ndef test_rows(n=20, frac=0.8):\n    order = rng.permutation(n)\n    return order[int(frac * n):]\n\nprint(test_rows())\nprint(test_rows())",
      options: [
        { en: "A prints <code>[14 13  6 19]</code> twice; B prints it once and then four different rows, because B's single generator has moved on between the two calls.",
          ar: "A يطبع <code>[14 13  6 19]</code> مرتين؛ وB يطبعه مرة ثم أربعةَ صفوف مختلفة، لأن مولّد B الواحد تقدّم بين النداءين." },
        { en: "They print the same two lines: both are seeded with 1, so both are reproducible.",
          ar: "يطبعان السطرين نفسيهما: فكلاهما مبذورٌ بـ 1، فكلاهما قابلٌ للتكرار." },
        { en: "B raises, because a generator created outside a function cannot be used inside one.",
          ar: "B يرفع خطأً، لأن مولِّدًا يُنشأ خارج دالّة لا يمكن استعماله داخلها." },
        { en: "A prints two different lines, because it builds a brand-new generator on every call.",
          ar: "A يطبع سطرين مختلفين، لأنه يبني مولِّدًا جديدًا في كل نداء." }
      ],
      answer: 0,
      explain: { en: "Calling both reproducible is true of each <em>file as a whole</em> and false of the two calls inside B, which is exactly the distinction that bites in practice: run B from the top and you get the same two lines every time, so it passes the obvious test, yet insert one extra draw anywhere above it and the test set changes for no reason a reader can see. B is reproducible as a script and not as a function. The answer that says a new generator from the same seed gives something different inverts the rule the lesson is built on &mdash; a new generator from the same seed restarts the <em>same</em> sequence, which is precisely why A repeats. If a function's answer must depend only on its arguments, the generator has to be one of them, or be built from one.",
                 ar: "والقولُ بأن كليهما قابلٌ للتكرار صادقٌ عن <em>كل ملفٍ ككلّ</em> وكاذبٌ عن النداءين داخل B، وذلك بالضبط هو التمييز الذي يلدغ عمليًّا: فشغّل B من أعلاه تحصل على السطرين نفسيهما كل مرة، فيعبُر الفحصَ البديهي، ثم أدخِل سحبةً إضافية في أي موضع فوقه فتتغير مجموعةُ الاختبار بلا سببٍ يراه قارئ. فـ B قابلٌ للتكرار كبرنامجٍ لا كدالّة. والجوابُ الذي يزعم أن مولّدًا جديدًا من البذرة نفسها يعطي غير ذلك يقلب القاعدة التي بُني عليها الدرس &mdash; فمولِّدٌ جديد من البذرة نفسها يُعيد بدء المتتالية <em>نفسها</em>، ولذلك بالضبط يتكرر A. فإن وجب أن تتوقف نتيجةُ دالّةٍ على وسائطها وحدها فالمولّد يجب أن يكون أحدها أو أن يُبنى من أحدها." }
    },
    {
      id: "t16q11", type: "multi", level: "hard", topics: ["loop-ok", "vectorise", "rng-seed", "rng-legacy", "split"],
      q: { en: "Select <strong>every</strong> statement that is true.", ar: "اختر <strong>كل</strong> عبارة صحيحة." },
      options: [
        { en: "A running total kept inside a loop can usually be replaced by <code>.cumsum()</code>.", ar: "المجموعُ الجاري المحفوظ داخل حلقة يمكن عادةً استبدال <code>.cumsum()</code> به." },
        { en: "A simulation where each day's stock is computed from the day before, under a threshold that itself moves, is a loop worth keeping.", ar: "محاكاةٌ يُحسب فيها مخزونُ كل يوم من اليوم السابق تحت عتبةٍ تتحرك هي نفسها حلقةٌ جديرةٌ بالإبقاء." },
        { en: "The vectorised version always uses less memory than the loop, since it keeps no loop variables.", ar: "النسخةُ المتجهة تستهلك ذاكرةً أقل من الحلقة دائمًا، لأنها لا تحفظ متغيرات حلقة." },
        { en: "Two generators built with <code>np.random.default_rng(5)</code> give the same sequence of draws.", ar: "مولِّدان مبنيّان بـ <code>np.random.default_rng(5)</code> يعطيان متتاليةَ السحبات نفسها." },
        { en: "Calling <code>np.random.seed(5)</code> fixes what a generator made by <code>np.random.default_rng()</code> will produce.", ar: "نداءُ <code>np.random.seed(5)</code> يُثبّت ما سيُنتجه مولِّدٌ مصنوعٌ بـ <code>np.random.default_rng()</code>." },
        { en: "A fixed seed makes the held-back rows representative of the whole dataset.", ar: "البذرةُ الثابتة تجعل الصفوف المحجوزة ممثِّلةً للبيانات كلها." }
      ],
      answer: [0, 1, 3],
      explain: { en: "The third is backwards, and it is the claim this lesson has to argue against itself to make honestly: the loop holds three numbers at a time, while <code>1.5 * parcels + 1.2 * km</code> builds whole million-element arrays before <code>np.where</code> even starts. Speed and clarity are what you gain; memory is what you spend. The fifth fails for the reason the old interface is retired: those are two unrelated generators, so seeding the global one cannot reach into yours &mdash; which, read the other way round, is the whole argument for making your own. The sixth is the sharpest of them, because it is a real worry pointed at the wrong fix: a seed buys you the <em>same</em> split, not a <em>good</em> one, and seed 42 is perfectly capable of handing you a test set of deliveries all from one street. Repeatability and representativeness are different problems, which is why serious work re-checks a result across several seeds.",
                 ar: "الثالثة معكوسة، وهي الدعوى التي على هذا الدرس أن يُحاجج نفسه فيها ليكون أمينًا: فالحلقةُ تمسك ثلاثة أعداد في المرة، بينما تبني <code>1.5 * parcels + 1.2 * km</code> مصفوفاتٍ كاملةً بمليون عنصر قبل أن تبدأ <code>np.where</code> أصلًا. فالسرعةُ والوضوح هما المكسب، والذاكرةُ هي الثمن. والخامسة تسقط للسبب الذي من أجله أُحيلت الواجهةُ القديمة إلى التقاعد: فهما مولِّدان لا صلةَ بينهما، فبذرُ العامّ لا يصل إلى مولّدك &mdash; وذلك مقروءًا بالعكس هو كلُّ الحجّة لصنع مولِّدك. والسادسة أحدُّها، فهي همٌّ حقيقي صُوِّب إلى العلاج الخطأ: فالبذرةُ تشتري القسمة <em>نفسها</em> لا القسمة <em>الجيدة</em>، والبذرة 42 قادرةٌ تمامًا على أن تسلّمك مجموعةَ اختبارٍ من توصيلاتٍ كلُّها من شارع واحد. فالتكرارُ والتمثيل مشكلتان مختلفتان، ولذلك يُعيد العملُ الجادّ فحصَ النتيجة على عدة بذور." }
    },
    {
      id: "t16q12", type: "complete", level: "hard", topics: ["vector-recipe", "mask"],
      q: { en: "The loop had an <code>if</code> with no <code>else</code>: charge the late deliveries, leave the rest at zero. Which line?",
           ar: "كانت الحلقةُ فيها <code>if</code> بلا <code>else</code>: حمِّل التوصيلاتِ المتأخرة واترك الباقي صفرًا. فأي سطر؟" },
      code: "over = np.array([-2., 14., 3., 26., 10.])\nfees = np.zeros(len(over))\n\n# which line?\n\nprint(fees)   # must be [ 0.  7.  0. 13.  0.]",
      options: [
        { code: "fees[over > 10] = over[over > 10] * 0.5" },
        { code: "fees[over > 10] = over * 0.5" },
        { code: "fees = over[over > 10] * 0.5" },
        { code: "fees[over > 10] = 0.5" }
      ],
      answer: 0,
      explain: { en: "Assigning <code>over * 0.5</code> into the masked slot is what almost everyone writes first, and NumPy refuses it out loud: <code>ValueError: NumPy boolean array indexing assignment cannot assign 5 input values to the 2 output values where the mask is true</code>. Two late deliveries were selected on the left, so the right-hand side has to be filtered by the same mask and arrive with two values &mdash; the mask appears twice in the correct line for that reason, not by accident. The third quietly rebinds the name to <code>[ 7. 13.]</code>, a two-element array that no longer knows which deliveries it belongs to, and every line after it is then working on the wrong thing. The fourth charges a flat half shekel instead of half a shekel <em>a minute</em>. The rule to carry away is why <code>np.zeros</code> came first: the positions the mask does not touch keep what was already there, and that untouched value is the <code>else</code> branch you did not have to write.",
                 ar: "وإسنادُ <code>over * 0.5</code> في الموضع المُقنَّع هو ما يكتبه كلُّ الناس تقريبًا أولًا، ونمباي ترفضه جهرًا: <code>ValueError: NumPy boolean array indexing assignment cannot assign 5 input values to the 2 output values where the mask is true</code>. فقد اختار الطرفُ الأيسر توصيلتين متأخرتين، فعلى الطرف الأيمن أن يُرشَّح بالقناع نفسه وأن يأتي بقيمتين &mdash; ولذلك يظهر القناعُ مرتين في السطر الصحيح لا مصادفةً. والثالث يُعيد ربط الاسم بصمتٍ بـ <code>[ 7. 13.]</code>، وهي مصفوفةٌ من عنصرين لم تبقَ تعرف لأي توصيلاتٍ تنتمي، فيصير كلُّ سطر بعدها يعمل على الشيء الخطأ. والرابع يُحمِّل نصف شيكل مقطوعًا بدل نصف شيكل <em>للدقيقة</em>. والقاعدةُ التي تُحمل هي لماذا جاءت <code>np.zeros</code> أولًا: فالمواضعُ التي لا يمسّها القناع تُبقي ما كان فيها، وتلك القيمةُ غيرُ الممسوسة هي فرعُ <code>else</code> الذي لم تضطرّ إلى كتابته." }
    }
  ]
};
