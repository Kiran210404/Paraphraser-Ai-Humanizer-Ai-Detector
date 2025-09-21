
import React from 'react';
import type { DetectorResult } from '../../types';
import { Spinner } from './Spinner';

interface DetectorScoreProps {
  isLoading: boolean;
  result: DetectorResult | null;
}

export const DetectorScore: React.FC<DetectorScoreProps> = ({ isLoading, result }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48">
        <Spinner />
        <p className="mt-4 text-slate-400">Analyzing text...</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const scorePercentage = Math.round(result.score * 100);
  const strokeDasharray = 2 * Math.PI * 52;
  const strokeDashoffset = strokeDasharray - (strokeDasharray * scorePercentage) / 100;
  
  let colorClass = 'text-green-400';
  let strokeClass = 'stroke-green-400';
  if (scorePercentage > 50) {
    colorClass = 'text-yellow-400';
    strokeClass = 'stroke-yellow-400';
  }
  if (scorePercentage > 80) {
    colorClass = 'text-red-400';
    strokeClass = 'stroke-red-400';
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          <circle
            className="stroke-slate-700"
            strokeWidth="10"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
          <circle
            className={`transform -rotate-90 origin-center transition-all duration-1000 ease-out ${strokeClass}`}
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${colorClass}`}>
          <span className="text-4xl font-bold">{scorePercentage}%</span>
          <span className="text-sm font-medium">AI Generated</span>
        </div>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h4 className="font-semibold text-slate-300 mb-2">Analysis:</h4>
        <p className="text-slate-400">{result.explanation}</p>
      </div>
    </div>
  );
};
