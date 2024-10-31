import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  published: boolean;
  image?: string;
}

interface NewProduct {
  name: string;
  description: string;
  price: number;
  rating: number;
  published: boolean;
  image: File | null;
}

const queryClient = new QueryClient();

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    published: false,
    image: null,
  });

  const token = localStorage.getItem("token");

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get<Product[]>("https://user-product-api-nb1x.onrender.com/api/products/", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: NewProduct) => {
      if (!product.name || !product.description || !product.price || !product.image) {
        throw new Error("All fields are required");
      }

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("rating", product.rating.toString());
      formData.append("published", JSON.stringify(product.published));
      formData.append("image", product.image);

      await axios.post("https://user-product-api-nb1x.onrender.com/api/products/add", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      refetch();
      setOpen(false);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        rating: 0,
        published: false,
        image: null,
      });
    },
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : name === "image" && files ? files[0] : value,
    }));
  };

  const handleCreateProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.image || newProduct.price <= 0) {
      alert("Please fill in all required fields with valid values.");
      return;
    }

    createProductMutation.mutate(newProduct);
  };

  const columns: GridColDef<Product>[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", type: "number", flex: 1 },
    { field: "rating", headerName: "Rating", type: "number", flex: 1 },
    { field: "published", headerName: "Published", flex: 1 },
  ];

  return (
    <div className="card shadow border-0 p-3 mt-5 m-4">
      <Box m="20px">
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Create Product
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogContent>
            <TextField fullWidth margin="dense" variant="filled" label="Product Name" name="name" value={newProduct.name} onChange={handleChange} />
            <TextField fullWidth margin="dense" variant="filled" label="Description" name="description" value={newProduct.description} onChange={handleChange} />
            <TextField fullWidth margin="dense" variant="filled" label="Price" name="price" type="number" value={newProduct.price} onChange={handleChange} />
            <TextField fullWidth margin="dense" variant="filled" label="Rating" name="rating" type="number" value={newProduct.rating} onChange={handleChange} />
            <TextField fullWidth margin="dense" variant="filled" type="file" name="image" onChange={handleChange} />
            <FormControlLabel
              control={<Checkbox checked={newProduct.published} onChange={(e) => setNewProduct({ ...newProduct, published: e.target.checked })} />}
              label="Published"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateProduct} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>

        <Box mt={3} sx={{ height: 400, width: "100%" }}>
          <DataGrid rows={products} columns={columns}  checkboxSelection  getRowId={(row) => row._id} />
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;























// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { QueryClient, QueryClientProvider, useQuery, useMutation } from "@tanstack/react-query";
// import axios from "axios";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   published: boolean;
// }

// const queryClient = new QueryClient();

// const Dashboard: React.FC = () => {
//   const [open, setOpen] = useState(false);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     rating: 0,
//     published: false,
//   });
//   const token = localStorage.getItem('token'); // Retrieve token from local storage

//   const { data: products = [], refetch } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const response = await axios.get<Product[]>("https://user-product-api-nb1x.onrender.com/api/products/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     },
//   });

//   const createProductMutation = useMutation({
//     mutationFn: async (product: Omit<Product, "id">) => {
//       await axios.post("https://user-product-api-nb1x.onrender.com/api/products/add", product, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     },
//     onSuccess: () => {
//       refetch();
//       setOpen(false);
//       setNewProduct({ name: "", description: "", price: 0, rating: 0, published: false });
//     },
//   });

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]: name === "price" || name === "rating" ? Number(value) : value,
//     }));
//   };

//   const handleCreateProduct = () => {
//     createProductMutation.mutate(newProduct);
//   };

//   const columns: GridColDef<Product>[] = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "description", headerName: "Description", flex: 1 },
//     { field: "price", headerName: "Price", type: "number", flex: 1 },
//     { field: "rating", headerName: "Rating", type: "number", flex: 1 },
//     { field: "published", headerName: "Published", flex: 1 },
//   ];

