import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';  
import HowItWorks from './components/HowItWorks';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CertificateModal from './components/CertificateModal';
import ContactPage from './pages/ContactPage';
import AdvertisementPage from './pages/AdvertisementPage';
import GSTPage from './pages/GSTPage';
import './App.css';

/**
 * Main App component for Pothole Indi with routing
 * Coordinates all sections and manages global state
 */
function App() {
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);

  /**
   * Handles certificate generation after image capture
   * @param {Object} data - Contains image, location, and date information
   */
  const handleCertificateGeneration = (data: any) => {
    setCertificateData(data);
    setShowCertificateModal(true);
  };

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
            <HeroSection onCertificateGenerate={handleCertificateGeneration} />

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
  ]);

  return (
    <div className="min-h-screen bg-white text-black">
      <RouterProvider router={router} />
      
      {/* Certificate Modal */}
      {showCertificateModal && certificateData && (
        <CertificateModal
          data={certificateData}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
}

export default App;
