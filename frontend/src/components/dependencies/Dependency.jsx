import React, { useState, useEffect } from "react";
import "../style.css";
import "../Menustyle.css";
import Navbar from "../navigation/Navbar";
import axios from "axios";
import DependencyDisplay from "./DependencyDisplay";
//Imports

//Function to create new dependencies:
function Dependency({ userRole, username }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedDependencies, setSearchedDependencies] = useState([]);
  const [filter, setFilter] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  //Function to use search as a filter:
  const handleSearch = async () => {
    try {
      let response = null;
      if (searchTerm != "") {
        if (filter == "") {
          // default to parent search
          response = await axios.post(
            "http://localhost:8080/assetdependency/search/parent",
            searchTerm
          );
        } else {
          response = await axios.post(
            "http://localhost:8080/assetdependency/search/" + filter,
            searchTerm
          );
        }
      } else {
        response = await axios.get(
          "http://localhost:8080/assetdependency/refresh"
        );
      }
      setSearchedDependencies(response.data);
    } catch (error) {
      console.error("Error searching for the dependency:", error);
      alert("An error occurred while searching for the dependency");
    }
  };

  //Function to reset the search filter
  const refreshDependencies = async () => {
    // Perform the logic to refresh dependencies
    handleSearch(); // For example, you can call handleSearch to fetch fresh data
  };

  //Function to set new filter by:
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    //Return of wanted format for dependency page:
    <div>
      {/*Calls navbar component from navigation to display navbar.*/}
      <Navbar userRole={userRole} username={username} />
      <main>
        <section className="assets-container">
          <h1 className="text-3xl font-bold mb-4">Dependencies</h1>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="flex items-center space-x-4 w-full max-w-lg">
              <input
                type="text"
                id="dependencySearchInput"
                placeholder="Search dependencies..."
                className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSearchedDependencies([]);
                  }}
                  className="right top-1/2 transform -translate-y-1/2 text-gray-600"
                  aria-label="Clear search">
                  &#x2715;
                </button>
              )}
              <div className="flex space-x-2">
                {/*Search button*/}
                <button
                  id="dependencySearchBtn"
                  className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={handleSearch}>
                  Search
                </button>
                {/*Filter dropdown*/}
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200">
                  <option value="" disabled>
                    Filter
                  </option>
                  <option value="parent">Parent Asset</option>
                  <option value="dependencies">Dependent Asset</option>
                </select>
              </div>
            </div>
          </div>
        </section>
        <section>
          <DependencyDisplay
            username={username}
            userRole={userRole}
            dependencyList={searchedDependencies}
          />
        </section>
      </main>
    </div>
  );
}
export default Dependency;