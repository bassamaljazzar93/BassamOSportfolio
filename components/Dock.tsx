
import React from 'react';
import { AppID, WindowState } from '../types';
import { APP_CONFIG } from '../constants';

interface DockProps {
  openWindow: (id: AppID) => void;
  activeId: AppID | null;
  windows: WindowState[];
}

const Dock: React.FC<DockProps> = ({ openWindow, activeId, windows }) => {
  const dockApps: AppID[] = ['files', 'terminal', 'skills', 'lab', 'games', 'settings', 'mail'];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 glass-morphism border border-white/10 px-4 py-2 flex items-center gap-2 z-[10000] rounded-2xl shadow-2xl transition-all">
      {dockApps.map(id => {
        const config = APP_CONFIG[id];
        const isOpen = windows.some(w => w.id === id);
        const isActive = activeId === id;

        return (
          <div key={id} className="relative group">
            <button 
              onClick={() => openWindow(id)}
              className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center
                ${isActive ? 'bg-white/10 scale-110' : 'hover:bg-white/5 hover:scale-105'}
                ${config.color}
              `}
              title={config.title}
            >
              {React.cloneElement(config.icon as React.ReactElement<any>, { size: 24 })}
            </button>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900/90 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap shadow-xl font-bold uppercase tracking-widest border border-white/10">
              {config.title}
            </div>

            {/* Indicator Dot */}
            {isOpen && (
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isActive ? 'bg-orange-500 shadow-[0_0_8px_orange]' : 'bg-gray-400'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Dock;
