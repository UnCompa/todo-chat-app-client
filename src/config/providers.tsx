import React, { createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth/authStore"
import type { User } from "../types/auth"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  // Evitar traer todo el store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const user = useAuthStore((state) => state.user)
  console.log(isAuthenticated, user)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    } else {
      console.log("User is authenticated:", user)
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}