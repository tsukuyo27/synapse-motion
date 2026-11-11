import React from 'react';

/**
 * CardSkeleton
 * General-purpose content card skeleton with header, avatar, and text lines.
 */
export function CardSkeleton({ className = '' }) {
  return (
    <div className={`p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-pulse flex flex-col gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
          <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-full"></div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-5/6"></div>
        <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default CardSkeleton;
