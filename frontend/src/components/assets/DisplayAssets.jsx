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
} from "@mui/material";
import AlertDialog from "./AlertDialog";

import ViewLog from "./ViewLogAsset";

function LogsDialog({ logs, open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Logs</DialogTitle>
      <DialogContent>
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

function MessagesDialog({ messages, open, handleClose, username, asset }) {
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");

  const handleSend = async () => {
    await getUser(username);
    if (newMessage.trim() !== "") {
      const response = await axios.post("http://localhost:8080/messages/send", {
        textMessage: newMessage,
        user: user,
        asset: asset,
      });

      setNewMessage("");
    }
  };

  const getUser = async (userName) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/finduser/${userName}`
      );

      console.log("API Response:", response.data);

      if (response.data) {
        // Assuming the response is an object, not an array
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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Messages</DialogTitle>
      <DialogContent>
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

function DisplayAssets({ username, assetList }) {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteAssetId, setDeleteAssetId] = useState(null);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);

  useEffect(() => {
    if (assetList.length == 0) {
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

  const handleViewMessages = (asset) => {
    const assetId = asset.asset_id;
    const fetchMessages = async (assetId) => {
      console.log({ assetId });
      try {
        const response = await axios.get(
          `http://localhost:8080/messages/refresh/${assetId}`
        );
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          const messagesFromApi = response.data;
          setMessages(messagesFromApi);
          setOpenMessageDialog(true);
        } else {
          console.error("Unexpected response structure:", response.data);
          setMessages([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
        alert("An error occurred while fetching logs.");
      }
    };
    fetchMessages(assetId);
    console.log({ logs });
  };

  const handleViewLog = (asset_id) => {
    const fetchLogs = async (assetId) => {
      console.log({ assetId });
      try {
        const response = await axios.get(
          `http://localhost:8080/logs/${assetId}`
        );
        console.log("API Response:", response.data);

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
    console.log({ logs });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCloseMessageDialog = () => {
    setOpenMessageDialog(false);
  };
  const handleCloseLogsDialog = () => {
    setLogsDialogOpen(false);
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
          <AlertDialog
            open={openAlertDialog}
            handleClose={() => setOpenAlertDialog(false)}
            title="Confirm Delete"
            message="Are you sure you want to delete this asset?"
            onConfirm={confirmDelete}
          />

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
        messages={messages}
        open={openMessageDialog}
        handleClose={handleCloseMessageDialog}
        username={username}
        asset={selectedAsset}
      />
    </Container>
  );
}

export default DisplayAssets;
