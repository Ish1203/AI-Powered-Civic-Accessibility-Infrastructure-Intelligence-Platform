export type UserRole =
  | "CITIZEN"
  | "AUTHORITY"
  | "ADMIN";

export interface User {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  city?: string;
  state?: string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role?: UserRole;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}