---
title: Insights & Reusables
description: Findings and methods worth carrying into the next experiment.
---

The distilled layer: results and methods worth reusing instead of rederiving.

## Findings

- Exact methods beat gradient descent on the energy metric for structured tasks. On
  sparse parity, GF(2) Gaussian elimination and the Kushilevitz-Mansour influence
  estimator solve the problem at a tiny fraction of SGD's data-movement cost, because
  parity is linear over GF(2). This is the source of the group's recurring question:
  how much room is there to beat gradient descent by exploiting structure?
- Data movement, not arithmetic, is the cost. This is the premise behind ByteDMD and
  the whole challenge set. Backprop's poor commute-to-compute ratio is the thing to
  beat.
- Local learning rules fail at parity. Hebbian, predictive coding, equilibrium
  propagation, and target propagation all land at chance, because parity needs the full
  k-th-order interaction.
- A metric gets gamed unless it counts what the hardware pays for. A top sparse-parity
  entry escaped element-level tracking via `np.asarray()` to do bit-packed GF(2) on raw
  Python ints; counting those ops honestly nearly doubled its measured cost.
  Byte-granularity tracking in pure Python closes that escape hatch.
- Negative results are first-class. The NoProp experiment solved parity but did not
  beat SGD plus Curriculum, and was published as a clean negative finding rather than
  retrofitted to the new metric.

## Methods

- Yad's wave-build. The method that produced the hinton and schmidhuber catalogs: one
  SPEC issue, one TeamCreate, waves of fresh teammates (one per stub), one pull request
  per wave, an audit agent per wave, and merges gated on the driver. Fresh teammates
  each wave keep later waves on full context. It is packaged as the
  [auto-research-loop kit](https://github.com/cybertronai/SutroYaro/tree/main/docs/auto-research-loop)
  so a second operator can run it.
- Capture the human contribution. Because agents emit unlimited text while human input
  stays sparse, the load-bearing prompts (about 20% of them, 8 of 40 on the Schmidhuber
  run) should be captured in every PR. The durable lessons belong in the SPEC and the
  TeamCreate contract, not in the driver's head.
- Run the loop on a new researcher. The kit generalizes the method beyond Hinton and
  Schmidhuber, with a worked LeCun SPEC as the template. The loop has run end to end
  twice, both driven by Yad; whether a fresh driver can reproduce a catalog without his
  tacit knowledge, and at what autonomy ceiling (about 25.7 lead turns per load-bearing
  prompt), is an open test, not a settled result.
- Query your own past sessions before redoing work. Yad's StackUnderflow indexes prior
  AI coding sessions locally; check it for a past decision or failure mode before
  spending tokens rederiving one.

## Tools at a glance

| Tool | Use it for |
|------|-----------|
| ByteDMD | Scoring any solver on byte-granularity data-movement cost |
| Yad's auto-research-loop kit | Reproducing a body of work as runnable stubs with a team of agents |
| StackUnderflow | Recalling past coding-session decisions and failures |
| hinton / schmidhuber catalogs | Reusable numpy baselines for representational and algorithmic tasks |
