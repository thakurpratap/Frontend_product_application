import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  published: boolean;
  image?: string;
}

const User = () => {

  const columns: GridColDef<Product>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "imag", headerName: "Image", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emain", headerName: "Email Id", flex: 1 },
    { field: "phone_number", headerName: "Phone_Number", type: "number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: () => (
        <>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
          <IconButton  color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [email, setEmail] = useState('');

  const handleCreateAdminUser = () => {
    console.log('Creating admin user with email:', email);
  };


  return (
    <div className="card shadow border-0 p-3 mt-5 m-4" style={{marginTop:"20px"}}>
      <Box m="20px">
      <Box display="flex" alignItems="center" mb={2} justifyContent='space-between'>
        <Box >
          <TextField
            variant="outlined"
            label="Search Products"
            sx={{ marginRight: "8px" }}
          />
          <Button variant="contained" color="primary" style={{ height: "6vh" }}>
            Search
          </Button>
          </Box>
          <Box >
          <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Admin User Email"
      />
          <Button variant="contained" color="primary" onClick={handleCreateAdminUser} style={{ height: "6vh" , marginLeft : '10px'}}>
          Create User
        </Button>
        </Box>
        </Box>

        <Box mt={3} sx={{ height: 400, width: "100%" }}>
          <DataGrid  columns={columns} checkboxSelection getRowId={(row) => row._id} />
        </Box>
      </Box>
    </div>
  );
};

export default User;
