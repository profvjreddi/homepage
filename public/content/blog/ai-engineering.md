---
title: "AI Engineering: Time to Recognize a New Discipline"
date: "2026-01-26"
excerpt: "Just as the 1968 NATO conference catalyzed software engineering in response to the software crisis, the computing community should now recognize AI engineering as a discipline adequate to the AI systems crisis we face."
tags: ["ai-engineering", "machine-learning", "software-engineering", "mlops", "education", "academia"]
---

## Abstract

AI engineering has emerged as a computational discipline distinct from both machine learning research and traditional software engineering. Drawing on the framework established by Denning et al. in the landmark 1989 "Computing as a Discipline" report, this article makes a case that a coherent body of knowledge, distinct competencies, and a recognizable professional identity have already emerged in practice, and that formalizing this discipline would benefit practitioners, educators, and the reliability of the systems we collectively build. The gap between what ML research produces and what production systems require has become economically significant: most AI projects fail to reach production or deliver the intended value. Just as the 1968 NATO conference catalyzed the recognition of software engineering in response to the software crisis, the computing community should now recognize AI engineering as a discipline adequate to the AI systems crisis we face.

---

We are building AI systems at a pace that outstrips our ability to build them well. The gap between what machine learning research produces and what production systems require has become a chasm, one that neither traditional software engineering nor data science is equipped to bridge. It is time to recognize AI engineering as a distinct computational discipline.

This is not a proposal to create yet another specialization or to rebrand existing practices under a trendier name. It is an argument that a coherent body of knowledge, a distinct set of competencies, and a recognizable professional identity have already emerged in practice, and that formalizing this discipline would benefit practitioners, educators, and the systems we collectively build.

## What AI Engineering Is, and Is Not

Before distinguishing AI engineering from adjacent fields, it helps to ground the definition in what engineering means. As Mary Shaw observed, engineering is about "creating cost-effective solutions to practical problems by applying scientific knowledge to building things in the service of mankind" [1]. AI engineering applies this ethos to systems with learned components.

> **AI Engineering** is the discipline of building machine learning systems that work reliably in production. It sits at the intersection of ML theory (understanding *why* models work), ML systems (understanding *how* to make them run efficiently), and applied ML (understanding *what* to build and for whom). The AI engineer's job is to bridge the gap between what research makes possible and what real-world deployment requires—building systems that operate continuously, degrade gracefully, and can be maintained over time.

This definition is deliberately narrow. It excludes systems that merely use AI as a peripheral feature, as well as research aimed at advancing the state of the art in machine learning itself. Figure 1 illustrates where AI engineering sits relative to its neighboring fields.

![AI Engineering Venn Diagram](/images/blog/ai-engineering-venn.svg)
*Figure 1. AI Engineering emerges at the intersection of ML Theory, ML Systems, and Applied ML.*

The challenges of building reliable, maintainable, and efficient AI solutions differ substantially from those in both traditional software and the research enterprise that produces new AI capabilities. The distinction from machine learning research is perhaps the easiest to draw. Machine learning research optimizes for novelty, for pushing benchmarks, and for theoretical insight. AI engineering optimizes for reliability, maintainability, and operational performance under real-world constraints. A researcher may celebrate a model that achieves state-of-the-art accuracy on ImageNet. An engineer asks whether it can run on the target hardware, how it degrades when input distributions shift, what happens when it fails, and how it will be updated over time. These are not merely different emphases. They require different knowledge, different skills, and different ways of reasoning about problems.

It is also important to distinguish AI engineering from machine learning systems. Machine learning systems research focuses on the design of abstractions, runtimes, compilers, hardware, and distributed infrastructure that enable efficient, scalable execution of machine learning workloads. The success of venues such as MLSys reflects the importance and vitality of this research community. However, machine learning systems function primarily as a research field rather than as an engineering discipline. Its core contributions are new techniques, architectures, and measurements that advance the state of the art. Evaluation emphasizes novelty, performance improvements, and generality across workloads. This orientation is appropriate for research, but it does not by itself establish a professional body of practice concerned with building systems that operate reliably over long lifetimes in organizational settings.

