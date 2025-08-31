'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Zap, Plus } from 'lucide-react';
import { scoreAction } from '@/lib/ai-scorer';
import { Action } from '@/types';

interface ActionLoggerProps {
  onActionLogged: (action: Action) => void;
}

export function ActionLogger({ onActionLogged }: ActionLoggerProps) {
  const [actionText, setActionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastXP, setLastXP] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionText.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const aiResponse = await scoreAction(actionText);
      const xp = Math.floor(aiResponse.score / 10);

      const action: Action = {
        id: Date.now().toString(),
        text: actionText,
        category: aiResponse.category,
        score: aiResponse.score,
        taskQuality: aiResponse.taskQuality,
        feedback: aiResponse.feedback,
        xp,
        timestamp: new Date(),
      };
      
      setLastXP(xp);
      onActionLogged(action);
      setActionText('');
      
      // Clear the XP notification after 3 seconds
      setTimeout(() => setLastXP(null), 3000);
    } catch (error) {
      console.error('Failed to score action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
        <Plus className="w-5 h-5 text-blue-600" />
        Log New Action
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            value={actionText}
            onChange={(e) => setActionText(e.target.value)}
            placeholder="e.g., Sent 10 cold emails, Worked out for 30 minutes..."
            className="text-base p-4 h-12"
            disabled={isLoading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!actionText.trim() || isLoading}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              AI is scoring your action...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Log Action & Gain XP
            </>
          )}
        </Button>
      </form>
      
      {lastXP !== null && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white text-center animate-pulse">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 fill-current" />
            <span className="font-bold text-lg">+{lastXP} XP Gained!</span>
          </div>
        </div>
      )}
    </div>
  );
}