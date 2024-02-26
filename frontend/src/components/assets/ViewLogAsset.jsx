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

function ViewLog({ asset_id }) {
  const [logs, setLogs] = useState([]);
  console.log({ asset_id });

  useEffect(() => {
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
  }, [asset_id]);

  return (
    <div>
      {/* Display logs here using the 'logs' state */}
      {logs.map((log) => (
        <div key={log.log_id}>{/* Render log information here */}</div>
      ))}
    </div>
  );
}

export default ViewLog;
