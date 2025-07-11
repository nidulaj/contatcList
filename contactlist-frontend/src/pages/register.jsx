import React from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'
export default function Register() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const res = await axios.post('http://localhost:5000/auth/register', formData)
        console.log('Registered : ', res.data)
        alert('Registration successful')
        navigate('/')
    } catch(err){
        console.error('Register error:', err)
        alert('Error during registration')
    }
  }
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
}
