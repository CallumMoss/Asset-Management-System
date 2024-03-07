import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateAsset() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [authors, setAuthors] = useState([]);
  const [dependencies, setDependencies] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [link, setLink] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [dependenciesList, setDependenciesList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [langList, setLangList] = useState([]);

  useEffect(() => {
    const fetchAssetTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/asset_types/refresh");
        setAssetTypes(response.data);
        console.log("Fetched asset types:", response.data);
      } catch (error) {
        console.error("Error fetching asset types:", error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/refresh");
        setAuthorsList(response.data);
        console.log("Fetched authors:", response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    const fetchDependencies = async () => {
      try {
        const response = await axios.get("http://localhost:8080/assets/refresh");
        setDependenciesList(response.data);
        console.log("Fetched dependencies:", response.data);
      } catch (error) {
        console.error("Error fetching dependencies:", error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/languages/refresh");
        setLangList(response.data);
        console.log("Fetched languages:", response.data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchAssetTypes();
    fetchAuthors();
    fetchDependencies();
    fetchLanguages();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/assets/createasset", {
        title,
        asset_description: description,
        link,
        languages,
        asset_type: type,
        authors,
        dependencies,
      });
      console.log("Asset created successfully");
      navigate("/assets");
    } catch (error) {
      console.error("Error creating asset:", error);
      alert("An error occurred while creating the asset");
    }
  };

  return (
      <div className="container mx-auto px-4">
        <form className="w-full max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="type">
                Asset Type
              </label>
              <select className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="" disabled>Select an asset type</option>
                {assetTypes.map((assetType) => (
                    <option key={assetType.type_id} value={assetType.type_name}>
                      {assetType.type_name}
                    </option>
                ))}
              </select>
            </div>
          </div>

          {/* Similar structure for Authors, Dependencies, and Languages with appropriate adjustments for multi-select */}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="link">
                Link
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="link" type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 text-center">
              <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}

export default CreateAsset;
