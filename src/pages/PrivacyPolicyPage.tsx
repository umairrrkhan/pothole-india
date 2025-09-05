import React, { useState, useCallback } from 'react';

const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Information We Collect",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            We collect information you provide directly to us when using our services, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Photos of potholes that you upload to our platform</li>
            <li>Location data associated with your pothole reports</li>
            <li>Contact information when you communicate with us</li>
          </ul>
          <p className="text-gray-600">
            We do not collect personal identification information unless you voluntarily provide it.
          </p>
        </div>
      )
    },
    {
      title: "How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Generate pothole report certificates</li>
            <li>Improve our services and user experience</li>
            <li>Respond to your inquiries and provide support</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="text-gray-600">
            We do not sell, trade, or rent your personal information to third parties.
          </p>
        </div>
      )
    },
    {
      title: "Data Storage and Security",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            We implement appropriate security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>All data is processed locally on your device</li>
            <li>We do not store any user data on our servers</li>
            <li>Pothole photos are not retained after processing</li>
            <li>Location data is only used for certificate generation</li>
          </ul>
          <p className="text-gray-600">
            While we strive to protect your information, no method of transmission over the Internet 
            or electronic storage is 100% secure.
          </p>
        </div>
      )
    },
    {
      title: "Your Rights",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            You have the following rights regarding your information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Right to access information we hold about you</li>
            <li>Right to request correction of inaccurate information</li>
            <li>Right to request deletion of your information</li>
            <li>Right to object to processing of your information</li>
          </ul>
          <p className="text-gray-600">
            To exercise these rights, please contact us using the information provided below.
          </p>
        </div>
      )
    },
    {
      title: "Contact Us",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> allwingsai@gmail.com
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Email:</span> umairh1819@gmail.com
            </p>
          </div>
          <p className="text-gray-600 mt-4">
            This Privacy Policy was last updated on: September 4, 2025
          </p>
        </div>
      )
    }
  ];

  // Optimized navigation handlers
  const goToPrevious = useCallback(() => {
    setActiveSection(prev => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setActiveSection(prev => Math.min(sections.length - 1, prev + 1));
  }, [sections.length]);

  const goToSection = useCallback((index: number) => {
    setActiveSection(index);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Section {activeSection + 1} of {sections.length}</span>
              <span>{Math.round(((activeSection + 1) / sections.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Slide content with optimized transitions */}
          <div className="min-h-[300px] relative">
            <div 
              className="absolute inset-0 transition-all duration-200 ease-out"
              style={{ 
                transform: `translateX(${activeSection * -100}%)`,
                width: `${sections.length * 100}%`,
                display: 'flex'
              }}
            >
              {sections.map((section, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 p-4"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">{section.title}</h2>
                  {section.content}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={goToPrevious}
              disabled={activeSection === 0}
              className={`py-2 px-6 rounded-lg font-medium transition glass-button ${
                activeSection === 0 
                  ? 'bg-gray-200/50 text-gray-500 cursor-not-allowed' 
                  : 'bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 hover:bg-white/40'
              }`}
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeSection 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              disabled={activeSection === sections.length - 1}
              className={`py-2 px-6 rounded-lg font-medium transition glass-button ${
                activeSection === sections.length - 1 
                  ? 'bg-gray-200/50 text-gray-500 cursor-not-allowed' 
                  : 'bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 hover:bg-white/40'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;