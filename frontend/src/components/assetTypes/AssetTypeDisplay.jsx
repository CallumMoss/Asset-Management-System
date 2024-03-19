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
  TextField, Menu, MenuItem,
} from "@mui/material";
import AlertDialog from "./AlertDialog";

function AssetTypeDisplay({ assetTypeList }) {
  const [assetTypes, setAssetTypes] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteAssetTypeId, setDeleteAssetTypeId] = useState(null);
  const [editedAssetType, setEditedAssetType] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [sortAnchorEl, setSortAnchorEl] = useState(null); // Anchor element for the sort menu

  useEffect(() => {
    if (assetTypeList.length === 0) {
      fetchAssetTypes();
    }
    setAssetTypes(assetTypeList);
    console.log("Set assetTypes to the searched asset types.");
  }, [assetTypeList]); // only called if assetTypeList is updated.

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

  const handleEdit = (assetType) => {
    // Implement your edit functionality here
    console.log("Edit asset type:", assetType);
    setEditedAssetType(assetType);
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        "http://localhost:8080/asset_types/edit",
        editedAssetType
      );
      fetchAssetTypes();
      console.log("Asset Type updated successfully");
    } catch (error) {
      console.error("Failed to update asset type:", error);
    }
    setIsEditing(false);
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

  const handleSortBy = async (orderBy) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/asset_types/sort",
        assetTypes, { params: { orderBy: orderBy } }
      );
      if (Array.isArray(response.data)) {
        setAssetTypes(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        alert("Could not sort AssetTypes. Unexpected response structure.");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      alert("Could not sort AssetTypes. An error occurred.");
    }
  };

  return (
    <Container component={Paper}>
      {isEditing ? (
        <form>
        <TextField
        label="Type Name" 
        variant="outlined"
        value={editedAssetType.type_name}
        onChange={(e) => setEditedAssetType({ ...editedAssetType, type_name: e.target.value })}
        />
        <TextField
        label="Description" 
        variant="outlined" 
        value={editedAssetType.description}
        onChange={(e) => setEditedAssetType({ ...editedAssetType, description: e.target.value })}
        />
        <Button onClick={handleUpdate}>Save</Button>
      </form>
      ) : (
      <><Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Type Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
                <Button onClick={() => handleCreate()}>Create</Button>
                <Button onClick={(e) => setSortAnchorEl(e.currentTarget)} aria-controls="sort-menu" aria-haspopup="true">
                  Sort
                </Button>
                {/*menu for sortby options*/}
                <Menu id="sort-menu"
                      anchorEl={sortAnchorEl}
                      open={Boolean(sortAnchorEl)}
                      onClose={() => setSortAnchorEl(null)}>

                  <MenuItem onClick={() => handleSortBy("Newest")}>Newest</MenuItem>
                  <MenuItem onClick={() => handleSortBy("Oldest")}>Oldest</MenuItem>
                  <MenuItem onClick={() => handleSortBy("Alphabetically")}>Alphabetically</MenuItem>
                </Menu>
              </TableRow>
            </TableHead>
            <TableBody>
              <AlertDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title="Confirm Delete"
                message="Are you sure you want to delete this asset type?"
                onConfirm={handleDeleteConfirmation} />

              <>
                {assetTypes.map((assetType) => (
                  <TableRow key={assetType.type_id}>
                    <TableCell>{assetType.type_name}</TableCell>
                    <TableCell>{assetType.description}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(assetType)}>Edit</Button>
                      <Button
                        onClick={() => promptDeleteConfirmation(assetType.type_id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
              
            </TableBody>
          </Table></>
      )}
    </Container>
  );
}

export default AssetTypeDisplay;
