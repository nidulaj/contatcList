import React from "react";
import { authFetch } from "../utils/authFetch";
import Settings from "./Settings";
import { handleLogout } from "../utils/logout";
import { useNavigate } from "react-router-dom";

export default function Header({isDark}) {
  const [userData, setUserData] = React.useState(null);
  const [showSettings, setShowSettings] = React.useState(false);

  const navigate = useNavigate();

  const fetchUserData = () => {

    authFetch({
      method: "get",
      url: "http://localhost:5000/auth/profile",
    })
      .then((res) => {
        setUserData(res.data.message);
      })
      .catch((err) => {
        console.error("header load error:", err);
      });
  };
  React.useEffect(() => {
    fetchUserData();
  }, []);

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
      <p
  className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-100 cursor-pointer"
  onClick={() => navigate("/dashboard")}
>
  <img
    alt="Your Company"
    src={isDark ? "/src/assets/contact-book-dark.png" : "/src/assets/contact-book-light.png"}
    className="h-10 w-auto"
  />
  Contact List
</p>


      <div className="flex items-center gap-4">
        <img
          src={isDark ? "/src/assets/user-dark.png" : "/src/assets/user-light.png"}
          alt="User"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
          onClick={() => navigate("/dashboard/userProfile")}
        />

        <span className="text-gray-700 dark:text-gray-200 font-medium cursor-pointer" onClick={() => navigate("/dashboard/userProfile")}>
          Welcome {userData ? userData.firstName : ""}
          
        </span>

        <button
          onClick={toggleSettings}
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded transition"
        >
          Settings
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
          onClick={() => handleLogout(navigate)}
        >
          Log out
        </button>
      </div>

      {showSettings && (
        <Settings
          twoFAEnabled={userData.two_fa_enabled}
        />
      )}
    </div>
  );
}
