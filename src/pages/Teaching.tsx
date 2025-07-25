import { FiCpu, FiSettings, FiCode, FiZap, FiActivity } from 'react-icons/fi';
import { MdOutlinePsychology } from 'react-icons/md';
import { FaBrain } from 'react-icons/fa';

  function Teaching() {
  return (
    <div className="min-h-screen">
      {/* Header & Impact Stats */}
      <div className="bg-white w-full">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Teaching</h1>
            <div className="w-24 h-1 bg-[#A51C30]"></div>
            <p className="text-lg text-gray-600 mt-6">
              Democratizing access to education from silicon to software—covering hardware design, 
              systems optimization, and machine learning deployment—through innovative courses, 
              open-source materials, and global outreach initiatives.
            </p>
          </div>

          {/* Impact Stats */}
          <div className="bg-[#A51C30]/5 rounded-lg p-8 mb-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-[#A51C30] mb-2">100,000+</div>
                <div className="text-gray-700">Students Trained</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#A51C30] mb-2">Global</div>
                <div className="text-gray-700">Reach & Access</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#A51C30] mb-2">Open Source</div>
                <div className="text-gray-700">Educational Materials</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped: Core Educational Resources + TinyML Outreach & Community */}
      <div className="bg-gray-50 w-full">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Core Educational Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Educational Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Machine Learning Systems Book */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Machine Learning Systems</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Free</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Comprehensive open-source textbook covering the fundamentals of ML systems design, 
                  implementation, and deployment. Widely adopted by institutions worldwide.
                </p>
                <div className="space-y-3">
                  <a 
                    href="https://mlsysbook.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#A51C30] hover:text-[#8B1A2B] font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Read Online at mlsysbook.ai
                  </a>
                  <a 
                    href="https://mlsysbook.ai/Machine-Learning-Systems.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#A51C30] hover:text-[#8B1A2B] font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </a>
                </div>
              </div>

              {/* TinyML Professional Certificate */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">TinyML Professional Certificate</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">edX</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Comprehensive course series on Tiny Machine Learning, training over 100,000 students globally 
                  in deploying AI on ultra-low-power devices and IoT systems.
                </p>
                <div className="space-y-3">
                  <a 
                    href="https://www.edx.org/professional-certificate/harvardx-tiny-machine-learning" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#A51C30] hover:text-[#8B1A2B] font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Enroll on edX
                  </a>
                  <div className="text-sm text-gray-500">
                    Professional Certificate Program   Self-paced   Beginner to Advanced
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* TinyML Outreach & Community */}
          <div className="mb-12 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">TinyML Outreach & Community</h2>
            <div className="bg-gradient-to-r from-[#A51C30]/5 to-[#A51C30]/3 rounded-lg p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Global TinyML Initiative</h3>
                  <p className="text-gray-700 mb-4">
                    Community-driven initiatives focused on expanding TinyML education globally, 
                    fostering academic-industry partnerships, and promoting diversity in STEM through 
                    accessible AI education.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full">Community Building</span>
                    <span className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full">Educational Resources</span>
                    <span className="bg-white text-gray-700 text-sm px-3 py-1 rounded-full">Industry Partnerships</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a 
                    href="https://tinyml.seas.harvard.edu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-[#A51C30] text-white font-medium rounded-lg hover:bg-[#8B1A2B] transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit TinyML Site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Taught */}
      <div className="bg-white w-full">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Courses Taught</h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              My teaching portfolio covers the full computing stack, from low-level hardware to high-level AI systems. The courses build upon one another to provide a comprehensive understanding of how modern intelligent systems are built from the ground up.
            </p>
            <div className="space-y-8">
              {/* Intelligent Systems */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex gap-4" style={{borderLeft: '6px solid #A51C30'}}>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#A51C30] mb-4">Intelligent Systems</h3>
                  <div className="space-y-4">
                    {/* Machine Learning Systems */}
                    <div>
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <MdOutlinePsychology className="text-[#A51C30]" size={24} />
                          <span className="font-medium text-gray-900">Machine Learning Systems</span>
                        </div>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">COMPSCI 249R (Harvard)</span>
                      </div>
                      <p className="text-gray-600 text-sm">Deploying machine learning models on ultra-low-power devices and edge computing systems.</p>
                    </div>
                    <hr className="border-gray-200" />
                    {/* Embedded Systems */}
                    <div>
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <FiZap className="text-[#A51C30]" size={24} />
                          <span className="font-medium text-gray-900">Embedded Systems</span>
                        </div>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">EE 319K (UT Austin)</span>
                      </div>
                      <p className="text-gray-600 text-sm">Hands-on course covering embedded system design, microcontrollers, and real-time programming.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Software */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex gap-4" style={{borderLeft: '6px solid #A51C30'}}>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#A51C30] mb-4">System Software</h3>
                  <div className="space-y-4">
                    {/* Dynamic Compilers */}
                    <div>
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <FiSettings className="text-[#A51C30]" size={24} />
                          <span className="font-medium text-gray-900">Dynamic Compilers</span>
                        </div>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">EE 382V (UT Austin)</span>
                      </div>
                      <p className="text-gray-600 text-sm">Exploration of just-in-time compilation, dynamic optimization, and adaptive runtime systems.</p>
                    </div>
                    <hr className="border-gray-200" />
                    {/* Code Generation and Optimization */}
                    <div>
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <FiCode className="text-[#A51C30]" size={24} />
                          <span className="font-medium text-gray-900">Code Generation and Optimization</span>
                        </div>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">EE 382V (UT Austin)</span>
                      </div>
                      <p className="text-gray-600 text-sm">Advanced compiler techniques focusing on code generation, optimization strategies, and performance analysis.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Computing Foundations */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex gap-4" style={{borderLeft: '6px solid #A51C30'}}>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#A51C30] mb-4">Computing Foundations</h3>
                  <div className="space-y-4">
                    {/* Digital Logic Design & Computing Hardware */}
                    <div>
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <FiCpu className="text-[#A51C30]" size={24} />
                          <span className="font-medium text-gray-900">Digital Logic Design & Computing Hardware</span>
                        </div>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">COMPSCI 141 (Harvard)</span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Principles of digital logic, processor organization, memory hierarchies, and hardware and software interaction.
                      </p>
                    </div>
                    <hr className="border-gray-200" />
                    {/* Introduction to Electrical Engineering */}
                    <div>
                      <div className="w-full flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                          <FiActivity className="text-[#A51C30]" size={24} />
                          <span className="font-medium text-gray-900">Introduction to Electrical Engineering</span>
                        </div>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">ES 50 (UT Austin)</span>
                      </div>
                      <p className="text-gray-600 text-sm">  Principles of electrical engineering, including circuit analysis, signals, and electronic systems design.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped: Teaching Philosophy + Get Involved */}
      <div className="bg-gray-50 w-full">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Teaching Philosophy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Teaching Philosophy</h2>
            <div className="bg-gray-200 border border-gray-200 rounded-xl p-8 shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-[#A51C30] mb-3">Democratizing Access</h3>
                  <p className="text-gray-700">
                    Making cutting-edge machine learning systems education accessible to learners worldwide 
                    through open-source materials and free online courses.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#A51C30] mb-3">Practical Application</h3>
                  <p className="text-gray-700">
                    Bridging theory and practice by focusing on real-world implementations and 
                    hands-on experience with ML systems deployment.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#A51C30] mb-3">Industry Relevance</h3>
                  <p className="text-gray-700">
                    Ensuring curriculum stays current with industry needs and emerging technologies 
                    in machine learning systems and edge AI.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#A51C30] mb-3">Global Community</h3>
                  <p className="text-gray-700">
                    Building a diverse, inclusive community of learners and practitioners 
                    advancing the field of machine learning systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Get Involved */}
          <div className="rounded-lg p-8 bg-[#A51C30]/5">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h2>
            <p className="text-gray-700 mb-6">
              Interested in collaborating on educational initiatives, adopting course materials, 
              or contributing to the TinyML community? Let's connect.
            </p>
            <a 
              href="mailto:vijay@seas.harvard.edu" 
              className="inline-flex items-center px-6 py-3 bg-[#A51C30] text-white font-medium rounded-lg hover:bg-[#8B1A2B] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact for Collaboration
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teaching;