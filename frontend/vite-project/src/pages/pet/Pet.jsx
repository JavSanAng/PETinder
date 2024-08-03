// import React, { useState, useEffect, useContext } from "react";
// import { makeRequest } from "../../context/axios";
// import { AuthContext } from "../../context/authContext";
// import PetForm from "../../components/form/PetForm";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { Container, Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
// import "./pet.css";

// const Pet = () => {
//     const [pets, setPets] = useState([]);
//     const { currentUser } = useContext(AuthContext);

//     useEffect(() => {
//         const fetchPets = async () => {
//             if (!currentUser?.token) {
//                 console.error("No token available");
//                 return;
//             }

//             try {
//                 const response = await makeRequest.get("/pets", {
//                     headers: {
//                         Authorization: `Bearer ${currentUser.token}`,
//                     },
//                 });

//                 const petsWithImages = await Promise.all(
//                     response.data.map(async (pet) => {
//                         const imageResponse = await fetch("https://dog.ceo/api/breeds/image/random");
//                         const imageData = await imageResponse.json();
//                         return { ...pet, avatar: imageData.message };
//                     })
//                 );

//                 setPets(petsWithImages);
//             } catch (error) {
//                 console.error("Error fetching pets:", error);
//             }
//         };

//         fetchPets();
//     }, [currentUser]);

//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 5
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 3
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 2
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1
//         }
//     };

//     return (
//         <Container className="pet-container">
//             <Grid container spacing={4} className="pet-content">
//                 <Grid item xs={12}>
//                     <PetForm />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Carousel responsive={responsive} className="carousel-container">
//                         {pets.length > 0 ? (
//                             pets.map((pet) => (
//                                 <Card key={pet.pet_id} className="carousel-card">
//                                     <CardMedia
//                                         component="img"
//                                         className="carousel-image"
//                                         image={pet.avatar || "default-avatar.png"}
//                                         alt="Pet Avatar"
//                                     />
//                                     <CardContent className="carousel-details">
//                                         <Typography variant="h6" component="div" className="pet-name">
//                                             {pet.pet_name}
//                                         </Typography>
//                                         <Typography color="text.secondary" className="pet-city">
//                                             City: {pet.city}
//                                         </Typography>
//                                         <Typography color="text.secondary" className="pet-owner">
//                                             Owner: {pet.User?.user_name || 'Unknown'}
//                                         </Typography>
//                                     </CardContent>
//                                 </Card>
//                             ))
//                         ) : (
//                             <Typography variant="body1" component="p">
//                                 No pets found.
//                             </Typography>
//                         )}
//                     </Carousel>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Pet;

import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import PetForm from "../../components/form/PetForm";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import "./pet.css";

const Pet = () => {
    const [pets, setPets] = useState([]);
    const { currentUser } = useContext(AuthContext);

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

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
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
                                    <CardMedia
                                        component="img"
                                        className="carousel-image"
                                        image={pet.avatar || "default-avatar.png"}
                                        alt="Pet Avatar"
                                    />
                                    <CardContent className="carousel-details">
                                        <Typography variant="h6" component="div" className="pet-name">
                                            {pet.pet_name}
                                        </Typography>
                                        <Typography color="text.secondary" className="pet-city">
                                            City: {pet.city}
                                        </Typography>
                                        <Typography color="text.secondary" className="pet-owner">
                                            Owner: {pet.User?.user_name || 'Unknown'}
                                        </Typography>
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