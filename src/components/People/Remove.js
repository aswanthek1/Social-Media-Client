import { Button } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const Remove = (id) => {
  const [buttonState, setButtonState] = useState(true)

  const remove = (id) => {
    try {
          const userToken = localStorage.getItem("userToken");
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/follwers/remove`,
              { id },
              { headers: { token: userToken } }
            )
            .then((response) => {
              toast.success("Removed successfully");
              setButtonState(false)
            });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      { buttonState ? <Button
        onClick={() => remove(id)}
        variant="contained"
        size="small"
        sx={{ marginLeft: "30px", marginTop: "19px" }}
      >
      REMOVE
      </Button>  : <h5 style={{marginTop:'25px',color:'red', marginLeft:"30px"}}>Removed</h5> }
    </div>
  );
};

export default Remove;