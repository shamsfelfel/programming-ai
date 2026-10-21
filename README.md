# Programming for AI

A bilingual (English / Arabic) course that takes a student who knows basic
Python and walks them to the point of reading and writing machine-learning
code. It is a static site with no server, no framework and no network request
at run time — open it once and it works with the network off, and the browser
will offer to install it as an app.

**Read it:** <https://devraedfelfel.github.io/Programming-AI/>

## Chapter 1 — Object-Oriented Python

Every lesson opens with working code that hurts — code that duplicates, breaks
on change, or cannot be reused — and rebuilds it with the one OOP idea that
fixes that exact pain.

| | |
|---|---|
| Lessons | 7, from objects and classes to a capstone written twice |
| Exercises | 28, each with a worked solution |
| Inline checks | 30 |
| Tests | 9 — one per lesson, plus two chapter tests |
| Questions | 144, every one labelled by difficulty and topic |
| Execution traces | 8 programs, 82 steps, run one line at a time |

Questions come in eleven forms — true/false, multiple choice, choose-all,
fill in the blank, put in order, match the pairs, find the error, complete the
code, compare two versions, write the output, and trace a value — and each one
carries chips for its difficulty and the topics it covers, with every topic
linking back to the paragraph that teaches it. Explanation and worked solution
are collapsed until you ask for them.

The **Execution Lab** steps through the chapter's trickiest programs one line
at a time, showing the current line, the variables as they stand with the one
that just changed flagged, and everything printed so far — the shared default
list, attribute shadowing, `super()` across two `__init__` methods, and
polymorphic dispatch.

## Features

- **PWA** — installable on a phone, and the whole course is precached on the
  first visit, so every page opens offline, including ones never visited
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

Pages under `index.html`, `chapters/`, `lessons/`, `tests/`, `exams/` and
`labs/`, along with `assets/js/anchors.js` and `sw.js`, are **generated** —
never edit them by hand. Sources are in `src/content/` and `assets/`.

- [docs/SPEC.md](docs/SPEC.md) — what every chapter must satisfy
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
2. OOP Design Patterns for ML
3. NumPy Fundamentals
4. NumPy for ML Math
5. `np.linalg` and Linear Algebra
6. Pandas Fundamentals
7. Pandas Data Wrangling
8. Pandas Reshaping
9. Encoding and Scaling
10. Missing Data and Pipelines
11. Regression: Derivation and scikit-learn
