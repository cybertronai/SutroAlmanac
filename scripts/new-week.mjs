// Scaffold next week's recap so the human only writes prose.
//
//   node scripts/new-week.mjs              # most recent Monday
//   node scripts/new-week.mjs 2026-06-08   # a specific Monday
//
// Creates src/content/docs/recaps/weekly/<monday>.md with frontmatter and the
// section skeleton, pulling volume counts from the gitignored digests when they
// exist. Refuses to overwrite. The generated hub and archive pick the new page
// up automatically; remember to rerun build-weekly-digest.ts and
// build-weekly-stats.mjs first so the stats line has data.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(HERE, "..", "src", "content", "docs", "recaps", "weekly");
const DIGESTS = join(HERE, "..", "digests", "weekly");

function mostRecentMonday() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}

const arg = process.argv[2];
const monday = arg ?? mostRecentMonday();
if (!/^\d{4}-\d{2}-\d{2}$/.test(monday)) {
  console.error(`new-week: "${monday}" is not a YYYY-MM-DD date`);
  process.exit(1);
}
if (new Date(monday + "T12:00:00Z").getUTCDay() !== 1) {
  console.error(`new-week: ${monday} is not a Monday; weekly files are keyed by Monday`);
  process.exit(1);
}

const target = join(OUT_DIR, `${monday}.md`);
if (existsSync(target)) {
  console.error(`new-week: ${target} already exists; not overwriting`);
  process.exit(1);
}

const pretty = new Date(monday + "T12:00:00Z").toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

// volume line from the digest index, when the digests have been regenerated
let volume = "";
const digestIndex = join(DIGESTS, "index.md");
if (existsSync(digestIndex)) {
  const m = readFileSync(digestIndex, "utf8").match(
    new RegExp(`^- ${monday}: (\\d+) msgs, (\\d+) links`, "m")
  );
  if (m) volume = `<!-- digest: ${m[1]} messages, ${m[2]} links this week -->\n\n`;
}

const body = `---
title: "Week of ${pretty}"
description: "TODO one line on what moved this week."
---

${volume}<!-- Write from digests/weekly/${monday}.md. Every claim traces to a line there.
No em-dashes, no arrows, no three-item rhetorical lists. See AUTHORING.md. -->

TODO opening paragraph: the one or two threads that moved this week.

## TODO thread heading

TODO.

## Sources

- TODO the load-bearing links cited above.
- Telegram archive, week of ${pretty}, paraphrased rather than quoted.
`;

writeFileSync(target, body);
console.log(`new-week: created ${target}`);
console.log(
  volume
    ? "new-week: digest counts found and noted"
    : "new-week: no digest counts found; run build-weekly-digest.ts and build-weekly-stats.mjs"
);
