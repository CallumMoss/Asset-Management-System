import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateUser() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/createuser", {
        user_first_name: first_name,
        user_last_name: last_name,
        user_name: user_name,
        user_password: password,
        user_role: role,
      });
      console.log("User created successfully");
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form className="w-full max-w-lg mx-auto mt-8" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
              First Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first_name" type="text" placeholder="Jane" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="last_name" type="text" placeholder="Doe" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="user_name">
              Username
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="user_name" type="text" placeholder="Username" value={user_name} onChange={(e) => setUserName(e.target.value)} required />
          </div>
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="password" type="password" placeholder="******************" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="role">
              User Role
            </label>
            <select className="block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="" disabled>Select a role</option>
              <option value="Viewer">Viewer</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
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

export default CreateUser;
