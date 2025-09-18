import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface NavigateProps {
  to: string;
  children?: React.ReactNode;
  variant?: 'solid' | 'outline';
}

function Navigate({ to, children, variant = 'solid' }: NavigateProps) {
  const baseClasses = 'w-full sm:w-auto text-base px-6 py-3 rounded-lg focus:outline-none focus-visible:ring-4 font-WorkSans';

  const className = cn(
    baseClasses,
    variant === 'solid'
      ? 'btn btn-primary bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md shadow-primary-600/20 focus-visible:ring-primary-400/40'
      : 'border border-[color:var(--color-border)] text-[color:var(--color-text)] bg-transparent hover:bg-primary-500/5 dark:hover:bg-primary-400/10 focus-visible:ring-[color:var(--ring-color)]'
  );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default Navigate;
