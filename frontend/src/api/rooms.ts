// src/api/rooms.ts
import apiClient from './apiClient';
import type { Room, RoomCreateDTO, RoomUpdateDTO } from '../types/api';

const RESOURCE = '/rooms';

export const getRooms = async (): Promise<Room[]> => {
  return apiClient.get(RESOURCE);
};

export const getRoom = async (id: string): Promise<Room> => {
  return apiClient.get(`${RESOURCE}/${id}`);
};

export const createRoom = async (payload: RoomCreateDTO): Promise<Room> => {
  return apiClient.post(RESOURCE, payload);
};

export const updateRoom = async (id: string, payload: RoomUpdateDTO): Promise<Room> => {
  return apiClient.put(`${RESOURCE}/${id}`, payload);
};

export const deleteRoom = async (id: string): Promise<void> => {
  return apiClient.delete(`${RESOURCE}/${id}`);
};
