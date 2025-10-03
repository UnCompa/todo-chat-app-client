import { Menu } from "lucide-react";
import { useEffect } from "react";
import useAsideStore from "../../../store/dashboard/useAsideStore";
import AsideDashboard from "./AsideDashboard";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isMobile, setMobile, isOpen, setIsOpen, toggleAside } = useAsideStore();

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      const wasMobile = isMobile;

      setMobile(mobile);

      // Si cambiamos de móvil a desktop, abrir el aside
      if (wasMobile && !mobile && !isOpen) {
        setIsOpen(true);
      }

      // Si cambiamos de desktop a móvil, cerrar el aside
      if (!wasMobile && mobile && isOpen) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobile, isOpen, setMobile, setIsOpen]);

  return (
    <div
      className={`
        flex min-h-screen bg-bg w-full overflow-x-hidden
        ${isMobile ? "flex-col" : "gap-4"}
      `}
    >
      <AsideDashboard />

      {/* Botón flotante para móvil */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleAside}
          className="fixed top-4 right-4 z-50 p-3 bg-surface shadow-lg rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-primary-100)] transition-all"
          aria-label="Abrir menú"
        >
          <Menu size={24} className="text-text" />
        </button>
      )}

      <main
        className={`
          flex-1 bg-surface rounded-lg shadow-2xl p-4 overflow-x-auto
          ${isMobile ? "m-1 min-h-[calc(100vh-0.5rem)]" : "m-1"}
        `}
      >
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;