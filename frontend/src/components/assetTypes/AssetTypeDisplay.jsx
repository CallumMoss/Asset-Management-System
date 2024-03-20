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
  const currentAssetTypes = assetTypes.slice(indexOfFirstRecord, indexOfLastRecord);
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

  //Function to allow assetType edit:
  const handleEdit = (assetType) => {
    // Implement your edit functionality here
    console.log("Edit asset type:", assetType);
    setEditedAssetType(assetType);
    setIsEditing(true);
  };

  //Function that will be used in AssetType edit to edit the assetType information:
  const handleUpdate = async () => {
    try {
      await axios.post(
        `http://localhost:8080/asset_types/edit/${username}`,
        editedAssetType
      );
      fetchAssetTypes();
      console.log("Asset Type updated successfully");
    } catch (error) {
      console.error("Failed to update asset type:", error);
    }
    setIsEditing(false);
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
    //Return of wanted format of assetType management page:
    <Container component={Paper}>
      {isEditing ? (
        //Labels with formatting for each heading:
        <form>
          <TextField
            label="Type Name"
            variant="outlined"
            value={editedAssetType.type_name}
            onChange={(e) =>
              setEditedAssetType({
                ...editedAssetType,
                type_name: e.target.value,
              })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            value={editedAssetType.description}
            onChange={(e) =>
              setEditedAssetType({
                ...editedAssetType,
                description: e.target.value,
              })
            }
          />
          {/*Save button*/}
          <Button onClick={handleUpdate}>Save</Button>
        </form>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Type Name</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Description
                </TableCell>
                {/*Create button*/}
                <Button onClick={() => handleCreate()}>Create</Button>
                {/*Sort button*/}
                <Button
                  onClick={(e) => setSortAnchorEl(e.currentTarget)}
                  aria-controls="sort-menu"
                  aria-haspopup="true">
                  Sort
                </Button>

                {/*menu for sortby options*/}
                <Menu
                  id="sort-menu"
                  anchorEl={sortAnchorEl}
                  open={Boolean(sortAnchorEl)}
                  onClose={() => setSortAnchorEl(null)}>
                  <MenuItem onClick={() => handleSortBy("Newest")}>
                    Newest
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("Oldest")}>
                    Oldest
                  </MenuItem>
                  <MenuItem onClick={() => handleSortBy("Alphabetically")}>
                    Alphabetically
                  </MenuItem>
                </Menu>
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

              <>
                {currentAssetTypes.map((assetType) => (
                  <TableRow key={assetType.type_id}>
                    <TableCell>{assetType.type_name}</TableCell>
                    <TableCell>{assetType.description}</TableCell>
                    <TableCell>
                      {/*Edit button*/}
                      <Button onClick={() => handleEdit(assetType)}>
                        Edit
                      </Button>
                      {/*Delete button*/}
                      <Button
                        onClick={() =>
                          promptDeleteConfirmation(assetType.type_id)
                        }>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            </TableBody>
          </Table>
        </>
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
export default AssetTypeDisplay;