import React from 'react';
import './button.css';

export const Button = React.forwardRef(
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
