import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Gamepad2, 
  Wallet, 
  Trophy, 
  User, 
  Gift, 
  ArrowLeft,
  Coins,
  Play,
  Clock,
  Target,
  History,
  Share2,
  Settings,
  Info,
  ChevronRight,
  TrendingUp,
  Star,
  Zap,
  Cat,
  MessageCircle,
  Loader2,
  DollarSign,
  Dog,
  Rabbit,
  Mouse,
  Volume2,
  VolumeX,
  Smartphone,
  Globe,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  RotateCw,
  Grid,
  MousePointer2,
  Gamepad,
  Smile,
  Ghost,
  Rocket,
  FileText
} from 'lucide-react';
import { api } from './services/api';
import { User as UserType, Transaction, Withdrawal, LevelConfig, Bubble, GameMode } from './types';
import { LEVELS, COLORS, REWARDS, CONVERSION_RATES, THEMES, CAT_TIPS, CURRENCIES, SPIN_REWARDS } from './constants';

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-600 to-teal-700 flex flex-col items-center justify-center z-[100] p-8">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        className="w-40 h-40 bg-white rounded-[50px] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] mb-8 relative group"
      >
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center shadow-xl animate-bounce border-4 border-white">
          <DollarSign className="w-8 h-8 text-white" />
        </div>
        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse border-4 border-white">
          <Coins className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <Gamepad2 className="w-16 h-16 text-emerald-600" />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full border-2 border-white" 
            />
          </div>
          <span className="text-emerald-800 font-black text-xs mt-2 uppercase tracking-tighter">Play & Earn</span>
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-black text-white mb-2 tracking-tight"
      >
        BUBBLE EARN
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        className="text-emerald-100 font-bold mb-12 uppercase tracking-[0.3em] text-[10px]"
      >
        Real Money Rewards
      </motion.p>

      <div className="w-full max-w-xs bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur-md">
        <motion.div 
          className="bg-amber-400 h-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-white/60 text-[10px] font-black mt-4 uppercase tracking-widest">
        Preparing Cash Vault... {progress}%
      </p>
    </div>
  );
};

const FloatingMoney = () => {
  const icons = [DollarSign, Cat, Dog, Rabbit, Mouse, Coins, Smile, Ghost, Rocket];
  const colors = ['text-emerald-500', 'text-amber-500', 'text-rose-500', 'text-indigo-500', 'text-purple-500', 'text-sky-500'];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-15">
      {Array.from({ length: 25 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const colorClass = colors[i % colors.length];
        return (
          <motion.div
            key={i}
            className={`absolute ${colorClass}`}
            initial={{ 
              x: Math.random() * 400, 
              y: 800 + Math.random() * 200,
              rotate: Math.random() * 360,
              scale: 0.3 + Math.random() * 0.7
            }}
            animate={{ 
              y: -200,
              rotate: Math.random() * 720
            }}
            transition={{ 
              duration: 15 + Math.random() * 25, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15
            }}
          >
            <Icon size={Math.random() * 30 + 15} />
          </motion.div>
        );
      })}
    </div>
  );
};

