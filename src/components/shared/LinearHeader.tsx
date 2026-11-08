import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/button';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeBulbSwitch from './ThemeBulbSwitch';

const NAV_LINKS = [
  { id: 'intro', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

export interface LinearHeaderProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const LinearHeader: React.FC<LinearHeaderProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open (especially iOS Safari)
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleMobileNav = (id: string) => {
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      onNavigate(id);
    });
  };

  return (
    <>
      <header className="frosted-header" role="banner">
        <div className="frosted-header-inner">
          {/* Brand */}
          <button
            type="button"
            className="header-brand"
            onClick={() => handleMobileNav('intro')}
            aria-label="Hemanth Mudra - Scroll to top"
            style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', font: 'inherit' }}
          >
            <div className="header-monogram">HM</div>
            <div className="header-brand-text">
              <div className="header-name">Hemanth Mudra</div>
              <div className="header-role">Specialist SWE · Nasdaq</div>
            </div>
          </button>

          {/* Navigation Items (Desktop) */}
          <nav className="header-nav" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`header-nav-btn ${isActive ? 'active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="header-active-pill"
                      className="header-nav-active-bg"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Theme Light Bulb & Mobile Toggle */}
          <div className="header-actions">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('contact')}
              className="header-btn-contact"
            >
              <span>Contact</span>
            </Button>

            <a
              href="mailto:mudra.hemanth@gmail.com?subject=Portfolio%20Inquiry%20-%20Resume%20Request"
              style={{ textDecoration: 'none' }}
              aria-label="Request Resume via Email"
              className="header-btn-resume-link"
            >
              <Button variant="default" size="sm" className="header-btn-resume">
                <span>Resume</span>
                <ArrowUpRight size={13} style={{ marginLeft: 4 }} />
              </Button>
            </a>

            {/* Live Light Bulb with String Physics Switch */}
            <ThemeBulbSwitch />

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              className="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-nav-backdrop"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              key="mobile-drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div className="mobile-nav-inner">
                <div className="mobile-nav-links">
                  {NAV_LINKS.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileNav(link.id);
                        }}
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span>{link.label}</span>
                        {isActive && <div className="mobile-nav-active-indicator" />}
                      </a>
                    );
                  })}
                </div>

                <div className="mobile-nav-actions">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => handleMobileNav('contact')}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <span>Get in Touch</span>
                  </Button>
                  <a
                    href="mailto:mudra.hemanth@gmail.com?subject=Portfolio%20Inquiry%20-%20Resume%20Request"
                    style={{ textDecoration: 'none', width: '100%' }}
                  >
                    <Button
                      variant="default"
                      size="default"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      <span>Request Resume</span>
                      <ArrowUpRight size={14} style={{ marginLeft: 6 }} />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(LinearHeader);
