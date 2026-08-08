/**
 * Content for the /eth sabbatical page.
 *
 * Edit this file to add, remove, or reorder project ideas; the page renders
 * whatever is here. Set `ethEmail` once the ETH address is active and the
 * contact section will switch over to it automatically.
 */

export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  /** Why the problem is worth a semester or a year of someone's life. */
  whyItMatters: string;
  /** Concrete deliverables, so a student can picture the work. */
  whatYouBuild: string[];
  /** Transferable skills the student walks away with. */
  whatYouLearn: string[];
  /** Why the scope and novelty fit a thesis rather than a course project. */
  thesisFit: string;
  prerequisites: string;
  links?: { label: string; href: string }[];
}

export const sabbatical = {
  host: 'ETH Zurich',
  period: '2026\u20132027',
  department: 'D-ITET',
  departmentFull: 'Department of Information Technology and Electrical Engineering',
  departmentUrl: 'https://ee.ethz.ch',
  /** Set to null to fall back to the Harvard address. */
  ethEmail: { user: 'vjanapa', domain: 'ethz.ch' } as { user: string; domain: string } | null,
  harvardEmail: { user: 'vj', domain: 'eecs.harvard.edu' },
  /** Gives students a filterable subject line and gives me a mail rule. */
  subjectTag: '[ETH Thesis]',
};

