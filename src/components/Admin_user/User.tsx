import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface Admin {
  _id: string;
  username: string;
  email: string;
  phone: number;
  address: string;
  role: string;
  isActive: boolean;
  profileImage: string;
}

interface AdminFormInputs {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: string;
  isActive: boolean;
  profileImage?: string;
}

const Admin_Usermanagement = () => {
  const [open, setOpen] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { control, handleSubmit, reset } = useForm<AdminFormInputs>();
  const token = localStorage.getItem("token");
  const apiUrl = "https://user-product-api-nb1x.onrender.com/api/admin";

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
  ];

  const fetchAdmins = async () => {
    setLoading(true);
    
    try {
      const response = await axios.get(`${apiUrl}/partners-added-by-admin`, {
        headers: {
          Authorization: token,
        },
      });
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset();
    setOpen(false);
  };

  const onSubmit: SubmitHandler<AdminFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        `${apiUrl}/add-partner`,
        {
          username: data.username,
          email: data.email,
          password: data.password,
          phone: data.phone,
          address: data.address,
          role: data.role,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Admin Created:", response.data);
      fetchAdmins();
      handleClose();
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };

  return (
    <div className="card shadow border-0 p-3 mt-5 m-4" style={{ height: "85vh" }}>
      <Box m="20px">
        <Box display="flex" alignItems="center" mb={2} justifyContent="space-between">
          <Box>
            <TextField variant="outlined" label="Search Admins" sx={{ marginRight: "8px" }} />
            <Button variant="contained" color="primary" style={{ height: "6vh" }}>
              Search
            </Button>
          </Box>
          <Box>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{ height: "6vh", marginLeft: "10px" }}>
              Create Partner
            </Button>
          </Box>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Partner</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Username" {...field} />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Email" {...field} />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Password" type="password" {...field} />
                )}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Phone" {...field} />
                )}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Address" {...field} />
                )}
              />
              <Controller
                name="role"
                control={control}
                defaultValue="PARTNER"
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Role" {...field} />
                )}
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
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" style={{ height: "70vh" }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid style={{ height: "70vh" }} columns={columns} rows={admins} checkboxSelection getRowId={(row) => row._id} />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Admin_Usermanagement;












