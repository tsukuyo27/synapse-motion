import { createContext, useContext, useEffect, useId, useState, Children, cloneElement, isValidElement } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

const DisclosureContext = createContext(undefined);

function useDisclosure() {
  const context = useContext(DisclosureContext);
  if (!context) {
    throw new Error('DisclosureContent / DisclosureTrigger harus digunakan di dalam <Disclosure>.');
  }
  return context;
}

const DEFAULT_TRANSITION = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Disclosure
 * Container ekspansi/lipat mulus (height: 0 <-> auto) berbasis AnimatePresence.
 * Cocok untuk alert error login, peringatan, atau filter collapsible tanpa lonjakan layout.
 */
export function Disclosure({
  open: openProp = false,
  onOpenChange,
  children,
  className = '',
  transition = DEFAULT_TRANSITION,
  variants,
}) {
  const [open, setOpen] = useState(Boolean(openProp));

  useEffect(() => {
    setOpen(Boolean(openProp));
  }, [openProp]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
  };

  return (
    <MotionConfig transition={transition}>
      <DisclosureContext.Provider value={{ open, toggle, variants }}>
        <div className={className}>{children}</div>
      </DisclosureContext.Provider>
    </MotionConfig>
  );
}

export function DisclosureTrigger({ children, className = '' }) {
  const { toggle, open } = useDisclosure();

  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, {
          onClick: (e) => {
            child.props.onClick?.(e);
            toggle();
          },
          role: child.props.role || 'button',
          'aria-expanded': open,
          tabIndex: child.props.tabIndex ?? 0,
          onKeyDown: (e) => {
            child.props.onKeyDown?.(e);
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          },
          className: [className, child.props.className].filter(Boolean).join(' '),
        });
      })}
    </>
  );
}

export function DisclosureContent({ children, className = '' }) {
  const { open, variants } = useDisclosure();
  const uniqueId = useId();

  const baseVariants = {
    expanded: {
      height: 'auto',
      opacity: 1,
      ...(variants?.expanded || {}),
    },
    collapsed: {
      height: 0,
      opacity: 0,
      ...(variants?.collapsed || {}),
    },
  };

  return (
    <div className={['overflow-hidden', className].filter(Boolean).join(' ')}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="disclosure-panel"
            id={uniqueId}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={baseVariants}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Disclosure;

