
import React from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  notifications: Notification[];
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications }) => {
  return (
    <div className="fixed top-12 right-4 flex flex-col gap-2 z-[10000] pointer-events-none">
      {notifications.map((n, i) => (
        <div 
          key={n.id}
          className="w-80 glass-morphism border border-white/10 p-4 rounded-lg shadow-2xl flex gap-3 animate-slide-in pointer-events-auto"
          style={{ 
            animation: 'slideIn 0.3s ease-out forwards',
            animationDelay: `${i * 0.1}s`
          }}
        >
          <div className="w-10 h-10 rounded-full ubuntu-orange flex items-center justify-center flex-shrink-0">
            <Bell size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">{n.title}</h4>
            <p className="text-xs text-gray-300 mt-1">{n.message}</p>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NotificationCenter;
