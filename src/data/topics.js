/* ============================================================
   Topic registry.

   Every question labels the topics it covers; these entries turn
   those labels into links that land on the heading that teaches
   the idea. `href` is a heading id injected by
   tools/add_anchor_ids.py (l<lesson>-h<n> for h2, -s<n> for h3),
   or a page id for whole-page targets.
   ============================================================ */
window.OOPTopics = {
  /* ---- lesson 1 ---- */
  "parallel-lists":  { href: "l1-h1", en: "parallel lists", ar: "القوائم المتوازية" },
  "class-vs-object": { href: "l1-s3", en: "class vs object", ar: "الصنف والكائن" },
  "attributes":      { href: "l1-s3", en: "attributes", ar: "الخصائص" },
  "instances":       { href: "l1-s4", en: "separate instances", ar: "كائنات منفصلة" },
  "methods":         { href: "l1-h2", en: "methods", ar: "دوال الكائن" },
  "self":            { href: "l1-s7", en: "self", ar: "self" },
  "dot-access":      { href: "l1-s7", en: "dot access", ar: "الوصول بالنقطة" },

  /* ---- lesson 2 ---- */
  "init":            { href: "l2-h1", en: "__init__", ar: "__init__" },
  "invalid-birth":   { href: "l2-s3", en: "half-built objects", ar: "كائنات ناقصة" },
  "mutable-default": { href: "l2-s4", en: "mutable default argument", ar: "الوسيط الافتراضي القابل للتغيير" },
  "class-attr":      { href: "l2-h2", en: "class attributes", ar: "خصائص الصنف" },
  "attr-lookup":     { href: "l2-s8", en: "attribute lookup order", ar: "ترتيب البحث عن الخصائص" },
  "computed":        { href: "l2-s11", en: "compute instead of store", ar: "الحساب بدل التخزين" },
  "str-repr":        { href: "l2-h3", en: "__str__ and __repr__", ar: "__str__ و __repr__" },

  /* ---- lesson 3 ---- */
  "invariant":       { href: "l3-h1", en: "invariants", ar: "الشروط الثابتة" },
  "underscore":      { href: "l3-h2", en: "the _name convention", ar: "اتفاق _name" },
  "property":        { href: "l3-s3", en: "@property", ar: "@property" },
  "setter":          { href: "l3-s3", en: "setters and validation", ar: "الضابط والتحقّق" },
  "read-only":       { href: "l3-s3", en: "read-only values", ar: "قيم للقراءة فقط" },
  "one-door":        { href: "l3-h2", en: "one door in", ar: "باب واحد للدخول" },

  /* ---- lesson 4 ---- */
  "interface":       { href: "l4-h1", en: "public interface", ar: "الواجهة العامة" },
  "hide-shape":      { href: "l4-s4", en: "hiding the data shape", ar: "إخفاء شكل البيانات" },
  "abc":             { href: "l4-h2", en: "ABC and @abstractmethod", ar: "ABC و @abstractmethod" },
  "early-failure":   { href: "l4-h2", en: "failing early", ar: "الفشل المبكر" },

  /* ---- lesson 5 ---- */
  "inheritance":     { href: "l5-h1", en: "inheritance", ar: "الوراثة" },
  "super":           { href: "l5-h1", en: "super()", ar: "super()" },
  "override":        { href: "l5-h1", en: "overriding", ar: "إعادة التعريف" },
  "fragile-base":    { href: "l5-h2", en: "fragile base class", ar: "الصنف الأساس الهشّ" },
  "composition":     { href: "l5-s6", en: "composition", ar: "التركيب" },
  "is-a-has-a":      { href: "l5-s8", en: "is-a vs has-a", ar: "«هو» مقابل «له»" },

  /* ---- lesson 6 ---- */
  "ifelif":          { href: "l6-h1", en: "the if/elif chain", ar: "سلسلة if/elif" },
  "polymorphism":    { href: "l6-h2", en: "polymorphism", ar: "تعدد الأشكال" },
  "duck-typing":     { href: "l6-s4", en: "duck typing", ar: "تصنيف البطة" },
  "dunder":          { href: "l6-h2", en: "dunder methods", ar: "الدوال الخاصة" },
  "open-closed":     { href: "l6-s6", en: "open to new types", ar: "الانفتاح لأنواع جديدة" },

  /* ---- lesson 7 ---- */
  "design-cost":     { href: "l7-h4", en: "cost of the next change", ar: "ثمن التغيير القادم" },
  "when-not-oop":    { href: "l7-s2", en: "when not to use classes", ar: "متى لا تستخدم الأصناف" },
  "capstone":        { href: "lesson-07", en: "the capstone program", ar: "المشروع الختامي" }
};
