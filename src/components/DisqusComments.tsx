import { DiscussionEmbed } from 'disqus-react';

interface DisqusCommentsProps {
  slug: string;
  title: string;
}

const DISQUS_SHORTNAME = 'harvard-homepage-blog';

function DisqusComments({ slug, title }: DisqusCommentsProps) {
  const disqusConfig = {
    url: `https://profvjreddi.github.io/blog/${slug}`,
    identifier: slug,
    title: title,
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
      <DiscussionEmbed
        shortname={DISQUS_SHORTNAME}
        config={disqusConfig}
      />
    </div>
  );
}

export default DisqusComments;
