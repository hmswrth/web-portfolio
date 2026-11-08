import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import LinearHeader from '../shared/LinearHeader';
import InteractiveGlowBackground from '../shared/InteractiveGlowBackground';
import IntroComponent from '../intro/IntroComponent';
import ExperienceComponent from '../experience/ExperienceComponent';
import WorkComponent from '../work/WorkComponent';
import SkillsComponent from '../skills/SkillsComponent';
import ContactComponent from '../contact/ContactComponent';

const SECTION_IDS = ['intro', 'experience', 'architecture', 'stack', 'contact'];

const HomeComponent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  // Smooth scroll progress bar with optimized spring physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.005,
  });

  // Track active section via a single shared IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const headerOffset = 72;
    const elementPosition = el.getBoundingClientRect().top;
    const currentScroll =
      window.scrollY !== undefined
        ? window.scrollY
        : (window.pageYOffset || document.documentElement.scrollTop || 0);
    const targetPosition = Math.max(0, elementPosition + currentScroll - headerOffset);

    try {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, targetPosition);
    }
  };

  return (
    <div className="app-root">
      {/* Dynamic interactive glow backdrop (Adaptive Desktop/Mobile) */}
      <InteractiveGlowBackground />

      {/* Top Reading Progress Bar */}
      <motion.div className="top-scroll-line" style={{ scaleX }} />

      {/* Sticky Frosted Glass Header with Live Light Bulb Switch */}
      <LinearHeader activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Single-Column Container */}
      <main className="main-container-frosted" id="main-content">
        <IntroComponent onNavigate={handleNavigate} />
        <ExperienceComponent />
        <WorkComponent />
        <SkillsComponent />
        <ContactComponent />

        {/* Frosted Glass Footer */}
        <footer className="frosted-footer" role="contentinfo">
          <div>
            © {new Date().getFullYear()} Hemanth Mudra · Specialist Software Engineer at Nasdaq.
          </div>
          <div className="frosted-footer-links">
            <a
              href="https://github.com/hmswrth"
              target="_blank"
              rel="noopener noreferrer"
              className="frosted-footer-link"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hemanth-mudra/"
              target="_blank"
              rel="noopener noreferrer"
              className="frosted-footer-link"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <a
              href="mailto:mudra.hemanth@gmail.com"
              className="frosted-footer-link"
              aria-label="Send direct email"
            >
              Email
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomeComponent;
