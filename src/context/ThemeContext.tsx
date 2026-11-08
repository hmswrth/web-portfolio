import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Theme = 'dark' | 'light';

export interface OriginCoords {
  x: number;
  y: number;
}

export interface TransitionState {
  active: boolean;
  originX: number;
  originY: number;
  targetTheme: Theme;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: (originCoords?: OriginCoords) => void;
  transitionState: TransitionState;
}


const defaultContext: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => {},
  transitionState: {
    active: false,
    originX: 0,
    originY: 0,
    targetTheme: 'dark',
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // 1. Initialize theme based on localStorage, or system preference fallback
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      const systemPrefersLight = window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: light)').matches
        : false;
      return systemPrefersLight ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [transitionState, setTransitionState] = useState<TransitionState>({
    active: false,
    originX: 0,
    originY: 0,
    targetTheme: 'dark',
  });

  // Apply theme attribute to document element and meta theme-color
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'light' ? '#f4f6fb' : '#08090e');
      }
    }
  }, [theme]);

  // Listen to system preference changes if user has not set an explicit override
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem('portfolio-theme');
        if (!saved) {
          const newTheme: Theme = e.matches ? 'light' : 'dark';
          setTheme(newTheme);
        }
      } catch {
        // Ignore localStorage error
      }
    };

    if (!mediaQuery) return;

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
      return () => mediaQuery.removeListener(handleSystemChange);
    }
  }, []);

  const toggleTheme = useCallback(
    (originCoords?: OriginCoords) => {
      const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
      const x = originCoords?.x ?? (typeof window !== 'undefined' ? window.innerWidth - 60 : 500);
      const y = originCoords?.y ?? 40;

      // Check if View Transitions API is supported
      if (
        typeof document !== 'undefined' &&
        document.startViewTransition &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        const isSwitchingToLight = nextTheme === 'light';
        const maxRadius =
          Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          ) + 40;

        // Tag the transition direction on documentElement for CSS pseudo-element z-index ordering
        document.documentElement.setAttribute(
          'data-theme-transition',
          isSwitchingToLight ? 'to-light' : 'to-dark'
        );

        const transition = document.startViewTransition(() => {
          setTheme(nextTheme);
          try {
            localStorage.setItem('portfolio-theme', nextTheme);
          } catch {
            // ignore
          }
        });

        transition.ready.then(() => {
          if (isSwitchingToLight) {
            // Turning ON the light bulb: Light circle expands outward from the bulb to fill the screen
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 750,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          } else {
            // Turning OFF the light bulb: Daylight circle closes inward down into the bulb revealing night
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                  `circle(0px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 700,
                easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                pseudoElement: '::view-transition-old(root)',
              }
            );
          }
        });

        transition.finished.finally(() => {
          document.documentElement.removeAttribute('data-theme-transition');
        });
      } else {
        // Universal Fallback for browsers without View Transitions (animates a circular wash)
        setTransitionState({
          active: true,
          originX: x,
          originY: y,
          targetTheme: nextTheme,
        });

        // When switching to dark: set dark theme immediately so daylight circle collapses to reveal night
        // When switching to light: set light theme mid-expansion as the light wave sweeps across
        if (nextTheme === 'dark') {
          setTheme('dark');
          try {
            localStorage.setItem('portfolio-theme', 'dark');
          } catch {
            // ignore
          }
        } else {
          setTimeout(() => {
            setTheme('light');
            try {
              localStorage.setItem('portfolio-theme', 'light');
            } catch {
              // ignore
            }
          }, 280);
        }

        setTimeout(() => {
          setTransitionState((prev) => ({ ...prev, active: false }));
        }, 750);
      }
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, transitionState }}>
      {children}
    </ThemeContext.Provider>
  );
};
