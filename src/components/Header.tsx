            import { Link, useLocation } from "react-router-dom";
            import { useState } from "react";

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/research", label: "Research" },
    { path: "/publications", label: "Publications" },
    { path: "/teaching", label: "Teaching" },
    { path: "/blog", label: "Blog" },
    { path: "/profile", label: "Profile" },
    { path: "/contact", label: "Contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Harvard branding and name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3" onClick={closeMobileMenu} aria-label="Home - Prof. Vijay Janapa Reddi">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src="/images/profile.jpg"
                  alt="Prof. Vijay Janapa Reddi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-gray-900 font-semibold">Prof. Vijay Janapa Reddi</div>
                <div className="text-gray-600 text-sm">Gordon McKay Professor</div>
                <div className="text-gray-500 text-xs">Harvard School of Engineering and Applied Sciences</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-[#A51C30] border-b-2 border-[#A51C30]"
                      : "text-gray-700 hover:text-[#A51C30]"
                  }`}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* CV Download Icon */}
            <a 
              href="/documents/cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-[#A51C30] transition-colors duration-200"
              title="Download CV"
              aria-label="Download CV"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="text-gray-700 hover:text-[#A51C30] focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <nav className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-[#A51C30] bg-gray-50"
                      : "text-gray-700 hover:text-[#A51C30] hover:bg-gray-50"
                  }`}
                  onClick={closeMobileMenu}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile CV Download */}
              <a
                href="/documents/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-[#A51C30] hover:bg-gray-50 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;