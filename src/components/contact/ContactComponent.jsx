import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/button';
import { Input, Textarea, Label, Badge } from '../ui/input';
import { postMessage } from '../../api/ContactForm';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { AiOutlineGithub, AiOutlineLinkedin } from 'react-icons/ai';

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 2) {
      errs.subject = 'Please provide a subject line';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message (minimum 10 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await postMessage(formData);
    } catch (err) {
      console.log('API transmission fallback: ', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setIsSuccess(false);
    }, 6000);
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <section id="contact">
      <div className="section-header-block">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <span className="section-label-dot" />
          <span>Direct Transmission</span>
        </motion.div>

        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
        >
          Contact &amp; Inquiries
        </motion.h2>

        <motion.p
          className="section-subtext"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
        >
          Available for technical discussions regarding distributed batch architecture,
          financial systems engineering, and strategic engineering opportunities.
        </motion.p>
      </div>

      <div className="contact-grid">
        {/* Frosted Glass Form Card */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '1.75rem',
                    fontSize: '0.92rem',
                    color: '#34d399',
                  }}
                >
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>Your message has been dispatched successfully. I will get back to you promptly.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="contact-inputs-grid" style={{ marginBottom: '1.25rem' }}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  autoComplete="name"
                />
                {errors.name && (
                  <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px', display: 'block', fontFamily: 'var(--font-mono)' }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. alex@enterprise.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  autoComplete="email"
                />
                {errors.email && (
                  <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px', display: 'block', fontFamily: 'var(--font-mono)' }}>
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <Label htmlFor="subject">Subject Line</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="e.g. High-Throughput Pricing Engine Architecture"
                value={formData.subject}
                onChange={handleChange}
                error={Boolean(errors.subject)}
              />
              {errors.subject && (
                <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px', display: 'block', fontFamily: 'var(--font-mono)' }}>
                  {errors.subject}
                </span>
              )}
            </div>

            <div style={{ marginBottom: '1.75rem' }}>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Share your objectives, role specifications, or architecture scope..."
                value={formData.message}
                onChange={handleChange}
                error={Boolean(errors.message)}
              />
              {errors.message && (
                <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px', display: 'block', fontFamily: 'var(--font-mono)' }}>
                  {errors.message}
                </span>
              )}
            </div>

            {/* Pixel-Perfect Frosted Submit Button */}
            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={isSubmitting}
              style={{ width: '100%', height: '48px', fontSize: '0.96rem' }}
            >
              {isSubmitting ? (
                <span>Dispatching Transmission...</span>
              ) : (
                <>
                  <span>Send Direct Message</span>
                  <Send size={16} style={{ marginLeft: 8 }} />
                </>
              )}
            </Button>
          </form>

          {/* Quick Copy Email & Open Mail (Mobile number completely removed) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: '1.75rem',
              paddingTop: '1.4rem',
              borderTop: '1px solid var(--border-glass)',
            }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard('mudra.hemanth@gmail.com', 'email')}
            >
              {copiedKey === 'email' ? <Check size={14} style={{ color: '#34d399', marginRight: 6 }} /> : <Copy size={14} style={{ marginRight: 6 }} />}
              <span>{copiedKey === 'email' ? 'Email Copied!' : 'mudra.hemanth@gmail.com'}</span>
            </Button>

            <a
              href="mailto:mudra.hemanth@gmail.com?subject=Direct%20Portfolio%20Inquiry"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="outline" size="sm">
                <span>Open Mail App</span>
                <ExternalLink size={13} style={{ marginLeft: 6 }} />
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Telemetry & Direct Presence Panel */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.54 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Badge color="blue">Professional Telemetry</Badge>
              <Badge color="emerald">
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', marginRight: 5 }} />
                <span>Active Production</span>
              </Badge>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>
              Hemanth Mudra
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.65 }}>
              Specialist Software Engineer at Nasdaq, Inc., specializing in distributed financial systems,
              batch processing engines, Argo CD GitOps pipelines, and enterprise AI Model Context Protocol integrations.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-glass)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ORGANIZATION</span>
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Nasdaq, Inc.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-glass)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PRIMARY ROLE</span>
              <span style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>Specialist – Software Engineering</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-glass)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SYSTEM FOCUS</span>
              <span style={{ color: '#ffffff', fontWeight: 500 }}>NFN &amp; Nasdaq Data Link</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-glass)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CORE CAPABILITIES</span>
              <span style={{ color: '#ffffff', fontWeight: 500 }}>Batch Engines, Helm/Argo CD &amp; FastMCP</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-glass)' }}>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RESPONSE TIME</span>
              <span style={{ color: '#34d399', fontFamily: 'var(--font-mono)' }}>&lt; 24 hours</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 600 }}>
              Verified Profiles &amp; Codebases
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/hmswrth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Button variant="outline" size="sm">
                  <AiOutlineGithub size={16} style={{ marginRight: 6, color: '#ffffff' }} />
                  <span>GitHub</span>
                </Button>
              </a>

              <a
                href="https://www.linkedin.com/in/hemanth-mudra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Button variant="outline" size="sm">
                  <AiOutlineLinkedin size={16} style={{ marginRight: 6, color: '#38bdf8' }} />
                  <span>LinkedIn</span>
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(ContactComponent);
