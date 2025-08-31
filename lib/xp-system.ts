import { Category, PlayerStats, Action } from '@/types';

export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

export const getXPForCurrentLevel = (xp: number): number => {
  return xp % 100;
};

export const getXPToNextLevel = (xp: number): number => {
  return 100 - getXPForCurrentLevel(xp);
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