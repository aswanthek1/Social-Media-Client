import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { refreshReducer } from "../../Redux/RefreshSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const Follow = (othersId) => {
  console.log('id',othersId)
  const [buttonState, setButtonState] = useState(false)
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
          console.log('response of ', response)
          
          if(response.data.message === 'followed'){
            setButtonState(true)
            toast.success("Started following", {
              duration: 3000,
              style: {
                width: "300px",
                fontSize:"20px"
              },
            });         
          }
          else{
            setButtonState(false)
            toast.success('Unfollowed',{
              duration: 3000,
              style: {
                width: "300px",
                fontSize:"20px"
              },
            });
          }
          

          // dispatch(refreshReducer());
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
  <Button
        onClick={() => {setFollow(othersId.id)
        }}
        variant="contained" 
        size="small"
        sx={{ marginLeft: "30px", marginTop: "19px" }}
      >
        {othersId.suggetions ? 'Follow' : 'unfollow'}
       
      </Button> 
    </div>
  );
};

export default Follow;
