import React, { useState, useEffect, useRef } from "react";
import "../style.css"; // Importing component-specific styles
import "../Menustyle.css";
import { Link, useNavigate } from "react-router-dom"; // Importing components from react-router-dom
import user from "../user.png";
import Navbar from "../navigation/Navbar";
import UserManagementDisplay from "./UserManagementDisplay";
import axios from "axios";

function UserManagement({ userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const menuRef = useRef();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("Searching for:", searchTerm);
      let response = null;
      if (searchTerm !== "") { // if user has searched something, show search results
        switch(filter) {
          case "": // if they havent searched by using a filter, search by username as default.
            response = await axios.post("http://localhost:8080/users/search/username", searchTerm);
            break;
          case "username":
            response = await axios.post("http://localhost:8080/users/search/username", searchTerm);
            break;
          case "firstname":
            response = await axios.post("http://localhost:8080/users/search/firstname", searchTerm);
            break;
          case "lastname":
            response = await axios.post("http://localhost:8080/users/search/lastname", searchTerm);
            break;
          case "role":
            response = await axios.post("http://localhost:8080/users/search/role", searchTerm);
            break;
        }

        // "http://localhost:8080/users/search/", filter, searchTerm)

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

  // The useEffect is set up to detect clicks outside of a specified element (menuRef).
  // If you are not using menuRef for such a feature, you may remove the useEffect hook.
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        // Logic for click outside menuRef element goes here
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handler);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handler);
    };
  }, []); // Dependency array is empty, meaning this effect will only run on mount and unmount

  return (
    <div>
      <Navbar userRole={userRole} />
      <main>
        <section className="assets-container">
          <h1 className="text-3xl font-bold mb-4">User Management</h1>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="flex items-center space-x-4 w-full max-w-lg">
              <input
                type="text"
                id="userSearchInput"
                placeholder="Search users..."
                className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex space-x-2">
                <button
                  id="userSearchBtn"
                  className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Filter</option>
                  <option value="username">Username</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
          </div>

          <UserManagementDisplay />
        </section>
      </main>
    </div>
  );
}

export default UserManagement;
