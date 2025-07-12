import EditProfile from './EditProfile';

export default function ContactDetails({ contact, onUpdate }) {
  return (
    <div>
      <p>First Name : {contact.firstName}</p>
      <p>Last Name : {contact.lastName}</p>
      <p>Phone Number : {contact.phoneNumber}</p>
      <p>Email : {contact.email}</p>
      <p>Birthday : {contact.birthday}</p>

      <EditProfile contact={contact} onUpdate={onUpdate} />
    </div>
  )
}
