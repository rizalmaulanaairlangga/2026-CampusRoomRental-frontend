// src/api/bookings.ts
import apiClient from "./apiClient";
import type {
  Booking,
  BookingCreateDTO,
  BookingStatus,
} from "../types/api";

const RESOURCE = "/bookings";

export const getBookings = async (): Promise<Booking[]> => {
  return apiClient.get(RESOURCE);
};

export const getBooking = async (id: string): Promise<Booking> => {
  return apiClient.get(`${RESOURCE}/${id}`);
};

export const createBooking = async (
  payload: BookingCreateDTO
): Promise<Booking> => {
  return apiClient.post(RESOURCE, payload);
};

export interface BookingUpdateDTO {
  id: string;
  roomId: string;
  startTime: string;
  endTime: string;
}

export const updateBooking = async (
  payload: BookingUpdateDTO
): Promise<Booking> => {
  return apiClient.put(
    `/bookings/${payload.id}/reschedule`,
    {
      roomId: payload.roomId,
      startTime: payload.startTime,
      endTime: payload.endTime,
    }
  );
};


export const updateBookingStatus = async (
  id: string,
  status: BookingStatus
): Promise<void> => {
  return apiClient.put(`${RESOURCE}/${id}/status`, {
    status,
  });
};

export const cancelBooking = async (id: string): Promise<void> => {
  return apiClient.delete(`${RESOURCE}/${id}`);
};
