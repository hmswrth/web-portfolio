import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeTransitionOverlay: React.FC = () => {
  const { transitionState } = useTheme();

  if (!transitionState?.active) return null;

  const { originX, originY, targetTheme } = transitionState;
  const isTurningOn = targetTheme === 'light';

  const maxRadius =
    typeof window !== 'undefined'
      ? Math.hypot(
          Math.max(originX, window.innerWidth - originX),
          Math.max(originY, window.innerHeight - originY)
        ) + 60
      : 1400;

  return (
    <AnimatePresence>
      <div
        className="theme-transition-container"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Daytime illumination circle: expands outward when turning ON, collapses inward when turning OFF */}
        <motion.div
          key={`theme-transition-disc-${targetTheme}`}
          className="theme-circular-disc"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#f4f6fb',
            pointerEvents: 'none',
          }}
          initial={{
            clipPath: isTurningOn
              ? `circle(0px at ${originX}px ${originY}px)`
              : `circle(${maxRadius}px at ${originX}px ${originY}px)`,
          }}
          animate={{
            clipPath: isTurningOn
              ? `circle(${maxRadius}px at ${originX}px ${originY}px)`
              : `circle(0px at ${originX}px ${originY}px)`,
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Radiant luminous golden wavefront aura at the expanding/collapsing perimeter */}
        <motion.div
          key={`theme-transition-aura-${targetTheme}`}
          className="theme-wavefront-aura"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${originX}px ${originY}px, transparent 0%, rgba(251, 191, 36, 0.35) 60%, rgba(245, 158, 11, 0.65) 90%, transparent 100%)`,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
          initial={{
            clipPath: isTurningOn
              ? `circle(0px at ${originX}px ${originY}px)`
              : `circle(${maxRadius + 40}px at ${originX}px ${originY}px)`,
            opacity: 1,
          }}
          animate={{
            clipPath: isTurningOn
              ? `circle(${maxRadius + 40}px at ${originX}px ${originY}px)`
              : `circle(0px at ${originX}px ${originY}px)`,
            opacity: [0.8, 1, 0],
          }}
          transition={{
            duration: 0.82,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </AnimatePresence>
  );
};

export default React.memo(ThemeTransitionOverlay);
