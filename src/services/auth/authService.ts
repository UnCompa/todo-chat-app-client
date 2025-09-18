// src/services/authService.ts

import { authClient } from "../../lib/authClient";

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const { data, error } = await authClient.signIn.email({
      email: credentials.email,
      password: credentials.password,
      // Opcional: callbackURL, rememberMe, etc
    });
    if (error) {
      throw error;
    }
    return data.user ?? data;
    // Better Auth devuelve algo como { user: {...} } o directamente user dependiendo de configuración
  },

  signup: async (data: { email: string; password: string; name?: string }) => {
    const result = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name ?? '',
    });
    if (result.error) {
      throw result.error;
    }
    return result.data?.user ?? result.data;
  },

  logout: async () => {
    const { error } = await authClient.signOut();
    // El método puede variar, lo correcto es chequear la doc si es `signOut()` o `signOut.someMethod`
    if (error) {
      throw error;
    }
    return true;
  },

  me: async () => {
    const { data, error } = await authClient.getSession();
    if (error) {
      throw error;
    }
    // data podría tener una propiedad user
    return data?.user ?? null;
  },
};
