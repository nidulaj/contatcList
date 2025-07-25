import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Verify2FA from './pages/Verify2FA';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    // 1. Check theme in localStorage
    const savedTheme = localStorage.getItem("theme");

    // 2. If found, use it; else default to light
    const isDark = savedTheme === "dark";

    setDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const applyTheme = (isDark) => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      applyTheme(newMode);
      return newMode;
    });
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            isLoggedIn ? (
              <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/dashboard/userProfile'
          element={isLoggedIn ? <UserProfile darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : <Navigate to='/' />}
        />
        <Route path='/verify2FA' element={<Verify2FA setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

      </Routes>
    </Router>
  );
}

export default App;
