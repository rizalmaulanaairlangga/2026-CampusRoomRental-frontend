import type { Booking } from '../types/api';
import { formatDateTime } from '../utils/formatDate';
import StatusBadge from '../components/StatusBadge';

type Props = {
  booking: Booking;
  onClose: () => void;
  onCancel: () => void;
};

export default function BookingDetail({ booking, onClose, onCancel }: Props) {
  return (
    <div role="dialog" aria-modal="true" style={{ border: '1px solid #ccc', padding: 16 }}>
      <h2>Booking Detail</h2>
      <p><strong>Room:</strong> {booking.roomId}</p>
      <p><strong>Start:</strong> {formatDateTime(booking.startTime)}</p>
      <p><strong>End:</strong> {formatDateTime(booking.endTime)}</p>
      <p><strong>Status:</strong> <StatusBadge status={booking.status} /></p>

      {booking.status === 'booked' && (
        <button onClick={onCancel}>Cancel Booking</button>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
