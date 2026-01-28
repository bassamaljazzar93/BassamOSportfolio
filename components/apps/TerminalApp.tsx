
import React, { useState, useRef, useEffect } from 'react';
import { AppID } from '../../types';

interface TerminalAppProps {
  onOpenApp?: (id: AppID) => void;
  onShowMatrix?: () => void;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ onOpenApp, onShowMatrix }) => {
  const [history, setHistory] = useState<string[]>([
    'Welcome to Bassam-OS Terminal v24.10.0-LTS (Mechatronics Edition)',
    'Type "help" to see available commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const [cmdStack, setCmdStack] = useState<string[]>([]);
  const [stackIdx, setStackIdx] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    'help', 'whoami', 'neofetch', 'ls', 'cd', 'cat', 'skills', 'projects', 'clear', 
    'sudo hire-me', 'matrix', 'fortune', 'cowsay', 'snake', 'ttt', 'lab', 'date'
  ];

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    let out: string | string[] = '';

    setCmdStack(p => [trimmed, ...p]);
    setStackIdx(-1);

    switch (command) {
      case 'help':
        out = [
          'AVAILABLE COMMANDS:',
          '  whoami     - Engineer biography',
          '  neofetch   - System summary',
          '  ls / cd    - Navigate project folders',
          '  cat [file] - Read file content',
          '  skills     - Launch Skills Dashboard',
          '  lab        - Open Virtual Mechatronics Lab',
          '  matrix     - Wake up, Neo...',
          '  sudo hire-me - Execute hiring protocol',
          '  snake / ttt - Launch mini games',
          '  clear      - Reset terminal window',
          '  date       - Current system time'
        ];
        break;
      case 'whoami':
        out = 'Bassam Aljazzar: Mechatronics Engineer specializing in Robotics and AI.';
        break;
      case 'neofetch':
        out = [
          '             .-/+oossssoo+/-.              OS: Bassam-OS 24.10 LTS',
          '         `:+ssssssssssssssssss+:`          Host: Robotics-Thinkpad-P1',
          '       -+ssssssssssssssssssyyssss+-        Kernel: 6.5.0-mechatronics',
          '     .osssssssssssssssssshdyysssssso.      Uptime: 8 years experience',
          '    /sssssssssssssssssdhyysssssssssh/      Shell: bash 5.1',
          '   /sssssssssssssssdhhyyysssssssssssh/     Resolution: 3840x2160',
          '  .ssssssssssssssshdhhyyyssssssssssssh.    Terminal: BassamTerm',
          '  /ssssssssssssssshdhhyyyssssssssssssh/    CPU: Creative Engine (95%)',
          '  -ssssssssssssssshdhhyyyssssssssssssh-    Status: AVAILABLE FOR HIRE',
          '   /sssssssssssssssdhhyyysssssssssssh/     Memory: Infinite Coffee',
          '    .osssssssssssssssssshdyysssssso.       ',
          '      -+ssssssssssssssssssyyssss+-         Tech: ROS2, Python, C++, PCB',
          '        `:+ssssssssssssssssss+:`           ',
          '            .-/+oossssoo+/-.               '
        ];
        break;
      case 'ls':
        out = ['projects/', 'documents/', 'about_me.txt', 'skills.txt'];
        break;
      case 'projects':
        onOpenApp?.('files');
        out = 'Opening project explorer...';
        break;
      case 'matrix':
        onShowMatrix?.();
        out = 'System breach initiated... Entering the Matrix...';
        break;
      case 'clear':
        setHistory(['']);
        return;
      case 'sudo':
        if (args[0] === 'hire-me') {
          out = '🚀 Hiring protocol initiated! Redirecting to contact form...';
          setTimeout(() => onOpenApp?.('mail'), 1500);
        } else {
          out = 'sudo: permission denied';
        }
        break;
      case 'snake': onOpenApp?.('games'); out = 'Launching Snake...'; break;
      case 'ttt': onOpenApp?.('games'); out = 'Launching Tic-Tac-Toe...'; break;
      case 'lab': onOpenApp?.('lab'); out = 'Initializing 3D lab...'; break;
      case 'skills': onOpenApp?.('skills'); out = 'Fetching skills telemetry...'; break;
      case 'date': out = new Date().toLocaleString(); break;
      default:
        out = `bash: command not found: ${command}`;
    }

    setHistory(p => [...p, `bassam@portfolio:~$ ${cmd}`, ...(Array.isArray(out) ? out : [out]), '']);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = commands.find(c => c.startsWith(input));
      if (match) setInput(match);
    } else if (e.key === 'ArrowUp') {
      if (stackIdx < cmdStack.length - 1) {
        const next = stackIdx + 1;
        setStackIdx(next);
        setInput(cmdStack[next]);
      }
    } else if (e.key === 'ArrowDown') {
      if (stackIdx > 0) {
        const next = stackIdx - 1;
        setStackIdx(next);
        setInput(cmdStack[next]);
      } else {
        setStackIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      ref={scrollRef}
      className="h-full bg-black p-4 text-[#00ff00] terminal-font text-sm overflow-auto"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="min-h-[1.2em] whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex gap-2 items-center">
        <span className="text-white shrink-0 font-bold">bassam@portfolio:~$</span>
        <input 
          ref={inputRef}
          className="bg-transparent border-none outline-none text-[#00ff00] flex-1 terminal-font"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default TerminalApp;
