import { PlayerStats } from '@/types';

const STORAGE_KEY = 'xp-engine-data';

export const getPlayerStats = (): PlayerStats => {
  if (typeof window === 'undefined') {
    return {
      totalXP: 0,
      globalLevel: 1,
      categories: {},
      recentActions: [],
    };
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      totalXP: 0,
      globalLevel: 1,
      categories: {},
      recentActions: [],
    };
  }
  
  try {
    const parsed = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    parsed.recentActions = parsed.recentActions.map((action: any) => ({
      ...action,
      timestamp: new Date(action.timestamp),
    }));
    return parsed;
  } catch {
    return {
      totalXP: 0,
      globalLevel: 1,
      categories: {},
      recentActions: [],
    };
  }
};

export const savePlayerStats = (stats: PlayerStats): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
};