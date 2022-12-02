import React, { useState } from "react";
import "./PeopleStyle.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addAllUsers } from "../../Redux/AllUserSlice";
import Unfollow from "./Unfollow";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Follow from "./Follow";
import Remove from "./Remove";

const People = () => {
  const dispatch = useDispatch();
  const [tabNumber, setTabNumber] = useState(1);
  const [value, setValue] = useState(0);
  const [youMayKnow, setYouMayKnow] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const refresh = useSelector((state) => state.refresh.refresh);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
          headers: { token: userToken },
        })
        .then((response) => {
          dispatch(addAllUsers(response.data.allUsers));
          setYouMayKnow(response.data.exceptFollowing);
          setFollowing(response.data.following);
          setFollowers(response.data.followers);
        });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  console.log("followers at people ", followers);

  return (
    <>
      <Navbar />
      <div className="people">
        <Sidebar />
        <div className="peopleRight">
          <Box sx={{ width: "100%", bgcolor: "#EAF6F6" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              variant="fullWidth"
            >
              <Tab
                label={
                  <span style={{ fontWeight: 700 }}>
                    <b>Following</b>
                  </span>
                }
                onClick={() => setTabNumber(1)}
              />
              <Tab
                label={
                  <span style={{ fontWeight: 700 }}>
                    <b>Followers</b>
                  </span>
                }
                onClick={() => setTabNumber(2)}
              />
              <Tab
                label={
                  <span style={{ fontWeight: 700 }}>
                    <b>You may know</b>
                  </span>
                }
                onClick={() => setTabNumber(3)}
              />
            </Tabs>
          </Box>

          <div className="cards">
            {tabNumber === 1 ? (
              <div>
                {following.map((followingValue) => {
                  return (
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 460,
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src={followingValue.profileimage}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ marginTop: "20px" }}
                          disableTypography
                          primary={
                            <Typography style={{ fontWeight: 500 }}>
                              {" "}
                              <b>{followingValue.firstname} </b>{" "}
                            </Typography>
                          }
                        />
                        <Unfollow id={followingValue._id} />
                      </ListItem>

                      <Divider variant="inset" component="li" />
                    </List>
                  );
                })}
              </div>
            ) : null}

            {tabNumber === 2 ? (
              <div className="tabTwo">
                {followers.map((followersValue) => {
                  return (
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 460,
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="" src={followersValue.profileimage} />
                        </ListItemAvatar>
                        <ListItemText
                          sx={{ marginTop: "20px" }}
                          disableTypography
                          primary={
                            <Typography style={{ fontWeight: 500 }}>
                              {" "}
                              <b>{followersValue.firstname}</b>{" "}
                            </Typography>
                          }
                        />

                        <Remove id={followersValue._id} />
                      </ListItem>

                      <Divider variant="inset" component="li" />
                    </List>
                  );
                })}
              </div>
            ) : null}

            {tabNumber === 3 ? (
              <div className="tabThree">
                {youMayKnow.map((value) => {
                  return (
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 460,
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar
                          onClick={() => navigate(`/profile/${value._id}`)}
                        >
                          <Avatar alt="Remy Sharp" src={value.profileimage} />
                        </ListItemAvatar>
                        <ListItemText
                          onClick={() => navigate(`/profile/${value._id}`)}
                          sx={{ marginTop: "20px" }}
                          disableTypography
                          primary={
                            <Typography style={{ fontWeight: 500 }}>
                              {" "}
                              <b>{value.firstname}</b>{" "}
                            </Typography>
                          }
                        />

                        <Follow id={value._id} />
                      </ListItem>
                      <Divider variant="inset" />
                    </List>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default People;
