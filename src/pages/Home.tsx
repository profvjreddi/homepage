import { Link } from 'react-router-dom';
import Updates from '../components/Updates';
import { useEffect } from 'react';

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
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A51C30] text-white">
                  Harvard University
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Advancing the Future of 
                <span className="text-[#A51C30]"> Physical AI</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                As AI moves into the physical world, safety and efficiency become requirements, not features. 
                My research builds the systems and measurement infrastructure for AI that operates at the edge.
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

      {/* Chatbase Chatbot Section removed, script now injected globally */}

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Research Focus Areas</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-4">
              Our research answers a single question: <strong className="text-gray-900">What happens when AI has to act, not just answer?</strong>
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Physical AI demands new approaches to safety, efficiency, and evaluation. We focus on three core areas:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 bg-[#A51C30] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Computer Architecture</h3>
              <p className="text-gray-600">
                Building computing foundations that enable intelligent systems to operate efficiently, from energy-aware processors to hardware-software co-design for deployment.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 bg-[#A51C30] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Machine Learning Systems</h3>
              <p className="text-gray-600">
                Building scalable, efficient ML systems and the benchmarking infrastructure to evaluate them. Enabling rigorous measurement and deployment across computing scales.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="w-12 h-12 bg-[#A51C30] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Autonomous Agents</h3>
              <p className="text-gray-600">
                Developing algorithms that perceive, reason, and act safely in complex environments. Bringing together hardware, algorithms, and systems for Physical AI.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/research" 
              className="inline-flex items-center text-[#A51C30] hover:text-[#8B1A2B] font-medium transition-colors"
            >
              See how these areas connect →

            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;