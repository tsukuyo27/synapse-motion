import React from 'react';

/**
 * SynapseStagger
 * Wraps child elements in a cascaded waterfall entrance animation.
 *
 * @param {number} index - Sequence index in the list/grid (0, 1, 2, ...).
 * @param {number} delayStep - Milliseconds to increment per index (default: 65ms).
 * @param {'up' | 'down'} direction - Direction of the slide motion (default: 'up').
 * @param {string} className - Additional Tailwind CSS classes.
 * @param {React.ReactNode} children - Component content to animate.
 */
export function SynapseStagger({
  index = 0,
  delayStep = 65,
  direction = 'up',
  className = '',
  children,
  ...props
}) {
  const delay = `${index * delayStep}ms`;
  const animationClass = direction === 'down' ? 'animate-fade-in-down' : 'animate-fade-in-up';

  return (
    <div
      className={`${animationClass} opacity-0 ${className}`}
      style={{
        animationDelay: delay,
        animationFillMode: 'forwards'
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default SynapseStagger;

