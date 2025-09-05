import React, { useState } from 'react';

/**
 * ContactPage component for Pothole Indi with liquid glass design
 * Provides professional contact information with enhanced aesthetics
 */
const ContactPage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState('');

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(''), 2000); // Reset after 2 seconds
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header with enhanced design */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? Get in touch with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* Contact Information with glass design */}
          <div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 h-full">
              <h2 className="text-2xl font-bold text-black mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black mb-2">Email</h3>
                    <div className="space-y-2">
                      <button 
                        onClick={() => handleCopyEmail('allwingsai@gmail.com')}
                        className="text-gray-600 hover:text-blue-600 underline flex items-center w-full text-left glass-button py-2 px-4 rounded-lg"
                      >
                        allwingsai@gmail.com
                        {copiedEmail === 'allwingsai@gmail.com' && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Copied!</span>
                        )}
                      </button>
                      <button 
                        onClick={() => handleCopyEmail('umairh1819@gmail.com')}
                        className="text-gray-600 hover:text-blue-600 underline flex items-center w-full text-left glass-button py-2 px-4 rounded-lg"
                      >
                        umairh1819@gmail.com
                        {copiedEmail === 'umairh1819@gmail.com' && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Copied!</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;