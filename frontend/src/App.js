import user from '../src/user.png';
import change_password from '../src/change_password.png'; // Import change_password image
import logout from '../src/logout.png';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/dashboard";
import Assets from "./components/Assets";
import Admin from "./components/Admin";

// AppRoutes component
function AppRoutes() {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");

  // Function to update current user's data
  const updateCurrentUser = (userName, userType) => {
    setCurrentUserName(userName);
    setCurrentUserType(userType);
  };

  // JSX structure for routing
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login updateCurrentUser={updateCurrentUser} />}
          />
          <Route
            path="/dashboard"
            element={
              <ViewerElement currentUserType={currentUserType}>
                <Dashboard
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </ViewerElement>
            }
          />
          <Route
            path="/assets"
            element={
              <ViewerElement currentUserType={currentUserType}>
                <Assets username={currentUserName} userRole={currentUserType} />
              </ViewerElement>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminElement currentUserType={currentUserType}>
                <Admin username={currentUserName} userRole={currentUserType} />
              </AdminElement>
            }
          />

          {/* Default route */}
          <Route path="*" element={<div> Page not found!</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// DropdownItem component
export function DropdownItem(props) {
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

// ViewerElement component, UserElement, AdminElement, App component remains the same...

// App component
function App() {
  // State for controlling the menu open/close
  const [open, setOpen] = useState(false);

  //Setting Username and type
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");

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

  // JSX structure for the App component
  return (
    <div className="App">
      <div>
        {/* Rendering AppRoutes component */}
        <AppRoutes />
      </div>

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
  );
}

export function ViewerElement({ currentUserType, children }) {
  if (
    currentUserType === "Viewer" ||
    currentUserType === "User" ||
    currentUserType === "Admin"
  ) {
    return <>{children}</>;
  } else {
    return <div>You don't have access to this page!</div>;
  }
}

export function UserElement({ currentUserType, children }) {
  if (currentUserType === "User" || currentUserType === "Admin") {
    return <>{children}</>;
  } else {
    return <div>You don't have access to this page!</div>;
  }
}

export function AdminElement({ currentUserType, children }) {
  if (currentUserType === "Admin") {
    return <>{children}</>;
  } else {
    return <div>You don't have access to this page!</div>;
  }
}
export default App;
