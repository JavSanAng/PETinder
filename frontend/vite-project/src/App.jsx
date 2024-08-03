// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/home/Home';
// import Login from './pages/login/Login';
// import Register from './pages/register/Register';
// import Pet from './pages/pet/Pet';
// import Profile from './pages/profile/Profile';

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/home" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/pets" element={<Pet />} />
//       <Route path="/profile" element={<Profile />} />

      
//     </Routes>
//   );
// };

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/navBar/NavBar";
// import Footer from "./components/footer/Footer";
// import Home from "./pages/home/Home";
// import Profile from "./pages/profile/Profile";
// import Login from "./pages/login/Login";
// import Register from './pages/register/Register';
// import Pet from './pages/pet/Pet';


// import "./App.css"; 

// const App = () => {
//     return (
//             <div className="app-container">
//                 <div className="content">
//                     <Routes>
//                         <Route path="/register" element={<Register />} />
//                         <Route path="/login" element={<Login />} />
//                         <Navbar />
//                         <Route path="/" element={<Home />} />
//                         <Route path="/profile" element={<Profile />} />
//                         <Route path="/pets" element={<Pet />} />
//                         <Footer />
//                     </Routes>
//                 </div>
//             </div>
//     );
// };

// export default App;

import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import Pet from './pages/pet/Pet';
import "./App.css";

const App = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

    return (
        <div className="app-container">
            {!isAuthPage && <Navbar />}
            <div className="content">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/pets" element={<Pet />} />
                </Routes>
            </div>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default App;