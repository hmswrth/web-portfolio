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

  // Synchronize data-theme on document element and theme-color meta tag
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'light' ? '#f4f6fb' : '#08090e');
      }
    }
  }, [theme]);

  // Synchronize with OS prefers-color-scheme if no user override
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
        // ignore
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
          ) + 60;

        // Freeze standard CSS transitions and tag transition direction
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
            // Turning ON: Daylight circle expands outward from the bulb to fill the screen
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 650,
                easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-new(root)',
              }
            );
          } else {
            // Turning OFF: Daylight circle collapses inward down into the bulb revealing night
            // fill: 'forwards' is CRITICAL here to prevent the light screen from flashing back at 700ms
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                  `circle(0px at ${x}px ${y}px)`,
                ],
              },
              {
                duration: 650,
                easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                fill: 'forwards',
                pseudoElement: '::view-transition-old(root)',
              }
            );
          }
        });

        transition.finished.finally(() => {
          document.documentElement.removeAttribute('data-theme-transition');
        });
      } else {
        // Universal Fallback for browsers without View Transitions
        setTransitionState({
          active: true,
          originX: x,
          originY: y,
          targetTheme: nextTheme,
        });

        if (nextTheme === 'dark') {
          // Immediately set dark theme underneath the collapsing daylight disc
          setTheme('dark');
          try {
            localStorage.setItem('portfolio-theme', 'dark');
          } catch {
            // ignore
          }
        } else {
          // When turning ON, switch theme mid-expansion as the wavefront sweeps across
          setTimeout(() => {
            setTheme('light');
            try {
              localStorage.setItem('portfolio-theme', 'light');
            } catch {
              // ignore
            }
          }, 260);
        }

        setTimeout(() => {
          setTransitionState((prev) => ({ ...prev, active: false }));
        }, 700);
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
