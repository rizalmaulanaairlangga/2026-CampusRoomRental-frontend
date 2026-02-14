import type { ApiError } from '../utils/apiError';
import { useToast } from '../hooks/useToast';

type SetFieldError = (field: string, msg: string) => void;

export function useApiError() {
  const toast = useToast();

  const handleError = (
    err: ApiError | unknown,
    setFieldError?: SetFieldError
  ) => {
    if (!err) return;

    // Narrow ke ApiError
    const apiError = err as ApiError;

    if (apiError.status === 400 && apiError.fields && setFieldError) {
      Object.entries(apiError.fields).forEach(([field, messages]) => {
        setFieldError(field, messages[0]);
      });
      return;
    }

    if (apiError.status === 409) {
      toast.show(apiError.message || 'Conflict occurred.');
      return;
    }

    toast.show(apiError.message || 'Unexpected error. Please try again.');
  };

  return { handleError };
}
