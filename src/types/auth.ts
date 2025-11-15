// types/auth.ts
export interface User {
  id: string;
  name: string;
  email?: string;
  emailVerified: boolean;
  image?: string
  activeOrganizationId?: string | null | undefined;
  createdAt: Date,
  updatedAt: Date
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}