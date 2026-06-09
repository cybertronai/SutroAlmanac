---
title: Repos & Tools
description: The map of Sutro repos and the tooling around them, starting with the hub.
---

The Sutro work lives across many repos rather than one codebase. SutroYaro is the hub
the rest hang off.

## SutroYaro, the hub

[SutroYaro](https://github.com/cybertronai/SutroYaro) is Yad's research workspace and
the lab's memory and dispatcher. It holds:

- the locked evaluation harness (agents run against it but cannot edit the metric),
- the autonomous agent loop and peer-research protocol (`bin/run-agent`, `AGENT.md`),
- the RL evaluation environment (`SparseParity-v0`, `MultiChallenge-v0`) Yad built in
  [PR #49](https://github.com/cybertronai/SutroYaro/pull/49),
- the agent infrastructure (hooks, rules, skills) from
  [PR #50](https://github.com/cybertronai/SutroYaro/pull/50),
- the Telegram-to-SQLite sync (`bin/tg-sync`, `bin/tg-post`, `bin/tg-auth`) Yad built
  for [issue #58](https://github.com/cybertronai/SutroYaro/issues/58),
- the curated findings, the changelog, and the cross-repo index.

The research code has since moved out into the challenge repos, leaving SutroYaro as
the lab notebook and dispatch hub. Steward: Yad.

## Challenge repos

| Repo | What it is |
|------|------------|
| [sparse-parity-challenge](https://github.com/cybertronai/sparse-parity-challenge) | Submission pipeline for challenge #1: submit a `solve()` function, auto-evaluated under ByteDMD. Built by Yad. |
| [sutro-problems](https://github.com/cybertronai/sutro-problems) | The matmul and grid sparse-parity challenges (#2, #3), plus room to experiment. |
| [wikitext](https://github.com/cybertronai/wikitext) | The WikiText-103 energy challenge (#4), led by Armins. |

## Cost models and core code

| Repo | What it is |
|------|------------|
| [ByteDMD](https://github.com/cybertronai/ByteDMD) | The byte-granularity data-movement metric. The active research front is at `experiments/grid`. |
| [simplified-dally-model](https://github.com/cybertronai/simplified-dally-model) | A 2D Manhattan-grid cost model, candidate replacement for the 1D pJ numbers. |
| [sutro](https://github.com/cybertronai/sutro) | The main code repo, including `sparse_parity_benchmark.py`. |

## Paper-implementation catalogs

| Repo | What it is |
|------|------------|
| [hinton-problems](https://github.com/cybertronai/hinton-problems) | 53 numpy stubs of Hinton's work, built by Yad's wave-build swarm. [Site](https://cybertronai.github.io/hinton-problems/). |
| [schmidhuber-problems](https://github.com/cybertronai/schmidhuber-problems) | 58 numpy stubs of Schmidhuber's work, same method. [Site](https://cybertronai.github.io/schmidhuber-problems/). |

Build details are on [Projects](/projects/).

## Yad's tooling

- **[StackUnderflow](https://github.com/0bserver07/StackUnderflow)**: indexes past AI
  coding sessions locally, so you can query a prior decision or failure before redoing
  work. One-line install.
- **[Auto-research-loop kit](https://github.com/cybertronai/SutroYaro/tree/main/docs/auto-research-loop)**:
  the wave-build method packaged as a brief plus copy-paste templates, so a second
  operator can reproduce a researcher's body of work as runnable stubs. See
  [Insights](/insights/).

## Other frameworks

- **[SutroAna](https://github.com/adotzh/SutroAna)** (Anastasiia Zhiboedova): an
  independent auto-research harness for a focused "improve this one problem" loop,
  used on the matmul challenge. Runs out of the box.
