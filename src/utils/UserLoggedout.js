import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function UserLoggedout() {
  let auth = { authtoken: localStorage.getItem("userToken") };

  return auth.authtoken ? <Navigate to={"/"} /> : <Outlet />;
}

export default UserLoggedout;
