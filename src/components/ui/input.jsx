import React from 'react';

export const Input = React.forwardRef(({ className = '', type = 'text', error, style = {}, ...props }, ref) => {
  return (
    <input
      type={type}
      style={{
        background: 'rgba(10, 13, 22, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: error ? '1px solid rgba(239, 68, 68, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
        color: '#f8fafc',
        borderRadius: '10px',
        padding: '11px 14px',
        fontSize: '16px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease',
        ...style,
      }}
      className={`frosted-form-input ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export const Textarea = React.forwardRef(({ className = '', error, style = {}, ...props }, ref) => {
  return (
    <textarea
      style={{
        background: 'rgba(10, 13, 22, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: error ? '1px solid rgba(239, 68, 68, 0.8)' : '1px solid rgba(255, 255, 255, 0.1)',
        color: '#f8fafc',
        borderRadius: '10px',
        padding: '12px 14px',
        fontSize: '16px',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        lineHeight: 1.6,
        transition: 'all 0.2s ease',
        ...style,
      }}
      className={`frosted-form-input ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export const Label = ({ className = '', children, ...props }) => {
  return (
    <label
      style={{
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#94a3b8',
        marginBottom: '0.45rem',
      }}
      className={className}
      {...props}
    >
      {children}
    </label>
  );
};

export const Badge = ({ className = '', variant = 'default', color = 'default', children, style = {}, ...props }) => {
  const colorStyles = {
    default: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      color: '#cbd5e1',
    },
    blue: {
      background: 'rgba(56, 189, 248, 0.1)',
      borderColor: 'rgba(56, 189, 248, 0.28)',
      color: '#38bdf8',
    },
    indigo: {
      background: 'rgba(99, 102, 241, 0.12)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      color: '#818cf8',
    },
    violet: {
      background: 'rgba(168, 85, 247, 0.1)',
      borderColor: 'rgba(168, 85, 247, 0.28)',
      color: '#c084fc',
    },
    emerald: {
      background: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.28)',
      color: '#34d399',
    },
    amber: {
      background: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.28)',
      color: '#fbbf24',
    },
  };

  const selected = colorStyles[color] || colorStyles.default;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '8px',
        border: '1px solid',
        padding: '3px 9px',
        fontSize: '0.74rem',
        fontFamily: 'var(--font-mono)',
        fontWeight: 500,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease',
        ...selected,
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </span>
  );
};
