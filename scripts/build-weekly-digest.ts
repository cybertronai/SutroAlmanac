// Weekly digest builder. Companion to build-digest.ts; buckets the Telegram
// archive by Monday-week and emits one deterministic digest per week to
// digests/weekly/. No LLM in extraction, so source material cannot be invented.
// Run: bun scripts/build-weekly-digest.ts

import { Database } from "bun:sqlite";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SUTROYARO =
  process.env.SUTROYARO ?? "../SutroYaro";
const DB_PATH = process.env.TELEGRAM_DB ?? join(SUTROYARO, "telegram.db");
const DOCS_DIR = join(SUTROYARO, "docs");
const OUT_DIR = join(import.meta.dir, "..", "digests", "weekly");

const day10 = (d) => d.slice(0, 10);
function weekKey(dateStr) {
  const d = new Date(dateStr);
  const dow = (d.getUTCDay() + 6) % 7; // 0 = Monday
  d.setUTCDate(d.getUTCDate() - dow);
  return d.toISOString().slice(0, 10);
}
const oneLine = (s, n = 220) => {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > n ? t.slice(0, n - 1) + "..." : t;
};
const URL_RE = /https?:\/\/[^\s<>()\[\]"'`]+/g;
const stripTrail = (u) => u.replace(/[.,;:!?)\]]+$/, "");
function category(url) {
  const u = url.toLowerCase();
  if (u.includes("arxiv.org")) return "arxiv";
  if (u.includes("github.com")) return "github";
  if (u.includes("colab.research.google") || u.includes("colab.google")) return "colab";
  if (u.includes("docs.google.com") || u.includes("drive.google.com")) return "gdocs";
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("x.com/") || u.includes("twitter.com")) return "twitter";
  return "other";
}
const SIGNALS = [
  ["decisions", /\b(decid(?:e|ed|es|ing)|decision|agreed|consensus|going with|conclusion|resolved that)\b/i],
  ["results", /\b(result|finding|headline|solved|beats?|outperforms?|speedup|\d+x\s*(?:faster|fewer|better|cheaper|lower|worse)|wins?\b|works now|fails? (?:completely|at)|breakthrough)\b/i],
  ["questions", /(?:\?\s*$|\bopen question\b|\bnext step|\btodo\b|\bfollow.?up\b|\bshould we\b|\bquestion:)/i],
];

const db = new Database(DB_PATH, { readonly: true });
const rows = db
  .query(
    `SELECT m.id, t.title AS topic, m.date, m.sender, m.text
     FROM messages m JOIN topics t ON t.id = m.topic_id ORDER BY m.date ASC`
  )
  .all();
db.close();

const byWeek = new Map();
for (const r of rows) {
  const k = weekKey(r.date);
  if (!byWeek.has(k)) byWeek.set(k, []);
  byWeek.get(k).push(r);
}

function clByWeek() {
  const p = join(DOCS_DIR, "changelog.md");
  const byW = new Map();
  if (!existsSync(p)) return byW;
  let cur = null;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const h = line.match(/^##\s+\[([^\]]+)\]\s*-\s*(\d{4}-\d{2}-\d{2})/);
    if (h) {
      cur = { version: h[1], date: h[2], sections: [] };
      const k = weekKey(h[2]);
      if (!byW.has(k)) byW.set(k, []);
      byW.get(k).push(cur);
      continue;
    }
    const s = line.match(/^###\s+(.+)/);
    if (s && cur) cur.sections.push(s[1].trim());
  }
  return byW;
}
const changelog = clByWeek();

mkdirSync(OUT_DIR, { recursive: true });
const weeks = [...byWeek.keys()].sort();
const index = ["# Weekly digest index", ""];

for (const wk of weeks) {
  const msgs = byWeek.get(wk);
  const topicMap = new Map();
  for (const m of msgs) {
    if (!topicMap.has(m.topic)) topicMap.set(m.topic, { n: 0, senders: new Set() });
    const t = topicMap.get(m.topic);
    t.n++;
    t.senders.add(m.sender);
  }
  const links = new Map();
  for (const m of msgs) {
    const f = m.text.match(URL_RE);
    if (!f) continue;
    for (let u of f) {
      u = stripTrail(u);
      if (links.has(u)) { links.get(u).count++; continue; }
      links.set(u, { url: u, cat: category(u), date: day10(m.date), sender: m.sender, topic: m.topic, snippet: oneLine(m.text) });
    }
  }
  const sig = { decisions: [], results: [], questions: [] };
  for (const m of msgs) {
    if (!m.text) continue;
    for (const [name, re] of SIGNALS) if (re.test(m.text)) sig[name].push(m);
  }
  const substantive = [...msgs]
    .filter((m) => m.text && !/^https?:\/\/\S+$/.test(m.text.trim()))
    .sort((a, b) => b.text.length - a.text.length)
    .slice(0, 12);

  const out = [];
  out.push(`# Weekly digest - week of ${wk}`);
  out.push("");
  out.push("> Deterministic extract. Contains private message text; do not publish raw.");
  out.push("");
  out.push(`## Volume - ${msgs.length} messages`);
  out.push("");
  out.push("| Topic | Msgs | People |");
  out.push("|---|--:|--:|");
  for (const [topic, t] of [...topicMap.entries()].sort((a, b) => b[1].n - a[1].n))
    out.push(`| ${topic} | ${t.n} | ${t.senders.size} |`);
  out.push("");
  out.push(`## Links - ${links.size} unique`);
  out.push("");
  for (const l of [...links.values()].sort((a, b) => a.date.localeCompare(b.date))) {
    out.push(`- ${l.date} · ${l.sender} · _${l.topic}_ (${l.cat}) - <${l.url}>`);
    out.push(`  > ${l.snippet}`);
  }
  out.push("");
  for (const [name] of SIGNALS) {
    const arr = sig[name].slice(0, 30);
    out.push(`## ${name} (${sig[name].length})`);
    for (const m of arr) out.push(`- ${day10(m.date)} · ${m.sender} · _${m.topic}_ - ${oneLine(m.text, 200)}`);
    out.push("");
  }
  out.push("## Longest messages");
  for (const m of substantive) out.push(`- ${day10(m.date)} · ${m.sender} · _${m.topic}_ - ${oneLine(m.text, 260)}`);
  out.push("");
  const cl = changelog.get(wk) || [];
  if (cl.length) {
    out.push("## Changelog this week");
    for (const v of cl) out.push(`- v${v.version} (${v.date})${v.sections.length ? ` - ${v.sections.join("; ")}` : ""}`);
    out.push("");
  }
  writeFileSync(join(OUT_DIR, `${wk}.md`), out.join("\n"));
  index.push(`- ${wk}: ${msgs.length} msgs, ${links.size} links`);
}
writeFileSync(join(OUT_DIR, "index.md"), index.join("\n") + "\n");
console.log(`Wrote ${weeks.length} weekly digests to ${OUT_DIR}`);
for (const w of weeks) console.log(`  ${w}: ${byWeek.get(w).length} msgs`);
