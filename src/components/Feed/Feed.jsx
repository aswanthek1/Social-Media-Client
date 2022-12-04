import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import { useSelector } from "react-redux";
import axios from "axios";

function Feed() {
  const [allPosts, setAllPosts] = useState([]);
  const refresh = useSelector((state) => state.refresh.refresh);
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/allPosts`, {
        headers: { token: userToken },
      })
      .then((response) => {
        setAllPosts(response.data);
      });
  }, [refresh]);

  return (
    <Box flex={4} paddingTop={1}>
      {allPosts.map((postArray) => {
        return <Posts key={postArray._id} data={postArray} />;
      })}
    </Box>
  );
}

export default Feed;
