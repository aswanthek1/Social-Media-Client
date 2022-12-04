import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import {
  Typography,
  AvatarGroup,
  Avatar,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Grid,
  TextField,
  InputBase,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import Unfollow from "../People/Unfollow";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Rightbar() {
  const [searchUser, setSearchUser] = useState([]);
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      users: null,
    },
  });

  useEffect(() => {
    console.log(formik.values.users);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/userSearch/${formik.values.users}`,
        { headers: { user: user._id } }
      )
      .then((e) => {
        console.log("uesr serarched result", e.data);
        setSearchUser(e.data);
      });
  }, [formik.values.users]);

  return (
    <Box flex={3} p={1} sx={{ display: { xs: "none", lg: "block" } }}>
      <Box position="fixed" width="31%" height="100vh" bgcolor="#EAF6F6">
        {/* <Typography align='center' variant='h5' fontWeight={100} mt={1} mb={2} color='green' > <b>Search People</b> </Typography> */}
        {/* <Divider variant="middle" sx={{ borderBottomWidth: 3 }} /> */}

        <Box
          sx={{
            width: "80%",
            marginTop: "26px",
            marginLeft: "9%",
            height: "30px",
            borderRadius: "15px",
            padding: "0 10px",
            display: "flex",
            justifyContent: "center",
            border: "2px solid",
          }}
        >
          <InputBase
            fullWidth
            variant="standard"
            size="small"
            name="users"
            placeholder="Search People"
            onChange={formik.handleChange}
            value={formik.values.users}
            // onClick={() => setShowSearch(true)}
          />
        </Box>

        {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#F8FFDB' }}> */}
        {formik.values.users !== "" ? (
          <List
            dense
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "#ec255a00",
              marginLeft: "10%",
              marginTop: "12px",
            }}
          >
            {searchUser.map((value) => {
              return (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar
                    onClick={() => {
                      navigate(`/profile/${value._id}`);
                      localStorage.setItem("profileUser", value._id);
                    }}
                  >
                    <Avatar alt="Remy Sharp" src={value.profileimage} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ marginTop: "18px" }}
                    onClick={() => {
                      navigate(`/profile/${value._id}`);
                      localStorage.setItem("profileUser", value._id);
                    }}
                    disableTypography
                    primary={
                      <Typography style={{ fontWeight: 500 }}>
                        {" "}
                        <b>{value.firstname} </b>{" "}
                      </Typography>
                    }
                  />
                  <Divider variant="inset" component="li" />
                </ListItem>
              );
            })}
          </List>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
}

export default Rightbar;
