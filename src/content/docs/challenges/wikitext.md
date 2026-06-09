---
title: "Challenge #4: wikitext"
description: Train a WikiText-103 language model for the fewest Joules at fixed accuracy and time.
---

Train a language model on WikiText-103 for the minimum GPU energy (Joules) at a fixed accuracy and wall-clock time. The largest-scale challenge, meant as the final task in a ladder running Shakespeare, TinyStories, WikiText-103, then FineWeb.

## Where it lives

[cybertronai/wikitext](https://github.com/cybertronai/wikitext). Runs on Modal, with GPU energy measured through NVML.

## Cost metric

Measured GPU energy (NVML). Whether to also count CPU package energy (RAPL) is under discussion; Yaroslav's position is total system energy under time and accuracy bounds, with no device constraints.

## State

The baseline `modded_nanogpt` runs at 54,784 J, 0.7285 character-accuracy, 322.7 s. A forward-forward submission reaches about 0.39 accuracy at roughly 10x fewer Joules. The live debate is whether cross-entropy should be a separate scored track, to rule out brittle methods without forcing models to output explicit probability distributions.

## Who is active

Armins (lead), Gabriel Nakajima An. See the [June recap](/recaps/2026-06/).
