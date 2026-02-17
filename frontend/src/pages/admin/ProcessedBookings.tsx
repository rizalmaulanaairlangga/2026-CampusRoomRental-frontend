import { useBookings } from "../../hooks/useBookings";
import type { Booking } from "../../types/api";

export default function ProcessedBookings() {
  const { data: bookings } = useBookings();

  const processed = bookings?.filter(
    (b: Booking) => b.status !== "pending"
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Processed Bookings
      </h1>

      <div className="space-y-3">
        {processed?.map((b: Booking) => (
          <div
            key={b.id}
            className="bg-white p-4 rounded shadow"
          >
            <p className="font-semibold">
              Room ID: {b.roomId}
            </p>
            <p className="text-sm text-gray-500">
              Status: {b.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
