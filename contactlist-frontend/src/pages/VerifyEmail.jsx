import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Email Verified 🎉</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Your email has been successfully verified. You can now log in to your account.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
      >
        Go to Login
      </button>
    </div>
  );
}
