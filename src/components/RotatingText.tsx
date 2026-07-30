import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RotatingTextProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

/**
 * Cycles a phrase in place.
 *
 * Every item stays stacked in a single grid cell, so the box is always as wide
 * as the longest phrase and the surrounding sentence never reflows as the word
 * changes. The outgoing phrase fades out before the next fades in, which avoids
 * two words being legible on top of each other mid-transition.
 *
 * The visible stack is hidden from assistive technology, which reads the full
 * list from the sr-only copy instead of announcing each change.
 */
function RotatingText({ items, intervalMs = 2800, className = '' }: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs, reduceMotion]);

  const fadeDuration = 0.35;

  return (
    <>
      <span className="sr-only">{items.join(', ')}</span>
      <span className="inline-grid" aria-hidden="true">
        {items.map((item, i) => {
          const isActive = i === index;
          return (
            <motion.span
              key={item}
              className={`col-start-1 row-start-1 whitespace-nowrap ${className}`}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{
                duration: fadeDuration,
                delay: isActive ? fadeDuration : 0,
                ease: 'easeOut',
              }}
            >
              {item}
            </motion.span>
          );
        })}
      </span>
    </>
  );
}

export default RotatingText;
