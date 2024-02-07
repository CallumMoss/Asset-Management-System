import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/dashboard";
import Assets from "./components/Assets";
import Admin from "./components/Admin";
import CreateAsset from "./components/CreateAsset";


function App() {
  return (
    <div>
      <AppRoutes />
    </div>
  );
}

function AppRoutes() {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");

  const updateCurrentUser = (userName, userType) => {
    setCurrentUserName(userName);
    setCurrentUserType(userType);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login updateCurrentUser={updateCurrentUser} />}
          />
          {/* Pass the updateCurrentUser function to the Login component */}
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
                <ViewerElement currentUserType={currentUserType}>
                  <CreateAsset username={currentUserName} userRole={currentUserType} />
                </ViewerElement>
              } />


          <Route
            path="/admin"
            element={
              <AdminElement currentUserType={currentUserType}>
                <Admin username={currentUserName} userRole={currentUserType} />
              </AdminElement>
            }
          />

          <Route path="*" element={<div> Page not found!</div>} />
        </Routes>
      </BrowserRouter>
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
