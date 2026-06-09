// Builds src/data/visual-tour.json from the two catalog tour sources, so the
// Almanac can render the full hinton/schmidhuber visual tour in-site. The GIFs
// are not copied (328 MB across 451 files); each card points at the catalog's
// own GitHub Pages, which already serves the animation. Deterministic parse,
// no LLM, so captions trace back to the source markdown verbatim.
// Run: node scripts/build-visual-tour.mjs

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "src", "data", "visual-tour.json");

const SOURCES = [
  {
    key: "hinton",
    label: "hinton-problems",
    blurb: "Geoffrey Hinton's catalog, 1985 to 2022, as runnable stubs.",
    base: "https://cybertronai.github.io/hinton-problems/",
    tourUrl: "https://cybertronai.github.io/hinton-problems/visual-tour.html",
    md: "/Users/yadkonrad/dev_dev/year26/may26/hinton-problems/src/visual-tour.md",
  },
  {
    key: "schmidhuber",
    label: "schmidhuber-problems",
    blurb: "Jürgen Schmidhuber's catalog, 1989 onward, as runnable stubs.",
    base: "https://cybertronai.github.io/schmidhuber-problems/",
    tourUrl: "https://cybertronai.github.io/schmidhuber-problems/visual-tour.html",
    md: "/Users/yadkonrad/dev_dev/year26/may26/schmidhuber-problems/src/visual-tour.md",
  },
];

const cleanInline = (s) =>
  s
    .replace(/<a\s+name="[^"]*">\s*<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    // De-slop: year ranges keep a hyphen, arrows become "to", any remaining
    // em/en-dash becomes a comma. The catalog sources lean on all three.
    .replace(/(\d)\s*[–—]\s*(\d)/g, "$1-$2")
    .replace(/\s*[→⇒]\s*/g, " to ")
    .replace(/\s*←\s*/g, " from ")
    .replace(/\s*[—–―]\s*/g, ", ")
    .replace(/…/g, "...")
    .replace(/\s+,/g, ",")
    .replace(/\s+/g, " ")
    .trim();

function firstSentences(paragraph, max = 250) {
  const clean = cleanInline(paragraph);
  if (clean.length <= max) return clean.replace(/[:,]\s*$/, ".");
  const slice = clean.slice(0, max);
  const stop = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("; "));
  if (stop > 90) return slice.slice(0, stop + 1);
  const space = slice.lastIndexOf(" ");
  return (space > 90 ? slice.slice(0, space) : slice).trim().replace(/[,;:]$/, "") + ".";
}

const isYearHeading = (t) => /\b(?:19|20)\d{2}\b/.test(t) || /\b\d{3}0s\b/.test(t);
const skipLine = (t) => t === "" || /^(\[|`|#|!|-|\||>|\d+\.)/.test(t.trim());

function parse(src) {
  const lines = readFileSync(src.md, "utf8").split("\n");
  const eras = [];
  let era = null;
  let paper = "";
  let pendingStar = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const h2 = line.match(/^##\s+(.+?)\s*$/);
    if (h2 && !line.startsWith("###")) {
      const name = cleanInline(h2[1]);
      if (isYearHeading(name)) {
        era = { name, items: [] };
        eras.push(era);
      }
      continue;
    }
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h3 && !line.startsWith("####")) {
      paper = cleanInline(h3[1]);
      continue;
    }
    const h4 = line.match(/^####\s+(.+?)\s*$/);
    if (h4) {
      pendingStar = /★/.test(h4[1]);
      continue;
    }

    const img = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
    if (img && era) {
      const slug = img[1].trim();
      const rel = img[2].trim();
      // caption: first prose paragraph after the image
      let j = i + 1;
      while (j < lines.length && skipLine(lines[j])) j++;
      const para = [];
      while (j < lines.length && lines[j].trim() !== "" && !/^(#{1,6}\s|!\[|---)/.test(lines[j])) {
        para.push(lines[j]);
        j++;
      }
      era.items.push({
        slug,
        title: slug,
        paper,
        star: pendingStar,
        gif: src.base + rel,
        caption: firstSentences(para.join(" ")),
      });
      pendingStar = false;
    }
  }
  return eras;
}

const catalogs = SOURCES.map((src) => {
  const eras = parse(src);
  const count = eras.reduce((n, e) => n + e.items.length, 0);
  return { key: src.key, label: src.label, blurb: src.blurb, base: src.base, tourUrl: src.tourUrl, count, eras };
});

const data = {
  totals: Object.fromEntries(catalogs.map((c) => [c.key, c.count])),
  catalogs,
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");
console.log(`Wrote ${OUT}`);
for (const c of catalogs) {
  console.log(`  ${c.label}: ${c.count} entries across ${c.eras.length} eras`);
  for (const e of c.eras) console.log(`    ${e.name} — ${e.items.length}`);
}
