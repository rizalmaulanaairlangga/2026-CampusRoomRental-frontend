import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getRooms,
  createRoom,
  deleteRoom,
} from "../api/rooms";

import type { Room } from "../types/api";

export const ROOMS_QUERY_KEY = ["rooms"] as const;

// ========================
// GET ROOMS
// ========================
export function useRooms() {
  return useQuery<Room[]>({
    queryKey: ROOMS_QUERY_KEY,
    queryFn: getRooms,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
}

// ========================
// CREATE ROOM
// ========================
export function useCreateRoom() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
}

// ========================
// DELETE ROOM
// ========================
export function useDeleteRoom() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ROOMS_QUERY_KEY });
    },
  });
}
