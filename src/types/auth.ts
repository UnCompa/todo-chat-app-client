// types/auth.ts
export interface User {
  id: string;
  name: string;
  email: string;

}

export interface LoginCredentials {
  email: string;
  password: string;
}
