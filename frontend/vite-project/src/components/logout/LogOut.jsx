import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./logOut.css";

const LogOut = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        if (typeof setCurrentUser === 'function') {
            setCurrentUser(null);
        }
        navigate("/login");
    };

    return (
        <Button
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            className="logout-button"
        >
            Logout
        </Button>
    );
};
export default LogOut ;