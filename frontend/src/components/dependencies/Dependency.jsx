import React, { useState, useEffect, useRef } from "react";
import "../style.css"; // Importing component-specific styles
import "../Menustyle.css";
import { Link, useNavigate } from "react-router-dom"; // Importing components from react-router-dom
import user from "../user.png";
import Navbar from "../navigation/Navbar";
import axios from "axios";

function Dependency({ userRole, username }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedLogs, setSearchedLogs] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("Searching for:", searchTerm);
      let response = null;
      if (searchTerm !== "") {
        // if user has searched something, show search results
        response = await axios.post("http://localhost:8080/logs/search", {
          searchTerm,
        }); // searches by description
      } else {
        // if user hasnt searched, show regular results
        response = await axios.get("http://localhost:8080/logs/refresh");
      }
      setSearchedLogs(response.data);
    } catch (error) {
      console.error("Error searching for the log:", error);
      alert("An error occurred while searching for the logs");
    }
  };

  return (
    <div>
      <Navbar userRole={userRole} username={username} />
      <main>
        <section className="assets-container">
          <h1 className="text-3xl font-bold mb-4">Log Management</h1>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="flex items-center space-x-4 w-full max-w-lg">
              <input
                type="text"
                id="logSearchInput"
                placeholder="Search logs..."
                className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex space-x-2">
                <button
                  id="logSearchBtn"
                  className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="assets-list"></div>
        </section>
        <section></section>
      </main>
    </div>
  );
}

export default Dependency;
