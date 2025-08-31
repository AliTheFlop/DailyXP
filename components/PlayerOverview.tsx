'use client';

import { PlayerStats } from '@/types';
import { XPBar } from './XPBar';
import { Trophy, Zap, Target } from 'lucide-react';

interface PlayerOverviewProps {
  stats: PlayerStats;
}

export function PlayerOverview({ stats }: PlayerOverviewProps) {
  const globalCurrentLevelXP = stats.totalXP % 100;
  const categoriesCount = Object.keys(stats.categories).length;
  const avgCategoryLevel = categoriesCount > 0 
    ? Object.values(stats.categories).reduce((sum, cat) => sum + cat.level, 0) / categoriesCount 
    : 0;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl p-8 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Player Level {stats.globalLevel}</h1>
          <p className="text-blue-100 text-lg">Total XP: {stats.totalXP}</p>
        </div>
        <div className="text-right">
          <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
            <Trophy className="w-8 h-8 text-yellow-300" />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <XPBar
          currentXP={globalCurrentLevelXP}
          maxXP={100}
          level={stats.globalLevel}
          color="#FFD700"
          size="lg"
          showLabel={false}
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-300" />
            <span className="text-sm text-blue-100">Categories</span>
          </div>
          <span className="text-2xl font-bold">{categoriesCount}</span>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-300" />
            <span className="text-sm text-blue-100">Avg Level</span>
          </div>
          <span className="text-2xl font-bold">{avgCategoryLevel.toFixed(1)}</span>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-orange-300" />
            <span className="text-sm text-blue-100">Actions</span>
          </div>
          <span className="text-2xl font-bold">{stats.recentActions.length}</span>
        </div>
      </div>
    </div>
  );
}