// src/hooks/useCreateBooking.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '../api/bookings';
import type { BookingCreateDTO, Booking } from '../types/api';
import { BOOKINGS_QUERY_KEY } from './useBookings';
import type { ApiError } from '../utils/apiError';

export function useCreateBooking() {
  const qc = useQueryClient();

  return useMutation<Booking, ApiError, BookingCreateDTO>({
    mutationFn: (payload: BookingCreateDTO) => createBooking(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
  });
}
