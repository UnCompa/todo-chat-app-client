// src/services/authService.ts

import { authClient } from "../../lib/authClient";
import type { User } from "../../types/auth";

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
      callbackURL: `${window.location.origin}/onboarding`
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

  me: async (): Promise<User | null> => {
    const { data, error } = await authClient.getSession();
    if (error) {
      throw error;
    }
    if (!data?.user) return null
    console.info("USER ME", data)
    const userData: User = {
      createdAt: data?.user.createdAt,
      updatedAt: data?.user.updatedAt,
      id: data?.user.id,
      name: data.user.name,
      email: data.user.email,
      emailVerified: data.user.emailVerified,
      image: data.user.image ?? '',
      activeOrganizationId: data?.session.activeOrganizationId,
    }
    return userData ?? null;
  },

  registerOrganization: async (name: string, slug: string, userId: string): Promise<string> => {
    const result = await authClient.organization.create({
      name: name,
      slug: slug,
      keepCurrentActiveOrganization: true,
      userId: userId,
    });
    if (result.error) {
      throw result.error;
    }
    return result.data.id ?? result.data.id;
  },

  inviteUser: async (email: string, organizationId: string) => {
    const result = await authClient.organization.inviteMember({
      email: email,
      role: "member", // required
      organizationId,
      resend: true,
    });
    if (result.error) {
      throw result.error;
    }
    return result.data.inviterId ?? result.data;
  },

  acceptInvitation: async (invitationId: string) => {
    const result = await authClient.organization.acceptInvitation({
      invitationId, // required
    });
    if (result.error) {
      throw result.error;
    }
    return result.data.invitation ?? result.data;
    // Implementation for accepting an invitation
  },
};

