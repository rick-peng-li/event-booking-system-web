import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Auth() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
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

      if (isLogin) {

        const res = await API.post(
          "/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        if (res.data.user.role === "admin") {
          navigate("/admin");
        }

        else if (
          res.data.user.role === "organizer"
        ) {
          navigate("/dashboard");
        }

        else {
          navigate("/");
        }

      } else {

        const res = await API.post(
          "/auth/register",
          formData
        );

        alert(res.data.message);

        setIsLogin(true);
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Authentication Failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px]"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded-lg"
          onChange={handleChange}
        />

        {!isLogin && (

          <select
            name="role"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          >

            <option value="user">
              User
            </option>

            <option value="organizer">
              Organizer
            </option>

           

          </select>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          className="text-center mt-5 cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >

          {isLogin
            ? "Create New Account"
            : "Already have an account?"}

        </p>

      </form>
    </div>
  );
}

export default Auth;