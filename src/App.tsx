import React from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import HomeComponent from './components/home/HomeComponent';
import ThemeTransitionOverlay from './components/shared/ThemeTransitionOverlay';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeTransitionOverlay />
      <HomeComponent />
    </ThemeProvider>
  );
};

export default App;
