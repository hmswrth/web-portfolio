import React from 'react';
import './button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, style = {}, ...props }, ref) => {
    const classNames = `btn-frosted btn-${variant} btn-size-${size} ${className}`;

    return (
      <button ref={ref} className={classNames} style={style} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
