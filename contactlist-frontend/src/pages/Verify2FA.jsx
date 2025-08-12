import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Verify2FA({ setIsLoggedIn }) {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    const tempToken = localStorage.getItem("tempToken");

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/verify-2fa",
        { code },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );

      localStorage.removeItem("tempToken");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Invalid 2FA code", err);
      setCode("")
      Swal.fire({
        title: "Error!",
        text: " Invalid Two-factor authentication code.",
        icon: "error",
        confirmButtonText: "Retry",
      })
    }
  };

  return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
      Two-Factor Authentication
    </h2>

    <input
      type="text"
      placeholder="Enter your 2FA code"
      value={code}
      onChange={(e) => setCode(Number(e.target.value))}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />

    <button
      onClick={handleVerify}
      className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition"
    >
      Verify
    </button>
  </div>
</div>


  )
}
