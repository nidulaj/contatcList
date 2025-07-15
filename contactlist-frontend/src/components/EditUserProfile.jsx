import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { authFetch } from "../utils/authFetch";
import Swal from "sweetalert2";

export default function EditUserProfile({ userData, onUpdate }) {
  const [formData, setFormData] = React.useState({ ...userData });


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const res = await await authFetch({
      method: "put",
      url: `http://localhost:5000/auth/profile`,
      data: formData
    });

      console.log("Updated: ", res.data);
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
    <Popup trigger={<button>Edit Profile</button>} modal nested>
      {(close) => (
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}
        >
          <h3>Edit User Profile</h3>
          <form onSubmit={(e) => handleSubmit(e, close)}>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Email"
              disabled
            />
            
            <button type="submit">Save</button>
            <button type="button" onClick={close}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}
