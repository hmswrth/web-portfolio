import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = '', children, style = {}, ...props }, ref) => {
    return (
      <label
        ref={ref}
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginBottom: '0.45rem',
          ...style,
        }}
        className={`frosted-label ${className}`}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';
export default Label;
