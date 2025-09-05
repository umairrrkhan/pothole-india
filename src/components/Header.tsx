import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

/**
 * Header component with cylindrical glass-like design
 * Features glass morphism effect and proper spacing
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the contact or advertise page
  const isContactPage = location.pathname === '/contact';
  const isAdvertisePage = location.pathname === '/advertise';
  const isGSTPage = location.pathname === '/gst';

  return (
    <header className="sticky top-4 z-50 px-4 py-3 mt-4">
      <div className="max-w-6xl mx-auto">
        {/* Cylindrical glass-like header with rounded corners and proper spacing */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg py-3 px-6">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Name with glass-like design */}
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Pothole Indi Logo" className="w-12 h-12" />
              <h1 className="text-xl font-bold text-gray-900">Pothole Indi</h1>
            </div>

            {/* Desktop Navigation with glass styling */}
            <nav className="hidden md:flex items-center space-x-8">
              {isContactPage || isAdvertisePage || isGSTPage ? (
                <Link
                  to="/"
                  className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
                >
                  Home
                </Link>
              ) : (
                <>
                  <a
                    href="/#how-it-works"
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
                  >
                    How It Works
                  </a>
                  <Link
                    to="/contact"
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/advertise"
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
                  >
                    Advertise
                  </Link>
                  <Link
                    to="/gst"
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
                  >
                    GST Calculator
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button with glass design */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu with glass styling */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <nav className="flex flex-col space-y-3">
                {isContactPage || isAdvertisePage || isGSTPage ? (
                  <Link
                    to="/"
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                ) : (
                  <>
                    <a
                      href="/#how-it-works"
                      className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                    >
                      How It Works
                    </a>
                    <Link
                      to="/contact"
                      className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                    <Link
                      to="/advertise"
                      className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Advertise
                    </Link>
                    <Link
                      to="/gst"
                      className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      GST Calculator
                    </Link>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;