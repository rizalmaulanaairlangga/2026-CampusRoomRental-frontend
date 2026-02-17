import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/useAuth";

export default function ProtectedRoute({
  role,
}: {
  role?: string;
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
