import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveGlowBackground = () => {
  // Motion values for mouse coordinates
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400);

  // Smooth physics springs for interactive glow response
  // Orb 1: Responsive tracking with slight inertia
  const springX1 = useSpring(mouseX, { stiffness: 45, damping: 30, mass: 1.2 });
  const springY1 = useSpring(mouseY, { stiffness: 45, damping: 30, mass: 1.2 });

  // Orb 2: Slower, heavier spring with opposite drift physics
  const springX2 = useSpring(mouseX, { stiffness: 28, damping: 35, mass: 1.8 });
  const springY2 = useSpring(mouseY, { stiffness: 28, damping: 35, mass: 1.8 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Update CSS variables for frosted glass specular interaction
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--glow-x', `${xPercent.toFixed(1)}%`);
      document.documentElement.style.setProperty('--glow-y', `${yPercent.toFixed(1)}%`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="interactive-glow-canvas" aria-hidden="true">
      {/* Glow Orb 1: Nasdaq Electric Cyan / Blue */}
      <motion.div
        className="glow-orb glow-orb-cyan"
        style={{
          x: springX1,
          y: springY1,
        }}
        animate={{
          scale: [1, 1.12, 0.96, 1.08, 1],
          opacity: [0.65, 0.8, 0.6, 0.75, 0.65],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glow Orb 2: Ultraviolet / Indigo */}
      <motion.div
        className="glow-orb glow-orb-violet"
        style={{
          x: springX2,
          y: springY2,
        }}
        animate={{
          scale: [1.05, 0.92, 1.15, 0.98, 1.05],
          opacity: [0.55, 0.7, 0.5, 0.65, 0.55],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle secondary ambient drift orbs for full-screen depth */}
      <motion.div
        className="glow-orb-ambient glow-orb-ambient-1"
        animate={{
          x: [-60, 80, -40, 70, -60],
          y: [-40, 50, -80, 40, -40],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="glow-orb-ambient glow-orb-ambient-2"
        animate={{
          x: [70, -60, 50, -40, 70],
          y: [50, -60, 60, -30, 50],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Frosted perspective grid overlay */}
      <div className="aurora-grid-overlay" />
    </div>
  );
};

export default React.memo(InteractiveGlowBackground);
