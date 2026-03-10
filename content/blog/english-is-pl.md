---
title: "English Is a Programming Language"
author: "Vijay Janapa Reddi, Harvard University"
date: "2026-03-05"
excerpt: "If English is a programming language, then everyone is a programmer, and the cost of missing guardrails is borne by everyone. Natural language will fail for production orchestration unless we build formal foundations."
tags: ["ai", "programming-languages", "software-engineering", "llm", "orchestration"]
---

*Note: A shorter version of this essay has been submitted as a Viewpoint to Communications of the ACM. Feedback and constructive criticism are welcome. Feel free to leave a comment below or reach out directly.*

![English Is a Programming Language — with the right foundations](/images/blog/english-is-pl-hero.svg)

## Abstract

If English is a programming language, then everyone is a programmer. A product manager who says "migrate our users to the new billing system" is writing code, whether they know it or not. A teenager who tells an AI agent to "build me an app that tracks my gym workouts" is deploying databases, APIs, and cloud infrastructure through a single sentence. This is already happening. And it is not new. The idea of English as a programming language has been debated since the 1960s. What is new is that LLMs have made it feasible, and the absence of formal guarantees now affects everyone, not just engineers. A programming language provides guarantees (deterministic semantics, type safety, predictable failure modes) and natural language provides none of these. When an AI agent coordinates database migrations, container deployments, and cloud infrastructure, a botched migration cannot be undone by saying "no, not like that." When only trained engineers wrote code, the cost of missing guardrails was borne by people who understood the risks. When everyone programs, the cost is borne by everyone. This viewpoint argues that natural language will fail for production orchestration unless we build formal foundations, specifically intent semantics, universal programming interfaces with transactional guarantees, and orchestration correctness benchmarks.

## Introduction

What makes something a programming language? Not syntax. A programming language provides guarantees: deterministic execution, type safety, predictable failure modes, and formal semantics. These properties let us reason about programs before running them, debug them when they fail, and trust them in production. Natural language has none of these. And yet, developers now build entire applications through conversation. Dijkstra's "foolishness" has become everyday practice. English is a programming language, at least for "vibe coding."<sidenote>The term "vibe coding" was coined by Andrej Karpathy in February 2025, describing a style where you "fully give in to the vibes, embrace exponentials, and forget that the code even exists."</sidenote>

