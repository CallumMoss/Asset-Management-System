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
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import AlertDialog from "./AlertDialog";
import Box from '@mui/material/Box';
//Imports

//Function to Display AssetTypes table:
function AssetTypeDisplay({ username, assetTypeList }) {
  const [assetTypes, setAssetTypes] = useState([]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteAssetTypeId, setDeleteAssetTypeId] = useState(null);
  const [editedAssetType, setEditedAssetType] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentAssetTypes = assetTypes.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(assetTypes.length / itemsPerPage);

  const [sortAnchorEl, setSortAnchorEl] = useState(null); // Anchor element for the sort menu

  useEffect(() => {
    if (assetTypeList.length === 0) {
      fetchAssetTypes();
    }
    setAssetTypes(assetTypeList);
    console.log("Set assetTypes to the searched asset types.");
  }, [assetTypeList]); // only called if assetTypeList is updated.

  //Function to get AssetTypes values:
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
    setEditedAssetType({
      type_id: assetType.type_id,
      type_name: assetType.type_name || '',
      description: assetType.description || '',
      typeAttribute1: assetType.typeAttribute1 || '',
      typeAttribute2: assetType.typeAttribute2 || '',
      typeAttribute3: assetType.typeAttribute3 || '',
    });
    setIsEditing(true);
  };

  // Function to handle submit of the edit form
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    // Ensure the editedAssetType is structured correctly before sending
    const payload = {
      type_id: editedAssetType.type_id,
      type_name: editedAssetType.type_name,
      description: editedAssetType.description,
      typeAttribute1: editedAssetType.typeAttribute1,
      typeAttribute2: editedAssetType.typeAttribute2,
      typeAttribute3: editedAssetType.typeAttribute3,
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/asset_types/edit/${username}`,
        payload
      );;
      console.log("Asset Type updated successfully", response);
      setIsEditing(false);
      fetchAssetTypes(); // Refresh the list
    } catch (error) {
      console.error("Error updating asset type:", error);
      alert("An error occurred while updating the asset type.");
    }
  };


  //Function to call creat assetType:
  const handleCreate = () => {
    navigate("/admin/create-asset-type");
  };

  //Function to alert confirmation of deletion of assetTypes:
  const promptDeleteConfirmation = (asset_type_id) => {
    setDeleteAssetTypeId(asset_type_id);
    setOpenDialog(true);
  };

  //Function to call Deletion:
  const handleDeleteConfirmation = async () => {
    if (deleteAssetTypeId !== null) {
      try {
        await axios.delete(
          `http://localhost:8080/asset_types/${deleteAssetTypeId}/${username}`
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

  //Function to Sort list of AssetTypes:
  const handleSortBy = async (orderBy) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/asset_types/sort",
        assetTypes,
        { params: { orderBy: orderBy } }
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
        <Box component="form" onSubmit={handleEditSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            label="Type Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedAssetType.type_name}
            onChange={(e) => setEditedAssetType({ ...editedAssetType, type_name: e.target.value })}
            sx={{ Width: '55%', mx: 'auto' }} // Center the TextField
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={editedAssetType.description}
            onChange={(e) => setEditedAssetType({ ...editedAssetType, description: e.target.value })}
            sx={{ Width: '55%', mx: 'auto' }} // Center the TextField
          />
          {/* Repeat the styling for each TextField */}
          <TextField
            label="Attribute 1"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedAssetType.typeAttribute1}
            onChange={(e) => setEditedAssetType({ ...editedAssetType, typeAttribute1: e.target.value })}
            sx={{ Width: '55%', mx: 'auto' }}
          />
          <TextField
            label="Attribute 2"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedAssetType.typeAttribute2}
            onChange={(e) => setEditedAssetType({ ...editedAssetType, typeAttribute2: e.target.value })}
            sx={{ Width: '55%', mx: 'auto' }}
          />
          <TextField
            label="Attribute 3"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedAssetType.typeAttribute3}
            onChange={(e) => setEditedAssetType({ ...editedAssetType, typeAttribute3: e.target.value })}
            sx={{ Width: '55%', mx: 'auto' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button color="primary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Button onClick={() => handleCreate()}>Create</Button>
          <Button onClick={(e) => setSortAnchorEl(e.currentTarget)}>Sort</Button>
          <Menu
            id="sort-menu"
            anchorEl={sortAnchorEl}
            open={Boolean(sortAnchorEl)}
            onClose={() => setSortAnchorEl(null)}
          >
            <MenuItem onClick={() => handleSortBy("Newest")}>Newest</MenuItem>
            <MenuItem onClick={() => handleSortBy("Oldest")}>Oldest</MenuItem>
            <MenuItem onClick={() => handleSortBy("Alphabetically")}>
              Alphabetically
            </MenuItem>
          </Menu>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Type Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell>Actions</TableCell>
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
              {currentAssetTypes.map((assetType) => (
                <TableRow key={assetType.type_id}>
                  <TableCell>{assetType.type_name}</TableCell>
                  <TableCell>{assetType.description}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(assetType)}>Edit</Button>
                    <Button onClick={() => promptDeleteConfirmation(assetType.type_id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            disabled={currentPage === nPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </>
      )}
    </Container>
  );
}

export default AssetTypeDisplay;