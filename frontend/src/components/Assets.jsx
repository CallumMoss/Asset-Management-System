import React, { useState } from "react";
import "./style.css"; // Importing component-specific styles
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

function Assets({ username, userRole }) {
  // State for search term and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  // Function to handle search
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here, considering the selected filter
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log("Filtering by:", e.target.value);
    // You can also add logic here to filter the displayed assets based on the selected filter
  };

  return (
    <div>
      {/* Header section */}
      <header>
        <nav className="navbar">
          <Link to="/dashboard">Dashboard</Link> {/* Dashboard link */}
          {/* Conditional rendering of Assets and Admin links based on userRole */}
          {userRole === "Admin" || userRole === "User" ? (
            <>
              <Link to="/assets">Assets</Link> {/* Assets link */}
              {userRole === "Admin" ? <Link to="/admin">Admin</Link> : null} {/* Admin link (visible only for Admin) */}
            </>
          ) : null}
        </nav>
      </header>

      {/* Main content section */}
      <main>
        <section className="assets-container">
          <h1>Asset Management</h1> {/* Heading for asset management */}
          
          {/* Search and filter section */}
          <div className="search-and-filter">
            {/* Search input field */}
            <input
              type="text"
              id="assetSearchInput"
              placeholder="Search assets..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Button to trigger search */}
            <button
              id="assetSearchBtn"
              className="search-btn"
              onClick={handleSearch}>
              Search
            </button>
            {/* Dropdown for filter selection */}
            <select
              value={filter}
              onChange={handleFilterChange}
              className="filter-dropdown">
              <option value="">Filter</option> {/* Default option */}
              <option value="type">Type</option> {/* Filter by type */}
              <option value="date">Date</option> {/* Filter by date */}
              <option value="author">Author</option> {/* Filter by author */}
              <option value="title">Title</option> {/* Filter by title */}
            </select>
          </div>

          {/* Button to create a new asset */}
          <button id="createAssetBtn">Create New Asset</button>

          <div className="assets-list">{/* Assets list rendering */}</div> {/* Rendering of assets list */}
        </section>
      </main>

      <footer>{/* Footer content */}</footer> {/* Footer section */}
    </div>
  );
}

export default Assets;
