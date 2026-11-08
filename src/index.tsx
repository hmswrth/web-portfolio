import 'react-app-polyfill/stable';
import 'intersection-observer';
import smoothscroll from 'smoothscroll-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Initialize cross-browser smooth scroll polyfill (Safari & older WebKit)
if (typeof window !== 'undefined') {
  smoothscroll.polyfill();
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
