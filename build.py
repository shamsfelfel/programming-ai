#!/usr/bin/env python3
"""Assemble the course source tree into standalone, hostable HTML files.

Every chapter ships as one self-contained file: no external CSS, no external
JS, no CDN. That keeps it working from file:// , from GitHub Pages, and from
the service-worker cache with nothing to resolve at run time.

    python3 build.py            # build index.html
    python3 build.py --check    # build to memory and diff against what is on disk
"""
import argparse
import io
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))

# Order matters. Later stylesheets win on equal specificity, and the question
# banks must be defined before the engine that renders them runs.
CSS = [
    "src/css/course.css",
    "src/css/assess.css",
]

JS = [
    "src/js/trace.js",
    "src/data/topics.js",
    "src/data/traces.js",
    "src/data/questions-lesson-01.js",
    "src/data/questions-lesson-02.js",
    "src/data/questions-lesson-03.js",
    "src/data/questions-lesson-04.js",
    "src/data/questions-lesson-05.js",
    "src/data/questions-lesson-06.js",
    "src/data/questions-lesson-07.js",
    "src/data/questions-chapter-a.js",
    "src/data/questions-chapter-b.js",
    "src/js/assess.js",
    "src/js/course.js",
    "src/js/pwa.js",
]

CONTENT = [
    "src/content/chapter-01.html",
    "src/content/chapter-01-tests.html",
]
HEAD = "src/head.html"
OUT = "index.html"


def read(rel):
    path = os.path.join(ROOT, rel)
    if not os.path.exists(path):
        return None
    return io.open(path, encoding="utf-8").read()


def build():
    out = [read(HEAD)]
    out.append("<style>\n")
    for i, rel in enumerate(CSS):
        text = read(rel)
        if text is None:
            continue
        if i:
            out.append("\n")
        out.append(text)
    out.append("</style>\n</head>\n<body>\n<main>\n")
    for rel in CONTENT:
        text = read(rel)
        if text is not None:
            out.append(text)
    out.append("</main>\n")
    for rel in JS:
        text = read(rel)
        if text is None:
            continue
        out.append("<script>\n")
        out.append(text)
        out.append("</script>\n")
    out.append("</body>\n</html>\n")
    return "".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true",
                    help="compare the build against the file on disk instead of writing it")
    args = ap.parse_args()

    html = build()
    target = os.path.join(ROOT, OUT)

    if args.check:
        current = io.open(target, encoding="utf-8").read() if os.path.exists(target) else ""
        if current == html:
            print("up to date: %s (%d bytes)" % (OUT, len(html.encode("utf-8"))))
            return 0
        print("STALE: %s differs from the source tree" % OUT, file=sys.stderr)
        return 1

    io.open(target, "w", encoding="utf-8", newline="\n").write(html)
    kb = len(html.encode("utf-8")) / 1024.0
    print("wrote %s  (%.0f KB, %d lines)" % (OUT, kb, html.count("\n")))
    return 0


if __name__ == "__main__":
    sys.exit(main())
