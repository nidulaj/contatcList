import axios from "axios";
import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword({isDark}) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/forgot-password", {
        username,
        email,
      });
      Swal.fire("Success", "Reset link sent to your email", "success").then(
        () => navigate("/")
      );
    } catch (err) {
      console.error("forgot password error : ", err);
      if (err.response) {
        const data = err.response.data;
        if (data.userNotFound) {
          Swal.fire({
            title: "Oops...!",
            text: "User not found",
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
                    username: username,
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
      } else {
        Swal.fire({
          title: "Oops...!",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm space-y-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={isDark ? "/src/assets/contact-book-dark.png" : "/src/assets/contact-book-light.png"}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Forgot Password
        </h2>
      </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded"
          >
            Send Reset Link
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
