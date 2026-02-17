import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../../hooks/useBooking";
import { useUpdateBookingStatus } from "../../hooks/useUpdateBookingStatus";
import toast from "react-hot-toast";
import type { BookingStatus } from "../../types/api";

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: booking } = useBooking(id);
  const updateStatus = useUpdateBookingStatus();

  const handleUpdate = async (status: BookingStatus) => {
    if (!id) return;

    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success("Status updated");
      navigate("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (!booking) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Booking Detail</h1>

      <div className="bg-white p-6 rounded shadow space-y-3">
        <p>
          <strong>Room ID:</strong> {booking.roomId}
        </p>

        <p>
          <strong>Status:</strong> {booking.status}
        </p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleUpdate("approved")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Approve
          </button>

          <button
            onClick={() => handleUpdate("rejected")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
