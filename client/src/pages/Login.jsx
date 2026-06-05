import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      alert(res.data.message);

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-8 rounded-xl w-96"
        >
          <h1 className="text-3xl font-bold mb-6 text-center">
            Login
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;