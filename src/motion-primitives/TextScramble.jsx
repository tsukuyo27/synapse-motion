import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * TextScramble
 * Mengacak karakter teks secara progresif hingga membentuk kata akhir yang utuh.
 * Adaptasi JSX + framer-motion dari Motion Primitives.
 *
 * @param {string} children - Teks target akhir yang akan diungkap.
 * @param {number} duration - Total durasi animasi dalam detik (default: 1.0).
 * @param {number} speed - Interval pembaruan frame dalam detik (default: 0.04).
 * @param {string} characterSet - Kumpulan karakter acak pengisi.
 * @param {string} as - Elemen HTML pembungkus (default: 'p').
 * @param {string} className - Kelas Tailwind CSS tambahan.
 * @param {boolean} trigger - Pemicu dimulainya efek scramble (default: true).
 * @param {Function} onScrambleComplete - Callback tepat setelah seluruh teks terungkap.
 */
export function TextScramble({
  children,
  duration = 1.0,
  speed = 0.04,
  characterSet = DEFAULT_CHARS,
  className = '',
  as: Component = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}) {
  const MotionComponent = typeof Component === 'string' && motion[Component] ? motion[Component] : motion.p;
  const text = typeof children === 'string' ? children : String(children ?? '');
  const [displayText, setDisplayText] = useState(text);
  const onCompleteRef = useRef(onScrambleComplete);

  useEffect(() => {
    onCompleteRef.current = onScrambleComplete;
  }, [onScrambleComplete]);

  useEffect(() => {
    if (!trigger) {
      setDisplayText(text);
      return undefined;
    }

    const totalSteps = Math.max(1, Math.round(duration / speed));
    let step = 0;

    const timer = setInterval(() => {
      const progress = step / totalSteps;
      let scrambled = '';

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }
        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step += 1;

      if (step > totalSteps) {
        clearInterval(timer);
        setDisplayText(text);
        onCompleteRef.current?.();
      }
    }, speed * 1000);

    return () => clearInterval(timer);
  }, [trigger, text, duration, speed, characterSet]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}

export default TextScramble;

