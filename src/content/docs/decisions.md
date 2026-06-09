---
title: Decisions
description: Every decision the Sutro Group's record shows, in one dated log, each entry linked to the page that records it.
---

The most-asked question of any lab record is what was decided and when. This page
is the answer in one chronological log, built from the monthly recaps, the meeting
notes, the catch-ups, and the challenge pages. Every entry links to the page that
records it, and where a source gives only an approximate date, the entry stays
approximate.

## February 2026

- **February.** The group forms around one thesis, that AI training sits far above
  its energy floor and the waste is data movement rather than arithmetic, and
  adopts intelligence per joule as the organizing metric (first archived messages
  February 9). ([February recap](/recaps/2026-02), [Timeline](/timeline))
- **Mid-February.** Karpathy's makemore and microGPT names task is established as
  the first benchmark for agent loops; the "makemore task results" topic opens
  February 17. ([February recap](/recaps/2026-02),
  [Meeting 6 notes](/meetings/meeting-6-notes))
- **February 18.** Yaroslav flags the names task as too heavy to iterate on, at
  about 3 minutes per run, and sets the requirement that the toy problem must run
  in seconds. That constraint drives the March move to sparse parity.
  ([February recap](/recaps/2026-02))
- **Late February.** At Meeting 6 (the notes are undated), after a debate about
  moving to Discord or Slack for better threading, the group keeps Telegram, whose
  reliability wins out. The same session establishes the Google Calendar invite as
  the group's central hub. ([Meeting 6 notes](/meetings/meeting-6-notes))

## March 2026

