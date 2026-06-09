---
title: "Challenge #1: Sparse parity"
description: Learn a k-bit XOR from noisy inputs for the least data movement. The group's first benchmark.
---

The original benchmark, the group's drosophila. Learn `y` as the XOR of k secret bits from n random plus-or-minus-one inputs (standard n=20, k=3, with 17 noise bits).

## Where it lives

[sparse-parity-challenge](https://github.com/cybertronai/sparse-parity-challenge) runs the submission pipeline, which Yad built: open a GitHub issue with a `solve()` function, CI scores it under ByteDMD and posts to the leaderboard. The research code migrated there from SutroYaro in May 2026.

## Cost metric

ByteDMD, byte-granularity data movement measured in pure Python.

## State

The pipeline is live, with submissions as recent as May 12. KM-min and GF(2) elimination lead, both measured under the legacy element-level metric and not yet re-measured under ByteDMD. The Telegram channel has been quiet since March; the work moved to GitHub.

## The result that settled it

GF(2) Gaussian elimination solves parity directly, about 1000x faster than SGD, because parity is linear over GF(2). Local learning rules (Hebbian, predictive coding, equilibrium propagation, target propagation) all fail at chance, since parity has no low-order statistical signal. See the [March recap](/recaps/2026-03/).

## Open question

Whether oracle-query KM-min counts as a fair reference floor, even though it is not benchmark-submittable.
