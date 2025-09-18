// stores/useAuthStore.ts
import { create } from "zustand";
import logger from "zustand-logger-middleware";
import { devtools } from "zustand/middleware";
import { authService } from "../../services/auth/authService";
import type { LoginCredentials, RegisterCredentials, User } from "../../types/auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  init: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<{ success: true } | { success: false; error: unknown }>;
  signUp: (credentials: RegisterCredentials) => Promise<{ success: true } | { success: false; error: unknown }>;
  logout: () => Promise<void>;
  setUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    logger((set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      init: async () => {
        try {
          set({ isLoading: true }, false, "auth/init:start");
          const user: User | null = await authService.me();
          set({ user, isAuthenticated: !!user, isLoading: false }, false, "auth/init:success");
        } catch (err) {
          set(
            {
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: (err as Error).message || "An error occurred",
            },
            false,
            "auth/init:error"
          );
        }
      },

      signUp: async (credentials: RegisterCredentials) => {
        try {
          set({ isLoading: true, error: null }, false, "auth/signup:start");
          await authService.signup(credentials);
          const user = await authService.me();
          set({ user, isAuthenticated: true, isLoading: false }, false, "auth/signup:success");
          return { success: true };
        } catch (err: unknown) {
          set(
            {
              error: (err as Error).message || "Error al registrarse",
              isLoading: false,
            },
            false,
            "auth/signup:error"
          );
          return { success: false, error: err };
        }
      },

      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true, error: null }, false, "auth/login:start");
          await authService.login(credentials);
          const user = await authService.me();
          set({ user, isAuthenticated: true, isLoading: false }, false, "auth/login:success");
          return { success: true };
        } catch (err: unknown) {
          set(
            {
              error: (err as Error).message || "Error al iniciar sesión",
              isLoading: false,
            },
            false,
            "auth/login:error"
          );
          return { success: false, error: err };
        }
      },
      setUser: (user: Partial<User> | null) => {
        set((state) => ({
          user: user === null ? null : { ...(state.user as User), ...user }
        }));
      },
      
      logout: async () => {
        try {
          localStorage.clear()
          await authService.logout();
        } finally {
          set({ user: null, isAuthenticated: false }, false, "auth/logout");
        }
      },
    }))
  )
);
