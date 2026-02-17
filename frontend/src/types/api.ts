// src/types/api.ts
export type ISODateString = string;

export interface Room {
  id: string;
  name: string;
  capacity: number;
  status: "active" | "inactive";
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt?: ISODateString | null;
}


export interface RoomCreateDTO {
  name: string;
  capacity: number;
  status: "active" | "inactive";
}


export interface RoomUpdateDTO {
  name?: string;
  capacity?: number;
  status?: 'active' | 'inactive';
}

export type BookingStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

export interface Booking {
  id: string;
  roomId: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;

  room?: {
    id: number;
    name: string;
    capacity?: number;
    status?: "active" | "inactive";
  };

  user?: {
    id: string; 
    name: string;
    email?: string;
    role?: string;
  };
}


export interface BookingCreateDTO {
  roomId: string;
  startTime: ISODateString;
  endTime: ISODateString;
}

export interface BookingUser {
  id: string;
  name: string;
  email: string;
}

export interface BookingRoom {
  id: string;
  name: string;
  capacity: number;
}

