import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Approvals() {

  const [organizers, setOrganizers] =
    useState([]);

  const fetchPendingOrganizers =
    async () => {

      try {

        const res = await API.get(
          "/auth/pending-organizers"
        );

        setOrganizers(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    fetchPendingOrganizers();
  }, []);

  const handleApprove = async (id) => {

    try {

      const res = await API.put(
        `/auth/approve-organizer/${id}`
      );

      alert(res.data.message);

      fetchPendingOrganizers();

    } catch (error) {

      console.log(error);

      alert("Approval Failed");
    }
  };

  const handleReject = async (id) => {

    try {

      await API.delete(
        `/auth/users/${id}`
      );

      alert("Organizer Rejected");

      fetchPendingOrganizers();

    } catch (error) {

      console.log(error);

      alert("Reject Failed");
    }
  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="p-10">

        <h1 className="text-4xl font-bold text-center mb-10">
          Organizer Approvals
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {organizers.map((organizer) => (

            <div
              key={organizer._id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >

              <h2 className="text-2xl font-bold">
                {organizer.name}
              </h2>

              <p className="mt-2">
                {organizer.email}
              </p>

              <p className="mt-2 text-yellow-600 font-bold">
                Pending Approval
              </p>

              <div className="flex gap-4 mt-5">

                <button
                  onClick={() =>
                    handleApprove(
                      organizer._id
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleReject(
                      organizer._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Approvals;