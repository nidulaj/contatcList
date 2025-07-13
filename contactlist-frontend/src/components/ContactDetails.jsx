import EditContact from "./EditContact";
import DeleteAlert from "./DeleteAlert";
import axios from "axios";

export default function ContactDetails({ contact, onUpdate, onClearSelected }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      await axios.delete(
        `http://localhost:5000/contact/${contact.contact_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (onUpdate) onUpdate();
      if (onClearSelected) onClearSelected();

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <p>First Name : {contact.firstName}</p>
      <p>Last Name : {contact.lastName}</p>
      <p>Phone Number : {contact.phoneNumber}</p>
      <p>Email : {contact.email}</p>
      <p>Birthday : {new Date(contact.birthday).toISOString().split("T")[0]}</p>

      <EditContact contact={contact} onUpdate={onUpdate} />
      <DeleteAlert handleDelete={handleDelete} type = "contact" />
    </div>
  );
}
