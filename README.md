# Programming for AI

A bilingual (English / Arabic) course that takes a student who knows basic
Python and walks them to the point of reading and writing machine-learning
code. Each chapter is one self-contained, installable web page: no server, no
build step to view it, no network request at run time.

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

- **PWA** — installable on a phone, works offline once opened
- **Light and dark themes**, both designed, following the OS by default
- **English and Arabic** at full parity, with a correct RTL layout
- **Side drawer** with the chapter outline and a jump list for the open page
- Answers and progress saved locally, per test
- Verified at 320, 390, 768 and 1280px in both reading directions

## Working on it

```bash
python3 build.py                  # assemble src/ into index.html
python3 build.py --check          # is the committed index.html current?
python3 tools/verify_chapter.py   # links, metadata, coverage, bilingual parity
```

`index.html` is generated — never edit it by hand. Sources are in `src/`.

- [docs/SPEC.md](docs/SPEC.md) — what every chapter must satisfy
- [docs/AUTHORING.md](docs/AUTHORING.md) — how to build the next one

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
