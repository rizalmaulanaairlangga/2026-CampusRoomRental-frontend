import { Routes, Route, Navigate } from 'react-router-dom'
import RoomsList from './pages/RoomsList.tsx';
import BookingForm from './pages/BookingForm.tsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/rooms" element={<RoomsList />} />
      <Route path="/bookings/new" element={<BookingForm />} />
      
      {/* 404 handler */}
      <Route path="*" element={<Navigate to="/" replace />} />

      
    </Routes>
  )
}

export default App
