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

function DependencyDisplay({ dependencyList }) {
  const navigate = useNavigate();

  // Group dependencies by parent asset
  const groupedDependencies = dependencyList.reduce((acc, dependency) => {
    const parentAsset = dependency.asset.title;
    if (!acc[parentAsset]) {
      acc[parentAsset] = [];
    }
    acc[parentAsset].push(dependency);
    return acc;
  }, {});

  return (
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
                  Relationship
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Dependent Asset
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupedDependencies[parentAsset].map((dependency) => (
                <TableRow key={dependency.id}>
                  <TableCell>{dependency.relationType}</TableCell>
                  <TableCell>{dependency.dependent.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </Container>
  );
}

export default DependencyDisplay;
