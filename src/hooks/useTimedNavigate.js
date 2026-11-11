import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * useTimedNavigate
 * Safe route handoff hook with invariant timing buffers to eliminate mid-flight cutoffs & flicker.
 *
 * @param {Function} navigateFn - Router navigation function (e.g. useNavigate() from react-router-dom)
 * @param {number} dissolveDurationMs - Duration of the CSS dissolve/fade-out transition in ms (default: 200ms)
 * @param {number} safetyBufferMs - Extra timing margin to ensure pure 0.00 opacity before unmount (default: 20ms)
 * @returns {{ isDissolving: boolean, timedNavigate: (to: string, options?: object) => void }}
 */
export function useTimedNavigate(navigateFn, dissolveDurationMs = 200, safetyBufferMs = 20) {
  const [isDissolving, setIsDissolving] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const timedNavigate = useCallback((to, options) => {
    setIsDissolving(true);
    const totalDelay = dissolveDurationMs + safetyBufferMs;

    timeoutRef.current = setTimeout(() => {
      if (typeof navigateFn === 'function') {
        navigateFn(to, options);
      }
    }, totalDelay);
  }, [navigateFn, dissolveDurationMs, safetyBufferMs]);

  return { isDissolving, timedNavigate };
}

export default useTimedNavigate;

