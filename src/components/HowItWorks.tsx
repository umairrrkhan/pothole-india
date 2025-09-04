import React from 'react';
import { motion } from 'framer-motion';
import firstGif from '../assets/first.gif';
import secondGif from '../assets/second.gif';

/**
 * HowItWorks component explaining the pothole reporting process
 * Provides step-by-step instructions with visual indicators
 */
const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Capture Pothole",
      description: "Take a clear photo of the pothole using your phone's camera.",
      detailedInfo: [
        "Position phone above pothole",
        "Ensure good lighting",
        "Image processed locally",
      ],
      gif: firstGif,
    },
    {
      number: 2,
      title: "Generate Certificate",
      description: "Get an official certificate with all details for your records.",
      detailedInfo: [
        "Includes GPS coordinates",
        "Timestamp of reporting",
        "Download or share directly",
      ],
      gif: secondGif,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl px-6 py-3 shadow-lg backdrop-blur-sm">
                <span className="text-lg font-medium text-cyan-300">Simple Process</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How It <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Works</span>
          </motion.h2>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-8"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Report potholes in just 2 simple steps. No app installation required,
            works directly in your browser.
          </motion.p>
        </div>

        {/* Steps with 3D animations */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              {/* Large GIF in Card with Enhanced Number */}
              <div className="flex flex-col items-center md:w-2/5">
                <div className="card bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 shadow-2xl rounded-3xl relative overflow-hidden">
                  {/* Enhanced Corner Number */}
                  <motion.div 
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-600 to-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold z-20 shadow-xl border-4 border-gray-900"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.number}
                  </motion.div>
                  <div className="card-body p-6">
                    <div className="relative group">
                      <div className="absolute -inset-8 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                      <img 
                        src={step.gif} 
                        alt={`${step.title} illustration`}
                        className="w-[500px] h-[500px] object-contain mx-auto rounded-2xl z-10 relative shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Information Directly - No Card */}
              <div className="md:w-3/5">
                <motion.h3 
                  className="text-4xl text-white mb-6 text-center font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-xl text-gray-300 text-center mb-10 font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {step.description}
                </motion.p>
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <ul className="space-y-5">
                    {step.detailedInfo.map((info, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      >
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-mono text-xl font-bold w-10 h-10 flex items-center justify-center mr-5 flex-shrink-0 mt-1 rounded-xl shadow-lg">
                          {step.number}.{idx + 1}
                        </div>
                        <span className="text-xl text-gray-200 font-light">{info}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information with 3D cards */}
        <motion.div 
          className="mt-32"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h3 
            className="text-4xl font-bold text-white mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Pothole Indi</span>?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              whileHover={{ y: -10, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 text-cyan-400 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-cyan-700/50">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white text-center mb-4">Privacy First</h4>
              <p className="text-gray-300 text-center font-light">
                We don't store any personal data. All information stays on your device.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              whileHover={{ y: -10, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 text-cyan-400 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-cyan-700/50">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white text-center mb-4">High Accuracy</h4>
              <p className="text-gray-300 text-center font-light">
                Uses GPS for precise location tracking within 10 meters.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
              whileHover={{ y: -10, rotateX: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 text-cyan-400 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-cyan-700/50">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-white text-center mb-4">Instant Sharing</h4>
              <p className="text-gray-300 text-center font-light">
                One-click sharing to Twitter with pre-written messages.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;