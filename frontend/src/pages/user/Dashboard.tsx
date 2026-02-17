import { useRooms } from "../../hooks/useRooms";
import { useBookings } from "../../hooks/useBookings";
import { Link, useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  const { data: rooms = [], isLoading: roomsLoading } = useRooms();
  const { data: bookings, isLoading: bookingsLoading } =
    useBookings();

  // ✅ SORT BY CREATED DATE (NEWEST FIRST)
  const recentBookings =
    bookings
      ?.slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      )
      .slice(0, 4) || [];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ================= LEFT: RECENT BOOKINGS ================= */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Recent Bookings
          </h2>

          {bookingsLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : recentBookings.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border text-gray-500">
              No recent bookings.
            </div>
          ) : (
            <div className="space-y-4">
              {recentBookings.map((b) => {
                const start = new Date(b.startTime);
                const end = new Date(b.endTime);

                const date =
                  start.toLocaleDateString();
                const time = `${start.getHours()}:00 - ${end.getHours()}:00`;

                return (
                  <div
                    key={b.id}
                    onClick={() =>
                      navigate(`/booking/${b.id}`)
                    }
                    className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-lg hover:border-blue-200 transition cursor-pointer group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-lg group-hover:text-blue-600 transition">
                          {b.room?.name || "Unknown Room"}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {date}
                        </p>

                        <p className="text-sm text-gray-500">
                          {time}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= RIGHT: ROOMS ================= */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Available Rooms
          </h2>

          {roomsLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : rooms?.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border text-gray-500">
              No rooms available.
            </div>
          ) : (
            <div className="grid gap-4">
              {rooms.map((room) => {
                const isInactive =
                  room.status === "inactive";

                const cardContent = (
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className={`font-semibold text-lg transition ${
                          !isInactive &&
                          "group-hover:text-blue-600"
                        }`}
                      >
                        {room.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Capacity: {room.capacity}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        room.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {room.status?.toUpperCase()}
                    </span>
                  </div>
                );

                if (!isInactive) {
                  return (
                    <Link
                      key={room.id}
                      to={`/rooms/${room.id}`}
                      className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-lg hover:border-blue-200 transition group"
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <div
                    key={room.id}
                    className="bg-gray-100 p-5 rounded-2xl shadow-sm border opacity-60 cursor-not-allowed"
                  >
                    {cardContent}
                    <p className="text-xs text-gray-500 mt-2">
                      This room is inactive
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
