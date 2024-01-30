import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/dashboard";

function App() {
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
              <Dashboard
                username={currentUserName}
                userRole={currentUserType}
              />
            }
          />
          <Route path="*" element={<div> Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
