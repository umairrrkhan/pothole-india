import React, { useState, useEffect } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  active: boolean;
}

const InteractiveBackground: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    // Create dots in a grid pattern
    const newDots: Dot[] = [];
    const spacing = 40; // Space between dots
    const dotSize = 3;  // Base size of dots
    
    // Calculate how many dots we need based on screen size
    const cols = Math.ceil(window.innerWidth / spacing);
    const rows = Math.ceil(window.innerHeight / spacing);
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        newDots.push({
          id: i * cols + j,
          x: j * spacing,
          y: i * spacing,
          size: dotSize + Math.random() * 2, // Slight variation in size
          active: false
        });
      }
    }
    
    setDots(newDots);
  }, []);

  const handleMouseEnter = (id: number) => {
    setDots(prev => prev.map(dot => 
      dot.id === id ? { ...dot, active: true } : dot
    ));
  };

  const handleMouseLeave = (id: number) => {
    setDots(prev => prev.map(dot => 
      dot.id === id ? { ...dot, active: false } : dot
    ));
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map(dot => (
        <div
          key={dot.id}
          className={`absolute rounded-full transition-all duration-300 ease-out ${
            dot.active 
              ? 'bg-blue-500 opacity-80 scale-150' 
              : 'bg-gray-300 opacity-30'
          }`}
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          onMouseEnter={() => handleMouseEnter(dot.id)}
          onMouseLeave={() => handleMouseLeave(dot.id)}
        />
      ))}
    </div>
  );
};

export default InteractiveBackground;