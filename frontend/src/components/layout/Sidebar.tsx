import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";

export default function Sidebar() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (loading) {
    return (
      <aside className="w-64 bg-white shadow-md p-6">
        <p className="text-gray-500">Loading...</p>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        <div className="p-6 font-bold text-xl border-b">
          Room Booking
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Dashboard
          </Link>

          {isAuthenticated && user?.role === "admin" && (
            <>
              <Link
                to="/admin/bookings"
                className="block px-3 py-2 rounded hover:bg-gray-200"
              >
                Processed Bookings
              </Link>

              <Link
                to="/admin/rooms"
                className="block px-3 py-2 rounded hover:bg-gray-200"
              >
                Room Management
              </Link>
            </>
          )}

          {isAuthenticated && user?.role === "user" && (
            <Link
              to="/history"
              className="block px-3 py-2 rounded hover:bg-gray-200"
            >
              Booking History
            </Link>
          )}
        </nav>
      </div>

      <div className="p-4 border-t space-y-2">
        {isAuthenticated && (
          <>
            <Link
              to="/account"
              className="block px-3 py-2 rounded hover:bg-gray-200"
            >
              {user?.name}
            </Link>

            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 text-red-600"
            >
              Logout
            </button>
          </>
        )}

        {!isAuthenticated && (
          <Link
            to="/login"
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            Login
          </Link>
        )}
      </div>
    </aside>
  );
}
