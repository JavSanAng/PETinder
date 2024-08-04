import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import "./login.css";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(userName, password);
        } catch (err) {
            setError("Login failed. Please try again.");
            console.error("Login error:", err);
        }
    };
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>PETinder.</h1>
                    <p>
                    "Descubre a tu mascota perfecta y encuentra amigos peludos para tu mejor amigo en Petinder. Conéctate, comparte y disfruta del amor incondicional. ¡Un mundo de posibilidades para ti y tu mascota!"
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userName">Username</label>
                        <input
                            type="text"
                            id="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
