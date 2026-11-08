import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', error, style = {}, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{
          background: 'var(--bg-input)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: error ? '1px solid rgba(239, 68, 68, 0.8)' : '1px solid var(--border-glass)',
          color: 'var(--text-primary)',
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
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, style = {}, ...props }, ref) => {
    return (
      <textarea
        style={{
          background: 'var(--bg-input)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: error ? '1px solid rgba(239, 68, 68, 0.8)' : '1px solid var(--border-glass)',
          color: 'var(--text-primary)',
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
  }
);

Textarea.displayName = 'Textarea';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => {
  return (
    <label
      style={{
        display: 'block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.74rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--text-muted)',
        marginBottom: '0.45rem',
      }}
      className={className}
      {...props}
    >
      {children}
    </label>
  );
};

export type BadgeColor = 'default' | 'blue' | 'indigo' | 'violet' | 'emerald' | 'amber';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: string;
  color?: BadgeColor | string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  color = 'default',
  children,
  style = {},
  ...props
}) => {
  return (
    <span
      className={`frosted-badge frosted-badge-${color} ${className}`}
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
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};
