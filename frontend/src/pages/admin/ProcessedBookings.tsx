import { useBookings } from "../../hooks/useBookings";
import type { Booking } from "../../types/api";

export default function ProcessedBookings() {
  const { data: bookings, isLoading } = useBookings();

  const processed =
    bookings?.filter((b: Booking) => b.status !== "pending") || [];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Processed Bookings
        </h1>
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
          <div className="h-24 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Processed Bookings
          </h1>
          <p className="text-gray-500 mt-1">
            Approved, rejected, and cancelled requests
          </p>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500">
            Total Processed
          </p>
          <p className="text-2xl font-bold">
            {processed.length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {processed.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm border text-center">
          <div className="text-4xl mb-4">📭</div>
          <p className="text-lg font-medium">
            No processed bookings yet
          </p>
          <p className="text-gray-500 mt-2">
            Processed bookings will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {processed.map((b: Booking) => {
            const start = new Date(b.startTime);
            const end = new Date(b.endTime);

            const date = start.toLocaleDateString();
            const time = `${start.getHours()}:00 - ${end.getHours()}:00`;

            return (
              <div
                key={b.id}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {b.room?.name || "Unknown Room"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {b.user?.email || "Unknown User"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                      b.status
                    )}`}
                  >
                    {b.status.toUpperCase()}
                  </span>
                </div>

                <div className="border-t my-4"></div>

                {/* Detail Section */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span className="font-medium text-gray-800">
                      {date}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Time</span>
                    <span className="font-medium text-gray-800">
                      {time}
                    </span>
                  </div>

                  {b.createdAt && (
                    <div className="flex justify-between">
                      <span>Created</span>
                      <span className="font-medium text-gray-800">
                        {new Date(b.createdAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
