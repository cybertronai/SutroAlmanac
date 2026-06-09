---
title: "Challenge #3: Sparse parity on the grid"
description: Solve sparse parity using only about nine instructions on the Dally 2D grid.
---

The grid-model version of Challenge #1: solve sparse parity using only about nine instructions on the Dally 2D grid, with a restricted op set and no abstraction.

## Where it lives

[sutro-problems](https://github.com/cybertronai/sutro-problems), the `sparse-parity/` directory. The scorer (`sparse_parity.py`) is locked.

## Cost metric

The Dally 2D-grid cost model.

## State

Launched May 8. Precomputing intermediate XORs plus bit-packing works well; tiling does not help at this problem size. A 50%-accuracy target variant has been added. The tiny op set makes it hard to cheat, and no agent-cheating results have shown up with the IR approach.

## Open questions

Whether continuous floating-point ops are needed at all, or whether integer and 8-bit instruction sets are better, since fewer ops means fewer hidden free optimizations for agents to exploit. See the [May recap](/recaps/2026-05).
