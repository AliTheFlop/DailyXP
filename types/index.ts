export interface Action {
  id: string;
  text: string;
  category: string;
  score: number;
  xp: number;
  timestamp: Date;
}

export interface Category {
  name: string;
  totalXP: number;
  level: number;
  currentLevelXP: number;
  color: string;
}

export interface PlayerStats {
  totalXP: number;
  globalLevel: number;
  categories: Record<string, Category>;
  recentActions: Action[];
}

export interface AIResponse {
  category: string;
  score: number;
  taskQuality: "good" | "lazy";
}