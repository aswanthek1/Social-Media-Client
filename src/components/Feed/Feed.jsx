import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Feed.css";

function Feed() {
  const [allPosts, setAllPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const refresh = useSelector((state) => state.refresh.refresh);
  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/allPosts`, {
        headers: { token: userToken },
      })
      .then((response) => {
        if (response.data) {
          setLoader(false);
          setAllPosts(response.data.allPosts);
        } else {
          console.log("no posts available");
        }
      });
  }, [refresh]);

  return (
    <>
      <Box flex={4} paddingTop={1} marginLeft="0px !important">
        {/* <div className="feedMain">
        <Box >
        <TextField            
            type="text"
            id="standard-multiline-static"           
            rows={2}
            placeholder="What's on your mind ?"
            variant="standard"
          />
        </Box>
      </div> */}

        {loader ? (
          <CircularProgress
            sx={{
              position: "absolute",
              left: "43%",
              top: "50%",
            }}
          />
        ) : null}

        {allPosts
          ? allPosts.map((postArray) => {
              return <Posts key={postArray._id} data={postArray} />;
            })
          : null}
      </Box>
    </>
  );
}

export default Feed;
