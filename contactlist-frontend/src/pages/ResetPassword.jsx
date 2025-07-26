import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = React.useState("");
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/reset-password", {
        token,
        newPassword
      });
      Swal.fire("Success", "Password updated successfully", "success");
      navigate("/");
    } catch (err) {
      console.error("Reset password error : ", err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Invalid or expired token",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="password"
          placeholder="Enter new password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
