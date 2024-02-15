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

function CreateUser() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState(''); // for now determined by admin, they input whatever they want.
    const [role, setRole] = useState(''); // one of 3 roles

    const navigate = useNavigate();

    const handleSubmit = async (e) => { // this adds to the database
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/users/createuser", {
                user_first_name: first_name, // name of variable in table : name of local variable
                user_last_name: last_name,
                user_name: user_name,
                user_password: password,
                user_role: role
            });
            console.log("User created successfully");
            navigate('/users');
        } catch (error) {
            console.error("Error creating user:", error);
            alert("An error occurred while creating the user");
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
                        Create Asset
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name" // what the user sees in the box
                            name="first_name"
                            autoFocus
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="user_name"
                            label="Username"
                            name="user_name"
                            value={user_name}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Typography component="h1" variant="h5">
                            User Role
                        </Typography>
                        <Select
                            id="role"
                            name="role"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{ marginTop: 2 }} // Add some spacing between the text field and the dropdown
                        >
                            <MenuItem value="" disabled>
                                Select a role
                            </MenuItem>
                            <MenuItem value="Viewer">Viewer</MenuItem>
                            <MenuItem value="User">User</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                        </Select>


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

export default CreateUser;
