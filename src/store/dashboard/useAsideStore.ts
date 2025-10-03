import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AsideState {
  isOpen: boolean;
  isMobile: boolean;
  toggleAside: () => void;
  setMobile: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

const useAsideStore = create<AsideState>()(
  persist(
    (set) => ({
      isOpen: true, // Abierto por defecto en desktop
      isMobile: false,
      toggleAside: () => set((state) => ({ isOpen: !state.isOpen })),
      setMobile: (value: boolean) => set({ isMobile: value }),
      setIsOpen: (value: boolean) => set({ isOpen: value }),
    }),
    {
      name: "aside-store",
      // Solo persistir isOpen para desktop
      partialize: (state) => ({ isOpen: state.isOpen })
    }
  )
);

export default useAsideStore;