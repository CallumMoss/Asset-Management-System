import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Importing component-specific styles
import "./Menustyle.css";
import { useNavigate, Link } from "react-router-dom";

import user from "./user.png";
import change_password from "./change_password.png"; // Import change_password image
import logout from "./logout.png";

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

// Modified Navbar component to accept userRole as a prop
function Navbar({ userRole }) {
  const navigate = useNavigate();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const toggleAdminDropdown = () => {
    setShowAdminDropdown(!showAdminDropdown);
  };

  return (
    <header>
      <nav className="navbar">
        <button onClick={() => handleNavigate("/dashboard")}>Dashboard</button>
        <button onClick={() => handleNavigate("/assets")}>Assets</button>

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

function Dashboard({ username, userRole }) {
  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div>
      <Navbar userRole={userRole} />
      <main>
        <div className="quick-access">
          <Link to="/create-asset">
            <button>Create New Asset</button>
          </Link>
          <button
            onClick={() => (window.location.href = "recent-updates.html")}>
            View Recent Updates
          </button>
          <Link to="/search">
            <button id="searchLink">Search</button>
          </Link>
        </div>
      </main>

      <div className="App">
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
      </div>

      {/* Footer section */}
      <footer>{/* Your footer content */}</footer>
    </div>
  );
}

export default Dashboard;
