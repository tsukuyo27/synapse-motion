import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { usePresence } from '../hooks/usePresence.js';

/**
 * SynapseModal
 * Zero-dependency fluid modal dialog with backdrop blur & spring scale transitions.
 *
 * @param {boolean} isOpen - Whether the modal is open.
 * @param {Function} onClose - Callback when close is requested.
 * @param {string} title - Optional modal title.
 * @param {string} maxWidth - Tailwind max-w class (default: 'max-w-lg').
 * @param {React.ReactNode} children - Modal body content.
 */
export function SynapseModal({
  isOpen,
  onClose,
  title,
  maxWidth = 'max-w-lg',
  className = '',
  children
}) {
  const { shouldRender, isClosing } = usePresence(isOpen, 220);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && onClose) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!shouldRender || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity ${
        isClosing ? 'animate-fade-out' : 'animate-fade-in'
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full ${maxWidth} bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative ${
          isClosing ? 'animate-zoom-out' : 'animate-pop-in'
        } ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Tutup Dialog"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default SynapseModal;
