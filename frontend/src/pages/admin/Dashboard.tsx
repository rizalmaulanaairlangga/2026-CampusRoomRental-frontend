import { useBookings } from "../../hooks/useBookings";
import { useNavigate } from "react-router-dom";
import type { Booking } from "../../types/api";

export default function AdminDashboard() {
  const { data: bookings, isLoading } = useBookings();
  const navigate = useNavigate();

  const pendingBookings =
    bookings?.filter((b: Booking) => b.status === "pending") || [];

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Pending Bookings</h1>
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pending Booking Requests</h1>

      {pendingBookings.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No pending booking requests.
        </div>
      ) : (
        <div className="grid gap-4">
          {pendingBookings.map((b: Booking) => {
            const start = new Date(b.startTime);
            const end = new Date(b.endTime);

            const date = start.toLocaleDateString();
            const time = `${start.getHours()}:00 - ${end.getHours()}:00`;

            return (
              <div
                key={b.id}
                onClick={() => navigate(`/admin/bookings/${b.id}`)}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition cursor-pointer border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-lg">
                    {b.room?.name || `Room ID: ${b.roomId}`}
                  </p>
                  <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  Requested by: {b.user?.name || "Unknown User"}
                </p>

                <p className="text-sm text-gray-600">
                  Date: {date}
                </p>

                <p className="text-sm text-gray-600">
                  Time: {time}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
