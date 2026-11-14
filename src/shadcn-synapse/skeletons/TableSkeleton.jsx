import React from 'react';

/**
 * TableSkeleton
 * Data table skeleton with multi-row simulated records (desktop table & mobile card stream).
 *
 * @param {number} rows - Jumlah baris/kartu placeholder.
 * @param {boolean} mobile - Tampilkan tata letak stack kartu mobile.
 * @param {string} className - Kelas CSS tambahan.
 */
export function TableSkeleton({ rows = 5, mobile = false, className = '' }) {
  if (mobile) {
    return (
      <div className={`w-full flex flex-col gap-3 animate-pulse ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-20" />
            </div>
            <div className="h-3 bg-slate-200/80 dark:bg-slate-800/70 rounded w-2/3" />
            <div className="h-3 bg-slate-200/70 dark:bg-slate-800/60 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

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

