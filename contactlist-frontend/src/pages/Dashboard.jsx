
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import ContactCard from "../components/ContactCard";
export default function Dashboard() {
  const [contacts, setContacts] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "http://localhost:5000/contact/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setContacts(res.data.contacts);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        alert("Failed to load contacts.");
      });
  }, []);

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <>
      <h2>Dashboard</h2>

      {contacts.length > 0 ? (
        contacts.map(contact => (
          <ContactCard
            key={contact.contact_id}
            firstName={contact.firstName}
            lastName={contact.lastName}
            phoneNumber={contact.phoneNumber}
          />
        ))
      ) : (
        <p>No contacts found</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

