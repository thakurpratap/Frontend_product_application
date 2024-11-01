import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormValues {
  name: string;
  description: string;
  publish: boolean;
  image: FileList | null; // To handle image upload
  price: number;
  rating: number;
}

const ProductForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log(data);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <div className="card shadow border-0 p-3 mt-5 m-4">
      <Box m="20px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
            <TextField
              fullWidth
              variant="filled"
              label="Product Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Description"
              {...register("description", { required: "Description is required" })}
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Price"
              type="number"
              {...register("price", { required: "Price is required", valueAsNumber: true })}
              error={!!errors.price}
              helperText={errors.price?.message}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Rating"
              type="number"
              {...register("rating", { required: "Rating is required", valueAsNumber: true })}
              error={!!errors.rating}
              helperText={errors.rating?.message}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Publish"
              // type="checkbox"
              {...register("publish")}
              sx={{ gridColumn: "span 4" }}
            />
           <TextField
              fullWidth
              variant="filled"
              label="Upload Image"
              type="file"
              inputProps={{ accept: "image/*" }}
              {...register("image", { required: "Image is required" })}
              error={!!errors.image}
              helperText={errors.image?.message}
              sx={{ gridColumn: "span 4" }}
            /> 
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Product
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default ProductForm;
















// import React from "react";
// import { Box, Button, TextField } from "@mui/material";
// import { useForm, SubmitHandler } from "react-hook-form";

// interface FormValues {
//   firstName: string;
//   lastName: string;
//   email: string;
//   contact: string;
//   address1: string;
//   address2: string;
// }

// const Form: React.FC = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     mode: "onBlur",
//   });

//   const onSubmit: SubmitHandler<FormValues> = (data : FormValues) => {
//     console.log(data);
//   };

//   return (
//     <div className="card shadow border-0 p-3 mt-5 m-4">
//       <Box m="20px">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
//             <TextField
//               fullWidth
//               variant="filled"
//               label="Name"
//               {...register("firstName", { required: "Name is required" })}
//               error={!!errors.firstName}
//               helperText={errors.firstName?.message}
//               sx={{ gridColumn: "span 2" }}
//             />
//             <TextField
//               fullWidth
//               variant="filled"
//               label="Last Name"
//               {...register("lastName", { required: "Last Name is required" })}
//               error={!!errors.lastName}
//               helperText={errors.lastName?.message}
//               sx={{ gridColumn: "span 2" }}
//             />
//             <TextField
//               fullWidth
//               variant="filled"
//               label="Description"
//               {...register("email", {
//                 required: "Description is required",
//                 pattern: {
//                   value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
//                   message: "Enter a valid email address",
//                 },
//               })}
//               error={!!errors.email}
//               helperText={errors.email?.message}
//               sx={{ gridColumn: "span 4" }}
//             />
//             <TextField
//               fullWidth
//               variant="filled"
//               label="Contact Number"
//               {...register("contact", {
//                 required: "Contact Number is required",
//                 pattern: {
//                   value: /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
//                   message: "Enter a valid phone number",
//                 },
//               })}
//               error={!!errors.contact}
//               helperText={errors.contact?.message}
//               sx={{ gridColumn: "span 4" }}
//             />
//             <TextField
//               fullWidth
//               variant="filled"
//               label="Address 1"
//               {...register("address1", { required: "Address 1 is required" })}
//               error={!!errors.address1}
//               helperText={errors.address1?.message}
//               sx={{ gridColumn: "span 4" }}
//             />
//             <TextField
//               fullWidth
//               variant="filled"
//               label="Address 2"
//               {...register("address2", { required: "Address 2 is required" })}
//               error={!!errors.address2}
//               helperText={errors.address2?.message}
//               sx={{ gridColumn: "span 4" }}
//             />
//           </Box>
//           <Box display="flex" justifyContent="end" mt="20px">
//             <Button type="submit" color="secondary" variant="contained">
//               Create New User
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </div>
//   );
// };

// export default Form;
