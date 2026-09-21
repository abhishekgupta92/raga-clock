#!/usr/bin/env python3
"""Check every videoId in data.js and kabir.js against YouTube's oEmbed
endpoint and report the ones that are gone.

The player already hides link rot at runtime — an unplayable video triggers
onError and it quietly swaps in another pick — so dead entries accumulate
invisibly. Run this occasionally and prune what it finds.

    python3 audit.py            # report only
    python3 audit.py --prune    # also rewrite data.js / kabir.js without them
    python3 audit.py --json     # additionally write audit-report.json

Exit codes: 0 clean, 1 dead entries found, 2 refused to act (looks like
throttling rather than real rot).
"""
import json, os, re, sys, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

UA = "raga-clock-audit/1.0 (+https://github.com/abhishekgupta92/raga-clock)"


def extract(path, const):
    src = open(path).read()
    start = src.index("[", src.index("const " + const))
    depth = 0
    for i in range(start, len(src)):
        if src[i] == "[":
            depth += 1
        elif src[i] == "]":
            depth -= 1
            if depth == 0:
                break
    return json.loads(src[start:i + 1]), src, start, i


def entries():
    """Yield (file, videoId, label) for everything in the catalogue."""
    prahars, *_ = extract("data.js", "PRAHARS")
    for p in prahars:
        for e in p["options"]:
            yield "data.js", e["videoId"], f"{e['raga']} — {e['artist']}"
        for f in p["filmy"]:
            yield "data.js", f["videoId"], f"{f.get('song', '?')} — {f['artist']}"
    try:
        styles, *_ = extract("kabir.js", "KABIR_STYLES")
    except (FileNotFoundError, ValueError):
        return
    for st in styles:
        for t in st["tracks"]:
            yield "kabir.js", t["videoId"], f"{t['title']} — {t['artist']}"


# Only these mean the recording is genuinely unusable: embedding switched off,
# or the video removed. Everything else — rate limiting, YouTube 5xx, a socket
# timeout — says nothing about the video and must never cause a prune. That
# distinction matters most when this runs unattended on a shared CI address,
# which is exactly where 429s show up.
DEAD_CODES = {401, 403, 404, 410}


def check(vid, tries=4):
    url = "https://www.youtube.com/oembed?" + urllib.parse.urlencode(
        {"url": f"https://www.youtube.com/watch?v={vid}", "format": "json"})
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    last = "unknown"
    for attempt in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=25):
                return vid, None
        except urllib.error.HTTPError as e:
            if e.code in DEAD_CODES:
                return vid, f"HTTP {e.code}"
            # 429 / 5xx: back off and try again before giving up as unknown.
            last = f"HTTP {e.code}"
            time.sleep(2 ** attempt + 1)
        except Exception as e:
            last = f"unreachable ({type(e).__name__})"
            time.sleep(1 + attempt)
    return vid, "INCONCLUSIVE " + last


def main():
    rows = list(entries())
    ids = sorted({v for _, v, _ in rows})
    label = {v: l for _, v, l in rows}
    print(f"checking {len(ids)} unique videoIds from {len(rows)} entries...\n")

    with ThreadPoolExecutor(max_workers=6) as ex:
        results = dict(ex.map(check, ids))

    dead = {v: r for v, r in results.items()
            if r and r.startswith("HTTP") and not r.startswith("INCONCLUSIVE")}
    flaky = {v: r for v, r in results.items() if r and v not in dead}

    for v, reason in sorted(dead.items(), key=lambda kv: kv[1]):
        print(f"  DEAD   {v}  {reason:<10} {label[v][:60]}")
    for v, reason in flaky.items():
        print(f"  RETRY  {v}  {reason:<24} {label[v][:50]}")

    print(f"\n{len(ids) - len(dead) - len(flaky)} live, {len(dead)} dead, "
          f"{len(flaky)} inconclusive")

    if "--json" in sys.argv:
        report = {
            "checked": len(ids),
            "dead": [{"videoId": v, "reason": r, "label": label[v]}
                     for v, r in sorted(dead.items())],
            "inconclusive": [{"videoId": v, "reason": r} for v, r in flaky.items()],
        }
        with open("audit-report.json", "w") as fh:
            json.dump(report, fh, indent=2, ensure_ascii=False)
        print("wrote audit-report.json")

    # If a large share of the catalogue looks dead at once, that is far more
    # likely to be YouTube throttling this address than a real cull. Refuse to
    # prune rather than quietly gut the file.
    if dead and len(dead) > max(25, len(ids) // 10):
        print(f"\nREFUSING TO PRUNE: {len(dead)} of {len(ids)} look dead, which "
              f"suggests throttling rather than genuine rot. Re-run later.")
        return 2

    if "--prune" not in sys.argv:
        if dead:
            print("\nrerun with --prune to remove the dead ones")
        return 0 if not dead else 1

    if not dead:
        return 0
    for path, const in (("data.js", "PRAHARS"), ("kabir.js", "KABIR_STYLES")):
        try:
            data, src, a, b = extract(path, const)
        except (FileNotFoundError, ValueError):
            continue
        removed = 0
        for group in data:
            for field in ("options", "filmy", "tracks"):
                if field in group:
                    before = len(group[field])
                    group[field] = [e for e in group[field] if e["videoId"] not in dead]
                    removed += before - len(group[field])
        if removed:
            open(path, "w").write(
                src[:a] + json.dumps(data, indent=2, ensure_ascii=False) + src[b + 1:])
            print(f"pruned {removed} entries from {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
