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

          <div className="assets-list">{/* Assets list rendering */  }</div>
        </section>
      </main>

      <footer>{/* Footer content */  }</footer>
    </div>
  );
}

export default Assets;



