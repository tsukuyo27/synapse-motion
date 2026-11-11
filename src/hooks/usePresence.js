import { useState, useEffect } from 'react';

/**
 * usePresence
 * Lightweight unmount lifecycle orchestrator (0 KB external dependency).
 * Allows elements to stay in the DOM while their exit CSS animation finishes.
 *
 * @param {boolean} isOpen - Current desired visibility state.
 * @param {number} exitDurationMs - Duration to wait for CSS exit animation before unmounting (default: 200ms).
 * @returns {{ shouldRender: boolean, isClosing: boolean }}
 */
export function usePresence(isOpen, exitDurationMs = 200) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, exitDurationMs);

      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender, exitDurationMs]);

  return { shouldRender, isClosing };
}

export default usePresence;
