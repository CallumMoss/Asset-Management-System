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
import Navbar from "../navigation/Navbar";
//Imports

const defaultTheme = createTheme();

//Function to change user's password:
function ChangePassword({ username, userRole }) {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };

  //Function to submit change:
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        user_name: username,
        user_password: oldPassword,
      });

      if (response.data.authenticated === true) {
        await axios.post("http://localhost:8080/users/reset-password", {
          userName: username,
          newPassword: newPassword,
        });

        alert("Password succesfully changed!");

        navigate("/dashboard");
      } else {
        // Login failed
        alert("Incorrect password!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Reset form fields
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
  };

  return (
    //Return wanted format of change password page.
    <ThemeProvider theme={defaultTheme}>
      {/*Calls navbar component from navigation to display navbar.*/}
      <Navbar userRole={userRole} username={username} />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {/*Format for fill-in boxes*/}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="oldPassword"
              label="Old Password"
              name="oldPassword"
              type="password"
              autoFocus
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              type="password"
              autoFocus
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmNewPassword"
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              autoFocus
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {/*Submit button*/}
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
export default ChangePassword;