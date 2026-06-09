# Authoring the Sutro Almanac

How the site is built and how to update it. Read this before adding a recap, a
meeting note, or a challenge page.

## The spine

Monthly recaps are the primary record. Weekly recaps zoom into a single week.
Catch-ups are the original status notes the months are written from. Meeting
notes are their own strand. The timeline, insights, projects, and repos pages
derive from all of these. Every claim traces back to a source: a Telegram
message, a shared link, a changelog release, or a catch-up.

## Sources

Every claim traces back to a source, so the Almanac stays auditable. A recap says
what happened and then points at the thing that backs it. The digest scripts only
count and extract, never summarize, so nothing in a recap can be invented.

End every monthly recap with a `## Sources` block. The existing months show the
shape: the changelog releases it leans on, the catch-up it reuses, and the
Telegram topics and dates it draws from, each with a link where one exists.

The full set the Almanac draws from:

| Source | What it provides | Accessed via |
|---|---|---|
| Telegram archive (`telegram.db`) | The private group chat: per-topic messages with sender and date. The raw material recaps are written from. | Read read-only by the digest scripts through `bun:sqlite`. Path defaults to `SUTROYARO/telegram.db`, override with `TELEGRAM_DB`. |
| Generated digests (`digests/`) | Deterministic monthly and weekly extracts: topic volume, deduped links, signal lines, changelog releases, catch-up filenames. | Produced by the digest scripts. The working notes for each recap. |
| SutroYaro changelog (`docs/changelog.md`) | The dated release log of the workspace. The dated spine of the timeline and each month. | Parsed by both digest scripts. |
| SutroYaro catch-ups (`docs/catchups/`) | Dated status notes written before meetings. Reused as the notes a month is written from. | Filename is the date, bucketed by month. Also published in-site under `/catchups`. |
| SutroYaro meeting and session notes | Long-form meeting writeups, transcripts, and exported Google Docs that give meeting context. | Linked from recap prose, published in-site under `/meetings`. |
| Google Docs and Drive | Shared agendas, homework, braindumps, research drafts, and slide decks. | Workspace share links, access restricted to the group. |
| Google Colab | Shared notebooks with runnable experiment code and demos. | Colab `/drive/{id}` share links. |
| GitHub, cybertronai org | The core code: the group's own repos. The most-cited source. | Public GitHub, deep-linked to PRs, issues, commit SHAs, and blob line anchors. |
| GitHub, external repos | Member forks and OSS baselines (karpathy, modded-nanogpt, openevolve, and others). | Public GitHub repo and blob links. |
| GitHub Pages catalogs | The hinton-problems and schmidhuber-problems numpy-stub catalogs with training GIFs, plus findings sites. | Public Pages. The visual tour streams the GIFs from the live `cybertronai.github.io` sites. |
| arXiv | Paper citations that ground the experiments (DMC, EGD, GrokFast, the forward-forward and energy work). | Public `/abs/` and `/pdf/` links. |
| YouTube | Talks, lectures, and demo videos cited for context. | Public watch and `youtu.be` links. |
| X / Twitter | Tweets cited as announcements from researchers in the orbit. | Public `x.com/{user}/status/{id}` links. |
| NotebookLM | AI-assisted research and summary notebooks of the source material. | Public `notebooklm.google.com/notebook/` links. |
| Notability | Shared handwritten meeting and whiteboard notes. | Public `notability.com/n/{id}` links. |
| Modal and Cloud Run | Live hosted demos and infra docs: a Modal app, the sparse-parity solver on Cloud Run. | Public HTTPS endpoints (`*.modal.run`, `*.run.app`). |

Two sources are private and never published raw: the Telegram archive and the
generated `digests/` tree. Both are gitignored. Recaps cite topic and date and
paraphrase rather than quote.

## Where content lives

All content is markdown under `src/content/docs/`. The file id (minus `/index`)
is the route. The deployed site adds the `/SutroAlmanac` base on top.

| Type | File | Route |
|---|---|---|
| Monthly recap | `recaps/2026-06.md` | `/recaps/2026-06` |
| Weekly recap | `recaps/weekly/2026-06-01.md` (the Monday) | `/recaps/weekly/2026-06-01` |
| Catch-up | `catchups/2026-05-20.md` | `/catchups/2026-05-20` |
| Meeting | `meetings/meeting-9-notes.md` | `/meetings/meeting-9-notes` |
| Challenge | `challenges/sparse-parity.md` | `/challenges/sparse-parity` |
| Hub pages | `meetings/index.md`, `challenges/index.md` | `/meetings`, `/challenges` |
| Core pages | `intro.md`, `timeline.md`, `projects.md`, `insights.md`, `repos.md` | `/intro`, and so on |
| Reference pages | `decisions.md`, `records.md`, `glossary.md` | `/decisions`, `/records`, `/glossary` |

Routing is automatic from the file id. The header nav is the `nav` array in
`src/layouts/Layout.astro`; the footer carries the full map. Three pages are
generated from the collections and never edited by hand: the recaps hub
(`src/pages/recaps/index.astro`), the archive (`src/pages/archive.astro`), and
search (`src/pages/search.astro`). Drop a new recap file in and the hub, the
archive, the RSS feed, the freshness stamp in the footer, and the landing-page
CTA all pick it up at build time.

