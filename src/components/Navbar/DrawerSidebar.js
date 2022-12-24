import HomeIcon from "@mui/icons-material/Home";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import ExploreIcon from '@mui/icons-material/Explore';
import RequestPageIcon from "@mui/icons-material/RequestPage";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import { Settings } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Paper,
  Button,
  Drawer,
  Divider,
  Typography,
  Box,
  InputBase,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const DrawerSidebar = ({ state }) => {
  const navigate = useNavigate();
  const [searchUser, setSearchUser] = useState([]);
  const user = useSelector((state) => state.user);
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
    <>
      {state.left ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography style={{ fontWeight: 500 }}>
                    {" "}
                    <b>Home</b>{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            onClick={() => {
              navigate("/posts/saved");
            }}
            disablePadding
          >
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <BookmarkIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography style={{ fontWeight: 500 }}>
                    {" "}
                    <b>Saved Posts</b>{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component="a" onClick={() => navigate("/people")}>
              <ListItemIcon>
                <PeopleRoundedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography style={{ fontWeight: 500 }}>
                    {" "}
                    <b>People</b>{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding
          onClick={() => { navigate(`/explore/${user._id}`)}}
          >
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <ExploreIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography style={{ fontWeight: 500 }}>
                    {" "}
                    <b>Explore</b>{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding
          onClick={() => { navigate(`/settings/${user._id}`)}}
          >
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography style={{ fontWeight: 500 }}>
                    {" "}
                    <b>Settings</b>{" "}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}

      {state.right ? (
        <Box width="31%" height="100vh" bgcolor="#EAF6F6">
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
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={value.profileimage} />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ marginTop: "18px" }}
                      disableTypography
                      primary={
                        <Typography style={{ fontWeight: 500 }}>
                          {" "}
                          <b>{value.firstname} </b>{" "}
                        </Typography>
                      }
                    />
                    {/* <Unfollow  /> */}
                  </ListItem>
                );
              })}

              <Divider variant="inset" component="li" />
            </List>
          ) : (
            ""
          )}
        </Box>
      ) : null}
    </>
  );
};

export default DrawerSidebar;
