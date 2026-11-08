import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import ThemeBulbSwitch from './ThemeBulbSwitch';
import ThemeTransitionOverlay from './ThemeTransitionOverlay';

describe('ThemeBulbSwitch & ThemeContext', () => {
  let mediaQueryListener: ((e: { matches: boolean }) => void) | null = null;

  const createMockMatchMedia = (matchesLight: boolean) => (query: string) => ({
    matches: matchesLight ? query.includes('light') : false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn((event: string, handler: (e: { matches: boolean }) => void) => {
      if (event === 'change') {
        mediaQueryListener = handler;
      }
    }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });

  beforeEach(() => {
    localStorage.clear();
    mediaQueryListener = null;
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-theme-transition');
    window.matchMedia = jest.fn().mockImplementation(createMockMatchMedia(false));
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders bulb switch button with appropriate role and aria attributes', () => {
    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
      </ThemeProvider>
    );

    const switchBtn = screen.getByRole('button', { name: /switch to light theme/i });
    expect(switchBtn).toBeInTheDocument();
    expect(switchBtn).toHaveAttribute('aria-pressed', 'false');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('detects system preference prefers-color-scheme: light on load', () => {
    window.matchMedia = jest.fn().mockImplementation(createMockMatchMedia(true));

    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    const switchBtn = screen.getByRole('button', { name: /switch to dark theme/i });
    expect(switchBtn).toBeInTheDocument();
    expect(switchBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('toggles theme on click and updates localStorage and document attribute', () => {
    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
        <ThemeTransitionOverlay />
      </ThemeProvider>
    );

    const switchBtn = screen.getByRole('button');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Click the bulb to pull the string
    act(() => {
      fireEvent.click(switchBtn);
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');

    // Click again to turn off
    act(() => {
      fireEvent.click(switchBtn);
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('portfolio-theme')).toBe('dark');
  });

  test('supports keyboard activation via Enter and Space key', () => {
    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
      </ThemeProvider>
    );

    const switchBtn = screen.getByRole('button');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    act(() => {
      fireEvent.keyDown(switchBtn, { key: 'Enter' });
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    act(() => {
      fireEvent.keyDown(switchBtn, { key: ' ' });
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('supports pointer drag down past pull threshold to trip switch', () => {
    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
      </ThemeProvider>
    );

    const switchBtn = screen.getByRole('button');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Start drag
    act(() => {
      fireEvent.pointerDown(switchBtn, { button: 0, clientX: 100, clientY: 100, pointerId: 1 });
      // Drag down 30px (well past 11px threshold)
      fireEvent.pointerMove(switchBtn, { clientX: 100, clientY: 135, pointerId: 1 });
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Release drag
    act(() => {
      fireEvent.pointerUp(switchBtn, { clientX: 100, clientY: 135, pointerId: 1 });
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
  });

  test('does not toggle theme if pointer drag is below pull threshold', () => {
    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
      </ThemeProvider>
    );

    const switchBtn = screen.getByRole('button');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Minor wiggle drag (below 11px threshold)
    act(() => {
      fireEvent.pointerDown(switchBtn, { button: 0, clientX: 100, clientY: 100, pointerId: 1 });
      fireEvent.pointerMove(switchBtn, { clientX: 100, clientY: 104, pointerId: 1 });
      fireEvent.pointerCancel(switchBtn);
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('reacts to dynamic system preference changes when no explicit choice saved', () => {
    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Simulate system preference change event to light
    act(() => {
      if (mediaQueryListener) {
        mediaQueryListener({ matches: true });
      }
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Simulate system preference change back to dark
    act(() => {
      if (mediaQueryListener) {
        mediaQueryListener({ matches: false });
      }
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('manual user choice in localStorage takes precedence over system changes', () => {
    render(
      <ThemeProvider>
        <ThemeBulbSwitch />
      </ThemeProvider>
    );

    const switchBtn = screen.getByRole('button');

    // Manually toggle to light
    act(() => {
      fireEvent.click(switchBtn);
      jest.advanceTimersByTime(500);
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');

    // Simulate system change to dark (should be ignored because user manually chose light)
    act(() => {
      if (mediaQueryListener) {
        mediaQueryListener({ matches: false });
      }
    });

    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
