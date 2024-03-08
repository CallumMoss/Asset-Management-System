import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navigation/Navbar"; 

function CreateAssetType({ userRole, username }) {
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/asset_types/create", {
        type_name: typeName,
        description: description,
      });
      console.log("Asset Type created successfully");
      navigate("/admin/asset-types");
    } catch (error) {
      console.error("Error creating asset type:", error);
      alert("An error occurred while creating the asset type");
    }
  };

  return (
    <>
      <Navbar userRole={userRole} username={username} />
      <div className="container mx-auto px-4 pt-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mb-4">Create Asset Type</h1>
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="typeName" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Type Name
              </label>
              <input
                type="text"
                id="typeName"
                name="typeName"
                required
                autoFocus
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="4"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAssetType;
