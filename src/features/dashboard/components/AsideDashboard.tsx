import { motion } from "framer-motion";
import {
  Building2,
  FolderKanban,
  Home,
  Menu,
  User,
  X,
} from "lucide-react";
import { useEffect } from "react";
import Button from "../../../components/common/Button";
import ThemeSwitch from "../../../components/common/ThemeSwitch";
import { useAuthStore } from "../../../store/auth/authStore";
import { useAside } from "../hooks/useAside";

function AsideDashboard() {
  const { isAsideOpen: isOpen, setIsAsideOpen: setIsOpen, isMobile } = useAside();
  const logout = useAuthStore(state => state.logout);

  const menuItems = [
    { name: "Inicio", icon: <Home size={20} />, href: "/dashboard" },
    { name: "Projects", icon: <FolderKanban size={20} />, href: "#" },
    { name: "Organizaciones", icon: <Building2 size={20} />, href: "/dashboard/organizations" },
    { name: "Perfil", icon: <User size={20} />, href: "#" },
  ];

  // Cerrar aside al hacer click fuera (solo en móvil)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && !event.target.closest('aside')) {
        setIsOpen(false);
      }
    };

    if (isMobile && isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobile, isOpen, setIsOpen]);

  return (
    <>
      {/* Overlay para móvil */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        animate={{
          width: isMobile
            ? (isOpen ? 240 : 0)
            : (isOpen ? 240 : 80),
          x: isMobile && !isOpen ? -240 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          ${isMobile ? 'fixed' : 'relative'} 
          ${isMobile ? 'z-50' : 'z-auto'}
          h-screen bg-surface shadow-md border-r border-[var(--color-border)] 
          flex flex-col font-WorkSans overflow-hidden
        `}
      >
        {/* Header con botón */}
        <div className="flex items-center justify-between p-4 min-h-[60px]">
          {(isOpen || !isMobile) && (
            <motion.h1
              animate={{ opacity: isOpen ? 1 : 0 }}
              className="text-xl font-bold text-text tracking-wide"
            >
              Saberium
            </motion.h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition flex-shrink-0"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menú */}
        <nav className="flex-1 px-2 mt-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl text-text hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] transition-all"
              onClick={() => isMobile && setIsOpen(false)} // Cerrar en móvil al navegar
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {(isOpen || !isMobile) && (
                <motion.span
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  className="whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
              )}
            </a>
          ))}
        </nav>

        {/* Footer con theme switch y botón logout */}
        <div className="p-4 space-y-2 border-t border-[var(--color-border)]">
          <div className={`flex ${isOpen ? 'justify-center' : 'justify-center'}`}>
            <ThemeSwitch />
          </div>
          {(isOpen || !isMobile) && (
            <motion.div
              animate={{ opacity: isOpen ? 1 : 0 }}
              className="w-full"
            >
              <Button
                onClick={() => logout()}
                className="w-full text-sm"
              >
                Cerrar sesión
              </Button>
            </motion.div>
          )}
        </div>
      </motion.aside>
    </>
  );
}

export default AsideDashboard;