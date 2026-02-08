// src/hooks/useCancelBooking.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelBooking } from '../api/bookings';
import { BOOKINGS_QUERY_KEY } from './useBookings';
import type { ApiError } from '../utils/apiError';

export function useCancelBooking() {
  const qc = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => cancelBooking(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
  });
}
