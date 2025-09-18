import React, { createContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth/authStore"
import type { User } from "../types/auth"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      // Si no está autenticado, lo mandamos al login
      navigate("/login", { replace: true, state: { from: location } })
    }
    // Si está autenticado, no redirigimos a ningún lado
  }, [isAuthenticated, navigate, location, isLoading])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
