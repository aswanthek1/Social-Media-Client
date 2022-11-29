import { Camera, Image } from "@mui/icons-material";
import "./ProfileAreaStyles.css";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshReducer } from "../../Redux/RefreshSlice";
import { update } from "../../Redux/UserSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BioEditingModal = ({ bioEditingModal, setBioEditingModal }) => {
  const refresh = useSelector((state) => state.refresh.refresh);
  const [selectedDate, setSelectedDate] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: { token: userToken },
      })
      .then((response) => {
        console.log("userdetails at modal", response);
        if (response.data.message === "userNotFound") {
          return null;
        } else {
          setUserDetails(response.data);
          dispatch(update(response.data));
        }
      });
  }, []);

  const initialValues = {
    firstname: user.firstname,
    lastname: user.lastname,
    // bio: user.bio,
    // proffession: user.proffession,
    // dateofbirth: user.dateofbirth,
    // city: user.city,
    // district: user.district,
  };
  const formik = useFormik({
    initialValues,
    // {
    // firstname: userDetails.firstname,
    // lastname: userDetails.lastname,
    // bio: userDetails.bio,
    // proffession: userDetails.proffession,
    // dateofbirth: userDetails.dateofbirth,
    // city: userDetails.city,
    // district: userDetails.district,
    // }
  });
  console.log("formik user values", formik.values);
  console.log("state users at modal", userDetails);
  return (
    <div>
      <div>
        <StyledModal
          keepMounted
          open={bioEditingModal}
          onClose={() => setBioEditingModal(false)}
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
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="textFieldMain">
                <div className="nameFields">
                  <TextField
                    //   value={userDetails.firstname}
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    name="firstname"
                    variant="standard"
                    placeholder="First Name"
                  />

                  <TextField
                    // value={user.lastname}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    name="lastname"
                    variant="standard"
                    placeholder="Last Name"
                  />
                </div>
                <div className="textField">
                  {/* <FormHelperText></FormHelperText> */}
                  <TextField
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    name="bio"
                    variant="standard"
                    placeholder="Say about your self with in 20 words"
                    fullWidth
                    multiline
                  />
                  <div className="textField">
                    <TextField
                      name="proffession"
                      value={formik.values.proffession}
                      onChange={formik.handleChange}
                      variant="standard"
                      placeholder="Proffession"
                      fullWidth
                      multiline
                    />
                  </div>
                  <div className="textField">
                    <TextField
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      //   value={user.city}
                      variant="standard"
                      placeholder="City"
                      fullWidth
                      multiline
                    />
                  </div>
                  <div className="textField">
                    <TextField
                      name="district"
                      value={formik.values.district}
                      onChange={formik.handleChange}
                      //   value={user.district}
                      variant="standard"
                      placeholder="District"
                      fullWidth
                      multiline
                    />
                  </div>
                  <div className="date">
                    <pre>Date of birth</pre>
                    <DatePicker
                      name="dateofbirth"
                      //   value={user.dateofbirth}
                      value={formik.values.dateofbirth}
                      className="datePicker"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date("02-01-2020")}
                      maxDate={new Date()}
                      isClearable
                      showYearDropdown
                      scrollableMonthYearDropdown
                    />
                  </div>
                  <div className="saveButton">
                    <Button variant="outlined">Save</Button>
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
