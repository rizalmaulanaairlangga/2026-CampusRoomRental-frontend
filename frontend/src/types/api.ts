// src/types/api.ts
export type ISODateString = string;

export interface Room {
  id: string;
  name: string;
  capacity?: number;
  status?: 'active' | 'inactive';
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  deletedAt?: ISODateString | null;
}

export interface RoomCreateDTO {
  name: string;
  capacity?: number;
}

export interface RoomUpdateDTO {
  name?: string;
  capacity?: number;
  status?: 'active' | 'inactive';
}

export interface Booking {
  id: string;
  roomId: string;
  startTime: ISODateString;
  endTime: ISODateString;
  status: 'booked' | 'cancelled';
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  deletedAt?: ISODateString | null;
}

export interface BookingCreateDTO {
  roomId: string;
  startTime: ISODateString;
  endTime: ISODateString;
}
