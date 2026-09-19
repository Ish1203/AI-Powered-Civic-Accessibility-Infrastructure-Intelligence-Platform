import apiClient from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CITIZEN" | "AUTHORITY" | "ADMIN";
  phone?: string;
  avatar?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authApi = {
  async login(payload: LoginPayload) {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      payload
    );

    return response.data;
  },

  async register(payload: RegisterPayload) {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      payload
    );

    return response.data;
  },

  async me() {
    const response = await apiClient.get<User>("/auth/me");

    return response.data;
  },

  async logout() {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }
  },
};