import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({setIsLoggedIn}) {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        credentials
      );

      localStorage.setItem("accessToken", res.data.accessToken); 
      setIsLoggedIn(true)
      navigate('/dashboard')
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
