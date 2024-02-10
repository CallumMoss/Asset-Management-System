import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";

const defaultTheme = createTheme();

function CreateAsset() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [author, setAuthor] = useState('');
    const [link, setLink] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        try{
        e.preventDefault();
        await.axios.post("http://localhost:8080/assets/createasset", {
            title: title,
            asset_description: description,
        })
        console.log({ title, description, type, dateCreated, author, link });
        navigate('/assets');
        }
        catch(error){
            console.error("Assert creation failed: ", error);
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="type"
                            label="Type"
                            name="type"
                            autoComplete="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="dateCreated"
                            label="Date Created"
                            type="date"
                            name="dateCreated"
                            autoComplete="dateCreated"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={dateCreated}
                            onChange={(e) => setDateCreated(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="author"
                            label="Author"
                            name="author"
                            autoComplete="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="link"
                            label="Link to the asset"
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
