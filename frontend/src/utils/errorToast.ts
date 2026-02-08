// src/utils/errorToast.ts
import toast from 'react-hot-toast';
import type { ApiError } from './apiError';

export function showApiErrorToast(err: ApiError) {
  if (!err) return;
  if (err.status === 409) {
    toast.error(err.message || 'Conflict: time slot unavailable.');
    return;
  }
  toast.error(err.message || 'Something went wrong');
}
