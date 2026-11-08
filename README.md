# Web Portfolio

> High-performance, responsive single-page portfolio application built with React 18, Framer Motion, and custom frosted glass design architecture.

🔗 **Live Deployment**: [https://hmswrth.netlify.app/](https://hmswrth.netlify.app/)

---

## 🛠 Tech Stack

- **Core Framework**: React 18
- **Animation & Physics**: Framer Motion
- **Icons**: Lucide React, React Icons
- **HTTP Client**: Axios
- **CSS Architecture**: Custom CSS Variables, Glassmorphism / Frosted Glass UI, GPU-accelerated compositing
- **Compatibility & Polyfills**: `react-app-polyfill`, `smoothscroll-polyfill`, `intersection-observer`

---

## ⚡ Performance & Cross-Browser Architecture

### 1. Safari & WebKit Compatibility
- **Polyfill Baseline**: Embedded `react-app-polyfill/stable`, `intersection-observer`, and `smoothscroll-polyfill` at application bootstrap to ensure feature parity across older and modern WebKit engines.
- **Viewport & Stacking Context**: Replaced `overflow-x: clip` with cross-browser `overflow-x: hidden`, preventing WebKit from breaking `position: fixed` elements (navigation bars, scroll progress indicators, and modal backdrops).
- **GPU Layer Promotion**: Applied `-webkit-transform: translateZ(0)`, `-webkit-backdrop-filter`, and CSS isolation (`isolation: isolate; contain: strict;`) to prevent WebKit compositor crashes and black-screen artifacts when layering frosted elements over animated surfaces.
- **Dynamic Viewport**: Implemented `100dvh` and `viewport-fit=cover` to eliminate scroll jumping caused by iOS Safari address bar transitions.

### 2. Mobile & Chromium Optimization (Brave, Chrome Mobile)
- **Touch Event Decoupling**: Detected touch devices (`(hover: none) and (pointer: coarse)`) to disable continuous pointer tracking during touch scrolling. This eliminates frequent CSS custom property updates on `:root`, preventing full-DOM style recalculations on every frame.
- **Animation Frame Throttling**: Throttled desktop pointer updates via `requestAnimationFrame` to match display refresh rates.
- **GPU Fill-Rate Conservation**: Replaced expensive 120–140px Gaussian blur filters on mobile viewports with lightweight radial gradients (`filter: none;`), reducing fragment shader overhead while retaining smooth color falloff.
- **Adaptive Blur & Contrast**: Adjusted mobile card backdrop filters to `12px` with higher opacity backgrounds, maintaining the frosted glass look while preserving 60–120 FPS on resource-constrained mobile GPUs.
- **Deferred Rendering**: Added `content-visibility: auto; contain-intrinsic-size: 800px;` to offscreen sections to defer layout and paint until approached during scrolling.

---

## 📁 Repository Structure

```
web-portfolio/
├── public/
│   ├── index.html              # HTML shell, preconnects, and viewport configuration
│   ├── manifest.json           # PWA web manifest
│   └── robots.txt
├── src/
│   ├── api/
│   │   └── ContactForm.js      # API dispatcher with timeout handling
│   ├── assets/
│   │   └── retailWeb/          # Project media assets
│   ├── components/
│   │   ├── contact/            # Contact form and profile links
│   │   ├── experience/         # Experience timeline with segmented tab controls
│   │   ├── home/               # Root view & unified IntersectionObserver
│   │   ├── intro/              # Landing hero section and key metrics
│   │   ├── shared/
│   │   │   ├── InteractiveGlowBackground.jsx  # Adaptive RAF/touch background engine
│   │   │   └── LinearHeader.jsx               # Sticky frosted navigation header
│   │   ├── skills/             # Technical capability matrices
│   │   ├── ui/                 # Reusable buttons, inputs, labels, and badges
│   │   └── work/               # Projects catalog and modal inspector
│   ├── App.css                 # Frosted glass design system and responsive styles
│   ├── App.js                  # Application root
│   ├── index.css               # Global baseline and tokens
│   └── index.js                # App entrypoint and polyfill initialization
└── package.json
```

---

## 📄 License

MIT
