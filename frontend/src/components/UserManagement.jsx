import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function UserManagement() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                if (response.data && response.data._embedded && Array.isArray(response.data._embedded.users)) {
                    setUsers(response.data._embedded.users);
                } else {
                    console.error('Unexpected response structure:', response.data);
                    setUsers([]);
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
                alert("An error occurred while fetching users.");
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userName) => {
        console.log('Edit user:', userName);
    };

    const handleDelete = (userName) => {
        console.log('Delete user:', userName);
    };

    const handleCreateUser = () => {
        navigate('/createuserpage');
    };

    return (
        <Container component={Paper}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ marginBottom: '30px' }}>User Management</h1> {/* Increased space */}
                <Button onClick={handleCreateUser} variant="contained" color="primary">Create User</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>UserName</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Role</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={index}>
                            <TableCell>{user.user_name}</TableCell>
                            <TableCell>{user.user_first_name}</TableCell>
                            <TableCell>{user.user_last_name}</TableCell>
                            <TableCell>{user.user_role}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(user.user_name)}>Edit</Button>
                                <Button onClick={() => handleDelete(user.user_name)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}

export default UserManagement;
