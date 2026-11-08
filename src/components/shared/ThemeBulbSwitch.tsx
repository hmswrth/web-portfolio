import React, { useRef, useState, useEffect, useCallback } from 'react';
import { animate } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Realistic mechanical ratchet switch click sound via Web Audio API
const playSwitchClick = () => {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Audio context may be restricted before user gesture
  }
};

const REST_X = 16;
const REST_Y = 58;
const ANCHOR_X = 16;
const ANCHOR_Y = 32.5;
const PULL_THRESHOLD = 11; // px downward or diagonal pull to arm the ratchet switch

const ThemeBulbSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Rope end physics position state
  const [ropeEnd, setRopeEnd] = useState<{ x: number; y: number }>({ x: REST_X, y: REST_Y });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Physics animation control refs
  const posRef = useRef<{ x: number; y: number }>({ x: REST_X, y: REST_Y });
  const animControlsXRef = useRef<{ stop: () => void } | null>(null);
  const animControlsYRef = useRef<{ stop: () => void } | null>(null);

  // Interaction tracking refs
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });
  const hasArmedRef = useRef<boolean>(false);
  const hasMovedSignificantlyRef = useRef<boolean>(false);
  const gestureHandledRecentlyRef = useRef<boolean>(false);

  const isLight = theme === 'light';

  // Stop any active spring animations
  const stopSprings = useCallback(() => {
    if (animControlsXRef.current) {
      animControlsXRef.current.stop();
      animControlsXRef.current = null;
    }
    if (animControlsYRef.current) {
      animControlsYRef.current.stop();
      animControlsYRef.current = null;
    }
  }, []);

  // Trigger theme toggle with coordinates calculated from bulb center
  const triggerToggle = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const originCoords = {
      x: Math.round(rect.left + rect.width / 2),
      y: Math.round(rect.top + 20),
    };

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {
        // ignore
      }
    }

    playSwitchClick();
    toggleTheme(originCoords);
  }, [toggleTheme]);

  // Authentic Framer Motion spring physics for snapping back & lateral pendulum swing
  const startSpringAnimation = useCallback(
    (startX: number, startY: number, initialVx = 0, initialVy = 0) => {
      stopSprings();

      // Framer Motion spring for lateral oscillation (pendulum sway)
      try {
        animControlsXRef.current = animate(startX, REST_X, {
          type: 'spring',
          stiffness: 80,
          damping: 2.2,
          mass: 0.85,
          velocity: initialVx,
          onUpdate: (latest) => {
            posRef.current.x = latest;
            setRopeEnd((prev) => ({ ...prev, x: latest }));
          },
        });

        // Framer Motion spring for vertical snap-back (elastic recoil with energetic bounce)
        animControlsYRef.current = animate(startY, REST_Y, {
          type: 'spring',
          stiffness: 175,
          damping: 3.5,
          mass: 0.78,
          velocity: initialVy,
          onUpdate: (latest) => {
            posRef.current.y = latest;
            setRopeEnd((prev) => ({ ...prev, y: latest }));
          },
        });
      } catch {
        // Fallback in environments without animation driver
        posRef.current = { x: REST_X, y: REST_Y };
        setRopeEnd({ x: REST_X, y: REST_Y });
      }
    },
    [stopSprings]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSprings();
    };
  }, [stopSprings]);

  // Programmatic pull animation on click or keyboard activation
  // Pulls cord downwards, then switches theme strictly upon release
  const triggerPullAnimation = useCallback(() => {
    stopSprings();

    // Pull cord downwards
    const pullY = REST_Y + 22;
    const pullX = REST_X + 3.5;
    posRef.current = { x: pullX, y: pullY };
    setRopeEnd({ x: pullX, y: pullY });

    // Switch theme and release rope with Framer Motion spring physics
    setTimeout(() => {
      triggerToggle();
      startSpringAnimation(pullX, pullY, -50, -460);
    }, 110);
  }, [startSpringAnimation, stopSprings, triggerToggle]);

  // Pointer drag event handlers for generous hit target and omnidirectional pulling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    stopSprings();

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    setIsDragging(true);
    isDraggingRef.current = true;
    dragStartRef.current = { clientX: e.clientX, clientY: e.clientY };
    hasArmedRef.current = false;
    hasMovedSignificantlyRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.clientX;
    const deltaY = e.clientY - dragStartRef.current.clientY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      hasMovedSignificantlyRef.current = true;
    }

    // Omnidirectional fluid elasticity: allows pulling left, right, diagonally down, or straight down
    const effectiveDy = deltaY < 0 ? deltaY * 0.12 : deltaY;
    const pullDistance = Math.hypot(deltaX * 0.9, Math.max(0, effectiveDy));
    const maxRopeStretch = 28;
    const stretch = (pullDistance * maxRopeStretch) / (maxRopeStretch + pullDistance * 0.45);
    const angle = Math.atan2(Math.max(0, effectiveDy), deltaX * 0.9);

    const elasticX = REST_X + Math.cos(angle) * stretch * 0.92;
    const elasticY = REST_Y + Math.sin(angle) * stretch;

    posRef.current = { x: elasticX, y: elasticY };
    setRopeEnd({ x: elasticX, y: elasticY });

    // Arm the ratchet switch when downward pull threshold or total diagonal stretch is crossed
    // Note: Theme NEVER switches while pulling; strictly on release!
    if (effectiveDy >= PULL_THRESHOLD || stretch >= 11) {
      hasArmedRef.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    gestureHandledRecentlyRef.current = true;
    setTimeout(() => {
      gestureHandledRecentlyRef.current = false;
    }, 250);

    const { x: curX, y: curY } = posRef.current;
    const lateralImpulse = (REST_X - curX) * 28;
    const verticalImpulse = -Math.max(380, (curY - REST_Y) * 24);

    if (hasArmedRef.current) {
      // SWITCH THEME ONLY ON RELEASE!
      triggerToggle();
      startSpringAnimation(curX, curY, lateralImpulse, verticalImpulse);
    } else if (hasMovedSignificantlyRef.current) {
      // Pulled below threshold: snap back with spring without switching theme
      startSpringAnimation(curX, curY, lateralImpulse, -200);
    } else {
      // Tap or quick click
      triggerPullAnimation();
    }
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    startSpringAnimation(posRef.current.x, posRef.current.y, 0, -120);
  };

  const handleClick = () => {
    if (gestureHandledRecentlyRef.current) return;
    triggerPullAnimation();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerPullAnimation();
    }
  };

  // Flexible rope curve coordinates with natural elastic flex during bounce recoil
  const { x: ropeX, y: ropeY } = ropeEnd;
  const upwardRecoilSlack = Math.max(0, REST_Y - ropeY);
  const bow = upwardRecoilSlack * 0.28;
  const ctrlX = ANCHOR_X + (ropeX - ANCHOR_X) * 0.35 + (ropeX >= ANCHOR_X ? bow : -bow);
  const ctrlY = ANCHOR_Y + (ropeY - ANCHOR_Y) * 0.58;

  return (
    <div
      ref={containerRef}
      className={`theme-bulb-container ${isLight ? 'theme-bulb-on' : 'theme-bulb-off'}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      title={isLight ? 'Pull rope to switch to dark mode' : 'Pull rope to switch to light mode'}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      style={{ touchAction: 'none' }}
    >
      {/* Generous pull hit target covering 76×76px around cord */}
      <div
        className="theme-bulb-cord-hit-area"
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: 24,
          transform: 'translateX(-50%)',
          width: 76,
          height: 76,
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          pointerEvents: 'auto',
          zIndex: 10,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      />

      <svg
        width="64"
        height="88"
        viewBox="-30 0 92 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="theme-bulb-svg"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient
            id="bulbWarmGlow"
            cx="50%"
            cy="46%"
            r="50%"
            fx="50%"
            fy="38%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="72%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="1" />
          </radialGradient>

          <filter id="bulbBloomFilter" x="-45%" y="-45%" width="190%" height="190%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Top Ceiling Cord & Fixture Mount */}
        <rect
          x="13.5"
          y="0"
          width="5"
          height="3"
          rx="1"
          fill={isLight ? '#64748b' : '#475569'}
        />
        <line
          x1="16"
          y1="3"
          x2="16"
          y2="6.5"
          stroke={isLight ? '#64748b' : '#475569'}
          strokeWidth="1.5"
        />

        {/* Metallic Screw Socket / Threaded Base */}
        <path
          d="M12.5 6.5 H19.5 V12 C19.5 13 18.5 14 17.5 14 H14.5 C13.5 14 12.5 13 12.5 12 Z"
          fill={isLight ? '#94a3b8' : '#334155'}
          stroke={isLight ? '#64748b' : '#1e293b'}
          strokeWidth="0.75"
        />
        <line
          x1="13"
          y1="8.8"
          x2="19"
          y2="8.8"
          stroke={isLight ? '#cbd5e1' : '#475569'}
          strokeWidth="0.75"
        />
        <line
          x1="13"
          y1="11.2"
          x2="19"
          y2="11.2"
          stroke={isLight ? '#cbd5e1' : '#475569'}
          strokeWidth="0.75"
        />

        {/* Ambient Halo behind glass (active when ON) */}
        {isLight && (
          <circle
            cx="16"
            cy="23"
            r="13"
            fill="rgba(251, 191, 36, 0.35)"
            filter="url(#bulbBloomFilter)"
          />
        )}

        {/* Glass Bulb Globe */}
        <path
          d="M12.5 14 C12.5 14 9 17.5 9 22.8 C9 27.6 12 31.5 16 31.5 C20 31.5 23 27.6 23 22.8 C23 17.5 19.5 14 19.5 14 Z"
          fill={isLight ? 'url(#bulbWarmGlow)' : 'rgba(255, 255, 255, 0.08)'}
          stroke={isLight ? '#f59e0b' : 'rgba(255, 255, 255, 0.32)'}
          strokeWidth={isLight ? '1.2' : '1'}
          style={{
            filter: isLight ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.88))' : 'none',
            transition: 'fill 0.25s ease, stroke 0.25s ease, filter 0.25s ease',
          }}
        />

        {/* Internal Tungsten Filament & Mount Wires */}
        {isLight ? (
          <>
            <path
              d="M13.5 23.5 L15 18 L17 18 L18.5 23.5"
              stroke="#ffffff"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="18" r="1.3" fill="#ffffff" />
          </>
        ) : (
          <>
            <path
              d="M13.5 23.5 L15 18.5 L17 18.5 L18.5 23.5"
              stroke="rgba(245, 158, 11, 0.45)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.8 20.5 C10.8 19 11.6 17 13 16"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Pull String Socket Collar Exit */}
        <rect
          x="14.8"
          y="31.5"
          width="2.4"
          height="1.8"
          rx="0.6"
          fill={isLight ? '#b45309' : '#475569'}
        />

        {/* Elegant, lengthened pull rope with authentic physics curve */}
        <path
          d={`M ${ANCHOR_X} ${ANCHOR_Y} Q ${ctrlX} ${ctrlY} ${ropeX} ${ropeY}`}
          stroke={isLight ? '#b45309' : '#94a3b8'}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cord tip knot and brass pull-knob */}
        <circle
          cx={ropeX}
          cy={ropeY + 1.2}
          r={2.8}
          fill={isLight ? '#b45309' : '#475569'}
          stroke={isLight ? '#92400e' : '#334155'}
          strokeWidth={0.8}
        />
        <circle
          cx={ropeX - 0.7}
          cy={ropeY + 0.5}
          r={0.9}
          fill={isLight ? '#fef3c7' : '#94a3b8'}
        />
      </svg>
    </div>
  );
};

export default React.memo(ThemeBulbSwitch);
