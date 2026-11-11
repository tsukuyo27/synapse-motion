import React from 'react';

/**
 * TableSkeleton
 * Data table skeleton with multi-row simulated records.
 */
export function TableSkeleton({ rows = 5, className = '' }) {
  return (
    <div className={`w-full flex flex-col gap-3.5 p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl animate-pulse ${className}`}>
      {/* Table Header */}
      <div className="flex items-center gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/5"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/6"></div>
      </div>
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-2">
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/70 rounded w-1/4"></div>
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/70 rounded w-1/3"></div>
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/70 rounded w-1/5"></div>
          <div className="h-3.5 bg-slate-100 dark:bg-slate-800/70 rounded w-1/6"></div>
        </div>
      ))}
    </div>
  );
}

export default TableSkeleton;
