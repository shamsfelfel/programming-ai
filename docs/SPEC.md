# Course Specification

This is the contract every chapter of **Programming for AI** must satisfy.
Chapter 1 (`Python OOP by Example`) is the reference implementation: when this
document and the built chapter disagree, the chapter is the bug.

Read this before starting a new chapter. Read `docs/AUTHORING.md` for the
mechanics of actually building one.

---

## 0. The course

Eleven chapters, in this order. Each depends on everything before it and on
nothing after it.

| # | Chapter | Status |
|---|---------|--------|
| 1 | OOP Foundation | **done** |
| 2 | OOP Design Patterns for ML | next |
| 3 | NumPy Fundamentals | |
| 4 | NumPy for ML Math | |
| 5 | `np.linalg` and Linear Algebra | |
| 6 | Pandas Fundamentals | |
| 7 | Pandas Data Wrangling | |
| 8 | Pandas Reshaping | |
| 9 | Encoding and Scaling | |
| 10 | Missing Data and Pipelines | |
| 11 | Regression: Derivation and scikit-learn | |

### The audience, stated once

A student who has finished an introductory programming course. They know
variables, lists, dictionaries, loops, functions and f-strings in Python.

They have **not** taken a machine-learning course, a statistics course, or a
data-structures course. This is not a gap to apologise for; it is the level the
material is written to. Two rules follow and they are not negotiable:

- **Every ML idea is explained before it is used.** The first time a chapter
  says "feature", "label", "training set", "overfitting", "loss" or any other
  term of art, it defines it in the running text, in the student's own domain,
  before any code uses it. A term used before it is defined is a defect.
- **Every mathematical derivation lives in an appendix**, not in the lesson
  body. The lesson states the result, says what it means, and links to the
  appendix for the derivation. A student who skips the appendix must still be
  able to finish the lesson and pass its test.

---

## 1. Site

1. **PWA.** Installable, offline-capable, correct on phone and desktop
   browsers. Manifest, service worker, maskable icon. The service worker
   precaches the chapter so it opens with no connection.
2. **Light and dark themes.** Both designed, not one inverted. Theme follows
   the OS on first visit and the student's choice after that, remembered
   across sessions.
3. **English and Arabic.** Full parity: every sentence, question, option,
   explanation, solution and UI label exists in both. Arabic sets
   `dir="rtl"` and the layout must be correct in it, including code blocks,
   which stay LTR.
4. **GitHub Pages.** Hosted from the repository root. No build step on the
   server, no framework, no CDN, no external request at run time.
5. **Modern navigation.** A side drawer listing the whole chapter outline, an
   on-this-page jump list of the current page's headings, previous/next
   paging, a reading-progress bar and a back-to-top control.
6. **Natural colours.** Muted, readable, low-chroma. Slate, sand, clay, sage.
   No neon, no gradients-as-decoration, no colour that only works in one theme.

## 2. Material

1. **Starts from Python basics.** Assume the intro course and nothing more.
2. **Maths in appendices.** As stated in §0.
3. **Coherent in both directions.** Every lesson links *back* to what it
   assumes ("complete Lesson 3 first", "you will want to re-read §2.1") and
   *forward* to where an idea is finished ("properties arrive in Lesson 3").
   Every such claim is a real link to a real anchor.
4. **Something to do every 5–10 minutes of reading.** An exercise, an inline
   question, or a trace to step through. Reading more than two screens without
   one is a defect.
5. **Standard code blocks, easy to copy.** One style, syntax-highlighted, with
   a copy button on every block.
6. **Every lesson ends with a short test.**
7. **Every chapter ends with tests.**
8. **Visualise wherever possible.** Tables, diagrams, flows, charts. Use
   inline SVG or HTML/CSS; if Mermaid is used it must render correctly
   offline, which in practice means pre-rendering it.

## 3. Tests

1. **Full coverage.** Every concept in the chapter is examined somewhere.
2. **Three difficulty levels** — easy, medium, hard — and the shape is
   **one test per lesson plus two tests per chapter**: Chapter Test A (core,
   easy and medium, samples every lesson) and Chapter Test B (advanced, hard,
   crosses lesson boundaries).
3. **Eleven question types**, all of which must appear in every chapter:

   | Type | Key | What it asks |
   |---|---|---|
   | True / false | `tf` | Judge one claim |
   | Multiple choice | `mcq` | One correct option |
   | Choose all that apply | `multi` | Several correct options |
   | Fill in the blank | `fill` | Type the missing token(s) |
   | Put in order | `order` | Sequence steps |
   | Match the pairs | `match` | Pair two columns |
   | Find the error | `error` | Click the offending line |
   | Complete the code | `complete` | Pick/﻿type the missing body |
   | Compare two versions | `compare` | Say how A and B differ |
   | Write the output | `output` | Type exactly what it prints |
   | Trace the value | `trace` | State a variable's value at a point |

4. **Every question is labelled** with its difficulty and the topics it
   covers, and **every topic is a link** to the heading that teaches it.
   **Explanation and solution are both hidden by default.**

## 4. Execution simulation

Any algorithm or program worth tracing gets a step-through simulation: the
current line highlighted, the variables beside it with the one that just
changed flagged, the output so far, and controls to step, play, scrub and
jump. Traces are authored step by step and verified against CPython — never
produced by an interpreter written in JavaScript, which gets the interesting
cases (attribute lookup, aliasing, `super()`) wrong in exactly the places the
simulation exists to explain.

---

## 5. Quality bar

These are the rules that separate a chapter that meets the spec on paper from
one that is actually good.

- **Every code output in a question is verified by running it.** Not reasoned
  about — run, in CPython, with the output pasted back. There is a scratch
  harness for this; use it.
- **Distractors are wrong for a reason the explanation names.** A plausible
  wrong answer that teaches something when you get it wrong is worth four
  obviously-wrong options.
- **Explanations teach, they do not restate the answer.** The useful ones say
  why the tempting wrong answer is tempting, and what rule you should carry
  away.
- **The chapter argues honestly against itself.** Name what each technique
  costs, and the cases where the simpler approach wins. A chapter that only
  advocates is a worse teacher than one that compares.
- **Lessons are grounded in one consistent domain** — Chapter 1 uses a library,
  a clinic, a corner shop, a courier company and a repair shop — and the tests
  reuse those same domains rather than inventing new ones.
- **Arabic is written, not translated.** It should read as if authored in
  Arabic, with correct technical vocabulary and natural phrasing.

## 6. Non-negotiables

- No external network request at run time. No CDN, no web font, no analytics.
- No build step required to view the output: `index.html` is committed.
- Works from `file://` as well as from a server.
- No framework, no bundler, no TypeScript. Vanilla ES5-compatible JavaScript.
- The built chapter is one self-contained HTML file.
- Nothing in the repository identifies which AI model produced it.
