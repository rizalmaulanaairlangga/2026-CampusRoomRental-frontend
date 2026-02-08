// src/hooks/useBookings.ts
import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../api/bookings';
import type { Booking } from '../types/api';

export const BOOKINGS_QUERY_KEY = ['bookings'] as const;

export function useBookings() {
  return useQuery<Booking[]>({
    queryKey: BOOKINGS_QUERY_KEY,
    queryFn: getBookings,
    staleTime: 1000 * 30,
  });
}
