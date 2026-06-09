---
title: Introduction
description: What the Sutro Group is, what the Almanac is, and how to read it.
---

## The group

The Sutro Group is a study group on energy-efficient AI training. It meets weekly,
Mondays at 6pm at South Park Commons (380 Brannan St) in San Francisco, and over
video. The work is spread across many small, reproducible challenges and the GitHub
repos behind them.

Yaroslav Bulatov leads it (early Google Brain and OpenAI, creator of gradient
checkpointing). Yad Konrad runs the agent-driven engineering: SutroYaro (the lab's
workspace and dispatch hub), the wave-build method that produced the hinton and
schmidhuber catalogs, the sparse-parity-challenge pipeline, and StackUnderflow.
Regular contributors include Seth Stafford, Andy Zhang, Armins, Gabriel Nakajima An,
Cosmin Negruseri, Sung Jae Bae, and Anastasiia Zhiboedova.

## The north star

The thesis: on modern hardware, arithmetic is effectively free and data movement is
the real energy cost. Backprop pays a heavy commute-to-compute ratio, because every
gradient step re-fetches activations and weights through the memory hierarchy. The
recurring question is how much better than gradient descent you can do by exploiting a
problem's structure.

The shared cost metric is ByteDMD (byte-granularity data movement), which became the
primary metric in April 2026. Earlier work used Average Reuse Distance, an
element-level count.

## What the Almanac is

The research moves faster than any one person can track. This site is the running
record:

- [Timeline](/timeline/): the work in order.
- [Recaps](/recaps/2026-06/): monthly snapshots of where everything
  stands.
- [Projects & Initiatives](/projects/): the wave-build implementations,
  the four challenges, and the open questions.
- [Repos & Tools](/repos/): the repo map, starting with SutroYaro.
- [Insights & Reusables](/insights/): the methods and findings worth
  reusing.

## Who it is for

Members catching up after time away, newcomers orienting themselves, and anyone
looking for a result or a tool to reuse instead of rederiving it. Skim it, do not read
it front to back.

## Cadence

Recaps are the periodic layer, written monthly or weekly depending on activity. The
source material is the group's Telegram archive, the shared Google Docs, the meeting
notes, and the repos.
