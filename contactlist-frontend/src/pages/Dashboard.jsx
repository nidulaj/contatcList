import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import ContactCard from "../components/ContactCard";
import EmptyContactDetails from "../components/EmptyContactDetails";
import ContactDetails from "../components/ContactDetails";
import CreateContact from "../components/CreateContact";
import { authFetch } from "../utils/authFetch";
import Header from "../components/Header";

export default function Dashboard() {
  const [contacts, setContacts] = React.useState([]);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredContacts, setFilteredContacts] = React.useState([]);

  const fetchContacts = (newContactId = null) => {
    authFetch({
      method: "post",
      url: "http://localhost:5000/contact/",
    })
      .then((res) => {
        const updatedContacts = res.data.contacts;
        setContacts(updatedContacts);
        setFilteredContacts(updatedContacts);

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

  const handleCardClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(term.toLowerCase());
    });
    setFilteredContacts(filtered);
  };

  return (
    <>
      <Header/>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Left Panel – Contact List */}
        <div className="w-[350px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header + Create Button */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              All Contacts
            </h2>
            <CreateContact onUpdate={(newId) => fetchContacts(newId)} />
          </div>

          {/* Search Bar */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Scrollable Cards */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2 p-2">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.contact_id}
                    onClick={() => handleCardClick(contact)}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition p-3"
                  >
                    <ContactCard
                      firstName={contact.firstName}
                      lastName={contact.lastName}
                      phoneNumber={contact.phoneNumber}
                    />
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">
                  No contacts found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel – Contact Details */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <div className="p-4">
            {selectedContact ? (
              <ContactDetails
                contact={selectedContact}
                onUpdate={fetchContacts}
                onClearSelected={() => setSelectedContact(null)}
              />
            ) : (
              <EmptyContactDetails />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