- **March 3.** Yad creates [SutroYaro](https://github.com/cybertronai/SutroYaro),
  and the fast-toy-problem search lands on sparse parity, the benchmark the repo
  is built around. ([March recap](/recaps/2026-03),
  [Challenge #1](/challenges/sparse-parity))
- **March 9.** Yaroslav reproduces the agent-discovered GF(2) Gaussian elimination
  result and adopts it. Sparse parity is settled by algebra, about 1000x faster
  than SGD, while local learning rules sit at chance.
  ([March recap](/recaps/2026-03), [Meeting 8 notes](/meetings/meeting-8-notes),
  [Challenge #1](/challenges/sparse-parity))
- **March 9.** Meeting 8 keeps the agent meta-process work on sparse parity and
  holds off on adding noise to the dataset until the agentic pipeline is stable,
  since the simpler task allows sub-second iteration.
  ([Meeting 8 AI notes](/meetings/meeting-8-ai-notes))
- **March 14.** SutroYaro moves from Yad's personal account to the
  [cybertronai](https://github.com/cybertronai) org. ([Timeline](/timeline),
  [March recap](/recaps/2026-03))
- **March 16.** Meeting 9 keeps sparse parity as the problem and switches the cost
  metric from ARD, a raw read and write count, to Data Movement Complexity (DMC),
  which weights each access by the square root of its reuse distance.
  ([Meeting 9 notes](/meetings/meeting-9-notes),
  [March 22 catch-up](/catchups/2026-03-22), [March recap](/recaps/2026-03))
- **March 16.** The same meeting sets a meta-goal: iterate on the process of going
  from a metric and problem specification to a fast sequence of experiments, since
  the aim is speed at solving, beyond getting one solution.
  ([March 22 catch-up](/catchups/2026-03-22))
- **March 21.** Yaroslav proposes designating SutroYaro public domain and Yad
  agrees; the repo is placed in the public domain.
  ([March 22 catch-up](/catchups/2026-03-22), [March recap](/recaps/2026-03))
- **March 22.** The first weekly catch-up is written, starting the dated status
  record the monthly recaps are built from.
  ([March 22 catch-up](/catchups/2026-03-22), [March recap](/recaps/2026-03))
- **Late March.** The evaluation harness is locked away from agents: a
  SHA-256-locked `harness.py` plus a standing rule that agents cannot edit the
  metric code, after Meeting 8 surfaced agents rewriting evaluation code to
  inflate scores. ([March recap](/recaps/2026-03),
  [Meeting 8 AI notes](/meetings/meeting-8-ai-notes), [Timeline](/timeline))
- **Late March.** The challenges double as agent evaluations: Yad's RL evaluation
  environment (PR #49) compiles the 33 survey experiments into Gymnasium
  environments with a grading rubric, following Yaroslav's March 21 proposal to
  wrap the challenges as RL environments. ([March recap](/recaps/2026-03),
  [March 22 catch-up](/catchups/2026-03-22), [Timeline](/timeline))
- **By March 30.** The sparse-parity submission pipeline goes live: paste a
  `solve()` function into a GitHub issue, and GitHub Actions scores it for
  accuracy and DMC, then records wall time. ([March recap](/recaps/2026-03),
  [Challenge #1](/challenges/sparse-parity))
- **By March 31.** After calls with Wesley Smith and Chen Ding push toward byte
  granularity, Yaroslav decides to focus the metric at the byte level rather than
  the element level, the seed of April's ByteDMD.
  ([March recap](/recaps/2026-03))

## April 2026

- **April 14.** [ByteDMD](https://github.com/cybertronai/ByteDMD) is adopted as
  the primary metric (wired into the repos April 15), after Seth showed the top
  sparse-parity entry escaping the element-level tracker through `np.asarray()`
  to do work the metric never saw. The definition lives in its own repos, partly
  to keep it out of reach of agents working in the main repo.
  ([April recap](/recaps/2026-04), [April 30 catch-up](/catchups/2026-04-30),
  [Timeline](/timeline))
- **Mid-April.** Branch protection is enabled on SutroYaro's `main` branch.
  ([April recap](/recaps/2026-04), [April 30 catch-up](/catchups/2026-04-30))
- **April.** Seth's NoProp study, which solved parity but did not beat SGD plus
  Curriculum, is merged as a clean negative finding rather than retrofitted to
  the new metric; publishing negative results as first-class findings becomes the
  norm. ([April recap](/recaps/2026-04))
- **April 21.** Yad ships
  [StackUnderflow](https://github.com/0bserver07/StackUnderflow), which indexes
  past AI coding sessions so prior decisions and failure modes can be queried
  before redoing work. It is now used across the Sutro repos.
  ([April recap](/recaps/2026-04), [Timeline](/timeline))
- **April 27.** Yaroslav concludes ByteDMD is a heuristic, not a lower bound, and
  shifts the research front to implementing algorithms directly in a 2D
  Manhattan-distance grid, Bill Dally's cost model. A companion idea from the
  same day: score agent submissions as an explicit intermediate representation,
  loads and stores, on that grid.
  ([April 30 catch-up](/catchups/2026-04-30), [April recap](/recaps/2026-04),
  [Timeline](/timeline))
- **April 30.** Challenge #2, energy-efficient matmul on the Dally grid, launches
  in sutro-problems; the scorer (`matmul.py`) is locked and submissions must not
  modify it. ([Challenge #2](/challenges/matmul), [April recap](/recaps/2026-04),
  [April 30 catch-up](/catchups/2026-04-30))

## May 2026

- **May 3.** The
  [hinton-problems](https://github.com/cybertronai/hinton-problems) catalog
  ships: 53 pure-numpy stubs of Hinton's representational work, reproduced by
  Yad's wave-build swarm from a stub set Yaroslav specified.
  ([May recap](/recaps/2026-05), [May 20 catch-up](/catchups/2026-05-20))
- **May 8.** The
  [schmidhuber-problems](https://github.com/cybertronai/schmidhuber-problems)
  catalog ships, 58 stubs built the same way. ([May recap](/recaps/2026-05),
  [May 20 catch-up](/catchups/2026-05-20))
- **May 8.** Challenge #3 launches: sparse parity on the Dally grid in about nine
  instructions, with the op set kept small so agents have nowhere to hide free
  work. ([Challenge #3](/challenges/grid-parity), [May recap](/recaps/2026-05))
- **Early May.** A working rule from the wave builds: because agents emit
  unlimited text while human input stays sparse, the load-bearing human prompts
  get captured in every PR. ([May recap](/recaps/2026-05),
  [May 20 catch-up](/catchups/2026-05-20))
- **May 12.** The wikitext challenge, energy-efficient language modeling on
  WikiText-103 led by Armins, gets its own repo,
  [cybertronai/wikitext](https://github.com/cybertronai/wikitext), after the
  infrastructure moved from Lambda Labs to Modal with GPU energy metered through
  NVML. The objective holds accuracy and wall-clock time fixed and shrinks the
  Joules. ([May 20 catch-up](/catchups/2026-05-20),
  [Challenge #4](/challenges/wikitext), [May recap](/recaps/2026-05))
- **May 14.** The reshuffle merges: SutroYaro is stripped to its lab-memory role
  and the research code migrates out to
  [sparse-parity-challenge](https://github.com/cybertronai/sparse-parity-challenge).
  The sutro-problems repo is positioned as the place to experiment freely, with
  the useful parts distilled later. ([May recap](/recaps/2026-05),
  [May 20 catch-up](/catchups/2026-05-20))
- **Mid-May.** A two-pass metric roadmap takes shape over the stub catalogs: a v2
  pass for which stubs ByteDMD can instrument, then a v3 pass for which of those
  the Dally grid model can instrument, with the survivors seeding the next
  competition. Yaroslav floats skipping straight to v3, which stays unsettled.
  ([May recap](/recaps/2026-05), [May 20 catch-up](/catchups/2026-05-20))
- **May 29.** Yad's auto-research-loop dispatcher kit ships (v0.31.0), packaging
  the wave-build method so a second operator can drive it without his tacit
  knowledge. The kit includes a worked LeCun SPEC and is set up as a
  transferability test. ([June recap](/recaps/2026-06), [Timeline](/timeline))
- **May 30.** The group builds its Modal hackathon entry around auto-research
  loops, taking auto-research itself as the deliverable.
  ([June recap](/recaps/2026-06), [Timeline](/timeline))

## June 2026

- **Early June.** This Almanac begins as the group's public record.
  ([Timeline](/timeline))
