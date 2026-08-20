import React from 'react';

interface ScoreGaugeProps {
  score: number;
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, status, size = 'md' }) => {
  // Determine color theme based on score/status
  const getColorClasses = (scoreVal: number) => {
    if (scoreVal >= 80) return {
      stroke: 'stroke-emerald-500',
      text: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200/55'
    };
    if (scoreVal >= 70) return {
      stroke: 'stroke-blue-500',
      text: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200/55'
    };
    if (scoreVal >= 50) return {
      stroke: 'stroke-amber-500',
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200/55'
    };
    return {
      stroke: 'stroke-rose-500',
      text: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200/55'
    };
  };

  const colors = getColorClasses(score);

  // SVG calculations for circle progress
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeConfigs = {
    sm: {
      outer: 'w-16 h-16',
      svg: 'w-14 h-14',
      text: 'text-sm font-bold',
      statusText: 'text-[9px]'
    },
    md: {
      outer: 'w-32 h-32',
      svg: 'w-28 h-28',
      text: 'text-2xl font-extrabold',
      statusText: 'text-[11px] font-semibold'
    },
    lg: {
      outer: 'w-40 h-40',
      svg: 'w-36 h-36',
      text: 'text-4xl font-extrabold tracking-tight',
      statusText: 'text-xs font-bold uppercase tracking-wider'
    }
  };

  const config = sizeConfigs[size];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative flex items-center justify-center ${config.outer}`}>
        {/* SVG Progress Circle */}
        <svg className={`${config.svg} transform -rotate-90`} viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            className="stroke-slate-100"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          {/* Progress circle */}
          <circle
            className={`${colors.stroke} transition-all duration-1000 ease-out animate-draw`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
        </svg>
        {/* Score overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-slate-800 ${config.text}`}>{score}</span>
          {size !== 'sm' && (
            <span className="text-[10px] text-slate-400 font-medium -mt-1">/100</span>
          )}
        </div>
      </div>
      
      {size !== 'sm' && (
        <span className={`mt-3 px-3 py-1 rounded-full text-center ${config.statusText} ${colors.bg} ${colors.text} border ${colors.border}`}>
          {status}
        </span>
      )}
    </div>
  );
};
