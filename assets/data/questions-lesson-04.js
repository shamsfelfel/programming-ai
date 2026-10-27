/* ============================================================
   Lesson 4 — Abstraction & Clean Interfaces.
   Domains: the phone-charging shop, the clinic water tank,
   the notifier channels, the report exporters.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-04"] = {
  title: { en: "Test 4 — Abstraction &amp; Clean Interfaces", ar: "اختبار 4 — التجريد والواجهات" },
  intro: {
    en: "Twelve questions on Lesson 4. Two different ideas share this lesson and it is worth keeping them apart: <strong>hiding the shape</strong> of your data behind a small set of answers, and <strong>naming the promise</strong> with <code>ABC</code> so a missing method becomes a crash on your machine instead of a wrong number on the customer's receipt.",
    ar: "اثنا عشر سؤالًا على الدرس 4. وفكرتان مختلفتان تتقاسمان هذا الدرس ويجدر التمييز بينهما: <strong>إخفاء شكل</strong> بياناتك خلف مجموعة صغيرة من الأجوبة، و<strong>تسمية الوعد</strong> بـ <code>ABC</code> فتصبح الدالة المفقودة انهيارًا على حاسوبك لا رقمًا خاطئًا على إيصال العميل."
  },
  questions: [
    {
      id: "t4q1", type: "tf", level: "easy",
      topics: ["abc", "early-failure"],
      q: { en: "A class that inherits from <code>ABC</code> and leaves one <code>@abstractmethod</code> unimplemented still creates objects normally; the error only appears when that method is called.",
           ar: "الصنف الذي يرث من <code>ABC</code> ويترك <code>@abstractmethod</code> واحدة غير منفَّذة يُنشئ كائنات بصورة طبيعية؛ ولا يظهر الخطأ إلا عند استدعاء تلك الدالة." },
      truth: false,
      explain: { en: "The opposite, and that is the entire value. <code>HalfExporter()</code> raises <code>TypeError: Can't instantiate abstract class HalfExporter without an implementation for abstract method 'row'</code> at the moment of creation &mdash; which in a real program is import time or the first line of the first test. Without <code>ABC</code> the object is created happily and fails later, inside a method, while serving a customer.",
                 ar: "العكس، وهذا كل القيمة. فـ <code>HalfExporter()</code> ترفع <code>TypeError: Can't instantiate abstract class HalfExporter without an implementation for abstract method 'row'</code> لحظةَ الإنشاء &mdash; وهي في برنامج حقيقي وقتُ الاستيراد أو أول سطر في أول اختبار. وبلا <code>ABC</code> يُنشأ الكائن راضيًا ويفشل لاحقًا داخل دالة وأنت تخدم عميلًا." }
    },
    {
      id: "t4q2", type: "fill", level: "easy",
      topics: ["abc"],
      q: { en: "Complete the import and the two markers that make <code>Notifier</code> a promise rather than a working class.",
           ar: "أكمل الاستيراد والعلامتين التي تجعل <code>Notifier</code> وعدًا لا صنفًا عاملًا." },
      code: "from abc import ____1____, abstractmethod\n\n\nclass Notifier(____2____):\n    ____3____\n    def send(self, to, text):\n        ...\n\n\nclass SmsNotifier(Notifier):\n    def send(self, to, text):\n        print(f\"[SMS] {to}: {text}\")",
      blanks: [
        { accept: ["ABC"], label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["ABC"], label: { en: "blank 2", ar: "الفراغ 2" } },
        { accept: ["@abstractmethod"], label: { en: "blank 3", ar: "الفراغ 3" } }
      ],
      explain: { en: "Both pieces are needed and each does half the job. Inheriting from <code>ABC</code> is what gives the class the machinery to refuse instantiation; <code>@abstractmethod</code> is what marks <em>which</em> methods must be supplied. <code>@abstractmethod</code> on a class that does not inherit from <code>ABC</code> is silently ignored &mdash; a quiet and fairly common mistake.",
                 ar: "القطعتان لازمتان وكلٌّ تؤدي نصف المهمة. فالوراثة من <code>ABC</code> هي ما يمنح الصنف الآلية التي ترفض الإنشاء؛ و<code>@abstractmethod</code> هي ما يعلّم <em>أي</em> الدوال يجب توفيرها. و<code>@abstractmethod</code> على صنف لا يرث من <code>ABC</code> تُتجاهل بصمت &mdash; وهو خطأ هادئ شائع إلى حدٍّ ما." }
    },
    {
      id: "t4q3", type: "output", level: "easy",
      topics: ["interface", "hide-shape"],
      q: { en: "<code>paused_minutes</code> was added to the class and to nothing else. Write the two lines this prints.",
           ar: "أُضيفت <code>paused_minutes</code> إلى الصنف ولا شيء غيره. اكتب السطرين الذين يطبعهما." },
      code: "class ChargeSession:\n    rate_per_min = 0.5\n\n    def __init__(self, customer, start_min, end_min=None, paused_minutes=0):\n        self.customer = customer\n        self._start = start_min\n        self._end = end_min\n        self._paused = paused_minutes\n\n    @property\n    def is_running(self):\n        return self._end is None\n\n    @property\n    def minutes_used(self):\n        if self._end is None:\n            return 0\n        return self._end - self._start - self._paused\n\n    @property\n    def cost(self):\n        return self.minutes_used * self.rate_per_min\n\n\ns = ChargeSession(\"Rami\", 100, 160, paused_minutes=10)\nprint(s.is_running, s.minutes_used, s.cost)\nt = ChargeSession(\"Huda\", 200)\nprint(t.is_running, t.minutes_used, t.cost)",
      blanks: [{ accept: ["False 50 25.0\nTrue 0 0.0"], lines: 2 }],
      explain: { en: "60 minutes of wall clock minus 10 paused is 50, at 0.5 each is 25.0. Note the second session: still running, so <code>minutes_used</code> answers 0 rather than crashing on <code>None</code> arithmetic &mdash; the property owns that decision so no caller has to. And <code>cost</code> never mentions <code>_start</code>, <code>_end</code> or <code>_paused</code>; it asks <code>minutes_used</code>, which is why adding the pause feature changed one method and no call site.",
                 ar: "60 دقيقة بالساعة ناقص 10 موقوفة تساوي 50، وبسعر 0.5 لكل دقيقة تساوي 25.0. ولاحظ الجلسة الثانية: لا تزال جارية، فتجيب <code>minutes_used</code> بـ 0 بدل أن تنهار في حساب على <code>None</code> &mdash; فالخاصية تملك ذلك القرار فلا يحتاجه أي مستدعٍ. و<code>cost</code> لا تذكر <code>_start</code> ولا <code>_end</code> ولا <code>_paused</code> أبدًا؛ بل تسأل <code>minutes_used</code>، ولهذا غيّرت إضافة ميزة الإيقاف دالة واحدة ولا موضع استدعاء." }
    },
    {
      id: "t4q4", type: "mcq", level: "easy",
      topics: ["interface", "hide-shape"],
      q: { en: "The clinic's tank class stored <code>litres</code>. A new tank has a depth gauge instead, so the real measurement is now <code>depth_cm</code>. Which earlier design makes that swap cheap?",
           ar: "كان صنف خزان العيادة يخزّن <code>litres</code>. والخزان الجديد فيه مقياس عمق بدلًا من ذلك، فصار القياس الحقيقي <code>depth_cm</code>. فأي تصميم سابق يجعل ذلك الاستبدال رخيصًا؟" },
      options: [
        { en: "One that published <code>litres_left</code> and <code>is_low</code> as answers, so the new class can compute them from depth and every caller is unchanged.",
          ar: "تصميم نشر <code>litres_left</code> و<code>is_low</code> كأجوبة، فيستطيع الصنف الجديد حسابها من العمق ويبقى كل مستدعٍ بلا تغيير." },
        { en: "One that made <code>litres</code> a public attribute, so callers can read it directly with no method call.",
          ar: "تصميم جعل <code>litres</code> خاصية عامة، فيقرأها المستدعون مباشرة بلا استدعاء دالة." },
        { en: "One that stored both <code>litres</code> and <code>depth_cm</code> from the start, so either is available.",
          ar: "تصميم خزّن <code>litres</code> و<code>depth_cm</code> من البداية، فيكون أيٌّ منهما متاحًا." },
        { en: "One that exposed a single <code>data</code> dictionary, so new fields can be added without changing the class.",
          ar: "تصميم كشف قاموس <code>data</code> واحدًا، فتُضاف حقول جديدة بلا تغيير الصنف." }
      ],
      answer: 0,
      explain: { en: "Callers should depend on the <em>question</em> they are asking, not on how you happen to store the answer. If twelve places read <code>t.litres</code>, changing to a depth gauge means twelve edits; if they read <code>t.litres_left</code>, the new class computes it from <code>depth_cm</code> and nothing outside moves. Storing both fields costs you an invariant to maintain between them, and the public dictionary is the worst of all &mdash; a public dictionary is the data shape with extra steps, and every caller still knows your key names.",
                 ar: "ينبغي أن يتوقف المستدعون على <em>السؤال</em> الذي يسألونه، لا على الطريقة التي تخزّن بها الجواب. فإن قرأت اثنتا عشرة موضعًا <code>t.litres</code> كان التحوّل إلى مقياس عمق اثني عشر تعديلًا؛ وإن قرأت <code>t.litres_left</code> حسبها الصنف الجديد من <code>depth_cm</code> ولم يتحرك شيء في الخارج. وتخزينُ الحقلين معًا يكلّفك شرطًا ثابتًا تصونه بينهما، والقاموسُ العام أسوأ الكل &mdash; فالقاموس العام هو شكل البيانات بخطوات زائدة، ويظل كل مستدعٍ يعرف أسماء مفاتيحك." }
    },
    {
      id: "t4q5", type: "error", level: "medium",
      topics: ["abc", "early-failure"],
      q: { en: "<code>@abstractmethod</code> is present, yet <code>BrokenNotifier()</code> is created without complaint and only fails later. Click the line that causes that.",
           ar: "<code>@abstractmethod</code> موجودة، ومع ذلك يُنشأ <code>BrokenNotifier()</code> بلا اعتراض ولا يفشل إلا لاحقًا. انقر السطر الذي يسبّب ذلك." },
      code: "from abc import ABC, abstractmethod\n\n\nclass Notifier:\n    @abstractmethod\n    def send(self, to, text):\n        ...\n\n\nclass BrokenNotifier(Notifier):\n    pass\n\n\nn = BrokenNotifier()\nn.send(\"0599\", \"ready\")",
      answer: 4,
      explain: { en: "Line 4 says <code>class Notifier:</code> and not <code>class Notifier(ABC):</code>. Without that base class there is no machinery to check abstract methods, so <code>@abstractmethod</code> becomes a decorative comment: it sets a flag nobody reads. The object is created, and the failure arrives at <code>n.send(...)</code> &mdash; which inherits the <code>...</code> body and silently returns <code>None</code>. That is the worst of both worlds: no crash and no notification sent.",
                 ar: "السطر 4 يقول <code>class Notifier:</code> لا <code>class Notifier(ABC):</code>. وبلا ذلك الصنف الأساس لا توجد آلية تفحص الدوال المجرّدة، فتصبح <code>@abstractmethod</code> تعليقًا زخرفيًا: ترفع علامةً لا يقرأها أحد. فيُنشأ الكائن، ويصل الفشل عند <code>n.send(...)</code> &mdash; التي ترث جسد <code>...</code> وتُعيد <code>None</code> بصمت. وذلك أسوأ العالمين: لا انهيار ولا إشعار مُرسل." },
      solution: { code: "class Notifier(ABC):\n    @abstractmethod\n    def send(self, to, text):\n        ...",
                  out: "TypeError: Can't instantiate abstract class BrokenNotifier without an implementation for abstract method 'send'" }
    },
    {
      id: "t4q6", type: "compare", level: "medium",
      topics: ["abc", "early-failure", "interface"],
      q: { en: "Both programs forget to write <code>send</code> on a new channel. What is the difference in <em>when</em> and <em>where</em> you find out?",
           ar: "كلا البرنامجين ينسى كتابة <code>send</code> على قناة جديدة. فما الفرق في <em>متى</em> و<em>أين</em> تكتشف ذلك؟" },
      codeA: "class TelegramNotifier:\n    pass\n\n\ndef charging_done(notifier, customer):\n    notifier.send(customer, \"your phone is ready\")\n\n\nn = TelegramNotifier()\nprint(\"created fine\")\ncharging_done(n, \"Rami\")",
      codeB: "from abc import ABC, abstractmethod\n\n\nclass Notifier(ABC):\n    @abstractmethod\n    def send(self, to, text):\n        ...\n\n\nclass TelegramNotifier(Notifier):\n    pass\n\n\nn = TelegramNotifier()\nprint(\"created fine\")",
      options: [
        { en: "A prints <code>created fine</code> and then raises <code>AttributeError</code> inside <code>charging_done</code> &mdash; in code that is not at fault, while serving a customer. B never prints at all: it raises <code>TypeError</code> on the line that says <code>TelegramNotifier()</code>, naming the missing method.",
          ar: "تطبع أ <code>created fine</code> ثم ترفع <code>AttributeError</code> داخل <code>charging_done</code> &mdash; في كود لا ذنب له، وأنت تخدم عميلًا. وب لا تطبع شيئًا إطلاقًا: فترفع <code>TypeError</code> في السطر الذي يقول <code>TelegramNotifier()</code>، مسمّيةً الدالة المفقودة." },
        { en: "Both raise the same error in the same place; <code>ABC</code> only improves the message.",
          ar: "ترفع كلتاهما الخطأ نفسه في الموضع نفسه؛ و<code>ABC</code> تحسّن الرسالة فقط." },
        { en: "A is better, because it lets the program keep running until the notification is genuinely needed.",
          ar: "أ أفضل، لأنها تتيح للبرنامج أن يمضي حتى يُحتاج الإشعار فعلًا." },
        { en: "B raises its error only when <code>n.send(...)</code> is called, just one step earlier than A.",
          ar: "ترفع ب خطأها عند استدعاء <code>n.send(...)</code> فقط، أي خطوة واحدة قبل أ." }
      ],
      answer: 0,
      explain: { en: "The defect did not get smaller, it got <em>earlier</em> &mdash; and it moved from the customer's side of the counter to the programmer's. Compare the two tracebacks: A blames <code>charging_done</code>, a function that is perfectly correct and merely the first to notice; B blames the line that created the incomplete class, which is where the mistake actually is. In a real project A's error surfaces in production and B's surfaces at import time or in the first test.",
                 ar: "لم يصغر العيب، بل صار <em>أبكر</em> &mdash; وانتقل من جهة العميل في المنضدة إلى جهة المبرمج. قارن التتبّعين: فأ تلوم <code>charging_done</code>، وهي دالة صحيحة تمامًا وأول من لاحظ فقط؛ وب تلوم السطر الذي أنشأ الصنف الناقص، وهو موضع الخطأ فعلًا. وفي مشروع حقيقي يظهر خطأ أ في الإنتاج ويظهر خطأ ب وقتَ الاستيراد أو في أول اختبار." }
    },
    {
      id: "t4q7", type: "order", level: "medium",
      topics: ["interface", "hide-shape"],
      q: { en: "Put the steps of the lesson's conversion in order: turning a class whose internals everybody reads into one that publishes answers.",
           ar: "رتّب خطوات التحويل في الدرس: تحويل صنف يقرأ الجميع تفاصيله الداخلية إلى صنف ينشر أجوبة." },
      items: [
        { en: "List the questions callers actually ask of the object &mdash; is it running, how long, how much.", ar: "اسرد الأسئلة التي يسألها المستدعون للكائن فعلًا &mdash; هل يعمل، وكم طال، وبكم." },
        { en: "Publish one property per question, computing each from whatever is stored.", ar: "انشر خاصية لكل سؤال، تحسب كلًّا منها من أي شيء مخزَّن." },
        { en: "Rename the stored fields with a leading underscore, so the shape is marked private.", ar: "غيّر أسماء الحقول المخزّنة بشرطة سفلية في البداية، فيُعلَّم الشكل خاصًا." },
        { en: "Rewrite the helper functions to ask the properties instead of touching the fields.", ar: "أعد كتابة الدوال المساعدة لتسأل الخصائص بدل مسّ الحقول." },
        { en: "Now change the internal shape freely &mdash; add <code>paused_minutes</code> &mdash; and edit only the one property that depends on it.", ar: "الآن غيّر الشكل الداخلي بحرية &mdash; أضف <code>paused_minutes</code> &mdash; وعدّل الخاصية الواحدة التي تتوقف عليه فقط." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "The first step is the one people skip, and it is the one that decides whether the design works: the interface is a list of <em>questions</em>, discovered by reading the call sites, not a list of the fields you happen to have. The last step is the payoff and it is also the test &mdash; if adding a field still forces edits outside the class, the interface was leaking.",
                 ar: "الخطوة الأولى هي التي يتخطاها الناس، وهي التي تقرر هل ينجح التصميم: فالواجهة قائمة <em>أسئلة</em> تُكتشف بقراءة مواضع الاستدعاء، لا قائمة الحقول التي تملكها اتفاقًا. والخطوة الأخيرة هي المردود وهي الاختبار كذلك &mdash; فإن كانت إضافة حقل لا تزال تفرض تعديلات خارج الصنف فالواجهة كانت تسرّب." }
    },
    {
      id: "t4q8", type: "match", level: "medium",
      topics: ["abc", "interface", "early-failure"],
      q: { en: "Match each situation to what it actually tells you.",
           ar: "وصّل كل حالة بما تقوله لك فعلًا." },
      leftHead: { en: "What you see", ar: "ما تراه" },
      rightHead: { en: "What it means", ar: "ما يعني" },
      pairs: [
        { l: { code: "TypeError: Can't instantiate abstract class ..." },
          r: { en: "A subclass forgot a required method, caught at creation &mdash; exactly the failure you want.", ar: "وريثٌ نسي دالة مطلوبة، ضُبط عند الإنشاء &mdash; وهو بالضبط الفشل الذي تريده." } },
        { l: { code: "AttributeError: 'X' object has no attribute 'send'" },
          r: { en: "A duck that could not quack, discovered mid-flight by whichever innocent function called it first.", ar: "بطة لم تستطع البطبطة، اكتُشفت في الطيران بأي دالة بريئة استدعتها أولًا." } },
        { l: { code: "@abstractmethod on a plain class" },
          r: { en: "A decoration with no effect: the flag is set and nothing ever checks it.", ar: "زخرفة بلا أثر: ترفع العلامة ولا يفحصها شيء أبدًا." } },
        { l: { code: "a subclass defining its own __init__" },
          r: { en: "Perfectly fine: an abstract base dictates what a subclass must <em>do</em>, never how it is built.", ar: "لا بأس فيه إطلاقًا: فالأساس المجرّد يفرض ما يجب أن <em>يفعله</em> الوريث، لا كيف يُبنى." } }
      ],
      explain: { en: "The last pair is the one worth remembering when you first use <code>ABC</code>: <code>CardPayment</code> and <code>CreditBook</code> in the lesson each take different constructor arguments, and the abstract base is content, because it only promised that <code>take()</code> exists.",
                 ar: "الزوج الأخير يستحق التذكّر عند أول استعمالك <code>ABC</code>: فـ <code>CardPayment</code> و<code>CreditBook</code> في الدرس يأخذ كلٌّ منهما وسائط بناء مختلفة، والأساس المجرّد راضٍ، لأنه لم يوعد إلا بوجود <code>take()</code>." }
    },
    {
      id: "t4q9", type: "complete", level: "hard",
      topics: ["abc", "interface"],
      q: { en: "<code>ReportExporter</code> should force every exporter to supply both a header and a row format, while <code>daily_report</code> stays written once. Which base class is right?",
           ar: "ينبغي أن يُلزم <code>ReportExporter</code> كل مُصدِّر بتوفير ترويسة وتنسيق سطر، وتبقى <code>daily_report</code> مكتوبة مرة واحدة. فأي صنف أساس هو الصحيح؟" },
      code: "from abc import ABC, abstractmethod\n\n\n# which base class?\n\n\nclass CsvExporter(ReportExporter):\n    def header(self):\n        return \"name,total\"\n\n    def row(self, r):\n        return f\"{r[0]},{r[1]}\"\n\n\ndef daily_report(exporter, rows):\n    lines = [exporter.header()]\n    for r in rows:\n        lines.append(exporter.row(r))\n    return \"\\n\".join(lines)",
      options: [
        { code: "class ReportExporter(ABC):\n    @abstractmethod\n    def header(self):\n        ...\n\n    @abstractmethod\n    def row(self, r):\n        ..." },
        { code: "class ReportExporter(ABC):\n    @abstractmethod\n    def header(self):\n        ...\n\n    def row(self, r):\n        return str(r)" },
        { code: "class ReportExporter:\n    @abstractmethod\n    def header(self):\n        ...\n\n    @abstractmethod\n    def row(self, r):\n        ..." },
        { code: "class ReportExporter(ABC):\n    def header(self):\n        raise NotImplementedError\n\n    def row(self, r):\n        raise NotImplementedError" }
      ],
      answer: 0,
      explain: { en: "Both methods are genuinely required, so both get the marker. The version that gives <code>row</code> a body quietly provides a default, which means an exporter that forgets it produces plausible-looking wrong output instead of an error &mdash; a default is the right choice only when it is genuinely a sensible fallback. The third drops <code>ABC</code> and so checks nothing, as question 5 showed. The fourth is the old pre-<code>ABC</code> idiom: it does work, but it fails <em>on call</em> rather than on creation, which is the whole thing <code>ABC</code> improves on.",
                 ar: "كلتا الدالتين مطلوبة فعلًا، فتأخذ كلتاهما العلامة. والنسخةُ التي تمنح <code>row</code> جسدًا توفّر بصمت قيمة افتراضية، ومعناه أن مُصدِّرًا ينساها يُنتج مُخرَجًا خاطئًا يبدو معقولًا بدل خطأ &mdash; والافتراضية اختيارٌ صحيح فقط حين تكون بديلًا معقولًا فعلًا. والثالث يُسقط <code>ABC</code> فلا يفحص شيئًا، كما أظهر السؤال 5. والرابع هو الصيغة القديمة قبل <code>ABC</code>: وهي تعمل، لكنها تفشل <em>عند الاستدعاء</em> لا عند الإنشاء، وذلك كل ما تحسّنه <code>ABC</code>." }
    },
    {
      id: "t4q10", type: "trace", level: "hard",
      topics: ["interface", "hide-shape", "computed"],
      q: { en: "The shop decides to bill a minimum of 10 minutes. Only <code>minutes_used</code> is edited. What do these now give for a 4-minute session?",
           ar: "يقرّر المحل محاسبة 10 دقائق كحدّ أدنى. وتُعدَّل <code>minutes_used</code> وحدها. فماذا تعطي هذه الآن لجلسة 4 دقائق؟" },
      code: "class ChargeSession:\n    rate_per_min = 0.5\n    minimum_minutes = 10\n\n    def __init__(self, customer, start_min, end_min=None):\n        self.customer = customer\n        self._start = start_min\n        self._end = end_min\n\n    @property\n    def minutes_used(self):\n        if self._end is None:\n            return 0\n        real = self._end - self._start\n        return max(real, self.minimum_minutes)\n\n    @property\n    def cost(self):\n        return self.minutes_used * self.rate_per_min\n\n\ns = ChargeSession(\"Rami\", 100, 104)",
      blanks: [
        { accept: ["10"], label: { en: "<code>s.minutes_used</code>", ar: "<code>s.minutes_used</code>" } },
        { accept: ["5.0", "5"], label: { en: "<code>s.cost</code>", ar: "<code>s.cost</code>" } }
      ],
      explain: { en: "4 real minutes become a billed 10, so the cost is 5.0. The point is what <em>did not</em> change: <code>cost</code> was not touched, and neither was any code outside the class, because everything asks <code>minutes_used</code> instead of subtracting <code>_end - _start</code> itself. If even one report had computed the difference directly, it would now disagree with the receipt &mdash; and that disagreement is the bug this design prevents.",
                 ar: "تصبح 4 دقائق حقيقية 10 محاسَبة، فتكون الكلفة 5.0. والمقصد ما <em>لم</em> يتغير: فلم تُمسّ <code>cost</code>، ولا أي كود خارج الصنف، لأن الجميع يسأل <code>minutes_used</code> بدل أن يطرح <code>_end - _start</code> بنفسه. ولو حسب تقريرٌ واحد الفرق مباشرة لاختلف الآن مع الإيصال &mdash; وذلك الاختلاف هو الخلل الذي يمنعه هذا التصميم." }
    },
    {
      id: "t4q11", type: "mcq", level: "hard",
      topics: ["abc", "interface", "early-failure"],
      q: { en: "You are writing tests for <code>charging_done(notifier, customer, address)</code> and need a notifier that records instead of sending. Which is the best reason this is easy?",
           ar: "تكتب اختبارات لـ <code>charging_done(notifier, customer, address)</code> وتحتاج مُشعِرًا يسجّل بدل أن يُرسل. فأي سبب هو الأفضل في تفسير سهولة ذلك؟" },
      options: [
        { en: "<code>charging_done</code> depends only on the promise <code>send(to, text)</code>, so a <code>FakeNotifier</code> that stores the calls satisfies it completely &mdash; the function cannot tell, and does not need to.",
          ar: "تتوقف <code>charging_done</code> على الوعد <code>send(to, text)</code> فقط، فـ <code>FakeNotifier</code> يخزّن الاستدعاءات يُرضيه تمامًا &mdash; فالدالة لا تستطيع التمييز، ولا تحتاج." },
        { en: "Because <code>FakeNotifier</code> inherits from <code>Notifier</code>, which is the only way the function will accept it.",
          ar: "لأن <code>FakeNotifier</code> يرث من <code>Notifier</code>، وهي الطريقة الوحيدة لتقبله الدالة." },
        { en: "Because Python checks the argument's type at run time and allows any subclass through.",
          ar: "لأن بايثون تفحص نوع الوسيط وقت التشغيل وتسمح بأي وريث." },
        { en: "Because abstract base classes make all their subclasses interchangeable in every function, regardless of what the function does with them.",
          ar: "لأن الأصناف الأساس المجرّدة تجعل كل وريثاتها قابلة للتبادل في كل دالة، أيًّا كان ما تفعله الدالة بها." }
      ],
      answer: 0,
      explain: { en: "Testability is the practical dividend of a small interface. The two answers about Python checking types are the common misconception worth correcting: Python does <strong>not</strong> check types on the way in, so <code>FakeNotifier</code> does not have to inherit from anything &mdash; it only has to have a <code>send</code> method. That is duck typing, and <a href=\"#l6-s4\">Lesson 6</a> names it. <code>ABC</code> helps you catch an <em>incomplete</em> subclass early; it is not a gate the argument must pass.",
                 ar: "قابلية الاختبار هي المردود العملي للواجهة الصغيرة. والخيارَان الثاني والثالث هما الوهم الشائع الذي يستحق التصحيح: فبايثون <strong>لا</strong> تفحص الأنواع عند الدخول، فلا يلزم <code>FakeNotifier</code> أن يرث من شيء &mdash; بل يلزمه أن يملك دالة <code>send</code> فقط. وذلك تصنيف البطة، ويسمّيه <a href=\"#l6-s4\">الدرس 6</a>. و<code>ABC</code> تساعدك على ضبط الوريث <em>الناقص</em> مبكرًا؛ وليست بوابة على الوسيط أن يعبرها." }
    },
    {
      id: "t4q12", type: "multi", level: "hard",
      topics: ["interface", "hide-shape", "abc"],
      q: { en: "Select <strong>every</strong> statement that is a fair criticism or a fair defence of abstraction as this lesson taught it.",
           ar: "اختر <strong>كل</strong> عبارة تمثّل نقدًا منصفًا أو دفاعًا منصفًا عن التجريد كما علّمه هذا الدرس." },
      options: [
        { en: "A property that hides an expensive computation misleads callers, who reasonably expect attribute access to be cheap.",
          ar: "الخاصية التي تخفي حسابًا مكلفًا تضلّل المستدعين، وهم يتوقعون بحقّ أن الوصول إلى خاصية رخيص." },
        { en: "An interface invented before any caller exists tends to publish the wrong questions, because the questions come from the call sites.",
          ar: "الواجهة المبتكرة قبل وجود أي مستدعٍ تنزع إلى نشر الأسئلة الخاطئة، لأن الأسئلة تأتي من مواضع الاستدعاء." },
        { en: "The real measure of an interface is not how clean it looks but which future change it makes cheap.",
          ar: "المعيار الحقيقي للواجهة ليس نظافة مظهرها بل أي تغيير مستقبلي تجعله رخيصًا." },
        { en: "An abstract base class with one subclass is usually premature; the promise is worth naming once two or three real implementations exist.",
          ar: "الصنف الأساس المجرّد بوريث واحد سابقٌ لوقته عادةً؛ والوعد يستحق التسمية حين يوجد تنفيذان أو ثلاثة حقيقية." },
        { en: "Because hiding internals is always better, a class should expose nothing but methods and never a plain attribute.",
          ar: "ولأن إخفاء الداخل أفضل دائمًا، فينبغي ألا يكشف الصنف إلا دوالًّ ولا يكشف خاصية عادية أبدًا." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first four are all fair, and the fourth and fifth together draw the line. Abstraction is a trade, not a virtue: you pay in indirection and buy a cheaper future change, so when there is no plausible change to buy, a plain public attribute is the better design &mdash; <code>self.name</code> on a courier needs no property. The fifth is the dogma this chapter keeps arguing against, and <a href=\"#l7-s2\">Lesson 7</a> spends a whole section on when the structured version is simply the better choice.",
                 ar: "الأربعة الأولى منصفة كلها، والرابعة والخامسة معًا ترسمان الحدّ. فالتجريد مقايضة لا فضيلة: تدفع وساطةً وتشتري تغييرًا مستقبليًا أرخص، فحين لا يوجد تغيير معقول تشتريه تكون الخاصية العامة العادية هي التصميم الأفضل &mdash; فـ <code>self.name</code> على مندوب لا تحتاج خاصية محسوبة. والخامسة هي العقيدة التي يخاصمها هذا الفصل دائمًا، ويصرف <a href=\"#l7-s2\">الدرس 7</a> قسمًا كاملًا في متى تكون النسخة الإجرائية هي الخيار الأفضل ببساطة." }
    }
  ]
};
