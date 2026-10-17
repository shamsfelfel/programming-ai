#!/usr/bin/env python3
"""Structural checks on the built course. Exits non-zero on any failure.

Covers what a browser will not tell you until a student hits it: a topic
chip pointing at a heading that was renamed, a question shipped without an
explanation, a trace step naming a line its program does not have, an
English sentence with no Arabic beside it.

    python3 tools/verify_chapter.py
"""
import io
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REQUIRED_TYPES = ["tf", "mcq", "multi", "fill", "order", "match",
                  "error", "complete", "compare", "output", "trace"]

problems = []
notes = []


def fail(msg):
    problems.append(msg)


def read(rel):
    return io.open(os.path.join(ROOT, rel), encoding="utf-8").read()


def dump_data():
    """Run the data + engine files under node and hand back the banks."""
    files = sorted(
        f for f in os.listdir(os.path.join(ROOT, "src", "data"))
        if f.endswith(".js")
    )
    script = "global.window = {};\n"
    for f in files:
        script += "require(%s);\n" % json.dumps(os.path.join(ROOT, "src", "data", f))
    script += ("process.stdout.write(JSON.stringify({"
               "banks: global.window.OOPBanks || {},"
               "topics: global.window.OOPTopics || {},"
               "traces: global.window.OOPTraces || {}}));")
    out = subprocess.run([ "node", "-e", script ], capture_output=True, text=True)
    if out.returncode != 0:
        fail("data files do not load under node:\n" + out.stderr.strip())
        return None
    return json.loads(out.stdout)


def check_build():
    r = subprocess.run([sys.executable, os.path.join(ROOT, "build.py"), "--check"],
                       capture_output=True, text=True, cwd=ROOT)
    if r.returncode != 0:
        fail("index.html is stale — run python3 build.py")


def check_syntax():
    for sub in ("js", "data"):
        d = os.path.join(ROOT, "src", sub)
        for f in sorted(os.listdir(d)):
            if not f.endswith(".js"):
                continue
            r = subprocess.run(["node", "--check", os.path.join(d, f)],
                               capture_output=True, text=True)
            if r.returncode != 0:
                fail("syntax error in src/%s/%s:\n%s" % (sub, f, r.stderr.strip()))


def strip_scripts(html):
    """Links are checked in markup only: a `href="#` inside a JavaScript
    string concatenation is not a link, it is half of one."""
    return re.sub(r"<script\b.*?</script>", "", html, flags=re.S)


def check_links(html):
    html = strip_scripts(html)
    ids = set(re.findall(r'\sid="([^"]+)"', html))
    missing = {}
    for href in re.findall(r'href="#([^"]+)"', html):
        if href and href not in ids:
            missing[href] = missing.get(href, 0) + 1
    for href in sorted(missing):
        fail("dangling link to #%s (%d time(s))" % (href, missing[href]))
    notes.append("%d anchors, %d internal links" % (len(ids), len(re.findall(r'href="#', html))))


def check_bilingual(html):
    en = len(re.findall(r'<span class="en">', html))
    ar = len(re.findall(r'<span class="ar">', html))
    if en != ar:
        fail("bilingual spans unbalanced in content: %d en vs %d ar" % (en, ar))
    notes.append("%d bilingual span pairs in markup" % en)


def walk_bilingual(obj, where, seen):
    """Any {en: ...} dict in the data must carry a non-empty ar, and vice versa."""
    if isinstance(obj, dict):
        has_en, has_ar = "en" in obj, "ar" in obj
        if has_en or has_ar:
            if not (obj.get("en") or "").strip():
                seen.append("%s: empty or missing English" % where)
            if not (obj.get("ar") or "").strip():
                seen.append("%s: empty or missing Arabic" % where)
        for k, v in obj.items():
            if k not in ("en", "ar"):
                walk_bilingual(v, where + "." + str(k), seen)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_bilingual(v, "%s[%d]" % (where, i), seen)


