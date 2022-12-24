import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MainTable from "../Table/Table";

const AdminUserManagement = () => {
  const allUsers = useSelector((state) => state.allUsers);
  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/getUsers`)
  //   .then((res))
  // })
  console.log("allusers", allUsers);
  return (
    <h1 style={{ color: "red", textAlign: "center", marginTop: "60px" }}>
      User management on progress...
    </h1>
    // <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //   <MainTable/>
    // </Box>
  );
};

export default AdminUserManagement;
