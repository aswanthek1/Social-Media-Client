import React, { useState, useEffect } from "react";
import axios from "axios";
import Feed from "../Feed/Feed";
import Rightbar from "../Rightbar/Rightbar";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import {
  Stack,
  Box,
  createTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import Add from "../Add/Add";
// import { light } from "@mui/material/styles/createPalette";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../Redux/UserSlice";
import { postUpdate } from "../../Redux/PostSlice";
import { useNavigate } from "react-router-dom";

function UserHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const refresh = useSelector((state) => state.refresh.refresh);
  const [userDetails, setUserDetails] = useState({});
  const [allPosts, setAllPosts] = useState([]);

  // const [mode, setMode] = useState("light")
  // const darkTheme = createTheme({
  //   palette:{
  //     mode:mode
  //   }
  // })
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/getPost`, {
        headers: { token: userToken },
      })
      .then((response) => {
        dispatch(postUpdate(response.data));
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/allPosts`, {
        headers: { token: userToken },
      })
      .then((response) => {
        console.log('allposts is here',response)
        setAllPosts(response.data);
      });
  }, [refresh]);

  return (
    // <ThemeProvider theme={darkTheme} color={'text.primary'}>
    <Box bgcolor={"background.default"}>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
      <Add />
    </Box>
    // </ThemeProvider>
  );
}

export default UserHome;
