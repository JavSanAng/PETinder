import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import Post from "../post/Post"; 
import { CircularProgress, Container, Typography } from "@mui/material";
import "./userPosts.css";

const UserPosts = ({ userId }) => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await makeRequest.get(`/posts?userId=${userId}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`,
                    },
                });
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user posts:", error);
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [userId, currentUser]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container className="user-posts-container">
            <Typography variant="h5" className="user-posts-title">User Posts</Typography>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.post_id} post={post} />
                ))
            ) : (
                <Typography>No posts found.</Typography>
            )}
        </Container>
    );
};

export default UserPosts;