## Frontmatter

Every page needs `title` and `description`, validated by `src/content.config.ts`.
Any other key is ignored. Quote any value that contains a colon, or the YAML
parser fails the build.

```md
---
title: "Week of June 1, 2026"
description: "Auto-research loops after the Modal hackathon, and the four challenges."
---
```

## How a recap gets written

1. Regenerate the digests. These are deterministic, no-LLM extracts of the
   Telegram archive and the SutroYaro docs. They are the raw material a recap is
   written from. Requires [bun](https://bun.sh) for the sqlite reader, and a
   SutroYaro clone (it holds `telegram.db` and `docs/`).

   ```bash
   SUTROYARO=../SutroYaro bun scripts/build-digest.ts          # monthly
   SUTROYARO=../SutroYaro bun scripts/build-weekly-digest.ts   # weekly
   ```

   Output lands in `digests/`, which is gitignored and holds private message
   text. Never publish it.

2. For a weekly, scaffold the file and refresh the published counts:

   ```bash
   node scripts/new-week.mjs            # most recent Monday, or pass YYYY-MM-DD
   node scripts/build-weekly-stats.mjs  # counts-only JSON shown under weekly titles
   ```

3. Write the recap from the digest. Every claim should trace to a line in the
   digest. No prose from memory. Keep the source links.

4. End every recap, monthly and weekly, with a `## Sources` block (see
   [Sources](#sources)). The hubs and archive update themselves; nothing to link
   by hand.

## Writing standards

The site carries no AI-slop. The hard rules:

- No em-dashes or en-dashes. Use a comma, a period, or the word "to".
  Smartypants is off in the build, so a double hyphen stays a double hyphen.
- No arrows of any kind, text or unicode.
- No three-item rhetorical lists. Use two items, or write it as a sentence. A
  real table or a real list of people or metrics is fine.
- Plain verbs: "used" not "leveraged", "showed" not "showcased". Use "is" and
  "has", not "serves as" or "represents".
- Avoid the AI vocabulary: crucial, pivotal, leverage, robust, seamless,
  testament, underscore, showcase, foster, harness (as a verb), landscape
  (abstract), realm, nuanced, comprehensive.
- Vary sentence length. Do not end every paragraph on a punchy line.

Center Yad's own work where it is relevant and accurate: SutroYaro (the hub), the
hinton and schmidhuber wave-build catalogs, StackUnderflow, the RL eval
environment, and SutroAna. Do not overstate or invent.

## Privacy

The site is public. The digests are not.

- Never publish verbatim private Telegram messages. Paraphrase into reported
  speech.
- Catch-ups come from the SutroYaro status docs, not Telegram, so they keep their
  wording, but still redact contact details and dollar figures before they go in.
- Remove personal contact details: emails, phone numbers, street addresses.
- Drop dollar figures and career or fundraising details tied to a named person.
- Real names with public professional affiliations are kept where they already
  appear across the recaps. When in doubt, leave it out.

## Links and the base path

The deployed site lives under `/SutroAlmanac`. Do not hardcode that in content.
Write internal links root-absolute:

```md
See the [June recap](/recaps/2026-06) and [sparse parity](/challenges/sparse-parity).
```

The build adds the base automatically: a rehype plugin for markdown, and
`import.meta.env.BASE_URL` for the `.astro` files. Local dev stays at the root.

## Visual tour

The tour renders from `src/data/visual-tour.json`. Regenerate it from the catalog
tour sources:

```bash
node scripts/build-visual-tour.mjs
```

The GIFs stream from each catalog's own GitHub Pages, so nothing is bundled. The
generator strips dashes and arrows out of the catalog text.

## Build, verify, deploy

```bash
npm run dev                              # local, served at the root
SUTRO_BASE=/SutroAlmanac npm run build   # production build under the base path
```

`npm run build` chains three steps: `astro build`, the Pagefind index over
`dist/`, and `scripts/check-style.mjs`. The checker fails the build if any built
page carries an em-dash, en-dash, arrow, or ellipsis (raw or entity), or if any
internal link does not resolve to a file in `dist/`. CI runs the same command,
so a violation cannot deploy. The dev server has no search index; the search
page says so until a production build runs.

Push to `main`. GitHub Actions builds and deploys to
https://cybertronai.github.io/SutroAlmanac/.

## Adding next week

1. `SUTROYARO=../SutroYaro bun scripts/build-weekly-digest.ts` (and
   `build-digest.ts` too if the month rolled over).
2. `node scripts/new-week.mjs` to scaffold the weekly, then
   `node scripts/build-weekly-stats.mjs` to refresh the published counts.
3. Write the recap from the digest, ending with its `## Sources` block.
4. If a meeting happened, add `meetings/<slug>.md` and link it from
   `meetings/index.md` (the one hub still curated by hand).
5. Update the current monthly recap, or start a new month file. Hubs, archive,
   RSS, and the landing CTA update themselves.
6. `SUTRO_BASE=/SutroAlmanac npm run build` (style and link checks run inside).
7. Commit and push.
