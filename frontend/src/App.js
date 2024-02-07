import user from '../src/user.png';
import logout from '../src/logout.png';
import './App.css';
import React, {useState, useEffect, useRef} from 'react';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/dashboard";
import Assets from "./components/Assets";
import Admin from "./components/Admin";

{/*imports for dropdown lines 1-5*/}


function App() {

  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
      setOpen(false);
      console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handler);

    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });
  return (
    <div className="App">

      <div>
      <AppRoutes />
    </div>

      <div className= 'menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          <img src={user}></img>
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem img = {logout} text = {"Logout"}/>
          </ul>
        </div>
      </div>
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
{/*Dropdown method to drop items*/}
function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src = {props.img}></img>
      <a> {props.text}</a>
    </li>
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
