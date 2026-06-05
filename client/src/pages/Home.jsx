import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Home() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    fetchEvents();
  }, []);
  const handleBooking = async (eventId) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login First");
      return;
    }

    const res = await API.post(
      "/bookings/book",
      {
        userId: user._id,
        eventId,
      }
    );

    alert(res.data.message);
fetchEvents();
    console.log(res.data);
  } catch (error) {
    console.log(error);

    alert(
  error.response?.data?.message ||
  "Booking Failed"
);
  }
};

  return (
    <div>
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-24 px-10 text-center">

  <h1 className="text-6xl font-extrabold leading-tight">
    Discover Amazing Events
  </h1>

  <p className="mt-6 text-xl text-gray-200">
    Book tickets for concerts, tech events,
    workshops and more.
  </p>

  <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-xl">
    Explore Events
  </button>

</div>
      <Navbar />
      <div className="text-center mt-20 mb-12">

  <h2 className="text-5xl font-extrabold text-gray-800">
    Upcoming Events
  </h2>

  <p className="text-gray-500 mt-4 text-lg">
    Find and book the best experiences
    around you.
  </p>

</div>

      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Upcoming Events
        </h1>

        <div className="grid md:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-6 hover:scale-105 hover:shadow-indigo-300 transition duration-300 border border-gray-200"
            >
             <h2 className="text-3xl font-extrabold text-gray-800">
                {event.title}
              </h2>

             <p className="mt-3 text-gray-600 font-medium">
                {event.description}
              </p>

             <p className="mt-3 text-gray-600 font-medium">
                📍 {event.location}
              </p>

              <p className="mt-3 text-gray-600 font-medium">
                📅{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

       <p className="mt-3 text-gray-600 font-medium">
                🎟 Seats: {event.seats}
              </p>

             <button
  onClick={() => handleBooking(event._id)}
  className="mt-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition duration-300 shadow-lg"
>
  Book Now
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;