import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';

const defaultTheme = createTheme();

function getStyles(name, personName, theme) {
  return {
    fontWeight:
        personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
  };
}

function CreateAsset() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [authors, setAuthors] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [link, setLink] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [dependenciesList, setDependenciesList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [langList, setLangList] = useState([]);
  const [dependencyDetails, setDependencyDetails] = useState({ detail1: '', detail2: '' });
  const [showDependencyDetails, setShowDependencyDetails] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssetTypes();
    fetchAuthors();
    fetchDependencies();
    fetchLanguages();
  }, []);

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/asset_types/refresh");
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

  const fetchLanguages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/languages/refresh");
      setLangList(response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  const handleDependenciesChange = (event) => {
    const { target: { value } } = event;
    setDependencies(typeof value === 'string' ? value.split(',') : value);
    setShowDependencyDetails(value.length > 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDependencies = dependencies.map(dep => ({
      name: dep,
      relationType: "dependsOn"
    }));

    try {
      await axios.post("http://localhost:8080/assets/createasset", {
        title,
        asset_description: description,
        link,
        asset_type: type,
        authors,
        dependencies: formattedDependencies,
        languages,
      });
      console.log("Asset created successfully");
      navigate("/assets");
    } catch (error) {
      console.error("Error creating asset:", error);
      alert("An error occurred while creating the asset");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
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
            Create Asset
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              <InputLabel id="type-label">Asset Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                input={<OutlinedInput label="Asset Type" />}
              >
                {assetTypes.map((assetType) => (
                  <MenuItem key={assetType.type_id} value={assetType.type_name}>
                    {assetType.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Multi-select for Authors */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="authors-label">Authors</InputLabel>
              <Select
                labelId="authors-label"
                id="authors"
                multiple
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                input={<OutlinedInput id="select-multiple-chip" label="Authors" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {authorsList.map((author) => (
                  <MenuItem
                    key={author.id}
                    value={author.user_name}
                    style={getStyles(author.user_name, authors, theme)}
                  >
                    {author.user_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Multi-select for Dependencies */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="dependencies-label">Dependencies</InputLabel>
              <Select
                labelId="dependencies-label"
                id="dependencies"
                multiple
                value={dependencies}
                onChange={handleDependenciesChange}
                input={<OutlinedInput id="select-multiple-chip" label="Dependencies" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {dependenciesList.map((dependency) => (
                  <MenuItem
                    key={dependency.asset_id}
                    value={dependency.title}
                    style={getStyles(dependency.title, dependencies, theme)}
                  >
                    {dependency.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {showDependencyDetails && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="dependency-detail1"
                  label="Dependency Detail 1"
                  name="dependencyDetail1"
                  value={dependencyDetails.detail1}
                  onChange={(e) => setDependencyDetails({ ...dependencyDetails, detail1: e.target.value })}
                  sx={{ mr: 1, width: '48%' }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="dependency-detail2"
                  label="Dependency Detail 2"
                  name="dependencyDetail2"
                  value={dependencyDetails.detail2}
                  onChange={(e) => setDependencyDetails({ ...dependencyDetails, detail2: e.target.value })}
                  sx={{ width: '48%' }}
                />
              </Box>
            )}
            {/* Multi-select for Languages */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="languages-label">Languages</InputLabel>
              <Select
                labelId="languages-label"
                id="languages"
                multiple
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                input={<OutlinedInput id="select-multiple-chip" label="Languages" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {langList.map((language) => (
                  <MenuItem
                    key={language.language_id}
                    value={language.language_name}
                    style={getStyles(language.language_name, languages, theme)}
                  >
                    {language.language_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CreateAsset;
