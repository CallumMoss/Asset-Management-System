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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from '@mui/material/Box';
//imports

//Function for displaying users:
function UserManagementDisplay({ username, userList }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [sortBy, setSortBy] = useState(""); // Track the sorting criteria
  const [sortAnchorEl, setSortAnchorEl] = useState(null); // Anchor element for the sort menu
  const navigate = useNavigate();
  const sortOptionsRef = useRef(null); // Ref to the sorting options dropdown
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(users.length / itemsPerPage);
  const [editFirstName, setEditFirstName] = useState("");
const [editLastName, setEditLastName] = useState("");
const [editUserName, setEditUserName] = useState("");
const [editPassword, setEditPassword] = useState(""); // Be cautious with password management
const [editRole, setEditRole] = useState("");

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
      if (
        sortOptionsRef.current &&
        !sortOptionsRef.current.contains(event.target)
      ) {
        setSortAnchorEl(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Function to handle delete confirmation:
  const handleDeleteConfirmation = async () => {
    if (deleteUserId !== null) {
      try {
        await axios.delete(
          `http://localhost:8080/users/${deleteUserId}/${username}`
        );
        setOpenDialog(false); // Close dialog
        fetchUsers(); // Refresh user list
        console.log("User deleted successfully:", deleteUserId);
      } catch (error) {
        console.error("Axios Error:", error);
        alert("An error occurred while deleting the user.");
      }
    }
  };

  //Function to prompt deletion:
  const promptDeleteConfirmation = (userId) => {
    setDeleteUserId(userId);
    setOpenDialog(true);
  };

  //Function to get user data:
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

  //Function to edit user data:
  const handleEdit = (user) => {
    setEditFirstName(user.user_first_name);
    setEditLastName(user.user_last_name);
    setEditUserName(user.user_name);
    setEditRole(user.user_role);
    setEditingUser(user.id);
    setIsEditing(true);
  };

  //Function to save changes:
  const handleSave = async () => {
    try {
      await axios.post(
        `http://localhost:8080/users/edit/${username}`,
        editingUser
      );
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error(error.response.data);
      alert("An error occurred while updating the user.");
    }
    setIsEditing(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      user_first_name: editFirstName,
      user_last_name: editLastName,
      user_name: editUserName,
      user_role: editRole,
    };

    try {
      await axios.put(`http://localhost:8080/users/${editingUser}`, updatedUserData);
      setIsEditing(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("An error occurred while updating the user.");
    }
  };

  //Function to create new users:
  const handleCreate = () => {
    navigate("/admin/create-user");
  };

  //Function to reset password:
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

  //Function to delete:
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

  //Function to sort users in chosen order:
  const handleSortBy = async (orderBy) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/sort",
        users,
        { params: { orderBy: orderBy } }
      );
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
    //Returning desired format of user management table:
    <Container component={Paper}>
       {isEditing ? (
        <Box
          component="form"
          onSubmit={handleEditSubmit}
          noValidate
          sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Box width="75%" sx={{ mb: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              variant="outlined"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
          </Box>
          <Box width="75%" sx={{ mb: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              variant="outlined"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
          </Box>
          <Box width="75%" sx={{ mb: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              variant="outlined"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
            />
          </Box>
          <Box width="75%" sx={{ mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="edit-role-label">Role</InputLabel>
              <Select
                labelId="edit-role-label"
                id="edit-role"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                input={<OutlinedInput label="Role" />}
              >
                <MenuItem value="Viewer">Viewer</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Save Changes
          </Button>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>UserName</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>First Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>

                  {/*Create button*/}
                  <Button onClick={() => handleCreate()}>Create</Button>
                  <div>
                    {/*Sort button*/}
                    <Button
                      onClick={(e) => setSortAnchorEl(e.currentTarget)}
                      aria-controls="sort-menu"
                      aria-haspopup="true">
                      Sort
                    </Button>
                    {/*Menu for sortby options*/}
                    <Menu
                      id="sort-menu"
                      anchorEl={sortAnchorEl}
                      open={Boolean(sortAnchorEl)}
                      onClose={() => setSortAnchorEl(null)}>
                      <MenuItem onClick={() => handleSortBy("Oldest")}>
                        Oldest
                      </MenuItem>
                      <MenuItem onClick={() => handleSortBy("Newest")}>
                        Newest
                      </MenuItem>
                      <MenuItem onClick={() => handleSortBy("UserName")}>
                        Username
                      </MenuItem>
                      <MenuItem onClick={() => handleSortBy("FirstName")}>
                        First Name
                      </MenuItem>
                      <MenuItem onClick={() => handleSortBy("LastName")}>
                        Last Name
                      </MenuItem>
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
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.user_first_name}</TableCell>
                <TableCell>{user.user_last_name}</TableCell>
                <TableCell>{user.user_role}</TableCell>
                <TableCell>
                  {/*Edit button*/}
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  {/*Reset password button*/}
                  <Button onClick={() => resetPassword(user.user_name)}>
                    Reset Password
                  </Button>
                  {/*Delete button*/}
                  <Button onClick={() => promptDeleteConfirmation(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
        {/* Pagination controls */}
        {!isEditing && (
        <>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </Button>
          <Button
            disabled={currentPage === nPages}
            onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </Button>
        </>
      )}
    </Container>
  );
}
export default UserManagementDisplay;