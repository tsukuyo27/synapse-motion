import React from 'react';

/**
 * KpiSkeleton
 * 1:1 structural replica skeleton for KPI tiles & statistics boxes.
 */
export function KpiSkeleton({ className = '' }) {
  return (
    <div className={`p-4 sm:p-5 rounded-xl flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-pulse h-[116px] ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
        <div className="p-2 bg-slate-200/80 dark:bg-slate-800 rounded-lg w-8 h-8"></div>
      </div>
      <div className="h-7 bg-slate-200 dark:bg-slate-800 rounded w-36"></div>
    </div>
  );
}

export default KpiSkeleton;

