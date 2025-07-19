import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Verify2FA({ setIsLoggedIn }) {
  const [code, setCode] = React.useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    const tempToken = localStorage.getItem("tempToken");

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/verify-2fa",
        { code },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );

      localStorage.removeItem("tempToken");
      localStorage.setItem("accessToken", res.data.accessToken);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Invalid 2FA code", err);
      console.log(code)
      setCode("")
      Swal.fire({
        title: "Error!",
        text: " Invalid Two-factor authentication code.",
        icon: "error",
        confirmButtonText: "Retry",
      })
    }
  };

  return(
    <div>
      <h2>Two-Factor Authentication</h2>
      <input
        type="text"
        placeholder="Enter your 2FA code"
        value={code}
        onChange={(e) => setCode(Number(e.target.value))}
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  )
}
