import { User as UserType, Transaction, Withdrawal } from "../types";
import { REWARDS } from "../constants";

export const getUserId = () => "local_user";

const STORAGE_KEY = "bubble_earn_data";

interface LocalData {
  user: UserType;
  history: Transaction[];
  withdrawals: Withdrawal[];
}

const getLocalData = (): LocalData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) return JSON.parse(data);

  const newUser: UserType = {
    id: getUserId(),
    coins: 0,
    level: 1,
    last_login: new Date().toISOString(),
    streak: 0,
    referral_code: Math.random().toString(36).substring(2, 8).toUpperCase(),
    currency: 'PKR',
    soundEnabled: true,
    vibrationEnabled: true,
    spins: 5,
  };

  const initialData = { user: newUser, history: [], withdrawals: [] };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

const saveLocalData = (data: LocalData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

let lastId = 0;
const generateId = () => {
  const now = Date.now();
  lastId = Math.max(now, lastId + 1);
  return lastId;
};

export const api = {
  getUser: async (): Promise<UserType> => {
    return getLocalData().user;
  },
  earnCoins: async (amount: number, reason: string): Promise<UserType> => {
    const data = getLocalData();
    data.user.coins += amount;
    
    const newTransaction: Transaction = {
      id: generateId(),
      user_id: data.user.id,
      amount,
      type: 'earn',
      description: reason,
      timestamp: new Date().toISOString(),
    };
    
    data.history.unshift(newTransaction);
    saveLocalData(data);
    return data.user;
  },
  redeemCoins: async (coins: number, money: number, method: string, account: string): Promise<UserType> => {
    const data = getLocalData();
    if (data.user.coins < coins) throw new Error("Insufficient coins");

    data.user.coins -= coins;
    
    const newWithdrawal: Withdrawal = {
      id: generateId(),
      user_id: data.user.id,
      amount_coins: coins,
      amount_money: money,
      method: method as any,
      account_number: account,
      status: 'pending',
      timestamp: new Date().toISOString(),
    };

    const newTransaction: Transaction = {
      id: generateId(),
      user_id: data.user.id,
      amount: -coins,
      type: 'redeem',
      description: `Withdrawal to ${method}`,
      timestamp: new Date().toISOString(),
    };

    data.withdrawals.unshift(newWithdrawal);
    data.history.unshift(newTransaction);
    saveLocalData(data);
    return data.user;
  },
  getHistory: async () => {
    const data = getLocalData();
    return { history: data.history, withdrawals: data.withdrawals };
  },
  getLeaderboard: async () => {
    const data = getLocalData();
    const mockLeaders = [
      { id: "TopPlayer1", coins: 5000, level: 45 },
      { id: "LuckyCat", coins: 4200, level: 38 },
      { id: "BubbleMaster", coins: 3800, level: 35 },
      { id: "MoneyMaker", coins: 3100, level: 29 },
      { id: "LocalHero", coins: 2500, level: 22 },
      ...Array.from({ length: 50 }).map((_, i) => ({
        id: `Player_${i + 100}_${Math.floor(Math.random() * 1000)}`,
        coins: Math.floor(Math.random() * 2000) + 100,
        level: Math.floor(Math.random() * 20) + 1
      }))
    ].sort((a, b) => b.coins - a.coins);
    
    return [
      { id: "YOU", coins: data.user.coins, level: data.user.level },
      ...mockLeaders
    ];
  },
  updateSettings: async (settings: Partial<UserType>): Promise<UserType> => {
    const data = getLocalData();
    data.user = { ...data.user, ...settings };
    saveLocalData(data);
    return data.user;
  },
  useSpin: async (): Promise<UserType> => {
    const data = getLocalData();
    if (data.user.spins <= 0) throw new Error("No spins left");
    data.user.spins -= 1;
    saveLocalData(data);
    return data.user;
  },
  addSpins: async (amount: number): Promise<UserType> => {
    const data = getLocalData();
    data.user.spins += amount;
    saveLocalData(data);
    return data.user;
  },
};
