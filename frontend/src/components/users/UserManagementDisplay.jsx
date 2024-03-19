import React, { useState, useEffect, useRef } from "react";
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
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import AlertDialog from "./AlertDialog";

function UserManagementDisplay({ userList }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [sortBy, setSortBy] = useState(""); // Track the sorting criteria
  const [sortAnchorEl, setSortAnchorEl] = useState(null); // Anchor element for the sort menu
  const navigate = useNavigate();
  const sortOptionsRef = useRef(null); // Ref to the sorting options dropdown

  useEffect(() => {
    if (userList.length === 0) {
      fetchUsers();
    } else {
      setUsers(userList);
    }
  }, [userList]);

  useEffect(() => {
    // Add event listener to close sorting options dropdown when clicking outside of it
    function handleClickOutside(event) {
      if (sortOptionsRef.current && !sortOptionsRef.current.contains(event.target)) {
        setSortAnchorEl(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeleteConfirmation = async () => {
    if (deleteUserId !== null) {
      try {
        await axios.delete(`http://localhost:8080/users/${deleteUserId}`);
        setOpenDialog(false); // Close dialog
        fetchUsers(); // Refresh user list
        console.log("User deleted successfully:", deleteUserId);
      } catch (error) {
        console.error("Axios Error:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  const promptDeleteConfirmation = (userId) => {
    setDeleteUserId(userId);
    setOpenDialog(true);
  };

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
    setEditingUser(userName);
    setIsEditing(true);
    console.log("Edit user:", userName);
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/users/edit", editingUser);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error(error.response.data);
      alert("An error occurred while updating the user.");
    }
    setIsEditing(false);
  };

  const handleCreate = () => {
    navigate("/admin/create-user");
  };

  const resetPassword = async (userName) => {
    try {
      await axios.post("http://localhost:8080/users/reset-password", {
        userName: userName,
        newPassword: "default",
      });

      alert("Password successfully reset!");
    } catch (error) {
      console.error("Axios Error:", error);
      alert("An error occurred while resetting the password.");
    }
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

  const handleSortBy = async (orderBy) => {
    try {
        const response = await axios.post("http://localhost:8080/users/sort", users, { params: { orderBy: orderBy } } );
        if (Array.isArray(response.data)) {
            setUsers(response.data);
        } else {
            console.error("Unexpected response structure:", response.data);
            alert("Could not sort users. Unexpected response structure.");
        }
    } catch (error) {
        console.error("Axios Error:", error);
        alert("Could not sort users. An error occurred.");
    }
};
  console.log("Users ------");
  console.log(users);
  return (
    <Container component={Paper}>
      {isEditing ? (
        <form>
          <TextField
            label="Username"
            variant="outlined"
            value={editingUser.user_name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, user_name: e.target.value })
            }
          />
          <TextField
            label="First Name"
            variant="outlined"
            value={editingUser.user_first_name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, user_first_name: e.target.value })
            }
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={editingUser.user_last_name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, user_last_name: e.target.value })
            }
          />
          <Button onClick={handleSave}>Save</Button>
        </form>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>UserName</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={() => handleCreate()}>Create</Button>
                  <div>
                    <Button onClick={(e) => setSortAnchorEl(e.currentTarget)}
                      aria-controls="sort-menu"
                      aria-haspopup="true"
                    >
                      Sort
                    </Button>
                    {/*menu for sortby options*/}
                    <Menu id="sort-menu"
                      anchorEl={sortAnchorEl}
                      open={Boolean(sortAnchorEl)}
                      onClose={() => setSortAnchorEl(null)}>

                      <MenuItem onClick={() => handleSortBy("Oldest")}>Oldest</MenuItem>
                      <MenuItem onClick={() => handleSortBy("Newest")}>Newest</MenuItem>
                      <MenuItem onClick={() => handleSortBy("UserName")}>Username</MenuItem>
                      <MenuItem onClick={() => handleSortBy("FirstName")}>First Name</MenuItem>
                      <MenuItem onClick={() => handleSortBy("LastName")}>Last Name</MenuItem>
                    </Menu>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <AlertDialog
              open={openDialog}
              handleClose={() => setOpenDialog(false)}
              title="Confirm Delete"
              message="Are you sure you want to delete this user?"
              onConfirm={handleDeleteConfirmation}
            />
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.user_first_name}</TableCell>
                <TableCell>{user.user_last_name}</TableCell>
                <TableCell>{user.user_role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => resetPassword(user.user_name)}>
                    Reset Password
                  </Button>
                  <Button onClick={() => promptDeleteConfirmation(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}
export default UserManagementDisplay;