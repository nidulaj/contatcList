import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { authFetch } from "../utils/authFetch";
import Swal from "sweetalert2";
import { API_URL } from "../utils/api";

export default function EditUserProfile({ userData, onUpdate, isDark }) {
  const [formData, setFormData] = React.useState({ ...userData });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    try {
      const res = await authFetch({
        method: "put",
        url: `${API_URL}/auth/profile`,
        data: formData,
      });

      close();
      Swal.fire({
        title: "Success!",
        text: "Profile was updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Updated error:", err);
      Swal.fire({
        title: "Oops...!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Popup
      trigger={
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition mr-[10px]">
          Edit Profile
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-4xl shadow-md transition">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Edit User Profile
          </h3>

          <div className="flex gap-8">
            {/* Left - Avatar */}
            <div className="w-1/2 flex justify-center items-center">
              <img
                src={isDark ? "/src/assets/user-dark.png" : "/src/assets/user-light.png"}
                alt="User"
                className="w-48 h-48 rounded-full object-cover"
              />
            </div>

            {/* Right - Form */}
            <form
              onSubmit={(e) => handleSubmit(e, close)}
              className="w-1/2 space-y-4"
            >
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                disabled
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-400 cursor-not-allowed"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={close}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
}
