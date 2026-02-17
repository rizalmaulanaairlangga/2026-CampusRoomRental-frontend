import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateBooking,
  type BookingUpdateDTO,
} from "../api/bookings";
import type { Booking } from "../types/api";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation<Booking, Error, BookingUpdateDTO>({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}
