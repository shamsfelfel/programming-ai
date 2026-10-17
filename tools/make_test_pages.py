#!/usr/bin/env python3
"""Generate the test, lab and exam pages for chapter 1.

The questions themselves live in src/data/*.js; this only writes the
page wrappers, the prerequisite / what-next links that tie the chapter
together in both directions, and the bank placeholders the engine fills.
"""
import io

OUT = "src/content/chapter-01-tests.html"

LESSONS = [
    ("01", "Objects &amp; Classes", "الكائنات والأصناف"),
    ("02", "State, <code>__init__</code> &amp; Methods", "الحالة والمُنشئ والدوال"),
    ("03", "Encapsulation", "التغليف"),
    ("04", "Abstraction &amp; Clean Interfaces", "التجريد والواجهات"),
    ("05", "Inheritance &amp; Composition", "الوراثة والتركيب"),
    ("06", "Polymorphism &amp; Duck Typing", "تعدد الأشكال وتصنيف البطة"),
    ("07", "Capstone: Two Styles, One Program", "المشروع الختامي: أسلوبان لبرنامج واحد"),
]

# per-lesson: what the test is about, and what to re-read if it goes badly
FOCUS = {
    "01": (
        "attributes, methods, <code>self</code>, and why two objects of the same class never share their values",
        "الخصائص والدوال و<code>self</code>، ولماذا لا يتشارك كائنان من الصنف نفسه قيمهما أبدًا"),
    "02": (
        "<code>__init__</code> as the one correct birth, instance versus class attributes, computed values, and <code>__str__</code>",
        "<code>__init__</code> كالولادة الصحيحة الوحيدة، وخصائص الكائن مقابل خصائص الصنف، والقيم المحسوبة، و<code>__str__</code>"),
    "03": (
        "invariants, the <code>_name</code> convention, <code>@property</code>, setters that validate, and read-only values",
        "الشروط الثابتة، واتفاق <code>_name</code>، و<code>@property</code>، والضوابط التي تتحقّق، والقيم للقراءة فقط"),
    "04": (
        "the public promise versus the private shape, and <code>ABC</code> with <code>@abstractmethod</code>",
        "الوعد العام مقابل الشكل الداخلي، و<code>ABC</code> مع <code>@abstractmethod</code>"),
    "05": (
        "<code>super()</code>, overriding, the fragile base class, and choosing between inheritance and composition",
        "<code>super()</code>، وإعادة التعريف، والصنف الأساس الهشّ، والاختيار بين الوراثة والتركيب"),
    "06": (
        "replacing the <code>if/elif</code> chain, duck typing, and the dunder methods that make your class behave like a built-in",
        "استبدال سلسلة <code>if/elif</code>، وتصنيف البطة، والدوال الخاصة التي تجعل صنفك يتصرّف كنوع مدمج"),
    "07": (
        "reading both programs as designs: which change is cheap in which file, and when a class is the wrong answer",
        "قراءة البرنامجين كتصميمين: أي تغيير رخيص في أي ملف، ومتى يكون الصنف هو الجواب الخطأ"),
}


def test_page(num, en_title, ar_title):
    n = int(num)
    focus_en, focus_ar = FOCUS[num]
    nxt = "%02d" % (n + 1)
    has_next = n < 7

    forward_en = (
        'When this test is green, go on to <a href="#lesson-%s">Lesson %d</a>. '
        'If it is not, the links on each question you missed go straight to the '
        'paragraph that explains it.' % (nxt, n + 1)
        if has_next else
        'That is the last lesson test. Both chapter tests are next: '
        '<a href="#chapter-test-a">Chapter Test A</a> checks that every idea stuck, '
        'and <a href="#chapter-test-b">Chapter Test B</a> makes you combine them.')
    forward_ar = (
        'إذا نجحت في هذا الاختبار فتابع إلى <a href="#lesson-%s">الدرس %d</a>. '
        'وإن لم تنجح فروابط كل سؤال أخطأت فيه تنقلك مباشرة إلى الفقرة التي تشرحه.' % (nxt, n + 1)
        if has_next else
        'ذلك آخر اختبار درس. واختبارا الفصل هما التالي: '
        '<a href="#chapter-test-a">اختبار الفصل أ</a> يفحص أن كل فكرة قد ثبتت، '
        'و<a href="#chapter-test-b">اختبار الفصل ب</a> يجعلك تدمجها معًا.')

    return """
<section class="page" id="test-%(num)s">


  <span class="kicker">Test %(n)d</span>
  <h1><span class="en">Lesson %(n)d Test &mdash; %(en)s</span><span class="ar">اختبار الدرس %(n)d &mdash; %(ar)s</span></h1>

  <p class="lede en">A mixed test on Lesson %(n)d alone: %(fen)s. Every question is labelled with its difficulty and the topics it covers, and each topic links back to the exact paragraph that teaches it.</p>
  <p class="lede ar">اختبار متنوع على الدرس %(n)d وحده: %(far)s. وكل سؤال موسوم بمستوى صعوبته والمواضيع التي يغطيها، وكل موضوع يرتبط بالفقرة التي تعلّمه بالضبط.</p>

  <div class="callout prereq">
    <h4><span class="en">Before you start this test</span><span class="ar">قبل أن تبدأ هذا الاختبار</span></h4>
    <p class="en">Read <a href="#lesson-%(num)s">Lesson %(n)d</a> first and do its exercises. This test assumes nothing from later lessons, so an answer that needs an idea you have not met yet is not expected of you.</p>
    <p class="ar">اقرأ <a href="#lesson-%(num)s">الدرس %(n)d</a> أولًا وأنجز تمارينه. ولا يفترض هذا الاختبار شيئًا من الدروس اللاحقة، فلا يُنتظر منك جواب يحتاج فكرة لم تقابلها بعد.</p>
  </div>

  <div class="assess" data-bank="test-%(num)s" data-mode="test"></div>

  <div class="callout ahead">
    <h4><span class="en">What comes next</span><span class="ar">ما التالي</span></h4>
    <p class="en">%(fwen)s</p>
    <p class="ar">%(fwar)s</p>
  </div>


</section>
""" % {"num": num, "n": n, "en": en_title, "ar": ar_title,
       "fen": focus_en, "far": focus_ar,
       "fwen": forward_en, "fwar": forward_ar}


