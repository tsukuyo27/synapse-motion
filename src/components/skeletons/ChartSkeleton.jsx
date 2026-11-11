import React from 'react';

/**
 * ChartSkeleton
 * Simulated bar/column chart skeleton with staggered column heights.
 */
export function ChartSkeleton({ className = '' }) {
  return (
    <div className={`p-5 sm:p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col min-h-[320px] animate-pulse ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-44"></div>
        <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded-lg w-28"></div>
      </div>
      <div className="flex-1 w-full flex items-end gap-3 px-2 pb-2">
        <div className="flex-1 bg-slate-200/70 dark:bg-slate-800/60 rounded-t h-[45%]"></div>
        <div className="flex-1 bg-slate-200/70 dark:bg-slate-800/60 rounded-t h-[70%]"></div>
        <div className="flex-1 bg-slate-200/70 dark:bg-slate-800/60 rounded-t h-[35%]"></div>
        <div className="flex-1 bg-slate-200/70 dark:bg-slate-800/60 rounded-t h-[85%]"></div>
        <div className="flex-1 bg-slate-200/70 dark:bg-slate-800/60 rounded-t h-[55%]"></div>
        <div className="flex-1 bg-slate-200/70 dark:bg-slate-800/60 rounded-t h-[65%]"></div>
      </div>
    </div>
  );
}

export default ChartSkeleton;
