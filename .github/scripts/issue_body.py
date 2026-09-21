#!/usr/bin/env python3
"""Turn audit-report.json into the body of the link-rot issue.

Kept out of the workflow YAML on purpose: building markdown with nested shell
heredocs is how you end up with a job that fails only on the week something is
actually broken.
"""
import json
import os
import sys
from datetime import datetime, timezone


def main():
    try:
        with open("audit-report.json") as fh:
            report = json.load(fh)
    except (OSError, ValueError) as e:
        print(f"could not read audit-report.json: {e}", file=sys.stderr)
        return 1

    dead = report.get("dead", [])
    unknown = report.get("inconclusive", [])
    run_url = "{}/{}/actions/runs/{}".format(
        os.environ.get("GITHUB_SERVER_URL", "https://github.com"),
        os.environ.get("GITHUB_REPOSITORY", ""),
        os.environ.get("GITHUB_RUN_ID", ""),
    )
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    out = []
    out.append(f"`audit.py` checked **{report.get('checked', 0)}** recordings and found "
               f"**{len(dead)}** that no longer play — embedding switched off, or the "
               f"video removed.\n")
    out.append("| videoId | reason | entry |")
    out.append("|---|---|---|")
    for d in dead:
        label = str(d.get("label", "")).replace("|", "\\|")
        vid = d["videoId"]
        out.append(f"| [`{vid}`](https://youtu.be/{vid}) | {d.get('reason','')} | {label} |")

    if unknown:
        out.append(f"\n{len(unknown)} more could not be checked this run (throttling or "
                   "a network blip). They are **not** counted as dead and will be "
                   "retried next week.")

    out.append("\nTo remove the dead ones:\n")
    out.append("```bash")
    out.append("python3 audit.py --prune")
    out.append("```")
    out.append(f"\n_Run {stamp} · [workflow run]({run_url})_")

    with open("issue-body.md", "w") as fh:
        fh.write("\n".join(out) + "\n")
    print(f"wrote issue-body.md ({len(dead)} dead, {len(unknown)} inconclusive)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
