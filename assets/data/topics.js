/* ============================================================
   Topic registry.

   Every question labels the topics it covers; these entries turn
   those labels into links that land on the heading that teaches
   the idea. `href` is a heading id injected by
   tools/add_anchor_ids.py (l<lesson>-h<n> for h2, -s<n> for h3),
   or a page id for whole-page targets.
   ============================================================ */
/* Extend, never replace: a later chapter adds its own file, and a bare
   assignment here would silently drop whichever file loaded first. */
window.OOPTopics = window.OOPTopics || {};

Object.assign(window.OOPTopics, {
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

  /* ---- chapter 2, lesson 8 ---- */
  "no-memory":       { href: "l8-h1", en: "a step that forgets", ar: "خطوة تنسى" },
  "step-memory":     { href: "l8-s3", en: "state stored by fit", ar: "الحالة التي تخزّنها fit" },
  "fit-contract":    { href: "l8-s3", en: "the fit/transform contract", ar: "عقد fit/transform" },
  "strategy":        { href: "l8-s5", en: "one class per strategy", ar: "صنف لكل استراتيجية" },
  "factory":         { href: "l8-s6", en: "factory", ar: "المصنع" },
  "step-abc":        { href: "l8-s7", en: "the Step abstract base", ar: "الأساس المجرّد Step" },
  "template-method": { href: "l8-s7", en: "template method", ar: "الدالة القالب" },
  "encoder-state":   { href: "l8-s8", en: "encoding words", ar: "ترميز الكلمات" },

  /* ---- chapter 2, lesson 9 ---- */
  "order-rule":      { href: "l9-h1", en: "the order is a rule", ar: "الترتيب قاعدة" },
  "pipeline":        { href: "l9-s3", en: "Pipeline", ar: "المسار" },
  "composite":       { href: "l9-s4", en: "is-a and has-a at once", ar: "«هو» و«له» معًا" },
  "decorator":       { href: "l9-h2", en: "decorator", ar: "المزخرِف" },
  "fit-leak":        { href: "l9-s6", en: "fit on training rows only", ar: "التدريب على صفوف التدريب وحدها" },
  "pattern-cost":    { href: "l9-s7", en: "what the pattern costs", ar: "ما يكلّفه النمط" },

  /* ---- appendix A3: machine-learning vocabulary (self-study) ---- */
  "ml-model":      { href: "a3-h1", en: "what a model is", ar: "ما النموذج" },
  "ml-data":       { href: "a3-h2", en: "features and labels", ar: "السمات والأهداف" },
  "ml-fit":        { href: "a3-h4", en: "what fit stores", ar: "ما تخزّنه fit" },
  "ml-transform":  { href: "a3-h5", en: "transform vs predict", ar: "transform مقابل predict" },
  "ml-pipeline":   { href: "a3-h6", en: "pipelines", ar: "المسارات" },

  /* ---- chapter 3, lessons 10-13 ---- */
  "array-vs-list":    { href: "l10-h1", en: "array vs list", ar: "المصفوفة مقابل القائمة" },
  "elementwise":      { href: "l10-s3", en: "elementwise arithmetic", ar: "الحساب على العناصر" },
  "dtype":            { href: "l10-h2", en: "one dtype per array", ar: "نوع واحد لكل مصفوفة" },
  "int-truncate":     { href: "l10-s4", en: "integer arrays truncate", ar: "المصفوفات الصحيحة تبتر" },
  "shape":            { href: "l10-s5", en: "shape", ar: "الشكل" },
  "array-create":     { href: "l10-s6", en: "zeros, arange, linspace", ar: "zeros و arange و linspace" },
  "view-copy":        { href: "l11-h1", en: "views vs copies", ar: "النوافذ مقابل النسخ" },
  "index-2d":         { href: "l11-h2", en: "indexing a table", ar: "فهرسة الجدول" },
  "copy-rules":       { href: "l11-s3", en: "which indexing copies", ar: "أي فهرسة تنسخ" },
  "broadcast-rule":   { href: "l12-s1", en: "the broadcasting rule", ar: "قاعدة البثّ" },
  "broadcast-shapes": { href: "l12-s2", en: "row and column shapes", ar: "شكلا الصفّ والعمود" },
  "broadcast-trap":   { href: "l12-h2", en: "the shape that fits wrongly", ar: "الشكل الذي ينطبق خطأً" },
  "newaxis":          { href: "l12-s4", en: "[:, None]", ar: "[:, None]" },
  "axis":             { href: "l13-h1", en: "axis=0 and axis=1", ar: "axis=0 و axis=1" },
  "keepdims":         { href: "l13-s1", en: "keepdims", ar: "keepdims" },
  "mask":             { href: "l13-h2", en: "boolean masks", ar: "الأقنعة المنطقية" },
  "mask-and-or":      { href: "l13-s2", en: "& and | not and/or", ar: "& و | لا and/or" },
  "mask-rows":        { href: "l13-s3", en: "selecting rows with a mask", ar: "اختيار الصفوف بقناع" },
  "where":            { href: "l13-s4", en: "np.where", ar: "np.where" },
  "nan-array":        { href: "l13-s5", en: "nan in an array", ar: "nan في المصفوفة" },

  /* ---- appendix A4: numbers in a computer (self-study) ---- */
  "num-int":     { href: "a4-h1", en: "integers and overflow", ar: "الأعداد الصحيحة والطفحان" },
  "num-float":   { href: "a4-h2", en: "decimals are approximate", ar: "العشرية تقريبية" },
  "num-float32": { href: "a4-h3", en: "float32 vs float64", ar: "float32 مقابل float64" },
  "num-nan":     { href: "a4-h4", en: "nan", ar: "nan" },
  "num-money":   { href: "a4-h5", en: "choosing a dtype", ar: "اختيار النوع" },

  /* ---- lesson 7 ---- */
  "design-cost":     { href: "l7-h4", en: "cost of the next change", ar: "ثمن التغيير القادم" },
  "when-not-oop":    { href: "l7-s2", en: "when not to use classes", ar: "متى لا تستخدم الأصناف" },
  "capstone":        { href: "lesson-07", en: "the capstone program", ar: "المشروع الختامي" },

  /* ---- chapter 4, lessons 14-16 ---- */
  "dot":            { href: "l14-s2", en: "the dot product", ar: "الضرب القياسي" },
  "dot-spellings":  { href: "l14-s3", en: "@ vs np.dot vs (a*b).sum()", ar: "@ مقابل np.dot ومقابل (a*b).sum()" },
  "norm":           { href: "l14-s4", en: "the norm: length of a vector", ar: "المعيار: طول المتجه" },
  "distance":       { href: "l14-s5", en: "distance between vectors", ar: "المسافة بين المتجهات" },
  "scale-distance": { href: "l14-s6", en: "units decide the distance", ar: "الوحدات تقرّر المسافة" },
  "matmul":         { href: "l15-s2", en: "matrix multiplication", ar: "ضرب المصفوفات" },
  "shape-rule":     { href: "l15-s3", en: "the (m, n) @ (n, p) rule", ar: "قاعدة (m, n) @ (n, p)" },
  "star-vs-at":     { href: "l15-s4", en: "* against @", ar: "* مقابل @" },
  "transpose":      { href: "l15-s5", en: "transpose", ar: "المنقول" },
  "transpose-1d":   { href: "l15-s6", en: ".T on a 1-D array", ar: "‎.T على مصفوفة أحادية" },
  "matmul-order":   { href: "l15-s7", en: "order matters", ar: "الترتيب يهمّ" },
  "linear-model":   { href: "l15-s8", en: "X @ w + b", ar: "X @ w + b" },
  "vectorise":      { href: "l16-h1", en: "removing a loop", ar: "إزالة الحلقة" },
  "vector-recipe":  { href: "l16-s3", en: "the conversion recipe", ar: "وصفة التحويل" },
  "loop-ok":        { href: "l16-s4", en: "when to keep the loop", ar: "متى تُبقي الحلقة" },
  "rng-seed":       { href: "l16-s5", en: "default_rng and the seed", ar: "default_rng والبذرة" },
  "rng-draws":      { href: "l16-s6", en: "integers, normal, permutation", ar: "integers و normal و permutation" },
  "split":          { href: "l16-s7", en: "a reproducible split", ar: "قسمة قابلة للتكرار" },
  "rng-legacy":     { href: "l16-s8", en: "why not np.random.seed", ar: "لماذا لا np.random.seed" },

  /* ---- appendix A5: reading mathematical notation (self-study) ---- */
  "note-index":  { href: "a5-h1", en: "subscripts and counting from 1", ar: "الدلائل والعدّ من 1" },
  "note-sigma":  { href: "a5-h2", en: "\u03a3 is a sum", ar: "\u03a3 مجموع" },
  "note-vector": { href: "a5-h3", en: "a vector as a column", ar: "المتجه عمودًا" },
  "note-matrix": { href: "a5-h4", en: "two subscripts: row then column", ar: "دليلان: الصفّ ثم العمود" },
  "note-greek":  { href: "a5-h5", en: "the Greek letters used here", ar: "الحروف اليونانية المستعملة هنا" },
  "note-table":  { href: "a5-h6", en: "notation to NumPy", ar: "من الرموز إلى نمباي" },

  /* ---- appendix A6: vectors and matrices (self-study) ---- */
  "la-vector":    { href: "a6-h1", en: "what a vector is", ar: "ما المتجه" },
  "la-scale":     { href: "a6-h2", en: "adding and scaling vectors", ar: "جمع المتجهات وتحجيمها" },
  "la-dot":       { href: "a6-h3", en: "the dot product, explained", ar: "الضرب القياسي مشروحًا" },
  "la-norm":      { href: "a6-h4", en: "length and distance", ar: "الطول والمسافة" },
  "la-matrix":    { href: "a6-h5", en: "a matrix as a table and a machine", ar: "المصفوفة جدولًا وآلة" },
  "la-matmul":    { href: "a6-h6", en: "the row-by-column rule", ar: "قاعدة الصفّ في العمود" },
  "la-transpose": { href: "a6-h7", en: "transpose, explained", ar: "المنقول مشروحًا" },
  "la-inverse":   { href: "a6-h8", en: "identity and inverse", ar: "المحايدة والمعكوس" },
  "la-rank":      { href: "a6-h9", en: "rank and singular matrices", ar: "الرتبة والمصفوفات الشاذة" },

  /* ---- chapter 5: np.linalg ---- */
  "system":        { href: "l17-h1", en: "a system as a matrix and a vector", ar: "النظام مصفوفةً ومتجهًا" },
  "layout":        { href: "l17-s2", en: "rows are equations, columns are unknowns", ar: "الصفوف معادلات والأعمدة مجاهيل" },
  "solve":         { href: "l17-s3", en: "np.linalg.solve", ar: "np.linalg.solve" },
  "allclose":      { href: "l17-s4", en: "checking a solution with allclose", ar: "فحص الحل بـ allclose" },
  "inv-vs-solve":  { href: "l17-s5", en: "solve rather than inv", ar: "solve لا inv" },
  "singular":      { href: "l17-s6", en: "LinAlgError: Singular matrix", ar: "خطأ المصفوفة الشاذة" },
  "ill-cond":      { href: "l17-s7", en: "the nearly singular system that answers", ar: "النظام الذي يكاد يشذّ ويجيب" },
  "cond":          { href: "l17-s8", en: "the condition number", ar: "عدد الحالة" },
  "overdetermined":{ href: "l18-h1", en: "more equations than unknowns", ar: "معادلات أكثر من المجاهيل" },
  "intercept":     { href: "l18-s1", en: "the column of ones", ar: "عمود الآحاد" },
  "drop-rows":     { href: "l18-s2", en: "what dropping rows costs", ar: "ثمن حذف الصفوف" },
  "lstsq":         { href: "l18-s3", en: "np.linalg.lstsq", ar: "np.linalg.lstsq" },
  "residuals":     { href: "l18-s4", en: "residuals and what they show", ar: "البواقي وما تُظهره" },
  "rank-check":    { href: "l18-s5", en: "matrix_rank against the column count", ar: "الرتبة مقابل عدد الأعمدة" },
  "det":           { href: "l18-s6", en: "why det is not a singularity test", ar: "لماذا ليس المحدِّد فحصًا للشذوذ" },
  "inverse-use":   { href: "l18-s7", en: "when an inverse is the thing you want", ar: "متى يكون المعكوس مرادك" },
  "more-columns":  { href: "l18-h3", en: "a better fit is not a better model", ar: "المواءمة الأفضل ليست النموذج الأفضل" },

});
