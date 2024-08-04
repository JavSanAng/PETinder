import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import Pet from './pages/pet/Pet';
import CreatePost from './pages/createPost/CreatePost';
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
                    <Route path="/create-post" element={<CreatePost />} /> {/* Nueva ruta */}

                </Routes>
            </div>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default App;