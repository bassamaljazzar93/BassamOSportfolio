
import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Info, AlertTriangle, RefreshCw, Cpu as CpuIcon } from 'lucide-react';

const LabApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const viewerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    // Spline-viewer specific events
    const handleLoadComplete = () => {
      console.log("Spline loaded successfully (load-complete).");
      setLoading(false);
      setError(false);
    };

    const handleLoadError = (e: any) => {
      console.error("Spline load error:", e);
      setError(true);
      setLoading(false);
    };

    // Attach native event listeners
    viewer.addEventListener('load-complete', handleLoadComplete);
    viewer.addEventListener('error', handleLoadError);

    // Safety timeout: If it takes more than 30 seconds, 
    // we let the user try to interact anyway as it might have loaded but missed the event
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn("Spline load-complete event missed or slow. Forcing ready state.");
        setLoading(false);
      }
    }, 30000);

    return () => {
      viewer.removeEventListener('load-complete', handleLoadComplete);
      viewer.removeEventListener('error', handleLoadError);
      clearTimeout(safetyTimeout);
    };
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="h-full bg-black relative flex flex-col overflow-hidden">
      <div className="h-10 bg-[#333] flex items-center justify-between px-4 border-b border-white/10 shrink-0 z-20">
         <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Bassam's Virtual Lab</span>
         <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Info size={12} />
            <span className="font-bold uppercase tracking-tighter">US Patent 11573635 Interaction Point</span>
         </div>
      </div>
      
      <div className="flex-1 relative bg-[#0a0a0a]">
        {loading && (
          <div className="absolute inset-0 bg-black z-30 flex flex-col items-center justify-center gap-6 text-white p-4 text-center">
            <div className="relative">
              <Loader2 className="animate-spin text-orange-500" size={64} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <CpuIcon size={24} className="text-white animate-pulse" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[14px] font-black uppercase tracking-[0.4em] text-orange-500 animate-pulse">Initializing Neural Engine</p>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-gray-400 font-bold max-w-xs">Connecting to Spline Cloud Infrastructure...</p>
                <p className="text-[9px] text-gray-600 italic">Downloading robotics assets (shrimp_rover_high_poly)...</p>
              </div>
            </div>
            <button 
              onClick={handleRetry}
              className="mt-8 px-4 py-2 border border-white/10 hover:bg-white/5 rounded text-[9px] font-black uppercase tracking-widest text-gray-500 transition"
            >
              Skip Wait & Force Reload
            </button>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-black z-30 flex flex-col items-center justify-center gap-4 text-white p-4 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
               <AlertTriangle className="text-red-500" size={32} />
            </div>
            <div className="space-y-2">
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-red-500">GPU Acceleration Failed</p>
              <p className="text-[10px] text-gray-500 font-bold max-w-xs">The 3D environment failed to initialize. Ensure WebGL is enabled or try refreshing.</p>
              <div className="flex flex-col gap-2 mt-4">
                <button 
                  onClick={handleRetry}
                  className="px-6 py-2.5 bg-orange-500 text-white rounded text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition shadow-lg flex items-center justify-center gap-2"
                >
                  <RefreshCw size={14} /> Retry Loading Lab
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* @ts-ignore */}
        <spline-viewer 
          key={`viewer-${retryCount}`}
          ref={viewerRef}
          url="https://prod.spline.design/eBO7I-xKw00YnaYL/scene.splinecode"
          className={`w-full h-full transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {!loading && !error && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-widest shadow-2xl animate-fade-in border-t border-orange-500/30">
            Mechatronics Lab: Drag to Rotate • Scroll to Zoom
          </div>
        </div>
      )}
    </div>
  );
};

export default LabApp;