LAB_TRACES = [
    "t-two-objects", "t-init-order", "t-mutable-default", "t-class-attr",
    "t-property-setter", "t-super-chain", "t-dispatch", "t-composition",
]

LAB = """
<section class="page" id="lab">


  <span class="kicker">Execution Lab</span>
  <h1><span class="en">Execution Lab &mdash; Watch the Code Run</span><span class="ar">مختبر التنفيذ &mdash; شاهد الكود يُنفَّذ</span></h1>

  <p class="lede en">Eight short programs from the chapter, run one line at a time. The highlighted line is the line about to take effect; the panels beside it show the variables as they stand and anything printed so far. Use <strong>Next</strong> to step, <strong>Run</strong> to play it through, the slider to scrub, or click any line to jump to it.</p>
  <p class="lede ar">ثمانية برامج قصيرة من الفصل، تُنفَّذ سطرًا سطرًا. والسطر المظلّل هو السطر الذي سيُنفَّذ؛ واللوحات بجانبه تُظهر المتغيرات كما هي الآن وكل ما طُبع حتى الآن. استخدم <strong>التالي</strong> للتنقّل، و<strong>تشغيل</strong> لتمريره كله، والشريط للتصفّح، أو انقر أي سطر للانتقال إليه.</p>

  <div class="note">
    <h4><span class="en">How to read a trace</span><span class="ar">كيف تقرأ التتبّع</span></h4>
    <p class="en">A value that just changed is highlighted in the variables panel, so you can see <em>which</em> assignment did what. When a method is running, the panel header says whose <code>self</code> you are inside &mdash; that is usually the thing that is hard to believe until you watch it.</p>
    <p class="ar">القيمة التي تغيّرت للتو مظلّلة في لوحة المتغيرات، فترى <em>أي</em> إسناد فعل ماذا. وعندما تكون دالة قيد التنفيذ تقول ترويسة اللوحة داخل <code>self</code> من أنت &mdash; وهذا عادةً ما يصعب تصديقه حتى تشاهده.</p>
  </div>

%(traces)s

  <div class="callout ahead">
    <h4><span class="en">Where this helps most</span><span class="ar">حيث يفيد هذا أكثر</span></h4>
    <p class="en">Come back here whenever a test question about attribute lookup, a shared default list, or <code>super()</code> does not go the way you expected. Then try <a href="#chapter-test-a">Chapter Test A</a>.</p>
    <p class="ar">عُد إلى هنا كلما جاء سؤال اختبار عن البحث في الخصائص أو قائمة افتراضية مشتركة أو <code>super()</code> على غير ما توقعت. ثم جرّب <a href="#chapter-test-a">اختبار الفصل أ</a>.</p>
  </div>


</section>
"""


def exam_page(letter, en_name, ar_name, en_lede, ar_lede, en_pre, ar_pre, en_next, ar_next):
    return """
<section class="page" id="chapter-test-%(l)s">


  <span class="kicker">Chapter Test %(L)s</span>
  <h1><span class="en">Chapter Test %(L)s &mdash; %(en)s</span><span class="ar">اختبار الفصل %(AR)s &mdash; %(ar)s</span></h1>

  <p class="lede en">%(ledeen)s</p>
  <p class="lede ar">%(ledear)s</p>

  <div class="callout prereq">
    <h4><span class="en">Before you start</span><span class="ar">قبل أن تبدأ</span></h4>
    <p class="en">%(preen)s</p>
    <p class="ar">%(prear)s</p>
  </div>

  <div class="assess" data-bank="chapter-test-%(l)s" data-mode="test"></div>

  <div class="callout ahead">
    <h4><span class="en">After this test</span><span class="ar">بعد هذا الاختبار</span></h4>
    <p class="en">%(nxen)s</p>
    <p class="ar">%(nxar)s</p>
  </div>


</section>
""" % {"l": letter, "L": letter.upper(), "AR": "أ" if letter == "a" else "ب",
       "en": en_name, "ar": ar_name, "ledeen": en_lede, "ledear": ar_lede,
       "preen": en_pre, "prear": ar_pre, "nxen": en_next, "nxar": ar_next}


