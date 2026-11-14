import { useEffect } from 'react';

let activeScrollLocks = 0;

/**
 * Mengunci scroll halaman (body) secara ref-counted sehingga modal bertumpuk
 * (primary + nested/lightbox) tidak melepaskan lock sebelum semua layer tertutup.
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked || typeof document === 'undefined') return undefined;

    activeScrollLocks += 1;
    if (activeScrollLocks === 1) {
      document.body.classList.add('overflow-hidden', 'overscroll-none');
      document.documentElement.classList.add('overscroll-none');
    }

    return () => {
      activeScrollLocks = Math.max(0, activeScrollLocks - 1);
      if (activeScrollLocks === 0) {
        document.body.classList.remove('overflow-hidden', 'overscroll-none');
        document.documentElement.classList.remove('overscroll-none');
      }
    };
  }, [isLocked]);
}

export default useBodyScrollLock;

