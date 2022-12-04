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
import Remove from "../People/Remove";

const FollowersLists = ({ followers, people }) => {
  const navigate = useNavigate();
  return (
    <div>
      {followers
        ? followers.map((followersValue) => {
            return (
              <List
                key={followersValue._id}
                sx={{
                  width: "100%",
                  maxWidth: 460,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar
                    onClick={() => {
                      navigate(`/profile/${followersValue._id}`);
                      localStorage.setItem("profileUser", followersValue._id);
                    }}
                  >
                    <Avatar alt="" src={followersValue.profileimage} />
                  </ListItemAvatar>
                  <ListItemText
                    onClick={() => {
                      navigate(`/profile/${followersValue._id}`);
                      localStorage.setItem("profileUser", followersValue._id);
                    }}
                    sx={{ marginTop: "20px" }}
                    disableTypography
                    primary={
                      <Typography style={{ fontWeight: 500 }}>
                        {" "}
                        <b>{followersValue.firstname}</b>{" "}
                      </Typography>
                    }
                  />
                  {people ? <Remove id={followersValue._id} /> : null}
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            );
          })
        : null}
    </div>
  );
};

export default FollowersLists;
