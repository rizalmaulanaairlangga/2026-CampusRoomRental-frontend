import { useRooms } from "../../hooks/useRooms";
import { useBookings } from "../../hooks/useBookings";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { data: rooms } = useRooms();
  const { data: bookings } = useBookings();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
      <div className="grid gap-3 mb-6">
        {bookings?.slice(0, 3).map((b) => (
          <div key={b.id} className="bg-white p-4 rounded shadow">
            {b.room?.name} — {b.status}
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-2">Rooms</h2>
      <div className="grid gap-3">
        {rooms?.map((room) => (
          <Link
            key={room.id}
            to={`/rooms/${room.id}`}
            className="bg-white p-4 rounded shadow hover:bg-gray-50"
          >
            {room.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