AI engineering occupies a different layer. It concerns the end-to-end construction of AI systems that must operate continuously, degrade gracefully, and be maintained over time by teams operating under constraints on cost, energy, latency, regulation, and human trust. AI engineers draw heavily on results from machine learning systems research, just as software engineers draw on results from programming languages and operating systems research. But the existence of a research field does not eliminate the need for an engineering discipline. Compiler research is not software engineering. Distributed systems research is not site reliability engineering. Research advances what is possible. Engineering determines what is dependable. 

The distinction from traditional software engineering is subtler but equally important. Software engineering has developed sophisticated methods for specifying, testing, and verifying deterministic systems. Machine learning components, by contrast, are fundamentally probabilistic. Their behavior cannot be fully specified in advance. They learn from data, which means their failure modes are often emergent rather than designed. The testing regimes, deployment strategies, and monitoring approaches that work for traditional software are necessary but insufficient for AI systems. Sculley and colleagues documented this challenge in detail, showing that machine learning systems accumulate technical debt through boundary erosion, entanglement, hidden feedback loops, and data dependencies that create maintenance burdens far exceeding those of conventional code \[2\].

Data science presents a different boundary. Data scientists excel at extracting insight from data, at building models that answer analytical questions, and at communicating findings to stakeholders. The transition from a notebook that demonstrates a working model to a production system that reliably produces predictions at scale is not a matter of polishing. It represents a fundamental change in the construction process. The data scientist asks, “Can this model solve the problem?” The AI engineer asks, “Can this model solve the problem continuously, reliably, and maintainably for the next five years?”

Together, these distinctions clarify that AI engineering is neither applied machine learning nor MLOps, nor a rebranding of machine learning systems research. It is the discipline concerned with building AI systems that operate in the real world over time under constraints.

## Historical Precedent: The Emergence of Software Engineering

We have been here before. In the 1960s, computing faced what was then called the "software crisis." Programs were delivered late, over budget, and riddled with defects. The NATO Software Engineering Conference of 1968 gave this crisis a name and proposed a response: treat software development as an engineering discipline, with its own principles, methods, and professional standards \[3\]. The phrase "software engineering" was deliberately chosen as provocative, implying that software manufacture should be grounded in the theoretical foundations and practical disciplines characteristic of established branches of engineering.

The proposal was controversial. Many computer scientists viewed it as a dilution of their field, a retreat from mathematical rigor toward mere craft. And indeed, software engineering did not emerge as a subset of computer science. It emerged as a related but distinct discipline, drawing on computer science, systems thinking, project management, and hard-won practical experience. The process took decades to resolve into recognizable curricula, professional certifications, and bodies of knowledge.

The parallel to our current moment is instructive. We now face an "AI systems crisis." Industry analysts report that the majority of AI projects fail to deliver intended outcomes, with estimates suggesting that 80-87% of projects never reach production or fail to generate business value \[4\]. Those that do reach production often degrade rapidly, require constant manual intervention, or fail in ways that damage trust and sometimes cause harm. The failure modes are predictable to anyone who has built these systems. A model that performed well in testing degrades silently in production because the input distribution shifted, and no one built monitoring to detect it. A system that worked in the lab fails at the edge because latency requirements were never communicated to the team selecting model architectures. A team retrained a model without versioning the training data and cannot reproduce last week's results. A deployment pipeline continues to run until the model size exceeds the available memory, a constraint that has not been verified. These are not research problems. They are engineering problems, and they recur because we lack the shared vocabulary, training, and institutional memory that a discipline provides.

The response should be similar to 1968: recognize that building AI systems well requires disciplinary knowledge that is related to, but distinct from, the research disciplines that produce the underlying techniques.

## Core Knowledge Areas

What would an AI engineer need to know? The question has immediate implications for curriculum design, hiring practices, and professional development. In 1989, Denning et al. proposed that computing could be understood through a matrix of nine subject areas crossed with three fundamental processes: theory, abstraction, and design \[5\]. This framework proved enormously influential, becoming the backbone of the ACM Curriculum '91 recommendation and shaping computing education for decades. A framework could organize the intellectual content of AI engineering, though developing a full specification would require broader community input. Several core areas are already evident from practice.

