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
  Menu,
  MenuItem,
} from "@mui/material";
import AlertDialog from "./AlertDialog";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ForumIcon from "@mui/icons-material/Forum";
import Box from "@mui/material/Box";

// Dialog component to display logs
function LogsDialog({ logs, open, handleClose }) {
  const formatLogTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
      const formattedTime = `${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
      return `Date: ${formattedDate} | Time: ${formattedTime}`;
    } catch (error) {
      console.error("Failed to format log time:", error);
      alert("An error occurred while formatting log time.");
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Logs</DialogTitle>
      <DialogContent>
        {/* Display logs */}
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>
              {log.updateDescription.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </TableCell>
            <TableCell>{formatLogTime(log.updateTimestamp)}</TableCell>
            <TableCell>
              {log.user ? log.user.user_name : "Deleted User"}
            </TableCell>
          </TableRow>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

//Function to display time of user activity:
function FormatTime({ timestamp }) {
  try {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    return `Date: ${formattedDate} Time: ${formattedTime}`;
  } catch (error) {
    console.error("Failed to format log time:", error);
    alert("An error occurred while formatting log time.");
  }
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

  const formatLogTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
      const formattedTime = `${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
      return `Date: ${formattedDate} | Time: ${formattedTime}`;
    } catch (error) {
      console.error("Failed to format log time:", error);
      alert("An error occurred while formatting log time.");
    }
  };

  //Function to allow users to send messages on discussion board:
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

  //Refresh button to cancel search:
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
    {
      /*Return to display asset tables along with logs.*/
    },
    (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Messages</DialogTitle>
        <DialogContent>
          {/* Display messages */}
          {messages.map((message) => (
            <TableRow key={message.messageId}>
              <TableCell>{message.textMessage}</TableCell>
              <TableCell>{formatLogTime(message.messageSent)}</TableCell>
              <TableCell>
                {message.user ? message.user.user_first_name : "Deleted User"}
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
    )
  );
}

function DisplayAssets({ username, userRole, assetList }) {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openMessageDialog, setOpenMessageDialog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [deleteAssetId, setDeleteAssetId] = useState(null);
  const [logsDialogOpen, setLogsDialogOpen] = useState(false);
  const [user, setUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentAssets = assets.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(assets.length / itemsPerPage);
  const [isEditing, setIsEditing] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = useState(null); // Anchor element for the sort menu
  const [orderBy, setOrderBy] = useState(null);
  const [parentAssets, setParentAssets] = useState([]);
  const navigate = useNavigate();
  const [editAsset, setEditAsset] = useState(null);
  const [dependencyString, setDependencyString] = useState('');


  useEffect(() => {
    if (assetList.length === 0) {
      getAssets();
      fetchAssetTypes();
    }
    setAssets(assetList);
    setCurrentPage(1);
    getUser(username);
  }, [assetList]); // only called if assetList is updated.

  const authorsToString = (authors) => {
    return authors.map((author) => author.user_name).join(", ");
  };

  const handleAuthorsChange = (e) => {
    const authorsArray = e.target.value.split(",").map((name) => {
      return { user_name: name.trim() };
    }).filter(author => author.user_name); // filter out any empty names

    setEditAsset((prevEditAsset) => ({
      ...prevEditAsset,
      authors: authorsArray,
    }));
  };

  const dependenciesToString = (dependencies) => {
    return dependencies.map(dep => `${dep.name} (${dep.relationType})`).join(", ");
  };

  const parseDependenciesString = (dependencyString) => {
    const dependencyRegex = /([^()]+)\s+\(([^()]+)\)/g;
    let match;
    const dependencies = [];

    while ((match = dependencyRegex.exec(dependencyString)) !== null) {
      if (match.index === dependencyRegex.lastIndex) {
        dependencyRegex.lastIndex++;
      }

      const [, name, relationType] = match;
      dependencies.push({ name: name.trim(), relationType: relationType.trim() });
    }

    return dependencies;
  };

  const handleDependenciesChange = (e) => {
    const newDependencyString = e.target.value;
    setDependencyString(newDependencyString);
    // Parse the new dependency string to an array of objects
    const newDependencies = parseDependenciesString(newDependencyString);
    setEditAsset(prevEditAsset => ({
      ...prevEditAsset,
      dependencies: newDependencies,
    }));
  };


  //Fucntion to get AssetType values:s
  const fetchAssetTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/asset_types/refresh"
      );
      //setAssetTypes(response.data);
      console.log("Fetched asset types:", response.data);
    } catch (error) {
      console.error("Error fetching asset types:", error);
    }
  };

  //Function to get Asset data:
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

  //Function to get the dependent that dependencies depend on:
  const getParentDependencies = async (asset_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/assetdependency/findparent/${asset_id}`
      );
      if (Array.isArray(response.data)) {
        setParentAssets(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        setParentAssets([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch parent assets:", error);
      alert("An error occurred while parent assets.");
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

  const handleEditClick = (asset) => {
    // Map over the dependencies to create a new structure if dependencies exist
    const dependencies = asset.dependencies ? asset.dependencies.map(dep => ({
      name: dep.dependent.title, // Make sure 'title' is the correct property for the dependent asset's name
      relationType: dep.relationType
    })) : [];

    setEditAsset({
      ...asset,
      dependencies, // Set the transformed dependencies
      typeAttribute1: asset.typeAttributeValue1,
      typeAttribute2: asset.typeAttributeValue2,
      typeAttribute3: asset.typeAttributeValue3
    });
    setIsEditing(true);
    // Convert the mapped dependencies to a string representation
    setDependencyString(dependenciesToString(dependencies));
  };
  // Function to handle changes to the edit asset form fields
  const handleEditChange = (e, field) => {
    setEditAsset((prevEditAsset) => ({
      ...prevEditAsset,
      [field]: e.target.value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editAsset) {
      const dependencies = parseDependenciesString(dependencyString);

      // Use the correct property name for asset_type if it's an object
      const assetType = typeof editAsset.asset_type === 'object'
        ? editAsset.asset_type.type_name
        : editAsset.asset_type;

      // Use the correct property name 'user_name' for authors
      const authors = editAsset.authors
        ? editAsset.authors.map(author => author.user_name)
        : [];

      // Prepare the payload
      const payload = {
        asset_id: editAsset.asset_id,
        title: editAsset.title,
        asset_description: editAsset.asset_description,
        link: editAsset.link,
        asset_type: assetType,
        authors: authors,
        dependencies: dependencies,
        typeAttributeValue1: editAsset.typeAttribute1 || '',
        typeAttributeValue2: editAsset.typeAttribute2 || '',
        typeAttributeValue3: editAsset.typeAttribute3 || '',
      };

      try {
        const response = await axios.post(
          `http://localhost:8080/assets/edit/${username}`, // Ensure username is defined and correct
          payload
        );
        console.log("Asset updated:", response.data);
        setIsEditing(false);
        setEditAsset(null);
        getAssets(); // Refresh the assets list
      } catch (error) {
        console.error("Failed to update asset:", error);
        alert("An error occurred while updating the asset.");
      }
    }
  };


  const promptDelete = (assetId) => {
    setDeleteAssetId(assetId);
    setOpenAlertDialog(true);
  };

  // Function to confirm delete action
  const confirmDelete = async () => {
    if (deleteAssetId !== null) {
      try {
        await axios.delete(
          `http://localhost:8080/assets/${deleteAssetId}/username=${username}`
        );
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
    getParentDependencies(asset.asset_id);
    setOpenDialog(true);
  };
  const handleShowDependencies = () => {
    navigate("/dependency");
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
  const handleSortBy = async (orderBy) => {
    try {
      setOrderBy(orderBy);
      const response = await axios.post(
        "http://localhost:8080/assets/sort",
        assets,
        { params: { orderBy: orderBy } }
      );
      if (Array.isArray(response.data)) {
        setAssets(response.data);
        setCurrentPage(1);
      } else {
        console.error("Unexpected response structure:", response.data);
        alert("Could not sort Assets. Unexpected response structure.");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      alert("Could not sort Assets. An error occurred.");
    }
  };

  const groupByAssetType = (assets) => {
    const groupedAssets = {};
    assets.forEach((asset) => {
      const assetType = asset.asset_type?.type_name || "Unknown";
      if (!groupedAssets[assetType]) {
        groupedAssets[assetType] = [];
      }
      groupedAssets[assetType].push(asset);
    });
    return groupedAssets;
  };

  // Group the assets by asset type
  const groupedAssets = groupByAssetType(assets);

  return (
    {
      /*Return to display all Asset tables on asset management page.*/
    },
    (
      <Container component={Paper}>
        {/* Iterate over each asset type group */}
        {isEditing && editAsset && (
          <Box
            component="form"
            onSubmit={handleEditSubmit}
            noValidate
            sx={{ mt: 1 }}>
            {/* Input fields for asset attributes, e.g., title, description */}
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editAsset.title}
              onChange={(e) => handleEditChange(e, "title")}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editAsset.asset_description}
              multiline
              rows={4}
              onChange={(e) => handleEditChange(e, "asset_description")}
            />
            <TextField
              label="Type"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editAsset.asset_type ? editAsset.asset_type.type_name : ""}
              onChange={(e) => handleEditChange(e, "asset_type", "type_name")}
            />
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editAsset.link}
              onChange={(e) => handleEditChange(e, "link")}
            />
            <TextField
              label="Authors"
              variant="outlined"
              fullWidth
              margin="normal"
              value={
                editAsset.authors ? authorsToString(editAsset.authors) : ""
              }
              onChange={handleAuthorsChange}
            />

            <TextField
              label="Dependencies"
              variant="outlined"
              fullWidth
              margin="normal"
              value={dependencyString}
              onChange={handleDependenciesChange}
            />


            <TextField
              label="Type Attribute Value 1"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editAsset.typeAttribute1 || ""}
              onChange={(e) => handleEditChange(e, "typeAttribute1")}
            />
            <TextField
              label="Type Attribute Value 2"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editAsset.typeAttribute2}
              onChange={(e) => handleEditChange(e, "typeAttribute2")}
            />
            <TextField
              label="Type Attribute Value 3"
              variant="outlined"
              fullWidth
              margin="normal"
              value={editAsset.typeAttribute3}
              onChange={(e) => handleEditChange(e, "typeAttribute3")}
            />

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}>
                Save
              </Button>
            </Box>
          </Box>
        )}
        {/* The rest of your component, where you would have a button to trigger edit mode */}


        {Object.entries(groupedAssets).map(([assetType, assets]) => (
          <div key={assetType}>
            <h2
              style={{
                fontWeight: "bold",
                marginTop: "60px",
                fontSize: "1.5em",
              }}>
              {assetType}
            </h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                    Asset Title
                  </TableCell>
                  <TableCell style={{ width: "20%", fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                    Link
                  </TableCell>
                  <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                    Authors
                  </TableCell>
                  <TableCell style={{ width: "15%", fontWeight: "bold" }}>
                    Create Date
                  </TableCell>
                  <TableCell style={{ width: "20%" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {/* Sort button:*/}
                      <Button
                        onClick={(e) => setSortAnchorEl(e.currentTarget)}
                        aria-controls="sort-menu"
                        aria-haspopup="true">
                        Sort
                      </Button>
                      {/*Menu for sortby options:*/}
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
                        <MenuItem
                          onClick={() => handleSortBy("Alphabetically")}>
                          Alphabetically
                        </MenuItem>
                      </Menu>
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
                  onConfirm={confirmDelete}
                />

                {assets.map((asset) => (
                  <TableRow key={asset.asset_id}>
                    <TableCell onClick={() => handleTitleClick(asset)}>
                      {asset.title}
                    </TableCell>
                    <TableCell style={{ width: "25%" }}>
                      {asset.asset_description}
                    </TableCell>
                    <TableCell style={{ width: "20%", color: "blue" }}>
                      <a
                        href={
                          asset.link.startsWith("http")
                            ? asset.link
                            : `http://${asset.link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer">
                        {asset.link}
                      </a>
                    </TableCell>

                    <TableCell style={{ width: "15%" }}>
                      {asset.authors.map((author) => (
                        <div key={author.id}>{author.user_name}</div>
                      ))}
                    </TableCell>
                    <TableCell style={{ width: "15%" }}>
                      {FormatTime({ timestamp: asset.updateTimestamp })}
                    </TableCell>
                    <TableCell style={{ width: "10%" }}>
                      {/*Edit button:*/}
                      {userRole !== "Viewer" && (
                        <Button onClick={() => handleEditClick(asset)}>
                          Edit
                        </Button>
                      )}
                      {/*Delete button:*/}
                      {userRole !== "Viewer" && (
                        <Button onClick={() => promptDelete(asset.asset_id)}>
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth>
          <DialogTitle>{selectedAsset?.title || "Asset Details"}</DialogTitle>
          <DialogContent>
            {selectedAsset ? (
              <div>
                <Typography variant="body1">
                  <strong>Description:</strong>{" "}
                  {selectedAsset.asset_description}
                </Typography>
                <Typography variant="body1">
                  <strong>Link:</strong>{" "}
                  <Link
                    href={
                      selectedAsset.link.startsWith("http")
                        ? selectedAsset.link
                        : `http://${selectedAsset.link}`
                    }
                    style={{ color: "blue" }}
                    target="_blank"
                    rel="noopener noreferrer">
                    {selectedAsset.link}
                  </Link>
                </Typography>
                <Typography variant="body1">
                  <strong>Asset Type:</strong>{" "}
                  {selectedAsset.asset_type?.type_name}
                </Typography>
                <Typography variant="body1">
                  <strong>Authors:</strong>{" "}
                  {selectedAsset.authors
                    .map((author) => author.user_name)
                    .join(", ")}
                </Typography>
                <br />
                {/* Conditional rendering for type attributes */}
                {selectedAsset.asset_type.typeAttribute1 && (
                  <Typography variant="body1">
                    <strong>{selectedAsset.asset_type.typeAttribute1}: </strong>
                    {selectedAsset.typeAttributeValue1}
                  </Typography>
                )}
                {selectedAsset.asset_type.typeAttribute2 && (
                  <Typography variant="body1">
                    <strong>{selectedAsset.asset_type.typeAttribute2}: </strong>
                    {selectedAsset.typeAttributeValue2}
                  </Typography>
                )}
                {selectedAsset.asset_type.typeAttribute3 && (
                  <Typography variant="body1">
                    <strong>{selectedAsset.asset_type.typeAttribute3}: </strong>
                    {selectedAsset.typeAttributeValue3}
                  </Typography>
                )}
                <br />
                {/* Dependencies */}

                <Typography variant="body1">
                  <strong>{selectedAsset.title} depends on:</strong>{" "}
                  {parentAssets
                    .map(
                      (dependency) =>
                        `${dependency.asset.title} (${dependency.relationType})`
                    )
                    .join(", ") || "No asset"}
                </Typography>
                <Typography variant="body1">
                  <strong>Dependents on {selectedAsset.title}:</strong>{" "}
                  {selectedAsset.dependencies
                    .filter((dep) => dep.dependent && dep.dependent.title)
                    .map(
                      (dependency) =>
                        `${dependency.dependent.title} (${dependency.relationType})`
                    )
                    .join(", ") || "No asset"}
                </Typography>

                <br />
                {/* Actions */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleShowDependencies}
                  startIcon={<VisibilityIcon />}>
                  All dependencies
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewLog(selectedAsset.asset_id)}
                  startIcon={<ListAltIcon />}>
                  Audit Trail
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewMessages(selectedAsset)}
                  startIcon={<ForumIcon />}>
                  Discussion Board
                </Button>
              </div>
            ) : (
              <Typography variant="body1">No asset selected</Typography>
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

        {/* Pagination controls */}
        {!isEditing && (
          <>
            {/*Previous button:*/}
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </Button>
            {/*Next button:*/}
            <Button
              disabled={currentPage === nPages}
              onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </Button>
          </>
        )}
      </Container>
    )
  );
}
export default DisplayAssets;