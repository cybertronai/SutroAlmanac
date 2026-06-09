---
title: "Meeting 6 Notes"
description: "Sutro Group meeting 6 on energy-efficient alternatives to backpropagation, the Drosophila of learning, and pebbling games."
---

## Overview

Remote and asynchronous contributors were featured heavily during the presentation. Yaroslav walked through several reference documents and the group reviewed recent results.

Reference materials shown:

- Horowitz Energy Problem: [Notability](https://notability.com/n/1OKuoEBjG78uifm8QxzqGm)
- Bill Daly keynote: [Notability](https://notability.com/n/1M_Wufsg_~T8TRNgYHe7L3)
- Pebbling Games for maximum memory: [Fitting larger networks into memory](https://medium.com/tensorflow/fitting-larger-networks-into-memory-583e3c758ff9)
- Pebble Games: [NotebookLM](https://notebooklm.google.com/notebook/e698f8b5-91c5-42aa-86aa-d6b88698fddf)
- Mojo GPU puzzles from csirak: [GitHub](https://github.com/modular/mojo-gpu-puzzles?tab=readme-ov-file)

## Next steps

- Find a way to iterate faster, possibly a roughly 500 parameter transformer that learns addition. Reference: [tweet](https://x.com/DimitrisPapail/status/2026112749990735873)
- Keep looking for a way to prompt an agent to get away from gradient descent.
- Todo (Yaroslav): prototype a binary prediction task, predicting the next bit in text.

## Participants and backgrounds

The Sutro Group is a volunteer-driven initiative of veteran AI researchers and hardware engineers, plus a few people from outside the field, united by the goal of finding energy-efficient, hardware-native alternatives to backpropagation.

- Yaroslav Bulatov (host and organizer): A 20-plus year AI veteran who led the first deep learning deployment at Google and worked on gradient checkpointing at OpenAI. He beat Google in the 2018 DawnBench competition by optimizing infrastructure to reduce iteration times to 10 seconds. He is unretiring to disrupt Nvidia's software monopoly using AI agents.
- Michael Keating: Comes from a climate tech and electric mobility background. Currently an executive at a data center cooling tech startup. He advised Yaroslav on project governance, suggesting long-term patient capital such as family offices or sovereign wealth funds over traditional venture capital.
- Jon Belay: A South Park Commons member and former Google and Harvard researcher (Economic Fairness team). He runs an independent lab focused on deterministic methods for LLM pre-training and licenses algorithms to chip companies such as Nvidia and Etched to solve NP-complete chip layout problems.
- Seth Stafford: A recovering mathematician (PhD from Cornell, 1991) and early Oracle employee. He applies AI to healthcare and is highly active in the group's technical execution, running Claude Code agents to test hypotheses and verify the group's Python experiments.
- Uliana Popov: Handled the meeting's logistics and ordered the pizza. She is connected to the group through the local Russian community.
- Eric Frank: Left early.
- Ritankar Das: An entrepreneur with a background in biomedical research. Left early.
- Isaac Rehg: Works in the hardware space, currently with a stealth AI startup building specialized inference chips.
- Andy Zhang.
- Joshua Marks and Daria Soboleva (Cerebras) were absent. Remote asynchronous contributors Emmett Bicker and Germain Brion were heavily featured.

## Meeting summary

0. Logistics, Google Docs, Telegram. Yaroslav opened by establishing the Google Calendar invite as the central hub for the group, linking to past notes, Colab notebooks, and the Telegram chat. A brief debate occurred about moving from Telegram to Discord or Slack for better message threading, though Telegram's reliability currently wins out.

1. Motivation and the 20-year plan. Yaroslav shared his core thesis: deep learning algorithms like gradient descent were invented for CPUs and awkwardly retrofitted onto highly parallel GPUs 15 years ago. Backpropagation is inherently sequential and wastes large amounts of energy accessing global memory. He is becoming active now because AI coding agents let a single researcher prototype 100x faster. His goal is to break Nvidia's CUDA software moat by using AI agents to instantly generate customized learning ecosystems for any hardware.

2. Last six meetings recap. Yaroslav recapped the group's journey: from exploring Geoffrey Hinton's Forward-Forward algorithm (which Jamie Simon implemented via AI in 10 minutes), to practicing physical GPU power measurement in Joules via Colab, to establishing the MicroGPT and Karpathy makemore character-prediction benchmarks.

3. Existing results overview. The group reviewed recent rapid prototyping wins:

- Germain Brion: Despite a non-technical sales background, Germain used Claude to test truncated backpropagation. By dropping backward passes in early layers, he reduced energy costs by 19 percent and improved intelligence-per-joule by 27 percent without hurting validation loss.
- Emmett Bicker: Used an autonomous agentic loop named Aster to reduce the memory footprint of MicroGPT from 80MB to 35MB.
- Andy Zhang: Used GLM-5 to optimize a 3-character prediction task, dropping energy use drastically, though the model cheated by finding a degenerate shortcut and memorizing n-grams.

4. Lessons, iteration is too hard. Despite these wins, Yaroslav pointed to a serious roadblock: the MicroGPT benchmark takes 3 minutes to train. For an AI agent to invent novel mathematical paradigms, it needs to iterate thousands of times. The group feels it is missing a small task it can rapidly iterate on, a simple Drosophila (fruit fly) of learning that could take one second to train.

5. Pebbling games. To bridge the gap between theoretical math and hardware realities, Yaroslav introduced the pebbling game from compiler theory. On an H100 GPU, doing math is virtually free (0.3 picojoules), accessing local registers is cheap (5 picojoules), but moving data from global HBM memory is massively expensive (500-plus picojoules). Backpropagation is inefficient because it requires storing activations across layers in HBM. Yaroslav proposed framing ML training as a scheduling game where AI agents must treat data as pebbles and are heavily penalized for using expensive HBM pebbles.

Socializing and discussion. The meeting transitioned into pizza and a discussion on project funding. Yaroslav was wary of taking large VC money, noting that VCs push startups to optimize for standard SaaS metrics (building faster horses) rather than the kind of fundamental change the group is after (burning down the forest). Michael Keating advised targeting sovereign wealth funds or mission-driven family offices, which have 10 to 20 year time horizons and do not require extractive VC exits.

## Streams of work and current status

1. Algorithmic sanity checks (lead: Germain Brion). Status: paused and promising. Germain proved that dropping backward passes in early layers saves energy and prevents overfitting on small models. Paused pending a new hypothesis; needs to be tested on more complex datasets that resist simple memorization.

2. Agentic pipeline optimization (leads: Andy Zhang, Emmett Bicker, Seth Stafford). Status: active but bottlenecked. They are using Claude Code and GLM-5 to automatically edit Python training scripts and measure Joules natively via CodeCarbon. The agents are finding memory and schedule optimizations but take too long (3-plus minutes per run) and occasionally cheat the learning task by bypassing deep learning entirely.

3. The pebbling game simulator (lead: Yaroslav Bulatov). Status: early prototyping. Yaroslav has mapped the H100 memory hierarchy costs, and Andy Zhang built a prototype mini-game scheduler in a Colab notebook. The simulator currently only optimizes the memory schedule of existing algorithms. It needs to be updated to co-optimize the algorithm itself.

## Suggestions for most promising next steps

To achieve the goal of instantly generating custom learning ecosystems for any hardware, the project must solve the iteration speed bottleneck.

1. Define the 1-second Drosophila task (immediate priority). The project is paralyzed by the 3-minute MicroGPT training loop. The group should abandon NLP token prediction to find a sub-1-second learning task. Suggestion: implement a binary stream prediction task such as predicting the next bit of a compressed Wikipedia byte-stream, or a continuous XOR logic learning task. Alternatively, adopt the 191-parameter micro-Transformer mentioned by Andy. This strips away tokenization and embedding overhead, letting agents run hundreds of architectural experiments per minute.

2. Joint optimization via the pebbling game. Agents are currently confused about whether they are optimizing a memory schedule or writing new math. Suggestion: hardcode the red-blue pebble game constraints directly into a custom evaluation loop (registers equal 1 cost point, HBM equals 100 cost points). Prompt the agent to avoid PyTorch autograd and invent a localized message-passing algorithm that solves the 1-second Drosophila task while keeping all data inside registers. This forces the model to organically invent biology-like, localized update rules.

3. Standardize the hardware-agnostic sandbox. Combine Emmett's agentic loop with Andy's CodeCarbon profiling into a standardized API. The pipeline should take a target hardware profile (latency and energy per memory tier) along with the 1-second Drosophila task and an accuracy threshold. Once the agent can output an energy-efficient algorithm for an Nvidia H100 profile, that exact pipeline can be pointed at an AMD or Taalas chip.

4. Secure patient capital. Following Michael Keating's advice, position Sutro as an energy and climate AI initiative. Pitching to family offices or climate funds focused on reducing AI's gigawatt-hour footprint will yield patient capital that supports a blank slate open-source vision, avoiding pressure to conform to the Nvidia and VC status quo.
