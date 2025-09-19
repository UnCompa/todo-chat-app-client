import { Menu } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import AsideDashboard from "./AsideDashboard"
import { AsideContext } from "../hooks/useAside"


function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isAsideOpen, setIsAsideOpen] = useState(false)

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setIsAsideOpen(true) // Abrir automáticamente en desktop
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <AsideContext.Provider value={{ isAsideOpen, setIsAsideOpen, isMobile }}>
      <div className={`
        ${isMobile ? 'block' : 'flex'} 
        ${isMobile ? '' : 'gap-4'} 
        bg-bg w-full min-h-dvh h-full overflow-x-hidden relative
      `}>
        <AsideDashboard />

        {/* Botón flotante para móvil */}
        {isMobile && !isAsideOpen && (
          <button
            onClick={() => setIsAsideOpen(true)}
            className="fixed top-4 left-4 z-30 p-3 bg-surface shadow-lg rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-neutral-100)] transition-all"
          >
            <Menu size={20} className="text-text" />
          </button>
        )}

        <main className={`
          h-full bg-surface rounded-lg shadow-2xl p-4 overflow-x-auto
          ${isMobile
            ? 'w-full m-1 min-h-[calc(100vh-0.5rem)]'
            : 'w-full max-w-[100vw] m-1'
          }
        `}>
          {children}
        </main>
      </div>
    </AsideContext.Provider>
  )
}

// Hook para usar el context
export default DashboardLayout