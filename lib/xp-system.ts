import { Category, PlayerStats, Action } from '@/types';

// Total XP required to reach the start of a given level (quadratic progression)
export const xpForLevel = (level: number): number => {
  return 100 * (level - 1) * (level - 1);
};

export const calculateLevel = (xp: number): number => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

export const getXPForCurrentLevel = (xp: number): number => {
  const level = calculateLevel(xp);
  return xp - xpForLevel(level);
};

// XP required to reach the next level from the provided total XP
export const xpToNextLevel = (xp: number): number => {
  const level = calculateLevel(xp);
  return xpForLevel(level + 1) - xp;
};

export const getXPToNextLevel = (xp: number): number => {
  return xpToNextLevel(xp);
};

export const createCategory = (name: string, color: string): Category => ({
  name,
  totalXP: 0,
  level: 1,
  currentLevelXP: 0,
  color,
});

export const getCategoryColors = (): string[] => [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6366F1', // Indigo
];

export const updatePlayerStats = (
  currentStats: PlayerStats,
  action: Action
): PlayerStats => {
  const categories = { ...currentStats.categories };
  
  // Get or create category
  if (!categories[action.category]) {
    const colors = getCategoryColors();
    const colorIndex = Object.keys(categories).length % colors.length;
    categories[action.category] = createCategory(action.category, colors[colorIndex]);
  }
  
  // Update category XP
  const category = categories[action.category];
  const newTotalXP = category.totalXP + action.xp;
  const newLevel = calculateLevel(newTotalXP);
  const newCurrentLevelXP = getXPForCurrentLevel(newTotalXP);
  
  categories[action.category] = {
    ...category,
    totalXP: newTotalXP,
    level: newLevel,
    currentLevelXP: newCurrentLevelXP,
  };
  
  // Calculate global stats
  const totalXP = Object.values(categories).reduce((sum, cat) => sum + cat.totalXP, 0);
  const globalLevel = calculateLevel(totalXP);
  
  // Update recent actions (keep last 10)
  const recentActions = [action, ...currentStats.recentActions].slice(0, 10);
  
  return {
    totalXP,
    globalLevel,
    categories,
    recentActions,
  };
};