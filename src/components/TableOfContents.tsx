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
  const tocContainerRef = useRef<HTMLDivElement | null>(null);
  const headingElementsRef = useRef<Map<string, Element>>(new Map());

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

    // Clear previous heading elements
    headingElementsRef.current.clear();

    // Collect all heading elements
    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        headingElementsRef.current.set(id, element);
      }
    });

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and position to get the most prominent heading
          const mostVisible = visibleEntries
            .sort((a, b) => {
              // First, sort by intersection ratio (higher is better)
              const ratioDiff = b.intersectionRatio - a.intersectionRatio;
              if (Math.abs(ratioDiff) > 0.1) return ratioDiff;
              
              // If ratios are similar, prefer the one closer to the top of viewport
              const aRect = a.boundingClientRect;
              const bRect = b.boundingClientRect;
              return Math.abs(aRect.top) - Math.abs(bRect.top);
            })[0];
          
          setActiveId(mostVisible.target.id);
        } else {
          // If no headings are intersecting, find the closest one above the viewport
          const headingElements = Array.from(headingElementsRef.current.values());
          let closestAbove: Element | null = null;
          let closestDistance = Infinity;
          
          headingElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.bottom < 100) { // 100px offset for header
              const distance = Math.abs(rect.bottom);
              if (distance < closestDistance) {
                closestDistance = distance;
                closestAbove = element;
              }
            }
          });
          
          if (closestAbove) {
            setActiveId(closestAbove.id);
          }
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1.0]
      }
    );

    // Observe all heading elements
    headingElementsRef.current.forEach((element) => {
      if (observer.current) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [tocItems]);

  // Scroll TOC to keep active item visible
  const scrollTocToActiveItem = (activeId: string) => {
    if (!tocContainerRef.current || !activeId) return;
    
    const activeButton = tocContainerRef.current.querySelector(`[data-heading-id="${activeId}"]`);
    if (!activeButton) return;
    
    const container = tocContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const activeRect = activeButton.getBoundingClientRect();
    
    // Check if the active item is outside the visible area
    const isAbove = activeRect.top < containerRect.top;
    const isBelow = activeRect.bottom > containerRect.bottom;
    
    if (isAbove || isBelow) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  // Auto-scroll TOC when active section changes
  useEffect(() => {
    if (activeId) {
      scrollTocToActiveItem(activeId);
    }
  }, [activeId]);

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
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#A51C30] text-sm uppercase tracking-wider">Contents</h3>
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
        
        <div ref={tocContainerRef} className="overflow-y-auto max-h-96 py-2">
          <nav>
            <ul className="space-y-1">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    data-heading-id={item.id}
                    onClick={() => {
                      scrollToHeading(item.id);
                      // Close mobile menu after navigation
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                    className={`
                      w-full text-left px-4 py-2 text-sm transition-all duration-200 hover:bg-gray-50
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
