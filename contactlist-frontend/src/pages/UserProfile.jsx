import React from "react";
import axios from "axios";
import EditUserProfile from "../components/EditUserProfile";
import Swal from "sweetalert2";
import { handleLogout } from "../utils/logout";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "../components/DeleteAlert";
import { authFetch } from "../utils/authFetch";

export default function UserProfile() {
  const [userData, setUserData] = React.useState(null);

  const navigate = useNavigate();
  const fetchUserData = () => {
    const token = localStorage.getItem("accessToken");

    authFetch({
      method : 'get',
      url: 'http://localhost:5000/auth/profile',
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
    const token = localStorage.getItem("accessToken");

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
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <div>
          <p>
            <strong>First Name:</strong> {userData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {userData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Username:</strong> {userData.username}
          </p>
          <EditUserProfile userData={userData} onUpdate={fetchUserData} />
          <DeleteAlert handleDelete={handleDelete} type="Profile" />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
