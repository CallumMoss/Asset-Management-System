import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import {
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

//Imports

//Function to create new users:
function CreateUser({ userRole, username }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const theme = createTheme();


  //Function to handle use of submit button:
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/users/createuser/${username}`, {
        user_first_name: first_name,
        user_last_name: last_name,
        user_name: user_name,
        user_password: password,
        user_role: role,
      });
      console.log("User created successfully");
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar userRole={userRole} username={username} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create New User
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="given-name"
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
              autoComplete="family-name"
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
              autoComplete="username"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">User Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label="User Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="Viewer">Viewer</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create User
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateUser;