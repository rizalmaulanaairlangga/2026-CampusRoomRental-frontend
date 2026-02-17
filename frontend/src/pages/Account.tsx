import { useAuth } from "../providers/useAuth";

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account</h1>

      <div className="bg-white p-6 rounded shadow space-y-3">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
