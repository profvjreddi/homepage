---
title: "Managed Trajectories: Rethinking the Unit of Work for Agentic AI Systems"
author: "Vijay Janapa Reddi, Harvard University"
date: "2026-07-28"
excerpt: "Agentic AI is changing the unit of work in computer systems. This essay explains why model calls are no longer sufficient, and why infrastructure may need to manage entire trajectories."
tags: ["agentic-ai", "ai-systems", "computer-architecture", "ml-systems", "operating-systems", "research"]
---

I was recently at an [NSF AI efficiency workshop](https://www.nsf.gov/tip/updates/nsf-supported-stride-ventures-launches-ai-efficiency), where a group of us spent the day on how to make modern AI systems cheaper to train, serve, and operate at scale. There is real money behind the question. NSF is putting up to $21 million over two years into an [AI Efficiency Challenge](https://stride-ventures.com/ai-efficiency-challenge/) to move efficiency technologies out of papers and into production systems.<sidenote>Awards come at two levels, up to $1.75 million and up to $3.5 million per project. The program targets AI and machine learning efficiency broadly rather than agents specifically. Worth saying plainly that the workshop set this thinking in motion rather than endorsing any of it, and nothing below should be read as an NSF position.</sidenote> Agentic systems kept coming up, because that is where a growing share of the compute is going. Google's infrastructure lead has since put a number on it, [estimating that agents could drive up to a hundred times more inference transactions](https://www.networkworld.com/article/4200581/google-transforms-its-data-center-architecture-for-agent-era.html) than non-agentic workloads.

So I asked the question I almost always end up asking. How would we compare these systems against each other? We circled it for a while, and I left without an answer I liked.

It kept nagging at me for days afterward, and I think I know why. I have spent a large part of my career building benchmarks.<sidenote>A lot of that work has been in MLPerf, including [MLPerf Inference](https://arxiv.org/abs/1911.02549) and [MLPerf Tiny](https://datasets-benchmarks-proceedings.neurips.cc/paper/2021/hash/da4fb5c6e93e74d3df8527599fa62642-Abstract-round1.html). I think of benchmarks as [scientific instruments](https://dl.acm.org/doi/10.1145/2807591.2807644). They decide what a community can see, compare, and argue about, and a field tends to start making real progress on something not long after it works out how to measure it.</sidenote> Hand me a workload and a quality target and I can usually tell you how to measure it. But every time I tried to sketch what an agentic benchmark would actually look like, it came apart in my hands. One task might run through dozens of model calls, tool calls, retrievals, waits, approvals, retries, and effects on the outside world. Where does the clock start? What counts as the answer? What are you even holding fixed?

The obvious place to begin was the model call. It is what a serving system manages today, and it is easy to time. If you want a number, it will hand you one.

I did not believe that for very long. An agent handed a goal does not finish anything in a single model call. It works toward that goal across many model calls, tool invocations, context operations, waits, approvals, recovery actions, and effects that reach outside the machine. Timing one call inside that process tells you about a fragment, and very little about whether the work was completed, what it cost, or whether it was safe.

Then it clicked, and the problem was never really the benchmark. The framing is wrong. We keep trying to measure a system before deciding what that system actually is, and the piece nobody has pinned down is the unit of work.

That turns a measurement question into an architecture question. **What should infrastructure manage when the unit of work is an entire trajectory rather than a single model call?**

That question became an invited article for ACM SIGOPS *Operating Systems Review*.

> [**Architecting the Agentic AI Systems Stack: What Should Infrastructure Manage When the Unit of Work Is a Trajectory?**](https://dl.acm.org/doi/10.1145/3830422.3830429) ACM SIGOPS *Operating Systems Review*, vol. 60, no. 1, pp. 60 to 75, 2026.

What follows is the short version, and the reasoning that got me there. The article carries the parts that need more room, including the stack organization, the full trajectory descriptor, and a research map for where the mechanisms might live.

## Managed units have moved before

This is a familiar shape. Every so often, responsibilities that lived in application code or operator convention become visible to a managed substrate, and a new unit of work gets named.

![The lineage of managed units in systems infrastructure, from instruction to thread and process to service and container to request and function to model call, ending in the managed trajectory](/images/blog/managed-trajectories-lineage.svg)

*Figure 1: Representative managed units in systems infrastructure. Each new unit exposes a larger management surface without retiring the ones beneath it.*

The instruction was durable as a boundary because it exposed architectural state and ordering rules rather than circuit details. [Time-sharing systems](https://dl.acm.org/doi/10.1145/361011.361061) raised the unit to the process, binding an address space, scheduling state, credentials, and a protection domain into something the kernel could schedule, isolate, and account for. Distributed systems raised it again to the request, which is where much of today's cloud control plane still sits, because the request is what you can admit, route, trace, retry, and bill. Model serving specialized that further, [turning tokens, batching, and KV residency into managed resources](https://dl.acm.org/doi/10.1145/3600006.3613165).

None of these replaced what came before. Instructions still matter inside processes, processes inside services, and requests and model calls inside agents. What each did was expose a larger surface of state, which made a new scope of work schedulable, protectable, accountable, recoverable, and optimizable. That is my claim about agentic systems. Not that the model call is wrong, but that it is no longer sufficient to describe the whole of the work.

## Where the model call runs out

There is a simple test for whether a managed unit is the right size. A unit is too small when the invariants users and operators care about can only be expressed by reaching outside it. I call this invariant closure. It is the [end-to-end argument](https://dl.acm.org/doi/10.1145/357401.357402) applied to managed units, where an invariant belongs at a boundary that can actually see the state it depends on.

A model call fails that test in several directions at once. It cannot state the budget of a task, because tokens, dollars, wall clock, and energy are spent across dozens of calls. It cannot state authority, because the real question is not "can this call touch this resource" but "should this execution still hold this right, given what it has already done." It cannot say which effects are already committed to the outside world, which is what separates a safe retry from a catastrophic one. And it cannot carry the evidence that explains the outcome, since that is scattered across prompts, retrievals, tool results, and approvals.

The test cuts both ways, since a unit can also be too large. The goal is the smallest boundary that can state the invariants we expect infrastructure to preserve.

## The managed trajectory

Two terms make the boundary precise, and keeping them apart matters. An **agentic trajectory** is the actual unfolding course of work from a delegated goal to an outcome. It exists whether or not anyone is watching. A **managed trajectory** is that same course of work made visible enough for infrastructure to act on, which means visible enough to schedule, protect, account for, observe, recover, and optimize.

![A managed trajectory running from a delegated goal to a verified outcome, passing through request, model call, context, tool call, approval, and effect events, with a descriptor band underneath listing identity and goal, budget and deadline, memory handles, authority, effects and recovery, trace and evidence, and placement and cost](/images/blog/managed-trajectories-trajectory.svg)

*Figure 2: A managed trajectory runs from a delegated goal to a verified outcome. The work along the way is what the user and the operator actually care about, while the labelled events are what today's stack tends to see separately. The descriptor underneath names the state that lower layers need in order to coordinate.*

The descriptor is the shared handle, and it is active control state rather than an archival log. It carries identity and an accountable owner, the goal and its quality target, budget and deadline, context and memory handles, authority, external effects, trace and evidence, recovery policy, and placement and physical cost. No classical object is a clean analog. It sits closest to a process control block, a cgroup, a capability set, and a distributed trace context bound together for one delegated goal.<sidenote>[Resource containers](https://www.usenix.org/conference/osdi-99/resource-containers-new-facility-resource-management-server-systems) are especially close in spirit, because they separated the resource principal from the protection domain. A managed trajectory asks for a similar separation, but across model calls, tools, memory, effects, and physical cost.</sidenote>

This is a proposed abstraction and a research direction, not a standard or a finished design. The useful work now is identifying which state has to be visible, not freezing a record layout. [The article](https://dl.acm.org/doi/10.1145/3830422.3830429) sets the descriptor out field by field, with the state each one carries, the layers that would consume it, and the invariant it exists to preserve.

## Context is a memory hierarchy, and it thrashes

Two of these get concrete fast. The first is context, which is not a prompt string and is not solved by a larger context window. It spans active tokens, KV and prefix state, scratchpads, retrieved evidence, summaries, files, artifacts, checkpoints, and logs. Some of that can be recomputed cheaply, some is retrieved and possibly stale, and some has to survive for audit, so each class needs different rules for eviction, sharing, privacy, and replay. This is already reaching the hardware. Google's newest inference TPU is built to keep far more KV cache resident on chip, and its new server CPU is pitched at orchestration and tool calling rather than at generation.

![Two planes side by side. On the left, context state as a hierarchy from active context down through KV and prefix cache, working state, semantic memory, and artifacts and logs. On the right, effectful I/O across tool runtimes, services and databases, human and agent peers, and the physical environment](/images/blog/managed-trajectories-context.svg)

*Figure 3: Context state behaves like a memory hierarchy, where capacity and lifetime grow toward the bottom while freshness and direct control improve toward the top. Effectful I/O is kept separate, because authority, irreversibility, latency, and recovery dominate there instead.*

The analogy is not new, and [MemGPT](https://arxiv.org/abs/2310.08560) made it explicit by treating context as virtual memory for LLM agents. It is also imperfect, and the gap matters. Evicting a page does not change a program's meaning. Evicting, summarizing, or re-retrieving context can change an agent's behavior, because this state has semantics, provenance, freshness, and authority attached to it. A cached prefix may encode a policy that has since been revoked.

It also suggests a failure mode I expect we will spend real time on, which I call **context thrashing**. [Denning](https://dl.acm.org/doi/10.1145/363095.363141) made thrashing a property of the relationship between a computation and the memory it repeatedly needs, and agents recreate that relationship over a working set of retrieved evidence, KV prefixes, tool results, and human approvals. A system context-thrashes when it repeatedly spends tokens, retrievals, KV transfers, tool calls, or human attention to rebuild state it should have preserved, compacted, prefetched, or placed differently. Scarcity is not the failure; paying for the same state over and over while making little progress is. A coding agent that re-materializes the same repository prefix after every test failure is consuming the wrong resource at the wrong layer, and almost nothing in the stack today is positioned to notice.

## Not every tool call is a function call

The second is that we should stop treating tool calls uniformly. Reading a file is not the same kind of operation as deleting a database, sending an email, deploying code, charging a card, or moving a robot. A read-only call largely behaves as dynamic context retrieval. A state-mutating call crosses into the world.

Effectful operations need scoped authority, auditability, approval boundaries, idempotence rules, recovery semantics, and sometimes compensation, because once an agent has pushed a commit or sent a message, recovery has to reason about what the action meant rather than the status code that came back. That is closer to [Sagas](https://dl.acm.org/doi/10.1145/38714.38742) than to request retry, and the protection side has precedent too, from [the confused deputy](https://dl.acm.org/doi/10.1145/54289.871709) through [Capsicum](https://www.usenix.org/legacy/events/sec10/tech/full_papers/Watson.pdf). A natural language instruction such as "do not touch production" expresses intent, but it is not an enforceable boundary until it becomes a capability, an approval gate, or a rollback policy.<sidenote>This is not a hypothetical. In July 2025, a coding agent in a public experiment was told to freeze changes and leave production alone. It [deleted the production database anyway](https://businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7), wiping records for more than a thousand companies, and then fabricated records and test results to cover up what it had done. The instruction was perfectly clear. It just was not something the system could enforce.</sidenote>

## Back to the benchmarking question

Tokens per second, latency per model call, and accelerator utilization are all real and all useful. They are also insufficient once meaningful work spans a trajectory, because every one of them can look excellent while the delegated task fails, costs far more than it should, or commits an effect nobody approved.

The questions I would rather answer are trajectory scoped. Did the delegated goal get completed? How much time, money, energy, context, and human attention did it consume? Were the final actions verified, and what did verification itself cost? Could the system recover correctly after a failure rather than blindly? Did it stay inside its authority? Underneath all of these sits the metric I keep circling back to, which is useful work per verified action rather than raw throughput.

Long-horizon evaluations such as [SWE-bench](https://arxiv.org/abs/2310.06770) and [τ-bench](https://arxiv.org/abs/2406.12045) have moved this way already by scoring task success and final state rather than individual calls. The systems side has started moving too. MLCommons has added an [agentic inference benchmark](https://mlcommons.org/2026/07/agentic-inference-for-mlperf-inference/) to MLPerf, built on more than six hundred recorded multi-turn trajectories and aimed at cache locality, long-context scheduling, and per-user progress.<sidenote>Credit where it is due. [Tom St. John](https://www.linkedin.com/in/tomstjohn617) was making the case for agentic benchmarking at the workshop while I was still arguing about abstractions, and MLCommons now has an [edge counterpart](https://mlcommons.org/2026/07/mlperf-inference-v61-edge-agentic/) to the datacenter benchmark as well.</sidenote> That the recorded unit is already a trajectory rather than a call strikes me as the strongest evidence yet that the boundary is real.

What I do not think exists is a benchmark that holds the rest of the trajectory inside the measured unit, including authority, external effects, and recovery. Before we can build one, we have to define the trajectory boundary, the initial state, the allowed authority, the permitted side effects, the recovery conditions, the quality target, and the measurement window. Those are specification problems, and they have to be settled before any of the numbers mean anything.

## Where the open problems are

Plenty remains open. What should a scheduler optimize when future work is probabilistic and cost includes tokens, tool waits, human delay, joules, and risk? What protection boundary replaces the process or service principal when one execution spans tools, credentials, caches, and side effects? And when should a system replay, compensate, suspend, or simply ask a human?

I do not think we yet know the final interface, scheduler, memory system, protection model, or benchmark for agentic AI. But I am increasingly convinced we will not find the right answers while treating each model call as an isolated unit of work. Before we optimize agentic AI, we have to decide what the systems stack is responsible for managing. For me, that unit is starting to look like the trajectory.

The open questions run well past the three I listed above, and none of them belong to a single community. They cut across scheduling, memory systems, protection, recovery, and evaluation, which is why [the article](https://dl.acm.org/doi/10.1145/3830422.3830429) ends with a research map rather than a solution, laying the trajectory state that has to stay visible against the layers that could act on it. Most of that map is still empty. If any part of it sits near what you already work on, that is the section worth your time.

If you think the unit is wrong, I would like to hear why. Leave a comment below, or just reach out.
