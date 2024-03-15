import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../navigation/Navbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function CreateAsset({ userRole, username }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [author, setAuthor] = useState('');
  const [dependency, setDependency] = useState('');
  const [language, setLanguage] = useState('');
  const [link, setLink] = useState('');
  const [assetTypes, setAssetTypes] = useState([]);
  const [authorsList, setAuthorsList] = useState([]);
  const [dependenciesList, setDependenciesList] = useState([]);
  const [langList, setLangList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetTypesRes, authorsRes, dependenciesRes, languagesRes] = await Promise.all([
          axios.get('http://localhost:8080/asset_types/refresh'),
          axios.get('http://localhost:8080/users/refresh'),
          axios.get('http://localhost:8080/assets/refresh'),
          axios.get('http://localhost:8080/languages/refresh'),
        ]);
        setAssetTypes(assetTypesRes.data);
        setAuthorsList(authorsRes.data.map(a => ({ id: a.id, name: a.user_name })));
        setDependenciesList(dependenciesRes.data.map(d => ({ id: d.id, title: d.title })));
        setLangList(languagesRes.data.map(l => ({ id: l.id, name: l.language_name })));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/assets/createasset', {
        title,
        asset_description: description,
        link,
        asset_type: type,
        authors: author ? [author] : [],
        dependencies: dependency ? [dependency] : [],
        languages: language ? [language] : [],
      });
      navigate('/assets');
    } catch (error) {
      console.error('Error creating asset:', error);
      alert('An error occurred while creating the asset');
    }
  };

  return (
    <>
      <Navbar userRole={userRole} username={username} />
      <Container component="main" maxWidth="sm">
        <Box sx={{ marginTop: 0.9, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              onChange={e => setTitle(e.target.value)}
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
              onChange={e => setDescription(e.target.value)}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="type-label">Asset Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                value={type}
                onChange={e => setType(e.target.value)}
                label="Asset Type"
              >
                <MenuItem value="">Select an asset type</MenuItem>
                {assetTypes.map(type => (
                  <MenuItem key={type.type_id} value={type.type_name}>
                    {type.type_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="author-label">Author</InputLabel>
              <Select
                labelId="author-label"
                id="author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                label="Author"
              >
                <MenuItem value="">Select an author</MenuItem>
                {authorsList.map(author => (
                  <MenuItem key={author.id} value={author.id}>
                    {author.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="dependency-label">Dependency</InputLabel>
              <Select
                labelId="dependency-label"
                id="dependency"
                value={dependency}
                onChange={e => setDependency(e.target.value)}
                label="Dependency"
              >
                <MenuItem value="">Select a dependency</MenuItem>
                {dependenciesList.map(dependency => (
                  <MenuItem key={dependency.id} value={dependency.id}>
                    {dependency.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="language-label">Language</InputLabel>
              <Select
                labelId="language-label"
                id="language"
                value={language}
                onChange={e => setLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem value="">Select a language</MenuItem>
                {langList.map(language => (
                  <MenuItem key={language.id} value={language.id}>
                    {language.name}
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
              onChange={e => setLink(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CreateAsset;
