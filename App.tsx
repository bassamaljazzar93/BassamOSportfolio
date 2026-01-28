
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Wifi, Battery, Volume2, Power, Menu, Monitor, HardDrive, Cpu as CpuIcon, 
  FileText, Trash2, Bell, Search, Info, Settings, X, Minus, Maximize2, Gamepad2,
  Download, Mail, Phone, MapPin, Linkedin, ExternalLink, Award, BookOpen, Briefcase, Code, Wrench, Globe
} from 'lucide-react';
import { WindowState, AppID, Notification, IconPosition } from './types';
import { APP_CONFIG, INITIAL_FS, CV_PDF_URL } from './constants';
import Window from './components/Window';
import DesktopIcon from './components/DesktopIcon';
import Dock from './components/Dock';
import TerminalApp from './components/apps/TerminalApp';
import FilesApp from './components/apps/FilesApp';
import SkillsApp from './components/apps/SkillsApp';
import PhotosApp from './components/apps/PhotosApp';
import GamesApp from './components/apps/GamesApp';
import SettingsApp from './components/apps/SettingsApp';
import ContactApp from './components/apps/ContactApp';
import LabApp from './components/apps/LabApp';
import NotificationCenter from './components/NotificationCenter';
import MatrixRain from './components/MatrixRain';

const MY_LOGO = 'https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/refs/heads/main/images/MY_LOGO.png';

