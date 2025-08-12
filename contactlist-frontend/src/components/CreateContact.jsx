import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { authFetch } from "../utils/authFetch";
import Swal from "sweetalert2";

export default function CreateContact({ onUpdate }) {
  const [formData, setFormData] = React.useState();

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
        method: "post",
        url: `http://localhost:5000/contact/newContact`,
        data: formData,
      });
      close();
      Swal.fire({
        title: "Success!",
        text: "Contact was created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      if (onUpdate) onUpdate(res.data.contact.contact_id);
    } catch (err) {
      console.error("Creating error:", err);
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
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
          Create Contact
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-4xl shadow-md transition">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Add a New Contact
          </h3>

          <div className="flex gap-8">
            {/* Left half - Image */}
            <div className="w-1/2 flex flex-col justify-center items-center">
              <img
                src="/src/assets/user.png"
                alt="User"
                className="w-48 h-48 rounded-full object-cover border-2 border-indigo-600"
              />
            </div>

            {/* Right half - Form */}
            <form
              onSubmit={(e) => handleSubmit(e, close)}
              className="w-1/2 space-y-4"
            >
              <input
                name="firstName"
                type="text"
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="lastName"
                type="text"
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="phoneNumber"
                type="number"
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="email"
                type="text"
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                name="birthday"
                type="date"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
}
