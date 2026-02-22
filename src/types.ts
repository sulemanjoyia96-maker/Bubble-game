export type GameMode = 'Classic' | 'TimeAttack' | 'Target' | 'Endless';
export type Theme = 'Garden' | 'Space' | 'Ice' | 'Fire';

export interface User {
  id: string;
  coins: number;
  level: number;
  last_login: string | null;
  streak: number;
  referral_code: string;
  currency: 'PKR' | 'USD' | 'INR' | 'EUR';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  spins: number;
}

export interface Transaction {
  id: number;
  user_id: string;
  amount: number;
  type: 'earn' | 'redeem';
  description: string;
  timestamp: string;
}

export interface Withdrawal {
  id: number;
  user_id: string;
  amount_coins: number;
  amount_money: number;
  method: 'EasyPaisa' | 'JazzCash' | 'PayPal';
  account_number: string;
  status: 'pending' | 'completed' | 'rejected';
  timestamp: string;
}

export interface Bubble {
  id: number;
  color: string;
  x: number;
  y: number;
  isPopping?: boolean;
}

export interface LevelConfig {
  id: number;
  target: number;
  targetColor?: string;
  timeLimit?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  theme: Theme;
}
