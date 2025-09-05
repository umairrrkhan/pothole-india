import React, { useEffect, useRef } from 'react';

/**
 * Optimized background component with minimal re-renders and efficient animations
 * Uses CSS animations instead of JavaScript for better performance
 */
const OptimizedBackground: React.FC = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Use CSS animations for better performance (60fps/120fps)
  useEffect(() => {
    if (!backgroundRef.current) return;

    // Create CSS keyframes for smooth animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blobAnimation {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
      
      .blob {
        animation: blobAnimation 20s infinite cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .blob-1 { animation-delay: 0s; }
      .blob-2 { animation-delay: 4s; }
      .blob-3 { animation-delay: 8s; }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="blob blob-1 absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="blob blob-2 absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="blob blob-3 absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
    </div>
  );
};

export default OptimizedBackground;