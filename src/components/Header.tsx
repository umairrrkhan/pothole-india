import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

/**
 * Header component with enhanced design
 * Features curved ends and navigation for How It Works and other sections
 */
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the contact or advertise page
  const isContactPage = location.pathname === '/contact';
  const isAdvertisePage = location.pathname === '/advertise';
  const isGSTPage = location.pathname === '/gst';

  return (
    <header className="sticky top-0 z-50 px-6 py-4 backdrop-blur-lg bg-gray-900/80 border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Brand Name */}
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="Pothole Indi Logo" className="w-14 h-14" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Pothole Indi</h1>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isContactPage || isAdvertisePage || isGSTPage ? (
            <Link
              to="/"
              className="text-gray-300 font-medium hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ) : (
            <>
              <a
                href="/#how-it-works"
                className="text-gray-300 font-medium hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                How It Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link
                to="/contact"
                className="text-gray-300 font-medium hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/advertise"
                className="text-gray-300 font-medium hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                Advertise
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/gst"
                className="text-gray-300 font-medium hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                GST Calculator
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300"
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
        </motion.button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden mt-4 pb-4 border-t border-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-3 pt-4">
            {isContactPage || isAdvertisePage || isGSTPage ? (
              <Link
                to="/"
                className="text-gray-300 font-medium text-left hover:text-cyan-400 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            ) : (
              <>
                <a
                  href="/#how-it-works"
                  className="text-gray-300 font-medium text-left hover:text-cyan-400 transition-colors duration-300"
                >
                  How It Works
                </a>
                <Link
                  to="/contact"
                  className="text-gray-300 font-medium text-left hover:text-cyan-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/advertise"
                  className="text-gray-300 font-medium text-left hover:text-cyan-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Advertise
                </Link>
                <Link
                  to="/gst"
                  className="text-gray-300 font-medium text-left hover:text-cyan-400 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  GST Calculator
                </Link>
              </>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;