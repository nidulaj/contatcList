import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Verify2FA from './pages/Verify2FA';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/dashboard'
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to='/' />
            )
          }
        />
        <Route
          path='/dashboard/userProfile'
          element={isLoggedIn ? <UserProfile /> : <Navigate to='/' />}
        />
        <Route path='/verify2FA' element={<Verify2FA setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
}

export default App;
