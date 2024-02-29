import React, { useState, useEffect, useRef } from "react";
import Navbar from "../navigation/Navbar"; // Import the shared Navbar component
import AssetTypeDisplay from "./AssetTypeDisplay"; // Make sure the path is correct

function AssetType({ userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log("Filtering by:", e.target.value);
  };

  // If you are not using menuRef for outside click detection, you can remove this useEffect hook.
  useEffect(() => {
    // Event handler to close on click outside of menuRef
    const handler = (e) => {
      // Your code to handle click outside the element
    };

    // Bind the event listener
    document.addEventListener("mousedown", handler);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handler);
    };
  }, []); // Empty dependency array

  return (
    <div>
      <Navbar userRole={userRole} />
      <main>
        <section className="assets-container">
          <h1 className="text-3xl font-bold mb-4">Asset Type Management</h1>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="flex items-center space-x-4 w-full max-w-lg">
              <input
                type="text"
                id="assetTypeSearchInput"
                placeholder="Search asset types..."
                className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex space-x-2">
                <button
                  id="assetTypeSearchBtn"
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
                  <option value="name">Name</option>
                  <option value="category">Category</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>

          <AssetTypeDisplay />
        </section>
      </main>
    </div>
  );
}

export default AssetType;
