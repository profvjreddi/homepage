import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Loading blog posts...');
        // Fetch from root path since we're now deployed at root
        const response = await fetch('/content/blog-index.json');
        console.log('Response status:', response.status);
        if (response.ok) {
          const postsData = await response.json();
          console.log('Loaded posts:', postsData);
          setPosts(postsData);
        } else {
          console.error('Failed to load blog index');
          setPosts([]);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <div className="w-24 h-1 bg-[#A51C30]"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-3xl">
              Thoughts on research methodology, advice for students, and reflections on the evolving landscape of embodied AI systems.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="hover:text-[#A51C30] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#A51C30] hover:text-[#8B1A2B] font-medium transition-colors"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;