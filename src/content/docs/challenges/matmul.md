---
title: "Challenge #2: Energy-efficient matmul"
description: Minimum-energy 16x16 matrix multiply, expressed as an intermediate representation on a 2D grid.
---

Minimize the data-movement energy of matrix multiplication, expressed as an intermediate representation (explicit load and store ops) on Bill Dally's 2D grid. The focus size is 16x16.

## Where it lives

[sutro-problems](https://github.com/cybertronai/sutro-problems), the `matmul/` directory. The scorer (`matmul.py`) is locked; submissions must not modify it.

## Cost metric

The Dally 2D-grid cost model.

## State

Active hill-climbing. The 16x16 record stands at 67,821 (mid-May), down from 68,452 (Sung Jae Bae, May 5) and 68,392 (Cosmin Negruseri, May 13). Cosmin ran a Codex-driven auto-research loop that produced a steady stream of small PRs. Lower bounds are an open hard problem: an agent-generated bound was wrong on inspection, and AlphaTensor could not bound 4x4 either.

## Who is active

Cosmin Negruseri, Sung Jae Bae, Anastasiia Zhiboedova. See the [May recap](/recaps/2026-05/).
