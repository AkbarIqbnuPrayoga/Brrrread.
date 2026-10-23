import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'butter' | 'caramel' | 'espresso' | 'sage' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'butter',
  className = '',
}) => {
  const variantStyles = {
    butter: 'bg-butter text-espresso font-semibold',
    caramel: 'bg-caramel text-cream-50 font-medium',
    espresso: 'bg-espresso text-butter font-medium',
    sage: 'bg-sage/30 text-bread-dark font-medium border border-sage/40',
    outline: 'border border-bread/30 text-bread font-medium bg-cream-50/60',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
