import { LevelConfig, Theme } from "./types";

export const COLORS = [
  '#FF5F5F', // Red
  '#5FFF5F', // Green
  '#5F5FFF', // Blue
  '#FFFF5F', // Yellow
  '#FF5FFF', // Purple
  '#5FFFFF', // Cyan
];

export const CAT_TIPS = [
  "Meow! Try to pop larger groups for bonus points!",
  "Watch the timer, human! Speed is key!",
  "Need more coins? Check your daily missions!",
  "Psst... Space theme bubbles are extra bouncy!",
  "Don't forget to claim your daily login treat!",
  "Redeeming coins is easy! Just reach 2000!",
  "Invite your friends! More humans means more fun!",
  "Focus on the target color to clear levels faster!",
];

export const THEMES: Record<Theme, { bg: string; accent: string; bubble: string[] }> = {
  Garden: {
    bg: 'bg-gradient-to-b from-emerald-400 via-emerald-100 to-emerald-50',
    accent: 'text-emerald-600',
    bubble: ['#4ade80', '#22c55e', '#16a34a', '#facc15'],
  },
  Space: {
    bg: 'bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-900',
    accent: 'text-indigo-400',
    bubble: ['#818cf8', '#6366f1', '#4f46e5', '#c084fc'],
  },
  Ice: {
    bg: 'bg-gradient-to-b from-sky-300 via-sky-100 to-white',
    accent: 'text-sky-600',
    bubble: ['#7dd3fc', '#38bdf8', '#0ea5e9', '#ffffff'],
  },
  Fire: {
    bg: 'bg-gradient-to-b from-orange-600 via-orange-300 to-amber-100',
    accent: 'text-orange-600',
    bubble: ['#fb923c', '#f97316', '#ea580c', '#facc15'],
  },
};

export const LEVELS: LevelConfig[] = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  let difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy';
  if (id > 10) difficulty = 'Medium';
  if (id > 30) difficulty = 'Hard';

  let theme: Theme = 'Garden';
  if (id > 10) theme = 'Ice';
  if (id > 20) theme = 'Space';
  if (id > 35) theme = 'Fire';

  return {
    id,
    target: 10 + id * 2,
    targetColor: id % 3 === 0 ? COLORS[id % COLORS.length] : undefined,
    timeLimit: id > 5 ? Math.max(30, 60 - id) : undefined,
    difficulty,
    theme,
  };
});

export const CONVERSION_RATES = [
  { coins: 2000, money: 50 },
  { coins: 5000, money: 150 },
  { coins: 10000, money: 400 },
];

export const REWARDS = {
  LEVEL_WIN: 50,
  STREAK_BONUS: 25,
  DAILY_LOGIN: 20,
  AD_REWARD: 100,
  TOURNAMENT_WIN: 500,
  REFERRAL_BONUS: 200,
  COMBO_BONUS: 5,
  SPIN_AD_REWARD: 3, // 3 spins per ad
};

export const SPIN_REWARDS = [
  { label: '50', value: 50, color: '#FF5F5F' },
  { label: '10', value: 10, color: '#5FFF5F' },
  { label: '100', value: 100, color: '#5F5FFF' },
  { label: '25', value: 25, color: '#FFFF5F' },
  { label: '500', value: 500, color: '#FF5FFF' },
  { label: '5', value: 5, color: '#5FFFFF' },
  { label: '200', value: 200, color: '#FF8C00' },
  { label: '50', value: 50, color: '#32CD32' },
];

export const CURRENCIES = {
  PKR: { symbol: 'Rs', rate: 1, name: 'Pakistani Rupee' },
  USD: { symbol: '$', rate: 0.0036, name: 'US Dollar' },
  INR: { symbol: '₹', rate: 0.30, name: 'Indian Rupee' },
  EUR: { symbol: '€', rate: 0.0033, name: 'Euro' },
};

