---
title: "Meeting 1: Energy Intro"
description: "Intro session on energy-efficient training, hosted by Yaroslav Bulatov, with attendee introductions and key topics."
---

Source: [energy-efficient learning slides](https://docs.google.com/document/d/1PhArG_B1qrurqeXtqG41n_OorHw5J9kJcaZkhJOh7NU/edit?tab=t.0#heading=h.cdeox1s0xsl1)

## Attendees

### Host: Yaroslav Bulatov

- Veteran AI researcher (20+ years).
- Google: worked on Street View (House Numbers). Hired Ian Goodfellow as an intern.
- OpenAI: worked on gradient checkpointing.
- Independent: beat Google in the 2018 DawnBench competition (fastest ImageNet training) by optimizing infrastructure on AWS, achieving 10-second iteration cycles versus Google's 10 minutes.
- Meta (2023): implemented symbolic differentiation in a single Colab cell.
- Philosophy: wants to "satisfice" (do just enough) rather than maximize. Tracks his "integrated lifetime pleasure" using audio logs of his emotional state.
- Current goal: AI training was invented for CPUs, so find a more GPU-first way to train LLMs.

### Jackjack Ganbold

- SPC member.
- Founder of two companies, including Basenames (associated with Coinbase / blockchain domains). Has developed AI developer tools for VS Code.

### Jonathan Belay

- South Park Commons member.
- Connection to Yaroslav: classmate of Darius, Yaroslav's collaborator on [Transformer-XL work](https://yaroslavvb.medium.com/scaling-transformer-xl-to-128-gpus-d21875961c5d).
- Runs an independent research lab.
- Focus: deterministic methods for LLM pre-training (Algebraic Graph Theory / Spectral Graph Theory).
- Background: former Google ("Economic Fairness" team) and Harvard (CS / Math).
- Business: licenses his algorithms to chip companies (Nvidia, Google, Etched) to solve NP-complete chip layout problems.

### Anish Tondwalkar

- Former Google Brain (Hardware / TPU team) and OpenAI (Inference / Reasoning).
- Connection to Yaroslav: OpenAI researcher community.
- Worked on Project Turquoise, Google's internal custom silicon team.
- Survived "13 reorgs" at Google.
- Colleagues spun out to form Groq, MatX, and Positron.
- Role: the "Realist." Argues that energy inefficiency is a hardware orchestration problem, not just algorithmic.

### Seth Stafford

- "Recovering mathematician" (PhD Cornell 1991). Former postdoc and mathematician. Early Oracle.
- Connection to Yaroslav: met in 2017 "Deep Learning Study Group." Former manager of Burkay Gur (Yaroslav's former manager at Fal.AI).
- Role: introduced Yaroslav to the concept of "Satisficing."
- Work: applies AI to healthcare.

### Caleb Sirak

- Founder of E3 Group. 2x MIT dropout and founder. Hand-building "Howard," a DIY AI supercomputer, and active in the Boston and SF hardware scenes exploring on-chip simulators and custom networking. Tech Twitter personality.
- Connection to Yaroslav: follow each other on Twitter.
- Work: uses AI agents for "boring" logistics and freight problems.

### Anushka Deshpande

- Works at [Arcee.ai](https://www.arcee.ai/), building "American DeepSeek."
- Connection to Yaroslav: met at a Tilde Research / Cruseo organized poker night last year.

### Daria Soboleva

- Head Researcher at Cerebras. Manages researchers and leads large-scale MoE training on Cerebras. Author of the [Cerebras MoE guide](https://www.cerebras.ai/moe-guide).
- Connection to Yaroslav: Russians.

## Companies and Named Entities

- Arcee.ai: Yaroslav refers to it as the "American DeepSeek" (known for efficient, domain-adapted SLMs).
- Project Turquoise: Google's internal custom silicon division.
- Basenames: identity protocol on the Base blockchain.
- Google Antigravity: a new internal Agentic IDE from Google. Discussed using it to generate full apps and deploy them to Vercel in minutes from screenshots.
- Cerebras: hardware company. The group criticized it for the "wafer-scale" approach (yield issues) and weak software. Anish called it a "worse Groq."
- Etched: a new Transformer ASIC company.
- MatX / Positron: hardware startups Anish mentioned as legitimate contenders.
- Ainekko: startup that bought Esperanto Technologies' IP to open-source their RISC-V work.

## Key Topics

### The "Giraffe Nerve" Thesis

Yaroslav argues backpropagation is like the Recurrent Laryngeal Nerve in giraffes, which takes a massive detour due to evolution. It works, but it is inefficient because it requires global memory access (HBM), which costs roughly 640pJ versus 5pJ for local registers.

- Goal: find a "local" update rule that mimics the brain (roughly 20 Watts).

### The "Nerd Snipe"

- Proposal to launch a competition: "Train a model on a smartphone via WebGPU using the minimum energy (Joules)."
- WebGPU is chosen because it exposes the memory hierarchy (registers, shared, global), forcing developers to optimize data movement manually.

### Infrastructure over Intelligence

Yaroslav claimed he beat Google in 2018 not because he was smarter, but because he spent 3 months optimizing AWS infrastructure to restart runs in 10 seconds, while Google engineers waited 10+ minutes.
