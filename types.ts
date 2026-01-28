
export type AppID = 'files' | 'terminal' | 'skills' | 'photos' | 'games' | 'settings' | 'mail' | 'firefox' | 'resume' | 'lab' | 'trash' | 'about';

export interface WindowState {
  id: AppID;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  initialX?: number;
  initialY?: number;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  description: string;
  specs: string[];
  images: string[];
  tags: string[];
  link?: string;
}

export interface FileSystemNode {
  name: string;
  type: 'file' | 'folder';
  content?: string | Project;
  children?: FileSystemNode[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon?: string;
}

export interface IconPosition {
  x: number;
  y: number;
}
