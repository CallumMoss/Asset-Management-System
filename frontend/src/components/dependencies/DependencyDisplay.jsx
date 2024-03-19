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

  return (
    <Container component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              Dependent Asset
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Realtionship</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Parent Asset</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dependencyList.map((dependency) => (
            <TableRow key={dependency.id}>
              <TableCell>{dependency.asset.title}</TableCell>
              <TableCell>{dependency.relationType}</TableCell>
              <TableCell>{dependency.dependent.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default DependencyDisplay;
