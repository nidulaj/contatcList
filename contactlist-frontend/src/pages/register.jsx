import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../utils/api";

export default function Register({isDark}) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/auth/register`,
        formData
      );

      Swal.fire({
        title: "Success!",
        text: "Your account was created successfully. Please verfity your email",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.error("Register error:", err);
      Swal.fire({
        title: "Oops...!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={isDark ? "/src/assets/contact-book-dark.png" : "/src/assets/contact-book-light.png"}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Register Now
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
