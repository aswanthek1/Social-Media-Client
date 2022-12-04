import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Unfollow from "../People/Unfollow";
import { useNavigate } from "react-router-dom";

const FollowingLists = ({ following, profile, people }) => {
  console.log(profile)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      {following
        ? following.map((followingValue) => {
            return (
              <List
                key={followingValue._id}
                sx={{
                  width: "100%",
                  maxWidth: 460,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar
                    onClick={() => {
                      navigate(`/profile/${followingValue._id}`);
                      localStorage.setItem("profileUser", followingValue._id);
                    }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={followingValue.profileimage}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    onClick={() => {
                      navigate(`/profile/${followingValue._id}`);
                      localStorage.setItem("profileUser", followingValue._id);
                    }}
                    sx={{ marginTop: "20px" }}
                    disableTypography
                    primary={
                      <Typography style={{ fontWeight: 500 }}>
                        {" "}
                        <b>{followingValue.firstname} </b>{" "}
                      </Typography>
                    }
                  />
                 { people ? <Unfollow id={followingValue._id} /> :null }
                </ListItem>

                <Divider variant="inset" component="li" />
              </List>
            );
          })
        : null}
    </div>
  );
};

export default FollowingLists;
