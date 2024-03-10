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
import AlertDialog from "./AlertDialog";

function AssetTypeDisplay({ assetTypeList }) {
  const [assetTypes, setAssetTypes] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteAssetTypeId, setDeleteAssetTypeId] = useState(null);

  useEffect(() => {
    if (assetTypeList.length == 0) {
      fetchAssetTypes();
    }
    setAssetTypes(assetTypeList);
    console.log("Set assetTypes to the searched asset types.");
  }, [assetTypeList]); // only called if userList is updated.

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
      console.error("Failed to fetch asset types:", error);
      alert("An error occurred while fetching asset types.");
    }
  };

  const handleEdit = (userName) => {
    // Implement your edit functionality here
    console.log("Edit asset type:", userName);
  };

  const handleCreate = () => {
    navigate("/admin/create-asset-type");
  };

  const promptDeleteConfirmation = (asset_type_id) => {
    setDeleteAssetTypeId(asset_type_id);
    setOpenDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    if (deleteAssetTypeId !== null) {
      try {
        await axios.delete(
          `http://localhost:8080/asset_types/${deleteAssetTypeId}`
        );
        setOpenDialog(false);
        fetchAssetTypes();
        console.log("Asset Type deleted successfully:", deleteAssetTypeId);
      } catch (error) {
        console.error("Axios Error:", error);
        alert("An error occurred while deleting the asset type.");
      }
    }
  };

  return (
    <Container component={Paper}>
      <h1>Asset Type Management</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Type Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            <Button onClick={() => handleCreate()}>Create</Button>
            <Button onClick={() => fetchAssetTypes()}>Refresh</Button>
          </TableRow>
        </TableHead>
        <TableBody>
          <AlertDialog
            open={openDialog}
            handleClose={() => setOpenDialog(false)}
            title="Confirm Delete"
            message="Are you sure you want to delete this asset type?"
            onConfirm={handleDeleteConfirmation}
          />

          {assetTypes.map((assetType) => (
            <TableRow key={assetType.type_id}>
              <TableCell>{assetType.type_name}</TableCell>
              <TableCell>{assetType.description}</TableCell>

              <TableCell>
                <Button onClick={() => handleEdit(assetType.user_name)}>
                  Edit
                </Button>
                <Button
                  onClick={() => promptDeleteConfirmation(assetType.type_id)}>
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
