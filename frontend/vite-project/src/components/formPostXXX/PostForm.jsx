import React, { useState, useContext } from "react";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import "./postForm.css";

const CreatePostForm = ({ onPostCreated }) => {
    const { currentUser } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const petId = 1; // You may want to set this dynamically

            await makeRequest.post("/post", {
                content,
                pet_id: petId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLoading(false);
            setContent("");
            setError("");
            onPostCreated(); 
        } catch (err) {
            setLoading(false);
            setError("Error creating post. Please try again.");
        }
    };

    return (
        <Box className="create-post-form" component="form" onSubmit={handleSubmit}>
            <Typography variant="h5" className="form-title">Create a New Post</Typography>
            <TextField
                label="Post Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-textarea"
            />
            {error && <Typography color="error" className="form-error">{error}</Typography>}
            <Box className="form-actions">
                <Button type="submit" variant="contained" color="primary" disabled={loading} className="submit-button">
                    {loading ? <CircularProgress size={24} /> : "Post"}
                </Button>
            </Box>
        </Box>
    );
};

export default CreatePostForm;