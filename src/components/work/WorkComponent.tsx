import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/button';
import { Badge } from '../ui/input';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { AiOutlineGithub } from 'react-icons/ai';

// Images from retailWeb
import rw1 from '../../assets/retailWeb/retailWeb1.png';
import rw2 from '../../assets/retailWeb/retailWeb2.png';
import rw3 from '../../assets/retailWeb/retailWeb3.png';
import rw4 from '../../assets/retailWeb/retailWeb4.png';
import rw5 from '../../assets/retailWeb/retailWeb5.png';

interface Category {
  id: string;
  label: string;
}

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'finance', label: 'Financial Engines & DevOps' },
  { id: 'ai', label: 'AI & FastMCP' },
  { id: 'web', label: 'Enterprise Platforms' },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  scaleBadge: string;
  badgeColor: string;
  description: string;
  tech: string[];
  highlights?: string[];
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'nasdaq-mcp',
    title: 'Nasdaq NFN Model Context Protocol (FastMCP)',
    category: 'ai',
    scaleBadge: 'FastMCP · RAG · LLM',
    badgeColor: 'violet',
    description:
      'Engineered an enterprise Model Context Protocol (MCP) server in FastMCP/Python enabling generative AI workflows to interact with Nasdaq Fund Network APIs through dynamic report discovery, RAG parameterization, and automated fund instrument lifecycle tooling.',
    tech: ['FastMCP', 'Python', 'LLM Agents', 'RAG', 'REST APIs', 'JSON-RPC'],
    highlights: [
      'Automated schema discovery translating natural language queries to dynamic API parameters',
      'Zero-shot instrument registration and pricing validation tools for enterprise AI agents',
      'High-precision context retrieval eliminating hallucinations in fund lifecycle queries',
    ],
  },
  {
    id: 'nasdaq-pricing',
    title: 'Nasdaq High-Throughput Pricing Engine & NFN Core',
    category: 'finance',
    scaleBadge: '3x Capacity · 300% Boost',
    badgeColor: 'blue',
    description:
      'Architected a resilient high-throughput Pricing Engine to centralize and normalize instrument pricing logic across the Nasdaq Fund Network, processing disparate external feeds from institutions via REST APIs, FTP streams, and trading interfaces.',
    tech: ['React', 'TypeScript', '.NET Core', 'PostgreSQL', 'Kubernetes (K8s)'],
    highlights: [
      'Re-engineered batch applications to expand capacity from 1,000 to 3,000+ instruments',
      'Achieved a 300% performance improvement in upload processing times',
      'Engineered fault-tolerant transaction pipelines across PostgreSQL and K8s clusters',
    ],
  },
  {
    id: 'nasdaq-datalink-devops',
    title: 'Nasdaq Data Link Worker Services & Argo CD GitOps',
    category: 'finance',
    scaleBadge: 'Helm · Argo CD · Data Link',
    badgeColor: 'emerald',
    description:
      'Engineered resilient background worker services facilitating inter-service communication between internal Nasdaq systems to serve Nasdaq Data Link, alongside authoring production Helm charts and orchestrating automated Argo CD GitOps pipelines.',
    tech: ['Helm Charts', 'Argo CD', 'Kubernetes', 'Worker Services', 'Nasdaq Data Link', 'Docker', '.NET Core'],
    highlights: [
      'Architected background worker services for high-throughput inter-service telemetry and data ingestion',
      'Authored enterprise Helm charts standardizing deployment templates across multi-cluster environments',
      'Automated GitOps continuous deployment synchronization via Argo CD with zero downtime',
    ],
  },
  {
    id: 'saveo-platform',
    title: 'Saveo Wholesale & Retail Web Platform',
    category: 'web',
    scaleBadge: 'Sole Contributor Vertical',
    badgeColor: 'indigo',
    description:
      'Served as the Sole Contributor to design, architect, and deliver the entire wholesale web platform on Saveo, launching a major new business vertical, alongside leading the high-speed retail PWA experience for pharmacies nationwide.',
    images: [rw1, rw2, rw3, rw4, rw5],
    tech: ['React JS', 'Material-UI', 'PWA', 'Docker Swarm', 'GCP', 'AWS', 'Jenkins'],
    highlights: [
      'Engineered offline-ready PWA with instant catalog searching and order placement',
      'Sole architecture for wholesale procurement, order batches, and pharmacy workflows',
      'Integrated real-time logistics, supply/demand, and finance data flows',
    ],
    liveUrl: 'https://web.saveo.in',
  },
  {
    id: 'cryptoverse',
    title: 'Cryptoverse – Real-Time Financial Intelligence',
    category: 'web',
    scaleBadge: 'Redux · Chart.js · Live APIs',
    badgeColor: 'amber',
    description:
      'A real-time cryptocurrency platform delivering live market trends, deep coin analytics, candlestick/line pricing charts, global exchange data, and verified financial news streams.',
    tech: ['React', 'Redux Toolkit', 'Chart.js', 'Ant Design', 'CoinRanking API', 'BingNews API'],
    highlights: [
      'Interactive financial charting powered by Chart.js with dynamic timeline ranges',
      'Integrated CoinRanking & BingNews APIs for real-time market metrics and crypto trends',
      'Responsive dark-mode interface with instant state synchronization via Redux',
    ],
    githubUrl: 'https://github.com/hmswrth/cryptoverse',
  },
  {
    id: 'glaucoma-ai',
    title: 'Glaucoma Diagnosis via Retinal Fundus AI',
    category: 'ai',
    scaleBadge: 'OpenCV2 · 2,000+ Patient Samples',
    badgeColor: 'violet',
    description:
      'Machine learning diagnostic classifier designed for the automated classification of glaucomatous eyes from Retinal Fundus images across a clinical dataset of 2,000+ test samples.',
    tech: ['Python', 'OpenCV2', 'Scikit-Learn', 'Ensemble ML', 'Computer Vision'],
    highlights: [
      'Custom OpenCV2 image preprocessing pipeline computing optical cup/disc ratios',
      'Ensemble machine learning model aggregating multiple feature extractors for high sensitivity',
      'Rigorous cross-validation on multi-source clinical retinal datasets',
    ],
  },
];

