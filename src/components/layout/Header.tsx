import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import Navigate from '../common/Navigate'
import ThemeSwitch from '../common/ThemeSwitch'

interface HeaderProps {
  variant?: 'fixed' | 'relative'
}

function Header({ variant = 'fixed' }: HeaderProps) {
  // Clase base responsive
  const headerBaseClass = "flex items-center justify-between w-full z-50 px-4 sm:px-6 lg:px-8 py-3 border-b border-[color:var(--color-border)]/50"

  // Clases específicas por variante
  const variantClasses = variant === 'fixed'
    ? 'fixed top-0 backdrop-blur-md bg-[color:var(--color-surface)]/80 supports-[backdrop-filter]:bg-[color:var(--color-surface)]/60'
    : 'relative bg-[color:var(--color-surface)]'

  const headerClass = cn(headerBaseClass, variantClasses)

  return (
    <header className={headerClass}>
      {/* Logo/Título responsive */}
      <Link
        to={"/"}
      >
        <h1 className="text-lg sm:text-xl font-semibold text-[color:var(--color-text)] truncate">
          Saberium
        </h1>
      </Link>

      {/* Navigation responsive */}
      <div className="flex items-center gap-2 sm:gap-3 font-WorkSans">
        {/* En móviles, botones más pequeños */}
        <Navigate
          to="/login"
          variant='outline'
        >
          <span className="hidden sm:inline">Iniciar sesión</span>
          <span className="sm:hidden">Login</span>
        </Navigate>

        <Navigate
          to="/register"
        >
          <span className="hidden sm:inline">Empezar</span>
          <span className="sm:hidden">Sign up</span>
        </Navigate>

        <ThemeSwitch />
      </div>
    </header>
  )
}

export default Header