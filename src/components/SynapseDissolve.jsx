import React from 'react';

/**
 * SynapseDissolve
 * Seamless view/tab switcher wrapper with vertical soft-rise motion.
 *
 * @param {string | number} activeKey - Unique key representing current view/tab.
 * @param {string} className - Additional CSS classes.
 * @param {React.ReactNode} children - View content.
 */
export function SynapseDissolve({
  activeKey,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      key={activeKey}
      className={`animate-soft-rise transition-opacity duration-180 ease-out ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default SynapseDissolve;

