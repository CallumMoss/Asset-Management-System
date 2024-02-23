import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/dashboard";
import Assets from "./components/Assets";
import Admin from "./components/Admin";
import CreateAsset from "./components/CreateAsset";
import CreateUser from "./components/CreateUser";
import UserManagement from "./components/UserManagement";
import AssetType from "./components/AssetType";
import CreateAssetType from "./components/CreateAssetType";
import Log from "./components/Log";
import { Switch } from "@mui/material";

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
          <Route path="/" element={<Home />} /> {/* Home Route */}
          <Route path="/register" element={<Register />} /> {/* Register Route */}
          <Route
            path="/login"
            element={<Login updateCurrentUser={updateCurrentUser} />} // Login Route
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
          /> {/* Dashboard Route */}
          <Route
            path="/assets"
            element={
              <ViewerElement currentUserType={currentUserType}>
                <Assets
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </ViewerElement>
            }
          /> {/* Assets Route */}

          <Route
            path="/create-asset"
            element={
              <UserElement currentUserType={currentUserType}>
                <CreateAsset
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </UserElement>
            }
          /> {/* Create Asset Route */}

          <Route
            path="/admin/create-user"
            element={
              <AdminElement currentUserType={currentUserType}>
                <CreateUser
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </AdminElement>
            }
          /> {/* Create User Route */}

          <Route
            path="/admin"
            element={
              <AdminElement currentUserType={currentUserType}>
                <Admin
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </AdminElement>
            }
          /> {/* Admin Route */}

          <Route
            path="/admin/asset-types"
            element={
              <AdminElement currentUserType={currentUserType}>
                <AssetType
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </AdminElement>
            }
          /> {/* Asset Types Route */}
          <Route
            path="/admin/logs"
            element={
              <AdminElement currentUserType={currentUserType}>
                <Log
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </AdminElement>
            }
          /> {/* Logs Route */}

          <Route
            path="/admin/create-asset-type"
            element={
              <AdminElement currentUserType={currentUserType}>
                <CreateAssetType
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </AdminElement>
            }
          /> {/* Create Asset Type Route */}

          <Route
            path="/admin/user-management"
            element={
              <AdminElement currentUserType={currentUserType}>
                <UserManagement
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </AdminElement>
            }
          /> {/* User Management Route */}

          <Route
            path="/createuserpage" // when navigating to this page (when navigate is used in UserManagement)
            element={
              // show CreateUser
              <AdminElement currentUserType={currentUserType}>
                <CreateUser />
              </AdminElement>
            }
          /> {/* Create User Page Route */}

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
    <li className="dropdownItem" onClick={handleNavigation}>
      {/* Display the image and text */}
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

  // JSX structure for the App component
  return (
    <div className="App">
      <div>
        {/* Rendering AppRoutes component */}
        <AppRoutes />
      </div>
    </div>
  );
}

// ViewerElement, UserElement, AdminElement components remain unchanged...
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
