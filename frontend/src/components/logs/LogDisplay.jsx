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

export async function fetchLogs(setLogs) {
  try {
    const response = await axios.get("http://localhost:8080/logs/refresh");
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
}

function LogDisplay() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs(setLogs);
  }, []);

  return (
    <Container component={Paper}>
      <h1>Logs</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.updateDescription}</TableCell>
              <TableCell>{log.updateTimestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default LogDisplay;
