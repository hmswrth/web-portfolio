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
export default Input;

// Re-exports for modular shadcn architecture & backwards compatibility
export { Textarea } from './textarea';
export type { TextareaProps } from './textarea';

export { Label } from './label';
export type { LabelProps } from './label';

export { Badge } from './badge';
export type { BadgeProps, BadgeColor, BadgeVariant } from './badge';
