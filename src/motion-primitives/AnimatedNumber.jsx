import { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const DEFAULT_SPRING = {
  stiffness: 200,
  damping: 24,
  mass: 0.6,
};

/**
 * AnimatedNumber
 * Menganimasikan transisi angka secara fisika pegas (tabular-nums).
 *
 * @param {number} value - Target angka terbaru.
 * @param {Function} formatValue - Fungsi formatter kustom opsional (misal formatCurrency / formatNumber).
 * @param {string} className - Kelas Tailwind CSS tambahan.
 * @param {object} springOptions - Opsi konfigurasi spring Framer Motion.
 * @param {string} as - Elemen pembungkus (default: 'span').
 */
export function AnimatedNumber({
  value = 0,
  formatValue,
  className = '',
  springOptions = DEFAULT_SPRING,
  as = 'span',
}) {
  const MotionComponent = typeof as === 'string' && motion[as] ? motion[as] : motion.span;
  const numericValue = Number(value) || 0;
  const spring = useSpring(numericValue, springOptions);
  const display = useTransform(spring, (current) =>
    formatValue ? formatValue(current) : Math.round(current).toLocaleString('id-ID')
  );

  useEffect(() => {
    spring.set(numericValue);
  }, [spring, numericValue]);

  return (
    <MotionComponent className={['tabular-nums', className].filter(Boolean).join(' ')}>
      {display}
    </MotionComponent>
  );
}

export default AnimatedNumber;

