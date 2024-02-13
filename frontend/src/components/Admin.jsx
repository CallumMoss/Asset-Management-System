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

function Admin({ username, userRole }) {
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
        <section className="admin-functions">
          <h1>Admin Dashboard</h1> {/* Heading for admin dashboard */}
          {/* Section for user management */}
          <div className="admin-section">
            <h2>User Management</h2> {/* Subheading for user management */}
            <p>Manage user accounts, roles, and access permissions.</p> {/* Description of user management functionalities */}
            {/* User management functionalities */}
          </div>
          {/* Section for system settings */}
          <div className="admin-section">
            <h2>System Settings</h2> {/* Subheading for system settings */}
            <p>Configure system parameters, backup settings, and more.</p> {/* Description of system settings functionalities */}
            {/* System settings functionalities */}
          </div>
          {/* Section for activity logs */}
          <div className="admin-section">
            <h2>Activity Logs</h2> {/* Subheading for activity logs */}
            <p>View logs of system and user activities.</p> {/* Description of activity logs */}
          </div>
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

      <footer></footer> {/* Footer section */}
    </div>
  );
}

export default Admin;