const ResumeApp: React.FC = () => (
  <div className="h-full bg-white text-slate-800 overflow-auto selection:bg-orange-100">
    <div className="max-w-4xl mx-auto p-8 lg:p-12 shadow-sm min-h-full">
      {/* Action Header */}
      <div className="flex justify-end mb-8 sticky top-0 z-10">
        <a 
          href={CV_PDF_URL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 bg-[#E95420] text-white rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          <Download size={14} /> Download Official PDF
        </a>
      </div>

      {/* Header */}
      <header className="border-b-8 border-[#E95420] pb-8 mb-10">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 mb-2">Bassam Walid Aljazzar</h1>
        <p className="text-2xl font-bold text-slate-500 mb-6 underline decoration-[#E95420]/30 underline-offset-8">Mechatronics / Electromechanical / Robotics Engineer</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 text-sm font-bold text-slate-600">
          <div className="flex items-center gap-2"><MapPin size={16} className="text-[#E95420]" /> United Arab Emirates, Abu Dhabi</div>
          <div className="flex items-center gap-2"><Phone size={16} className="text-[#E95420]" /> +971 56 611 3381</div>
          <div className="flex items-center gap-2"><Mail size={16} className="text-[#E95420]" /> b_aljazzar@yahoo.com</div>
          <div className="flex items-center gap-2"><Globe size={16} className="text-[#E95420]" /> Nationality: Palestinian</div>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-12">
        <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#E95420] mb-4">
          <Info size={18} /> Executive Summary
        </h2>
        <p className="text-lg leading-relaxed text-slate-700 italic border-l-4 border-slate-100 pl-6">
          "As a Mechatronics Engineer with 8 years of experience, I am an expert in 3D design, complex system analysis and modifications, and Python development. I have built a Humanoid robot named 'Bu Saif' and contributed to a patent (US11573635) for a face mask with EMG sensors for communication. I possess excellent communication and leadership skills and have a passion for robotics and automation. I am confident that I can bring innovation, quality, and creativity to any organization."
        </p>
      </section>

      {/* Publications */}
      <section className="mb-12">
        <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#E95420] mb-6">
          <Award size={18} /> Publications & Patents
        </h2>
        <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
          <h3 className="font-black text-slate-900 mb-2">United States Patent 11573635</h3>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">Face mask for accurate location of sensors relative to a user’s face, a communication enabling face mask, and a communication system including the face mask.</p>
          <a 
            href="https://patentimages.storage.googleapis.com/73/15/54/9ddd67aef63072/US11573635.pdf" 
            target="_blank" 
            className="inline-flex items-center gap-2 text-[#E95420] text-xs font-black uppercase tracking-widest hover:underline"
          >
            View Patent PDF <ExternalLink size={12} />
          </a>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#E95420] mb-6">
          <Briefcase size={18} /> Work Experience
        </h2>
        
        <div className="space-y-10">
          <div className="relative pl-8 border-l-2 border-slate-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#E95420]" />
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-black text-xl text-slate-900">Mechatronics Engineer Consultant</h3>
              <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full uppercase">Jun 2021 - Present</span>
            </div>
            <p className="font-bold text-slate-500 mb-4 uppercase text-xs tracking-wider">Tatweer Middle East and Africa (Ministry of Interior Lab), Abu Dhabi</p>
            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 text-sm leading-relaxed">
              <li>Contribute to developing innovative solutions for the Ministry of Interior's challenges.</li>
              <li>Work on preliminary designs for innovative ideas to improve efficiency and productivity.</li>
              <li>Utilize Python development skills to create custom software solutions for various projects.</li>
              <li>Develop and implement embedded systems for the Ministry's various projects.</li>
              <li>Hold training courses and workshops for the Ministry's employees to improve technical knowledge.</li>
              <li>Collaborate with cross-functional teams to ensure seamless integration of mechatronic systems.</li>
            </ul>
          </div>

          <div className="relative pl-8 border-l-2 border-slate-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200" />
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-black text-xl text-slate-900">Research Assistant</h3>
              <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full uppercase">May 2019 - May 2021</span>
            </div>
            <p className="font-bold text-slate-500 mb-4 uppercase text-xs tracking-wider">UAE University, College of Information Technology, Al Ain</p>
            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 text-sm leading-relaxed">
              <li>Lead researcher for "Bu Saif" Humanoid Robot project.</li>
              <li>In charge of prototyping 3D designs and coordinating robotics events.</li>
              <li>Developed touchless elevator solutions and COVID-19 ventilator prototypes using 3D printing.</li>
              <li>Contributed to US Patent 11573635 for an EMG communication face mask.</li>
            </ul>
          </div>

          <div className="relative pl-8 border-l-2 border-slate-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200" />
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-black text-xl text-slate-900">Mechatronics Engineer</h3>
              <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full uppercase">Nov 2018 - Apr 2019</span>
            </div>
            <p className="font-bold text-slate-500 mb-4 uppercase text-xs tracking-wider">Fadel Al Dhaheri General Trading, Dubai</p>
            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 text-sm leading-relaxed">
              <li>Maintenance and electrical repair for massage chairs and toy machines.</li>
              <li>Component-level motherboard maintenance.</li>
            </ul>
          </div>

          <div className="relative pl-8 border-l-2 border-slate-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200" />
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-black text-xl text-slate-900">Mechatronics Engineer</h3>
              <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full uppercase">Jun 2017 - Nov 2017</span>
            </div>
            <p className="font-bold text-slate-500 mb-4 uppercase text-xs tracking-wider">Flash Tech Company, Gaza, Palestine</p>
            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 text-sm leading-relaxed">
              <li>Designing maintenance strategies and controlling costs.</li>
              <li>Solar energy system design, platform installation, and electrical load calculation.</li>
              <li>PLC machine development and automatic control maintenance.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="mb-12">
        <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#E95420] mb-6">
          <Award size={18} /> Major Achievements
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-wider">Bu Saif Humanoid Project (2019-2021)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built an intelligent Humanoid Robot from scratch. Developed a Python program for MMSE cognitive testing, enabling automated patient evaluation. Collaboration with Dubai Health Authority for elderly care treatment.
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-wider">Meta Touch Project (2020)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed and mass-produced a touchless elevator interface system during the COVID-19 pandemic, now available in the market.
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-wider">JSSR 2020 Symposium</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Organizer and Logistics Lead for the 5th Joint UAE Symposium on Social Robotics, bringing together world-class roboticists.
            </p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mb-12">
        <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#E95420] mb-6">
          <BookOpen size={18} /> Education
        </h2>
        <div className="pl-6 border-l-4 border-orange-100">
          <h3 className="font-black text-xl text-slate-900">BSc in Mechatronics Engineering</h3>
          <p className="font-bold text-slate-500">Al-Azhar University-Gaza, Gaza, Palestine</p>
          <p className="text-xs text-slate-400 mt-1">2011 - 2017</p>
          <p className="text-xs text-slate-600 mt-4 leading-relaxed">
            Multidisciplinary studies combining mechanical, electrical, and computer engineering. Graduation project "Shrimp Rover Robot" integrated advanced mechanics, electronics, and control systems.
          </p>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="mb-12">
        <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#E95420] mb-6">
          <Wrench size={18} /> Skills & Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-3">Expertise</p>
            <div className="flex flex-wrap gap-2">
              {['SolidWorks', 'Fusion 360', 'Proteus', '3D Printing', 'Laser Cutting', 'PCB Design', 'Embedded Systems', 'CNC Machines'].map(s => (
                <span key={s} className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-md">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-3">Programming & Systems</p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'ROS (Robot Operating System)', 'PLC Programming', 'AutoCAD', 'Microsoft Office Expert'].map(s => (
                <span key={s} className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md border border-slate-200">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section>
        <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#E95420] mb-4">
          <Info size={18} /> Interests
        </h2>
        <div className="flex gap-4 text-xs font-bold text-slate-500">
          <span>• Drawing</span>
          <span>• 3D Designing</span>
          <span>• Kung Fu</span>
          <span>• Social Robotics</span>
        </div>
      </section>
    </div>
  </div>
);

const AboutApp: React.FC = () => (
  <div className="h-full bg-[#1a1a1a] p-8 overflow-auto text-gray-300 terminal-font leading-relaxed">
    <h2 className="text-xl font-bold mb-4 text-orange-400 uppercase">Bassam Aljazzar - Mechatronics Engineer</h2>
    <p className="mb-4">
      Innovator and Roboticist with a deep passion for building machines that interact with the world. 
      My expertise spans across high-performance robotics control, advanced haptics, and robust embedded systems.
    </p>
    <p className="mb-4">
      Driven by precision engineering and the power of software, I've spent years developing custom hardware 
      solutions, from humanoid robots (Bu Saif) to biomimetic rovers (Shrimp Hex).
    </p>
    <p>
      Favorite Tools: ROS2, C++, Python, SolidWorks, Altium, and high-octane coffee ☕.
    </p>
  </div>
);

const App: React.FC = () => {
  const [bootState, setBootState] = useState<'grub' | 'loading' | 'desktop'>('grub');
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<AppID | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [wallpaper, setWallpaper] = useState('https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/refs/heads/main/images/MYbg.png');
  const [showMatrix, setShowMatrix] = useState(false);
  const [konami, setKonami] = useState<string[]>([]);

  // Desktop Icons State
  const initialIconIds: AppID[] = ['about', 'files', 'skills', 'terminal', 'lab', 'mail', 'resume', 'games', 'trash'];
  const [iconPositions, setIconPositions] = useState<Record<AppID, IconPosition>>(() => {
    const pos: Record<AppID, IconPosition> = {} as any;
    initialIconIds.forEach((id, i) => {
      pos[id] = { x: 20, y: 20 + i * 110 };
    });
    return pos;
  });

  // Boot Sequence
  useEffect(() => {
    if (bootState === 'grub') {
      const timer = setTimeout(() => setBootState('loading'), 1000);
      return () => clearTimeout(timer);
    }
    if (bootState === 'loading') {
      const messages = [
        '[ OK ] Loading Mechatronics kernel...',
        '[ OK ] Initializing robotics modules...',
        '[ OK ] Starting innovation services...',
        '[ OK ] Mounting /dev/sda1 on /home/bassam',
        '[ OK ] Reached target Graphical Interface'
      ];
      let msgIdx = 0;
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setBootState('desktop');
              setNotifications([{ id: 'welcome', title: 'Welcome!', message: "Welcome to Bassam's Portfolio!" }]);
            }, 600);
            return 100;
          }
          if (prev % 25 === 0 && msgIdx < messages.length) {
            setBootMessages(m => [...m, messages[msgIdx++]]);
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [bootState]);

  // Konami & Global Shortcuts
  useEffect(() => {
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const handleKey = (e: KeyboardEvent) => {
      setKonami(prev => {
        const next = [...prev, e.key].slice(-10);
        if (next.join('') === code.join('')) setShowMatrix(true);
        return next;
      });
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 't') openWindow('terminal');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = useCallback((id: AppID) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      const maxZ = Math.max(...prev.map(win => win.zIndex), 0) + 1;
      if (existing) {
        setActiveWindowId(id);
        return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: maxZ } : w);
      }
      const newWindow: WindowState = {
        id,
        title: APP_CONFIG[id].title,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: maxZ,
        initialX: 100 + (prev.length * 30),
        initialY: 40 + (prev.length * 30),
      };
      setActiveWindowId(id);
      return [...prev, newWindow];
    });
  }, []);

  const focusWindow = (id: AppID) => {
    setActiveWindowId(id);
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0) + 1;
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ, isMinimized: false } : w);
    });
  };

  const closeWindow = (id: AppID) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  if (bootState === 'grub') {
    return (
      <div className="h-screen w-screen bg-black text-white p-12 terminal-font flex flex-col items-center justify-center">
        <div className="border border-white/20 p-4 mb-8 bg-[#111]">GNU GRUB version 2.06</div>
        <div className="space-y-1 w-full max-w-lg">
          <p className="bg-white text-black px-1">* Bassam-OS (Advanced Mechatronics Kernel)</p>
          <p>  Advanced options for Bassam-OS</p>
        </div>
        <div className="mt-12 text-xs text-gray-500">Booting in 1s...</div>
      </div>
    );
  }

  if (bootState === 'loading') {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="relative group">
          <div className="absolute inset-0 bg-orange-500/20 blur-3xl group-hover:bg-orange-500/40 transition-all rounded-full" />
          <img src={MY_LOGO} className="w-80 h-80 mb-12 animate-pulse object-contain relative z-10" alt="Bassam Aljazzar Logo" />
        </div>
        <div className="w-full max-w-xs h-8 overflow-hidden mb-4">
           {bootMessages.map((m, i) => <p key={i} className="text-[10px] terminal-font text-emerald-500">{m}</p>)}
        </div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full ubuntu-orange" style={{ width: `${bootProgress}%`, transition: 'width 0.1s linear' }} />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`h-screen w-screen relative overflow-hidden flex flex-col transition-all duration-700 bg-black ${showMatrix ? 'grayscale' : ''}`}
      style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {showMatrix && <MatrixRain onComplete={() => setShowMatrix(false)} />}

      {/* Top Bar */}
      <div className="h-8 glass-morphism flex items-center justify-between px-4 text-[11px] font-bold z-[20000] border-b border-white/5 text-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 cursor-default hover:bg-white/10 px-2 py-0.5 rounded transition">
            <img src={MY_LOGO} className="w-4 h-4 object-contain" />
            <span>Activities</span>
          </div>
          <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-4 text-gray-300">
             <div className="flex items-center gap-1"><CpuIcon size={12} className="text-orange-500" /> <span>Projects: 10+</span></div>
             <div className="flex items-center gap-1 text-emerald-400"><Volume2 size={12} /> <span>Coffee: ∞</span></div>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 cursor-default hover:bg-white/10 px-2 py-0.5 rounded">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>

        <div className="flex items-center gap-4">
          <Search size={14} className="cursor-pointer hover:text-orange-500" />
          <Bell size={14} className="cursor-pointer" />
          <div className="flex items-center gap-3 bg-white/5 px-2 py-0.5 rounded">
            <Wifi size={14} className="cursor-pointer" />
            <Battery size={14} className="cursor-pointer" />
            <Settings size={14} className="cursor-pointer" onClick={() => openWindow('settings')} />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="flex-1 relative overflow-hidden">
        {initialIconIds.map(id => (
          <DesktopIcon 
            key={id} id={id} label={APP_CONFIG[id].title} 
            onClick={() => openWindow(id)} 
            position={iconPositions[id]}
            onPositionChange={(pos) => setIconPositions(prev => ({ ...prev, [id]: pos }))}
          />
        ))}

        {windows.map(win => (
          <Window 
            key={win.id} {...win} isActive={activeWindowId === win.id}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => setWindows(ws => ws.map(w => w.id === win.id ? { ...w, isMinimized: true } : w))}
            onMaximize={() => setWindows(ws => ws.map(w => w.id === win.id ? { ...w, isMaximized: !w.isMaximized } : w))}
            onFocus={() => focusWindow(win.id)}
          >
            {win.id === 'terminal' && <TerminalApp onOpenApp={openWindow} onShowMatrix={() => setShowMatrix(true)} />}
            {win.id === 'files' && <FilesApp />}
            {win.id === 'skills' && <SkillsApp />}
            {win.id === 'photos' && <PhotosApp />}
            {win.id === 'games' && <GamesApp />}
            {win.id === 'settings' && <SettingsApp setWallpaper={setWallpaper} setTheme={setTheme} theme={theme} />}
            {win.id === 'mail' && <ContactApp />}
            {win.id === 'lab' && <LabApp />}
            {win.id === 'about' && <AboutApp />}
            {win.id === 'resume' && <ResumeApp />}
            {win.id === 'trash' && (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-[#111] text-gray-700">
                <Trash2 size={80} className="mb-4 opacity-10" />
                <p className="italic">Trash is empty</p>
              </div>
            )}
          </Window>
        ))}
      </div>

      <Dock openWindow={openWindow} activeId={activeWindowId} windows={windows} />
      <NotificationCenter notifications={notifications} />
    </div>
  );
};

export default App;
