import { AnimatePresence, motion } from "framer-motion";
import { Building2, FolderKanban, Home, Menu, User, X } from "lucide-react";
import { useEffect } from "react";
import ThemeSwitch from "../../../components/common/ThemeSwitch";
import useAsideStore from "../../../store/dashboard/useAsideStore";

function AsideDashboard() {
  const { isOpen, toggleAside, isMobile } = useAsideStore();

  const menuItems = [
    { name: "Inicio", icon: <Home size={20} />, href: "/dashboard" },
    { name: "Proyectos", icon: <FolderKanban size={20} />, href: "#" },
    { name: "Organizaciones", icon: <Building2 size={20} />, href: "/dashboard/organizations" },
    { name: "Perfil", icon: <User size={20} />, href: "#" },
  ];

  // Manejo de clic fuera y tecla Escape para cerrar en móvil
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobile && isOpen && !target.closest("aside") && !target.closest("button[aria-label='Abrir menú']")) {
        toggleAside();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (isMobile && isOpen && event.key === "Escape") {
        toggleAside();
      }
    };

    if (isMobile && isOpen) {
      // Pequeño delay para evitar que el clic que abre el menú también lo cierre
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isMobile, isOpen, toggleAside]);

  return (
    <>
      {/* Overlay para móvil */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 md:hidden"
            onClick={toggleAside}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? (isOpen ? 260 : 0) : isOpen ? 260 : 80,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          ${isMobile ? 'fixed' : 'sticky'} top-0 h-screen bg-surface shadow-md 
          border-r border-[var(--color-border)] flex flex-col font-WorkSans 
          overflow-hidden z-50
          ${isMobile && !isOpen ? 'pointer-events-none' : ''}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 min-h-[60px]">
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold text-text tracking-wide"
              >
                Saberium
              </motion.h1>
            )}
          </AnimatePresence>

          {isMobile && isOpen && (
            <button
              onClick={toggleAside}
              className="p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Menú */}
        <nav className="flex-1 px-2 mt-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl text-text hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] transition-all"
              onClick={() => isMobile && toggleAside()}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
            <ThemeSwitch />
            {!isMobile && (
              <button
                onClick={toggleAside}
                className="p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition"
                aria-label={isOpen ? "Contraer menú" : "Expandir menú"}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

export default AsideDashboard;