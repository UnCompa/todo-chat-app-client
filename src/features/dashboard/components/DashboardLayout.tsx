import type React from "react"
import AsideDashboard from "./AsideDashboard"

function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex gap-4 bg-bg">
      <AsideDashboard />
      <main className="min-h-dvh bg-bg rounded-lg m-2 w-full shadow-2xl p-4">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout