import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "../api/rooms";
import type { Room } from "../types/api";

export function useUpdateRoom() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: { id: string } & Partial<Room>) =>
      updateRoom(id, payload),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
}