One way to make this concrete is to view AI engineering as a reassembly of the existing computer systems curriculum, organized around systems whose core components are learned rather than deterministic. Table 1 contrasts a conventional systems stack with a corresponding AI engineering stack, highlighting where familiar courses are reframed and where new material is required. The areas discussed below correspond to the layers of the AI engineering stack shown in Table 1, progressing from data and models through systems and operations to hardware constraints and human interaction.

**Table 1\. From a Traditional Computer Systems Curriculum to an AI Engineering Stack**

| Traditional Systems Stack | AI Engineering Stack |
| :---: | :---: |
| HCI or Product Design | Human AI Interaction, trust, decision making, workflows (new) |
| Software Engineering, Distributed Systems | ML Systems Engineering, testing, and integration of probabilistic components, reliability for learned systems (new) |
| Machine Learning, Data Science | Model Engineering, deployment-driven evaluation, efficiency, and lifecycle constraints (reframed) |
| Databases, Data Management | Data Engineering for ML, data quality, versioning, feedback loops in learning systems (reframed) |
| Computer Architecture, VLSI Systems | Hardware Aware AI Systems, edge and cloud co-design, energy, memory, and silicon constraints on models (reframed) |

### Data Engineering

Data engineering for ML encompasses not only the mechanics of data pipelines but also the deeper challenges of data quality, provenance, versioning, and the feedback loops that arise when model outputs influence future training data. Sambasivan and colleagues documented how conventional AI practices systematically undervalue data quality, leading to "data cascades" that compound negative downstream effects, including technical debt, project abandonment, and harm to intended beneficiaries \[6\]. Their finding that "everyone wants to do the model work, not the data work" points to a cultural problem that disciplinary recognition could help address, reflected in the reframing of traditional data management as data engineering for learning systems in Table 1\.

### Model Development and Evaluation

Model development and evaluation extend beyond training to include selecting appropriate architectures for deployment constraints, designing evaluation protocols that predict production performance, and developing baselines that enable meaningful comparison. Amershi and colleagues, studying AI teams at Microsoft, found that organizations face challenges distinct from those in traditional software development: discovering and managing data is fundamentally more complex, model customization requires skills different from those typical of software teams, and AI components resist modular decomposition, thereby complicating integration \[7\]. This layer corresponds to what Table 1 identifies as ML systems engineering, extending DevOps practices to learned, continuously evolving components. Once models move from experimentation into real systems, new constraints emerge.

### Systems Integration

Systems integration addresses how ML components interact with the broader systems in which they are embedded. This includes API design, latency management, graceful degradation, and the challenge of maintaining consistency across model versions.

### Deployment and Operations

Deployment and operations cover the infrastructure for serving models, the monitoring systems that detect degradation, the processes for safe rollout and rollback, and the automation that enables continuous improvement without continuous manual intervention.

### Hardware-Aware Optimization

Hardware-aware optimization has become increasingly critical as AI moves to edge devices and as the economics of cloud inference drive attention to efficiency. Understanding the relationship between model architecture and execution performance is no longer optional. The rise of TinyML and on-device inference has made this especially acute: models must be designed from the outset with target hardware in mind, rather than optimized as an afterthought. As the bottom row of Table 1 suggests, hardware constraints move from an implementation detail to a first-order design concern in AI engineering.

### Safety and Reliability

Safety and reliability encompass not only robustness to adversarial inputs but also the broader challenge of ensuring that AI systems behave acceptably across the full range of conditions they will encounter, including conditions not represented in the training data.

### Human-AI Interaction

Human-AI interaction addresses how humans and AI systems work together, including interface design, calibration of user trust, and the organizational processes that govern how AI recommendations are used.

These areas are interconnected. Decisions in one area constrain options in others. A central competency of the AI engineer is the systematic navigation of these trade-offs rather than their discovery through trial and error.

## Why Now

Four developments make disciplinary recognition urgent.

