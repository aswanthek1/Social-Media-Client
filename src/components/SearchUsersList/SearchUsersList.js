import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchUsersList = ({ searchUser, setSearchUser }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      users: null,
    },
  });

  return (
    <>
      {formik.values.users !== "" ? (
        <List
          dense
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "#ec255a00",
            marginLeft: "9%",
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
                    <Typography style={{ fontWeight: 500,marginLeft:'20px' }}>
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


    </>
  );
};

export default SearchUsersList;
