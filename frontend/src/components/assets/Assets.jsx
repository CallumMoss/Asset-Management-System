import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DisplayAssets from "./DisplayAssets";
import Navbar from "../navigation/Navbar";
import axios from "axios";

function Assets({ username, userRole }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedAssets, setSearchedAssets] = useState([]);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

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
      <div>
        <Navbar userRole={userRole} username={username} />
        <main>
          <section className="assets-container">
            <h1 className="text-3xl font-bold mb-4">Asset Management</h1>
            <div className="flex flex-col items-center space-y-4 mb-4">
              <div className="relative flex items-center space-x-4 w-full max-w-lg">
                <input
                    type="text"
                    id="assetSearchInput"
                    placeholder="Search assets..."
                    className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button
                        onClick={() => {
                          setSearchTerm('');
                          setSearchedAssets([]);
                        }}
                        className="right top-1/2 transform -translate-y-1/2 text-gray-600"
                        aria-label="Clear search">
                      &#x2715;
                    </button>
                )}
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
            <DisplayAssets assetList={searchedAssets} username={username} />
          </section>
        </main>
      </div>
  );
}

export default Assets;
