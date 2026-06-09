# Sutro Almanac

The running record of the Sutro Group, an energy-efficient-AI study group that
meets Mondays at South Park Commons. Monthly and weekly recaps, the four
challenges, catch-ups, meeting notes, and a visual tour of the hinton and
schmidhuber paper-implementation catalogs. Every claim traces back to a source.

Live at https://cybertronai.github.io/SutroAlmanac/. Built with Astro.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build        # outputs ./dist/
```

The deployed GitHub Pages build serves under a project path, set with an env var:

```bash
SUTRO_BASE=/SutroAlmanac npm run build
```

Local dev stays at the root, so the base only applies to the Pages build.

## Visual tour data

The visual tour renders from `src/data/visual-tour.json`. Regenerate it from the
catalog tour sources with:

```bash
node scripts/build-visual-tour.mjs
```

## Updating the Almanac

See [AUTHORING.md](AUTHORING.md) for the content spine, file layout, frontmatter
and writing standards, the privacy convention, and a step-by-step checklist for
adding next week's recaps and meeting notes.

The recaps are written from deterministic digests of the Telegram archive and
the SutroYaro docs. Regenerate them (requires [bun](https://bun.sh) and a
SutroYaro clone):

```bash
SUTROYARO=../SutroYaro bun scripts/build-digest.ts          # monthly
SUTROYARO=../SutroYaro bun scripts/build-weekly-digest.ts   # weekly
```

Output lands in `digests/` (gitignored, private).
