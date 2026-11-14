import { motion } from 'framer-motion';

/**
 * SynapseDissolve
 * Pembungkus pergantian tampilan/tab/rute berbasis fisika framer-motion (blur-rise halus).
 *
 * @param {string | number} activeKey - Kunci unik representasi tampilan atau tab aktif.
 * @param {string} className - Kelas Tailwind CSS tambahan.
 * @param {React.ReactNode} children - Konten tampilan aktif.
 */
export function SynapseDissolve({
  activeKey,
  className = '',
  children,
  ...props
}) {
  return (
    <motion.div
      key={activeKey}
      initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default SynapseDissolve;
