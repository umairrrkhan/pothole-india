import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

/**
 * Footer component with liquid glass design
 * Includes essential links and contact information with glass morphism effects
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Main footer content with glass design */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section with glass design */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="Pothole Indi Logo" className="w-12 h-12" />
                <h3 className="text-xl font-semibold text-white">Pothole Indi</h3>
              </div>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                Making Indian roads safer by enabling citizens to report potholes
                instantly. Together, we can build better infrastructure for everyone.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">All systems operational</span>
              </div>
            </div>

            {/* Quick Links with glass styling */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-gray-100">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/#how-it-works"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    How It Works
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/advertise"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gst"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    GST Calculator
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-conditions"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Advertisement with glass design */}
            <div>
              <h4 className="text-base font-semibold mb-4 text-gray-100">Contact & Business</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:allwingsai@gmail.com"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    allwingsai@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:umairh1819@gmail.com"
                    className="text-gray-400 hover:text-blue-400 transition-all duration-300 flex items-center text-sm glass-button py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    umairh1819@gmail.com
                  </a>
                </li>
                <li>
                  <Link
                    to="/advertise"
                    className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-all duration-300 flex items-start mt-2 glass-button py-3 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      Advertisement Opportunities
                      <p className="text-xs text-gray-500 mt-1 font-normal">
                        High revenue potential - Contact us for partnership opportunities
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and partnership with glass design */}
      <div className="bg-black/50 py-6 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="mb-2 md:mb-0">
              <p className="text-sm text-gray-500">
                © 2025 Pothole Indi. All rights reserved.
              </p>
            </div>

            {/* Partnership Notice */}
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                Built for safer Indian roads
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;