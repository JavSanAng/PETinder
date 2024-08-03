import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import PetForm from "../../components/form/PetForm";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Grid, Card, CardContent, Typography, CardMedia, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import "./pet.css";

const Pet = () => {
    const [pets, setPets] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [editPetId, setEditPetId] = useState(null);
    const [editPetData, setEditPetData] = useState({ pet_name: '', city: '' });

    useEffect(() => {
        const fetchPets = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error("No token available");
                return;
            }

            try {
                const response = await makeRequest.get("/pets", {
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

        fetchPets();
    }, []);

    const handleEditClick = (pet) => {
        setEditPetId(pet.pet_id);
        setEditPetData({ pet_name: pet.pet_name, city: pet.city });
    };

    const handleSaveClick = async (petId) => {
        try {
            await makeRequest.put(`/pets/${petId}`, editPetData, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`,
                },
            });
            setPets((prevPets) =>
                prevPets.map((pet) => (pet.pet_id === petId ? { ...pet, ...editPetData } : pet))
            );
            setEditPetId(null);
        } catch (error) {
            console.error("Error updating pet:", error);
        }
    };

    const handleDeleteClick = async (petId) => {
        try {
            await makeRequest.delete(`/pets/${petId}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`,
                },
            });
            setPets((prevPets) => prevPets.filter((pet) => pet.pet_id !== petId));
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <Container className="pet-container">
            <Grid container spacing={4} className="pet-content">
                <Grid item xs={12}>
                    <PetForm />
                </Grid>
                <Grid item xs={12}>
                    <Carousel responsive={responsive} className="carousel-container">
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                                <Card key={pet.pet_id} className="carousel-card">
                                    <div className="icon-container">
                                        <IconButton
                                            className="delete-icon"
                                            onClick={() => handleDeleteClick(pet.pet_id)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                        <IconButton
                                            className="edit-icon"
                                            onClick={() => handleEditClick(pet)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                    <CardMedia
                                        component="img"
                                        className="carousel-image"
                                        image={pet.avatar || "default-avatar.png"}
                                        alt="Pet Avatar"
                                    />
                                    <CardContent className="carousel-details">
                                        {editPetId === pet.pet_id ? (
                                            <>
                                                <TextField
                                                    value={editPetData.pet_name}
                                                    onChange={(e) =>
                                                        setEditPetData({ ...editPetData, pet_name: e.target.value })
                                                    }
                                                    fullWidth
                                                    margin="normal"
                                                />
                                                <TextField
                                                    value={editPetData.city}
                                                    onChange={(e) =>
                                                        setEditPetData({ ...editPetData, city: e.target.value })
                                                    }
                                                    fullWidth
                                                    margin="normal"
                                                />
                                                <div className="edit-buttons">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleSaveClick(pet.pet_id)}
                                                    >
                                                        <SaveIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => setEditPetId(null)}
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Typography variant="h6" component="div" className="pet-name">
                                                    {pet.pet_name}
                                                </Typography>
                                                <Typography color="text.secondary" className="pet-city">
                                                    City: {pet.city}
                                                </Typography>
                                                <Typography color="text.secondary" className="pet-owner">
                                                    Owner: {pet.User?.user_name || "Unknown"}
                                                </Typography>
                                            </>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography variant="body1" component="p">
                                No pets found.
                            </Typography>
                        )}
                    </Carousel>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Pet;