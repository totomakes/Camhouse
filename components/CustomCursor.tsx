
import React, { useState, useEffect } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor border-primary transition-transform duration-150 ${isClicking ? 'scale-75' : ''} ${isPointer ? 'w-16 h-16' : 'w-10 h-10'}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="absolute inset-0 border border-black opacity-10 pointer-events-none"></div>
      <div className="w-[1px] h-[1px] bg-primary"></div>
      {/* Corner Brackets (Viewfinder Style) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
    </div>
  );
};

export default CustomCursor;
