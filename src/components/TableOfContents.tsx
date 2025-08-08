import { useState, useEffect, useRef } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  isVisible: boolean;
  onToggle: () => void;
}

function TableOfContents({ content, isVisible, onToggle }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      
      items.push({ id, title, level });
    }

    setTocItems(items);
  }, [content]);

  // Setup intersection observer for active section tracking
  useEffect(() => {
    if (tocItems.length === 0) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0
      }
    );

    // Observe all heading elements
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element && observer.current) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-20 right-4 z-50 bg-white shadow-lg rounded-full p-3 border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle table of contents"
      >
        <svg 
          className="w-5 h-5 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h7" 
          />
        </svg>
      </button>

      {/* Table of Contents */}
      <div className={`
        fixed top-24 right-4 w-72 max-h-[calc(100vh-200px)] 
        bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-40
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full lg:translate-x-0 lg:opacity-100'}
        lg:block
      `}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Contents</h3>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
              aria-label="Close table of contents"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-96 py-2">
          <nav>
            <ul className="space-y-1">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      scrollToHeading(item.id);
                      // Close mobile menu after navigation
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                    className={`
                      w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50
                      ${activeId === item.id 
                        ? 'text-[#A51C30] bg-red-50 border-r-2 border-[#A51C30] font-medium' 
                        : 'text-gray-700 hover:text-gray-900'
                      }
                    `}
                    style={{ 
                      paddingLeft: `${12 + (item.level - 1) * 16}px`
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isVisible && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
}

export default TableOfContents;
