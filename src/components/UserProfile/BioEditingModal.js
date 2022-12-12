import "./ProfileAreaStyles.css";
import {
  Box,
  Button,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../Redux/UserSlice";
import "react-datepicker/dist/react-datepicker.css";
import { refreshReducer } from "../../Redux/RefreshSlice";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BioEditingModal = ({
  bioEditingModal,
  setBioEditingModal,
  userProfileData,
  setUserProfileData,
}) => {
  const refresh = useSelector((state) => state.refresh.refresh);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: { token: userToken },
      })
      .then((response) => {
        if (response.data.message === "userNotFound") {
          return null;
        } else {
          setUserDetails(response.data);
          dispatch(update(response.data));
        }
      });
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.firstname.length < 3 || userDetails.firstname.length > 12) {
      console.log("firstname not correct");
    } else if (
      userDetails.lastname.length < 1 ||
      userDetails.lastname.length > 12
    ) {
      console.log("second name incorrect");
    } else {
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/user/update`, {
          userDetails,
        })
        .then((response) => {
          setUserProfileData(response.data);
          dispatch(update(response.data));
          setBioEditingModal(false);
          dispatch(refreshReducer());
        });
    }
  };

  return (
    <div>
      <div>
        <StyledModal
          keepMounted
          open={bioEditingModal}
          onClose={() => {
            setBioEditingModal(false);
            dispatch(refreshReducer());
          }}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box bgcolor="white" width={500} height={450} borderRadius={5}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              align="center"
              marginTop="20px"
            >
              <b>Edit your profile here</b>
            </Typography>
            <form action="" onSubmit={handleSubmit}>
              <div className="textFieldMain">
                <div className="nameFields">
                  <TextField
                    value={userDetails.firstname}
                    onChange={(event) => {
                      userDetails.firstname = event.target.value;
                      setUserDetails({ ...userDetails });
                    }}
                    name="firstname"
                    variant="standard"
                    placeholder="First Name"
                  />
                  {/* {valid ? null  : <FormHelperText sx={{}} >
                     Use only 1 to 3 letters and use alphabets only
                     </FormHelperText> }  */}

                  <TextField
                    value={userDetails.lastname}
                    onChange={(event) => {
                      userDetails.lastname = event.target.value;
                      setUserDetails({ ...userDetails });
                    }}
                    type="text"
                    name="lastname"
                    variant="standard"
                    placeholder="Last Name"
                  />
                </div>
                <div className="textField">
                  {/* <FormHelperText></FormHelperText> */}
                  <TextField
                    value={userDetails.bio}
                    onChange={(event) => {
                      userDetails.bio = event.target.value;
                      setUserDetails({ ...userDetails });
                    }}
                    name="bio"
                    variant="standard"
                    placeholder="Say about your self with in 20 words"
                    fullWidth
                    multiline
                  />
                  <div className="textField">
                    <TextField
                      name="proffession"
                      value={userDetails.proffession}
                      onChange={(event) => {
                        userDetails.proffession = event.target.value;
                        setUserDetails({ ...userDetails });
                      }}
                      variant="standard"
                      placeholder="Proffession"
                      fullWidth
                    />
                  </div>
                  <div className="textField">
                    <TextField
                      name="livesin"
                      value={userDetails.livesin}
                      onChange={(event) => {
                        userDetails.livesin = event.target.value;
                        setUserDetails({ ...userDetails });
                      }}
                      variant="standard"
                      placeholder="Lives In"
                      fullWidth
                    />
                  </div>
                  <div className="textField">
                    <TextField
                      name="country"
                      value={userDetails.country}
                      onChange={(event) => {
                        userDetails.country = event.target.value;
                        setUserDetails({ ...userDetails });
                      }}
                      variant="standard"
                      placeholder="Country"
                      fullWidth
                    />
                  </div>
                  <div className="date">
                    <pre>Date of birth</pre>
                    <input
                      type="date"
                      style={{
                        width: "100px",
                        height: "20px",
                        marginLeft: "20px",
                      }}
                      value={userDetails.dateofbirth}
                      onChange={(event) => {
                        userDetails.dateofbirth = event.target.value;
                        setUserDetails({ ...userDetails });
                      }}
                      name="dateofbirth"
                      min="1980-01-01"
                      max="2012-01-01"
                    />
                  </div>
                  <div className="saveButton">
                    <Button type="submit" variant="outlined" size="small">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Box>
        </StyledModal>
      </div>
    </div>
  );
};

export default BioEditingModal;
