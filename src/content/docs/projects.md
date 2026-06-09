---
title: Projects & Initiatives
description: The paper-implementation builds, the four challenges, and the tooling behind them.
---

The group runs several energy-efficient-learning challenges at once, plus the
agent-built catalogs and tools that feed them. The authoritative challenge index is
SutroYaro's [challenge doc](https://github.com/cybertronai/SutroYaro/blob/main/docs/challenges.md);
the repo map is on [Repos & Tools](/repos/).

## Paper-implementation wave builds

Two catalogs of runnable paper reproductions, built by agent swarms that Yad
operated with the wave-build method. This is the lab's largest agent-driven
engineering effort so far.

- **[hinton-problems](https://github.com/cybertronai/hinton-problems)** ([site](https://cybertronai.github.io/hinton-problems/)):
  53 pure-numpy stubs of Hinton's representational work. 27 reproduce the paper
  result, 25 are partial, 1 is an honest non-replication. Shipped May 3 across 11
  waves.
- **[schmidhuber-problems](https://github.com/cybertronai/schmidhuber-problems)** ([site](https://cybertronai.github.io/schmidhuber-problems/)):
  58 pure-numpy stubs of Schmidhuber's algorithmic work. 32 reproduce, 25 partial, 1
  non-replication. About 41 hours of wall time and roughly 1.15 billion tokens across
  12 waves.

Yad ran both swarms. The method is one SPEC issue, one `TeamCreate`, a fresh team of
agents per wave (one agent per stub), one pull request per wave, an audit agent per
wave, and merges gated on the driver. It is packaged as the
[auto-research-loop kit](https://github.com/cybertronai/SutroYaro/blob/main/docs/auto-research-loop/index.md)
so a second operator can drive it. The measured cost on the Schmidhuber run: about 8
of 40 driver prompts were load-bearing, at roughly 25.7 lead turns per prompt. More
on the method in [Insights](/insights/).

The catalogs feed a two-pass filter. v2 keeps the stubs ByteDMD can instrument; v3
keeps the subset the Bill Dally 2D-grid model can instrument. The survivors become
the next competition.

## The four challenges

Each challenge is a small, reproducible problem with its own repo and leaderboard.

| # | Challenge | What it is | Where | Cost metric |
|---|-----------|------------|-------|-------------|
| 1 | Sparse parity | Learn a k-bit XOR from noisy ±1 inputs. The group's drosophila. | [sparse-parity-challenge](https://github.com/cybertronai/sparse-parity-challenge) | ByteDMD |
| 2 | Energy-efficient matmul | Minimum-energy 16×16 matmul as an IR on a 2D grid. | [sutro-problems/matmul](https://github.com/cybertronai/sutro-problems) | Dally 2D-grid |
| 3 | Sparse parity on the grid | Solve sparse parity in about 9 grid instructions. | [sutro-problems/sparse-parity](https://github.com/cybertronai/sutro-problems) | Dally 2D-grid |
| 4 | wikitext | Train a WikiText-103 LM for minimum Joules. | [cybertronai/wikitext](https://github.com/cybertronai/wikitext) | GPU energy (NVML) |

**#1 Sparse parity.** The original benchmark. The submission pipeline, which Yad
built, is live and scored under ByteDMD, with submissions as recent as May 12. KM-min
and GF(2) lead, though neither has been re-measured under the byte-level metric.

**#2 Energy-efficient matmul.** Active hill-climbing on Bill Dally's 2D grid. The
16×16 record fell to 67,821 in mid-May. Lower bounds are an open hard problem: an
agent-generated bound was wrong on inspection, and AlphaTensor could not bound 4×4
either. The scorer is locked. Active: Cosmin Negruseri, Sung Jae Bae, Anastasiia
Zhiboedova.

**#3 Sparse parity on the grid.** Launched May 8. Precomputing intermediate XORs plus
bit-packing works; tiling does not help at this size. The small op set makes it hard
to cheat. Open: whether integer and 8-bit instruction sets beat floating point.

**#4 wikitext.** The largest-scale challenge, led by Armins. The baseline
`modded_nanogpt` runs at 54,784 J, 0.7285 character-accuracy, 322.7 s. A
forward-forward entry reaches about 0.39 accuracy at roughly 10× fewer Joules. Open:
whether to count CPU energy (RAPL), and whether cross-entropy becomes a separate
scored track. Active: Armins, Gabriel Nakajima An.

## SutroAna and adjacent frameworks

- **[SutroAna](https://github.com/adotzh/SutroAna)** (Anastasiia Zhiboedova): an agent
  harness for a focused "improve this one problem" loop, applied to the matmul
  challenge. Yaroslav confirmed it runs out of the box. Shared in early May.
- **autoresearch-distillation** (Silen Naihin): a parallel auto-research effort with
  its own experiment-organization pattern (a root hypothesis README, a
  next-experiments file, an experiments log).

## The tooling underneath

- **[SutroYaro](https://github.com/cybertronai/SutroYaro)**: Yad's research workspace
  and the lab's dispatch hub. It holds the locked evaluation harness, the autonomous
  agent loop, the RL evaluation environment, and the Telegram sync. Full map on
  [Repos & Tools](/repos/).
- **[StackUnderflow](https://github.com/0bserver07/StackUnderflow)**: Yad's
  session-indexing tool. It indexes past AI coding sessions so prior decisions and
  failures can be queried before redoing work.

## Open questions

- How much room for improvement is there using structure-specific solvers instead of
  gradient descent? Sparse parity showed a large gap for one structured task. Nobody
  has mapped how far it generalizes.
- What is a toy attention-optimization problem whose result tracks the full LLM
  training setting?
- Should cross-entropy be a wikitext track, given the preference not to require
  explicit probability distributions?
- What do the hinton and schmidhuber catalogs look like once scored under ByteDMD?
