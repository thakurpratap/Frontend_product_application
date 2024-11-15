import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridColDef, GridSearchIcon } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  isVerified: boolean;
  image?: { image: string };
}

interface NewProduct {
  name: string;
  description: string;
  price: number;
  rating: number;
  isVerified: boolean;
  image: File | null;
}

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<NewProduct>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      rating: 0,
      isVerified: false,
      image: null,
    },
     mode: 'onChange' ,  
  });

  // const [newProduct, setNewProduct] = useState<NewProduct>({
  //   name: "",
  //   description: "",
  //   price: 0,
  //   rating: 0,
  //   isVerified: false,
  //   image: null,
  // });

  const token = localStorage.getItem("token");

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      setLoading(true);
      try {
        const response = await axios.get<Product[]>("https://user-product-api-gzwy.onrender.com/api/partner", {
          headers: { Authorization: token },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      } finally {
        setLoading(false);
      }
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (product: NewProduct) => {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("rating", product.rating.toString());
      formData.append("isVerified", JSON.stringify(product.isVerified));
      formData.append("image", product.image!);

      await axios.post("https://user-product-api-gzwy.onrender.com/api/partner/add-product/", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      refetch();
      handleClose();
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: async (product: NewProduct) => {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price.toString());
      formData.append("rating", product.rating.toString());
      formData.append("isVerified", JSON.stringify(product.isVerified));
      if (product.image) formData.append("image", product.image);

      await axios.put(`https://user-product-api-gzwy.onrender.com/api/partner/updateProduct/${selectedProductId}`, formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      refetch();
      handleClose();
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`https://user-product-api-gzwy.onrender.com/api/partner/delete-product/${id}`, {
        headers: { Authorization: token },
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  // const handleClickOpen = () => setOpen(true);
  // const handleClose = () => {
  //   setOpen(false);
  //   setIsEditing(false);
  //   setSelectedProductId(null);
  //   setNewProduct({
  //     name: "",
  //     description: "",
  //     price: 0,
  //     rating: 0,
  //     isVerified: false,
  //     image: null,
  //   });
  // };


  const handleClickOpen = () => {
    // Reset the form when opening for a new product
    reset({
      name: "",
      description: "",
      price: 0,
      rating: 0,
      isVerified: false,
      image: null,
    });
    setOpen(true);
    setIsEditing(false); // Ensures this is for creating a new product
    setSelectedProductId(null); // Reset selected product
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setSelectedProductId(null);
  };

  const handleCreateProduct = (data: NewProduct) => {
    createProductMutation.mutate(data);
  };

  // const handleEditProduct = (product: Product) => {
  //   setSelectedProductId(product._id);
  //   setNewProduct({
  //     name: product.name,
  //     description: product.description,
  //     price: product.price,
  //     rating: product.rating,
  //     isVerified: product.isVerified,
  //     image: null,
  //   });
  //   setIsEditing(true);
  //   setOpen(true);
  // };

  const handleEditProduct = (product: Product) => {
    setSelectedProductId(product._id);
    setIsEditing(true); // Set this to true to signify editing mode
    setOpen(true);
    reset({
      name: product.name,
      description: product.description,
      price: product.price,
      rating: product.rating,
      isVerified: product.isVerified,
      image: null, // Keep image null for editing, as user might not want to upload a new one
    });
  }

  const handleUpdateProduct = (data: NewProduct) => {
    if (selectedProductId) {
      updateProductMutation.mutate(data);
    }
  };

  const handleDeleteProduct = (id: number) => {
    deleteProductMutation.mutate(id);
  };

  const handleSearch = () => {
    refetch();
  };

  const columns: GridColDef<Product>[] = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.image?.image}
          alt={params.row.name}
          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "4px" }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "price", headerName: "Price", type: "number", flex: 1 },
    { field: "rating", headerName: "Rating", type: "number", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditProduct(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteProduct(params.row._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div
      className="card shadow border-0 p-3 mt-5 m-4"
      style={{ marginTop: "20px", height: "85vh" }}
    >
      <Box m="20px">
        <Box display="flex" alignItems="center" mb={2} justifyContent="space-between">
          <Box>
            <TextField
              size="small"
              variant="outlined"
              // onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GridSearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Create Product
          </Button>
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? "Edit Product" : "Create New Product"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(isEditing ? handleUpdateProduct : handleCreateProduct)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z0-9 ]*$/,
                    message: "Name should not contain special characters",
                  },
                  validate: {
                    noEmptySpaces: (value) =>
                      value.trim() !== "" || "Name cannot be empty spaces",
                  },
                  maxLength: { value: 10, message: "Name cannot exceed 10 characters" },

                 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="filled"
                    label="Product Name"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required",
                  validate: {
                    noEmptySpaces: (value) =>
                      value.trim() !== "" || "Description cannot be only empty spaces",
                  },
                 }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="filled"
                    label="Description"
                    {...field}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required", min: { value: 0, message: "Price must be a positive number" } }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="filled"
                    label="Price"
                    type="number"
                    {...field}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="rating"
                control={control}
                rules={{
                  required: "Rating is required",
                  min: { value: 0, message: "Rating cannot be negative" },
                  max: { value: 5, message: "Rating cannot exceed 5" },
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="filled"
                    label="Rating"
                    type="number"
                    {...field}
                    error={!!errors.rating}
                    helperText={errors.rating?.message}
                  />
                )}
              />
              <Controller
                name="image"
                control={control}
                rules={{ required: "Image is required" }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    margin="dense"
                    variant="filled"
                    label="Image"
                    type="file"
                    // onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                    onChange={(e) => {
                      const file = (e.target as HTMLInputElement).files?.[0] || null; // Cast to HTMLInputElement
                      field.onChange(file); // Pass the file to the field
                    }}
                    error={!!errors.image}
                    helperText={errors.image?.message}
                  />
                )}
              />
              <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button type="submit" color="primary" variant="contained">
                  {isEditing ? "Update" : "Create"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
              style={{ height: "70vh" }}
              rows={products}
              columns={columns}
              // checkboxSelection
              getRowId={(row) => row._id}
              sx={{      
                "& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions": {
                  margin: 0,
                },
                "& .MuiTablePagination-selectLabel": {
                  paddingTop: "1rem", 
                },
              }}
            />
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
//   IconButton,
//   CircularProgress,
//   InputAdornment,
// } from "@mui/material";
// import { DataGrid, GridColDef, GridSearchIcon } from "@mui/x-data-grid";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";

// interface Product {
//   _id: number;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   isVerified: boolean;
//   image?: {image : string};
// }

// interface NewProduct {
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   isVerified: boolean;
//   image: File | null;
// }

// const Dashboard = () => {
//   const [open, setOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(
//     null
//   );
//   const imageBaseUrl = "https://user-product-api-gzwy.onrender.com/"; 
//   const { control, handleSubmit, reset, formState: { errors } } = useForm<NewProduct>({
//     defaultValues: {
//       name: "",
//       description: "",
//       price: 0,
//       rating: 0,
//       isVerified: false,
//       image: null,
//     },
//   });
  
//   const [newProduct, setNewProduct] = useState<NewProduct>({
//     name: "",
//     description: "",
//     price: 0,
//     rating: 0,
//     isVerified: false,
//     image: null,
//   });
//   const [searchTerm, setSearchTerm] = useState("");

//   const token = localStorage.getItem("token");
//   console.log(token);

//   const { data: products = [], refetch } = useQuery({
//     queryKey: ["products", searchTerm],
//     queryFn: async () => {
//       setLoading(true);
//       try {
//         const url = searchTerm
//           ? `https://user-product-api-gzwy.onrender.com/api/partner/search?name=${searchTerm}`
//           : `https://user-product-api-gzwy.onrender.com/api/partner/`;

//         const response = await axios.get<Product[]>(url, {
//           headers: {
//             Authorization: token,
//           },
//         });
//         return response.data;
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         return [];
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const createProductMutation = useMutation({
//     mutationFn: async (product: NewProduct) => {
//       const formData = new FormData();
//       formData.append("name", product.name);
//       formData.append("description", product.description);
//       formData.append("price", product.price.toString());
//       formData.append("rating", product.rating.toString());
//       formData.append("isVerified", JSON.stringify(product.isVerified));
//       formData.append("image", product.image!);

//       await axios.post(
//         "https://user-product-api-gzwy.onrender.com/api/partner/add-product/",
//         formData,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       refetch();
//       handleClose();
//     },
//   });

//   const updateProductMutation = useMutation({
//     mutationFn: async (product: NewProduct) => {
//       const formData = new FormData();
//       formData.append("name", product.name);
//       formData.append("description", product.description);
//       formData.append("price", product.price.toString());
//       formData.append("rating", product.rating.toString());
//       formData.append("isVerified", JSON.stringify(product.isVerified));
//       if (product.image) formData.append("image", product.image);

//       await axios.put(
//         `https://user-product-api-gzwy.onrender.com/api/partner/updateProduct/${selectedProductId}`,
//         formData,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       refetch();
//       handleClose();
//     },
//   });

//   const deleteProductMutation = useMutation({
//     mutationFn: async (id: number) => {
//       await axios.delete(
//         `https://user-product-api-gzwy.onrender.com/api/partner/delete-product/${id}`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       refetch();
//     },
//   });

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setIsEditing(false);
//     setSelectedProductId(null);
//     setNewProduct({
//       name: "",
//       description: "",
//       price: 0,
//       rating: 0,
//       isVerified: false,
//       image: null,
//     });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, files } = e.target;
//     setNewProduct((prev) => ({
//       ...prev,
//       [name]:
//         type === "number"
//           ? Number(value)
//           : name === "image" && files
//             ? files[0]
//             : value,
//     }));
//   };

//   const handleCreateProduct = () => {
//     createProductMutation.mutate(newProduct);
//   };

//   const handleEditProduct = (product: Product) => {
//     setSelectedProductId(product._id);
//     setNewProduct({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       rating: product.rating,
//       isVerified: product.isVerified,
//       image: null,
//     });
//     setIsEditing(true);
//     setOpen(true);
//   };

//   const handleUpdateProduct = () => {
//     if (selectedProductId) {
//       updateProductMutation.mutate(newProduct);
//     }
//   };

//   const handleDeleteProduct = (id: number) => {
//     deleteProductMutation.mutate(id);
//   };

//   const handleSearch = () => {
//     refetch();
//   };
  

//   const columns: GridColDef<Product>[] = [
//     {
//       field: "image",
//       headerName: "Image",
//       width: 100,
//       renderCell: (params) => (
//         <img
//           src={params.row.image?.image} 
//           alt={params.row.name}
//           style={{ width: 50, height: 50, objectFit: "cover", borderRadius: "4px" }}
//         />
//       ),
//     },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "description", headerName: "Description", flex: 1 },
//     { field: "price", headerName: "Price", type: "number", flex: 1 },
//     { field: "rating", headerName: "Rating", type: "number", flex: 1 },

//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       renderCell: (params) => (
//         <>
//           <IconButton
//             onClick={() => handleEditProduct(params.row)}
//             color="primary"
//           >
//             <EditIcon />
//           </IconButton>
//           <IconButton
//             onClick={() => handleDeleteProduct(params.row._id)}
//             color="error"
//           >
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div
//       className="card shadow border-0 p-3 mt-5 m-4"
//       style={{ marginTop: "20px", height: "85vh" }}
//     >
//       <Box m="20px">
//         <Box
//           display="flex"
//           alignItems="center"
//           mb={2}
//           justifyContent="space-between"
//         >
//           <Box>
//             {/* <TextField
//               variant="outlined"
//               label="Search Products"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ marginRight: "8px" }}
//             /> */}
//             {/* <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSearch}
//               style={{ height: "6vh" }}
//             >
//               Search
//             </Button> */}
//               <TextField
//           size="small"
//           variant="outlined"
//           // onChange={handleChange}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <GridSearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//           </Box>
//           <Button variant="contained" color="primary" onClick={handleClickOpen}>
//             Create Product
//           </Button>
//         </Box>

//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>
//             {isEditing ? "Edit Product" : "Create New Product"}
//           </DialogTitle>
//           <DialogContent>
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Product Name"
//               name="name"
//               value={newProduct.name}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Description"
//               name="description"
//               value={newProduct.description}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Price"
//               name="price"
//               // type="number"
//               value={newProduct.price}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               label="Rating"
//               name="rating"
//               // type="number"
//               value={newProduct.rating}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="dense"
//               variant="filled"
//               type="file"
//               name="image"
//               onChange={handleChange}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               Cancel
//             </Button>
//             <Button
//               onClick={isEditing ? handleUpdateProduct : handleCreateProduct}
//               color="primary"
//             >
//               {isEditing ? "Update" : "Create"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* <Box mt={3} sx={{ height: 400, width: "100%" }}>
//           <DataGrid style={{height : "70vh"}} rows={products} columns={columns} checkboxSelection getRowId={(row) => row._id}/>
//         </Box> */}
//         <Box mt={3} sx={{ height: 400, width: "100%" }}>
//           {loading ? (
//             <Box
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               style={{ height: "70vh" }}
//             >
//               <CircularProgress />
//             </Box>
//           ) : (
//             <DataGrid
//               style={{ height: "70vh" }}
//               rows={products}
//               columns={columns}
//               // checkboxSelection
//               getRowId={(row) => row._id}
//               sx={{      
//                 "& .MuiTablePagination-displayedRows, & .MuiTablePagination-actions": {
//                   margin: 0,
//                 },
//                 "& .MuiTablePagination-selectLabel": {
//                   paddingTop: "1rem", 
//                 },
//               }}
//             />
//           )}
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default Dashboard;