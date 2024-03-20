import React, { useState, useEffect, useRef } from "react";
import "../style.css"; // Importing component-specific styles
import "../Menustyle.css";
import AssetTypeDisplay from "./AssetTypeDisplay";
import axios from "axios";
import Navbar from "../navigation/Navbar";
//imports

//Function to diplay AssetTypes and check role permissions:
function AssetType({ userRole, username }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedTypes, setSearchedTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(); // Define menuRef using the useRef hook

  //Function to handle Search:
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("Searching for:", searchTerm);
      let response = null;
      if (searchTerm !== "") {
        // if user has searched something, show search results
        response = await axios.post(
          "http://localhost:8080/asset_types/search",
          { searchTerm }
        ); // searches by title
      } else {
        // if user hasnt searched, show regular results
        response = await axios.get("http://localhost:8080/asset_types/refresh");
      }
      setSearchedTypes(response.data);
    } catch (error) {
      console.error("Error searching for the asset type:", error);
      alert("An error occurred while searching for the asset types");
    }
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
    //Returns wanted format of AssetType management page:
    <div>
      {/*Calls navbar component from navigation to display navbar.*/}
      <Navbar userRole={userRole} username={username} />
      <main>
        <section className="assets-container">
          <h1 className="text-3xl font-bold mb-4">Asset Type Management</h1>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="flex items-center space-x-4 w-full max-w-lg">
              {/* ClearSearch button to reset the search */}
              <button
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                onClick={() => {
                  setSearchTerm("");
                  setSearchedTypes([]);
                }}>
                Clear
              </button>
              <input
                type="text"
                id="assetTypeSearchInput"
                placeholder="Search asset types..."
                className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex space-x-2">
                {/*Search button*/}
                <button
                  id="assetTypeSearchBtn"
                  className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <AssetTypeDisplay username={username} assetTypeList={searchedTypes} />
        </section>
      </main>
    </div>
  );
}
export default AssetType;