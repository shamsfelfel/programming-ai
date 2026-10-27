# Syllabus — 14 Weeks

**Budget: 14 weeks × 3 lectures × 90 minutes = 42 lectures, 63 contact hours.**

Every lecture below teaches *programming*. Linear algebra, statistics,
calculus and machine-learning theory are **not** in this budget: the students
have not taken those courses, so that material is written as self-study
appendices (§3), linked from the lecture that needs it and read before it.
A student who reads no appendix can still follow every lecture and pass every
lesson test; the appendices explain *why* the code is shaped the way it is.

## 1. Lecture plan

Legend: **◆** built · ◇ to write · ▣ no new material (review or project)

### Part I — Objects (Weeks 1–3)

| Wk | # | Lecture | Material |
|----|---|---------|----------|
| 1 | 1 | Orientation, environment, Python refresher | ▣ App. A1, A2 |
| 1 | 2 | Objects & Classes | ◆ Ch1 L1 |
| 1 | 3 | State, `__init__` & Methods | ◆ Ch1 L2 |
| 2 | 4 | Encapsulation | ◆ Ch1 L3 |
| 2 | 5 | Abstraction & Clean Interfaces | ◆ Ch1 L4 |
| 2 | 6 | Inheritance & Composition | ◆ Ch1 L5 |
| 3 | 7 | Polymorphism & Duck Typing | ◆ Ch1 L6 |
| 3 | 8 | Capstone: Two Styles, One Program | ◆ Ch1 L7 |
| 3 | 9 | Consolidation: Execution Lab, Chapter Tests A and B | ◆ Ch1 |

### Part II — Patterns and arrays (Weeks 4–7)

| Wk | # | Lecture | Material |
|----|---|---------|----------|
| 4 | 10 | Design patterns for ML I — strategy, factory, the fit/transform contract | ◆ Ch2 L1 · App. A3 ◆ |
| 4 | 11 | Design patterns for ML II — pipelines, decorators, composing steps | ◆ Ch2 L2 |
| 4 | 12 | NumPy I — the array, `dtype`, `shape` | ◆ Ch3 L1 · App. A4 ◆ |
| 5 | 13 | NumPy II — indexing, slicing, views vs copies | ◆ Ch3 L2 |
| 5 | 14 | NumPy III — broadcasting | ◆ Ch3 L3 |
| 5 | 15 | NumPy IV — reductions, axes, boolean masks | ◆ Ch3 L4 |
| 6 | 16 | NumPy for ML math I — vectors, dot products, norms **in code** | ◆ Ch4 L1 · App. A5 ◆, A6 ◆ |
| 6 | 17 | NumPy for ML math II — matrices, `matmul`, shapes that fit | ◆ Ch4 L2 · App. A6 |
| 6 | 18 | NumPy for ML math III — vectorising a loop, random numbers, seeds | ◆ Ch4 L3 |
| 7 | 19 | `np.linalg` I — solving a linear system **in code** | ◇ Ch5 L1 · App. A6 |
| 7 | 20 | `np.linalg` II — inverse, rank, determinant, least squares **in code** | ◇ Ch5 L2 · App. A6 |
| 7 | 21 | Mid-course checkpoint: objects and arrays | ▣ |

### Part III — Tables (Weeks 8–11)

| Wk | # | Lecture | Material |
|----|---|---------|----------|
| 8 | 22 | Pandas I — Series, DataFrame, the index | ◇ Ch6 L1 |
| 8 | 23 | Pandas II — reading files, dtypes, selecting columns | ◇ Ch6 L2 |
| 8 | 24 | Pandas III — `loc`/`iloc`, filtering, sorting | ◇ Ch6 L3 |
| 9 | 25 | Pandas IV — `describe`, `value_counts`, summarising | ◇ Ch6 L4 · App. A7 |
| 9 | 26 | Wrangling I — adding, renaming and dropping columns | ◇ Ch7 L1 |
| 9 | 27 | Wrangling II — `apply`, `map`, vectorised string operations | ◇ Ch7 L2 |
| 10 | 28 | Wrangling III — `groupby` and aggregation | ◇ Ch7 L3 |
| 10 | 29 | Wrangling IV — `merge`, `join`, `concat` | ◇ Ch7 L4 |
| 10 | 30 | Reshaping I — long vs wide, `melt` | ◇ Ch8 L1 |
| 11 | 31 | Reshaping II — `pivot`, `pivot_table` | ◇ Ch8 L2 |
| 11 | 32 | Reshaping III — `stack`, `unstack`, MultiIndex | ◇ Ch8 L3 |
| 11 | 33 | Encoding I — categorical data, ordinal vs one-hot | ◇ Ch9 L1 |

### Part IV — Preparing data, and one model (Weeks 12–14)

