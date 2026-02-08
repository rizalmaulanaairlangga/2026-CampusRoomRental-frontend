// src/hooks/useBooking.ts
import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../api/bookings';
import type { Booking } from '../types/api';

export function useBooking(id?: string) {
  return useQuery<Booking>({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id!),
    enabled: !!id,
  });
}
