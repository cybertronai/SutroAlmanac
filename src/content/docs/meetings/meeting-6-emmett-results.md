---
title: "Meeting 6: Emmett Results"
description: "Emmett's results using the Aster agentic loop to cut MicroGPT memory from 80MB to 35MB, presented at Meeting 6."
---

Source: [Google Doc](https://docs.google.com/document/d/1DAwx_gohi6tomMPkb_fETAIuxIyHgLtC5OPD_qpGpqg/edit?tab=t.0)

## Context

Emmett ran the Aster agentic loop against Andrej Karpathy's pure-Python, dependency-free MicroGPT to optimize it. The starting point was the complete training and inference algorithm for a GPT written in plain Python, where the model architecture follows GPT-2 with minor differences (layernorm becomes rmsnorm, no biases, GeLU becomes ReLU).

## Result

- Ran Aster for 8 iterations with the objective of minimizing memory.
- The resulting program takes up 35 MB instead of the original 80 MB.
- The optimization mainly made efficiency improvements rather than fundamentally changing the algorithm.

## Recommendations

- Try a few simpler mechanisms than Aster for comparison, for example running Codex in a loop or [OpenEvolve](https://github.com/codelion/openevolve).
- Use those baselines to gauge how much of the gain is specific to Aster.

## References

- Dataset used by MicroGPT: [Karpathy makemore names.txt](https://raw.githubusercontent.com/karpathy/makemore/988aa59/names.txt)
- Karpathy's makemore project: [github.com/karpathy/makemore](https://github.com/karpathy/makemore)

Submitted by Emmett.
