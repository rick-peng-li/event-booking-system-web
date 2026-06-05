import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {

  const [events, setEvents] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    seats: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchEvents = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await API.get(
      `/events/organizer/${user._id}`
    );

    setEvents(res.data);

  } catch (error) {

    console.log(error);
  }
};

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    if (editId) {

    const user = JSON.parse(
  localStorage.getItem("user")
);

const res = await API.post(
  "/events/create",
  {
    ...formData,
    organizer: user._id,
  }
);

      alert(res.data.message);

      setEditId(null);

    } else {

      const res = await API.post(
        "/events/create",
        formData
      );

      alert(res.data.message);
    }

    fetchEvents();

    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      seats: "",
    });

  } catch (error) {

    console.log(error);

    alert("Operation Failed");
  }
};
  const handleDelete = async (id) => {
    
    try {

      const res = await API.delete(
        `/events/${id}`
      );

      alert(res.data.message);

      fetchEvents();

    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };
  const handleEdit = (event) => {

  setEditId(event._id);

  setFormData({
    title: event.title,
    description: event.description,
    date: event.date.split("T")[0],
    location: event.location,
    seats: event.seats,
  });
};
  

  return (
    <div>
      <Navbar />

      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-8 rounded-xl w-[500px]"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Organizer Dashboard
          </h1>

        <input
  type="text"
  name="title"
  value={formData.title}
  placeholder="Event Title"
  className="w-full border p-3 mb-4 rounded-lg"
  onChange={handleChange}
/>

         <textarea
  name="description"
  value={formData.description}
  placeholder="Event Description"
  className="w-full border p-3 mb-4 rounded-lg"
  onChange={handleChange}
/>
          <input
            type="date"
            value={formData.date}
            name="date"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            placeholder="Location"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="number"
            name="seats"
            value={formData.seats}
            placeholder="Available Seats"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg"
          >
            Create Event
          </button>
        </form>
      </div>

      <div className="p-10 grid md:grid-cols-3 gap-6">

        {events.map((event) => (

          <div
            key={event._id}
            className="bg-white shadow-lg rounded-xl p-5"
          >

            <h2 className="text-2xl font-bold">
              {event.title}
            </h2>

            <p className="mt-2">
              {event.location}
            </p>

            <p>
              Seats: {event.seats}
            </p>
<button
  onClick={() => handleEdit(event)}
  className="mt-4 mr-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
>
  Edit Event
</button>
            <button
              onClick={() => handleDelete(event._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete Event
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Dashboard;