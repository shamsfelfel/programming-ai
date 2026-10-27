/* ============================================================
   Appendix A3 self-check.

   Not a test: nothing here is examined in a lesson or chapter
   test (docs/SPEC.md §0, rule 3). It exists so a reader can find
   out whether a word is still vague before a lecture uses it.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["appendix-a3"] = {
  title: { en: "Self-check — A3", ar: "فحص ذاتي — A3" },
  intro: {
    en: "Six questions on this page only. <strong>Not examined</strong> &mdash; no lesson or chapter test asks about any of this. Use it to find the word you are still unsure of.",
    ar: "ستة أسئلة على هذه الصفحة وحدها. <strong>غير ممتحَن فيها</strong> &mdash; فلا اختبار درس ولا اختبار فصل يسأل عن شيء منها. استعملها لتجد اللفظ الذي لا تزال غير واثق منه."
  },
  questions: [
    {
      id: "a3q1", type: "mcq", level: "easy", topics: ["ml-model"],
      q: { en: "In one sentence, what is a model?", ar: "في جملة واحدة، ما النموذج؟" },
      options: [
        { en: "A function whose shape a person chose and whose numbers a computer found from examples.",
          ar: "دالةٌ اختار الإنسان شكلها ووجد الحاسوب أرقامها من الأمثلة." },
        { en: "A program that stores every example it was given and looks the answer up.",
          ar: "برنامجٌ يخزّن كل مثال أُعطيه ويبحث عن الجواب فيه." },
        { en: "A table of data with the answers already filled in.",
          ar: "جدول بيانات أجوبته معبّأة أصلًا." },
        { en: "A library that must be imported before any data can be read.",
          ar: "مكتبةٌ يجب استيرادها قبل قراءة أي بيانات." }
      ],
      answer: 0,
      explain: { en: "Shape from a person, numbers from the data. The answer about storing every example describes looking things up, which is not the same thing: a model answers for rows it has never seen, because it kept numbers rather than examples.",
                 ar: "الشكل من الإنسان والأرقام من البيانات. والجوابُ عن تخزين كل مثال يصف البحث في جدول، وليس هو نفسه: فالنموذج يجيب عن صفوف لم يرها قطّ، لأنه احتفظ بأرقام لا بأمثلة." }
    },
    {
      id: "a3q2", type: "match", level: "easy", topics: ["ml-data"],
      q: { en: "Match each name to the part of the dataset it refers to.",
           ar: "وصّل كل اسم بالجزء الذي يشير إليه من مجموعة البيانات." },
      leftHead: { en: "Name", ar: "الاسم" },
      rightHead: { en: "Part of the data", ar: "جزء البيانات" },
      pairs: [
        { l: { code: "X" }, r: { en: "The whole input table &mdash; every row, every input column.", ar: "جدول المدخلات كله &mdash; كل صفّ وكل عمود مدخل." } },
        { l: { code: "y" }, r: { en: "The single answer column, one value per row.", ar: "عمود الجواب الوحيد، قيمةٌ لكل صفّ." } },
        { l: { en: "a feature", ar: "سمة" }, r: { en: "One input column, such as the area of a flat.", ar: "عمود مدخل واحد، كمساحة الشقة." } },
        { l: { en: "a sample", ar: "عيّنة" }, r: { en: "One row &mdash; one flat you measured.", ar: "صفٌّ واحد &mdash; شقة واحدة قِستها." } }
      ],
      explain: { en: "Rows are samples, input columns are features, the answer column is <code>y</code>, and all the input columns together are <code>X</code>. Nearly every function signature you meet in the rest of this course is <code>something(X, y)</code>.",
                 ar: "الصفوف عيّنات، وأعمدة المدخلات سمات، وعمود الجواب <code>y</code>، وأعمدة المدخلات كلها معًا <code>X</code>. وكل توقيع دالة تقريبًا ستقابله في بقية المقرر هو <code>something(X, y)</code>." }
    },
    {
      id: "a3q3", type: "tf", level: "easy", topics: ["ml-fit"],
      q: { en: "<code>fit</code> changes the object it is called on; <code>transform</code> and <code>predict</code> only read what <code>fit</code> stored.",
           ar: "<code>fit</code> تغيّر الكائن الذي استُدعيت عليه؛ و<code>transform</code> و<code>predict</code> تقرآن ما خزّنته <code>fit</code> فقط." },
      truth: true,
      explain: { en: "This is the whole contract, and it is pure Chapter 1: <code>fit</code> writes attributes on <code>self</code>, the other two read them back. It is also why calling <code>transform</code> first crashes &mdash; the attributes are still <code>None</code>.",
                 ar: "هذا هو العقد كله، وهو فصلٌ أول خالص: فـ <code>fit</code> تكتب خصائص على <code>self</code>، والأخريان تقرآنها. وهو أيضًا سبب انهيار استدعاء <code>transform</code> أولًا &mdash; فالخصائص لا تزال <code>None</code>." }
    },
    {
      id: "a3q4", type: "output", level: "medium", topics: ["ml-fit"],
      q: { en: "Write the two lines this prints. <code>fit</code> remembers the smallest and largest it was shown.",
           ar: "اكتب السطرين الذين يطبعهما. تحفظ <code>fit</code> أصغر ما رأته وأكبره." },
      code: "class Scaler:\n    def __init__(self):\n        self.smallest = None\n        self.largest = None\n\n    def fit(self, column):\n        self.smallest = min(column)\n        self.largest = max(column)\n        return self\n\n    def transform(self, column):\n        span = self.largest - self.smallest\n        return [(v - self.smallest) / span for v in column]\n\n\ns = Scaler()\ns.fit([10, 20, 30])\nprint(s.transform([10, 20, 30]))\nprint(s.transform([15]))",
      blanks: [{ accept: ["[0.0, 0.5, 1.0]\n[0.25]"], lines: 2 }],
      explain: { en: "The second call did <strong>not</strong> look at <code>[15]</code> to decide anything &mdash; it reused the 10 and 30 that <code>fit</code> stored, so 15 lands a quarter of the way along. That reuse is the entire point: new data must be measured against the <em>same</em> ruler, which is why the ruler lives on the object.",
                 ar: "لم ينظر الاستدعاء الثاني إلى <code>[15]</code> ليقرر شيئًا &mdash; بل أعاد استعمال 10 و30 اللتين خزّنتهما <code>fit</code>، فتحلّ 15 عند ربع المسافة. وإعادة الاستعمال تلك هي المقصد كله: فالبيانات الجديدة يجب أن تُقاس بالمسطرة <em>نفسها</em>، ولهذا تعيش المسطرة على الكائن." }
    },
    {
      id: "a3q5", type: "mcq", level: "medium", topics: ["ml-transform"],
      q: { en: "What distinguishes a preprocessing step from a model, in terms of the methods it has?",
           ar: "ما الذي يميّز خطوة التهيئة عن النموذج، من حيث الدوال التي يملكها؟" },
      options: [
        { en: "A step has <code>fit</code> and <code>transform</code> and returns changed data; a model has <code>fit</code> and <code>predict</code> and returns an answer per row.",
          ar: "للخطوة <code>fit</code> و<code>transform</code> وتُعيد بيانات مغيَّرة؛ وللنموذج <code>fit</code> و<code>predict</code> ويُعيد جوابًا لكل صفّ." },
        { en: "A step has no <code>fit</code>, because it does not learn anything from the data.",
          ar: "ليس للخطوة <code>fit</code>، لأنها لا تتعلّم شيئًا من البيانات." },
        { en: "A model must be a subclass of the step it follows.",
          ar: "يجب أن يكون النموذج وريثًا للخطوة التي تسبقه." },
        { en: "There is no difference; the names are interchangeable.",
          ar: "لا فرق؛ فالأسماء متبادلة." }
      ],
      answer: 0,
      explain: { en: "Both <em>learn</em> &mdash; both have <code>fit</code> &mdash; and they differ only in what they hand back. That is exactly the kind of difference a shared interface is for, which is what <a href=\"#lesson-08\">Lecture 10</a> builds.",
                 ar: "كلاهما <em>يتعلّم</em> &mdash; ولكليهما <code>fit</code> &mdash; ولا يختلفان إلا فيما يُعيدانه. وذلك بالضبط نوع الاختلاف الذي تُصنع له الواجهة المشتركة، وهو ما تبنيه <a href=\"#lesson-08\">المحاضرة 10</a>." }
    },
    {
      id: "a3q6", type: "mcq", level: "medium", topics: ["ml-pipeline"],
      q: { en: "Why does a pipeline object exist at all, when you could simply call the four steps yourself in the right order?",
           ar: "لماذا يوجد كائن المسار أصلًا، وأنت تستطيع ببساطة استدعاء الخطوات الأربع بنفسك بالترتيب الصحيح؟" },
      options: [
        { en: "Because the order has to be identical in training and later in use, and a script that repeats it in two places will eventually disagree with itself.",
          ar: "لأن الترتيب يجب أن يكون متطابقًا في التدريب وفي الاستعمال لاحقًا، والسكربت الذي يكرّره في موضعين سيخالف نفسه في النهاية." },
        { en: "Because calling four methods is slower than calling one.",
          ar: "لأن استدعاء أربع دوال أبطأ من استدعاء واحدة." },
        { en: "Because Python cannot call four objects in sequence without a container.",
          ar: "لأن بايثون لا تستطيع استدعاء أربعة كائنات بالتتابع بلا حاوية." },
        { en: "Because each step must inherit from the pipeline to be used.",
          ar: "لأن كل خطوة يجب أن ترث من المسار لتُستعمل." }
      ],
      answer: 0,
      explain: { en: "It is the <a href=\"#l3-h1\">one-door argument from Lesson 3</a> again, applied to an order rather than to a value: a rule repeated in two places is a rule that will be broken in one of them. Here the consequence is that the model is served data shaped differently from the data it was trained on, which fails silently and produces confident nonsense.",
                 ar: "إنها <a href=\"#l3-h1\">حجة الباب الواحد من الدرس 3</a> مرة أخرى، مطبَّقةً على ترتيب لا على قيمة: فالقاعدة المكرَّرة في موضعين قاعدةٌ ستُكسر في أحدهما. والنتيجة هنا أن النموذج يُقدَّم له بيانات بشكل مختلف عن التي دُرِّب عليها، فيفشل بصمت ويُنتج هراءً واثقًا." }
    }
  ]
};
