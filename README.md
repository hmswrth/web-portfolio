# Web Portfolio

> High-performance, responsive single-page portfolio application built with React 18, TypeScript, Framer Motion, and custom frosted glass design architecture.

🔗 **Live Deployment**: [https://hmswrth.netlify.app/](https://hmswrth.netlify.app/)

---

## 🛠 Tech Stack

- **Core Framework**: React 18 & TypeScript (100% strict type safety)
- **Animation & Physics**: Framer Motion (interactive spring dynamics, rope elasticity, pendulum damping)
- **Theme Engine**: System preference detection (`prefers-color-scheme`), View Transitions API circular wipe, and fallback clip-path wave
- **Icons**: Lucide React, React Icons
- **HTTP Client**: Axios
- **CSS Architecture**: Custom CSS Variables, Glassmorphism / Frosted Glass UI, GPU-accelerated compositing
- **Compatibility & Polyfills**: `react-app-polyfill`, `smoothscroll-polyfill`, `intersection-observer`

---

## ⚡ Performance & Cross-Browser Architecture

### 1. Interactive Light Bulb Switch & Day/Night Transition
- **Physics String & Bead**: Modeled with 2D damped harmonic oscillator equations (vertical spring elasticity $k_y = 320, d_y = 14$ and lateral pendulum restoring torque $k_x = 140, d_x = 3.2$). The pull cord renders via dynamic quadratic Bezier curves with tangent rotation and intermediate metallic chain links.
- **Circular Expansion & Contraction**: Uses the native View Transitions API with dynamic `clip-path: circle(...)` centered at the light bulb coordinates. When switching to light, daylight expands outward across the screen; when switching to dark, daylight collapses inward back down to the bulb.
- **Zero-Flicker System Preference**: Automatically evaluates `prefers-color-scheme` via an inline synchronous `<head>` script on first load and persists user choices in `localStorage`.

### 2. Safari & WebKit Compatibility
- **Polyfill Baseline**: Embedded `react-app-polyfill/stable`, `intersection-observer`, and `smoothscroll-polyfill` at application bootstrap to ensure feature parity across older and modern WebKit engines.
- **Viewport & Stacking Context**: Replaced `overflow-x: clip` with cross-browser `overflow-x: hidden`, preventing WebKit from breaking `position: fixed` elements (navigation bars, scroll progress indicators, and modal backdrops).
- **GPU Layer Promotion**: Applied `-webkit-transform: translateZ(0)`, `-webkit-backdrop-filter`, and CSS isolation (`isolation: isolate; contain: strict;`) to prevent WebKit compositor crashes and black-screen artifacts when layering frosted elements over animated surfaces.
- **Dynamic Viewport**: Implemented `100dvh` and `viewport-fit=cover` to eliminate scroll jumping caused by iOS Safari address bar transitions.

### 3. Mobile & Chromium Optimization (Brave, Chrome Mobile)
- **Touch Event Decoupling**: Bypasses continuous pointer tracking during touch scrolling, preventing full-DOM style recalculations on mobile devices.
- **Animation Frame Throttling**: Throttled pointer and physics updates via `requestAnimationFrame` to match display refresh rates.
- **Adaptive Blur & Contrast**: Adjusted mobile card backdrop filters to `12px` with higher opacity backgrounds, maintaining the frosted glass look while preserving 60–120 FPS on resource-constrained mobile GPUs.
- **Deferred Rendering**: Added `content-visibility: auto; contain-intrinsic-size: 800px;` to offscreen sections to defer layout and paint until approached during scrolling.

---

## 📁 Repository Structure

```
web-portfolio/
├── public/
│   ├── index.html              # HTML shell, synchronous theme init, and viewport config
│   ├── manifest.json           # PWA web manifest
│   └── robots.txt
├── src/
│   ├── api/
│   │   └── ContactForm.ts      # API dispatcher with timeout handling
│   ├── assets/
│   │   └── retailWeb/          # Project media assets
│   ├── components/
│   │   ├── contact/            # Contact form and profile links
│   │   ├── experience/         # Experience timeline with segmented tab controls
│   │   ├── home/               # Root view & unified IntersectionObserver
│   │   ├── intro/              # Landing hero section and key metrics
│   │   ├── shared/
│   │   │   ├── InteractiveGlowBackground.tsx  # Dotted matrix background canvas
│   │   │   ├── LinearHeader.tsx               # Sticky frosted navigation header
│   │   │   ├── ThemeBulbSwitch.tsx            # Live light bulb with rope physics
│   │   │   └── ThemeTransitionOverlay.tsx     # Circular day/night transition overlay
│   │   ├── skills/             # Technical capability matrices
│   │   ├── ui/                 # Reusable buttons, inputs, labels, and badges
│   │   └── work/               # Projects catalog and modal inspector
│   ├── context/
│   │   └── ThemeContext.tsx    # Theme provider, system detection & view transitions
│   ├── App.css                 # Frosted glass design system & responsive media queries
│   ├── App.tsx                 # Application root
│   ├── index.css               # Global baseline, tokens, and view transition styles
│   ├── index.tsx               # App entrypoint and polyfill initialization
│   ├── react-app-env.d.ts      # React Scripts TypeScript declarations
│   └── setupTests.ts           # Test configuration & pointer polyfills
├── tsconfig.json               # TypeScript compiler options
└── package.json
```

---

## 📄 License

MIT
