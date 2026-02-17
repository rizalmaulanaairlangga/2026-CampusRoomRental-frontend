// src/api/apiClient.ts

import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { normalizeAxiosError } from "../utils/apiError";
import type { ApiError } from "../utils/apiError";

const BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string) || "";

const TOKEN_KEY = "auth_token";

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// REQUEST INTERCEPTOR
// =========================
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const status = error.response?.status;

    // 401 → logout
    if (status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }

    // 403 → forbidden
    if (status === 403) {
      alert("Unauthorized action");
    }

    const normalized: ApiError = normalizeAxiosError(error);
    return Promise.reject(normalized);
  }
);

export default apiClient;
