/* ============================================================
   Appendix A4 self-check — numbers in a computer.
   Not examined anywhere (docs/SPEC.md §0, rule 3).
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["appendix-a4"] = {
  title: { en: "Self-check — A4", ar: "فحص ذاتي — A4" },
  intro: {
    en: "Six questions on this page only. <strong>Not examined</strong> &mdash; no lesson or chapter test asks about any of it.",
    ar: "ستة أسئلة على هذه الصفحة وحدها. <strong>غير ممتحَن فيها</strong> &mdash; فلا اختبار درس ولا اختبار فصل يسأل عن شيء منها."
  },
  questions: [
    {
      id: "a4q1", type: "output", level: "easy", topics: ["num-float"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "print(0.1 + 0.2)\nprint(0.1 + 0.2 == 0.3)",
      blanks: [{ accept: ["0.30000000000000004\nFalse"], lines: 2 }],
      explain: { en: "Not a bug. A decimal is stored as a sum of halves, and 0.1 is not any sum of halves, so the nearest available value is kept instead. The practical consequence is the whole lesson: never compare two computed decimals with <code>==</code>, use <code>np.isclose</code>.",
                 ar: "ليس خللًا. فالعدد العشري يُخزَّن مجموعَ أنصاف، و0.1 ليست مجموع أنصاف، فتُحفَظ أقرب قيمة متاحة. والنتيجة العملية هي الدرس كله: لا تقارن عشريّين محسوبَين بـ <code>==</code> أبدًا، بل استعمل <code>np.isclose</code>." }
    },
    {
      id: "a4q2", type: "mcq", level: "easy", topics: ["num-int"],
      q: { en: "An <code>int8</code> holds 100 and you add 100 to it. What happens?",
           ar: "<code>int8</code> يحمل 100 وتضيف إليه 100. فماذا يحدث؟" },
      options: [
        { en: "You get &minus;56 and a warning. The value wrapped round the ring of 256 slots, and a warning does not stop a script.",
          ar: "تحصل على &minus;56 وتحذير. فالقيمة التفّت حول حلقة المواضع الـ256، والتحذير لا يوقف سكربتًا." },
        { en: "You get 200, because NumPy widens the type automatically when a value will not fit.",
          ar: "تحصل على 200، لأن نمباي توسّع النوع تلقائيًا حين لا تتسع القيمة." },
        { en: "An <code>OverflowError</code> is raised and the program stops.",
          ar: "يُرفع <code>OverflowError</code> ويتوقف البرنامج." },
        { en: "You get 127, because the value is capped at the largest the type can hold.",
          ar: "تحصل على 127، لأن القيمة تُحصر عند أكبر ما يحمله النوع." }
      ],
      answer: 0,
      explain: { en: "The <code>OverflowError</code> answer is the one worth separating out, because it <em>is</em> what happens when you <em>build</em> an <code>int8</code> array containing 200 &mdash; <code>OverflowError</code>. Arithmetic that arrives at 200 only warns. Two different behaviours for the same impossible value, and the quiet one is the one you are more likely to hit.",
                 ar: "وجوابُ <code>OverflowError</code> يستحق الفصل، لأنه <em>هو</em> ما يحدث حين <em>تبني</em> مصفوفة <code>int8</code> تحوي 200 &mdash; <code>OverflowError</code>. أما الحساب الذي يصل إلى 200 فيحذّر فقط. سلوكان مختلفان للقيمة المستحيلة نفسها، والهادئ منهما هو الأرجح أن تصادفه." }
    },
    {
      id: "a4q3", type: "tf", level: "easy", topics: ["num-nan"],
      q: { en: "<code>np.nan == np.nan</code> is <code>False</code>, so you must use <code>np.isnan(x)</code> to find missing values.",
           ar: "<code>np.nan == np.nan</code> قيمتها <code>False</code>، فعليك استعمال <code>np.isnan(x)</code> لإيجاد القيم المفقودة." },
      truth: true,
      explain: { en: "<code>nan</code> means \"no value\", and two unknowns are not known to be equal, so the comparison is <code>False</code> even against itself. <code>x == np.nan</code> therefore finds nothing at all, silently &mdash; a mask of all <code>False</code> with no error.",
                 ar: "<code>nan</code> تعني «لا قيمة»، ومجهولان لا يُعلم تساويهما، فالمقارنة <code>False</code> حتى مع نفسها. ولذلك لا تجد <code>x == np.nan</code> شيئًا إطلاقًا وبصمت &mdash; قناعٌ كله <code>False</code> بلا خطأ." }
    },
    {
      id: "a4q4", type: "output", level: "medium", topics: ["num-nan"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "import numpy as np\n\nmarks = np.array([40.0, np.nan, 70.0])\nprint(marks.mean())\nprint(np.nanmean(marks))",
      blanks: [{ accept: ["nan\n55.0"], lines: 2 }],
      explain: { en: "One missing value makes the mean of the whole array <code>nan</code>. That is deliberate and it is a kindness &mdash; an average that quietly skipped the gap would be the average of a different class from the one you asked about. <code>np.nanmean</code> skips on purpose, and 55.0 is the mean of the two marks that exist.",
                 ar: "قيمةٌ مفقودة واحدة تجعل متوسط المصفوفة كلها <code>nan</code>. وذلك متعمَّد وهو لطف &mdash; فمتوسطٌ يتخطى الفجوة بصمت سيكون متوسط صفٍّ غير الذي سألت عنه. و<code>np.nanmean</code> تتخطى بقصد، و55.0 هي متوسط العلامتين الموجودتين." }
    },
    {
      id: "a4q5", type: "mcq", level: "medium", topics: ["num-money"],
      q: { en: "You are storing prices in shekels and agorot, such as 19.99. What should the array hold?",
           ar: "تخزّن أسعارًا بالشواكل والأغورات، مثل 19.99. فماذا ينبغي أن تحمل المصفوفة؟" },
      options: [
        { en: "Whole agorot as <code>int64</code> &mdash; 1999 &mdash; dividing by 100 only when you print.",
          ar: "أغورات صحيحة <code>int64</code> &mdash; 1999 &mdash; وتقسم على 100 عند الطباعة فقط." },
        { en: "<code>float64</code>, which has fifteen reliable digits and is far more than a price needs.",
          ar: "<code>float64</code>، وله خمسة عشر رقمًا موثوقًا وهي أكثر بكثير مما يحتاجه سعر." },
        { en: "<code>float32</code>, to halve the memory, since prices are small numbers.",
          ar: "<code>float32</code>، لنصف الذاكرة، إذ الأسعار أعداد صغيرة." },
        { en: "Strings, so the exact text the shop typed is preserved.",
          ar: "نصوصًا، ليُحفَظ النصّ الذي كتبه المحل بالضبط." }
      ],
      answer: 0,
      explain: { en: "19.99 cannot be stored exactly, so a thousand of them summed will disagree with the till by a fraction of an agora, and the disagreement grows with the count. Counting whole agorot makes every value exact and every sum exact. The <code>float64</code> answer is the tempting one &mdash; fifteen digits really does sound like plenty, and the trouble is not the number of digits but that the value was never exact to begin with.",
                 ar: "لا يمكن تخزين 19.99 تمامًا، فألفٌ منها مجموعةً ستخالف الصندوق بكسر أغورة، وتكبر المخالفة بالعدد. وعدُّ الأغورات صحيحةً يجعل كل قيمة دقيقة وكل مجموع دقيقًا. وجوابُ <code>float64</code> هو المغري &mdash; فخمسة عشر رقمًا تبدو كثيرة فعلًا، والمشكلة ليست عدد الأرقام بل أن القيمة لم تكن دقيقة أصلًا." }
    },
    {
      id: "a4q6", type: "mcq", level: "medium", topics: ["num-float32"],
      q: { en: "When is <code>float32</code> the right choice over the default <code>float64</code>?",
           ar: "متى يكون <code>float32</code> الخيار الصحيح بدل <code>float64</code> الافتراضي؟" },
      options: [
        { en: "When you have measured that memory is the actual problem &mdash; millions of values &mdash; and you can accept six reliable digits instead of fifteen.",
          ar: "حين تكون قد قِست أن الذاكرة هي المشكلة فعلًا &mdash; ملايين القيم &mdash; وتستطيع قبول ستة أرقام موثوقة بدل خمسة عشر." },
        { en: "Always, since it is twice as fast and the extra digits are never used.",
          ar: "دائمًا، فهو أسرع مرتين والأرقام الزائدة لا تُستعمل أبدًا." },
        { en: "Whenever the numbers are small, since small numbers need fewer bits.",
          ar: "كلما كانت الأعداد صغيرة، إذ الأعداد الصغيرة تحتاج بتّات أقل." },
        { en: "Never &mdash; <code>float32</code> is a legacy type kept only for old files.",
          ar: "أبدًا &mdash; فـ <code>float32</code> نوعٌ قديم محفوظ للملفات القديمة فقط." }
      ],
      answer: 0,
      explain: { en: "It is a trade with a measurable benefit and a real cost: in <code>float32</code> there is no slot between 16 777 216 and 16 777 218, so adding one to the first changes nothing and nothing warns. Note the answer about small numbers is wrong for an interesting reason &mdash; it is not the <em>size</em> of a number that costs digits but how many digits you need to keep, and a small number measured precisely needs just as many.",
                 ar: "إنها مقايضة بفائدة قابلة للقياس وثمن حقيقي: ففي <code>float32</code> لا موضع بين 16 777 216 و16 777 218، فإضافةُ واحد إلى الأول لا تغيّر شيئًا ولا شيء يحذّر. ولاحظ أن الجواب عن الأعداد الصغيرة خاطئ لسبب مثير &mdash; فليس <em>حجمُ</em> العدد ما يكلّف أرقامًا بل كم رقمًا تحتاج حفظه، والعدد الصغير المقيس بدقة يحتاج القدر نفسه." }
    }
  ]
};
