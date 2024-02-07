import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Assets({ username, userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here, considering the selected filter
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log("Filtering by:", e.target.value);
    // You can also add logic here to filter the displayed assets based on the selected filter
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <Link to="/">Log Out</Link>
          <Link to="/dashboard">Dashboard</Link>
          {userRole === "Admin" || userRole === "User" ? (
            <>
              <Link to="/assets">Assets</Link>
              {userRole === "Admin" ? <Link to="/admin">Admin</Link> : null}
            </>
          ) : null}
        </nav>
        <div className="login-info">
          <span>Welcome, {username}</span> <span>Role: {userRole}</span>
        </div>
      </header>

      <main>
        <section className="assets-container">
          <h1>Asset Management</h1>

          <div className="search-and-filter">
            <input
              type="text"
              id="assetSearchInput"
              placeholder="Search assets..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              id="assetSearchBtn"
              className="search-btn"
              onClick={handleSearch}>
              Search
            </button>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="filter-dropdown">
              <option value="">Filter</option>
              <option value="type">Type</option>
              <option value="date">Date</option>
              <option value="author">Author</option>
              <option value="title">Title</option>
            </select>
          </div>

          <Link to="/create-asset">
            <button id="createAssetBtn">Create New Asset</button>
          </Link>

          <div className="assets-list">{/* Assets list rendering */ }</div>
        </section>
      </main>

      <footer>{/* Footer content */ }</footer>
    </div>
  );
}

export default Assets;


/*import React, { useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';

function Assets({ username, userRole }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assetType, setAssetType] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [author, setAuthor] = useState('');
  const [link, setLink] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log('Filtering by:', e.target.value);
  };

  const handleCreateAsset = (e) => {
    e.preventDefault();
    const newAsset = { title, description, type: assetType, dateCreated, author, link };
    console.log('Creating asset:', newAsset);
    // Here, send the newAsset object to your backend API
    // Reset form fields after submission
    setTitle('');
    setDescription('');
    setAssetType('');
    setDateCreated('');
    setAuthor('');
    setLink('');
  };

  return (
      <div>
        <header>
          <nav className="navbar">
            <Link to="/">Log Out</Link>
            <Link to="/dashboard">Dashboard</Link>
            {userRole === "Admin" || userRole === "User" ? (
                <>
                  <Link to="/assets" className="active">Assets</Link>
                  {userRole === "Admin" ? <Link to="/admin">Admin</Link> : null}
                </>
            ) : null}
          </nav>
          <div className="login-info">
            <span>Welcome, {username}</span> | <span>Role: {userRole}</span>
          </div>
        </header>

        <main>
          <section className="assets-container">
            <h1>Asset Management</h1>
            <div className="search-and-filter">
              <TextField
                  type="text"
                  id="assetSearchInput"
                  placeholder="Search assets..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                  id="assetSearchBtn"
                  className="search-btn"
                  onClick={handleSearch}>
                Search
              </Button>
              <TextField
                  select
                  SelectProps={{ native: true }}
                  value={filter}
                  onChange={handleFilterChange}
                  className="filter-dropdown"
                  helperText="Filter By"
              >
                <option value="">None</option>
                <option value="type">Type</option>
                <option value="date">Date</option>
                <option value="author">Author</option>
                <option value="title">Title</option>
              </TextField>
            </div>

            <form onSubmit={handleCreateAsset} className="create-asset-form">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Description" multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Type of Asset" value={assetType} onChange={(e) => setAssetType(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth type="date" label="Date Created" InputLabelProps={{ shrink: true }} value={dateCreated} onChange={(e) => setDateCreated(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Link to Asset" value={link} onChange={(e) => setLink(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">Create Asset</Button>
                </Grid>
              </Grid>
            </form>
          </section>
        </main>
      </div>
  );
}

export default Assets;

*/