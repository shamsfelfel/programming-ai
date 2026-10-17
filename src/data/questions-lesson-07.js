/* ============================================================
   Lesson 7 — Capstone: Two Styles, One Program.
   The repair shop, priced with the lesson's own constants:
   DIAG_FEE 20, URGENT_RATE 0.25, BATTERY_FITTING 10,
   WATER_INSPECTION 35, CORROSION_FACTOR 1.5.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-07"] = {
  title: { en: "Test 7 — Capstone: Two Styles, One Program", ar: "اختبار 7 — المشروع الختامي: أسلوبان لبرنامج واحد" },
  intro: {
    en: "Twelve questions on the capstone. These are design questions as much as code questions, and the honest answer to several of them is \"it depends\" &mdash; so each one asks you to name the change, count the edits, and name the principle, exactly as the comparison table does.",
    ar: "اثنا عشر سؤالًا على المشروع الختامي. وهي أسئلة تصميم بقدر ما هي أسئلة كود، والجواب الصادق لعدد منها هو «حسب الحال» &mdash; فكلٌّ منها يطلب منك أن تسمّي التغيير، وتُحصي التعديلات، وتسمّي المبدأ، كما يفعل جدول المقارنة بالضبط."
  },
  questions: [
    {
      id: "t7q1", type: "tf", level: "easy",
      topics: ["capstone", "design-cost"],
      q: { en: "The structured version and the object-oriented version of the repair shop produce exactly the same output for the same scenario.",
           ar: "تُنتج النسخة الإجرائية والنسخة الكائنية من ورشة الصيانة المُخرَج نفسه بالضبط للسيناريو نفسه." },
      truth: true,
      explain: { en: "That is the whole point of writing it twice. Identical output means the comparison is about design alone and not about features: they cost the same to read and differ only in the price of the next change. Any argument about structure that cannot point to a specific future change is just taste.",
                 ar: "وذلك كل الغرض من كتابته مرتين. فتطابق المُخرَج يعني أن المقارنة عن التصميم وحده لا عن الميزات: فكلفتهما في القراءة سواء ولا يختلفان إلا في ثمن التغيير القادم. وأي حجة عن البنية لا تستطيع الإشارة إلى تغيير مستقبلي محدد ليست إلا ذوقًا." }
    },
    {
      id: "t7q2", type: "output", level: "easy",
      topics: ["capstone", "polymorphism"],
      q: { en: "Using the shop's constants &mdash; diagnosis 20, battery fitting 10, water inspection 35, corrosion factor 1.5 &mdash; write the four lines this prints.",
           ar: "باستخدام ثوابت المحل &mdash; التشخيص 20، وتركيب البطارية 10، وفحص الماء 35، ومعامل التآكل 1.5 &mdash; اكتب الأسطر الأربعة التي يطبعها." },
      code: "jobs = [\n    ScreenJob(180.0),\n    BatteryJob(70.0),\n    WaterJob(90.0),\n    WaterJob(90.0, corrosion=True),\n]\n\nfor j in jobs:\n    print(f\"{j.kind:9}{j.subtotal():8.2f}\")",
      blanks: [{ accept: ["screen     200.00\nbattery    100.00\nwater      145.00\nwater      190.00"],
                 lines: 4,
                 hint: { en: "Column widths are 9 and 8 from the f-string; getting the four numbers right is what counts.",
                         ar: "عرض الأعمدة 9 و8 من نص التنسيق؛ والمهم إصابة الأرقام الأربعة." } }],
      explain: { en: "20+180 = 200; 20+70+10 = 100; 20+35+90 = 145; and with corrosion the parts are multiplied first, so 20+35+(90&times;1.5) = 190. Note the loop: it never asks what kind of job it has, and <code>WaterJob</code> is the only one that needed its own <code>__init__</code> &mdash; an abstract base dictates what a subclass must <em>do</em>, not how it is built.",
                 ar: "20+180 = 200؛ و20+70+10 = 100؛ و20+35+90 = 145؛ ومع التآكل تُضرب القطع أولًا، فتكون 20+35+(90&times;1.5) = 190. ولاحظ الحلقة: فهي لا تسأل أبدًا أي نوع عمل لديها، و<code>WaterJob</code> هو الوحيد الذي احتاج <code>__init__</code> خاصًا به &mdash; فالأساس المجرّد يفرض ما يجب أن <em>يفعله</em> الوريث لا كيف يُبنى." }
    },
    {
      id: "t7q3", type: "trace", level: "medium",
      topics: ["capstone", "composition", "computed"],
      q: { en: "<code>quote</code> adds a 25% surcharge for an urgent ticket. What does each give?",
           ar: "تضيف <code>quote</code> رسمًا إضافيًا 25% للتذكرة المستعجلة. فماذا يعطي كلٌّ منها؟" },
      code: "class Ticket:\n    def __init__(self, tid, customer, job, priority, technician):\n        self.id = tid\n        self.customer = customer\n        self.job = job\n        self.priority = priority\n        self.technician = technician\n        self._status = \"received\"\n\n    @property\n    def quote(self):\n        total = self.job.subtotal()\n        if self.priority == \"urgent\":\n            total = total * 1.25\n        return total\n\n\na = Ticket(\"T-1\", \"Huda\", ScreenJob(180.0), \"urgent\", \"Samir\")\nb = Ticket(\"T-2\", \"Rami\", BatteryJob(70.0), \"normal\", \"Lina\")\nc = Ticket(\"T-3\", \"Nada\", WaterJob(90.0, corrosion=True), \"urgent\", \"Samir\")",
      blanks: [
        { accept: ["250.0", "250", "250.00"], label: { en: "<code>a.quote</code>", ar: "<code>a.quote</code>" } },
        { accept: ["100.0", "100", "100.00"], label: { en: "<code>b.quote</code>", ar: "<code>b.quote</code>" } },
        { accept: ["237.5", "237.50"], label: { en: "<code>c.quote</code>", ar: "<code>c.quote</code>" } }
      ],
      explain: { en: "200&times;1.25 = 250; 100 with no surcharge; 190&times;1.25 = 237.5. The division of labour is the thing to notice: the <em>job</em> knows what the repair costs and the <em>ticket</em> knows about urgency. Neither knows the other's rule, which is why a new job type never touches <code>quote</code> and a change to the surcharge never touches a job.",
                 ar: "200&times;1.25 = 250؛ و100 بلا رسم إضافي؛ و190&times;1.25 = 237.5. وتقسيم العمل هو ما يُلاحَظ: فالـ<em>عمل</em> يعرف كلفة الإصلاح والـ<em>تذكرة</em> تعرف الاستعجال. ولا يعرف أحدهما قاعدة الآخر، ولهذا لا يمسّ نوعُ عمل جديد <code>quote</code> أبدًا ولا يمسّ تغييرُ الرسم الإضافي عملًا أبدًا." }
    },
    {
      id: "t7q4", type: "fill", level: "medium",
      topics: ["composition", "capstone", "override"],
      q: { en: "<code>WarrantyRepair</code> wraps another job: free within 90 days, otherwise whatever that job charges. Complete the two blanks.",
           ar: "<code>WarrantyRepair</code> يلفّ عملًا آخر: مجانًا خلال 90 يومًا، وإلا فبما يتقاضاه ذلك العمل. أكمل الفراغين." },
      code: "class WarrantyRepair(Job):\n    kind = \"warranty\"\n\n    def __init__(self, original_job, days_since):\n        super().__init__(0.0)\n        self.original_job = original_job\n        self.days_since = days_since\n\n    @property\n    def in_warranty(self):\n        return ____1____\n\n    def subtotal(self):\n        if self.in_warranty:\n            return 0.0\n        return ____2____",
      blanks: [
        { accept: ["self.days_since <= 90"], wide: true, label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["self.original_job.subtotal()"], wide: true, label: { en: "blank 2", ar: "الفراغ 2" } }
      ],
      explain: { en: "This one class uses three ideas from three different lessons at once. It <em>inherits</em> from <code>Job</code>, so it can sit in the same list as any other job; it <em>holds</em> another <code>Job</code> by composition, so it can wrap a screen repair or a battery repair without knowing which; and <code>in_warranty</code> is a <em>computed property</em>, so it cannot go stale as the days pass. You wrote a decorator without being told the name.",
                 ar: "هذا الصنف الواحد يستعمل ثلاث أفكار من ثلاثة دروس مختلفة في الوقت نفسه. فهو <em>يرث</em> من <code>Job</code>، فيستطيع الجلوس في القائمة نفسها مع أي عمل آخر؛ و<em>يمسك</em> بـ <code>Job</code> آخر بالتركيب، فيستطيع لفّ إصلاح شاشة أو بطارية دون أن يعرف أيّهما؛ و<code>in_warranty</code> <em>خاصية محسوبة</em>، فلا تتقادم مع مرور الأيام. فقد كتبت مزخرِفًا دون أن يُقال لك الاسم." }
    },
    {
      id: "t7q5", type: "output", level: "medium",
      topics: ["composition", "capstone"],
      q: { en: "Write the four lines this prints. Remember a screen job is 20+parts and a battery job is 20+parts+10.",
           ar: "اكتب الأسطر الأربعة التي يطبعها. وتذكّر أن عمل الشاشة 20+القطع وعمل البطارية 20+القطع+10." },
      code: "jobs = [\n    ScreenJob(180.0),\n    BatteryJob(70.0),\n    WarrantyRepair(ScreenJob(180.0), days_since=12),\n    WarrantyRepair(BatteryJob(70.0), days_since=200),\n]\n\nfor j in jobs:\n    print(f\"{j.kind:9}{j.subtotal():8.2f}\")",
      blanks: [{ accept: ["screen     200.00\nbattery    100.00\nwarranty     0.00\nwarranty   100.00"], lines: 4 }],
      explain: { en: "The third job is 12 days old, so it is free. The fourth is 200 days old, outside the window, so the wrapper stops being charitable and simply forwards the question to the battery job it holds &mdash; 100.00. Both wrappers print <code>warranty</code> as their kind, because <code>kind</code> is the wrapper's own class attribute; only the <em>price</em> is delegated.",
                 ar: "العمل الثالث عمره 12 يومًا، فهو مجاني. والرابع عمره 200 يوم، خارج النافذة، فيكفّ اللافّ عن الكرم ويحوّل السؤال ببساطة إلى عمل البطارية الذي يمسك به &mdash; 100.00. ويطبع كلا اللافّين <code>warranty</code> نوعًا لهما، لأن <code>kind</code> خاصية صنف اللافّ نفسه؛ والـ<em>سعر</em> وحده هو المفوَّض." }
    },
    {
      id: "t7q6", type: "match", level: "medium",
      topics: ["capstone", "design-cost"],
      q: { en: "Match each piece of the structured file to the thing that replaced it in the object-oriented file.",
           ar: "وصّل كل جزء من الملف الإجرائي بما حلّ محلّه في الملف الكائني." },
      leftHead: { en: "Structured version", ar: "النسخة الإجرائية" },
      rightHead: { en: "OOP version", ar: "النسخة الكائنية" },
      pairs: [
        { l: { code: "make_ticket(...) -> dict" },
          r: { code: "Ticket.__init__  (no missing key is possible)" } },
        { l: { code: "job_subtotal(t) with if/elif on kind" },
          r: { code: "ScreenJob / BatteryJob / WaterJob .subtotal()" } },
        { l: { code: "step(t, new) printing its refusal" },
          r: { code: "Ticket.advance(new) raising ValueError" } },
        { l: { code: "print_intake's f-string per ticket" },
          r: { code: "Ticket.__str__, called by print(f\"  {t}\")" } }
      ],
      explain: { en: "Each row moves a decision from the caller into the thing it is about. The third is the subtlest: <code>step</code> both decided <em>and</em> printed, mixing policy with presentation, while <code>advance</code> only decides and raises &mdash; so the shop chooses how to report it, and a test can assert the refusal instead of capturing stdout.",
                 ar: "كل صفّ ينقل قرارًا من المستدعي إلى الشيء الذي يتعلق به. والثالث أدقّها: فـ <code>step</code> كانت تقرّر <em>وتطبع</em>، فتخلط السياسة بالعرض، أما <code>advance</code> فتقرّر وترفع خطأً فقط &mdash; فيختار المحل كيف يُبلّغ، ويستطيع اختبارٌ أن يؤكّد الرفض بدل اعتراض المُخرَج القياسي." }
    },
    {
      id: "t7q7", type: "compare", level: "medium",
      topics: ["one-door", "capstone", "invariant"],
      q: { en: "Both guard the status flow. Which statement about the pair is true?",
           ar: "كلتاهما تحمي تدفّق الحالات. أي عبارة عن الزوج صحيحة؟" },
      codeA: "STATUS_FLOW = [\"received\", \"in progress\", \"ready\", \"collected\"]\n\n\ndef step(ticket, new_status):\n    old = ticket[\"status\"]\n    if new_status != next_status(old):\n        print(f\"  rejected: {old} -> {new_status}\")\n        return False\n    ticket[\"status\"] = new_status\n    return True\n\n\nt = make_ticket(\"T-1\", ...)\nstep(t, \"in progress\")\nt[\"status\"] = \"collected\"\nprint(t[\"status\"])",
      codeB: "class Ticket:\n    @property\n    def status(self):\n        return self._status\n\n    def advance(self, new_status):\n        i = STATUS_FLOW.index(self._status)\n        allowed = (STATUS_FLOW[i + 1]\n                   if i + 1 < len(STATUS_FLOW) else None)\n        if new_status != allowed:\n            raise ValueError(f\"cannot go from {self._status}\"\n                             f\" to {new_status}\")\n        self._status = new_status\n\n\nt = Ticket(\"T-1\", ...)\nt.advance(\"in progress\")\nt.status = \"collected\"\nprint(t.status)",
      options: [
        { en: "A prints <code>collected</code>: the dictionary key is writable, so the guard is only in force when somebody chooses to call <code>step</code>. B raises <code>AttributeError</code> on <code>t.status = \"collected\"</code>, because <code>status</code> is a read-only property with no setter.",
          ar: "تطبع أ <code>collected</code>: فمفتاح القاموس قابل للكتابة، فالحماية سارية فقط عندما يختار أحد استدعاء <code>step</code>. وترفع ب <code>AttributeError</code> عند <code>t.status = \"collected\"</code>، لأن <code>status</code> خاصية للقراءة فقط بلا ضابط." },
        { en: "Both refuse the jump and print the same rejection message.",
          ar: "ترفض كلتاهما القفزة وتطبعان رسالة الرفض نفسها." },
        { en: "A refuses it because <code>step</code> is the only way to write the key.",
          ar: "ترفضها أ لأن <code>step</code> هي السبيل الوحيد لكتابة المفتاح." },
        { en: "B prints <code>collected</code> too, since assigning to a property calls <code>advance</code> behind the scenes.",
          ar: "تطبع ب <code>collected</code> أيضًا، لأن الإسناد إلى خاصية يستدعي <code>advance</code> من وراء الكواليس." }
      ],
      answer: 0,
      explain: { en: "A ticket skips two states with no complaint in A, because a dictionary has no way to refuse a key assignment &mdash; the guard is advice. In B the public name <code>status</code> is a getter only, so there is no assignment path at all and the one door is <code>advance</code>. This is <a href=\"#l3-h2\">Lesson 3</a> doing real work in a real program: an unpaid phone cannot be marked collected by a typo.",
                 ar: "تتخطّى التذكرة حالتين بلا اعتراض في أ، لأن القاموس لا يملك سبيلًا لرفض إسناد مفتاح &mdash; فالحماية نصيحة. وفي ب الاسمُ العام <code>status</code> قارئٌ فقط، فلا يوجد مسار إسناد إطلاقًا والباب الواحد هو <code>advance</code>. وهذا <a href=\"#l3-h2\">الدرس 3</a> يؤدي عملًا حقيقيًا في برنامج حقيقي: فلا يمكن وسمُ هاتف غير مدفوع بأنه مستلَم بخطأ مطبعي." }
    },
    {
      id: "t7q8", type: "order", level: "medium",
      topics: ["design-cost", "capstone"],
      q: { en: "The lesson's method for arguing about design, in order. Apply it to any change request.",
           ar: "منهج الدرس في الخصومة حول التصميم، بالترتيب. طبّقه على أي طلب تغيير." },
      items: [
        { en: "Name the specific change the shop is actually asking for.", ar: "سمِّ التغيير المحدد الذي يطلبه المحل فعلًا." },
        { en: "Count the edits it needs in each version, and where they are.", ar: "أحصِ التعديلات التي يحتاجها في كل نسخة، وأين هي." },
        { en: "Name the principle that explains the difference.", ar: "سمِّ المبدأ الذي يفسّر الفرق." },
        { en: "Decide &mdash; and accept that for some changes the structured file wins.", ar: "اقرّر &mdash; واقبل أن الملف الإجرائي يفوز في بعض التغييرات." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The order stops the argument becoming a matter of taste. Without step 1 there is nothing to count; without step 2 the principle is decoration; and without step 4 you are no longer comparing, you are defending a preference. Note that this method is also how you answer \"should this be a class?\" for code you are about to write &mdash; if you cannot name the change it makes cheap, write the function.",
                 ar: "الترتيب يمنع الخصومة من أن تصبح مسألة ذوق. فبلا الخطوة 1 لا شيء تُحصيه؛ وبلا الخطوة 2 يصبح المبدأ زخرفًا؛ وبلا الخطوة 4 لم تبقَ تقارن، بل تدافع عن تفضيل. ولاحظ أن هذا المنهج هو أيضًا كيف تجيب «هل ينبغي أن يكون هذا صنفًا؟» لكود أنت على وشك كتابته &mdash; فإن لم تستطع تسمية التغيير الذي يجعله رخيصًا فاكتب الدالة." }
    },
    {
      id: "t7q9", type: "mcq", level: "hard",
      topics: ["design-cost", "when-not-oop"],
      q: { en: "The shop adds a status <code>\"waiting for part\"</code>, and from it a ticket may go <em>back</em> to <code>\"in progress\"</code>. So one status now has two legal exits. Which is the fair verdict?",
           ar: "يضيف المحل حالة <code>\"waiting for part\"</code>، ومنها يمكن للتذكرة أن تعود <em>إلى</em> <code>\"in progress\"</code>. فصار لحالة واحدة مخرجان قانونيان. فما الحكم المنصف؟" },
      options: [
        { en: "Neither version wins much. Both need the one-successor list replaced by a map of status to allowed successors, and both rewrite one guard against it &mdash; the OOP version's only edge is that the guard has one caller instead of being advice.",
          ar: "لا تفوز أي نسخة كثيرًا. فكلتاهما تحتاج استبدال قائمة الخلَف الواحد بخريطة من حالة إلى الخلَف المسموح، وكلتاهما تعيد كتابة حماية واحدة في مقابلها &mdash; وميزة النسخة الكائنية الوحيدة أن للحماية مستدعيًا واحدًا بدل أن تكون نصيحة." },
        { en: "The OOP version wins decisively, because polymorphism removes the need for a status map entirely.",
          ar: "تفوز النسخة الكائنية فوزًا حاسمًا، لأن تعدد الأشكال يُلغي الحاجة إلى خريطة حالات تمامًا." },
        { en: "The structured version wins, because a dictionary of allowed moves is a data structure and classes cannot hold one.",
          ar: "تفوز النسخة الإجرائية، لأن قاموس الحركات المسموحة بنية بيانات والأصناف لا تستطيع حمله." },
        { en: "The OOP version wins, because a new status should be a new subclass of <code>Ticket</code>.",
          ar: "تفوز النسخة الكائنية، لأن الحالة الجديدة ينبغي أن تكون وريثًا جديدًا من <code>Ticket</code>." }
      ],
      answer: 0,
      explain: { en: "This is the change the lesson picks deliberately to show that classes are not always the answer. The defect is in the <em>data structure</em> &mdash; a list expresses \"one successor\" and the shop now needs \"a set of successors\" &mdash; and swapping a list for a dict costs the same in both files. The last option is the one to reject hardest: a status is a <em>value</em> a ticket has, not a kind of ticket, so <code>CollectedTicket(Ticket)</code> would mean an object has to change class to move through the shop. Inherit for <em>is a</em>, and a ticket is not its status.",
                 ar: "هذا هو التغيير الذي ينتقيه الدرس متعمدًا ليُظهر أن الأصناف ليست الجواب دائمًا. فالعيب في <em>بنية البيانات</em> &mdash; فالقائمة تعبّر عن «خلَف واحد» والمحل يحتاج الآن «مجموعة خلَف» &mdash; ومبادلة قائمة بقاموس تكلّف الشيء نفسه في الملفين. والخيار الأخير هو الأحقّ بالرفض: فالحالة <em>قيمة</em> تملكها التذكرة لا نوع من التذاكر، فـ <code>CollectedTicket(Ticket)</code> تعني أن على الكائن أن يغيّر صنفه ليتحرك في المحل. وَرِّث لـ«هو نوع من»، والتذكرة ليست حالتها." }
    },
    {
      id: "t7q10", type: "error", level: "hard",
      topics: ["one-door", "underscore", "capstone"],
      q: { en: "The status guard is in place, yet this ticket reaches <code>collected</code> from <code>in progress</code> and is counted as income. Click the line that defeats the guard.",
           ar: "الحماية على الحالات قائمة، ومع ذلك تبلغ هذه التذكرة <code>collected</code> من <code>in progress</code> وتُحسب إيرادًا. انقر السطر الذي يهزم الحماية." },
      code: "t = Ticket(\"T-1\", \"Huda\", ScreenJob(180.0), \"urgent\", \"Samir\")\nt.advance(\"in progress\")\n\ntry:\n    t.advance(\"collected\")\nexcept ValueError as err:\n    print(f\"rejected: {err}\")\n\nt._status = \"collected\"\n\nprint(t.status)\nprint(sum(x.quote for x in [t] if x.status == \"collected\"))",
      answer: 9,
      explain: { en: "Line 9 writes the private attribute directly, and Python allows it &mdash; the underscore is a convention, not a lock. <code>advance</code> correctly refused the same move three lines earlier, and then the back door made the refusal pointless: the ticket reports <code>collected</code> and 250.00 is counted as money taken for a phone still on the bench. This is the honest limit of encapsulation in Python, and it is not a reason to skip the property. The guard stops mistakes, not determination: nobody writes line 9 <em>by accident</em>, whereas <code>ticket[\"status\"] = \"collected\"</code> in the structured version is exactly the kind of line a tired person writes on purpose, believing it is fine.",
                 ar: "السطر 9 يكتب الخاصية الخاصة مباشرة، وبايثون تتيح ذلك &mdash; فالشرطة السفلية اتفاقٌ لا قُفل. وقد رفضت <code>advance</code> الحركة نفسها بحقٍّ قبل ثلاثة أسطر، ثم جعل البابُ الخلفي الرفضَ بلا معنى: فتُبلّغ التذكرة <code>collected</code> وتُحسب 250.00 مالًا مقبوضًا على هاتف لا يزال على المقعد. وهذا هو الحدّ الصادق للتغليف في بايثون، وليس سببًا لتخطّي الخاصية. فالحماية تمنع الأخطاء لا العزم: فلا أحد يكتب السطر 9 <em>عن غير قصد</em>، بينما <code>ticket[\"status\"] = \"collected\"</code> في النسخة الإجرائية هي بالضبط نوع السطر الذي يكتبه متعبٌ متعمدًا وهو يحسبه سليمًا." }
    },
    {
      id: "t7q11", type: "multi", level: "hard",
      topics: ["when-not-oop", "design-cost"],
      q: { en: "Select <strong>every</strong> case where the lesson says the structured version is the better choice.",
           ar: "اختر <strong>كل</strong> حالة يقول الدرس فيها إن النسخة الإجرائية هي الخيار الأفضل." },
      options: [
        { en: "A script that will be run once, to answer one question, and then deleted.",
          ar: "سكربت سيُشغَّل مرة واحدة ليجيب سؤالًا واحدًا، ثم يُحذف." },
        { en: "A small pure transform: data in, data out, no state kept between calls.",
          ar: "تحويل خالص صغير: بيانات تدخل وبيانات تخرج، ولا حالة محفوظة بين الاستدعاءات." },
        { en: "A single-pass report over rows that are read, summed and printed.",
          ar: "تقرير بمرور واحد على صفوف تُقرأ وتُجمع وتُطبع." },
        { en: "A program where the set of cases is fixed and the set of operations keeps growing.",
          ar: "برنامج فيه مجموعة الحالات ثابتة ومجموعة العمليات تنمو باستمرار." },
        { en: "A program that must enforce a rule about one value no matter which of twenty places writes it.",
          ar: "برنامج يجب أن يفرض قاعدة على قيمة واحدة أيًّا كان أي من عشرين موضعًا يكتبها." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first three are the lesson's own list, and the fourth follows from the rule that classes are <strong>open to new types and closed to new operations</strong> &mdash; when the types are fixed and the operations multiply, functions over plain data are the cheaper shape, and saying so out loud is a sign of judgement rather than weakness. The fifth is the opposite case: twenty writers and one invariant is precisely the problem a property with a setter solves, and no amount of discipline spread over twenty call sites will match it.",
                 ar: "الثلاثة الأولى هي قائمة الدرس نفسه، والرابعة تتبع القاعدة أن الأصناف <strong>مفتوحة للأنواع الجديدة مغلقة للعمليات الجديدة</strong> &mdash; فحين تثبت الأنواع وتتكاثر العمليات تكون الدوال على بيانات عادية الشكلَ الأرخص، وقولُ ذلك بصوت مسموع علامةُ تمييز لا ضعف. والخامسة هي الحالة المقابلة: فعشرون كاتبًا وشرطٌ ثابت واحد هو بالضبط المشكلة التي تحلّها خاصية بضابط، ولن يعدلها أي قدر من الانتظام موزّعًا على عشرين موضع استدعاء." }
    },
    {
      id: "t7q12", type: "mcq", level: "hard",
      topics: ["design-cost", "capstone", "when-not-oop"],
      q: { en: "The lesson ends with one question to ask of every class you ever write. Which is it?",
           ar: "ينتهي الدرس بسؤال واحد تسأله عن كل صنف تكتبه أبدًا. فما هو؟" },
      options: [
        { en: "<em>What change does this make cheap?</em> &mdash; and if you cannot answer, write the function instead.",
          ar: "<em>أي تغيير يجعله هذا رخيصًا؟</em> &mdash; وإن لم تستطع الجواب فاكتب الدالة بدلًا منه." },
        { en: "<em>Does this model the real world accurately?</em> &mdash; because a class should mirror a real thing.",
          ar: "<em>هل يحاكي هذا العالم الحقيقي بدقة؟</em> &mdash; لأن الصنف ينبغي أن يرآى شيئًا حقيقيًا." },
        { en: "<em>Have I used all four principles?</em> &mdash; encapsulation, abstraction, inheritance and polymorphism.",
          ar: "<em>هل استعملت المبادئ الأربعة كلها؟</em> &mdash; التغليف والتجريد والوراثة وتعدد الأشكال." },
        { en: "<em>Is this fewer lines than the procedural version?</em> &mdash; since less code is better code.",
          ar: "<em>هل هذا أقل أسطرًا من النسخة الإجرائية؟</em> &mdash; إذ الكود الأقل كودٌ أفضل." }
      ],
      answer: 0,
      explain: { en: "Every wrong option here is a real belief that leads people astray. \"Model the real world\" sounds wise and produces <code>Invoice</code> classes with forty attributes and no behaviour, because reality is not a design brief. \"Use all four principles\" turns a toolbox into a checklist &mdash; and <code>WarrantyRepair</code> happened to use three at once not because it was told to but because the problem needed them. And line count is the one measure the chapter explicitly rejects: three small classes are usually <em>more</em> lines than one <code>if/elif</code> chain, and the saving is in the next change.",
                 ar: "كل خيار خاطئ هنا اعتقادٌ حقيقي يضلّ الناس. فـ«حاكِ العالم الحقيقي» تبدو حكيمة وتُنتج أصناف <code>Invoice</code> بأربعين خاصية وبلا سلوك، لأن الواقع ليس كرّاسة تصميم. و«استعمل المبادئ الأربعة» تحوّل صندوق أدوات إلى قائمة تحقّق &mdash; و<code>WarrantyRepair</code> استعمل ثلاثة معًا اتفاقًا لا لأنه أُمر بل لأن المشكلة احتاجتها. وعددُ الأسطر هو المعيار الوحيد الذي يرفضه الفصل صريحًا: فثلاثة أصناف صغيرة أسطرها <em>أكثر</em> من سلسلة <code>if/elif</code> واحدة عادةً، والوفر في التغيير القادم." }
    }
  ]
};
