import { useState } from 'react';
import { useBookings } from '../hooks/useBookings';
import { useCancelBooking } from '../hooks/useCancelBooking';
import BookingTable from '../components/BookingTable';
import BookingDetail from './BookingDetail';
import type { Booking } from '../types/api';

export default function BookingsList() {
  const { data: bookings, isLoading, error } = useBookings();
  const cancelBooking = useCancelBooking();

  const [selected, setSelected] = useState<Booking | null>(null);

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const handleCancel = (id: string) => {
    cancelBooking.mutate(id, {
      onSuccess: () => setSelected(null),
    });
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Bookings</h1>

      {bookings && bookings.length === 0 && <p>No bookings found.</p>}

      {bookings && bookings.length > 0 && (
        <BookingTable
          bookings={bookings}
          onView={(id) => setSelected(bookings.find(b => b.id === id) || null)}
          onCancel={handleCancel}
        />
      )}

      {selected && (
        <BookingDetail
          booking={selected}
          onClose={() => setSelected(null)}
          onCancel={() => handleCancel(selected.id)}
        />
      )}
    </main>
  );
}
