import EditContact from "./EditContact";
import DeleteAlert from "./DeleteAlert";
import { authFetch } from "../utils/authFetch";

export default function ContactDetails({ contact, onUpdate, onClearSelected , isDark }) {
  const handleDelete = async () => {

    try {
      await authFetch({
        method: "delete",
        url: `http://localhost:5000/contact/${contact.contact_id}`,
      });
      if (onUpdate) onUpdate();
      if (onClearSelected) onClearSelected();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm px-6 py-8">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        <img
          src={isDark ? "/src/assets/user-dark.png" : "/src/assets/user-light.png"}
          alt="User"
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Main Content – Scrollable Info Section */}
      <div className="flex-1 overflow-y-auto space-y-5 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-500">
            First Name
          </p>
          <p className="font-medium text-base text-gray-900 dark:text-gray-100">
            {contact.firstName}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-500">
            Last Name
          </p>
          <p className="font-medium text-base text-gray-900 dark:text-gray-100">
            {contact.lastName}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-500">
            Phone Number
          </p>
          <p className="font-medium text-base text-gray-900 dark:text-gray-100">
            {contact.phoneNumber}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-500">
            Email
          </p>
          <p className="font-medium text-base text-gray-900 dark:text-gray-100">
            {contact.email}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-500">
            Birthday
          </p>
          <p className="font-medium text-base text-gray-900 dark:text-gray-100">
            {new Date(contact.birthday).toISOString().split("T")[0]}
          </p>
        </div>
      </div>

      {/* Action Buttons – Stuck at Bottom */}
      <div className="pt-6 mt-6  dark:border-gray-700 flex gap-4">
        <EditContact contact={contact} onUpdate={onUpdate} isDark={isDark}/>
        <DeleteAlert handleDelete={handleDelete} type="contact" />
      </div>
    </div>
  );
}
