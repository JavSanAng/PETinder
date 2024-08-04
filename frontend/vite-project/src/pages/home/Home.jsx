
import React, { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import WelcomeModal from "../../components/welcomeModal/WelcomeModal";
import "./home.css";

const Home = () => {
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (userId) {
            setShowWelcomeModal(true);
        }
    }, []);

    const handleCloseWelcomeModal = () => {
        setShowWelcomeModal(false);
    };

    return (
        <div className="home">
            <Posts />
            <WelcomeModal
                open={showWelcomeModal}
                handleClose={handleCloseWelcomeModal}
            />
        </div>
    );
};

export default Home;