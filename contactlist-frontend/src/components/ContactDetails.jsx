import EditContact from './EditContact';

export default function ContactDetails({ contact, onUpdate }) {
  return (
    <div>
      <p>First Name : {contact.firstName}</p>
      <p>Last Name : {contact.lastName}</p>
      <p>Phone Number : {contact.phoneNumber}</p>
      <p>Email : {contact.email}</p>
      <p>Birthday : {new Date(contact.birthday).toISOString().split('T')[0]}</p>

      <EditContact contact={contact} onUpdate={onUpdate} />
    </div>
  )
}
