import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import UserManagementDisplay from "./UserManagementDisplay";
// Ensure you import Tailwind CSS styles if not already done

function UserManagement({ userRole, username }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response = null;
      if (searchTerm != "") {
        if(filter == "") { // default to username search
          response = await axios.post("http://localhost:8080/users/search/username", {searchTerm});
        }
        else {
        response = await axios.post("http://localhost:8080/users/search/" + filter, {searchTerm});
        }
        console.log(response);
      }  
       else { // if user hasnt searched, show regular results
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
  };

  return (
    <div>
      <Navbar userRole={userRole} username={username} />
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
                  onClick={handleSearch}>
                  Search
                </button>
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="py-2 px-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200">
                  <option value="" disabled>Filter</option>
                  <option value="username">Username</option>
                  <option value="firstname">First Name</option>
                  <option value="lastname">Last Name</option>
                  <option value="role">Role</option>
                </select>
              </div>
            </div>
          </div>

          <UserManagementDisplay userList={searchedUsers} />
        </section>
      </main>
    </div>
  );
}

export default UserManagement;
