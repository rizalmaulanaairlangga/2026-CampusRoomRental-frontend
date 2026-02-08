import { Routes, Route, Navigate } from 'react-router-dom'


function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/rooms" element={<h1>Rooms Page</h1>} />
      <Route path="/bookings" element={<h1>Bookings Page</h1>} />

      {/* 404 handler */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default App
