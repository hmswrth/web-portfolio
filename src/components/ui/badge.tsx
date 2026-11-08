import React from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';
export type BadgeColor = 'default' | 'blue' | 'indigo' | 'violet' | 'emerald' | 'amber';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor | string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'default',
  color = 'default',
  children,
  style = {},
  ...props
}) => {
  const colorClass = color !== 'default' ? `frosted-badge-${color}` : `badge-${variant}`;
  return (
    <span
      className={`frosted-badge ${colorClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
export default Badge;
