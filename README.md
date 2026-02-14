# Frontend – Room Booking System

## Overview

This frontend application provides a user interface for a room booking system. Users can view available rooms, create bookings, view booking history, and cancel existing bookings.

The frontend communicates with the backend API via HTTP and uses React Query for data fetching, caching, and state management.

---

## Requirements

* Node.js ≥ 18
* Backend API running (see backend repository)

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5205/api
```

Restart the development server after modifying environment variables.

---

## Run the Application

```bash
npm install
npm run dev
```

Open the application in the browser:

```
http://localhost:5173
```

---

## Available Routes

| Route           | Description              |
| --------------- | ------------------------ |
| `/rooms`        | View available rooms     |
| `/bookings/new` | Create a new booking     |
| `/bookings`     | View and cancel bookings |

---

## Booking Flow (End-to-End)

1. Open `/rooms`
2. Select a room and click **Book**
3. Fill in start and end time
4. Submit the booking
5. View the booking in `/bookings`
6. Cancel the booking if needed

---

## Time Handling

* Users input date and time in their local timezone
* Frontend converts local time to UTC ISO format
* Backend stores and validates all timestamps in UTC

### Example Payload

```json
{
  "roomId": "abc123",
  "startTime": "2026-02-10T02:00:00Z",
  "endTime": "2026-02-10T03:00:00Z"
}
```

---

## Error Handling

| Status Code | Frontend Behavior                       |
| ----------- | --------------------------------------- |
| 400         | Field-level validation errors           |
| 409         | Conflict toast (overlapping booking)    |
| 404         | Generic not found message               |
| 500         | Generic error message with retry option |

---

## Developer Notes & Troubleshooting

### CORS Error

Ensure the backend allows requests from:

```
http://localhost:5173
```

---

## API Reference

The backend API is documented via Swagger:

```
http://localhost:5205/swagger
```

---

## Debugging API Calls

Use browser DevTools → **Network** tab to inspect API requests and responses.

---

## Documentation

Detailed feature documentation is available under `/docs`:

* `docs/features/rooms-list.md`
* `docs/features/booking-form.md`
* `docs/features/bookings-list.md`
* `docs/features/error-handling.md`

---

## Version

Frontend Release: **v0.1.0-frontend**
