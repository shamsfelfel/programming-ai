# Programming for AI

A bilingual (English / Arabic) course that takes a student who knows basic
Python and walks them to the point of reading and writing machine-learning
code. It is a static site with no server, no framework and no network request
at run time — open it once and it works with the network off, and the browser
will offer to install it as an app.

**Read it:** <https://shamsfelfel.github.io/programming-ai/>

## What is in it

Four chapters of the eleven, and the appendices they lean on. Sixteen lessons,
one per 90-minute lecture.

| | Chapter | Lessons | Exercises | Questions | Traced programs |
|---|---|--:|--:|--:|--:|
| 1 | Object-Oriented Python | 7 | 28 | 144 | 8 |
| 2 | OOP Design Patterns for ML | 2 | 6 | 56 | 4 |
| 3 | NumPy Fundamentals | 4 | 12 | 88 | 4 |
| 4 | NumPy for ML Math | 3 | 9 | 72 | 3 |
| — | Appendices A3–A6 | 4 | — | 30 | — |
| | **Total** | **16** | **55** | **390** | **19** |

Every lesson opens with working code that hurts — code that duplicates, breaks
on change, cannot be reused, or quietly returns the wrong number — and rebuilds
it with the one idea that fixes that exact pain.

- **Chapter 1** — objects, state, encapsulation, abstraction, inheritance
  against composition, polymorphism, and a capstone written twice.
- **Chapter 2** — strategy, factory, pipeline and decorator, each arriving
  because a plain function has just failed without raising.
- **Chapter 3** — arrays, views that are not copies, broadcasting, axes and
  masks: four ways NumPy is wrong without saying so.
- **Chapter 4** — the dot product, distance, `@` and the shape rule, removing
  a loop, and random numbers you can repeat tomorrow. Its spine is one
  clinic example where the patient most similar to a feverish new arrival
  turns out to be the only one with no fever, because nobody scaled the
  columns.
- **Appendices A3–A6** — the vocabulary of machine learning without the
  mathematics, numbers in a computer, reading mathematical notation, and the
  linear algebra the course actually uses. Self-study, never examined, and
  outside the lecture budget: a lesson states a result and links here rather
  than deriving it.

There is a test after every lesson and two at the end of every chapter — one
for the core ideas, one for the harder corners. Questions come in eleven
forms — true/false, multiple choice, choose-all, fill in the blank, put in
order, match the pairs, find the error, complete the code, compare two
versions, write the output, and trace a value — and each one carries chips for
its difficulty and the topics it covers, with every topic linking back to the
paragraph that teaches it. Explanation and worked solution are collapsed until
you ask for them.

The **Execution Lab** steps through a program one line at a time, showing the
current line, the variables as they stand with the one that just changed
flagged, and everything printed so far. Chapter 1 collects its eight programs
on a lab page of its own; the chapters after it put each trace in the lesson
that needs it, at the moment you need to watch it happen.

## Features

- **PWA** — installable on a phone, and the whole course is precached on the
  first visit, so every page opens offline, including ones never visited. When
  a new chapter is published an installed copy says so and offers to reload;
  a deploy it cannot finish downloading is abandoned rather than activated, so
  a bad connection never costs a reader the copy they already have
- **One page per file** — a lesson loads a lesson, not the chapter
- **Light and dark themes**, both designed, following the OS by default
- **English and Arabic** at full parity, with a correct RTL layout
- **A home page, chapter pages, breadcrumbs and a side drawer**, with a jump
  list of the headings on the open page
- **Progress** — pages read, test scores, and where you stopped, kept in the
  browser and nowhere else; nothing is uploaded and there is no account
- Verified at 320, 390, 768 and 1280px in both reading directions

## How it is put together

```
index.html              course home
chapters/               one page per chapter
lessons/                one page per lesson
tests/                  one page per lesson test
exams/                  the two chapter tests
labs/                   the execution lab
appendices/             one page per appendix
assets/css  assets/js   the shared stylesheets and engines
assets/data             question banks, traces, the topic registry
src/content/            the authored chapters, before they are split
build.py                splits src/content into the pages above
scripts/                the service-worker generator and a dev server
e2e/                    the Playwright end-to-end suite
```

The pages are generated and committed. `assets/js/course.js` is the registry
that says which chapters exist, which pages each holds, in what order, and
where each is written to — the drawer, the breadcrumbs, the pager, the home
page, the build, the precache list and the test suite all read it.

## Working on it

```bash
python3 build.py                  # assemble src/content into the pages
python3 scripts/build-sw.py       # regenerate the precache list in sw.js
python3 tools/verify_chapter.py   # links, assets, metadata, coverage, parity
npm test                          # the end-to-end suite (Playwright)
npm run serve                     # a no-cache server at :8088 for authoring
```

Pages under `index.html`, `chapters/`, `lessons/`, `tests/`, `exams/`,
`labs/` and `appendices/`, along with `assets/js/anchors.js` and `sw.js`, are
**generated** —
never edit them by hand. Sources are in `src/content/` and `assets/`.

- [docs/SPEC.md](docs/SPEC.md) — what every chapter must satisfy
- [docs/SYLLABUS.md](docs/SYLLABUS.md) — the 14-week, 42-lecture plan
- [docs/AUTHORING.md](docs/AUTHORING.md) — how to build the next one

### Testing

`npm test` runs the suite in Chromium at desktop and phone sizes. It walks the
pager through the whole chapter, answers a real question of every widget kind
and checks the grade, steps the execution lab against its authored trace,
flips language and theme and navigates to prove both survived, cuts the network
and loads a page that was never visited online, and checks every page for
sideways overflow at four widths in both reading directions.

```bash
npx playwright install chromium   # once, to fetch the browser
npm test
npm run test:report               # the HTML report of the last run
```

## Roadmap

1. **OOP Foundation** ✅
2. **OOP Design Patterns for ML** ✅
3. **NumPy Fundamentals** ✅
4. **NumPy for ML Math** ✅
5. `np.linalg` and Linear Algebra
6. Pandas Fundamentals
7. Pandas Data Wrangling
8. Pandas Reshaping
9. Encoding and Scaling
10. Missing Data and Pipelines
11. Regression: Derivation and scikit-learn
