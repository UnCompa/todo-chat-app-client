import { createContext, useContext } from "react"

// Context para controlar el aside desde cualquier lugar
export const AsideContext = createContext({
  isAsideOpen: false,
  setIsAsideOpen: (open: boolean) => { },
  isMobile: false
})


export const useAside = () => {
  const context = useContext(AsideContext)
  if (!context) {
    throw new Error('useAside must be used within DashboardLayout')
  }
  return context
}
