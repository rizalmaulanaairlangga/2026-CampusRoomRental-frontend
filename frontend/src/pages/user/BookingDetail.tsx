import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../../hooks/useBooking";
import { useBookings } from "../../hooks/useBookings";
import { useUpdateBooking } from "../../hooks/useUpdateBooking";
import toast from "react-hot-toast";
import { useState } from "react";

const slots = [
  { start: 7, end: 8 },
  { start: 8, end: 9 },
  { start: 9, end: 10 },
];

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: booking, isLoading } = useBooking(id);
  const { data: bookings = [] } = useBookings();
  const updateBooking = useUpdateBooking();

// ===============================
// STATE
// ===============================
const start = booking
  ? new Date(booking.startTime)
  : null;

const [date, setDate] = useState<string>(() =>
  start
    ? start.toISOString().split("T")[0]
    : ""
);

const [selectedSlot, setSelectedSlot] =
  useState<number | null>(() =>
    start
      ? slots.findIndex(
          (s) => s.start === start.getHours()
        )
      : null
  );





  // ===============================
  // SLOT CHECK
  // ===============================
  const getSlotStatus = (slotIndex: number) => {
    if (!date || !booking) return null;

    const slot = slots[slotIndex];

    const match = bookings.find((b) => {
      if (b.id === booking.id) return false; // ignore self

      const bookingDate = new Date(b.startTime)
        .toISOString()
        .split("T")[0];

      const startHour = new Date(
        b.startTime
      ).getHours();

      return (
        b.roomId === booking.roomId &&
        bookingDate === date &&
        startHour === slot.start &&
        (b.status === "approved" ||
          b.status === "pending")
      );
    });

    return match?.status ?? null;
  };

  // ===============================
  // SUBMIT UPDATE
  // ===============================
  const handleUpdate = async () => {
    if (!booking || selectedSlot === null)
      return;

    const status =
      getSlotStatus(selectedSlot);

    if (status === "approved") {
      return toast.error(
        "This slot is already approved"
      );
    }

    if (status === "pending") {
      return toast.error(
        "There is already a pending request for this slot"
      );
    }

    const slot = slots[selectedSlot];

    const start = new Date(date);
    start.setHours(slot.start, 0, 0);

    const end = new Date(date);
    end.setHours(slot.end, 0, 0);

    try {
      await updateBooking.mutateAsync({
        id: booking.id,
        roomId: booking.roomId,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });

      toast.success("Booking updated");
      navigate("/history");
    } catch {
      toast.error(
        "Update failed. Slot may already be booked."
      );
    }
  };

  if (isLoading)
    return <p className="p-6">Loading...</p>;
  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border p-8">

        <h1 className="text-3xl font-bold mb-6">
          Update Booking
        </h1>

        {/* ROOM INFO */}
        <div className="mb-6">
          <p className="font-semibold text-lg">
            {booking.room?.name}
          </p>
        </div>

        {/* DATE */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Select Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSelectedSlot(null);
            }}
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* SLOTS */}
        <div className="mb-8">
          <label className="block mb-3 font-medium">
            Select Time Slot
          </label>

          <div className="grid grid-cols-3 gap-4">
            {slots.map((slot, index) => {
              const status =
                getSlotStatus(index);

              const isBlocked =
                status === "approved" ||
                status === "pending";

              return (
                <button
                  key={index}
                  disabled={isBlocked}
                  onClick={() =>
                    setSelectedSlot(index)
                  }
                  className={`p-4 rounded-xl border transition text-sm font-medium
                    ${
                      isBlocked
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : selectedSlot === index
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white hover:border-blue-400 hover:shadow"
                    }
                  `}
                >
                  {`${slot.start}:00 - ${slot.end}:00`}

                  {status === "approved" && (
                    <div className="text-xs mt-1 text-red-600">
                      Approved
                    </div>
                  )}

                  {status === "pending" && (
                    <div className="text-xs mt-1 text-yellow-600">
                      Pending Request Exists
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          disabled={
            selectedSlot === null || !date
          }
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
