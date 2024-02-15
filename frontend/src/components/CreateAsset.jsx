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

function CreateAsset() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [authors, setAuthors] = useState([]);
    const [dependencies, setDependencies] = useState([]);
    const [assetTypes, setAssetTypes] = useState([]);
    const [link, setLink] = useState(''); // have changed from []
    const [authorsList, setAuthorsList] = useState([]);
    const [dependenciesList, setDependenciesList] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [langList, setLangList] = useState([]);

    // These functions retrieve information from the database
    useEffect(() => {
        fetchAssetTypes();
    }, []);

    const fetchAssetTypes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/asset_types/refresh');
            setAssetTypes(response.data);
            console.log('Fetched asset types:', response.data);
        } catch (error) {
            console.error('Error fetching asset types:', error);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);
    
    const fetchAuthors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users/refresh');
            setAuthorsList(response.data);
            console.log('Fetched authors:', response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    useEffect(() => {
        fetchDependencies();
    }, []);
    
    const fetchDependencies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/assets/refresh');
            setDependenciesList(response.data);
            console.log('Fetched dependencies:', response.data);
        } catch (error) {
            console.error('Error fetching dependencies:', error);
        }
    };
    
    useEffect(() => {
        fetchLanguages();
    }, []);
    
    const fetchLanguages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/languages/refresh');
            setLangList(response.data);
            console.log('Fetched languages:', response.data);
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };
    

  const navigate = useNavigate();

    const handleSubmit = async (e) => { // this adds to the database
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/assets/createasset", {
                title: title,
                asset_description: description,
                link: link,
                languages: languages,
                asset_type: type,
                authors: authors,
                dependencies: dependencies
            });
            console.log("Asset created successfully");
            navigate('/assets');
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
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
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
                        <Typography component="h1" variant="h5">
                            Asset Type
                        </Typography>
                        <Select
                            id="type"
                            name="type"
                            autoComplete="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            {assetTypes.map(assetType => (
                                <MenuItem key={assetType.type_id} value={assetType.type_id}>
                                    {assetType.type_name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography component="h1" variant="h5">
                            Authors
                        </Typography>
                        <Select
                            id="authors"
                            name="authors"
                            autoComplete="authors"
                            multiple // allows multiple inputs
                            value={authors}
                            onChange={(e) => setAuthors(e.target.value)}
                        >
                            {authorsList.map(authors => (
                                <MenuItem key={authors.id} value={authors.id}>
                                    {authors.user_name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography component="h1" variant="h5">
                            Dependencies
                        </Typography>
                        <Select
                            id="dependencies"
                            name="dependencies"
                            autoComplete="dependencies"
                            multiple // allows multiple inputs
                            value={dependencies}
                            onChange={(e) => setDependencies(e.target.value)}
                        >
                            {dependenciesList.map(dependencies => (
                                <MenuItem key={dependencies.asset_id} value={dependencies.asset_id}>
                                    {dependencies.title}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography component="h1" variant="h5">
                            Languages
                        </Typography>
                        <Select
                            id="languages"
                            name="languages"
                            autoComplete="languages"
                            multiple // allows multiple inputs, as a project can have multiple languages
                            value={languages}
                            onChange={(e) => setLanguages(e.target.value)}
                        >
                            {langList.map(languages => (
                                <MenuItem key={languages.language_id} value={languages.language_id}>
                                    {languages.language_name}
                                </MenuItem>
                            ))}
                        </Select>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="link"
                            label="Link"
                            name="link"
                            autoComplete="link"
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
