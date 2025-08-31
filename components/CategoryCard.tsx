'use client';

import { Category } from '@/types';
import { XPBar } from './XPBar';
import { Star, TrendingUp } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <h3 className="font-bold text-lg text-gray-800">{category.name}</h3>
        </div>
        <div className="flex items-center gap-2 text-yellow-500">
          <Star className="w-5 h-5 fill-current" />
          <span className="font-bold text-xl">{category.level}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <XPBar
          currentXP={category.currentLevelXP}
          maxXP={100}
          level={category.level}
          color={category.color}
          size="md"
        />
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          <span>{category.totalXP} Total XP</span>
        </div>
        <span>{100 - category.currentLevelXP} XP to next level</span>
      </div>
    </div>
  );
}