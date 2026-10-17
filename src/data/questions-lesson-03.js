/* ============================================================
   Lesson 3 — Encapsulation.
   Domains: the school mark sheet, the prepaid electricity
   meter, the attendance register, the clinic waiting board.
   ============================================================ */
window.OOPBanks = window.OOPBanks || {};

window.OOPBanks["test-03"] = {
  title: { en: "Test 3 — Encapsulation", ar: "اختبار 3 — التغليف" },
  intro: {
    en: "Twelve questions on Lesson 3. The thread running through all of them is one question you can ask about any class you write: <em>if this value must never be wrong, how many places could make it wrong?</em> Encapsulation is the answer \"one\".",
    ar: "اثنا عشر سؤالًا على الدرس 3. والخيط الذي يجمعها كلها سؤال واحد تسأله عن أي صنف تكتبه: <em>إن كان لهذه القيمة ألا تكون خطأً أبدًا، فكم موضعًا يستطيع أن يجعلها خطأً؟</em> والتغليف هو الجواب «موضع واحد»."
  },
  questions: [
    {
      id: "t3q1", type: "tf", level: "easy",
      topics: ["underscore"],
      q: { en: "Renaming an attribute from <code>mark</code> to <code>_mark</code> makes Python refuse any assignment to it from outside the class.",
           ar: "تغيير اسم الخاصية من <code>mark</code> إلى <code>_mark</code> يجعل بايثون ترفض أي إسناد إليها من خارج الصنف." },
      truth: false,
      explain: { en: "Nothing is enforced at run time. The leading underscore is a message to other programmers &mdash; \"this is internal, do not touch it\" &mdash; and Python still allows <code>s._mark = 105</code> without complaint. What actually enforces the rule is the <code>@property</code> and its setter: they give the value a single door that runs your check. The underscore only marks which door is the back one.",
                 ar: "لا شيء مفروض وقت التشغيل. فالشرطة السفلية في البداية رسالة إلى المبرمجين الآخرين &mdash; «هذه داخلية فلا تمسّها» &mdash; وبايثون تتيح <code>s._mark = 105</code> بلا اعتراض. أما ما يفرض القاعدة فعلًا فهو <code>@property</code> وضابطها: فهما يعطيان القيمة بابًا واحدًا يُنفّذ فحصك. والشرطة السفلية تعلّم فقط أي باب هو الخلفي." }
    },
    {
      id: "t3q2", type: "fill", level: "easy",
      topics: ["property", "setter"],
      q: { en: "Complete the two decorators that turn <code>mark</code> into a validated attribute.",
           ar: "أكمل المزخرِفَين اللذين يحوّلان <code>mark</code> إلى خاصية متحقَّق منها." },
      code: "class Student:\n    def __init__(self, name, mark=0):\n        self.name = name\n        self.mark = mark\n\n    ____1____\n    def mark(self):\n        return self._mark\n\n    ____2____\n    def mark(self, value):\n        if not 0 <= value <= 100:\n            raise ValueError(f\"mark out of range: {value}\")\n        self._mark = value",
      blanks: [
        { accept: ["@property"], label: { en: "blank 1", ar: "الفراغ 1" } },
        { accept: ["@mark.setter"], label: { en: "blank 2", ar: "الفراغ 2" } }
      ],
      explain: { en: "<code>@property</code> marks the reader; <code>@mark.setter</code> attaches the writer to the property that the reader just created &mdash; which is why it is named after <code>mark</code> and not after <code>property</code>. Both functions are called <code>mark</code> on purpose: together they are the one name <code>mark</code> that callers see.",
                 ar: "<code>@property</code> تعلّم القارئ؛ و<code>@mark.setter</code> تربط الكاتب بالخاصية التي أنشأها القارئ للتو &mdash; ولهذا تُسمّى باسم <code>mark</code> لا باسم <code>property</code>. والدالتان كلتاهما تُسمّى <code>mark</code> بقصد: فهما معًا الاسم الواحد <code>mark</code> الذي يراه المستدعون." }
    },
    {
      id: "t3q3", type: "output", level: "easy",
      topics: ["read-only", "property"],
      q: { en: "The meter's balance can be read and topped up, but not asserted. Write the three lines this prints.",
           ar: "رصيد العدّاد يُقرأ ويُشحن، لكنه لا يُفرض. اكتب الأسطر الثلاثة التي يطبعها." },
      code: "class Meter:\n    def __init__(self, serial, balance=0.0):\n        self.serial = serial\n        self._balance = balance\n\n    @property\n    def balance(self):\n        return self._balance\n\n    def top_up(self, amount):\n        self._balance = self._balance + amount\n\n\nm = Meter(\"M-1\", 10.0)\nprint(m.balance)\nm.top_up(5)\nprint(m.balance)\ntry:\n    m.balance = 100\nexcept AttributeError as e:\n    print(\"blocked\")",
      blanks: [{ accept: ["10.0\n15.0\nblocked"], lines: 3 }],
      explain: { en: "A property with a getter and no setter is read-only: <code>m.balance = 100</code> raises <code>AttributeError: property 'balance' of 'Meter' object has no setter</code>. That is the point &mdash; a balance is something that <em>happens</em> through top-ups and consumption, not something an outsider declares. The only ways in are the methods you wrote, so every change has a reason.",
                 ar: "الخاصية بقارئ بلا ضابط هي للقراءة فقط: فـ <code>m.balance = 100</code> ترفع <code>AttributeError: property 'balance' of 'Meter' object has no setter</code>. وهذا هو المقصود &mdash; فالرصيد شيء <em>يحدث</em> عبر الشحن والاستهلاك، لا شيء يعلنه غريب. والسبيل الوحيد للدخول هو الدوال التي كتبتها، فيكون لكل تغيير سبب." }
    },
    {
      id: "t3q4", type: "mcq", level: "easy",
      topics: ["invariant", "one-door"],
      q: { en: "A mark must stay between 0 and 100. The script checks this in six places: on import, on manual entry, on correction, and three more. What is the actual defect?",
           ar: "يجب أن تبقى العلامة بين 0 و100. ويفحص البرنامج ذلك في ستة مواضع: عند الاستيراد، وعند الإدخال اليدوي، وعند التصحيح، وثلاثة أخرى. فما العيب الحقيقي؟" },
      options: [
        { en: "The rule lives in the callers instead of with the data, so the seventh caller &mdash; written next month, by someone else &mdash; is the one that will not check.",
          ar: "القاعدة تعيش في المستدعين بدل أن تعيش مع البيانات، فالمستدعي السابع &mdash; المكتوب الشهر القادم بيد شخص آخر &mdash; هو الذي لن يفحص." },
        { en: "Six checks are slower than one, so the report takes longer to produce.",
          ar: "ستة فحوص أبطأ من واحد، فيستغرق إنتاج التقرير وقتًا أطول." },
        { en: "The checks are duplicated code, which is ugly but harmless as long as all six are identical.",
          ar: "الفحوص كود مكرَّر، وهو قبيح لكنه غير ضار ما دامت الستة متطابقة." },
        { en: "Nothing is wrong, as long as a test covers each of the six paths.",
          ar: "لا شيء خطأ، ما دام هناك اختبار يغطي كل مسار من الستة." }
      ],
      answer: 0,
      explain: { en: "Correctness that depends on every caller remembering is not correctness, it is luck with good odds. Note what is <em>not</em> the answer: speed is irrelevant, and \"duplicated but identical\" misses the point &mdash; the problem is not the six that exist but the one that will not, and no test can cover a path nobody has written yet. Moving the check into a setter makes the invariant true by construction: there is no route to the value that skips it.",
                 ar: "الصحة التي تتوقف على تذكّر كل مستدعٍ ليست صحة، بل حظٌّ باحتمالات جيدة. ولاحظ ما ليس هو الجواب: فالسرعة لا علاقة لها، و«مكرَّر لكن متطابق» يفوّت المقصد &mdash; فالمشكلة ليست الستة الموجودة بل الواحد الذي لن يفحص، ولا اختبار يستطيع تغطية مسار لم يكتبه أحد بعد. ونقل الفحص إلى ضابط يجعل الشرط الثابت صحيحًا بالبناء: فلا طريق إلى القيمة يتجاوزه." }
    },
    {
      id: "t3q5", type: "trace", level: "medium",
      topics: ["setter", "invariant"],
      q: { en: "The setter rejects 105. After the <code>except</code> block runs, what do these hold?",
           ar: "يرفض الضابط القيمة 105. بعد تنفيذ كتلة <code>except</code>، ماذا تحمل هذه؟" },
      code: "class Student:\n    def __init__(self, name, mark=0):\n        self.name = name\n        self.mark = mark\n\n    @property\n    def mark(self):\n        return self._mark\n\n    @mark.setter\n    def mark(self, value):\n        if not 0 <= value <= 100:\n            raise ValueError(\"out of range\")\n        self._mark = value\n\n\ns = Student(\"Lina\", 70)\ns.mark = 85\ntry:\n    s.mark = 105\nexcept ValueError:\n    pass",
      blanks: [
        { accept: ["85"], label: { en: "<code>s.mark</code>", ar: "<code>s.mark</code>" } },
        { accept: ["85"], label: { en: "<code>s._mark</code>", ar: "<code>s._mark</code>" } }
      ],
      explain: { en: "<code>raise</code> leaves the setter before <code>self._mark = value</code> is reached, so the rejected value is never stored and the object still holds its last valid state. This is the property worth naming: a refused write does not corrupt anything. Both expressions give 85 because <code>s.mark</code> is the getter and the getter returns <code>self._mark</code> &mdash; two names, one value. Step through it in <a href=\"#lab\">trace 5</a>.",
                 ar: "تُخرج <code>raise</code> من الضابط قبل بلوغ <code>self._mark = value</code>، فلا تُخزَّن القيمة المرفوضة أبدًا ويبقى الكائن على آخر حالة صحيحة له. وهذه خصيصة تستحق التسمية: فالكتابة المرفوضة لا تُفسد شيئًا. والتعبيران يعطيان 85 لأن <code>s.mark</code> هي القارئ والقارئ يُعيد <code>self._mark</code> &mdash; اسمان وقيمة واحدة. تنقّل فيه في <a href=\"#lab\">التتبّع 5</a>." }
    },
    {
      id: "t3q6", type: "error", level: "medium",
      topics: ["property", "setter"],
      q: { en: "This class hits <code>RecursionError: maximum recursion depth exceeded</code> as soon as a student is created. Click the line to fix.",
           ar: "يصطدم هذا الصنف بـ <code>RecursionError: maximum recursion depth exceeded</code> بمجرد إنشاء طالب. انقر السطر الذي يجب إصلاحه." },
      code: "class Student:\n    def __init__(self, name, mark=0):\n        self.name = name\n        self.mark = mark\n\n    @property\n    def mark(self):\n        return self.mark\n\n    @mark.setter\n    def mark(self, value):\n        self._mark = value",
      answer: 8,
      explain: { en: "Line 8 returns <code>self.mark</code>, which is the property itself &mdash; so the getter calls the getter, for ever. The getter must read the <em>private</em> attribute the setter wrote: <code>return self._mark</code>. This is the single most common first mistake with properties, and the giveaway is that the traceback repeats the same two lines hundreds of times. The same trap exists in the setter: writing <code>self.mark = value</code> there would recurse too.",
                 ar: "السطر 8 يُعيد <code>self.mark</code>، وهي الخاصية نفسها &mdash; فيستدعي القارئ القارئَ إلى الأبد. ويجب أن يقرأ القارئ الخاصية <em>الخاصة</em> التي كتبها الضابط: <code>return self._mark</code>. وهذا أشيع خطأ أول مع الخصائص، والعلامة الفاضحة أن التتبّع يكرّر السطرين نفسيهما مئات المرات. والفخ نفسه موجود في الضابط: فكتابة <code>self.mark = value</code> هناك ستتكرر كذلك." },
      solution: { code: "    @property\n    def mark(self):\n        return self._mark" }
    },
    {
      id: "t3q7", type: "order", level: "medium",
      topics: ["one-door", "invariant", "property"],
      q: { en: "Put the four refactoring steps in the order the lesson applied them, turning a loose attribute into a guarded one.",
           ar: "رتّب خطوات إعادة الهيكلة الأربع بالترتيب الذي طبّقه الدرس، لتحويل خاصية سائبة إلى خاصية محصّنة." },
      items: [
        { en: "Rename the stored attribute to <code>_mark</code>, marking it internal.", ar: "غيّر اسم الخاصية المخزّنة إلى <code>_mark</code>، معلِّمًا أنها داخلية." },
        { en: "Add a <code>@property</code> called <code>mark</code> that returns <code>self._mark</code>, so existing readers keep working unchanged.", ar: "أضف <code>@property</code> باسم <code>mark</code> تُعيد <code>self._mark</code>، فيستمر القُرّاء الحاليون بلا تغيير." },
        { en: "Add a <code>@mark.setter</code> that validates the value before storing it.", ar: "أضف <code>@mark.setter</code> يتحقّق من القيمة قبل تخزينها." },
        { en: "Delete the six checks in the callers, now that none of them can be skipped.", ar: "احذف الفحوص الستة في المستدعين، إذ لم يبقَ ممكنًا تجاوز أيٍّ منها." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "The order matters for a practical reason: steps 1&ndash;3 are invisible to every caller, because <code>s.mark</code> reads the same before and after. That is what makes the refactor safe to do on a working program &mdash; you add the door first and remove the scattered checks last, rather than breaking every call site and fixing it afterwards.",
                 ar: "الترتيب مهم لسبب عملي: فالخطوات 1&ndash;3 غير مرئية لأي مستدعٍ، لأن <code>s.mark</code> تُقرأ كما هي قبل وبعد. وهذا ما يجعل إعادة الهيكلة آمنة على برنامج يعمل &mdash; فتضيف الباب أولًا وتحذف الفحوص المتناثرة آخرًا، بدل أن تكسر كل موضع استدعاء ثم تصلحه." }
    },
    {
      id: "t3q8", type: "match", level: "medium",
      topics: ["underscore", "property", "read-only", "setter"],
      q: { en: "Match each construct to what it actually achieves.",
           ar: "وصّل كل تركيب بما يحققه فعلًا." },
      leftHead: { en: "Construct", ar: "التركيب" },
      rightHead: { en: "What it achieves", ar: "ما يحققه" },
      pairs: [
        { l: { code: "self._mark = value" },
          r: { en: "Stores the value under a name that signals \"internal\" to readers, while changing nothing about what Python permits.", ar: "يخزّن القيمة باسم يشير إلى «داخلي» للقارئ، دون أن يغيّر شيئًا من إذن بايثون." } },
        { l: { code: "@property def mark(self)" },
          r: { en: "Lets a method be read like a plain attribute, with no brackets, so callers never learn it is computed.", ar: "يتيح قراءة الدالة كخاصية عادية بلا قوسين، فلا يعلم المستدعون أنها محسوبة." } },
        { l: { code: "@mark.setter with a raise" },
          r: { en: "Makes the rule run on every single assignment, including the one inside <code>__init__</code>.", ar: "يجعل القاعدة تُنفَّذ على كل إسناد، بما في ذلك الذي داخل <code>__init__</code>." } },
        { l: { code: "a getter with no setter" },
          r: { en: "Makes the value readable but impossible to assert from outside, so it can only change through the methods you wrote.", ar: "يجعل القيمة مقروءة لكن يستحيل فرضها من الخارج، فلا تتغير إلا عبر الدوال التي كتبتها." } }
      ],
      explain: { en: "Only two of the four change what is <em>possible</em>: the setter and the missing setter. The underscore changes what is <em>communicated</em>, and the property changes what the call site has to <em>know</em>. All four together are what the lesson means by one door.",
                 ar: "اثنان فقط من الأربعة يغيّران ما هو <em>ممكن</em>: الضابط، والضابط الغائب. والشرطة السفلية تغيّر ما هو <em>مبلَّغ</em>، والخاصية تغيّر ما يجب أن <em>يعرفه</em> موضع الاستدعاء. والأربعة معًا هي ما يعنيه الدرس بالباب الواحد." }
    },
    {
      id: "t3q9", type: "compare", level: "hard",
      topics: ["invariant", "one-door", "setter"],
      q: { en: "Both versions reject an impossible mark. Which statement about the pair is true?",
           ar: "كلتا النسختين ترفض علامة مستحيلة. أي عبارة عن الزوج صحيحة؟" },
      codeA: "class Student:\n    def __init__(self, name):\n        self.name = name\n        self.mark = 0\n\n\ndef set_mark(student, mark):\n    if not 0 <= mark <= 100:\n        raise ValueError(\"out of range\")\n    student.mark = mark\n\n\ns = Student(\"Lina\")\nset_mark(s, 85)\ns.mark = 105\nprint(s.mark)",
      codeB: "class Student:\n    def __init__(self, name, mark=0):\n        self.name = name\n        self.mark = mark\n\n    @property\n    def mark(self):\n        return self._mark\n\n    @mark.setter\n    def mark(self, value):\n        if not 0 <= value <= 100:\n            raise ValueError(\"out of range\")\n        self._mark = value\n\n\ns = Student(\"Lina\")\ns.mark = 85\ns.mark = 105\nprint(s.mark)",
      options: [
        { en: "A prints <code>105</code>: the helper is only used when someone chooses to use it, and line 15 writes the attribute directly. B raises <code>ValueError</code> on line 19 and never prints, because there is no way to reach the value except through the setter.",
          ar: "تطبع أ <code>105</code>: فالدالة المساعدة لا تُستخدم إلا إذا اختار أحد استخدامها، والسطر 15 يكتب الخاصية مباشرة. وترفع ب <code>ValueError</code> في السطر 19 ولا تطبع شيئًا، لأن لا سبيل إلى القيمة إلا عبر الضابط." },
        { en: "Both raise <code>ValueError</code>; the difference is only where the message is written.",
          ar: "ترفع كلتاهما <code>ValueError</code>؛ والفرق في موضع كتابة الرسالة فقط." },
        { en: "A prints <code>85</code>, because the direct assignment on line 15 fails silently and leaves the old value.",
          ar: "تطبع أ <code>85</code>، لأن الإسناد المباشر في السطر 15 يفشل بصمت ويترك القيمة القديمة." },
        { en: "B prints <code>105</code>, because the setter is bypassed when the value comes from outside the class.",
          ar: "تطبع ب <code>105</code>، لأن الضابط يُتجاوز عندما تأتي القيمة من خارج الصنف." }
      ],
      answer: 0,
      explain: { en: "A's guard is <em>optional</em>: it protects the one path that calls it and nothing else, which is why <code>s.mark = 105</code> succeeds and the impossible mark lands in the records. B's guard is on the attribute itself, so the identical line of calling code is refused &mdash; and refused at the line that caused it, not later in a report. That difference &mdash; a rule you must remember to use versus a rule you cannot avoid &mdash; is the whole lesson.",
                 ar: "حماية أ <em>اختيارية</em>: فهي تحمي المسار الوحيد الذي يستدعيها ولا شيء غيره، ولهذا تنجح <code>s.mark = 105</code> وتحلّ العلامة المستحيلة في السجلات. وحماية ب على الخاصية نفسها، فيُرفض سطر الكود المستدعي المتطابق &mdash; ويُرفض في السطر الذي سبّبه لا لاحقًا في تقرير. وذلك الفرق &mdash; قاعدة عليك أن تتذكر استخدامها مقابل قاعدة لا تستطيع تجنّبها &mdash; هو الدرس كله." }
    },
    {
      id: "t3q10", type: "complete", level: "hard",
      topics: ["setter", "invariant", "read-only"],
      q: { en: "Attendance is a percentage: it must stay between 0 and 100, and a student is passing at 75 or above. Which setter body is right?",
           ar: "الحضور نسبة مئوية: يجب أن يبقى بين 0 و100، والطالب ناجح عند 75 أو أكثر. فأي جسد ضابط هو الصحيح؟" },
      code: "class Student:\n    def __init__(self, name, attendance=100):\n        self.name = name\n        self.attendance = attendance\n\n    @property\n    def attendance(self):\n        return self._attendance\n\n    @attendance.setter\n    def attendance(self, value):\n        # which body?\n\n    @property\n    def is_passing(self):\n        return self._attendance >= 75",
      options: [
        { code: "if not 0 <= value <= 100:\n    raise ValueError(f\"attendance out of range: {value}\")\nself._attendance = value" },
        { code: "self._attendance = max(0, min(100, value))" },
        { code: "if 0 <= value <= 100:\n    self._attendance = value" },
        { code: "self.attendance = value" }
      ],
      answer: 0,
      explain: { en: "Refuse the bad value loudly. The three wrong answers are wrong in instructive ways. Clamping silently turns a typo of <code>1000</code> into a perfectly plausible <code>100</code> &mdash; the data is now wrong and nobody will ever know. The <code>if</code> with no <code>else</code> is worse: a rejected value leaves <code>_attendance</code> unset, so <code>__init__</code> may finish with the attribute missing entirely and the crash lands much later in <code>is_passing</code>. And <code>self.attendance = value</code> calls the setter from inside the setter &mdash; infinite recursion, the bug from question 6.",
                 ar: "ارفض القيمة السيئة بصوت مسموع. والأجوبة الخاطئة الثلاثة خاطئة بطرق معلّمة. فالحصر الصامت يحوّل خطأً مطبعيًا <code>1000</code> إلى <code>100</code> معقولة تمامًا &mdash; فتصبح البيانات خطأً ولا يعلم أحد أبدًا. و<code>if</code> بلا <code>else</code> أسوأ: فالقيمة المرفوضة تترك <code>_attendance</code> غير مضبوطة، فقد تنتهي <code>__init__</code> والخاصية مفقودة تمامًا ويقع الانهيار متأخرًا في <code>is_passing</code>. و<code>self.attendance = value</code> تستدعي الضابط من داخل الضابط &mdash; تكرار لا نهائي، وهو خلل السؤال 6." }
    },
    {
      id: "t3q11", type: "output", level: "hard",
      topics: ["property", "computed", "read-only"],
      q: { en: "Write the three lines this prints. <code>average</code> is a property with no setter.",
           ar: "اكتب الأسطر الثلاثة التي يطبعها. و<code>average</code> خاصية بلا ضابط." },
      code: "class Register:\n    def __init__(self):\n        self._marks = []\n\n    def add_mark(self, mark):\n        if not 0 <= mark <= 100:\n            raise ValueError(\"out of range\")\n        self._marks.append(mark)\n\n    @property\n    def average(self):\n        if not self._marks:\n            return 0.0\n        return sum(self._marks) / len(self._marks)\n\n\nr = Register()\nprint(r.average)\nr.add_mark(80)\nr.add_mark(60)\nprint(r.average)\ntry:\n    r.average = 100.0\nexcept AttributeError:\n    print(\"cannot set\")",
      blanks: [{ accept: ["0.0\n70.0\ncannot set"], lines: 3 }],
      explain: { en: "Three ideas in one program. The empty case is handled inside the property, so a fresh register answers 0.0 instead of crashing on division by zero. The average is computed on read, so it is correct the instant a mark is added &mdash; there is no stored total to update. And it has no setter, which is exactly right: an average is not something anybody should be able to declare, it is a consequence of the marks. Trying to assert it fails immediately rather than leaving the register internally inconsistent.",
                 ar: "ثلاث أفكار في برنامج واحد. فالحالة الفارغة معالَجة داخل الخاصية، فيجيب سجلّ جديد 0.0 بدل أن ينهار بالقسمة على صفر. والمعدّل محسوب عند القراءة، فهو صحيح لحظةَ تُضاف علامة &mdash; فلا مجموع مخزَّن تحدّثه. وليس له ضابط، وهذا هو الصحيح بالضبط: فالمعدّل ليس شيئًا ينبغي لأحد أن يستطيع إعلانه، بل نتيجةٌ للعلامات. ومحاولة فرضه تفشل فورًا بدل أن تترك السجلّ متناقضًا داخليًا." }
    },
    {
      id: "t3q12", type: "multi", level: "hard",
      topics: ["property", "setter", "underscore", "one-door"],
      q: { en: "You convert a public attribute <code>mark</code> into a property with a validating setter. Select <strong>every</strong> true consequence.",
           ar: "تحوّل خاصية عامة <code>mark</code> إلى خاصية محسوبة بضابط متحقِّق. اختر <strong>كل</strong> نتيجة صحيحة." },
      options: [
        { en: "Code that already reads <code>s.mark</code> keeps working with no edit, because the property is read with the same syntax.",
          ar: "الكود الذي يقرأ <code>s.mark</code> أصلًا يستمر بلا تعديل، لأن الخاصية تُقرأ بالصيغة نفسها." },
        { en: "The assignment inside <code>__init__</code> now goes through the setter too, so an object cannot be born invalid.",
          ar: "الإسناد داخل <code>__init__</code> يمرّ الآن عبر الضابط أيضًا، فلا يمكن أن يُولد كائن غير صحيح." },
        { en: "A caller can still bypass the check by assigning to <code>s._mark</code> directly.",
          ar: "يستطيع المستدعي تجاوز الفحص بالإسناد إلى <code>s._mark</code> مباشرة." },
        { en: "Reading <code>s.mark</code> is now a function call, so it can run any amount of code &mdash; which is why a property should stay cheap and free of side effects.",
          ar: "قراءة <code>s.mark</code> صارت الآن استدعاء دالة، فيمكنها تنفيذ أي قدر من الكود &mdash; ولهذا ينبغي أن تبقى الخاصية رخيصة وبلا آثار جانبية." },
        { en: "The class now rejects the attribute entirely unless the caller uses <code>set_mark()</code>.",
          ar: "صار الصنف يرفض الخاصية تمامًا إلا إذا استخدم المستدعي <code>set_mark()</code>." }
      ],
      answer: [0, 1, 2, 3],
      explain: { en: "Four of the five are true, and together they are the honest account of what a property buys. The first is why the refactor is safe on a live program. The second is the part people forget &mdash; <code>self.mark = mark</code> in <code>__init__</code> is an assignment like any other, so construction is validated for free. The third is the honest limit: Python's protection is a convention, and anyone determined to write <code>s._mark = 105</code> can; the point is that no one does it <em>by accident</em>. The fourth is the cost to respect. The fifth is false: the whole appeal is that the public name stays <code>mark</code>, with no new method for callers to learn.",
                 ar: "أربعة من الخمسة صحيحة، وهي معًا الحساب الصادق لما تشتريه الخاصية. فالأولى سبب أمان إعادة الهيكلة على برنامج حيّ. والثانية ما ينساه الناس &mdash; فـ <code>self.mark = mark</code> في <code>__init__</code> إسنادٌ كأي إسناد، فيُتحقَّق من البناء مجانًا. والثالثة الحدّ الصادق: فحماية بايثون اتفاقٌ، ومن عزم على كتابة <code>s._mark = 105</code> يستطيع؛ والمقصد أن لا أحد يفعلها <em>عن غير قصد</em>. والرابعة هي الثمن الذي يُحترم. والخامسة خاطئة: فكل الجاذبية في بقاء الاسم العام <code>mark</code>، بلا دالة جديدة يتعلّمها المستدعون." }
    }
  ]
};
