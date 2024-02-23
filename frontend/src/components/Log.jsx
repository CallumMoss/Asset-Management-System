import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Importing component-specific styles
import "./Menustyle.css";
import { Link, useNavigate } from "react-router-dom"; // Importing components from react-router-dom
import user from "./user.png";
import change_password from "./change_password.png"; // Import change_password image
import logout from "./logout.png";
import LogDisplay from "./LogDisplay";

// DropdownItem component
function DropdownItem(props) {
  const handleNavigation = () => {
    // Redirect to the specified destination page
    window.location.href = props.destination;
  };

  return (
    <li className="dropdownItem" onClick={handleNavigation}>
      <img src={props.img} alt="Dropdown Icon" />
      <a> {props.text}</a>
    </li>
  );
}

// Navbar component modified to accept userRole as a prop
function Navbar({ userRole }) {
  const navigate = useNavigate();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(); // Define menuRef using the useRef hook

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleAdminDropdown = () => {
    setShowAdminDropdown(!showAdminDropdown);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
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

function Log({ username, userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(); // Define menuRef using the useRef hook

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

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
          <h1>Log Search</h1>
          <div className="search-and-filter">
            <input
              type="text"
              id="logSearchInput"
              placeholder="Search logs..."
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
              <option value="type">Description</option>
              <option value="date">Time</option>
            </select>
          </div>

          <div className="assets-list"></div>
        </section>
        <section>
          <LogDisplay />
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
              <ul>
                {/* Rendering DropdownItem components with different destinations */}
                <DropdownItem img={change_password} text={"Change Password"} destination="/change-password"/>
                <DropdownItem img={logout} text={"Logout"} destination="/login" />
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Log;
