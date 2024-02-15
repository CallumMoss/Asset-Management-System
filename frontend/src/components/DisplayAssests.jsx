import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';

function DisplayAssets() {
    const [assets, setAssets] = useState([]);

    useEffect (() => {
        const getAssets = async () => {
            try{
                const response = await axios.get('http://localhost:8080/assets/refresh')
                if (response.data && response.data_embedded && Array.isArray(response.data._embedded.assets)) {
                    setAssets(response.data._embedded.assets)
                } else{
                    console.error("Unexpected structure", response.data);
                    setAssets([]);
                }
            } catch (error){
                console.error("Failed to fetch users", error);
            }
        };

        getAssets();
    }, []);

    return (
        <Container component={Paper}>
            <h1>Assets</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Asset Title</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Link</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Languages</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assets.map((asset, index) => (
                        <TableRow key={index}>
                            <TableCell>{asset.title}</TableCell>
                            <TableCell>{asset.asset_description}</TableCell>
                            <TableCell>{asset.link}</TableCell>
                            <TableCell>{asset.lang_list}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );

}

export default DisplayAssets;