const WorkComponent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const filtered =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  const openModal = (proj: Project) => {
    setSelectedProject(proj);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images!.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject?.images) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length
      );
    }
  };

  // Keyboard accessibility for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, closeModal]);

  return (
    <section id="architecture">
      <div className="section-header-block">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="section-label-dot" />
          <span>Architectural Catalog</span>
        </motion.div>

        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
        >
          Featured Works &amp; Systems
        </motion.h2>

        <motion.p
          className="section-subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
        >
          High-throughput pricing engines, Nasdaq Data Link worker services, Model Context Protocol AI retrieval architectures,
          and automated Argo CD GitOps deployments.
        </motion.p>
      </div>

      {/* Frosted Segmented Filter Control */}
      <motion.div
        style={{ marginBottom: '2.5rem' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
      >
        <div className="segmented-control-frosted" role="tablist" aria-label="Filter systems by category">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`segmented-tab-btn-frosted ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="work-active-pill-frosted"
                    className="tab-active-pill-frosted"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="tab-label-text">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Grid of Frosted Glass Architecture Cards */}
      <div className="architecture-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 + (idx % 3) * 0.08 }}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.2rem',
                  }}
                >
                  <Badge color={proj.badgeColor}>{proj.scaleBadge}</Badge>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {proj.category}
                  </span>
                </div>

                <h3
                  onClick={() => openModal(proj)}
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    marginBottom: '0.85rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                >
                  {proj.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem',
                  }}
                >
                  {proj.description}
                </p>
              </div>

              <div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-glass)',
                  }}
                >
                  {proj.tech.map((t, sIdx) => (
                    <Badge key={sIdx} color="default">
                      {t}
                    </Badge>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(proj)}
                    aria-label={`Inspect case study for ${proj.title}`}
                  >
                    <span>Inspect Case Study</span>
                    {proj.images ? (
                      <Maximize2 size={13} style={{ marginLeft: 6, color: 'var(--accent-blue)' }} />
                    ) : (
                      <Sparkles size={13} style={{ marginLeft: 6, color: 'var(--accent-violet)' }} />
                    )}
                  </Button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Button variant="ghost" size="icon">
                          <AiOutlineGithub size={18} />
                        </Button>
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live System"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <Button variant="ghost" size="icon">
                          <ExternalLink size={16} />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Case Study Frosted Glass Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            onClick={closeModal}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(5, 7, 12, 0.82)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22 }}
              className="case-study-modal-content"
            >
              <button
                onClick={closeModal}
                aria-label="Close modal dialog"
                style={{
                  position: 'absolute',
                  top: '18px',
                  right: '18px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <X size={18} />
              </button>

              <div style={{ marginBottom: '0.85rem' }}>
                <Badge color={selectedProject.badgeColor}>{selectedProject.scaleBadge}</Badge>
              </div>

              <h2
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.03em',
                  marginBottom: '1rem',
                  lineHeight: 1.25,
                }}
              >
                {selectedProject.title}
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {selectedProject.description}
              </p>

              {/* Screenshot gallery if present */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <div
                    style={{
                      position: 'relative',
                      backgroundColor: 'rgba(5, 7, 12, 0.9)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        maxHeight: '420px',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImg}
                          aria-label="Previous screenshot"
                          style={{
                            position: 'absolute',
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(10, 14, 24, 0.8)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <ChevronLeft size={22} />
                        </button>
                        <button
                          onClick={nextImg}
                          aria-label="Next screenshot"
                          style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(10, 14, 24, 0.8)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <ChevronRight size={22} />
                        </button>
                      </>
                    )}
                  </div>

                  {selectedProject.images.length > 1 && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '6px',
                        marginTop: '12px',
                      }}
                    >
                      {selectedProject.images.map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: i === currentImageIndex ? '22px' : '6px',
                            height: '6px',
                            borderRadius: '3px',
                            backgroundColor: i === currentImageIndex ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Key Highlights */}
              {selectedProject.highlights && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--accent-blue)',
                      marginBottom: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    Architectural Contributions
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {selectedProject.highlights.map((h, hIdx) => (
                      <div key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.96rem', color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-blue)', marginTop: '2px' }}>▹</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '0.65rem',
                    fontWeight: 600,
                  }}
                >
                  Technologies
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedProject.tech.map((t, tIdx) => (
                    <Badge key={tIdx} color="default">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(WorkComponent);
