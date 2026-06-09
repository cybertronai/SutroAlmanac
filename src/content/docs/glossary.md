---
title: Glossary
description: House terms used across the Almanac, defined the way the record uses them.
---

Short definitions of the Almanac's house terms, as the record itself uses them, each ending with a link to one page where the term matters.

## Agent swarm

Many agents run in parallel on one build. Yad ran two swarms with the wave-build method in May 2026; one produced the hinton-problems catalog (53 stubs), the other schmidhuber-problems (58 stubs). ([May recap](/recaps/2026-05/))

## ARD (Average Reuse Distance)

The group's first cost proxy, an element-level count of reads and writes. It was too coarse to model locality, and meeting #9 (March 16, 2026) replaced it with DMC. ([March recap](/recaps/2026-03/))

## Auto-research loop

An agent loop that runs the research itself: pointed at a problem or a researcher's body of work, it generates experiments and pull requests with sparse human input. Cosmin Negruseri ran a Codex-driven one against the matmul record, and by June the loops were the group's center of gravity, with the May 30 Modal hackathon built around them. ([June recap](/recaps/2026-06/))

## Blind parallel dispatch

Yad's dispatch pattern from the March survey: each of 33 sparse-parity experiments went to its own blind agent, run in parallel, with the findings written up in a shared DISCOVERIES.md. The pattern pairs with a shared memory file every agent reads first and a locked harness no agent can edit. ([March recap](/recaps/2026-03/))

## ByteDMD

The lab's primary cost metric since April 14, 2026: data movement measured at byte granularity in pure Python. Byte-level tracking closes the escape hatch that let a top sparse-parity entry hide bit-packed work from the element-level metric, and the definition lives in its own repos partly to keep it out of reach of agents working in the main repo. ([April recap](/recaps/2026-04/))

## Catch-up

The group's periodic status notes, kept in the SutroYaro docs and one of the primary sources the monthly recaps are built from. The first covers March 16 to 22, 2026. ([first catch-up](/catchups/2026-03-22/))

## Dally grid

Bill Dally's 2D Manhattan-grid cost model: algorithms are submitted as an intermediate representation of explicit load and store ops, and energy is scored as data movement on the grid. It became the research front after Yaroslav concluded ByteDMD is a heuristic rather than a bound, and it is the cost metric for the matmul and grid-parity challenges. ([matmul challenge](/challenges/matmul/))

## Dispatcher kit

The auto-research-loop kit Yad shipped as SutroYaro v0.31.0 (May 29, 2026): the wave-build method packaged as a driver brief plus copy-paste TeamCreate and worker templates, with a worked LeCun SPEC as the first seed. It is set up as a transferability test, whether a second operator can reproduce a catalog without Yad's tacit knowledge. ([June recap](/recaps/2026-06/))

## DMC (Data Movement Complexity)

The cost metric adopted at meeting #9 (March 16, 2026), from Ding et al. ([arXiv:2312.14441](https://arxiv.org/abs/2312.14441)): each memory access is weighted by the square root of its reuse distance, which maps to physical wire-length energy on a 2D layout. It replaced ARD and was itself superseded by ByteDMD in April. ([March recap](/recaps/2026-03/))

## DMD (data movement distance)

The running name for the data-movement measure the harness tracks per access; DMC and ByteDMD are versions of it. Element-level at first, it was settled at byte granularity after Yaroslav met with Wesley Smith in late March, and that byte-level definition became ByteDMD. ([Week of March 30](/recaps/weekly/2026-03-30/))

## Drosophila task

The group's term for the small, fast task it needed: a fruit fly of learning that trains in about one second, so agents can iterate thousands of times instead of waiting on the 3-minute MicroGPT loop. Sparse parity became the group's drosophila in March. ([Meeting 6 notes](/meetings/meeting-6-notes/))

## Energy floor

The thermodynamic minimum energy for a computation, set by Landauer's principle. The founding thesis is that AI training sits many orders of magnitude above it: a GPT-4-scale run took on the order of 50 GWh, with only about 5% going to actual math and the other 95% to moving data. ([February recap](/recaps/2026-02/))

## Floor gap

The distance between a method's measured cost and the best possible. The April 2026 survey measured sparse-parity methods against a read-floor of about 70 ByteDMD and a geometric lower bound of 0.3849 times measured ByteDMD: KM-min sits 3.8x above the read-floor, GF(2) 1,450x. ([April recap](/recaps/2026-04/))

## GF(2) elimination

Gaussian elimination over the two-element field. It solves sparse parity directly, about 1000x faster than SGD, because parity is linear over GF(2), and it settled Challenge #1 in March 2026. ([sparse parity challenge](/challenges/sparse-parity/))

## Intelligence per joule

The organizing metric from the formation month: how much learning the energy buys. The February thesis fixed the mission as maximizing it, and the earliest experiments were reported in these units, such as a claimed 27% gain from truncated backprop. ([February recap](/recaps/2026-02/))

## KM and KM-min

KM is the Kushilevitz-Mansour influence estimator, one of the two algebraic methods that solve sparse parity directly. KM-min is the single-sample variant: parity influence is binary, so one sample per bit suffices, and it took the DMC best at 3,578, 58% below the GF(2) baseline. Whether oracle-query KM-min counts as a fair reference floor, given it is not benchmark-submittable, is still open. ([March recap](/recaps/2026-03/))

## Locked harness

The evaluation harness agents run against but cannot edit: `harness.py` is SHA-256-locked, and an agent rule blocks edits to the metric code. The lock exists because agents in earlier loops rewrote the evaluation code to score higher rather than improve the algorithm. ([Repos & Tools](/repos/))

## Pebbling game

A compiler-theory framing Yaroslav introduced for the memory-cost problem: treat data as pebbles in a scheduling game and penalize the expensive moves, since on an H100 doing math costs about 0.3 picojoules while an HBM access costs more than 500. Michael Keating built an implementation with an API and a basic agent. ([Meeting 6 notes](/meetings/meeting-6-notes/))

## Sparse parity

Challenge #1 and the group's first benchmark: learn `y` as the XOR of k secret bits from n random plus-or-minus-one inputs (standard n=20, k=3, with 17 noise bits). It is the fast toy problem the February search called for; GF(2) elimination settled it in March. A grid version returned as Challenge #3. ([sparse parity challenge](/challenges/sparse-parity/))

## StackUnderflow

Yad's session-indexing tool, shipped April 21, 2026: it indexes past AI coding sessions locally so prior decisions and failure modes can be queried before redoing work. It is in use across the Sutro repos. ([April recap](/recaps/2026-04/))

## SutroYaro

Yad's research workspace and the lab's memory and dispatch hub, created March 3, 2026. It holds the locked evaluation harness, the agent loop, the Telegram archive, and the changelog; the research code itself moved out to the challenge repos in May, leaving SutroYaro as the lab notebook. ([Repos & Tools](/repos/))

## TrackedArray

The element-level tracking wrapper the sparse-parity pipeline scored with before ByteDMD. A top entry escaped it through `np.asarray()` to run bit-packed GF(2) on raw Python ints; counting those operations honestly moved the entry's cost from about 45K to 81K, the exploit that made the case for byte-granularity tracking. ([April recap](/recaps/2026-04/))

## Wave-build

Yad's method for multi-agent paper reproduction: one SPEC issue and one TeamCreate, then fresh teams of agents implement stubs in parallel waves (one agent per stub, one pull request per wave), with an audit agent on each wave and merges gated on the driver. Fresh teammates each wave keep later waves on full context. It produced the hinton and schmidhuber catalogs and is packaged in the dispatcher kit. ([May recap](/recaps/2026-05/))
