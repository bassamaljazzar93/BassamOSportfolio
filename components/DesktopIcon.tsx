
import React, { useState, useRef, useEffect } from 'react';
import { AppID, IconPosition } from '../types';
import { APP_CONFIG } from '../constants';

interface DesktopIconProps {
  id: AppID;
  label: string;
  onClick: () => void;
  position: IconPosition;
  onPositionChange: (pos: IconPosition) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, onClick, position, onPositionChange }) => {
  const config = APP_CONFIG[id];
  const [isSelected, setIsSelected] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isDragging) {
        onPositionChange({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y
        });
      }
    };
    const handleUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsSelected(true);
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  return (
    <div 
      className={`absolute w-24 flex flex-col items-center justify-center gap-1 cursor-pointer transition-shadow rounded p-2 group
        ${isSelected ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}
      `}
      style={{ top: position.y, left: position.x }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onClick}
      onClick={(e) => {
        e.stopPropagation();
        setIsSelected(true);
      }}
    >
      <div className={`p-3 rounded-xl bg-black/20 backdrop-blur-sm group-hover:scale-105 transition-transform ${config.color} shadow-lg`}>
        {React.cloneElement(config.icon as React.ReactElement<any>, { size: 40 })}
      </div>
      <span className="text-white text-[10px] font-bold text-shadow text-center truncate w-full px-1 uppercase tracking-tight">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
