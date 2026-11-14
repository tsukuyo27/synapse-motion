import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useBodyScrollLock } from '../shadcn-synapse/hooks/useBodyScrollLock.js';

const Z_INDEX_TIERS = {
  primary: 'z-[100]',
  nested: 'z-[150]',
  lightbox: 'z-[200]',
  'lightbox-dialog': 'z-[210]',
};

const MODAL_EXIT_EASE = [0.22, 1, 0.36, 1];

/**
 * SynapseModal
 * Dialog portal berbasis framer-motion (AnimatePresence + spring) dengan
 * persistent portal presence, adaptasi mobile bottom-sheet, backdrop ringan,
 * hierarki z-index kanonikal (primary/nested/lightbox/lightbox-dialog), body scroll lock hingga
 * onExitComplete, dan Layer-Aware Escape Guard terhadap modal anak & SweetAlert2.
 *
 * @param {'primary' | 'nested' | 'lightbox' | 'lightbox-dialog'} tier - Tingkatan z-index portal.
 */
export function SynapseModal({
  isOpen,
  onClose,
  title,
  header,
  footer,
  tier = 'primary',
  mobileSheet = true,
  closeOnBackdrop = true,
  maxWidth = 'max-w-lg',
  className = '',
  bodyClassName = 'p-5 sm:p-6',
  backdropTestId,
  children,
}) {
  const [portalLocked, setPortalLocked] = useState(() => Boolean(isOpen));
  if (isOpen && !portalLocked) {
    setPortalLocked(true);
  }

  const [isMobileViewport, setIsMobileViewport] = useState(() => (
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 639px)').matches
      : false
  ));

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const handleViewportChange = (event) => setIsMobileViewport(event.matches);
    setIsMobileViewport(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleViewportChange);
      return () => mediaQuery.removeEventListener('change', handleViewportChange);
    }
    mediaQuery.addListener?.(handleViewportChange);
    return () => mediaQuery.removeListener?.(handleViewportChange);
  }, []);

  useBodyScrollLock(portalLocked);

  // Layer-aware Escape guard: modal induk mengabaikan Esc bila ada tier lebih tinggi / Swal di atasnya
  const handleKeyDown = useCallback((e) => {
    if (e.key !== 'Escape' || !onClose) return;
    if (typeof document !== 'undefined') {
      if (document.querySelector('.swal2-container')) return;
      if (tier === 'primary' && document.querySelector('[data-synapse-tier="nested"], [data-synapse-tier="lightbox"], [data-synapse-tier="lightbox-dialog"]')) {
        return;
      }
      if (tier === 'nested' && document.querySelector('[data-synapse-tier="lightbox"], [data-synapse-tier="lightbox-dialog"]')) {
        return;
      }
      if (tier === 'lightbox' && document.querySelector('[data-synapse-tier="lightbox-dialog"]')) {
        return;
      }
    }
    onClose();
  }, [onClose, tier]);

  useEffect(() => {
    if (!isOpen) return undefined;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (typeof document === 'undefined') return null;

  const useSheetMotion = Boolean(mobileSheet && isMobileViewport);
  const zIndexClass = Z_INDEX_TIERS[tier] || Z_INDEX_TIERS.primary;
  const containerAlignClass = mobileSheet
    ? 'items-end sm:items-center p-0 sm:p-4'
    : 'items-center p-3 sm:p-4';
  const dialogShapeClass = mobileSheet
    ? 'rounded-t-2xl sm:rounded-2xl max-h-[92vh] sm:max-h-[90vh]'
    : 'rounded-2xl max-h-[90vh]';

  const dialogInitial = useSheetMotion
    ? { opacity: 0, y: 48 }
    : { opacity: 0, scale: 0.95, y: 28 };

  const dialogAnimate = useSheetMotion
    ? { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 360, damping: 30, mass: 0.85 } }
    : { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 28, mass: 0.85 } };

  const dialogExit = useSheetMotion
    ? { opacity: 0, y: 40, transition: { duration: 0.22, ease: MODAL_EXIT_EASE } }
    : { opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.22, ease: MODAL_EXIT_EASE } };

  return createPortal(
    <AnimatePresence onExitComplete={() => setPortalLocked(false)}>
      {isOpen && (
        <motion.div
          key="synapse-modal-backdrop"
          data-testid={backdropTestId}
          data-synapse-tier={tier}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.22, ease: MODAL_EXIT_EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: MODAL_EXIT_EASE } }}
          className={`fixed inset-0 ${zIndexClass} flex justify-center ${containerAlignClass} bg-slate-950/60 backdrop-blur-[2px] will-change-[opacity] print:animate-none print:transform-none`}
          onClick={closeOnBackdrop ? onClose : undefined}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            key="synapse-modal-dialog"
            initial={dialogInitial}
            animate={dialogAnimate}
            exit={dialogExit}
            className={`w-full ${maxWidth} ${dialogShapeClass} bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col relative transform-gpu will-change-[transform,opacity] print:animate-none print:transform-none ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {header ? (
              header
            ) : title ? (
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{title}</h3>
                {onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
                    aria-label="Tutup Dialog"
                  >
                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : null}

            <div className={`${bodyClassName} overflow-y-auto flex-1`}>{children}</div>

            {footer && (
              <div className="shrink-0">{footer}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default SynapseModal;

