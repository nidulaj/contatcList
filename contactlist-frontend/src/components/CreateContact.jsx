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
    const token = localStorage.getItem("accessToken");
    try {
      const res = await authFetch({
            method: "post",
            url: `http://localhost:5000/contact/newContact`,
            data : formData
          });
      console.log("Created: ", res.data);
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
