import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import { Card, CardContent, Typography, Avatar, Grid, Container, Box, CircularProgress } from "@mui/material";
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

            console.log('userId:', userId); // Debugging
            console.log('token:', token); // Debugging

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
                console.log('response.data:', response.data); // Debugging
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

                setPets(petsWithImages);
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
                <Box display="flex" alignItems="center" p={2}>
                    <Avatar alt={user.user_name} src={profilePic} className="profile-avatar-large" />
                    <Box ml={2}>
                        <Typography variant="h5">{user.user_name}</Typography>
                    </Box>
                </Box>
                <CardContent>
                    <Typography variant="h6">Pets:</Typography>
                    <Grid container spacing={2}>
                        {pets.map((pet) => (
                            <Grid item xs={12} sm={6} md={4} key={pet.pet_id}>
                                <Card className="pet-card">
                                    <CardContent>
                                        <Avatar alt={pet.pet_name} src={pet.avatar} className="pet-avatar" />
                                        <Typography variant="h6">{pet.pet_name}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Profile;