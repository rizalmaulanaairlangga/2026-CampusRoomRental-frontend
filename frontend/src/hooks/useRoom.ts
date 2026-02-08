// src/hooks/useRoom.ts
import { useQuery } from '@tanstack/react-query';
import { getRoom } from '../api/rooms';
import type { Room } from '../types/api';

export function useRoom(id?: string) {
  return useQuery<Room>({
    queryKey: ['room', id],
    queryFn: () => getRoom(id!),
    enabled: !!id,
  });
}
