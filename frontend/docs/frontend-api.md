## Frontend API & Hooks (Quickstart)

This section explains how to configure the frontend environment and how to use the provided API hooks to interact with the backend service.

---

### 1. Environment Setup

Create a `.env` file in the frontend root directory, or copy it from `.env.example`.

```env
VITE_API_BASE_URL=http://localhost:5000
```

Adjust the port value if your backend runs on a different port.

---

### 2. Run Frontend Development Server

Install dependencies and start the development server.

```bash
npm install
npm run dev
```

The frontend application will be available at:

```
http://localhost:5173
```

---

### 3. Fetch Rooms Example

Use the `useRooms()` hook in any React component to retrieve the list of available rooms from the backend.

```tsx
const { data, isLoading, error } = useRooms();
```

* `data` contains the room list returned by the API
* `isLoading` indicates whether the request is still in progress
* `error` contains API error information if the request fails

---

### 4. Create Booking Example

Use the `useCreateBooking()` hook to create a new booking.

```tsx
const createBooking = useCreateBooking();

createBooking.mutate(
  {
    roomId: 1,
    startTime: '2026-02-09T09:00:00Z',
    endTime: '2026-02-09T10:00:00Z'
  },
  {
    onSuccess: () => {
      // handle success (redirect, refresh data, show success toast, etc.)
    },
    onError: (err) => {
      if (err.status === 409) {
        // booking conflict (time slot already taken)
      } else if (err.fields) {
        // validation errors (map fields to form validation)
      } else {
        // generic error handling
      }
    }
  }
);
```

---

### 5. Error Handling Contract

All API errors returned to the frontend are normalized into the following structure:

```ts
{
  status: number;
  message: string;
  fields?: Record<string, string[]>;
  raw?: unknown;
}
```

Error handling guidelines:

* `400 Bad Request` → input validation error
* `409 Conflict` → booking time conflict
* `500 Internal Server Error` → unexpected server error

Frontend components are expected to handle these cases accordingly to provide proper user feedback.

---

