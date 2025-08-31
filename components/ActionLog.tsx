'use client';

import { Action } from '@/types';
import { Clock, Star } from 'lucide-react';

interface ActionLogProps {
  actions: Action[];
}

export function ActionLog({ actions }: ActionLogProps) {
  if (actions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Actions</h3>
        <p className="text-gray-500 text-center py-8">No actions logged yet. Start your journey!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 ${
              action.taskQuality === 'good' ? 'border-green-400' : 'border-red-400'
            }`}
          >
            <div className="flex-1">
              <p className="font-medium text-gray-800 mb-1">{action.text}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {action.category}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    action.taskQuality === 'good'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {action.taskQuality === 'good' ? 'Good' : 'Lazy'}
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{action.timestamp.toLocaleDateString()}</span>
                </div>
              </div>
              {action.feedback && (
                <p
                  className={`mt-1 text-sm ${
                    action.taskQuality === 'good' ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {action.feedback}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-yellow-600 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>+{action.xp} XP</span>
              </div>
              <span className="text-xs text-gray-500">Score: {action.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
