import React from "react";
import { authFetch } from "../utils/authFetch";
import Settings from "./Settings";

export default function Header() {
  const [firstName, setFirstName] = React.useState(null);
  const [showSettings, setShowSettings] = React.useState(false);

  const fetchFirstName = () => {
    const token = localStorage.getItem("accessToken");

    authFetch({
      method: "get",
      url: "http://localhost:5000/auth/profile",
    })
      .then((res) => {
        setFirstName(res.data.message.firstName);
      })
      .catch((err) => {
        console.error("Header load error:", err);
      });
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  React.useEffect(() => {
    fetchFirstName();
  }, []);

  return (
    <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <p className="text-xl font-semibold text-gray-800">Contact List</p>

      <div className="flex items-center gap-4">
        <img
          src="/src/assets/user.png"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />

        <span className="text-gray-700 font-medium">Welcome {firstName}</span>

        <button
          onClick={toggleSettings}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition"
        >
          Settings
        </button>

        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
          Log out
        </button>
      </div>
      {showSettings && <Settings />}
    </div>
  );
}
