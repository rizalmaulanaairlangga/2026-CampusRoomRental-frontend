// src/utils/apiError.ts
import axios from 'axios';

export interface ApiError {
  status?: number;
  message: string;
  fields?: Record<string, string[]>;
  raw?: unknown;
}

interface BackendErrorPayload {
  message?: string;
  errors?: Record<string, string[]>;
  fieldErrors?: Record<string, string[]>;
}

export function normalizeAxiosError(err: unknown): ApiError {
  if (!err) {
    return { message: 'Unknown error' };
  }

  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;

    if (isBackendErrorPayload(data)) {
      return {
        status,
        message: data.message ?? err.message ?? 'Request failed',
        fields: data.errors ?? data.fieldErrors,
        raw: data,
      };
    }

    return {
      status,
      message: err.message || 'Network error',
      raw: data,
    };
  }

  return { message: safeString(err) };
}

/* ---------------- helpers ---------------- */

function isBackendErrorPayload(data: unknown): data is BackendErrorPayload {
  return typeof data === 'object' && data !== null;
}

function safeString(value: unknown): string {
  try {
    return String(value);
  } catch {
    return 'An unknown error occurred';
  }
}
