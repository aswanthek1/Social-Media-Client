import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { refreshReducer } from "../../Redux/RefreshSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";

const Remove = (id) => {
  const dispatch = useDispatch();

  const remove = (id) => {
    try {
      Swal.fire({
        title: "Do you want to remove this follower ?",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const userToken = localStorage.getItem("userToken");

          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/follwers/remove`,
              { id },
              { headers: { token: userToken } }
            )
            .then((response) => {
              console.log("removed response ", response);
              toast.success("Removed successfully");
              dispatch(refreshReducer());
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => remove(id)}
        variant="contained"
        size="small"
        sx={{ marginLeft: "30px", marginTop: "19px" }}
      >
        REMOVE
      </Button>
    </div>
  );
};

export default Remove;
