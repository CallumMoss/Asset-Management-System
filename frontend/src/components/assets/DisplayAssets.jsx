import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import AlertDialog from './AlertDialog';

import ViewLog from "./ViewLogAsset"
function DisplayAssets({assetList}) {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteAssetId, setDeleteAssetId] = useState(null);
  const [editingAsset, setEditingAsset] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [assetTypes, setAssetTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [langList, setLangList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(assets.length / itemsPerPage)
  
  useEffect(() => {
    if(assetList.length == 0) {
      getAssets();
    }
      setAssets(assetList);
      console.log("Set assets to the searched assets.");
    
  }, [assetList]); // only called if assetList is updated.

  useEffect(() => {
    fetchAssetTypes();
  }, []);


  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/asset_types/refresh');
      setAssetTypes(response.data);
      console.log("Fetched asset types:", response.data);
    } catch (error) {
      console.error("Error fetching asset types:", error);
    }
  }

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/languages/refresh"
      );
      setLangList(response.data);
      console.log("Fetched languages:", response.data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  }

  const getAssets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/assets/refresh`
      );
      console.log("API Response:", response.data);
      if (Array.isArray(response.data)) {
        setAssets(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        setAssets([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      alert("An error occurred while fetching assets.");
    }
  };

  const handleEdit = (assetId) => {
    console.log("Edit asset:", assetId);
    setIsEditing(true);
    // Implement your edit functionality here
    setEditingAsset({ ...assetId });
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8080/asset/edit', editingAsset);
      setEditingAsset(null);
    } catch (error) {
      console.error(error.response.data);
      alert("An error occured while updating the asset.");
    }
    setIsEditing(false);
  }

  const promptDelete = (assetId) => {
    setDeleteAssetId(assetId);
    setOpenAlertDialog(true);
  };

  const confirmDelete = async () => {
    if (deleteAssetId !== null) {
      try {
        await axios.delete(`http://localhost:8080/assets/${deleteAssetId}`);
        setOpenAlertDialog(false);
        getAssets();
        console.log("Asset deleted successfully:", deleteAssetId);
      } catch (error) {
        console.error("Axios Error:", error);
        alert("An error occurred while deleting the asset.");
      }
    }
  };

  const handleTitleClick = (asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  const handleViewLog = (asset_id) => {
    const fetchLogs = async (assetId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/logs/refresh/${assetId}`
        );
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          const logsFromApi = response.data;
          setLogs(logsFromApi);
        } else {
          console.error("Unexpected response structure:", response.data);
          setLogs([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error);
        alert("An error occurred while fetching logs.");
      }
    };
    fetchLogs(asset_id);
    console.log({ logs });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container component={Paper}>
      <h1>Assets</h1>
      {isEditing ? (
        <form>
          <TextField
          label="Asset Title"
          variant="outlined"
          value={editingAsset.title}
          onChange={(e) => setEditingAsset({ ...editingAsset, title: e.target.value})}
          />
          <TextField
          label="Description"
          variant="outlined"
          value={editingAsset.asset_description}
          onChange={(e) => setEditingAsset({ ...editingAsset, asset_description: e.target.value})}
          />
          <TextField
          label="Link"
          variant="outlined"
          value={editingAsset.link}
          onChange={(e) => setEditingAsset({ ...editingAsset, link: e.target.value})}
          />
          <Select
            id="Asset Type"
            name="Asset Type"
            value={editingAsset.asset_type}
            onChange={(e) => setEditingAsset({ ...editingAsset, asset_type: e.target.value})}
          >
            <MenuItem value="" disabled>
              Select an asset type
            </MenuItem>
            {assetTypes.map((assetType) => (
              <MenuItem key={assetType.type_id} value={assetType.type_name}>
                {assetType.type_name}
              </MenuItem>
            ))}
          </Select>

          <Select
            id="Languages"
            name="Languages"
            value={editingAsset.language}
            onChange={(e) => setLanguages({ ...editingAsset, language: e.target.value})}
          >
            <MenuItem value="" disabled>
              Select an asset type
            </MenuItem>
            {assetTypes.map((assetType) => (
              <MenuItem key={assetType.type_id} value={assetType.type_name}>
                {assetType.type_name}
              </MenuItem>
            ))}
          </Select>

          <TextField
          label="Languages"
          variant="outlined"
          value={editingAsset.language}
          onChange={(e) => setEditingAsset({ ...editingAsset, language: e.target.value})}
          />
          <TextField
          label="Authors"
          variant="outlined"
          value={editingAsset.authors}
          onChange={(e) => setEditingAsset({ ...editingAsset, authors: e.target.value})}
          />
          <Button onClick={handleSave}>Save</Button>
        </form>
      ) : (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Asset Title</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Link</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Asset Type</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Languages</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Authors</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            <Button onClick={() => getAssets()}>Refresh</Button>
          </TableRow>
        </TableHead>
        <TableBody>

          <AlertDialog
              open={openAlertDialog}
              handleClose={() => setOpenAlertDialog(false)}
              title="Confirm Delete"
              message="Are you sure you want to delete this asset?"
              onConfirm={confirmDelete}
          />

          {currentAssets.map((asset) => (
            <TableRow key={asset.asset_id}>
              <TableCell onClick={() => handleTitleClick(asset)}>
                {asset.title}
              </TableCell>
              <TableCell>{asset.asset_description}</TableCell>
              <TableCell>{asset.link}</TableCell>
              <TableCell>
                {asset.asset_type && <div>{asset.asset_type.type_name}</div>}
              </TableCell>
              <TableCell>
                {asset.languages.map((language) => (
                  <div key={language.language_id}>{language.language_name}</div>
                ))}
              </TableCell>
              <TableCell>
                {asset.authors.map((author) => (
                  <div key={author.id}>{author.user_name}</div>
                ))}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(asset)}>Edit</Button>
                <Button onClick={() => promptDelete(asset.asset_id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      
      )}


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedAsset && selectedAsset.title}</DialogTitle>
        <DialogContent>
          {/* Add detailed information here */}
          {selectedAsset && (
            <div>
              <p>Description: {selectedAsset.asset_description}</p>
              <p>Link: {selectedAsset.link}</p>
              <p>Asset Type: {selectedAsset.asset_type?.type_name}</p>
              <p>
                Languages:{" "}
                {selectedAsset.languages
                  .map((language) => language.language_name)
                  .join(", ")}
              </p>
              <p>
                Authors:{" "}
                {selectedAsset.authors
                  .map((author) => author.user_name)
                  .join(", ")}
              </p>
              <br></br>
              <p>
                Dependant Assets:{" "}
                {selectedAsset.dependent
                  .map((dependency) => dependency.title)
                  .join(", ")}
              </p>
              <p>
                Assets depending on current asset:{" "}
                {selectedAsset.dependent
                  .map((dependency) => dependency.title)
                  .join(", ")}
              </p>
              <br></br>
              <p>
                <p>
                  Audit Trail:
                  <Button onClick={() => handleViewLog(selectedAsset.asset_id)}>
                    View
                  </Button>
                </p>
                <p>
                  Discussion Board:
                  <Button onClick={() => handleViewLog(selectedAsset.asset_id)}>
                    Open
                  </Button>
                </p>
              </p>
            </div>
          )}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Pagination controls */}
      {!isEditing && (
  <>
    <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
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

export default DisplayAssets;
