import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ObfuscatedEmail from '../components/ObfuscatedEmail';
import { projectIdeas, sabbatical } from '../data/ethSabbatical';

function EthSabbatical() {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allExpanded = expanded.length === projectIdeas.length;

  const toggleAll = () => {
    setExpanded(allExpanded ? [] : projectIdeas.map((p) => p.id));
  };

  const contactEmail = sabbatical.ethEmail ?? sabbatical.harvardEmail;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-eth-50 to-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-crimson text-white">
              Harvard University
            </span>
            <span className="hidden sm:inline text-gray-400" aria-hidden="true">
              &rarr;
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-eth text-white">
              {sabbatical.host} &middot; Sabbatical {sabbatical.period}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Master&apos;s Theses &amp; Semester Projects at {sabbatical.host}
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-crimson to-eth"></div>

          <p className="text-lg text-gray-700 mt-6">
            I am spending my sabbatical at {sabbatical.host}, hosted by the{' '}
            <a
              href={sabbatical.departmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-eth hover:text-eth-dark font-medium"
            >
              {sabbatical.departmentFull} ({sabbatical.department})
            </a>
            , where I am co-advising ETH students on Master&apos;s theses and semester projects. If
            you are looking for a thesis topic in machine learning systems, computer architecture,
            or physical AI, this page is for you.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            My work sits at the intersection of AI and system design: using machine learning to
            design better computing systems, and building the measurement infrastructure that tells
            us whether those systems actually work. Below are the specific directions I would most
            like to push on while I am here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href="#projects"
              className="bg-eth text-white px-6 py-3 rounded-lg font-medium hover:bg-eth-dark transition-colors text-center"
            >
              Browse research areas
            </a>
            <a
              href="#reach-out"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
            >
              How to reach me
            </a>
          </div>
        </div>
      </div>

      {/* How this works */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How This Works</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            A few practical things worth knowing before you write to me.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 border-l-4 border-l-eth">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Co-supervision</h3>
              <p className="text-gray-600">
                Because I am a visitor, your thesis is formally supervised by an ETH faculty member,
                typically within {sabbatical.department}, and I co-advise the day-to-day research.
                In practice this is a feature: you get two advisors with different vantage points.
                If you do not already have a local supervisor in mind, say so and we will work out
                the pairing together.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 border-l-4 border-l-eth">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Formats and timing</h3>
              <p className="text-gray-600">
                Master&apos;s theses, semester projects, and research assistantships all work.
                Semester projects are a good way to test the fit before committing to a thesis.
                Because my time here is bounded, start early: reach out at least a couple of months
                before you want to begin.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 border-l-4 border-l-eth">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What the work becomes</h3>
              <p className="text-gray-600">
                I care about artifacts that outlive the thesis. Every project below is designed to
                produce something real: an open-source system, a dataset, or a benchmark that other
                people use, and where the result warrants it, a paper. Several of these directions
                connect to ongoing efforts such as MLPerf, QuArch, and the Machine Learning Systems
                textbook.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 border-l-4 border-l-eth">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Who this suits</h3>
              <p className="text-gray-600">
                Students who like building and who like measuring. Most of this work rewards
                someone willing to write real code, instrument it honestly, and be suspicious of
                their own numbers. Specific prerequisites are listed with each project, but taste
                for rigor matters more than any single course.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project ideas */}
      <div id="projects" className="bg-gray-50 scroll-mt-8">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Research Areas &amp; Project Ideas</h2>
            <button
              onClick={toggleAll}
              className="text-sm font-medium text-eth hover:text-eth-dark transition-colors"
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Each card is a research area I am actively working in, not a fixed assignment. The
            bullets inside are starter ideas — examples of the kinds of work that fit — not a
            required checklist. You can take one of those ideas, reshape it, combine threads, or
            propose something of your own in the same space. A thoughtful proposal inside one of
            these areas matters more than matching a bullet point.
          </p>

          <div className="space-y-4">
            {projectIdeas.map((project, index) => {
              const isOpen = expanded.includes(project.id);
              return (
                <div
                  key={project.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggle(project.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-eth/10 text-eth font-bold text-sm flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{project.tagline}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <svg
                        className={`flex-shrink-0 w-5 h-5 text-eth transition-transform mt-1 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6 space-y-6">
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wide text-eth mb-2">
                            Why it matters
                          </h4>
                          <p className="text-gray-700">{project.whyItMatters}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wide text-eth mb-2">
                              Example directions
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">
                              Starter ideas in this area — not a required checklist. Your own angle in the same space is welcome.
                            </p>
                            <ul className="space-y-2">
                              {project.whatYouBuild.map((item) => (
                                <li key={item} className="flex items-start text-gray-700 text-sm">
                                  <span className="w-1.5 h-1.5 bg-eth rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold uppercase tracking-wide text-eth mb-2">
                              What you would learn
                            </h4>
                            <ul className="space-y-2">
                              {project.whatYouLearn.map((item) => (
                                <li key={item} className="flex items-start text-gray-700 text-sm">
                                  <span className="w-1.5 h-1.5 bg-eth rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-eth-50 rounded-lg p-5">
                          <h4 className="text-sm font-bold uppercase tracking-wide text-eth mb-2">
                            Why it makes a strong thesis
                          </h4>
                          <p className="text-gray-700">{project.thesisFit}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-2">
                            Background you would want
                          </h4>
                          <p className="text-gray-600 text-sm">{project.prerequisites}</p>
                        </div>

                        {project.links && project.links.length > 0 && (
                          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 border-t border-gray-100">
                            {project.links.map((link) =>
                              link.href.startsWith('/') ? (
                                <Link
                                  key={link.href}
                                  to={link.href}
                                  className="text-sm font-medium text-eth hover:text-eth-dark transition-colors"
                                >
                                  {link.label} &rarr;
                                </Link>
                              ) : (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-eth hover:text-eth-dark transition-colors"
                                >
                                  {link.label} &rarr;
                                </a>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reach out */}
      <div id="reach-out" className="bg-white scroll-mt-8">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reaching Out</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            I read every message that shows evidence of thought. Making yours easy to evaluate is
            the single best thing you can do.
          </p>

          <div className="bg-eth-50 border border-eth/20 rounded-lg p-8 mb-8">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Use this subject line
            </p>
            <p className="font-mono text-gray-900 mb-6 break-words">
              {sabbatical.subjectTag} Project name &mdash; Your name
            </p>

            <ObfuscatedEmail
              user={contactEmail.user}
              domain={contactEmail.domain}
              label="Email me"
              subject={`${sabbatical.subjectTag} `}
              buttonClassName="inline-flex items-center bg-eth text-white px-6 py-3 rounded-lg font-medium hover:bg-eth-dark transition-colors"
              className="text-eth font-medium text-lg hover:text-eth-dark transition-colors"
            />
            <p className="text-sm text-gray-600 mt-3">
              Clicking opens a draft with the subject tag already in place. The tag is how ETH thesis
              inquiries get sorted out of everything else, so yours gets read as a thesis inquiry
              rather than as general mail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Include in your first email</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&bull; Which area interests you</li>
                <li>&bull; One paragraph on why</li>
                <li>&bull; Your idea (take a starter idea, reshape it, or propose something of your own in that space)</li>
                <li>&bull; Your CV</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tell me your technical background</h3>
              <ul className="space-y-2 text-gray-700">
                <li>&bull; Courses in architecture, ML, or systems</li>
                <li>&bull; Languages and tools you know well</li>
                <li>&bull; Hardware you have worked on</li>
                <li>&bull; Prior research or projects</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Specificity over enthusiasm. Generic mass emails get no reply.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 text-gray-600">
            <p>
              Not an ETH student? PhD applications, collaborations, and everything else are covered
              on the{' '}
              <Link to="/contact" className="text-crimson hover:text-crimson-dark font-medium">
                contact page
              </Link>
              . For background on the research these projects come out of, see{' '}
              <Link to="/research" className="text-crimson hover:text-crimson-dark font-medium">
                research
              </Link>{' '}
              and{' '}
              <Link to="/publications" className="text-crimson hover:text-crimson-dark font-medium">
                publications
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EthSabbatical;
