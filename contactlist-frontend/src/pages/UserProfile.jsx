import React from 'react';
import axios from 'axios';
import EditUserProfile from '../components/EditUserProfile';

export default function UserProfile(){
    const [userData, setUserData] = React.useState(null)

    const fetchUserData = () => {
        const token = localStorage.getItem("accessToken")

        axios.get("http://localhost:5000/auth/profile", {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            setUserData(res.data.message)
        })
        .catch((err) => {
             console.error("Profile load error:", err);
             alert("Failed to load user profile.");
        })
    }
    React.useEffect(() => {
      fetchUserData()
    } , [])
    return(
        <div>
            <h1>User Profile</h1>
            {userData ? (
        <div>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <EditUserProfile userData = {userData} onUpdate = {fetchUserData}/>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
        </div>
    )
}