// src/api/auth.ts

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export async function login(payload: LoginRequest) {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}

export async function getMe(token: string) {
  const { data } = await api.get<AuthUser>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
