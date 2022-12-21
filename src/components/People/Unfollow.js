import {  Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";

export default function Unfollow({ id }) {
  const [buttonState, setButtonState] = useState(true);

  const unFollow = (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/unFollow`,
              { id },
              { headers: { token: userToken } }
            )
            .then((response) => {
              toast.success("Unfollowed successfully");
              setButtonState(false)
            });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onClick={() => unFollow(id)}
        variant="contained"
        size="small"
        sx={{ marginLeft: "30px", marginTop: "19px" }}
      >
        {buttonState ? "UNFOLLOW" : "FOLLOW"}
      </Button>
      <Toaster />
    </>
  );
}
