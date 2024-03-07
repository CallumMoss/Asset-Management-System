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
import Navbar from "./Navbar";

// Additional imports for MUI components
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

// Create a default MUI theme
const defaultTheme = createTheme();

// Main component to change password
function ChangePassword({ username, userRole }) {
  // Hook to navigate between pages
  const navigate = useNavigate();

  // State variables to hold form data and error messages
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") setOldPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmNewPassword") setConfirmNewPassword(value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call login API to verify old password
      const response = await axios.post("http://localhost:8080/users/login", {
        user_name: username,
        user_password: oldPassword,
      });

      // If old password is correct, proceed to change password
      if (response.data.authenticated === true) {
        // Call API to reset password
        await axios.post("http://localhost:8080/users/reset-password", {
          userName: username,
          newPassword: newPassword,
        });

        // Show success message and navigate to dashboard
        alert("Password successfully changed!");
        navigate("/dashboard");
      } else {
        // Show error message if old password is incorrect
        alert("Incorrect password!");
      }
    } catch (error) {
      // Handle any errors that occur during login or password change
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // Reset form fields and error message
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
  };

  // Render the component
  return (
    <ThemeProvider theme={defaultTheme}>
      {/* Render Navbar component with userRole and username props */}
      <Navbar userRole={userRole} username={username} />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
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
          {/* Password change form */}
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
              autoFocus
              value={oldPassword}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              name="newPassword"
              autoFocus
              value={newPassword}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmNewPassword"
              label="Confirm New Password"
              name="confirmNewPassword"
              autoFocus
              value={confirmNewPassword}
              onChange={handleChange}
            />

            {/* Submit button */}
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

// Export the component
export default ChangePassword;
