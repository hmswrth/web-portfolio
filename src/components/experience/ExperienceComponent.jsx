import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../ui/input';
import { ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

const EXPERIENCES = [
  {
    id: 'nasdaq',
    company: 'Nasdaq, Inc.',
    role: 'Specialist – Software Engineering',
    period: 'Jun 2023 – Present',
    url: 'https://www.nasdaq.com/',
    color: 'blue',
    highlights: [
      {
        title: 'Nasdaq Fund Network (NFN) Core Re-engineering',
        desc: 'Re-architecting and re-engineering core business logic for fund ticker registration, data subscriptions, and end-to-end instrument lifecycle management at global financial scale.',
      },
      {
        title: '3x Capacity Growth & 300% Performance Surge',
        desc: 'Re-engineered critical batch application processing to support 3x capacity growth (from 1,000 to 3,000+ instruments), achieving a 300% performance increase in upload processing.',
      },
      {
        title: 'High-Throughput Pricing Engine',
        desc: 'Architected and led development of a high-throughput Pricing Engine to centralize and normalize instrument pricing logic, integrating disparate data feeds via REST APIs, FTP streams, and UI.',
      },
      {
        title: 'Nasdaq Data Link Worker Services',
        desc: 'Built resilient background worker services facilitating high-throughput communication between internal Nasdaq systems to ingest, process, and serve data for Nasdaq Data Link.',
      },
      {
        title: 'DevOps Tooling, Helm Charts & Argo CD',
        desc: 'Created and maintained production Helm charts and orchestrated automated, GitOps-driven Kubernetes deployments using Argo CD across multi-cluster environments.',
      },
      {
        title: 'NFN Model Context Protocol (FastMCP / Python)',
        desc: 'Developed the NFN Model Context Protocol server enabling Intelligent Data Retrieval for LLM workflows with RAG, dynamic report API discovery, and instrument registration tools.',
      },
      {
        title: 'Technical Leadership (SEEN)',
        desc: 'Software Engineering Employee Network (SEEN) leader, overseeing peer code reviews, mentoring developers, and organizing technical architecture sessions.',
      },
    ],
    tech: [
      'Kubernetes (K8s)',
      'Helm Charts',
      'Argo CD',
      'Worker Services',
      'Nasdaq Data Link',
      'React',
      'TypeScript',
      '.NET Core',
      'Python',
      'FastMCP',
      'RAG & LLM',
      'PostgreSQL',
      'Docker',
    ],
  },
  {
    id: 'saveo',
    company: 'Saveo Health Tech Pvt. Ltd.',
    role: 'SDE II, Full Stack Web',
    period: 'Jan 2022 – Mar 2023',
    url: 'https://web.saveo.in',
    color: 'emerald',
    highlights: [
      {
        title: 'Wholesale Web Platform Sole Architecture',
        desc: 'Served as the Sole Contributor to design, architect, and deliver the entire wholesale web platform on Saveo, successfully launching a high-growth new business vertical.',
      },
      {
        title: 'Retail Web PWA Experience',
        desc: 'Led retail web experience development across cross-functional teams, optimizing Core Web Vitals, offline PWA caching, and robust automated build/deployment pipelines.',
      },
      {
        title: 'Multi-Domain Analytics Dashboards',
        desc: 'Built internal command dashboards aiding executive decisions across Supply, Demand, Finance, and Logistics operations.',
      },
      {
        title: 'AWS to GCP Cloud Migration & ELK Stack',
        desc: 'Worked in a team of 2 migrating the entire cloud infrastructure from AWS to GCP, and implemented Elasticsearch with ELK stack for high-cardinality metric observability.',
      },
    ],
    tech: [
      'React JS',
      'Material-UI',
      'PWA',
      'Node.js',
      'Angular',
      'MongoDB',
      'GCP',
      'AWS',
      'Docker Swarm',
      'Elasticsearch (ELK)',
    ],
  },
  {
    id: 'cognizant',
    company: 'Cognizant',
    role: 'Programmer Analyst & SWE Intern',
    period: 'Jan 2020 – Dec 2021',
    url: 'https://www.cognizant.com/',
    color: 'amber',
    highlights: [
      {
        title: 'Query Management Blocker Tool',
        desc: 'Designed and implemented an automated query management tool minimizing turnaround time for resolving critical engineering blockers.',
      },
      {
        title: 'Telesales Automated E2E Pipeline',
        desc: 'Orchestrated an automated test suite and continuous integration E2E pipeline tailored for simulating high-volume telesales workflows.',
      },
      {
        title: 'Python Data Processing & UI',
        desc: 'Engineered Python data processing routines for analytics reports and delivered modern, responsive web interfaces.',
      },
    ],
    tech: [
      'Java',
      'JavaScript',
      'Selenium',
      'Python',
      'Jenkins CI/CD',
      'SQL',
      'HTML/CSS',
      'Git',
    ],
  },
];

const ExperienceComponent = () => {
  const [activeTab, setActiveTab] = useState(EXPERIENCES[0].id);
  const current = EXPERIENCES.find((e) => e.id === activeTab) || EXPERIENCES[0];

  return (
    <section id="experience">
      <div className="section-header-block">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="section-label-dot" />
          <span>Career Trajectory</span>
        </motion.div>

        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
        >
          Engineering Experience
        </motion.h2>

        <motion.p
          className="section-subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
        >
          Proven impact architecting mission-critical financial software at Nasdaq, launching
          scaled commerce verticals, and building high-throughput batch systems.
        </motion.p>
      </div>

      {/* Frosted Segmented Control Selector */}
      <motion.div
        style={{ marginBottom: '2rem' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
      >
        <div className="segmented-control-frosted">
          {EXPERIENCES.map((exp) => {
            const isActive = exp.id === activeTab;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`segmented-tab-btn-frosted ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="exp-active-pill-frosted"
                    className="tab-active-pill-frosted"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="tab-label-text">{exp.company}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Active Experience Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card"
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '1.75rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid var(--border-glass)',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.025em' }}>
                {current.role}
              </h3>
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--accent-blue)',
                  fontSize: '0.98rem',
                  fontWeight: 600,
                  marginTop: '4px',
                }}
              >
                <span>{current.company}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Badge color="blue" style={{ gap: '6px' }}>
                <Calendar size={12} />
                <span>{current.period}</span>
              </Badge>
              <Badge color={current.color} style={{ gap: '6px' }}>
                <ShieldCheck size={12} />
                <span>Verified Contributor</span>
              </Badge>
            </div>
          </div>

          {/* Highlights List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
            {current.highlights.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span
                  style={{
                    color: 'var(--accent-blue)',
                    marginTop: '3px',
                    fontSize: '0.9rem',
                  }}
                >
                  ▹
                </span>
                <div style={{ fontSize: '0.98rem', lineHeight: 1.65, color: '#cbd5e1' }}>
                  <strong style={{ color: '#ffffff', fontWeight: 600 }}>{item.title}: </strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-glass)',
            }}
          >
            {current.tech.map((skill, sIdx) => (
              <Badge key={sIdx} color="default">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default React.memo(ExperienceComponent);
