import React, { useState } from 'react';

/**
 * FAQSection component with liquid glass design
 * Features glass morphism buttons and enhanced aesthetics
 */
const FAQSection: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState('');

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(''), 2000); // Reset after 2 seconds
  };

  /**
   * FAQ data structure
   */
  const faqs = [
    {
      question: "Is Pothole Indi completely free to use?",
      answer: "Yes, Pothole Indi is 100% free to use. We believe in making road safety accessible to everyone. There are no hidden charges or premium features.",
    },
    {
      question: "Do I need to create an account or provide personal information?",
      answer: "No, you don't need to create an account or provide any personal information. We respect your privacy and don't store any user data. Simply visit the website and start reporting.",
    },
    {
      question: "How accurate is the location data in certificates?",
      answer: "We use your device's GPS to capture location data, which is typically accurate within 10-15 meters. The coordinates are included in your certificate for precise identification of the pothole location.",
    },
    {
      question: "Can I report potholes without an internet connection?",
      answer: "You can capture photos offline, but you'll need an internet connection to generate certificates and share reports. The website works as a Progressive Web App (PWA) for better offline functionality.",
    },
    {
      question: "What happens after I generate a certificate?",
      answer: "The certificate is generated instantly on your device. You can save it to your phone or share it directly on Twitter. We recommend sharing to create awareness and tagging local authorities.",
    },
    {
      question: "Is my data shared with government authorities?",
      answer: "No, we don't automatically share any data with authorities. You have full control over what you share and with whom. The certificates are generated on your device and remain under your control.",
    },
    {
      question: "Can I report multiple potholes at once?",
      answer: "Currently, we support one pothole report at a time for accuracy. You can generate multiple certificates by repeating the process for different locations. Each report gets its own unique certificate.",
    },
    {
      question: "How can I contact Pothole Indi for support?",
      answer: (
        <div>
          <p>You can reach us by copying our email addresses below:</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => handleCopyEmail('allwingsai@gmail.com')}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center bg-white/30 backdrop-blur-lg border border-white/50 hover:bg-white/40 px-4 py-2 rounded-lg transition-all duration-300 glass-button"
            >
              allwingsai@gmail.com
              {copiedEmail === 'allwingsai@gmail.com' && (
                <span className="ml-3 text-xs bg-white/40 text-blue-800 px-2 py-1 rounded border border-white/30">Copied!</span>
              )}
            </button>
            <button 
              onClick={() => handleCopyEmail('umairh1819@gmail.com')}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center bg-white/30 backdrop-blur-lg border border-white/50 hover:bg-white/40 px-4 py-2 rounded-lg transition-all duration-300 glass-button"
            >
              umairh1819@gmail.com
              {copiedEmail === 'umairh1819@gmail.com' && (
                <span className="ml-3 text-xs bg-white/40 text-blue-800 px-2 py-1 rounded border border-white/30">Copied!</span>
              )}
            </button>
          </div>
          <p className="mt-4">We typically respond within 24-48 hours. For urgent matters, please include 'URGENT' in your email subject.</p>
        </div>
      ),
    },
  ];

  /**
   * Toggles FAQ question visibility
   * @param {number} index - Index of the question to toggle
   */
  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        {/* Section Header with enhanced design */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
              Help & Support
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          
          <p className="text-gray-600 max-w-xl mx-auto">
            Find answers to common questions about Pothole Indi
          </p>
        </div>

        {/* FAQ List with glass design */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Question Header with glass design */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/50 transition-all duration-300 glass-button"
              >
                <h3 className="text-base font-medium text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openQuestion === index ? 'rotate-180 text-blue-600' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer Content with glass styling */}
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openQuestion === index 
                    ? 'max-h-96 opacity-100 pb-5 px-6' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-1 border-t border-gray-200/50">
                  {typeof faq.answer === 'string' ? (
                    <p className="text-gray-600 text-sm">
                      {faq.answer}
                    </p>
                  ) : (
                    <div className="text-gray-600 text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help Section with glass design */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We're here to help! Reach out to us directly for personalized assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/contact"
                className="flex items-center bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:bg-white/40 glass-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Us
              </a>
              
              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
              
              <a
                href="/advertise"
                className="flex items-center bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:bg-white/40 glass-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Advertise with Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;