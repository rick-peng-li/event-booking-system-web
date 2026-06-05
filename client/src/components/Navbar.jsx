import { Link } from "react-router-dom";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    alert("Logout Successful");

    window.location.href = "/auth";
  };

return (

  <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-10 py-5 flex justify-between items-center shadow-xl sticky top-0 z-50">

    <h1 className="text-3xl font-extrabold tracking-wide">
      EventSphere
    </h1>

    <div className="flex gap-8 items-center text-lg font-medium">

      <Link
        to="/"
        className="hover:text-yellow-300 transition duration-300"
      >
        Home
      </Link>

      {!user && (
        <Link
          to="/auth"
          className="hover:text-yellow-300 transition duration-300"
        >
          Auth
        </Link>
      )}

      {user?.role === "user" && (
        <Link
          to="/my-bookings"
          className="hover:text-yellow-300 transition duration-300"
        >
          My Bookings
        </Link>
      )}

      {user?.role === "organizer" && (
        <Link
          to="/dashboard"
          className="hover:text-yellow-300 transition duration-300"
        >
          Dashboard
        </Link>
      )}

      {user?.role === "admin" && (
        <>
          <Link
            to="/admin"
            className="hover:text-yellow-300 transition duration-300"
          >
            Admin
          </Link>

          <Link
            to="/approvals"
            className="hover:text-yellow-300 transition duration-300"
          >
            Approvals
          </Link>
        </>
      )}

      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition duration-300"
        >
          Logout
        </button>
      )}

    </div>

  </nav>
);
}

export default Navbar;