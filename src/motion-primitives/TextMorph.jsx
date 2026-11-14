import { useId, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DEFAULT_VARIANTS = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

const DEFAULT_TRANSITION = {
  type: 'spring',
  stiffness: 280,
  damping: 20,
  mass: 0.35,
};

/**
 * TextMorph
 * Mengubah teks antar-status secara mulus karakter-per-karakter menggunakan layoutId.
 *
 * @param {string} children - Teks yang ditampilkan.
 * @param {string} as - Elemen pembungkus (default: 'span').
 * @param {string} className - Kelas Tailwind CSS tambahan.
 */
export function TextMorph({
  children,
  as: Component = 'span',
  className = '',
  style,
  variants = DEFAULT_VARIANTS,
  transition = DEFAULT_TRANSITION,
}) {
  const uniqueId = useId();
  const text = typeof children === 'string' ? children : String(children ?? '');

  const characters = useMemo(() => {
    const charCounts = {};
    return text.split('').map((char) => {
      const lowerChar = char.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;
      return {
        id: `${uniqueId}-${lowerChar}-${charCounts[lowerChar]}`,
        label: char === ' ' ? '\u00A0' : char,
      };
    });
  }, [text, uniqueId]);

  const Wrapper = Component || 'span';

  return (
    <Wrapper className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')} aria-label={text} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className="inline-block"
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Wrapper>
  );
}

export default TextMorph;

