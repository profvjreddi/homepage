---
title: "What Art History Taught Me About \"AI Slop\""
author: "Vijay Janapa Reddi, Harvard University"
date: "2026-09-13"
excerpt: "I use generative AI heavily, but using these tools effectively is much harder than it looks. Here is an honest reflection on why AI delivers negative value without human critical rigor, what 2,400 years of cognitive panic teach us about education, and why empirical ground truth is the only real ceiling."
tags: ["ai", "research", "reflection", "cognitive-science", "advice", "systems"]
---

I use generative AI a lot. Probably more than most people I know.

I use it when I am sketching system architectures, when I am building experimental harnesses, when I am searching through literature, and when I am writing. Because of that, I spend a lot of time thinking about how I work. And if I am being completely honest, I have often felt a nagging sense of unease.

Every time I go online, someone is venting about "AI slop." The prevailing social media sentiment seems to be that if you touch these tools, you are taking the lazy way out, atrophying your brain, and flooding the world with synthetic noise. 

It is tempting to dismiss all of this as reflexive tech skepticism. But if we are honest with ourselves, the critics have a point. A massive amount of what gets generated today *is* slop: unread summaries, generic code snippets, bland blog posts, and hallucinated references pushed out by people who hit "generate" and immediately hit "publish" without reading a single word.

That tension got under my skin. It made me stop and ask a fundamental question:

> **When we use these tools, how human should we actually be?**

Does being "human" mean holding onto mechanical friction for its own sake, such as typing every line of boilerplate and formatting every bibliography entry by hand? Or does it mean something else entirely?

I write this not as a philosopher of technology or a sociologist, but as a computer systems researcher and educator. I spend my days building AI infrastructure, mentoring PhD students, and wrestling with these tools in practice. I feel compelled to share these reflections because, as an academic, I find myself thinking about what these tools mean not just for systems efficiency, but for how we teach, think, and discover.

What came out of that reflection is a framework that changed how I think about my own craft.

---

## 1. The Macro Backlash: Jevons and the "Verification Gap"

To understand why people push back on AI right now, you have to separate the tool from the economics of attention.

