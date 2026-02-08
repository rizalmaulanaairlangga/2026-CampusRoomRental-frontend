# Rooms List Page

## Overview
Displays available rooms fetched from the backend API and allows users to select a room for booking.

## Route
`/rooms`

## Data Source
- GET `/api/rooms`
- Hook: `useRooms()`

## Behavior
- Shows loading state while fetching
- Displays rooms in a table
- Client-side search by room name
- Disabled booking action for inactive rooms
- Book button navigates to `/bookings/new?roomId={id}`

## Files
- `src/pages/RoomsList.tsx`
- `src/components/RoomTable.tsx`

## Acceptance Criteria
- Seeded rooms visible when backend is running
- Loading and empty states handled
- Selecting a room pre-fills booking form
