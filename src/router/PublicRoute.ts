// Componente para rutas públicas (no requieren autenticación)

export default function PublicRoute({ children }: { children: React.ReactNode }) {
  return children;
}