export const projectIdeas: ProjectIdea[] = [
  {
    id: 'mlperf-edu',
    title: 'MLPerf EDU: A Benchmark Suite Built for the Classroom',
    tagline:
      'Industry-grade ML systems benchmarking is brutally expensive. Build the first suite designed so a student can run, break, and reason about the whole thing in an afternoon.',
    tags: ['Benchmarking', 'ML Systems', 'Measurement', 'Open Source'],
    whyItMatters:
      'MLPerf reshaped how the industry measures machine learning, but it is effectively out of reach in a classroom: proprietary hardware, enormous datasets, and runs measured in GPU-days. That leaves students learning benchmarking from slides instead of from doing it. The hard part is not shrinking the workloads, it is preserving the methodology under compression: task selection, reference implementations, rules that resist gaming, statistically honest metrics, and a submission-and-review process. A benchmark that costs almost nothing to run but still ranks systems correctly would change how ML systems is taught.',
    whatYouBuild: [
      'A small set of representative tasks with clean reference implementations',
      'A rules and specification document: what may be optimized, what is fixed, what must be reported',
      'A measurement harness covering latency, throughput, accuracy, and energy on commodity hardware',
      'A leaderboard with an automated submission validator',
      'A validation study asking whether the compressed suite preserves the system rankings a full-scale benchmark would produce',
    ],
    whatYouLearn: [
      'Benchmark design as a discipline: representativeness, reproducibility, and resistance to gaming',
      'Rigorous performance measurement and the statistics of noisy systems data',
      'How standards bodies actually converge on a specification',
      'Software engineering for artifacts other people depend on',
    ],
    thesisFit:
      'The scope is unusually clean for a thesis: a well-defined artifact plus one sharp empirical question you can answer with evidence. It has a natural publication home in benchmarking and datasets tracks, and unlike most thesis code, it has a standing audience the moment it works, since courses everywhere need this and nothing like it exists.',
    prerequisites:
      'Solid Python, comfort on the command line and with profiling tools, an ML systems or computer architecture course. Rigor with measurement matters more than ML theory.',
    links: [
      { label: 'MLPerf / MLCommons', href: 'https://mlcommons.org' },
      { label: 'Machine Learning Systems textbook', href: 'https://mlsysbook.ai' },
    ],
  },
  {
    id: 'architecture-2-0',
    title: 'Architecture 2.0: Machine Learning for Chip and System Design',
    tagline:
      'An open research area, not a single fixed project. Threads include datasets, learning algorithms, and agent harnesses — take a starter idea below or propose your own cut inside this space.',
    tags: ['Architecture 2.0', 'Datasets', 'ML Algorithms', 'Agent Harnesses'],
    whyItMatters:
      'Design space exploration, RTL assistance, and performance and power prediction are all in principle learnable, and the bottleneck is not model capacity. It is that the field has almost no datasets or evaluations with the rigor that ImageNet or GLUE brought to vision and language, almost no algorithms trained for architectural structure rather than generic language, and almost no harnesses for measuring whether agentic workflows actually help a designer. QuArch was a first step toward measuring whether a model understands architecture, and it exposed how much is missing. This is my main research focus right now, and it is one of the rare areas where a careful, well-scoped contribution moves the whole field rather than a decimal point on a leaderboard. The bullets below are example directions inside the area — each is large enough for a Master\'s thesis. Bring your own angle if it still lives in this space; we lock the concrete scope together in the first few weeks.',
    whatYouBuild: [
      'Datasets: curated design knowledge, design-space trajectories, or multi-step reasoning tasks that test understanding rather than recall — extending QuArch or a sibling collection',
      'Machine learning algorithms: models for performance and power prediction, design-space search, RTL or microarchitecture assistance — trained and evaluated for architecture, not as a generic LLM demo',
      'Agent harnesses: evaluation infrastructures and agentic workflows for real design tasks (cache and memory configuration, accelerator sizing, RTL bug localization), with rules that resist gaming and honest comparisons',
      'Your proposal in this space: a strong idea at the intersection of threads, or a new cut of the same problem we have not listed, is welcome',
    ],
    whatYouLearn: [
      'Computer architecture and simulation tooling used in earnest, not as coursework',
      'Dataset curation and the validation work that separates a dataset from a pile of data',
      'Training and evaluating ML systems against domain structure, not only next-token accuracy',
      'Agent design and harness design: how to tell a capable workflow from a leaky benchmark',
    ],
    thesisFit:
      'This is an area to work in, not a brief to execute. Each thread is open and under-served, so a Master\'s-scoped cut still lands. The community is small enough that good artifacts get used, and datasets, learned predictors, and evaluation harnesses tend to outlive any single model people train on top of them. Tell me which part of the space you care about; we narrow until the deliverable is one claim you can defend.',
    prerequisites:
      'A computer architecture course, Python, and either simulation experience or hands-on work with modern ML frameworks. Curiosity about hardware is non-negotiable; deep prior expertise is not.',
    links: [
      { label: 'Architecture 2.0', href: 'https://arch2.mlsysbook.ai' },
      { label: 'QuArch dataset', href: 'https://quarch.ai' },
    ],
  },
  {
    id: 'tinytorch',
    title: 'TinyTorch: An Educational Deep Learning Framework, Taken to the GPU',
    tagline:
      'You do not really understand PyTorch until you have built one. TinyTorch is that framework, and it needs to meet real accelerators.',
    tags: ['Systems', 'GPU', 'Compilers', 'Education'],
    whyItMatters:
      'Most students treat frameworks as black boxes, which makes the performance behavior of their own models inexplicable to them. TinyTorch is a from-scratch framework built in pedagogical order: tensors, autograd, operators, training loop. Today it runs on CPU, which means the concepts that matter most in practice, such as memory hierarchy, kernel fusion, occupancy, and mixed precision, never appear. Taking it to GPUs turns a teaching tool into a place where students can see and measure the difference between a naive kernel and a good one.',
    whatYouBuild: [
      'A GPU backend, whether CUDA, Triton, or Metal, with a coherent device and memory abstraction',
      'Graph capture and operator fusion, with the performance gain measured rather than asserted',
      'A kernel-level profiling story that makes the cost model visible to a learner',
      'A progression of optimization labs with automated grading',
      'Benchmarks against PyTorch that quantify what the simplification costs',
    ],
    whatYouLearn: [
      'GPU programming and performance engineering, end to end',
      'Autograd and framework internals at a level very few people actually reach',
      'Compiler-adjacent thinking: fusion, scheduling, and memory movement',
      'How to turn a systems concept into something teachable, which is harder than implementing it',
    ],
    thesisFit:
      'The outcomes are measurable in two independent currencies: speedups you can chart, and learning outcomes you can study. It also produces an unusually strong public artifact, since the framework is used by learners well beyond the thesis, and that tends to matter more in industry interviews than a paper does.',
    prerequisites:
      'Strong systems programming in C++ or CUDA, comfort with Python internals, and a real interest in performance. Prior GPU experience helps but the framework is a good place to acquire it.',
    links: [{ label: 'TinyTorch', href: 'https://tinytorch.ai' }],
  },
  {
    id: 'tiny-agents',
    title: 'Tiny Agents: On-Device Agency Under Hard Constraints',
    tagline:
      'TinyML put inference on microcontrollers. The next step is agents that sense, decide, and act on the device — without calling the cloud for every thought.',
    tags: ['TinyML', 'Agents', 'Edge AI', 'Embodied'],
    whyItMatters:
      'Most agent stacks assume a fat model, a reliable network, and power that does not run out. That is the opposite of the edge. TinyML solved a narrower problem first: run a classifier on a milliwatt budget. The open problem is the loop around that model — short planning, local memory, a tiny tool surface for sensors and actuators, recovery when the world misbehaves — still inside the same energy and latency envelope. Without that stack, “edge AI” stays a buzzword for one-shot inference, and “agents” stay a cloud product. The hard science is measurement: when is a smaller on-device agent better than a larger remote one, and by which metrics that a student or a reviewer can actually check.',
    whatYouBuild: [
      'A minimal on-device agent runtime: sense → short plan → act → log, with hard memory and energy bounds',
      'A tiny tool and memory API (sensors, actuators, local scratchpad) designed for MCUs and edge SoCs, not for a laptop demo',
      'Reference agents on 1–2 physical or hardware-in-the-loop tasks where missing a deadline has a real cost',
      'A measurement harness for agency under constraint: task completion vs energy, latency, recovery after fault — not just accuracy',
      'An honest comparison study: on-device tiny agent vs larger cloud-backed agent on the same tasks',
    ],
    whatYouLearn: [
      'Agent design when the model is small and the world is physical',
      'On-device systems engineering: scheduling, memory, and power as first-class constraints',
      'How to define success for an agent when FLOPs and joules both count',
      'The debugging culture of systems that touch sensors and actuators',
    ],
    thesisFit:
      'Sits cleanly between TinyML (model on device) and full Physical AI platforms (the body). The deliverable is a runtime plus a measurement study with a sharp falsifiable claim, which is easier to defend than “we built a robot demo.” It has a natural home in edge ML systems and embodied-AI venues, and it continues a public story students already associate with this group.',
    prerequisites:
      'Embedded C/C++ or strong systems Python, a course in ML or autonomy, and comfort measuring power or latency. Prior robotics is useful; prior TinyML or MCU work is better.',
    links: [
      { label: 'Machine Learning Systems textbook', href: 'https://mlsysbook.ai' },
      { label: 'TinyML (Harvard)', href: 'https://tinyml.seas.harvard.edu' },
    ],
  },
  {
    id: 'physical-ai',
    title: 'Physical AI Engineering: From Sensor to Closed Loop',
    tagline:
      'Build the hardware and software modules that take a student from a raw sensor to a closed perception-and-action loop in a week.',
    tags: ['Embedded', 'Robotics', 'On-Device ML', 'Hardware'],
    whyItMatters:
      'When AI moves into the physical world, latency, energy, and safety stop being metrics on a chart and become hard constraints with consequences. That shift is the core of my research, and it is exactly what students have no good way to experience. There is no shared, affordable platform for building and evaluating a full sensing-to-actuation stack, so most people learn either the ML or the hardware, never the loop that connects them. Building that platform is both a systems contribution and an educational one. (If you want the agent runtime under milliwatt budgets rather than the platform itself, see Tiny Agents.)',
    whatYouBuild: [
      'Modular sensing, compute, and actuation blocks that compose without custom board work',
      'A reference on-device inference stack with real-time behavior you can actually characterize',
      'A measurement study of the energy, latency, and accuracy tradeoffs across the stack',
      'A small benchmark for closed-loop perception to action, where end-to-end latency is the metric that matters',
      'Curriculum-ready labs built on the platform',
    ],
    whatYouLearn: [
      'Embedded and real-time systems under genuine resource constraints',
      'On-device model optimization: quantization, pruning, and what each actually costs',
      'Power and latency measurement done properly',
      'Hardware-software co-design, plus the debugging instincts that only physical systems teach',
    ],
    thesisFit:
      'You finish with a physical thing that works and a measurement study that explains why, which is a rare and persuasive combination. It suits a student who wants their hands on hardware without giving up rigor, and the artifact demonstrates competence in a way a simulation result cannot.',
    prerequisites:
      'Embedded C or C++, willingness to use an oscilloscope and a soldering iron, and basic ML. Robotics or controls experience is a plus.',
    links: [{ label: 'Machine Learning Systems textbook', href: 'https://mlsysbook.ai' }],
  },
  {
    id: 'ai-engineering-education',
    title: 'AI Engineering as a Discipline: Curriculum and Tooling',
    tagline:
      'If AI engineering is becoming its own discipline, it needs a pedagogy and a toolchain. Neither exists yet.',
    tags: ['AI Engineering', 'Evaluation', 'Agents', 'Education'],
    whyItMatters:
      'I have argued that AI engineering deserves recognition as a distinct discipline, the way software engineering was recognized after 1968. Disciplines need more than a name: they need a way to teach the practice and a way to assess whether someone can do it. Building systems around models, covering data, evaluation, deployment, and monitoring, is largely taught by apprenticeship today, which does not scale. There is also a sharper technical question underneath: can a model usefully evaluate systems work, where the evidence is code plus measurements rather than prose?',
    whatYouBuild: [
      'An evaluation suite that measures AI engineering competence on realistic tasks, not trivia',
      'An agentic lab assistant grounded in a real systems corpus that can read code and measurements together',
      'A study of where LLM tutors and graders fail on systems reasoning, and whether those failures are fixable',
      'Curriculum modules validated with actual students',
    ],
    whatYouLearn: [
      'Evaluation design, which is fast becoming the scarcest skill in applied AI',
      'Retrieval and agent architectures built for correctness rather than demos',
      'Running and interpreting studies with human participants',
      'Curriculum design as an engineering problem with measurable outcomes',
    ],
    thesisFit:
      'Education and AI evaluation is an underserved intersection with real venues, and the leverage is unusual: a good result here changes how many people learn to build these systems. It is a strong fit for a student who wants their work read by practitioners rather than only cited.',
    prerequisites:
      'Python, hands-on experience with modern LLM tooling, and genuine interest in measurement and study design. Teaching or tutoring experience is a real advantage.',
    links: [
      { label: 'AI Engineering: Time to Recognize a New Discipline', href: '/blog/ai-engineering' },
      { label: 'Machine Learning Systems textbook', href: 'https://mlsysbook.ai' },
    ],
  },
];
