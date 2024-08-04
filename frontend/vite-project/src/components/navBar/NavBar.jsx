

import React from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import "./navBar.css";
import { Link as RouterLink } from "react-router-dom";
import LogOut from "../logout/LogOut";
import logo from "../../assets/logo2.png";

const Navbar = () => {
    return (
        <AppBar position="fixed" className="navbar">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="logo">
                    <RouterLink to="/home" className="navbar-link">
                        <img src={logo} alt="PETinder Logo" className="logo-img" />
                    </RouterLink>
                </IconButton>
                <Box flexGrow={1} />
                <IconButton color="black" aria-label="profile">
                    <RouterLink to="/profile" className="navbar-link">
                        <AccountCircleIcon fontSize="large" />
                    </RouterLink>
                </IconButton>
                <IconButton color="black" aria-label="pets">
                    <RouterLink to="/pets" className="navbar-link">
                        <PetsIcon fontSize="large" />
                    </RouterLink>
                </IconButton>
                <IconButton color="black" aria-label="create post">
                    <RouterLink to="/create-post" className="navbar-link">
                        <AddIcon fontSize="large" />
                    </RouterLink>
                </IconButton>
                <LogOut />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;