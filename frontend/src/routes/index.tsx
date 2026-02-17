import { Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/user/Dashboard";
import RoomDetail from "../pages/user/RoomDetail";
import BookingHistory from "../pages/user/BookingHistory";
import AdminDashboard from "../pages/admin/Dashboard";
import BookingDetail from "../pages/admin/BookingDetail";
import ProcessedBookings from "../pages/admin/ProcessedBookings";

export default function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/bookings/:id" element={<BookingDetail />} />
        <Route path="/admin/bookings" element={<ProcessedBookings />} />

    </Routes>
  );
}
