import {  Box } from "@mui/material";
import React, { useState } from "react";
import AdminSidebarList from "../../adminComponents/AdminSideabarList/AdminSidebarList";
import UserSidebarList from "../UserSidebarList/UserSidebarList";

function Sidebar({admin}) {

  return (
    <>
      {admin ?<Box flex={2} p={1}>
          <AdminSidebarList/> 
      </Box> :
      <Box flex={2} p={1} sx={{ display: { xs: "none", md: "block" } }}>
          <UserSidebarList/> 
      </Box>
       }
    </>
  );
}

export default Sidebar;
