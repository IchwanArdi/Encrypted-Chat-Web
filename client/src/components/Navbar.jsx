import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { User, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.webp';

function Navbar() {
  // const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuRef]);

  const handleButtonClick = () => {
    setIsButtonPressed(true);
    setIsMobileMenuOpen(!isMobileMenuOpen);

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsButtonPressed(false);
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div className="max-w-6xl w-full shadow-md justify-between flex backdrop-blur-md rounded-2xl p-4">
        {/* Logo placeholder */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 md:h-15 object-cover" />
        </Link>

        {/* Desktop Navigation - hanya tampil di desktop */}
        <div className="hidden md:flex gap-x-6 items-center">
          <Link to="/login" className="text-lg font-semibold text-white hover:text-blue-500 transition-all duration-200 cursor-pointer relative group">
            Login
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link
            to="/register"
            className="text-lg font-semibold items-center py-2 px-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:bg-gray-800 transform transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
          >
            Daftar sekarang
          </Link>
        </div>

        {/* Mobile User Button - hanya tampil di mobile */}
        <div className="md:hidden relative" ref={mobileMenuRef}>
          <button
            onClick={handleButtonClick}
            className={`relative overflow-hidden group
              rounded-2xl p-3 
             hover:bg-transparent
              transition-all duration-200 cursor-pointer
              shadow-md hover:shadow-lg
              transform hover:scale-105
              ${isButtonPressed ? 'scale-95' : ''}
              ${isMobileMenuOpen ? 'bg-transparent border-blue-400 shadow-lg' : ''}
            `}
          >
            {/* Ripple effect */}
            <div className={`absolute inset-0 bg-blue-500 rounded-2xl opacity-0 transform scale-0 transition-all duration-300 ${isButtonPressed ? 'opacity-20 scale-100' : ''}`}></div>

            {/* Button content */}
            <div className="relative z-10 flex items-center space-x-2">
              <User className={`h-5 w-5 text-slate-50 transition-all duration-200 ${isMobileMenuOpen ? 'text-blue-600' : ''}`} />
              <ChevronDown className={`h-4 w-4 text-slate-50 transition-all duration-200 transform ${isMobileMenuOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
          </button>

          {/* Mobile Menu Dropdown */}
          <div
            className={`absolute right-0 mt-5 w-48 bg-gray-800 text-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 transform origin-top-right z-50
            ${isMobileMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}
          `}
          >
            {/* Menu items with stagger animation */}
            <div className="py-2">
              <Link
                to="/login"
                className={`block w-full text-left px-6 py-3 text-white
                ${isMobileMenuOpen ? 'animate-fadeInUp' : ''}
              `}
                style={{ animationDelay: '50ms' }}
              >
                Login
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"></div>
              </Link>

              <Link
                to="/register"
                className={`block w-full text-left px-6 py-3 text-white
                ${isMobileMenuOpen ? 'animate-fadeInUp' : ''}
              `}
                style={{ animationDelay: '100ms' }}
              >
                Signup
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top"></div>
              </Link>
            </div>

            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}

export default Navbar;
