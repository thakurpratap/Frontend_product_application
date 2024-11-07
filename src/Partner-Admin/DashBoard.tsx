import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DashBoard: React.FC = () => {
  const rows = [
    { id: 1, name: "John Doe", gender: "Male", status: "Active", createdDate: "2024-11-05" },
    { id: 2, name: "Jane Smith", gender: "Female", status: "Inactive", createdDate: "2024-10-15" },
    { id: 3, name: "Alice Johnson", gender: "Female", status: "Active", createdDate: "2024-09-22" },
  ];

  return (
    <Box sx={{ width:"100vw", marginLeft:"16%" }}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.createdDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DashBoard;
