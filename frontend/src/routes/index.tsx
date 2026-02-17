import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";

import UserDashboard from "../pages/user/Dashboard";
import RoomDetail from "../pages/user/RoomDetail";
import BookingHistory from "../pages/user/BookingHistory";
import BookingDetail from "../pages/user/BookingDetail";

import AdminDashboard from "../pages/admin/Dashboard";
import BookingDetailAdmin from "../pages/admin/BookingDetail";
import ProcessedBookings from "../pages/admin/ProcessedBookings";
import RoomManagement from "../pages/admin/RoomManagement";
import RoomDetailAdmin from "../pages/admin/RoomDetail";

import Login from "../pages/auth/Login";
import Account from "../pages/Account";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* USER AREA */}
      <Route element={<ProtectedRoute role="user" />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/account" element={<Account />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
        </Route>
      </Route>

      {/* ADMIN AREA */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<ProcessedBookings />} />
          <Route path="/admin/bookings/:id" element={<BookingDetailAdmin />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
          <Route path="/admin/rooms/:id" element={<RoomDetailAdmin />} />
        </Route>
      </Route>

      {/* DEFAULT REDIRECT */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}
