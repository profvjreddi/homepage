function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col space-y-8">
          {/* Main footer content */}
          <div className="flex flex-col lg:flex-row justify-between items-start space-y-6 lg:space-y-0">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-[#A51C30] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <div className="text-gray-800 font-semibold text-base mb-1">
                  Harvard University
                </div>
                <div className="text-gray-600 text-sm leading-relaxed max-w-md">
                  School of Engineering and Applied Sciences
                </div>
                <div className="text-gray-500 text-xs mt-2">
                  Prof. Vijay Janapa Reddi - Gordon McKay Professor
                </div>
              </div>
            </div>
            
            <div className="text-left lg:text-right">
              <p className="text-xs text-gray-500 mb-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">
                Built with React & Vite
              </p>
            </div>
          </div>

          {/* Harvard required footer links */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              <div className="text-left">
                <p className="text-sm text-gray-600 font-medium">
                  © {new Date().getFullYear()} President and Fellows of Harvard College
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 text-sm">
                <a 
                  href="https://trademark.harvard.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#A51C30] transition-colors hover:underline"
                >
                  Trademark Notice
                </a>
                <a 
                  href="https://accessibility.huit.harvard.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#A51C30] transition-colors hover:underline"
                >
                  Accessibility Policy
                </a>
                <a 
                  href="https://www.harvard.edu/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#A51C30] transition-colors hover:underline"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;