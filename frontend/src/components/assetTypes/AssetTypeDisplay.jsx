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

function AssetTypeDisplay() {
  const [assetTypes, setAssetTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssetTypes();
  }, []);

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/asset_types/refresh"
      );
      console.log("API Response:", response.data);

      if (Array.isArray(response.data)) {
        const assetTypesFromApi = response.data;
        setAssetTypes(assetTypesFromApi);
      } else {
        console.error("Unexpected response structure:", response.data);
        setAssetTypes([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      alert("An error occurred while fetching users.");
    }
  };

  const handleEdit = (userName) => {
    // Implement your edit functionality here
    console.log("Edit asset type:", userName);
  };

  const handleCreate = () => {
    navigate("/admin/create-asset-type");
  };

  const handleDelete = async (asset_type_id) => {
    if (typeof asset_type_id !== "number") {
      console.error("Invalid Asset_Type_Id:", asset_type_id);
      alert("Invalid asset_type_id. Unable to delete Asset Type.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/asset_types/${asset_type_id}`);
      fetchAssetTypes();
      console.log("Asset Type deleted successfully:", asset_type_id);
    } catch (error) {
      console.error("Axios Error:", error);
      alert("An error occurred while deleting the asset type.");
    }
  };

  return (
    <Container component={Paper}>
      <h1>Asset Type Management</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>id</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Type Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <Button onClick={() => handleCreate()}>Create</Button>
            <Button onClick={() => fetchAssetTypes()}>Refresh</Button>
          </TableRow>
        </TableHead>
        <TableBody>
          {assetTypes.map((assetType) => (
            <TableRow key={assetType.type_id}>
              <TableCell>{assetType.type_id}</TableCell>
              <TableCell>{assetType.type_name}</TableCell>
              <TableCell>{assetType.description}</TableCell>

              <TableCell>
                <Button onClick={() => handleEdit(assetType.user_name)}>Edit</Button>
                <Button onClick={() => handleDelete(assetType.type_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default AssetTypeDisplay;
