import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'caramel';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-espresso text-cream-50 hover:bg-bread shadow-warm focus-visible:ring-bread',
    secondary: 'bg-butter text-espresso hover:bg-butter-hover shadow-sm focus-visible:ring-butter-dark font-semibold',
    caramel: 'bg-caramel text-cream-50 hover:bg-caramel-dark shadow-warm focus-visible:ring-caramel',
    outline: 'border border-espresso/30 text-espresso hover:border-espresso hover:bg-espresso/5 focus-visible:ring-espresso',
    ghost: 'text-espresso hover:bg-espresso/10 focus-visible:ring-espresso',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
