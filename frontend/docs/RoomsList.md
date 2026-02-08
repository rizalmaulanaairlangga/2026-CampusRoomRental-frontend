<!-- BEGIN: RoomsList Docs -->
## Rooms List Page (Developer docs)

Path: `/rooms`

Function:
- Fetches rooms using `useRooms()`.
- Displays table with columns Name, Capacity, Status, Action.
- Search box filters rooms client-side by name.
- "Book" button navigates to `/bookings/new?roomId={id}` to prefill booking form.

Files:
- `src/pages/RoomsList.tsx` (page)
- `src/components/RoomTable.tsx` (table)
- `src/pages/BookingForm.tsx` (expects optional `roomId` query param)

Acceptance criteria:
1. Page shows seeded rooms from backend.
2. Loading indicator while fetching.
3. Selecting a room navigates to booking form with `roomId`.
<!-- END: RoomsList Docs -->
