import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Assets({ username, userRole }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // Add your search logic here
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

          <div className="search-section">
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
          </div>

          <button id="createAssetBtn">Create New Asset</button>

          <div className="assets-list"></div>
        </section>
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
}

export default Assets;
