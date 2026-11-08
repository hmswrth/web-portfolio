import React, { useRef, useState, useEffect, useCallback } from 'react';
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
const REST_Y = 58; // Lengthened pull cord with authentic physics (no lagging ball)
const ANCHOR_X = 16;
const ANCHOR_Y = 32.5;
const PULL_THRESHOLD = 12; // px downward pull to trip switch

const ThemeBulbSwitch: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  // Rope end physics position state
  const [ropeEnd, setRopeEnd] = useState<{ x: number; y: number }>({ x: REST_X, y: REST_Y });

  // Physics simulation state refs
  const posRef = useRef<{ x: number; y: number }>({ x: REST_X, y: REST_Y });
  const velRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 });
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Interaction tracking refs
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ clientX: number; clientY: number }>({ clientX: 0, clientY: 0 });
  const hasTrippedRef = useRef<boolean>(false);
  const hasMovedSignificantlyRef = useRef<boolean>(false);
  const gestureHandledRecentlyRef = useRef<boolean>(false);

  const isLight = theme === 'light';

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

  // Physics animation loop: vertical Hooke's Law spring + lateral pendulum sway
  const startPhysicsSimulation = useCallback((initialVx = 0, initialVy = 0) => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    velRef.current = { vx: initialVx, vy: initialVy };
    lastTimeRef.current = null;

    const animatePhysics = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
        animFrameRef.current = requestAnimationFrame(animatePhysics);
        return;
      }

      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.032);
      lastTimeRef.current = now;

      const { x, y } = posRef.current;
      const { vx, vy } = velRef.current;

      // Vertical spring physics
      const kY = 320;
      const dY = 14;
      const deltaY = y - REST_Y;
      const forceY = -kY * deltaY - dY * vy;
      const nextVy = vy + forceY * dt;
      const nextY = y + nextVy * dt;

      // Lateral pendulum oscillation
      const kX = 140;
      const dX = 3.2;
      const deltaX = x - REST_X;
      const forceX = -kX * deltaX - dX * vx;
      const nextVx = vx + forceX * dt;
      const nextX = x + nextVx * dt;

      posRef.current = { x: nextX, y: nextY };
      velRef.current = { vx: nextVx, vy: nextVy };
      setRopeEnd({ x: nextX, y: nextY });

      const totalEnergy = Math.abs(deltaY) + Math.abs(deltaX) + Math.abs(nextVy) * 0.05 + Math.abs(nextVx) * 0.05;
      if (totalEnergy > 0.04) {
        animFrameRef.current = requestAnimationFrame(animatePhysics);
      } else {
        posRef.current = { x: REST_X, y: REST_Y };
        velRef.current = { vx: 0, vy: 0 };
        setRopeEnd({ x: REST_X, y: REST_Y });
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(animatePhysics);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Programmatic pull animation on click or tap
  const triggerPullAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    // Direct downward stretch of rope
    posRef.current = { x: REST_X + 1.5, y: REST_Y + 14 };
    setRopeEnd({ x: REST_X + 1.5, y: REST_Y + 14 });

    setTimeout(() => {
      triggerToggle();
      startPhysicsSimulation(-35, -170);
    }, 90);
  }, [startPhysicsSimulation, triggerToggle]);

  // Pointer drag event handlers for authentic pulling without lagging ball
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    isDraggingRef.current = true;
    dragStartRef.current = { clientX: e.clientX, clientY: e.clientY };
    hasTrippedRef.current = false;
    hasMovedSignificantlyRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartRef.current.clientX;
    const deltaY = e.clientY - dragStartRef.current.clientY;

    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      hasMovedSignificantlyRef.current = true;
    }

    const rawPull = Math.max(0, deltaY);
    const elasticY = REST_Y + (rawPull * 22) / (22 + rawPull * 0.4);
    const elasticX = REST_X + Math.max(-9, Math.min(9, deltaX * 0.35));

    posRef.current = { x: elasticX, y: elasticY };
    setRopeEnd({ x: elasticX, y: elasticY });

    if (!hasTrippedRef.current && elasticY - REST_Y >= PULL_THRESHOLD) {
      hasTrippedRef.current = true;
      triggerToggle();
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
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

    if (hasMovedSignificantlyRef.current) {
      const currentX = posRef.current.x;
      const lateralImpulse = (REST_X - currentX) * 16;
      startPhysicsSimulation(lateralImpulse, -170);
    } else {
      triggerPullAnimation();
    }
  };

  const handlePointerCancel = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    startPhysicsSimulation(0, -120);
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

  // Flexible rope curve coordinates
  const { x: ropeX, y: ropeY } = ropeEnd;
  const ctrlX = ANCHOR_X + (ropeX - ANCHOR_X) * 0.42;
  const ctrlY = ANCHOR_Y + (ropeY - ANCHOR_Y) * 0.52;

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
      <svg
        width="34"
        height="72"
        viewBox="0 0 32 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="theme-bulb-svg"
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

        {/* Elegant, lengthened pull rope with physics curve */}
        <path
          d={`M ${ANCHOR_X} ${ANCHOR_Y} Q ${ctrlX} ${ctrlY} ${ropeX} ${ropeY}`}
          stroke={isLight ? '#b45309' : '#94a3b8'}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Clean knotted cord finish (clean pull-tip, zero lag, no ball) */}
        <line
          x1={ropeX - 1.5}
          y1={ropeY - 0.5}
          x2={ropeX + 1.5}
          y2={ropeY - 0.5}
          stroke={isLight ? '#92400e' : '#64748b'}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default React.memo(ThemeBulbSwitch);
