import React from "react";
import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "@mui/icons-material";
import { useSelector } from "react-redux";

const UserSidebarList = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const [homeActive, setHomeActive] = useState(false);
  const [savedActive, setSavedActive] = useState(false);
  const [peopleActive, setPeopleActive] = useState(false);
  return (
    <div>
      <Box
        position="fixed"
        sx={{ width: "22%", height: "100vh" }}
        bgcolor="#EAF6F6"
      >
        <List>
          <ListItem selected={homeActive ? true : false} disablePadding 
          >
            <ListItemButton
              component="a"
              onClick={() => {
                navigate("/");
                setHomeActive(true); 
                setSavedActive(false);
                setPeopleActive(false);
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
            selected={savedActive ? true : false}
            onClick={() => {
              navigate("/posts/saved");
              setHomeActive(false);
              setSavedActive(true);
              setPeopleActive(false);
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

          <ListItem
            disablePadding
            selected={peopleActive ? true : false}
            onClick={() => {
              setHomeActive(false);
              setSavedActive(false);
              setPeopleActive(true);
            }}
          >
            <ListItemButton
              selected={peopleActive ? true : false}
              component="a"
              onClick={() => {
                navigate("/people");
              }}
            >
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
      </Box>
    </div>
  );
};

export default UserSidebarList;
