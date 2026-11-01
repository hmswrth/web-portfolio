import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/input';
import { Code2, Server, Cloud, BrainCircuit, GraduationCap } from 'lucide-react';

const STACK_GROUPS = [
  {
    category: 'Backend & High-Throughput Engines',
    description: 'Mission-critical pricing pipelines, batch processors, and inter-service streams.',
    icon: Server,
    badgeColor: 'emerald',
    skills: [
      'Nasdaq Data Link',
      'Worker Services',
      'High-Throughput Financial Pricing',
      'Batch Processing Engines',
      'Node.js',
      '.NET Core',
      'FastMCP (Python)',
      'Python',
      'REST APIs',
      'JSON-RPC',
      'Distributed Systems',
      'Microservices',
    ],
  },
  {
    category: 'DevOps, Cloud & GitOps',
    description: 'Automated Argo CD pipelines, enterprise Helm charts, and container infrastructure.',
    icon: Cloud,
    badgeColor: 'indigo',
    skills: [
      'Helm Charts',
      'Argo CD (GitOps)',
      'Kubernetes (K8s)',
      'Google Cloud Platform (GCP)',
      'Amazon Web Services (AWS)',
      'Docker & Swarm',
      'PostgreSQL',
      'MongoDB',
      'Elasticsearch (ELK Stack)',
      'Jenkins CI/CD',
      'Linux / Bash',
    ],
  },
  {
    category: 'Frontend & UI Architecture',
    description: 'Component architecture, state management, and firm-wide design systems.',
    icon: Code2,
    badgeColor: 'blue',
    skills: [
      'React 18',
      'TypeScript',
      'Nasdaq Experience Framework (NEF)',
      'Next.js',
      'Redux Toolkit',
      'Progressive Web Apps (PWA)',
      'Material-UI',
      'Core Web Vitals Optimization',
      'Lerna Monorepos',
      'Micro-Frontends',
    ],
  },
  {
    category: 'AI, LLMs & Machine Learning',
    description: 'Context protocol servers, RAG pipelines, and computer vision models.',
    icon: BrainCircuit,
    badgeColor: 'violet',
    skills: [
      'Model Context Protocol (FastMCP)',
      'LLM Tool Calling & Agents',
      'Retrieval-Augmented Generation (RAG)',
      'OpenCV2 Image Processing',
      'Retinal Fundus ML Classifiers',
      'Ensemble Learning',
      'Automated Test Pipelines',
      'Git Version Control',
    ],
  },
];

const SkillsComponent = () => {
  return (
    <section id="stack">
      <div className="section-header-block">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="section-label-dot" />
          <span>Technical Arsenal</span>
        </motion.div>

        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
        >
          Capabilities &amp; Stack
        </motion.h2>

        <motion.p
          className="section-subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
        >
          Enterprise tools, languages, DevOps infrastructure, and distributed runtime environments
          utilized across financial exchanges and scaled platforms.
        </motion.p>
      </div>

      <div className="skills-grid">
        {STACK_GROUPS.map((group, idx) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.38 + idx * 0.1 }}
              className="glass-card"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.85rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-blue)',
                  }}
                >
                  <Icon size={19} />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {group.category}
                  </h3>
                </div>
              </div>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: '1.5rem',
                }}
              >
                {group.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {group.skills.map((skill, sIdx) => (
                  <Badge key={sIdx} color="default">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Academic Foundation Note */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        style={{
          marginTop: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
              flexShrink: 0,
            }}
          >
            <GraduationCap size={22} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '4px', fontWeight: 600 }}>
              Academic Foundation
            </div>
            <div style={{ fontSize: '1.08rem', fontWeight: 700, color: '#ffffff' }}>
              Bachelor of Technology in Bioinformatics
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              SIST · Jun 2016 – May 2020
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '440px', fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.65 }}>
          Transitioned from computational biological data into low-latency financial systems,
          distributed pricing engines, and enterprise AI tooling.
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(SkillsComponent);
