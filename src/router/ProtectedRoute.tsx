// Componente para rutas protegidas (requieren autenticación)

import { Providers } from "../config/providers";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <Providers>{children}</Providers>
  )
}