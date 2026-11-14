import { Children } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const PRESET_VARIANTS = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
    },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  },
  'blur-slide': {
    hidden: { opacity: 0, filter: 'blur(4px)', y: 16 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 22 },
    },
  },
};

/**
 * AnimatedGroup
 * Pembungkus stagger anak elemen dengan preset fisika Motion Primitives.
 *
 * @param {React.ReactNode} children - Daftar anak elemen.
 * @param {string} className - Kelas Tailwind tambahan.
 * @param {'fade'|'slide'|'scale'|'blur'|'blur-slide'|'zoom'} preset - Preset animasi.
 * @param {number} stagger - Jeda antar anak elemen dalam detik (default: 0.08s).
 * @param {object} variants - Custom { container, item } variants opsional.
 * @param {string} as - Tag HTML container (default: 'div').
 * @param {string} asChild - Tag HTML tiap anak (default: 'div').
 */
export function AnimatedGroup({
  children,
  className = '',
  preset = 'blur-slide',
  stagger = 0.08,
  variants,
  as = 'div',
  asChild = 'div',
}) {
  const MotionComponent = typeof as === 'string' && motion[as] ? motion[as] : motion.div;
  const MotionChild = typeof asChild === 'string' && motion[asChild] ? motion[asChild] : motion.div;

  const containerVariants = variants?.container || {
    ...DEFAULT_CONTAINER_VARIANTS,
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants = variants?.item || PRESET_VARIANTS[preset] || PRESET_VARIANTS['blur-slide'];

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}

export default AnimatedGroup;