const CatHost = ({ tip }: { tip?: string }) => {
  const [currentTip, setCurrentTip] = useState(tip || CAT_TIPS[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!tip) {
      const interval = setInterval(() => {
        setCurrentTip(CAT_TIPS[Math.floor(Math.random() * CAT_TIPS.length)]);
      }, 8000);
      return () => clearInterval(interval);
    } else {
      setCurrentTip(tip);
    }
  }, [tip]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-2 max-w-[200px]"
        >
          <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 relative">
            <p className="text-[11px] font-bold text-slate-700 leading-tight">
              {currentTip}
            </p>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white rotate-45 border-r border-b border-slate-100" />
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute -top-2 -left-2 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[10px] text-slate-500"
            >
              ×
            </button>
          </div>
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-14 h-14 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white"
          >
            <Cat className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AdModal = ({ onComplete, onCancel }: { onComplete: () => void, onCancel: () => void }) => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-[200] p-8">
      <div className="w-full max-w-sm bg-white rounded-[40px] p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
          <motion.div 
            className="h-full bg-emerald-600"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>
        
        <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
          <PlayCircle className="w-10 h-10" />
        </div>
        
        <h2 className="text-2xl font-black text-slate-800 mb-2">Watching Ad...</h2>
        <p className="text-slate-500 mb-8 font-medium">Reward will be granted in {timeLeft}s</p>
        
        <div className="flex flex-col gap-3">
          <Button 
            disabled={timeLeft > 0} 
            onClick={onComplete}
            variant="primary"
          >
            {timeLeft > 0 ? `Wait ${timeLeft}s` : 'Claim Reward!'}
          </Button>
          <button onClick={onCancel} className="text-slate-400 text-sm font-bold py-2">
            Skip Ad (No Reward)
          </button>
        </div>
      </div>
    </div>
  );
};

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }: any) => {
  const variants: any = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 border-b-4 border-emerald-800",
    secondary: "bg-amber-400 text-amber-900 hover:bg-amber-500 border-b-4 border-amber-600",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    danger: "bg-rose-500 text-white hover:bg-rose-600 border-b-4 border-rose-800",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 p-6 ${className}`}>
    {children}
  </div>
);

// --- Screens ---

const HomeScreen = ({ onNavigate, user }: { onNavigate: (s: string) => void, user: UserType | null }) => {
  const currency = CURRENCIES[user?.currency || 'PKR'];
  
  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 relative">
      <FloatingMoney />
      <div className="flex justify-between items-center relative z-10">
        <button onClick={() => onNavigate('settings')} className="p-2 bg-white rounded-full shadow-sm border border-emerald-100">
          <Settings className="w-5 h-5 text-emerald-600" />
        </button>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
          <div className="flex flex-col items-end">
            <span className="font-black text-slate-800 leading-none">{user?.coins || 0}</span>
            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">
              ≈ {currency.symbol} {((user?.coins || 0) * (CONVERSION_RATES[0].money / CONVERSION_RATES[0].coins) * currency.rate).toFixed(2)}
            </span>
          </div>
          <Coins className="w-5 h-5 text-amber-500" />
        </div>
      </div>

      <div className="text-center relative z-10">
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-amber-500 to-rose-500 tracking-tight">BUBBLE EARN</h1>
        <p className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Play • Earn • Cash Out</p>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <Card className="col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-none shadow-xl shadow-emerald-200 relative overflow-hidden group">
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="opacity-70 text-[10px] font-black uppercase tracking-widest mb-1">Current Level</p>
                <h2 className="text-4xl font-black">Level {user?.level || 1}</h2>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-lg border border-white/20">
                <Gamepad2 className="w-8 h-8" />
              </div>
            </div>
            <div className="mt-8 flex gap-3">
              <Button onClick={() => onNavigate('game')} className="flex-1 bg-amber-400 text-emerald-900 hover:bg-amber-500 shadow-lg border-b-4 border-amber-600">
                BUBBLE BLAST
              </Button>
            </div>
          </div>
        </Card>

        <button onClick={() => onNavigate('spin')} className="p-5 bg-white rounded-[32px] border border-emerald-100 shadow-sm flex flex-col items-center gap-3 transition-all active:scale-95 hover:shadow-md group">
          <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 group-hover:rotate-180 transition-transform duration-500">
            <RotateCw className="w-7 h-7" />
          </div>
          <span className="font-black text-slate-700 text-xs uppercase tracking-wider">Lucky Spin</span>
        </button>

        <button onClick={() => onNavigate('tictactoe')} className="p-5 bg-white rounded-[32px] border border-emerald-100 shadow-sm flex flex-col items-center gap-3 transition-all active:scale-95 hover:shadow-md">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
            <Grid className="w-7 h-7" />
          </div>
          <span className="font-black text-slate-700 text-xs uppercase tracking-wider">Tic Tac Toe</span>
        </button>

        <button onClick={() => onNavigate('clicker')} className="p-5 bg-white rounded-[32px] border border-emerald-100 shadow-sm flex flex-col items-center gap-3 transition-all active:scale-95 hover:shadow-md">
          <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
            <MousePointer2 className="w-7 h-7" />
          </div>
          <span className="font-black text-slate-700 text-xs uppercase tracking-wider">Cash Clicker</span>
        </button>

        <button onClick={() => onNavigate('daily')} className="p-5 bg-white rounded-[32px] border border-emerald-100 shadow-sm flex flex-col items-center gap-3 transition-all active:scale-95 hover:shadow-md">
          <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <Gift className="w-7 h-7" />
          </div>
          <span className="font-black text-slate-700 text-xs uppercase tracking-wider">Daily Cash</span>
        </button>

        <button onClick={() => onNavigate('memory')} className="p-5 bg-white rounded-[32px] border border-emerald-100 shadow-sm flex flex-col items-center gap-3 transition-all active:scale-95 hover:shadow-md">
          <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
            <Gamepad className="w-7 h-7" />
          </div>
          <span className="font-black text-slate-700 text-xs uppercase tracking-wider">Memory Match</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
        <h3 className="font-black text-slate-800 px-1 text-lg">Earning Missions</h3>
        
        <button 
          onClick={() => onNavigate('ad-reward')}
          className="w-full p-5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-[32px] border-b-4 border-orange-600 flex items-center justify-between group active:translate-y-1 active:border-b-0 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
              <PlayCircle className="w-7 h-7" />
            </div>
            <div className="text-left">
              <p className="font-black text-white text-sm uppercase tracking-wider">Instant Cash</p>
              <p className="text-white/80 text-[10px] font-bold">Watch Ad for 100 Coins</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <CatHost />
    </div>
  );
};

const GameScreen = ({ onBack, user, onLevelComplete }: { onBack: () => void, user: UserType | null, onLevelComplete: (coins: number) => void }) => {
  const [level, setLevel] = useState<LevelConfig>(LEVELS[(user?.level || 1) - 1]);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(level.timeLimit || 60);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [poppedCount, setPoppedCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [rewardDoubled, setRewardDoubled] = useState(false);

  const initGame = useCallback(() => {
    const newBubbles: Bubble[] = [];
    const rows = 8;
    const cols = 6;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        newBubbles.push({
          id: r * cols + c,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          x: c,
          y: r,
        });
      }
    }
    setBubbles(newBubbles);
    setScore(0);
    setPoppedCount(0);
    setTimeLeft(level.timeLimit || 60);
    setGameState('playing');
    setRewardDoubled(false);
  }, [level]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (level.timeLimit) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('lost');
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState, level.timeLimit]);

  const handlePop = (id: number) => {
    if (gameState !== 'playing') return;

    const bubble = bubbles.find(b => b.id === id);
    if (!bubble) return;

    // Find connected bubbles of same color
    const connected: number[] = [];
    const queue = [bubble];
    const visited = new Set([id]);

    while (queue.length > 0) {
      const current = queue.shift()!;
      connected.push(current.id);

      const neighbors = bubbles.filter(b => {
        if (visited.has(b.id)) return false;
        if (b.color !== bubble.color) return false;
        const dx = Math.abs(b.x - current.x);
        const dy = Math.abs(b.y - current.y);
        return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
      });

      neighbors.forEach(n => {
        visited.add(n.id);
        queue.push(n);
      });
    }

    if (connected.length >= 2) {
      const newBubbles = bubbles.map(b => 
        connected.includes(b.id) ? { ...b, isPopping: true } : b
      );
      setBubbles(newBubbles);

      setTimeout(() => {
        const remaining = bubbles.filter(b => !connected.includes(b.id));
        // Simple gravity: bubbles fall down
        // In a real game we'd implement more complex physics
        setBubbles(remaining);
        setScore(prev => prev + connected.length * 10);
        setPoppedCount(prev => {
          const next = prev + connected.length;
          if (next >= level.target) {
            setGameState('won');
            onLevelComplete(REWARDS.LEVEL_WIN);
          }
          return next;
        });
      }, 200);
    }
  };

  const theme = THEMES[level.theme];

  return (
    <div className={`fixed inset-0 flex flex-col ${theme.bg} transition-colors duration-500`}>
      <div className="p-6 flex justify-between items-center bg-white/30 backdrop-blur-xl border-b border-white/20 z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <ArrowLeft className={`w-6 h-6 ${level.theme === 'Space' ? 'text-white' : 'text-slate-800'}`} />
        </button>
        <div className="flex flex-col items-center">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${level.theme === 'Space' ? 'text-indigo-300' : 'text-slate-500'}`}>Level {level.id}</span>
          <div className="flex items-center gap-2">
            <Target className={`w-4 h-4 ${theme.accent}`} />
            <span className={`font-black text-lg ${level.theme === 'Space' ? 'text-white' : 'text-slate-800'}`}>{poppedCount} / {level.target}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30">
          <Clock className="w-4 h-4 text-rose-400" />
          <span className={`font-black ${level.theme === 'Space' ? 'text-white' : 'text-slate-800'}`}>{timeLeft}s</span>
        </div>
      </div>

      <div className="flex-1 relative p-6 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              initial={{ 
                width: Math.random() * 100 + 50, 
                height: Math.random() * 100 + 50,
                x: Math.random() * 400,
                y: Math.random() * 800,
                opacity: 0.1
              }}
              animate={{ 
                y: [null, Math.random() * -200],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ 
                duration: Math.random() * 10 + 5, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-6 gap-2 w-full max-w-md aspect-[3/4] bg-white/10 backdrop-blur-md p-4 rounded-[40px] border-4 border-white/30 shadow-2xl relative z-10 overflow-hidden">
          {/* Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 pointer-events-none opacity-10">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white" />
            ))}
          </div>
          
          {bubbles.map((b) => (
            <motion.button
              key={b.id}
              layout
              initial={{ scale: 0 }}
              animate={{ 
                scale: b.isPopping ? 1.8 : 1,
                opacity: b.isPopping ? 0 : 1,
                y: 0
              }}
              onClick={() => handlePop(b.id)}
              className="aspect-square rounded-full shadow-lg relative overflow-hidden group active:scale-90 transition-transform"
              style={{ 
                backgroundColor: b.color,
                boxShadow: `inset -4px -4px 8px rgba(0,0,0,0.2), inset 4px 4px 8px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.1)`
              }}
            >
              <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-white/40 rounded-full blur-[1px]" />
              <div className="absolute inset-0 border-2 border-white/30 rounded-full" />
              <div className="absolute bottom-[10%] right-[10%] w-[20%] h-[20%] bg-black/10 rounded-full blur-[1px]" />
            </motion.button>
          ))}
        </div>
      </div>

      <CatHost tip={gameState === 'playing' ? (poppedCount > level.target / 2 ? "Almost there! Keep popping!" : "Focus on the big groups!") : undefined} />

      <AnimatePresence>
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[40px] p-8 w-full max-w-sm text-center shadow-2xl"
            >
              <div className={`w-24 h-24 mx-auto rounded-3xl flex items-center justify-center mb-6 ${gameState === 'won' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                {gameState === 'won' ? <Trophy className="w-12 h-12" /> : <Gamepad2 className="w-12 h-12" />}
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">
                {gameState === 'won' ? 'Level Clear!' : 'Game Over'}
              </h2>
              <p className="text-slate-500 mb-8">
                {gameState === 'won' ? `You earned ${rewardDoubled ? REWARDS.LEVEL_WIN * 2 : REWARDS.LEVEL_WIN} coins!` : 'Don\'t give up, try again!'}
              </p>
              <div className="flex flex-col gap-3">
                {gameState === 'won' && !rewardDoubled && (
                  <button 
                    onClick={() => setShowAd(true)}
                    className="w-full py-4 bg-amber-400 text-amber-900 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg border-b-4 border-amber-600 active:translate-y-1 active:border-b-0 transition-all"
                  >
                    <PlayCircle className="w-5 h-5" />
                    DOUBLE REWARD (AD)
                  </button>
                )}
                <Button onClick={initGame} variant={gameState === 'won' ? 'secondary' : 'primary'}>
                  {gameState === 'won' ? 'Next Level' : 'Try Again'}
                </Button>
                <Button onClick={onBack} variant="ghost">
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAd && (
        <AdModal 
          onComplete={async () => {
            setShowAd(false);
            setRewardDoubled(true);
            await api.earnCoins(REWARDS.LEVEL_WIN, `Ad Bonus (Level ${level.id})`);
            onLevelComplete(0); // Just refresh user, don't add more coins
          }}
          onCancel={() => setShowAd(false)}
        />
      )}
    </div>
  );
};

const WalletScreen = ({ user, onNavigate }: { user: UserType | null, onNavigate: (s: string) => void }) => {
  const [history, setHistory] = useState<{ history: Transaction[], withdrawals: Withdrawal[] }>({ history: [], withdrawals: [] });
  const currency = CURRENCIES[user?.currency || 'PKR'];

  useEffect(() => {
    api.getHistory().then(setHistory);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-slate-50 relative overflow-hidden">
      <FloatingMoney />
      <div className="flex items-center gap-4 relative z-10">
        <button onClick={() => onNavigate('home')} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-slate-800" />
        </button>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">My Earnings</h1>
      </div>

      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none relative overflow-hidden z-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full -mr-16 -mt-16 blur-3xl" />
        <p className="opacity-60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Available Balance</p>
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-black tracking-tighter">{user?.coins || 0}</h2>
          <div className="flex flex-col">
            <span className="text-emerald-400 font-black text-xs uppercase">Coins</span>
            <span className="text-white/40 font-bold text-[10px]">≈ {currency.symbol} {( (user?.coins || 0) * (CONVERSION_RATES[0].money / CONVERSION_RATES[0].coins) * currency.rate ).toFixed(2)}</span>
          </div>
        </div>
        <div className="mt-8 flex gap-4">
          <Button onClick={() => onNavigate('redeem')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 border-b-4 border-emerald-800">
            CASH OUT NOW
          </Button>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-slate-800">Recent History</h3>
          <button className="text-xs font-bold text-emerald-600 uppercase tracking-wider">View All</button>
        </div>
        
        <div className="flex flex-col gap-3">
          {history.history.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <History className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>No transactions yet</p>
            </div>
          ) : (
            history.history.map((t) => (
              <Card key={t.id} className="flex items-center gap-4 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'earn' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {t.type === 'earn' ? <TrendingUp className="w-5 h-5" /> : <ChevronRight className="w-5 h-5 rotate-90" />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-800">{t.description}</p>
                  <p className="text-xs text-slate-400">{new Date(t.timestamp).toLocaleDateString()}</p>
                </div>
                <span className={`font-black ${t.type === 'earn' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {t.type === 'earn' ? '+' : ''}{t.amount}
                </span>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const RedeemScreen = ({ user, onBack, onRedeem }: { user: UserType | null, onBack: () => void, onRedeem: () => void }) => {
  const [selectedRate, setSelectedRate] = useState(CONVERSION_RATES[0]);
  const [method, setMethod] = useState<'EasyPaisa' | 'JazzCash' | 'PayPal'>('EasyPaisa');
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const currency = CURRENCIES[user?.currency || 'PKR'];

  const handleRedeem = async () => {
    if (!account) return alert('Please enter account number/email');
    if ((user?.coins || 0) < selectedRate.coins) return alert('Insufficient coins');

    setLoading(true);
    try {
      await api.redeemCoins(selectedRate.coins, selectedRate.money, method, account);
      alert('Withdrawal request submitted successfully!');
      onRedeem();
    } catch (e: any) {
      alert(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-white">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-slate-800">Withdraw Cash</h1>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-black text-slate-800 px-1">Select Cash Amount</h3>
        <div className="grid grid-cols-1 gap-3">
          {CONVERSION_RATES.map((rate) => (
            <button
              key={rate.coins}
              onClick={() => setSelectedRate(rate)}
              className={`p-5 rounded-3xl border-2 transition-all flex justify-between items-center ${selectedRate.coins === rate.coins ? 'border-emerald-600 bg-emerald-50' : 'border-slate-100 bg-white'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedRate.coins === rate.coins ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Coins className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-black text-slate-800">{rate.coins} Coins</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ready to Cash</p>
                </div>
              </div>
              <span className="text-xl font-black text-emerald-600">{currency.symbol} {(rate.money * currency.rate).toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-black text-slate-800 px-1">Redeem Method</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setMethod('EasyPaisa')}
            className={`p-3 rounded-2xl border-2 font-black text-xs transition-all ${method === 'EasyPaisa' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-400'}`}
          >
            EasyPaisa
          </button>
          <button
            onClick={() => setMethod('JazzCash')}
            className={`p-3 rounded-2xl border-2 font-black text-xs transition-all ${method === 'JazzCash' ? 'border-rose-500 bg-rose-50 text-rose-700' : 'border-slate-100 bg-white text-slate-400'}`}
          >
            JazzCash
          </button>
          <button
            onClick={() => setMethod('PayPal')}
            className={`p-3 rounded-2xl border-2 font-black text-xs transition-all ${method === 'PayPal' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 bg-white text-slate-400'}`}
          >
            PayPal
          </button>
        </div>
        <input
          type="text"
          placeholder={method === 'PayPal' ? "PayPal Email Address" : "Account Number (03xx xxxxxxx)"}
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-emerald-600 outline-none font-bold"
        />
      </div>

      <div className="mt-4">
        <Button onClick={handleRedeem} disabled={loading} className="w-full py-4 text-lg bg-emerald-600 hover:bg-emerald-700 border-b-4 border-emerald-800">
          {loading ? 'Processing...' : `CASH OUT ${currency.symbol} ${(selectedRate.money * currency.rate).toFixed(2)}`}
        </Button>
        <p className="text-center text-[10px] font-black text-slate-400 mt-4 px-6 uppercase tracking-widest">
          Payments are processed within 24 hours. Offline mode enabled.
        </p>
      </div>
    </div>
  );
};

const LeaderboardScreen = ({ onBack }: { onBack: () => void }) => {
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    api.getLeaderboard().then(setLeaders);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-slate-50 relative overflow-hidden">
      <FloatingMoney />
      <div className="flex items-center gap-4 relative z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Leaderboard</h1>
      </div>

      <div className="flex flex-col gap-3">
        {leaders.map((l, i) => (
          <Card key={l.id} className="flex items-center gap-4 py-4 hover:border-emerald-200 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-slate-100 text-slate-600' : i === 2 ? 'bg-orange-100 text-orange-600' : 'bg-slate-50 text-slate-400'}`}>
              {i + 1}
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-slate-800">{l.id}</p>
              <p className="text-xs text-slate-400">Level {l.level}</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <Coins className="w-4 h-4" />
              <span className="font-black">{l.coins}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SpinWheelScreen = ({ user, onBack, onUpdate }: { user: UserType | null, onBack: () => void, onUpdate: () => void }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showDoubleAd, setShowDoubleAd] = useState(false);

  const handleSpin = async () => {
    if (isSpinning) return;
    if ((user?.spins || 0) <= 0) return alert('No spins left! Watch an ad to get more.');

    setIsSpinning(true);
    await api.useSpin();
    
    const extraRotation = 1800 + Math.random() * 360;
    const newRotation = rotation + extraRotation;
    setRotation(newRotation);

    setTimeout(async () => {
      setIsSpinning(false);
      const normalizedRotation = newRotation % 360;
      const index = Math.floor((360 - normalizedRotation) / (360 / SPIN_REWARDS.length)) % SPIN_REWARDS.length;
      const reward = SPIN_REWARDS[index];
      setResult(reward);
      await api.earnCoins(reward.value, 'Lucky Spin Reward');
      onUpdate();
    }, 4000);
  };

  const handleDoubleReward = async () => {
    if (!result) return;
    await api.earnCoins(result.value, 'Lucky Spin Reward (Double)');
    onUpdate();
    setResult(null);
    setShowDoubleAd(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <FloatingMoney />
      <div className="flex items-center justify-between relative z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
          <RotateCw className="w-4 h-4 text-rose-400" />
          <span className="font-black">{user?.spins || 0} Spins</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="relative w-72 h-72">
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-2xl animate-pulse" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-10 bg-amber-400 z-20 shadow-lg" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
          
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: "circOut" }}
            className="w-full h-full rounded-full border-8 border-slate-800 shadow-2xl relative overflow-hidden"
          >
            {SPIN_REWARDS.map((reward, i) => (
              <div
                key={i}
                className="absolute top-0 left-1/2 w-1/2 h-full origin-left flex items-center justify-center"
                style={{ 
                  transform: `rotate(${i * (360 / SPIN_REWARDS.length)}deg)`,
                  backgroundColor: reward.color,
                  clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 50%)'
                }}
              >
                <span className="font-black text-white text-lg -rotate-90 translate-x-12">{reward.label}</span>
              </div>
            ))}
          </motion.div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full shadow-xl z-10 flex items-center justify-center">
              <div className="w-8 h-8 bg-slate-900 rounded-full" />
            </div>
          </div>
        </div>

        <div className="mt-12 w-full flex flex-col gap-4">
          <Button 
            disabled={isSpinning || (user?.spins || 0) <= 0} 
            onClick={handleSpin}
            className="w-full py-5 text-xl bg-rose-600 hover:bg-rose-700 border-rose-900"
          >
            {isSpinning ? 'SPINNING...' : 'SPIN NOW'}
          </Button>
          
          <button 
            onClick={() => setShowAd(true)}
            className="w-full py-4 bg-amber-400 text-amber-900 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg border-b-4 border-amber-600"
          >
            <PlayCircle className="w-5 h-5" />
            WATCH AD FOR 3 SPINS
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && !isSpinning && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-8"
          >
            {result.value >= 100 && <Confetti />}
            <Card className="w-full max-w-sm text-center p-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Coins className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-2">YOU WON!</h2>
              <p className="text-slate-500 mb-8 font-bold text-lg">+{result.value} Coins added to wallet</p>
              <div className="flex flex-col gap-3">
                <Button onClick={() => setShowDoubleAd(true)} className="w-full bg-amber-400 text-amber-900 border-amber-600">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  DOUBLE REWARD (AD)
                </Button>
                <Button onClick={() => setResult(null)} variant="ghost" className="w-full">NO THANKS</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {showDoubleAd && (
        <AdModal 
          onComplete={handleDoubleReward}
          onCancel={() => setShowDoubleAd(false)}
        />
      )}

      {showAd && (
        <AdModal 
          onComplete={async () => {
            setShowAd(false);
            await api.addSpins(REWARDS.SPIN_AD_REWARD);
            onUpdate();
          }}
          onCancel={() => setShowAd(false)}
        />
      )}
    </div>
  );
};

const TicTacToeScreen = ({ onBack, onUpdate }: { onBack: () => void, onUpdate: () => void }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (winner || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [winner, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && !winner) {
      setWinner('Timeout');
    }
  }, [timeLeft, winner]);

  const calculateWinner = (squares: any[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = async (i: number) => {
    if (winner || board[i] || timeLeft <= 0) return;
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      await api.earnCoins(20, 'Tic Tac Toe Win');
      onUpdate();
      return;
    }

    if (newBoard.every(s => s !== null)) {
      setWinner('Draw');
      return;
    }

    // AI Move
    setIsXNext(false);
    setTimeout(() => {
      const emptyIndices = newBoard.map((s, idx) => s === null ? idx : null).filter(v => v !== null);
      const aiMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)] as number;
      newBoard[aiMove] = 'O';
      setBoard(newBoard);
      const aiWin = calculateWinner(newBoard);
      if (aiWin) setWinner(aiWin);
      setIsXNext(true);
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-indigo-600 text-white relative overflow-hidden">
      <FloatingMoney />
      <div className="flex items-center gap-4 relative z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black">Tic Tac Toe</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="mb-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-indigo-200 font-black uppercase tracking-widest text-[10px]">Time</p>
              <p className={`text-xl font-black ${timeLeft < 10 ? 'text-rose-400' : 'text-white'}`}>{timeLeft}s</p>
            </div>
          </div>
          <h2 className="text-2xl font-black">
            {winner ? (winner === 'Draw' ? "It's a Draw!" : winner === 'Timeout' ? "Time's Up!" : `${winner} Wins!`) : (isXNext ? "Your Turn (X)" : "AI Thinking...")}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full max-w-[300px]">
          {board.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="aspect-square bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 flex items-center justify-center text-4xl font-black transition-all active:scale-90"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={square === 'X' ? 'text-amber-400' : 'text-rose-400'}
              >
                {square}
              </motion.span>
            </button>
          ))}
        </div>

        <div className="mt-12 w-full max-w-[300px] flex flex-col gap-3">
          {winner === 'X' && <Confetti />}
          {winner === 'X' && (
            <Button onClick={() => setShowAd(true)} className="w-full py-4 bg-amber-400 text-amber-900 border-amber-600">
              <PlayCircle className="w-5 h-5 mr-2" />
              DOUBLE WIN REWARD (AD)
            </Button>
          )}
          <Button onClick={resetGame} className="w-full py-4 bg-white text-indigo-600 hover:bg-indigo-50">
            {winner ? 'PLAY AGAIN' : 'RESET GAME'}
          </Button>
        </div>
      </div>

      {showAd && (
        <AdModal 
          onComplete={async () => {
            await api.earnCoins(20, 'Tic Tac Toe Win (Double)');
            onUpdate();
            setShowAd(false);
          }}
          onCancel={() => setShowAd(false)}
        />
      )}
    </div>
  );
};

const ClickerScreen = ({ onBack, onUpdate }: { onBack: () => void, onUpdate: () => void }) => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsFinished(true);
      setIsStarted(false);
      api.earnCoins(Math.floor(clicks / 5), 'Cash Clicker Reward').then(() => onUpdate());
    }
  }, [isStarted, timeLeft, clicks, onUpdate]);

  const startGame = () => {
    setClicks(0);
    setTimeLeft(15);
    setIsStarted(true);
    setIsFinished(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-amber-500 text-white relative overflow-hidden">
      <FloatingMoney />
      <div className="flex items-center gap-4 relative z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black">Cash Clicker</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {!isStarted && !isFinished ? (
          <div className="text-center">
            <div className="w-24 h-24 bg-white/20 rounded-[40px] flex items-center justify-center mx-auto mb-6">
              <MousePointer2 className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black mb-4">Tap Fast!</h2>
            <p className="text-amber-100 mb-8 font-bold">Tap the dollar as many times as you can in 15 seconds!</p>
            <Button onClick={startGame} className="w-full py-4 bg-white text-amber-600">START GAME</Button>
          </div>
        ) : isStarted ? (
          <div className="text-center w-full">
            <div className="mb-12 flex justify-between items-center px-8">
              <div className="text-left">
                <p className="text-amber-100 text-[10px] font-black uppercase tracking-widest">Time Left</p>
                <p className="text-3xl font-black">{timeLeft}s</p>
              </div>
              <div className="text-right">
                <p className="text-amber-100 text-[10px] font-black uppercase tracking-widest">Clicks</p>
                <p className="text-3xl font-black">{clicks}</p>
              </div>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setClicks(c => c + 1)}
              className="w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center text-amber-600 border-8 border-amber-400"
            >
              <DollarSign className="w-24 h-24" />
            </motion.button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-4xl font-black mb-2">TIME'S UP!</h2>
            <p className="text-amber-100 mb-8 text-xl font-bold">You clicked {clicks} times!</p>
            <Card className="mb-8 p-6 bg-white/20 border-none text-white">
              <p className="text-sm font-black uppercase tracking-widest mb-1">Reward Earned</p>
              <div className="flex items-center justify-center gap-2">
                <Coins className="w-6 h-6 text-amber-300" />
                <span className="text-3xl font-black">+{Math.floor(clicks / 5)}</span>
              </div>
            </Card>
            <div className="flex flex-col gap-3">
              <Button onClick={() => setShowAd(true)} className="w-full py-4 bg-white text-amber-600">
                <PlayCircle className="w-5 h-5 mr-2 inline" />
                DOUBLE REWARD (AD)
              </Button>
              <Button onClick={startGame} variant="ghost" className="w-full text-white">PLAY AGAIN</Button>
              <Button onClick={onBack} variant="ghost" className="text-white">BACK TO HOME</Button>
            </div>
          </div>
        )}
      </div>

      {showAd && (
        <AdModal 
          onComplete={async () => {
            await api.earnCoins(Math.floor(clicks / 5), 'Cash Clicker Reward (Double)');
            onUpdate();
            setShowAd(false);
          }}
          onCancel={() => setShowAd(false)}
        />
      )}
    </div>
  );
};

const MemoryGameScreen = ({ onBack, onUpdate }: { onBack: () => void, onUpdate: () => void }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const icons = [Smile, Ghost, Rocket, Cat, Dog, Rabbit, Mouse, Zap];

  useEffect(() => {
    if (isGameOver || solved.length === cards.length) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isGameOver, solved.length, cards.length]);

  useEffect(() => {
    if (timeLeft === 0) setIsGameOver(true);
  }, [timeLeft]);

  useEffect(() => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, i) => ({ id: i, Icon }));
    setCards(deck);
  }, []);

  const handleClick = (id: number) => {
    if (flipped.length === 2 || flipped.includes(id) || solved.includes(id) || isGameOver) return;
    
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].Icon === cards[second].Icon) {
        setSolved([...solved, first, second]);
        setFlipped([]);
        if (solved.length + 2 === cards.length) {
          api.earnCoins(50, 'Memory Game Win').then(() => onUpdate());
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const resetGame = () => {
    const deck = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((Icon, i) => ({ id: i, Icon }));
    setCards(deck);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setTimeLeft(60);
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-purple-600 text-white relative overflow-hidden">
      <FloatingMoney />
      <div className="flex items-center justify-between relative z-10">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="font-black text-xs uppercase tracking-widest">Time: {timeLeft}s</span>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <span className="font-black text-xs uppercase tracking-widest">Moves: {moves}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="grid grid-cols-4 gap-2 w-full max-w-[320px]">
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => handleClick(i)}
              className={`aspect-square rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${flipped.includes(i) || solved.includes(i) ? 'bg-white text-purple-600 border-white rotate-y-180' : 'bg-white/10 border-white/20'}`}
            >
              {(flipped.includes(i) || solved.includes(i)) ? <card.Icon className="w-8 h-8" /> : <div className="w-4 h-4 bg-white/20 rounded-full" />}
            </button>
          ))}
        </div>

        {(solved.length === cards.length && cards.length > 0) || isGameOver ? (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-8 text-center bg-white/20 backdrop-blur-lg p-6 rounded-[32px] w-full max-w-[320px]"
          >
            {solved.length === cards.length && <Confetti />}
            <h2 className="text-3xl font-black mb-2">{isGameOver ? "TIME'S UP!" : "MATCHED ALL!"}</h2>
            {!isGameOver && <p className="text-purple-100 mb-6 font-bold">+50 Coins earned!</p>}
            <div className="flex flex-col gap-3">
              {!isGameOver && (
                <Button onClick={() => setShowAd(true)} className="bg-amber-400 text-amber-900 border-amber-600">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  DOUBLE REWARD (AD)
                </Button>
              )}
              <Button onClick={resetGame} className="bg-white text-purple-600">PLAY AGAIN</Button>
              <Button onClick={onBack} variant="ghost" className="text-white">BACK TO HOME</Button>
            </div>
          </motion.div>
        ) : null}
      </div>

      {showAd && (
        <AdModal 
          onComplete={async () => {
            await api.earnCoins(50, 'Memory Game Win (Double)');
            onUpdate();
            setShowAd(false);
          }}
          onCancel={() => setShowAd(false)}
        />
      )}
    </div>
  );
};

const SettingsScreen = ({ user, onBack, onUpdate }: { user: UserType | null, onBack: () => void, onUpdate: () => void }) => {
  const [currency, setCurrency] = useState(user?.currency || 'PKR');
  const [sound, setSound] = useState(user?.soundEnabled ?? true);
  const [vibration, setVibration] = useState(user?.vibrationEnabled ?? true);

  const handleSave = async () => {
    await api.updateSettings({ currency: currency as any, soundEnabled: sound, vibrationEnabled: vibration });
    onUpdate();
    onBack();
  };

  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen bg-slate-50 relative overflow-hidden">
      <FloatingMoney />
      <div className="flex items-center gap-4 relative z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black text-slate-800">Settings</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="font-black text-slate-800 px-1 text-sm uppercase tracking-widest opacity-50">Currency</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(CURRENCIES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setCurrency(key as any)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${currency === key ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-white bg-white text-slate-400'}`}
              >
                <span className="text-xl font-black">{value.symbol}</span>
                <span className="text-[10px] font-bold uppercase">{value.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-black text-slate-800 px-1 text-sm uppercase tracking-widest opacity-50">Preferences</h3>
          <Card className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  {sound ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <span className="font-bold">Sound Effects</span>
              </div>
              <button 
                onClick={() => setSound(!sound)}
                className={`w-12 h-6 rounded-full transition-colors relative ${sound ? 'bg-emerald-600' : 'bg-slate-200'}`}
              >
                <motion.div 
                  animate={{ x: sound ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="font-bold">Vibration</span>
              </div>
              <button 
                onClick={() => setVibration(!vibration)}
                className={`w-12 h-6 rounded-full transition-colors relative ${vibration ? 'bg-emerald-600' : 'bg-slate-200'}`}
              >
                <motion.div 
                  animate={{ x: vibration ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
                />
              </button>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-auto">
        <Button onClick={handleSave} className="w-full py-4 text-lg">
          Save Settings
        </Button>
      </div>
    </div>
  );
};

// --- Main App ---

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: ['#FFD700', '#FF4500', '#00FF00', '#00BFFF', '#FF1493'][i % 5],
            left: `${Math.random() * 100}%`,
            top: `-20px`
          }}
          animate={{ 
            y: ['0vh', '110vh'],
            x: [`${Math.random() * 20 - 10}vw`, `${Math.random() * 40 - 20}vw`],
            rotate: [0, 360 * 2]
          }}
          transition={{ 
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

const LiveRedemptions = () => {
  const [notification, setNotification] = useState<{ name: string, account: string, amount: number } | null>(null);
  const names = [
    "Ahmed", "Sara", "Zain", "Fatima", "Ali", "Ayesha", "Hamza", "Hira", 
    "Usman", "Amna", "Bilal", "Sana", "Omer", "Khadija", "Hassan", "Zoya",
    "Mustafa", "Noor", "Raza", "Maham", "Fahad", "Iqra", "Saad", "Laiba"
  ];
  const amounts = [50, 100, 150, 200, 500, 1000];

  useEffect(() => {
    const showNext = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const account = `03${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}****${Math.floor(Math.random() * 1000)}`;
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      
      setNotification({ name, account, amount });
      
      setTimeout(() => {
        setNotification(null);
        setTimeout(showNext, 5000 + Math.random() * 10000);
      }, 4000);
    };

    const initialTimeout = setTimeout(showNext, 3000);
    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-6 right-6 z-[100] pointer-events-none"
        >
          <div className="bg-white/90 backdrop-blur-md border border-emerald-100 shadow-xl rounded-2xl p-3 flex items-center gap-3 max-w-xs mx-auto">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Recent Redemption</p>
              <p className="text-xs font-bold text-slate-800 truncate">
                {notification.name} ({notification.account})
              </p>
              <p className="text-[10px] font-bold text-slate-400">
                Redeemed <span className="text-emerald-600 font-black">Rs {notification.amount}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PrivacyPolicyScreen = ({ onAccept }: { onAccept: () => void }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6 pb-24 relative overflow-hidden">
      <FloatingMoney />
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Privacy Policy</h1>
          <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-1">Bubble Earn</p>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-6 text-sm text-slate-600 leading-relaxed font-medium">
          <p className="mb-4">This Privacy Policy explains how our game collects, uses, and protects user information.</p>
          <p className="mb-6">By using this app, you agree to the practices described in this policy.</p>
          
          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">1. Information We Collect</h3>
          <p className="mb-2">We may collect limited information such as:</p>
          <ul className="mb-6 space-y-1">
            <li>• Username or profile name</li>
            <li>• Game progress</li>
            <li>• Coins earned</li>
            <li>• Device information (such as device type or OS)</li>
          </ul>

          <p className="mb-2 font-bold text-slate-400 uppercase text-[10px]">We do not collect sensitive personal data like:</p>
          <ul className="mb-6 space-y-1 text-rose-500 font-bold">
            <li>❌ Passwords</li>
            <li>❌ Messages</li>
            <li>❌ Contacts</li>
            <li>❌ Photos</li>
          </ul>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">2. How We Use Information</h3>
          <p className="mb-2">Collected data is used to:</p>
          <ul className="mb-6 space-y-1">
            <li>• Save game progress</li>
            <li>• Manage coin rewards</li>
            <li>• Improve gameplay experience</li>
            <li>• Prevent cheating or misuse</li>
          </ul>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">3. Ads</h3>
          <p className="mb-2">This app may display advertisements.</p>
          <p className="mb-2 font-bold text-slate-400 uppercase text-[10px]">Ad providers may collect:</p>
          <ul className="mb-6 space-y-1">
            <li>• Device identifiers</li>
            <li>• General usage data</li>
          </ul>
          <p className="mb-6">This helps show relevant ads.</p>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">4. Coin Rewards</h3>
          <p className="mb-2">Coins are earned through gameplay activities like:</p>
          <ul className="mb-4 space-y-1">
            <li>• Completing levels</li>
            <li>• Daily rewards</li>
            <li>• In-game challenges</li>
          </ul>
          <p className="mb-2">Coins are virtual rewards and:</p>
          <ul className="mb-6 space-y-1 text-emerald-600 font-bold">
            <li>✔️ Do not represent gambling</li>
            <li>✔️ Have no real-world value until redeemed according to app rules</li>
          </ul>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">5. Payments & Withdrawals</h3>
          <p className="mb-2">If users choose to redeem coins:</p>
          <ul className="mb-6 space-y-1">
            <li>• Basic wallet details may be required</li>
            <li>• This is only used for reward transfer</li>
            <li>• We do not store financial passwords</li>
          </ul>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">6. Children’s Privacy</h3>
          <p className="mb-6">This game is suitable for general audiences. We do not knowingly collect personal information from children.</p>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">7. Data Security</h3>
          <p className="mb-6">We use reasonable measures to protect user data and prevent unauthorized access.</p>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">8. Third-Party Services</h3>
          <p className="mb-2">The app may use:</p>
          <ul className="mb-6 space-y-1">
            <li>• Advertising services</li>
            <li>• Cloud storage</li>
          </ul>
          <p className="mb-6">These services may collect limited technical data.</p>

          <h3 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-wider">9. Changes to Policy</h3>
          <p className="mb-4">We may update this Privacy Policy in future. Users are encouraged to review it periodically.</p>
        </div>

        <div className="mt-auto">
          <Button onClick={onAccept} className="w-full py-4 bg-emerald-600 text-white shadow-xl shadow-emerald-200">
            I AGREE & CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState<boolean | null>(null);

  const refreshUser = useCallback(async () => {
    const data = await api.getUser();
    setUser(data);
  }, []);

  useEffect(() => {
    refreshUser();
    const accepted = localStorage.getItem('bubble_earn_policy_accepted');
    setHasAcceptedPolicy(accepted === 'true');
  }, [refreshUser]);

  const handleLevelComplete = async (coins: number) => {
    await api.earnCoins(coins, `Level ${user?.level} Completion`);
    refreshUser();
  };

  const handleAcceptPolicy = () => {
    localStorage.setItem('bubble_earn_policy_accepted', 'true');
    setHasAcceptedPolicy(true);
  };

  if (isLoading) {
    return <SplashScreen onComplete={() => setIsLoading(false)} />;
  }

  if (hasAcceptedPolicy === false) {
    return <PrivacyPolicyScreen onAccept={handleAcceptPolicy} />;
  }

  const renderScreen = () => {
    switch (screen) {
      case 'game':
        return <GameScreen onBack={() => setScreen('home')} user={user} onLevelComplete={handleLevelComplete} />;
      case 'spin':
        return <SpinWheelScreen user={user} onBack={() => setScreen('home')} onUpdate={refreshUser} />;
      case 'tictactoe':
        return <TicTacToeScreen onBack={() => setScreen('home')} onUpdate={refreshUser} />;
      case 'clicker':
        return <ClickerScreen onBack={() => setScreen('home')} onUpdate={refreshUser} />;
      case 'memory':
        return <MemoryGameScreen onBack={() => setScreen('home')} onUpdate={refreshUser} />;
      case 'wallet':
        return <WalletScreen user={user} onNavigate={setScreen} />;
      case 'redeem':
        return <RedeemScreen user={user} onBack={() => setScreen('wallet')} onRedeem={() => { setScreen('wallet'); refreshUser(); }} />;
      case 'leaderboard':
        return <LeaderboardScreen onBack={() => setScreen('home')} />;
      case 'settings':
        return <SettingsScreen user={user} onBack={() => setScreen('home')} onUpdate={refreshUser} />;
      case 'ad-reward':
        return (
          <AdModal 
            onComplete={async () => {
              await api.earnCoins(REWARDS.AD_REWARD, "Watched Ad Reward");
              refreshUser();
              setScreen('home');
            }}
            onCancel={() => setScreen('home')}
          />
        );
      case 'daily':
        return (
          <div className="p-6 flex flex-col gap-6 min-h-screen bg-slate-50 relative overflow-hidden">
            <FloatingMoney />
            <div className="flex items-center gap-4 relative z-10">
              <button onClick={() => setScreen('home')} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-black text-slate-800">Daily Rewards</h1>
            </div>
            <div className="grid grid-cols-3 gap-3 relative z-10">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <Card key={day} className={`flex flex-col items-center gap-2 p-4 ${day === 1 ? 'border-emerald-500 bg-emerald-50' : 'opacity-50'}`}>
                  <span className="text-[10px] font-black text-slate-400 uppercase">Day {day}</span>
                  <Coins className={`w-6 h-6 ${day === 1 ? 'text-amber-500' : 'text-slate-300'}`} />
                  <span className="font-black text-slate-800">{day * REWARDS.DAILY_LOGIN}</span>
                </Card>
              ))}
            </div>
            <div className="flex flex-col gap-3 relative z-10 mt-4">
              <Button onClick={async () => { 
                await api.earnCoins(REWARDS.DAILY_LOGIN, 'Daily Login'); 
                refreshUser(); 
                alert(`Claimed ${REWARDS.DAILY_LOGIN} coins!`); 
                setScreen('home'); 
              }} className="w-full py-4">
                CLAIM {REWARDS.DAILY_LOGIN} COINS
              </Button>
              <button 
                onClick={() => setScreen('daily-ad')}
                className="w-full py-4 bg-amber-400 text-amber-900 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg border-b-4 border-amber-600 active:translate-y-1 active:border-b-0 transition-all"
              >
                <PlayCircle className="w-5 h-5" />
                DOUBLE & CLAIM (AD)
              </button>
            </div>
          </div>
        );
      case 'daily-ad':
        return (
          <AdModal 
            onComplete={async () => {
              await api.earnCoins(REWARDS.DAILY_LOGIN * 2, "Daily Login (Double)");
              refreshUser();
              setScreen('home');
            }}
            onCancel={() => setScreen('home')}
          />
        );
      default:
        return <HomeScreen onNavigate={setScreen} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 max-w-md mx-auto relative overflow-x-hidden">
      <LiveRedemptions />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {screen !== 'game' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 px-6 py-3 flex justify-around items-center z-40 max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className={`p-3 rounded-2xl transition-all ${screen === 'home' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Home className="w-6 h-6" />
          </button>
          <button onClick={() => setScreen('game')} className={`p-3 rounded-2xl transition-all ${screen === 'game' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Gamepad2 className="w-6 h-6" />
          </button>
          <button onClick={() => setScreen('wallet')} className={`p-3 rounded-2xl transition-all ${screen === 'wallet' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Wallet className="w-6 h-6" />
          </button>
          <button onClick={() => setScreen('leaderboard')} className={`p-3 rounded-2xl transition-all ${screen === 'leaderboard' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:bg-slate-50'}`}>
            <Trophy className="w-6 h-6" />
          </button>
        </nav>
      )}
    </div>
  );
}
