//Imports:
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navigation/Navbar"; // Ensure this path matches your project structure

function CreateAsset({ userRole, username }) {
  // State variables for the asset creation form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [author, setAuthor] = useState("");
  const [dependency, setDependency] = useState("");
  const [language, setLanguage] = useState("");
  const [assetTypes, setAssetTypes] = useState([]);
  const [link, setLink] = useState("");
  const [authorsList, setAuthorsList] = useState([]);
  const [dependenciesList, setDependenciesList] = useState([]);
  const [langList, setLangList] = useState([]);

  // Fetchs data from server on the component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetTypesRes, authorsRes, dependenciesRes, languagesRes] =
          await Promise.all([
            axios.get("http://localhost:8080/asset_types/refresh"),
            axios.get("http://localhost:8080/users/refresh"),
            axios.get("http://localhost:8080/assets/refresh"),
            axios.get("http://localhost:8080/languages/refresh"),
          ]);
        // Sets the state with the fetched data
        setAssetTypes(assetTypesRes.data);
        setAuthorsList(
          authorsRes.data.map((a) => ({ id: a.id, name: a.user_name }))
        );
        setDependenciesList(
          dependenciesRes.data.map((d) => ({ id: d.id, title: d.title }))
        );
        setLangList(
          languagesRes.data.map((l) => ({ id: l.id, name: l.language_name }))
        );
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate(); // Navigation hook

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/assets/createasset", {
        title,
        asset_description: description,
        link,
        asset_type: type,

        //Adjusted these for single selection.
        authors: author ? [author] : [],
        dependencies: dependency ? [dependency] : [], 
        languages: language ? [language] : [], 
      });
      navigate("/assets"); // Redirects to assets page after successful submission.
    } catch (error) {
      console.error("Error creating asset:", error);
      alert("An error occurred while creating the asset");
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar userRole={userRole} username={username} />

      {/* Asset creation form */}
      <div className="container mx-auto px-4">
        <form className="w-full max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>

          {/* Title */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="title"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="description"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                required></textarea>
            </div>
          </div>

          {/* Asset Type */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="type"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Asset Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                required>
                <option value="">Select an asset type</option>
                {assetTypes.map((type) => (
                  <option key={type.type_id} value={type.type_name}>
                    {type.type_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Author */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="author"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Author
              </label>
              <select
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
                <option value="">Select an author</option>
                {authorsList.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dependency */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="dependency"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Dependency
              </label>
              <select
                id="dependency"
                value={dependency}
                onChange={(e) => setDependency(e.target.value)}
                className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
                <option value="">Select a dependency</option>
                {dependenciesList.map((dependency) => (
                  <option key={dependency.id} value={dependency.id}>
                    {dependency.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Language */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="language"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
                <option value="">Select a language</option>
                {langList.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Link */}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                htmlFor="link"
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Link
              </label>
              <input
                type="text"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 text-center">
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default CreateAsset;