def check_banks(data, html):
    banks, topics = data["banks"], data["topics"]
    ids = set(re.findall(r'\sid="([^"]+)"', html))
    seen_ids = {}
    types = {}
    levels = {}
    total = 0

    for key in sorted(topics):
        href = topics[key].get("href")
        if href not in ids:
            fail("topic %r points at missing anchor #%s" % (key, href))

    for bname in sorted(banks):
        bank = banks[bname]
        if ('data-bank="%s"' % bname) not in html:
            fail("bank %r has no placeholder in the content" % bname)
        qs = bank.get("questions") or []
        if not qs:
            fail("bank %r has no questions" % bname)
        for q in qs:
            total += 1
            qid = q.get("id") or "<no id>"
            at = "%s/%s" % (bname, qid)
            if qid in seen_ids:
                fail("duplicate question id %r (%s and %s)" % (qid, seen_ids[qid], bname))
            seen_ids[qid] = bname

            if q.get("level") not in ("easy", "medium", "hard"):
                fail("%s: level is %r" % (at, q.get("level")))
            levels[q.get("level")] = levels.get(q.get("level"), 0) + 1

            t = q.get("type")
            if t not in REQUIRED_TYPES:
                fail("%s: unknown type %r" % (at, t))
            types[t] = types.get(t, 0) + 1

            if not q.get("topics"):
                fail("%s: no topics" % at)
            for tk in q.get("topics") or []:
                if tk not in topics:
                    fail("%s: unknown topic %r" % (at, tk))

            if not q.get("explain"):
                fail("%s: no explanation" % at)

            # the answer shape has to match the type
            if t == "tf":
                if not isinstance(q.get("truth"), bool):
                    fail("%s: tf needs a boolean `truth`" % at)
            elif t in ("mcq", "compare") or (t in ("complete", "output", "trace", "error") and q.get("options")):
                if not q.get("options"):
                    fail("%s: no options" % at)
                elif not isinstance(q.get("answer"), int):
                    fail("%s: answer must be an index" % at)
                elif not (0 <= q["answer"] < len(q["options"])):
                    fail("%s: answer %r out of range" % (at, q["answer"]))
            elif t == "multi":
                if not isinstance(q.get("answer"), list) or not q["answer"]:
                    fail("%s: multi needs a list answer" % at)
                elif any(not (0 <= i < len(q.get("options") or [])) for i in q["answer"]):
                    fail("%s: answer index out of range" % at)
            elif t == "order":
                items, ans = q.get("items") or [], q.get("answer") or []
                if sorted(ans) != list(range(len(items))):
                    fail("%s: answer must be a permutation of all %d items" % (at, len(items)))
            elif t == "match":
                if len(q.get("pairs") or []) < 2:
                    fail("%s: match needs at least two pairs" % at)
            elif t == "error":
                lines = len(str(q.get("code", "")).strip("\n").split("\n"))
                ans = q.get("answer")
                ans = ans if isinstance(ans, list) else [ans]
                for n in ans:
                    if not isinstance(n, int) or not (1 <= n <= lines):
                        fail("%s: answer line %r outside 1..%d" % (at, n, lines))
            else:
                blanks = q.get("blanks") or []
                if not blanks:
                    fail("%s: no blanks" % at)
                for i, b in enumerate(blanks):
                    if not (b.get("accept") or []):
                        fail("%s: blank %d accepts nothing" % (at, i + 1))

            bl = []
            walk_bilingual(q, at, bl)
            for m in bl:
                fail(m)

    for t in REQUIRED_TYPES:
        if not types.get(t):
            fail("question type %r is never used" % t)

    notes.append("%d questions in %d banks" % (total, len(banks)))
    notes.append("types: " + ", ".join("%s=%d" % (t, types.get(t, 0)) for t in REQUIRED_TYPES))
    notes.append("levels: " + ", ".join("%s=%d" % (l, levels.get(l, 0))
                                        for l in ("easy", "medium", "hard")))


def check_traces(data, html):
    traces = data["traces"]
    for key in sorted(traces):
        tr = traces[key]
        n = len(str(tr.get("code", "")).strip("\n").split("\n"))
        steps = tr.get("steps") or []
        if not steps:
            fail("trace %r has no steps" % key)
        for i, s in enumerate(steps):
            line = s.get("line")
            if not isinstance(line, int) or not (1 <= line <= n):
                fail("trace %r step %d: line %r outside 1..%d" % (key, i + 1, line, n))
        bl = []
        walk_bilingual(tr, "trace " + key, bl)
        for m in bl:
            fail(m)
    for key in re.findall(r'data-trace-id="([^"]+)"', html):
        if key not in traces:
            fail("content mounts trace %r, which is not defined" % key)
    notes.append("%d traces, %d steps"
                 % (len(traces), sum(len(t.get("steps") or []) for t in traces.values())))


def main():
    check_build()
    check_syntax()
    html = read("index.html")
    check_links(html)
    check_bilingual(read("src/content/chapter-01.html"))
    data = dump_data()
    if data:
        check_banks(data, html)
        check_traces(data, html)

    for n in notes:
        print("  " + n)
    if problems:
        print("\n%d problem(s):" % len(problems))
        for p in problems:
            print("  - " + p)
        return 1
    print("\nall checks passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
