
import React, { useState } from 'react';
import { 
  Folder, File, ChevronLeft, ChevronRight, LayoutGrid, List, ExternalLink, ArrowRight
} from 'lucide-react';
import { INITIAL_FS, PROJECTS } from '../../constants';
import { FileSystemNode, Project } from '../../types';

const FilesApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<FileSystemNode[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const nodes = currentPath.length === 0 ? INITIAL_FS : currentPath[currentPath.length - 1].children || [];

  const navigateTo = (node: FileSystemNode) => {
    if (node.type === 'folder') {
      setCurrentPath([...currentPath, node]);
      const p = PROJECTS.find(proj => proj.name.replace(/\s+/g, '_') === node.name);
      if (p) {
        setSelectedProject(p);
        setActiveImgIdx(0);
      }
    }
  };

  const goBack = () => {
    if (selectedProject) {
      setSelectedProject(null);
    } else {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  if (selectedProject) {
    return (
      <div className="h-full bg-[#1a1a1a] flex flex-col text-white">
        <div className="h-10 bg-[#333] flex items-center px-4 gap-4 border-b border-white/5">
          <button onClick={goBack} className="p-1 hover:bg-white/10 rounded transition"><ChevronLeft size={20} /></button>
          <span className="text-sm font-bold truncate">{selectedProject.name}</span>
        </div>
        <div className="flex-1 overflow-auto p-8 flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="relative aspect-video bg-black/40 rounded-2xl overflow-hidden border border-white/10 group">
              <img 
                src={selectedProject.images[activeImgIdx]} 
                className="w-full h-full object-cover" 
                key={activeImgIdx}
              />
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition">
                <button 
                  onClick={() => setActiveImgIdx(i => (i - 1 + selectedProject.images.length) % selectedProject.images.length)}
                  className="p-2 bg-black/60 rounded-full hover:bg-orange-500 transition"
                ><ChevronLeft /></button>
                <button 
                  onClick={() => setActiveImgIdx(i => (i + 1) % selectedProject.images.length)}
                  className="p-2 bg-black/60 rounded-full hover:bg-orange-500 transition"
                ><ChevronRight /></button>
              </div>
            </div>
            <div className="flex gap-4">
              {selectedProject.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-20 aspect-video rounded-lg overflow-hidden border-2 transition ${activeImgIdx === i ? 'border-orange-500' : 'border-transparent opacity-50'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-orange-500 rounded-full text-[10px] font-bold uppercase">{selectedProject.category}</span>
              {selectedProject.tags.map(t => <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-[10px] text-gray-400">#{t}</span>)}
            </div>
            <h2 className="text-3xl font-black mb-4">{selectedProject.name}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">{selectedProject.description}</p>
            <div className="bg-orange-500/5 p-6 rounded-2xl border border-orange-500/20">
              <h3 className="font-bold mb-4">Technical Specs</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {selectedProject.specs.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowRight size={14} className="text-orange-500 mt-1 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-white">
      <div className="h-10 bg-[#333] flex items-center px-2 gap-2 border-b border-white/5">
        <button onClick={goBack} disabled={currentPath.length === 0} className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"><ChevronLeft size={18} /></button>
        <div className="flex-1 bg-black/40 rounded px-3 py-1 text-[11px] text-gray-400 flex items-center gap-2">
          <span>/ home / bassam /</span>
          {currentPath.map(p => <span key={p.name}>{p.name} /</span>)}
        </div>
      </div>
      <div className="flex-1 p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 content-start overflow-auto">
        {nodes.map(node => (
          <button 
            key={node.name}
            className="flex flex-col items-center gap-2 group outline-none"
            onDoubleClick={() => navigateTo(node)}
          >
            <div className={`w-14 h-14 flex items-center justify-center rounded-xl transition-all group-hover:bg-white/5 ${node.type === 'folder' ? 'text-blue-400 group-hover:scale-110' : 'text-gray-400'}`}>
              {node.type === 'folder' ? <Folder size={44} /> : <File size={36} />}
            </div>
            <span className="text-[10px] font-bold text-center text-gray-400 group-hover:text-white truncate w-full uppercase">
              {node.name.replace(/_/g, ' ')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilesApp;
