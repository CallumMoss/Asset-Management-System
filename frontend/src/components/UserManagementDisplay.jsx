import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";

function UserManagementDisplay() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/refresh");
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        const usersFromApi = response.data;
        setUsers(usersFromApi);
      } else {
        console.error("Unexpected response structure:", response.data);
        setUsers([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("An error occurred while fetching users.");
    }
  };

  const handleEdit = (userName) => {
    // Implement your edit functionality here
    console.log("Edit user:", userName);
  };

  const handleCreate = () => {
    navigate("/admin/create-user");
  };

  const handleDelete = async (user_id) => {
    if (typeof user_id !== "number") {
      console.error("Invalid user_id:", user_id);
      alert("Invalid user_id. Unable to delete user.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/users/${user_id}`);
      fetchUsers();
      console.log("User deleted successfully:", user_id);
    } catch (error) {
      console.error("Axios Error:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  return (
    <Container component={Paper}>
      <h1>User Management</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>UserName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>First Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Last Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Role</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            <Button onClick={() => handleCreate()}>Create</Button>
            <Button onClick={() => fetchUsers()}>Refresh</Button>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.user_name}</TableCell>
              <TableCell>{user.user_first_name}</TableCell>
              <TableCell>{user.user_last_name}</TableCell>
              <TableCell>{user.user_role}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(user.user_name)}>Edit</Button>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default UserManagementDisplay;
