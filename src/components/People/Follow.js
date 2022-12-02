import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { refreshReducer } from "../../Redux/RefreshSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Follow = (id) => {
  const dispatch = useDispatch();

  const setFollow = (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/addFollow`,
          { id },
          { headers: { token: userToken } }
        )
        .then((response) => {
          console.log("resposner after follow", response);
          toast.success("Started following", {
            duration: 3000,
            style: {
              width: "300px",
            },
          });
          dispatch(refreshReducer());
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setFollow(id)}
        variant="contained"
        size="small"
        sx={{ marginLeft: "30px", marginTop: "19px" }}
      >
        Follow
      </Button>
    </div>
  );
};

export default Follow;
