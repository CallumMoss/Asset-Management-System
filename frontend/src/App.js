import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/navigation/Login";
import Home from "./components/homepage/Home";
import Dashboard from "./components/navigation/dashboard";
import Assets from "./components/assets/Assets";
import Admin from "./components/navigation/Admin";
import CreateAsset from "./components/assets/CreateAsset";
import CreateUser from "./components/users/CreateUser";
import UserManagement from "./components/users/UserManagement";
import AssetType from "./components/assetTypes/AssetType";
import CreateAssetType from "./components/assetTypes/CreateAssetType";
import Log from "./components//logs/Log";
import ChangePassword from "./components/navigation/ChangePassword";
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
          <Route path="/" element={<Home />} />

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
            path="/create-asset"
            element={
              <UserElement currentUserType={currentUserType}>
                <CreateAsset
                  username={currentUserName}
                  userRole={currentUserType}
                />
              </UserElement>
            }
          />

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
          />

          <Route
            path="/admin"
            element={
              <AdminElement currentUserType={currentUserType}>
                <Admin username={currentUserName} userRole={currentUserType} />
              </AdminElement>
            }
          />

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
          />
          <Route
            path="/admin/logs"
            element={
              <AdminElement currentUserType={currentUserType}>
                <Log username={currentUserName} userRole={currentUserType} />
              </AdminElement>
            }
          />

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
          />

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
          />

          <Route
            path="/createuserpage" // when navigating to this page (when navigate is used in UserManagement)
            element={
              // show CreateUser
              <AdminElement currentUserType={currentUserType}>
                <CreateUser />
              </AdminElement>
            }
          />

          <Route
            path="/changepassword" // when navigating to this page (when navigate is used in UserManagement)
            element={
              <ViewerElement currentUserType={currentUserType}>
                <ChangePassword username={currentUserName} />
              </ViewerElement>
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
    <li className="dropdownItem" onClick={handleNavigation}>
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
