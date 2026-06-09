---
title: Timeline
description: The Sutro Group story in order, from the energy thesis to a four-challenge lab.
---

A chronological index of the work. Each month links to its full
[recap](/recaps/2026-06/); the dated milestones below come from the
SutroYaro [changelog](https://github.com/cybertronai/SutroYaro/blob/main/docs/changelog.md),
the catch-ups, and the recaps.

## February 2026: formation

- The group forms around one thesis: AI training sits orders of magnitude above its
  energy floor, and the waste is data movement, not arithmetic (first archived messages
  Feb 9).
- Agent loops on Karpathy's makemore and microGPT names task prove too slow (about 3
  minutes per run), which pushes the search for a faster toy problem.

Read the [February recap](/recaps/2026-02/).

## March 2026: the repo and GF(2)

- Yad creates [SutroYaro](https://github.com/cybertronai/SutroYaro) (Mar 3) and ships a
  33-experiment survey (v0.9.0, Mar 7).
- GF(2) Gaussian elimination settles sparse parity, about 1000x faster than SGD
  (verified Mar 9), while local learning rules fail at chance.
- The repo moves to the [cybertronai](https://github.com/cybertronai) org (Mar 14).
- Meeting #9 (Mar 16) shifts the cost metric from ARD to DMC.
- Yad's RL eval environment (PR #49), agent loop, Telegram sync (issue #58), and the
  sparse-parity-challenge pipeline all land (late March).
- First weekly catch-up (Mar 22).

Read the [March recap](/recaps/2026-03/).

## April 2026: ByteDMD

- ByteDMD is adopted as the primary metric (v0.27.0, Apr 14): byte-granularity, pure
  Python, no numpy escape hatch.
- Yad and Seth's floor-gap survey measures the distance to the best possible. KM-min
  sits 3.8x above the read-floor, GF(2) 1,450x (v0.29.0).
- Yad ships StackUnderflow (Apr 21).
- Challenge #2, energy-efficient matmul, launches (Apr 30).
- Yaroslav pivots from treating ByteDMD as a bound to modeling energy directly on a 2D
  Manhattan grid (Apr 27).

Read the [April recap](/recaps/2026-04/).

## May 2026: four challenges

- Yad's wave-build swarms ship two catalogs:
  [hinton-problems](https://github.com/cybertronai/hinton-problems) (53 stubs, May 3)
  and [schmidhuber-problems](https://github.com/cybertronai/schmidhuber-problems) (58
  stubs, May 8).
- Challenge #3, sparse parity on the grid, opens (May 8); the
  [wikitext](https://github.com/cybertronai/wikitext) challenge gets its own repo (May
  12).
- SutroYaro is reshuffled to its lab-memory role, and Yad's Telegram sync expands from
  6 to all 11 forum topics (v0.30.0, May 20).
- A Modal hackathon centered on auto-research loops (May 30 and 31).

Read the [May recap](/recaps/2026-05/).

## June 2026: auto-research loops

- Yad's auto-research-loop dispatcher kit and a worked LeCun SPEC ship (v0.31.0, May
  29), packaging the wave-build method for a second operator.
- A new thread opens on a structure-specific optimizer for self-attention.
- The hackathon is debriefed at the June 1 meeting. This Almanac begins.

Read the [June recap](/recaps/2026-06/).
