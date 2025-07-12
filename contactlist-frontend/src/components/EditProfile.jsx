import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function EditProfile({ contact, onUpdate  }) {
  const [formData, setFormData] = React.useState({ ...contact });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Updated to receive `close` from Popup
  const handleSubmit = async (e, close) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.put(
        `http://localhost:5000/contact/${contact.contact_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated: ", res.data);
      if (onUpdate) onUpdate();
      close();                
      navigate("/dashboard");
    } catch (err) {
      console.error("Updated error:", err);
      alert("Error during updating");
    }
  };

  return (
    <Popup trigger={<button>Edit</button>} modal nested>
      {(close) => (
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}
        >
          <h3>Edit Contact</h3>
          <form onSubmit={(e) => handleSubmit(e, close)}>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              placeholder="Birthday"
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
