import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-10 text-center">
          My Bookings
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-xl p-5"
            >
              <h2 className="text-2xl font-bold">
                {booking.event?.title}
              </h2>

              <p className="mt-2">
                📍 {booking.event?.location}
              </p>

              <p>
                🎟 Ticket ID: {booking.ticketId}
              </p>

              <p className="mt-2">
                👤 User: {booking.user?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;