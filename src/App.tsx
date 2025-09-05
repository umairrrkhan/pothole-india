import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';  
import HowItWorks from './components/HowItWorks';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import AdvertisementPage from './pages/AdvertisementPage';
import GSTPage from './pages/GSTPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import './App.css';

/**
 * Main App component for Pothole Indi with routing
 * Coordinates all sections and manages global state
 */
function App() {
  // Create router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="min-h-screen bg-white text-black">
          {/* Header with enhanced design */}
          <Header />
          
          {/* Main content sections */}
          <main>
            {/* Hero Section */}
            <HeroSection onCertificateGenerate={() => {}} />

            {/* How It Works Section */}
            <HowItWorks />

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer */}
            <Footer />
          </main>
        </div>
      ),
    },
    {
      path: "/contact",
      element: (
        <div className="min-h-screen bg-white text-black">
          {/* Header with enhanced design */}
          <Header />
          
          {/* Main content sections */}
          <main>
            <ContactPage />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      ),
    },
    {
      path: "/advertise",
      element: (
        <div className="min-h-screen bg-white text-black">
          {/* Header with enhanced design */}
          <Header />
          
          {/* Main content sections */}
          <main>
            <AdvertisementPage />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      ),
    },
    {
      path: "/gst",
      element: (
        <div className="min-h-screen bg-white text-black">
          {/* Header with enhanced design */}
          <Header />
          
          {/* Main content sections */}
          <main>
            <GSTPage />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <div className="min-h-screen bg-white text-black">
          {/* Header with enhanced design */}
          <Header />
          
          {/* Main content sections */}
          <main>
            <PrivacyPolicyPage />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      ),
    },
    {
      path: "/terms-conditions",
      element: (
        <div className="min-h-screen bg-white text-black">
          {/* Header with enhanced design */}
          <Header />
          
          {/* Main content sections */}
          <main>
            <TermsConditionsPage />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      ),
    },
  ]);

  return (
    <div className="min-h-screen bg-white text-black">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;