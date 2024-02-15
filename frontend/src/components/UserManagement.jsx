import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';

function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/users');
                if (response.data && response.data._embedded && Array.isArray(response.data._embedded.users)) {
                    setUsers(response.data._embedded.users);
                } else {
                    console.error('Unexpected response structure:', response.data);
                    setUsers([]); // Fallback to an empty array
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
                alert("An error occurred while fetching users.");
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (userName) => {
        // Implement your edit functionality here
        console.log('Edit user:', userName);
    };

    const handleDelete = (userName) => {
        // Implement your delete functionality here
        console.log('Delete user:', userName);
    };

    return (
        <Container component={Paper}>
            <h1>User Management</h1>
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
