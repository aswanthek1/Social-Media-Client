import {  Button } from "@mui/material";
import axios from "axios";
import { refreshReducer } from "../../Redux/RefreshSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import React, { useState } from "react";

export default function Unfollow({ id }) {
  const dispatch = useDispatch();
  const [buttonState, setButtonState] = useState(true);

  const unFollow = (id) => {
    const userToken = localStorage.getItem("userToken");
    try {
      Swal.fire({
        title: "Do you want to unfollow?",
        showCancelButton: true,
        confirmButtonText: "Do it",
        width: 300,
        customClass: "swal-size",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              "http://localhost:5000/unFollow",
              { id },
              { headers: { token: userToken } }
            )
            .then((response) => {
              console.log("response of unfollow", response);
              toast.success("Unfollowed successfully");
              dispatch(refreshReducer());
            });
        }
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
        {buttonState ? "UNFOLLOW" : "FOLLOWING"}
      </Button>
      <Toaster />
    </>
  );
}