| Wk | # | Lecture | Material |
|----|---|---------|----------|
| 12 | 34 | Encoding II — one-hot in pandas and scikit-learn | ◇ Ch9 L2 |
| 12 | 35 | Scaling — standardise, min–max, and when each matters | ◇ Ch9 L3 · App. A7 |
| 12 | 36 | Missing data I — finding it, and what it means | ◇ Ch10 L1 |
| 13 | 37 | Missing data II — dropping vs imputing | ◇ Ch10 L2 |
| 13 | 38 | Pipelines — `ColumnTransformer` and fit/transform discipline | ◇ Ch10 L3 · App. A10 |
| 13 | 39 | Regression I — the model, written from scratch | ◇ Ch11 L1 · App. A8, A9 |
| 14 | 40 | Regression II — training it, and watching it learn | ◇ Ch11 L2 · App. A8 |
| 14 | 41 | Regression III — scikit-learn, the same answer in four lines | ◇ Ch11 L3 · App. A10 |
| 14 | 42 | Final project and exam | ▣ |

### Allocation

| Chapter | Lectures |
|---------|---------:|
| 1 · OOP Foundation | 8 |
| 2 · OOP Design Patterns for ML | 2 |
| 3 · NumPy Fundamentals **(written)** | 4 |
| 4 · NumPy for ML Math **(written)** | 3 |
| 5 · `np.linalg` | 2 |
| 6 · Pandas Fundamentals | 4 |
| 7 · Pandas Data Wrangling | 4 |
| 8 · Pandas Reshaping | 3 |
| 9 · Encoding and Scaling | 3 |
| 10 · Missing Data and Pipelines | 3 |
| 11 · Regression and scikit-learn | 3 |
| Orientation, checkpoint, final | 3 |
| **Total** | **42** |

## 2. The 90-minute lecture

One lesson page = one lecture. A lesson that cannot be delivered in 90 minutes
is too big and must be split; two that fit in 60 should be merged.

| Minutes | Segment |
|--------:|---------|
| 0–10 | Recap of the previous lecture, then the problem: working code that hurts |
| 10–35 | Concept 1 — explain, live-code, two inline checks |
| 35–50 | Guided exercise, solution revealed at the end |
| 50–60 | Break |
| 60–80 | Concept 2 — explain, live-code, two inline checks, one trace |
| 80–90 | The lesson test |

This yields at least nine interaction points, satisfying the "something to do
every 5–10 minutes" rule. The chapter tests are not lecture segments: Chapter
Test A is homework, Chapter Test B is revision before the checkpoint or exam.

**Budget per lesson page:** 2–3 concepts, 2–4 worked examples, 3–4 exercises,
3–5 inline checks, 1–2 traces, 1 test of 12 questions.

## 3. Appendices — self-study, outside the lecture budget

These carry everything the students have not been taught elsewhere. They are
linked from the lecture that first needs them and are expected to be read
before it. None of them consumes lecture time.

| # | Appendix | Read before | Serves |
|---|----------|-------------|--------|
| A1 | Environment and tools: Python, editor, running a file | Week 1 | all |
| A2 | Python refresher: variables, lists, dicts, loops, functions, f-strings | Week 1 | all |
| A3 | Machine learning vocabulary, with no mathematics — model, feature, label, fit, predict, pipeline **(written)** | Week 4 | Ch2, Ch9–11 |
| A4 | Numbers in a computer: int vs float, precision, overflow, `dtype` **(written)** | Week 5 | Ch3–5 |
| A5 | Reading mathematical notation: subscripts, Σ, vectors as columns **(written)** | Week 6 | Ch4, Ch5, Ch11 |
| A6 | Vectors and matrices — the linear algebra this course uses: dot product, matrix multiply, transpose, inverse, rank, solving a system **(written)** | Week 6 | Ch4, Ch5, Ch11 |
| A7 | Statistics and probability basics: mean, median, variance, standard deviation, distribution, correlation | Week 8 | Ch6, Ch9 |
| A8 | Derivatives and gradients — the calculus this course uses | Week 13 | Ch11 |
| A9 | Least squares: deriving the normal equation, and gradient descent | Week 13 | Ch11 |
| A10 | Evaluating a model: train/test split, overfitting, MSE, R² | Week 13 | Ch10, Ch11 |

### Rules for appendix material

1. **Nothing in an appendix is examined in a lesson test.** Lesson and chapter
   tests examine the programming taught in the lecture. Appendix content may
   appear only in clearly-marked optional questions.
2. **A lecture never derives.** It states the result, says what it means for
   the code on the screen, and links to the appendix.
3. **Every term of art is defined at first use**, in the lecture, in one
   sentence, with a link to the appendix that expands it.
4. **An appendix assumes only school mathematics** and the appendices before
   it.
