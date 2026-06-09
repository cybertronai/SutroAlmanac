---
title: Records
description: The current best result on each challenge, dated and traced to the page that states it.
---

Each challenge scores one cost metric, and the record is the best result the group has measured on it. Every number below is taken from a challenge page or a monthly recap and links to the page that states it.

| Challenge | Metric | Current best | Holder | As of | Source |
|---|---|---|---|---|---|
| [#1 Sparse parity](/challenges/sparse-parity) | ByteDMD, byte-granularity data movement | DMC 3,578 (KM-min, legacy element-level metric) | Not named | March 22, 2026 | [March recap](/recaps/2026-03) |
| [#2 Energy-efficient matmul](/challenges/matmul) | Dally 2D-grid cost model | 67,821 (16x16) | Not named | May 14, 2026 | [May recap](/recaps/2026-05) |
| [#3 Sparse parity on the grid](/challenges/grid-parity) | Dally 2D-grid cost model | No record stated yet | None yet | June 2026 | [June recap](/recaps/2026-06) |
| [#4 wikitext](/challenges/wikitext) | GPU energy in Joules (NVML) at fixed accuracy and wall-clock time | No record stated yet (baseline 54,784 J) | None yet | June 2026 | [June recap](/recaps/2026-06) |

## Challenge #1: Sparse parity

The best stated mark is DMC 3,578, set by KM-min, a single-sample Kushilevitz-Mansour variant, in the first DMC baseline sweep on March 22, 2026, 58% below the GF(2) baseline ([March recap](/recaps/2026-03)). The metric has moved since, so the mark carries a qualifier.

- March 16, 2026: Meeting #9 replaces the raw read-and-write count (ARD) with Data Movement Complexity (DMC), which weights each access by the square root of its reuse distance.
- March 22, 2026: the first DMC sweep reorders the leaderboard. GF(2) wins on DMC even though KM wins on ARD, and KM-min takes the new best at DMC 3,578.
- April 2026: Seth Stafford finds the top entry doing bit-packed GF(2) work the element-level tracker never saw; counted honestly, its cost moves from about 45K to 81K. ByteDMD becomes the primary metric on April 14 ([April recap](/recaps/2026-04)).
- April 23 to 25, 2026: the floor-gap survey measures KM-min at ByteDMD 268, which is 3.8x the read-floor of about 70, and GF(2) at ByteDMD 101,501.

As of June 2026, KM-min and GF(2) elimination lead, both still scored under the legacy element-level metric and not yet re-measured under ByteDMD ([challenge page](/challenges/sparse-parity)). Whether oracle-query KM-min counts as a fair reference floor is an open question, since it is not benchmark-submittable. Submissions run through [sparse-parity-challenge](https://github.com/cybertronai/sparse-parity-challenge), with entries as recent as May 12.

## Challenge #2: Energy-efficient matmul

The 16x16 record on the Dally grid stands at 67,821 ([challenge page](/challenges/matmul)). The [May recap](/recaps/2026-05) dates that mark to May 14, 2026 and does not name its holder; the challenge page calls it mid-May. The progression:

- May 5, 2026: 68,452, Sung Jae Bae.
- May 13, 2026: 68,392, Cosmin Negruseri.
- May 14, 2026: 67,821, holder not named in the sources. Cosmin Negruseri was running a Codex-driven auto-research loop that produced a steady stream of small PRs in this window.

Lower bounds are an open hard problem: an agent-generated bound was wrong on inspection, and AlphaTensor could not bound 4x4 either. Submissions go to [sutro-problems](https://github.com/cybertronai/sutro-problems), the `matmul/` directory, where the scorer is locked.

## Challenge #3: Sparse parity on the grid

No record stated yet. The challenge launched May 8, 2026 and scores the Dally 2D-grid cost model in [sutro-problems](https://github.com/cybertronai/sutro-problems), the `sparse-parity/` directory ([challenge page](/challenges/grid-parity)). What the [May recap](/recaps/2026-05) and the challenge page report so far: precomputing intermediate XORs plus bit-packing works well, while tiling does not help at this problem size. A 50%-accuracy target variant has been added.

## Challenge #4: wikitext

No record stated yet. The reference point is the baseline: `modded_nanogpt` runs at 54,784 J and 0.7285 character-accuracy in 322.7 s, with GPU energy measured through NVML on Modal ([challenge page](/challenges/wikitext); the numbers are reported in the [May recap](/recaps/2026-05)). A forward-forward submission reaches about 0.39 accuracy at roughly 10x fewer Joules, below the baseline's accuracy. The challenge got its own repo, [cybertronai/wikitext](https://github.com/cybertronai/wikitext), on May 12, 2026, with Armins leading. The open scoring questions are whether CPU package energy (RAPL) should also count and whether cross-entropy becomes a separate scored track ([June recap](/recaps/2026-06)).
