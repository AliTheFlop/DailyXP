'use client';

import { useState, useEffect } from 'react';
import { PlayerStats, Action } from '@/types';
import { getPlayerStats, savePlayerStats } from '@/lib/storage';
import { updatePlayerStats } from '@/lib/xp-system';
import { PlayerOverview } from '@/components/PlayerOverview';
import { CategoryCard } from '@/components/CategoryCard';
import { ActionLog } from '@/components/ActionLog';
import { ActionLogger } from '@/components/ActionLogger';
import { Gamepad2 } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState<PlayerStats>({
    totalXP: 0,
    globalLevel: 1,
    categories: {},
    recentActions: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedStats = getPlayerStats();
    setStats(loadedStats);
    setIsLoaded(true);
  }, []);

  const handleActionLogged = (action: Action) => {
    const newStats = updatePlayerStats(stats, action);
    setStats(newStats);
    savePlayerStats(newStats);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin">
          <Gamepad2 className="w-8 h-8 text-blue-600" />
        </div>
      </div>
    );
  }

  const categories = Object.values(stats.categories);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Gamepad2 className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Real Life XP Engine</h1>
        </div>

        {/* Player Overview */}
        <div className="mb-8">
          <PlayerOverview stats={stats} />
        </div>

        {/* Action Logger */}
        <div className="mb-8">
          <ActionLogger onActionLogged={handleActionLogged} />
        </div>

        {/* Categories Grid */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          </div>
        )}

        {/* Recent Actions */}
        <div>
          <ActionLog actions={stats.recentActions} />
        </div>
      </div>
    </div>
  );
}