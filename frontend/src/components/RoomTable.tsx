// src/components/RoomTable.tsx
import type { Room } from '../types/api';

type Props = {
  rooms: Room[];
  onSelect: (roomId: string) => void;
};

export default function RoomTable({ rooms, onSelect }: Props) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table aria-label="Rooms table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Capacity</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Status</th>
            <th style={{ textAlign: 'left', padding: 8 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id}>
              <td style={{ padding: 8 }}>{r.name}</td>
              <td style={{ padding: 8 }}>{r.capacity ?? '-'}</td>
              <td style={{ padding: 8 }}>
                <span aria-hidden>
                  {r.status === 'active' ? 'Active' : 'Inactive'}
                </span>
                <span className="sr-only">{r.status}</span>
              </td>
              <td style={{ padding: 8 }}>
                <button
                  aria-label={`Book ${r.name}`}
                  onClick={() => onSelect(r.id)}
                  disabled={r.status !== 'active'}
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
