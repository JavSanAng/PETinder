import React, { useState, useContext } from "react";
import { TextField, Button, Container, Box, Snackbar } from "@mui/material";
import { makeRequest } from "../../context/axios";
import { AuthContext } from "../../context/authContext";
import MuiAlert from '@mui/material/Alert';
import "./petForm.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PetForm = () => {
    const [petName, setPetName] = useState("");
    const [city, setCity] = useState("");
    const { currentUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await makeRequest.post("/pets", {
                pet_name: petName,
                city: city,
            }, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`,
                },
            });
            setPetName("");
            setCity("");
            setAlertSeverity("success");
            setAlertMessage("Pet added successfully!");
        } catch (error) {
            console.error("Error adding pet:", error);
            setAlertSeverity("error");
            setAlertMessage("Failed to add pet.");
        } finally {
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Container maxWidth="md" className="pet-form-container">
            <Box component="form" onSubmit={handleSubmit} className="pet-form-horizontal">
                <TextField
                    label="Pet Name"
                    variant="outlined"
                    className="input-field"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    required
                />
                <TextField
                    label="City"
                    variant="outlined"
                    className="input-field"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="submit-button"
                >
                    Add Pet
                </Button>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertSeverity} className="snackbar-alert">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default PetForm;