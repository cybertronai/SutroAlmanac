# Authoring the Sutro Almanac

How the site is built and how to update it. Read this before adding a recap, a
meeting note, or a challenge page.

## The spine

Monthly recaps are the primary record. Weekly recaps zoom into a single week.
Catch-ups are the original status notes the months are written from. Meeting
notes are their own strand. The timeline, insights, projects, and repos pages
derive from all of these. Every claim traces back to a source: a Telegram
message, a shared link, a changelog release, or a catch-up.

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
| Hub pages | `recaps/index.md`, `meetings/index.md`, `challenges/index.md` | `/recaps`, `/meetings`, `/challenges` |
| Core pages | `intro.md`, `timeline.md`, `projects.md`, `insights.md`, `repos.md` | `/intro`, and so on |

## Frontmatter

Every page needs `title` and `description`. Quote any value that contains a
colon, or the YAML parser fails the build.

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

2. Write the recap from the digest. Every claim should trace to a line in the
   digest. No prose from memory. Keep the source links.

3. Link the new page from its hub (see the checklist at the end).

## Writing standards

The site carries no AI-slop. The hard rules:

- No em-dashes or en-dashes. Use a comma, a period, or the word "to".
  Smartypants is off in the build, so a double hyphen stays a double hyphen.
- No arrows of any kind, text or unicode.
- No three-item rhetorical lists. Use two, or one, or write it as a sentence. A
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

Verify the built HTML carries no dashes or arrows before pushing:

```bash
python3 - <<'PY'
import glob
bad = set(chr(c) for c in (0x2014, 0x2013, 0x2015, 0x2192, 0x2190, 0x2194, 0x21d2, 0x2026))
for f in glob.glob('dist/**/*.html', recursive=True):
    hit = {c for c in bad if c in open(f, encoding='utf-8').read()}
    if hit: print(f, hit)
PY
```

Push to `main`. GitHub Actions builds and deploys to
https://cybertronai.github.io/SutroAlmanac/.

## Adding next week

1. `SUTROYARO=../SutroYaro bun scripts/build-weekly-digest.ts` (and
   `build-digest.ts` too if the month rolled over).
2. Add `src/content/docs/recaps/weekly/<Monday>.md` with frontmatter, written
   from the digest.
3. Link it in `recaps/index.md` under the right month.
4. If a meeting happened, add `meetings/<slug>.md` and link it from
   `meetings/index.md`.
5. Update the current monthly recap, or start a new month file and add it to
   `recaps/index.md`.
6. Run the dash scan and `npm run build`.
7. Commit and push.
