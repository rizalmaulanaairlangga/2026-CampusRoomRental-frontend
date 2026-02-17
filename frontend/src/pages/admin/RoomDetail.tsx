import { useParams, useNavigate } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import { useUpdateRoom } from "../../hooks/useUpdateRoom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: room, isLoading } = useRoom(id);
  const updateRoom = useUpdateRoom();

  // hanya menyimpan perubahan
  const [form, setForm] = useState<{
    name?: string;
    capacity?: string;
    status?: "active" | "inactive";
  }>({});

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!room) return null;

  const handleChange = (
    field: "name" | "capacity" | "status",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!id) return;

    try {
      await updateRoom.mutateAsync({
        id,
        name: form.name ?? room.name,
        capacity: Number(form.capacity ?? room.capacity),
        status: form.status ?? room.status,
      });

      toast.success("Room updated");
      navigate("/admin/rooms");
    } catch {
      toast.error("Failed to update room");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Room</h1>

      <div className="space-y-4 bg-white p-6 rounded-xl shadow border">
        <input
          type="text"
          value={form.name ?? room.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />

        <input
          type="number"
          value={form.capacity ?? String(room.capacity)}
          onChange={(e) =>
            handleChange("capacity", e.target.value)
          }
          className="border rounded-lg px-3 py-2 w-full"
        />

        <select
          value={form.status ?? room.status}
          onChange={(e) =>
            handleChange(
              "status",
              e.target.value as "active" | "inactive"
            )
          }
          className="border rounded-lg px-3 py-2 w-full"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
