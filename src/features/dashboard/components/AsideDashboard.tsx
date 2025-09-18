"use client";
import { motion } from "framer-motion";
import {
  Building2,
  FolderKanban,
  Home,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import Button from "../../../components/common/Button";
import ThemeSwitch from "../../../components/common/ThemeSwitch";
import { useAuthStore } from "../../../store/auth/authStore";

function AsideDashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const logout = useAuthStore(state => state.logout)
  const menuItems = [
    { name: "Inicio", icon: <Home size={20} />, href: "/dashboard" },
    { name: "Projects", icon: <FolderKanban size={20} />, href: "#" },
    { name: "Organizaciones", icon: <Building2 size={20} />, href: "/dashboard/organizations" },
    { name: "Perfil", icon: <User size={20} />, href: "#" },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-surface shadow-md border-r border-[var(--color-border)] flex flex-col font-WorkSans"
    >
      {/* Header con botón */}
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <h1 className="text-xl font-bold text-text tracking-wide">
            Saberium
          </h1>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú */}
      <nav className="flex-1 px-2 mt-4 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 p-3 rounded-xl text-text hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)] transition-all"
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </a>
        ))}
      </nav>
      <ThemeSwitch></ThemeSwitch>
      <Button onClick={() => logout()}>Cerrar session</Button>
    </motion.aside>
  );
}

export default AsideDashboard;