First, **AI is moving to the edge**. Models are being deployed on mobile devices, embedded systems, vehicles, and industrial equipment, environments where the assumptions of cloud-based ML break down. These systems must operate reliably with limited connectivity, constrained compute, and no opportunity for rapid rollback. The hardware constraints are fixed for product lifetimes measured in years. The update mechanisms are slow, risky, and often require physical access. Failures may have physical consequences. The engineering challenges are severe, and they are not well addressed by either cloud-focused MLOps practices or traditional embedded systems engineering. Edge AI demands a synthesis that neither field currently provides.

Second, **the gap between research and production has become economically significant**. Organizations are investing heavily in AI capabilities but struggling to realize value. The problem is not a shortage of ML talent. There is a shortage of people who can bridge the gap between what ML can do in principle and what systems can do in practice. This is a workforce problem that requires an educational response. Current training, as multiple studies have documented, leaves graduates prepared to train models on clean datasets but unprepared for the realities of production data, system integration, and operational maintenance \[6, 7\].

Third, **AI systems are increasingly consequential**. They influence hiring decisions, medical diagnoses, financial outcomes, and physical safety. The ad hoc approaches that sufficed when AI was experimental are inadequate for systems that affect people's lives. We need professional standards, and professional standards require a professional identity.

Fourth, **the economics of scale demand an engineering discipline**. Training frontier models now costs tens of millions of dollars and consumes staggering amounts of energy; by some estimates, training a single large model can require over 50 gigawatt-hours of electricity, comparable to the annual consumption of thousands of households. Operating these models at scale increases costs by many orders of magnitude. The brute-force approach of increasing data, parameters, and compute is encountering physical and economic limits. 

Engineering disciplines exist precisely to find efficient solutions subject to constraints, not merely workable solutions. Science asks what is possible; engineering asks what is practical. Efficiency gains will not come primarily from researchers optimizing for benchmark accuracy; they will come from engineers who understand the full stack, from algorithms to silicon, and who are trained to make systems work within real-world budgets of energy, latency, memory, and cost. As AI transitions from research capability to critical infrastructure, we need practitioners trained to ask, "How do we build this sustainably?" rather than only, "Can we build this at all?" The era of treating computational resources as effectively unlimited is ending, and with it the luxury of building AI systems without the discipline that efficiency requires.

## Addressing Objections

The most common objection to this proposal is that AI engineering is simply applied ML, or that the emerging field of MLOps adequately covers it. Neither characterization is accurate. Applied ML suggests that engineering challenges are downstream consequences of ML research; if you understand the models, the rest follows. This misunderstands the nature of the work. AI engineering requires an understanding of ML, as well as systems, operations, product development, and organizational dynamics. The knowledge is not derivative; it is integrative.

MLOps, as currently practiced, focuses primarily on the operational infrastructure for deploying and monitoring models. This is necessary but not sufficient. MLOps addresses part of the AI engineering stack, much as DevOps addresses part of the software engineering stack. But we do not collapse software engineering into DevOps, and we should not collapse AI engineering into MLOps. The analogy clarifies the relationship: MLOps is to AI engineering as DevOps is to software engineering, an important subspecialty focused on deployment and operations, not a substitute for the broader discipline.

A more sympathetic objection is that disciplines should emerge organically rather than being declared into existence. There is wisdom in this caution. The 1968 NATO conference did not create software engineering ex nihilo; it named and catalyzed a conversation that was already underway. The argument here is similar: we should not create AI engineering from whole cloth, but recognize what has already emerged. The practices exist. The practitioners exist. The knowledge exists, scattered across blog posts, conference talks, internal documentation, and tribal knowledge within organizations. Disciplinary recognition is a call for consolidation, not creation.

## The Road Ahead

Recognizing AI engineering as a discipline does not require a single dramatic action. It requires a series of smaller steps: developing curriculum frameworks that go beyond model training to encompass the full lifecycle of AI systems; establishing professional communities where engineering knowledge, not just research results, can be shared and validated; creating venues that reward reliable systems, not just novel algorithms; and building the institutional structures that allow a profession to develop standards and transmit expertise.

