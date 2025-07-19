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

  const toggle2FA = async () => {
    try{
      await authFetch({
        method: "post",
        url: "http://localhost:5000/auth/toggle-2fa",
      })

      Swal.fire({
        title: "Updated!",
        text: "Two-factor authentication setting has been changed.",
        icon: "success",
        confirmButtonText: "OK",
      });


    }catch(err){
      console.error("2FA toggle error:", err.response?.data || err.message);

      Swal.fire({
        title: "Error",
        text: "Failed to toggle 2FA",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

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
          <button onClick={toggle2FA}>
            {userData.two_fa_enabled ? "Disable 2FA" : "Enable 2FA"}
          </button>
          <EditUserProfile userData={userData} onUpdate={fetchUserData} />
          <DeleteAlert handleDelete={handleDelete} type="Profile" />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
