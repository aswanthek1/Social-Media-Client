import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import UserLogin from "../components/UserLogin/UserLogin";

function UserRouter() {
  const navigate = useNavigate();
  let auth = { authtoken: localStorage.getItem("userToken") };

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/loginAuth`, {
          headers: { token: auth.authtoken },
        })
        .then((response) => {
          if (response.data.status) {
          }
        })
        .catch((error) => {
          console.log("error", error);
          localStorage.clear();
        });
    } catch (error) {
      console.log("error at auth", error);
    }
  }, [navigate]);

  return auth.authtoken ? <Outlet /> : <UserLogin />;
}

export default UserRouter;
