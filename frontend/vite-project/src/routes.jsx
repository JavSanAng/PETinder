import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Pet from './pages/pet/Pet';
import Profile from './pages/profile/Profile';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pets" element={<Pet />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
