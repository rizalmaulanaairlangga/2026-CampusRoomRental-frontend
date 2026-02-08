type Props = { status: 'booked' | 'cancelled' };

export default function StatusBadge({ status }: Props) {
  const styles =
    status === 'booked'
      ? { background: '#e6f4ea', color: '#137333' }
      : { background: '#fce8e6', color: '#a50e0e' };

  return (
    <span style={{ padding: '2px 8px', borderRadius: 8, ...styles }}>
      {status}
    </span>
  );
}
