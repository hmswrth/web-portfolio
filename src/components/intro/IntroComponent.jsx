import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/button';
import { Badge } from '../ui/input';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

const METRICS = [
  {
    value: '3,000+',
    label: 'Instruments Batch Capacity',
    sub: 'Nasdaq Fund Network (NFN)',
    colorClass: 'blue',
  },
  {
    value: '300%',
    label: 'Throughput Optimization',
    sub: 'Batch upload processing speedup',
    colorClass: 'emerald',
  },
  {
    value: 'FastMCP',
    label: 'AI & LLM Tool Server',
    sub: 'RAG discovery & parameterization',
    colorClass: 'violet',
  },
  {
    value: '5+ Yrs',
    label: 'Distributed Systems',
    sub: 'Enterprise financial engineering',
    colorClass: 'indigo',
  },
];

const IntroComponent = ({ onNavigate }) => {
  return (
    <section id="intro" style={{ paddingTop: '1rem' }}>
      {/* Telemetry Status Line - Updated to Specialist SWE */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
        }}
      >
        <Badge
          color="blue"
          style={{
            gap: '8px',
            padding: '5px 12px',
            fontSize: '0.78rem',
            background: 'rgba(56, 189, 248, 0.08)',
            borderColor: 'rgba(56, 189, 248, 0.25)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#38bdf8',
              boxShadow: '0 0 10px #38bdf8',
              display: 'inline-block',
            }}
          />
          <span style={{ color: '#ffffff', fontWeight: 600 }}>Specialist Software Engineer · Nasdaq</span>
        </Badge>

        <Badge
          color="emerald"
          style={{
            gap: '6px',
            padding: '5px 12px',
            fontSize: '0.78rem',
            background: 'rgba(16, 185, 129, 0.08)',
            borderColor: 'rgba(16, 185, 129, 0.25)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'inline-block',
            }}
          />
          <span>Active Systems: Nasdaq Fund Network (NFN)</span>
        </Badge>
      </motion.div>

      {/* Main Title with Frosted Specular Gradient */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.9rem, 5.2vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 40%, #93c5fd 85%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Architecting High-Throughput Financial Systems &amp; AI Infrastructure.
        </h1>
      </motion.div>

      {/* Bio Description - NEF completely removed as requested */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          lineHeight: 1.7,
          color: '#cbd5e1',
          maxWidth: '820px',
          marginBottom: '2.5rem',
        }}
      >
        Specialized in high-performance distributed systems at <strong style={{ color: '#ffffff', fontWeight: 600 }}>Nasdaq, Inc.</strong>,
        re-engineering the Nasdaq Fund Network (NFN) to support 3x capacity growth, architecting centralized batch pricing engines,
        building worker services that power Nasdaq Data Link, and pioneering Model Context Protocol (FastMCP) AI retrieval servers.
      </motion.p>

      {/* CTAs with Pixel-Perfect Frosted Glass Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
        className="hero-actions-group"
      >
        <Button variant="default" size="lg" onClick={() => onNavigate('architecture')}>
          <span>View Architecture</span>
          <ArrowRight size={17} style={{ marginLeft: 8 }} />
        </Button>

        <Button variant="outline" size="lg" onClick={() => onNavigate('experience')}>
          <ShieldCheck size={17} style={{ marginRight: 8, color: '#38bdf8' }} />
          <span>Career Experience</span>
        </Button>

        <Button variant="secondary" size="lg" onClick={() => onNavigate('contact')}>
          <Zap size={17} style={{ marginRight: 8, color: '#818cf8' }} />
          <span>Get in Touch</span>
        </Button>
      </motion.div>

      {/* Vibrant Frosted Stat Strip */}
      <motion.div
        className="stat-strip-frosted"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
      >
        {METRICS.map((item, idx) => (
          <div key={idx} className={`stat-cell-frosted ${item.colorClass}`}>
            <div className={`stat-value ${item.colorClass}`}>{item.value}</div>
            <div style={{ color: '#f8fafc', fontSize: '0.92rem', fontWeight: 600, marginTop: 4 }}>
              {item.label}
            </div>
            <div className="stat-desc">{item.sub}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default React.memo(IntroComponent);
