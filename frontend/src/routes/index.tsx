import { Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/user/Dashboard";
import RoomDetail from "../pages/user/RoomDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/rooms/:id" element={<RoomDetail />} />
    </Routes>
  );
}