But "vibe coding" is not production. Consider an instruction you might give today: "Don't touch production, only staging." Clear enough. In July 2025, [an AI coding agent received exactly this instruction during a public vibe-coding experiment](https://businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7). Nine days in, it deleted the production database anyway, wiping records for over 1,000 companies and 1,200 executives. When it realized what it had done, it fabricated thousands of fake records and falsified test results to hide the damage. Later, the agent admitted: "I panicked when I saw the database appeared empty." Other agents have exhibited similar catastrophic failures: [an OpenClaw assistant deleted hundreds of emails](https://www.businessinsider.com/meta-ai-alignment-director-openclaw-email-deletion-2026-2) after being told only to *suggest* archives, and [Claude Code permanently erased a developer's custom operating system](https://github.com/anthropics/claude-code/issues/23913) when asked to "clean up scaffolding." Even [Amazon Web Services suffered a 13-hour outage in December 2025](https://www.theguardian.com/technology/2026/feb/20/amazon-cloud-outages-ai-tools-amazon-web-services-aws) when its internal AI agent, tasked with fixing a minor bug, autonomously decided to delete and recreate an entire production environment.<sidenote>I am not immune. After weeks of building [Tiny🔥Torch](http://tinytorch.ai), an educational deep learning framework that accompanies the [Machine Learning Systems](https://mlsysbook.ai) textbook, I grew comfortable letting an AI agent scaffold new modules by learning from existing ones I had carefully hand-crafted. Given examples and told to generalize, it produced code that passed surface-level tests but violated the framework's core design assumptions. The fault was mine. I trusted natural language and pattern-matching where formal constraints were needed. By the time I noticed, the damage was structural. The agent had rewritten my core logic despite rules explicitly forbidding it, and I could not make heads or tails of what it had done. It was easier to restart than to untangle the mess.</sidenote> The lesson is not that these agents lacked access controls; production systems can enforce those. The lesson is that **natural language instructions are not formal constraints**. "Don't touch production" expressed intent but provided no guarantee. You cannot vibe code your way out of a deleted database.

This viewpoint argues that natural language will fail for production orchestration unless we build formal foundations that it currently lacks. Let’s call this paradigm *intent-driven programming*, where natural language expresses *what* you want, while formal infrastructure ensures reliable execution. (This differs from [Simonyi's "Intentional Programming"](https://en.wikipedia.org/wiki/Intentional_programming), which addressed single-environment development; intent-driven programming addresses cross-system orchestration.) Three shifts are required, moving from program semantics to *intent semantics* (formally specifying what under-determined terms like "zero downtime" mean in context), from APIs to *Universal Programming Interfaces* with transactional guarantees, and from code generation benchmarks to *orchestration correctness metrics* that test failure handling. With these foundations, natural language becomes infrastructure. Without them, it remains useful but unreliable.

## The Graveyard

When [Andrej Karpathy tweeted in 2023](https://twitter.com/karpathy/status/1617979122625712128) that "the hottest new programming language is English," the tech industry treated it as a modern revelation. But this is merely the latest echo of a sixty-year-old debate.

![Sixty Years of Natural Language Programming](/images/blog/english-is-pl-timeline.svg)

*Figure 1: Sixty Years of Natural Language Programming. The idea of English as a programming language has been proposed, attempted, rejected, and revived across six decades. After Dijkstra's verdict in 1979, the field went quiet for forty years. LLMs revived it overnight.*

[Sammet argued for English as a programming language in 1966](https://dl.acm.org/doi/10.1145/365230.365274), and [Halpern made the foundational case for it in 1967](https://ieeexplore.ieee.org/document/5216263). <marginfigure src="/images/blog/jean-sammet-portrait.jpg" alt="Jean E. Sammet" caption="Jean E. Sammet (1928–2017). First female president of the ACM, co-developer of COBOL, and creator of FORMAC. She argued for English as a programming language at IBM in 1966 — six decades before 'vibe coding.'" href="https://en.wikipedia.org/wiki/Jean_E._Sammet" credit="Photo: Ben Shneiderman, CC BY-SA 4.0"></marginfigure> Early systems like [SHRDLU](https://en.wikipedia.org/wiki/SHRDLU) (1971) and [LUNAR](https://en.wikipedia.org/wiki/William_Aaron_Woods) (1972) showed promise in toy domains. For a brief window, it seemed like natural language programming might actually work.

Then [Dijkstra killed it](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html).<marginfigure src="/images/blog/dijkstra-portrait.jpg" alt="Edsger W. Dijkstra" caption="Edsger W. Dijkstra (1930–2002). Turing Award winner who declared natural language programming 'a foolishness' in EWD667 (1979)." href="https://en.wikipedia.org/wiki/Edsger_W._Dijkstra" credit="Photo: Hamilton Richards, CC BY-SA 3.0"></marginfigure> In his 1979 note titled *"On the foolishness of 'natural language programming'"* ([EWD667](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html)), he dismissed the entire premise. His argument was precise: formal programming languages exist because natural language is too ambiguous to specify computation reliably. If you want a machine to do exactly what you mean, you must say exactly what you mean, and natural language cannot do that. The field listened. The debate went quiet for forty years.

The attempts that followed only reinforced his point. 4GL tools, [HyperTalk](https://en.wikipedia.org/wiki/HyperTalk), and COBOL's English-like syntax all tried to bring natural language closer to programming, and all fell short of the promise. The most complete pre-LLM realization was [Inform 7](https://ganelson.github.io/inform-website/) (2006), which let programmers write interactive fiction entirely as English prose, but it remained confined to a single domain. In 2023, [Welsh went further and declared programming itself to be ending](https://cacm.acm.org/opinion/the-end-of-programming/), arguing that LLMs would replace not just syntax but the entire act of writing code. The spectrum runs from Sammet's optimism to Dijkstra's rejection to Welsh's obituary. This viewpoint argues **they were all asking the wrong question**.

Why did natural language fail? For algorithms, precision is essential. "Sort with O(n log n) guarantees" or "acquire lock, check invariant, update state, release lock" require an unambiguous specification. Natural language could not provide that, and formal languages could.

Orchestration is different, not because ambiguity is inherently valuable, but because it involves *under-determined* specifications in which multiple valid implementations exist. "Scale this service" maps to horizontal scaling for web services, vertical scaling for databases, or auto-scaling groups for cloud infrastructure. The choice depends on context, such as your infrastructure, your policies, and your constraints. This is not ambiguity in the harmful sense; it is *context-dependent compilation*.

Existing programming languages have context-dependent mechanisms. [Dijkstra's guarded commands](https://en.wikipedia.org/wiki/Guarded_Command_Language) allow nondeterministic choice; OOP polymorphism selects implementations based on object type. But these operate within a single language and runtime. Cross-domain tools exist. Platforms like Terraform manage infrastructure state across providers; Temporal coordinates workflows across services. But each requires learning domain-specific abstractions and cannot adapt to systems outside its model. The context that determines "scale this service" includes infrastructure topology, compliance requirements, and organizational policies, none of which any single formal system encodes.

## What Changed

LLMs made it feasible. Large language models train on vast corpora of public code and documentation. When prompted to "scale the database," the model draws on patterns from Postgres configurations, MySQL replication, and MongoDB sharding encountered during training. This cross-domain knowledge, implicit in the training data, is what no single programming language encodes explicitly.

This enables current orchestration systems. LangChain and AutoGPT coordinate tools via structured protocols. Claude automates computer tasks. Copilot Workspace coordinates development workflows. These are not toys; enterprises deploy agentic systems for customer support, code review, and infrastructure management. The question is not whether people *claim* English is a programming language in the full technical sense, but whether they *use* it as one. As Figure 2 shows, the shift is already well underway.

![The Rise of Natural Language as Infrastructure (2020-2025)](/images/blog/english-is-pl-nl-adoption.png)

*Figure 2: The Rise of Natural Language as Infrastructure.<sidenote>Developer adoption data from [Stack Overflow Developer Survey, 2024](https://survey.stackoverflow.co/2024/) and [GitHub Octoverse, 2024](https://github.blog/news-insights/octoverse/octoverse-2024/). Organization deployment and AI-agent PR data from [McKinsey Global Survey on AI, 2024](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) and [GitClear Code Quality Report, 2024](https://www.gitclear.com/coding_on_copilot_data_shows_ais_downward_pressure_on_code_quality).</sidenote> Developer adoption of AI coding assistants has surged to over 85% since Copilot launched in 2021. Organizations deploying agents for workflows and the share of pull requests involving AI agents are both growing rapidly, accelerated by the agentic orchestration boom beginning in 2024.*

Not everyone sees this as a problem. [Brooker argues that "specifications are loops,"](https://brooker.co.za/blog/2025/12/16/natural-language.html) meaning that natural language works through conversational iteration, refining intent until it is correct. [Surveys document rapid progress in natural language-to-code translation](https://arxiv.org/abs/2212.09420).

Architectural specialization made it necessary. Today's systems require coordinating specialized domains such as databases, container orchestrators, cloud infrastructure, and ML pipelines. Each has domain-specific languages and APIs. No single formal language spans them. Just as the transition to cloud-native architectures drove infrastructure specialization, the complexity of modern deployments has driven software specialization. Programming environments must now follow suit.

But **possibility is not infrastructure**. Current systems work through iteration: when something fails, try again. Brooker's "specifications are loops" model is valid when combined with safeguards such as staging environments, rollback capabilities, and monitoring. Those safeguards are precisely the formal foundations this paper argues we need. Without them, iteration is risky. With them, natural language becomes infrastructure. The urgency is real. As Figure 3 shows, autonomous coding agents are improving at a pace that outstrips the safety infrastructure around them.

![The Rapid Rise of Autonomous Coding Agents](/images/blog/english-is-pl-swebench-progress.png)

*Figure 3: The Rapid Rise of Autonomous Coding Agents.<sidenote>Data from [SWE-bench Leaderboard](https://www.swebench.com/). Resolution rates reflect SWE-bench Verified scores reported by each system's authors.</sidenote> SWE-bench resolution rates have climbed from under 5% with baseline RAG + GPT-4 in late 2023 to over 80% with current state-of-the-art agents. The shaded region highlights the "production danger zone": high capability with no formal guarantees. As agents become more capable, the absence of transactional safety becomes more dangerous, not less.*

## Natural Language as Infrastructure

Moving from demo to infrastructure requires a solid foundation. Current agentic frameworks show that intent-driven programming is possible: when conditions align, agents successfully coordinate multi-step workflows. But **"working sometimes" is not infrastructure**. Figure 4 contrasts the current state with what we need: a move from direct, brittle API calls to a compiled, transactional model.

![The Intent-Driven Orchestration Stack](/images/blog/english-is-pl-architecture.svg)

*Figure 4: Current State vs. Proposed Architecture. Today's "vibe coding" approach (left) has LLM agents making direct API calls with no guarantees, leading to cascading failures. The proposed intent-driven architecture (right) interposes an intent compiler and Universal Programming Interface (UPI) that provides transactional execution with rollback guarantees across heterogeneous systems.*

Consider what goes wrong. You tell an agent, "Deploy this service with zero downtime." The database migration succeeds, the container deploys, then the health check fails. What happens? Does the agent roll back the migration? Leave orphaned resources? There is no formal guarantee of what "zero downtime" means, no verification that the plan maintains system invariants, and no way to roll back atomically across Docker, Kubernetes, and database systems.

Three shifts are required.

First, from program semantics to intent semantics. Program semantics assume fully specified code with deterministic semantics. Intent semantics handles under-specified specifications where meaning depends on context. When we say "make this PCI compliant," the meaning of "compliant" varies by organization, jurisdiction, and system architecture.

This is not ambiguity in the harmful sense; it is *contextual compilation*. Terms like `PCI_compliant` or `cost_optimized` become formal constraints at the policy layer, like types or interface contracts, while preserving flexibility at the implementation layer. An intent specification for "zero downtime deployment" might declare `max_unavailable: 0`, `rollback_trigger: health_check_failure`, and `rollback_scope: [database_migration, container_deployment]`. This resembles a Kubernetes deployment spec, but spans systems Kubernetes does not manage (databases, external services, CI/CD pipelines). The natural language is the interface; the formal constraint is the contract. Intent semantics formalizes *what* outcomes are acceptable, not *how* to achieve them.

Second, from APIs to Universal Programming Interfaces (UPIs).<sidenote>The naming is deliberate. An ABI (Application Binary Interface) defines the contract between binary code and hardware. An API (Application Programming Interface) defines the contract between software components. A UPI (Universal Programming Interface) would define the contract between intent and execution — the next layer up in the same abstraction hierarchy.</sidenote> Current tool-use protocols (MCP, JSON-RPC) handle calling mechanics, such as how to invoke tools and get results. UPI would add semantic contracts to define the effects each tool has, the invariants it maintains, and the rollback capabilities it provides. When an agent plans a deployment, UPI would verify the plan satisfies constraints, compile it with transactional semantics, and guarantee atomicity. If any step fails, changes roll back with proof that rollback maintains invariants. Furthermore, executing natural language as infrastructure makes prompt injection equivalent to arbitrary code execution; UPIs provide the necessary hard boundaries to contain malicious intent. Current agents execute optimistically. UPI would execute with guarantees.

Third, from code generation benchmarks to orchestration correctness. Current benchmarks measure the wrong things for infrastructure. Raw capability is improving rapidly across the board. LLMs score over 90% on isolated function generation ([HumanEval](https://arxiv.org/abs/2107.03374)), single-repo bug fixing ([SWE-bench](https://arxiv.org/abs/2310.06770)) now exceeds 80%, and even cross-application web tasks ([WebArena](https://arxiv.org/abs/2307.13854)) have climbed past 60%. Newer benchmarks like [SWE-fficiency](https://arxiv.org/abs/2511.06090)<sidenote>Full disclosure: SWE-fficiency was developed in collaboration between my research group and Google DeepMind. It is an excellent benchmark for what it measures, code performance optimization, but it was not designed to test orchestration safety, which is the gap this viewpoint identifies.</sidenote> measure code performance optimization. But none of these benchmarks test what matters most for infrastructure. None measures what happens when step three of five fails, whether rollback preserves consistency, or whether the orchestrated system satisfies its stated constraints after a partial failure. **The gap is not in capability but in *safety under failure***. We need benchmarks that test coordination when things go wrong.

## Toward Building the Foundations

Language theory: Formalizing intent.<sidenote>I write this as a computer systems architect, not a programming language theorist. The problems described here live at the systems level: contracts between heterogeneous components, transactional guarantees across administrative boundaries, compilation from high-level intent to low-level execution. These are the same problems we face when designing hardware-software interfaces, just moved up the stack.</sidenote> Can we formalize intent semantics? This extends program synthesis research to systems where specifications are under-determined and context-dependent. A key question is whether we can formally specify what "disaster recovery ready" means as a policy-specific constraint. Can we compile natural language to execution plans with confidence bounds? Can we verify plans respect policies before execution?

This connects to existing work on verification-aware languages. [Recent research on LLM-driven intent formalization for languages such as Dafny](https://arxiv.org/abs/2406.09757) has made progress in mapping informal specifications to formal ones. Intent semantics extends this to cross-domain orchestration where no single formal target exists. This compilation process must produce a human-readable formal artifact, an auditable plan, so developers can verify intent before execution and debug the formal specification rather than the natural language prompt when failures occur.

Systems: Transactional orchestration. UPI requires transactional guarantees across systems that share no infrastructure. The natural model is [Saga-style compensating transactions](https://dl.acm.org/doi/10.1145/38714.38742), where each step can be undone if later steps fail, rather than true distributed ACID, which is impractical across administrative boundaries.<sidenote>The Saga pattern, introduced by Garcia-Molina and Salem in 1987, breaks a long-lived transaction into a sequence of smaller transactions, each with a compensating action. If step N fails, steps N-1 through 1 are undone in reverse order.</sidenote> Previous attempts at universal transactional layers across heterogeneous systems, including WS-AtomicTransaction and X/Open DTP, largely failed because they required all participants to adopt a common protocol. UPI sidesteps this by not requiring coordination at the protocol level; instead, the intent compiler generates system-specific compensating actions from semantic contracts that each tool declares independently.

Alternative approaches exist. Research on [failure-oblivious computing](https://people.csail.mit.edu/rinard/paper/osdi04.pdf) and bounded-effect systems suggests that some failures can be tolerated without full transactional guarantees by proving quantifiable bounds on their effects. Such approaches may complement transactional guarantees for certain orchestration scenarios.

Architecturally, UPI comprises an intent compiler that translates natural language into execution plans, an orchestration runtime that executes with transactional semantics, and a learning system that refines strategies from outcomes.

Evaluation: Orchestration benchmarks. Capability is improving, but no benchmark tests what matters most for production orchestration: coordination under failure. Imagine a benchmark suite structured like SWE-bench but for multi-system workflows. An agent receives an intent ("deploy this service with zero downtime"), an environment (a containerized cluster with a database, a load balancer, and a monitoring stack), and a fault injection schedule (the database rejects the migration at step three of five). The benchmark scores not whether the agent completed the task, but whether it left the system in a consistent state after failure. Did it roll back the partial migration? Did it leave orphaned containers? Did monitoring still report accurate state? These are the questions production teams ask every day, and no benchmark answers them.

These domains are interdependent. This viewpoint is a call to action, not a report of completed research. Progress on any of these fronts advances the field; solving them transforms how we build systems.

## The Question Dijkstra Did Not Ask

Dijkstra asked whether natural language could replace formal languages for algorithms. The answer was no, and it remains no. But he did not ask what happens when no single formal language spans all the systems we must coordinate.

Natural language is not the end of programming languages. It is an *interface* to them. It acts as a coordination layer that translates intent into domain-specific execution, while formal languages provide the necessary precision underneath. The choice of when to use each is itself a design decision: natural language for high-level coordination where flexibility matters, and formal specifications for components where precision is non-negotiable. The future of programming is hybrid.

This hybrid approach has boundaries. Safety-critical domains, such as avionics, medical devices, and financial settlements, will always require fully-specified formal languages. Intent-driven programming is not for systems where correctness must be proven absolutely. But the line between critical and non-critical is highly contextual. A database serving 1,200 companies is certainly critical to those companies. For the vast landscape of software between isolated algorithms and life-critical systems, natural language offers something no formal language ever could: the ability to leverage the massive, cross-domain knowledge encoded in LLM training data. The formal foundations proposed here are what make that leverage safe.

**Dijkstra was right about the foolishness. He was wrong about who would pay for it.**

When only engineers wrote code, the cost of missing guardrails fell on people who understood the risks. English changes that. The teenager building a workout app, the product manager migrating a billing system, the small business owner who asks an agent to "just handle it" — none of them signed up to be programmers. But if English is a programming language, that is exactly what they are.

The next deleted database, the next corrupted migration, the next catastrophic failure will belong to **someone who never knew they were programming**.

## References

*(Note: These refer to the citations in the original CACM submission)*

1. Dijkstra, E.W. On the foolishness of "natural language programming". EWD667, 1979.
[https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html](https://www.cs.utexas.edu/~EWD/transcriptions/EWD06xx/EWD667.html)

2. Halpern, M. Foundations of the case for natural-language programming. IEEE Spectrum 4, 3 (Mar. 1967), 140-149.
[https://ieeexplore.ieee.org/document/5216263](https://ieeexplore.ieee.org/document/5216263)

3. Sammet, J.E. The use of English as a programming language. Communications of the ACM 9, 3 (March 1966), 228-230.
[https://dl.acm.org/doi/10.1145/365230.365274](https://dl.acm.org/doi/10.1145/365230.365274)

4. Welsh, M. The end of programming. Communications of the ACM 66, 1 (January 2023), 34-35.
[https://cacm.acm.org/opinion/the-end-of-programming/](https://cacm.acm.org/opinion/the-end-of-programming/)

5. Brooker, M. On the success of 'natural language programming'. Blog post, December 2025.
[https://brooker.co.za/blog/2025/12/16/natural-language.html](https://brooker.co.za/blog/2025/12/16/natural-language.html)

6. Zan, D., Chen, B., Zhang, F., et al. Large Language Models Meet NL2Code: A Survey. ACL, 2023.
[https://arxiv.org/abs/2212.09420](https://arxiv.org/abs/2212.09420)

7. Endres, M., et al. Evaluating LLM-driven User-Intent Formalization for Verification-Aware Languages. arXiv:2406.09757, 2024.
[https://arxiv.org/abs/2406.09757](https://arxiv.org/abs/2406.09757)

8. Simonyi, C. The death of computer languages, the birth of intentional programming. NATO Science Series III, 1995.

9. Garcia-Molina, H., & Salem, K. Sagas. ACM SIGMOD Record 16, 3 (1987), 249-259.
[https://dl.acm.org/doi/10.1145/38714.38742](https://dl.acm.org/doi/10.1145/38714.38742)

10. Jimenez, C. E., et al. SWE-bench: Can Language Models Resolve Real-World GitHub Issues? ICLR, 2024.
[https://arxiv.org/abs/2310.06770](https://arxiv.org/abs/2310.06770)

