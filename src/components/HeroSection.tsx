import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Props for HeroSection component
 */
interface HeroSectionProps {
  onCertificateGenerate: (data: any) => void;
}

/**
 * Hero section component for Pothole Indi landing page with futuristic design
 * Features enhanced image capture, disclaimer, and certificate generation
 */
const HeroSection: React.FC<HeroSectionProps> = ({ onCertificateGenerate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  // Initialize particles for background effect
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1
    }));
    setParticles(newParticles);
  }, []);

  /**
   * Handles image capture from file input
   * @param {React.ChangeEvent<HTMLInputElement>} event - File input change event
   */
  const handleImageCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        getCurrentLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Gets current geolocation
   */
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to mock location if geolocation fails
          setLocation({
            coords: {
              latitude: 28.6139,
              longitude: 77.2090,
              accuracy: 100,
              altitude: null,
              altitudeAccuracy: null,
              heading: null,
              speed: null,
            },
            timestamp: Date.now(),
          } as GeolocationPosition);
        }
      );
    }
  };

  /**
   * Generates certificate with current data
   */
  const generateCertificate = () => {
    if (capturedImage && location) {
      setIsProcessing(true);
      
      const certificateData = {
        image: capturedImage,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        date: new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
        time: new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setTimeout(() => {
        setIsProcessing(false);
        onCertificateGenerate(certificateData);
      }, 1000);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400 opacity-20"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Geometric shapes for futuristic design */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 border border-blue-500 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-48 h-48 border border-indigo-500 opacity-20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-10 blur-2xl rounded-full"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Content with futuristic design */}
        <div className="text-center mb-12">
          <motion.div 
            className="inline-block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl px-6 py-3 shadow-lg backdrop-blur-sm">
                <span className="text-lg font-medium text-cyan-300">Making Indian roads safer</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Report Potholes,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Save Lives</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Help make Indian roads safer by reporting potholes instantly.
            Generate certificates with location and date for official records.
          </motion.p>

          {/* Enhanced Disclaimer with futuristic design */}
          <motion.div 
            className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-700/50 rounded-2xl p-6 mb-12 max-w-lg mx-auto shadow-lg backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 mr-4">
                <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center border border-amber-700/50">
                  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-amber-300 mb-1">Privacy First</h3>
                <p className="text-sm text-amber-200">
                  We do not store any user data. Your privacy is our priority.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Image Capture Section */}
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl border border-gray-700/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Decorative element */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Capture Pothole Image
            </h2>

            {/* File Upload with enhanced styling */}
            <div className="mb-8">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageCapture}
                className="hidden"
                capture="environment"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-cyan-700 hover:to-blue-800 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-700 to-blue-800 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <svg className="w-7 h-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Capture Pothole Photo
              </motion.button>
            </div>

            {/* Image Preview with enhanced styling */}
            {capturedImage && (
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl overflow-hidden border-4 border-cyan-500/30 shadow-xl">
                  <img
                    src={capturedImage}
                    alt="Captured pothole"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-sm font-medium py-2 px-3 rounded-full">
                    Preview
                  </div>
                </div>
              </motion.div>
            )}

            {/* Location Info with enhanced styling */}
            {location && (
              <motion.div 
                className="bg-gray-700/30 backdrop-blur-sm p-6 rounded-2xl mb-8 border border-gray-600/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center mr-3 border border-cyan-700/50">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-white text-lg">Location Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Coordinates</p>
                    <p className="text-base font-medium text-white mt-1">
                      {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Date</p>
                    <p className="text-base font-medium text-white mt-1">
                      {new Date().toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Generate Certificate Button with enhanced styling */}
            {capturedImage && location && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateCertificate}
                disabled={isProcessing}
                className={`w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center ${
                  isProcessing
                    ? 'bg-gray-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-green-700 text-white hover:from-emerald-700 hover:to-green-800 shadow-xl hover:shadow-2xl'
                } group relative overflow-hidden`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Certificate...
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-800 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <svg className="w-7 h-7 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Generate Certificate
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Enhanced Promotional Section with futuristic aesthetics */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-block">
            <p className="text-2xl font-medium text-white mb-3">
              Together for safer Indian roads
            </p>
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow"></div>
              <p className="text-lg text-gray-300 mx-4 max-w-md">
                Join thousands of citizens making a difference in road safety
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;