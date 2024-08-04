
import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import { Card, CardContent, Typography, Avatar, Grid, Container, Box, CircularProgress } from "@mui/material";
import UserPosts from "../../components/userPost/UserPosts";  
import "./profile.css";

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [pets, setPets] = useState([]);
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const response = await fetch("https://randomuser.me/api/");
                const data = await response.json();
                setProfilePic(data.results[0].picture.large);
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        };

        const fetchUser = async () => {
            const userId = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');

            if (!userId) {
                console.error("No user ID available");
                return;
            }

            try {
                const response = await makeRequest.get(`/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        const fetchPets = async () => {
            const userId = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');

            try {
                const response = await makeRequest.get(`/pets?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const petsWithImages = await Promise.all(
                    response.data.map(async (pet) => {
                        const imageResponse = await fetch("https://dog.ceo/api/breeds/image/random");
                        const imageData = await imageResponse.json();
                        return { ...pet, avatar: imageData.message };
                    })
                );

                // Filtrar las mascotas con el nombre "No pet name"
                const filteredPets = petsWithImages.filter(pet => pet.pet_name !== "No pet name");
                setPets(filteredPets);
            } catch (error) {
                console.error("Error fetching pets:", error);
            }
        };

        fetchProfilePic();
        fetchUser();
        fetchPets();
    }, [currentUser]);

    if (!user) {
        return <div><CircularProgress /></div>;
    }

    return (
        <Container className="profile-container">
            <Card className="profile-card">
                <Box display="flex" alignItems="center" flexDirection="column" p={2}>
                    <Avatar alt={user.user_name} src={profilePic} className="profile-avatar-large" />
                    <Box mt={2}>
                        <Typography variant="h5">{user.user_name}</Typography>
                    </Box>
                </Box>
                <CardContent className="pets-container">
                    <Typography variant="h6">Pets:</Typography>
                    <Grid container spacing={2}>
                        {pets.map((pet) => (
                            <Grid item xs={6} sm={4} md={3} key={pet.pet_id}>
                                <Card className="pet-card">
                                    <CardContent className="pet-content">
                                        <Avatar alt={pet.pet_name} src={pet.avatar} className="pet-avatar" />
                                        <Typography variant="subtitle1" className="pet-name">{pet.pet_name}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
            <UserPosts userId={user.user_id} /> 
        </Container>
    );
};

export default Profile;