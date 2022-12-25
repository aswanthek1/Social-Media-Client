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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Remove from "../People/Remove";
import Follow from "../People/Follow";
import { refreshReducer } from "../../Redux/RefreshSlice";

const FollowingLists = (following) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      {following.data
        ? following.data.map((followingValue) => {
            return (
              <List
                key={followingValue._id}
                sx={{
                  // width: "100%",
                  width: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar
                    onClick={() => {
                      navigate(`/profile/${followingValue._id}`);
                      localStorage.setItem("profileUser", followingValue._id);
                      dispatch(refreshReducer())
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
                      dispatch(refreshReducer())
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
                 { following.people && following.following ? <Follow id={followingValue._id} following={true}  /> :null }

                 { following.people && following.suggetions ? <Follow id={followingValue._id} suggetions={true} /> : null}


                {following.people && following.followers ? <Remove id={followingValue._id} /> : null } 
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
