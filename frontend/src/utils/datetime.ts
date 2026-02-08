// local datetime-local string → UTC ISO (untuk dikirim ke backend)
export function localToUtcISOString(local: string): string {
  return new Date(local).toISOString();
}

// UTC ISO → local display string (untuk UI)
export function utcToLocalDisplay(utcIso: string): string {
  return new Date(utcIso).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

