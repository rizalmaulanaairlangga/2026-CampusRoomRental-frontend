import { useBookings } from "../../hooks/useBookings";
import { useCancelBooking } from "../../hooks/useCancelBooking";
import toast from "react-hot-toast";

export default function BookingHistory() {
  const { data: bookings } = useBookings();
  const cancelBooking = useCancelBooking();

  const handleCancel = async (id: string) => {
    try {
      await cancelBooking.mutateAsync(id);
      toast.success("Booking cancelled");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Booking History
      </h1>

      <div className="space-y-3">
        {bookings?.map((b) => (
          <div
            key={b.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <div>
              <p className="font-semibold">
                Room ID: {b.roomId}
              </p>
              <p className="text-sm text-gray-500">
                {b.status}
              </p>
            </div>

            {(b.status === "pending" ||
              b.status === "approved") && (
              <button
                onClick={() => handleCancel(b.id)}
                className="text-red-500"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
