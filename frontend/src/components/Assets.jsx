import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Importing component-specific styles
import "./Menustyle.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // Importing Link component from react-router-dom

import user from './user.png';
import change_password from './change_password.png'; // Import change_password image
import logout from './logout.png';

// DropdownItem component
function DropdownItem(props) {
  const handleNavigation = () => {
    // Redirect to the specified destination page
    window.location.href = props.destination;
  };

  return (
    <li className='dropdownItem' onClick={handleNavigation}>
      <img src={props.img} alt="Dropdown Icon" />
      <a> {props.text}</a>
    </li>
  );
}

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

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");
  // State for controlling the menu open/close
  const [open, setOpen] = useState(false);
  // Function to update current user's data
  const updateCurrentUser = (userName, userType) => {
    setCurrentUserName(userName);
    setCurrentUserType(userType);
  };

  // Reference for the menu container
  let menuRef = useRef();

  // Effect to handle clicks outside the menu container
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

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

      <div className="App">
       <div className='menu-container' ref={menuRef}>
         {/* Menu trigger */}
         <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
           <img src={user} alt="User Icon" />
         </div>

         {/* Dropdown menu */}
         <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
           <ul>
             {/* Rendering DropdownItem components with different destinations */}
             <DropdownItem img={change_password} text={"Change Password"} destination="/change-password" />
             <DropdownItem img={logout} text={"Logout"} destination="/login" />
           </ul>
         </div>
       </div>
     </div>

      <footer>{/* Footer content */}</footer> {/* Footer section */}
    </div>
  );
}

export default Assets;