In 1865, English economist [William Stanley Jevons](https://en.wikipedia.org/wiki/William_Stanley_Jevons) analyzed a counterintuitive phenomenon of the Industrial Revolution. Decades earlier, James Watt had introduced a vastly more fuel-efficient steam engine. Many had assumed that because engines burned coal more efficiently, total coal consumption would drop. The exact opposite occurred: because energy became dramatically cheaper, steam power was deployed everywhere, and total coal consumption exploded. This became known as **[Jevons Paradox](https://en.wikipedia.org/wiki/Jevons_paradox)**.<sidenote>William Stanley Jevons published this in <a href="https://en.wikipedia.org/wiki/The_Coal_Question" target="_blank" rel="noopener noreferrer"><em>The Coal Question</em> (1865)</a>. The modern parallel in computing was articulated by Martin Rees and others: whenever the marginal cost of producing an information artifact drops by orders of magnitude, the total volume produced increases exponentially.</sidenote>

Generative AI is a classic Jevons machine. It collapses the marginal cost of producing prose, code, and images to near zero. Naturally, the volume of generated content has exploded exponentially (Figure 1).

![Figure 1: The Jevons Paradox of Generation](/images/blog/how-human-should-we-be-fig1-jevons.png)

*Figure 1: The Jevons Paradox of Generation. When the marginal cost of producing text, code, or images collapses to near zero, generation volume explodes exponentially, while human cognitive attention remains strictly finite. The shaded region highlights the Verification Gap.*

The problem is that while the supply of generated content is virtually infinite, **human cognitive bandwidth and review capacity are strictly finite.** There are only twenty-four hours in a day, and there is only so much attention any human being can pay to an inbox, a code review queue, or a social feed.<sidenote>Nobel laureate <a href="https://en.wikipedia.org/wiki/Herbert_A._Simon" target="_blank" rel="noopener noreferrer">Herbert Simon</a> anticipated this in 1971: <em>"In an information-rich world, the wealth of information means a dearth of something else: a scarcity of whatever it is that information consumes. What information consumes is rather obvious: it consumes the attention of its recipients."</em></sidenote>

The difference between the exploding volume of synthetic output and our fixed capacity to audit and verify it is what we might call the **Verification Gap** (shaded in Figure 1). 

When people complain about synthetic noise, they are not really objecting to the machine itself. They are reacting to an asymmetry in effort. It takes three seconds to prompt a model to generate five pages of plausible prose, but it takes thirty minutes of human attention to read, verify, and catch the subtle errors buried inside it. The friction arises when unvetted generation is pushed onto someone else's scarce attention with zero human skin in the game.<sidenote>The term <a href="https://en.wikipedia.org/wiki/AI_slop" target="_blank" rel="noopener noreferrer">"slop"</a> emerged as the generative AI era's equivalent of "spam." While spam is uninvited distribution, slop is unconsidered production: synthetic material dumped into public attention simply because the marginal cost of generation fell to zero.</sidenote>

---

## 2. We Have Been Here Before

When I was an undergraduate studying computer engineering at Santa Clara University, a Jesuit institution where the engineering curriculum was steeped in classical liberal arts, I had to take an art history class. At the time, like many young engineering students immersed in circuits, code, and systems, I did not appreciate it. It felt distant from the practical work of building technology. But decades later, as generative AI began flooding our feeds with synthetic text, code, and images, that class has turned out to be one of the most enduring courses I ever took. I find myself reflecting on it constantly.

What that curriculum gave me was historical perspective: whenever a technology externalizes an aspect of human cognition or craft, society goes through the exact same psychological cycle. We panic, we predict intellectual decay, we complain about the flood of cheap imitation, and then we eventually adapt by shifting human effort up the stack of abstraction.

It also convinced me of something I now emphasize to my students: in an age where machines can generate plausible technical syntax on demand, a liberal arts education will be increasingly important, not less. When the marginal cost of execution drops to zero, what becomes scarce is historical perspective, philosophical taste, and the judgment to know what is worth creating in the first place.

Consider four moments where the exact same drama played out.

### Socrates and the "Illusion of Wisdom" (~370 BCE)
In [Plato's *Phaedrus*](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0174%3Atext%3DPhaedrus%3Asection%3D274e), Socrates recounts the Egyptian myth of the god Theuth, who invented numbers, geometry, and the alphabet. When Theuth presents writing to King Thamus of Thebes, he boasts that letters will improve human memory and wisdom.

Thamus famously rebukes him:

> This discovery of yours will create forgetfulness in the learners' souls, because they will not use their memories; they will trust to the external written characters and not remember of themselves... You give your disciples not truth, but only the semblance of truth; they will be hearers of many things and will have learned nothing; they will appear to be omniscient and will generally know nothing; they will be tiresome company, having the show of wisdom without the reality.

Socrates was describing the ancient Greek version of synthetic slop: people walking around quoting texts they did not write, sounding omniscient while possessing no deep understanding. Yet writing did not destroy human intellect; it allowed civilization, science, and law to scale across generations.

### The Printing Press and the "Horrible Mass of Books" (1492 to 1680)
When [Johannes Gutenberg](https://en.wikipedia.org/wiki/Johannes_Gutenberg) introduced movable type, scribes and scholars feared the printing press would ruin scholarly culture.

![Der Buchdrucker (The Printer), woodcut by Jost Amman (1568)](/images/blog/early-printing-press-1568.png)
*Der Buchdrucker (The Printer), woodcut by Jost Amman from Hartmann Schopper's Panoplia (1568). Public domain.*

In 1492, the Benedictine Abbot [Johannes Trithemius](https://en.wikipedia.org/wiki/Johannes_Trithemius) wrote a treatise titled [*De laude scriptorum manualium* (*In Praise of Scribes*)](https://en.wikipedia.org/wiki/Johannes_Trithemius#In_Praise_of_Scribes), arguing that copying manuscripts by hand cultivated moral diligence, while printing was cold and ephemeral:<sidenote>In one of history's great ironies, Trithemius was so eager to distribute his defense of handwritten manuscripts that he took the manuscript to Peter von Friedberg in Mainz and had it printed on a Gutenberg-style press in 1494.</sidenote>

> A work written on parchment will last a thousand years; but how long will a book printed on paper last? At best, if it lasts two hundred years, that is a great deal.

By 1680, philosopher [Gottfried Wilhelm Leibniz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz) was lamenting that printing had made publishing far too easy:

> I fear that we shall end up inundated by a horrible mass of books which keeps on growing... and which can only disgust people with science and turn them away from learning.

For the first century after Gutenberg, much of what presses printed was Renaissance noise: astrological pamphlets, polemics, and poorly edited tracts. But society did not ban the press. Instead, we invented modern institutions of verification: peer review, scientific societies, editorial publishing houses, and library catalogs.

### Baudelaire and the "Refuge of Failed Painters" (1859)
When photography emerged in the mid-19th century, portrait painters and critics treated it as an existential threat to art.

![Nadar élevant la Photographie à la hauteur de l'Art by Honoré Daumier (1862)](/images/blog/daumier-nadar-1862.jpg)
*Honoré Daumier, Nadar élevant la Photographie à la hauteur de l'Art (1862). Published in Le Boulevard. National Gallery of Art, Rosenwald Collection.*

At the 1859 Paris Salon, the French poet and art critic [Charles Baudelaire](https://en.wikipedia.org/wiki/Charles_Baudelaire) wrote a blistering essay in [*Salon de 1859*](https://fr.wikisource.org/wiki/Curiosit%C3%A9s_esth%C3%A9tiques/Salon_de_1859#II_LE_PUBLIC_MODERNE_ET_LA_PHOTOGRAPHIE) warning that photography was mechanical cheating:

> As the photographic industry was the refuge of all failed painters, too poorly gifted or too lazy to complete their studies, this universal infatuation bore not only the character of blindness and imbecility, but also the color of a vendetta... If photography is allowed to supplement art in some of its functions, it will soon have supplanted or corrupted it altogether.

Baudelaire believed that pressing a shutter required no soul, no craft, and no imagination. But photography did not kill visual art. It liberated painting from the chore of photographic realism. Once the camera handled literal documentation, painters were free to invent Impressionism, Cubism, and modern abstraction.

### The Handheld Calculator Panic (1970s)
When Hewlett-Packard launched the [HP-35](https://en.wikipedia.org/wiki/HP-35) in 1972, the first pocket calculator capable of calculating logarithmic and trigonometric functions, educators panicked.

![Hewlett-Packard HP-35 scientific pocket calculator (1972)](/images/blog/hp35-calculator-1972.jpg)
*Hewlett-Packard HP-35 scientific pocket calculator (1972), the first handheld calculator to compute transcendental functions, featuring 35 keys and an LED display. Photograph courtesy of the Digital Public Library of America.*

School boards banned pocket calculators from classrooms. In July 1974, *The Sydney Morning Herald* reported on mounting calls to ban pocket calculators from higher school examinations under the headline: *"Calculators creating problems ... such as the inequality of have-nots."* Teachers warned that calculators would encourage intellectual laziness and take students' minds away from the relevance of the topic.

![The Sydney Morning Herald (July 25, 1974): Calculators creating problems](/images/blog/calculator-newspaper-clipping-clean.png)
*Archival clipping from [The Sydney Morning Herald (July 25, 1974)](https://news.google.com/newspapers?id=d_pjAAAAIBAJ&sjid=ueUDAAAAIBAJ&pg=6580%2C8428804): "Calculators creating problems ... such as the inequality of have-nots."*

By 1975, as school boards and mathematics associations across the country grappled with pocket calculators in the classroom, teachers warned that basic arithmetic skills would wither away and students would become helpless if their batteries died.

The [National Council of Teachers of Mathematics (NCTM)](https://www.nctm.org/) eventually recognized the deeper lesson: testing whether a student could perform eight-digit long division with a pencil was testing mechanical execution, not mathematical thought. Handing the arithmetic to silicon freed students to spend time on functions, algebra, and calculus.

### The Important Distinction
There is an important distinction between past revolutions and our own. Printing presses duplicated texts; calculators automated deterministic arithmetic. Generative AI simulates *semantic synthesis, conceptual formulation, and rhetoric*. It does not just calculate; it articulates. That makes the epistemic challenge deeper. It also makes the underlying human tendency toward panic, and the temptation toward lazy outsourcing, all the more urgent to examine with clear eyes.

---

## 3. The Real Danger: Falling Asleep at the Wheel

If history shows that cognitive panic is cyclical, does that mean we can relax and let AI do whatever it wants?

No. There is a real danger, but it is not what the cynics think.

In 1983, British automation psychologist [Lisanne Bainbridge](https://en.wikipedia.org/wiki/Lisanne_Bainbridge) published a classic paper called [*Ironies of Automation*](https://doi.org/10.1016/0005-1098%2883%2990046-8). She pointed out that when you automate a system, you leave the human with two jobs: monitoring the automation and intervening when it fails. But by removing the human from routine practice, their skills atrophy, meaning that when an edge-case failure occurs, the human is least equipped to take over.

This dynamic was documented by my colleagues at Harvard Business School, Karim Lakhani, Fabrizio Dell'Acqua, and their coauthors in a 2023 study conducted with the Boston Consulting Group.<sidenote>Dell'Acqua et al. coined the phrase <a href="https://doi.org/10.2139/ssrn.4573321" target="_blank" rel="noopener noreferrer">"the jagged technological frontier"</a> to describe how model capabilities are uneven. An LLM can produce an elegant corporate strategy synthesis in seconds, yet fail at basic boundary arithmetic. Workers who assume uniform competence fall off the edge into the net-negative zone.</sidenote> They evaluated 758 consultants working with GPT-4 across a range of knowledge-work tasks and observed two distinct behaviors (Figure 2):

![Figure 2: The Jagged Frontier & Centaur Leverage](/images/blog/how-human-should-we-be-fig2-centaur.png)

*Figure 2: The Jagged Technological Frontier & Centaur Leverage. Passive autopilot creates an artificial ceiling and drops into a net-negative zone on deceptive tasks, where debugging errors costs more time than working from scratch. Active centaur steering delivers massive positive leverage once human critical rigor crosses the crossover point.*

When workers treated the AI as a passive autopilot, accepting first drafts without critical review, their performance hit an artificial ceiling. On deceptive tasks outside the model's capabilities, their quality dropped significantly below unassisted human work. Debugging subtly confident hallucinations actually took *more* time than writing from scratch. That is the net-negative zone.

In contrast, workers who adopted a centaur model divided labor deliberately. They used the model for hypothesis generation and rapid drafting, while reserving problem framing, boundary auditing, and domain validation for themselves. By actively steering the machine rather than riding along, they experienced a dramatic boost in performance.

The takeaway is clear: AI only delivers net positive value once human critical rigor crosses a threshold. Low human effort does not give you average results; it gives you negative value.

### What the Centaur Model Looks Like in My Own Work
In my daily work teaching and researching computer systems across courses like ES50, TinyML, and Computer Architecture, active steering is deeply concrete.

One way I use the model is as an associative search engine for teaching intuitions. When explaining a difficult computer systems concept like cache coherence protocols, branch prediction, or electrical impedance matching, I will prompt the model for comparisons from unrelated fields, such as evolutionary biology, postal logistics, or auction markets. It will offer ten wild comparisons. Eight are superficial, and one is physically flawed. But the tenth sparks an intuition I had not considered. My job as the instructor is to stress-test that analogy against the underlying physics and system principles before bringing it to the blackboard.

I use a similar approach when exploring first principles in machine learning systems. I treat the model as a sparring partner to ask how adjacent fields handle analogous constraints, such as how resource economists model multi-tenant capacity limits under peak pricing. The machine brings cross-disciplinary breadth from literature I might not regularly track; I provide the domain filter to see whether the equations map cleanly to hardware queues and memory bandwidth limits on an accelerator.

In lecture preparation for courses like TinyML, where we compress deep learning models onto microcontrollers with only a few hundred kilobytes of memory, the model acts as a proxy student. I use it to review slide progressions and class notes, asking where an undergraduate encountering int8 quantization for the first time might find the conceptual leap jarring.

And in the lab, when building baseline test harnesses, regression scripts, and simulation drivers, generating the scaffolding is mechanical. Deciding what the system is trying to prove, setting the experimental controls, and validating the core logic is where the actual research happens.

---

## 4. The Novice Paradox: Why Students Still Need Friction

This brings us to what I call the **Novice Paradox**.

As a faculty member with over twenty years of accumulated domain models, I can safely treat mechanical friction as overhead. When an AI generates a code snippet or a literature summary, I can spot a subtle flaw or an omission in seconds because I already have the mental scaffolding in my head.

**But how does a student acquire that taste in the first place?**

In [*Painting Pots*](/blog/painting-pots), I shared an analogy about PhD education: you do not go to art school just to paint one specific blue ceramic pot; you go to learn color theory, composition, brushwork, and how to see. For an undergraduate or a junior graduate student, **mechanical friction is the pedagogy.**

Wrestling with clumsy first drafts, deriving equations line by line on a chalkboard, and spending hours debugging a memory leak are not wasted friction. That struggle is the cognitive resistance that builds mental representations. It is how taste is formed.<sidenote>Cognitive psychologist <a href="https://bjorklab.psych.ucla.edu/research/" target="_blank" rel="noopener noreferrer">Robert Bjork</a> called this <a href="https://en.wikipedia.org/wiki/Desirable_difficulty" target="_blank" rel="noopener noreferrer">"desirable difficulty."</a> Learning requires friction. When acquisition feels effortless and fluent, long-term conceptual retention is minimal. Bypassing the struggle creates an illusion of competence.</sidenote>

If a novice uses generative AI to bypass that friction, they are engaging in cognitive malnutrition. They get the superficial artifact without the underlying neural adaptation. They appear to be omniscient while knowing nothing, which is the very curse King Thamus warned Socrates about.

For students and apprentices, the approach must be fundamentally different: **Use AI as a Socratic tutor that interrogates your understanding, never as an oracle that robs you of the struggle.**

In fact, I believe universities and schools should introduce a dedicated course on **AI Literacy and Ethics** in the first year, and perhaps this training should start even earlier in secondary schools. Students should not simply be handed tools with the instruction to prompt them for answers. They need structured guidance on how these models actually work, the cognitive science of why effortless answers weaken long-term retention, how to use models as adversarial sparring partners to test their own reasoning, and the ethical responsibilities of authorship and verification.

---

## 5. Is Human Validation Truly the Ceiling?

Here is where the conversation turns to research discovery.

We often assume that human validation is the ultimate gold standard: that the goal of an AI system is to produce outputs that a human expert agrees with. 

I feel that assumption is dangerous.

When AI is trained purely on human feedback (RLHF) and human imitation, it plateaus at human consensus. In fact, research from Anthropic and Stanford has shown that RLHF often induces [**sycophancy**](https://arxiv.org/abs/2308.03958), where models learn to agree with the user's misconceptions rather than telling them the truth because human evaluators reward answers that match their preconceptions.<sidenote>See <a href="https://arxiv.org/abs/2212.09251" target="_blank" rel="noopener noreferrer">Perez et al. (Anthropic, 2022)</a>, <em>"Discovering Language Model Behaviors with Model-Written Evaluations."</em> They found that reinforcement learning from human feedback consistently trains models to flatter user biases, because human raters systematically reward agreeable answers over corrective ones.</sidenote>

If human consensus is the ceiling, how do you ever achieve a breakthrough?

In open-ended writing and everyday software tasks, automated tools act as boundary filters. A compiler does not invent brilliant architectures; it merely prevents syntax errors and type violations. A test suite catches regressions against assertions a human wrote. In academic writing, verification means forensic checking: tracing claims back to primary data, inspecting the raw tables of cited papers, and running adversarial devil's advocate prompts (*"Argue the strongest counter-case against this paper's hypothesis"*).

But in closed, formal domains, empirical feedback allows models to move far beyond human consensus (Figure 3).

![Figure 3: Empirical Ground Truth vs. Human Consensus](/images/blog/how-human-should-we-be-fig3-oracle.png)

*Figure 3: Empirical Ground Truth vs. Human Consensus. While human imitation plateaus at existing consensus, training against pure empirical ground truth (as in AlphaGo Zero) allows systems to discover strategies far beyond human convention.*

Consider DeepMind's journey with [*AlphaGo*](https://doi.org/10.1038/nature16961). The early version was trained on 30 million moves from human Grandmasters. It played brilliantly, but it was initially tethered to 3,000 years of human Go dogmas (~3,500 Elo).

Yet during Game 2 of the 2016 match against Lee Sedol, the system revealed the power of evaluating against ground truth rather than consensus. AlphaGo played [**Move 37**](https://www.wired.com/2016/03/two-moves-alphago-lee-sedol-redefined-future/), placing a stone on the fifth line.<sidenote>AlphaGo's policy network calculated the probability of a human Grandmaster playing Move 37 at approximately <a href="https://www.wired.com/2016/03/two-moves-alphago-lee-sedol-redefined-future/" target="_blank" rel="noopener noreferrer">1 in 10,000</a>. It was not merely unconventional; by 3,000 years of human consensus, it was statistically unfathomable.</sidenote> Professional commentators called it an amateur blunder. For centuries, human Go wisdom had taught that playing on the fifth line so early was a mistake. But AlphaGo's reinforcement learning value network had evaluated the move against the immutable rules of the board rather than human precedent. Move 37 transformed modern Go strategy: human consensus judged it an error, but objective reality proved it groundbreaking.

That breakthrough revealed that imitating human play was an artificial constraint. In 2017, DeepMind took this realization to its ultimate conclusion with [*AlphaGo Zero* (Silver et al., *Nature* 2017)](https://doi.org/10.1038/nature24270). They stripped out all human games entirely. The system started from a blank slate (*tabula rasa*), learning purely by playing against itself against empirical ground truth. Within 40 days, AlphaGo Zero surpassed 5,000 Elo and defeated the human-trained AlphaGo Lee 100 to 0.

We see the exact same pattern with [*AlphaFold*](https://doi.org/10.1038/s41586-021-03819-2) (Jumper et al., *Nature* 2021). Structural biologists spent fifty years trying to solve the protein folding problem using human heuristics. AlphaFold broke through because it was anchored not in human opinion, but in the empirical laws of physical chemistry and crystallography data.

The lesson is profound: in domains governed by subjective taste and human convention, human consensus is the ceiling. But in domains governed by ground truth, such as physics, crystallography, formal mathematics, and game rules, empirical feedback allows systems to move far beyond the limits of human consensus.

---

## 6. What Being Human Actually Means

So, how human should we be? We started this essay with that question.

Being human does not mean manually typing out every line of code, calculating square roots by hand, or hand-copying manuscripts on parchment. That is confusing mechanical friction with intellectual contribution.

Being human means taking responsibility for the parts of the stack that cannot be outsourced.

It begins with problem framing and intent. The machine has infinite answers, but zero questions. It has no taste, no sense of what problems are worth solving, and no understanding of why a project matters. Framing the question is where intellectual leverage begins.

It requires enforcing core principles. In systems engineering, you do not micromanage every instruction; you ensure that core invariants and constraints hold across the system. When working with AI, your job is to enforce those principles: verifying whether the test suite passes, whether the underlying logic holds, and whether the historical citation exists in an authentic primary text.

It demands auditing against ground truth rather than vibes. Never audit an AI's output by skimming it and nodding along. Audit it against verifiable reality by running the compiler, executing the benchmark, verifying the primary source, and testing the edge cases.

Most importantly, it demands editorial skin in the game. The guideline I follow is simple: never publish, commit, or present anything you are not prepared to defend in a room of your peers as if you wrote every single word yourself.<sidenote>As <a href="https://en.wikipedia.org/wiki/Nassim_Nicholas_Taleb" target="_blank" rel="noopener noreferrer">Nassim Nicholas Taleb</a> argued in <a href="https://en.wikipedia.org/wiki/Skin_in_the_Game_(book)" target="_blank" rel="noopener noreferrer"><em>Skin in the Game</em> (2018)</a>, ethical systems require exposure to real downside. The problem with AI output is not that it is synthetic, but that the generator faces no consequences for error. Accountability cannot be delegated to an algorithm.</sidenote>

If you cannot explain why a line of code is there, or why an argument holds, you did not co-create it. You just forwarded it.

---

## Epistemic Colophon: How This Essay Was Written

In the spirit of intellectual transparency, here is how this essay was created in partnership with an AI assistant in the CLI:

As the human, I provided the questions, the memories of taking art history as an engineering student, the teaching experiences from my classrooms, the skepticism toward early drafts, and the insistence on primary sources. I rejected initial drafts that felt generic, pushed for historical grounding, demanded cleaner visual plots, and wrote the personal reflections.

The AI accelerated the exploration and drafting process, assembling relevant context from literature across economics, psychology, and reinforcement learning ([Jevons 1865](https://en.wikipedia.org/wiki/Jevons_paradox), [Bainbridge 1983](https://doi.org/10.1016/0005-1098%2883%2990046-8), [Dell'Acqua et al., Harvard/BCG 2023](https://doi.org/10.2139/ssrn.4573321), [Silver et al., Nature 2017](https://doi.org/10.1038/nature24270)), writing the Python scripts to plot the curves, retrieving exact archival references, and scaffolding the initial drafts.

This piece was not created by typing a single prompt and hitting publish. It was an iterative dialogue: questioning assumptions, generating ideas, pruning away what did not ring true, and verifying facts against reality.

The machine eliminated the friction of generation. As the human, I provided the intent, the judgment, and the accountability.

That, I believe, is how human we should be.
