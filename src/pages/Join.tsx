import { Link } from 'react-router-dom';

function Join() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A51C30] text-white">
              For undergraduates
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Undergraduate Research
          </h1>
          <div className="w-24 h-1 bg-[#A51C30]"></div>
          <p className="text-lg text-gray-700 mt-6 max-w-3xl">
            I strongly encourage undergraduates to do research with the group. If you&apos;re
            curious about the work, you&apos;re welcome to approach me or anyone in the group.
          </p>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl">
            The projects that work are real collaborations. This isn&apos;t a casual
            extracurricular, a way to put a lab on your CV, or something to drop into when
            the week is light. If you join a project, you&apos;re making a commitment.
          </p>
          <blockquote className="mt-8 max-w-3xl border-l-4 border-[#A51C30] pl-6 py-2 text-lg text-gray-800 italic">
            You want to work on a question that doesn&apos;t have an answer in the back
            of the book.
          </blockquote>
          <p className="mt-4 max-w-3xl text-sm text-gray-500">
            I wrote more about this in{' '}
            <Link
              to="/blog/undergraduate-research"
              className="text-[#A51C30] hover:text-[#8B1A2B] font-medium not-italic"
            >
              Pick One Thing and Do It Well
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How a collaboration starts</h2>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Three things should be in place. You can talk before they all exist. You
            shouldn&apos;t treat the work as started until they do.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white border border-gray-200 rounded-lg p-6 border-l-4 border-l-[#A51C30]">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">A project you can name</h3>
              <p className="text-gray-600">
                You should be able to name a project or a research question, even if it&apos;s
                still rough. Wanting to join the lab is a reason to start talking. It isn&apos;t
                a project yet.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 border-l-4 border-l-[#A51C30]">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">A mentor who has agreed</h3>
              <p className="text-gray-600">
                Someone in the group — often a PhD student — has to have said yes. Please
                do approach people. A friendly conversation is not the same as a match.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 border-l-4 border-l-[#A51C30]">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">An explicit agreement</h3>
              <p className="text-gray-600">
                Before you begin, agree on hours, what you&apos;re trying to finish, and how
                long you&apos;re signing up for. Leaving this vague is how good intentions
                turn into a wasted semester.
              </p>
            </div>
          </div>

          <p className="text-gray-700 max-w-3xl">
            Talking, sitting in on a meeting, or even helping a little doesn&apos;t
            automatically mean you&apos;re in the lab, that you get badge access, or that
            your name goes on a paper. Those come from a real commitment, not from hanging
            around.
          </p>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What the work is like</h2>
          <div className="space-y-5 text-gray-700 max-w-3xl">
            <p>
              You should own a real piece of the work, not watch from the side or loosely
              help with someone else&apos;s project.
            </p>
            <p>
              Research is messy. Things break. Staying with it when it&apos;s hard is most
              of the job — not only showing up when it&apos;s going well.
            </p>
            <p>
              You don&apos;t need to arrive as an expert. Curiosity, a willingness to learn,
              and showing up reliably matter more than already knowing everything.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Respect the people training you</h2>
          <p className="text-gray-700 max-w-3xl">
            PhD students and other mentors put a lot of time into undergraduate
            researchers. That time is scarce. Communicate, show up, and follow through on
            what you said you&apos;d do.
          </p>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to start</h2>
          <p className="text-gray-700 mb-6 max-w-3xl">
            Look at the{' '}
            <Link to="/research" className="text-[#A51C30] hover:text-[#8B1A2B] font-medium">
              research
            </Link>{' '}
            and recent{' '}
            <Link to="/publications" className="text-[#A51C30] hover:text-[#8B1A2B] font-medium">
              publications</Link>, then reach out to a group member whose work you connect with — or to me.
            Come with a question or a direction, not just a request to join. I wrote the
            general version of this advice, beyond how this group works, in{' '}
            <Link
              to="/blog/undergraduate-research"
              className="text-[#A51C30] hover:text-[#8B1A2B] font-medium"
            >
              Pick One Thing and Do It Well
            </Link>
            .
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-[#A51C30] text-white px-6 py-3 rounded-lg hover:bg-[#8B1A2B] transition-colors font-medium"
          >
            Get in touch
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <div className="mt-10 pt-8 border-t border-gray-200 text-gray-600 max-w-3xl">
            <p>
              ETH students looking for a Master&apos;s thesis or semester project should start
              on the{' '}
              <Link to="/eth" className="text-eth hover:text-eth-dark font-medium">
                sabbatical page
              </Link>
              . Applying for a PhD? See{' '}
              <Link to="/contact" className="text-[#A51C30] hover:text-[#8B1A2B] font-medium">
                contact
              </Link>{' '}
              and the post on{' '}
              <Link to="/blog/phd-expectations" className="text-[#A51C30] hover:text-[#8B1A2B] font-medium">
                what is expected during a PhD
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
