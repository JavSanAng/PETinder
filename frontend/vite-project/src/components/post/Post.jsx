
import React, { useState, useContext, useEffect } from "react";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./post.css";

const Post = ({ post }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        setImageUrl(data.message);
        setLoadingImage(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageError(true);
        setLoadingImage(false);
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        setProfilePicUrl(data.results[0].picture.large);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePic();
  }, []);

  const handleDelete = async () => {
    try {
      await makeRequest.delete(`/post/${post.post_id}`, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        },
        data: { pet_id: post.pet_id }
      });
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await makeRequest.put(`/post/${post.post_id}`, {
        content: editedContent,
        pet_id: post.pet_id
      }, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      });
      setIsEditing(false);
      post.content = editedContent; 
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(post.content);
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="user-info">
          <img
            src={profilePicUrl}
            alt="Profile"
            className="profile-pic"
          />
          <div className="user-details">
            <Link
              to={`/profile/${post.userId}`}
              className="user-name"
            >
              {post.Pet?.pet_name || "No pet name"}
            </Link>
            <span className="post-date">{moment(post.date).fromNow()}</span>
          </div>
        </div>
        <MoreHorizIcon className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
        {menuOpen && post.userId === currentUser.id && (
          <div className="menu">
            <button className="edit-button" onClick={handleEdit}>Edit</button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      <div className="post-content">
        {isEditing ? (
          <div>
            <textarea
              className="textarea"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="edit-buttons">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <p>{post.content}</p>
        )}
        {loadingImage && <p>Loading image...</p>}
        {imageError && <p>Error loading image</p>}
        {imageUrl && <img src={imageUrl} alt="Dog" className="post-image" />}
      </div>
    </div>
  );
};

export default Post;