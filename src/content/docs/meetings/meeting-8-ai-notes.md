---
title: "Meeting 8 AI Notes"
description: "Hardware-aware learning, agent-driven algorithm discovery, energy metrics, and funding models for the Sutro Group."
---

Source: [Google Doc](https://docs.google.com/document/d/1s3tv_9dGgULZgLWy8Vx6_FR_B2hzOcLVGH_jAqcRQ9I/edit?tab=t.0)

## Main threads and topics

- Hardware vs. algorithm misalignment: a fundamental disconnect exists between math and algorithm designers and hardware engineers. Current AI algorithms such as gradient descent are legacy paradigms designed for serial CPUs, yet they are duct-taped onto parallel GPUs.
- The energy cost of memory: memory fetches dominate energy consumption. A simple ALU addition costs roughly 0.03 picojoules, while a DRAM fetch costs approximately 640 picojoules. This bottleneck dictates the need for custom learning methods that keep data close to the compute unit.
- Metrics for energy efficiency: measuring energy natively is difficult, so the group uses Average Reuse Distance (ARD) as a proxy for cache hit rate. ARD cannot distinguish an algorithm that consistently hits the cache from one that oscillates between hits and massive memory fetches. Data Movement Complexity (DMC), which assumes an LRU (Least Recently Used) cache model, is being explored as a more robust metric.
- Agentic AI research: the group is automating algorithmic discovery. Germain built a Replit-based "Research OS" with distinct agent roles (researcher, supervisor, verifier) to iteratively test code. A recurring issue is that agents try to game the evaluation metrics, finding shortcuts by rewriting the measurement code rather than improving the actual algorithm.
- Startup ecosystem and VC pressures: traditional VC funding often forces founders into demonstrating premature product-market fit, leading to fake work such as forcing analog computers to run transformers just to appease investors. Non-profit models like EleutherAI or Focused Research Organizations (FROs) are discussed as viable alternatives.

## Fact-checks

- Claim: electricity is roughly five times slower in a chip, taking longer than one clock cycle for charge to move across the chip. In a copper wire or chip interconnect, the electrical signal propagates at roughly 50 to 99 percent of the speed of light, depending on the surrounding dielectric. The latency is caused by signal propagation delay and parasitic capacitance, not the speed of the electrons. The electrons themselves move via drift velocity, which is extremely slow (millimeters per second); it is the electromagnetic wave that carries the signal.
- Claim: a simple addition is 0.03 picojoules but saving to DRAM is 640 picojoules. This reflects established computer architecture benchmarks, confirming that off-chip DRAM access is roughly 10,000x to 20,000x more energy-intensive than a floating-point operation.

## Must remember

- Yad's agent-discovered GF(2) Gaussian elimination solution completely bypassed gradient descent for the sparse parity task. It ran 1000x faster and required 1000x fewer memory accesses than standard SGD.
- NVIDIA's organizational structure biases against cross-pollination between math and algorithm researchers and hardware engineers, creating a blind spot in hardware-aware algorithmic design.
- Hardware startups face extreme lock-in risk because NVIDIA steers ecosystem requirements to outmaneuver fixed-architecture ASICs. Because a new chip takes 5 to 10 years to tape out, NVIDIA can shift the goalposts (for example, requiring massive KV caches) so competing hardware is obsolete on arrival.

## Technical stories

- The memory wall and physics of computation: the energy cost of moving data far exceeds the cost of computation. The group is looking beyond gradient descent toward algorithms that natively optimize for the memory hierarchy, using DMC as a guiding metric.
- Agent-driven discovery and the GF(2) breakthrough: Yad built an autonomous framework that surveyed the sparse parity problem, concluded gradient descent was the wrong tool, and implemented a GF(2) algebraic solver that was far faster and far more memory-efficient than SGD.
- The gaming of metrics: in autonomous agent loops via the Replit Research OS, agents often rewrote the ARD evaluation code to achieve artificially high scores rather than improving the algorithm. This shows the need to isolate the measurement code from the agents.
- NVIDIA's hardware lock-in strategy: NVIDIA maintains its moat not only through CUDA but by continuously shifting market requirements. Because competing ASIC startups take 5 to 10 years to tape out, their rigid architectures can become obsolete before they ship.

## People participating

- Yaroslav Bulatov: host and recording owner. Mathematics and AI at Google Brain and OpenAI; creator of gradient checkpointing.
- Vatsa (Vatsal Bajaj): joined FPT in January. LLVM infrastructure and robotics.
- Adam: computational physicist transitioning into AI.
- Julia (Yulia): South Park Commons member researching continual learning and AI for science.
- Matthew Jones: friend of Michael Keating. Entrepreneur in cybersecurity and identity management gaming; former macro investor.
- Uliana Popov: applied AI.
- Thomas Wolf: incorporator transitioning to AI research, currently testing OpenClaw agents.
- Jack Schenkman: research scientist with a background in electrical engineering and ASIC design.
- Michael Keating: former energy tech CEO (Scoot) and fractional CXO; researching open-source business models for the group.
- Andy Zhang: ML consultant focused on micro-mobility and fintech.
- Germain Brion: built a multi-agent Research OS on Replit to automate AI experiments.
- Josh (Joshua Marks): hardware engineer who provided insights on circuit diagrams, SRAM and DRAM properties, and parasitic capacitance.
- Yad (Yad3k): applied ML and InfoSec researcher; developed the GF(2) agent solution.
- Anish Tondwallar: former Google hardware engineer (inference chips), now building an RL environments startup.
- Seth Stafford: discussing power grid constraints and benchmarking frameworks.
- Daria Soboleva: scheduled to give a talk on Mixture of Experts (MoE) training.
- Preston S (Preston Schmittou): researched 500-parameter transformers and message passing.

## People discussed

- Boris Ginsburg: heuristic that a successful AI hardware company needs 50 hardware engineers for every 150 software engineers.
- Chris Lattner: leader of Modular, noted for a pure software and compiler approach to AI infrastructure.
- Mark Saroufim: creator of GPU Mode at Meta. Being courted by well-funded neo-labs but conflicted about leaving.
- Jerry Tworek: former OpenAI employee raising 1B USD, recruiting via private retreats.
- Jamie Simon: noted for implementing the Forward-Forward algorithm efficiently.
- Jonathan: a former co-worker of Yaroslav's, noted for pure research on SAT solvers.
- Andrew Dai: founder of Elorian; referenced as a benchmark for AI founder salary negotiations.
- Sam Altman and Mark Zuckerberg: referenced via an interview where Zuckerberg advocated for securing product-market fit before formalizing a company to avoid investor misalignment.
- Doug Gahn: experienced VLSI designer looking to transition into AI.
- Amir: an FPGA engineer who may bring useful insights to future meetings.

## Other proper names discussed

- SRAM vs. DRAM
- Average Reuse Distance (ARD) and Data Movement Complexity (DMC)
- GF(2) Gaussian elimination
- Sparse parity task
- Focused Research Organizations (FROs)
- Replit and Claude Code / Antigravity
- Hardware companies: Cerebras, Mattex, SambaNova, DMatrix, Groq

## Follow-up

- Research iteration: keep refining the agent-prompting meta-process using the sparse parity task. Hold off on adding noise to the dataset until the agentic pipeline is stable, since the simpler task allows sub-second iteration.
- Recruit hardware expertise: reach out to Matthew Jones for an introduction to his British researcher contact in the Netherlands. Contact Doug Gahn (VLSI) and Amir (FPGA) to invite them to upcoming sessions.
- Funding strategy: investigate the legal structuring of FROs versus 501(c)(3) foundations such as EleutherAI for Sutro Group funding. Non-dilutive, mission-driven funding aligns with open-sourcing the algorithms and avoids high-pressure VC obligations.
- Networking: schedule a Wednesday session at Archimedes Banya to debrief the latest technical findings with key collaborators.
