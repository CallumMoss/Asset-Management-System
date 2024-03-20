import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DisplayAssets from "./DisplayAssets";
import Navbar from "../navigation/Navbar";
import axios from "axios";
//Imports

//Function to display assets on asset page.
function Assets({ username, userRole }) { //@param username, and userRole - userRole used to determine if user has access rights.

  //Constants:
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedAssets, setSearchedAssets] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Function to handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log("Searching for:", searchTerm);
      let response = null;
      if (searchTerm !== "") {
        // If there is a search term
        if (filter === "") {
          // Default to asset title search
          response = await axios.post("http://localhost:8080/assets/search/title", { searchTerm });
        } else {
          // Use the selected filter for search
          response = await axios.post("http://localhost:8080/assets/search/" + filter, { searchTerm });
        }
        console.log(response);
      } else {
        // If user hasn't searched, show regular results
        response = await axios.get("http://localhost:8080/assets/refresh");
      }
      setSearchedAssets(response.data);
    } catch (error) {
      console.error("Error searching for the asset:", error);
      alert("An error occurred while searching for the assets");
    }
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    console.log("Filtering by:", e.target.value);
  };

  // Effect to handle click outside the filter menu
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef, setOpen]);

  return (
    //Displaying Asset page in wanted format/order.
    <div>
      {/*Calls navbar component from navigation to display navbar.*/}
      <Navbar userRole={userRole} username={username} />

      {/*Main code for asset page:*/}
      <main>
        <section className="assets-container">
          <h1 className="text-3xl font-bold mb-4">Asset Management</h1>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="flex items-center space-x-4 w-full max-w-lg">
              {/* ClearSearch button to reset the search */}
              <button
                  className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                  onClick={() => {
                    setSearchTerm('');
                    setSearchedAssets([]);
                  }}>
                Clear
              </button>
              <input
                type="text"
                id="assetSearchInput"
                placeholder="Search assets..."
                className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/*Search button to call search function on click:*/}
              <div className="flex space-x-2">
                <button
                  id="assetSearchBtn"
                  className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={handleSearch}>
                  Search
                </button>
                <div>
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200">
                    <option value="" disabled>Filter</option>
                    <option value="title">Title</option>
                    <option value="type">Type</option>
                    <option value="author">Author</option>
                  </select>
                </div>
              </div>
            </div>

            {/*Opens create asset page:*/}
            <Link to="/create-asset">
              <button
                id="createAssetBtn"
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200">
                Create New Asset
              </button>
            </Link>
          </div>

          <div className="assets-list">
            {/* Assets list will be displayed here */}
          </div>
        </section>
        <section>
          {/* DisplayAssets component to render the list of assets */}
          <DisplayAssets assetList={searchedAssets} username={username} />
        </section>
      </main>
    </div>
  );
}

export default Assets;