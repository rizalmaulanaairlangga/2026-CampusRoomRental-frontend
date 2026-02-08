// src/pages/RoomsListExample.tsx
import { useRooms } from '../hooks/useRooms';
import { useNavigate } from 'react-router-dom';

export default function RoomsListExample() {
  const { data: rooms, isLoading, error } = useRooms();
  const nav = useNavigate();

  if (isLoading) return <div>Loading rooms...</div>;
  if (error) return <div>Error loading rooms</div>;

  return (
    <div>
      <h1>Rooms</h1>
      <ul>
        {rooms?.map(r => (
          <li key={r.id}>
            <strong>{r.name}</strong> — capacity: {r.capacity ?? '-'}
            <button onClick={() => nav(`/bookings/new?roomId=${r.id}`)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
