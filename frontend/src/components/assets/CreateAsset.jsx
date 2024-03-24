import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import Navbar from "../navigation/Navbar";

const defaultTheme = createTheme();

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CreateAsset({ username, userRole }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [authors, setAuthors] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [link, setLink] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [dependenciesList, setDependenciesList] = useState([]);
  // Updated to handle multiple dependencies and their specific details
  const [dependencyDetails, setDependencyDetails] = useState([]);
  // New State to store asset type attributes
  const [assetTypeAttributes, setAssetTypeAttributes] = useState([]);
  // New State to store asset attribute values
  const [assetAttributeValues, setAssetAttributeValues] = useState({});

  const theme = useTheme();
  const navigate = useNavigate();

  // Fetchs data from server on the component mount
  useEffect(() => {
    fetchAssetTypes();
    fetchAuthors();
    fetchDependencies();
  }, []);

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/asset_types/refresh"
      );
      setAssetTypes(response.data);
    } catch (error) {
      console.error("Error fetching asset types:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/refresh");
      setAuthorsList(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchDependencies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/assets/refresh");
      setDependenciesList(response.data);
    } catch (error) {
      console.error("Error fetching dependencies:", error);
    }
  };
  const fetchAssetTypeAttributes = async (typeId) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/asset_types/attributesByType`,
        { type_id: typeId }
      );
      console.log(response);
      // Split the string into an array, and remove any 'null' or empty values
      const attributes = response.data
        .filter((attr) => attr && attr.trim().toLowerCase() !== "null");
      setAssetTypeAttributes(attributes);
      // Initialize an empty value for each attribute
      const newAttributeValues = attributes.reduce((acc, attr) => {
        acc[attr.trim()] = ""; // Trim the attribute and use it as a key
        return acc;
      }, {});
      setAssetAttributeValues(newAttributeValues);
    } catch (error) {
      console.error("Error fetching asset type attributes:", error);
    }
  };

  const handleDependenciesChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedDependencies =
      typeof value === "string" ? value.split(",") : value;
    setDependencies(selectedDependencies);
    // Prepare dependency details for new selection
    const newDependencyDetails = selectedDependencies.map((dep) => {
      const existingDetail = dependencyDetails.find(
        (detail) => detail.name === dep
      );
      return existingDetail || { name: dep, relationType: "" };
    });
    setDependencyDetails(newDependencyDetails);
  };

  const handleDependencyDetailChange = (name, relationType) => {
    setDependencyDetails((current) =>
      current.map((dep) => (dep.name === name ? { ...dep, relationType } : dep))
    );
  };

  const handleTypeChange = async (event) => {
    // Set the type state to the asset type's name
    const selectedTypeName = event.target.value;
    setType(selectedTypeName);

    // Find the selected type_id from assetTypes state using the selected type name
    const selectedType = assetTypes.find(
      (t) => t.type_name === selectedTypeName
    );
    if (selectedType) {
      await fetchAssetTypeAttributes(selectedType.type_id);
    }
  };

  const handleAttributeChange = (index, value) => {
    const attributeName = `typeAttributeValue${index + 1}`; // +1 because index is 0-based and we want 1-based
    setAssetAttributeValues((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the new payload format expected by the backend
    const payload = {
      title,
      asset_description: description,
      link,
      asset_type: type,
      authors,
      dependencies: dependencyDetails.map((dep) => ({
        name: dep.name,
        relationType: dep.relationType,
      })),
      typeAttributeValue1: assetAttributeValues["typeAttributeValue1"] || "",
      typeAttributeValue2: assetAttributeValues["typeAttributeValue2"] || "",
      typeAttributeValue3: assetAttributeValues["typeAttributeValue3"] || "",
    };

    try {
      await axios.post(
        `http://localhost:8080/assets/createasset/${username}`,
        payload
      );
      console.log("Asset created successfully");
      navigate("/assets");
    } catch (error) {
      console.error("Error creating asset:", error);
      alert("An error occurred while creating the asset");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Create Asset
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
              id="title"
              label="Title"
              name="title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="type-label">Asset Type *</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                value={type}
                onChange={handleTypeChange}
                input={<OutlinedInput label="Asset Type" />}>
                {assetTypes.map((assetType) => (
                  <MenuItem key={assetType.type_id} value={assetType.type_name}>
                    {assetType.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {assetTypeAttributes.map(
              (attributeName, index) =>
                attributeName.trim().toLowerCase() !== "null" && (
                  <TextField
                    key={index}
                    margin="normal"
                    required
                    fullWidth
                    label={attributeName}
                    value={
                      assetAttributeValues[`typeAttributeValue${index + 1}`] ||
                      ""
                    }
                    onChange={(e) =>
                      handleAttributeChange(index, e.target.value)
                    }
                  />
                )
            )}

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="authors-label">Authors</InputLabel>
              <Select
                labelId="authors-label"
                id="authors"
                multiple
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Authors" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}>
                {authorsList.map((author) => (
                  <MenuItem
                    key={author.id}
                    value={author.user_name}
                    style={getStyles(author.user_name, authors, theme)}>
                    {author.user_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="dependencies-label">Dependencies</InputLabel>
              <Select
                labelId="dependencies-label"
                id="dependencies"
                multiple
                value={dependencies}
                onChange={handleDependenciesChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Dependencies"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}>
                {dependenciesList.map((dependency) => (
                  <MenuItem
                    key={dependency.asset_id}
                    value={dependency.title}
                    style={getStyles(dependency.title, dependencies, theme)}>
                    {dependency.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {dependencyDetails.map((dep, index) => (
              <TextField
                key={index}
                margin="normal"
                required
                fullWidth
                label={`Relationship for ${dep.name}`}
                value={dep.relationType}
                onChange={(e) =>
                  handleDependencyDetailChange(dep.name, e.target.value)
                }
                sx={{ mt: 2 }}
              />
            ))}
            <TextField
              margin="normal"
              required
              fullWidth
              id="link"
              label="Link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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

export default CreateAsset;
