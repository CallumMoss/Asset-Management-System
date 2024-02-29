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
      if (searchTerm !== "") { // if user has searched something, show search results
        switch(filter) {
          case "": // if they havent searched by using a filter, search by username as default.
            response = await axios.post("http://localhost:8080/assets/search/title", searchTerm);
            break;
          case "title":
            response = await axios.post("http://localhost:8080/users/search/title", searchTerm);
            break;
          case "type":
            response = await axios.post("http://localhost:8080/users/search/type", searchTerm);
            break;
          case "date":
            response = await axios.post("http://localhost:8080/users/search/date", searchTerm);
            break;
          case "author":
            response = await axios.post("http://localhost:8080/users/search/author", searchTerm);
            break;
        }
      } else { // if user hasnt searched, show regular results
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
    console.log("Filtering by:", e.target.value);
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
      <Navbar userRole={userRole} />
      <main>
        <section className="assets-container">
          <h1 className="text-3xl font-bold mb-4">Asset Management</h1>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="flex items-center space-x-4 w-full max-w-lg">
              <input
                type="text"
                id="assetSearchInput"
                placeholder="Search assets..."
                className="flex-1 py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex space-x-2">
                <button
                  id="assetSearchBtn"
                  className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <div>
                  <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="">Filter</option>
                    <option value="type">Type</option>
                    <option value="date">Date</option>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>

            <Link to="/create-asset">
              <button
                id="createAssetBtn"
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                Create New Asset
              </button>
            </Link>
          </div>

          <div className="assets-list">
            {/* Assets list will be displayed here */}
          </div>
        </section>
        <section>
          <DisplayAssets assetList = {searchedAssets}/>
        </section>
      </main>
    </div>
  );
}

export default Assets;
