// stores/useAuthStore.ts
import { create } from "zustand";
import { authService } from "../../services/auth/authService";
import type { LoginCredentials, User } from "../../types/auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  init: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<{ success: true } | { success: false; error: unknown }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  init: async () => {
    try {
      set({ isLoading: true });
      const user = await authService.me();
      set({ user, isAuthenticated: user ? true : false, isLoading: false });
    } catch (err) {
      set({ user: null, isAuthenticated: false, isLoading: false, error: (err as Error).message || "An error occurred" });
    }
  },

  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      await authService.login(credentials);
      const user = await authService.me();
      set({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (err: unknown) {
      set({
        error: (err as Error).message || "Error al iniciar sesión",
        isLoading: false,
      });
      return { success: false, error: err };
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
