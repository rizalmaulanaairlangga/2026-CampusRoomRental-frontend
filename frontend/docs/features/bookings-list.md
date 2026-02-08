# Bookings List & Detail

## Overview
Displays all bookings and allows users to view details and cancel a booking.

## Route
`/bookings`

## Data Sources
- GET `/api/bookings`
- DELETE `/api/bookings/{id}`

## Behavior
- Lists all bookings in a table
- Shows human-friendly start/end times
- Displays status badges (booked/cancelled)
- Detail view shows full booking info
- Cancel action invalidates bookings query

## Files
- `src/pages/BookingsList.tsx`
- `src/pages/BookingDetail.tsx`
- `src/components/BookingTable.tsx`
- `src/components/StatusBadge.tsx`
- `src/utils/formatDate.ts`
