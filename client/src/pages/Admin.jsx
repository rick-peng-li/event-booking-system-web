import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Admin() {

  const [users, setUsers] = useState([]);

  const [events, setEvents] = useState([]);

  const [bookings, setBookings] = useState([]);

  const fetchData = async () => {

    try {

      const usersRes = await API.get(
        "/auth/users"
      );

      const eventsRes = await API.get(
        "/events"
      );

      const bookingsRes = await API.get(
        "/bookings"
      );

      setUsers(usersRes.data);

      setEvents(eventsRes.data);

      setBookings(bookingsRes.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleDeleteUser = async (id) => {

  try {

    const res = await API.delete(
      `/auth/users/${id}`
    );

    alert(res.data.message);

    fetchData();

  } catch (error) {

    console.log(error);

    alert("Delete Failed");
  }
};

  const organizers = users.filter(
    (user) => user.role === "organizer"
  );

  const normalUsers = users.filter(
    (user) => user.role === "user"
  );

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold text-center mb-10">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">
              Total Users
            </h2>

            <p className="text-4xl mt-4">
              {normalUsers.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">
              Organizers
            </h2>

            <p className="text-4xl mt-4">
              {organizers.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">
              Events
            </h2>

            <p className="text-4xl mt-4">
              {events.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">
              Bookings
            </h2>

            <p className="text-4xl mt-4">
              {bookings.length}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-5">
              Users & Bookings
            </h2>

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="border-b py-3"
              >

                <p>
                  <span className="font-bold">
                    User:
                  </span>

                  {" "}
                  {booking.user?.name}
                </p>
                <button
  onClick={() =>
    handleDeleteUser(booking.user?._id)
  }
  className="mt-2 bg-red-600 text-white px-3 py-1 rounded-lg"
>
  Delete User
</button>

                <p>
                  <span className="font-bold">
                    Event:
                  </span>

                  {" "}
                  {booking.event?.title}
                </p>

                <p>
                  <span className="font-bold">
                    Ticket:
                  </span>

                  {" "}
                  {booking.ticketId}
                </p>

              </div>
            ))}

          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-5">
              Organizers & Events
            </h2>

            {events.map((event) => (

              <div
                key={event._id}
                className="border-b py-3"
              >

                <p>
                  <span className="font-bold">
                    Organizer:
                  </span>

                  {" "}
                  {event.organizer?.name}
                </p>

                <p>
                  <span className="font-bold">
                    Event:
                  </span>

                  {" "}
                  {event.title}
                </p>

                <p>
                  <span className="font-bold">
                    Seats Left:
                  </span>

                  {" "}
                  {event.seats}
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default Admin;