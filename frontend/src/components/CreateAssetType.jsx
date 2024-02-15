import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";


const defaultTheme = createTheme(); // can be used to create a default theme

function CreateAssetType() {
    const [typeName, setTypeName] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => { // this adds to the database
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/asset_types/create", {
                type_name: typeName, // name of variable in table : name of local variable
                description: description,
            });
            console.log("Asset Type created successfully");
            navigate('/asset_types');
        } catch (error) {
            console.error("Error creating asset type:", error);
            alert("An error occurred while creating the asset type");
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h5">
                        Create Asset Type
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="typeName"
                            label="Type Name"
                            name="typeName"
                            autoFocus
                            value={typeName}
                            onChange={(e) => setTypeName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CreateAssetType;
