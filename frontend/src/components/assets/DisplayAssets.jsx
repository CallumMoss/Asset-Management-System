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
} from "@mui/material";
import ViewLog from "./ViewLogAsset"
function DisplayAssets({assetList}) {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if(assetList.length == 0) {
      getAssets();
    }
      setAssets(assetList);
      console.log("Set assets to the searched assets.");
    
  }, [assetList]); // only called if assetList is updated.

  const getAssets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/assets/refresh");
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
    // Implement your edit functionality here
  };

  const handleDelete = async (assetId) => {
    try {
      await axios.delete(`http://localhost:8080/assets/${assetId}`);
      getAssets();
      console.log("Asset deleted successfully:", assetId);
    } catch (error) {
      console.error("Axios Error:", error);
      alert("An error occurred while deleting the asset.");
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
          {assets.map((asset) => (
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
                <Button onClick={() => handleEdit(asset.asset_id)}>Edit</Button>
                <Button onClick={() => handleDelete(asset.asset_id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </Container>
  );
}

export default DisplayAssets;
