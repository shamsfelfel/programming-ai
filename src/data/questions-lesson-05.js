/* ============================================================
   Lesson 5 — Inheritance & Composition.
   Domains: the courier company, the library shelf, the delivery
   routes, the shift log, school staff and the timetable.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-05"] = {
  title: { en: "Test 5 — Inheritance &amp; Composition", ar: "اختبار 5 — الوراثة والتركيب" },
  intro: {
    en: "Twelve questions on Lesson 5. Half of them are about what inheritance gives you, and half about the moment it turns against you. The decision rule to carry into every answer: inherit for <em>is a</em>, compose for <em>has a</em>.",
    ar: "اثنا عشر سؤالًا على الدرس 5. نصفها عمّا تمنحك الوراثة، ونصفها عن اللحظة التي تنقلب عليك فيها. وقاعدة القرار التي تحملها إلى كل جواب: وَرِّث لـ«هو نوع من»، وركِّب لـ«له»."
  },
  questions: [
    {
      id: "t5q1", type: "tf", level: "easy",
      topics: ["super", "inheritance"],
      q: { en: "<code>super().__init__(name, phone)</code> creates a second object of the base class, which the subclass then keeps a reference to.",
           ar: "<code>super().__init__(name, phone)</code> تنشئ كائنًا ثانيًا من الصنف الأساس، ثم يحتفظ الوريث بمرجع إليه." },
      truth: false,
      explain: { en: "There is only ever one object. <code>super().__init__(...)</code> runs the base class's <code>__init__</code> <em>on the same <code>self</code></em>, filling in the fields the subclass did not mention. A <code>TruckCourier</code> is not a courier plus a courier object; it is one object that two <code>__init__</code> methods took turns building. Step through <a href=\"#lab\">trace 6</a> to see <code>self</code> stay the same across both.",
                 ar: "لا يوجد إلا كائن واحد أبدًا. فـ <code>super().__init__(...)</code> تنفّذ <code>__init__</code> الصنف الأساس <em>على <code>self</code> نفسه</em>، فتعبّئ الحقول التي لم يذكرها الوريث. فـ <code>TruckCourier</code> ليس مندوبًا زائدَ كائن مندوب؛ بل كائن واحد تناوبت على بنائه دالتا <code>__init__</code>. تنقّل في <a href=\"#lab\">التتبّع 6</a> لترى <code>self</code> يبقى نفسه في كلتيهما." }
    },
    {
      id: "t5q2", type: "output", level: "easy",
      topics: ["inheritance", "override", "attr-lookup"],
      q: { en: "Write the two lines this prints.", ar: "اكتب السطرين الذين يطبعهما." },
      code: "class Courier:\n    fee_per_km = 1.5\n\n    def __init__(self, name):\n        self.name = name\n\n    def fee(self, km):\n        return km * self.fee_per_km\n\n\nclass TruckCourier(Courier):\n    fee_per_km = 3.0\n\n\nclass BicycleCourier(Courier):\n    pass\n\n\nt = TruckCourier(\"Samir\")\nb = BicycleCourier(\"Lina\")\nprint(t.fee(10), b.fee(10))\nprint(t.name, b.name)",
      blanks: [{ accept: ["30.0 15.0\nSamir Lina"], lines: 2 }],
      explain: { en: "<code>fee</code> is written once in <code>Courier</code> and inherited by both. It reads <code>self.fee_per_km</code>, so the lookup starts on the object, then its class: for <code>t</code> that finds 3.0 on <code>TruckCourier</code>, and for <code>b</code> there is nothing on <code>BicycleCourier</code> so it keeps walking up and finds 1.5 on <code>Courier</code>. The method comes from wherever Python finds it; the data always comes from <code>self</code>.",
                 ar: "<code>fee</code> مكتوبة مرة واحدة في <code>Courier</code> ويرثها كلاهما. وتقرأ <code>self.fee_per_km</code>، فيبدأ البحث على الكائن ثم صنفه: فلـ <code>t</code> يجد 3.0 على <code>TruckCourier</code>، ولـ <code>b</code> لا شيء على <code>BicycleCourier</code> فيواصل الصعود ويجد 1.5 على <code>Courier</code>. فالدالة تأتي من حيث تجدها بايثون؛ والبيانات تأتي دائمًا من <code>self</code>." }
    },
    {
      id: "t5q3", type: "error", level: "easy",
      topics: ["super", "invalid-birth"],
      q: { en: "<code>t.plate</code> reads back fine but <code>t.name</code> raises <code>AttributeError: 'TruckCourier' object has no attribute 'name'</code>. Click the line that must be added or fixed.",
           ar: "<code>t.plate</code> تُقرأ بلا مشكلة لكن <code>t.name</code> ترفع <code>AttributeError: 'TruckCourier' object has no attribute 'name'</code>. انقر السطر الذي يجب إضافته أو إصلاحه." },
      code: "class Courier:\n    fee_per_km = 1.5\n\n    def __init__(self, name, phone):\n        self.name = name\n        self.phone = phone\n        self.deliveries_today = 0\n\n\nclass TruckCourier(Courier):\n    fee_per_km = 3.0\n\n    def __init__(self, name, phone, plate):\n        self.plate = plate\n\n\nt = TruckCourier(\"Samir\", \"0599\", \"A-1234\")\nprint(t.plate)\nprint(t.name)",
      answer: 14,
      explain: { en: "Defining <code>__init__</code> in the subclass <em>replaces</em> the base one rather than adding to it, so lines 5&ndash;7 never run and three attributes are simply absent. Line 14 needs <code>super().__init__(name, phone)</code> before it. What makes this bug nasty is how healthy the object looks: creation succeeded, <code>t.plate</code> works, and <code>fee_per_km</code> is <em>not</em> missing either &mdash; class attributes are inherited through the class, not assigned in <code>__init__</code>, so they survive the mistake and hide the wreckage. The traceback names only whichever attribute happened to be read first.",
                 ar: "تعريف <code>__init__</code> في الوريث <em>يحلّ محلّ</em> الأساس لا يضيف إليه، فلا تُنفَّذ الأسطر 5&ndash;7 أبدًا وتغيب ثلاث خصائص ببساطة. ويحتاج السطر 14 إلى <code>super().__init__(name, phone)</code> قبله. وما يجعل هذا الخلل خبيثًا هو صحة مظهر الكائن: فقد نجح الإنشاء، وتعمل <code>t.plate</code>، و<code>fee_per_km</code> <em>ليست</em> مفقودة أيضًا &mdash; فخصائص الصنف تُورَث عبر الصنف لا تُسنَد في <code>__init__</code>، فتنجو من الخطأ وتخفي الحطام. والتتبّع يسمّي فقط الخاصية التي قُرئت أولًا اتفاقًا." },
      solution: { code: "    def __init__(self, name, phone, plate):\n        super().__init__(name, phone)\n        self.plate = plate" }
    },
    {
      id: "t5q4", type: "mcq", level: "easy",
      topics: ["is-a-has-a", "composition"],
      q: { en: "A <code>Ticket</code> in a repair shop records a customer, a status, and the repair being done. Should <code>Ticket</code> inherit from <code>Job</code>?",
           ar: "تسجّل <code>Ticket</code> في ورشة صيانة عميلًا وحالةً والإصلاحَ الجاري. فهل ينبغي أن ترث <code>Ticket</code> من <code>Job</code>؟" },
      options: [
        { en: "No. A ticket is not a kind of repair, it <em>has</em> one &mdash; so it should hold a <code>Job</code> in an attribute and ask it questions.",
          ar: "لا. فالتذكرة ليست نوعًا من الإصلاح، بل <em>لها</em> إصلاح &mdash; فينبغي أن تمسك بـ <code>Job</code> في خاصية وتسأله." },
        { en: "Yes, because a ticket needs the job's <code>subtotal()</code> and inheritance is how you get access to another class's methods.",
          ar: "نعم، لأن التذكرة تحتاج <code>subtotal()</code> العمل، والوراثة هي كيف تحصل على دوال صنف آخر." },
        { en: "Yes, because both are part of the same program and sharing a base class keeps them consistent.",
          ar: "نعم، لأن كليهما جزء من البرنامج نفسه، والمشاركة في صنف أساس تحفظ تناسقهما." },
        { en: "It makes no practical difference; inheritance and composition give the same result with different syntax.",
          ar: "لا فرق عملي؛ فالوراثة والتركيب يعطيان النتيجة نفسها بصيغتين مختلفتين." }
      ],
      answer: 0,
      explain: { en: "Read the sentence out loud: \"a ticket is a repair\" is false, \"a ticket has a repair\" is true. The second option is the most common wrong reason to inherit &mdash; wanting access to a method is not a reason to claim kinship, and it costs you dearly: a <code>Ticket</code> that inherits from <code>Job</code> also inherits <code>parts</code> and <code>labour</code>, which a ticket has no business owning, and it can then be passed to any function expecting a job. Composition gives the same access through <code>self.job.subtotal()</code> and lets the job be swapped at run time.",
                 ar: "اقرأ الجملة بصوت مسموع: «التذكرة إصلاح» خاطئة، و«للتذكرة إصلاح» صحيحة. والخيار الثاني هو أشيع سبب خاطئ للوراثة &mdash; فالرغبة في الوصول إلى دالة ليست سببًا لادّعاء النسب، وهي تكلّفك غاليًا: فـ <code>Ticket</code> يرث من <code>Job</code> يرث أيضًا <code>parts</code> و<code>labour</code> وليس للتذكرة شأن بملكهما، ثم يمكن تمريره إلى أي دالة تتوقع عملًا. والتركيب يمنح الوصول نفسه عبر <code>self.job.subtotal()</code> ويتيح استبدال العمل وقت التشغيل." }
    },
    {
      id: "t5q5", type: "trace", level: "medium",
      topics: ["super", "override", "attr-lookup"],
      q: { en: "Trace the construction and the call. What does each give?",
           ar: "تتبّع البناء والاستدعاء. فماذا يعطي كلٌّ منهما؟" },
      code: "class Courier:\n    fee_per_km = 1.5\n\n    def __init__(self, name, phone):\n        self.name = name\n        self.phone = phone\n        self.deliveries_today = 0\n\n    def record_delivery(self, km):\n        self.deliveries_today += 1\n        return km * self.fee_per_km\n\n\nclass TruckCourier(Courier):\n    fee_per_km = 3.0\n\n    def __init__(self, name, phone, plate):\n        super().__init__(name, phone)\n        self.plate = plate\n\n\nt = TruckCourier(\"Samir\", \"0599\", \"A-1234\")\nearned = t.record_delivery(10)",
      blanks: [
        { accept: ["30.0", "30"], label: { en: "<code>earned</code>", ar: "<code>earned</code>" } },
        { accept: ["1"], label: { en: "<code>t.deliveries_today</code>", ar: "<code>t.deliveries_today</code>" } },
        { accept: ["3.0", "3"], label: { en: "<code>t.fee_per_km</code>", ar: "<code>t.fee_per_km</code>" } }
      ],
      explain: { en: "<code>record_delivery</code> is defined in <code>Courier</code>, where <code>fee_per_km</code> is 1.5 &mdash; and it still multiplies by 3.0, because the line reads <code>self.fee_per_km</code> and <code>self</code> is a truck. This is the single most useful fact about inheritance: <strong>inherited code reads the subclass's data</strong>. If you expected 15.0, re-read <a href=\"#l5-h1\">Concept 1</a> and then watch it in <a href=\"#lab\">trace 6</a>. Also note <code>deliveries_today</code> exists at all only because <code>super().__init__</code> was called.",
                 ar: "<code>record_delivery</code> معرَّفة في <code>Courier</code> حيث <code>fee_per_km</code> تساوي 1.5 &mdash; ومع ذلك تضرب في 3.0، لأن السطر يقرأ <code>self.fee_per_km</code> و<code>self</code> شاحنة. وهذه أنفع حقيقة واحدة عن الوراثة: <strong>الكود الموروث يقرأ بيانات الوريث</strong>. وإن توقعت 15.0 فأعد قراءة <a href=\"#l5-h1\">المفهوم 1</a> ثم شاهده في <a href=\"#lab\">التتبّع 6</a>. ولاحظ أيضًا أن <code>deliveries_today</code> موجودة أصلًا فقط لأن <code>super().__init__</code> استُدعيت." }
    },
    {
      id: "t5q6", type: "match", level: "medium",
      topics: ["is-a-has-a", "composition", "inheritance"],
      q: { en: "Match each pair of classes to the relationship that actually fits.",
           ar: "وصّل كل زوج من الأصناف بالعلاقة التي تناسبه فعلًا." },
      leftHead: { en: "The pair", ar: "الزوج" },
      rightHead: { en: "The right relationship", ar: "العلاقة الصحيحة" },
      pairs: [
        { l: { en: "<code>TruckCourier</code> and <code>Courier</code>", ar: "<code>TruckCourier</code> و<code>Courier</code>" },
          r: { en: "Inheritance: a truck courier <em>is a</em> courier, and can stand in anywhere a courier is expected.", ar: "وراثة: فمندوب الشاحنة <em>هو</em> مندوب، ويستطيع أن يحلّ محلّه في أي موضع يُتوقع فيه مندوب." } },
        { l: { en: "<code>Courier</code> and <code>Battery</code>", ar: "<code>Courier</code> و<code>Battery</code>" },
          r: { en: "Composition: the courier <em>has a</em> power source, and which one can change while the program runs.", ar: "تركيب: فللمندوب <em>مصدر</em> طاقة، ويمكن أن يتغير أيُّه أثناء تشغيل البرنامج." } },
        { l: { en: "<code>ReferenceBook</code> and <code>Book</code>", ar: "<code>ReferenceBook</code> و<code>Book</code>" },
          r: { en: "Inheritance that needs care: it is a book, but it cannot be borrowed, so the base's promise is narrower than it looks.", ar: "وراثة تحتاج حذرًا: فهو كتاب، لكنه لا يُستعار، فوعد الأساس أضيق مما يبدو." } },
        { l: { en: "<code>Teacher</code> and <code>Timetable</code>", ar: "<code>Teacher</code> و<code>Timetable</code>" },
          r: { en: "Composition: a teacher <em>holds</em> a timetable; a teacher is obviously not a kind of timetable.", ar: "تركيب: فالمعلّم <em>يمسك</em> بجدول؛ والمعلّم ليس نوعًا من الجدول بداهةً." } }
      ],
      explain: { en: "The third pair is the lesson's warning in miniature. <code>ReferenceBook</code> passes the \"is a\" test in English and still breaks the hierarchy, because <code>Book</code> promised a <code>borrow()</code> that a reference book must refuse. When a subclass has to disable something the base promised, the base promised too much &mdash; that is the fragile base class from <a href=\"#l5-h2\">Concept 2</a>.",
                 ar: "الزوج الثالث هو تحذير الدرس مصغّرًا. فـ <code>ReferenceBook</code> يجتاز اختبار «هو نوع من» في اللغة ومع ذلك يكسر التسلسل، لأن <code>Book</code> وعد بـ <code>borrow()</code> على كتاب المراجع أن يرفضها. وحين يضطر وريثٌ إلى تعطيل شيء وعد به الأساس فقد وعد الأساس بأكثر مما ينبغي &mdash; وذلك الصنف الأساس الهشّ من <a href=\"#l5-h2\">المفهوم 2</a>." }
    },
    {
      id: "t5q7", type: "order", level: "medium",
      topics: ["attr-lookup", "inheritance", "override"],
      q: { en: "Python evaluates <code>t.fee_per_km</code> where <code>t</code> is a <code>RefrigeratedTruckCourier(TruckCourier)</code> and <code>TruckCourier(Courier)</code>. Put the search in order.",
           ar: "تُقيّم بايثون <code>t.fee_per_km</code> حيث <code>t</code> من <code>RefrigeratedTruckCourier(TruckCourier)</code> و<code>TruckCourier(Courier)</code>. رتّب البحث." },
      items: [
        { en: "The object's own attributes.", ar: "خصائص الكائن نفسه." },
        { en: "<code>RefrigeratedTruckCourier</code>, the object's own class.", ar: "<code>RefrigeratedTruckCourier</code>، صنف الكائن نفسه." },
        { en: "<code>TruckCourier</code>, its immediate base.", ar: "<code>TruckCourier</code>، أساسه المباشر." },
        { en: "<code>Courier</code>, the base of the base.", ar: "<code>Courier</code>، أساس الأساس." },
        { en: "<code>object</code>, and then <code>AttributeError</code> if it is still not found.", ar: "<code>object</code>، ثم <code>AttributeError</code> إن لم تُوجد بعد." }
      ],
      answer: [0, 1, 2, 3, 4],
      explain: { en: "Object, then up the chain of classes, taking the <em>first</em> match and stopping. That single rule covers everything in this lesson: overriding is just defining a name earlier in the chain, and <code>super()</code> is how you deliberately ask for the next one up instead of the first.",
                 ar: "الكائن، ثم صعودًا في سلسلة الأصناف، مع أخذ <em>أول</em> تطابق والتوقف. وتلك القاعدة الواحدة تغطي كل ما في هذا الدرس: فإعادة التعريف ليست إلا تعريف الاسم أبكر في السلسلة، و<code>super()</code> هي كيف تطلب متعمدًا التاليَ فوقه بدل الأول." }
    },
    {
      id: "t5q8", type: "compare", level: "medium",
      topics: ["composition", "inheritance", "is-a-has-a"],
      q: { en: "The company needs refrigerated and electric variants of two courier types. Which statement about the pair is true?",
           ar: "تحتاج الشركة نسختين مبرَّدة وكهربائية من نوعي مندوبين. أي عبارة عن الزوج صحيحة؟" },
      codeA: "class TruckCourier(Courier): ...\nclass BicycleCourier(Courier): ...\n\nclass RefrigeratedTruckCourier(TruckCourier): ...\nclass ElectricTruckCourier(TruckCourier): ...\nclass RefrigeratedBicycleCourier(BicycleCourier): ...\nclass ElectricBicycleCourier(BicycleCourier): ...\nclass RefrigeratedElectricTruckCourier(ElectricTruckCourier): ...\n# ... and one more for every new combination",
      codeB: "class Courier:\n    def __init__(self, name, power, cargo):\n        self.name = name\n        self.power = power     # PetrolEngine() or Battery()\n        self.cargo = cargo     # PlainBox() or FridgeBox()\n\n\nt = Courier(\"Samir\", Battery(), FridgeBox(target_c=4))\nb = Courier(\"Lina\", PetrolEngine(), PlainBox())",
      options: [
        { en: "A needs a new class for every combination, so two independent choices produce a hierarchy that grows multiplicatively. B treats them as two attributes, so the same two choices need two small classes each and can even be changed while the program runs.",
          ar: "تحتاج أ صنفًا جديدًا لكل توليفة، فيُنتج خيارانِ مستقلان تسلسلًا ينمو ضربًا. وتعامل ب معهما كخاصيتين، فالخيارانِ نفسهما يحتاجان صنفين صغيرين لكل منهما ويمكن تغييرهما أثناء تشغيل البرنامج." },
        { en: "A is better because the type name documents exactly what each courier is.",
          ar: "أ أفضل لأن اسم النوع يوثّق بالضبط ما هو كل مندوب." },
        { en: "B cannot work, because a courier's fee depends on the vehicle and only inheritance can change a method's behaviour.",
          ar: "ب لا تنجح، لأن أجرة المندوب تتوقف على المركبة، والوراثة وحدها تستطيع تغيير سلوك دالة." },
        { en: "Both are equivalent; A is just more verbose to type.",
          ar: "كلتاهما متكافئة؛ وأ أطول في الكتابة فقط." }
      ],
      answer: 0,
      explain: { en: "Two independent axes of variation are the classic signal to stop inheriting. With 2 power sources and 2 cargo types you already need 4 leaf classes, and a third axis makes 8 &mdash; and a courier still cannot swap its battery for a petrol engine without becoming a different object. Option 3 is worth refuting directly: <code>self.power.minutes_for(km)</code> changes behaviour perfectly well without inheritance, which is what <a href=\"#l5-s7\">\"a configuration, not a class\"</a> means in the lesson.",
                 ar: "محورانِ مستقلان من التنوّع هما العلامة الكلاسيكية على التوقف عن الوراثة. فبمصدري طاقة ونوعي حمل تحتاج أصلًا 4 أصناف طرفية، ومحور ثالث يجعلها 8 &mdash; ويظل المندوب عاجزًا عن مبادلة بطاريته بمحرك بنزين دون أن يصبح كائنًا آخر. والخيار 3 يستحق الدحض مباشرة: فـ <code>self.power.minutes_for(km)</code> تغيّر السلوك تمامًا بلا وراثة، وهذا ما يعنيه <a href=\"#l5-s7\">«تهيئة لا صنف»</a> في الدرس." }
    },
    {
      id: "t5q9", type: "complete", level: "hard",
      topics: ["super", "override"],
      q: { en: "<code>ColdChainLog</code> must record every trip the way the base does, <em>and</em> reject a trip above its temperature limit. Which <code>add_trip</code> is right?",
           ar: "على <code>ColdChainLog</code> أن يسجّل كل رحلة كما يفعل الأساس، <em>و</em>أن يرفض رحلة تتجاوز حدّ حرارته. فأي <code>add_trip</code> هي الصحيحة؟" },
      code: "class ShiftLog:\n    def __init__(self, courier_name):\n        self.courier_name = courier_name\n        self.trips = []\n\n    def add_trip(self, km):\n        self.trips.append(km)\n\n    def total_km(self):\n        return sum(self.trips)\n\n\nclass ColdChainLog(ShiftLog):\n    def __init__(self, courier_name, max_c=8):\n        super().__init__(courier_name)\n        self.max_c = max_c\n\n    def add_trip(self, km, temp_c):\n        # which body?",
      options: [
        { code: "if temp_c > self.max_c:\n    raise ValueError(f\"too warm: {temp_c}\")\nsuper().add_trip(km)" },
        { code: "if temp_c > self.max_c:\n    raise ValueError(f\"too warm: {temp_c}\")\nself.trips.append(km)" },
        { code: "super().add_trip(km)\nif temp_c > self.max_c:\n    raise ValueError(f\"too warm: {temp_c}\")" },
        { code: "if temp_c > self.max_c:\n    raise ValueError(f\"too warm: {temp_c}\")\nself.add_trip(km)" }
      ],
      answer: 0,
      explain: { en: "Check first, then delegate the recording upward. The second option works today and is the one to argue about: by reaching into <code>self.trips</code> it duplicates the base's knowledge of <em>how</em> trips are stored, so the day <code>ShiftLog.add_trip</code> starts stamping a time or capping the distance, this subclass silently stops doing it. The third records the trip and <em>then</em> rejects it, leaving a refused trip in the list. The fourth calls itself with one argument &mdash; <code>TypeError</code>, and if it somehow matched, infinite recursion.",
                 ar: "افحص أولًا، ثم فوّض التسجيل إلى الأعلى. والخيار الثاني يعمل اليوم وهو موضع الخصومة: فبوصوله إلى <code>self.trips</code> يكرّر معرفة الأساس بـ<em>كيف</em> تُخزَّن الرحلات، فيومَ تبدأ <code>ShiftLog.add_trip</code> بوسم وقت أو حصر مسافة يكفّ هذا الوريث عن ذلك بصمت. والثالث يسجّل الرحلة <em>ثم</em> يرفضها، فيترك رحلة مرفوضة في القائمة. والرابع يستدعي نفسه بوسيط واحد &mdash; <code>TypeError</code>، ولو تطابق بشكل ما لكان تكرارًا لا نهائيًا." }
    },
    {
      id: "t5q10", type: "output", level: "hard",
      topics: ["fragile-base", "override", "inheritance"],
      q: { en: "The base class is changed to weight each trip, and the subclass is not touched. Write the two lines this prints.",
           ar: "يُعدَّل الصنف الأساس ليزن كل رحلة، ولا يُمسّ الوريث. اكتب السطرين الذين يطبعهما." },
      code: "class ShiftLog:\n    def __init__(self, name):\n        self.name = name\n        self.trips = []\n\n    def add_trip(self, km, weight=1.0):\n        self.trips.append(km * weight)\n\n    def total_km(self):\n        return sum(self.trips)\n\n\nclass NightShiftLog(ShiftLog):\n    def add_trip(self, km):\n        self.trips.append(km)\n\n\nday = ShiftLog(\"Samir\")\nday.add_trip(10, weight=1.5)\nnight = NightShiftLog(\"Lina\")\nnight.add_trip(10)\nprint(day.total_km())\nprint(night.total_km())",
      blanks: [{ accept: ["15.0\n10"], lines: 2 }],
      explain: { en: "This is the fragile base class caught in the act. The base learned a new rule &mdash; trips are weighted &mdash; and <code>NightShiftLog</code> never hears about it, because its override replaced the method entirely and appends the raw distance. Both numbers are internally consistent and the two logs now mean different things; nothing errors, and the night shift quietly under-reports for ever. Note the types too: 15.0 is a float because of the multiplication, 10 is still an int. Had the subclass written <code>super().add_trip(km)</code> instead of touching <code>self.trips</code>, it would have inherited the new rule for free.",
                 ar: "هذا هو الصنف الأساس الهشّ متلبّسًا. فقد تعلّم الأساس قاعدة جديدة &mdash; الرحلات موزونة &mdash; ولا يسمع <code>NightShiftLog</code> بها أبدًا، لأن إعادة تعريفه حلّت محلّ الدالة كلها وتضيف المسافة الخام. والرقمان متناسقان داخليًا وقد صار السجلّان يعنيان شيئين مختلفين؛ ولا شيء يُخطئ، وتُبلّغ وردية الليل أقل من الحقيقة بصمت إلى الأبد. ولاحظ الأنواع كذلك: فـ 15.0 عدد عشري بسبب الضرب، و10 لا تزال عددًا صحيحًا. ولو كتب الوريث <code>super().add_trip(km)</code> بدل مسّ <code>self.trips</code> لورث القاعدة الجديدة مجانًا." }
    },
    {
      id: "t5q11", type: "mcq", level: "hard",
      topics: ["fragile-base", "is-a-has-a"],
      q: { en: "A subclass has to override a base method purely to make it refuse &mdash; <code>ReferenceBook.borrow()</code> raises instead of borrowing. What is the honest reading of that?",
           ar: "يضطر وريثٌ إلى إعادة تعريف دالة الأساس فقط لتجعلها ترفض &mdash; فـ <code>ReferenceBook.borrow()</code> ترفع خطأً بدل الاستعارة. فما القراءة الصادقة لذلك؟" },
      options: [
        { en: "The base promised more than all its subclasses can keep, so code written against <code>Book</code> is no longer safe &mdash; the hierarchy is the thing to fix, not the override.",
          ar: "وعد الأساس بأكثر مما تستطيع كل وريثاته الوفاء به، فلم يبقَ الكود المكتوب في مقابل <code>Book</code> آمنًا &mdash; فالتسلسل هو ما يُصلَح لا إعادة التعريف." },
        { en: "It is a normal use of overriding: subclasses exist precisely to change the behaviour they inherit.",
          ar: "هذا استعمال عادي لإعادة التعريف: فالوريثات موجودة بالضبط لتغيير السلوك الذي ترثه." },
        { en: "It is fine as long as the raised exception is documented, because callers can catch it.",
          ar: "لا بأس ما دام الاستثناء المرفوع موثّقًا، لأن المستدعين يستطيعون التقاطه." },
        { en: "It proves inheritance should be avoided in general; composition is the correct choice in every case.",
          ar: "هذا يثبت وجوب تجنّب الوراثة عمومًا؛ فالتركيب هو الخيار الصحيح في كل حالة." }
      ],
      answer: 0,
      explain: { en: "A loop over a shelf of <code>Book</code> objects calling <code>borrow()</code> was correct before this subclass existed and is now a crash waiting for the right input. The useful signal is the word <em>refuse</em>: overriding to do something <em>differently</em> is inheritance working as intended (that is question 2 and all of <a href=\"#l6-h2\">Lesson 6</a>); overriding to <em>withdraw</em> a promise means the promise was in the wrong place &mdash; <code>Book</code> should not have had <code>borrow()</code>, or reference items should not be <code>Book</code>s. And the last option overcorrects: inheritance is right for <code>TruckCourier</code>, which keeps every promise its base makes.",
                 ar: "حلقةٌ على رفٍّ من كائنات <code>Book</code> تستدعي <code>borrow()</code> كانت صحيحة قبل وجود هذا الوريث وصارت الآن انهيارًا ينتظر المُدخَل المناسب. والعلامة المفيدة هي كلمة <em>ترفض</em>: فإعادة التعريف لتفعل شيئًا <em>بطريقة مختلفة</em> هي الوراثة تعمل كما أُريد (وذلك السؤال 2 و<a href=\"#l6-h2\">الدرس 6</a> كله)؛ أما إعادة التعريف لـ<em>سحب</em> وعدٍ فمعناها أن الوعد كان في الموضع الخطأ &mdash; فما كان ينبغي لـ <code>Book</code> أن تملك <code>borrow()</code>، أو ما كان ينبغي أن تكون أصناف المراجع <code>Book</code>. والخيار الأخير يصحّح أكثر من اللازم: فالوراثة صحيحة لـ <code>TruckCourier</code> الذي يحفظ كل وعد يقطعه أساسه." }
    },
    {
      id: "t5q12", type: "multi", level: "hard",
      topics: ["composition", "inheritance", "is-a-has-a", "fragile-base"],
      q: { en: "Select <strong>every</strong> signal that you should prefer composition over inheritance.",
           ar: "اختر <strong>كل</strong> علامة على أنه ينبغي أن تفضّل التركيب على الوراثة." },
      options: [
        { en: "The thing varies along two or more independent axes, so inheritance would need a class per combination.",
          ar: "الشيء يتنوّع على محورين مستقلين أو أكثر، فتحتاج الوراثة صنفًا لكل توليفة." },
        { en: "The relationship reads naturally as <em>has a</em> rather than <em>is a</em>.",
          ar: "العلاقة تُقرأ طبعًا بـ«له» لا بـ«هو نوع من»." },
        { en: "You want the part to be swappable while the program runs, not fixed when the object is created.",
          ar: "تريد الجزء قابلًا للاستبدال أثناء تشغيل البرنامج، لا مثبَّتًا عند إنشاء الكائن." },
        { en: "A subclass would have to disable or refuse something the base promises.",
          ar: "سيضطر الوريث إلى تعطيل أو رفض شيء يوعد به الأساس." },
        { en: "You only need access to one of another class's methods and inheritance is the shortest way to get it.",
          ar: "تحتاج الوصول إلى دالة واحدة فقط من صنف آخر، والوراثة أقصر طريق إليها." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The first four are the lesson's decision rule in full. The fifth is the trap and it is worth stating plainly: inheriting to borrow a method is the most common bad reason to inherit, because you also take on every other promise the base makes and every future change to it &mdash; and you claim a kinship the program can then rely on. Holding an instance costs one attribute and gives you the same method.",
                 ar: "الأربعة الأولى هي قاعدة القرار في الدرس كاملةً. والخامسة هي الفخ وتستحق قولًا صريحًا: فالوراثة لاستعارة دالة أشيع سبب سيّئ للوراثة، لأنك تتحمّل معها كل وعد آخر يقطعه الأساس وكل تغيير قادم عليه &mdash; وتدّعي نسبًا يستطيع البرنامج أن يعتمد عليه بعد ذلك. وإمساك كائن يكلّف خاصية واحدة ويمنحك الدالة نفسها." }
    }
  ]
};
