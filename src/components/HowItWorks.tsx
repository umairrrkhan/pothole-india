import React from 'react';
import firstGif from '../assets/first.gif';
import secondGif from '../assets/second.gif';

/**
 * HowItWorks component explaining the pothole reporting process
 * Provides step-by-step instructions with enhanced visual design
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
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-200 to-purple-300 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header with enhanced design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full blur-xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl px-6 py-3 shadow-lg">
                <span className="text-lg font-medium text-gray-800">Simple Process</span>
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Works</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Report potholes in just 2 simple steps. No app installation required,
            works directly in your browser.
          </p>
        </div>

        {/* Steps with enhanced visual design */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
            >
              {/* GIF in Card with Enhanced Number */}
              <div className="flex flex-col items-center md:w-2/5">
                <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 shadow-2xl rounded-3xl relative overflow-hidden">
                  {/* Enhanced Corner Number */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold z-20 shadow-xl border-4 border-white">
                    {step.number}
                  </div>
                  <div className="p-6">
                    <div className="relative group">
                      <div className="absolute -inset-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                      <img 
                        src={step.gif} 
                        alt={`${step.title} illustration`}
                        className="w-full h-80 object-contain mx-auto rounded-2xl z-10 relative shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Information in Card */}
              <div className="md:w-3/5">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {step.description}
                  </p>
                  
                  <div className="space-y-4">
                    {step.detailedInfo.map((info, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1 rounded-xl shadow">
                          {step.number}.{idx + 1}
                        </div>
                        <span className="text-gray-700 text-lg">{info}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information with enhanced design */}
        <div className="mt-32">
          <h3 className="text-4xl font-bold text-gray-900 mb-16 text-center">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Pothole Indi</span>?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 text-center mb-4">Privacy First</h4>
              <p className="text-gray-600 text-center font-light">
                We don't store any personal data. All information stays on your device.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 text-center mb-4">High Accuracy</h4>
              <p className="text-gray-600 text-center font-light">
                Uses GPS for precise location tracking within 10 meters.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg border border-gray-200/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 text-center mb-4">Instant Sharing</h4>
              <p className="text-gray-600 text-center font-light">
                One-click sharing to Twitter with pre-written messages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;