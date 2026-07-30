            import { Link, useLocation } from "react-router-dom";
            import { useState } from "react";

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { path: string; label: string; accent?: "eth" }[] = [
    { path: "/", label: "Home" },
    { path: "/research", label: "Research" },
    { path: "/publications", label: "Publications" },
    { path: "/teaching", label: "Teaching" },
    { path: "/eth", label: "ETH Zurich", accent: "eth" },
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
          {/* Branding, affiliation, and current sabbatical */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex-shrink-0" onClick={closeMobileMenu} aria-label="Home - Prof. Vijay Janapa Reddi">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img 
                  src="/images/profile.jpg"
                  alt="Prof. Vijay Janapa Reddi"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
            <div>
              <Link to="/" className="block" onClick={closeMobileMenu}>
                <div className="text-gray-900 font-semibold">Prof. Vijay Janapa Reddi</div>
                <div className="text-gray-600 text-sm">Gordon McKay Professor</div>
                <div className="text-gray-500 text-xs">
                  <span className="hidden xl:inline">Harvard School of Engineering and Applied Sciences</span>
                  <span className="xl:hidden">Harvard SEAS</span>
                </div>
              </Link>
              <Link
                to="/eth"
                onClick={closeMobileMenu}
                className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-eth/10 text-eth hover:bg-eth/20 transition-colors whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-eth mr-1.5" aria-hidden="true"></span>
                On sabbatical at ETH Zurich
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <nav className="flex lg:space-x-4 xl:space-x-6" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isEth = item.accent === "eth";
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-2 xl:px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? isEth
                          ? "text-eth border-b-2 border-eth"
                          : "text-[#A51C30] border-b-2 border-[#A51C30]"
                        : isEth
                          ? "text-eth hover:text-eth-dark"
                          : "text-gray-700 hover:text-[#A51C30]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
          <div className="lg:hidden">
            <nav className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isEth = item.accent === "eth";
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? isEth
                          ? "text-eth bg-eth-50"
                          : "text-[#A51C30] bg-gray-50"
                        : isEth
                          ? "text-eth hover:bg-eth-50"
                          : "text-gray-700 hover:text-[#A51C30] hover:bg-gray-50"
                    }`}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;