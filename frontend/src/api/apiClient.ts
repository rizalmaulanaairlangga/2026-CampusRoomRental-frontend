// src/api/apiClient.ts
import axios from "axios";
import type { AxiosInstance } from "axios";
import { normalizeAxiosError } from "../utils/apiError";
import type { ApiError } from "../utils/apiError";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || '';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // You can set withCredentials if backend requires cookies:
  // withCredentials: true,
});

// Response: return data directly
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    const normalized: ApiError = normalizeAxiosError(error);
    return Promise.reject(normalized);
  }
);

// Optional: request interceptor to add auth header later
apiClient.interceptors.request.use((config) => {
  // const token = getAuthToken();
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
