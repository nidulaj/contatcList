import React from "react";
import axios from "axios";
import EditUserProfile from "../components/EditUserProfile";
import Swal from "sweetalert2";
import { handleLogout } from "../utils/logout";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "../components/DeleteAlert";
import { authFetch } from "../utils/authFetch";
import Header from "../components/Header";

export default function UserProfile({ darkMode, toggleDarkMode, isDark }) {
  const [userData, setUserData] = React.useState(null);

  const navigate = useNavigate();
  const fetchUserData = () => {
    const token = localStorage.getItem("accessToken");

    authFetch({
      method: "get",
      url: "http://localhost:5000/auth/profile",
    })
      .then((res) => {
        setUserData(res.data.message);
      })
      .catch((err) => {
        console.error("Profile load error:", err);
        alert("Failed to load user profile.");
      });
  };
  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handleDelete = async () => {

    try {
      await authFetch({
        method: "delete",
        url: `http://localhost:5000/auth/profile`,
      });

      Swal.fire({
        title: "Success!",
        text: "Profile was Deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => handleLogout(navigate));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      Swal.fire({
        title: "Oops...!",
        text: "Something went wrong!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
    <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} isDark={isDark} />
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          User Profile
        </h1>
        {userData ? (
          <div className="space-y-4">
            <div className="flex justify-center mb-4">
              <img
                src={isDark ? "/src/assets/user-dark.png" : "/src/assets/user-light.png"}
                alt="User"
                className="w-32 h-32 rounded-full shadow-md object-cover"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-200">
              <strong className="font-semibold">First Name:</strong>{" "}
              {userData.firstName}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <strong className="font-semibold">Last Name:</strong>{" "}
              {userData.lastName}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <strong className="font-semibold">Email:</strong> {userData.email}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <strong className="font-semibold">Username:</strong>{" "}
              {userData.username}
            </p>

            {/* Edit & Delete Buttons */}
            <div className="mt-6 space-y-4">
              <EditUserProfile userData={userData} onUpdate={fetchUserData} isDark={isDark}/>
              <DeleteAlert handleDelete={handleDelete} type="Profile" />
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            Loading user data...
          </p>
        )}
      </div>
    </div>
    </>
  );
}
