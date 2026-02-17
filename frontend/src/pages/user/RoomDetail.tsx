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

  const { data: room } = useRoom(id);
  const { data: bookings } = useBookings();
  const createBooking = useCreateBooking();

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [date, setDate] = useState("");

  // ===============================
  // Check if slot already booked
  // ===============================
    const isSlotBooked = (slotIndex: number) => {
    if (!date || !bookings || !id) return false;

    const slot = slots[slotIndex];

    return bookings.some((b) => {
        const bookingDate = new Date(b.startTime)
        .toISOString()
        .split("T")[0];

        const startHour = new Date(b.startTime).getHours();

        return (
        b.roomId === id &&
        bookingDate === date &&
        startHour === slot.start &&
        b.status === "pending" || b.status === "approved" 
        );
    });
    };


  // ===============================
  // Handle Submit
  // ===============================
  const handleSubmit = async () => {
    if (!id) {
      toast.error("Invalid room ID");
      return;
    }

    if (selectedSlot === null || !date) {
      toast.error("Select date and slot");
      return;
    }

    if (isSlotBooked(selectedSlot)) {
      toast.error("This slot is already booked");
      return;
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

      toast.success("Booking created");
      navigate("/");
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
      <h1 className="text-2xl font-bold mb-4">{room?.name}</h1>

      <input
        type="date"
        className="border p-2 rounded mb-4"
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setSelectedSlot(null); // reset slot when date changes
        }}
      />

      <div className="grid grid-cols-3 gap-3 mb-4">
        {slots.map((slot, index) => {
          const booked = isSlotBooked(index);

          return (
            <button
              key={index}
              disabled={booked}
              onClick={() => setSelectedSlot(index)}
              className={`p-3 rounded border ${
                booked
                  ? "bg-gray-300 cursor-not-allowed"
                  : selectedSlot === index
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {slot.start}:00 - {slot.end}:00
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
        disabled={selectedSlot === null || !date}
      >
        Book
      </button>
    </div>
  );
}
