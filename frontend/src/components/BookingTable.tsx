import type { Booking } from '../types/api';
import { formatDateTime } from '../utils/formatDate';
import StatusBadge from './StatusBadge';

type Props = {
  bookings: Booking[];
  onView: (id: string) => void;
  onCancel: (id: string) => void;
};

export default function BookingTable({ bookings, onView, onCancel }: Props) {
  return (
    <table aria-label="Bookings table" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Room</th>
          <th>Start</th>
          <th>End</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(b => (
          <tr key={b.id}>
            <td>{b.roomId}</td>
            <td>{formatDateTime(b.startTime)}</td>
            <td>{formatDateTime(b.endTime)}</td>
            <td><StatusBadge status={b.status} /></td>
            <td>
              <button onClick={() => onView(b.id)}>View</button>{' '}
              {b.status === 'booked' && (
                <button onClick={() => onCancel(b.id)}>Cancel</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
