

// import React from "react";
// import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import HomeIcon from "@mui/icons-material/Home";
// import PersonIcon from "@mui/icons-material/Person";
// import PetsIcon from "@mui/icons-material/Pets";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Icono para añadir post
// import { Link as RouterLink } from "react-router-dom";
// import LogOut from "../logout/LogOut";
// import "./navBar.css";

// const Navbar = () => {
//     return (
//         <AppBar position="fixed" className="navbar">
//             <Toolbar>
//                 <RouterLink to="/" className="navbar-link">
//                     <PetsIcon sx={{ fontSize: 38 }} />
//                 </RouterLink>
//                 <Box flexGrow={1} />
//                 <Box className="navbar-menu">
//                     <IconButton component={RouterLink} to="/" className="navbar-icon">
//                         <HomeIcon sx={{ fontSize: 28 }} />
//                     </IconButton>
//                     <IconButton component={RouterLink} to="/profile" className="navbar-icon">
//                         <PersonIcon sx={{ fontSize: 28 }} />
//                     </IconButton>
//                     <IconButton component={RouterLink} to="/pets" className="navbar-icon">
//                         <PetsIcon sx={{ fontSize: 28 }} />
//                     </IconButton>
//                     <IconButton component={RouterLink} to="/post" className="navbar-icon">
//                         <AddCircleOutlineIcon sx={{ fontSize: 28 }} />
//                     </IconButton>
//                     <IconButton className="navbar-icon">
//                         <LogOut />
//                     </IconButton>
//                 </Box>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default Navbar;

import React from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets';
import "./navBar.css";
import { Link as RouterLink } from "react-router-dom";
import LogOut from "../logout/LogOut";

const Navbar = () => {
    return (
        <AppBar position="fixed" className="navbar">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home">
                    <RouterLink to="/" className="navbar-link">
                        <PetsIcon fontSize="large" />
                    </RouterLink>
                </IconButton>
                <Box flexGrow={1} />
                <IconButton color="inherit" aria-label="home">
                    <RouterLink to="/home" className="navbar-link">
                        <HomeIcon fontSize="large" />
                    </RouterLink>
                </IconButton>
                <IconButton color="inherit" aria-label="profile">
                    <RouterLink to="/profile" className="navbar-link">
                        <AccountCircleIcon fontSize="large" />
                    </RouterLink>
                </IconButton>
                <IconButton color="inherit" aria-label="pets">
                    <RouterLink to="/pets" className="navbar-link">
                        <PetsIcon fontSize="large" />
                    </RouterLink>
                </IconButton>
                <LogOut />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;