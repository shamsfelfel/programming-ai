# Authoring a Chapter

How the repository is put together, and the exact steps to add Chapter 2.
The rules a chapter must satisfy are in [SPEC.md](SPEC.md); this is the
mechanics.

## Layout

```
build.py                     assembles src/ into index.html
index.html                   the built chapter — committed, served by Pages
manifest.webmanifest  sw.js  icons/      PWA shell
docs/SPEC.md  docs/AUTHORING.md
tools/                       one-shot generators and helpers
src/
├── head.html                <head> up to <style>
├── css/course.css           prose, layout, themes, drawer   (chapter 1 original)
├── css/assess.css           question cards, widgets, trace lab
├── js/trace.js              step-through execution lab
├── js/assess.js             question engine: renders, grades, scores, stores
├── js/course.js             router, drawer, pager, highlighter, i18n
├── js/pwa.js                service-worker registration
├── data/topics.js           topic key -> {href, en, ar}
├── data/traces.js           authored execution traces
├── data/questions-*.js      the question banks
└── content/
    ├── chapter-01.html      the lessons
    └── chapter-01-tests.html  test/lab/exam pages (generated)
```

Build with `python3 build.py`. Check the committed file is current with
`python3 build.py --check` — it exits non-zero if `index.html` is stale.
The order of `CSS` and `JS` in `build.py` matters: question banks must be
defined before `assess.js` runs, and `course.js` boots last.

## Data formats

### A question

```js
{
  id: "t3q7",              // unique across the whole chapter
  type: "output",          // one of the eleven types in SPEC §3.3
  level: "medium",         // easy | medium | hard
  topics: ["property", "setter"],   // keys from data/topics.js
  q: { en: "...", ar: "..." },      // the stem; HTML allowed
  code: "class X:\n    ...",        // optional; raw Python, escaped at render
  codeA / codeB: "...",             // for type "compare"

  // then whichever answer shape the type needs:
  options: [{en, ar}] | [{code}],  answer: 0 | [0, 2],
  truth: true,                                   // tf
  blanks: [{ accept: ["..."], label: {en, ar}, wide: true, lines: 3, hint: {} }],
  items:  [{en, ar}], answer: [0, 1, 2],         // order
  pairs:  [{ l: {}, r: {} }],                    // match (answer is identity)
  answer: 6,                                     // error: the 1-based line

  explain:  { en: "...", ar: "..." },            // required
  solution: { code: "...", out: "...", en, ar }  // optional
}
```

Notes that save time:

- `answer` for `match` is implicit: `pairs[i].l` pairs with `pairs[i].r`.
  Options and right-hand columns are shuffled per question, deterministically,
  so the display is mixed but stable across re-renders and language flips.
- `output` blanks compare line by line with surrounding whitespace stripped,
  so the student does not have to reproduce column padding. Everything else
  compares exactly after collapsing internal runs of spaces.
- Give `accept` every spelling you will take: `["250.0", "250", "250.00"]`.
- A type can be authored two ways and the engine picks the widget from the
  data: an `output` with `options` becomes multiple choice, an `output` with
  `blanks` becomes typed. Same for `complete`, `trace` and `error`.

### A trace

```js
"t-key": {
  id, title: {en, ar}, lede: {en, ar},
  code: "line\nline\n...",
  steps: [{ line: 7,                     // 1-based, about to take effect
            vars: { "a": "Book(...)" },  // the FULL picture, not a delta
            out: "everything printed so far",
            scope: {en, ar},             // whose self you are inside
            note:  {en, ar} }]
}
```

The widget diffs consecutive `vars` to decide what to flash, so each step
repeats the unchanged variables.

### A topic

```js
"property": { href: "l3-s3", en: "@property", ar: "@property" }
```

`href` is a heading id. `tools/add_anchor_ids.py` gives every `h2`/`h3` in the
content a stable id (`l3-h1` for the first `h2` of lesson 3, `l3-s4` for its
fourth `h3`) and is idempotent — run it again after adding headings.

## Steps to add Chapter 2

1. Write `src/content/chapter-02.html`: `<section class="page" id="…">` per
   lesson, following Chapter 1's prose structure (problem → diagnosis →
   conversion → second example → exercises → key takeaways).
2. `python3 tools/add_anchor_ids.py` to give the new headings ids. Extend the
   script's `PATH` or run it per content file.
3. Add topic entries to `src/data/topics.js` pointing at those ids.
4. Generate the test/lab/exam pages with `tools/make_test_pages.py`
   (parameterise it for the new chapter) and write
   `src/data/questions-*.js` for them.
5. Author traces in `src/data/traces.js`.
6. Register every new file in `build.py` (`CSS`, `JS`, `CONTENT`) and add the
   new pages to the `LESSONS` array in `src/js/course.js`, which drives both
   the drawer and the prev/next pager.
7. Build, then run the checks below.

## Checks before committing

```bash
python3 build.py                     # rebuild
node --check src/js/*.js             # syntax
node --check src/data/*.js
python3 tools/verify_chapter.py      # structure, links, metadata, coverage
```

`tools/verify_chapter.py` is the gate. It fails on a dangling internal link, a
question with no explanation or no topics, an unknown topic key, a duplicate
question id, a trace step pointing outside its code, a missing question type,
or a bilingual string present in one language only.

Verify every code output by running it before you paste it into a question.
Keep the snippets in a scratch file and run them with `python3 -I`.

## Conventions

- Vanilla ES5-compatible JavaScript: `var`, no arrow functions, no `const`.
  The engine is read by a student eventually; keep it plain.
- Bilingual strings are always `{ en, ar }`, rendered as
  `<span class="en">…</span><span class="ar">…</span>` and switched by CSS.
- Python in `code` fields is raw; the engine escapes it. Write `>` not `&gt;`.
- `localStorage` keys are namespaced `oop.*`. Answers are stored per bank so a
  student keeps their progress; `Start over` clears one test's bank only.
- Never edit `index.html` by hand. It is generated.
