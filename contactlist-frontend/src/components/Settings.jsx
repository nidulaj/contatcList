import React from "react";
import Swal from "sweetalert2";
import { authFetch } from "../utils/authFetch";
import { API_URL } from "../utils/api";

export default function Settings({twoFAEnabled }) {
  const [twoFA, setTwoFA] = React.useState(twoFAEnabled);

  const toggle2FA = async () => {
    try {
      await authFetch({
        method: "post",
        url: `${API_URL}/auth/toggle-2fa`,
      });

      setTwoFA((prev) => !prev);

      Swal.fire({
        title: "Updated!",
        text: "Two-factor authentication setting has been changed.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      console.error("2FA toggle error:", err.response?.data || err.message);

      Swal.fire({
        title: "Error",
        text: "Failed to toggle 2FA",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await authFetch({
        method: "get",
        url: `${API_URL}/contact/export-pdf`,
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "contacts.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("PDF Download Error:", err);
      alert("Failed to download PDF");
    }
  };

  return (
    <div className="absolute top-16 right-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80 z-50">
      <h2 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
        Settings
      </h2>
      <ul className="space-y-3">
        <li>
          <button
            className="text-left w-full px-3 py-2 rounded-md transition duration-200 hover:opacity-80 hover:scale-[1.01] text-gray-800 dark:text-gray-100"
            onClick={downloadPDF}
          >
            Export Contacts
          </button>
        </li>
        <li className="flex justify-between items-center px-3 py-2 rounded-md hover:opacity-80 hover:scale-[1.01] transition">
          <span className="text-gray-800 dark:text-gray-100">
            Two-Factor Authentication
          </span>
          <button
            onClick={toggle2FA}
            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors duration-300 ${
              twoFA ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                twoFA ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </li>
      </ul>
    </div>
  );
}
