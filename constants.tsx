
import React from 'react';
import { 
  Folder, Terminal, BarChart3, Image as ImageIcon, Gamepad2, Settings, Mail, Globe, FileText, Trash2, Microscope, Info
} from 'lucide-react';
import { Project, FileSystemNode, AppID } from './types';

export const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/main/images/';
export const CV_PDF_URL = 'https://raw.githubusercontent.com/bassamaljazzar93/BassamSAASportfolio/7127ab5efe175a3519d327f027a840145bea22f5/Data/CVBassamAljazzar122025.pdf';

export const PROJECTS: Project[] = [
  {
    id: 'busaif',
    name: 'Bu Saif Humanoid Robot',
    category: 'Robotics',
    year: '2019-2021',
    description: 'Humanoid robot designed for cognitive therapy and social interaction. Presented at GITEX 2019.',
    specs: ['Height: 1.2m', 'Python-based NLP', 'Actuated Silicon Head', 'MMSE Protocol Implementation'],
    images: [
      `${IMAGE_BASE_URL}busaif_1.jpg`,
      `${IMAGE_BASE_URL}busaif_2.jpg`,
      `${IMAGE_BASE_URL}busaif_3.jpg`
    ],
    tags: ['Humanoid', 'GITEX', 'Python', 'Mechatronics']
  },
  {
    id: 'metatouch',
    name: 'Meta Touch System',
    category: 'Innovation',
    year: '2020',
    description: 'Touchless elevator system developed during COVID-19 to reduce surface contact.',
    specs: ['Infrared Proximity Sensors', 'Existing Lift Integration', 'Mass Manufacturing Ready'],
    images: [
      `${IMAGE_BASE_URL}metaTouch_1.jpg`,
      `${IMAGE_BASE_URL}metaTouch_2.jpg`
    ],
    tags: ['COVID-19', 'Automation', 'Sensors']
  },
  {
    id: 'shrimp',
    name: 'Shrimp Hex Rover',
    category: 'Robotics',
    year: '2016',
    description: 'Six-wheeled rover capable of traversing rugged obstacles with a unique mechanical suspension.',
    specs: ['6-Wheel Independent Drive', 'Biomimetic Suspension', 'Climbing Capability'],
    images: [
      `${IMAGE_BASE_URL}shrimpRover_real.jpg`,
      `${IMAGE_BASE_URL}shrimpRover_Sim.png`
    ],
    tags: ['Rover', 'Off-Road', 'Graduation Project']
  }
];

export const APP_CONFIG: Record<AppID, { icon: React.ReactNode; title: string; color: string }> = {
  files: { icon: <Folder />, title: 'Projects', color: 'text-blue-400' },
  terminal: { icon: <Terminal />, title: 'Terminal', color: 'text-green-500' },
  skills: { icon: <BarChart3 />, title: 'Skills', color: 'text-purple-400' },
  photos: { icon: <ImageIcon />, title: 'Gallery', color: 'text-pink-400' },
  games: { icon: <Gamepad2 />, title: 'Games', color: 'text-yellow-400' },
  settings: { icon: <Settings />, title: 'Settings', color: 'text-gray-400' },
  mail: { icon: <Mail />, title: 'Contact', color: 'text-red-400' },
  firefox: { icon: <Globe />, title: 'Web', color: 'text-orange-400' },
  resume: { icon: <FileText />, title: 'Resume', color: 'text-blue-200' },
  lab: { icon: <Microscope />, title: '3D Lab', color: 'text-emerald-400' },
  trash: { icon: <Trash2 />, title: 'Trash', color: 'text-gray-500' },
  about: { icon: <Info />, title: 'About_Me', color: 'text-orange-500' }
};

export const INITIAL_FS: FileSystemNode[] = [
  {
    name: 'Projects',
    type: 'folder',
    children: PROJECTS.map(p => ({
      name: p.name.replace(/\s+/g, '_'),
      type: 'folder',
      children: [
        { name: 'details.json', type: 'file', content: JSON.stringify(p) }
      ]
    }))
  },
  {
    name: 'Games',
    type: 'folder',
    children: [
      { name: 'Snake.game', type: 'file', content: 'Snake Game Binary' },
      { name: 'TicTacToe.game', type: 'file', content: 'TTT Binary' }
    ]
  }
];
