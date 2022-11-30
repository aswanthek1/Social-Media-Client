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
import * as yup from "yup";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const validationSchema = yup.object({
  firstname: yup
    .string()
    .required("This field is required")
    .min(3, "First name must need minimum 3 charachters")
    .max(12, "Maximum 12 charachters are permitted")
    .matches(/^[A-Za-z]+(\s*[A-Za-z]+)*$/, "Only alphabets are allowed"),

  lastname: yup
    .string()
    .required("This field is required")
    .min(1, "Last name must need minimum 1 charachter")
    .max(12, "Maximum 12 charachters are permitted")
    .matches(/^[A-Za-z]+(\s*[A-Za-z]+)*$/, "Only alphabets are allowed"),

  bio: yup.string().matches(/^(?:\b\w+\b[\s\r\n]*){1,250}$/),
});

const BioEditingModal = ({ bioEditingModal, setBioEditingModal }) => {
  const refresh = useSelector((state) => state.refresh.refresh);
  const [selectedDate, setSelectedDate] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [validFirstname, setFirstnameValid] = useState(null);
  // const [initialValues,setinitialValues]=useState({})
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
          // setSelectedDate(response.data.dateofbirth)
          dispatch(update(response.data));
        }
      });
  }, []);

  // const formik = useFormik({
  //   validationSchema,
  // });

  const handleValidation = async () => {
    const isFirstnameValid = await validationSchema.isValid(
      userDetails.firstname
    );
    console.log("onBlur ", isFirstnameValid);
    if (!isFirstnameValid) {
      setFirstnameValid(false);
    } else {
      setFirstnameValid(true);
    }
  };
  // const handleValidation = async () => {
  //   const validate = await validationSchema
  //     .validate(userDetails, { abortEarly: false })
  //     .then((responseData) => {
  //   console.log('userdetaeisls at validation ', userDetails)
  //       console.log("no errors");
  //       console.log(responseData);
  //       setValid([]);
  //     })
  //     .catch((err) => {
  //       console.log("err",err);
  //       console.log(err.firstname,err.lastname);
  //       console.log(err.errors);
  //       setValid(err.errors);
  //     });
  // };

  const handleSubmit = async (e) => {
    const userId = user._id;
    e.preventDefault();
    // const isValid = await validationSchema.isValid(userDetails);
    console.log(typeof(selectedDate))
    const dateofbirth = JSON.stringify(selectedDate)
    console.log(typeof(dateofbirth),dateofbirth)
    userDetails.dateofbirth = dateofbirth.slice(1,11);
    console.log(dateofbirth)
    console.log("user in on submitggggggggggggggggggggggg", userDetails.dateofbirth);
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/user/update`, {
        userDetails,
      })
      .then((response) => {
        console.log("response ", response);
      });
  };

  // console.log("formik user values", formik.values.firstname);

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
            <form action="" onSubmit={handleSubmit}>
              <div className="textFieldMain">
                <div className="nameFields">
                  <TextField
                    value={userDetails.firstname}
                    onChange={(event) => {
                      userDetails.firstname = event.target.value;
                      console.log("first userdaetails", userDetails);
                      setUserDetails({ ...userDetails });
                    }}
                    onBlur={handleValidation}
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
                    onBlur={handleValidation}
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
                    <DatePicker
                      name="dateofbirth"
                      // value={userDetails.dateofbirth}
                        value={selectedDate}
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
                    <Button type="submit" variant="outlined">
                      Save
                    </Button>
                  </div>
                  {/* {valid.map((e) => {
                    console.log("eeeeeee", valid)
                    return (
                      <span style={{ color: "red" }} key={e}>
                        {e}
                      </span>
                    );
                  })} */}
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
