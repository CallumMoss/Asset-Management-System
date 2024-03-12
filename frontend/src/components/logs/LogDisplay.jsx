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



function LogDisplay({logList}) {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(logList.length == 0) {
      fetchLogs();
    }
    else {
      setLogs(logList);
      console.log("Set logs to the searched logs.");
    }
  }, [logList]); // only called if logList is updated.
  
  const fetchLogs = async () => {
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
  
  const formatLogTime = (timestamp) => {
    try {
      console.log(logs);
      const date = new Date(timestamp);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
      return `Date: ${formattedDate} | Time: ${formattedTime}`;
    } catch (error) {
      console.error("Failed to format log time:", error);
      alert("An error occurred while formatting log time.");
    }
  };
  
  return (
    <Container component={Paper}>
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
              <TableCell>{formatLogTime(log.updateTimestamp)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default LogDisplay;
