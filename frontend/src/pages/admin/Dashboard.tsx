import { useBookings } from "../../hooks/useBookings";
import { useNavigate } from "react-router-dom";
import type { Booking } from "../../types/api";

export default function AdminDashboard() {
  const { data: bookings } = useBookings();
  const navigate = useNavigate();

  const pending = bookings?.filter(
    (b) => b.status === "pending"
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Bookings</h1>

      <div className="grid gap-3">
        {pending?.map((b: Booking) => (
          <div
            key={b.id}
            onClick={() => navigate(`/admin/bookings/${b.id}`)}
            className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
          >
            <p className="font-semibold">
              Room ID: {b.roomId}
            </p>
            <p className="text-sm">
              Status: {b.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
