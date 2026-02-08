import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRooms } from '../hooks/useRooms';
import { useCreateBooking } from '../hooks/useCreateBooking';
import { localToUtcISOString } from '../utils/datetime';
import type { ApiError } from '../utils/apiError';

export default function BookingForm() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const prefilledRoomId = params.get('roomId') ?? '';

  const { data: rooms } = useRooms();
  const createBooking = useCreateBooking();

  const [roomId, setRoomId] = useState(prefilledRoomId);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!roomId) {
      setFormError('Please select a room.');
      return;
    }

    if (!start || !end) {
      setFormError('Start and end time are required.');
      return;
    }

    if (new Date(end) <= new Date(start)) {
      setFormError('End time must be after start time.');
      return;
    }

    createBooking.mutate(
      {
        roomId,
        startTime: localToUtcISOString(start),
        endTime: localToUtcISOString(end),
      },
      {
        onSuccess: () => {
          navigate('/bookings');
        },
        onError: (err: ApiError) => {
          if (err.status === 409) {
            setFormError('This room is already booked for the selected time.');
          } else {
            setFormError(err.message || 'Failed to create booking.');
          }
        },
      }
    );
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Create Booking</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Room</label>
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="">-- Select Room --</option>
            {rooms?.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Start Time (local)</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        <div>
          <label>End Time (local)</label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        {formError && (
          <div style={{ color: 'red', marginTop: 8 }}>
            {formError}
          </div>
        )}

        <button type="submit" disabled={createBooking.isPending}>
          {createBooking.isPending ? 'Submitting...' : 'Create Booking'}
        </button>
      </form>
    </main>
  );
}
