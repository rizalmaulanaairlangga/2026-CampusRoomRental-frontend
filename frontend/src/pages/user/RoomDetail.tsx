import { useParams, useNavigate } from "react-router-dom";
import { useRoom } from "../../hooks/useRoom";
import { useCreateBooking } from "../../hooks/useCreateBooking";
import { useBookings } from "../../hooks/useBookings";
import toast from "react-hot-toast";
import { useState } from "react";

const slots = [
  { start: 7, end: 8 },
  { start: 8, end: 9 },
  { start: 9, end: 10 },
];

export default function RoomDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: room, isLoading } = useRoom(id);
  const { data: bookings = [] } = useBookings();
  const createBooking = useCreateBooking();

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [date, setDate] = useState("");

  // ===============================
  // CHECK SLOT STATUS
  // ===============================
    const getSlotStatus = (slotIndex: number) => {
    if (!date || !room) return null;

    const slot = slots[slotIndex];

    const match = bookings.find((b) => {
        const bookingDate = new Date(b.startTime)
        .toISOString()
        .split("T")[0];

        const startHour = new Date(b.startTime).getHours();

        return (
        Number(b.roomId) === Number(room.id) &&  // 🔥 FIX DI SINI
        bookingDate === date &&
        startHour === slot.start &&
        (b.status === "approved" ||
            b.status === "pending")
        );
    });

    return match?.status ?? null;
    };



  // ===============================
  // SUBMIT
  // ===============================
  const handleSubmit = async () => {
    if (!id) return toast.error("Invalid room");

    if (selectedSlot === null || !date)
      return toast.error("Select date and time");

    const status = getSlotStatus(selectedSlot);

    if (status === "approved") {
    return toast.error("This slot is already booked");
    }

    if (status === "pending") {
    return toast.error("There is already a pending request for this slot");
    }


    const slot = slots[selectedSlot];

    const start = new Date(date);
    start.setHours(slot.start, 0, 0);

    const end = new Date(date);
    end.setHours(slot.end, 0, 0);

    try {
      await createBooking.mutateAsync({
        roomId: id,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      });

      toast.success("Booking request submitted");
      navigate("/");
    } catch (err: unknown) {
        if (
            typeof err === "object" &&
            err !== null &&
            "status" in err &&
            (err as { status?: number }).status === 409
        ) {
            const message =
            "message" in err &&
            typeof (err as { message?: unknown }).message === "string"
                ? (err as { message: string }).message
                : "This slot already has a booking request";

            toast.error(message);
            return;
        }

        toast.error("Booking failed. Please try again.");
        }

  };

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!room) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border p-8">

        {/* ROOM INFO */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {room.name}
          </h1>

          <p className="text-gray-600">
            Capacity: {room.capacity}
          </p>

          <span
            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
              room.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {room.status?.toUpperCase()}
          </span>
        </div>

        {/* DATE PICKER */}
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

        {/* SLOT SELECTION */}
        <div className="mb-8">
          <label className="block mb-3 font-medium">
            Select Time Slot
          </label>

            <div className="grid grid-cols-3 gap-4">
            {slots.map((slot, index) => {
                const status = getSlotStatus(index);

                const isBlocked =
                status === "approved" ||
                status === "pending";

                return (
                <button
                    key={index}
                    disabled={isBlocked}
                    onClick={() => setSelectedSlot(index)}
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

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={
            selectedSlot === null || !date
          }
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
