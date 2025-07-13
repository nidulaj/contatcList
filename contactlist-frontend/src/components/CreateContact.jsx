import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function CreateContact({ onUpdate  }) {
  const [formData, setFormData] = React.useState();
  const navigate = useNavigate();

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
      const res = await axios.post(
        `http://localhost:5000/contact/newContact`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Created: ", res.data);

      if (onUpdate) onUpdate(res.data.contact.contact_id);
      close();                
      navigate("/dashboard");
    } catch (err) {
      console.error("Creating error:", err);
      alert("Error during creating");
    }
  };

  return (
    <Popup trigger={<button>Create Contact</button>} modal nested>
      {(close) => (
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}
        >
          <h3>Add a New Contact</h3>
          <form onSubmit={(e) => handleSubmit(e, close)}>
            <input
              name="firstName"
              type="text"
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              name="lastName"
              type="text"
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              name="phoneNumber"
              type="numbers"
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <input
              name="email"
              type="text"
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              name="birthday"
              type="date"
              onChange={handleChange}
              placeholder="Birthday"
            />
            <button type="submit">Create</button>
            <button type="button" onClick={close}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}
