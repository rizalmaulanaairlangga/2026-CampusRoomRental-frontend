// src/hooks/useRooms.ts
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../api/rooms';
import type { Room } from '../types/api';

export const ROOMS_QUERY_KEY = ['rooms'] as const;

export function useRooms() {
  return useQuery<Room[]>({
    queryKey: ROOMS_QUERY_KEY,
    queryFn: getRooms,
    staleTime: 1000 * 60 * 1, // 1 minute
    retry: 1,
  });
}
