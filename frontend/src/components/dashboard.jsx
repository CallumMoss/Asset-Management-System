import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Importing component-specific styles
import "./Menustyle.css";
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";

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

function Dashboard({ username, userRole }){
  // Hook from React Router to navigate programmatically
  const navigate = useNavigate();

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
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
        <header>
          <nav className="navbar">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/assets">Assets</Link>
            {userRole === "Admin" && (
                <div className="dropdown">
                  <Link to="#" className="dropbtn" onClick={toggleDropdown}>Admin</Link>
                  {isDropdownVisible && (
                      <div className="dropdown-content">
                        <Link to="/admin/user-management">User Management</Link>
                        <Link to="/admin/asset-types">Asset Types</Link>
                        <Link to="/admin/asset-attributes">Asset Attributes</Link>
                        <Link to="/admin/logs">Logs</Link>
                      </div>
                  )}
                </div>
            )}
          </nav>
        </header>


        {/* Main content section */}
        <main>
          <div className="quick-access">
            <Link to="/create-asset">
              <button>Create New Asset</button>
            </Link>
            <button onClick={() => (window.location.href = "recent-updates.html")}>View Recent Updates</button>
            <button id="searchLink">Search</button>
          </div>
        </main>

        <div className="App">
          <div className='menu-container' ref={menuRef}>
            {/* Menu trigger */}
            <div className='menu-trigger' onClick={() => {
              setOpen(!open)
            }}>
              <img src={user} alt="User Icon"/>
            </div>

            {/* Dropdown menu */}
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
              <ul>
                {/* Rendering DropdownItem components with different destinations */}
                <DropdownItem img={change_password} text={"Change Password"} destination="/change-password"/>
                <DropdownItem img={logout} text={"Logout"} destination="/login"/>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer section */}
        <footer>{/* Your footer content */}</footer>
      </div>
  );
}

export default Dashboard;
