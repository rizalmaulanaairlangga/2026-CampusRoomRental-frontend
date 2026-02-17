import {
  useRooms,
  useCreateRoom,
  useDeleteRoom,
} from "../../hooks/useRooms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { Room } from "../../types/api";

export default function RoomManagement() {
  const { data: rooms, isLoading } = useRooms();
  const createRoom = useCreateRoom();
  const deleteRoom = useDeleteRoom();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const handleCreate = async () => {
    if (!name || !capacity) {
      toast.error("All fields required");
      return;
    }

    try {
      await createRoom.mutateAsync({
        name,
        capacity: Number(capacity),
        status,
      });

      toast.success("Room created");
      setName("");
      setCapacity("");
      setStatus("active");
    } catch {
      toast.error("Failed to create room");
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

  const getStatusStyle = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Room Management</h1>

      {/* Create Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border mb-10">
        <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "active" | "inactive")
            }
            className="border rounded-lg px-3 py-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          >
            Add Room
          </button>
        </div>
      </div>

      {/* Room List */}
      {isLoading ? (
        <p className="text-gray-500">Loading rooms...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rooms?.map((room: Room) => (
            <div
              key={room.id}
              onClick={() => navigate(`/admin/rooms/${room.id}`)}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer border border-gray-100 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-semibold group-hover:text-blue-600 transition">
                    {room.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Capacity: {room.capacity}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                    room.status
                  )}`}
                >
                  {room.status.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(room.id);
                  }}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
