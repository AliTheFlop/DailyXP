'use client';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function XPBar({ currentXP, maxXP, level, color, size = 'md', showLabel = true }: XPBarProps) {
  const percentage = (currentXP / maxXP) * 100;
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Level {level}</span>
          <span className="text-xs text-gray-500">{currentXP}/{maxXP} XP</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className="h-full transition-all duration-500 ease-out rounded-full relative"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: percentage > 0 ? `0 0 10px ${color}40` : 'none',
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}