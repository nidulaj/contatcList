import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login({ setIsLoggedIn }) {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        credentials
      );

      if (res.data.is2FAEnabled) {
        localStorage.setItem("tempToken", res.data.tempToken);
        navigate("/verify2FA");
      } else {
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        const data = err.response.data;

        if (data.userNotFound) {
          Swal.fire({
            title: "Oops...!",
            text: "User not found",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (data.invalidPassword) {
          Swal.fire({
            title: "Oops...!",
            text: "Invalid credentials",
            icon: "error",
            confirmButtonText: "OK",
          });
        } else if (data.isVerified === false) {
          Swal.fire({
            title: "Oops...!",
            text: "Please verify the email",
            icon: "error",
            confirmButtonText: "Resend verification link",
            showCancelButton: true,
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const resendRes = await axios.post(
                  "http://localhost:5000/auth/resend-verification",
                  {
                    username: credentials.username,
                  }
                );

                Swal.fire({
                  title: "Link sent!",
                  text:
                    resendRes.data.message ||
                    "A new verification link has been sent to your email.",
                  icon: "success",
                });
              } catch (resendError) {
                console.error("Resend error:", resendError);
                Swal.fire({
                  title: "Error",
                  text: "Failed to resend the verification link.",
                  icon: "error",
                });
              }
            }
          });
        }
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="./src/assets/contact-book-light.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-gray-100"
              >
                Password
              </label>
              <div className="text-sm">
               <Link to= "/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500" >
                Forgot Password
               </Link>
              
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white dark:bg-gray-800 px-3 py-1.5 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