def main():
    parts = ["\n<!-- ===== generated by tools/make_test_pages.py ===== -->\n"]
    for num, en, ar in LESSONS:
        parts.append(test_page(num, en, ar))

    traces = "".join(
        '  <div data-trace-id="%s"></div>\n\n' % t for t in LAB_TRACES)
    parts.append(LAB % {"traces": traces})

    parts.append(exam_page(
        "a", "Core", "الأساسيات",
        "Thirty questions across all seven lessons, at easy and medium difficulty. This is the test that answers one question: did every idea in the chapter actually stick? Each question links to the topic it checks, so a wrong answer tells you exactly which section to re-read.",
        "ثلاثون سؤالًا تمتد على الدروس السبعة كلها، بمستويي السهل والمتوسط. وهذا هو الاختبار الذي يجيب سؤالًا واحدًا: هل ثبتت كل فكرة في الفصل فعلًا؟ وكل سؤال يرتبط بالموضوع الذي يفحصه، فالجواب الخاطئ يقول لك أي قسم تعيد قراءته بالضبط.",
        'Finish all seven lessons and their seven tests first. If a lesson test is still red, do that one again before this &mdash; this test samples all of them and a weak lesson will simply show up here as a run of wrong answers.',
        'أنجز الدروس السبعة واختباراتها السبعة أولًا. وإن كان اختبار درس ما لا يزال متعثرًا فأعده قبل هذا &mdash; فهذا الاختبار يأخذ من كلها، والدرس الضعيف سيظهر هنا سلسلةَ أجوبة خاطئة.',
        'Score 80% or more and go to <a href="#chapter-test-b">Chapter Test B</a>, which stops asking what things mean and starts asking you to combine them. Below 80%, the result panel lists your weak topics with a link each.',
        'إذا حصلت على 80% أو أكثر فانتقل إلى <a href="#chapter-test-b">اختبار الفصل ب</a>، الذي يكفّ عن السؤال عن معاني الأشياء ويبدأ بمطالبتك بدمجها. وتحت 80% تسرد لوحة النتيجة مواضيعك الضعيفة مع رابط لكل منها.'))

    parts.append(exam_page(
        "b", "Advanced", "المتقدم",
        "Thirty harder questions that cross lesson boundaries: a property whose setter is bypassed by inheritance, an abstract base that a subclass half-implements, a dunder method that changes what a built-in function does to your object. Most of these cannot be answered from one lesson alone.",
        "ثلاثون سؤالًا أصعب تعبر حدود الدروس: خاصية يتجاوز ضابطها وراثةٌ ما، وصنف أساس مجرّد ينفّذه الوريث نصف تنفيذ، ودالة خاصة تغيّر ما تفعله دالة مدمجة بكائنك. وأكثرها لا يمكن الجواب عنه من درس واحد.",
        'Pass <a href="#chapter-test-a">Chapter Test A</a> first. These questions assume all seven lessons at once and several of them require you to trace code by hand &mdash; the <a href="#lab">Execution Lab</a> is the place to check your reasoning when you disagree with the answer.',
        'انجح في <a href="#chapter-test-a">اختبار الفصل أ</a> أولًا. فهذه الأسئلة تفترض الدروس السبعة مجتمعة، وعدد منها يطلب منك تتبّع الكود يدويًا &mdash; و<a href="#lab">مختبر التنفيذ</a> هو المكان الذي تتحقّق فيه من استدلالك حين تخالف الجواب.',
        'This is the end of Chapter 1. The next chapter applies these same ideas to machine-learning code &mdash; design patterns written for models and data pipelines &mdash; and it assumes everything here, especially <a href="#l4-h2">abstract base classes</a> and <a href="#l5-s8">the is-a versus has-a decision</a>.',
        'هذه نهاية الفصل 1. ويطبّق الفصل التالي هذه الأفكار نفسها على كود تعلّم الآلة &mdash; أنماط تصميم مكتوبة للنماذج ومسارات البيانات &mdash; ويفترض كل ما هنا، وبخاصة <a href="#l4-h2">الأصناف الأساس المجرّدة</a> و<a href="#l5-s8">قرار «هو» مقابل «له»</a>.'))

    io.open(OUT, "w", encoding="utf-8", newline="\n").write("".join(parts))
    print("wrote %s (%d lines)" % (OUT, "".join(parts).count("\n")))


if __name__ == "__main__":
    main()
