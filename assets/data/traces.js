/* ============================================================
   Execution-lab traces.

   Steps are authored, not interpreted. `line` is the line about
   to take effect, `vars` is the complete picture after it, and
   `out` is everything printed so far. Each program here was run
   in CPython first and the panels match that run exactly.
   ============================================================ */
/* Extend, never replace: chapters 2 to 4 keep their traces in files of
   their own, and verify_chapter.py loads every file in assets/data in
   sorted order, which puts this one last. A bare assignment here would
   silently drop whichever file loaded before it. */
window.OOPTraces = window.OOPTraces || {};

Object.assign(window.OOPTraces, {

  /* ---------------------------------------------------------- lesson 1 */
  "t-two-objects": {
    id: "t-two-objects",
    title: { en: "1 &middot; Two objects, two separate lives",
             ar: "1 &middot; كائنان، حياتان منفصلتان" },
    lede: { en: "One method runs three times and never touches the wrong book. Watch which counter moves at each step.",
            ar: "دالة واحدة تُنفَّذ ثلاث مرات ولا تمسّ الكتاب الخطأ أبدًا. راقب أي عدّاد يتحرك في كل خطوة." },
    code:
      "class Book:\n" +
      "    def __init__(self, title, copies_left):\n" +
      "        self.title = title\n" +
      "        self.copies_left = copies_left\n" +
      "\n" +
      "    def borrow(self):\n" +
      "        self.copies_left = self.copies_left - 1\n" +
      "\n" +
      "\n" +
      "a = Book(\"Kalila\", 3)\n" +
      "b = Book(\"Prophet\", 2)\n" +
      "a.borrow()\n" +
      "a.borrow()\n" +
      "b.borrow()\n" +
      "print(a.copies_left, b.copies_left)",
    steps: [
      { line: 1, vars: {},
        note: { en: "The <code>class</code> statement runs once. It defines the template &mdash; no book exists yet.",
                ar: "تُنفَّذ جملة <code>class</code> مرة واحدة. فتعرّف القالب &mdash; ولا يوجد أي كتاب بعد." } },
      { line: 10, vars: { "Book": "<class>" },
        note: { en: "<code>Book(\"Kalila\", 3)</code> creates an empty object and calls <code>__init__</code> on it.",
                ar: "<code>Book(\"Kalila\", 3)</code> ينشئ كائنًا فارغًا ويستدعي <code>__init__</code> عليه." } },
      { line: 3, vars: { "Book": "<class>", "self": "<Book object>", "title": "'Kalila'", "copies_left": "3" },
        scope: { en: "<code>Book.__init__</code>, self = the new book", ar: "<code>Book.__init__</code>، self = الكتاب الجديد" },
        note: { en: "Inside <code>__init__</code>. <code>title</code> and <code>copies_left</code> are parameters &mdash; local names that will vanish.",
                ar: "داخل <code>__init__</code>. فـ <code>title</code> و<code>copies_left</code> معاملات &mdash; أسماء محلية ستزول." } },
      { line: 4, vars: { "Book": "<class>", "self": "Book(title='Kalila', copies_left=?)", "title": "'Kalila'", "copies_left": "3" },
        scope: { en: "<code>Book.__init__</code>, self = the new book", ar: "<code>Book.__init__</code>، self = الكتاب الجديد" },
        note: { en: "<code>self.title</code> now exists on the object. The parameter still holds the same string, but they are two different places.",
                ar: "<code>self.title</code> موجودة الآن على الكائن. ولا يزال المعامل يحمل النص نفسه، لكنهما موضعان مختلفان." } },
      { line: 11, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=3)" },
        note: { en: "<code>__init__</code> returned, the parameters are gone, and the finished object is bound to <code>a</code>.",
                ar: "عادت <code>__init__</code>، واختفت المعاملات، وارتبط الكائن المكتمل بـ <code>a</code>." } },
      { line: 12, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=3)", "b": "Book(title='Prophet', copies_left=2)" },
        note: { en: "A second object, built by the same <code>__init__</code>, holding entirely separate values.",
                ar: "كائن ثانٍ، بُني بـ <code>__init__</code> نفسها، ويحمل قيمًا منفصلة تمامًا." } },
      { line: 7, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=3)", "b": "Book(title='Prophet', copies_left=2)", "self": "a" },
        scope: { en: "<code>Book.borrow</code>, self = <code>a</code>", ar: "<code>Book.borrow</code>، self = <code>a</code>" },
        note: { en: "<code>a.borrow()</code> bound <code>self</code> to <code>a</code>. Whatever this line assigns lands on <code>a</code> and nowhere else.",
                ar: "<code>a.borrow()</code> ربطت <code>self</code> بـ <code>a</code>. فكل ما يُسنده هذا السطر يحلّ على <code>a</code> ولا شيء غيره." } },
      { line: 13, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=2)", "b": "Book(title='Prophet', copies_left=2)" },
        note: { en: "<code>a</code> dropped to 2. <code>b</code> is untouched &mdash; and the two now look alike, which is a coincidence, not a link.",
                ar: "انخفض <code>a</code> إلى 2. و<code>b</code> لم يُمسّ &mdash; وقد تشابها الآن، وهذه مصادفة لا صلة." } },
      { line: 7, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=2)", "b": "Book(title='Prophet', copies_left=2)", "self": "a" },
        scope: { en: "<code>Book.borrow</code>, self = <code>a</code>", ar: "<code>Book.borrow</code>، self = <code>a</code>" },
        note: { en: "Second call, same object.", ar: "استدعاء ثانٍ، الكائن نفسه." } },
      { line: 14, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=1)", "b": "Book(title='Prophet', copies_left=2)" },
        note: { en: "<code>a</code> is at 1 after two borrows.", ar: "<code>a</code> عند 1 بعد استعارتين." } },
      { line: 7, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=1)", "b": "Book(title='Prophet', copies_left=2)", "self": "b" },
        scope: { en: "<code>Book.borrow</code>, self = <code>b</code>", ar: "<code>Book.borrow</code>، self = <code>b</code>" },
        note: { en: "Same line of code as two steps ago &mdash; but <code>self</code> is <code>b</code> this time.",
                ar: "سطر الكود نفسه قبل خطوتين &mdash; لكن <code>self</code> هو <code>b</code> هذه المرة." } },
      { line: 15, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=1)", "b": "Book(title='Prophet', copies_left=1)" },
        note: { en: "Both are 1 now, reached by different routes: 3 minus two borrows, and 2 minus one.",
                ar: "كلاهما 1 الآن، وصلا بطريقين مختلفين: 3 ناقص استعارتين، و2 ناقص واحدة." } },
      { line: 15, vars: { "Book": "<class>", "a": "Book(title='Kalila', copies_left=1)", "b": "Book(title='Prophet', copies_left=1)" },
        out: "1 1",
        note: { en: "The equal result is the lesson: one method body, two independent states.",
                ar: "النتيجة المتساوية هي الدرس: جسد دالة واحد، وحالتان مستقلتان." } }
    ]
  },

  /* ---------------------------------------------------------- lesson 2 */
  "t-init-order": {
    id: "t-init-order",
    title: { en: "2 &middot; What <code>__init__</code> guarantees",
             ar: "2 &middot; ما تضمنه <code>__init__</code>" },
    lede: { en: "A dictionary can be born missing a key; an object built by __init__ cannot. Watch the order of events.",
            ar: "القاموس قد يُولد ناقص مفتاح؛ أما الكائن الذي تبنيه __init__ فلا. راقب ترتيب الأحداث." },
    code:
      "class Order:\n" +
      "    def __init__(self, customer, discount=0):\n" +
      "        self.customer = customer\n" +
      "        self.discount = discount\n" +
      "        self.items = []\n" +
      "\n" +
      "    def add_item(self, name, price):\n" +
      "        self.items.append((name, price))\n" +
      "\n" +
      "    def net_total(self):\n" +
      "        gross = sum(p for _, p in self.items)\n" +
      "        return gross - self.discount\n" +
      "\n" +
      "\n" +
      "o = Order(\"Huda\", discount=2)\n" +
      "o.add_item(\"juice\", 6)\n" +
      "o.add_item(\"bread\", 4)\n" +
      "print(o.net_total())",
    steps: [
      { line: 15, vars: { "Order": "<class>" },
        note: { en: "<code>discount=2</code> is passed by name; <code>customer</code> by position.",
                ar: "<code>discount=2</code> تُمرَّر بالاسم؛ و<code>customer</code> بالموضع." } },
      { line: 3, vars: { "self": "<Order object>", "customer": "'Huda'", "discount": "2" },
        scope: { en: "<code>Order.__init__</code>", ar: "<code>Order.__init__</code>" },
        note: { en: "Three assignments are about to run. Until all three finish, the object is incomplete &mdash; but no other code can see it yet.",
                ar: "ثلاثة إسنادات ستُنفَّذ. وحتى تنتهي الثلاثة يكون الكائن ناقصًا &mdash; لكن لا يراه أي كود آخر بعد." } },
      { line: 4, vars: { "self": "Order(customer='Huda')", "customer": "'Huda'", "discount": "2" },
        scope: { en: "<code>Order.__init__</code>", ar: "<code>Order.__init__</code>" } },
      { line: 5, vars: { "self": "Order(customer='Huda', discount=2)", "customer": "'Huda'", "discount": "2" },
        scope: { en: "<code>Order.__init__</code>", ar: "<code>Order.__init__</code>" },
        note: { en: "The important one: <code>items</code> is created here, as a <strong>fresh</strong> empty list, for this order only.",
                ar: "الأهم: تُنشأ <code>items</code> هنا، قائمةً فارغة <strong>جديدة</strong>، لهذه الفاتورة وحدها." } },
      { line: 16, vars: { "o": "Order(customer='Huda', discount=2, items=[])" },
        note: { en: "<code>o</code> exists and already has all three attributes. There is no window in which <code>o.items</code> is missing.",
                ar: "<code>o</code> موجود ويملك الخصائص الثلاث كلها. فلا توجد لحظة تكون فيها <code>o.items</code> مفقودة." } },
      { line: 8, vars: { "o": "Order(customer='Huda', discount=2, items=[])", "self": "o", "name": "'juice'", "price": "6" },
        scope: { en: "<code>Order.add_item</code>", ar: "<code>Order.add_item</code>" },
        note: { en: "<code>append</code> never has to ask whether the key exists, because <code>__init__</code> already answered that.",
                ar: "لا تحتاج <code>append</code> أن تسأل هل المفتاح موجود، لأن <code>__init__</code> أجابت ذلك أصلًا." } },
      { line: 17, vars: { "o": "Order(customer='Huda', discount=2, items=[('juice', 6)])" } },
      { line: 8, vars: { "o": "Order(customer='Huda', discount=2, items=[('juice', 6)])", "self": "o", "name": "'bread'", "price": "4" },
        scope: { en: "<code>Order.add_item</code>", ar: "<code>Order.add_item</code>" } },
      { line: 18, vars: { "o": "Order(customer='Huda', discount=2, items=[('juice', 6), ('bread', 4)])" } },
      { line: 11, vars: { "o": "Order(customer='Huda', discount=2, items=[('juice', 6), ('bread', 4)])", "self": "o" },
        scope: { en: "<code>Order.net_total</code>", ar: "<code>Order.net_total</code>" },
        note: { en: "The total is computed on demand, not stored. Nothing can be stale.",
                ar: "يُحسب الإجمالي عند الطلب لا يُخزَّن. فلا شيء يمكن أن يتقادم." } },
      { line: 12, vars: { "o": "Order(customer='Huda', discount=2, items=[('juice', 6), ('bread', 4)])", "self": "o", "gross": "10" },
        scope: { en: "<code>Order.net_total</code>", ar: "<code>Order.net_total</code>" } },
      { line: 18, vars: { "o": "Order(customer='Huda', discount=2, items=[('juice', 6), ('bread', 4)])" },
        out: "8",
        note: { en: "10 gross minus a discount of 2. Change the discount and the next call recomputes; there is no second copy to update.",
                ar: "10 إجمالًا ناقص خصم 2. غيّر الخصم ويعيد الاستدعاء التالي الحساب؛ فلا نسخة ثانية تحدّثها." } }
    ]
  },

  "t-mutable-default": {
    id: "t-mutable-default",
    title: { en: "3 &middot; The shared default list",
             ar: "3 &middot; القائمة الافتراضية المشتركة" },
    lede: { en: "The most expensive two characters in Python: items=[] in a def line. Two orders, one list.",
            ar: "أغلى حرفين في بايثون: items=[] في سطر def. فاتورتان وقائمة واحدة." },
    code:
      "class Order:\n" +
      "    def __init__(self, customer, items=[]):\n" +
      "        self.customer = customer\n" +
      "        self.items = items\n" +
      "\n" +
      "    def add_item(self, name):\n" +
      "        self.items.append(name)\n" +
      "\n" +
      "\n" +
      "a = Order(\"Huda\")\n" +
      "a.add_item(\"juice\")\n" +
      "b = Order(\"Yousef\")\n" +
      "b.add_item(\"bread\")\n" +
      "print(a.customer, a.items)\n" +
      "print(b.customer, b.items)",
    steps: [
      { line: 2, vars: { "Order": "<class>" },
        note: { en: "The <code>def</code> line runs <strong>once</strong>, when the class is defined, and <code>[]</code> is evaluated right now. That one list becomes the default for every future call.",
                ar: "يُنفَّذ سطر <code>def</code> <strong>مرة واحدة</strong> عند تعريف الصنف، وتُقيَّم <code>[]</code> الآن. فتصبح تلك القائمة الواحدة هي الافتراضية لكل استدعاء قادم." } },
      { line: 10, vars: { "Order": "<class>", "<default list>": "[]" },
        note: { en: "The shared list is now sitting on the function object. Nothing has gone wrong yet.",
                ar: "القائمة المشتركة تستقر الآن على كائن الدالة. ولم يحدث خطأ بعد." } },
      { line: 4, vars: { "<default list>": "[]", "self": "<Order object>", "customer": "'Huda'", "items": "[] (the shared one)" },
        scope: { en: "<code>Order.__init__</code>, self = <code>a</code>", ar: "<code>Order.__init__</code>، self = <code>a</code>" },
        note: { en: "No list was passed, so <code>items</code> <em>is</em> the shared default &mdash; not a copy of it.",
                ar: "لم تُمرَّر أي قائمة، فـ <code>items</code> <em>هي</em> الافتراضية المشتركة &mdash; لا نسخة منها." } },
      { line: 11, vars: { "<default list>": "[]", "a": "Order(customer='Huda', items=[])" },
        note: { en: "<code>a.items</code> and the default are the same object in memory.",
                ar: "<code>a.items</code> والافتراضية هما الكائن نفسه في الذاكرة." } },
      { line: 7, vars: { "<default list>": "[]", "a": "Order(customer='Huda', items=[])", "self": "a", "name": "'juice'" },
        scope: { en: "<code>Order.add_item</code>, self = <code>a</code>", ar: "<code>Order.add_item</code>، self = <code>a</code>" } },
      { line: 12, vars: { "<default list>": "['juice']", "a": "Order(customer='Huda', items=['juice'])" },
        note: { en: "Appending through <code>a</code> changed the shared default too, because they are one list.",
                ar: "الإضافة عبر <code>a</code> غيّرت الافتراضية المشتركة أيضًا، لأنهما قائمة واحدة." } },
      { line: 4, vars: { "<default list>": "['juice']", "a": "Order(customer='Huda', items=['juice'])", "self": "<Order object>", "customer": "'Yousef'", "items": "['juice'] (the shared one)" },
        scope: { en: "<code>Order.__init__</code>, self = <code>b</code>", ar: "<code>Order.__init__</code>، self = <code>b</code>" },
        note: { en: "Here is the bug arriving. The second order's default is not empty &mdash; it already contains Huda's juice.",
                ar: "ها هو الخلل يصل. فافتراضية الفاتورة الثانية ليست فارغة &mdash; إنها تحتوي أصلًا على عصير هدى." } },
      { line: 13, vars: { "<default list>": "['juice']", "a": "Order(customer='Huda', items=['juice'])", "b": "Order(customer='Yousef', items=['juice'])" } },
      { line: 7, vars: { "<default list>": "['juice']", "a": "Order(customer='Huda', items=['juice'])", "b": "Order(customer='Yousef', items=['juice'])", "self": "b", "name": "'bread'" },
        scope: { en: "<code>Order.add_item</code>, self = <code>b</code>", ar: "<code>Order.add_item</code>، self = <code>b</code>" } },
      { line: 14, vars: { "<default list>": "['juice', 'bread']", "a": "Order(customer='Huda', items=['juice', 'bread'])", "b": "Order(customer='Yousef', items=['juice', 'bread'])" },
        note: { en: "One append, two orders changed. <code>a.items is b.items</code> is <code>True</code>.",
                ar: "إضافة واحدة، وفاتورتان تغيّرتا. فـ <code>a.items is b.items</code> تساوي <code>True</code>." } },
      { line: 15, vars: { "<default list>": "['juice', 'bread']", "a": "Order(customer='Huda', items=['juice', 'bread'])", "b": "Order(customer='Yousef', items=['juice', 'bread'])" },
        out: "Huda ['juice', 'bread']" },
      { line: 15, vars: { "<default list>": "['juice', 'bread']", "a": "Order(customer='Huda', items=['juice', 'bread'])", "b": "Order(customer='Yousef', items=['juice', 'bread'])" },
        out: "Huda ['juice', 'bread']\nYousef ['juice', 'bread']",
        note: { en: "The fix is <code>items=None</code> in the header and <code>self.items = [] if items is None else items</code> in the body &mdash; then <code>[]</code> is evaluated once per object instead of once per program.",
                ar: "الإصلاح هو <code>items=None</code> في الترويسة و<code>self.items = [] if items is None else items</code> في الجسد &mdash; فتُقيَّم <code>[]</code> مرة لكل كائن بدل مرة لكل برنامج." } }
    ]
  },

  "t-class-attr": {
    id: "t-class-attr",
    title: { en: "4 &middot; Where Python looks for an attribute",
             ar: "4 &middot; أين تبحث بايثون عن الخاصية" },
    lede: { en: "Object first, then class. That single rule explains shadowing, and why editing the class later moves some objects but not others.",
            ar: "الكائن أولًا ثم الصنف. وهذه القاعدة الواحدة تفسّر الحجب، ولماذا يحرّك تعديل الصنف لاحقًا بعض الكائنات لا كلها." },
    code:
      "class Item:\n" +
      "    vat_rate = 0.16\n" +
      "\n" +
      "    def __init__(self, name, price):\n" +
      "        self.name = name\n" +
      "        self.price = price\n" +
      "\n" +
      "    def price_with_vat(self):\n" +
      "        return self.price * (1 + self.vat_rate)\n" +
      "\n" +
      "\n" +
      "juice = Item(\"juice\", 10.0)\n" +
      "bread = Item(\"bread\", 5.0)\n" +
      "print(juice.price_with_vat(), bread.price_with_vat())\n" +
      "juice.vat_rate = 0.0\n" +
      "print(juice.price_with_vat(), bread.price_with_vat())\n" +
      "Item.vat_rate = 0.05\n" +
      "print(juice.price_with_vat(), bread.price_with_vat())",
    steps: [
      { line: 2, vars: {},
        note: { en: "<code>vat_rate</code> is assigned inside the class body, not inside <code>__init__</code>. It belongs to the class &mdash; one value, shared.",
                ar: "تُسنَد <code>vat_rate</code> داخل جسد الصنف لا داخل <code>__init__</code>. فهي للصنف &mdash; قيمة واحدة مشتركة." } },
      { line: 13, vars: { "Item.vat_rate": "0.16", "juice": "Item(name='juice', price=10.0)" },
        note: { en: "Note what is <em>not</em> on the object: <code>juice</code> has <code>name</code> and <code>price</code> only.",
                ar: "لاحظ ما ليس على الكائن: فـ <code>juice</code> يملك <code>name</code> و<code>price</code> فقط." } },
      { line: 14, vars: { "Item.vat_rate": "0.16", "juice": "Item(name='juice', price=10.0)", "bread": "Item(name='bread', price=5.0)" } },
      { line: 9, vars: { "Item.vat_rate": "0.16", "juice": "Item(name='juice', price=10.0)", "bread": "Item(name='bread', price=5.0)", "self": "juice", "self.vat_rate": "0.16 (found on the class)" },
        scope: { en: "<code>Item.price_with_vat</code>, self = <code>juice</code>", ar: "<code>Item.price_with_vat</code>، self = <code>juice</code>" },
        note: { en: "<code>self.vat_rate</code>: Python checks the object, finds nothing, then checks the class and finds 0.16.",
                ar: "<code>self.vat_rate</code>: تفحص بايثون الكائن فلا تجد شيئًا، ثم تفحص الصنف فتجد 0.16." } },
      { line: 15, vars: { "Item.vat_rate": "0.16", "juice": "Item(name='juice', price=10.0)", "bread": "Item(name='bread', price=5.0)" },
        out: "11.6 5.8",
        note: { en: "Both prices used the one shared rate. This is the whole point of a class attribute.",
                ar: "استخدم السعران النسبة المشتركة الواحدة. وهذا كل الغرض من خاصية الصنف." } },
      { line: 16, vars: { "Item.vat_rate": "0.16", "juice": "Item(name='juice', price=10.0, vat_rate=0.0)", "bread": "Item(name='bread', price=5.0)" },
        out: "11.6 5.8",
        note: { en: "The gotcha. <code>juice.vat_rate = 0.0</code> did <strong>not</strong> change the class &mdash; it added a new attribute to <code>juice</code> that now <em>shadows</em> it.",
                ar: "المفاجأة. فـ <code>juice.vat_rate = 0.0</code> لم تغيّر الصنف &mdash; بل أضافت خاصية جديدة إلى <code>juice</code> تحجبه الآن." } },
      { line: 17, vars: { "Item.vat_rate": "0.16", "juice": "Item(name='juice', price=10.0, vat_rate=0.0)", "bread": "Item(name='bread', price=5.0)" },
        out: "11.6 5.8\n10.0 5.8",
        note: { en: "<code>juice</code> is exempt and <code>bread</code> is not. Python found <code>vat_rate</code> on <code>juice</code> and stopped looking.",
                ar: "<code>juice</code> معفى و<code>bread</code> لا. فقد وجدت بايثون <code>vat_rate</code> على <code>juice</code> فتوقفت عن البحث." } },
      { line: 18, vars: { "Item.vat_rate": "0.05", "juice": "Item(name='juice', price=10.0, vat_rate=0.0)", "bread": "Item(name='bread', price=5.0)" },
        out: "11.6 5.8\n10.0 5.8",
        note: { en: "Now the real class attribute changes. Which objects will notice?",
                ar: "الآن تتغير خاصية الصنف الحقيقية. فأي الكائنات ستلاحظ؟" } },
      { line: 18, vars: { "Item.vat_rate": "0.05", "juice": "Item(name='juice', price=10.0, vat_rate=0.0)", "bread": "Item(name='bread', price=5.0)" },
        out: "11.6 5.8\n10.0 5.8\n10.0 5.25",
        note: { en: "<code>bread</code> picked up the new 5% because it never had its own value; <code>juice</code> is permanently detached. One assignment through one object quietly opted it out of every future policy change.",
                ar: "تلقّى <code>bread</code> نسبة 5% الجديدة لأنه لم يملك قيمته الخاصة أبدًا؛ و<code>juice</code> منفصل نهائيًا. فإسناد واحد عبر كائن واحد أخرجه بصمت من كل تغيير سياسة قادم." } }
    ]
  },

  /* ---------------------------------------------------------- lesson 3 */
  "t-property-setter": {
    id: "t-property-setter",
    title: { en: "5 &middot; A setter that refuses",
             ar: "5 &middot; ضابط يرفض" },
    lede: { en: "The rule lives in one place, and it runs on plain assignment — including the assignment inside __init__.",
            ar: "القاعدة تعيش في موضع واحد، وتُنفَّذ على الإسناد العادي — بما في ذلك الإسناد داخل __init__." },
    code:
      "class Student:\n" +
      "    def __init__(self, name, mark=0):\n" +
      "        self.name = name\n" +
      "        self.mark = mark\n" +
      "\n" +
      "    @property\n" +
      "    def mark(self):\n" +
      "        return self._mark\n" +
      "\n" +
      "    @mark.setter\n" +
      "    def mark(self, value):\n" +
      "        if not 0 <= value <= 100:\n" +
      "            raise ValueError(f\"mark out of range: {value}\")\n" +
      "        self._mark = value\n" +
      "\n" +
      "\n" +
      "s = Student(\"Lina\", 70)\n" +
      "s.mark = 85\n" +
      "s.mark = 105\n" +
      "print(s.mark)",
    steps: [
      { line: 17, vars: { "Student": "<class>" },
        note: { en: "Nothing special yet. <code>Student(\"Lina\", 70)</code> calls <code>__init__</code> as usual.",
                ar: "لا شيء خاص بعد. فـ <code>Student(\"Lina\", 70)</code> تستدعي <code>__init__</code> كالعادة." } },
      { line: 4, vars: { "self": "Student(name='Lina')", "name": "'Lina'", "mark": "70" },
        scope: { en: "<code>Student.__init__</code>", ar: "<code>Student.__init__</code>" },
        note: { en: "This looks like a plain assignment, but <code>mark</code> is a property, so it is a method call in disguise.",
                ar: "يبدو هذا إسنادًا عاديًا، لكن <code>mark</code> خاصية، فهو استدعاء دالة متخفّيًا." } },
      { line: 12, vars: { "self": "Student(name='Lina')", "value": "70" },
        scope: { en: "<code>Student.mark</code> setter", ar: "ضابط <code>Student.mark</code>" },
        note: { en: "The validation runs even during construction. An object cannot be born with an illegal mark.",
                ar: "يُنفَّذ التحقّق حتى أثناء البناء. فلا يمكن أن يُولد كائن بعلامة غير قانونية." } },
      { line: 14, vars: { "self": "Student(name='Lina')", "value": "70" },
        scope: { en: "<code>Student.mark</code> setter", ar: "ضابط <code>Student.mark</code>" },
        note: { en: "70 passed the check, so it is stored &mdash; under <code>_mark</code>, the private name the property reads from.",
                ar: "نجحت 70 في الفحص فتُخزَّن &mdash; تحت <code>_mark</code>، الاسم الخاص الذي تقرأ منه الخاصية." } },
      { line: 18, vars: { "s": "Student(name='Lina', _mark=70)" },
        note: { en: "Note the attribute is called <code>_mark</code>. There is no attribute literally named <code>mark</code> &mdash; that name is the property.",
                ar: "لاحظ أن الخاصية تُسمّى <code>_mark</code>. فلا توجد خاصية اسمها <code>mark</code> حرفيًا &mdash; فذلك الاسم هو الخاصية المحسوبة." } },
      { line: 12, vars: { "s": "Student(name='Lina', _mark=70)", "self": "s", "value": "85" },
        scope: { en: "<code>Student.mark</code> setter", ar: "ضابط <code>Student.mark</code>" },
        note: { en: "Same door for outside code as for <code>__init__</code>. There is no second path in.",
                ar: "الباب نفسه للكود الخارجي كما لـ <code>__init__</code>. فلا سبيل ثانٍ للدخول." } },
      { line: 19, vars: { "s": "Student(name='Lina', _mark=85)" },
        note: { en: "85 accepted. Now the illegal one.", ar: "قُبلت 85. والآن غير القانونية." } },
      { line: 12, vars: { "s": "Student(name='Lina', _mark=85)", "self": "s", "value": "105" },
        scope: { en: "<code>Student.mark</code> setter", ar: "ضابط <code>Student.mark</code>" },
        note: { en: "<code>0 &lt;= 105 &lt;= 100</code> is <code>False</code>, so <code>not False</code> &mdash; the <code>if</code> is entered.",
                ar: "<code>0 &lt;= 105 &lt;= 100</code> قيمتها <code>False</code>، فـ <code>not False</code> &mdash; فيُدخَل الـ <code>if</code>." } },
      { line: 13, vars: { "s": "Student(name='Lina', _mark=85)", "self": "s", "value": "105" },
        scope: { en: "<code>Student.mark</code> setter", ar: "ضابط <code>Student.mark</code>" },
        out: "Traceback (most recent call last):\n  File \"x.py\", line 19, in <module>\n    s.mark = 105\nValueError: mark out of range: 105",
        note: { en: "The program stops <strong>on the line that caused it</strong> &mdash; line 19 &mdash; not three screens later in a report. <code>self._mark</code> is never reached, so the object still holds 85: a rejected write leaves the object valid.",
                ar: "يتوقف البرنامج <strong>في السطر الذي سبّبه</strong> &mdash; السطر 19 &mdash; لا بعد ثلاث شاشات في تقرير. ولا يُبلَغ <code>self._mark</code> أبدًا، فيبقى الكائن على 85: فالكتابة المرفوضة تترك الكائن صحيحًا." } }
    ]
  },

  /* ---------------------------------------------------------- lesson 5 */
  "t-super-chain": {
    id: "t-super-chain",
    title: { en: "6 &middot; <code>super()</code> and the two <code>__init__</code>s",
             ar: "6 &middot; <code>super()</code> والمُنشئان" },
    lede: { en: "A subclass adds one field. super() is how it gets the other three without copying them.",
            ar: "الوريث يضيف حقلًا واحدًا. و super() هي كيف يحصل على الثلاثة الأخرى دون نسخها." },
    code:
      "class Courier:\n" +
      "    fee_per_km = 1.5\n" +
      "\n" +
      "    def __init__(self, name, phone):\n" +
      "        self.name = name\n" +
      "        self.phone = phone\n" +
      "        self.deliveries_today = 0\n" +
      "\n" +
      "    def record_delivery(self, km):\n" +
      "        self.deliveries_today += 1\n" +
      "        return km * self.fee_per_km\n" +
      "\n" +
      "\n" +
      "class TruckCourier(Courier):\n" +
      "    fee_per_km = 3.0\n" +
      "\n" +
      "    def __init__(self, name, phone, plate):\n" +
      "        super().__init__(name, phone)\n" +
      "        self.plate = plate\n" +
      "\n" +
      "\n" +
      "t = TruckCourier(\"Samir\", \"0599\", \"A-1234\")\n" +
      "print(t.record_delivery(10), t.deliveries_today)",
    steps: [
      { line: 22, vars: { "Courier.fee_per_km": "1.5", "TruckCourier.fee_per_km": "3.0" },
        note: { en: "Two classes, each with its own <code>fee_per_km</code>. The subclass's value shadows the base's for truck objects.",
                ar: "صنفان، لكلٍّ <code>fee_per_km</code> خاصته. وقيمة الوريث تحجب قيمة الأساس لكائنات الشاحنة." } },
      { line: 18, vars: { "self": "<TruckCourier object>", "name": "'Samir'", "phone": "'0599'", "plate": "'A-1234'" },
        scope: { en: "<code>TruckCourier.__init__</code>", ar: "<code>TruckCourier.__init__</code>" },
        note: { en: "The subclass <code>__init__</code> runs first and immediately delegates upward. Note what <code>self</code> is: a <code>TruckCourier</code>, not a <code>Courier</code>.",
                ar: "تُنفَّذ <code>__init__</code> الوريث أولًا وتفوّض فورًا إلى الأعلى. ولاحظ ما هو <code>self</code>: <code>TruckCourier</code> لا <code>Courier</code>." } },
      { line: 5, vars: { "self": "<TruckCourier object>", "name": "'Samir'", "phone": "'0599'" },
        scope: { en: "<code>Courier.__init__</code>, self is still the truck", ar: "<code>Courier.__init__</code>، و self لا يزال الشاحنة" },
        note: { en: "The base <code>__init__</code> is now running, but it is filling in the <em>same</em> object. <code>super()</code> does not create a second one.",
                ar: "تُنفَّذ الآن <code>__init__</code> الأساس، لكنها تعبّئ <em>الكائن نفسه</em>. فـ <code>super()</code> لا تنشئ كائنًا ثانيًا." } },
      { line: 7, vars: { "self": "TruckCourier(name='Samir', phone='0599')", "name": "'Samir'", "phone": "'0599'" },
        scope: { en: "<code>Courier.__init__</code>", ar: "<code>Courier.__init__</code>" } },
      { line: 19, vars: { "self": "TruckCourier(name='Samir', phone='0599', deliveries_today=0)", "plate": "'A-1234'" },
        scope: { en: "back in <code>TruckCourier.__init__</code>", ar: "عودة إلى <code>TruckCourier.__init__</code>" },
        note: { en: "Back in the subclass, with the three base fields already present. Now it adds its own.",
                ar: "عودة إلى الوريث، والحقول الثلاثة الأساسية موجودة أصلًا. فيضيف الآن حقله." } },
      { line: 23, vars: { "t": "TruckCourier(name='Samir', phone='0599', deliveries_today=0, plate='A-1234')" },
        note: { en: "Four attributes, three of which the subclass never mentioned. Forgetting the <code>super()</code> call is what leaves an object missing them.",
                ar: "أربع خصائص، ثلاث منها لم يذكرها الوريث أبدًا. ونسيان استدعاء <code>super()</code> هو ما يترك الكائن فاقدًا لها." } },
      { line: 10, vars: { "t": "TruckCourier(... deliveries_today=0, plate='A-1234')", "self": "t", "km": "10" },
        scope: { en: "<code>Courier.record_delivery</code>, self = the truck", ar: "<code>Courier.record_delivery</code>، self = الشاحنة" },
        note: { en: "<code>TruckCourier</code> defines no <code>record_delivery</code>, so Python walks up to <code>Courier</code> and runs the inherited one.",
                ar: "لا يعرّف <code>TruckCourier</code> أي <code>record_delivery</code>، فتصعد بايثون إلى <code>Courier</code> وتنفّذ الموروثة." } },
      { line: 11, vars: { "t": "TruckCourier(... deliveries_today=1, plate='A-1234')", "self": "t", "km": "10", "self.fee_per_km": "3.0 (from TruckCourier)" },
        scope: { en: "<code>Courier.record_delivery</code>", ar: "<code>Courier.record_delivery</code>" },
        note: { en: "The key moment. This line lives in <code>Courier</code>, where <code>fee_per_km</code> is 1.5 &mdash; but <code>self</code> is a truck, so the lookup finds 3.0 first. Inherited code reads the subclass's data.",
                ar: "اللحظة المفتاح. فهذا السطر يعيش في <code>Courier</code> حيث <code>fee_per_km</code> تساوي 1.5 &mdash; لكن <code>self</code> شاحنة، فيجد البحث 3.0 أولًا. فالكود الموروث يقرأ بيانات الوريث." } },
      { line: 23, vars: { "t": "TruckCourier(... deliveries_today=1, plate='A-1234')" },
        out: "30.0 1",
        note: { en: "10 km &times; 3.0, not &times; 1.5. If you expected 15.0, the rule to keep is: the method comes from wherever Python finds it, but the data always comes from <code>self</code>.",
                ar: "10 كم &times; 3.0 لا &times; 1.5. وإن توقعت 15.0 فالقاعدة التي تحفظها: الدالة تأتي من حيث تجدها بايثون، أما البيانات فتأتي دائمًا من <code>self</code>." } }
    ]
  },

  /* ---------------------------------------------------------- lesson 6 */
  "t-dispatch": {
    id: "t-dispatch",
    title: { en: "7 &middot; One loop, three different answers",
             ar: "7 &middot; حلقة واحدة، ثلاثة أجوبة مختلفة" },
    lede: { en: "No if, no elif, no isinstance. The loop body is written once and never changes when a fourth visit type arrives.",
            ar: "لا if ولا elif ولا isinstance. جسد الحلقة مكتوب مرة واحدة ولا يتغير عند وصول نوع زيارة رابع." },
    code:
      "class Visit:\n" +
      "    base_fee = 60.0\n" +
      "\n" +
      "    def __init__(self, patient):\n" +
      "        self.patient = patient\n" +
      "\n" +
      "    def fee(self):\n" +
      "        return self.base_fee\n" +
      "\n" +
      "\n" +
      "class FollowUpVisit(Visit):\n" +
      "    def fee(self):\n" +
      "        return 0.0\n" +
      "\n" +
      "\n" +
      "class StudentVisit(Visit):\n" +
      "    def fee(self):\n" +
      "        return self.base_fee * 0.65\n" +
      "\n" +
      "\n" +
      "day = [Visit(\"Rami\"), FollowUpVisit(\"Huda\"), StudentVisit(\"Lina\")]\n" +
      "total = 0.0\n" +
      "for v in day:\n" +
      "    total = total + v.fee()\n" +
      "print(total)",
    steps: [
      { line: 21, vars: {},
        note: { en: "Three classes, three <code>fee</code> methods. Two of them override the base.",
                ar: "ثلاثة أصناف وثلاث دوال <code>fee</code>. واثنتان منها تعيدان تعريف الأساس." } },
      { line: 22, vars: { "day": "[Visit('Rami'), FollowUpVisit('Huda'), StudentVisit('Lina')]" },
        note: { en: "One list holding three different types. A list does not care.",
                ar: "قائمة واحدة تحمل ثلاثة أنواع مختلفة. والقائمة لا تبالي." } },
      { line: 24, vars: { "day": "[3 visits]", "total": "0.0", "v": "Visit('Rami')" },
        note: { en: "First iteration. <code>v.fee()</code> is about to be looked up on a plain <code>Visit</code>.",
                ar: "الدورة الأولى. و<code>v.fee()</code> ستُبحث على <code>Visit</code> عادي." } },
      { line: 8, vars: { "day": "[3 visits]", "total": "0.0", "v": "Visit('Rami')", "self": "v" },
        scope: { en: "<code>Visit.fee</code>", ar: "<code>Visit.fee</code>" },
        note: { en: "No override, so the base method runs and returns 60.0.",
                ar: "لا إعادة تعريف، فتُنفَّذ دالة الأساس وتُعيد 60.0." } },
      { line: 24, vars: { "day": "[3 visits]", "total": "60.0", "v": "FollowUpVisit('Huda')" },
        note: { en: "Second iteration, and the <strong>same line of code</strong> as before.",
                ar: "الدورة الثانية، و<strong>سطر الكود نفسه</strong> كما قبل." } },
      { line: 13, vars: { "day": "[3 visits]", "total": "60.0", "v": "FollowUpVisit('Huda')", "self": "v" },
        scope: { en: "<code>FollowUpVisit.fee</code>", ar: "<code>FollowUpVisit.fee</code>" },
        note: { en: "Python found <code>fee</code> on <code>FollowUpVisit</code> first and stopped. The base version never runs.",
                ar: "وجدت بايثون <code>fee</code> على <code>FollowUpVisit</code> أولًا فتوقفت. فلا تُنفَّذ نسخة الأساس أبدًا." } },
      { line: 24, vars: { "day": "[3 visits]", "total": "60.0", "v": "StudentVisit('Lina')" },
        note: { en: "Third iteration. Same line again.", ar: "الدورة الثالثة. السطر نفسه مرة أخرى." } },
      { line: 18, vars: { "day": "[3 visits]", "total": "60.0", "v": "StudentVisit('Lina')", "self": "v", "self.base_fee": "60.0 (inherited)" },
        scope: { en: "<code>StudentVisit.fee</code>", ar: "<code>StudentVisit.fee</code>" },
        note: { en: "An override that still uses the inherited <code>base_fee</code>: 60.0 &times; 0.65 = 39.0. Change the base fee once and this discount follows it.",
                ar: "إعادة تعريف لا تزال تستخدم <code>base_fee</code> الموروثة: 60.0 &times; 0.65 = 39.0. غيّر أجر الأساس مرة ويتبعه هذا الخصم." } },
      { line: 25, vars: { "day": "[3 visits]", "total": "99.0" },
        note: { en: "Three different fees, one loop body, zero type checks.",
                ar: "ثلاثة أجور مختلفة، وجسد حلقة واحد، وصفر فحوص نوع." } },
      { line: 25, vars: { "day": "[3 visits]", "total": "99.0" },
        out: "99.0",
        note: { en: "Adding a fourth kind of visit means writing one class. Line 24 is not edited, re-read or re-tested.",
                ar: "إضافة نوع زيارة رابع تعني كتابة صنف واحد. ولا يُعدَّل السطر 24 ولا يُعاد قراءته ولا اختباره." } }
    ]
  },

  /* ---------------------------------------------------------- lesson 7 */
  "t-composition": {
    id: "t-composition",
    title: { en: "8 &middot; A ticket that holds a job",
             ar: "8 &middot; تذكرة تمسك بعمل" },
    lede: { en: "The capstone's core move: the ticket does not inherit from the repair, it holds one and asks it questions.",
            ar: "الحركة الجوهرية في المشروع الختامي: التذكرة لا ترث من الإصلاح، بل تمسك بواحد وتسأله." },
    code:
      "class ScreenJob:\n" +
      "    labour = 40.0\n" +
      "\n" +
      "    def __init__(self, parts):\n" +
      "        self.parts = parts\n" +
      "\n" +
      "    def subtotal(self):\n" +
      "        return self.parts + self.labour\n" +
      "\n" +
      "\n" +
      "class Ticket:\n" +
      "    def __init__(self, tid, job):\n" +
      "        self.tid = tid\n" +
      "        self.job = job\n" +
      "        self._status = \"intake\"\n" +
      "\n" +
      "    @property\n" +
      "    def quote(self):\n" +
      "        return self.job.subtotal()\n" +
      "\n" +
      "\n" +
      "job = ScreenJob(120.0)\n" +
      "t = Ticket(\"T-1\", job)\n" +
      "print(t.quote)",
    steps: [
      { line: 22, vars: {},
        note: { en: "The job is built first, on its own. It knows nothing about tickets.",
                ar: "يُبنى العمل أولًا بمفرده. ولا يعرف شيئًا عن التذاكر." } },
      { line: 23, vars: { "job": "ScreenJob(parts=120.0)" },
        note: { en: "A finished object is about to be handed to another object's <code>__init__</code> as an ordinary argument.",
                ar: "كائن مكتمل سيُسلَّم إلى <code>__init__</code> كائن آخر وسيطًا عاديًا." } },
      { line: 14, vars: { "job": "ScreenJob(parts=120.0)", "self": "Ticket(tid='T-1')", "tid": "'T-1'", "job (param)": "the same ScreenJob" },
        scope: { en: "<code>Ticket.__init__</code>", ar: "<code>Ticket.__init__</code>" },
        note: { en: "<code>self.job = job</code> stores a reference, not a copy. One repair, pointed at from two names.",
                ar: "<code>self.job = job</code> تخزّن مرجعًا لا نسخة. فإصلاح واحد يُشار إليه من اسمين." } },
      { line: 15, vars: { "job": "ScreenJob(parts=120.0)", "self": "Ticket(tid='T-1', job=ScreenJob(...))", "tid": "'T-1'" },
        scope: { en: "<code>Ticket.__init__</code>", ar: "<code>Ticket.__init__</code>" },
        note: { en: "The ticket adds the one field that is genuinely its own: the status, kept private behind an underscore.",
                ar: "تضيف التذكرة الحقل الذي يملكها حقًا: الحالة، محفوظةً خاصةً خلف شرطة سفلية." } },
      { line: 24, vars: { "job": "ScreenJob(parts=120.0)", "t": "Ticket(tid='T-1', job=ScreenJob(parts=120.0), _status='intake')" },
        note: { en: "A ticket <em>has a</em> job. It is not a kind of job, so it does not inherit from one.",
                ar: "التذكرة <em>لها</em> عمل. وهي ليست نوعًا من العمل، فلا ترث منه." } },
      { line: 19, vars: { "t": "Ticket(tid='T-1', job=ScreenJob(...), _status='intake')", "self": "t" },
        scope: { en: "<code>Ticket.quote</code> (a property)", ar: "<code>Ticket.quote</code> (خاصية)" },
        note: { en: "<code>t.quote</code> with no brackets, because <code>quote</code> is a property. It immediately delegates.",
                ar: "<code>t.quote</code> بلا قوسين، لأن <code>quote</code> خاصية. وتفوّض فورًا." } },
      { line: 8, vars: { "t": "Ticket(...)", "self": "the ScreenJob", "self.parts": "120.0", "self.labour": "40.0 (from the class)" },
        scope: { en: "<code>ScreenJob.subtotal</code>, self = the job", ar: "<code>ScreenJob.subtotal</code>، self = العمل" },
        note: { en: "<code>self</code> switched objects. Inside here, <code>self</code> is the repair &mdash; the ticket is not reachable, and does not need to be.",
                ar: "تغيّر كائن <code>self</code>. فهنا <code>self</code> هو الإصلاح &mdash; والتذكرة غير قابلة للوصول، ولا حاجة إليها." } },
      { line: 24, vars: { "t": "Ticket(tid='T-1', job=ScreenJob(parts=120.0), _status='intake')" },
        out: "160.0",
        note: { en: "120 parts + 40 labour. The ticket never read <code>parts</code> or <code>labour</code>; swap in a <code>WaterJob</code> and line 19 is unchanged. That is the composition payoff.",
                ar: "120 قطعًا + 40 عملًا. ولم تقرأ التذكرة <code>parts</code> ولا <code>labour</code> أبدًا؛ استبدل <code>WaterJob</code> ويبقى السطر 19 بلا تغيير. وهذا مردود التركيب." } }
    ]
  }
});
