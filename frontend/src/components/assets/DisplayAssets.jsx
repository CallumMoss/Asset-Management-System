//Imports:
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

// Dialog component to display logs
function LogsDialog({ logs, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Logs</DialogTitle>
      <DialogContent>
        {/* Display logs */}
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{log.updateDescription}</TableCell>
            <TableCell>{log.updateTimestamp}</TableCell>
          </TableRow>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Dialog component to display messages and send new messages
function MessagesDialog({ open, handleClose, user, asset }) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (asset && asset.asset_id) {
      refresh(asset.asset_id);
    }
  }, [asset]);

  const handleSend = async () => {
    if (newMessage.trim() !== "") {
      try {
        await axios.post("http://localhost:8080/messages/send", {
          textMessage: newMessage,
          user: user,
          asset: asset,
        });
        setNewMessage("");
        refresh(asset.asset_id);
      } catch (error) {
        console.error("Error sending message:", error);
        alert("An error occurred while sending the message.");
      }
    }
  };

  const refresh = async (assetId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/messages/refresh/${assetId}`
      );
      if (Array.isArray(response.data)) {
        const messagesFromApi = response.data;
        setMessages(messagesFromApi);
      } else {
        console.error("Unexpected response structure:", response.data);
        setMessages([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      alert("An error occurred while fetching messages.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Messages</DialogTitle>
      <DialogContent>
        {/* Display messages */}
        {messages.map((message) => (
          <TableRow key={message.messageId}>
            <TableCell>{message.textMessage}</TableCell>
            <TableCell>{message.messageSent}</TableCell>
            <TableCell>
              {message.user ? message.user.user_name : "Deleted User"}
            </TableCell>
          </TableRow>
        ))}
      </DialogContent>
      <DialogContent>
        {/* Textbox for input */}
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {/* Send button */}
        <Button onClick={handleSend} color="primary">
          Send
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Component to display and manage assets
function DisplayAssets({ username, assetList }) {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteAssetId, setDeleteAssetId] = useState(null);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState("");
  const [assetTypes, setAssetTypes] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [langList, setLangList] = useState([]);
  
  useEffect(() => {
    if(assetList.length == 0) {
      getAssets();
    }
      setAssets(assetList);
      console.log("Set assets to the searched assets.");
    
  }, [assetList]); // only called if assetList is updated.

  useEffect(() => {
    if (assetList.length === 0) {
      getAssets();
      fetchAssetTypes();
    }
    setAssets(assetList);
    getUser(username);
  }, [assetList]); // only called if assetList is updated.

  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/asset_types/refresh"
      );
      setAssetTypes(response.data);
      console.log("Fetched asset types:", response.data);
    } catch (error) {
      console.error("Error fetching asset types:", error);
    }
  };

  const getAssets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/assets/refresh");
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

  // Function to fetch user from server
  const getUser = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/finduser/${username}`
      );
      if (response.data) {
        setUser(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        setUser(null); // Fallback to null
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null); // Fallback to null in case of an error
    }
  };

  // Function to handle edit action
  const handleEdit = (assetId) => {
    console.log("Edit asset:", assetId);
    setIsEditing(true);
    // Implement your edit functionality here
    setEditingAsset({ ...assetId });
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/asset/edit", editingAsset);
      setEditingAsset(null);
    } catch (error) {
      console.error(error.response.data);
      alert("An error occured while updating the asset.");
    }
    setIsEditing(false);
  };

  const promptDelete = (assetId) => {
    setDeleteAssetId(assetId);
    setOpenAlertDialog(true);
  };

  // Function to confirm delete action
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

  // Function to handle title click
  const handleTitleClick = (asset) => {
    setSelectedAsset(asset);
    setOpenDialog(true);
  };

  // Function to handle view messages action
  const handleViewMessages = (asset) => {
    setSelectedAsset(asset);
    getUser(username);
    setOpenMessageDialog(true);
  };

  // Function to handle view log action
  const handleViewLog = (asset_id) => {
    const fetchLogs = async (assetId) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/logs/${assetId}`
        );
        if (Array.isArray(response.data)) {
          const logsFromApi = response.data;
          setLogs(logsFromApi);
          setLogsDialogOpen(true);
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
  };

  // Function to handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle message dialog close
  const handleCloseMessageDialog = () => {
    setOpenMessageDialog(false);
  };

  // Function to handle logs dialog close
  const handleCloseLogsDialog = () => {
    setLogsDialogOpen(false);
  };

  // Function to handle sorting
  const handleSort = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/assets/sort/alphabetically",
        assets
      );
      if (Array.isArray(response.data)) {
        setAssets(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        alert("Could not sort Assets. Unexpected response structure.");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      alert("Could not sort Assets. An error occurred.");
    }
  };

  return (
    <Container component={Paper}>
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
      <><h1>Assets</h1><Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Asset Title</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Link</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Asset Type</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Languages</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Authors</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Sort button */}
                    <Button
                      onClick={handleSort}
                      aria-controls="sort-menu"
                      aria-haspopup="true">
                      Sort
                    </Button>
                    {/* Refresh button */}
                    <Button onClick={() => getAssets()}>Refresh</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <AlertDialog
                open={openAlertDialog}
                handleClose={() => setOpenAlertDialog(false)}
                title="Confirm Delete"
                message="Are you sure you want to delete this asset?"
                onConfirm={confirmDelete} />

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
                    <Button onClick={() => promptDelete(asset.asset_id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table></>
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
              <br />
              <p>
                Assets that the CURRENT asset is depending on:{" "}
                {selectedAsset.dependencies
                  .map((dependency) => dependency.title)
                  .join(", ")}
              </p>
              <p>
                Assets depending on CURRENT asset:{" "}
                {selectedAsset.dependencies
                  .filter(
                    (dependency) =>
                      dependency.dependent && dependency.dependent.title
                  )
                  .map(
                    (dependency) =>
                      `${dependency.dependent.title} (${dependency.relationType})`
                  )
                  .join(", ") || "None"}
              </p>
              <br />
              <p>
                <p>
                  Audit Trail:
                  <Button onClick={() => handleViewLog(selectedAsset.asset_id)}>
                    View
                  </Button>
                </p>
                <p>
                  Discussion Board:
                  <Button onClick={() => handleViewMessages(selectedAsset)}>
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
      <LogsDialog
        logs={logs}
        open={logsDialogOpen}
        handleClose={handleCloseLogsDialog}
      />
      <MessagesDialog
        open={openMessageDialog}
        handleClose={handleCloseMessageDialog}
        asset={selectedAsset}
        user={user}
      />
    </Container>
  );
}
export default DisplayAssets;
