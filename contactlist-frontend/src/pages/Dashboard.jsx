import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import ContactCard from "../components/ContactCard";
import EmptyContactDetails from "../components/EmptyContactDetails";
import ContactDetails from "../components/ContactDetails";
import CreateContact from "../components/CreateContact";

export default function Dashboard() {
  const styles = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
  };
  const [contacts, setContacts] = React.useState([]);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const navigate = useNavigate();

  const fetchContacts = (newContactId = null) => {
    const token = localStorage.getItem("accessToken");
    axios
      .post(
        "http://localhost:5000/contact/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const updatedContacts = res.data.contacts;
        setContacts(updatedContacts);

        if (newContactId) {
          const newOne = updatedContacts.find(
            (c) => c.contact_id === newContactId
          );
          if (newOne) {
            setSelectedContact(newOne);
          }
        } else if (selectedContact) {
          const updatedSelected = updatedContacts.find(
            (c) => c.contact_id === selectedContact.contact_id
          );

          if (updatedSelected) {
            setSelectedContact(updatedSelected);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
        alert("Failed to load contacts.");
      });
  };
  React.useEffect(() => {
    fetchContacts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleCardClick = (contact) => {
    setSelectedContact(contact);
  };
  return (
    <>
      <h2>Dashboard</h2>
      <CreateContact onUpdate={(newId) => fetchContacts(newId)} />
      <button onClick={handleLogout}>Logout</button>
      <div className="dashboard-content" style={styles}>
        <div className="contactCards">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactCard
                key={contact.contact_id}
                firstName={contact.firstName}
                lastName={contact.lastName}
                phoneNumber={contact.phoneNumber}
                onClick={() => handleCardClick(contact)}
              />
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </div>
        <div className="contact-info">
          {selectedContact ? (
            <ContactDetails
              contact={selectedContact}
              onUpdate={fetchContacts}
            />
          ) : (
            <EmptyContactDetails />
          )}
        </div>
      </div>
    </>
  );
}
