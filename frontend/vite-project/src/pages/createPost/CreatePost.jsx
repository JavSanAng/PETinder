
import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { makeRequest } from '../../context/axios';
import { AuthContext } from '../../context/authContext';
import './createPost.css';

const CreatePost = () => {
    const { currentUser } = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [petId, setPetId] = useState('');
    const [pets, setPets] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPets = async () => {
            const userId = localStorage.getItem('user_id');
            const token = localStorage.getItem('token');

            if (!userId || !token) {
                console.error("User ID or token not found");
                return;
            }

            try {
                const response = await makeRequest.get(`/pets?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPets(response.data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fetchPets();
    }, []);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch("https://dog.ceo/api/breeds/image/random");
                const data = await response.json();
                setImageUrl(data.message);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching image:', error);
                setLoading(false);
            }
        };

        fetchImage();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!content || !petId) {
            setError('Content and pet ID are required');
            return;
        }

        try {
            await makeRequest.post('/post', { content, pet_id: petId, image: imageUrl }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setContent('');
            setPetId('');
            setImageUrl('');
            setError('');
        } catch (error) {
            console.error('Error creating post:', error);
            setError('Error creating post');
        }
    };

    return (
        <Box className="create-post-container">
            <Card className="create-post-card">
                <CardContent>
                    <Typography variant="h5" component="div" className="create-post-title">
                    CREATE POST
                    </Typography>
                    <form onSubmit={handleSubmit} className="create-post-form">
                        <TextField
                            label=" Content "
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="create-post-textfield"
                            required
                        />
                        <FormControl variant="outlined" fullWidth className="create-post-select" required>
                            <InputLabel id="select-pet-label">Select Pet</InputLabel>
                            <Select
                                labelId="select-pet-label"
                                value={petId}
                                onChange={(e) => setPetId(e.target.value)}
                                label="Select Pet"
                            >
                                {pets.map((pet) => (
                                    <MenuItem key={pet.pet_id} value={pet.pet_id}>
                                        {pet.pet_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <img src={imageUrl} alt="Photo" className="create-post-image" />
                        )}
                        {error && <Typography color="error">{error}</Typography>}
                        <Button variant="contained" color="primary" type="submit" className="create-post-button">
                            Add
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CreatePost;