//   return (
//     <div className="card shadow border-0 p-3 mt-5 m-4">
//     <Box m="20px">
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Create Product
//       </Button>

//       {/* Dialog for creating a new product */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Create New Product</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             margin="dense"
//             variant="filled"
//             label="Product Name"
//             name="name"
//             value={newProduct.name}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             variant="filled"
//             label="Description"
//             name="description"
//             value={newProduct.description}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             variant="filled"
//             label="Price"
//             name="price"
//             type="number"
//             value={newProduct.price}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             variant="filled"
//             label="Rating"
//             name="rating"
//             type="number"
//             value={newProduct.rating}
//             onChange={handleChange}
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={newProduct.published}
//                 onChange={(e) => setNewProduct({ ...newProduct, published: e.target.checked })}
//               />
//             }
//             label="Published"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleCreateProduct} color="primary">
//             Create
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* DataGrid for displaying products */}
//       <Box mt={3} sx={{ height: 400, width: "100%" }}>
//         <DataGrid rows={products} columns={columns} checkboxSelection />
//         {/* <DataGrid rows={products} columns={columns} checkboxSelection /> */}
//         {/* <DataGrid
//     rows={products}
//     columns={columns}
//     checkboxSelection
//     initialState={{
//       pagination: {
//         paginationModel: { pageSize: 5 },
//       },
//     }}
//     pageSizeOptions={[5, 10, 20]}
//   /> */}
//       </Box>
//     </Box>
//     </div>
//   );
// };
// export default Dashboard;






















































































// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid"; // Import necessary types
// import VisibilityIcon from "@mui/icons-material/Visibility"; // Icon for View
// import EditIcon from "@mui/icons-material/Edit"; // Icon for Edit
// import DeleteIcon from "@mui/icons-material/Delete"; // Icon for Delete
// import { useForm } from "react-hook-form";

// interface User {
//   id: number;
//   name: string;
//   description: string;
//   published: string;
//   price: number;
//   rating: number;
//   access: string;
//   publish: boolean;
//   image: FileList | null; // To handle image upload
// }

// type UserRow = User;

// const Dashboard: React.FC = () => {
//   const colors = {
//     primary: "#1976d2",
//     secondary: "#dc004e",
//     success: "#2e7d32",
//     error: "#d32f2f",
//     warning: "#ed6c02",
//     info: "#0288d1",
//     light: "#f5f5f5",
//     dark: "#212121",
//     greenAccent: {
//       300: "#66bb6a",
//       600: "#43a047",
//       700: "#388e3c",
//     },
//     blueAccent: {
//       700: "#1976d2",
//     },
//     grey: {
//       100: "#f5f5f5",
//     },
//   };

