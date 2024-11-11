import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  published: boolean;
  image?: string;
}

interface UserFormInputs {
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  phone: string;
}

const Admin_Usermanagement = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<UserFormInputs>();

  const columns: GridColDef<Product>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "imag", headerName: "Image", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emain", headerName: "Email Id", flex: 1 },
    { field: "phone_number", headerName: "Phone_Number", type: "number", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    console.log("Creating user with data:", data);
    handleClose(); // Close dialog after submission
  };

  return (
    <div className="card shadow border-0 p-3 mt-5 m-4" style={{ marginTop: "20px" }}>
      <Box m="20px">
        <Box display="flex" alignItems="center" mb={2} justifyContent="space-between">
          <Box>
            <TextField variant="outlined" label="Search Products" sx={{ marginRight: "8px" }} />
            <Button variant="contained" color="primary" style={{ height: "6vh" }}>
              Search
            </Button>
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{ height: "6vh", marginLeft: "10px" }}>
              Create User
            </Button>
          </Box>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New User</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField fullWidth margin="dense" variant="filled" label="User Name" {...field} />}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField fullWidth margin="dense" variant="filled" label="Email" {...field} />}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField fullWidth margin="dense" variant="filled" label="Password" type="password" {...field} />}
              />
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField fullWidth margin="dense" variant="filled" label="Role" {...field} />}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField fullWidth margin="dense" variant="filled" label="Address" {...field} />}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField fullWidth margin="dense" variant="filled" label="Phone Number" {...field} />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Box mt={3} sx={{ height: 400, width: "100%" }}>
          <DataGrid columns={columns} checkboxSelection getRowId={(row) => row._id} />
        </Box>
      </Box>
    </div>
  );
};

export default Admin_Usermanagement;