import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'solid', size = 'md', loading = false, className, disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus-visible:ring-4 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      solid: 'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/20 focus-visible:ring-primary-400/40 disabled:hover:bg-primary-600',
      outline: 'border border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-400/40 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent'
    };

    const sizeClasses = {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4'
    };

    const buttonClassName = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;