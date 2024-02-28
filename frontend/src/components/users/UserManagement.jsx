import React, { useState, useEffect, useRef } from "react";
import "../style.css"; // Importing component-specific styles
import "../Menustyle.css";
import { Link, useNavigate } from "react-router-dom"; // Importing components from react-router-dom
import user from "../user.png";
import change_password from "../change_password.png"; // Import change_password image
import logout from "../logout.png";
import UserManagementDisplay from "./UserManagementDisplay";
import axios from "axios";

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
              <DropdownItem
                img={change_password}
                text={"Change Password"}
                destination="/change-password"
              />
              <DropdownItem img={logout} text={"Logout"} destination="/login" />
            </ul>
          </div>
        </div>
      </nav>
      <div className="App">{/* Your other components */}</div>
    </header>
  );
}

function UserManagement({ username, userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(); // Define menuRef using the useRef hook

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("Searching for:", searchTerm);
      let response = null;
      if (searchTerm !== "") { // if user has searched something, show search results
        console.log("Successfully searched by lastname");
        console.log(filter);
        switch(filter) {
          case "": // if they havent searched by using a filter, search by username as default.
            response = await axios.post("http://localhost:8080/users/search/username", searchTerm);
            break;
          case "Username":
            response = await axios.post("http://localhost:8080/users/search/username", searchTerm);
            break;
          case "FirstName":
            response = await axios.post("http://localhost:8080/users/search/firstname", searchTerm);
            break;
          case "LastName":
            response = await axios.post("http://localhost:8080/users/search/lastname", searchTerm);
            break;
          case "Role":
            response = await axios.post("http://localhost:8080/users/search/role", searchTerm);
            break;
        }

      } else { // if user hasnt searched, show regular results
        response = await axios.get("http://localhost:8080/users/refresh");
      }
      setSearchedUsers(response.data);
    } catch (error) {
      console.error("Error searching for the user:", error);
      alert("An error occurred while searching for the user");
    }
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
              <option value="Username">Username</option>
              <option value="FirstName">First Name</option>
              <option value="LastName">Last Name</option>
              <option value="Role">Role</option>
            </select>
          </div>

          <div className="assets-list"></div>
        </section>
        <section>
          <UserManagementDisplay userList = {searchedUsers} />
        </section>
      </main>
    </div>
  );
}

export default UserManagement;
