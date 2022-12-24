import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshReducer } from "../../Redux/RefreshSlice";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

const Follow = (othersId) => {
  console.log('id',othersId.id)
  const [buttonState, setButtonState] = useState('')
  const dispatch = useDispatch();
  const user = useSelector((state ) => state.user)

  console.log(user.following,"pppp")

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
          if(response.data.message === 'followed'){
            setButtonState(false)
            toast.success("Started following", {
              duration: 3000,
              style: {
                width: "300px",
                height:'60px',
                fontSize:"25px",
                
              },
            });  
            dispatch(refreshReducer());
                  
          }
          else{
            setButtonState(true)
            toast.success('Unfollowed',{
              duration: 3000,
              style: {
                width: "300px",
                height:'60px',
                fontSize:"25px"
              },
            });
            dispatch(refreshReducer());

            
          }
          
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
        sx={{ marginLeft: "30px", marginTop: "19px", width: "70px", fontSize: "10px"  }}
      >
        {user.following.includes(othersId.id) || buttonState===false ||othersId.following  ? 'unFollow' : 'follow'}
       
      </Button> 
    </div>
  );
};

export default Follow;
