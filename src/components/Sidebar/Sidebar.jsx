import {
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
  Paper,
  Button,
  Drawer,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React, { useState } from "react";
import { Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const [homeActive, setHomeActive] = useState(false)
  const [savedActive, setSavedActive] = useState(false)
  const [peopleActive, setPeopleActive] = useState(false)
  return (
    <>
      <Box flex={2} p={1} sx={{ display: { xs: "none", md: "block" } }}>
        <Box
          position="fixed"
          sx={{ width: "22%", height: "100vh" }}
          bgcolor="#EAF6F6"
        >
          <List>
            <ListItem
             selected={homeActive ? true : false}
             disablePadding>
              <ListItemButton
                component="a"
                onClick={() => {
                  navigate("/");
                  setHomeActive(true)
                  setSavedActive(false)
                  setPeopleActive(false)
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
              navigate('/posts/saved');
              setHomeActive(false)
              setSavedActive(true)
              setPeopleActive(false)
            }
          }
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

            <ListItem disablePadding
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

            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <RequestPageIcon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography style={{ fontWeight: 500 }}>
                      {" "}
                      <b>Requests</b>{" "}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
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
      </Box>
    </>
  );
}

export default Sidebar;
