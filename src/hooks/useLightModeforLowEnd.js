import { useEffect } from "react";

/**
 * Adds .no-heavy-anim to <html> on low-end devices or if user prefers reduced motion.
 * iOS doesn't expose deviceMemory; we default to conservative behavior.
 */
export default function useLightModeForLowEnd() {
  useEffect(() => {
    const mem = navigator.deviceMemory || 2;
    const isLowEnd = mem <= 2;
    const prefersLessMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (isLowEnd || prefersLessMotion) {
      document.documentElement.classList.add('no-heavy-anim');
    }
  }, []);
}
