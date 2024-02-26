import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Importing component-specific styles
import "./Menustyle.css";
import { Link, useNavigate } from "react-router-dom"; // Importing components from react-router-dom
import user from "./user.png";
import UserManagementDisplay from "./UserManagementDisplay";

// DropdownItem component
function DropdownItem(props) {
  // Function to handle navigation when dropdown item is clicked
  const handleNavigation = () => {
    // Redirect to the specified destination page
    window.location.href = props.destination;
  };

  return (
    <li className="dropdownItem" onClick={handleNavigation}>
      <a> {props.text}</a>
    </li>
  );
}

// Navbar component modified to accept userRole as a prop
function Navbar({ userRole }) {
  const navigate = useNavigate();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  // Function to handle navigation to specified path
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Function to toggle visibility of admin dropdown
  const toggleAdminDropdown = () => {
    setShowAdminDropdown(!showAdminDropdown);
  };

  return (
    <header>
      <nav className="navbar">
        <button onClick={() => handleNavigate("/dashboard")}>Dashboard</button>
        <button onClick={() => handleNavigate("/assets")}>Assets</button>
        {/* Render the Admin dropdown only if the userRole is 'Admin' */}
        {userRole === "Admin" && (
          <div className="dropdown">
            <button onClick={toggleAdminDropdown}>Admin</button>
            {showAdminDropdown && (
              <div className="dropdown-content">
                <button
                  onClick={() => handleNavigate("/admin/user-management")}>
                  User Management
                </button>
                <button onClick={() => handleNavigate("/admin/asset-types")}>
                  Asset Types
                </button>
                <button onClick={() => handleNavigate("/admin/logs")}>
                  Logs
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

function UserManagement({ username, userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(); // Define menuRef using the useRef hook

  // Function to handle search
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log("Filtering by:", e.target.value);
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef, setOpen]);

  return (
    <div>
      <Navbar userRole={userRole} />
      <main>
        <section className="assets-container">
          <h1>User Search</h1>
          <div className="search-and-filter">
            <input
              type="text"
              id="userSearchInput"
              placeholder="Search users..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              id="userSearchBtn"
              className="search-btn"
              onClick={handleSearch}>
              Search
            </button>
            <select
              value={filter}
              onChange={handleFilterChange}
              className="filter-dropdown">
              <option value="">Filter</option>
              <option value="type">Username</option>
              <option value="date">First Name</option>
              <option value="author">Last Name</option>
              <option value="title">Role</option>
            </select>
          </div>

          <div className="assets-list"></div>
        </section>
        <section>
          <UserManagementDisplay />
        </section>
      </main>
      <div className="App">{/* Your other components */}
        {/* Render the User dropdown */}
        <div className="menu-container" ref={menuRef}>
            {/* Menu trigger */}
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}>
              <img src={user} alt="User Icon" />
            </div>

            {/* Dropdown menu */}
            <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
              <DropdownItem text={"Username: " + username}/>
              <DropdownItem text={"Role: " + userRole}/>
              <ul>
                {/* Rendering DropdownItem components with different destinations */}
                <DropdownItem text={"Change_Password"} destination="/change-password"/>
                <DropdownItem text={"Reset_Password"} destination="/reset-password"/>
                <DropdownItem text={"Logout"} destination="/login" />
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
}

export default UserManagement;
