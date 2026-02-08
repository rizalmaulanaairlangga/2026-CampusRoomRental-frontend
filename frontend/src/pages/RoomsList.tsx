// src/pages/RoomsList.tsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRooms } from '../hooks/useRooms';
import RoomTable from '../components/RoomTable';
import type { Room } from '../types/api';

export default function RoomsList() {
  const { data: rooms, isLoading, isFetching, error } = useRooms();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // simple client-side filter by name (case-insensitive)
  const filtered = useMemo(() => {
    if (!rooms) return [] as Room[];
    const q = query.trim().toLowerCase();
    if (!q) return rooms;
    return rooms.filter((r) => r.name.toLowerCase().includes(q));
  }, [rooms, query]);

  const handleSelect = (roomId: string) => {
    // navigate to booking creation, prefill via query param
    navigate(`/bookings/new?roomId=${encodeURIComponent(roomId)}`);
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Rooms</h1>

      <div style={{ margin: '12px 0', display: 'flex', gap: 8, alignItems: 'center' }}>
        <label htmlFor="room-search" style={{ display: 'none' }}>Search rooms</label>
        <input
          id="room-search"
          type="search"
          placeholder="Search by room name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search rooms by name"
        />
        <div aria-live="polite" style={{ marginLeft: 8 }}>
          {isFetching ? 'Refreshing...' : ''}
        </div>
      </div>

      {isLoading && (
        <div role="status" aria-busy="true">
          Loading rooms...
        </div>
      )}

      {error && (
        <div role="alert" style={{ color: 'red' }}>
          Error loading rooms.
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div>
          <p>No rooms found{query ? ` for "${query}"` : ''}.</p>
        </div>
      )}

      {!isLoading && filtered.length > 0 && (
        <section aria-label="Rooms list">
          <RoomTable rooms={filtered} onSelect={handleSelect} />
        </section>
      )}

      {/* Pagination placeholder */}
      <footer style={{ marginTop: 16 }}>
        <small>Pagination: (placeholder) — implement server-side pagination later</small>
      </footer>
    </main>
  );
}
