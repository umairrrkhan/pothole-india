import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import modiImage from '../assets/modi.png';

/**
 * Props for CertificateModal component
 */
interface CertificateModalProps {
  data: {
    image: string;
    location: {
      latitude: number;
      longitude: number;
    };
    date: string;
    time: string;
  };
  onClose: () => void;
}

/**
 * CertificateModal component displays generated certificates
 * Includes Twitter sharing functionality with image attachment and download option
 */
const CertificateModal: React.FC<CertificateModalProps> = ({ data, onClose }) => {
  const [isPreparingShare, setIsPreparingShare] = useState(false);
  const [certificateBlob, setCertificateBlob] = useState<Blob | null>(null);
  const [isARView, setIsARView] = useState(false);
  const certificateUrlRef = useRef<string | null>(null);

  /**
   * Generates Twitter share URL with pre-written content including Ministry mention
   */
  const generateTwitterShare = () => {
    const tweetText = `🚨 Pothole Reported! 📍 Location: ${data.location.latitude.toFixed(4)}, ${data.location.longitude.toFixed(4)} 📅 ${data.date} ⏰ ${data.time}

@MoRTHIndia Please take necessary action to fix this pothole. Report potholes at Pothole Indi and make our roads safer!

#PotholeIndi #RoadSafety #India`;
    const encodedText = encodeURIComponent(tweetText);
    return `https://twitter.com/intent/tweet?text=${encodedText}`;
  };

  /**
   * Creates certificate as a Blob for sharing
   */
  const createCertificateBlob = (): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      // Create canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Create image elements
      const potholeImage = new Image();
      const logoImg = new Image();
      const modiImg = new Image();

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
      ctx.fillText('- Pothole Indi Initiative in collaboration with Government of India', canvas.width / 2, 890);

      // Footer
      ctx.fillStyle = '#000000';
      ctx.font = '14px Inter';
      ctx.fillText('Generated by Pothole Indi - Making Indian roads safer', canvas.width / 2, 940);
      ctx.fillText('Report more at: pothole-indi.vercel.app', canvas.width / 2, 960);
      ctx.fillText('Certificate ID: PI-' + Date.now(), canvas.width / 2, 980);

      // Try to load images and redraw if successful
      const tryDrawImage = (img: HTMLImageElement, x: number, y: number, width: number, height: number) => {
        try {
          if (img.complete && img.naturalWidth !== 0) {
            ctx.drawImage(img, x, y, width, height);
          }
        } catch (e) {
          console.warn('Failed to draw image:', e);
        }
      };

      // Track loaded images
      let loadedImages = 0;
      const totalImages = 3;
      
      const checkAllImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          // All images loaded, resolve with updated canvas
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              // Fallback to the placeholder version
              canvas.toBlob((fallbackBlob) => {
                resolve(fallbackBlob || new Blob());
              });
            }
          });
        }
      };

      // Set up image loading with CORS
      potholeImage.crossOrigin = 'Anonymous';
      potholeImage.src = data.image;
      potholeImage.onload = () => {
        tryDrawImage(potholeImage, 150, 320, 500, 300);
        checkAllImagesLoaded();
      };
      potholeImage.onerror = () => checkAllImagesLoaded(); // Still resolve even if image fails to load
      
      logoImg.src = logo;
      logoImg.onload = () => {
        tryDrawImage(logoImg, 50, 650, 100, 100);
        checkAllImagesLoaded();
      };
      logoImg.onerror = () => checkAllImagesLoaded(); // Still resolve even if image fails to load
      
      modiImg.src = modiImage;
      modiImg.onload = () => {
        tryDrawImage(modiImg, 600, 650, 200, 200);
        checkAllImagesLoaded();
      };
      modiImg.onerror = () => checkAllImagesLoaded(); // Still resolve even if image fails to load

      // Set a timeout to resolve even if images don't load
      setTimeout(() => {
        if (loadedImages < totalImages) {
          console.warn('Timeout waiting for images to load, resolving with current canvas');
          canvas.toBlob((blob) => {
            resolve(blob || new Blob());
          });
        }
      }, 5000); // 5 second timeout
    });
  };

  /**
   * Downloads the certificate as an image
   */
  const downloadCertificate = async () => {
    try {
      // Create blob if not already created
      let blob = certificateBlob;
      if (!blob) {
        blob = await createCertificateBlob();
        setCertificateBlob(blob);
      }

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
    } catch (error) {
      console.error('Error downloading certificate:', error);
      // Fallback to old method if there's an error
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Set canvas dimensions to match the main certificate
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

        // Add title
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 36px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('POTHOLE REPORT CERTIFICATE', canvas.width / 2, 130);

        // Official statement
        ctx.font = '20px Inter';
        ctx.fillText('Official Report - Pothole Indi Initiative', canvas.width / 2, 170);

        // Add separator line
        ctx.beginPath();
        ctx.moveTo(50, 200);
        ctx.lineTo(canvas.width - 50, 200);
        ctx.stroke();

        // Add date and time
        ctx.font = '18px Inter';
        ctx.fillText(`Reported on: ${data.date} at ${data.time}`, canvas.width / 2, 240);

        // Add location
        ctx.font = '16px Inter';
        ctx.fillText(`Location: ${data.location.latitude.toFixed(6)}, ${data.location.longitude.toFixed(6)}`, canvas.width / 2, 270);
        
        // Add Google Maps link
        const mapsLink = `https://maps.google.com/?q=${data.location.latitude},${data.location.longitude}`;
        ctx.font = '14px Inter';
        ctx.fillStyle = '#0066CC';
        ctx.fillText(mapsLink, canvas.width / 2, 290);

        // Add pothole image placeholder
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
        ctx.fillText('- Pothole Indi Initiative in collaboration with Government of India', canvas.width / 2, 890);

        // Footer
        ctx.fillStyle = '#000000';
        ctx.font = '14px Inter';
        ctx.fillText('Generated by Pothole Indi - Making Indian roads safer', canvas.width / 2, 940);
        ctx.fillText('Report more at: pothole-indi.vercel.app', canvas.width / 2, 960);
        ctx.fillText('Certificate ID: PI-' + Date.now(), canvas.width / 2, 980);

        // Create download link
        const link = document.createElement('a');
        link.download = `pothole-certificate-${data.date.replace(/\//g, '-')}.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  /**
   * Prepares certificate for sharing on Twitter with image
   * Downloads the certificate and provides sharing instructions
   */
  const prepareTwitterShareWithImage = async () => {
    setIsPreparingShare(true);
    
    try {
      // Create blob if not already created
      let blob = certificateBlob;
      if (!blob) {
        blob = await createCertificateBlob();
        setCertificateBlob(blob);
      }

      // Create object URL for the blob
      if (certificateUrlRef.current) {
        URL.revokeObjectURL(certificateUrlRef.current);
      }
      certificateUrlRef.current = URL.createObjectURL(blob);
      
      // Download the certificate
      const link = document.createElement('a');
      link.download = `pothole-certificate-${data.date.replace(/\//g, '-')}.png`;
      link.href = certificateUrlRef.current;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Give some time for the download to start
      setTimeout(() => {
        // Open Twitter with pre-filled text
        window.open(generateTwitterShare(), '_blank');
        setIsPreparingShare(false);
      }, 1500);
    } catch (error) {
      console.error('Error preparing Twitter share:', error);
      setIsPreparingShare(false);
      // Fallback to just opening Twitter
      window.open(generateTwitterShare(), '_blank');
    }
  };

  // Clean up object URLs on unmount
  React.useEffect(() => {
    return () => {
      if (certificateUrlRef.current) {
        URL.revokeObjectURL(certificateUrlRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto border border-gray-700"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-t-2xl flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-bold">Pothole Report Certificate</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl transition-colors duration-200"
          >
            ×
          </button>
        </div>

        {/* Certificate Content */}
        <div className="p-6">
          {/* AR View Toggle */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsARView(!isARView)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isARView
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {isARView ? 'Exit AR View' : 'View in AR'}
            </button>
          </div>

          {/* Certificate Details */}
          <div className="bg-gray-700/50 p-4 rounded-lg mb-4 border border-gray-600">
            <h3 className="text-lg font-semibold mb-2 text-white">Certificate Details</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300"><strong className="text-white">Reported on:</strong> {data.date} at {data.time}</p>
              <p className="text-gray-300"><strong className="text-white">Location:</strong> {data.location.latitude.toFixed(6)}, {data.location.longitude.toFixed(6)}</p>
              <p className="text-gray-300">
                <strong className="text-white">Google Maps:</strong>{' '}
                <a
                  href={`https://maps.google.com/?q=${data.location.latitude},${data.location.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  View on Map
                </a>
              </p>
            </div>
          </div>

          {/* AR View or Regular View */}
          {isARView ? (
            <div className="mb-4 relative bg-gray-900 rounded-xl overflow-hidden border-2 border-cyan-500/30 h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"></div>
              <div className="relative z-10 text-center p-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">AR Visualization</h3>
                <p className="text-gray-300 mb-4">
                  This pothole has been reported to authorities. In AR mode, you would see its location relative to your surroundings.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <div className="text-cyan-400 font-bold">{data.location.latitude.toFixed(4)}</div>
                    <div className="text-xs text-gray-400">Latitude</div>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <div className="text-cyan-400 font-bold">{data.location.longitude.toFixed(4)}</div>
                    <div className="text-xs text-gray-400">Longitude</div>
                  </div>
                </div>
              </div>
              {/* Simulated AR elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-8 right-6 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-10 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
          ) : (
            <>
              {/* Image Preview */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-white">Pothole Image</h3>
                <div className="relative rounded-xl overflow-hidden border-4 border-cyan-500/30 shadow-xl">
                  <img
                    src={data.image}
                    alt="Reported pothole"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-sm font-medium py-2 px-3 rounded-full">
                    Preview
                  </div>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className="mb-4 bg-gradient-to-b from-orange-500 via-white to-green-500 p-1 rounded-xl border-2 border-gray-700">
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-center mb-6">
                    <img src={logo} alt="Pothole Indi Logo" className="w-20 h-20 mx-auto mb-2" />
                    <h3 className="text-xl font-bold">POTHOLE REPORT CERTIFICATE</h3>
                    <p className="text-sm text-gray-600">Official Report - Pothole Indi Initiative</p>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 py-4 my-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold">Date & Time</p>
                        <p>{data.date} at {data.time}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p>{data.location.latitude.toFixed(6)}, {data.location.longitude.toFixed(6)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-center">
                      <img src={logo} alt="Pothole Indi Logo" className="w-24 h-24 mx-auto mb-1" />
                      <p className="text-xs">Official Logo</p>
                    </div>
                    <div className="text-center">
                      <img src={modiImage} alt="PM Modi" className="w-48 h-48 mx-auto mb-1" />
                      <p className="text-xs text-gray-600">PM Modi</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="font-semibold text-sm">"Building safer roads for a better India"</p>
                    <p className="text-xs text-gray-600 mt-1">- Pothole Indi Initiative in collaboration with Government of India</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Download Certificate */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={downloadCertificate}
              className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-colors duration-200 border border-gray-600"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Certificate
            </motion.button>

            {/* Share on Twitter with Image */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={prepareTwitterShareWithImage}
              disabled={isPreparingShare}
              className={`flex items-center justify-center py-3 px-4 rounded-lg transition-colors duration-200 text-center ${
                isPreparingShare
                  ? 'bg-gray-600 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:from-cyan-700 hover:to-blue-800'
              }`}
            >
              {isPreparingShare ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Preparing Share...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  Share on Twitter
                </>
              )}
            </motion.button>
          </div>

          {/* Twitter Sharing Instructions */}
          {isPreparingShare && (
            <div className="mt-4 p-4 bg-cyan-900/30 border border-cyan-700/50 rounded-lg">
              <h4 className="font-bold text-cyan-300 mb-2">How to share on Twitter:</h4>
              <p className="text-sm text-cyan-200">
                A certificate has been downloaded to your device. In the Twitter window that opens, 
                attach the downloaded certificate image and click "Tweet" to share your report 
                with the Ministry of Road Transport and Highways (@MoRTHIndia).
              </p>
            </div>
          )}

          {/* Original Twitter Share Link (as fallback) */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Or share directly without image:
            </p>
            <a
              href={generateTwitterShare()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium underline"
            >
              Share on Twitter (text only)
            </a>
          </div>

          {/* Social Sharing */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Help spread awareness by sharing this report!
            </p>
            <div className="flex justify-center space-x-2">
              <a
                href={`https://wa.me/?text=I%20just%20reported%20a%20pothole%20using%20Pothole%20Indi!%20Let's%20make%20our%20roads%20safer.%20Visit:%20pothole-indi.vercel.app`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=pothole-indi.vercel.app`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateModal;