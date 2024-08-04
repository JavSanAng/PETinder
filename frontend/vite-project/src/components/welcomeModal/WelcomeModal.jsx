

// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Typography, CircularProgress } from '@mui/material';
// import { makeRequest } from '../../context/axios';
// import backgroundImage from '../../assets/imageWelcomeModal.jpg';
// import './welcomeModal.css'; 

// const WelcomeModal = ({ open, handleClose }) => {
//     const [userName, setUserName] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchUserName = async () => {
//             try {
//                 const userId = localStorage.getItem('user_id');
//                 const token = localStorage.getItem('token');
//                 const response = await makeRequest.get(`/user/${userId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setUserName(response.data.user_name);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching user name:', error);
//                 setLoading(false);
//             }
//         };

//         if (open) {
//             fetchUserName();
//             const timer = setTimeout(() => {
//                 handleClose();
//             }, 8000); // 8000 ms = 8 seconds

//             return () => clearTimeout(timer);
//         }
//     }, [open, handleClose]);

//     return (
//         <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="welcome-modal-title"
//             aria-describedby="welcome-modal-description"
//         >
//             <Box className="welcome-modal-box" style={{ backgroundImage: `url(${backgroundImage})` }}>
//                 {loading ? (
//                     <CircularProgress />
//                 ) : (
//                     <>
//                         <Typography id="welcome-modal-title" className="welcome-modal-title">
//                             Welcome, {userName}!
//                         </Typography>
//                         <Typography id="welcome-modal-description" className="welcome-modal-description">
//                             We're glad to have you back at PETinder.
//                         </Typography>
//                     </>
//                 )}
//             </Box>
//         </Modal>
//     );
// };

// export default WelcomeModal;

import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, CircularProgress } from '@mui/material';
import { makeRequest } from '../../context/axios';
import backgroundImage from '../../assets/imageWelcomeModal.jpg';
import './welcomeModal.css'; 

const WelcomeModal = ({ open, handleClose }) => {
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const token = localStorage.getItem('token');
                const response = await makeRequest.get(`/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserName(response.data.user_name);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user name:', error);
                setLoading(false);
            }
        };

        if (open) {
            fetchUserName();
            const timer = setTimeout(() => {
                handleClose();
            }, 8000); 

            return () => clearTimeout(timer);
        }
    }, [open, handleClose]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="welcome-modal-title"
            aria-describedby="welcome-modal-description"
        >
            <Box className="welcome-modal-box" style={{ backgroundImage: `url(${backgroundImage})` }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Typography id="welcome-modal-title" className="welcome-modal-title">
                            WELCOME, {userName}!
                        </Typography>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default WelcomeModal;