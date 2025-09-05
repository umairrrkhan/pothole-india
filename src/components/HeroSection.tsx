import React, { useRef, useState, useCallback, memo } from 'react';
import OptimizedBackground from './OptimizedBackground';
import logoImage from '../assets/logo.png';
import modiImage from '../assets/modi.png';

/**
 * Props for HeroSection component
 */
interface HeroSectionProps {
}

/**
 * Optimized Hero section component for Pothole Indi landing page
 * Features efficient background animations and minimal re-renders for 120fps performance
 */
const HeroSection: React.FC<HeroSectionProps> = memo(() => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [certificateData, setCertificateData] = useState<{
    image: string;
    location: {
      latitude: number;
      longitude: number;
    };
    date: string;
    time: string;
  } | null>(null);

  /**
   * Optimized geolocation handler
   */
  const getCurrentLocation = useCallback(() => {
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
  }, []);

  /**
   * Optimized image capture handler with useCallback
   */
  const handleImageCapture = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        getCurrentLocation();
      };
      reader.readAsDataURL(file);
    }
  }, [getCurrentLocation]);

  // Removed certificate-related state and functions
  // const [certificateData, setCertificateData] = useState<any>(null);
  // const [showCertificate, setShowCertificate] = useState(false);
  // const closeCertificate =... [truncated]

  /**
   * Optimized certificate generation
   */
  const generateCertificate = useCallback(() => {
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

      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsProcessing(false);
          setCertificateData(certificateData);
        }, 300);
      });
    }
  }, [capturedImage, location]);

  /**
   * Downloads the certificate as an image
   */
  const downloadCertificate = useCallback((data: {
    image: string;
    location: {
      latitude: number;
      longitude: number;
    };
    date: string;
    time: string;
  }) => {
    try {
      // Create canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        alert('Could not get canvas context');
        return;
      }

      // Set canvas dimensions
      canvas.width = 800;
      canvas.height = 1000;

      // White background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add border
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Add decorative elements
      ctx.fillStyle = '#ff9933'; // Saffron color
      ctx.fillRect(0, 0, canvas.width, 30);
      ctx.fillStyle = '#ffffff'; // White color
      ctx.fillRect(0, 30, canvas.width, 30);
      ctx.fillStyle = '#138808'; // Green color
      ctx.fillRect(0, 60, canvas.width, 30);

      // Title
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 36px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('POTHOLE REPORT CERTIFICATE', canvas.width / 2, 130);

      // Official statement
      ctx.font = '20px Inter';
      ctx.fillText('Official Report - Pothole Indi Initiative', canvas.width / 2, 170);

      // Divider
      ctx.beginPath();
      ctx.moveTo(50, 200);
      ctx.lineTo(canvas.width - 50, 200);
      ctx.stroke();

      // Date and Time
      ctx.font = '18px Inter';
      ctx.fillText(`Reported on: ${data.date} at ${data.time}`, canvas.width / 2, 240);

      // Location
      ctx.font = '16px Inter';
      ctx.fillText(`Location: ${data.location.latitude.toFixed(6)}, ${data.location.longitude.toFixed(6)}`, canvas.width / 2, 270);

      // Add Google Maps link text
      const mapsLink = `https://maps.google.com/?q=${data.location.latitude},${data.location.longitude}`;
      ctx.font = '14px Inter';
      ctx.fillStyle = '#0066CC';
      ctx.fillText(mapsLink, canvas.width / 2, 290);

      // Add pothole image placeholder (will be replaced if image loads)
      ctx.fillStyle = '#F0F0F0';
      ctx.fillRect(150, 320, 500, 300);
      ctx.fillStyle = '#666666';
      ctx.font = '16px Inter';
      ctx.fillText('Pothole Image', canvas.width / 2, 470);
      ctx.fillStyle = '#999999';
      ctx.font = '14px Inter';
      ctx.fillText('(Image from your report)', canvas.width / 2, 490);

      // Add logo placeholders
      ctx.fillStyle = '#F0F0F0';
      ctx.fillRect(50, 650, 100, 100);
      ctx.fillStyle = '#000000';
      ctx.font = '12px Inter';
      ctx.fillText('Official Logo', 100, 710);

      ctx.fillStyle = '#F0F0F0';
      ctx.fillRect(600, 650, 200, 200);
      ctx.fillStyle = '#000000';
      ctx.font = '12px Inter';
      ctx.fillText('PM Modi', 700, 760);

      // Government message
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 16px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('"Building safer roads for a better India"', canvas.width / 2, 870);
      ctx.font = '14px Inter';
      ctx.fillText('- Pothole Indi Initiative', canvas.width / 2, 890);

      // Footer
      ctx.fillStyle = '#000000';
      ctx.font = '14px Inter';
      ctx.fillText('Generated by Pothole Indi - Making Indian roads safer', canvas.width / 2, 940);
      ctx.fillText('Report more at: pothole-indi.vercel.app', canvas.width / 2, 960);
      ctx.fillText('Certificate ID: PI-' + Date.now(), canvas.width / 2, 980);

      // Create a helper function to load images with proper CORS handling
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
          img.src = src;
        });
      };

      // Load all images and draw them on the canvas
      Promise.all([
        loadImage(data.image).catch(() => null), // Pothole image (may fail due to CORS)
        loadImage(logoImage).catch(() => null),   // Logo image
        loadImage(modiImage).catch(() => null)    // PM Modi image
      ])
        .then(([potholeImg, logoImg, modiImg]) => {
          // Draw pothole image if loaded successfully
          if (potholeImg) {
            try {
              ctx.drawImage(potholeImg, 150, 320, 500, 300);
            } catch (e) {
              console.warn('Failed to draw pothole image:', e);
            }
          }
          
          // Draw logo image if loaded successfully
          if (logoImg) {
            try {
              ctx.drawImage(logoImg, 50, 650, 100, 100);
            } catch (e) {
              console.warn('Failed to draw logo image:', e);
            }
          }
          
          // Draw PM Modi image if loaded successfully
          if (modiImg) {
            try {
              ctx.drawImage(modiImg, 600, 650, 200, 200);
            } catch (e) {
              console.warn('Failed to draw PM Modi image:', e);
            }
          }

          // Convert canvas to blob
          canvas.toBlob((blob) => {
            if (blob) {
              // Create download link
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `pothole-certificate-${data.date.replace(/\//g, '-')}.png`;
              link.href = url;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              // Clean up
              setTimeout(() => URL.revokeObjectURL(url), 100);
            } else {
              alert('Failed to create certificate. Please try again.');
            }
          }, 'image/png');
        })
        .catch((error) => {
          console.error('Error loading images:', error);
          // Even if images fail to load, still create the certificate with placeholders
          canvas.toBlob((blob) => {
            if (blob) {
              // Create download link
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `pothole-certificate-${data.date.replace(/\//g, '-')}.png`;
              link.href = url;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              
              // Clean up
              setTimeout(() => URL.revokeObjectURL(url), 100);
            } else {
              alert('Failed to create certificate. Please try again.');
            }
          }, 'image/png');
        });
    } catch (error) {
      console.error('Error downloading certificate:', error);
      alert('Failed to download certificate. Please try again.');
    }
  }, []);

  /**
   * Shares the certificate on Twitter
   */
  const shareOnTwitter = useCallback((data: {
    image: string;
    location: {
      latitude: number;
      longitude: number;
    };
    date: string;
    time: string;
  }) => {
    // Generate Twitter share URL with pre-written content
    const tweetText = `🚨 Pothole Reported! 📍 Location: ${data.location.latitude.toFixed(4)}, ${data.location.longitude.toFixed(4)} 📅 ${data.date} ⏰ ${data.time}\n\nPlease take necessary action to fix this pothole. Report potholes at Pothole Indi and make our roads safer!\n\n#PotholeIndi #RoadSafety #India`;
    const encodedText = encodeURIComponent(tweetText);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
    
    // Open Twitter in a new tab
    window.open(twitterUrl, '_blank');
    
    // Also download the certificate so the user can attach it manually
    downloadCertificate(data);
  }, [downloadCertificate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Optimized background with CSS animations for 120fps performance */}
      <OptimizedBackground />
      
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Hero Content with optimized rendering */}
        <div className="text-center mb-12">
          {/* Tagline with optimized design */}
          <div className="mb-6">
            <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
              Making Indian roads safer
            </span>
          </div>
          
          {/* Main heading with gradient effect */}
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight leading-tight">
            Report Potholes,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Save Lives</span>
          </h1>
          
          {/* Description with better typography */}
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Help make Indian roads safer by reporting potholes instantly.
            Generate certificates with location and date for official records.
          </p>

          {/* Privacy disclaimer with glass-like effect */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 mb-12 max-w-md mx-auto border border-gray-200 shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5 mr-3">
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Privacy First</h3>
                <p className="text-xs text-gray-600 mt-1">
                  We do not store any user data. Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Capture Section with glass-like design */}
        <div className="max-w-lg mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-gray-200 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              Capture Pothole Image
            </h2>

            {/* File Upload with optimized styling */}
            <div className="mb-8">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageCapture}
                className="hidden"
                capture="environment"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 py-4 px-6 rounded-2xl font-medium text-base hover:bg-white/40 transition-all duration-150 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 glass-button"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Capture Pothole Photo
              </button>
            </div>

            {/* Image Preview with optimized design */}
            {capturedImage && (
              <div className="mb-8">
                <div className="relative rounded-2xl overflow-hidden border-2 border-blue-200 shadow-lg">
                  <img
                    src={capturedImage}
                    alt="Captured pothole"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium py-1.5 px-2.5 rounded-full shadow">
                    Preview
                  </div>
                </div>
              </div>
            )}

            {/* Location Info with glass-like styling */}
            {location && (
              <div className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl mb-6 border border-gray-200 shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">Location Information</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">Coordinates</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <p className="text-xs text-blue-600 uppercase tracking-wide font-medium">Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {new Date().toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Generate Certificate Button with optimized design */}
            {capturedImage && location && (
              <button
                onClick={generateCertificate}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-2xl font-medium text-base transition-all duration-150 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 glass-button ${
                  isProcessing
                    ? 'bg-white/20 backdrop-blur-lg border border-white/30 text-gray-500 cursor-not-allowed'
                    : 'bg-white/30 backdrop-blur-lg border border-white/50 text-gray-800 hover:bg-white/40'
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Certificate...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Generate Certificate
                  </>
                )}
              </button>
            )}

            {/* Certificate Preview - Display inline below the button */}
            {certificateData && (
              <div className="mt-8 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
                  <h3 className="text-xl font-bold text-white text-center">Pothole Report Certificate</h3>
                </div>
                
                <div className="p-6">
                  {/* Certificate Details */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="text-lg font-semibold mb-2">Certificate Details</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Reported on:</strong> {certificateData.date} at {certificateData.time}</p>
                      <p><strong>Location:</strong> {certificateData.location.latitude.toFixed(6)}, {certificateData.location.longitude.toFixed(6)}</p>
                      <p>
                        <strong>Google Maps:</strong>{' '}
                        <a
                          href={`https://maps.google.com/?q=${certificateData.location.latitude},${certificateData.location.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View on Map
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Image Preview */}
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Pothole Image</h4>
                    <img
                      src={certificateData.image}
                      alt="Reported pothole"
                      className="w-full h-64 object-cover rounded-lg border border-gray-200"
                    />
                  </div>

                  {/* Certificate Preview */}
                  <div className="mb-6 bg-gradient-to-b from-orange-500 via-white to-green-500 p-1 rounded-lg">
                    <div className="bg-white p-6 rounded-lg">
                      <div className="text-center mb-6">
                        <div className="w-20 h-20 mx-auto mb-2 rounded-lg overflow-hidden">
                          <img 
                            src={logoImage} 
                            alt="Official Logo" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextSibling?.addEventListener('load', () => {
                                target.style.display = 'block';
                                target.nextSibling?.remove();
                              });
                            }}
                          />
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-xs text-gray-500">Logo</span>
                          </div>
                        </div>
                        <h4 className="text-xl font-bold">POTHOLE REPORT CERTIFICATE</h4>
                        <p className="text-sm text-gray-600">Official Report - Pothole Indi Initiative</p>
                      </div>
                      
                      <div className="border-t border-b border-gray-200 py-4 my-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold">Date & Time</p>
                            <p>{certificateData.date} at {certificateData.time}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Location</p>
                            <p>{certificateData.location.latitude.toFixed(6)}, {certificateData.location.longitude.toFixed(6)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-center">
                          <div className="w-24 h-24 mx-auto mb-1 rounded-lg overflow-hidden">
                            <img 
                              src={logoImage} 
                              alt="Official Logo" 
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextSibling?.addEventListener('load', () => {
                                  target.style.display = 'block';
                                  target.nextSibling?.remove();
                                });
                              }}
                            />
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-500">Logo</span>
                            </div>
                          </div>
                          <p className="text-xs">Official Logo</p>
                        </div>
                        <div className="text-center">
                          <div className="w-48 h-48 mx-auto mb-1 rounded-lg overflow-hidden">
                            <img 
                              src={modiImage} 
                              alt="PM Modi" 
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextSibling?.addEventListener('load', () => {
                                  target.style.display = 'block';
                                  target.nextSibling?.remove();
                                });
                              }}
                            />
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-500">PM Modi</span>
                            </div>
                          </div>
                          <p className="text-xs">PM Modi</p>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="font-semibold text-sm">"Building safer roads for a better India"</p>
                        <p className="text-xs text-gray-600 mt-1">- Pothole Indi Initiative in collaboration with Government of India</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Download Certificate */}
                    <button
                      onClick={() => downloadCertificate(certificateData)}
                      className="flex-1 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                      📥 Download Certificate
                    </button>

                    {/* Share on Twitter with Image */}
                    <button
                      onClick={() => shareOnTwitter(certificateData)}
                      className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      🐦 Share on Twitter with Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Promotional Section with optimized design */}
        <div className="text-center mt-10">
          <p className="text-lg font-medium text-gray-900 mb-2">
            Together for safer Indian roads
          </p>
          <p className="text-sm text-gray-600">
            Join thousands of citizens making a difference in road safety
          </p>
        </div>
      </div>
    </section>
  );
});

export default HeroSection;