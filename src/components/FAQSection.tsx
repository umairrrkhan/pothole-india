import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FAQSection component with enhanced design aesthetics
 * Features smooth animations and improved performance
 */
const FAQSection: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: number, text: string, isUser: boolean}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

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
              className="text-cyan-400 hover:text-cyan-300 font-mono font-bold flex items-center bg-cyan-900/30 hover:bg-cyan-900/50 px-4 py-2 rounded-lg transition-all duration-200 border border-cyan-700/50"
            >
              allwingsai@gmail.com
              {copiedEmail === 'allwingsai@gmail.com' && (
                <span className="ml-3 text-xs bg-cyan-800 text-cyan-200 px-2 py-1 rounded border border-cyan-600">Copied!</span>
              )}
            </button>
            <button 
              onClick={() => handleCopyEmail('umairh1819@gmail.com')}
              className="text-cyan-400 hover:text-cyan-300 font-mono font-bold flex items-center bg-cyan-900/30 hover:bg-cyan-900/50 px-4 py-2 rounded-lg transition-all duration-200 border border-cyan-700/50"
            >
              umairh1819@gmail.com
              {copiedEmail === 'umairh1819@gmail.com' && (
                <span className="ml-3 text-xs bg-cyan-800 text-cyan-200 px-2 py-1 rounded border border-cyan-600">Copied!</span>
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

  /**
   * Handles sending a message in the AI chat
   */
  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: currentMessage,
      isUser: true
    };
    
    setChatMessages(prev => [...prev, newUserMessage]);
    const userMessage = currentMessage;
    setCurrentMessage('');
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let aiResponse = "I'm here to help! For specific questions, you can also check our FAQ section. ";
      
      // Simple keyword matching for demo purposes
      if (userMessage.toLowerCase().includes('privacy') || userMessage.toLowerCase().includes('data')) {
        aiResponse = "We take your privacy seriously. All data stays on your device and is never stored on our servers. Your location and images are processed locally in your browser.";
      } else if (userMessage.toLowerCase().includes('report') || userMessage.toLowerCase().includes('pothole')) {
        aiResponse = "To report a pothole, simply click the 'Capture Pothole Photo' button on our homepage, take a photo, and generate a certificate. You can then share it with authorities or on social media.";
      } else if (userMessage.toLowerCase().includes('certificate')) {
        aiResponse = "Certificates are generated instantly in your browser and contain the pothole image, GPS coordinates, and timestamp. They're never stored on our servers.";
      } else if (userMessage.toLowerCase().includes('thank')) {
        aiResponse = "You're welcome! Is there anything else I can help you with regarding road safety?";
      }
      
      const newAiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false
      };
      
      setChatMessages(prev => [...prev, newAiMessage]);
    }, 1000);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-3xl"></div>
        <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header with enhanced design */}
        <div className="text-center mb-16">
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
                <span className="text-lg font-medium text-cyan-300">Help & Support</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Frequently Asked <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Questions</span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Find answers to common questions about Pothole Indi
          </motion.p>
        </div>

        {/* FAQ List with enhanced design and smooth animations */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Question Header with enhanced design */}
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors duration-300 group"
              >
                <h3 className="text-xl font-semibold text-white pr-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {faq.question}
                </h3>
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <div className="absolute w-10 h-10 rounded-xl bg-cyan-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-cyan-700/50"></div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ease-out ${
                      openQuestion === index ? 'rotate-180 text-cyan-400' : ''
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
                </div>
              </button>

              {/* Answer Content with Improved Smooth Animation */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  openQuestion === index 
                    ? 'max-h-[1000px] opacity-100 pb-6' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8">
                  <div className="pl-6 border-l-2 border-cyan-500/50">
                    {typeof faq.answer === 'string' ? (
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    ) : (
                      <div className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Help Section with enhanced design */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-10 border border-gray-700/50 shadow-xl relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Still have questions?
              </h3>
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full mb-6"
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              ></motion.div>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto text-lg">
                We're here to help! Reach out to us directly for personalized assistance.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/contact"
                  className="flex items-center bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                  <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
                
                <div className="hidden sm:block w-px h-12 bg-gray-600"></div>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/advertise"
                  className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Advertise with Us
                  <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
              
              {/* AI Chat Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="mt-8 flex items-center justify-center mx-auto bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Chat with our AI Assistant
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* AI Chat Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-t-2xl flex justify-between items-center border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-bold">AI Assistant</h2>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Hello! How can I help you today?</h3>
                  <p className="text-gray-400 mb-6">Ask me anything about pothole reporting, privacy, or how Pothole Indi works.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
                    {[
                      "How do I report a pothole?",
                      "Is my data private?",
                      "How accurate is the location?",
                      "Can I share reports?"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentMessage(suggestion);
                          setTimeout(handleSendMessage, 100);
                        }}
                        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm transition-colors duration-200 text-left"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.isUser 
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-br-none' 
                            : 'bg-gray-700 text-white rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 text-white rounded-l-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim()}
                  className={`bg-gradient-to-r px-6 py-3 rounded-r-2xl font-medium ${
                    currentMessage.trim()
                      ? 'from-cyan-600 to-blue-700 text-white hover:from-cyan-700 hover:to-blue-800'
                      : 'from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default FAQSection;