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
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

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
  password?: string;
  phone: string;
  address: string;
  role: string;
  isActive: boolean;
  profileImage?: string;
}

const AdminPage = () => {
  const [open, setOpen] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const { control, handleSubmit, reset, formState: { errors }, } = useForm<AdminFormInputs>({ mode: 'onChange' });
  const token = localStorage.getItem("token");
  const apiUrl = "https://user-product-api-nb1x.onrender.com/api/admin";

  const columns: GridColDef[] = [
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleEditAdmin(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/all-admins`, {
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

  const handleOpen = () => {
    setEditMode(false);
    setSelectedAdmin(null);
    reset({  // Clear fields when creating a new admin
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      role: "ADMIN", 
    });
    setOpen(true);
  };

  const handleClose = () => {
    reset();  // Reset fields on close
    setEditMode(false);
    setSelectedAdmin(null);
    setOpen(false);
  };

  const handleEditAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setEditMode(true);
    reset({
      username: admin.username,
      email: admin.email,
      phone: admin.phone.toString(),
      address: admin.address,
      role: "ADMIN",
    });
    setOpen(true);
  };

  const onSubmit: SubmitHandler<AdminFormInputs> = async (data) => {
    const requestData = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      address: data.address,
      // isActive: data.isActive,
      ...(editMode ? {} : { role: "ADMIN" }),
      ...(editMode ? {} : { password: data.password }),
    };
    try {
      if (editMode && selectedAdmin) {
        // Edit mode: Update the existing admin
        const response = await axios.put(
          `${apiUrl}/update-user/${selectedAdmin._id}`,
          requestData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("Admin Updated:", response.data);
      } else {
        // Create mode: Add a new admin
        const response = await axios.post(
          `${apiUrl}/add`,
          requestData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("Admin Created:", response.data);
      }
      fetchAdmins();
      handleClose();
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  };

  return (
    <div className="card shadow border-0 p-3 mt-5 m-4" style={{ height: "85vh" }}>
      <Box m="20px">
           <Box
          display="flex"
          alignItems="center"
          mb={2}
          justifyContent="space-between"
        >
          <Box>
          </Box>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Create Admin User
          </Button>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editMode ? "Edit Admin" : "Create New Admin"}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{
                  required: "username is required",
                  pattern: {
                    value: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
                    message:
                      "Only alphabets are allowed, and space is allowed only between words",
                  },
                  minLength: {
                    value: 4,
                    message: "username minimum 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "username cannot exceed more than 20 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Username" {...field}  error={!!errors.username}
                  helperText={errors.username?.message || ""} />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  validate: {
                    noSpaces: (value) =>
                      !/\s/.test(value) || "Email cannot contain spaces",
                    validEmail: (value) =>
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || "This is not a valid email",
                  },
                }}
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Email" {...field}  error={!!errors.email}
                  helperText={errors.email?.message || ""} />
                )}
              />
              {!editMode && (
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value: /^\S*$/,
                      message: "Password cannot contain spaces",
                    },
                    minLength: {
                      value: 8,
                      message: " minimum Password 8 ",
                    },
                  }}
                  render={({ field }) => (
                    <TextField fullWidth margin="dense" variant="filled" label="Password" type="password" {...field}  error={!!errors.password}
                    helperText={errors.password?.message || ""}/>
                  )}
                />
              )}
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: "Phone number is required",
                  validate: {
                    noSpaces: (value) =>
                      !/\s/.test(value) || "Phone number cannot contain spaces",
                    noAlphabets: (value) =>
                      /^[0-9]*$/.test(value) || "Phone number cannot contain alphabets",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number cannot exceed more than 10 digits",
                  },
                }}
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Phone" {...field}  error={!!errors.phone}
                  helperText={errors.phone?.message || ""} />
                )}
              />
              <Controller
                name="address"
                control={control}
                defaultValue=""
                rules={{
                  required: "Address is required",
                  pattern: {
                    value: /^(?!.*\s{2,})(?!\s)[a-zA-Z0-9\s]{4,30}(?<!\s)$/,
                    message: "Address canot allow more the one sapce",
                  },
                  minLength: {
                    value: 4,
                    message: "Address is more then 4 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Address cannot exceed more than 30 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Address" {...field}  error={!!errors.address}
                  helperText={errors.address?.message || ""}/>
                )}
              />
              <Controller
                name="role"
                control={control}
                defaultValue="ADMIN"
                render={({ field }) => (
                  <TextField fullWidth margin="dense" variant="filled" label="Role" {...field} disabled />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                {editMode ? "Update" : "Create"}
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
            <DataGrid style={{ height: "70vh" }} columns={columns} rows={admins}  getRowId={(row) => row._id}
            sx={{      
              "& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions": {
                margin: 0,
              },
              "& .MuiTablePagination-selectLabel": {
                paddingTop: "1rem", 
              },
            }}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AdminPage;