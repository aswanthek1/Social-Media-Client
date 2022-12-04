import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Follow from "../People/Follow";

const YouMayKnow = ({ youMayKnow }) => {
  const navigate = useNavigate();
  return (
    <div>
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
                onClick={() => {
                  navigate(`/profile/${value._id}`);
                  localStorage.setItem("profileUser", value._id);
                }}
              >
                <Avatar alt="Remy Sharp" src={value.profileimage} />
              </ListItemAvatar>
              <ListItemText
                onClick={() => {
                  navigate(`/profile/${value._id}`);
                  localStorage.setItem("profileUser", value._id);
                }}
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
  );
};

export default YouMayKnow;
