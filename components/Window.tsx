
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import { AppID } from '../types';

interface WindowProps {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isActive: boolean;
  zIndex: number;
  initialX?: number;
  initialY?: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  id, title, isOpen, isMinimized, isMaximized, isActive, zIndex, initialX = 100, initialY = 100,
  onClose, onMinimize, onMaximize, onFocus, children
}) => {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ w: 900, h: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (isDragging) {
        setPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
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

  if (!isOpen || isMinimized) return null;

  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const style: React.CSSProperties = isMaximized 
    ? { top: '32px', left: '0', width: '100vw', height: 'calc(100vh - 32px)', zIndex, borderRadius: 0 }
    : { top: pos.y, left: pos.x, width: size.w, height: size.h, zIndex };

  return (
    <div 
      className={`fixed flex flex-col bg-[#2C2C2C] border border-white/10 shadow-2xl rounded-lg overflow-hidden transition-shadow duration-200 ${isActive ? 'ring-1 ring-orange-500/50 scale-[1.002]' : 'opacity-95'}`}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className="h-9 bg-[#3c3c3c] flex items-center justify-between px-3 shrink-0 cursor-default select-none border-b border-black/20"
        onMouseDown={handleDragStart}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-3.5 h-3.5 rounded-full bg-[#DF4A4A] hover:brightness-110 flex items-center justify-center group">
            <X size={8} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-3.5 h-3.5 rounded-full bg-[#F0B232] hover:brightness-110 flex items-center justify-center group">
            <Minus size={8} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="w-3.5 h-3.5 rounded-full bg-[#4A90D9] hover:brightness-110 flex items-center justify-center group">
            <Maximize2 size={8} className="text-black opacity-0 group-hover:opacity-100" />
          </button>
          <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-gray-300">{title}</span>
        </div>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-hidden bg-[#1a1a1a]">
        {children}
      </div>

      {/* Resizers */}
      {!isMaximized && (
        <>
          <div className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize" onMouseDown={(e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startW = size.w;
            const onMove = (me: MouseEvent) => setSize(s => ({ ...s, w: Math.max(400, startW + (me.clientX - startX)) }));
            const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }} />
          <div className="absolute left-0 bottom-0 right-0 h-1 cursor-ns-resize" onMouseDown={(e) => {
            e.preventDefault();
            const startY = e.clientY;
            const startH = size.h;
            const onMove = (me: MouseEvent) => setSize(s => ({ ...s, h: Math.max(300, startH + (me.clientY - startY)) }));
            const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }} />
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-[1001] opacity-0"
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startY = e.clientY;
              const startW = size.w;
              const startH = size.h;
              const onMove = (me: MouseEvent) => setSize({ w: Math.max(400, startW + (me.clientX - startX)), h: Math.max(300, startH + (me.clientY - startY)) });
              const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
              window.addEventListener('mousemove', onMove);
              window.addEventListener('mouseup', onUp);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Window;
