import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AccessPage from "../pages/Access";

const UserAccessRouter = () => {
  const navigate = useNavigate();
  const [accessState, setAccessState] = useState(true);
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/userAccessCheck`, {
        headers: { token: userToken },
      })
      .then((response) => {
        console.log(response, "for accessing user ");
        if (
          response.data.message === "no access" ||
          response.data.message === "error found"
        ) {
          localStorage.removeItem('userToken') 
          setAccessState(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  return accessState ? <Outlet /> : <AccessPage />;
};

export default UserAccessRouter;
