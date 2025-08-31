import { PlayerStats, Category } from '@/types';
import { calculateLevel, getXPForCurrentLevel } from './xp-system';

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

    // Recalculate levels using current XP formulas (migration from linear system)
    const categories: Record<string, Category> = {};
    Object.entries(parsed.categories || {}).forEach(([name, cat]: [string, Category]) => {
      const totalXP = cat.totalXP || 0;
      const level = calculateLevel(totalXP);
      const currentLevelXP = getXPForCurrentLevel(totalXP);
      categories[name] = { ...cat, totalXP, level, currentLevelXP };
    });

    const totalXP = Object.values(categories).reduce((sum, cat) => sum + cat.totalXP, 0);
    const globalLevel = calculateLevel(totalXP);

    return {
      totalXP,
      globalLevel,
      categories,
      recentActions: parsed.recentActions,
    };
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