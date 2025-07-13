import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Register from './pages/register';
import Login from './pages/Login'
import Dashboard from './pages/Dashboard';


//import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <Router>
      <Routes>
        <Route path='/' element= {<Login setIsLoggedIn = {setIsLoggedIn} />} />
        <Route path='/register' element= {<Register />} />
        <Route path='/dashboard' element= {isLoggedIn ? <Dashboard  /> : <Navigate to = '/' />} />
      </Routes>
    </Router>
  )
}

export default App
