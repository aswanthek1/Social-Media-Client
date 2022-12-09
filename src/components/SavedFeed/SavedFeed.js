import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Posts from "../Posts/Posts";

const SavedFeed = () => {
  const user = useSelector((state) => state.user);
  if (user.savedPosts.length === 0)
    return (
      <Box flex={4} paddingTop={1}>
        <h2 style={{ textAlign: "center", color: "red" }}>
          {" "}
          <b>No posts saved yet</b>{" "}
        </h2>
      </Box>
    );
  return (
    <Box flex={4} paddingTop={1} marginLeft="0px !important" >
      {user.savedPosts
        ? user.savedPosts.map((savedPostArray) => {
            return <Posts key={savedPostArray._id} data={savedPostArray} />;
          })
        : null}
    </Box>
  );
};

export default SavedFeed;
