import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import LinearHeader from '../shared/LinearHeader';
import InteractiveGlowBackground from '../shared/InteractiveGlowBackground';
import IntroComponent from '../intro/IntroComponent';
import ExperienceComponent from '../experience/ExperienceComponent';
import WorkComponent from '../work/WorkComponent';
import SkillsComponent from '../skills/SkillsComponent';
import ContactComponent from '../contact/ContactComponent';

const HomeComponent = () => {
  const [activeSection, setActiveSection] = useState('intro');

  // Smooth scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['intro', 'experience', 'architecture', 'stack', 'contact'];
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0,
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(observerCallback, observerOptions);
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="app-root">
      {/* 2 Moving Interactive Glow Items with Framer Motion Physics */}
      <InteractiveGlowBackground />

      {/* Top Progress Line */}
      <motion.div className="top-scroll-line" style={{ scaleX }} />

      {/* Sticky Frosted Glass Header */}
      <LinearHeader activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Single-Column Frosted Glass Container */}
      <main className="main-container-frosted">
        <IntroComponent onNavigate={handleNavigate} />
        <ExperienceComponent />
        <WorkComponent />
        <SkillsComponent />
        <ContactComponent />

        {/* Frosted Glass Footer */}
        <footer className="frosted-footer">
          <div>
            © {new Date().getFullYear()} Hemanth Mudra. Specialist Software Engineer at Nasdaq.
          </div>
          <div className="frosted-footer-links">
            <a
              href="https://github.com/hmswrth"
              target="_blank"
              rel="noopener noreferrer"
              className="frosted-footer-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/hemanth-mudra/"
              target="_blank"
              rel="noopener noreferrer"
              className="frosted-footer-link"
            >
              LinkedIn
            </a>
            <a
              href="mailto:mudra.hemanth@gmail.com"
              className="frosted-footer-link"
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
