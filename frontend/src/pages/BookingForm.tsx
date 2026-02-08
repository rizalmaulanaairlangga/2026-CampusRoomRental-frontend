// src/pages/BookingForm.tsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function BookingForm() {
  const [search] = useSearchParams();
  const prefillRoomId = search.get('roomId') || '';

  return (
    <main style={{ padding: 16 }}>
      <h1>Create Booking</h1>
      <p>Prefilled roomId: <strong>{prefillRoomId || '-'}</strong></p>

      {/* TODO: actual booking form using useCreateBooking */}
    </main>
  );
}
