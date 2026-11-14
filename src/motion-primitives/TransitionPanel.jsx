import { Children } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DEFAULT_VARIANTS = {
  enter: { opacity: 0, x: 32, filter: 'blur(4px)' },
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -32, filter: 'blur(4px)' },
};

const DEFAULT_TRANSITION = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * TransitionPanel
 * Kontainer perpindahan antar-tahap/tab dengan AnimatePresence mode="popLayout".
 * Adaptasi JSX + framer-motion dari Motion Primitives.
 *
 * @param {React.ReactNode[]} children - Array panel yang akan diswitch.
 * @param {number} activeIndex - Indeks panel aktif.
 * @param {string} className - Kelas Tailwind tambahan pada wrapper luar.
 * @param {object} variants - Variants enter/center/exit Framer Motion.
 * @param {object} transition - Konfigurasi transisi Framer Motion.
 */
export function TransitionPanel({
  children,
  activeIndex = 0,
  className = '',
  variants = DEFAULT_VARIANTS,
  transition = DEFAULT_TRANSITION,
  custom,
  ...motionProps
}) {
  const panels = Children.toArray(children);

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <AnimatePresence initial={false} mode="popLayout" custom={custom}>
        <motion.div
          key={activeIndex}
          custom={custom}
          variants={variants}
          transition={transition}
          initial="enter"
          animate="center"
          exit="exit"
          {...motionProps}
        >
          {panels[activeIndex] ?? null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default TransitionPanel;

