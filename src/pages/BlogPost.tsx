import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import matter from 'gray-matter';
import TableOfContents from '../components/TableOfContents';

interface BlogPostData {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTocVisible, setIsTocVisible] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        
        // Load the blog post markdown file
        const response = await fetch(`/content/blog/${slug}.md`);
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const markdownContent = await response.text();
        const { data, content } = matter(markdownContent);
        
        setPost({
          title: data.title,
          date: data.date,
          excerpt: data.excerpt,
          tags: data.tags || [],
          content
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link 
              to="/blog"
              className="inline-flex items-center text-[#A51C30] hover:text-[#8B1A2B] font-medium transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:pr-80">
        <Link to="/blog" className="text-[#A51C30] hover:text-[#8B1A2B] font-medium mb-4 inline-flex items-center">
          ← Back to Blog
        </Link>
        
        {post ? (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Table of Contents */}
            <TableOfContents 
              content={post.content}
              isVisible={isTocVisible}
              onToggle={() => setIsTocVisible(!isTocVisible)}
            />
            
            <div className="prose prose-lg prose-gray max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                urlTransform={(uri) => {
                  // ReactMarkdown sometimes strips the /blog/ part from the path
                  // This ensures the correct path is used for images in the blog directory
                  if (uri.startsWith('/images/') && !uri.startsWith('/images/blog/')) {
                    const filename = uri.split('/').pop();
                    return `/images/blog/${filename}`;
                  }
                  return uri.startsWith('/') ? uri : uri;
                }}
                components={{
                  // Custom styling for markdown elements
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  h1: ({ children }) => {
                    const text = children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
                    return (
                      <h1 id={id} className="text-3xl font-bold text-[#A51C30] mt-8 mb-4 first:mt-0">
                        {children}
                      </h1>
                    );
                  },
                  h2: ({ children }) => {
                    const text = children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
                    return (
                      <h2 id={id} className="text-2xl font-bold text-[#A51C30] mt-8 mb-4">
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => {
                    const text = children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
                    return (
                      <h3 id={id} className="text-xl font-semibold text-[#8B1A2B] mt-6 mb-3">
                        {children}
                      </h3>
                    );
                  },
                  h4: ({ children }) => {
                    const text = children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
                    return (
                      <h4 id={id} className="text-lg font-semibold text-[#8B1A2B] mt-6 mb-3">
                        {children}
                      </h4>
                    );
                  },
                  h5: ({ children }) => {
                    const text = children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
                    return (
                      <h5 id={id} className="text-base font-semibold text-gray-800 mt-4 mb-2">
                        {children}
                      </h5>
                    );
                  },
                  h6: ({ children }) => {
                    const text = children?.toString() || '';
                    const id = text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
                    return (
                      <h6 id={id} className="text-sm font-semibold text-gray-800 mt-4 mb-2">
                        {children}
                      </h6>
                    );
                  },
                  ul: ({ children }) => (
                    <ul className="list-disc list-outside text-gray-700 space-y-3 mb-6 ml-6 pl-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-outside text-gray-700 space-y-3 mb-6 ml-6 pl-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 leading-relaxed pl-2">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#A51C30] pl-6 italic text-gray-700 bg-gray-50 py-4 my-6">
                      {children}
                    </blockquote>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-700">
                      {children}
                    </em>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a 
                      href={href}
                      className="text-[#A51C30] hover:text-[#8B1A2B] font-medium underline hover:no-underline transition-colors"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img 
                      src={src} 
                      alt={alt} 
                      className="max-w-full h-auto rounded-lg shadow-md my-6"
                    />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPost; 