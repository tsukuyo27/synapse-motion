import { motion } from 'framer-motion';

/**
 * SynapseStagger
 * Membungkus elemen anak dalam animasi masuk berjenjang berbasis framer-motion (blur-slide).
 * Menerapkan batas maksimum stagger (maxIndex = 8) agar tabel/daftar panjang tetap responsif.
 *
 * @param {number} index - Indeks elemen dalam daftar/grid (0, 1, 2, ...).
 * @param {number} delayStep - Penambahan jeda per indeks dalam ms (default: 65ms).
 * @param {number} maxIndex - Batas indeks maksimum untuk kalkulasi jeda (default: 8).
 * @param {'up' | 'down'} direction - Arah masuk elemen (default: 'up').
 * @param {string | React.ElementType} as - Tag HTML pembungkus (default: 'div', mendukung 'tr').
 * @param {string} className - Kelas Tailwind CSS tambahan.
 * @param {object} style - Gaya inline tambahan.
 * @param {React.ReactNode} children - Konten yang dianimasikan.
 */
export function SynapseStagger({
  index = 0,
  delayStep = 65,
  maxIndex = 8,
  direction = 'up',
  as: Component = 'div',
  className = '',
  style = {},
  children,
  ...props
}) {
  const cappedIndex = Math.min(Math.max(Number(index) || 0, 0), maxIndex);
  const delaySec = (cappedIndex * delayStep) / 1000;
  const isTableRow = Component === 'tr';
  const MotionComponent = typeof Component === 'string' && motion[Component] ? motion[Component] : motion.div;
  const offsetY = direction === 'down' ? -14 : 14;

  return (
    <MotionComponent
      initial={isTableRow ? { opacity: 0, y: offsetY } : { opacity: 0, y: offsetY, filter: 'blur(3px)' }}
      animate={isTableRow ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.38,
        delay: delaySec,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default SynapseStagger;
