import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "../api/bookings";
import type { BookingStatus } from "../types/api";
import { BOOKINGS_QUERY_KEY } from "./useBookings";

interface UpdateStatusPayload {
  id: string;
  status: BookingStatus;
}

export function useUpdateBookingStatus() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateStatusPayload) =>
      updateBookingStatus(id, status),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BOOKINGS_QUERY_KEY });
    },
  });
}
