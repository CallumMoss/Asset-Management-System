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
import AlertDialog from "./AlertDialog";
//Imports

//Function to display dependencies:
function DependencyDisplay({ username, dependencyList, refreshDependencies }) {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDependencyId, setDeleteDependencyId] = useState(null);

  // Group dependencies by parent asset
  const groupedDependencies = dependencyList.reduce((acc, dependency) => {
    const parentAsset = dependency.asset.title;
    if (!acc[parentAsset]) {
      acc[parentAsset] = [];
    }
    acc[parentAsset].push(dependency);
    return acc;
  }, {});

  //Function to call display comfirmation of deletion:
  const promptDeleteConfirmation = (dependency) => {
    setDeleteDependencyId(dependency.id);
    setOpenDialog(true);
  };

  //Function to handle deletion alert:
  const handleDeleteConfirmation = async () => {
    if (deleteDependencyId !== null) {
      try {
        await axios.delete(
          `http://localhost:8080/assetdependency/${deleteDependencyId}/${username}`
        );
        setOpenDialog(false);
        console.log("Dependency deleted successfully:", deleteDependencyId);
      } catch (error) {
        console.error("Axios Error:", error);
        alert("An error occurred while deleting the dependency.");
      }
    }
  };

  return (
    //Return wanted format of dependency page:
    <Container component={Paper}>
      {Object.keys(groupedDependencies).map((parentAsset) => (
        <div key={parentAsset}>
          <h2 style={{ fontWeight: "bold", marginTop: "20px" }}>
            Parent Asset: {parentAsset}
          </h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Dependent Asset
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Relationship
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  <Button>Sort</Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedDependencies[parentAsset].map((dependency) => (
                <TableRow key={dependency.id}>
                  <TableCell>{dependency.dependent.title}</TableCell>
                  <TableCell>{dependency.relationType}</TableCell>

                  <TableCell>
                    {/*Delete button*/}
                    <Button
                      onClick={() => promptDeleteConfirmation(dependency)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <AlertDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title="Confirm Delete"
                message="Are you sure you want to delete this dependency?"
                onConfirm={handleDeleteConfirmation}
              />
            </TableBody>
          </Table>
        </div>
      ))}
    </Container>
  );
}
export default DependencyDisplay;