import React from 'react';

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
export default Textarea;
