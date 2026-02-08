# Booking Form

## Overview
Allows users to create a booking by selecting a room and time range.

## Route
`/bookings/new`

## Data Source
- POST `/api/bookings`
- Hook: `useCreateBooking()`

## Payload
```json
{
  "roomId": "string",
  "startTime": "ISO-8601 UTC",
  "endTime": "ISO-8601 UTC"
}
```

## Time Handling

- User inputs time in local timezone using `datetime-local`
- Frontend converts local time to UTC via `localToUtcISOString()`
- Backend receives UTC timestamps

## Validation

- Room must be selected
- Start and end time must be provided
- End time must be after start time

## Error Handling

- `409 Conflict`: room already booked
- Other errors are displayed as a generic message

## Files

- `src/pages/BookingForm.tsx`
- `src/utils/datetime.ts`