//   // State to manage dialog visibility
//   const [open, setOpen] = useState(false);
//   const [newProduct, setNewProduct] = useState<{
//     name: string;
//     description: string;
//     price: number;
//   }>({
//     name: "",
//     description: "",
//     price: 0,
//   });

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleCreateProduct = () => {
//     console.log("New Product Created:", newProduct);
//     // Implement the logic to create a new product here
//     setOpen(false);
//     setNewProduct({ name: "", description: "", price: 0 }); // Reset the form
//   };

//   const columns: GridColDef<UserRow>[] = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "published",
//       headerName: "Image",
//       flex: 1,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       flex: 1,
//     },
//     {
//       field: "rating",
//       headerName: "Rating",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (
//         params: { row: UserRow } // Provide explicit type for params
//       ) => (
//         <Box display="flex" justifyContent="space-around">
//           <VisibilityIcon
//             sx={{ cursor: "pointer" }}
//             onClick={() => handleView(params.row)}
//           />
//           <EditIcon
//             sx={{ cursor: "pointer", color: colors.secondary }}
//             onClick={() => handleEdit(params.row)}
//           />
//           <DeleteIcon
//             sx={{ cursor: "pointer", color: colors.error }}
//             onClick={() => handleDelete(params.row.id)}
//           />
//         </Box>
//       ),
//     },
//   ];

//   const handleView = (row: UserRow) => {
//     console.log("View user:", row);
//     // Implement view logic here
//   };

//   const handleEdit = (row: UserRow) => {
//     console.log("Edit user:", row);
//     // Implement edit logic here
//   };

//   const handleDelete = (id: number) => {
//     console.log("Delete user with id:", id);
//     // Implement delete logic here
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<User>({
//     mode: "onBlur",
//   });

//   return (
//     <div className="card shadow border-0 p-3 mt-5 m-4">
//       <Box m="20px">
//         <Button variant="contained" color="primary" onClick={handleClickOpen}>
//           Create Product
//         </Button>

//         {/* Dialog for creating a new product */}
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>Create New Product</DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Product Name"
         
//               {...register("name", { required: "Name is required" })}
//               error={!!errors.name}
//               helperText={errors.name?.message}
//               // sx={{ gridColumn: "span 2" }}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Description"
            
//               {...register("description", {
//                 required: "Description is required",
//               })}
//               error={!!errors.description}
//               helperText={errors.description?.message}
//               // sx={{ gridColumn: "span 4" }}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Price"
//               type="number"
             
//               {...register("price", {
//                 required: "Price is required",
//                 valueAsNumber: true,
//               })}
//               error={!!errors.price}
//               helperText={errors.price?.message}
//               // sx={{ gridColumn: "span 2" }}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Rating"
//               type="number"
              
//               {...register("rating", {
//                 required: "Rating is required",
//                 valueAsNumber: true,
//               })}
//               error={!!errors.rating}
//               helperText={errors.rating?.message}
//               // sx={{ gridColumn: "span 2" }}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Publish"
            
//               // type="checkbox"
//               {...register("publish")}
//               // sx={{ gridColumn: "span 2" }}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Upload Image"
//               type="file"
//               inputProps={{ accept: "image/*" }}
//               {...register("image", { required: "Image is required" })}
//               error={!!errors.image}
//               helperText={errors.image?.message}
//               // sx={{ gridColumn: "span 4" }}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleCreateProduct} color="primary">
//               Create
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Box
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: "none",
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//             },
//             "& .name-column--cell": {
//               color: colors.greenAccent[300],
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: colors.blueAccent[700],
//               borderBottom: "none",
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               backgroundColor: colors.primary,
//             },
//             "& .MuiDataGrid-footerContainer": {
//               borderTop: "none",
//               backgroundColor: colors.blueAccent[700],
//             },
//           }}
//         >
//           <DataGrid checkboxSelection rows={[]} columns={columns} />
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Dashboard;









      {/* <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Product Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newProduct.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="outlined"
              value={newProduct.description}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="outlined"
              value={newProduct.price}
              onChange={handleChange}
            /> */}

// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid"; // Import necessary types
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import VisibilityIcon from "@mui/icons-material/Visibility"; // Icon for View
// import EditIcon from "@mui/icons-material/Edit"; // Icon for Edit
// import DeleteIcon from "@mui/icons-material/Delete"; // Icon for Delete

// interface User {
//   id: number;
//   name: string;
//   description: string;
//   published: string;
//   price: number;
//   rating: number;
//   access: string;
// }

// type UserRow =  User;

// const Dashboard: React.FC = () => {
//   const colors = {
//     primary: "#1976d2",
//     secondary: "#dc004e",
//     success: "#2e7d32",
//     error: "#d32f2f",
//     warning: "#ed6c02",
//     info: "#0288d1",
//     light: "#f5f5f5",
//     dark: "#212121",
//     greenAccent: {
//       300: "#66bb6a",
//       600: "#43a047",
//       700: "#388e3c",
//     },
//     blueAccent: {
//       700: "#1976d2",
//     },
//     grey: {
//       100: "#f5f5f5",
//     },
//   };

//   const columns: GridColDef<UserRow>[] = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "published",
//       headerName: "Image",
//       flex: 1,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       flex: 1,
//     },
//     {
//       field: "rating",
//       headerName: "Rating",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params: { row: UserRow }) => ( // Provide explicit type for params
//         <Box display="flex" justifyContent="space-around">
//           <VisibilityIcon
//             sx={{ cursor: 'pointer' }}
//             onClick={() => handleView(params.row)}
//           />
//           <EditIcon
//             sx={{ cursor: 'pointer', color: colors.secondary }}
//             onClick={() => handleEdit(params.row)}
//           />
//           <DeleteIcon
//             sx={{ cursor: 'pointer', color: colors.error }}
//             onClick={() => handleDelete(params.row.id)}
//           />
//         </Box>
//       ),
//     },
//   ];

//   const handleView = (row: UserRow) => {
//     console.log("View user:", row);
//     // Implement view logic here
//   };

//   const handleEdit = (row: UserRow) => {
//     console.log("Edit user:", row);
//     // Implement edit logic here
//   };

//   const handleDelete = (id: number) => {
//     console.log("Delete user with id:", id);
//     // Implement delete logic here
//   };

//   return (
//     <div className="card shadow border-0 p-3 mt-5 m-4">
//       <Box m="20px">
//         <Box
//           sx={{
//             "& .MuiDataGrid-root": {
//               border: "none",
//             },
//             "& .MuiDataGrid-cell": {
//               borderBottom: "none",
//             },
//             "& .name-column--cell": {
//               color: colors.greenAccent[300],
//             },
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: colors.blueAccent[700],
//               borderBottom: "none",
//             },
//             "& .MuiDataGrid-virtualScroller": {
//               backgroundColor: colors.primary,
//             },
//             "& .MuiDataGrid-footerContainer": {
//               borderTop: "none",
//               backgroundColor: colors.blueAccent[700],
//             },
//           }}
//         >
//           <DataGrid checkboxSelection rows={[]} columns={columns} />
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Dashboard;

// import { Box, Typography } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

// interface User {
//   id: number;
//   access: string;
// }
// const Dashboard = () => {

// const colors = {
//     primary: "#1976d2",
//     secondary: "#dc004e",
//     success: "#2e7d32",
//     error: "#d32f2f",
//     warning: "#ed6c02",
//     info: "#0288d1",
//     light: "#f5f5f5",
//     dark: "#212121",
//     greenAccent: {
//       300: "#66bb6a",
//       600: "#43a047",
//       700: "#388e3c",
//     },
//     blueAccent: {
//       700: "#1976d2",
//     },
//     grey: {
//       100: "#f5f5f5",
//     },
//   };
//   const columns = [
//     { field: "id", headerName: "ID" },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//       cellClassName: "name-column--cell",
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       headerAlign: "left",
//       align: "left",
//     },
//     {
//       field: "published",
//       headerName: "image",
//       flex: 1,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       flex: 1,
//     },
//     {
//       field: "rating",
//       headerName: "Rating",
//       flex: 1,
//     },
//     {
//       field: "accessLevel",
//       headerName: "Access Level",
//       flex: 1,
//       renderCell: ({ row: { access : User} }) => {
//         const { access } = row;
//         return (
//           <Box
//             width="60%"
//             m="0 auto"
//             p="5px"
//             display="flex"
//             justifyContent="center"
//             borderRadius="4px"
//           >
//             {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
//             {access === "manager" && <SecurityOutlinedIcon />}
//             {access === "user" && <LockOpenOutlinedIcon />}
//             <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
//               {access}
//             </Typography>
//           </Box>
//         );
//       },
//     },
//   ];

//   return (
//     <div className="card shadow border-0 p-3 mt-5 m-4">
//     <Box m="20px">
//       {/* <Header title="TEAM" subtitle="Managing the Team Members" /> */}
//       <Box
//         // m="40px 0 0 0"
//         // height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//         }}
//       >
//         <DataGrid checkboxSelection rows='' columns={columns} />
//       </Box>
//      </Box>
//      </div>
//   );
// };

// export default Dashboard;
