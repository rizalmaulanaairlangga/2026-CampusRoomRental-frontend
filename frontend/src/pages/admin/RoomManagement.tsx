import {
  useRooms,
  useCreateRoom,
  useDeleteRoom,
} from "../../hooks/useRooms";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Room } from "../../types/api";

export default function RoomManagement() {
  const { data: rooms } = useRooms();
  const createRoom = useCreateRoom();
  const deleteRoom = useDeleteRoom();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleCreate = async () => {
    if (!name || !capacity) {
      toast.error("All fields required");
      return;
    }

    try {
      await createRoom.mutateAsync({
        name,
        capacity: Number(capacity),
      });

      toast.success("Room created");
      setName("");
      setCapacity("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to create room");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom.mutateAsync(id);
      toast.success("Room deleted");
    } catch {
        toast.error("Failed to delete room");
    }

  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Room Management
      </h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          type="text"
          placeholder="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="border p-2 mr-2"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Room
        </button>
      </div>

      <div className="space-y-3">
        {rooms?.map((room: Room) => (
          <div
            key={room.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <span>
              {room.name} (Capacity: {room.capacity})
            </span>

            <button
              onClick={() => handleDelete(room.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
