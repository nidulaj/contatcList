import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditContact({ contact, onUpdate }) {
  const [formData, setFormData] = React.useState({ ...contact });


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
      close();
      Swal.fire({
        title: "Success!",
        text: "Contact was updated successfully.",
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
    <Popup trigger={<button>Edit</button>} modal nested>
      {(close) => (
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "10px" }}
        >
          <h3>Edit Contact</h3>
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
              name="phoneNumber"
              type="number"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
            />
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              name="birthday"
              type="date"
              value={new Date(formData.birthday).toISOString().split("T")[0]}
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
