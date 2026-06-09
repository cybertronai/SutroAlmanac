// Build guard for the Sutro Almanac. Fails the build when the output violates
// the house rules, so enforcement does not depend on anyone remembering a scan.
//
//   1. No em/en-dashes, arrows, or ellipsis characters anywhere in the built
//      HTML (raw or entity-encoded).
//   2. Every internal href/src resolves to a real file in dist (catches broken
//      links and base-path mistakes before they 404 in production).
//
// Run after `astro build` (and after pagefind, so its assets exist):
//   node scripts/check-style.mjs
// Reads SUTRO_BASE to know the deploy base path; defaults to "/".

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const BASE = (process.env.SUTRO_BASE || "/").replace(/\/?$/, "/");

const FORBIDDEN = new Map([
  [0x2014, "em-dash"],
  [0x2013, "en-dash"],
  [0x2015, "horizontal bar"],
  [0x2192, "right arrow"],
  [0x2190, "left arrow"],
  [0x2194, "left-right arrow"],
  [0x21d2, "double arrow"],
  [0x2026, "ellipsis"],
]);
const FORBIDDEN_ENTITIES = [
  "&mdash;", "&ndash;", "&rarr;", "&larr;", "&harr;", "&hellip;",
  "&#8212;", "&#8211;", "&#8594;", "&#8592;", "&#8230;",
  "&#x2014;", "&#x2013;", "&#x2192;", "&#x2190;", "&#x2026;",
];

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith(".html")) yield p;
  }
}

if (!existsSync(DIST)) {
  console.error(`check-style: ${DIST} does not exist; run astro build first`);
  process.exit(1);
}

const failures = [];

// --- pass 1: forbidden characters --------------------------------------------
for (const file of htmlFiles(DIST)) {
  const text = readFileSync(file, "utf8");
  const rel = file.slice(DIST.length + 1);
  const seen = new Set();
  for (const ch of text) {
    const name = FORBIDDEN.get(ch.codePointAt(0));
    if (name && !seen.has(name)) {
      seen.add(name);
      failures.push(`${rel}: contains ${name} (U+${ch.codePointAt(0).toString(16)})`);
    }
  }
  for (const ent of FORBIDDEN_ENTITIES)
    if (text.includes(ent)) failures.push(`${rel}: contains entity ${ent}`);
}

// --- pass 2: internal links resolve -------------------------------------------
const ATTR_RE = /(?:href|src)="([^"]+)"/g;
const checked = new Set();
for (const file of htmlFiles(DIST)) {
  const text = readFileSync(file, "utf8");
  const rel = file.slice(DIST.length + 1);
  for (const m of text.matchAll(ATTR_RE)) {
    let url = m[1];
    if (!url.startsWith("/") || url.startsWith("//")) continue; // external/relative
    url = url.split("#")[0].split("?")[0];
    if (!url) continue;
    if (BASE !== "/" && !url.startsWith(BASE)) {
      failures.push(`${rel}: internal link missing base: ${m[1]}`);
      continue;
    }
    const path = BASE === "/" ? url : url.slice(BASE.length - 1);
    const key = path;
    if (checked.has(key)) continue;
    checked.add(key);
    const clean = path.replace(/^\//, "");
    const candidates = clean === ""
      ? ["index.html"]
      : /\.[a-z0-9]+$/i.test(clean)
        ? [clean]
        : [join(clean, "index.html"), `${clean}.html`];
    if (!candidates.some((c) => existsSync(join(DIST, c))))
      failures.push(`${rel}: broken internal link ${m[1]}`);
  }
}

if (failures.length) {
  console.error(`check-style: ${failures.length} failure(s)\n`);
  for (const f of failures.slice(0, 60)) console.error("  " + f);
  if (failures.length > 60) console.error(`  ... and ${failures.length - 60} more`);
  process.exit(1);
}
console.log(`check-style: clean (${checked.size} internal links verified, base ${BASE})`);
