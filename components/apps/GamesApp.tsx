
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Gamepad2, ChevronRight, RefreshCcw } from 'lucide-react';

const TicTacToe: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  function calculateWinner(squares: (string | null)[]) {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return squares.includes(null) ? null : 'Draw';
  }

  const handleClick = (i: number) => {
    if (board[i] || winner) return;
    const next = board.slice();
    next[i] = isXNext ? 'X' : 'O';
    setBoard(next);
    setIsXNext(!isXNext);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#111] p-8">
      <div className="flex justify-between w-full max-w-[300px] mb-8">
        <button onClick={onBack} className="text-gray-500 hover:text-white flex items-center gap-1"><ArrowLeft size={16}/> Back</button>
        <button onClick={() => setBoard(Array(9).fill(null))} className="text-orange-500 hover:text-orange-400 flex items-center gap-1"><RefreshCcw size={16}/> Reset</button>
      </div>
      <div className="text-2xl font-black mb-8">
        {winner === 'Draw' ? "It's a Draw!" : winner ? `Winner: ${winner}` : `Next: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="grid grid-cols-3 gap-2 bg-[#222] p-2 rounded-xl">
        {board.map((val, i) => (
          <button 
            key={i} 
            onClick={() => handleClick(i)}
            className="w-20 h-20 bg-[#111] rounded-lg text-4xl font-black flex items-center justify-center hover:bg-white/5 transition border border-white/5"
          >
            <span className={val === 'X' ? 'text-orange-500' : 'text-blue-500'}>{val}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SnakeGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [dir, setDir] = useState({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakeHigh') || '0'));
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const moveSnake = useCallback(() => {
    if (gameOver) return;
    setSnake(prev => {
      const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
      if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || prev.some(s => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        return prev;
      }
      const next = [head, ...prev];
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
      } else {
        next.pop();
      }
      return next;
    });
  }, [dir, food, gameOver]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, 150);
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current); };
  }, [moveSnake]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (dir.y === 0) setDir({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (dir.y === 0) setDir({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (dir.x === 0) setDir({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (dir.x === 0) setDir({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-black/90 p-8">
      <div className="flex justify-between w-full max-w-[400px] mb-4 text-xs font-bold uppercase tracking-widest">
        <button onClick={onBack} className="text-gray-500 hover:text-white">← Exit</button>
        <div className="flex gap-4">
          <span className="text-orange-500">Score: {score}</span>
          <span className="text-gray-500">High: {highScore}</span>
        </div>
      </div>
      <div className="relative border-2 border-white/10 rounded overflow-hidden bg-black" style={{ width: 400, height: 400 }}>
        {snake.map((s, i) => <div key={i} className={`absolute w-[20px] h-[20px] rounded-sm ${i === 0 ? 'bg-orange-500 z-10' : 'bg-orange-900'}`} style={{ top: s.y * 20, left: s.x * 20 }} />)}
        <div className="absolute w-[20px] h-[20px] bg-red-500 rounded-full animate-pulse" style={{ top: food.y * 20, left: food.x * 20 }} />
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-black mb-4">GAME OVER</h3>
            <button onClick={() => {setSnake([{x:10,y:10}]); setScore(0); setGameOver(false); setDir({x:0,y:-1});}} className="px-6 py-2 bg-orange-500 rounded-full font-bold">Restart</button>
          </div>
        )}
      </div>
    </div>
  );
};

const GamesApp: React.FC = () => {
  const [game, setGame] = useState<'snake' | 'ttt' | null>(null);

  if (game === 'snake') return <SnakeGame onBack={() => setGame(null)} />;
  if (game === 'ttt') return <TicTacToe onBack={() => setGame(null)} />;

  return (
    <div className="h-full bg-[#1a1a1a] p-12 overflow-auto">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-black mb-12 flex items-center gap-4">
          <Gamepad2 size={40} className="text-orange-500" /> Games Archive
        </h2>
        <div className="grid gap-4">
          <button onClick={() => setGame('snake')} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl group-hover:scale-110 transition text-orange-500"><Gamepad2 /></div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Snake Xenzia</h3>
                <p className="text-xs text-gray-500">Classic arcade nostalgia</p>
              </div>
            </div>
            <ChevronRight />
          </button>
          <button onClick={() => setGame('ttt')} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-orange-500 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition text-blue-500"><Gamepad2 /></div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Tic-Tac-Toe</h3>
                <p className="text-xs text-gray-500">Local multiplayer mode</p>
              </div>
            </div>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesApp;
