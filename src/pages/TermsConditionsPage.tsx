import React, { useState, useCallback } from 'react';

const TermsConditionsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "Acceptance of Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            By accessing or using Pothole Indi, you agree to be bound by these Terms & Conditions 
            and all applicable laws and regulations. If you do not agree with any of these terms, 
            you are prohibited from using or accessing this site.
          </p>
          <p className="text-gray-600">
            The materials contained in this website are protected by applicable copyright and 
            trademark law.
          </p>
        </div>
      )
    },
    {
      title: "Use of Service",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            You agree to use our service only for lawful purposes and in a way that does not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Infringe upon the rights of others</li>
            <li>Transmit harmful or malicious content</li>
            <li>Interfere with the proper functioning of our service</li>
            <li>Attempt to gain unauthorized access to our systems</li>
          </ul>
          <p className="text-gray-600">
            We reserve the right to terminate your access to our service without notice 
            if you violate any of these terms.
          </p>
        </div>
      )
    },
    {
      title: "Intellectual Property",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Unless otherwise stated, Pothole Indi and/or its licensors own the intellectual 
            property rights for all material on this website. All intellectual property rights 
            are reserved.
          </p>
          <p className="text-gray-600">
            You may view and/or print pages for your personal use subject to restrictions 
            set in these terms and conditions.
          </p>
          <p className="text-gray-600">
            You must not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Republish material from this website</li>
            <li>Sell, rent, or sub-license material from the website</li>
            <li>Reproduce, duplicate, or copy content</li>
            <li>Redistribute content from Pothole Indi</li>
          </ul>
        </div>
      )
    },
    {
      title: "Limitations of Liability",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            In no event shall Pothole Indi or its suppliers be liable for any damages 
            whatsoever including, without limitation, damages for loss of data or profit, 
            or due to business interruption) arising out of the use or inability to use 
            the materials on Pothole Indi's website.
          </p>
          <p className="text-gray-600">
            Because some jurisdictions do not allow limitations on implied warranties, 
            or limitations of liability for consequential or incidental damages, these 
            limitations may not apply to you.
          </p>
        </div>
      )
    },
    {
      title: "Changes to Terms",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">
            We reserve the right, at our sole discretion, to modify or replace these Terms 
            at any time. If a revision is material, we will provide at least 30 days' notice 
            prior to any new terms taking effect.
          </p>
          <p className="text-gray-600">
            What constitutes a material change will be determined at our sole discretion.
          </p>
          <p className="text-gray-600">
            By continuing to access or use our service after those revisions become effective, 
            you agree to be bound by the revised terms. If you do not agree to the new terms, 
            please stop using the service.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <p className="text-gray-700">
              <span className="font-semibold">Last Updated:</span> September 4, 2025
            </p>
          </div>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
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

export default TermsConditionsPage;