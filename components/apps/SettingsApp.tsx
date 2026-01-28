
import React from 'react';
import { Monitor, Moon, Sun, Shield, Info, Palette } from 'lucide-react';

interface SettingsAppProps {
  setWallpaper: (url: string) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  theme: 'dark' | 'light';
}

const SettingsApp: React.FC<SettingsAppProps> = ({ setWallpaper, setTheme, theme }) => {
  const wallpapers = [
    { name: 'Cyber City', url: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Deep Space', url: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Mountain Peak', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Circuit Board', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1920' },
    { name: 'Minimal Ubuntu', url: 'https://picsum.photos/id/192/1920/1080' }
  ];

  return (
    <div className="h-full bg-[#1a1a1a] flex">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/10 py-6">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-6 py-2 bg-orange-500/20 text-orange-500 border-r-2 border-orange-500 text-sm font-medium">
            <Palette size={18} /> Appearance
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-2 hover:bg-white/5 text-gray-400 text-sm font-medium">
            <Shield size={18} /> Privacy
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-2 hover:bg-white/5 text-gray-400 text-sm font-medium">
            <Info size={18} /> About System
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-8">Appearance</h1>
        
        <section className="mb-10">
           <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Theme</h2>
           <div className="flex gap-4">
              <button 
                onClick={() => setTheme('dark')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${theme === 'dark' ? 'border-orange-500 bg-white/5' : 'border-transparent bg-black/20 hover:bg-black/30'}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-orange-500"><Moon /></div>
                <div className="text-left">
                   <div className="font-bold">Dark Mode</div>
                   <div className="text-xs text-gray-500">Easier on the eyes</div>
                </div>
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${theme === 'light' ? 'border-orange-500 bg-white/5' : 'border-transparent bg-black/20 hover:bg-black/30'}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-orange-600"><Sun /></div>
                <div className="text-left text-gray-100">
                   <div className="font-bold">Light Mode</div>
                   <div className="text-xs text-gray-500">Classic desktop look</div>
                </div>
              </button>
           </div>
        </section>

        <section>
           <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Wallpaper</h2>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wallpapers.map(wp => (
                <div 
                  key={wp.name} 
                  className="group cursor-pointer relative"
                  onClick={() => setWallpaper(wp.url)}
                >
                   <div className="aspect-video rounded-lg overflow-hidden border-2 border-transparent group-hover:border-orange-500 transition-all">
                      <img src={wp.url} className="w-full h-full object-cover" alt={wp.name} />
                   </div>
                   <div className="mt-2 text-xs text-center text-gray-400 group-hover:text-white">{wp.name}</div>
                </div>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsApp;
