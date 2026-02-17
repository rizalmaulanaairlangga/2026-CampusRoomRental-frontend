import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";

import UserDashboard from "../pages/user/Dashboard";
import RoomDetail from "../pages/user/RoomDetail";
import BookingHistory from "../pages/user/BookingHistory";

import AdminDashboard from "../pages/admin/Dashboard";
import BookingDetail from "../pages/admin/BookingDetail";
import ProcessedBookings from "../pages/admin/ProcessedBookings";
import RoomManagement from "../pages/admin/RoomManagement";

import Login from "../pages/auth/Login";
import Account from "../pages/Account";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={<Login />} />

      {/* ================= USER AREA ================= */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Route>

      {/* ================= ADMIN AREA ================= */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<ProcessedBookings />} />
          <Route path="/admin/bookings/:id" element={<BookingDetail />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
        </Route>
      </Route>

    </Routes>
  );
}