Institutional momentum is already building. The Software Engineering Institute at Carnegie Mellon has been developing an AI Engineering Body of Knowledge organized around three pillars: human-centered AI, robust and secure AI, and scalable AI \[8\]. Their 2020 workshop on AI Engineering for Defense and National Security brought together thought leaders to identify challenges and recommended that the DoD "identify opportunities to build, share, evolve, and mature processes, practices, tools, and technologies for reliably engineering AI systems." The Defense Innovation Board has called for cultivating and growing the field of AI engineering. These efforts signal recognition within the defense and national security communities; the argument here is that the broader computing community should recognize and accelerate this development.

ACM or IEEE needs to establish technical communities focused specifically on AI systems engineering practice. It might mean universities developing degree programs or concentrations that integrate ML fundamentals with systems engineering, operations, and product development. It might mean industry consortia developing competency frameworks that hiring managers can use, and practitioners can develop against. And it might mean conference tracks or journals that publish engineering case studies, failure analyses, and best practices with the same rigor we apply to research contributions. Just as software engineering developed incident response and vulnerability disclosure ecosystems, AI engineering will need infrastructure for sharing failures and coordinating responses to emerging problems.

The community has done this before, for software engineering and computer engineering. We can do it again. The alternative, continuing to treat AI systems engineering as an afterthought to AI research, is increasingly untenable: without shared vocabulary, teams will keep repeating the same mistakes; without curricula, practitioners will continue learning through costly trial and error; without professional identity, organizations will struggle to hire, structure teams, and build institutional knowledge. The systems we are building are too important and too complex to be built without a discipline adequate to the task.

These observations emerge from my personal experience building ML systems across scales, from datacenter-scale MLPerf benchmarks to microcontroller-scale TinyML deployments, and from efforts to codify this knowledge through open curricula that have reached learners worldwide ([edx.org/professional-certificate/harvardx-tiny-machine-learning](http://edx.org/professional-certificate/harvardx-tiny-machine-learning), [mlsysbook.ai](http://mlsysbook.ai), and [tinytorch.ai](http://tinytorch.ai)). 

The patterns of failure and the gaps in practitioner training recur across domains and organizations. In 1968, the computing community recognized the software crisis and began to develop a discipline to address it. It is time to do the same for AI.

## References

\[1\] M. Shaw. "Prospects for an Engineering Discipline of Software." Carnegie Mellon University, Software Engineering Institute, Technical Report CMU/SEI-90-TR-20, 1990\.

\[2\] D. Sculley, G. Holt, D. Golovin, E. Davydov, T. Phillips, D. Ebner, V. Chaudhary, M. Young, J.-F. Crespo, and D. Dennison. "Hidden Technical Debt in Machine Learning Systems." Advances in Neural Information Processing Systems 28, 2015\.

\[3\] P. Naur and B. Randell (Eds.). Software Engineering: Report on a Conference Sponsored by the NATO Science Committee. NATO, 1969\.

\[4\] VentureBeat, "Why do 87% of data science projects never make it into production?" 2019; Gartner predicted through 2022 that 85% of AI projects would deliver erroneous outcomes.

\[5\] P. J. Denning, D. E. Comer, D. Gries, M. C. Mulder, A. Tucker, A. J. Turner, and P. R. Young. "Computing as a Discipline." Communications of the ACM 32(1), January 1989, pp. 9-23.

\[6\] N. Sambasivan, S. Kapania, H. Highfill, D. Akrong, P. Paritosh, and L. M. Aroyo. "'Everyone wants to do the model work, not the data work': Data Cascades in High-Stakes AI." Proc. CHI 2021\.

\[7\] S. Amershi, A. Begel, C. Bird, R. DeLine, H. Gall, E. Kamar, N. Nagappan, B. Nushi, and T. Zimmermann. "Software Engineering for Machine Learning: A Case Study." Proc. ICSE-SEIP 2019\.

\[8\] Software Engineering Institute. "AI Engineering for Defense and National Security: A Report from the October 2019 Community of Interest Workshop." Carnegie Mellon University, 2020\.

