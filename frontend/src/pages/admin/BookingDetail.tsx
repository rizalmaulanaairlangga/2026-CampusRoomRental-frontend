import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../../hooks/useBooking";
import { useUpdateBookingStatus } from "../../hooks/useUpdateBookingStatus";
import toast from "react-hot-toast";
import type { BookingStatus } from "../../types/api";

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: booking, isLoading } = useBooking(id);
  const updateStatus = useUpdateBookingStatus();

  const handleUpdate = async (status: BookingStatus) => {
    if (!id) return;

    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Booking ${status}`);
      navigate("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-gray-500">
        Loading booking detail...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-red-500">
        Booking not found.
      </div>
    );
  }

  const start = new Date(booking.startTime);
  const end = new Date(booking.endTime);

  const date = start.toLocaleDateString();
  const time = `${start.getHours()}:00 - ${end.getHours()}:00`;
  const duration = `${end.getHours() - start.getHours()} hour(s)`;

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-gray-200 text-gray-700",
  }[booking.status];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Booking Detail
      </h1>

      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 space-y-6">

        {/* STATUS BADGE */}
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 text-sm rounded-full ${statusColor}`}>
            {booking.status.toUpperCase()}
          </span>

          <span className="text-sm text-gray-400">
            Created at: {new Date(booking.createdAt).toLocaleString()}
          </span>
        </div>

        {/* ROOM INFO */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Room Information
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><strong>Name:</strong> {booking.room?.name}</p>
            <p><strong>Capacity:</strong> {booking.room?.capacity}</p>
          </div>
        </div>

        {/* USER INFO */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Requested By
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><strong>Name:</strong> {booking.user?.name}</p>
            <p><strong>Email:</strong> {booking.user?.email}</p>
          </div>
        </div>

        {/* TIME INFO */}
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Booking Schedule
          </h2>
          <div className="space-y-1 text-gray-700">
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Duration:</strong> {duration}</p>
          </div>
        </div>

        {/* ACTIONS */}
        {booking.status === "pending" && (
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={() => handleUpdate("approved")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-medium cursor-pointer"
            >
              Approve
            </button>

            <button
              onClick={() => handleUpdate("rejected")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition font-medium cursor-pointer"
            >
              Reject
            </button>
          </div>
        )}

        {booking.status !== "pending" && (
          <div className="text-sm text-gray-500 pt-4 border-t">
            This booking has already been processed.
          </div>
        )}
      </div>
    </div>
  );
}
