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
//Imports

//Function to display logs in table:
function LogDisplay({ logList }) {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(logs.length / itemsPerPage);



  useEffect(() => {
    if (logList.length == 0) {
      fetchLogs();
    } else {
      setLogs(logList);
      console.log("Set logs to the searched logs.");
    }
  }, [logList]); // only called if logList is updated.

  //Function to get Log data:
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
  };

  //Function to format time of new log information:
  const formatLogTime = (timestamp) => {
    try {
      console.log(logs);
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
    //Returning wanted format of Logs table:
    <Container component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Time</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.updateDescription}</TableCell>
              <TableCell>{formatLogTime(log.updateTimestamp)}</TableCell>
              <TableCell>
                {log.user ? log.user.user_name : "Deleted User"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        {/* Pagination controls */}
        {(
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
export default LogDisplay;