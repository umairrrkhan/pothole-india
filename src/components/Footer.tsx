import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

/**
 * Footer component with enhanced design and contact information
 * Includes quick links and advertisement opportunities
 */
const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [reportCount, setReportCount] = useState(12473); // Simulated report count

  // Update time every second and simulate new reports
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate new reports (1 every 10-30 seconds)
      if (Math.random() > 0.9) {
        setReportCount(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-3xl"
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Live Stats Bar */}
      <div className="bg-black/30 py-3 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span>Live: {reportCount.toLocaleString()} reports</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-xs font-bold px-3 py-1 rounded-full">
              REAL-TIME DATA
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <motion.div 
                className="flex items-center space-x-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img src={logo} alt="Pothole Indi Logo" className="w-16 h-16" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Pothole Indi</h3>
              </motion.div>
              <motion.p 
                className="text-gray-300 mb-6 text-lg max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Making Indian roads safer by enabling citizens to report potholes
                instantly. Together, we can build better infrastructure for everyone.
              </motion.p>
              
              {/* Impact Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center">
                  <div className="text-2xl font-bold text-cyan-400">{reportCount.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Reports Filed</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center">
                  <div className="text-2xl font-bold text-green-400">8,429</div>
                  <div className="text-sm text-gray-400">Roads Improved</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 text-center">
                  <div className="text-2xl font-bold text-purple-400">42</div>
                  <div className="text-sm text-gray-400">Cities Active</div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.h4 
                className="text-xl font-semibold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Quick Links
              </motion.h4>
              <motion.ul 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <li>
                  <a
                    href="/#how-it-works"
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    How It Works
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/advertise"
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Advertise
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gst"
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    GST Calculator
                  </Link>
                </li>
              </motion.ul>
            </div>

            {/* Contact & Advertisement */}
            <div>
              <motion.h4 
                className="text-xl font-semibold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Contact & Business
              </motion.h4>
              <motion.ul 
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <li>
                  <a
                    href="mailto:allwingsai@gmail.com"
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center text-sm group"
                  >
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    allwingsai@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:umairh1819@gmail.com"
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center text-sm group"
                  >
                    <svg className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    umairh1819@gmail.com
                  </a>
                </li>
                <li>
                  <Link
                    to="/advertise"
                    className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors duration-300 flex items-start mt-2 group"
                  >
                    <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      Advertisement Opportunities
                      <p className="text-xs text-gray-400 mt-1 font-normal">
                        High revenue potential - Contact us for partnership opportunities
                      </p>
                    </div>
                  </Link>
                </li>
              </motion.ul>
            </div>
          </div>
        </div>
      </div>

      {/* Second layer - Copyright and partnership */}
      <div className="bg-black/50 py-8 px-4 border-t border-gray-800 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <motion.div 
              className="mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Pothole Indi. All rights reserved.
              </p>
            </motion.div>

            {/* Partnership Notice */}
            <motion.div 
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
              <p className="text-gray-300">
                Built for safer Indian roads
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Partner with us: High traffic, engaged audience, meaningful impact
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;