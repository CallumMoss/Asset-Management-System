import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//Imports

const defaultTheme = createTheme();

//Function to allow Create AssetType:
function CreateAssetType({ userRole, username }) {
  const navigate = useNavigate();
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  // Initialize with null for optional attributes.
  const [attribute1, setAttribute1] = useState("");
  const [attribute2, setAttribute2] = useState("");
  const [attribute3, setAttribute3] = useState("");

  //Function to submit data:
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Function to send data to table when AssetType created:
    const dataToSend = {
      type_name: typeName,
      description,
      // Only add attribute keys if they have been provided.
      ...(attribute1 && { typeAttribute1: attribute1 }),
      ...(attribute2 && { typeAttribute2: attribute2 }),
      ...(attribute3 && { typeAttribute3: attribute3 }),
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/asset_types/create/${username}`,
        dataToSend
      );
      console.log("Asset Type created successfully", response);
      navigate("/admin/asset-types");
    } catch (error) {
      console.error("Error creating asset type:", error);
      alert("An error occurred while creating the asset type");
    }
  };

  // A function to determine if we should show the next attribute field.
  const shouldShowAttribute = (index) => {
    if (index === 1) return true; // Always show the first attribute
    if (index === 2) return attribute1; // Show the second if the first is filled
    if (index === 3) return attribute2; // Show the third if the second is filled
  };

  return (
    //Return of wanted format for Create AssetType page:
    <ThemeProvider theme={defaultTheme}>
      <Navbar userRole={userRole} username={username} />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {/*Formatting values of form:*/}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          {/*Page title*/}
          <Typography component="h1" variant="h5">
            Create Asset Type
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}>
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
            {shouldShowAttribute(1) && (
              <TextField
                margin="normal"
                fullWidth
                id="typeAttribute1"
                label="Attribute 1"
                name="typeAttribute1"
                value={attribute1}
                onChange={(e) => setAttribute1(e.target.value)}
              />
            )}
            {shouldShowAttribute(2) && (
              <TextField
                margin="normal"
                fullWidth
                id="typeAttribute2"
                label="Attribute 2"
                name="typeAttribute2"
                value={attribute2}
                onChange={(e) => setAttribute2(e.target.value)}
              />
            )}
            {shouldShowAttribute(3) && (
              <TextField
                margin="normal"
                fullWidth
                id="typeAttribute3"
                label="Attribute 3"
                name="typeAttribute3"
                value={attribute3}
                onChange={(e) => setAttribute3(e.target.value)}
              />
            )}
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
export default CreateAssetType;