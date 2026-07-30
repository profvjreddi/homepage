import { Link } from 'react-router-dom';
import Updates from '../components/Updates';
import { useEffect } from 'react';
import { sabbatical } from '../data/ethSabbatical';
import RotatingText from '../components/RotatingText';

// The hero headline cycles these rather than naming one, because the work is a
// set of connected themes rather than a single agenda. Keep in sync with
// focusAreas below so the page speaks one vocabulary.
const researchThemes = [
  'Physical AI',
  'Edge AI',
  'ML Systems',
  'Architecture 2.0',
  'AI Engineering',
];

const focusAreas = [
  {
    title: 'Physical AI',
    blurb:
      'AI that senses and acts in the world, where latency, energy, and safety stop being metrics on a chart and become hard constraints with consequences.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    ),
  },
  {
    title: 'Edge AI',
    blurb:
      'Machine learning on devices measured in milliwatts. Efficient inference, on-device learning, and the tooling that makes ultra-low-power AI practical at scale.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    title: 'ML Systems',
    blurb:
      'The full stack that turns models into deployed systems, and the benchmarking infrastructure that tells us honestly whether they work.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    title: 'Architecture 2.0',
    blurb:
      'Using machine learning to design the machines that run machine learning. Datasets, models, and evaluations for computer architecture and chip design.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    ),
  },
  {
    title: 'AI Engineering',
    blurb:
      'Treating the construction of AI systems as an engineering discipline, with its own methods, curriculum, and standards of evidence.',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    ),
  },
];

function Home() {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById('ZpXHwV0pzfjL3T-5KePIb')) return;
    const script = document.createElement('script');
    script.innerHTML = `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="ZpXHwV0pzfjL3T-5KePIb";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`;
    script.id = 'chatbase-loader';
    document.body.appendChild(script);
    return () => {
      document.getElementById('chatbase-loader')?.remove();
      document.getElementById('ZpXHwV0pzfjL3T-5KePIb')?.remove();
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A51C30] text-white">
                  Harvard University
                </span>
                <Link
                  to="/eth"
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-eth text-white hover:bg-eth-dark transition-colors"
                >
                  On sabbatical at ETH Zurich
                </Link>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Advancing the Future of{' '}
                <RotatingText items={researchThemes} className="text-[#A51C30]" />
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Different names for one problem: building the systems, architectures, and measurement
                infrastructure that make AI efficient, safe, and accountable as it moves into the
                real world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/research" className="bg-[#A51C30] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#8B1A2B] transition-colors text-center">
                  View Research
                </Link>
                <Link to="/publications" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center">
                  Recent Publications
                </Link>
              </div>
            </div>
            <div className="relative">
              <Updates maxItems={3} homeStyle={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Sabbatical call for ETH students */}
      <div className="bg-eth-50 border-y border-eth/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wide text-eth mb-2">
                ETH Zurich &middot; Sabbatical {sabbatical.period}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Master&apos;s theses and semester projects at ETH Zurich
              </h2>
              <p className="text-gray-700">
                I am spending my sabbatical at ETH Zurich, hosted by {sabbatical.department}, where
                I co-advise ETH students on Master&apos;s theses and semester projects alongside
                local ETH faculty. Open directions span educational benchmarking for ML systems,
                machine learning for chip design, GPU systems for teaching, and physical AI.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/eth"
                className="inline-flex items-center bg-eth text-white px-6 py-3 rounded-lg font-medium hover:bg-eth-dark transition-colors"
              >
                See project ideas
                <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbase Chatbot Section removed, script now injected globally */}

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Focus Areas</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-4">
              Our research answers a single question: <strong className="text-gray-900">What happens when AI has to act, not just answer?</strong>
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These themes are different entry points into it, from the silicon up through the
              discipline itself.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
              >
                <div className="w-12 h-12 bg-[#A51C30] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {area.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h3>
                <p className="text-gray-600">{area.blurb}</p>
              </div>
            ))}
            <Link
              to="/research"
              className="group bg-[#A51C30]/5 border border-[#A51C30]/15 rounded-xl p-6 flex flex-col justify-center hover:bg-[#A51C30]/10 transition-colors"
            >
              <h3 className="text-xl font-semibold text-[#A51C30] mb-3">
                See how these connect
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">
                  &rarr;
                </span>
              </h3>
              <p className="text-gray-600">
                None of these stands alone. The research page traces how the threads run into one
                another, and what came before them.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;