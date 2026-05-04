import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const fadeMotion = {
  initial: { opacity: 0, y: 4, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -4, filter: "blur(2px)" },
  transition: { duration: 0.22, ease: "easeOut" },
};

export default function AnimatedCounter({
  value,
  format = (nextValue) => String(nextValue),
  prefix = "",
  suffix = "",
  animateFromZero = true,
}) {
  const [displayValue, setDisplayValue] = useState(animateFromZero ? 0 : value);
  const frameRef = useRef(null);

  useEffect(() => {
    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current);
    }

    if (!animateFromZero) {
      setDisplayValue(value);
      return undefined;
    }

    const duration = 950;
    const startTime = performance.now();
    const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

    setDisplayValue(0);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const nextValue = value * easedProgress;

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, animateFromZero]);

  const formattedValue = `${prefix}${format(displayValue)}${suffix}`;

  if (animateFromZero) {
    return formattedValue;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={`${value}-${prefix}-${suffix}`}
        initial={fadeMotion.initial}
        animate={fadeMotion.animate}
        exit={fadeMotion.exit}
        transition={fadeMotion.transition}
        style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
      >
        {formattedValue}
      </motion.span>
    </AnimatePresence>
  );
}
