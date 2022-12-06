import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Add from "../Add/Add";
import Navbar from "../Navbar/Navbar";
import Rightbar from "../Rightbar/Rightbar";
import SavedFeed from "../SavedFeed/SavedFeed";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../Redux/UserSlice";
import axios from "axios";

const SavedPosts = () => {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh.refresh);
  const [userDetails, setUserDetails] = useState({});
  const [allPosts, setAllPosts] = useState([]);

  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: { token: userToken },
      })
      .then((response) => {
        if (response.data.message === "userNotFound") {
          return null;
        } else {
          setUserDetails(response.data);
          dispatch(update(response.data));
        }
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/allPosts`, {
        headers: { token: userToken },
      })
      .then((response) => {
        setAllPosts(response.data);
      });
  }, [refresh]);

  return (
    <div>
      <Box bgcolor={"background.default"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <SavedFeed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </div>
  );
};

export default SavedPosts;
