import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard'; 
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Button } from "@mui/material";
function Sidebar() {
  const [activetab , setActivetab ] = useState(0)
  return (
    <>
      <div className="sidebar" style={{backgroundColor:""}} >
        <ul>
          <li>
          <Link to="/dashboard">
            <Button className={`w-100 ${activetab === 0 ? 'active' : " "}`} onClick={()=>setActivetab(0)}>
              <span className="icon"><DashboardIcon/></span>
              Partner_Dashboard
            </Button>
            </Link>
          </li>
          <li>
          <Link to="/products">
            <Button className={`w-100 ${activetab === 1 ? 'active' : " "}`} onClick={()=>setActivetab(1)}>
              <span className="icon"><ProductionQuantityLimitsIcon/></span>
             Products
            </Button>
            </Link>
          </li>
          <li>
          <Link to="/user">
            <Button className={`w-100 ${activetab === 2 ? 'active' : " "}`} onClick={()=>setActivetab(2)}>
              <span className="icon"><ManageAccountsIcon/></span>
             User management
            </Button>
            </Link>
          </li>
          <li>
          <Link to="/partner">
            <Button className={`w-100 ${activetab === 3 ? 'active' : " "}`} onClick={()=>setActivetab(3)}>
              <span className="icon"><HandshakeIcon/></span>
              partner
            </Button>
            </Link>
          </li>
          <li>
          <Link to="/customer">
            <Button className={`w-100 ${activetab === 4 ? 'active' : " "}`} onClick={()=>setActivetab(4)}>
              <span className="icon"><SupportAgentIcon/></span>
              customer
            </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;


























// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import DashboardIcon from '@mui/icons-material/Dashboard'; 
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import HandshakeIcon from '@mui/icons-material/Handshake';
// import SupportAgentIcon from '@mui/icons-material/SupportAgent';
// import { Button } from "@mui/material";

// interface SidebarProps {
//   role: 'super_admin' | 'admin_user';
// }

// function Sidebar() {
//   const [activetab, setActivetab] = useState(0);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   // const user = localStorage.getItem("user");

//   console.log(user);
  
//   let links  =  [
//     { path: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
//     { path: "/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" },
//     { path: "/user", icon: <ManageAccountsIcon />, label: "User Management" },
//     { path: "/partner", icon: <HandshakeIcon />, label: "Partners" },
//     { path: "/customer", icon: <SupportAgentIcon />, label: "Customers" },
//   ]
//   // Define the links based on the role
//   // const links = role === 'super_admin'
//   //   ? 
//   //   : 
//   //   [
//   //     { path: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
//   //     { path: "/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" },
//   //     { path: "/user", icon: <ManageAccountsIcon />, label: "User Management" },
//   //     { path: "/partner", icon: <HandshakeIcon />, label: "Partners" },
//   //     { path: "/customer", icon: <SupportAgentIcon />, label: "Customers" },
//   //   ]

//     let url = window.location.href;
//     let urlList = url.split('//')
//     let getName = urlList[1].split('.');
//     switch(getName[0]){
//       case 'supperadmin':
//         links  =  [
//           { path: "/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" },
//           { path: "/user", icon: <ManageAccountsIcon />, label: "User Management" },
//           { path: "/partner", icon: <HandshakeIcon />, label: "Partners" },
//           { path: "/customer", icon: <SupportAgentIcon />, label: "Customers" },
//         ]
//         break;

//         case 'admin':
//           links  =  [
//             { path: "/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" },
//             { path: "/user", icon: <ManageAccountsIcon />, label: "User Management" },
//             { path: "/partner", icon: <HandshakeIcon />, label: "Partners" },
//             { path: "/customer", icon: <SupportAgentIcon />, label: "Customers" },
//           ]
//           break;

//         case 'partner':
//           links  =  [
//             { path: "/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" },
//           ]
  
//           break;

//       case 'customer':
//         links  = [
//           { path: "/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" }
//         ]

//         break;

//       default:
//         links  =  [
//           { path: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
//         ]
//   }
//     // [
//     //     { path: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
//     //     { path: "/admin/products", icon: <ProductionQuantityLimitsIcon />, label: "Products" },
//     //     { path: "/admin/user", icon: <ManageAccountsIcon />, label: "User Management" },
//     //     { path: "/admin/partner", icon: <HandshakeIcon />, label: "Partners" },
//     //     { path: "/admin/customer", icon: <SupportAgentIcon />, label: "Customers" },
//     //   ];

//   return (
//     <div className="sidebar">
//       <ul>
//         {links.map((link, index) => (
//           <li key={index}>
//             <Link to={link.path}>
//               <Button className={`w-100 ${activetab === index ? 'active' : ''}`} onClick={() => setActivetab(index)}>
//                 <span className="icon">{link.icon}</span>
//                 {link.label}
//               </Button>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Sidebar;





















