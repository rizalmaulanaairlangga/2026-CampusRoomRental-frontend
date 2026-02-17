import { useBookings } from "../../hooks/useBookings";
import { useCancelBooking } from "../../hooks/useCancelBooking";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { Booking } from "../../types/api";

export default function BookingHistory() {
  const { data: bookings = [], isLoading } = useBookings();
  const cancelBooking = useCancelBooking();
  const navigate = useNavigate();

  const handleCancel = async (
    e: React.MouseEvent,
    id: string
  ) => {
    e.stopPropagation(); // prevent card click

    try {
      await cancelBooking.mutateAsync(id);
      toast.success("Booking cancelled");
    } catch {
        toast.error("Failed to delete room");
        }

  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">
        Booking History
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border text-gray-500">
          No booking history found.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b: Booking) => {
            const start = new Date(b.startTime);
            const end = new Date(b.endTime);

            const date =
              start.toLocaleDateString();
            const time = `${start.getHours()}:00 - ${end.getHours()}:00`;

            return (
              <div
                key={b.id}
                onClick={() =>
                  navigate(`/booking/${b.id}`)
                }
                className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-lg hover:border-blue-200 transition cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg group-hover:text-blue-600 transition">
                      {b.room?.name || "Unknown Room"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {date}
                    </p>

                    <p className="text-sm text-gray-500">
                      {time}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                      b.status
                    )}`}
                  >
                    {b.status.toUpperCase()}
                  </span>
                </div>

                {(b.status === "pending" ||
                  b.status === "approved") && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={(e) =>
                        handleCancel(e, b.id)
                      }
                      className="text-red-500 text-sm hover:underline"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
