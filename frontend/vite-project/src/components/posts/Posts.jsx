import React, { useEffect, useState, useContext } from 'react';
import Post from "../post/Post";
import { makeRequest } from '../../context/axios';
import { AuthContext } from '../../context/authContext';
import "./posts.css";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await makeRequest.get('/post', {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`
                    },
                    params: {
                        userId: currentUser?.userId 
                    }
                });
                setPosts(res.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, [currentUser]);

    return (
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.post_id} />
            ))}
        </div>
    );
};

export default Posts;
