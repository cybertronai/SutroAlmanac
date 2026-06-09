// Distills the gitignored weekly digests into counts-only JSON the site can
// publish (message and link volume per week; no private text). The article
// layout shows these under each weekly recap title.
// Run after build-weekly-digest.ts:  node scripts/build-weekly-stats.mjs

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "..", "digests", "weekly", "index.md");
const OUT = join(HERE, "..", "src", "data", "weekly-stats.json");

if (!existsSync(SRC)) {
  console.error(`build-weekly-stats: ${SRC} missing; run build-weekly-digest.ts first`);
  process.exit(1);
}

const stats = {};
for (const line of readFileSync(SRC, "utf8").split("\n")) {
  const m = line.match(/^- (\d{4}-\d{2}-\d{2}): (\d+) msgs, (\d+) links/);
  if (m) stats[m[1]] = { msgs: Number(m[2]), links: Number(m[3]) };
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(stats, null, 2) + "\n");
console.log(`build-weekly-stats: ${Object.keys(stats).length} weeks written to ${OUT}`);
