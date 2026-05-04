import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  value,
  format = (nextValue) => String(nextValue),
  prefix = "",
  suffix = "",
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const duration = 950;
    const startValue = 0;
    const startTime = performance.now();

    const easeOutCubic = (progress) => 1 - Math.pow(1 - progress, 3);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const nextValue = startValue + (value - startValue) * easedProgress;

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    setDisplayValue(0);
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value]);

  return `${prefix}${format(displayValue)}${suffix}`;
}
